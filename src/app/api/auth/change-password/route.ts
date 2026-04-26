import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import { getSession, verifyPassword, hashPassword } from "@/lib/auth";

function getDb() {
  const url = process.env.POSTGRES_URL || process.env.DATABASE_URL || "";
  return neon(url);
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    const body = await req.json();
    const { currentPassword, newPassword } = body as { currentPassword?: string; newPassword?: string };

    if (!currentPassword || !newPassword) {
      return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 });
    }

    if (newPassword.length < 8) {
      return NextResponse.json({ error: "Le nouveau mot de passe doit faire au moins 8 caractères" }, { status: 400 });
    }

    const sql = getDb();
    const rows = await sql`SELECT password_hash FROM clients WHERE id = ${session.clientId} LIMIT 1`;
    const client = rows[0];
    if (!client?.password_hash) {
      return NextResponse.json({ error: "Client introuvable" }, { status: 404 });
    }

    const valid = await verifyPassword(currentPassword, client.password_hash);
    if (!valid) {
      return NextResponse.json({ error: "Mot de passe actuel incorrect" }, { status: 401 });
    }

    const hashed = await hashPassword(newPassword);
    await sql`UPDATE clients SET password_hash = ${hashed} WHERE id = ${session.clientId}`;

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
