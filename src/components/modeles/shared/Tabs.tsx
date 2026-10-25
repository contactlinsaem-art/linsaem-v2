"use client";

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { cx, type StateClasses } from "./classes";

type Tab = { label: string; content: ReactNode };

type Props = {
  tabs: Tab[];
  label: string;
  tabClasses: StateClasses;
  listClassName?: string;
};

/** Onglets accessibles (motif ARIA « tabs ») : flèches gauche/droite, Début, Fin. Les panneaux sont rendus côté serveur. */
export function Tabs({ tabs, label, tabClasses, listClassName = "" }: Props) {
  const id = useId();
  const [selected, setSelected] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const focus = (i: number) => {
    const next = (i + tabs.length) % tabs.length;
    setSelected(next);
    refs.current[next]?.focus();
  };

  const onKeyDown = (e: KeyboardEvent) => {
    const keys: Record<string, () => void> = {
      ArrowRight: () => focus(selected + 1),
      ArrowLeft: () => focus(selected - 1),
      Home: () => focus(0),
      End: () => focus(tabs.length - 1),
    };
    const action = keys[e.key];
    if (action) {
      e.preventDefault();
      action();
    }
  };

  return (
    <div>
      <div role="tablist" aria-label={label} className={listClassName} onKeyDown={onKeyDown}>
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`${id}-tab-${i}`}
            aria-selected={selected === i}
            aria-controls={`${id}-panel-${i}`}
            tabIndex={selected === i ? 0 : -1}
            onClick={() => setSelected(i)}
            className={cx(tabClasses, selected === i)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {tabs.map((tab, i) => (
        <div
          key={tab.label}
          role="tabpanel"
          id={`${id}-panel-${i}`}
          aria-labelledby={`${id}-tab-${i}`}
          hidden={selected !== i}
          tabIndex={0}
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
}
