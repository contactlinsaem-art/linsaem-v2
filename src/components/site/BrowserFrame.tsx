import type { ReactNode } from "react";

/** Cadre de navigateur stylisé autour d'une capture d'écran. */
export function BrowserFrame({ domaine, children, className = "" }: { domaine?: string; children: ReactNode; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg shadow-slate-900/10 ${className}`}>
      <div aria-hidden="true" className="flex items-center gap-2 border-b border-slate-200 bg-slate-50 px-3 py-2">
        <span className="size-2.5 rounded-full bg-slate-300" />
        <span className="size-2.5 rounded-full bg-slate-300" />
        <span className="size-2.5 rounded-full bg-slate-300" />
        {domaine && (
          <span className="ml-2 truncate rounded-md bg-white px-2 py-0.5 text-[11px] text-slate-500 ring-1 ring-slate-200">
            {domaine}
          </span>
        )}
      </div>
      <div className="overflow-hidden">{children}</div>
    </div>
  );
}
