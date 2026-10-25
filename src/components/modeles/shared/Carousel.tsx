"use client";

import { useState, type ReactNode } from "react";
import { cx, type StateClasses } from "./classes";

type Props = {
  slides: ReactNode[];
  label: string;
  /** Couleurs des contrôles */
  controlClassName: string;
  dotClasses: StateClasses;
};

/**
 * Carrousel manuel (pas de défilement automatique : WCAG 2.2.2).
 * Région annoncée, boutons Précédent / Suivant et pastilles nommées.
 */
export function Carousel({ slides, label, controlClassName, dotClasses }: Props) {
  const [index, setIndex] = useState(0);
  const go = (i: number) => setIndex((i + slides.length) % slides.length);

  return (
    <section aria-roledescription="carrousel" aria-label={label}>
      <div className="flex items-center gap-4">
        <button type="button" onClick={() => go(index - 1)} className={controlClassName}>
          <span aria-hidden="true">←</span>
          <span className="sr-only">Précédent</span>
        </button>
        <div className="min-w-0 flex-1" aria-live="polite">
          {slides.map((slide, i) => (
            <div
              key={i}
              role="group"
              aria-roledescription="diapositive"
              aria-label={`${i + 1} sur ${slides.length}`}
              hidden={i !== index}
            >
              {slide}
            </div>
          ))}
        </div>
        <button type="button" onClick={() => go(index + 1)} className={controlClassName}>
          <span aria-hidden="true">→</span>
          <span className="sr-only">Suivant</span>
        </button>
      </div>
      <div className="mt-8 flex justify-center gap-1">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => go(i)}
            aria-current={i === index ? "true" : undefined}
            className="grid h-6 min-w-6 place-items-center"
          >
            <span aria-hidden="true" className={cx(dotClasses, i === index)} />
            <span className="sr-only">Afficher la diapositive {i + 1}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
