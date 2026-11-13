import { articlesVisibles, getArticle } from "@/content/blog";
import { imagePartage } from "@/lib/image-partage";

// Image de partage d'un article : image générale avec le titre de l'article. URL : /og/blog/<slug>.png
export const dynamicParams = false;

export function generateStaticParams() {
  return articlesVisibles.map((a) => ({ fichier: `${a.slug}.png` }));
}

export async function GET(_request: Request, { params }: RouteContext<"/og/blog/[fichier]">) {
  const { fichier } = await params;
  const article = getArticle(fichier.replace(/\.png$/, ""));
  if (!article) return new Response(null, { status: 404 });
  return imagePartage(article.titre);
}
