import { StudioEquerreau } from "@/components/modeles/StudioEquerreau";
import { PageModele, modeleMetadata } from "@/components/modeles/PageModele";

// Route dédiée : la page ne précharge que les typographies de ce modèle.
export const metadata = modeleMetadata("studio-equerreau");

export default function Page() {
  return (
    <PageModele slug="studio-equerreau">
      <StudioEquerreau />
    </PageModele>
  );
}
