import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { neon } from "@neondatabase/serverless";
import { sendOrderConfirmation, sendWelcomeEmail } from "@/lib/emails";
import { createClient, createSite } from "@/lib/db";
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

        // Récupérer l'email du customer Stripe
        const stripe = getStripe();
        const customer = await stripe.customers.retrieve(subscription.customer as string) as Stripe.Customer;
        const customerEmail = customer.email || "";
        const customerName = (customer.name || planName || "Client");

        // Créer ou récupérer le client en base
        let resolvedClient: { id: string; name: string; email: string } | null = null;
        if (clientId) {
          const rows = await sql`SELECT id, name, email FROM clients WHERE id = ${clientId} LIMIT 1`;
          resolvedClient = rows[0] || null;
        }
        if (!resolvedClient && customerEmail) {
          resolvedClient = await createClient(customerName, customerEmail);
        }

        if (resolvedClient) {
          await sql`
            INSERT INTO abonnements (client_id, formule, statut, stripe_customer_id, stripe_subscription_id, stripe_price_id, montant_mensuel)
            VALUES (
              ${resolvedClient.id},
              ${planName?.toLowerCase() || "starter"},
              'actif',
              ${subscription.customer as string},
              ${subscription.id},
              ${subscription.items.data[0]?.price.id},
              ${(subscription.items.data[0]?.price.unit_amount || 0) / 100}
            )
            ON CONFLICT DO NOTHING
          `;

          // Créer l'entrée site
          await createSite(resolvedClient.id);

          // Générer reset_token pour création mot de passe
          const resetToken = crypto.randomUUID();
          const resetExpires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
          await sql`
            UPDATE clients SET reset_token = ${resetToken}, reset_token_expires = ${resetExpires}
            WHERE id = ${resolvedClient.id}
          `;

          const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://www.linsaem.fr";
          const montant = (subscription.items.data[0]?.price.unit_amount || 0) / 100;

          // Email de bienvenue avec lien set-password
          await sendWelcomeEmail({
            name: resolvedClient.name,
            email: resolvedClient.email,
            formule: planName || "Starter",
            setPasswordUrl: `${appUrl}/set-password?token=${resetToken}`,
          });

          // Email de confirmation commande
          await sendOrderConfirmation({
            name: resolvedClient.name,
            email: resolvedClient.email,
            formule: planName || "Starter",
            prix: montant,
            dashboardUrl: `${appUrl}/dashboard`,
          });
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
