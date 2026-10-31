import type { ComponentType } from "react";
import { notFound } from "next/navigation";
import { modelesClassiques } from "@/content/modeles";
import { PageModele, modeleMetadata } from "@/components/modeles/PageModele";
import { Vitrine } from "@/components/modeles/Vitrine";
import { Boulangerie } from "@/components/modeles/Boulangerie";
import { Artisan } from "@/components/modeles/Artisan";
import { Architecte } from "@/components/modeles/Architecte";
import { Photographe } from "@/components/modeles/Photographe";
import { Restaurant } from "@/components/modeles/Restaurant";
import { Coach } from "@/components/modeles/Coach";

/**
 * Première collection. Les modèles de la collection actuelle ont chacun leur route (src/app/modeles/<slug>),
 * pour que chaque page ne précharge que ses propres typographies (next/font les rattache à la route).
 */
const composants: Record<string, ComponentType> = {
  vitrine: Vitrine,
  boulangerie: Boulangerie,
  artisan: Artisan,
  architecte: Architecte,
  photographe: Photographe,
  restaurant: Restaurant,
  coach: Coach,
};

export const dynamicParams = false;

export function generateStaticParams() {
  return modelesClassiques.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: PageProps<"/modeles/[slug]">) {
  const { slug } = await params;
  return modeleMetadata(slug);
}

export default async function ModelePage({ params }: PageProps<"/modeles/[slug]">) {
  const { slug } = await params;
  const Modele = composants[slug];
  if (!Modele) notFound();
  return (
    <PageModele slug={slug}>
      <Modele />
    </PageModele>
  );
}
