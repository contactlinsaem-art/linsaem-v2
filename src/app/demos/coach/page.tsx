"use client";
import { useEffect, useState } from "react";

const PROGRAMS = [
  {
    name: "Starter",
    duration: "1 mois",
    price: "199€",
    popular: false,
    features: ["4 séances individuelles", "Programme personnalisé", "Support WhatsApp", "Accès ressources digitales"],
  },
  {
    name: "Pro",
    duration: "3 mois",
    price: "499€",
    popular: true,
    features: ["12 séances individuelles", "Suivi hebdomadaire", "Groupe privé WhatsApp", "Accès ressources digitales", "1 bilan mensuel", "Garantie résultat"],
  },
  {
    name: "Elite",
    duration: "6 mois",
    price: "899€",
    popular: false,
    features: ["24 séances individuelles", "Disponibilité prioritaire", "Communauté VIP", "Accès ressources digitales", "Bilans hebdomadaires", "Garantie résultat", "Suivi nutrition inclus"],
  },
];

const METHOD = [
  { step: "01", title: "Diagnostic", desc: "Bilan complet de votre situation, de vos objectifs et de vos blocages." },
  { step: "02", title: "Stratégie", desc: "Plan d'action personnalisé et mesurable adapté à votre rythme de vie." },
  { step: "03", title: "Implémentation", desc: "Mise en pratique des outils avec un soutien constant à chaque étape." },
  { step: "04", title: "Transformation", desc: "Consolidation des nouvelles habitudes et célébration des victoires." },
];

const SLOTS: Record<string, string[]> = {
  "Matin": ["8h00", "9h00", "10h00", "11h00"],
  "Après-midi": ["14h00", "15h00", "16h00", "17h00"],
  "Soir": ["18h00", "19h00", "20h00"],
};

