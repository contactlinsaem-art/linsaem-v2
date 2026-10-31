import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { getMetier, metiersVisibles } from "@/content/metiers";
import { getModele } from "@/content/modeles";
import { getRealisation } from "@/content/realisations";
import { formatPrix, formules, prixMinimum } from "@/content/offres";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { ModeleCard } from "@/components/site/ModeleCard";
import { RealisationCard } from "@/components/site/RealisationCard";
import { FaqList } from "@/components/site/FaqList";
import { CtaBand } from "@/components/site/CtaBand";
import { FilAriane } from "@/components/site/FilAriane";
import { BandeauBrouillon } from "@/components/site/BandeauBrouillon";
import { JsonLd } from "@/components/seo/JsonLd";
import { absoluteUrl, faqJsonLd, pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return metiersVisibles.map((m) => ({ metier: m.slug }));
}

export async function generateMetadata({ params }: PageProps<"/creation-site-internet/[metier]">): Promise<Metadata> {
  const { metier: slug } = await params;
  const metier = getMetier(slug);
  if (!metier) return {};
  return pageMetadata({
    title: metier.metaTitre,
    description: metier.metaDescription,
    path: `/creation-site-internet/${metier.slug}`,
    noindex: !metier.publie,
  });
}

export default async function MetierPage({ params }: PageProps<"/creation-site-internet/[metier]">) {
  const { metier: slug } = await params;
  const metier = getMetier(slug);
  if (!metier) notFound();
  const modele = getModele(metier.modele.slug);
  const realisation = metier.realisation ? getRealisation(metier.realisation) : undefined;
  const path = `/creation-site-internet/${metier.slug}`;
  const titre = `Création de site internet pour ${metier.cible}`;

  return (
    <>
      {!metier.publie && <BandeauBrouillon />}
      <JsonLd data={faqJsonLd(metier.faq)} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: titre,
          serviceType: "Création de site internet",
          url: absoluteUrl(path),
          provider: { "@id": `${absoluteUrl("/")}#entreprise` },
          audience: { "@type": "BusinessAudience", name: metier.cible },
          offers: {
            "@type": "AggregateOffer",
            priceCurrency: "EUR",
            lowPrice: prixMinimum.toFixed(2),
            highPrice: Math.max(...formules.map((f) => f.prixMensuelTTC)).toFixed(2),
            offerCount: formules.length,
          },
        }}
      />

      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div aria-hidden="true" className="bg-brand-gradient absolute -top-48 -right-40 size-[32rem] rounded-full opacity-25 blur-3xl" />
        <Container className="relative pt-8 pb-20 sm:pb-24">
          <FilAriane tone="dark" etapes={[{ nom: titre, path }]} />
          <h1 className="mt-12 max-w-3xl text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Création de site internet pour <span className="text-brand-gradient">{metier.cible}</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-pretty text-slate-300">{metier.intro}</p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/contact?type=vitrine" variant="light" size="lg">
              Demander mon site
            </ButtonLink>
            {modele && (
              <ButtonLink href={`/modeles/${modele.slug}`} variant="ghost" size="lg">
                Voir un modèle adapté
              </ButtonLink>
            )}
          </div>
          <p className="mt-6 text-sm text-slate-400">
            Dès {formatPrix(prixMinimum)} TTC par mois, hébergement et maintenance inclus. Offres réservées aux professionnels.
          </p>
        </Container>
      </section>

      <Section id="besoins" title="Ce que votre site doit apporter">
        <div className="grid gap-6 md:grid-cols-3">
          {metier.besoins.map((b, i) => (
            <article key={b.titre} className="reveal rounded-3xl border border-slate-200 p-7">
              <span aria-hidden="true" className="text-sm font-bold text-accent">
                0{i + 1}
              </span>
              <h3 className="mt-3 text-xl font-semibold">{b.titre}</h3>
              <p className="mt-3 leading-relaxed text-slate-700">{b.texte}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section id="fonctionnalites" tone="muted" title="Les fonctionnalités utiles">
        <ul className="grid gap-x-10 gap-y-7 md:grid-cols-2">
          {metier.fonctionnalites.map((f) => (
            <li key={f.titre} className="flex gap-4">
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-accent-soft text-accent">
                <Check aria-hidden="true" size={18} />
              </span>
              <div>
                <h3 className="font-semibold">{f.titre}</h3>
                <p className="mt-1 leading-relaxed text-slate-700">{f.texte}</p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      {(modele || realisation) && (
        <Section id="exemples" title="Pour vous projeter">
          <div className="grid gap-8 lg:grid-cols-2">
            {modele && (
              <div>
                <h3 className="text-sm font-semibold tracking-wider text-slate-600 uppercase">Modèle conseillé</h3>
                <p className="mt-2 mb-5 text-slate-700">{metier.modele.raison}</p>
                <ModeleCard modele={modele} />
              </div>
            )}
            {realisation && (
              <div>
                <h3 className="text-sm font-semibold tracking-wider text-slate-600 uppercase">Réalisation</h3>
                <p className="mt-2 mb-5 text-slate-700">Un site livré dans ce secteur, en ligne aujourd&apos;hui.</p>
                <RealisationCard realisation={realisation} />
              </div>
            )}
          </div>
          <p className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
            <Link href="/modeles" className="inline-flex items-center gap-2 font-semibold text-accent underline-offset-4 hover:underline">
              Tous les modèles <ArrowRight aria-hidden="true" size={18} />
            </Link>
            <Link href="/realisations" className="inline-flex items-center gap-2 font-semibold text-accent underline-offset-4 hover:underline">
              Toutes les réalisations <ArrowRight aria-hidden="true" size={18} />
            </Link>
            <Link href="/sites-vitrines#formules" className="inline-flex items-center gap-2 font-semibold text-accent underline-offset-4 hover:underline">
              Comparer les formules <ArrowRight aria-hidden="true" size={18} />
            </Link>
          </p>
        </Section>
      )}

      <Section id="faq" tone="muted" title="Questions fréquentes">
        <div className="max-w-3xl">
          <FaqList questions={metier.faq} />
        </div>
      </Section>

      <CtaBand
        title="Un site à l'image de votre activité ?"
        text="Décrivez votre activité en quelques lignes : un premier aperçu vous est proposé avant tout paiement."
        cta={{ href: "/contact?type=vitrine", label: "Décrire mon activité" }}
      />
    </>
  );
}
