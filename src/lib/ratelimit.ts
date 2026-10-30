import "server-only";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

/**
 * Limite d'envois par IP, optionnelle : elle s'active dès que les deux variables Upstash sont définies.
 * Sans elles, le formulaire reste protégé par le champ piège, Turnstile et la validation Zod.
 */
export function limiteParIpConfiguree(): boolean {
  return Boolean(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);
}

let limiter: Ratelimit | null = null;
let avertissementAffiche = false;

function getLimiter(): Ratelimit | null {
  if (limiter) return limiter;
  if (!limiteParIpConfiguree()) {
    if (!avertissementAffiche) {
      console.warn(
        "Limite d'envoi par IP désactivée : UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN absentes.",
      );
      avertissementAffiche = true;
    }
    return null;
  }
  limiter = new Ratelimit({
    redis: new Redis({ url: process.env.UPSTASH_REDIS_REST_URL!, token: process.env.UPSTASH_REDIS_REST_TOKEN! }),
    // 5 demandes par heure et par adresse IP : largement assez pour un humain.
    limiter: Ratelimit.slidingWindow(5, "1 h"),
    prefix: "linsaem:contact",
    analytics: false,
  });
  return limiter;
}

/** true si l'IP a dépassé la limite ; toujours false quand la limite n'est pas configurée. */
export async function limiteAtteinte(ip: string): Promise<boolean> {
  const l = getLimiter();
  if (!l) return false;
  const { success } = await l.limit(ip);
  return !success;
}
