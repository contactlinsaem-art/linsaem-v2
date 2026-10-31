import type { MetadataRoute } from "next";
import { tousLesModeles } from "@/content/modeles";
import { realisationsPubliees } from "@/content/realisations";
import { metiersPublies } from "@/content/metiers";
import { articlesPublies } from "@/content/blog";
import { absoluteUrl } from "@/lib/seo";

type Page = { path: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly"; lastModified?: string };

/** Pages indexables uniquement : ni pages légales, ni /merci, ni brouillons. */
export default function sitemap(): MetadataRoute.Sitemap {
  const pages: Page[] = [
    { path: "/", priority: 1, changeFrequency: "monthly" },
    { path: "/sites-vitrines", priority: 0.9, changeFrequency: "monthly" },
    { path: "/developpement", priority: 0.9, changeFrequency: "monthly" },
    ...metiersPublies.map((m) => ({ path: `/creation-site-internet/${m.slug}`, priority: 0.8, changeFrequency: "monthly" as const })),
    { path: "/realisations", priority: 0.7, changeFrequency: "monthly" },
    ...realisationsPubliees.map((r) => ({ path: `/realisations/${r.slug}`, priority: 0.6, changeFrequency: "yearly" as const })),
    { path: "/modeles", priority: 0.6, changeFrequency: "monthly" },
    ...tousLesModeles.map((m) => ({ path: `/modeles/${m.slug}`, priority: 0.4, changeFrequency: "yearly" as const })),
    ...(articlesPublies.length > 0 ? [{ path: "/blog", priority: 0.6, changeFrequency: "weekly" as const }] : []),
    ...articlesPublies.map((a) => ({
      path: `/blog/${a.slug}`,
      priority: 0.6,
      changeFrequency: "yearly" as const,
      lastModified: a.miseAJour ?? a.date,
    })),
    { path: "/contact", priority: 0.6, changeFrequency: "yearly" },
  ];

  return pages.map(({ path, priority, changeFrequency, lastModified }) => ({
    url: absoluteUrl(path),
    changeFrequency,
    priority,
    ...(lastModified ? { lastModified } : {}),
  }));
}
