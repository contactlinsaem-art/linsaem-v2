import type { Metadata } from "next";
import type { ReactNode } from "react";
import { getModele } from "@/content/modeles";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, imageCapture, pageMetadata } from "@/lib/seo";

/** Metadata d'une page de modèle. */
export function modeleMetadata(slug: string): Metadata {
  const modele = getModele(slug);
  if (!modele) return {};
  return pageMetadata({
    title: `Modèle de site ${modele.secteur.toLowerCase()} : ${modele.nom}`,
    description: `${modele.description} Modèle de design LINSAEM, adaptable à votre activité.`,
    path: `/modeles/${modele.slug}`,
    image: imageCapture(modele.apercu, `Page d'accueil du modèle ${modele.nom}`),
  });
}

/** Enveloppe commune : fil d'Ariane en données structurées. */
export function PageModele({ slug, children }: { slug: string; children: ReactNode }) {
  const modele = getModele(slug);
  return (
    <>
      {modele && (
        <JsonLd
          data={breadcrumbJsonLd([
            { nom: "Modèles", path: "/modeles" },
            { nom: modele.nom, path: `/modeles/${modele.slug}` },
          ])}
        />
      )}
      {children}
    </>
  );
}
