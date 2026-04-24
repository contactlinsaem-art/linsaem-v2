import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales du site LINSAEM",
  robots: { index: false, follow: false },
};

export default function MentionsLegalesPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-10">Mentions légales</h1>

          <div className="prose prose-gray max-w-none space-y-8 text-sm text-gray-600 leading-relaxed">
            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">1. Éditeur du site</h2>
              <p>
                Le site <strong>linsaem.fr</strong> est édité par LINSAEM, entreprise individuelle.<br />
                Email : <a href="mailto:contact@linsaem.fr" className="text-sky-500">contact@linsaem.fr</a><br />
                Téléphone : <a href="tel:+33189701526" className="text-sky-500">+33 1 89 70 15 26</a>
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">2. Hébergement</h2>
              <p>
                Le site est hébergé par <strong>Vercel Inc.</strong><br />
                340 Pine Street, Suite 701, San Francisco, CA 94104, États-Unis<br />
                <a href="https://vercel.com" className="text-sky-500" target="_blank" rel="noopener noreferrer">vercel.com</a>
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">3. Propriété intellectuelle</h2>
              <p>
                L&apos;ensemble du contenu de ce site (textes, images, graphismes, logo, icônes, etc.) est la propriété exclusive de LINSAEM, protégé par les lois françaises et internationales relatives à la propriété intellectuelle. Toute reproduction, distribution, modification, adaptation ou publication, même partielle, est strictement interdite sans accord préalable écrit de LINSAEM.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">4. Protection des données personnelles</h2>
              <p>
                Les données collectées via les formulaires du site (nom, email, téléphone) sont utilisées exclusivement pour répondre à vos demandes et gérer la relation commerciale. Conformément au RGPD et à la loi Informatique et Libertés, vous disposez d&apos;un droit d&apos;accès, de rectification, de suppression et de portabilité de vos données. Pour exercer ces droits, contactez-nous à <a href="mailto:contact@linsaem.fr" className="text-sky-500">contact@linsaem.fr</a>.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">5. Cookies</h2>
              <p>
                Ce site utilise Google Analytics pour mesurer l&apos;audience. Ces cookies peuvent être désactivés dans les paramètres de votre navigateur. Aucune donnée personnelle identifiable n&apos;est transmise à des tiers à des fins publicitaires.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">6. Responsabilité</h2>
              <p>
                LINSAEM ne saurait être tenu responsable des dommages directs ou indirects causés au matériel de l&apos;utilisateur lors de l&apos;accès au site, résultant de l&apos;utilisation d&apos;un matériel ne répondant pas aux spécifications indiquées.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
