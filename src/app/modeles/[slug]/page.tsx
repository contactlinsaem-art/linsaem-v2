import type { Metadata } from "next";
import type { ComponentType } from "react";
import { notFound } from "next/navigation";
import { getModele, modeles } from "@/content/modeles";
import { pageMetadata } from "@/lib/seo";
import { Vitrine } from "@/components/modeles/Vitrine";
import { Boulangerie } from "@/components/modeles/Boulangerie";
import { Artisan } from "@/components/modeles/Artisan";
import { Architecte } from "@/components/modeles/Architecte";
import { Photographe } from "@/components/modeles/Photographe";
import { Restaurant } from "@/components/modeles/Restaurant";
import { Coach } from "@/components/modeles/Coach";

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
  return modeles.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: PageProps<"/modeles/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const modele = getModele(slug);
  if (!modele) return {};
  return pageMetadata({
    title: `Modèle de site ${modele.secteur.toLowerCase()} : ${modele.nom}`,
    description: `${modele.description} Modèle de design LINSAEM, adaptable à votre activité.`,
    path: `/modeles/${modele.slug}`,
  });
}

export default async function ModelePage({ params }: PageProps<"/modeles/[slug]">) {
  const { slug } = await params;
  const Modele = composants[slug];
  if (!Modele) notFound();
  return <Modele />;
}
