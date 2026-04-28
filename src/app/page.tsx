import type { Metadata } from "next";
import { Navbar } from "@/components/marketing/Navbar";

export const metadata: Metadata = {
  title: "LINSAEM — Création site web professionnel dès 5,99€/mois",
  description:
    "Créez votre site web professionnel dès 5,99€ TTC/mois. Design sur-mesure, hébergement inclus, maintenance comprise. Livraison en 48h. Résiliable à tout moment.",
  alternates: { canonical: "https://www.linsaem.fr" },
  openGraph: {
    url: "https://www.linsaem.fr",
    title: "LINSAEM — Création site web professionnel dès 5,99€/mois",
    description:
      "Design sur-mesure, hébergement inclus, livraison en 48h. Dès 5,99€/mois TTC.",
  },
};
import { Hero } from "@/components/marketing/Hero";
import { ComparisonBanner } from "@/components/marketing/ComparisonBanner";
import { FeaturesStrip } from "@/components/marketing/FeaturesStrip";
import { Pricing } from "@/components/marketing/Pricing";
import { Services } from "@/components/marketing/Services";
import { Included } from "@/components/marketing/Included";
import { Portfolio } from "@/components/marketing/Portfolio";
import { HowItWorks } from "@/components/marketing/HowItWorks";
import { Testimonials } from "@/components/marketing/Testimonials";
import { CTABanner } from "@/components/marketing/CTABanner";
import { FAQ } from "@/components/marketing/FAQ";
import { ContactForm } from "@/components/marketing/ContactForm";
import { Footer } from "@/components/marketing/Footer";
import { BackToTop } from "@/components/marketing/BackToTop";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ComparisonBanner />
        <FeaturesStrip />
        <Pricing />
        <Services />
        <Included />
        <Portfolio />
        <HowItWorks />
        <Testimonials />
        <CTABanner />
        <FAQ />
        <ContactForm />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
