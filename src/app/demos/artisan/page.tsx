"use client";
import { useEffect, useRef, useState } from "react";

const SERVICES = [
  { icon: "🔧", title: "Dépannage urgent", desc: "Intervention en moins de 2h, 24h/7j" },
  { icon: "🚿", title: "Installation", desc: "Pose sanitaires, robinetterie, douches" },
  { icon: "🏗️", title: "Rénovation", desc: "Réfection complète salle de bain" },
  { icon: "🔥", title: "Chaudière", desc: "Entretien, réparation, remplacement" },
  { icon: "🛁", title: "Salle de bain", desc: "Conception et installation clé en main" },
  { icon: "💧", title: "Détection de fuite", desc: "Localisation sans destruction" },
];

const POURQUOI = [
  "Certifié RGE et Qualibat — garantie de qualité",
  "Devis gratuit sous 2h par email",
  "Assurance décennale incluse dans tous nos travaux",
  "Équipe de 8 techniciens qualifiés disponibles",
];

const ETAPES = [
  { num: "01", titre: "Contact", desc: "Appelez-nous ou remplissez le formulaire en ligne" },
  { num: "02", titre: "Devis", desc: "Réception d'un devis détaillé gratuit sous 2h" },
  { num: "03", titre: "Intervention", desc: "Notre technicien intervient à la date choisie" },
  { num: "04", titre: "Garantie", desc: "Travaux garantis 2 ans pièces et main d'œuvre" },
];

