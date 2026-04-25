import { Navbar } from "@/components/marketing/Navbar";
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
