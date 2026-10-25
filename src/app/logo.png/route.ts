import { logoImage } from "@/lib/logo-image";

// Généré une fois au build : logo raster 512 px pour les données structurées (Google demande au moins 112 px).
export const dynamic = "force-static";

export function GET() {
  return logoImage(512);
}
