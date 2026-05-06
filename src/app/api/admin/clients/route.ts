import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getClientByEmail, createClientManual } from "@/lib/db";
import { sendActivationEmail } from "@/lib/emails";
import { neon } from "@neondatabase/serverless";

export const dynamic = "force-dynamic";

const PRIX: Record<string, number> = {
  starter: 5.99,
  pro: 7.99,
  business: 11.99,
};

const STRIPE_LINKS: Record<string, string> = {
  starter: process.env.STRIPE_LINK_STARTER || "",
  pro: process.env.STRIPE_LINK_PRO || "",
  business: process.env.STRIPE_LINK_BUSINESS || "",
};

async function verifyAdmin(session: Awaited<ReturnType<typeof getSession>>) {
  return session && session.email === process.env.ADMIN_EMAIL;
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!(await verifyAdmin(session))) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { name, email, phone, formule } = await req.json();

  if (!name || !email || !formule) {
    return NextResponse.json({ error: "Champs obligatoires manquants" }, { status: 400 });
  }

  const formuleNorm = formule.toLowerCase();
  if (!PRIX[formuleNorm]) {
    return NextResponse.json({ error: "Formule invalide" }, { status: 400 });
  }

  // Vérifier doublon
  const existing = await getClientByEmail(email);
  if (existing) {
    return NextResponse.json({ error: "Un client avec cet email existe déjà" }, { status: 400 });
  }

  // Créer le client avec token de set-password
  const client = await createClientManual({ name, email, phone, formule: formuleNorm });
  if (!client) {
    return NextResponse.json({ error: "Erreur création client (email déjà utilisé)" }, { status: 400 });
  }

  // Créer l'abonnement
  const sql = neon(process.env.POSTGRES_URL || process.env.DATABASE_URL || "");
  await sql`
    INSERT INTO abonnements (client_id, formule, statut, montant_mensuel)
    VALUES (${client.id}, ${formuleNorm}, 'en_attente', ${PRIX[formuleNorm]})
  `;

  // Créer le site
  await sql`
    INSERT INTO sites (client_id, statut)
    VALUES (${client.id}, 'en_attente')
  `;

  // Construire le lien set-password
  const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://www.linsaem.fr";
  const setPasswordLink = `${APP_URL}/auth/set-password?token=${client.reset_token}`;
  const stripeLink = STRIPE_LINKS[formuleNorm];

  // Envoyer l'email d'activation
  await sendActivationEmail({
    name,
    email,
    formule: formule.charAt(0).toUpperCase() + formule.slice(1).toLowerCase(),
    prix: PRIX[formuleNorm],
    stripeLink,
    setPasswordLink,
  });

  return NextResponse.json({ success: true, clientId: client.id });
}
