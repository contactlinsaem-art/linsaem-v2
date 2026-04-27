"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";

const PROJECTS = [
  {
    title: "CÉLESTE — Boutique Mode",
    category: "Site Vitrine Showcase",
    desc: "Un site boutique élégant avec lookbook, galerie filtrée, carousel et animations soignées. Tout ce qu'on peut créer pour vous.",
    features: [
      "Lookbook interactif avec carousel",
      "Galerie collection avec filtres",
      "Animations au scroll élégantes",
      "Design bohème chic sur-mesure",
    ],
    tags: ["Showcase", "Mode", "Sur-mesure"],
    href: "/demos/vitrine",
    bg: "from-stone-800 to-stone-600",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80",
  },
  {
    title: "La Boulangerie Dorée",
    category: "Site Vitrine",
    desc: "Site vitrine élégant pour une boulangerie artisanale avec présentation des produits, horaires et localisation.",
    features: ["Galerie de produits avec photos HD", "Horaires d'ouverture en temps réel", "Plan d'accès interactif Google Maps", "Commande par téléphone en un clic"],
    tags: ["Starter", "One-page", "Livré en 48h"],
    href: "/demos/boulangerie",
    bg: "from-amber-50 to-orange-50",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80",
  },
  {
    title: "Plomberie Martin",
    category: "Site Professionnel",
    desc: "Site professionnel multi-pages pour un artisan plombier avec système de devis en ligne.",
    features: ["Formulaire de devis personnalisé", "Section témoignages clients avec notes", "Affichage des certifications RGE", "Bouton d'appel d'urgence visible"],
    tags: ["Pro", "3 pages", "SEO optimisé"],
    href: "/demos/artisan",
    bg: "from-blue-50 to-sky-50",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80",
  },
  {
    title: "Studio Architecture Moderne",
    category: "Portfolio",
    desc: "Portfolio élégant pour un cabinet d'architecture avec galerie de projets et présentation de l'équipe.",
    features: ["Galerie projets avec filtres par catégorie", "Présentation détaillée de l'équipe", "Téléchargement de plaquette PDF", "Formulaire de contact multi-étapes"],
    tags: ["Pro", "Portfolio", "Design premium"],
    href: "/demos/architecte",
    bg: "from-stone-50 to-gray-50",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80",
  },
  {
    title: "Sophie Lens Photographe",
    category: "Portfolio + Réservation",
    desc: "Portfolio créatif avec galerie haute définition et système de réservation en ligne pour shootings photo.",
    features: ["Galerie plein écran avec zoom HD", "Système de réservation et paiement", "Gestion des disponibilités en temps réel", "Catégories shooting personnalisées"],
    tags: ["Business", "E-commerce", "Réservation"],
    href: "/demos/photographe",
    bg: "from-rose-50 to-pink-50",
    image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800&q=80",
  },
  {
    title: "La Table Provençale",
    category: "Site Restaurant",
    desc: "Site élégant pour un restaurant gastronomique avec carte en ligne, réservation et présentation du chef.",
    features: ["Carte en ligne avec photos HD", "Système de réservation en ligne", "Présentation de l'équipe", "Horaires et plan d'accès"],
    tags: ["Pro", "Restaurant", "Réservation"],
    href: "/demos/restaurant",
    bg: "from-green-950 to-amber-950",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
  },
  {
    title: "Coach Sarah Martin",
    category: "Site Coach",
    desc: "Site professionnel pour une coach certifiée avec programmes, témoignages clients et calendrier de réservation.",
    features: ["Présentation des programmes", "Calendrier de réservation intégré", "Témoignages clients animés", "Blog & ressources gratuites"],
    tags: ["Business", "Coach", "Réservation"],
    href: "/demos/coach",
    bg: "from-gray-950 to-green-950",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
  },
];

