import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { formules, formatPrix, prixMinimum, processVitrine, processDeveloppement, typesDeveloppement } from "@/content/offres";
import { modeles } from "@/content/modeles";
import { realisationsPubliees } from "@/content/realisations";
import { faqAccueil } from "@/content/faq";
import { entreprise } from "@/content/entreprise";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { FormuleCard } from "@/components/site/FormuleCard";
import { ModeleCard } from "@/components/site/ModeleCard";
import { RealisationCard } from "@/components/site/RealisationCard";
import { FaqList } from "@/components/site/FaqList";
import { CtaBand } from "@/components/site/CtaBand";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqJsonLd, pageMetadata, professionalServiceJsonLd } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "LINSAEM — Sites vitrines par abonnement et développement web sur mesure",
  absoluteTitle: true,
  description: `Site vitrine professionnel hébergé et maintenu dès ${formatPrix(prixMinimum)} TTC par mois, ou application web conçue pour votre besoin, sur devis : SaaS, temps réel, intégrations.`,
  path: "/",
});

export default function AccueilPage() {
  return (
    <>
      <JsonLd data={professionalServiceJsonLd()} />
      <JsonLd data={faqJsonLd(faqAccueil)} />

      {/* Hero */}
      <section aria-labelledby="hero-titre" className="relative overflow-hidden bg-slate-950 text-white">
        <div aria-hidden="true" className="bg-brand-gradient absolute -top-40 -right-40 size-[36rem] rounded-full opacity-30 blur-3xl" />
        <div aria-hidden="true" className="bg-brand-gradient absolute -bottom-56 -left-40 size-[30rem] rounded-full opacity-20 blur-3xl" />
        <Container className="relative py-20 sm:py-28 lg:py-32">
          <h1 id="hero-titre" className="max-w-3xl text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Sites vitrines par abonnement et <span className="text-brand-gradient">développement web sur mesure</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-pretty text-slate-300 sm:text-xl">
            Un site professionnel hébergé et maintenu dès {formatPrix(prixMinimum)} TTC par mois, ou une application
            conçue pour votre besoin, sur devis.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/sites-vitrines" variant="light" size="lg">
              Voir les sites vitrines
            </ButtonLink>
            <ButtonLink href="/developpement" variant="ghost" size="lg">
              Parler d&apos;un projet sur mesure
            </ButtonLink>
          </div>
        </Container>
      </section>

      {/* Les deux offres */}
      <Section id="offres" eyebrow="Deux offres" title="Un site pour être trouvé, ou une application pour travailler">
        <div className="grid gap-6 lg:grid-cols-2">
          <article className="reveal flex flex-col rounded-3xl border border-slate-200 bg-white p-8">
            <h3 className="text-2xl font-semibold">Sites vitrines</h3>
            <p className="mt-2 text-slate-600">Présenter votre activité, vos services et vos coordonnées.</p>
            <ul className="mt-6 space-y-3">
              {["Design adapté à votre activité", "Hébergement, nom de domaine et maintenance inclus", "Sans engagement de durée"].map(
                (point) => (
                  <li key={point} className="flex gap-3 text-slate-700">
                    <Check aria-hidden="true" size={20} className="mt-0.5 shrink-0 text-accent" />
                    {point}
                  </li>
                ),
              )}
            </ul>
            <p className="mt-8 text-lg">
              Dès <strong className="text-2xl">{formatPrix(prixMinimum)}</strong> TTC / mois
            </p>
            <Link
              href="/sites-vitrines"
              className="mt-6 inline-flex items-center gap-2 font-semibold text-accent underline-offset-4 hover:underline"
            >
              Découvrir les formules <ArrowRight aria-hidden="true" size={18} />
            </Link>
          </article>

          <article className="reveal flex flex-col rounded-3xl bg-slate-950 p-8 text-white">
            <h3 className="text-2xl font-semibold">Développement sur mesure</h3>
            <p className="mt-2 text-slate-300">Des fonctionnalités propres à votre activité.</p>
            <ul className="mt-6 space-y-3">
              {typesDeveloppement.map((t) => (
                <li key={t.titre} className="flex gap-3 text-slate-100">
                  <Check aria-hidden="true" size={20} className="mt-0.5 shrink-0 text-violet-300" />
                  {t.titre}
                </li>
              ))}
            </ul>
            <p className="mt-8 text-lg">
              <strong className="text-2xl">Sur devis</strong>, premier échange gratuit
            </p>
            <Link
              href="/developpement"
              className="mt-6 inline-flex items-center gap-2 font-semibold text-violet-200 underline-offset-4 hover:underline"
            >
              Découvrir l&apos;offre <ArrowRight aria-hidden="true" size={18} />
            </Link>
          </article>
        </div>
      </Section>

      {/* Formules */}
      <Section
        id="formules"
        tone="muted"
        eyebrow="Sites vitrines"
        title="Trois formules, tout compris"
        intro="Sans engagement : résiliable à tout moment avec un mois de préavis."
      >
        <div className="grid gap-6 pt-4 lg:grid-cols-3">
          {formules.map((f) => (
            <FormuleCard key={f.id} formule={f} compact />
          ))}
        </div>
        <p className="mt-10 text-center">
          <Link href="/sites-vitrines" className="inline-flex items-center gap-2 font-semibold text-accent underline-offset-4 hover:underline">
            Comparer les formules en détail <ArrowRight aria-hidden="true" size={18} />
          </Link>
        </p>
      </Section>

      {/* Modèles */}
      <Section
        id="modeles"
        eyebrow="Modèles de design"
        title="Des exemples de styles"
        intro="Chaque site est ensuite adapté à votre activité. Les entreprises présentées sont fictives."
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {modeles.slice(0, 6).map((m) => (
            <ModeleCard key={m.slug} modele={m} />
          ))}
        </div>
        <p className="mt-10 text-center">
          <ButtonLink href="/modeles" variant="secondary">
            Voir les {modeles.length} modèles
          </ButtonLink>
        </p>
      </Section>

      {/* Réalisations */}
      {realisationsPubliees.length > 0 && (
        <Section id="realisations" tone="muted" eyebrow="Réalisations" title="Sites livrés et produits LINSAEM">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {realisationsPubliees.map((r) => (
              <RealisationCard key={r.url} realisation={r} />
            ))}
          </div>
          <p className="mt-10 text-center">
            <Link href="/realisations" className="inline-flex items-center gap-2 font-semibold text-accent underline-offset-4 hover:underline">
              Toutes les réalisations <ArrowRight aria-hidden="true" size={18} />
            </Link>
          </p>
        </Section>
      )}

      {/* Comment ça se passe */}
      <Section id="process" eyebrow="Comment ça se passe" title="Deux parcours simples">
        <div className="grid gap-10 lg:grid-cols-2">
          {[
            { titre: "Site vitrine", etapes: processVitrine },
            { titre: "Développement sur mesure", etapes: processDeveloppement },
          ].map((parcours) => (
            <div key={parcours.titre}>
              <h3 className="text-xl font-semibold">{parcours.titre}</h3>
              <ol className="mt-6 space-y-5">
                {parcours.etapes.map((e, i) => (
                  <li key={e.titre} className="flex gap-4">
                    <span
                      aria-hidden="true"
                      className="grid size-8 shrink-0 place-items-center rounded-full bg-accent-soft text-sm font-bold text-accent"
                    >
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-semibold">{e.titre}</p>
                      <p className="mt-1 text-slate-600">{e.texte}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section id="faq" tone="muted" eyebrow="FAQ" title="Questions fréquentes">
        <div className="max-w-3xl">
          <FaqList questions={faqAccueil} />
        </div>
      </Section>

      <CtaBand
        title="Un projet en tête ?"
        text={`Décrivez-le en quelques lignes : une réponse vous est apportée sous ${entreprise.delais.reponse}.`}
        cta={{ href: "/contact", label: "Décrire mon projet" }}
      />
    </>
  );
}
