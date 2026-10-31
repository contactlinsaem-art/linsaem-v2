import { modeles, modelesClassiques } from "@/content/modeles";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ModeleCard } from "@/components/site/ModeleCard";
import { CtaBand } from "@/components/site/CtaBand";
import { FilAriane } from "@/components/site/FilAriane";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Modèles de design de sites internet par métier",
  description:
    "Modèles de sites internet pour boutique, boulangerie, artisan, architecte, photographe, restaurant et coach : chacun avec sa palette, ses typographies et sa mise en page. Chaque site est ensuite adapté à votre activité.",
  path: "/modeles",
});

export default function ModelesPage() {
  return (
    <>
      <Container className="pt-8">
        <FilAriane etapes={[{ nom: "Modèles", path: "/modeles" }]} />
      </Container>
      <Section
        as="h1"
        className="pt-8! sm:pt-10!"
        title="Modèles de design"
        intro="Des exemples de styles pour vous projeter. Chaque site est ensuite adapté à votre activité, vos couleurs et vos contenus. Les entreprises présentées sont fictives."
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {modeles.map((m) => (
            <ModeleCard key={m.slug} modele={m} titleAs="h2" />
          ))}
        </div>
      </Section>

      <Section
        id="premiere-collection"
        tone="muted"
        title="Première collection"
        intro="Les modèles d'origine, toujours consultables."
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {modelesClassiques.map((m) => (
            <ModeleCard key={m.slug} modele={m} />
          ))}
        </div>
      </Section>

      <CtaBand
        title="Un style vous plaît ?"
        text="Indiquez-le dans votre demande : il servira de point de départ à votre site."
        cta={{ href: "/contact?type=vitrine", label: "Demander mon site" }}
      />
    </>
  );
}
