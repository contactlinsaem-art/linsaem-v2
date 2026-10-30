import { produits, sitesClients } from "@/content/realisations";
import { Section } from "@/components/ui/Section";
import { RealisationCard } from "@/components/site/RealisationCard";
import { CtaBand } from "@/components/site/CtaBand";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Réalisations : sites livrés et produits LINSAEM",
  description:
    "Sites vitrines livrés à des clients et produits développés par LINSAEM : une plateforme SaaS d'entretien vidéo et un jeu multijoueur en temps réel.",
  path: "/realisations",
});

export default function RealisationsPage() {
  return (
    <>
      <Section
        as="h1"
        title="Réalisations"
        intro="Des sites livrés à des clients, et des produits conçus, développés et exploités par LINSAEM."
      />

      {sitesClients.length > 0 && (
        <Section id="clients" tone="muted" title="Sites clients">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sitesClients.map((r) => (
              <RealisationCard key={r.url} realisation={r} />
            ))}
          </div>
        </Section>
      )}

      <Section
        id="produits"
        tone={sitesClients.length > 0 ? "white" : "muted"}
        title="Produits LINSAEM"
        intro="Projets internes : ils montrent ce qui peut être construit en développement sur mesure."
      >
        <div className="grid gap-6 md:grid-cols-2">
          {produits.map((r) => (
            <RealisationCard key={r.url} realisation={r} />
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
