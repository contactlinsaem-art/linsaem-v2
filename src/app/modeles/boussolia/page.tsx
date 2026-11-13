import { Boussolia } from "@/components/modeles/Boussolia";
import { PageModele, modeleMetadata } from "@/components/modeles/PageModele";

// Route dédiée : la page ne précharge que les typographies de ce modèle.
export const metadata = modeleMetadata("boussolia");

export default function Page() {
  return (
    <PageModele slug="boussolia">
      <Boussolia />
    </PageModele>
  );
}
