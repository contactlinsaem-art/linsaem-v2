import { CapEquilibre } from "@/components/modeles/CapEquilibre";
import { PageModele, modeleMetadata } from "@/components/modeles/PageModele";

// Route dédiée : la page ne précharge que les typographies de ce modèle.
export const metadata = modeleMetadata("cap-equilibre");

export default function Page() {
  return (
    <PageModele slug="cap-equilibre">
      <CapEquilibre />
    </PageModele>
  );
}
