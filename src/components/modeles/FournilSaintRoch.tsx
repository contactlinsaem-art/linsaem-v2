import Image, { type StaticImageData } from "next/image";
import { Fraunces, Work_Sans } from "next/font/google";
import { Clock, MapPin, Phone, Wheat } from "lucide-react";
import { DemoForm } from "./shared/DemoForm";
import vitrine from "@/assets/modeles/fournil-saint-roch/vitrine.jpg";
import miches from "@/assets/modeles/fournil-saint-roch/miches.jpg";
import croissants from "@/assets/modeles/fournil-saint-roch/croissants.jpg";
import viennoiseries from "@/assets/modeles/fournil-saint-roch/viennoiseries.jpg";
import miche from "@/assets/modeles/fournil-saint-roch/miche.jpg";
import painsAuChocolat from "@/assets/modeles/fournil-saint-roch/pains-au-chocolat.jpg";
import pains from "@/assets/modeles/fournil-saint-roch/pains.jpg";
import painTranche from "@/assets/modeles/fournil-saint-roch/pain-tranche.jpg";

const display = Fraunces({ subsets: ["latin"], variable: "--fournil-display" });
const texte = Work_Sans({ subsets: ["latin"], variable: "--fournil-texte" });

const titre = "[font-family:var(--fournil-display)]";

const FOURNEES = [
  { heure: "6h30", titre: "Première fournée", detail: "Baguettes de tradition, pains de campagne, croissants et pains au chocolat." },
  { heure: "11h30", titre: "Avant le déjeuner", detail: "Baguettes, fougasses, sandwichs et quiches du jour." },
  { heure: "16h30", titre: "Pour le goûter et le soir", detail: "Pains spéciaux, brioches, chouquettes et une dernière fournée de baguettes." },
];

type Produit = { nom: string; detail: string; prix: string; image: StaticImageData; alt: string };

const PRODUITS: Produit[] = [
  { nom: "Miche au levain", detail: "Farine de blé T80, levain naturel, 1 kg", prix: "7,20 €", image: miche, alt: "Grosse miche de pain farinée, à la croûte fendue" },
  { nom: "Pain aux graines", detail: "Tournesol, lin, sésame, 500 g", prix: "4,60 €", image: miches, alt: "Pains ronds aux graines posés près d'épis de blé" },
  { nom: "Croissant pur beurre", detail: "Beurre AOP Charentes-Poitou", prix: "1,30 €", image: croissants, alt: "Deux croissants dorés saupoudrés de sucre glace sur fond sombre" },
  { nom: "Pain au chocolat", detail: "Deux barres de chocolat noir", prix: "1,40 €", image: painsAuChocolat, alt: "Plaque de pains au chocolat et de viennoiseries tout juste sortis du four" },
];

const HORAIRES = [
  ["Lundi", "Fermé"],
  ["Mardi — vendredi", "6h30 — 20h"],
  ["Samedi", "7h — 20h"],
  ["Dimanche", "7h — 13h30"],
];

const champ =
  "w-full rounded-xl border-2 border-[#e6d6bd] bg-white px-4 py-3 focus:border-[#8a3b12] focus:outline-none";

