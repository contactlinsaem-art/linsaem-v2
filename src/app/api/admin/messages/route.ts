import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import {
  getClientsWithUnreadMessages,
  getMessagesByClientId,
  createMessage,
  markMessagesAsRead,
} from "@/lib/db";
import { sendAdminMessageNotification } from "@/lib/emails";
import { getClientById } from "@/lib/db";

async function verifyAdmin(session: Awaited<ReturnType<typeof getSession>>) {
  return session && session.email === process.env.ADMIN_EMAIL;
}

export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!(await verifyAdmin(session))) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const clientId = searchParams.get("clientId");

  if (clientId) {
    await markMessagesAsRead(clientId, "client");
    const messages = await getMessagesByClientId(clientId);
    return NextResponse.json(messages);
  }

  const threads = await getClientsWithUnreadMessages();
  return NextResponse.json(threads);
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!(await verifyAdmin(session))) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { clientId, contenu } = await req.json();
  if (!clientId || !contenu?.trim()) {
    return NextResponse.json({ error: "clientId et contenu requis" }, { status: 400 });
  }

  const message = await createMessage(clientId, "admin", contenu.trim());

  const client = await getClientById(clientId).catch(() => null);
  if (client) {
    await sendAdminMessageNotification({
      clientName: client.name,
      clientEmail: client.email,
      contenu: contenu.trim(),
      dashboardUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/messages`,
    }).catch(() => {});
  }

  return NextResponse.json(message);
}