export function Portfolio() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [progressKey, setProgressKey] = useState(0);
  const pauseUntilRef = useRef<number>(0);
  const touchStartXRef = useRef<number | null>(null);

  const goTo = useCallback((index: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrent(index);
      setProgressKey((k) => k + 1);
      setIsAnimating(false);
    }, 300);
  }, [isAnimating]);

  const prev = useCallback(() => {
    pauseUntilRef.current = Date.now() + 10000;
    goTo((current - 1 + PROJECTS.length) % PROJECTS.length);
  }, [current, goTo]);

  const next = useCallback(() => {
    pauseUntilRef.current = Date.now() + 10000;
    goTo((current + 1) % PROJECTS.length);
  }, [current, goTo]);

  // Auto-play
  useEffect(() => {
    const interval = setInterval(() => {
      if (Date.now() < pauseUntilRef.current) return;
      setIsAnimating(true);
      setTimeout(() => {
        setCurrent((c) => (c + 1) % PROJECTS.length);
        setProgressKey((k) => k + 1);
        setIsAnimating(false);
      }, 300);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Touch / swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartXRef.current;
    touchStartXRef.current = null;
    if (deltaX < -50) next();
    else if (deltaX > 50) prev();
  };

  const project = PROJECTS[current];

  return (
    <section id="realisations" className="py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="section-tag">Portfolio</div>
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Nos réalisations</h2>
          <p className="text-gray-500 text-lg">Des sites web sur-mesure pour chaque secteur d&apos;activité</p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div
            className={`card overflow-hidden bg-gradient-to-br ${project.bg} border-0 transition-all duration-300 ease-in-out ${
              isAnimating ? "opacity-0 scale-95 translate-x-4" : "opacity-100 scale-100 translate-x-0"
            }`}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Visual side */}
              <div className={`bg-gradient-to-br ${project.bg} relative overflow-hidden min-h-64`}>
                <a href={project.href} target="_blank" rel="noopener noreferrer" className="block absolute inset-0">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                </a>
                <div className="absolute bottom-4 left-4">
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-white/80 backdrop-blur px-4 py-2 rounded-full text-sm font-medium text-gray-700 hover:bg-white transition-colors"
                  >
                    <ExternalLink size={14} />
                    {project.category}
                  </a>
                </div>
              </div>

              {/* Info side */}
              <div className="p-8 bg-white">
                <div className="text-sm text-sky-500 font-semibold mb-2">{project.category}</div>
                <h3 className="text-2xl font-extrabold text-gray-900 mb-3">{project.title}</h3>
                <p className="text-gray-500 text-sm mb-5 leading-relaxed">{project.desc}</p>

                <ul className="space-y-2 mb-6">
                  {project.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-400 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full font-medium">
                      {tag}
                    </span>
                  ))}
                </div>

                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-sky-500 hover:text-sky-600 transition-colors"
                >
                  Voir le site <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              disabled={isAnimating}
              className={`w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-all shadow-sm group ${
                isAnimating ? "pointer-events-none opacity-50" : ""
              }`}
              aria-label="Précédent"
            >
              <ChevronLeft size={18} className="transition-transform group-hover:-translate-x-0.5" />
            </button>

            {/* Progress bars */}
            <div className="flex gap-2 items-center">
              {PROJECTS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { pauseUntilRef.current = Date.now() + 10000; goTo(i); }}
                  className="relative h-1.5 rounded-full overflow-hidden bg-gray-200 transition-all"
                  style={{ width: i === current ? "48px" : "8px" }}
                  aria-label={`Projet ${i + 1}`}
                >
                  {i === current && (
                    <span
                      key={progressKey}
                      className="absolute inset-y-0 left-0 rounded-full"
                      style={{
                        background: "linear-gradient(to right, #0ea5e9, #8b5cf6)",
                        animation: "progress-fill 5s linear forwards",
                        width: "0%",
                      }}
                    />
                  )}
                </button>
              ))}
            </div>

            <button
              onClick={next}
              disabled={isAnimating}
              className={`w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-all shadow-sm group ${
                isAnimating ? "pointer-events-none opacity-50" : ""
              }`}
              aria-label="Suivant"
            >
              <ChevronRight size={18} className="transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>

          <style>{`
            @keyframes progress-fill {
              from { width: 0%; }
              to { width: 100%; }
            }
          `}</style>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-500 mb-4">Votre secteur ne figure pas dans nos exemples ?</p>
          <Link href="/#contact" className="btn-gradient">
            Discutons de votre projet →
          </Link>
        </div>
      </div>
    </section>
  );
}
