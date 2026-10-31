import { Check } from "lucide-react";
import { formules, formatPrix, inclusVitrine, prixMinimum, processVitrine } from "@/content/offres";
import { faqVitrines } from "@/content/faq";
import { portailClientUrl } from "@/content/entreprise";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { FormuleCard } from "@/components/site/FormuleCard";
import { ProcessSteps } from "@/components/site/ProcessSteps";
import { FaqList } from "@/components/site/FaqList";
import { CtaBand } from "@/components/site/CtaBand";
import { JsonLd } from "@/components/seo/JsonLd";
import { FilAriane } from "@/components/site/FilAriane";
import { faqJsonLd, pageMetadata, serviceVitrineJsonLd } from "@/lib/seo";

const prixMax = Math.max(...formules.map((f) => f.prixMensuelTTC));

export const metadata = pageMetadata({
  title: `Sites vitrines par abonnement dès ${formatPrix(prixMinimum)} TTC/mois`,
  description: `Site vitrine professionnel conçu pour votre activité, hébergé et maintenu. Trois formules de ${formatPrix(prixMinimum)} à ${formatPrix(prixMax)} TTC par mois, sans engagement.`,
  path: "/sites-vitrines",
});

export default function SitesVitrinesPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(faqVitrines)} />
      <JsonLd data={serviceVitrineJsonLd()} />

      <Container className="pt-8">
        <FilAriane etapes={[{ nom: "Sites vitrines", path: "/sites-vitrines" }]} />
      </Container>
      <Section
        as="h1"
        className="pt-8! sm:pt-12!"
        title="Sites vitrines par abonnement"
        intro="Un site professionnel conçu pour votre activité, hébergé, sécurisé et maintenu, pour un abonnement mensuel. Sans engagement de durée."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="#formules" size="lg">
            Choisir ma formule
          </ButtonLink>
          <ButtonLink href="/modeles" variant="secondary" size="lg">
            Voir les modèles
          </ButtonLink>
        </div>
        <p className="mt-6 text-sm text-slate-600">Offres réservées aux professionnels.</p>
      </Section>

      <Section
        id="formules"
        tone="muted"
        title="Trois formules, tout compris"
        intro="Sans engagement : résiliation possible à tout moment avec un mois de préavis."
      >
        <div className="grid gap-6 pt-4 lg:grid-cols-3">
          {formules.map((f) => (
            <FormuleCard key={f.id} formule={f} />
          ))}
        </div>
        <p className="mt-8 max-w-3xl text-sm leading-relaxed text-slate-600">
          Les frais de mise en service sont facturés une seule fois, avec la première mensualité. Ils couvrent la
          configuration technique, l&apos;achat du nom de domaine et la mise en ligne. Tous les prix sont TTC (TVA 20 %).
        </p>
      </Section>

      <Section id="inclus" title="Inclus dans chaque formule">
        <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {inclusVitrine.map((item) => (
            <li key={item.titre} className="reveal flex gap-4">
              <Check aria-hidden="true" size={22} className="mt-0.5 shrink-0 text-accent" />
              <div>
                <h3 className="font-semibold">{item.titre}</h3>
                <p className="mt-1 leading-relaxed text-slate-600">{item.texte}</p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="process" tone="muted" title="Comment ça se passe">
        <ProcessSteps etapes={processVitrine} />
        <p className="mt-10 max-w-3xl leading-relaxed text-slate-700">
          <strong>Ensuite</strong> : vos factures et votre moyen de paiement se gèrent dans le portail client Stripe,
          accessible depuis le lien{" "}
          {portailClientUrl ? (
            <a href={portailClientUrl} className="font-semibold text-accent underline underline-offset-4">
              « Factures et résiliation »
            </a>
          ) : (
            "« Factures et résiliation »"
          )}{" "}
          en bas de chaque page. Vous pouvez aussi y résilier.
        </p>
      </Section>

      <Section id="faq" title="Questions fréquentes">
        <div className="max-w-3xl">
          <FaqList questions={faqVitrines} />
        </div>
      </Section>

      <CtaBand
        title="Prêt à lancer votre site ?"
        text="Décrivez votre activité en quelques lignes : vous recevez une réponse avec la formule la plus adaptée."
        cta={{ href: "/contact?type=vitrine", label: "Demander mon site" }}
      />
    </>
  );
}
