import Image, { type StaticImageData } from "next/image";
import { Manrope, Playfair_Display } from "next/font/google";
import { FilterGrid } from "./shared/FilterGrid";
import { DemoForm } from "./shared/DemoForm";
import bouquet from "@/assets/modeles/atelier-grain/bouquet.jpg";
import plage from "@/assets/modeles/photographe/mariage-provence.jpg";
import invites from "@/assets/modeles/photographe/couple.jpg";
import portraitRose from "@/assets/modeles/photographe/portrait-studio.jpg";
import portraitRire from "@/assets/modeles/photographe/portrait-artistique.jpg";
import conference from "@/assets/modeles/photographe/evenement.jpg";

const display = Playfair_Display({ subsets: ["latin"], style: "italic", variable: "--grain-display" });
const texte = Manrope({ subsets: ["latin"], variable: "--grain-texte" });

// Playfair en italique uniquement : la signature de l'atelier (et un seul fichier de police à charger).
const serif = "[font-family:var(--grain-display)] italic";

type Photo = { titre: string; categorie: string; image: StaticImageData; alt: string; haute?: boolean };

const PHOTOS: Photo[] = [
  { titre: "Bouquet de mariée", categorie: "mariage", image: bouquet, alt: "Mariée tenant un bouquet de fleurs claires dans une lumière dorée de fin de journée", haute: true },
  { titre: "Portrait, fond rose", categorie: "portrait", image: portraitRose, alt: "Portrait d'une jeune femme à frange devant un fond rose poudré" },
  { titre: "Sortie de cérémonie", categorie: "mariage", image: invites, alt: "Jeunes mariés s'embrassant sous une pluie de pétales, entourés de leurs invités" },
  { titre: "Conférence", categorie: "evenement", image: conference, alt: "Public assis dans une salle de conférence plongée dans la pénombre", haute: true },
  { titre: "Bord de mer", categorie: "mariage", image: plage, alt: "Couple de mariés enlacés sur une plage de galets, voile au vent", haute: true },
  { titre: "Éclat de rire", categorie: "portrait", image: portraitRire, alt: "Femme aux cheveux bruns riant aux éclats, pull rouge" },
];

const CATEGORIES = [
  { value: "tout", label: "Tout" },
  { value: "mariage", label: "Mariage" },
  { value: "portrait", label: "Portrait" },
  { value: "evenement", label: "Événement" },
];

const PRESTATIONS = [
  { titre: "Mariage", prix: "1 450 €", details: ["Des préparatifs à la soirée", "400 photos retouchées", "Galerie privée en ligne", "Rendez-vous de repérage"] },
  { titre: "Portrait", prix: "180 €", details: ["1 h en studio ou en extérieur", "15 photos retouchées", "Conseils de tenue", "Livraison sous 10 jours"] },
  { titre: "Entreprise", prix: "390 €", details: ["Portraits d'équipe, événements", "Demi-journée sur place", "Droits d'usage inclus", "Livraison sous 5 jours"] },
];


