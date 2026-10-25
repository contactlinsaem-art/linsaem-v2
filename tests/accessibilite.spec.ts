import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const pages = [
  "/",
  "/sites-vitrines",
  "/developpement",
  "/realisations",
  "/modeles",
  "/contact",
  "/merci",
  "/mentions-legales",
  "/cgv",
  "/confidentialite",
  "/modeles/vitrine",
  "/modeles/boulangerie",
  "/modeles/artisan",
  "/modeles/architecte",
  "/modeles/photographe",
  "/modeles/restaurant",
  "/modeles/coach",
];

test.describe("Accessibilité (WCAG 2.x A et AA)", () => {
  for (const path of pages) {
    test(path, async ({ page }) => {
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(path);
      const { violations } = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
        .analyze();
      const resume = violations.map((v) => `${v.id} (${v.nodes.length}) : ${v.help}\n  ${v.nodes.slice(0, 3).map((n) => n.target.join(" ")).join("\n  ")}`);
      expect(resume, resume.join("\n")).toEqual([]);
    });
  }
});
