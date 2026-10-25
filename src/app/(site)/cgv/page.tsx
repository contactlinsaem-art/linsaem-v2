import Link from "next/link";
import { entreprise, portailClientUrl } from "@/content/entreprise";
import { formules, formatPrix } from "@/content/offres";
import { LegalPage } from "@/components/site/LegalPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Conditions générales de vente",
  description: "Conditions générales de vente de LINSAEM : sites vitrines par abonnement et développement sur mesure.",
  path: "/cgv",
  noindex: true,
});

export default function CgvPage() {
  const { legal, delais } = entreprise;
  return (
    <LegalPage title="Conditions générales de vente" updated="octobre 2026">
      <section>
        <h2>1. Objet et champ d&apos;application</h2>
        <p>
          Les présentes conditions générales de vente (CGV) régissent les prestations fournies par {legal.raisonSociale},{" "}
          {legal.formeSociale} immatriculée au {legal.rcs}, dont le siège est situé {legal.siege} (ci-après « LINSAEM »),
          à toute personne physique ou morale (ci-après « le Client »). Elles couvrent deux offres :
        </p>
        <ul>
          <li>
            <strong>les sites vitrines par abonnement</strong> (articles 2 à 9) ;
          </li>
          <li>
            <strong>le développement web sur mesure</strong> (articles 10 à 13).
          </li>
        </ul>
        <p>Toute commande implique l&apos;acceptation des présentes CGV.</p>
      </section>

      <h2 className="mt-14! border-b border-slate-200 pb-2 text-2xl!">Sites vitrines par abonnement</h2>

      <section>
        <h2>2. Formules et prix</h2>
        <p>Trois formules d&apos;abonnement mensuel sont proposées :</p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <caption className="sr-only">Prix des formules de site vitrine</caption>
            <thead>
              <tr className="border-b border-slate-300">
                <th scope="col" className="py-2 pr-4 font-semibold">Formule</th>
                <th scope="col" className="py-2 pr-4 font-semibold">Abonnement mensuel</th>
                <th scope="col" className="py-2 font-semibold">Frais de mise en service (une fois)</th>
              </tr>
            </thead>
            <tbody>
              {formules.map((f) => (
                <tr key={f.id} className="border-b border-slate-200">
                  <th scope="row" className="py-2 pr-4 font-medium">{f.nom}</th>
                  <td className="py-2 pr-4">{formatPrix(f.prixMensuelTTC)} TTC</td>
                  <td className="py-2">{formatPrix(f.fraisMiseEnServiceTTC)} TTC</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          Les prix s&apos;entendent toutes taxes comprises, TVA au taux de 20 % incluse. Le contenu de chaque formule est
          décrit sur la page <Link href="/sites-vitrines">Sites vitrines</Link>. Les frais de mise en service couvrent la
          configuration technique, l&apos;enregistrement du nom de domaine et la mise en ligne.
        </p>
      </section>

      <section>
        <h2>3. Commande</h2>
        <p>
          Le Client formule sa demande via le formulaire de contact, par email ou par téléphone. Après échange sur le
          besoin, LINSAEM réalise le site et en adresse un lien de prévisualisation. Après validation par le Client,
          LINSAEM lui envoie un lien de paiement sécurisé Stripe. La commande est ferme au paiement de la première
          mensualité et des frais de mise en service.
        </p>
      </section>

      <section>
        <h2>4. Délais</h2>
        <p>
          Le lien de prévisualisation est envoyé sous {delais.livraison} après réception de l&apos;ensemble des contenus
          (textes, images, logo) fournis par le Client. Tout retard dans la fourniture des contenus suspend ce délai. Le site
          est mis en ligne dès réception du paiement.
        </p>
      </section>

      <section>
        <h2>5. Paiement</h2>
        <p>
          L&apos;abonnement est payable mensuellement par prélèvement automatique sur la carte bancaire du Client, via la
          plateforme Stripe. Les factures sont envoyées par email et restent disponibles dans le portail client Stripe
          {portailClientUrl ? (
            <>
              {" "}
              (<a href={portailClientUrl}>Gérer mon abonnement</a>)
            </>
          ) : null}
          . En cas d&apos;échec de paiement, LINSAEM relance le Client ; à défaut de régularisation dans les 7 jours suivant
          la relance, LINSAEM peut suspendre l&apos;accès au site jusqu&apos;au paiement.
        </p>
      </section>

      <section>
        <h2>6. Durée, changement de formule et résiliation</h2>
        <p>
          L&apos;abonnement est conclu sans engagement de durée. Le Client peut changer de formule à tout moment par simple
          demande écrite ; le changement prend effet au mois suivant, au tarif de la nouvelle formule.
        </p>
        <p>
          Le Client peut résilier à tout moment, depuis le portail client Stripe ou par email à{" "}
          <a href={`mailto:${entreprise.email}`}>{entreprise.email}</a>, avec un préavis d&apos;un mois. Le site reste en
          ligne jusqu&apos;à la fin de la période payée.
        </p>
      </section>

      <section>
        <h2>7. Modifications incluses</h2>
        <p>
          Chaque formule inclut un nombre de modifications par mois (1 pour Starter, 3 pour Pro) ou des modifications
          mineures illimitées (Business). Une <strong>modification mineure</strong> est un changement de texte,
          d&apos;image, d&apos;horaires ou de tarifs. La création d&apos;une nouvelle page ou d&apos;une nouvelle
          fonctionnalité n&apos;est pas une modification mineure et fait l&apos;objet d&apos;un devis.
        </p>
        <p>
          Les demandes sont adressées par email et traitées une à la fois, dans l&apos;ordre de réception, sous{" "}
          {delais.modification} à compter de la réception de tous les éléments nécessaires. Les modifications non utilisées
          ne sont pas reportées sur le mois suivant.
        </p>
      </section>

      <section>
        <h2>8. Nom de domaine</h2>
        <p>
          Le nom de domaine est enregistré au nom du Client. Il reste sa propriété en cas de résiliation : LINSAEM lui en
          transfère la gestion sur demande, sans frais. Les frais de renouvellement ultérieurs à la résiliation sont alors à
          la charge du Client.
        </p>
      </section>

      <section>
        <h2>9. Propriété du site</h2>
        <p>
          Pendant l&apos;abonnement, le Client dispose d&apos;un droit d&apos;usage du site. Le design et le code du site
          restent la propriété de LINSAEM. Les contenus fournis par le Client (textes, photos, logo) restent sa propriété et
          lui sont remis sur demande en cas de résiliation.
        </p>
      </section>

      <h2 className="mt-14! border-b border-slate-200 pb-2 text-2xl!">Développement web sur mesure</h2>

      <section>
        <h2>10. Premier échange, cadrage et devis</h2>
        <p>
          Le premier échange, d&apos;une durée de 30 minutes, est gratuit et sans engagement. Pour les projets importants,
          LINSAEM peut proposer un cadrage payant ; son montant est déduit du devis si celui-ci est signé.
        </p>
        <p>
          Chaque projet fait l&apos;objet d&apos;un devis détaillé, exprimé en HT et en TTC, précisant le périmètre, le
          planning et les modalités de paiement. Le devis signé et les présentes CGV forment le contrat. Toute demande hors
          du périmètre du devis fait l&apos;objet d&apos;un avenant.
        </p>
      </section>

      <section>
        <h2>11. Réalisation et recette</h2>
        <p>
          Le développement est réalisé par étapes, avec une version de test accessible au Client. À la livraison, le Client
          dispose du délai prévu au devis pour signaler les anomalies par rapport au périmètre convenu. LINSAEM corrige les
          anomalies signalées dans ce délai.
        </p>
      </section>

      <section>
        <h2>12. Propriété intellectuelle</h2>
        <p>
          Après paiement complet du prix, LINSAEM cède au Client les droits patrimoniaux sur le code développé
          spécifiquement pour son projet (reproduction, représentation, adaptation), pour le monde entier et pour la durée
          légale des droits d&apos;auteur. LINSAEM conserve la propriété de ses composants génériques, outils et
          bibliothèques préexistants ou réutilisables, et le droit de les réutiliser ; le Client en reçoit un droit
          d&apos;usage non exclusif pour les besoins de son projet. Les composants open source restent soumis à leurs
          licences respectives.
        </p>
      </section>

      <section>
        <h2>13. Maintenance</h2>
        <p>
          Après la mise en ligne, le Client peut souscrire un forfait de maintenance mensuel optionnel (hébergement, mises à
          jour de sécurité, petites corrections) ou demander des interventions ponctuelles, facturées sur devis.
        </p>
      </section>

      <h2 className="mt-14! border-b border-slate-200 pb-2 text-2xl!">Dispositions communes</h2>

      <section>
        <h2>14. Droit de rétractation</h2>
        <p>
          Le Client consommateur (ou professionnel employant au plus cinq salariés, lorsque la prestation n&apos;entre pas
          dans le champ de son activité principale) dispose d&apos;un délai de 14 jours à compter de la conclusion du
          contrat pour se rétracter, sans avoir à motiver sa décision (articles L.221-18 et suivants du Code de la
          consommation). Il exerce ce droit par email à <a href={`mailto:${entreprise.email}`}>{entreprise.email}</a>, par
          toute déclaration dénuée d&apos;ambiguïté ou à l&apos;aide du modèle ci-dessous.
        </p>
        <p>
          Si le Client demande expressément que la prestation commence avant la fin du délai de rétractation et se rétracte
          ensuite, il verse un montant proportionnel à ce qui a été fourni jusqu&apos;à la communication de sa décision
          (article L.221-25). Le droit de rétractation ne peut plus être exercé lorsque la prestation a été pleinement
          exécutée avant la fin du délai, avec l&apos;accord préalable exprès du Client et sa reconnaissance de la perte de
          ce droit (article L.221-28).
        </p>
        <h3>Modèle de formulaire de rétractation</h3>
        <p className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm">
          À l&apos;attention de {legal.raisonSociale}, {legal.siege}, {entreprise.email} :
          <br />
          Je vous notifie par la présente ma rétractation du contrat portant sur la prestation de services ci-dessous :
          <br />
          Commandée le : … — Nom du Client : … — Adresse du Client : …
          <br />
          Date : … — Signature (en cas d&apos;envoi papier) : …
        </p>
      </section>

      <section>
        <h2>15. Responsabilité</h2>
        <p>
          LINSAEM est tenue d&apos;une obligation de moyens. Elle ne saurait être tenue responsable des contenus fournis par
          le Client, ni des interruptions dues à l&apos;hébergeur, aux opérateurs de réseau ou à un cas de force majeure. Le
          Client garantit disposer des droits sur les contenus qu&apos;il fournit.
        </p>
      </section>

      <section>
        <h2>16. Données personnelles</h2>
        <p>
          Les données du Client sont traitées conformément à la{" "}
          <Link href="/confidentialite">politique de confidentialité</Link>.
        </p>
      </section>

      <section>
        <h2>17. Médiation de la consommation</h2>
        <p>
          En cas de litige, le Client consommateur adresse d&apos;abord une réclamation écrite à LINSAEM. À défaut de
          solution amiable, il peut recourir gratuitement au médiateur de la consommation suivant (articles L.611-1 et
          suivants du Code de la consommation) : {legal.mediateur.nom}, {legal.mediateur.adresse}, {legal.mediateur.site}.
        </p>
      </section>

      <section>
        <h2>18. Droit applicable</h2>
        <p>
          Les présentes CGV sont soumises au droit français. À défaut d&apos;accord amiable, les tribunaux français sont
          compétents, sous réserve des règles de compétence protectrices des consommateurs.
        </p>
      </section>
    </LegalPage>
  );
}
