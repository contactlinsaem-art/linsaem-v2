import { expect, test } from "@playwright/test";

// Slugs des démos de la v2 (src/content/modeles.ts importe des images, illisibles hors de Next).
const demosV2 = ["vitrine", "boulangerie", "artisan", "architecte", "photographe", "restaurant", "coach"];

// Redirections des anciennes URL de la v2, vérifiées sans suivre la redirection.
const attendues: [source: string, destination: string, statut: number][] = [
  ["/demos", "/modeles", 301],
  ...demosV2.map((slug): [string, string, number] => [`/demos/${slug}`, `/modeles/${slug}`, 301]),
  ["/login", "/", 308],
  ["/dashboard", "/", 308],
  ["/dashboard/factures", "/", 308],
];

test.describe("Redirections", () => {
  for (const [source, destination, statut] of attendues) {
    test(`${source} → ${destination}`, async ({ request, baseURL }) => {
      const reponse = await request.get(source, { maxRedirects: 0 });
      expect(reponse.status()).toBe(statut);
      expect(new URL(reponse.headers()["location"] ?? "", baseURL).pathname).toBe(destination);
    });
  }

  test("une ancienne démo aboutit à la page du modèle", async ({ page }) => {
    await page.goto("/demos/vitrine");
    await expect(page).toHaveURL(/\/modeles\/vitrine$/);
  });
});
