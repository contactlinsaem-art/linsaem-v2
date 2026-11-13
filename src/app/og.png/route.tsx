import { imagePartage } from "@/lib/image-partage";

// Image de partage générale (accueil et pages générales), générée au build.
export const dynamic = "force-static";

export function GET() {
  return imagePartage();
}
