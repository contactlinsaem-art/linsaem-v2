import Link from "next/link";
import { entreprise } from "@/content/entreprise";
import { LegalPage } from "@/components/site/LegalPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Mentions légales",
  description: "Mentions légales du site linsaem.fr : éditeur, hébergeur, propriété intellectuelle.",
  path: "/mentions-legales",
  noindex: true,
});

export default function MentionsLegalesPage() {
  const { legal, hebergeur } = entreprise;
  return (
    <LegalPage title="Mentions légales" updated="octobre 2026">
      <section>
        <h2>Éditeur du site</h2>
        <p>
          Le site <strong>linsaem.fr</strong> est édité par {legal.raisonSociale}, {legal.formeSociale} au capital de{" "}
          {legal.capital}, immatriculée au {legal.rcs}, SIREN {legal.siren}.
        </p>
        <ul>
          <li>Siège social : {legal.siege}</li>
          <li>N° de TVA intracommunautaire : {legal.tva}</li>
          <li>
            Email : <a href={`mailto:${entreprise.email}`}>{entreprise.email}</a>
          </li>
          <li>
            Téléphone : <a href={`tel:${entreprise.telephone.lien}`}>{entreprise.telephone.affichage}</a>
          </li>
          <li>Directeur de la publication : {legal.directeurPublication}</li>
        </ul>
      </section>

      <section>
        <h2>Hébergement</h2>
        <p>
          Le site est hébergé par {hebergeur.nom}, {hebergeur.adresse} — <a href={`tel:${hebergeur.telephone.lien}`}>{hebergeur.telephone.affichage}</a> —{" "}
          <a href={`mailto:${hebergeur.email}`}>{hebergeur.email}</a> —{" "}
          <a href={hebergeur.site} target="_blank" rel="noopener noreferrer">
            vercel.com
          </a>
          .
        </p>
      </section>

      <section>
        <h2>Propriété intellectuelle</h2>
        <p>
          Les textes, éléments graphiques, logos et le code du site linsaem.fr sont la propriété de {legal.raisonSociale}.
          Toute reproduction, même partielle, est interdite sans autorisation écrite préalable.
        </p>
        <p>
          Les entreprises présentées dans les modèles de design sont fictives. Les photographies des modèles proviennent
          d&apos;Unsplash et sont utilisées conformément à la licence Unsplash.
        </p>
      </section>

      <section>
        <h2>Données personnelles</h2>
        <p>
          Le traitement des données collectées sur ce site est décrit dans la{" "}
          <Link href="/confidentialite">politique de confidentialité</Link>.
        </p>
      </section>

      <section>
        <h2>Cookies</h2>
        <p>
          Le site ne dépose aucun cookie de mesure d&apos;audience ni publicitaire. La mesure d&apos;audience est réalisée
          sans cookie (voir la <Link href="/confidentialite">politique de confidentialité</Link>).
        </p>
      </section>
    </LegalPage>
  );
}
