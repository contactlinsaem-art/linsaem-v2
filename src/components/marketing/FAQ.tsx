"use client";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const FAQS = [
  { q: "Pourquoi c'est si peu cher ?", a: "On a optimisé nos processus pour créer des sites rapidement sans sacrifier la qualité. Pas de locaux coûteux, pas d'intermédiaires, des outils performants. On répercute ces économies sur nos prix." },
  { q: "Que se passe-t-il après la période d'engagement ?", a: "Votre abonnement continue au même tarif, mais sans engagement. Vous pouvez résilier à tout moment avec un préavis d'un mois. Vos données vous appartiennent et peuvent être exportées." },
  { q: "Est-ce que je peux modifier mon site moi-même ?", a: "Vous pouvez, mais vous n'avez pas besoin ! Envoyez-nous simplement un message depuis votre espace client avec vos modifications, on les fait pour vous sous 48h. C'est inclus dans votre abonnement." },
  { q: "Mon site sera-t-il bien référencé sur Google ?", a: "Oui ! Tous nos sites sont optimisés pour le SEO : structure propre, temps de chargement rapide, balises correctement renseignées, mobile-friendly. Les bases sont là pour un bon référencement." },
  { q: "Je n'ai pas de contenus (textes, photos), vous pouvez m'aider ?", a: "Oui absolument ! On peut rédiger vos textes professionnels et sélectionner des photos libres de droits adaptées à votre activité. Contactez-nous pour en discuter." },
  { q: "Comment fonctionne le paiement ?", a: "Paiement mensuel par carte bancaire via Stripe, 100% sécurisé. La première mensualité est due après validation de votre site. Factures disponibles chaque mois dans votre espace client." },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-28 bg-white">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="section-tag">FAQ</div>
          <h2 className="text-4xl font-extrabold text-gray-900">Questions fréquentes</h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <div key={i} className="card overflow-hidden">
              <button
                className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="font-semibold text-gray-900 text-sm pr-4">{faq.q}</span>
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                  {open === i ? <Minus size={14} /> : <Plus size={14} />}
                </span>
              </button>
              {open === i && (
                <div className="px-6 pb-6 text-sm text-gray-500 leading-relaxed border-t border-gray-50 pt-4 animate-fade-in">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
