import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";

type Props = {
  title: string;
  text: ReactNode;
  cta: { href: string; label: string };
};

export function CtaBand({ title, text, cta }: Props) {
  return (
    <section aria-labelledby="cta-titre" className="bg-white py-16 sm:py-24">
      <Container>
        <div className="bg-brand-gradient relative overflow-hidden rounded-3xl px-6 py-14 text-center sm:px-12">
          <div aria-hidden="true" className="absolute inset-0 bg-slate-950/55" />
          <div className="relative mx-auto max-w-2xl">
            <h2 id="cta-titre" className="text-3xl font-bold tracking-tight text-balance text-white sm:text-4xl">
              {title}
            </h2>
            <p className="mt-4 text-lg text-pretty text-white">{text}</p>
            <ButtonLink href={cta.href} variant="light" size="lg" className="mt-8">
              {cta.label}
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
