import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { articlesVisibles, formatDate, getArticle } from "@/content/blog";
import { Container } from "@/components/ui/Container";
import { CtaBand } from "@/components/site/CtaBand";
import { FilAriane } from "@/components/site/FilAriane";
import { BandeauBrouillon } from "@/components/site/BandeauBrouillon";
import { JsonLd } from "@/components/seo/JsonLd";
import { formatPrix, prixMinimum } from "@/content/offres";
import { articleJsonLd, pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return articlesVisibles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  const meta = pageMetadata({
    title: article.titre,
    description: article.description,
    path: `/blog/${article.slug}`,
    noindex: !article.publie,
  });
  return {
    ...meta,
    openGraph: { ...meta.openGraph, type: "article", publishedTime: article.date, modifiedTime: article.miseAJour ?? article.date },
  };
}

export default async function ArticlePage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();
  const { default: Contenu } = await article.contenu();
  const path = `/blog/${article.slug}`;

  return (
    <>
      {!article.publie && <BandeauBrouillon />}
      <JsonLd data={articleJsonLd({ titre: article.titre, description: article.description, path, date: article.date, miseAJour: article.miseAJour })} />

      <article>
        <header className="bg-slate-50 pt-8 pb-14 sm:pb-20">
          <Container className="max-w-3xl">
            <FilAriane
              etapes={[
                { nom: "Blog", path: "/blog" },
                { nom: article.titre, path },
              ]}
            />
            <h1 className="mt-10 text-4xl font-bold tracking-tight text-balance sm:text-5xl">{article.titre}</h1>
            <p className="mt-5 text-lg leading-relaxed text-pretty text-slate-600">{article.description}</p>
            <p className="mt-6 flex flex-wrap gap-x-3 text-sm text-slate-600">
              <span>
                Publié le <time dateTime={article.date}>{formatDate(article.date)}</time>
              </span>
              {article.miseAJour && (
                <span>
                  · Mis à jour le <time dateTime={article.miseAJour}>{formatDate(article.miseAJour)}</time>
                </span>
              )}
              <span>· {article.lecture} min de lecture</span>
            </p>
          </Container>
        </header>
        <Container className="prose-article max-w-3xl py-14 sm:py-20">
          <Contenu />
        </Container>
      </article>

      <CtaBand
        title="Un site pour votre entreprise ?"
        text={`Site vitrine dès ${formatPrix(prixMinimum)} TTC par mois, ou application sur mesure : décrivez votre besoin en quelques lignes.`}
        cta={{ href: "/contact", label: "Décrire mon projet" }}
      />
    </>
  );
}
