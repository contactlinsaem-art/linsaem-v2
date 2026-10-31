import { FerrandPlomberie } from "@/components/modeles/FerrandPlomberie";
import { PageModele, modeleMetadata } from "@/components/modeles/PageModele";

// Route dédiée : la page ne précharge que les typographies de ce modèle.
export const metadata = modeleMetadata("ferrand-plomberie");

export default function Page() {
  return (
    <PageModele slug="ferrand-plomberie">
      <FerrandPlomberie />
    </PageModele>
  );
}
