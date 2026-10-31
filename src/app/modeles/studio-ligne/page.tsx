import { StudioLigne } from "@/components/modeles/StudioLigne";
import { PageModele, modeleMetadata } from "@/components/modeles/PageModele";

// Route dédiée : la page ne précharge que les typographies de ce modèle.
export const metadata = modeleMetadata("studio-ligne");

export default function Page() {
  return (
    <PageModele slug="studio-ligne">
      <StudioLigne />
    </PageModele>
  );
}
