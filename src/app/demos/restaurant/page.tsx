"use client";
import { useState } from "react";

type TabKey = "Entrées" | "Plats" | "Desserts";

const MENU: Record<TabKey, { name: string; desc: string; price: string }[]> = {
  "Entrées": [
    { name: "Soupe au pistou", desc: "Légumes du jardin, basilic frais, parmesan affiné", price: "12€" },
    { name: "Tapenade et crudités", desc: "Olives noires AOP, anchois de Méditerranée", price: "9€" },
    { name: "Salade niçoise", desc: "Thon frais, œuf mollet, anchois, olives Taggiasca", price: "14€" },
    { name: "Carpaccio de légumes", desc: "Courgettes, tomates cerises, huile d'olive, fleur de sel", price: "11€" },
  ],
  "Plats": [
    { name: "Daube provençale", desc: "Bœuf mijoté au vin rouge, herbes de Provence, carottes", price: "24€" },
    { name: "Brandade de morue", desc: "Morue effilochée, huile d'olive vierge, ail confit", price: "21€" },
    { name: "Tian de légumes", desc: "Courgettes, aubergines, tomates, thym, parmesan", price: "18€" },
    { name: "Magret de canard", desc: "Sauce miel et lavande, pommes sarladaises", price: "26€" },
  ],
  "Desserts": [
    { name: "Tarte au citron", desc: "Citrons de Menton, meringue italienne légère", price: "8€" },
    { name: "Crème brûlée lavande", desc: "Vanille de Madagascar, fleurs de lavande séchées", price: "7€" },
    { name: "Calissons d'Aix", desc: "Amandes, melon confit, eau de fleur d'oranger", price: "6€" },
    { name: "Mousse au chocolat", desc: "Chocolat noir 72%, fleur de sel, huile d'olive", price: "8€" },
  ],
};

const HORAIRES = [
  { jour: "Lundi", midi: "Fermé", soir: "Fermé" },
  { jour: "Mardi", midi: "12h — 14h30", soir: "19h30 — 22h" },
  { jour: "Mercredi", midi: "12h — 14h30", soir: "19h30 — 22h" },
  { jour: "Jeudi", midi: "12h — 14h30", soir: "19h30 — 22h" },
  { jour: "Vendredi", midi: "12h — 14h30", soir: "19h30 — 22h30" },
  { jour: "Samedi", midi: "12h — 15h", soir: "19h30 — 23h" },
  { jour: "Dimanche", midi: "12h — 15h30", soir: "Fermé" },
];

