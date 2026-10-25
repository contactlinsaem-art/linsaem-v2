import type { MetadataRoute } from "next";
import { modeles } from "@/content/modeles";
import { absoluteUrl } from "@/lib/seo";

/** Pages indexables uniquement (les pages légales et /merci sont en noindex). */
export default function sitemap(): MetadataRoute.Sitemap {
  const pages: { path: string; priority: number; changeFrequency: "monthly" | "yearly" }[] = [
    { path: "/", priority: 1, changeFrequency: "monthly" },
    { path: "/sites-vitrines", priority: 0.9, changeFrequency: "monthly" },
    { path: "/developpement", priority: 0.9, changeFrequency: "monthly" },
    { path: "/realisations", priority: 0.7, changeFrequency: "monthly" },
    { path: "/modeles", priority: 0.6, changeFrequency: "yearly" },
    { path: "/contact", priority: 0.6, changeFrequency: "yearly" },
    ...modeles.map((m) => ({ path: `/modeles/${m.slug}`, priority: 0.4, changeFrequency: "yearly" as const })),
  ];

  return pages.map(({ path, priority, changeFrequency }) => ({
    url: absoluteUrl(path),
    changeFrequency,
    priority,
  }));
}
