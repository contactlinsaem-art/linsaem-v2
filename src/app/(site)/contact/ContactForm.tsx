"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useActionState, useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";
import { formules, formatPrix } from "@/content/offres";
import { HONEYPOT, libellesFormule, libellesType, typesProjet, type ContactState, type TypeProjet } from "@/lib/contact-fields";
import { SelectField, TextAreaField, TextField } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { envoyerDemande } from "./actions";
import { Turnstile } from "./Turnstile";

const initialState: ContactState = { status: "idle" };
const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

function typeDepuisUrl(valeur: string | null): TypeProjet {
  return valeur === "developpement" ? "developpement" : "vitrine";
}

export function ContactForm() {
  const params = useSearchParams();
  const [state, action, pending] = useActionState(envoyerDemande, initialState);
  const [type, setType] = useState<TypeProjet>(() => typeDepuisUrl(params.get("type")));
  const alerte = useRef<HTMLDivElement>(null);

  const erreurs = state.status === "error" ? (state.fieldErrors ?? {}) : {};
  const valeurs = state.status === "error" ? (state.values ?? {}) : {};
  const formuleUrl = params.get("formule") ?? "";

  // Après un envoi refusé : le message d'erreur reçoit le focus pour être annoncé.
  useEffect(() => {
    if (state.status === "error") alerte.current?.focus();
  }, [state]);

  return (
    <form action={action} noValidate className="space-y-6" aria-describedby="contact-obligatoires">
      <p id="contact-obligatoires" className="text-sm text-slate-600">
        Les champs marqués d&apos;un <span aria-hidden="true" className="text-red-700">*</span>
        <span className="sr-only">astérisque</span> sont obligatoires.
      </p>

      {state.status === "error" && (
        <div
          ref={alerte}
          tabIndex={-1}
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-800"
        >
          {state.message}
        </div>
      )}

      <fieldset>
        <legend className="mb-3 text-sm font-semibold text-slate-800">
          Type de projet <span aria-hidden="true" className="text-red-700">*</span>
        </legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {typesProjet.map((t) => (
            <label
              key={t}
              className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-300 px-4 py-3 has-checked:border-accent has-checked:bg-accent-soft"
            >
              <input
                type="radio"
                name="type"
                value={t}
                checked={type === t}
                onChange={() => setType(t)}
                className="size-4 accent-[var(--color-accent)]"
              />
              <span className="font-medium">{libellesType[t]}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-6 sm:grid-cols-2">
        <TextField
          id="nom"
          name="nom"
          label="Nom"
          autoComplete="name"
          required
          maxLength={100}
          defaultValue={valeurs.nom}
          error={erreurs.nom}
        />
        <TextField
          id="email"
          name="email"
          type="email"
          label="Email"
          autoComplete="email"
          required
          maxLength={254}
          defaultValue={valeurs.email}
          error={erreurs.email}
        />
      </div>

      <TextField
        id="telephone"
        name="telephone"
        type="tel"
        label="Téléphone"
        autoComplete="tel"
        maxLength={30}
        defaultValue={valeurs.telephone}
        error={erreurs.telephone}
      />

      {type === "vitrine" && (
        <SelectField
          id="formule"
          name="formule"
          label="Formule envisagée"
          defaultValue={valeurs.formule ?? formuleUrl}
          error={erreurs.formule}
        >
          <option value="">Choisir une formule</option>
          {formules.map((f) => (
            <option key={f.id} value={f.id}>
              {f.nom} — {formatPrix(f.prixMensuelTTC)} TTC / mois
            </option>
          ))}
          <option value="indecis">{libellesFormule.indecis}</option>
        </SelectField>
      )}

      <TextAreaField
        id="message"
        name="message"
        label={type === "vitrine" ? "Votre activité et votre besoin" : "Votre projet"}
        hint={
          type === "vitrine"
            ? "Votre métier, votre ville, ce que le site doit présenter."
            : "Ce que l'application doit faire, pour qui, et vos délais si vous en avez."
        }
        required
        maxLength={3000}
        defaultValue={valeurs.message}
        error={erreurs.message}
      />

      {/* Champ piège : masqué aux humains et aux lecteurs d'écran */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={HONEYPOT}>Ne pas remplir ce champ</label>
        <input id={HONEYPOT} name={HONEYPOT} type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>

      {siteKey && <Turnstile siteKey={siteKey} resetKey={state} />}

      <p className="text-sm leading-relaxed text-slate-600">
        Vos données servent uniquement à répondre à votre demande. Elles sont conservées au plus tard 3 ans après le
        dernier échange. Détails et droits :{" "}
        <Link href="/confidentialite" className="font-medium text-accent underline underline-offset-4">
          politique de confidentialité
        </Link>
        .
      </p>

      <Button type="submit" size="lg" disabled={pending} className="w-full sm:w-auto">
        <Send aria-hidden="true" size={18} />
        {pending ? "Envoi en cours…" : "Envoyer ma demande"}
      </Button>
    </form>
  );
}
