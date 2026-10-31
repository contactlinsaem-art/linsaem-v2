import { expect, test, type Page } from "@playwright/test";

async function typesJsonLd(page: Page): Promise<string[]> {
  const blocs = await page.locator('script[type="application/ld+json"]').allTextContents();
  return blocs.map((b) => (JSON.parse(b) as { "@type": string })["@type"]);
}

test.describe("SEO", () => {
  test("le sitemap ne contient aucun brouillon", async ({ request }) => {
    const xml = await (await request.get("/sitemap.xml")).text();
    expect(xml).toContain("/realisations/cvuzz");
    expect(xml).toContain("/modeles/maison-sauge");
    // Pages métiers et articles sont en brouillon (publie: false) tant qu'ils ne sont pas validés.
    expect(xml).not.toContain("/creation-site-internet/");
    expect(xml).not.toContain("/blog");
  });

  test("un brouillon est signalé et non indexé", async ({ page }) => {
    await page.goto("/creation-site-internet/artisan");
    await expect(page.getByRole("note")).toContainText("Brouillon");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  });

  const attendus: [string, string[]][] = [
    ["/", ["ProfessionalService", "FAQPage"]],
    ["/sites-vitrines", ["Service", "FAQPage", "BreadcrumbList"]],
    ["/developpement", ["Service", "FAQPage", "BreadcrumbList"]],
    ["/realisations/fatuiali", ["BreadcrumbList"]],
    ["/creation-site-internet/coach", ["Service", "FAQPage", "BreadcrumbList"]],
    ["/blog/site-internet-ou-page-facebook", ["Article", "BreadcrumbList"]],
    ["/modeles/studio-ligne", ["BreadcrumbList"]],
  ];

  for (const [path, types] of attendus) {
    test(`données structurées : ${path}`, async ({ page }) => {
      await page.goto(path);
      const presents = await typesJsonLd(page);
      for (const t of types) expect(presents).toContain(t);
    });
  }
});