export default function RestaurantPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("Entrées");

  return (
    <div style={{ fontFamily: "Georgia, 'Times New Roman', serif", background: "#fdf6e3" }}>
      <style>{`
        @keyframes marquee-rest {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-rest { display: flex; animation: marquee-rest 30s linear infinite; white-space: nowrap; }
        .dish-row { transition: padding-left 0.2s; }
        .dish-row:hover { padding-left: 8px; }
      `}</style>

      {/* HERO */}
      <section className="min-h-screen flex items-center justify-center px-6 text-center relative overflow-hidden" style={{ background: "#1a3a2a" }}>
        <div className="absolute inset-0 opacity-10" style={{ background: "radial-gradient(circle at center, #d4a853 0%, transparent 65%)" }} />
        <div className="relative z-10">
          <div
            className="inline-block text-sm font-bold px-5 py-2 rounded-full mb-6"
            style={{ background: "rgba(212,168,83,0.15)", color: "#d4a853", border: "1px solid rgba(212,168,83,0.4)" }}
          >
            ⭐ Recommandé Michelin
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold mb-4" style={{ color: "#d4a853" }}>
            La Table Provençale
          </h1>
          <p className="text-xl mb-10" style={{ color: "#a8c4b0" }}>Cuisine du terroir — Aix-en-Provence</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="font-bold px-8 py-4 rounded-full text-lg transition-all hover:scale-105" style={{ background: "#d4a853", color: "#1a3a2a" }}>
              Réserver une table
            </button>
            <button className="font-bold px-8 py-4 rounded-full text-lg border-2 hover:bg-white/10 transition-all" style={{ borderColor: "#d4a853", color: "#d4a853" }}>
              Voir la carte
            </button>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div style={{ background: "#d4a853", color: "#1a3a2a" }} className="py-3 overflow-hidden">
        <div className="marquee-rest font-bold text-sm">
          {[0, 1].map((i) => (
            <span key={i} className="px-8">
              🍷 Ouvert midi et soir &nbsp;•&nbsp; 📍 Aix-en-Provence &nbsp;•&nbsp;
              📞 Réservation conseillée &nbsp;•&nbsp; 🌿 Produits locaux &nbsp;•&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* CARTE */}
      <section className="py-20 px-6" style={{ background: "#fdf6e3" }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12" style={{ color: "#1a3a2a" }}>Notre Carte</h2>
          <div className="flex justify-center gap-2 mb-12">
            {(["Entrées", "Plats", "Desserts"] as TabKey[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="px-6 py-3 rounded-full text-sm font-bold transition-all"
                style={{
                  background: activeTab === tab ? "#1a3a2a" : "transparent",
                  color: activeTab === tab ? "#d4a853" : "#1a3a2a",
                  border: "2px solid #1a3a2a",
                }}
              >
                {tab}
              </button>
            ))}
          </div>
          <div>
            {MENU[activeTab].map((dish, i) => (
              <div
                key={dish.name}
                className="dish-row py-5 border-b"
                style={{ borderColor: "rgba(212,168,83,0.3)", transitionDelay: `${i * 50}ms` }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg" style={{ color: "#1a3a2a" }}>{dish.name}</h3>
                    <p className="text-sm mt-1" style={{ color: "#6b7280" }}>{dish.desc}</p>
                  </div>
                  <span className="font-bold text-lg ml-8 flex-shrink-0" style={{ color: "#d4a853" }}>{dish.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HISTOIRE */}
      <section className="py-20 px-6" style={{ background: "#1a3a2a" }}>
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6" style={{ color: "#d4a853" }}>Notre Histoire</h2>
            <p className="leading-relaxed mb-4" style={{ color: "#a8c4b0" }}>
              Fondée en 1998 par la famille Roux, La Table Provençale est bien plus qu&apos;un restaurant.
              C&apos;est un hommage vivant aux saveurs de la Provence, transmises de génération en génération.
            </p>
            <p className="leading-relaxed" style={{ color: "#a8c4b0" }}>
              Chaque matin, nous parcourons les marchés locaux pour sélectionner les meilleurs produits de saison.
              Notre cuisine est une célébration du terroir méditerranéen.
            </p>
          </div>
          <div
            className="rounded-2xl h-80 flex items-center justify-center"
            style={{ background: "linear-gradient(135deg,#2d5a3d,#1a3a2a)", border: "2px solid rgba(212,168,83,0.4)" }}
          >
            <div className="text-center">
              <div className="text-6xl mb-4">🌿</div>
              <p className="font-bold" style={{ color: "#d4a853" }}>Depuis 1998</p>
              <p className="text-sm mt-1" style={{ color: "#a8c4b0" }}>Aix-en-Provence</p>
            </div>
          </div>
        </div>
      </section>

      {/* RÉSERVATION */}
      <section className="py-20 px-6" style={{ background: "#fdf6e3" }}>
        <div className="max-w-xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-10" style={{ color: "#1a3a2a" }}>Réserver une Table</h2>
          <div className="space-y-5">
            {[
              { label: "Nom et prénom *", type: "text", placeholder: "Jean Dupont" },
              { label: "Téléphone *", type: "tel", placeholder: "+33 6 XX XX XX XX" },
              { label: "Date", type: "date" },
            ].map((f) => (
              <div key={f.label}>
                <label className="block text-sm font-bold mb-1.5" style={{ color: "#1a3a2a" }}>{f.label}</label>
                <input
                  type={f.type}
                  placeholder={f.placeholder}
                  className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none"
                  style={{ borderColor: "rgba(212,168,83,0.5)", background: "white" }}
                />
              </div>
            ))}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold mb-1.5" style={{ color: "#1a3a2a" }}>Heure</label>
                <select className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none bg-white" style={{ borderColor: "rgba(212,168,83,0.5)" }}>
                  {["12h00", "12h30", "13h00", "13h30", "19h30", "20h00", "20h30", "21h00"].map((h) => (
                    <option key={h}>{h}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold mb-1.5" style={{ color: "#1a3a2a" }}>Couverts</label>
                <select className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none bg-white" style={{ borderColor: "rgba(212,168,83,0.5)" }}>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                    <option key={n}>{n} {n === 1 ? "couvert" : "couverts"}</option>
                  ))}
                </select>
              </div>
            </div>
            <button className="w-full py-4 rounded-xl font-bold text-lg transition-all hover:scale-[1.02]" style={{ background: "#1a3a2a", color: "#d4a853" }}>
              Confirmer la réservation →
            </button>
          </div>
        </div>
      </section>

      {/* HORAIRES */}
      <section className="py-20 px-6" style={{ background: "#f5f0e8" }}>
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-10" style={{ color: "#1a3a2a" }}>Horaires</h2>
          <div className="rounded-2xl overflow-hidden" style={{ border: "2px solid rgba(212,168,83,0.4)" }}>
            {HORAIRES.map((h, i) => {
              const closed = h.midi === "Fermé" && h.soir === "Fermé";
              return (
                <div
                  key={h.jour}
                  className="flex items-center justify-between px-6 py-4"
                  style={{
                    background: i % 2 === 0 ? "white" : "#fdf6e3",
                    borderBottom: i < HORAIRES.length - 1 ? "1px solid rgba(212,168,83,0.2)" : "none",
                  }}
                >
                  <span className="font-bold" style={{ color: closed ? "#8b1a1a" : "#1a3a2a" }}>{h.jour}</span>
                  <div className="flex gap-6 text-sm">
                    <span style={{ color: h.midi === "Fermé" ? "#8b1a1a" : "#6b7280" }}>{h.midi}</span>
                    <span style={{ color: h.soir === "Fermé" ? "#8b1a1a" : "#1a3a2a", fontWeight: h.soir !== "Fermé" ? 600 : "normal" }}>{h.soir}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 px-6 text-center" style={{ background: "#1a3a2a", color: "#a8c4b0" }}>
        <p className="text-2xl font-bold mb-2" style={{ color: "#d4a853" }}>La Table Provençale</p>
        <p className="text-sm">12 rue des Artisans, Aix-en-Provence • +33 4 XX XX XX XX</p>
        <p className="text-xs mt-4 opacity-50">© 2025 La Table Provençale. Tous droits réservés.</p>
      </footer>
    </div>
  );
}
