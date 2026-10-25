import type { NextConfig } from "next";

// Lu au build : changer l'URL du portail Stripe demande un redéploiement.
const portailClient = process.env.STRIPE_PORTAL_URL || "/contact";

const modeles = ["vitrine", "boulangerie", "artisan", "architecte", "photographe", "restaurant", "coach"];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Un package-lock.json existe plus haut dans l'arborescence locale : on fixe explicitement la racine du projet.
  turbopack: { root: import.meta.dirname },
  async redirects() {
    return [
      // Ancien espace client v2 → portail client Stripe (temporaire : l'URL du portail peut changer)
      { source: "/login", destination: portailClient, permanent: false },
      { source: "/dashboard", destination: portailClient, permanent: false },
      { source: "/dashboard/:path*", destination: portailClient, permanent: false },

      // Anciennes routes v2 supprimées
      { source: "/admin", destination: "/", permanent: true },
      { source: "/admin/:path*", destination: "/", permanent: true },
      { source: "/set-password", destination: "/", permanent: true },
      { source: "/forgot-password", destination: "/", permanent: true },
      { source: "/politique-de-confidentialite", destination: "/confidentialite", permanent: true },
      { source: "/demos", destination: "/modeles", permanent: true },
      ...modeles.map((slug) => ({ source: `/demos/${slug}`, destination: `/modeles/${slug}`, permanent: true })),

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

export default nextConfig;
