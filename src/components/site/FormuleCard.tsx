import { Check } from "lucide-react";
import { formatPrix, type Formule } from "@/content/offres";
import { ButtonLink } from "@/components/ui/Button";

type Props = {
  formule: Formule;
  /** Version courte (accueil) : seules les premières caractéristiques sont listées. */
  compact?: boolean;
  titleAs?: "h2" | "h3";
};

export function FormuleCard({ formule, compact, titleAs: Title = "h3" }: Props) {
  const featured = formule.miseEnAvant;
  const items = compact ? formule.caracteristiques.slice(0, 3) : formule.caracteristiques;

  return (
    <article
      className={`relative flex flex-col rounded-3xl p-7 sm:p-8 ${
        featured ? "bg-slate-950 text-white shadow-xl ring-1 ring-slate-950" : "border border-slate-200 bg-white"
      }`}
    >
      {featured && (
        <p className="bg-brand-gradient absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-xs font-bold whitespace-nowrap text-white">
          Formule la plus choisie
        </p>
      )}

      <Title className="text-lg font-semibold">{formule.nom}</Title>
      <p className={`mt-1 text-sm ${featured ? "text-slate-300" : "text-slate-600"}`}>{formule.accroche}</p>

      <p className="mt-6 flex items-baseline gap-1.5">
        <span className="text-4xl font-bold tracking-tight">{formatPrix(formule.prixMensuelTTC)}</span>
        <span className={`text-sm ${featured ? "text-slate-300" : "text-slate-600"}`}>TTC / mois</span>
      </p>
      <p className={`mt-2 text-sm ${featured ? "text-slate-300" : "text-slate-600"}`}>
        + {formatPrix(formule.fraisMiseEnServiceTTC)} TTC de mise en service, une seule fois
      </p>

      <ul className="mt-6 space-y-3 text-sm">
        {items.map((c) => (
          <li key={c} className="flex gap-3">
            <Check aria-hidden="true" size={18} className={`mt-0.5 shrink-0 ${featured ? "text-violet-300" : "text-accent"}`} />
            <span className={featured ? "text-slate-100" : "text-slate-700"}>{c}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-8">
        <ButtonLink
          href={`/contact?type=vitrine&formule=${formule.id}`}
          variant={featured ? "light" : "primary"}
          className="w-full"
        >
          Choisir {formule.nom}
        </ButtonLink>
      </div>
    </article>
  );
}
