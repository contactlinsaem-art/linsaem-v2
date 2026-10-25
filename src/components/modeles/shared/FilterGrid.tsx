"use client";

import { useState, type ReactNode } from "react";
import { cx, type StateClasses } from "./classes";

type Item = { key: string; category: string; node: ReactNode };

type Props = {
  items: Item[];
  categories: { value: string; label: string }[];
  /** Valeur de la catégorie « tout » */
  all: string;
  label: string;
  buttonClasses: StateClasses;
  listClassName?: string;
  gridClassName: string;
  emptyText?: string;
};

/** Filtre par catégorie : boutons à état (aria-pressed), résultat annoncé, éléments rendus côté serveur. */
export function FilterGrid({ items, categories, all, label, buttonClasses, listClassName = "", gridClassName, emptyText }: Props) {
  const [active, setActive] = useState(all);
  const visible = active === all ? items : items.filter((i) => i.category === active);

  return (
    <div>
      <div role="group" aria-label={label} className={listClassName}>
        {categories.map((c) => (
          <button
            key={c.value}
            type="button"
            aria-pressed={active === c.value}
            onClick={() => setActive(c.value)}
            className={cx(buttonClasses, active === c.value)}
          >
            {c.label}
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        {visible.length} élément{visible.length > 1 ? "s" : ""} affiché{visible.length > 1 ? "s" : ""}
      </p>
      {visible.length > 0 ? (
        <ul className={gridClassName}>
          {visible.map((i) => (
            <li key={i.key} className="break-inside-avoid">
              {i.node}
            </li>
          ))}
        </ul>
      ) : (
        <p className="py-12 text-center italic">{emptyText}</p>
      )}
    </div>
  );
}
