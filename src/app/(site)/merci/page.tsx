import { CheckCircle2 } from "lucide-react";
import { entreprise } from "@/content/entreprise";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Demande envoyée",
  description: "Votre demande a bien été envoyée à LINSAEM.",
  path: "/merci",
  noindex: true,
});

export default function MerciPage() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <CheckCircle2 aria-hidden="true" size={56} className="text-green-700" />
      <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">Demande envoyée</h1>
      <p className="mt-4 max-w-xl text-lg text-slate-600">
        Merci. Une réponse vous est apportée sous {entreprise.delais.reponse}. Un email de confirmation vient de vous
        être envoyé.
      </p>
      <ButtonLink href="/" className="mt-10">
        Retour à l&apos;accueil
      </ButtonLink>
    </Container>
  );
}
