import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { getRealisation, libelleType, realisationsPubliees } from "@/content/realisations";
import { getMetier } from "@/content/metiers";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { BrowserFrame } from "@/components/site/BrowserFrame";
import { CtaBand } from "@/components/site/CtaBand";
import { FilAriane } from "@/components/site/FilAriane";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return realisationsPubliees.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: PageProps<"/realisations/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const r = getRealisation(slug);
  if (!r) return {};
  return pageMetadata({
    title: r.type === "client" ? `${r.nom} : site internet ${r.secteur.toLowerCase()}` : `${r.nom} : ${r.secteur}`,
    description: r.description,
    path: `/realisations/${r.slug}`,
  });
}

export default async function RealisationPage({ params }: PageProps<"/realisations/[slug]">) {
  const { slug } = await params;
  const r = getRealisation(slug);
  if (!r) notFound();
  const domaine = new URL(r.url).hostname;
  const metier = r.metier ? getMetier(r.metier) : undefined;
  const client = r.type === "client";

  const blocs = [
    { titre: "Contexte", texte: r.detail.contexte },
    { titre: "Besoin", texte: r.detail.besoin },
    { titre: "Solution", texte: r.detail.solution },
  ];

  return (
    <>
      <section className="bg-slate-50 pt-8 pb-16 sm:pb-24">
        <Container>
          <FilAriane
            etapes={[
              { nom: "Réalisations", path: "/realisations" },
              { nom: r.nom, path: `/realisations/${r.slug}` },
            ]}
          />
          <div className="mt-10 grid items-center gap-12 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <div className="flex flex-wrap gap-2">
                <Badge tone={client ? "accent" : "dark"}>{libelleType[r.type]}</Badge>
                <Badge>{r.secteur}</Badge>
              </div>
              <h1 className="mt-5 text-4xl font-bold tracking-tight text-balance sm:text-5xl">{r.nom}</h1>
              <p className="mt-5 text-lg leading-relaxed text-pretty text-slate-600">{r.description}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href={r.url} target="_blank" rel="noopener noreferrer" size="lg" className="whitespace-nowrap">
                  Visiter {domaine} <ArrowUpRight aria-hidden="true" size={18} />
                  <span className="sr-only">(nouvel onglet)</span>
                </ButtonLink>
                <ButtonLink href={client ? "/contact?type=vitrine" : "/contact?type=developpement"} variant="secondary" size="lg" className="whitespace-nowrap">
                  {client ? "Un site comme celui-ci" : "Parler de mon application"}
                </ButtonLink>
              </div>
            </div>
            <BrowserFrame domaine={domaine}>
              <Image
                src={r.apercu}
                alt={`Page d'accueil du site ${domaine}`}
                placeholder="blur"
                priority
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="w-full"
              />
            </BrowserFrame>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-24" aria-labelledby="projet-titre">
        <Container className="grid gap-14 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <h2 id="projet-titre" className="sr-only">
              Le projet
            </h2>
            <div className="space-y-10">
              {blocs.map((b, i) => (
                <div key={b.titre} className="reveal grid gap-3 sm:grid-cols-[3rem_1fr]">
                  <span aria-hidden="true" className="text-sm font-bold text-accent">
                    0{i + 1}
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold">{b.titre}</h3>
                    <p className="mt-2 leading-relaxed text-slate-700">{b.texte}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <aside className="h-fit rounded-3xl bg-slate-950 p-8 text-white">
            <h2 className="text-lg font-semibold">Fonctionnalités</h2>
            <ul className="mt-5 space-y-3">
              {r.detail.fonctionnalites.map((f) => (
                <li key={f} className="flex gap-3 text-slate-200">
                  <Check aria-hidden="true" size={20} className="mt-0.5 shrink-0 text-violet-300" />
                  {f}
                </li>
              ))}
            </ul>
            <a
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-1.5 font-semibold text-violet-200 underline underline-offset-4 hover:text-white"
            >
              {domaine} <ArrowUpRight aria-hidden="true" size={16} />
              <span className="sr-only">(nouvel onglet)</span>
            </a>
          </aside>
        </Container>
      </section>

      <section className="pb-16 sm:pb-24">
        <Container className="flex flex-col gap-4 sm:flex-row">
          {metier && (
            <Link
              href={`/creation-site-internet/${metier.slug}`}
              className="group flex flex-1 items-center justify-between gap-4 rounded-2xl border border-slate-200 p-6 hover:border-accent"
            >
              <span>
                <span className="block text-sm text-slate-600">Votre métier</span>
                <span className="font-semibold">Création de site internet pour {metier.cible}</span>
              </span>
              <ArrowRight aria-hidden="true" className="shrink-0 text-accent transition-transform group-hover:translate-x-1" />
            </Link>
          )}
          <Link
            href={client ? "/modeles" : "/developpement"}
            className="group flex flex-1 items-center justify-between gap-4 rounded-2xl border border-slate-200 p-6 hover:border-accent"
          >
            <span>
              <span className="block text-sm text-slate-600">{client ? "S'inspirer" : "L'offre"}</span>
              <span className="font-semibold">{client ? "Voir les modèles de design" : "Développement sur mesure"}</span>
            </span>
            <ArrowRight aria-hidden="true" className="shrink-0 text-accent transition-transform group-hover:translate-x-1" />
          </Link>
        </Container>
      </section>

      <CtaBand
        title={client ? "Un site pour votre activité ?" : "Une application à construire ?"}
        text={client ? "Décrivez votre activité : un premier aperçu vous est proposé avant tout paiement." : "Premier échange de 30 minutes gratuit pour cadrer votre besoin."}
        cta={{ href: client ? "/contact?type=vitrine" : "/contact?type=developpement", label: "Décrire mon projet" }}
      />
    </>
  );
}
