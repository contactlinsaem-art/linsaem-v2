import { Suspense } from "react";
import { Clock, Mail, Phone } from "lucide-react";
import { entreprise } from "@/content/entreprise";
import { Section } from "@/components/ui/Section";
import { pageMetadata } from "@/lib/seo";
import { ContactForm } from "./ContactForm";

export const metadata = pageMetadata({
  title: "Contact : site vitrine ou développement sur mesure",
  description: `Décrivez votre projet de site vitrine ou de développement sur mesure. Réponse sous ${entreprise.delais.reponse}.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <Section
      as="h1"
      title="Parlons de votre projet"
      intro={`Site vitrine ou développement sur mesure : décrivez votre besoin, une réponse vous est apportée sous ${entreprise.delais.reponse}.`}
    >
      <div className="grid gap-12 lg:grid-cols-[1fr_20rem]">
        <div className="rounded-3xl border border-slate-200 p-6 sm:p-10">
          {/*
            useSearchParams (préremplissage via ?type=) : la page reste statique grâce à Suspense.
            La réserve de hauteur (hauteur mesurée du formulaire) évite que la colonne de droite saute à l'affichage.
          */}
          <Suspense fallback={<div aria-hidden="true" className="min-h-[68rem] sm:min-h-[57rem] lg:min-h-[52rem]" />}>
            <ContactForm />
          </Suspense>
        </div>

        <aside aria-labelledby="coordonnees" className="space-y-6">
          <h2 id="coordonnees" className="text-lg font-semibold">
            Autres moyens de contact
          </h2>
          <ul className="space-y-5">
            <li className="flex gap-3">
              <Mail aria-hidden="true" size={20} className="mt-0.5 text-accent" />
              <div>
                <p className="text-sm text-slate-600">Email</p>
                <a href={`mailto:${entreprise.email}`} className="font-semibold underline-offset-4 hover:underline">
                  {entreprise.email}
                </a>
              </div>
            </li>
            <li className="flex gap-3">
              <Phone aria-hidden="true" size={20} className="mt-0.5 text-accent" />
              <div>
                <p className="text-sm text-slate-600">Téléphone</p>
                <a href={`tel:${entreprise.telephone.lien}`} className="font-semibold underline-offset-4 hover:underline">
                  {entreprise.telephone.affichage}
                </a>
              </div>
            </li>
            <li className="flex gap-3">
              <Clock aria-hidden="true" size={20} className="mt-0.5 text-accent" />
              <div>
                <p className="text-sm text-slate-600">Délai de réponse</p>
                <p className="font-semibold">Sous {entreprise.delais.reponse}</p>
              </div>
            </li>
          </ul>
        </aside>
      </div>
    </Section>
  );
}
