import type { Etape } from "@/content/offres";

export function ProcessSteps({ etapes, tone = "light" }: { etapes: Etape[]; tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {etapes.map((etape, i) => (
        <li
          key={etape.titre}
          className={`reveal rounded-2xl p-6 ${dark ? "bg-white/5 ring-1 ring-white/10" : "border border-slate-200 bg-white"}`}
        >
          <span
            aria-hidden="true"
            className="bg-brand-gradient grid size-10 place-items-center rounded-full text-sm font-bold text-white"
          >
            {i + 1}
          </span>
          <h3 className="mt-4 text-lg font-semibold">
            <span className="sr-only">Étape {i + 1} : </span>
            {etape.titre}
          </h3>
          <p className={`mt-2 leading-relaxed ${dark ? "text-slate-300" : "text-slate-600"}`}>{etape.texte}</p>
        </li>
      ))}
    </ol>
  );
}
