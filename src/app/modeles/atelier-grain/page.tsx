import { AtelierGrain } from "@/components/modeles/AtelierGrain";
import { PageModele, modeleMetadata } from "@/components/modeles/PageModele";

// Route dédiée : la page ne précharge que les typographies de ce modèle.
export const metadata = modeleMetadata("atelier-grain");

export default function Page() {
  return (
    <PageModele slug="atelier-grain">
      <AtelierGrain />
    </PageModele>
  );
}
