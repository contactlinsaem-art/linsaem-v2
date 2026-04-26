import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getSiteByClientId, updateSite } from "@/lib/db";
import { sendSiteOnlineEmail } from "@/lib/emails";
import { getClientById } from "@/lib/db";

async function verifyAdmin(session: Awaited<ReturnType<typeof getSession>>) {
  return session && session.email === process.env.ADMIN_EMAIL;
}

export async function PATCH(req: NextRequest) {
  const session = await getSession();
  if (!(await verifyAdmin(session))) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { clientId, statut, url, notes } = await req.json();
  if (!clientId) return NextResponse.json({ error: "clientId requis" }, { status: 400 });

  const oldSite = await getSiteByClientId(clientId).catch(() => null);
  await updateSite(clientId, { statut, url, notes });

  // Notifier si site passe en ligne
  if (statut === "en_ligne" && oldSite?.statut !== "en_ligne") {
    const client = await getClientById(clientId).catch(() => null);
    if (client && url) {
      await sendSiteOnlineEmail({ name: client.name, email: client.email, siteUrl: url }).catch(() => {});
    }
  }

  return NextResponse.json({ success: true });
}