export default function ArtisanPage() {
  const [counts, setCounts] = useState({ exp: 0, clients: 0, rating: 0 });
  const [started, setStarted] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const steps = 60;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const p = step / steps;
      setCounts({ exp: Math.round(15 * p), clients: Math.round(2000 * p), rating: parseFloat((4.9 * p).toFixed(1)) });
      if (step >= steps) clearInterval(timer);
    }, 30);
    return () => clearInterval(timer);
  }, [started]);

  return (
    <div style={{ fontFamily: "system-ui, sans-serif" }}>
      <style>{`
        .svc-card { transition: border-left-color 0.2s, transform 0.2s; border-left: 4px solid #e2e8f0; }
        .svc-card:hover { border-left-color: #f97316 !important; transform: translateX(4px); }
      `}</style>

      {/* HERO */}
      <section className="min-h-screen flex items-center px-6 py-24" style={{ background: "#1e3a5f" }}>
        <div className="max-w-5xl mx-auto w-full">
          <span className="inline-block text-xs font-bold px-4 py-2 rounded-full mb-6" style={{ background: "#f97316", color: "white" }}>
            ✓ Certifié RGE
          </span>
          <h1 className="text-5xl lg:text-7xl font-extrabold text-white mb-4">
            Plomberie <span style={{ color: "#f97316" }}>Martin</span>
          </h1>
          <p className="text-xl text-blue-200 mb-10">Dépannage & Installation — Île-de-France</p>
          <div className="flex flex-wrap gap-4 mb-16">
            <button className="font-bold px-8 py-4 rounded-full text-lg transition-all hover:scale-105" style={{ background: "#f97316", color: "white" }}>
              🚨 Appel d'urgence 24h/7j
            </button>
            <button className="font-bold px-8 py-4 rounded-full text-lg border-2 border-white text-white hover:bg-white/10 transition-all">
              Demander un devis
            </button>
          </div>
          <div ref={statsRef} className="grid grid-cols-3 gap-8 max-w-md">
            {[
              { value: `${counts.exp}+`, label: "ans d'expérience" },
              { value: `${counts.clients}+`, label: "clients satisfaits" },
              { value: `${counts.rating}/5`, label: "note Google" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl font-extrabold" style={{ color: "#f97316" }}>{s.value}</div>
                <div className="text-blue-300 text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* URGENCY BAND */}
      <div className="py-4 px-6 text-center font-bold" style={{ background: "#f97316", color: "white" }}>
        🔧 Urgence plomberie ? Intervention en moins de 2h — Appelez le{" "}
        <a href="tel:+33189701526" className="underline">+33 1 89 70 15 26</a>
      </div>

      {/* SERVICES */}
      <section className="py-20 px-6" style={{ background: "#f8fafc" }}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-extrabold text-center mb-14" style={{ color: "#1e3a5f" }}>Nos Services</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {SERVICES.map((s) => (
              <div key={s.title} className="svc-card bg-white rounded-xl p-6 shadow-sm">
                <div className="text-3xl mb-3">{s.icon}</div>
                <h3 className="font-bold text-lg mb-1" style={{ color: "#1e3a5f" }}>{s.title}</h3>
                <p className="text-sm text-gray-500">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* POURQUOI */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-extrabold mb-8" style={{ color: "#1e3a5f" }}>Pourquoi nous choisir ?</h2>
            <div className="space-y-4">
              {POURQUOI.map((p) => (
                <div key={p} className="flex items-start gap-3">
                  <span className="text-xl mt-0.5 font-bold" style={{ color: "#f97316" }}>✓</span>
                  <p className="text-gray-700">{p}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl p-10 text-center" style={{ background: "#1e3a5f" }}>
            <div className="text-5xl mb-4">🏆</div>
            <div className="text-4xl font-extrabold text-white mb-2">4,9/5</div>
            <div className="text-blue-200 mb-4">sur Google Reviews</div>
            <div className="text-3xl">⭐⭐⭐⭐⭐</div>
            <div className="text-blue-300 text-sm mt-2">Basé sur 234 avis</div>
          </div>
        </div>
      </section>

      {/* PROCESSUS */}
      <section className="py-20 px-6" style={{ background: "#1e3a5f" }}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-extrabold text-center text-white mb-14">Comment ça marche ?</h2>
          <div className="grid md:grid-cols-4 gap-8 relative">
            {ETAPES.map((e, i) => (
              <div key={e.num} className="text-center relative">
                <div className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-extrabold mx-auto mb-4" style={{ background: "#f97316", color: "white" }}>
                  {e.num}
                </div>
                {i < ETAPES.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] border-t-2 border-dashed" style={{ borderColor: "rgba(249,115,22,0.4)" }} />
                )}
                <h3 className="text-white font-bold text-lg mb-2">{e.titre}</h3>
                <p className="text-blue-200 text-sm">{e.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FORMULAIRE */}
      <section className="py-20 px-6" style={{ background: "#f8fafc" }}>
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-extrabold text-center mb-10" style={{ color: "#1e3a5f" }}>Demande de devis gratuit</h2>
          <div className="bg-white rounded-2xl p-8 shadow-sm space-y-5">
            {[
              { label: "Nom complet *", type: "text", placeholder: "Jean Martin" },
              { label: "Email *", type: "email", placeholder: "jean@email.fr" },
              { label: "Téléphone", type: "tel", placeholder: "06 XX XX XX XX" },
            ].map((f) => (
              <div key={f.label}>
                <label className="block text-sm font-semibold text-gray-700 mb-1">{f.label}</label>
                <input type={f.type} placeholder={f.placeholder} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300" />
              </div>
            ))}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Type de travaux</label>
              <select className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm bg-white focus:outline-none">
                <option>Dépannage urgent</option>
                <option>Installation sanitaire</option>
                <option>Rénovation salle de bain</option>
                <option>Chaudière</option>
                <option>Autre</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
              <textarea rows={4} placeholder="Décrivez votre problème..." className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none resize-none" />
            </div>
            <button className="w-full py-4 rounded-xl font-bold text-white text-lg transition-all hover:scale-[1.02]" style={{ background: "#f97316" }}>
              Recevoir mon devis gratuit →
            </button>
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section className="py-12 px-6 bg-white">
        <div className="max-w-3xl mx-auto flex flex-wrap justify-center gap-6">
          {["✅ Certifié RGE", "🏅 Qualibat", "🛡️ Assurance décennale", "⚡ Qualipac"].map((c) => (
            <div key={c} className="px-6 py-4 rounded-xl font-bold text-sm" style={{ background: "#eff6ff", color: "#1e3a5f" }}>
              {c}
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 px-6 text-center" style={{ background: "#1e3a5f", color: "#93c5fd" }}>
        <p className="text-2xl font-extrabold text-white mb-2">Plomberie Martin</p>
        <p className="text-sm">Île-de-France • +33 1 89 70 15 26 • contact@plomberie-martin.fr</p>
        <p className="text-xs mt-4 opacity-50">© 2025 Plomberie Martin. Tous droits réservés.</p>
      </footer>
    </div>
  );
}
