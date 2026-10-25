import { ArrowUpRight } from "lucide-react";
import type { Realisation } from "@/content/realisations";
import { Badge } from "@/components/ui/Badge";

export function RealisationCard({ realisation, titleAs: Title = "h3" }: { realisation: Realisation; titleAs?: "h2" | "h3" }) {
  const domaine = new URL(realisation.url).hostname;
  return (
    <article className="reveal relative flex flex-col rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
      <div className="flex flex-wrap items-center gap-2">
        <Badge tone={realisation.type === "produit" ? "dark" : "accent"}>
          {realisation.type === "produit" ? "Projet interne LINSAEM" : "Site client"}
        </Badge>
        {realisation.points?.map((p) => (
          <Badge key={p}>{p}</Badge>
        ))}
      </div>
      <Title className="mt-4 text-xl font-semibold">
        <a
          href={realisation.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 after:absolute after:inset-0 hover:text-accent"
        >
          {realisation.nom}
          <ArrowUpRight aria-hidden="true" size={18} />
          <span className="sr-only">(ouvre {domaine} dans un nouvel onglet)</span>
        </a>
      </Title>
      <p className="mt-1 text-sm text-slate-600">{domaine}</p>
      <p className="mt-4 leading-relaxed text-slate-700">{realisation.description}</p>
    </article>
  );
}
