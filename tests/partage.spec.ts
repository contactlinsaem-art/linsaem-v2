import { expect, test, type APIRequestContext } from "@playwright/test";

const SITE = "https://www.linsaem.fr";

/** Pages du sitemap, plus les pages non indexées qui peuvent quand même être partagées. */
async function pages(request: APIRequestContext): Promise<string[]> {
  const xml = await (await request.get("/sitemap.xml")).text();
  const duSitemap = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]!).pathname);
  return [...new Set([...duSitemap, "/cgv", "/mentions-legales", "/confidentialite", "/merci", "/creation-site-internet/artisan", "/page-inexistante"])];
}

function meta(html: string, attribut: "property" | "name", cle: string): string | undefined {
  const balise = html.match(new RegExp(`<meta[^>]*${attribut}="${cle}"[^>]*>`))?.[0];
  return balise?.match(/content="([^"]*)"/)?.[1]?.replace(/&amp;/g, "&");
}

test.describe("Image de partage", () => {
  test("og:image et twitter:image sur chaque page, en URL absolue, image servie", async ({ request }) => {
    const liste = await pages(request);
    expect(liste.length).toBeGreaterThan(20);
    const images = new Map<string, string>();

    for (const page of liste) {
      const html = await (await request.get(page)).text();
      const og = meta(html, "property", "og:image");
      const twitter = meta(html, "name", "twitter:image");
      expect(og, `og:image manquant sur ${page}`).toBeTruthy();
      expect(twitter, `twitter:image manquant sur ${page}`).toBe(og);
      expect(og!.startsWith(`${SITE}/`), `og:image relative sur ${page} : ${og}`).toBe(true);
      expect(meta(html, "property", "og:image:width"), `og:image:width sur ${page}`).toBeTruthy();
      expect(meta(html, "property", "og:image:alt"), `og:image:alt sur ${page}`).toBeTruthy();
      images.set(page, og!);
    }

    // Image générale sur les pages générales, capture sur les réalisations et les modèles, titre sur métiers et articles.
    expect(images.get("/")).toBe(`${SITE}/og.png`);
    expect(images.get("/contact")).toBe(`${SITE}/og.png`);
    // En local : /_next/static/media/… ; sur Vercel : /_next/static/immutable/media/…
    expect(images.get("/realisations/fatuiali")).toMatch(/\/_next\/static\/(?:immutable\/)?media\/fatuiali\.[\w-]+\.jpg$/);
    expect(images.get("/modeles/maison-sauge")).toMatch(/\/_next\/static\/(?:immutable\/)?media\/maison-sauge\.[\w-]+\.jpg$/);
    expect(images.get("/modeles/vitrine")).toMatch(/\/_next\/static\/(?:immutable\/)?media\/vitrine\.[\w-]+\.jpg$/);
    expect(images.get("/creation-site-internet/artisan")).toBe(`${SITE}/og/creation-site-internet/artisan.png`);

    for (const url of new Set(images.values())) {
      const reponse = await request.get(new URL(url).pathname);
      expect(reponse.status(), url).toBe(200);
      expect(reponse.headers()["content-type"], url).toMatch(/^image\/(png|jpeg)/);
    }
  });

  test("l'image d'un article porte son propre titre", async ({ request }) => {
    const html = await (await request.get("/blog/site-internet-ou-page-facebook")).text();
    expect(meta(html, "property", "og:image")).toBe(`${SITE}/og/blog/site-internet-ou-page-facebook.png`);
  });
});

// Plages de numéros réservées à la fiction par l'ARCEP.
const FICTION = /^0(19900|26191|35301|46571|53649|63998)\d{4}$/;
const TELEPHONE = /(?:\+33 ?|0)[1-9](?:[ .]?\d{2}){4}/g;

// Seul le contenu du modèle (main#contenu) est vérifié : le bandeau et le pied de page LINSAEM portent le vrai numéro de l'agence.
test("les téléphones des modèles sont fictifs", async ({ request, page }) => {
  const xml = await (await request.get("/sitemap.xml")).text();
  const modeles = [...xml.matchAll(/<loc>[^<]+(\/modeles\/[^<]+)<\/loc>/g)].map((m) => m[1]!);
  expect(modeles.length).toBe(14);
  let total = 0;

  for (const chemin of modeles) {
    await page.goto(chemin);
    const contenu = page.locator("main#contenu");
    const texte = await contenu.innerText();
    const liens = await contenu.locator('a[href^="tel:"]').evaluateAll((as) => as.map((a) => a.getAttribute("href")!.slice(4)));
    const numeros = [...texte.matchAll(TELEPHONE)].map((m) => m[0]).concat(liens);
    total += numeros.length;
    for (const brut of numeros) {
      const numero = brut.replace(/^\+33 ?/, "0").replace(/[.\s]/g, "");
      expect(numero, `${chemin} : ${brut}`).toMatch(FICTION);
    }
  }
  expect(total).toBeGreaterThan(10);
});
