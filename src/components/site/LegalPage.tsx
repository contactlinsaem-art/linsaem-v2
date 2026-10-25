import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";

export function LegalPage({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <Container className="max-w-3xl py-16 sm:py-24">
      <h1 className="text-4xl font-bold tracking-tight">{title}</h1>
      <p className="mt-3 text-sm text-slate-600">Dernière mise à jour : {updated}</p>
      <div className="mt-12 space-y-10 leading-relaxed text-slate-700 [&_a]:font-medium [&_a]:text-accent [&_a]:underline [&_a]:underline-offset-4 [&_h2]:mb-3 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-slate-900 [&_h3]:mt-4 [&_h3]:mb-2 [&_h3]:font-semibold [&_h3]:text-slate-900 [&_li]:mt-1 [&_p+p]:mt-3 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-6">
        {children}
      </div>
    </Container>
  );
}
