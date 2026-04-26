/**
 * Script de seed pour créer un client test en base
 * Usage: node scripts/seed-test.js
 */
require("dotenv").config({ path: require("path").resolve(__dirname, "../.env.local") });
const bcrypt = require("bcryptjs");
const { neon } = require("@neondatabase/serverless");

const sql = neon(process.env.POSTGRES_URL || process.env.DATABASE_URL);

async function seed() {
  const email = process.argv[2] || "test@linsaem.fr";
  const password = process.argv[3] || "password123";
  const name = process.argv[4] || "Test Admin";

  console.log(`\nCréation du client test : ${email}`);

  const hash = await bcrypt.hash(password, 12);

  // Upsert: insert or update
  await sql`
    INSERT INTO clients (id, name, email, password_hash, password_set, created_at)
    VALUES (
      gen_random_uuid(),
      ${name},
      ${email},
      ${hash},
      true,
      NOW()
    )
    ON CONFLICT (email)
    DO UPDATE SET
      password_hash = ${hash},
      password_set = true,
      name = ${name}
  `;

  console.log(`✅ Client créé/mis à jour`);
  console.log(`   Email    : ${email}`);
  console.log(`   Password : ${password}`);
  console.log(`\n⚠️  Pour accéder à l'admin, ADMIN_EMAIL dans .env.local doit correspondre à : ${email}`);
  process.exit(0);
}

seed().catch((err) => {
  console.error("Erreur :", err.message);
  process.exit(1);
});
