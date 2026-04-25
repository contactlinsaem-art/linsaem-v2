"use client";
import { useEffect, useState } from "react";

const PROJECTS = [
  { title: "Villa Contemporaine", category: "Résidentiel", gradient: "linear-gradient(135deg,#4a3728,#2d1f14)" },
  { title: "Tour de Bureaux", category: "Commercial", gradient: "linear-gradient(135deg,#2d3748,#1a202c)" },
  { title: "Loft Haussmannien", category: "Rénovation", gradient: "linear-gradient(135deg,#3d4852,#252d36)" },
  { title: "Spa de Luxe", category: "Intérieur", gradient: "linear-gradient(135deg,#3a3530,#1e1a17)" },
];

const TEAM = [
  { name: "Martin Dubois", title: "Architecte principal", initials: "MD" },
  { name: "Léa Bernard", title: "Architecte d'intérieur", initials: "LB" },
  { name: "Paul Moreau", title: "Chef de projet", initials: "PM" },
];

export default function ArchitectePage() {
  const [scrolled, setScrolled] = useState(false);
  const [counts, setCounts] = useState({ projects: 0, years: 0, satisfaction: 0 });
  const [countStarted, setCountStarted] = useState(false);
  const [lineVisible, setLineVisible] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setLineVisible(true), 800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !countStarted) setCountStarted(true); },
      { threshold: 0.3 }
    );
    const el = document.getElementById("stats-archi");
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
      setCounts({ projects: Math.round(120 * p), years: Math.round(15 * p), satisfaction: Math.round(98 * p) });
      if (step >= steps) clearInterval(timer);
    }, 30);
    return () => clearInterval(timer);
  }, [countStarted]);

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", background: "#0a0a0a", color: "white" }}>
      <style>{`
        .proj-img { transition: transform 0.5s ease; }
        .proj-card:hover .proj-img { transform: scale(1.08); }
        .proj-overlay { opacity: 0; transition: opacity 0.35s; }
        .proj-card:hover .proj-overlay { opacity: 1; }
      `}</style>

      {/* NAV */}
      <nav
        className="fixed top-8 left-0 right-0 z-40 px-8 py-4 flex items-center justify-between transition-all duration-300"
        style={{
          background: scrolled ? "rgba(10,10,10,0.95)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(201,168,76,0.2)" : "none",
        }}
      >
        <span className="font-extrabold tracking-[0.25em] text-sm" style={{ color: "#c9a84c" }}>
          MARTIN ARCHITECTURE
        </span>
        <div className="hidden md:flex gap-8 text-xs tracking-widest text-gray-400">
          {["PROJETS", "PHILOSOPHIE", "ÉQUIPE", "CONTACT"].map((item) => (
            <a key={item} href={`#${item.toLowerCase().replace("É", "e").replace("Ê", "e")}`} className="hover:text-white transition-colors">
              {item}
            </a>
          ))}
        </div>
      </nav>

      {/* HERO */}
      <section className="min-h-screen flex items-center justify-center px-6 text-center pt-16">
        <div className="max-w-4xl">
          <h1 className="text-5xl lg:text-8xl font-extrabold tracking-[0.04em] leading-tight mb-8 uppercase">
            NOUS CRÉONS<br />DES ESPACES<br />
            <span style={{ color: "#c9a84c" }}>QUI DURENT</span>
          </h1>
          <div
            className="h-0.5 mx-auto mb-8 transition-all duration-[1500ms] ease-out"
            style={{ width: lineVisible ? "80px" : "0", background: "#c9a84c" }}
          />
          <p className="text-xl text-gray-400 mb-10 max-w-xl mx-auto">
            Cabinet d&apos;architecture haut de gamme. Résidentiel, commercial, rénovation.
          </p>
          <button className="font-bold px-8 py-4 text-sm tracking-widest border border-white text-white hover:bg-white hover:text-black transition-all">
            DÉCOUVRIR NOS PROJETS →
          </button>
        </div>
      </section>

      {/* STATS */}
      <section id="stats-archi" className="py-20 px-6" style={{ background: "#111111" }}>
        <div className="max-w-3xl mx-auto grid grid-cols-3 gap-12 text-center">
          {[
            { value: `${counts.projects}+`, label: "PROJETS RÉALISÉS" },
            { value: counts.years, label: "ANS D'EXPERTISE" },
            { value: `${counts.satisfaction}%`, label: "SATISFACTION CLIENT" },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-4xl font-extrabold mb-2" style={{ color: "#c9a84c" }}>{s.value}</div>
              <div className="text-xs tracking-widest text-gray-500">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PROJETS */}
      <section id="projets" className="py-20 px-6" style={{ background: "#0a0a0a" }}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-extrabold tracking-widest text-center mb-14 uppercase" style={{ color: "#c9a84c" }}>
            NOS PROJETS
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {PROJECTS.map((p, i) => (
              <div
                key={p.title}
                className="proj-card relative overflow-hidden cursor-pointer"
                style={{ height: "280px" }}
                onMouseEnter={() => setHoveredProject(i)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div
                  className="proj-img absolute inset-0"
                  style={{ background: p.gradient }}
                />
                <div
                  className="proj-overlay absolute inset-0 flex flex-col items-center justify-center"
                  style={{ background: "rgba(10,10,10,0.72)" }}
                >
                  <div className="h-0.5 w-12 mb-4" style={{ background: "#c9a84c" }} />
                  <h3 className="text-xl font-extrabold tracking-wider text-white mb-2">{p.title}</h3>
                  <p className="text-xs tracking-widest" style={{ color: "#c9a84c" }}>{p.category}</p>
                </div>
                <div className="absolute bottom-4 left-4">
                  <span className="text-xs tracking-widest text-gray-500">{p.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PHILOSOPHIE */}
      <section id="philosophie" className="py-24 px-6 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <div className="h-0.5 w-20 mx-auto mb-10" style={{ background: "#c9a84c" }} />
          <blockquote className="text-3xl italic leading-relaxed mb-8" style={{ color: "#0a0a0a", fontFamily: "Georgia, serif" }}>
            &ldquo;L'architecture, c'est le jeu savant, correct et magnifique des formes sous la lumière.&rdquo;
          </blockquote>
          <p className="text-gray-500 text-sm tracking-widest mb-2">— LE CORBUSIER</p>
          <div className="h-0.5 w-20 mx-auto mt-10" style={{ background: "#c9a84c" }} />
          <p className="text-gray-600 mt-10 leading-relaxed max-w-xl mx-auto">
            Chez Martin Architecture, chaque projet est une conversation entre la fonctionnalité et la beauté.
            Nous concevons des espaces qui durent, qui inspirent, qui vivent.
          </p>
        </div>
      </section>

      {/* ÉQUIPE */}
      <section id="equipe" className="py-20 px-6" style={{ background: "#111111" }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-extrabold tracking-widest text-center mb-14 uppercase" style={{ color: "#c9a84c" }}>
            L'ÉQUIPE
          </h2>
          <div className="grid md:grid-cols-3 gap-10 text-center">
            {TEAM.map((m) => (
              <div key={m.name}>
                <div className="w-24 h-24 rounded-full flex items-center justify-center text-2xl font-extrabold mx-auto mb-4" style={{ background: "#c9a84c", color: "#0a0a0a" }}>
                  {m.initials}
                </div>
                <h3 className="font-bold text-white mb-1">{m.name}</h3>
                <p className="text-xs tracking-widest text-gray-500 uppercase">{m.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-20 px-6" style={{ background: "#0a0a0a" }}>
        <div className="max-w-xl mx-auto">
          <h2 className="text-3xl font-extrabold tracking-widest text-center mb-12 uppercase" style={{ color: "#c9a84c" }}>CONTACT</h2>
          <div className="space-y-6">
            {["Nom", "Email", "Projet"].map((f) => (
              <div key={f} className="border-b border-gray-800 pb-2">
                <label className="block text-xs tracking-widest text-gray-500 mb-2 uppercase">{f}</label>
                <input type="text" className="w-full bg-transparent text-white text-sm focus:outline-none" placeholder={`Votre ${f.toLowerCase()}...`} />
              </div>
            ))}
            <div className="border-b border-gray-800 pb-2">
              <label className="block text-xs tracking-widest text-gray-500 mb-2 uppercase">Message</label>
              <textarea rows={4} className="w-full bg-transparent text-white text-sm focus:outline-none resize-none" placeholder="Décrivez votre projet..." />
            </div>
            <button className="w-full py-4 font-bold text-sm tracking-widest transition-all hover:opacity-90" style={{ background: "#c9a84c", color: "#0a0a0a" }}>
              ENVOYER →
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 px-6 text-center" style={{ background: "#000000", borderTop: "1px solid rgba(201,168,76,0.2)" }}>
        <p className="text-sm tracking-[0.3em] mb-2" style={{ color: "#c9a84c" }}>MARTIN ARCHITECTURE</p>
        <p className="text-xs text-gray-700">contact@martin-architecture.fr • Paris, France</p>
        <p className="text-xs mt-4 text-gray-800">© 2025 Martin Architecture.</p>
      </footer>
    </div>
  );
}
