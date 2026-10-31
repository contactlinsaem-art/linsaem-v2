import Image from "next/image";
import { DM_Serif_Display, Karla } from "next/font/google";
import { Clock, MapPin, Phone } from "lucide-react";
import { Tabs } from "./shared/Tabs";
import { DemoForm } from "./shared/DemoForm";
import table from "@/assets/modeles/maison-olivette/table.jpg";
import salle from "@/assets/modeles/maison-olivette/salle.jpg";
import chef from "@/assets/modeles/maison-olivette/chef.jpg";
import plats from "@/assets/modeles/maison-olivette/plats.jpg";
import salade from "@/assets/modeles/maison-olivette/salade.jpg";
import pates from "@/assets/modeles/maison-olivette/pates.jpg";
import terrasse from "@/assets/modeles/maison-olivette/terrasse.jpg";

const display = DM_Serif_Display({ subsets: ["latin"], weight: "400", variable: "--olivette-display" });
const texte = Karla({ subsets: ["latin"], variable: "--olivette-texte" });

const serif = "[font-family:var(--olivette-display)]";

type Plat = { nom: string; detail: string; prix: string };

const CARTE: Record<string, Plat[]> = {
  Entrées: [
    { nom: "Panisse croustillante", detail: "Aïoli au safran, citron confit", prix: "9 €" },
    { nom: "Tomates anciennes", detail: "Burrata, huile d'olive de la vallée des Baux, basilic", prix: "13 €" },
    { nom: "Poulpe grillé", detail: "Pois chiches, paprika fumé, herbes fraîches", prix: "15 €" },
  ],
  Plats: [
    { nom: "Loup de ligne", detail: "Fenouil braisé, beurre blanc à l'anis", prix: "28 €" },
    { nom: "Épaule d'agneau confite", detail: "Sept heures au four, jus au romarin, légumes du marché", prix: "26 €" },
    { nom: "Orecchiette", detail: "Pesto de roquette, courgettes, pignons torréfiés", prix: "19 €" },
  ],
  Desserts: [
    { nom: "Tarte fine aux figues", detail: "Glace au miel de lavande", prix: "10 €" },
    { nom: "Navette en tiramisu", detail: "Fleur d'oranger, café de la maison", prix: "9 €" },
    { nom: "Fromages affinés", detail: "Sélection de la fromagerie du cours Julien", prix: "11 €" },
  ],
  Vins: [
    { nom: "Bandol rosé", detail: "Domaine en agriculture biologique, le verre", prix: "8 €" },
    { nom: "Cassis blanc", detail: "Marsanne et clairette, le verre", prix: "9 €" },
    { nom: "Côtes-de-Provence rouge", detail: "Syrah et grenache, la bouteille", prix: "34 €" },
  ],
};

const HORAIRES = [
  ["Mardi — jeudi", "12h — 14h · 19h30 — 22h"],
  ["Vendredi, samedi", "12h — 14h30 · 19h30 — 23h"],
  ["Dimanche", "12h — 15h"],
  ["Lundi", "Fermé"],
];

const champ = "w-full rounded-lg border border-[#1e2a1c]/25 bg-white px-4 py-3 focus:border-[#1e2a1c] focus:outline-none";

function LigneCarte({ plat }: { plat: Plat }) {
  return (
    <li className="py-5">
      <div className="flex items-baseline gap-3">
        <h3 className={`${serif} text-2xl`}>{plat.nom}</h3>
        <span aria-hidden="true" className="flex-1 translate-y-[-0.3rem] border-b border-dotted border-[#1e2a1c]/40" />
        <p className="font-bold">{plat.prix}</p>
      </div>
      <p className="mt-1 text-[#4b5547]">{plat.detail}</p>
    </li>
  );
}

