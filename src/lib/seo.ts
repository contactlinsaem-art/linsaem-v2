import type { Metadata } from "next";
import { entreprise } from "@/content/entreprise";
import { formules } from "@/content/offres";
import type { QuestionReponse } from "@/content/faq";

type PageSeo = {
  title: string;
  description: string;
  /** Chemin canonique, ex. "/sites-vitrines" */
  path: string;
  /** Titre complet, sans le suffixe « | LINSAEM » */
  absoluteTitle?: boolean;
  noindex?: boolean;
};

/** Metadata d'une page : titre, description, canonical et Open Graph cohérents. */
export function pageMetadata({ title, description, path, absoluteTitle, noindex }: PageSeo): Metadata {
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

export function absoluteUrl(path: string): string {
  return new URL(path, entreprise.url).toString();
}

export function professionalServiceJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${entreprise.url}/#entreprise`,
    name: entreprise.nom,
    url: entreprise.url,
    logo: absoluteUrl("/logo.png"),
    image: absoluteUrl("/opengraph-image"),
    email: entreprise.email,
    telephone: entreprise.telephone.lien,
    areaServed: { "@type": "Country", name: entreprise.zone },
    description:
      "Sites vitrines par abonnement et développement web sur mesure : applications web, SaaS, applications temps réel et intégrations.",
    makesOffer: [
      ...formules.map((f) => ({
        "@type": "Offer",
        name: `Site vitrine ${f.nom}`,
        url: absoluteUrl("/sites-vitrines"),
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: f.prixMensuelTTC.toFixed(2),
          priceCurrency: "EUR",
          unitCode: "MON",
          valueAddedTaxIncluded: true,
        },
      })),
      {
        "@type": "Offer",
        name: "Développement web sur mesure",
        url: absoluteUrl("/developpement"),
        description: "Sur devis",
      },
    ],
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
