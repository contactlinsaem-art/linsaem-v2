import Image from "next/image";
import { Archivo } from "next/font/google";
import { BadgeCheck, Bath, Droplets, Flame, Phone, Search, ShieldCheck, Timer, Wrench, Waves } from "lucide-react";
import { DemoForm } from "./shared/DemoForm";
import robinet from "@/assets/modeles/ferrand-plomberie/robinet.jpg";
import tuyauterie from "@/assets/modeles/covers/artisan.jpg";
import perceuse from "@/assets/modeles/ferrand-plomberie/perceuse.jpg";

const archivo = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--ferrand" });

const large = "[font-stretch:115%]";
const TEL = { affichage: "01 99 00 41 27", lien: "+33199004127" };

const PRESTATIONS = [
  { icone: Droplets, titre: "Fuite et dégât des eaux", texte: "Recherche, coupure et réparation, même le week-end.", prix: "dès 89 €" },
  { icone: Waves, titre: "Débouchage", texte: "Évier, WC, douche ou colonne, au furet ou à l'hydrocurage.", prix: "dès 95 €" },
  { icone: Flame, titre: "Chauffe-eau et chaudière", texte: "Dépannage, entretien annuel et remplacement.", prix: "dès 120 €" },
  { icone: Bath, titre: "Salle de bains", texte: "Rénovation complète ou remplacement d'équipements.", prix: "sur devis" },
  { icone: Search, titre: "Recherche de fuite", texte: "Caméra thermique et gaz traceur, sans casse inutile.", prix: "dès 180 €" },
  { icone: Wrench, titre: "Installation", texte: "Robinetterie, adoucisseur, raccordements neufs.", prix: "sur devis" },
];

const ETAPES = [
  { titre: "Vous appelez", texte: "Un conseiller qualifie l'urgence et vous donne une heure d'arrivée." },
  { titre: "Diagnostic sur place", texte: "Le technicien explique la panne et chiffre la réparation avant de commencer." },
  { titre: "Réparation", texte: "Pièces courantes dans le camion : la plupart des pannes sont réglées en une visite." },
  { titre: "Facture claire", texte: "Le montant convenu, rien de plus. Paiement par carte ou virement." },
];

const COMMUNES = ["Nantes", "Rezé", "Saint-Herblain", "Orvault", "Carquefou", "Vertou", "Bouguenais", "Sainte-Luce-sur-Loire", "La Chapelle-sur-Erdre", "Basse-Goulaine"];

const champ =
  "w-full rounded-md border-2 border-slate-300 bg-white px-4 py-3 text-slate-900 focus:border-[#0c1b2e] focus:outline-none";

