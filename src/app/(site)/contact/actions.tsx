"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { contactSchema } from "@/lib/contact-schema";
import { HONEYPOT, libellesType, type ContactField, type ContactState } from "@/lib/contact-fields";
import { verifierTurnstile } from "@/lib/turnstile";
import { limiteAtteinte } from "@/lib/ratelimit";
import { envoyerEmail } from "@/lib/email";
import { entreprise } from "@/content/entreprise";
import { LeadAlert } from "@/emails/LeadAlert";
import { AccuseReception } from "@/emails/AccuseReception";

const CHAMPS: ContactField[] = ["type", "nom", "email", "telephone", "formule", "message"];

/**
 * Mode test (Playwright en local ou en CI) : ni Turnstile, ni limite, ni envoi réel.
 * Impossible à activer sur Vercel (VERCEL=1 y est toujours défini), même si la variable est ajoutée par erreur.
 */
function modeTestActif(): boolean {
  return process.env.CONTACT_DRY_RUN === "1" && process.env.VERCEL !== "1";
}

function erreurServeur(values: Record<ContactField, string>): ContactState {
  return {
    status: "error",
    message: `L'envoi n'a pas pu aboutir. Réessayez dans quelques instants ou écrivez directement à ${entreprise.email}.`,
    values,
  };
}

async function ipVisiteur(): Promise<string | null> {
  const h = await headers();
  // Sur Vercel, x-forwarded-for est réécrit par la plateforme : la première valeur est l'IP du client.
  return h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || null;
}

export async function envoyerDemande(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const valeurs = Object.fromEntries(CHAMPS.map((c) => [c, String(formData.get(c) ?? "")])) as Record<ContactField, string>;

  // 1. Champ piège rempli : on fait comme si tout s'était bien passé, sans rien envoyer.
  if (String(formData.get(HONEYPOT) ?? "") !== "") redirect("/merci");

  const ip = await ipVisiteur();
  const modeTest = modeTestActif();

  try {
    // 2. Limite par IP
    if (!modeTest && (await limiteAtteinte(ip ?? "inconnue"))) {
      return {
        status: "error",
        message: `Trop de demandes envoyées depuis votre connexion. Réessayez dans une heure ou écrivez à ${entreprise.email}.`,
        values: valeurs,
      };
    }
  } catch (e) {
    console.error("Limite d'envoi indisponible", e);
    return erreurServeur(valeurs);
  }

  // 3. Validation
  const parsed = contactSchema.safeParse(valeurs);
  if (!parsed.success) {
    const fieldErrors: Partial<Record<ContactField, string>> = {};
    for (const issue of parsed.error.issues) {
      const champ = issue.path[0] as ContactField | undefined;
      if (champ && !fieldErrors[champ]) fieldErrors[champ] = issue.message;
    }
    return { status: "error", message: "Certains champs sont à corriger.", fieldErrors, values: valeurs };
  }

  // 4. Anti-robot
  if (!modeTest) {
    try {
      const humain = await verifierTurnstile(String(formData.get("cf-turnstile-response") ?? ""), ip);
      if (!humain) {
        return {
          status: "error",
          message: "La vérification anti-robot a échoué. Merci de la refaire puis de renvoyer le formulaire.",
          values: valeurs,
        };
      }
    } catch (e) {
      console.error("Turnstile indisponible", e);
      return erreurServeur(valeurs);
    }
  }

  // 5. Envoi : l'alerte interne d'abord (c'est elle qui compte), l'accusé de réception ensuite.
  const demande = parsed.data;
  if (modeTest) {
    console.info("[CONTACT_DRY_RUN] demande reçue :", { type: demande.type, formule: demande.formule });
  } else {
    const destinataire = process.env.CONTACT_TO_EMAIL;
    try {
      if (!destinataire) throw new Error("CONTACT_TO_EMAIL manquante");
      await envoyerEmail({
        to: destinataire,
        subject: `Nouvelle demande : ${libellesType[demande.type]}`,
        email: <LeadAlert demande={demande} />,
        replyTo: demande.email,
      });
    } catch (e) {
      console.error("Échec de l'envoi de l'alerte", e);
      return erreurServeur(valeurs);
    }

    try {
      await envoyerEmail({
        to: demande.email,
        subject: "Votre demande a bien été reçue",
        email: <AccuseReception />,
      });
    } catch (e) {
      // La demande est transmise : un accusé de réception manqué ne doit pas afficher d'erreur au visiteur.
      console.error("Échec de l'accusé de réception", e);
    }
  }

  redirect("/merci");
}