export default function CoachPage() {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [barWidth, setBarWidth] = useState(0);
  const [counts, setCounts] = useState({ clients: 0, sessions: 0, satisfaction: 0 });
  const [countStarted, setCountStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setBarWidth(75), 500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !countStarted) setCountStarted(true); },
      { threshold: 0.3 }
    );
    const el = document.getElementById("about-coach");
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, [countStarted]);

  useEffect(() => {
    if (!countStarted) return;
    const steps = 60;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const p = step / steps;
      setCounts({ clients: Math.round(200 * p), sessions: Math.round(1500 * p), satisfaction: Math.round(98 * p) });
      if (step >= steps) clearInterval(timer);
    }, 30);
    return () => clearInterval(timer);
  }, [countStarted]);

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", background: "#0a0a0a", color: "white" }}>

      {/* HERO */}
      <section className="min-h-screen flex items-center px-6 py-24" style={{ background: "#0a0a0a" }}>
        <div className="max-w-4xl mx-auto">
          <span
            className="inline-block text-xs font-bold px-4 py-2 rounded-full mb-6"
            style={{ background: "rgba(34,197,94,0.12)", color: "#22c55e", border: "1px solid rgba(34,197,94,0.3)" }}
          >
            ✓ +200 clients transformés
          </span>
          <h1 className="text-6xl lg:text-8xl font-extrabold leading-tight mb-6">
            TRANSFORMEZ<br />
            VOTRE <span style={{ color: "#22c55e" }}>VIE</span>
          </h1>
          <p className="text-xl text-gray-400 mb-10 max-w-xl">
            Coaching personnel et professionnel. Atteignez vos objectifs, dépassez vos limites.
          </p>
          <button
            className="font-bold px-8 py-4 rounded-full text-lg transition-all hover:scale-105 mb-12"
            style={{ background: "#22c55e", color: "#0a0a0a" }}
          >
            Réserver ma séance découverte →
          </button>
          {/* Progress bar */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-400">Prochain groupe — places disponibles</span>
              <span className="font-bold" style={{ color: "#22c55e" }}>3 places restantes</span>
            </div>
            <div className="h-2 rounded-full" style={{ background: "#1a1a1a" }}>
              <div
                className="h-2 rounded-full transition-all duration-[2000ms] ease-out"
                style={{ width: `${barWidth}%`, background: "#22c55e" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* RÉSULTATS */}
      <section className="py-20 px-6" style={{ background: "#111111" }}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-extrabold text-center mb-14">Résultats clients</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { pct: "+85%", name: "Alexandre D.", text: "Confiance en soi retrouvée, promotion obtenue en 3 mois." },
              { pct: "−12kg", name: "Sarah M.", text: "Objectif minceur atteint et maintenu depuis 8 mois grâce à la méthode." },
              { pct: "×3", name: "Marc T.", text: "Chiffre d'affaires multiplié par 3 en 6 mois avec le coaching business." },
            ].map((r) => (
              <div key={r.name} className="rounded-2xl p-8" style={{ background: "#1a1a1a", border: "1px solid rgba(34,197,94,0.2)" }}>
                <div className="text-4xl font-extrabold mb-4" style={{ color: "#22c55e" }}>{r.pct}</div>
                <p className="text-gray-300 text-sm italic mb-4">&ldquo;{r.text}&rdquo;</p>
                <p className="font-bold text-sm">{r.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROGRAMMES */}
      <section className="py-20 px-6" style={{ background: "#0a0a0a" }}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-extrabold text-center mb-4">Programmes</h2>
          <p className="text-center text-gray-500 mb-14">Choisissez l&apos;accompagnement adapté à vos ambitions</p>
          <div className="grid md:grid-cols-3 gap-6">
            {PROGRAMS.map((p) => (
              <div
                key={p.name}
                className="rounded-2xl p-8 relative"
                style={{ background: "#1a1a1a", border: p.popular ? "2px solid #22c55e" : "1px solid rgba(255,255,255,0.1)" }}
              >
                {p.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold px-4 py-1 rounded-full" style={{ background: "#22c55e", color: "#0a0a0a" }}>
                    POPULAIRE
                  </div>
                )}
                <div className="text-lg font-bold mb-1">{p.name}</div>
                <div className="text-3xl font-extrabold mb-1" style={{ color: "#22c55e" }}>{p.price}</div>
                <div className="text-gray-500 text-sm mb-6">{p.duration}</div>
                <ul className="space-y-2 mb-8">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-300">
                      <span style={{ color: "#22c55e" }}>✓</span>{f}
                    </li>
                  ))}
                </ul>
                <button
                  className="w-full py-3 rounded-xl font-bold text-sm transition-all hover:scale-[1.02]"
                  style={{
                    background: p.popular ? "#22c55e" : "transparent",
                    color: p.popular ? "#0a0a0a" : "#22c55e",
                    border: p.popular ? "none" : "2px solid #22c55e",
                  }}
                >
                  Choisir ce programme
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MÉTHODE */}
      <section className="py-20 px-6" style={{ background: "#111111" }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-extrabold text-center mb-14">Ma Méthode</h2>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5" style={{ background: "rgba(34,197,94,0.3)" }} />
            <div className="space-y-10">
              {METHOD.map((m) => (
                <div key={m.step} className="flex gap-8">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center font-extrabold text-sm flex-shrink-0 z-10" style={{ background: "#22c55e", color: "#0a0a0a" }}>
                    {m.step}
                  </div>
                  <div className="pt-2">
                    <h3 className="font-bold text-xl mb-2">{m.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* À PROPOS */}
      <section id="about-coach" className="py-20 px-6" style={{ background: "#0a0a0a" }}>
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div
            className="rounded-2xl h-80 flex items-center justify-center"
            style={{ background: "#111111", border: "1px solid rgba(34,197,94,0.2)" }}
          >
            <div className="text-center">
              <div className="w-24 h-24 rounded-full flex items-center justify-center text-3xl font-extrabold mx-auto mb-4" style={{ background: "#22c55e", color: "#0a0a0a" }}>
                SM
              </div>
              <p className="text-white font-bold">Sarah Martin</p>
              <p className="text-xs text-gray-500 mt-1">Coach certifiée ICF & ACC</p>
            </div>
          </div>
          <div>
            <h2 className="text-4xl font-extrabold mb-6">À propos</h2>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Coach professionnelle certifiée depuis 8 ans, j&apos;ai accompagné plus de 200 personnes dans leur transformation personnelle et professionnelle. Ma méthode combine neurosciences, psychologie positive et développement personnel.
            </p>
            <div className="grid grid-cols-3 gap-6">
              {[
                { v: `${counts.clients}+`, l: "clients" },
                { v: counts.sessions, l: "séances" },
                { v: `${counts.satisfaction}%`, l: "satisfaction" },
              ].map((s) => (
                <div key={s.l} className="text-center">
                  <div className="text-2xl font-extrabold" style={{ color: "#22c55e" }}>{s.v}</div>
                  <div className="text-xs text-gray-500">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CALENDRIER */}
      <section className="py-20 px-6" style={{ background: "#111111" }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-extrabold text-center mb-4">Réserver une séance découverte</h2>
          <p className="text-center text-gray-500 mb-12">Gratuite — 30 minutes — Sans engagement</p>
          {Object.entries(SLOTS).map(([period, slots]) => (
            <div key={period} className="mb-8">
              <h3 className="text-sm font-bold tracking-widest text-gray-500 mb-4">{period.toUpperCase()}</h3>
              <div className="flex flex-wrap gap-3">
                {slots.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => setSelectedSlot(slot === selectedSlot ? null : slot)}
                    className="px-5 py-3 rounded-xl text-sm font-bold transition-all hover:scale-105"
                    style={{
                      background: selectedSlot === slot ? "#22c55e" : "#1a1a1a",
                      color: selectedSlot === slot ? "#0a0a0a" : "white",
                      border: selectedSlot === slot ? "none" : "1px solid rgba(34,197,94,0.3)",
                    }}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          ))}
          <button
            className="w-full py-4 rounded-xl font-bold text-lg mt-4 transition-all hover:scale-[1.02] disabled:opacity-40"
            style={{
              background: selectedSlot ? "#22c55e" : "#1a1a1a",
              color: selectedSlot ? "#0a0a0a" : "#4b5563",
              border: selectedSlot ? "none" : "1px solid #374151",
            }}
            disabled={!selectedSlot}
          >
            {selectedSlot ? `Confirmer le créneau : ${selectedSlot} →` : "Sélectionnez un créneau"}
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 px-6 text-center" style={{ background: "#000000", borderTop: "1px solid rgba(34,197,94,0.2)" }}>
        <p className="text-xl font-extrabold mb-2" style={{ color: "#22c55e" }}>Coach Sarah Martin</p>
        <p className="text-gray-600 text-sm">contact@sarah-martin-coach.fr • +33 6 XX XX XX XX</p>
        <p className="text-xs mt-4 text-gray-800">© 2025 Sarah Martin Coaching. Tous droits réservés.</p>
      </footer>
    </div>
  );
}
