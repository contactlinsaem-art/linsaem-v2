import "server-only";

type SiteverifyResponse = { success: boolean; "error-codes"?: string[] };

/** Vérifie un jeton Cloudflare Turnstile côté serveur. */
export async function verifierTurnstile(token: string, ip: string | null): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) throw new Error("TURNSTILE_SECRET_KEY manquante");
  if (!token) return false;

  const body = new URLSearchParams({ secret, response: token });
  if (ip) body.set("remoteip", ip);

  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body,
    signal: AbortSignal.timeout(5000),
  });
  if (!res.ok) return false;
  const data = (await res.json()) as SiteverifyResponse;
  if (!data.success) console.warn("Turnstile refusé", data["error-codes"]);
  return data.success;
}
