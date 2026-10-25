import { modeles } from "@/content/modeles";
import { Section } from "@/components/ui/Section";
import { ModeleCard } from "@/components/site/ModeleCard";
import { CtaBand } from "@/components/site/CtaBand";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Modèles de design pour sites vitrines",
  description:
    "Sept modèles de design de sites vitrines : boutique, boulangerie, artisan, architecte, photographe, restaurant et coach. Chaque site est ensuite adapté à votre activité.",
  path: "/modeles",
});

export default function ModelesPage() {
  return (
    <>
      <Section
        as="h1"
        title="Modèles de design"
        intro="Des exemples de styles pour vous projeter. Chaque site est ensuite adapté à votre activité, vos couleurs et vos contenus. Les entreprises présentées sont fictives."
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {modeles.map((m) => (
            <ModeleCard key={m.slug} modele={m} titleAs="h2" />
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