export function MaisonOlivette() {
  return (
    <div className={`${display.variable} ${texte.variable} bg-[#f6f0e2] text-[#1e2a1c] [font-family:var(--olivette-texte)]`}>
      {/* Hero */}
      <section className="relative flex min-h-[90vh] flex-col overflow-hidden bg-[#1e2a1c] text-[#f6f0e2]">
        <Image src={table} quality={50} alt="" fill priority fetchPriority="high" placeholder="blur" sizes="100vw" className="slow-zoom object-cover opacity-55" />
        <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-[#1e2a1c] via-[#1e2a1c]/40 to-[#1e2a1c]/70" />
        <header className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
          <p className={`${serif} text-2xl`}>Maison Olivette</p>
          <nav aria-label="Menu Maison Olivette" className="hidden gap-8 text-sm font-semibold tracking-wider uppercase md:flex">
            <a href="#carte" className="hover:text-[#d9b46a]">La carte</a>
            <a href="#maison" className="hover:text-[#d9b46a]">La maison</a>
            <a href="#infos" className="hover:text-[#d9b46a]">Infos</a>
          </nav>
          <a href="#reserver" className="rounded-full border border-[#d9b46a] px-5 py-2 text-sm font-semibold text-[#d9b46a] hover:bg-[#d9b46a] hover:text-[#1e2a1c]">
            Réserver
          </a>
        </header>
        <div className="relative z-10 mx-auto my-auto w-full max-w-6xl px-6 py-16 text-center">
          <p className="fade-up inline-flex items-center gap-2 rounded-full bg-[#f6f0e2]/10 px-4 py-1.5 text-sm backdrop-blur">
            <Clock aria-hidden="true" size={15} className="text-[#d9b46a]" /> Ce soir : 19h30 — 22h
          </p>
          <h1 className={`fade-up ${serif} mt-8 text-6xl leading-none [animation-delay:100ms] sm:text-8xl lg:text-9xl`}>
            Maison <span className="text-[#d9b46a]">Olivette</span>
          </h1>
          <p className="fade-up mx-auto mt-6 max-w-xl text-lg text-[#e6dfcd] [animation-delay:200ms]">
            Cuisine méditerranéenne de saison, à deux pas du Vieux-Port de Marseille.
          </p>
          <div className="fade-up mt-10 flex flex-wrap justify-center gap-4 [animation-delay:300ms]">
            <a href="#reserver" className="rounded-full bg-[#d9b46a] px-8 py-4 font-bold text-[#1e2a1c] transition-transform hover:-translate-y-0.5">
              Réserver une table
            </a>
            <a href="#carte" className="rounded-full border border-[#f6f0e2]/50 px-8 py-4 font-bold hover:border-[#f6f0e2]">
              Découvrir la carte
            </a>
          </div>
        </div>
      </section>

      {/* La maison */}
      <section id="maison" className="mx-auto grid max-w-6xl items-center gap-14 px-6 py-24 md:grid-cols-2">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
          <Image src={chef} alt="Cuisinier émincant des herbes fraîches sur une planche à découper" fill placeholder="blur" sizes="(min-width: 768px) 45vw, 100vw" className="object-cover" />
        </div>
        <div>
          <p className="text-sm font-bold tracking-[0.25em] text-[#7a5c22] uppercase">La maison</p>
          <h2 className={`${serif} mt-4 text-5xl leading-tight`}>Le marché le matin, l&apos;assiette le soir</h2>
          <p className="mt-6 text-lg leading-relaxed text-[#3d4639]">
            La carte change avec les arrivages des pêcheurs et des maraîchers de Provence. Huit tables en salle, douze en
            terrasse, une cuisine ouverte : on vient ici comme chez des amis qui cuisinent bien.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-4">
            <div className="relative aspect-square overflow-hidden rounded-2xl">
              <Image src={salle} alt="Salle de restaurant aux tables dressées, chaises en bois et banquettes" fill placeholder="blur" sizes="(min-width: 768px) 22vw, 45vw" className="object-cover" />
            </div>
            <div className="relative aspect-square overflow-hidden rounded-2xl">
              <Image src={terrasse} alt="Terrasse couverte face à l'eau, tables blanches et chaises bleu clair" fill placeholder="blur" sizes="(min-width: 768px) 22vw, 45vw" className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Carte */}
      <section id="carte" className="bg-white px-6 py-24">
        <div className="mx-auto max-w-3xl">
          <h2 className={`${serif} text-center text-5xl sm:text-6xl`}>La carte</h2>
          <p className="mt-4 text-center text-[#4b5547]">Liste des allergènes disponible sur demande.</p>
          <div className="mt-12">
            <Tabs
              label="Carte du restaurant"
              listClassName="mb-8 flex flex-wrap justify-center gap-2"
              tabClasses={{
                base: "rounded-full px-6 py-2.5 font-semibold transition-colors",
                on: "bg-[#1e2a1c] text-[#f6f0e2]",
                off: "bg-[#f6f0e2] text-[#1e2a1c] hover:bg-[#ebe2cc]",
              }}
              tabs={Object.entries(CARTE).map(([rubrique, liste]) => ({
                label: rubrique,
                content: (
                  <ul className="divide-y divide-[#1e2a1c]/10">
                    {liste.map((p) => (
                      <LigneCarte key={p.nom} plat={p} />
                    ))}
                  </ul>
                ),
              }))}
            />
          </div>
        </div>
      </section>

      {/* Menu du midi */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid overflow-hidden rounded-[2rem] bg-[#1e2a1c] text-[#f6f0e2] md:grid-cols-2">
          <div className="p-10 sm:p-14">
            <p className="text-sm font-bold tracking-[0.25em] text-[#d9b46a] uppercase">Du mardi au vendredi</p>
            <h2 className={`${serif} mt-4 text-5xl`}>Le menu du midi</h2>
            <p className="mt-6 text-lg leading-relaxed text-[#e6dfcd]">
              Entrée et plat, ou plat et dessert, selon le marché du jour. Servi en 45 minutes pour les pauses courtes.
            </p>
            <p className={`${serif} mt-8 text-6xl text-[#d9b46a]`}>24 €</p>
          </div>
          <div className="relative min-h-72">
            <Image src={plats} alt="Assiettes de viande grillée et de légumes, herbes fraîches et sauce en coupelle" fill placeholder="blur" sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
          </div>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-6">
          <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem]">
            <Image src={salade} alt="Salade composée de feuilles vertes, oignon rouge, feta et olives" fill placeholder="blur" sizes="(min-width: 768px) 45vw, 50vw" className="object-cover" />
          </div>
          <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem]">
            <Image src={pates} alt="Farfalle au pesto et tomates cerises dans une assiette blanche" fill placeholder="blur" sizes="(min-width: 768px) 45vw, 50vw" className="object-cover" />
          </div>
        </div>
      </section>

      {/* Infos et réservation */}
      <section id="infos" className="bg-[#ebe2cc] px-6 py-24">
        <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-2">
          <div>
            <h2 className={`${serif} text-5xl`}>Horaires et accès</h2>
            <table className="mt-8 w-full text-left">
              <caption className="sr-only">Horaires de service</caption>
              <tbody>
                {HORAIRES.map(([jours, heures]) => (
                  <tr key={jours} className="border-b border-[#1e2a1c]/15">
                    <th scope="row" className="py-4 pr-4 font-bold">{jours}</th>
                    <td className="py-4 text-right">{heures}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <ul className="mt-8 space-y-4">
              <li className="flex gap-3">
                <MapPin aria-hidden="true" className="mt-0.5 shrink-0 text-[#7a5c22]" />
                Rue de la Paix-Marcel-Paul, Marseille 1er
              </li>
              <li className="flex gap-3">
                <Phone aria-hidden="true" className="mt-0.5 shrink-0 text-[#7a5c22]" />
                <a href="tel:+33465710101" className="font-bold underline underline-offset-4">
                  04 65 71 01 01
                </a>
              </li>
            </ul>
          </div>
          <div id="reserver" className="rounded-[2rem] bg-[#f6f0e2] p-8 sm:p-10">
            <h2 className={`${serif} text-4xl`}>Réserver une table</h2>
            <p className="mt-2 text-[#4b5547]">Confirmation par SMS dans l&apos;heure pendant les services.</p>
            <div className="mt-8">
              <DemoForm submitLabel="Demander la réservation" submitClassName="rounded-full bg-[#1e2a1c] px-8 py-4 font-bold text-[#f6f0e2]" noteClassName="text-[#4b5547]">
                <div className="grid gap-5 sm:grid-cols-[1.4fr_1fr_1fr]">
                  <div>
                    <label htmlFor="olivette-date" className="mb-1.5 block font-bold">Date</label>
                    <input id="olivette-date" type="date" className={champ} />
                  </div>
                  <div>
                    <label htmlFor="olivette-heure" className="mb-1.5 block font-bold">Heure</label>
                    <select id="olivette-heure" className={champ} defaultValue="20h">
                      {["12h", "12h30", "13h", "19h30", "20h", "20h30", "21h"].map((h) => (
                        <option key={h}>{h}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="olivette-couverts" className="mb-1.5 block font-bold">Couverts</label>
                    <select id="olivette-couverts" className={champ} defaultValue="2">
                      {["1", "2", "3", "4", "5", "6"].map((n) => (
                        <option key={n}>{n}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="olivette-nom" className="mb-1.5 block font-bold">Nom</label>
                    <input id="olivette-nom" autoComplete="name" className={champ} />
                  </div>
                  <div>
                    <label htmlFor="olivette-tel" className="mb-1.5 block font-bold">Téléphone</label>
                    <input id="olivette-tel" type="tel" autoComplete="tel" className={champ} />
                  </div>
                </div>
              </DemoForm>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#1e2a1c] px-6 py-8 text-center text-sm text-[#e6dfcd]">
        <span className={`${serif} text-lg text-[#f6f0e2]`}>Maison Olivette</span> · Restaurant à Marseille · Entreprise fictive
      </footer>
    </div>
  );
}
