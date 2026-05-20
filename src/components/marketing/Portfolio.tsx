"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const PROJECTS = [
  {
    title: "CÉLESTE — Boutique Mode",
    category: "Boutique",
    href: "/demos/vitrine",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80",
  },
  {
    title: "La Boulangerie Dorée",
    category: "Vitrine",
    href: "/demos/boulangerie",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80",
  },
  {
    title: "Plomberie Martin",
    category: "Artisan",
    href: "/demos/artisan",
    image: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=800&q=80",
  },
  {
    title: "Studio Architecture",
    category: "Portfolio",
    href: "/demos/architecte",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80",
  },
  {
    title: "Sophie Lens Photographe",
    category: "Photographe",
    href: "/demos/photographe",
    image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800&q=80",
  },
  {
    title: "La Table Provençale",
    category: "Restaurant",
    href: "/demos/restaurant",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
  },
  {
    title: "Coach Sarah Martin",
    category: "Coach",
    href: "/demos/coach",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
  },
];

function PortfolioCard({
  project,
  index,
  isTall,
}: {
  project: (typeof PROJECTS)[0];
  index: number;
  isTall: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("pf-visible");
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <a
      ref={ref}
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      className={[
        "pf-card relative overflow-hidden rounded-2xl cursor-pointer block",
        isTall ? "md:row-span-2" : "",
      ].join(" ")}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <Image
        src={project.image}
        alt={project.title}
        fill
        className="pf-img object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
      <div className="pf-overlay absolute inset-0 flex flex-col items-center justify-center gap-3 p-5">
        <p className="pf-content text-white font-bold text-lg text-center leading-snug">
          {project.title}
        </p>
        <span className="pf-content text-xs text-white border border-white/60 px-3 py-1 rounded-full font-semibold uppercase tracking-wider">
          {project.category}
        </span>
        <span className="pf-content pf-btn text-sm text-white border border-white px-4 py-2 rounded-full font-medium">
          Voir le site →
        </span>
      </div>
    </a>
  );
}

export function Portfolio() {
  return (
    <section id="realisations" className="py-28 bg-gray-50">
      <style>{`
        .pf-card {
          opacity: 0;
          transform: translateY(20px);
        }
        @keyframes pfFadeUp {
          to { opacity: 1; transform: translateY(0); }
        }
        .pf-visible {
          animation: pfFadeUp 0.5s ease forwards;
        }
        .pf-img {
          transform: scale(1);
          transition: transform 0.4s ease;
        }
        .pf-overlay {
          background: rgba(0, 0, 0, 0);
          transition: background 0.3s ease;
        }
        .pf-content {
          opacity: 0;
          transform: translateY(8px);
          transition: opacity 0.3s ease 0.05s, transform 0.3s ease 0.05s;
        }
        .pf-btn {
          transition: background 0.2s ease, color 0.2s ease,
                      opacity 0.3s ease 0.05s, transform 0.3s ease 0.05s;
        }
        @media (hover: hover) {
          .pf-card:hover .pf-img { transform: scale(1.05); }
          .pf-card:hover .pf-overlay { background: rgba(0, 0, 0, 0.55); }
          .pf-card:hover .pf-content { opacity: 1; transform: translateY(0); }
          .pf-btn:hover { background: white; color: #111827; }
        }
        @media (hover: none) {
          .pf-overlay { background: rgba(0, 0, 0, 0.4); }
          .pf-content { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="section-tag">Portfolio</div>
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Nos réalisations</h2>
          <p className="text-gray-500 text-lg">Des sites web sur-mesure pour chaque secteur d&apos;activité</p>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          style={{ gap: "8px", gridAutoRows: "280px" }}
        >
          {PROJECTS.map((project, i) => (
            <PortfolioCard
              key={project.title}
              project={project}
              index={i}
              isTall={i === 0}
            />
          ))}
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