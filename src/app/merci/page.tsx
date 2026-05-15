import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Merci pour votre message !",
  description: "Votre message a bien été reçu. Nous vous répondons sous 24h.",
  robots: { index: false, follow: false },
};

export default function MerciPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-20 min-h-[calc(100vh-80px)] flex items-center">
        <div className="max-w-xl mx-auto px-6 w-full text-center">
          <div className="card p-12">
            <CheckCircle size={64} className="text-green-500 mx-auto mb-6" />
            <h1 className="text-3xl font-extrabold text-gray-900 mb-3">
              Merci pour votre message !
            </h1>
            <p className="text-gray-500 mb-8 leading-relaxed">
              Nous vous répondons sous 24h.
            </p>
            <Link href="/" className="btn-primary justify-center">
              ← Retour à l&apos;accueil
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
