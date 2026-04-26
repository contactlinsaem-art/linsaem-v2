import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getMessagesByClientId, createMessage, markMessagesAsRead } from "@/lib/db";
import { sendNewMessageAlert } from "@/lib/emails";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  await markMessagesAsRead(session.clientId, "admin");
  const messages = await getMessagesByClientId(session.clientId);
  return NextResponse.json(messages);
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const { contenu } = await req.json();
  if (!contenu?.trim()) {
    return NextResponse.json({ error: "Message vide" }, { status: 400 });
  }

  const message = await createMessage(session.clientId, "client", contenu.trim());

  await sendNewMessageAlert({
    clientName: session.name,
    contenu: contenu.trim(),
    adminUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/admin/messages`,
  }).catch(() => {});

  return NextResponse.json(message);
}
