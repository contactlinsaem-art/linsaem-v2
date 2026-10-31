import { entreprise } from "@/content/entreprise";
import { LegalPage } from "@/components/site/LegalPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Politique de confidentialité",
  description: "Données collectées par LINSAEM, finalités, durées de conservation, sous-traitants et droits.",
  path: "/confidentialite",
  noindex: true,
});

const sousTraitants = [
  ["Vercel Inc.", "Hébergement du site, mesure d'audience sans cookie", "États-Unis"],
  ["Resend Inc.", "Envoi des emails du formulaire de contact", "États-Unis"],
  ["Cloudflare Inc.", "Vérification anti-robot du formulaire (Turnstile)", "États-Unis"],
  ["Stripe Payments Europe Ltd", "Paiement et facturation des abonnements", "Irlande (UE)"],
];

export default function ConfidentialitePage() {
  const { legal } = entreprise;
  return (
    <LegalPage title="Politique de confidentialité" updated="octobre 2026">
      <section>
        <h2>Responsable du traitement</h2>
        <p>
          {legal.raisonSociale}, {legal.formeSociale}, {legal.siege}. Contact :{" "}
          <a href={`mailto:${entreprise.email}`}>{entreprise.email}</a>.
        </p>
      </section>

      <section>
        <h2>Données collectées, finalités et bases légales</h2>
        <h3>Formulaire de contact</h3>
        <ul>
          <li>Données : type de projet, nom, email, téléphone (facultatif), formule envisagée, message.</li>
          <li>Finalité : répondre à votre demande et vous adresser une proposition.</li>
          <li>Base légale : mesures précontractuelles prises à votre demande (article 6.1.b du RGPD).</li>
          <li>
            Les données sont transmises par email à LINSAEM. Elles ne sont pas stockées dans une base de données du site.
          </li>
        </ul>
        <h3>Protection contre les envois abusifs</h3>
        <ul>
          <li>
            Données : adresse IP et signaux techniques du navigateur, analysés par Cloudflare Turnstile.
          </li>
          <li>Finalité : empêcher l&apos;utilisation du formulaire par des robots.</li>
          <li>Base légale : intérêt légitime de LINSAEM à sécuriser son site (article 6.1.f).</li>
        </ul>
        <h3>Clients</h3>
        <ul>
          <li>Données : identité, coordonnées, données de facturation. Les données de carte bancaire sont traitées par Stripe et ne sont jamais accessibles à LINSAEM.</li>
          <li>Finalités : exécution du contrat, facturation, obligations comptables.</li>
          <li>Bases légales : exécution du contrat (article 6.1.b) et obligation légale (article 6.1.c).</li>
        </ul>
        <h3>Mesure d&apos;audience</h3>
        <ul>
          <li>
            Le site utilise Vercel Web Analytics, qui fonctionne sans cookie ni identifiant persistant : seules des
            statistiques agrégées (pages vues, pays, type d&apos;appareil, site d&apos;origine) sont produites.
          </li>
          <li>Base légale : intérêt légitime de LINSAEM à mesurer la fréquentation de son site (article 6.1.f).</li>
        </ul>
      </section>

      <section>
        <h2>Durées de conservation</h2>
        <ul>
          <li>Demandes de contact sans suite : 3 ans au plus après le dernier échange.</li>
          <li>Données clients : durée de la relation contractuelle, puis 3 ans à des fins de prospection.</li>
          <li>Factures et pièces comptables : 10 ans (article L.123-22 du Code de commerce).</li>        </ul>
      </section>

      <section>
        <h2>Sous-traitants</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <caption className="sr-only">Sous-traitants et pays de traitement</caption>
            <thead>
              <tr className="border-b border-slate-300">
                <th scope="col" className="py-2 pr-4 font-semibold">Prestataire</th>
                <th scope="col" className="py-2 pr-4 font-semibold">Rôle</th>
                <th scope="col" className="py-2 font-semibold">Pays</th>
              </tr>
            </thead>
            <tbody>
              {sousTraitants.map(([nom, role, pays]) => (
                <tr key={nom} className="border-b border-slate-200">
                  <th scope="row" className="py-2 pr-4 font-medium">{nom}</th>
                  <td className="py-2 pr-4">{role}</td>
                  <td className="py-2">{pays}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          Les transferts de données vers les États-Unis sont encadrés par le cadre de protection des données UE–États-Unis
          (Data Privacy Framework) lorsque le prestataire y adhère, ou à défaut par les clauses contractuelles types de la
          Commission européenne.
        </p>
      </section>

      <section>
        <h2>Cookies</h2>
        <p>
          Le site ne dépose aucun cookie de mesure d&apos;audience ni publicitaire. C&apos;est pourquoi aucun bandeau de
          consentement n&apos;est affiché. Le widget anti-robot Cloudflare Turnstile, chargé uniquement sur la page de
          contact, est strictement nécessaire à la sécurité du formulaire.
        </p>
      </section>

      <section>
        <h2>Vos droits</h2>
        <p>
          Vous disposez des droits d&apos;accès, de rectification, d&apos;effacement, de limitation, d&apos;opposition et de
          portabilité de vos données. Pour les exercer, écrivez à{" "}
          <a href={`mailto:${entreprise.email}`}>{entreprise.email}</a>. Une réponse vous est apportée dans un délai
          d&apos;un mois.
        </p>
        <p>
          Vous pouvez également introduire une réclamation auprès de la CNIL :{" "}
          <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">
            cnil.fr
          </a>
          .
        </p>
      </section>
    </LegalPage>
  );
}
