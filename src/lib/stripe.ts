import Stripe from "stripe";

export function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_placeholder", {
    apiVersion: "2026-04-22.dahlia",
  });
}

// Convenience alias
export const stripe = getStripe();

export const PLANS = {
  starter: {
    name: "Starter",
    price: 5.99,
    priceId: process.env.STRIPE_STARTER_PRICE_ID || "",
    engagement: "24 mois",
    color: "sky",
  },
  pro: {
    name: "Pro",
    price: 7.99,
    priceId: process.env.STRIPE_PRO_PRICE_ID || "",
    engagement: "12 mois",
    color: "violet",
    popular: true,
  },
  business: {
    name: "Business",
    price: 11.99,
    priceId: process.env.STRIPE_BUSINESS_PRICE_ID || "",
    engagement: "12 mois",
    color: "pink",
  },
} as const;

export async function createCheckoutSession(data: {
  priceId: string;
  customerEmail: string;
  clientId: string;
  planName: string;
  successUrl: string;
  cancelUrl: string;
}) {
  const s = getStripe();
  const session = await s.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    customer_email: data.customerEmail,
    line_items: [{ price: data.priceId, quantity: 1 }],
    success_url: data.successUrl,
    cancel_url: data.cancelUrl,
    metadata: { clientId: data.clientId, planName: data.planName },
    subscription_data: { metadata: { clientId: data.clientId, planName: data.planName } },
    locale: "fr",
    allow_promotion_codes: true,
  });
  return session;
}

export async function createBillingPortalSession(customerId: string, returnUrl: string) {
  const s = getStripe();
  const session = await s.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  });
  return session;
}

export function formatPrice(amount: number) {
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(amount);
}

export function formatDate(date: Date | string) {
  return new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric" }).format(new Date(date));
}
