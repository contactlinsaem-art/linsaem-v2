import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const modeles = ["vitrine", "boulangerie", "artisan", "architecte", "photographe", "restaurant", "coach"];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // 50 : images de fond assombries (heros plein écran des modèles), où la compression ne se voit pas.
  images: { qualities: [50, 75] },
  // Un package-lock.json existe plus haut dans l'arborescence locale : on fixe explicitement la racine du projet.
  turbopack: { root: import.meta.dirname },
  async redirects() {
    return [
      // Anciens modèles v2 : 301 explicite (permanent: true renverrait un 308)
      { source: "/demos", destination: "/modeles", statusCode: 301 },
      ...modeles.map((slug) => ({ source: `/demos/${slug}`, destination: `/modeles/${slug}`, statusCode: 301 as const })),

      // Ancien espace client v2, jamais utilisé, et autres routes v2 supprimées
      { source: "/login", destination: "/", permanent: true },
      { source: "/register", destination: "/", permanent: true },
      { source: "/dashboard", destination: "/", permanent: true },
      { source: "/dashboard/:path*", destination: "/", permanent: true },
      { source: "/admin", destination: "/", permanent: true },
      { source: "/admin/:path*", destination: "/", permanent: true },
      { source: "/set-password", destination: "/", permanent: true },
      { source: "/forgot-password", destination: "/", permanent: true },
      { source: "/politique-de-confidentialite", destination: "/confidentialite", permanent: true },

      // Anciennes pages de la v1
      ...["artisan", "boulangerie", "architecte", "photographe"].map((slug) => ({
        source: `/${slug}.html`,
        destination: `/modeles/${slug}`,
        permanent: true,
      })),
      { source: "/404.html", destination: "/", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
        ],
      },
    ];
  },
};

// Articles du blog en MDX (src/content/blog/*.mdx), importés par les pages : aucune route n'est créée par un fichier .mdx.
const withMDX = createMDX({});

export default withMDX(nextConfig);
