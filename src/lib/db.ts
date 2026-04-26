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
  reset_token VARCHAR(255),
  reset_token_expires TIMESTAMP,
  password_set BOOLEAN DEFAULT false,
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

CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  expediteur VARCHAR(20) NOT NULL,
  contenu TEXT NOT NULL,
  lu BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS sites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  url VARCHAR(500),
  statut VARCHAR(50) DEFAULT 'en_attente',
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE clients
  ADD COLUMN IF NOT EXISTS reset_token VARCHAR(255),
  ADD COLUMN IF NOT EXISTS reset_token_expires TIMESTAMP,
  ADD COLUMN IF NOT EXISTS password_set BOOLEAN DEFAULT false;
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

// ============================================
// CLIENT MANAGEMENT
// ============================================

export async function createClient(name: string, email: string) {
  const sql = getDb();
  const rows = await sql`
    INSERT INTO clients (name, email)
    VALUES (${name}, ${email})
    ON CONFLICT (email) DO UPDATE SET name = EXCLUDED.name
    RETURNING *
  `;
  return rows[0];
}

export async function setClientPassword(clientId: string, hashedPassword: string) {
  const sql = getDb();
  await sql`
    UPDATE clients
    SET password_hash = ${hashedPassword}, password_set = true,
        reset_token = NULL, reset_token_expires = NULL
    WHERE id = ${clientId}
  `;
}

export async function getClientByResetToken(token: string) {
  const sql = getDb();
  const rows = await sql`
    SELECT * FROM clients
    WHERE reset_token = ${token}
      AND reset_token_expires > NOW()
    LIMIT 1
  `;
  return rows[0] || null;
}

export async function updateClientProfile(clientId: string, name: string, phone: string) {
  const sql = getDb();
  await sql`
    UPDATE clients SET name = ${name}, phone = ${phone}
    WHERE id = ${clientId}
  `;
}

// ============================================
// MESSAGES
// ============================================

export async function getMessagesByClientId(clientId: string) {
  const sql = getDb();
  const rows = await sql`
    SELECT * FROM messages WHERE client_id = ${clientId} ORDER BY created_at ASC
  `;
  return rows;
}

export async function createMessage(clientId: string, expediteur: string, contenu: string) {
  const sql = getDb();
  const rows = await sql`
    INSERT INTO messages (client_id, expediteur, contenu)
    VALUES (${clientId}, ${expediteur}, ${contenu})
    RETURNING *
  `;
  return rows[0];
}

export async function markMessagesAsRead(clientId: string, expediteur: string) {
  const sql = getDb();
  await sql`
    UPDATE messages SET lu = true
    WHERE client_id = ${clientId} AND expediteur = ${expediteur}
  `;
}

export async function getUnreadCount(clientId: string) {
  const sql = getDb();
  const rows = await sql`
    SELECT COUNT(*)::int AS count FROM messages
    WHERE client_id = ${clientId} AND lu = false AND expediteur = 'admin'
  `;
  return (rows[0]?.count as number) || 0;
}

// ============================================
// SITES
// ============================================

export async function getSiteByClientId(clientId: string) {
  const sql = getDb();
  const rows = await sql`
    SELECT * FROM sites WHERE client_id = ${clientId} LIMIT 1
  `;
  return rows[0] || null;
}

export async function createSite(clientId: string) {
  const sql = getDb();
  const rows = await sql`
    INSERT INTO sites (client_id, statut)
    VALUES (${clientId}, 'en_attente')
    ON CONFLICT DO NOTHING
    RETURNING *
  `;
  return rows[0];
}

export async function updateSite(clientId: string, statut: string, url: string | null, notes: string | null) {
  const sql = getDb();
  await sql`
    UPDATE sites
    SET statut = ${statut},
        url = ${url},
        notes = ${notes},
        updated_at = NOW()
    WHERE client_id = ${clientId}
  `;
}

// ============================================
// ADMIN
// ============================================

export async function getAllClients() {
  const sql = getDb();
  const rows = await sql`
    SELECT c.id, c.name, c.email, c.phone, c.created_at,
           a.formule, a.statut AS abonnement_statut
    FROM clients c
    LEFT JOIN abonnements a ON a.client_id = c.id
    ORDER BY c.created_at DESC
  `;
  return rows;
}

export async function getClientWithDetails(clientId: string) {
  const sql = getDb();
  const [clientRows, abonnementRows, siteRows, facturesRows, messagesRows] = await Promise.all([
    sql`SELECT * FROM clients WHERE id = ${clientId} LIMIT 1`,
    sql`SELECT * FROM abonnements WHERE client_id = ${clientId} ORDER BY created_at DESC LIMIT 1`,
    sql`SELECT * FROM sites WHERE client_id = ${clientId} LIMIT 1`,
    sql`SELECT * FROM factures WHERE client_id = ${clientId} ORDER BY date_facture DESC`,
    sql`SELECT * FROM messages WHERE client_id = ${clientId} ORDER BY created_at ASC`,
  ]);
  return {
    client: clientRows[0] || null,
    abonnement: abonnementRows[0] || null,
    site: siteRows[0] || null,
    factures: facturesRows,
    messages: messagesRows,
  };
}

export async function getClientsWithUnreadMessages() {
  const sql = getDb();
  const rows = await sql`
    SELECT c.id, c.name, c.email,
           COUNT(m.id) FILTER (WHERE m.lu = false AND m.expediteur = 'client')::int AS unread_count,
           MAX(m.created_at) AS last_message_at
    FROM clients c
    LEFT JOIN messages m ON m.client_id = c.id
    GROUP BY c.id, c.name, c.email
    ORDER BY unread_count DESC, last_message_at DESC
  `;
  return rows;
}

export async function getAllSites() {
  const sql = getDb();
  const rows = await sql`
    SELECT s.*, c.name AS client_name, c.email AS client_email
    FROM sites s
    JOIN clients c ON c.id = s.client_id
    ORDER BY s.updated_at DESC
  `;
  return rows;
}

export const FORMULES = {
  starter: { nom: "Starter", prix: 5.99, couleur: "sky" },
  pro: { nom: "Pro", prix: 7.99, couleur: "violet" },
  business: { nom: "Business", prix: 11.99, couleur: "pink" },
} as const;
