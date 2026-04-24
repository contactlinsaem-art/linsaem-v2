import { NextRequest, NextResponse } from "next/server";
import { sendContactConfirmation, sendLeadAlert } from "@/lib/emails";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, formule, message } = body;

    if (!name || !email) {
      return NextResponse.json({ error: "Nom et email requis" }, { status: 400 });
    }

    // Envoyer les deux emails en parallèle
    await Promise.all([
      sendContactConfirmation({ name, email, formule, message }),
      sendLeadAlert({ name, email, phone, formule, message }),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";
