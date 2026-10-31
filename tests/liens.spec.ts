import { expect, test } from "@playwright/test";

const metiers = ["artisan", "estheticienne", "restaurant", "entreprise-de-menage", "coach", "photographe"];

/**
 * Aucun lien interne cassé depuis les pages métiers : en particulier, une réalisation en publie: false
 * (client qui n'a pas encore donné son accord) ne doit jamais y être liée.
 */
test.describe("Liens internes des pages métiers", () => {
  for (const metier of metiers) {
    test(metier, async ({ page, request }) => {
      await page.goto(`/creation-site-internet/${metier}`);
      const liens = await page
        .locator("main a[href^='/']")
        .evaluateAll((as) => [...new Set(as.map((a) => (a.getAttribute("href") ?? "").split("#")[0] ?? ""))].filter(Boolean));
      expect(liens.length).toBeGreaterThan(0);
      for (const lien of liens) {
        const reponse = await request.get(lien, { maxRedirects: 0 });
        expect(reponse.status(), lien).toBe(200);
      }
    });
  }
});
