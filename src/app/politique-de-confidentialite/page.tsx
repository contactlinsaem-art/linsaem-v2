import type { Metadata } from "next";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { CookieReset } from "@/components/marketing/CookieReset";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  robots: { index: false, follow: false },
};

export default function PolitiqueDeConfidentialite() {
  return (
    <>
      <Navbar />
      <main className="max-w-3xl mx-auto px-6 py-28">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Politique de confidentialité</h1>
        <p className="text-xs text-gray-400 mb-10">Dernière mise à jour : janvier 2025</p>

        <div className="prose prose-sm text-sm text-gray-600 space-y-10">

          {/* 1 */}
          <section>
            <h2 className="text-lg font-bold text-gray-800 mb-3">1. Responsable du traitement</h2>
            <p>
              <strong>LINSAEM</strong><br />
              Email : <a href="mailto:contact@linsaem.fr" className="text-sky-500 hover:underline">contact@linsaem.fr</a><br />
              Téléphone : <a href="tel:+33189701526" className="text-sky-500 hover:underline">+33 1 89 70 15 26</a>
            </p>
          </section>

          {/* 2 */}
          <section>
            <h2 className="text-lg font-bold text-gray-800 mb-3">2. Données collectées</h2>
            <ul className="list-disc list-inside space-y-1">
              <li><strong>Formulaire de contact</strong> : nom, email, téléphone, message</li>
              <li><strong>Espace client</strong> : email, nom, historique des abonnements</li>
              <li><strong>Cookies analytiques</strong> : pages visitées, durée de session (Google Analytics, uniquement avec consentement)</li>
            </ul>
          </section>

          {/* 3 */}
          <section>
            <h2 className="text-lg font-bold text-gray-800 mb-3">3. Finalités du traitement</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Répondre à vos demandes de contact</li>
              <li>Gérer votre abonnement et vos factures</li>
              <li>Mesurer l&apos;audience du site (avec consentement)</li>
            </ul>
          </section>

          {/* 4 */}
          <section>
            <h2 className="text-lg font-bold text-gray-800 mb-3">4. Sous-traitants</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-gray-700">
                    <th className="text-left px-3 py-2 font-semibold border border-gray-200">Prestataire</th>
                    <th className="text-left px-3 py-2 font-semibold border border-gray-200">Rôle</th>
                    <th className="text-left px-3 py-2 font-semibold border border-gray-200">Pays</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Vercel Inc.", "Hébergement", "États-Unis"],
                    ["Neon Inc.", "Base de données", "États-Unis"],
                    ["Stripe Inc.", "Paiement", "États-Unis"],
                    ["Resend Inc.", "Emails transactionnels", "États-Unis"],
                    ["Google LLC", "Analytics", "États-Unis"],
                  ].map(([name, role, country]) => (
                    <tr key={name} className="even:bg-gray-50">
                      <td className="px-3 py-2 border border-gray-200">{name}</td>
                      <td className="px-3 py-2 border border-gray-200">{role}</td>
                      <td className="px-3 py-2 border border-gray-200">{country}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* 5 */}
          <section>
            <h2 className="text-lg font-bold text-gray-800 mb-3">5. Durée de conservation</h2>
            <ul className="list-disc list-inside space-y-1">
              <li><strong>Données de contact</strong> : 3 ans après le dernier contact</li>
              <li><strong>Données client</strong> : durée de l&apos;abonnement + 5 ans (obligations légales)</li>
              <li><strong>Cookies analytiques</strong> : 13 mois maximum</li>
            </ul>
          </section>

          {/* 6 */}
          <section>
            <h2 className="text-lg font-bold text-gray-800 mb-3">6. Vos droits (RGPD Art. 15-22)</h2>
            <p className="mb-2">
              Vous disposez des droits suivants : accès, rectification, suppression, portabilité, opposition.
            </p>
            <p className="mb-2">
              Pour exercer vos droits :{" "}
              <a href="mailto:contact@linsaem.fr" className="text-sky-500 hover:underline">contact@linsaem.fr</a>
            </p>
            <p className="mb-2">Délai de réponse : 30 jours maximum.</p>
            <p>
              Vous pouvez également saisir la CNIL :{" "}
              <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-sky-500 hover:underline">
                cnil.fr
              </a>
            </p>
          </section>

          {/* 7 */}
          <section>
            <h2 className="text-lg font-bold text-gray-800 mb-3">7. Cookies</h2>
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-gray-700">
                    <th className="text-left px-3 py-2 font-semibold border border-gray-200">Nom</th>
                    <th className="text-left px-3 py-2 font-semibold border border-gray-200">Finalité</th>
                    <th className="text-left px-3 py-2 font-semibold border border-gray-200">Durée</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["_ga", "Identifiant visiteur Google Analytics", "2 ans"],
                    ["_ga_XXXX", "Session Google Analytics", "2 ans"],
                  ].map(([name, purpose, duration]) => (
                    <tr key={name} className="even:bg-gray-50">
                      <td className="px-3 py-2 border border-gray-200 font-mono">{name}</td>
                      <td className="px-3 py-2 border border-gray-200">{purpose}</td>
                      <td className="px-3 py-2 border border-gray-200">{duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mb-4">
              Vous pouvez retirer votre consentement à tout moment via le lien en bas de page.
            </p>
            <CookieReset />
          </section>

          {/* 8 */}
          <section>
            <h2 className="text-lg font-bold text-gray-800 mb-3">8. Modifications</h2>
            <p>Dernière mise à jour : janvier 2025</p>
          </section>

        </div>
      </main>
      <Footer />
    </>
  );
}
