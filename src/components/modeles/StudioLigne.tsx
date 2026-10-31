import Image, { type StaticImageData } from "next/image";
import { Syne } from "next/font/google";
import { ArrowUpRight } from "lucide-react";
import { FilterGrid } from "./shared/FilterGrid";
import { DemoForm } from "./shared/DemoForm";
import { Counter } from "./shared/Counter";
import maison from "@/assets/modeles/studio-ligne/maison.jpg";
import sejour from "@/assets/modeles/studio-ligne/sejour.jpg";
import verre from "@/assets/modeles/studio-ligne/verre.jpg";
import couloir from "@/assets/modeles/studio-ligne/couloir.jpg";
import villa from "@/assets/modeles/architecte/villa.jpg";

const display = Syne({ subsets: ["latin"], variable: "--ligne-display" });

const syne = "[font-family:var(--ligne-display)]";

type Projet = { numero: string; nom: string; lieu: string; annee: string; type: string; image: StaticImageData; alt: string };

const PROJETS: Projet[] = [
  { numero: "01", nom: "Pavillon Verre", lieu: "Lille", annee: "2024", type: "culturel", image: verre, alt: "Bâtiment aux façades de verre et aux volumes anguleux, sous un ciel clair" },
  { numero: "02", nom: "Appartement Volta", lieu: "Bordeaux", annee: "2024", type: "residentiel", image: sejour, alt: "Séjour lumineux aux murs blancs, canapé gris clair et pan de mur habillé de bois" },
  { numero: "03", nom: "Bureaux Nord", lieu: "Paris 10e", annee: "2023", type: "tertiaire", image: couloir, alt: "Long couloir de bureaux bordé de cloisons vitrées, sol gris clair" },
  { numero: "04", nom: "Villa Calanque", lieu: "Cassis", annee: "2022", type: "residentiel", image: villa, alt: "Villa blanche à toit plat et larges vitrages, piscine au premier plan" },
];

const TYPES = [
  { value: "tous", label: "Tous" },
  { value: "residentiel", label: "Résidentiel" },
  { value: "tertiaire", label: "Tertiaire" },
  { value: "culturel", label: "Culturel" },
];

const DEMARCHE = [
  { titre: "Écouter", texte: "Visite du site, usages, budget : le programme s'écrit avec vous avant le premier trait." },
  { titre: "Esquisser", texte: "Deux ou trois partis pris, en maquette et en images, pour choisir une direction." },
  { titre: "Concevoir", texte: "Plans détaillés, matériaux, permis de construire et consultation des entreprises." },
  { titre: "Suivre", texte: "Une visite de chantier par semaine, jusqu'à la remise des clés." },
];

const champ = "w-full border-0 border-b-2 border-[#141414]/25 bg-transparent px-0 py-3 focus:border-[#141414] focus:ring-0 focus:outline-none";

