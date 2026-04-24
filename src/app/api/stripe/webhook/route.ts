import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { neon } from "@neondatabase/serverless";
import { sendOrderConfirmation } from "@/lib/emails";
import Stripe from "stripe";

export const dynamic = "force-dynamic";

function getDb() {
  const url = process.env.POSTGRES_URL || process.env.DATABASE_URL || "";
  return neon(url);
}

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature")!;
  const stripe = getStripe();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    console.error("Webhook signature error:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const sql = getDb();

  try {
    switch (event.type) {
      case "customer.subscription.created": {
        const subscription = event.data.object as Stripe.Subscription;
        const clientId = subscription.metadata.clientId;
        const planName = subscription.metadata.planName;

        if (clientId) {
          await sql`
            INSERT INTO abonnements (client_id, formule, statut, stripe_customer_id, stripe_subscription_id, stripe_price_id, montant_mensuel)
            VALUES (
              ${clientId},
              ${planName?.toLowerCase() || "starter"},
              'actif',
              ${subscription.customer as string},
              ${subscription.id},
              ${subscription.items.data[0]?.price.id},
              ${(subscription.items.data[0]?.price.unit_amount || 0) / 100}
            )
            ON CONFLICT DO NOTHING
          `;

          const rows = await sql`SELECT name, email FROM clients WHERE id = ${clientId}`;
          if (rows[0]) {
            const montant = (subscription.items.data[0]?.price.unit_amount || 0) / 100;
            await sendOrderConfirmation({
              name: rows[0].name,
              email: rows[0].email,
              formule: planName || "Starter",
              prix: montant,
              dashboardUrl: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
            });
          }
        }
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        await sql`
          UPDATE abonnements SET statut = 'resilie', date_fin = NOW()
          WHERE stripe_subscription_id = ${subscription.id}
        `;
        break;
      }

      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice;
        const clientId = ((invoice.metadata) as Record<string, string>)?.["clientId"] || "";

        if (clientId) {
          await sql`
            INSERT INTO factures (client_id, stripe_invoice_id, montant, statut, stripe_invoice_url, stripe_hosted_invoice_url, date_facture)
            VALUES (
              ${clientId},
              ${invoice.id},
              ${(invoice.amount_paid || 0) / 100},
              'paid',
              ${invoice.invoice_pdf || ""},
              ${invoice.hosted_invoice_url || ""},
              ${new Date(invoice.created * 1000).toISOString()}
            )
            ON CONFLICT (stripe_invoice_id) DO UPDATE SET statut = 'paid'
          `;
        }
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        const clientId = ((invoice.metadata) as Record<string, string>)?.["clientId"] || "";
        if (clientId) {
          await sql`
            INSERT INTO factures (client_id, stripe_invoice_id, montant, statut, date_facture)
            VALUES (
              ${clientId},
              ${invoice.id},
              ${(invoice.amount_due || 0) / 100},
              'failed',
              ${new Date(invoice.created * 1000).toISOString()}
            )
            ON CONFLICT (stripe_invoice_id) DO UPDATE SET statut = 'failed'
          `;
        }
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook handler error:", error);
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
  }
}
