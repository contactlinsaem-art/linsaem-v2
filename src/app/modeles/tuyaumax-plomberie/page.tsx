import { TuyaumaxPlomberie } from "@/components/modeles/TuyaumaxPlomberie";
import { PageModele, modeleMetadata } from "@/components/modeles/PageModele";

// Route dédiée : la page ne précharge que les typographies de ce modèle.
export const metadata = modeleMetadata("tuyaumax-plomberie");

export default function Page() {
  return (
    <PageModele slug="tuyaumax-plomberie">
      <TuyaumaxPlomberie />
    </PageModele>
  );
}
