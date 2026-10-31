"use client";

import { useEffect, useRef, useState } from "react";

type Props = { value: number; decimals?: number; prefix?: string; suffix?: string };

/**
 * Chiffre animé de 0 à `value` à sa première apparition.
 * Le HTML initial contient la valeur finale (sans JavaScript, lecteurs d'écran, moteurs de recherche).
 */
export function Counter({ value, decimals = 0, prefix = "", suffix = "" }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const duration = 1500;
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          setDisplay(value * (1 - Math.pow(1 - p, 3)));
          if (p < 1) frame = requestAnimationFrame(tick);
        };
        setDisplay(0);
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  const formatted = display.toLocaleString("fr-FR", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  const final = value.toLocaleString("fr-FR", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

  return (
    <span ref={ref}>
      <span aria-hidden="true">
        {prefix}
        {formatted}
        {suffix}
      </span>
      <span className="sr-only">
        {prefix}
        {final}
        {suffix}
      </span>
    </span>
  );
}
