// Régénère les vignettes des modèles (src/assets/modeles/apercus/*.jpg) à partir d'un serveur en cours d'exécution.
// Usage : npm run build && npx next start --port 3100, puis : node scripts/apercus-modeles.mjs [url]
import { readFileSync } from "node:fs";
import { chromium } from "@playwright/test";

const base = process.argv[2] ?? "http://localhost:3100";
const slugs = [...readFileSync("src/content/modeles.ts", "utf8").matchAll(/modeles\/apercus\/([a-z0-9-]+)\.jpg/g)].map((m) => m[1]);

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
for (const slug of slugs) {
  await page.goto(`${base}/modeles/${slug}`, { waitUntil: "networkidle" });
  // Le bandeau « Modèle de design LINSAEM » n'apparaît pas sur la vignette.
  await page.evaluate(() => document.querySelector("main#contenu")?.previousElementSibling?.remove());
  await page.waitForTimeout(500);
  await page.screenshot({ path: `src/assets/modeles/apercus/${slug}.jpg`, type: "jpeg", quality: 80 });
  console.log(`✓ ${slug}`);
}
await browser.close();
