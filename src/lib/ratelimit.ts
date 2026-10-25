import "server-only";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

let limiter: Ratelimit | null = null;

function getLimiter(): Ratelimit {
  if (limiter) return limiter;
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) throw new Error("UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN manquantes");
  limiter = new Ratelimit({
    redis: new Redis({ url, token }),
    // 5 demandes par heure et par adresse IP : largement assez pour un humain.
    limiter: Ratelimit.slidingWindow(5, "1 h"),
    prefix: "linsaem:contact",
    analytics: false,
  });
  return limiter;
}

export async function limiteAtteinte(ip: string): Promise<boolean> {
  const { success } = await getLimiter().limit(ip);
  return !success;
}
