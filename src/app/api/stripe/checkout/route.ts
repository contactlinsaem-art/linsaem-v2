import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { createCheckoutSession, PLANS } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session?.email) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    const { plan } = await req.json();
    const planConfig = PLANS[plan as keyof typeof PLANS];

    if (!planConfig) {
      return NextResponse.json({ error: "Formule invalide" }, { status: 400 });
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://www.linsaem.fr";

    const checkoutSession = await createCheckoutSession({
      priceId: planConfig.priceId,
      customerEmail: session.email,
      clientId: session.clientId,
      planName: planConfig.name,
      successUrl: `${appUrl}/dashboard?success=true`,
      cancelUrl: `${appUrl}/#tarifs`,
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json({ error: "Erreur lors de la création du paiement" }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";
