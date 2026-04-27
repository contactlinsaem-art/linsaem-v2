"use client";
import { useEffect, useState } from "react";

const GALLERY = [
  { id: 1, title: "Portrait Studio",      category: "Portraits",   h: 256, image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=80" },
  { id: 2, title: "Mariage en Provence",   category: "Mariages",    h: 192, image: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=600&q=80" },
  { id: 3, title: "Fashion Week Paris",    category: "Mode",        h: 288, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80" },
  { id: 4, title: "Soirée Entreprise",     category: "Événements",  h: 192, image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80" },
  { id: 5, title: "Couple Bohème",         category: "Mariages",    h: 256, image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&q=80" },
  { id: 6, title: "Portrait Artistique",   category: "Portraits",   h: 224, image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80" },
];

const TESTIMONIALS = [
  { text: "Sophie a capturé les moments les plus beaux de notre mariage. Les photos sont absolument magnifiques.", name: "Julie & Pierre", type: "Mariage" },
  { text: "Séance portrait d'une profonde bienveillance. Je me suis sentie libre et les résultats sont incroyables.", name: "Clara M.", type: "Portrait" },
  { text: "Pour notre événement d'entreprise, les photos reflètent parfaitement l'ambiance et le professionnalisme.", name: "Thomas R.", type: "Événement" },
];

const CATEGORIES = ["Tous", "Portraits", "Mariages", "Événements", "Mode"];

export default function PhotographePage() {
  const [cursor, setCursor] = useState({ x: -100, y: -100 });
  const [activeFilter, setActiveFilter] = useState("Tous");
  const [currentTesti, setCurrentTesti] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => setCursor({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTesti((c) => (c + 1) % TESTIMONIALS.length), 3000);
    return () => clearInterval(timer);
  }, []);

  const filtered = activeFilter === "Tous" ? GALLERY : GALLERY.filter((g) => g.category === activeFilter);

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", background: "#0f0f0f", color: "white", cursor: "none" }}>
      {/* Custom cursor */}
      <div
        className="fixed pointer-events-none z-[100] w-5 h-5 rounded-full border-2"
        style={{ left: cursor.x - 10, top: cursor.y - 10, borderColor: "#ec4899", background: "rgba(236,72,153,0.15)", transition: "left 0.06s, top 0.06s" }}
      />

      {/* HERO */}
      <section className="min-h-screen flex items-center justify-center px-6 text-center">
        <div>
          <h1
            className="text-7xl lg:text-9xl font-extrabold mb-4"
            style={{ background: "linear-gradient(135deg,#ec4899,#8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
          >
            SOPHIE LENS
          </h1>
          <p className="text-xl text-gray-400 mb-8">Photographe — Portraits & Événements — Paris</p>
          <button
            className="font-bold px-8 py-4 rounded-full text-lg transition-all hover:scale-105"
            style={{ background: "linear-gradient(135deg,#ec4899,#8b5cf6)", color: "white" }}
          >
            Voir mon portfolio →
          </button>
        </div>
      </section>

      {/* GALLERY */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-extrabold text-center mb-8">Portfolio</h2>
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className="px-5 py-2 rounded-full text-sm font-semibold transition-all"
                style={{
                  background: activeFilter === cat ? "linear-gradient(135deg,#ec4899,#8b5cf6)" : "rgba(255,255,255,0.08)",
                  color: "white",
                  border: activeFilter === cat ? "none" : "1px solid rgba(255,255,255,0.15)",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="columns-1 md:columns-3 gap-4">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="relative break-inside-avoid mb-4 rounded-xl overflow-hidden cursor-none"
                onMouseEnter={() => setHovered(item.id)}
                onMouseLeave={() => setHovered(null)}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  style={{ width: "100%", height: item.h, objectFit: "cover", display: "block", transition: "transform 500ms ease", transform: hovered === item.id ? "scale(1.05)" : "scale(1)" }}
                />
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center rounded-xl transition-opacity duration-300"
                  style={{ background: "rgba(0,0,0,0.6)", opacity: hovered === item.id ? 1 : 0 }}
                >
                  <h3 className="text-white font-bold text-lg">{item.title}</h3>
                  <p className="text-sm" style={{ color: "#ec4899" }}>{item.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-20 px-6" style={{ background: "#111111" }}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-extrabold text-center mb-14">Prestations & Tarifs</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Séance Portrait", price: "150€", duration: "1h30", features: ["10 photos retouchées", "Studio ou extérieur", "Livraison en 7 jours", "Galerie privée en ligne"] },
              { title: "Mariage", price: "800€", duration: "Journée", features: ["400+ photos retouchées", "Cérémonie + soirée", "Album numérique HD", "Livraison en 4 semaines"] },
              { title: "Événement entreprise", price: "500€", duration: "Demi-journée", features: ["200+ photos retouchées", "Remise sous 5 jours", "Licence commerciale", "Rapport événementiel"] },
            ].map((s) => (
              <div
                key={s.title}
                className="rounded-2xl p-8"
                style={{ background: "rgba(255,255,255,0.05)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                <h3 className="font-bold text-xl mb-1">{s.title}</h3>
                <div className="text-3xl font-extrabold mb-1" style={{ color: "#ec4899" }}>{s.price}</div>
                <p className="text-gray-500 text-sm mb-6">{s.duration}</p>
                <ul className="space-y-2">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-300">
                      <span style={{ color: "#8b5cf6" }}>✓</span>{f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RÉSERVATION */}
      <section className="py-20 px-6" style={{ background: "linear-gradient(135deg,#ec4899,#8b5cf6)" }}>
        <div className="max-w-xl mx-auto">
          <h2 className="text-4xl font-extrabold text-center mb-10 text-white">Réserver une séance</h2>
          <div className="rounded-2xl p-8 space-y-4" style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(10px)" }}>
            {[
              { label: "Votre nom", type: "text" },
              { label: "Email", type: "email" },
              { label: "Date souhaitée", type: "date" },
            ].map((f) => (
              <div key={f.label}>
                <label className="block text-sm font-semibold text-white mb-1">{f.label}</label>
                <input type={f.type} className="w-full px-4 py-3 rounded-xl text-white placeholder-white/60 border border-white/30 focus:outline-none text-sm" style={{ background: "rgba(255,255,255,0.15)" }} />
              </div>
            ))}
            <div>
              <label className="block text-sm font-semibold text-white mb-1">Type de séance</label>
              <select className="w-full px-4 py-3 rounded-xl border border-white/30 focus:outline-none text-sm" style={{ background: "rgba(255,255,255,0.15)", color: "white" }}>
                <option value="">Sélectionnez...</option>
                <option>Portrait</option>
                <option>Mariage</option>
                <option>Événement entreprise</option>
                <option>Mode</option>
              </select>
            </div>
            <button className="w-full py-4 rounded-xl font-bold bg-white transition-all hover:bg-pink-50" style={{ color: "#be185d" }}>
              Envoyer ma demande →
            </button>
          </div>
        </div>
      </section>

      {/* TÉMOIGNAGES */}
      <section className="py-20 px-6 text-center" style={{ background: "#0f0f0f" }}>
        <h2 className="text-4xl font-extrabold mb-14">Ce qu&apos;ils disent</h2>
        <div className="max-w-2xl mx-auto">
          <div className="text-4xl mb-6" style={{ color: "#ec4899" }}>❝</div>
          <p className="text-xl italic text-gray-300 mb-6 leading-relaxed min-h-[80px] transition-all duration-500">
            {TESTIMONIALS[currentTesti].text}
          </p>
          <div>
            <div className="font-bold text-white">{TESTIMONIALS[currentTesti].name}</div>
            <div className="text-sm" style={{ color: "#ec4899" }}>{TESTIMONIALS[currentTesti].type}</div>
          </div>
          <div className="flex justify-center gap-2 mt-8">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentTesti(i)}
                className="h-2 rounded-full transition-all duration-300"
                style={{ width: i === currentTesti ? 20 : 8, background: i === currentTesti ? "#ec4899" : "rgba(255,255,255,0.2)" }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 px-6 text-center border-t border-white/10">
        <h3
          className="text-2xl font-extrabold mb-3"
          style={{ background: "linear-gradient(135deg,#ec4899,#8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
        >
          SOPHIE LENS
        </h3>
        <p className="text-gray-600 text-sm">contact@sophielens.fr • Paris, France</p>
        <div className="flex justify-center gap-6 mt-4 text-gray-600 text-sm">
          {["Instagram", "Pinterest", "LinkedIn"].map((s) => (
            <a key={s} href="#" className="hover:text-white transition-colors">{s}</a>
          ))}
        </div>
      </footer>
    </div>
  );
}
