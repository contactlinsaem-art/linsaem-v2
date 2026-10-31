import { MaisonSauge } from "@/components/modeles/MaisonSauge";
import { PageModele, modeleMetadata } from "@/components/modeles/PageModele";

// Route dédiée : la page ne précharge que les typographies de ce modèle.
export const metadata = modeleMetadata("maison-sauge");

export default function Page() {
  return (
    <PageModele slug="maison-sauge">
      <MaisonSauge />
    </PageModele>
  );
}
