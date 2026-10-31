import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";

type Etape = { nom: string; path: string };

/** Fil d'Ariane visible + BreadcrumbList. La dernière étape est la page courante. */
export function FilAriane({ etapes, tone = "light" }: { etapes: Etape[]; tone?: "light" | "dark" }) {
  const liste = [{ nom: "Accueil", path: "/" }, ...etapes];
  const sombre = tone === "dark";
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(etapes)} />
      <nav aria-label="Fil d'Ariane" className={`text-sm ${sombre ? "text-slate-300" : "text-slate-600"}`}>
        <ol className="flex flex-wrap items-center gap-1.5">
          {liste.map((etape, i) => {
            const courante = i === liste.length - 1;
            return (
              <li key={etape.path} className="flex items-center gap-1.5">
                {i > 0 && <ChevronRight aria-hidden="true" size={14} className="shrink-0 opacity-60" />}
                {courante ? (
                  <span aria-current="page" className={sombre ? "text-white" : "text-slate-900"}>
                    {etape.nom}
                  </span>
                ) : (
                  <Link href={etape.path} className="underline-offset-4 hover:underline">
                    {etape.nom}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
