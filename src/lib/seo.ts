import type { Metadata } from "next";
import type { StaticImageData } from "next/image";
import { entreprise } from "@/content/entreprise";
import { formules } from "@/content/offres";
import type { QuestionReponse } from "@/content/faq";
import { ACCROCHE, tailleImagePartage } from "@/lib/partage";

export function absoluteUrl(path: string): string {
  return new URL(path, entreprise.url).toString();
}

/** Image de partage (og:image et twitter:image), toujours en URL absolue. */
export type ImagePartage = { url: string; width: number; height: number; alt: string };

/** Image générale : accueil et pages générales (src/app/og.png). */
export const imageGenerale: ImagePartage = {
  url: absoluteUrl("/og.png"),
  ...tailleImagePartage,
  alt: `${entreprise.nom}, agence de création web : ${ACCROCHE.toLowerCase()}`,
};

/** Image générale avec le titre de la page (pages métiers et articles, src/app/og/…). */
export function imageAvecTitre(path: string, titre: string): ImagePartage {
  return { url: absoluteUrl(`/og${path}.png`), ...tailleImagePartage, alt: titre };
}

/** Capture d'écran (réalisations, modèles). */
export function imageCapture(capture: StaticImageData, alt: string): ImagePartage {
  return { url: absoluteUrl(capture.src), width: capture.width, height: capture.height, alt };
}

type PageSeo = {
  title: string;
  description: string;
  /** Chemin canonique, ex. "/sites-vitrines" */
  path: string;
  /** Titre complet, sans le suffixe « | LINSAEM » */
  absoluteTitle?: boolean;
  noindex?: boolean;
  /** Image de partage ; image générale par défaut. */
  image?: ImagePartage;
};

/**
 * Metadata d'une page : titre, description, canonical, Open Graph et Twitter cohérents.
 * L'image est déclarée ici et non dans le layout : un `openGraph` défini par une page remplace
 * entièrement celui du layout (fusion superficielle), image comprise.
 */
export function pageMetadata({ title, description, path, absoluteTitle, noindex, image = imageGenerale }: PageSeo): Metadata {
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "fr_FR",
      siteName: entreprise.nom,
      title,
      description,
      url: path,
      images: [image],
    },
    twitter: { card: "summary_large_image", title, description, images: [{ url: image.url, alt: image.alt }] },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

const entrepriseId = `${entreprise.url}/#entreprise`;

export function professionalServiceJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": entrepriseId,
    name: entreprise.nom,
    legalName: `${entreprise.legal.raisonSociale} ${entreprise.legal.formeSociale}`,
    url: entreprise.url,
    logo: absoluteUrl("/logo.png"),
    image: imageGenerale.url,
    email: entreprise.email,
    telephone: entreprise.telephone.lien,
    address: {
      "@type": "PostalAddress",
      postalCode: entreprise.ville.codePostal,
      addressLocality: entreprise.ville.nom,
      addressCountry: "FR",
    },
    areaServed: { "@type": "Country", name: entreprise.zone },
    priceRange: "€",
    description:
      "Agence de création web : sites internet professionnels par abonnement et développement d'applications web sur mesure.",
    makesOffer: [
      { "@type": "Offer", itemOffered: { "@id": `${absoluteUrl("/sites-vitrines")}#service` } },
      { "@type": "Offer", itemOffered: { "@id": `${absoluteUrl("/developpement")}#service` } },
    ],
  };
}

/** Service « site vitrine » avec une offre par formule (page /sites-vitrines). */
export function serviceVitrineJsonLd() {
  const url = absoluteUrl("/sites-vitrines");
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: "Création de site internet professionnel par abonnement",
    serviceType: "Création de site internet",
    url,
    provider: { "@id": entrepriseId },
    areaServed: { "@type": "Country", name: entreprise.zone },
    audience: { "@type": "BusinessAudience", name: "Professionnels" },
    offers: formules.map((f) => ({
      "@type": "Offer",
      name: `Formule ${f.nom}`,
      url: `${url}#formules`,
      priceCurrency: "EUR",
      price: f.prixMensuelTTC.toFixed(2),
      priceSpecification: [
        {
          "@type": "UnitPriceSpecification",
          price: f.prixMensuelTTC.toFixed(2),
          priceCurrency: "EUR",
          unitCode: "MON",
          valueAddedTaxIncluded: true,
        },
        {
          "@type": "UnitPriceSpecification",
          name: "Frais de mise en service",
          price: f.fraisMiseEnServiceTTC.toFixed(2),
          priceCurrency: "EUR",
          valueAddedTaxIncluded: true,
        },
      ],
    })),
  };
}

/** Service « développement sur mesure », sur devis (page /developpement). */
export function serviceDeveloppementJsonLd() {
  const url = absoluteUrl("/developpement");
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: "Développement d'applications web sur mesure",
    serviceType: "Développement web",
    url,
    provider: { "@id": entrepriseId },
    areaServed: { "@type": "Country", name: entreprise.zone },
    audience: { "@type": "BusinessAudience", name: "Professionnels" },
    offers: { "@type": "Offer", url: `${url}#process`, description: "Sur devis, premier échange de 30 minutes gratuit" },
  };
}

/** Fil d'Ariane : l'accueil est ajouté automatiquement en premier. */
export function breadcrumbJsonLd(items: { nom: string; path: string }[]) {
  const liste = [{ nom: "Accueil", path: "/" }, ...items];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: liste.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.nom,
      item: absoluteUrl(item.path),
    })),
  };
}

export function articleJsonLd(article: { titre: string; description: string; path: string; date: string; miseAJour?: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.titre,
    description: article.description,
    url: absoluteUrl(article.path),
    mainEntityOfPage: absoluteUrl(article.path),
    datePublished: article.date,
    dateModified: article.miseAJour ?? article.date,
    inLanguage: "fr-FR",
    image: absoluteUrl(`/og${article.path}.png`),
    author: { "@type": "Organization", "@id": entrepriseId, name: entreprise.nom, url: entreprise.url },
    publisher: { "@type": "Organization", "@id": entrepriseId, name: entreprise.nom, logo: absoluteUrl("/logo.png") },
  };
}

export function faqJsonLd(questions: QuestionReponse[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: { "@type": "Answer", text: q.reponse },
    })),
  };
}
