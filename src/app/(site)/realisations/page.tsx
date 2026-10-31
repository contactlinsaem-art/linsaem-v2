import { applications, sitesClients } from "@/content/realisations";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { RealisationCard } from "@/components/site/RealisationCard";
import { CtaBand } from "@/components/site/CtaBand";
import { FilAriane } from "@/components/site/FilAriane";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Réalisations : sites internet et applications web",
  description:
    "Sites vitrines livrés à des professionnels (ménage, esthétique, sécurité) et applications web développées par LINSAEM : SaaS de recrutement vidéo, jeu multijoueur en temps réel.",
  path: "/realisations",
});

export default function RealisationsPage() {
  return (
    <>
      <Container className="pt-8">
        <FilAriane etapes={[{ nom: "Réalisations", path: "/realisations" }]} />
      </Container>
      <Section
        as="h1"
        className="pt-8! sm:pt-10!"
        title="Réalisations"
        intro="Des sites internet livrés à des professionnels, et des applications web conçues et développées de bout en bout."
      />

      {sitesClients.length > 0 && (
        <Section id="clients" tone="muted" title="Sites clients">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sitesClients.map((r) => (
              <RealisationCard key={r.slug} realisation={r} />
            ))}
          </div>
        </Section>
      )}

      <Section
        id="applications"
        tone={sitesClients.length > 0 ? "white" : "muted"}
        title="Développement d'applications"
        intro="Ce qui peut être construit en développement sur mesure : un SaaS avec paiement en ligne, un jeu multijoueur en temps réel."
      >
        <div className="grid gap-6 md:grid-cols-2">
          {applications.map((r) => (
            <RealisationCard key={r.slug} realisation={r} />
          ))}
        </div>
      </Section>

      <CtaBand
        title="Votre projet pourrait être le prochain"
        text="Site vitrine ou application sur mesure : décrivez votre besoin en quelques lignes."
        cta={{ href: "/contact", label: "Décrire mon projet" }}
      />
    </>
  );
}
