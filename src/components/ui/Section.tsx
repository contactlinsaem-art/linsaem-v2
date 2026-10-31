import type { ReactNode } from "react";
import { Container } from "./Container";

type SectionProps = {
  id?: string;
  eyebrow?: string;
  title?: string;
  intro?: ReactNode;
  /** Niveau du titre : h2 par défaut, h1 pour l'en-tête d'une page. */
  as?: "h1" | "h2";
  tone?: "white" | "muted" | "dark";
  align?: "left" | "center";
  children?: ReactNode;
  className?: string;
};

const tones = {
  white: "bg-white",
  muted: "bg-slate-50",
  dark: "bg-slate-950 text-white",
};

export function Section({
  id,
  eyebrow,
  title,
  intro,
  as: Heading = "h2",
  tone = "white",
  align = "left",
  children,
  className = "",
}: SectionProps) {
  const dark = tone === "dark";
  const headingId = id ? `${id}-titre` : undefined;
  return (
    <section id={id} aria-labelledby={title ? headingId : undefined} className={`py-16 sm:py-24 ${tones[tone]} ${className}`}>
      <Container>
        {(eyebrow || title || intro) && (
          <header className={`mb-10 max-w-2xl sm:mb-14 ${align === "center" ? "mx-auto text-center" : ""}`}>
            {eyebrow && (
              <p className={`mb-3 text-sm font-semibold uppercase tracking-wider ${dark ? "text-violet-300" : "text-accent"}`}>
                {eyebrow}
              </p>
            )}
            {title && (
              <Heading
                id={headingId}
                className={`font-bold tracking-tight text-balance ${Heading === "h1" ? "text-4xl sm:text-5xl" : "text-3xl sm:text-4xl"}`}
              >
                {title}
              </Heading>
            )}
            {intro && (
              <div className={`mt-4 text-lg leading-relaxed text-pretty ${dark ? "text-slate-300" : "text-slate-600"}`}>{intro}</div>
            )}
          </header>
        )}
        {children}
      </Container>
    </section>
  );
}
