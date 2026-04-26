import { NextRequest, NextResponse } from "next/server";
import { getClientByResetToken, setClientPassword } from "@/lib/db";
import { hashPassword, createSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { token, password } = body as { token?: string; password?: string };

    if (!token || !password) {
      return NextResponse.json({ error: "Token et mot de passe requis" }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({ error: "Le mot de passe doit faire au moins 8 caractères" }, { status: 400 });
    }

    const client = await getClientByResetToken(token);
    if (!client) {
      return NextResponse.json({ error: "Lien invalide ou expiré" }, { status: 400 });
    }

    const hashed = await hashPassword(password);
    await setClientPassword(client.id, hashed);
    await createSession(client.id, client.name, client.email);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
