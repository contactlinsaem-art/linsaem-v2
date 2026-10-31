import type { MDXContent } from "mdx/types";
import { estVisible } from "@/lib/brouillons";

export type Article = {
  slug: string;
  titre: string;
  /** Meta description et chapeau de la liste. */
  description: string;
  /** Date de publication, AAAA-MM-JJ. */
  date: string;
  miseAJour?: string;
  /** Temps de lecture en minutes. */
  lecture: number;
  /** Brouillon tant que false : visible en local et en preview seulement. */
  publie: boolean;
  contenu: () => Promise<{ default: MDXContent }>;
};

export const articles: Article[] = [
  {
    slug: "prix-site-internet-artisan",
    titre: "Combien coûte un site internet pour un artisan ?",
    description:
      "Constructeur de site, création au forfait ou abonnement : ce que coûte vraiment un site internet d'artisan sur trois ans, et ce que le prix doit inclure.",
    date: "2026-10-31",
    lecture: 6,
    publie: false,
    contenu: () => import("./prix-site-internet-artisan.mdx"),
  },
  {
    slug: "site-internet-ou-page-facebook",
    titre: "Site internet ou page Facebook : que choisir pour son entreprise ?",
    description:
      "Une page Facebook est gratuite et rapide à créer, un site internet vous appartient et se trouve sur Google. Forces, limites et complémentarité des deux.",
    date: "2026-10-31",
    lecture: 5,
    publie: false,
    contenu: () => import("./site-internet-ou-page-facebook.mdx"),
  },
  {
    slug: "mentions-obligatoires-site-entreprise",
    titre: "Mentions obligatoires sur le site internet d'une entreprise",
    description:
      "Identité de l'entreprise, hébergeur, directeur de la publication, données personnelles, cookies, CGV : la liste des mentions à faire figurer sur un site professionnel.",
    date: "2026-10-31",
    lecture: 7,
    publie: false,
    contenu: () => import("./mentions-obligatoires-site-entreprise.mdx"),
  },
];

/** Du plus récent au plus ancien. */
export const articlesVisibles = articles.filter(estVisible).sort((a, b) => b.date.localeCompare(a.date));
export const articlesPublies = articlesVisibles.filter((a) => a.publie);

export function getArticle(slug: string): Article | undefined {
  return articlesVisibles.find((a) => a.slug === slug);
}

export function formatDate(date: string): string {
  return new Date(`${date}T12:00:00Z`).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}