export function StudioLigne() {
  return (
    <div className={`${display.variable} bg-[#f2f1ed] text-[#141414]`}>
      <header className="mx-auto flex max-w-[90rem] items-center justify-between gap-6 px-6 py-6 sm:px-10">
        <p className={`${syne} text-lg font-bold tracking-tight`}>studio ligne</p>
        <nav aria-label="Menu Studio Ligne" className="flex gap-6 text-sm">
          <a href="#projets" className="hover:text-[#b0502c]">Projets</a>
          <a href="#demarche" className="hidden hover:text-[#b0502c] sm:inline">Démarche</a>
          <a href="#contact" className="hover:text-[#b0502c]">Contact</a>
        </nav>
      </header>

      {/* Hero typographique */}
      <section className="mx-auto max-w-[90rem] px-6 pt-10 sm:px-10 lg:pt-16">
        <p className="fade-up text-sm text-[#5c5a55]">Architecture et architecture intérieure — Bordeaux</p>
        <h1 className={`fade-up ${syne} mt-6 text-[clamp(3rem,9vw,8.5rem)] leading-[0.92] font-bold tracking-tight [animation-delay:100ms]`}>
          Des lieux simples,
          <br />
          pensés pour <span className="text-[#b0502c]">durer.</span>
        </h1>
        <div aria-hidden="true" className="grow-x mt-12 h-px bg-[#141414]" />
        <div className="mt-6 flex flex-wrap justify-between gap-4 text-sm text-[#5c5a55]">
          <p>Maisons, logements, lieux de travail</p>
          <p>48 projets livrés depuis 2013</p>
        </div>
      </section>

      <figure className="mx-auto mt-12 max-w-[90rem] px-6 sm:px-10">
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={maison}
            alt="Maison contemporaine à bardage sombre et grandes baies vitrées, éclairée de l'intérieur à la tombée du jour"
            fill
            priority
            fetchPriority="high"
            placeholder="blur"
            sizes="100vw"
            className="slow-zoom object-cover"
          />
        </div>
        <figcaption className="mt-3 flex justify-between text-sm text-[#5c5a55]">
          <span>Maison Arbre, Arcachon</span>
          <span>2025</span>
        </figcaption>
      </figure>

      {/* Projets */}
      <section id="projets" className="mx-auto max-w-[90rem] px-6 py-24 sm:px-10 lg:py-32">
        <div className="mb-12 grid gap-6 lg:grid-cols-2">
          <h2 className={`${syne} text-5xl font-bold tracking-tight sm:text-6xl`}>Projets</h2>
          <p className="max-w-md text-lg leading-relaxed text-[#3d3b37] lg:justify-self-end">
            Une sélection de réalisations récentes, du logement individuel aux lieux qui accueillent du public.
          </p>
        </div>
        <FilterGrid
          label="Filtrer les projets"
          all="tous"
          categories={TYPES}
          listClassName="mb-12 flex flex-wrap gap-x-8 gap-y-2 border-b border-[#141414]/15 pb-4"
          buttonClasses={{
            base: "py-1 text-sm transition-colors",
            on: "font-semibold text-[#141414] underline decoration-[#b0502c] decoration-2 underline-offset-8",
            off: "text-[#5c5a55] hover:text-[#141414]",
          }}
          gridClassName="grid gap-x-8 gap-y-16 md:grid-cols-2"
          items={PROJETS.map((p) => ({
            key: p.numero,
            category: p.type,
            node: (
              <article className="group">
                <div className="relative aspect-[4/3] overflow-hidden bg-[#e2e0da]">
                  <Image
                    src={p.image}
                    alt={p.alt}
                    fill
                    placeholder="blur"
                    sizes="(min-width: 768px) 45vw, 100vw"
                    className="object-cover grayscale-[30%] transition duration-700 group-hover:scale-[1.03] group-hover:grayscale-0"
                  />
                </div>
                <div className="mt-5 grid grid-cols-[3rem_1fr_auto] items-baseline gap-2">
                  <span className={`${syne} text-sm text-[#b0502c]`}>{p.numero}</span>
                  <h3 className={`${syne} text-2xl font-bold`}>{p.nom}</h3>
                  <ArrowUpRight aria-hidden="true" className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  <p className="col-start-2 text-sm text-[#5c5a55]">
                    {p.lieu} · {p.annee}
                  </p>
                </div>
              </article>
            ),
          }))}
        />
      </section>

      {/* Démarche */}
      <section id="demarche" className="bg-[#141414] px-6 py-24 text-[#f2f1ed] sm:px-10 lg:py-32">
        <div className="mx-auto max-w-[90rem]">
          <h2 className={`${syne} text-5xl font-bold tracking-tight sm:text-6xl`}>Démarche</h2>
          <ol className="mt-16 grid gap-px bg-[#f2f1ed]/15 sm:grid-cols-2 lg:grid-cols-4">
            {DEMARCHE.map((e, i) => (
              <li key={e.titre} className="reveal bg-[#141414] p-8 lg:pr-10">
                <span aria-hidden="true" className={`${syne} block text-7xl font-bold text-[#e3936f]`}>
                  {i + 1}
                </span>
                <h3 className={`${syne} mt-6 text-2xl font-bold`}>{e.titre}</h3>
                <p className="mt-3 leading-relaxed text-[#c9c7c1]">{e.texte}</p>
              </li>
            ))}
          </ol>
          <dl className="mt-20 grid gap-10 sm:grid-cols-3">
            {[
              { valeur: 48, label: "projets livrés" },
              { valeur: 12, label: "années d'activité" },
              { valeur: 6, label: "architectes et dessinateurs" },
            ].map((c) => (
              <div key={c.label} className="flex flex-col border-t border-[#f2f1ed]/25 pt-6">
                <dt className="text-[#c9c7c1]">{c.label}</dt>
                <dd className={`${syne} order-first text-6xl font-bold`}>
                  <Counter value={c.valeur} />
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto grid max-w-[90rem] gap-16 px-6 py-24 sm:px-10 lg:grid-cols-2 lg:py-32">
        <div>
          <h2 className={`${syne} text-5xl font-bold tracking-tight sm:text-6xl`}>Un projet ?</h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-[#3d3b37]">
            Décrivez-le en quelques lignes : terrain, surface, calendrier. Un premier rendez-vous sur place est offert.
          </p>
          <p className="mt-10 text-sm text-[#5c5a55]">Quai des Chartrons, Bordeaux</p>
          <a href="tel:+33536490000" className={`${syne} mt-2 inline-block text-3xl font-bold hover:text-[#b0502c]`}>
            05 36 49 00 00
          </a>
        </div>
        <DemoForm
          submitLabel="Envoyer"
          submitClassName="bg-[#141414] px-8 py-4 font-semibold text-[#f2f1ed]"
          noteClassName="text-[#5c5a55]"
        >
          <div>
            <label htmlFor="ligne-nom" className="text-sm text-[#3d3b37]">
              Nom
            </label>
            <input id="ligne-nom" autoComplete="name" className={champ} />
          </div>
          <div>
            <label htmlFor="ligne-email" className="text-sm text-[#3d3b37]">
              Email
            </label>
            <input id="ligne-email" type="email" autoComplete="email" className={champ} />
          </div>
          <div>
            <label htmlFor="ligne-projet" className="text-sm text-[#3d3b37]">
              Votre projet
            </label>
            <textarea id="ligne-projet" rows={4} className={champ} />
          </div>
        </DemoForm>
      </section>

      <footer className="mx-auto flex max-w-[90rem] flex-wrap justify-between gap-4 border-t border-[#141414]/15 px-6 py-8 text-sm text-[#5c5a55] sm:px-10">
        <p className={`${syne} font-bold text-[#141414]`}>studio ligne</p>
        <p>Cabinet d&apos;architecture · Entreprise fictive</p>
      </footer>
    </div>
  );
}
