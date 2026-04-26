import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { createModification } from "@/lib/db";

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session?.clientId) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }
  try {
    const body = await req.json();
    const modification = await createModification({
      clientId: session.clientId,
      titre: body.titre,
      description: body.description,
      priorite: body.priorite,
    });
    return NextResponse.json(modification);
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";
