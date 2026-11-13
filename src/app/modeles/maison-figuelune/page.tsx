import { MaisonFiguelune } from "@/components/modeles/MaisonFiguelune";
import { PageModele, modeleMetadata } from "@/components/modeles/PageModele";

// Route dédiée : la page ne précharge que les typographies de ce modèle.
export const metadata = modeleMetadata("maison-figuelune");

export default function Page() {
  return (
    <PageModele slug="maison-figuelune">
      <MaisonFiguelune />
    </PageModele>
  );
}
