import { metiersVisibles, getMetier } from "@/content/metiers";
import { imagePartage } from "@/lib/image-partage";

// Image de partage d'une page métier : image générale avec le titre de la page. URL : /og/creation-site-internet/<slug>.png
export const dynamicParams = false;

export function generateStaticParams() {
  return metiersVisibles.map((m) => ({ fichier: `${m.slug}.png` }));
}

export async function GET(_request: Request, { params }: RouteContext<"/og/creation-site-internet/[fichier]">) {
  const { fichier } = await params;
  const metier = getMetier(fichier.replace(/\.png$/, ""));
  if (!metier) return new Response(null, { status: 404 });
  return imagePartage(metier.metaTitre);
}
