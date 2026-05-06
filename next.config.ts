import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "www.linsaem.fr" },
    ],
  },
  async redirects() {
    return [
      { source: "/artisan.html", destination: "/", permanent: true },
      { source: "/boulangerie.html", destination: "/", permanent: true },
      { source: "/architecte.html", destination: "/", permanent: true },
      { source: "/photographe.html", destination: "/", permanent: true },
      { source: "/google3aff1cbc17bc310f.html", destination: "/", permanent: true },
      { source: "/404.html", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
