import Link from "next/link";
import type { ReactNode } from "react";

/** Bandeau commun aux modèles : signale clairement qu'il s'agit d'un exemple et ramène vers LINSAEM. */
export default function ModeleLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="relative z-40 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 bg-slate-950 px-4 py-2.5 text-center text-sm text-white">
        <p>
          <strong>Modèle de design LINSAEM</strong>
          <span className="text-slate-300"> — entreprise fictive, contenus d&apos;exemple</span>
        </p>
        <nav aria-label="Retour vers LINSAEM" className="flex gap-4">
          <Link href="/modeles" className="underline underline-offset-4 hover:text-violet-200">
            Tous les modèles
          </Link>
          <Link href="/contact?type=vitrine" className="font-semibold text-violet-200 underline underline-offset-4 hover:text-white">
            Je veux ce style →
          </Link>
        </nav>
      </div>
      <main id="contenu">{children}</main>
    </>
  );
}
