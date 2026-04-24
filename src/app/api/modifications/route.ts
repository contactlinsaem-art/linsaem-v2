import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { createModification } from "@/lib/db";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }
  try {
    const body = await req.json();
    const modification = await createModification({
      clientId: session.user.id,
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
