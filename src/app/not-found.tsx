import type { Metadata } from "next";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Page introuvable",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="contenu">
        <Container className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
          <p className="text-brand-gradient text-7xl font-extrabold">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight">Page introuvable</h1>
          <p className="mt-4 text-lg text-slate-600">Cette page n&apos;existe pas ou a été déplacée.</p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/">Retour à l&apos;accueil</ButtonLink>
            <ButtonLink href="/contact" variant="secondary">
              Contact
            </ButtonLink>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
