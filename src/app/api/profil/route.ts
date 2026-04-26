import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { updateClientProfile } from "@/lib/db";

export async function PATCH(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const { name, phone } = await req.json();
  if (!name?.trim()) {
    return NextResponse.json({ error: "Le nom est requis." }, { status: 400 });
  }

  await updateClientProfile(session.clientId, name.trim(), phone?.trim() || "");
  return NextResponse.json({ success: true });
}
