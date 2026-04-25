"use client";
import { useEffect, useState } from "react";

const SPECIALITES = [
  { emoji: "🥖", name: "Baguette Tradition", desc: "Farine de blé française, fermentation lente 24h, croûte croustillante garantie." },
  { emoji: "🥐", name: "Croissant Pur Beurre", desc: "Feuilletage maison, beurre AOP Charentes-Poitou, doré à la perfection." },
  { emoji: "🍫", name: "Pain au Chocolat", desc: "Chocolat Valrhona 66%, pâte feuilletée pur beurre, fondant à cœur." },
];

const AVIS = [
  { text: "Le meilleur pain de la ville, sans hésitation ! Je viens tous les matins depuis 10 ans.", prenom: "Marie L.", ville: "Paris 11e" },
  { text: "Des croissants à tomber par terre. Le boulanger est un vrai artiste.", prenom: "Thomas B.", ville: "Paris 12e" },
  { text: "Accueil chaleureux et produits exceptionnels. Ma boulangerie de référence !", prenom: "Sophie M.", ville: "Vincennes" },
];

export default function BoulangeriePage() {
  const [visibleIds, setVisibleIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id) {
            setVisibleIds((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll("[data-animate]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const fc = (id: string) =>
    `transition-all duration-700 ${visibleIds.has(id) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`;

  return (
    <div style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
      <style>{`
        @keyframes marquee-b {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-b { display: flex; animation: marquee-b 25s linear infinite; white-space: nowrap; }
        .spec-card { transition: transform 0.25s, box-shadow 0.25s; }
        .spec-card:hover { transform: scale(1.05); box-shadow: 0 20px 40px rgba(245,158,11,0.2); }
      `}</style>

      {/* HERO */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ background: "#2c1207" }}
      >
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse at center, rgba(245,158,11,0.18) 0%, rgba(44,18,7,0.95) 70%)" }}
        />
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <span
            className="inline-block text-xs font-bold px-5 py-2 rounded-full mb-8 tracking-widest uppercase"
            style={{ background: "#f59e0b", color: "#2c1207" }}
          >
            🌾 Fait maison chaque jour
          </span>
          <h1 className="text-5xl lg:text-7xl font-bold mb-4 leading-tight" style={{ color: "#fef3c7" }}>
            La Boulangerie<br />
            <span style={{ color: "#f59e0b" }}>Dorée</span>
          </h1>
          <p className="text-xl mb-10" style={{ color: "#d6b896" }}>
            Artisan boulanger depuis 1987
          </p>
          <button
            className="font-bold px-9 py-4 rounded-full text-lg transition-all hover:scale-105 hover:shadow-2xl"
            style={{ background: "#f59e0b", color: "#2c1207" }}
          >
            Voir nos pains →
          </button>
        </div>
      </section>

      {/* MARQUEE */}
      <div style={{ background: "#f59e0b", color: "#2c1207" }} className="py-3 overflow-hidden">
        <div className="marquee-b font-bold text-sm">
          {[0, 1].map((i) => (
            <span key={i} className="px-6">
              🥖 Pains &nbsp;•&nbsp; 🥐 Viennoiseries &nbsp;•&nbsp; 🎂 Gâteaux &nbsp;•&nbsp;
              ☕ Café &nbsp;•&nbsp; 🥧 Tartes &nbsp;•&nbsp; 🍞 Baguettes tradition &nbsp;•&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* SPÉCIALITÉS */}
      <section className="py-20 px-6" style={{ background: "#fef9f0" }}>
        <div className="max-w-5xl mx-auto">
          <div id="spec-title" data-animate className={`text-center mb-14 ${fc("spec-title")}`}>
            <h2 className="text-4xl font-bold mb-3" style={{ color: "#92400e" }}>Nos Spécialités</h2>
            <p style={{ color: "#a16207" }}>Préparées avec passion chaque matin dès 4h</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {SPECIALITES.map((s, i) => (
              <div
                key={s.name}
                id={`spec-${i}`}
                data-animate
                className={`spec-card rounded-2xl p-8 text-center ${fc(`spec-${i}`)}`}
                style={{ background: "#fef3c7", border: "2px solid #f59e0b", transitionDelay: `${i * 100}ms` }}
              >
                <div className="text-6xl mb-4">{s.emoji}</div>
                <h3 className="text-xl font-bold mb-2" style={{ color: "#92400e" }}>{s.name}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#a16207" }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HORAIRES & LOCALISATION */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
          <div id="horaires" data-animate className={fc("horaires")}>
            <h2 className="text-3xl font-bold mb-8" style={{ color: "#92400e" }}>🕐 Horaires d&apos;ouverture</h2>
            <div className="space-y-3">
              {[
                ["Lundi — Vendredi", "6h30 — 20h00", false],
                ["Samedi", "6h00 — 19h30", false],
                ["Dimanche", "7h00 — 13h00", false],
                ["Fermeture hebdo", "Lundi", true],
              ].map(([jour, heure, closed]) => (
                <div key={String(jour)} className="flex justify-between items-center py-3 border-b" style={{ borderColor: "#fde68a" }}>
                  <span style={{ color: "#78350f" }} className="font-medium">{jour}</span>
                  <span
                    className="font-bold px-3 py-1 rounded-full text-sm"
                    style={{ background: closed ? "#fee2e2" : "#fef3c7", color: closed ? "#dc2626" : "#92400e" }}
                  >
                    {heure}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div id="location" data-animate className={fc("location")}>
            <h2 className="text-3xl font-bold mb-8" style={{ color: "#92400e" }}>📍 Nous trouver</h2>
            <div className="rounded-2xl p-8 h-64 flex flex-col justify-center" style={{ background: "#fef3c7" }}>
              <p className="text-lg font-bold mb-2" style={{ color: "#78350f" }}>La Boulangerie Dorée</p>
              <p style={{ color: "#a16207" }} className="mb-4">24 rue de la Paix<br />75001 Paris</p>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">🚇</span>
                <span style={{ color: "#a16207" }} className="text-sm">Métro Opéra — ligne 3, 7, 8</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xl">📞</span>
                <span style={{ color: "#92400e" }} className="font-bold">01 42 XX XX XX</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AVIS */}
      <section className="py-20 px-6" style={{ background: "#fef9f0" }}>
        <div className="max-w-5xl mx-auto">
          <div id="avis-title" data-animate className={`text-center mb-14 ${fc("avis-title")}`}>
            <h2 className="text-4xl font-bold mb-3" style={{ color: "#92400e" }}>Ce que disent nos clients</h2>
            <div className="flex justify-center gap-1 text-2xl">{"⭐".repeat(5)}</div>
            <p style={{ color: "#a16207" }} className="mt-2">4,9/5 sur Google — 200+ avis</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {AVIS.map((a, i) => (
              <div
                key={i}
                id={`avis-${i}`}
                data-animate
                className={`rounded-2xl p-6 ${fc(`avis-${i}`)}`}
                style={{ background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.3)", transitionDelay: `${i * 100}ms` }}
              >
                <div className="text-lg text-amber-400 mb-3">⭐⭐⭐⭐⭐</div>
                <p className="text-sm leading-relaxed mb-4 italic" style={{ color: "#78350f" }}>&ldquo;{a.text}&rdquo;</p>
                <div>
                  <div className="font-bold text-sm" style={{ color: "#92400e" }}>{a.prenom}</div>
                  <div className="text-xs" style={{ color: "#a16207" }}>{a.ville}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 text-center" style={{ background: "#2c1207" }}>
        <h2 className="text-4xl font-bold mb-4" style={{ color: "#fef3c7" }}>Commandez par téléphone</h2>
        <p className="text-lg mb-8" style={{ color: "#d6b896" }}>
          Réservez votre commande à l&apos;avance pour être sûr de trouver votre pain
        </p>
        <button
          className="font-bold px-10 py-5 rounded-full text-xl transition-all hover:scale-105 hover:shadow-2xl"
          style={{ background: "#f59e0b", color: "#2c1207" }}
        >
          📞 01 42 XX XX XX
        </button>
      </section>

      {/* FOOTER */}
      <footer className="py-10 px-6 text-center" style={{ background: "#1a0a02", color: "#d6b896" }}>
        <p className="text-2xl font-bold mb-2" style={{ color: "#f59e0b" }}>La Boulangerie Dorée</p>
        <p className="text-sm">24 rue de la Paix, 75001 Paris • Tél : 01 42 XX XX XX</p>
        <p className="text-xs mt-4 opacity-50">© 2025 La Boulangerie Dorée. Tous droits réservés.</p>
      </footer>
    </div>
  );
}
