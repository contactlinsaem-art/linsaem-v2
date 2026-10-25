"use client";

import { useState } from "react";

/** Choix d'un créneau (modèle coach) : boutons à état et confirmation activée après sélection. */
export function SlotPicker({ slots }: { slots: Record<string, string[]> }) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div>
      {Object.entries(slots).map(([period, times]) => (
        <div key={period} role="group" aria-labelledby={`creneaux-${period}`} className="mb-8">
          <h3 id={`creneaux-${period}`} className="mb-4 text-sm font-bold tracking-widest text-gray-400 uppercase">
            {period}
          </h3>
          <div className="flex flex-wrap gap-3">
            {times.map((t) => {
              const id = `${period} ${t}`;
              const active = selected === id;
              return (
                <button
                  key={t}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setSelected(active ? null : id)}
                  className={`rounded-xl px-5 py-3 text-sm font-bold transition-colors ${
                    active ? "bg-[#22c55e] text-[#0a0a0a]" : "border border-[#22c55e]/40 bg-[#1a1a1a] text-white hover:border-[#22c55e]"
                  }`}
                >
                  {t}
                </button>
              );
            })}
          </div>
        </div>
      ))}
      <p aria-live="polite" className="sr-only">
        {selected ? `Créneau sélectionné : ${selected}` : ""}
      </p>
      <button
        type="button"
        disabled
        className={`mt-4 w-full cursor-not-allowed rounded-xl py-4 text-lg font-bold ${
          selected ? "bg-[#22c55e] text-[#0a0a0a]" : "border border-gray-600 bg-[#1a1a1a] text-gray-400"
        }`}
      >
        {selected ? `Confirmer le créneau : ${selected}` : "Sélectionnez un créneau"}
      </button>
      <p className="mt-3 text-center text-sm text-gray-400">Démonstration : aucune réservation n&apos;est enregistrée.</p>
    </div>
  );
}