export function FerrandPlomberie() {
  return (
    <div className={`${archivo.variable} bg-[#f4f6f8] text-[#0c1b2e] [font-family:var(--ferrand)]`}>
      {/* Bandeau urgence */}
      <div className="bg-[#ffc53d] px-6 py-2.5 text-center text-sm font-semibold">
        Fuite ou dégât des eaux ? Intervention 7 j/7 :{" "}
        <a href={`tel:${TEL.lien}`} className="underline underline-offset-4">
          {TEL.affichage}
        </a>
      </div>

      <header className="sticky top-0 z-30 bg-[#0c1b2e] text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
          <p className={`${large} text-xl font-extrabold tracking-tight uppercase`}>
            Ferrand<span className="text-[#ffc53d]">.</span>plomberie
          </p>
          <nav aria-label="Menu Ferrand Plomberie" className="hidden gap-7 text-sm font-medium lg:flex">
            <a href="#prestations" className="hover:text-[#ffc53d]">Prestations</a>
            <a href="#intervention" className="hover:text-[#ffc53d]">Intervention</a>
            <a href="#zone" className="hover:text-[#ffc53d]">Zone</a>
            <a href="#devis" className="hover:text-[#ffc53d]">Devis</a>
          </nav>
          <a
            href={`tel:${TEL.lien}`}
            className="hidden items-center gap-2 rounded-md bg-[#ffc53d] px-4 py-2.5 text-sm font-bold text-[#0c1b2e] sm:inline-flex"
          >
            <Phone aria-hidden="true" size={16} /> {TEL.affichage}
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0c1b2e] text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 lg:grid-cols-2 lg:py-24">
          <div className="relative z-10">
            <p className="fade-up inline-flex items-center gap-2 rounded-md bg-white/10 px-3 py-1.5 text-sm">
              <BadgeCheck aria-hidden="true" size={16} className="text-[#ffc53d]" /> Artisan plombier chauffagiste depuis 2009
            </p>
            <h1 className={`fade-up ${large} mt-6 text-5xl leading-[0.95] font-extrabold tracking-tight uppercase [animation-delay:100ms] sm:text-6xl`}>
              Plombier à Nantes, <span className="text-[#ffc53d]">sur place en moins de 2 h</span>
            </h1>
            <p className="fade-up mt-6 max-w-lg text-lg leading-relaxed text-slate-200 [animation-delay:200ms]">
              Dépannage, débouchage, chauffe-eau et salle de bains. Le prix est annoncé avant l&apos;intervention.
            </p>
            <div className="fade-up mt-9 flex flex-col gap-3 sm:flex-row [animation-delay:300ms]">
              <a
                href={`tel:${TEL.lien}`}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-[#ffc53d] px-7 py-4 text-lg font-bold text-[#0c1b2e] transition-transform hover:-translate-y-0.5"
              >
                <Phone aria-hidden="true" size={20} /> Appeler maintenant
              </a>
              <a href="#devis" className="inline-flex items-center justify-center rounded-md border-2 border-white/60 px-7 py-4 text-lg font-bold hover:bg-white/10">
                Devis gratuit en ligne
              </a>
            </div>
            <ul className="mt-10 grid gap-3 text-sm sm:grid-cols-3">
              {[
                { icone: Timer, texte: "Urgences 7 j/7" },
                { icone: ShieldCheck, texte: "Garantie décennale" },
                { icone: BadgeCheck, texte: "Devis gratuit" },
              ].map(({ icone: Icone, texte }) => (
                <li key={texte} className="flex items-center gap-2">
                  <Icone aria-hidden="true" size={18} className="text-[#ffc53d]" /> {texte}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative h-80 lg:h-[30rem]">
            <div className="absolute inset-0 overflow-hidden rounded-xl [clip-path:polygon(12%_0,100%_0,100%_100%,0_100%)]">
              <Image
                src={robinet}
                alt="Robinet mitigeur chromé au-dessus d'une baignoire"
                fill
                priority
                fetchPriority="high"
                placeholder="blur"
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="slow-zoom object-cover"
              />
            </div>
            <div className="absolute -bottom-4 left-4 rounded-lg bg-white p-4 text-[#0c1b2e] shadow-2xl sm:left-10">
              <p className="text-xs font-semibold tracking-wider text-slate-600 uppercase">Délai moyen en urgence</p>
              <p className={`${large} text-3xl font-extrabold`}>1 h 40</p>
            </div>
          </div>
        </div>
      </section>

      {/* Prestations */}
      <section id="prestations" className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
        <h2 className={`${large} text-4xl font-extrabold tracking-tight uppercase`}>Prestations</h2>
        <p className="mt-3 max-w-xl text-slate-600">Prix de départ indicatifs, déplacement compris dans la zone d&apos;intervention.</p>
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PRESTATIONS.map(({ icone: Icone, titre, texte, prix }) => (
            <li key={titre} className="reveal group rounded-xl border border-slate-200 bg-white p-7 transition-colors hover:border-[#0c1b2e]">
              <span className="grid size-12 place-items-center rounded-lg bg-[#0c1b2e] text-[#ffc53d] transition-transform group-hover:-rotate-6">
                <Icone aria-hidden="true" size={24} />
              </span>
              <h3 className="mt-5 text-xl font-bold">{titre}</h3>
              <p className="mt-2 text-slate-600">{texte}</p>
              <p className="mt-5 inline-flex rounded-md bg-[#fff3d1] px-3 py-1 text-sm font-bold">{prix}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Intervention */}
      <section id="intervention" className="bg-white px-6 py-20 lg:py-28">
        <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <h2 className={`${large} text-4xl font-extrabold tracking-tight uppercase`}>Comment se passe une intervention</h2>
            <div className="mt-10 grid grid-cols-2 gap-4">
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl">
                <Image src={tuyauterie} alt="Tuyauterie et compteur de gaz fixés sur un mur de briques" fill placeholder="blur" sizes="(min-width: 1024px) 20vw, 45vw" className="object-cover" />
              </div>
              <div className="relative mt-10 aspect-[3/4] overflow-hidden rounded-xl">
                <Image src={perceuse} alt="Perceuse-visseuse sans fil rouge posée sur un plan de travail" fill placeholder="blur" sizes="(min-width: 1024px) 20vw, 45vw" className="object-cover" />
              </div>
            </div>
          </div>
          <ol className="space-y-4">
            {ETAPES.map((e, i) => (
              <li key={e.titre} className="reveal flex gap-5 rounded-xl bg-[#f4f6f8] p-6">
                <span aria-hidden="true" className={`${large} text-4xl font-extrabold text-[#6b7686]`}>
                  0{i + 1}
                </span>
                <div>
                  <h3 className="text-lg font-bold">{e.titre}</h3>
                  <p className="mt-1 text-slate-600">{e.texte}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Zone */}
      <section id="zone" className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <h2 className={`${large} text-4xl font-extrabold tracking-tight uppercase`}>Zone d&apos;intervention</h2>
            <p className="mt-4 text-slate-600">Nantes et toutes les communes à moins de 20 km, sans frais de déplacement.</p>
            <ul className="mt-8 flex flex-wrap gap-2">
              {COMMUNES.map((c) => (
                <li key={c} className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium">
                  {c}
                </li>
              ))}
            </ul>
          </div>
          <div aria-hidden="true" className="relative aspect-square overflow-hidden rounded-2xl bg-[#0c1b2e] bg-[radial-gradient(circle,rgb(255_255_255/0.12)_1px,transparent_1px)] [background-size:22px_22px]">
            <span className="absolute top-1/2 left-1/2 size-[70%] -translate-1/2 rounded-full border-2 border-dashed border-[#ffc53d]/60" />
            <span className="absolute top-1/2 left-1/2 size-[38%] -translate-1/2 rounded-full bg-[#ffc53d]/15" />
            <span className="absolute top-1/2 left-1/2 grid size-14 -translate-1/2 place-items-center rounded-full bg-[#ffc53d] text-[#0c1b2e] shadow-xl">
              <Wrench size={24} />
            </span>
          </div>
        </div>
      </section>

      {/* Devis */}
      <section id="devis" className="bg-[#0c1b2e] px-6 py-20 text-white lg:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <h2 className={`${large} text-4xl font-extrabold tracking-tight uppercase`}>Devis gratuit</h2>
            <p className="mt-4 text-lg text-slate-200">Réponse sous 24 h ouvrées. Pour une urgence, appelez directement.</p>
            <a href={`tel:${TEL.lien}`} className={`${large} mt-8 inline-flex items-center gap-3 text-3xl font-extrabold text-[#ffc53d]`}>
              <Phone aria-hidden="true" /> {TEL.affichage}
            </a>
          </div>
          <div className="rounded-xl bg-white p-7 text-[#0c1b2e] sm:p-10">
            <DemoForm submitLabel="Envoyer ma demande" submitClassName="rounded-md bg-[#0c1b2e] px-7 py-4 font-bold text-white" noteClassName="text-slate-600">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="ferrand-travaux" className="mb-1.5 block font-semibold">
                    Type de travaux
                  </label>
                  <select id="ferrand-travaux" className={champ} defaultValue={PRESTATIONS[0]?.titre}>
                    {PRESTATIONS.map((p) => (
                      <option key={p.titre}>{p.titre}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="ferrand-cp" className="mb-1.5 block font-semibold">
                    Code postal
                  </label>
                  <input id="ferrand-cp" inputMode="numeric" autoComplete="postal-code" className={champ} />
                </div>
              </div>
              <fieldset>
                <legend className="mb-2 font-semibold">Urgence</legend>
                <div className="flex flex-wrap gap-3">
                  {["Aujourd'hui", "Cette semaine", "Pas pressé"].map((u, i) => (
                    <label key={u} className="flex items-center gap-2 rounded-md border-2 border-slate-300 px-4 py-2.5 has-checked:border-[#0c1b2e] has-checked:bg-[#fff3d1]">
                      <input type="radio" name="ferrand-urgence" defaultChecked={i === 1} className="accent-[#0c1b2e]" /> {u}
                    </label>
                  ))}
                </div>
              </fieldset>
              <div>
                <label htmlFor="ferrand-message" className="mb-1.5 block font-semibold">
                  Description
                </label>
                <textarea id="ferrand-message" rows={4} className={champ} />
              </div>
              <div>
                <label htmlFor="ferrand-tel" className="mb-1.5 block font-semibold">
                  Téléphone
                </label>
                <input id="ferrand-tel" type="tel" autoComplete="tel" className={champ} />
              </div>
            </DemoForm>
          </div>
        </div>
      </section>

      <footer className="bg-[#08131f] px-6 py-8 pb-24 text-center text-sm text-slate-300 sm:pb-8">
        Ferrand Plomberie · Plombier chauffagiste à Nantes · Entreprise fictive
      </footer>

      {/* Appel fixe sur mobile */}
      <a
        href={`tel:${TEL.lien}`}
        className="fixed inset-x-4 bottom-4 z-40 flex items-center justify-center gap-2 rounded-md bg-[#ffc53d] py-4 font-bold text-[#0c1b2e] shadow-2xl sm:hidden"
      >
        <Phone aria-hidden="true" size={20} /> Appeler {TEL.affichage}
      </a>
    </div>
  );
}