export function FournilSaintRoch() {
  return (
    <div className={`${display.variable} ${texte.variable} bg-[#fbf4e8] text-[#3b1d0c] [font-family:var(--fournil-texte)]`}>
      <div className="bg-[#8a3b12] px-6 py-2.5 text-center text-sm text-[#fbf4e8]">
        <span className="inline-flex items-center gap-2">
          <span aria-hidden="true" className="size-2 rounded-full bg-[#9ae6b4] motion-safe:animate-pulse" />
          Ouvert du mardi au dimanche · prochaine fournée à 16h30
        </span>
      </div>

      <header className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-6">
        <p className={`${titre} flex items-center gap-2 text-2xl font-semibold`}>
          <Wheat aria-hidden="true" className="text-[#b5641f]" />
          Fournil Saint-Roch
        </p>
        <nav aria-label="Menu du Fournil" className="hidden gap-8 font-medium md:flex">
          <a href="#fournees" className="hover:text-[#8a3b12]">Fournées</a>
          <a href="#produits" className="hover:text-[#8a3b12]">Nos pains</a>
          <a href="#commander" className="hover:text-[#8a3b12]">Commander</a>
          <a href="#infos" className="hover:text-[#8a3b12]">Horaires</a>
        </nav>
      </header>

      {/* Hero */}
      <section className="mx-auto grid max-w-6xl items-center gap-14 px-6 pt-6 pb-20 lg:grid-cols-2 lg:pb-28">
        <div>
          <p className="fade-up inline-flex rounded-full bg-[#f3e2c4] px-4 py-1.5 text-sm font-medium text-[#5c260b]">
            Boulangerie au levain, Montpellier
          </p>
          <h1 className={`fade-up ${titre} mt-6 text-5xl leading-[1.05] font-semibold [animation-delay:100ms] sm:text-6xl lg:text-7xl`}>
            Le pain du quartier, <span className="text-[#8a3b12]">cuit trois fois par jour</span>
          </h1>
          <p className="fade-up mt-6 max-w-lg text-lg leading-relaxed text-[#5c3b26] [animation-delay:200ms]">
            Farines de meuniers de la région, levain entretenu chaque matin et longues fermentations : du pain qui a du
            goût, et qui se garde.
          </p>
          <div className="fade-up mt-9 flex flex-wrap gap-3 [animation-delay:300ms]">
            <a href="#commander" className="rounded-full bg-[#8a3b12] px-7 py-3.5 font-semibold text-white transition-colors hover:bg-[#6d2d0c]">
              Commander pour demain
            </a>
            <a href="#fournees" className="rounded-full border-2 border-[#8a3b12] px-7 py-3.5 font-semibold text-[#8a3b12] hover:bg-[#8a3b12]/5">
              Les heures de fournée
            </a>
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="relative aspect-[4/5] overflow-hidden rounded-t-full rounded-b-3xl">
            <Image
              src={vitrine}
              alt="Comptoir de boulangerie garni de baguettes et de pains en corbeilles, étiquettes de prix sur ardoise"
              fill
              priority
              fetchPriority="high"
              placeholder="blur"
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="slow-zoom object-cover"
            />
          </div>
          <div className="absolute bottom-8 -left-4 rounded-2xl bg-white px-5 py-4 shadow-xl shadow-[#8a3b12]/15 sm:-left-10">
            <p className="text-sm text-[#5c3b26]">Sortie du four</p>
            <p className={`${titre} text-3xl font-semibold text-[#8a3b12]`}>16h30</p>
          </div>
        </div>
      </section>

      {/* Fournées */}
      <section id="fournees" className="bg-[#3b1d0c] px-6 py-20 text-[#fbf4e8]">
        <div className="mx-auto max-w-6xl">
          <h2 className={`${titre} text-4xl font-semibold sm:text-5xl`}>Trois fournées par jour</h2>
          <p className="mt-4 max-w-xl text-[#f0dcc2]">Pour trouver le pain encore tiède, passez juste après ces horaires.</p>
          <ol className="mt-12 grid gap-6 md:grid-cols-3">
            {FOURNEES.map((f) => (
              <li key={f.heure} className="reveal rounded-3xl border border-[#fbf4e8]/15 p-8">
                <p className={`${titre} flex items-center gap-3 text-5xl font-semibold text-[#f2b955]`}>
                  <Clock aria-hidden="true" size={28} />
                  {f.heure}
                </p>
                <h3 className="mt-5 text-lg font-semibold">{f.titre}</h3>
                <p className="mt-2 leading-relaxed text-[#f0dcc2]">{f.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Produits */}
      <section id="produits" className="mx-auto max-w-6xl px-6 py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className={`${titre} text-4xl font-semibold sm:text-5xl`}>Nos incontournables</h2>
          <p className="max-w-sm text-[#5c3b26]">Prix à l&apos;unité. La carte complète est affichée en boutique.</p>
        </div>
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUITS.map((p) => (
            <li key={p.nom} className="reveal group overflow-hidden rounded-3xl bg-white shadow-sm">
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={p.image}
                  alt={p.alt}
                  fill
                  placeholder="blur"
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className={`${titre} text-xl font-semibold`}>{p.nom}</h3>
                  <p className="shrink-0 font-semibold whitespace-nowrap text-[#8a3b12]">{p.prix}</p>
                </div>
                <p className="mt-1 text-sm text-[#6b4a35]">{p.detail}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Farine */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 pb-24 md:grid-cols-2">
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
          <Image
            src={painTranche}
            alt="Pain de campagne tranché sur une planche en bois"
            fill
            placeholder="blur"
            sizes="(min-width: 768px) 45vw, 100vw"
            className="object-cover"
          />
        </div>
        <div>
          <h2 className={`${titre} text-4xl font-semibold`}>
            Une farine qui vient <span className="text-[#8a3b12]">d&apos;à côté</span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-[#5c3b26]">
            Le blé est cultivé et moulu à moins de 80 km du fournil. Le levain, nourri chaque matin, donne une mie
            alvéolée et une croûte épaisse qui garde le pain frais deux à trois jours.
          </p>
          <div className="relative mt-8 aspect-[16/7] overflow-hidden rounded-2xl">
            <Image src={viennoiseries} alt="Vitrine de viennoiseries et de baguettes garnies" fill placeholder="blur" sizes="(min-width: 768px) 45vw, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      {/* Commande */}
      <section id="commander" className="bg-[#f3e2c4] px-6 py-24">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <h2 className={`${titre} text-4xl font-semibold sm:text-5xl`}>Commander pour le lendemain</h2>
            <p className="mt-5 text-lg leading-relaxed text-[#5c3b26]">
              Grosses pièces, plateaux de viennoiseries ou pains pour un repas : commandez avant 18h, retirez dès 7h le
              lendemain. Paiement en boutique.
            </p>
            <div className="relative mt-10 hidden aspect-[4/3] overflow-hidden rounded-3xl lg:block">
              <Image src={pains} alt="Assortiment de pains dorés : baguettes, pains ronds et petits pains" fill placeholder="blur" sizes="40vw" className="object-cover" />
            </div>
          </div>
          <div className="rounded-3xl bg-white p-8 sm:p-10">
            <DemoForm
              submitLabel="Envoyer la commande"
              submitClassName="rounded-full bg-[#8a3b12] px-7 py-4 font-semibold text-white"
              noteClassName="text-[#6b4a35]"
            >
              <div>
                <label htmlFor="fournil-produits" className="mb-1.5 block font-medium">
                  Votre commande
                </label>
                <textarea id="fournil-produits" rows={4} placeholder="Ex. : 2 miches au levain, 12 croissants" className={champ} />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="fournil-date" className="mb-1.5 block font-medium">
                    Jour de retrait
                  </label>
                  <input id="fournil-date" type="date" className={champ} />
                </div>
                <div>
                  <label htmlFor="fournil-heure" className="mb-1.5 block font-medium">
                    Heure
                  </label>
                  <select id="fournil-heure" className={champ} defaultValue="8h">
                    {["7h", "8h", "9h", "10h", "11h", "12h", "17h", "18h"].map((h) => (
                      <option key={h}>{h}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="fournil-nom" className="mb-1.5 block font-medium">
                    Nom
                  </label>
                  <input id="fournil-nom" autoComplete="name" className={champ} />
                </div>
                <div>
                  <label htmlFor="fournil-tel" className="mb-1.5 block font-medium">
                    Téléphone
                  </label>
                  <input id="fournil-tel" type="tel" autoComplete="tel" className={champ} />
                </div>
              </div>
            </DemoForm>
          </div>
        </div>
      </section>

      {/* Infos pratiques */}
      <section id="infos" className="mx-auto grid max-w-6xl gap-12 px-6 py-24 md:grid-cols-2">
        <div>
          <h2 className={`${titre} text-4xl font-semibold`}>Horaires</h2>
          <table className="mt-8 w-full text-left text-lg">
            <caption className="sr-only">Horaires d&apos;ouverture du Fournil Saint-Roch</caption>
            <tbody>
              {HORAIRES.map(([jour, heures]) => (
                <tr key={jour} className="border-b border-dashed border-[#d9c09b]">
                  <th scope="row" className="py-4 font-medium">{jour}</th>
                  <td className="py-4 text-right">{heures}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <h2 className={`${titre} text-4xl font-semibold`}>Nous trouver</h2>
          <ul className="mt-8 space-y-5 text-lg">
            <li className="flex gap-3">
              <MapPin aria-hidden="true" className="mt-1 shrink-0 text-[#8a3b12]" />
              Place Saint-Roch, quartier de l&apos;Écusson, Montpellier
            </li>
            <li className="flex gap-3">
              <Phone aria-hidden="true" className="mt-1 shrink-0 text-[#8a3b12]" />
              <a href="tel:+33465710000" className="underline underline-offset-4">
                04 65 71 00 00
              </a>
            </li>
          </ul>
          <div aria-hidden="true" className="mt-8 grid h-48 place-items-center rounded-3xl bg-[repeating-linear-gradient(45deg,#f3e2c4_0_12px,#efd9b4_12px_24px)]">
            <span className="grid size-12 place-items-center rounded-full bg-[#8a3b12] text-white shadow-lg">
              <MapPin size={22} />
            </span>
          </div>
        </div>
      </section>

      <footer className="bg-[#3b1d0c] px-6 py-8 text-center text-sm text-[#f0dcc2]">
        Fournil Saint-Roch · Boulangerie au levain · Entreprise fictive
      </footer>
    </div>
  );
}
