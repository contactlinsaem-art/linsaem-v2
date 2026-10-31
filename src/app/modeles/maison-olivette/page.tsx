import { MaisonOlivette } from "@/components/modeles/MaisonOlivette";
import { PageModele, modeleMetadata } from "@/components/modeles/PageModele";

// Route dédiée : la page ne précharge que les typographies de ce modèle.
export const metadata = modeleMetadata("maison-olivette");

export default function Page() {
  return (
    <PageModele slug="maison-olivette">
      <MaisonOlivette />
    </PageModele>
  );
}
