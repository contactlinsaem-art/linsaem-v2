import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { articlesPublies, articlesVisibles, formatDate } from "@/content/blog";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { CtaBand } from "@/components/site/CtaBand";
import { FilAriane } from "@/components/site/FilAriane";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Blog : conseils pour le site internet de votre entreprise",
  description:
    "Prix d'un site internet, choix entre site et réseaux sociaux, mentions obligatoires : des conseils concrets pour les artisans, commerçants et indépendants.",
  path: "/blog",
  // Pas d'indexation tant qu'aucun article n'est publié.
  noindex: articlesPublies.length === 0,
});

export default function BlogPage() {
  return (
    <>
      <Container className="pt-8">
        <FilAriane etapes={[{ nom: "Blog", path: "/blog" }]} />
      </Container>
      <Section
        as="h1"
        className="pt-8! sm:pt-10!"
        title="Blog"
        intro="Des conseils concrets pour créer, faire évoluer et faire connaître le site internet de votre entreprise."
      >
        {articlesVisibles.length > 0 ? (
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articlesVisibles.map((a) => (
              <li key={a.slug}>
                <article className="group reveal relative flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-7 transition-shadow hover:shadow-xl hover:shadow-slate-900/5">
                  <div className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
                    {!a.publie && <Badge tone="accent">Brouillon</Badge>}
                    <time dateTime={a.date}>{formatDate(a.date)}</time>
                    <span aria-hidden="true">·</span>
                    <span>{a.lecture} min de lecture</span>
                  </div>
                  <h2 className="mt-4 text-xl font-semibold text-balance">
                    <Link href={`/blog/${a.slug}`} className="after:absolute after:inset-0">
                      {a.titre}
                    </Link>
                  </h2>
                  <p className="mt-3 flex-1 leading-relaxed text-slate-600">{a.description}</p>
                  <p aria-hidden="true" className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                    Lire l&apos;article <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </p>
                </article>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-slate-600">Les premiers articles arrivent bientôt.</p>
        )}
      </Section>

      <CtaBand
        title="Besoin d'un site pour votre activité ?"
        text="Décrivez votre projet en quelques lignes : un premier aperçu vous est proposé avant tout paiement."
        cta={{ href: "/contact", label: "Décrire mon projet" }}
      />
    </>
  );
}
