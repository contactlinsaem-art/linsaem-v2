import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conditions Générales de Vente",
  description: "CGV de LINSAEM — Conditions générales de vente et d'abonnement",
  robots: { index: false, follow: false },
};

export default function CGVPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Conditions Générales de Vente</h1>
          <p className="text-gray-400 text-sm mb-10">Dernière mise à jour : janvier 2025</p>

          <div className="space-y-8 text-sm text-gray-600 leading-relaxed">
            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">1. Objet</h2>
              <p>Les présentes CGV régissent les relations contractuelles entre LINSAEM (ci-après « le Prestataire ») et tout client (ci-après « le Client ») souscrivant à un abonnement de création et maintenance de site web.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">2. Offres et tarifs</h2>
              <p className="mb-3">Le Prestataire propose trois formules d&apos;abonnement mensuel :</p>
              <div className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-100">
                <table className="w-full text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Formule</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Prix</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Résiliation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr><td className="py-3 px-4">Starter</td><td className="py-3 px-4 font-semibold text-sky-600">5,99€ TTC/mois</td><td className="py-3 px-4">1 mois de préavis</td></tr>
                    <tr><td className="py-3 px-4">Pro</td><td className="py-3 px-4 font-semibold text-violet-600">7,99€ TTC/mois</td><td className="py-3 px-4">1 mois de préavis</td></tr>
                    <tr><td className="py-3 px-4">Business</td><td className="py-3 px-4 font-semibold text-pink-600">11,99€ TTC/mois</td><td className="py-3 px-4">1 mois de préavis</td></tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-3">Des frais de mise en service de 50€ TTC sont facturés une seule fois lors de la création du site. Tous les prix sont TTC.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">3. Commande et acceptation</h2>
              <p>La commande est validée après acceptation du devis et paiement de la première mensualité via Stripe. Des frais de mise en service de 50€ TTC sont facturés une seule fois lors de la création du site. Ces frais couvrent la configuration technique, l&apos;achat du nom de domaine et la mise en ligne initiale. Le Prestataire se réserve le droit de refuser toute commande pour motif légitime.</p>
              <a
                href="https://buy.stripe.com/4gM4gB3JvdsHarecpZ1ck00"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sky-500 hover:text-sky-600 text-sm font-medium transition-colors mt-2"
              >
                → Payer les frais de mise en service
              </a>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">4. Délai de livraison</h2>
              <p>Le site est livré dans un délai de 24 à 72h ouvrées après réception de l&apos;ensemble des contenus (textes, images, logo) fournis par le Client. Tout retard dans la fourniture des contenus suspend ce délai.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">5. Paiement</h2>
              <p>Le paiement est mensuel, prélevé automatiquement par carte bancaire via la plateforme Stripe. En cas d&apos;échec de paiement, le Prestataire se réserve le droit de suspendre l&apos;accès au site après relance sans réponse sous 7 jours.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">6. Résiliation</h2>
              <p>L&apos;abonnement LINSAEM est sans engagement de durée. Le Client peut résilier à tout moment avec un préavis d&apos;un mois calendaire par email à <a href="mailto:contact@linsaem.fr" className="text-sky-500">contact@linsaem.fr</a>. En cas de résiliation, l&apos;accès au site est maintenu jusqu&apos;à la fin de la période en cours.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">7. Propriété du site</h2>
              <p>Pendant la durée de l&apos;abonnement, le Client dispose d&apos;un droit d&apos;usage du site. En cas de résiliation, le Client peut récupérer ses contenus (textes, images) sur demande. Le code source et le design restent la propriété de LINSAEM.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">8. Modifications incluses</h2>
              <p>Les modifications incluses dans chaque formule sont des modifications mineures (textes, photos, horaires). Les refonte complètes ou ajouts de fonctionnalités sont soumis à devis complémentaire.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">9. Droit de rétractation</h2>
              <p>Conformément à l&apos;article L.221-28 du Code de la consommation, le Client dispose d&apos;un délai de 14 jours pour exercer son droit de rétractation à compter de la date de souscription, sauf si la prestation a été pleinement exécutée avant ce délai avec son accord exprès. Les frais de mise en service de 50€ TTC sont non remboursables si la création du site a débuté.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">10. Droit applicable</h2>
              <p>Les présentes CGV sont soumises au droit français. En cas de litige, les parties s&apos;engagent à rechercher une solution amiable avant tout recours judiciaire. À défaut, les tribunaux français seront compétents.</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
