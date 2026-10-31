import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { processDeveloppement, technologies, typesDeveloppement } from "@/content/offres";
import { applications } from "@/content/realisations";
import { faqDeveloppement } from "@/content/faq";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { ProcessSteps } from "@/components/site/ProcessSteps";
import { RealisationCard } from "@/components/site/RealisationCard";
import { FaqList } from "@/components/site/FaqList";
import { CtaBand } from "@/components/site/CtaBand";
import { JsonLd } from "@/components/seo/JsonLd";
import { FilAriane } from "@/components/site/FilAriane";
import { faqJsonLd, pageMetadata, serviceDeveloppementJsonLd } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Développement web sur mesure : applications, SaaS, intégrations",
  description:
    "Applications web, SaaS, outils temps réel et intégrations (paiement, API, emails), du cadrage à la maintenance. Premier échange gratuit, projets sur devis.",
  path: "/developpement",
});

export default function DeveloppementPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(faqDeveloppement)} />
      <JsonLd data={serviceDeveloppementJsonLd()} />

      <div className="bg-slate-950">
        <Container className="pt-8">
          <FilAriane tone="dark" etapes={[{ nom: "Développement", path: "/developpement" }]} />
        </Container>
      </div>
      <Section
        as="h1"
        className="pt-8! sm:pt-12!"
        tone="dark"
        title="Développement web sur mesure"
        intro="Applications web, SaaS, outils temps réel et intégrations : LINSAEM conçoit et développe des projets adaptés à votre besoin, du cadrage à la maintenance. Chaque projet fait l'objet d'un devis détaillé."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/contact?type=developpement" variant="light" size="lg">
            Parler de mon projet
          </ButtonLink>
          <ButtonLink href="#exemples" variant="ghost" size="lg">
            Voir des exemples
          </ButtonLink>
        </div>
        <p className="mt-6 text-sm text-slate-400">Offres réservées aux professionnels.</p>
      </Section>

      <Section id="types" title="Ce qui peut être développé">
        <ul className="grid gap-6 sm:grid-cols-2">
          {typesDeveloppement.map((t) => (
            <li key={t.titre} className="reveal rounded-2xl border border-slate-200 p-6 sm:p-8">
              <h3 className="text-xl font-semibold">{t.titre}</h3>
              <p className="mt-2 leading-relaxed text-slate-600">{t.texte}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        id="process"
        tone="muted"
        title="Du premier échange à la maintenance"
        intro="Le premier échange de 30 minutes est gratuit et sans engagement."
      >
        <ProcessSteps etapes={processDeveloppement} />
      </Section>

      <Section id="exemples" title="Exemples de projets" intro="Applications conçues et développées de bout en bout.">
        <div className="grid gap-6 md:grid-cols-2">
          {applications.map((p) => (
            <RealisationCard key={p.slug} realisation={p} />
          ))}
        </div>
        <p className="mt-10">
          <Link href="/realisations" className="inline-flex items-center gap-2 font-semibold text-accent underline-offset-4 hover:underline">
            Voir toutes les réalisations <ArrowRight aria-hidden="true" size={18} />
          </Link>
        </p>
      </Section>

      <Section
        id="technologies"
        tone="muted"
        title="Technologies"
        intro="Le choix technique est fait selon le projet, et expliqué dans le devis."
      >
        <ul className="flex flex-wrap gap-3">
          {technologies.map((t) => (
            <li key={t} className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-800">
              {t}
            </li>
          ))}
        </ul>
      </Section>

      <Section id="faq" title="Questions fréquentes">
        <div className="max-w-3xl">
          <FaqList questions={faqDeveloppement} />
        </div>
      </Section>

      <CtaBand
        title="Un projet en tête ?"
        text="Décrivez votre besoin en quelques lignes, même s'il n'est pas encore précis : le premier échange sert justement à le clarifier."
        cta={{ href: "/contact?type=developpement", label: "Parler de mon projet" }}
      />
    </>
  );
}