export function AtelierGrain() {
  return (
    <div className={`${display.variable} ${texte.variable} bg-[#0f0e0d] text-[#e9e4dc] [font-family:var(--grain-texte)]`}>
      {/* Hero plein écran */}
      <section className="relative flex min-h-[92vh] flex-col overflow-hidden">
        <Image
          src={bouquet}
          quality={50}
          alt=""
          fill
          priority
          fetchPriority="high"
          placeholder="blur"
          sizes="100vw"
          className="slow-zoom object-cover object-[50%_35%]"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-linear-to-b from-[#0f0e0d]/70 via-[#0f0e0d]/20 to-[#0f0e0d]" />
        <header className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6">
          <p className={`${serif} text-2xl`}>Atelier Grain</p>
          <nav aria-label="Menu Atelier Grain" className="flex gap-6 text-sm tracking-widest uppercase">
            <a href="#galerie" className="hover:text-[#c9a27a]">Galerie</a>
            <a href="#prestations" className="hidden hover:text-[#c9a27a] sm:inline">Prestations</a>
            <a href="#date" className="hover:text-[#c9a27a]">Contact</a>
          </nav>
        </header>
        <div className="relative z-10 mx-auto mt-auto w-full max-w-7xl px-6 pb-20">
          <p className="fade-up text-sm tracking-[0.3em] text-[#c9a27a] uppercase">Mariage · Portrait · Entreprise — Bordeaux</p>
          <h1 className={`fade-up ${serif} mt-5 max-w-4xl text-5xl leading-[1.05] [animation-delay:120ms] sm:text-7xl lg:text-8xl`}>
            Des images qui gardent <em className="text-[#c9a27a]">le grain du moment</em>
          </h1>
          <div className="fade-up mt-10 flex flex-wrap gap-4 [animation-delay:240ms]">
            <a href="#galerie" className="bg-[#e9e4dc] px-8 py-4 text-sm font-semibold tracking-widest text-[#0f0e0d] uppercase hover:bg-white">
              Voir la galerie
            </a>
            <a href="#date" className="border border-[#e9e4dc]/50 px-8 py-4 text-sm font-semibold tracking-widest uppercase hover:border-[#e9e4dc]">
              Vérifier une date
            </a>
          </div>
        </div>
      </section>

      {/* Galerie */}
      <section id="galerie" className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <h2 className={`${serif} text-5xl sm:text-6xl`}>Galerie</h2>
          <p className="max-w-sm text-[#a8a29e]">Lumière naturelle, peu de pose, beaucoup d&apos;attention aux instants entre deux.</p>
        </div>
        <FilterGrid
          label="Filtrer la galerie"
          all="tout"
          categories={CATEGORIES}
          listClassName="mb-10 flex flex-wrap gap-6"
          buttonClasses={{
            base: "border-b py-1 text-sm tracking-widest uppercase transition-colors",
            on: "border-[#c9a27a] text-[#c9a27a]",
            off: "border-transparent text-[#a8a29e] hover:text-[#e9e4dc]",
          }}
          gridClassName="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>li]:mb-5"
          items={PHOTOS.map((p) => ({
            key: p.titre,
            category: p.categorie,
            node: (
              <figure className="group relative overflow-hidden">
                <div className={`relative ${p.haute ? "aspect-[3/4]" : "aspect-[4/3]"}`}>
                  <Image
                    src={p.image}
                    alt={p.alt}
                    fill
                    placeholder="blur"
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>
                <figcaption className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/80 to-transparent p-4 pt-10 text-sm tracking-wide">
                  {p.titre}
                </figcaption>
              </figure>
            ),
          }))}
        />
      </section>

      {/* Approche */}
      <section className="border-y border-[#e9e4dc]/10 px-6 py-24">
        <blockquote className="mx-auto max-w-4xl text-center">
          <p className={`${serif} text-3xl leading-snug sm:text-5xl`}>
            « Je photographie ce qui se passe, pas ce qu&apos;on rejoue pour l&apos;appareil. »
          </p>
          <footer className="mt-8 text-sm tracking-[0.3em] text-[#a8a29e] uppercase">La démarche de l&apos;atelier</footer>
        </blockquote>
      </section>

      {/* Prestations */}
      <section id="prestations" className="mx-auto max-w-7xl px-6 py-24">
        <h2 className={`${serif} text-5xl sm:text-6xl`}>Prestations</h2>
        <ul className="mt-14 grid gap-px bg-[#e9e4dc]/10 md:grid-cols-3">
          {PRESTATIONS.map((p) => (
            <li key={p.titre} className="reveal bg-[#0f0e0d] p-8 md:p-10">
              <h3 className={`${serif} text-3xl`}>{p.titre}</h3>
              <p className="mt-4 text-sm text-[#a8a29e]">
                à partir de <span className={`${serif} text-3xl text-[#c9a27a]`}>{p.prix}</span>
              </p>
              <ul className="mt-8 space-y-3 text-[#d6d0c6]">
                {p.details.map((d) => (
                  <li key={d} className="flex gap-3">
                    <span aria-hidden="true" className="mt-2.5 h-px w-4 shrink-0 bg-[#c9a27a]" />
                    {d}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>

      {/* Demande de date */}
      <section id="date" className="bg-[#e9e4dc] px-6 py-24 text-[#0f0e0d]">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-2">
          <div>
            <h2 className={`${serif} text-5xl sm:text-6xl`}>
              Votre date est <em>libre ?</em>
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-[#45403a]">
              Les mariages se réservent souvent un an à l&apos;avance. Indiquez la date et le lieu : réponse sous 48 h.
            </p>
          </div>
          <DemoForm
            submitLabel="Demander la disponibilité"
            submitClassName="bg-[#0f0e0d] px-8 py-4 text-sm font-semibold tracking-widest text-[#e9e4dc] uppercase"
            noteClassName="text-[#45403a]"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="grain-type" className="mb-1.5 block text-sm font-semibold">
                  Prestation
                </label>
                <select id="grain-type" className="w-full border border-[#0f0e0d]/30 bg-white px-4 py-3 focus:border-[#0f0e0d] focus:outline-none">
                  {PRESTATIONS.map((p) => (
                    <option key={p.titre}>{p.titre}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="grain-date" className="mb-1.5 block text-sm font-semibold">
                  Date
                </label>
                <input id="grain-date" type="date" className="w-full border border-[#0f0e0d]/30 bg-white px-4 py-3 focus:border-[#0f0e0d] focus:outline-none" />
              </div>
            </div>
            <div>
              <label htmlFor="grain-lieu" className="mb-1.5 block text-sm font-semibold">
                Lieu
              </label>
              <input id="grain-lieu" className="w-full border border-[#0f0e0d]/30 bg-white px-4 py-3 focus:border-[#0f0e0d] focus:outline-none" />
            </div>
            <div>
              <label htmlFor="grain-email" className="mb-1.5 block text-sm font-semibold">
                Email
              </label>
              <input id="grain-email" type="email" autoComplete="email" className="w-full border border-[#0f0e0d]/30 bg-white px-4 py-3 focus:border-[#0f0e0d] focus:outline-none" />
            </div>
          </DemoForm>
        </div>
      </section>

      <footer className="px-6 py-8 text-center text-sm text-[#a8a29e]">
        <span className={`${serif} text-[#e9e4dc]`}>Atelier Grain</span> · Photographe à Bordeaux · Entreprise fictive
      </footer>
    </div>
  );
}
