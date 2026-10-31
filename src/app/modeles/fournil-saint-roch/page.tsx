import { FournilSaintRoch } from "@/components/modeles/FournilSaintRoch";
import { PageModele, modeleMetadata } from "@/components/modeles/PageModele";

// Route dédiée : la page ne précharge que les typographies de ce modèle.
export const metadata = modeleMetadata("fournil-saint-roch");

export default function Page() {
  return (
    <PageModele slug="fournil-saint-roch">
      <FournilSaintRoch />
    </PageModele>
  );
}
