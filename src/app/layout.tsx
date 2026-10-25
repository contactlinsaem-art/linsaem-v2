import type { Metadata, Viewport } from "next";
import { DM_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { entreprise } from "@/content/entreprise";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(entreprise.url),
  title: {
    default: "LINSAEM — Sites vitrines par abonnement et développement web sur mesure",
    template: "%s | LINSAEM",
  },
  description:
    "Sites vitrines professionnels hébergés et maintenus dès 5,99 € TTC par mois, et développement web sur mesure sur devis : applications, SaaS, intégrations.",
  applicationName: entreprise.nom,
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: entreprise.nom,
  },
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#0f172a",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={dmSans.variable} data-scroll-behavior="smooth">
      <body className="font-sans">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
