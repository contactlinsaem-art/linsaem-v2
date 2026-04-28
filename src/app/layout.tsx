import type { Metadata } from "next";
import "./globals.css";
import { CookieBanner } from "@/components/marketing/CookieBanner";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.linsaem.fr"),
  title: {
    default: "LINSAEM — Création site web dès 5,99€/mois",
    template: "%s | LINSAEM",
  },
  description:
    "Créez votre site web professionnel dès 5,99€ TTC/mois. Design sur-mesure, hébergement inclus, maintenance comprise. Livraison en 48h. Résiliable à tout moment.",
  keywords: [
    "création site web",
    "agence web",
    "site internet pas cher",
    "création site internet",
    "développeur web",
    "site vitrine",
    "design web",
    "5,99€/mois",
    "site web professionnel",
    "site web pas cher",
    "hébergement inclus",
    "site web abonnement mensuel",
    "agence web France",
    "création site web PME",
    "site web artisan",
    "site web commerçant",
    "création site web 48h",
    "site web maintenance incluse",
  ],
  authors: [{ name: "LINSAEM", url: "https://www.linsaem.fr" }],
  creator: "LINSAEM",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://www.linsaem.fr",
    siteName: "LINSAEM",
    title: "LINSAEM — Création site web dès 5,99€/mois",
    description:
      "Créez votre site web professionnel dès 5,99€/mois. Design sur-mesure, hébergement inclus, livraison en 48h.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "LINSAEM — Agence web à prix imbattable",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LINSAEM — Création site web dès 5,99€/mois",
    description: "Design sur-mesure, hébergement inclus, livraison en 48h.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: { canonical: "https://www.linsaem.fr" },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;700&display=swap"
          rel="stylesheet"
        />
        {/* Schema.org */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": "https://www.linsaem.fr/#organization",
              name: "LINSAEM",
              url: "https://www.linsaem.fr",
              logo: {
                "@type": "ImageObject",
                url: "https://www.linsaem.fr/icon.svg",
                width: 32,
                height: 32,
              },
              description: "Agence de création de sites web professionnels à prix accessible — dès 5,99€/mois, hébergement et maintenance inclus.",
              email: "contact@linsaem.fr",
              telephone: "+33189701526",
              address: { "@type": "PostalAddress", addressCountry: "FR" },
              sameAs: [
                "https://www.facebook.com/linsaem",
                "https://www.instagram.com/linsaem",
                "https://www.linkedin.com/company/linsaem",
              ],
              offers: [
                {
                  "@type": "Offer",
                  name: "Formule Starter",
                  price: "5.99",
                  priceCurrency: "EUR",
                  description: "Site one-page personnalisé avec hébergement inclus — 5,99€ TTC/mois",
                },
                {
                  "@type": "Offer",
                  name: "Formule Pro",
                  price: "7.99",
                  priceCurrency: "EUR",
                  description: "Site jusqu'à 3 pages avec design premium — 7,99€ TTC/mois",
                },
                {
                  "@type": "Offer",
                  name: "Formule Business",
                  price: "11.99",
                  priceCurrency: "EUR",
                  description: "Site jusqu'à 10 pages avec blog intégré — 11,99€ TTC/mois",
                },
              ],
            }),
          }}
        />
        {/* Schema.org — WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": "https://www.linsaem.fr/#website",
              name: "LINSAEM",
              url: "https://www.linsaem.fr",
              publisher: { "@id": "https://www.linsaem.fr/#organization" },
            }),
          }}
        />
        {/* Schema.org — Service */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              serviceType: "Création de sites web",
              provider: { "@type": "Organization", name: "LINSAEM" },
              areaServed: "FR",
              offers: [
                { "@type": "Offer", name: "Formule Starter", price: "5.99", priceCurrency: "EUR", billingDuration: "P1M", description: "Site one-page personnalisé avec hébergement inclus", priceSpecification: { "@type": "UnitPriceSpecification", price: "5.99", priceCurrency: "EUR", unitText: "MONTH", valueAddedTaxIncluded: true } },
                { "@type": "Offer", name: "Formule Pro", price: "7.99", priceCurrency: "EUR", billingDuration: "P1M", description: "Site jusqu’à 3 pages avec design premium", priceSpecification: { "@type": "UnitPriceSpecification", price: "7.99", priceCurrency: "EUR", unitText: "MONTH", valueAddedTaxIncluded: true } },
                { "@type": "Offer", name: "Formule Business", price: "11.99", priceCurrency: "EUR", billingDuration: "P1M", description: "Site jusqu’à 10 pages avec blog intégré", priceSpecification: { "@type": "UnitPriceSpecification", price: "11.99", priceCurrency: "EUR", unitText: "MONTH", valueAddedTaxIncluded: true } },
              ],
            }),
          }}
        />
        {/* Geo meta */}
        <meta name="geo.region" content="FR" />
        <meta name="geo.placename" content="France" />
        {/* Google Analytics — consent-mode v2 */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-ZKCPWNJNV1" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('consent', 'default', {
    analytics_storage: 'denied'
  });
  gtag('js', new Date());
  gtag('config', 'G-ZKCPWNJNV1');
`,
          }}
        />
      </head>
      <body className="font-sans bg-[#fafafa] text-[#111827] antialiased">
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
