import { neon } from "@neondatabase/serverless";

// Connexion Neon (compatible Vercel Postgres migré)
function getDb() {
  const url = process.env.POSTGRES_URL || process.env.DATABASE_URL || "";
  return neon(url);
}

// ============================================
// SCHEMA SQL - exécuter une fois sur Neon/Vercel
// ============================================
export const SCHEMA = `
CREATE TABLE IF NOT EXISTS clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255),
  phone VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS abonnements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  formule VARCHAR(50) NOT NULL,
  statut VARCHAR(50) NOT NULL DEFAULT 'actif',
  stripe_customer_id VARCHAR(255),
  stripe_subscription_id VARCHAR(255),
  stripe_price_id VARCHAR(255),
  date_debut TIMESTAMP NOT NULL DEFAULT NOW(),
  date_fin TIMESTAMP,
  montant_mensuel DECIMAL(10,2),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS factures (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  abonnement_id UUID REFERENCES abonnements(id),
  stripe_invoice_id VARCHAR(255) UNIQUE,
  montant DECIMAL(10,2) NOT NULL,
  statut VARCHAR(50) NOT NULL DEFAULT 'pending',
  stripe_invoice_url VARCHAR(500),
  stripe_hosted_invoice_url VARCHAR(500),
  date_facture TIMESTAMP NOT NULL DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS modifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  titre VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  statut VARCHAR(50) NOT NULL DEFAULT 'en_attente',
  priorite VARCHAR(20) DEFAULT 'normale',
  reponse TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
`;

// ============================================
// HELPERS
// ============================================

export async function getClientByEmail(email: string) {
  const sql = getDb();
  const rows = await sql`
    SELECT * FROM clients WHERE email = ${email} LIMIT 1
  `;
  return rows[0] || null;
}

export async function getClientById(id: string) {
  const sql = getDb();
  const rows = await sql`
    SELECT id, name, email, phone, created_at FROM clients WHERE id = ${id} LIMIT 1
  `;
  return rows[0] || null;
}

export async function getAbonnementByClientId(clientId: string) {
  const sql = getDb();
  const rows = await sql`
    SELECT * FROM abonnements WHERE client_id = ${clientId} ORDER BY created_at DESC LIMIT 1
  `;
  return rows[0] || null;
}

export async function getFacturesByClientId(clientId: string) {
  const sql = getDb();
  const rows = await sql`
    SELECT * FROM factures WHERE client_id = ${clientId} ORDER BY date_facture DESC
  `;
  return rows;
}

export async function getModificationsByClientId(clientId: string) {
  const sql = getDb();
  const rows = await sql`
    SELECT * FROM modifications WHERE client_id = ${clientId} ORDER BY created_at DESC
  `;
  return rows;
}

export async function createModification(data: {
  clientId: string;
  titre: string;
  description: string;
  priorite?: string;
}) {
  const sql = getDb();
  const rows = await sql`
    INSERT INTO modifications (client_id, titre, description, priorite)
    VALUES (${data.clientId}, ${data.titre}, ${data.description}, ${data.priorite || "normale"})
    RETURNING *
  `;
  return rows[0];
}

export const FORMULES = {
  starter: { nom: "Starter", prix: 5.99, couleur: "sky" },
  pro: { nom: "Pro", prix: 7.99, couleur: "violet" },
  business: { nom: "Business", prix: 11.99, couleur: "pink" },
} as const;
