import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.linsaem.fr"),
  title: {
    default: "LINSAEM — Création site web dès 5,99€/mois",
    template: "%s | LINSAEM",
  },
  description:
    "Créez votre site web professionnel dès 5,99€/mois. Design sur-mesure, hébergement inclus, maintenance comprise. Livraison en 48h. Sans engagement après 12 mois.",
  keywords: [
    "création site web",
    "agence web",
    "site internet pas cher",
    "création site internet",
    "développeur web",
    "site vitrine",
    "design web",
    "5,99€/mois",
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
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: { canonical: "https://www.linsaem.fr" },
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
              name: "LINSAEM",
              url: "https://www.linsaem.fr",
              description: "Agence de création web professionnelle à prix accessible",
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
                  description: "Site one-page personnalisé avec hébergement inclus",
                },
                {
                  "@type": "Offer",
                  name: "Formule Pro",
                  price: "7.99",
                  priceCurrency: "EUR",
                  description: "Site jusqu'à 3 pages avec design premium",
                },
                {
                  "@type": "Offer",
                  name: "Formule Business",
                  price: "11.99",
                  priceCurrency: "EUR",
                  description: "Site jusqu'à 10 pages avec blog intégré",
                },
              ],
            }),
          }}
        />
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-ZKCPWNJNV1" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-ZKCPWNJNV1');`,
          }}
        />
      </head>
      <body className="font-sans bg-[#fafafa] text-[#111827] antialiased">{children}</body>
    </html>
  );
}
