import { FournilBelcroute } from "@/components/modeles/FournilBelcroute";
import { PageModele, modeleMetadata } from "@/components/modeles/PageModele";

// Route dédiée : la page ne précharge que les typographies de ce modèle.
export const metadata = modeleMetadata("fournil-belcroute");

export default function Page() {
  return (
    <PageModele slug="fournil-belcroute">
      <FournilBelcroute />
    </PageModele>
  );
}
