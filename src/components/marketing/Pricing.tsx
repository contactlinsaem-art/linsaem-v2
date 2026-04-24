import Link from "next/link";
import { Check } from "lucide-react";

const PLANS = [
  {
    name: "Starter",
    price: "5,99",
    engagement: "Engagement 24 mois",
    ideal: "Idéal pour les auto-entrepreneurs",
    features: [
      "Site one-page personnalisé",
      "Design adapté à votre activité",
      "Responsive (mobile + desktop)",
      "Formulaire de contact",
      "Hébergement + domaine inclus",
      "Certificat SSL (https)",
      "Mise en ligne en 48-72h",
      "1 modification/mois incluse",
    ],
    cta: "Choisir Starter",
    featured: false,
    color: "sky",
  },
  {
    name: "Pro",
    price: "7,99",
    engagement: "Engagement 12 mois",
    ideal: "Idéal pour les TPE & artisans",
    features: [
      "Site jusqu'à 3 pages",
      "Design premium sur-mesure",
      "Responsive optimisé",
      "Galerie photos / Portfolio",
      "Intégration Google Maps",
      "Optimisation SEO de base",
      "Hébergement + domaine inclus",
      "3 modifications/mois incluses",
      "Support prioritaire",
    ],
    cta: "Choisir Pro",
    featured: true,
    color: "violet",
  },
  {
    name: "Business",
    price: "11,99",
    engagement: "Engagement 12 mois",
    ideal: "Idéal pour les PME",
    features: [
      "Site jusqu'à 10 pages",
      "Design haut de gamme",
      "Blog intégré",
      "Animations & effets",
      "SEO avancé + Google Analytics",
      "Formulaires avancés",
      "Hébergement premium + domaine",
      "Modifications illimitées",
      "Support VIP 7j/7",
    ],
    cta: "Choisir Business",
    featured: false,
    color: "pink",
  },
];

export function Pricing() {
  return (
    <section id="tarifs" className="py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="section-tag">Tarifs</div>
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Choisissez votre formule</h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Tout inclus, sans frais cachés. Annulez quand vous voulez après la période d&apos;engagement.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 max-w-5xl mx-auto stagger">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-3xl p-8 transition-all hover:-translate-y-1 ${
                plan.featured
                  ? "bg-gray-900 text-white shadow-2xl shadow-gray-900/30 ring-2 ring-gray-900"
                  : "bg-white border border-gray-100 shadow-sm"
              }`}
            >
              {plan.featured && (
                <div
                  className="absolute -top-4 left-1/2 -translate-x-1/2 text-white text-xs font-bold px-4 py-1.5 rounded-full"
                  style={{ background: "var(--gradient-alt)" }}
                >
                  ⭐ Le plus populaire
                </div>
              )}

              <div className={`text-sm font-semibold mb-1 ${plan.featured ? "text-gray-400" : "text-gray-500"}`}>
                {plan.name}
              </div>
              <div className="flex items-end gap-1 mb-1">
                <span className={`text-sm font-medium ${plan.featured ? "text-gray-300" : "text-gray-400"}`}>€</span>
                <span className="text-5xl font-extrabold">{plan.price}</span>
                <span className={`text-sm mb-2 ${plan.featured ? "text-gray-400" : "text-gray-400"}`}>/mois</span>
              </div>
              <div className={`text-xs mb-1 ${plan.featured ? "text-gray-400" : "text-gray-400"}`}>
                {plan.engagement}
              </div>
              <div className={`text-xs mb-6 ${plan.featured ? "text-violet-400" : "text-sky-500"}`}>{plan.ideal}</div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <Check
                      size={15}
                      className={`mt-0.5 flex-shrink-0 ${plan.featured ? "text-violet-400" : "text-sky-500"}`}
                    />
                    <span className={`text-sm ${plan.featured ? "text-gray-300" : "text-gray-600"}`}>{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/#contact"
                className={`block text-center py-3.5 rounded-2xl font-semibold text-sm transition-all hover:-translate-y-0.5 ${
                  plan.featured
                    ? "text-white shadow-lg"
                    : "bg-gray-900 text-white hover:bg-gray-800"
                }`}
                style={plan.featured ? { background: "var(--gradient-alt)" } : {}}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-gray-400 mt-8">* Frais de mise en service potentiels</p>
      </div>
    </section>
  );
}
