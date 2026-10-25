import { Tabs } from "./shared/Tabs";
import { DemoForm } from "./shared/DemoForm";

const CARTE: Record<string, { nom: string; desc: string; prix: string }[]> = {
  Entrées: [
    { nom: "Soupe au pistou", desc: "Légumes du jardin, basilic frais, parmesan affiné", prix: "12 €" },
    { nom: "Tapenade et crudités", desc: "Olives noires, anchois de Méditerranée", prix: "9 €" },
    { nom: "Salade niçoise", desc: "Thon frais, œuf mollet, anchois, olives", prix: "14 €" },
    { nom: "Carpaccio de légumes", desc: "Courgettes, tomates cerises, huile d'olive, fleur de sel", prix: "11 €" },
  ],
  Plats: [
    { nom: "Daube provençale", desc: "Bœuf mijoté au vin rouge, herbes de Provence, carottes", prix: "24 €" },
    { nom: "Brandade de morue", desc: "Morue effilochée, huile d'olive vierge, ail confit", prix: "21 €" },
    { nom: "Tian de légumes", desc: "Courgettes, aubergines, tomates, thym, parmesan", prix: "18 €" },
    { nom: "Magret de canard", desc: "Sauce miel et lavande, pommes sarladaises", prix: "26 €" },
  ],
  Desserts: [
    { nom: "Tarte au citron", desc: "Citrons de Menton, meringue italienne légère", prix: "8 €" },
    { nom: "Crème brûlée à la lavande", desc: "Vanille de Madagascar, fleurs de lavande séchées", prix: "7 €" },
    { nom: "Calissons d'Aix", desc: "Amandes, melon confit, eau de fleur d'oranger", prix: "6 €" },
    { nom: "Mousse au chocolat", desc: "Chocolat noir 72 %, fleur de sel, huile d'olive", prix: "8 €" },
  ],
};

const HORAIRES = [
  { jour: "Lundi", midi: "Fermé", soir: "Fermé" },
  { jour: "Mardi", midi: "12h — 14h30", soir: "19h30 — 22h" },
  { jour: "Mercredi", midi: "12h — 14h30", soir: "19h30 — 22h" },
  { jour: "Jeudi", midi: "12h — 14h30", soir: "19h30 — 22h" },
  { jour: "Vendredi", midi: "12h — 14h30", soir: "19h30 — 22h30" },
  { jour: "Samedi", midi: "12h — 15h", soir: "19h30 — 23h" },
  { jour: "Dimanche", midi: "12h — 15h30", soir: "Fermé" },
];

const vert = "#1a3a2a";
const champ = "w-full rounded-xl border border-[#b08a3e] bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#d4a853]";
const libelle = "mb-1.5 block text-sm font-bold text-[#1a3a2a]";

export function Restaurant() {
  return (
    <div className="bg-[#fdf6e3] font-serif text-[#1a3a2a]">
      <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden bg-[#1a3a2a] px-6 text-center">
        <div aria-hidden="true" className="absolute inset-0 opacity-10" style={{ background: "radial-gradient(circle at center, #d4a853 0%, transparent 65%)" }} />
        <div className="relative z-10">
          <p className="mb-6 inline-block rounded-full border border-[#d4a853]/40 bg-[#d4a853]/15 px-5 py-2 text-sm font-bold text-[#d4a853]">
            Cuisine du terroir
          </p>
          <h1 className="mb-4 text-5xl font-bold text-[#d4a853] lg:text-7xl">La Table Provençale</h1>
          <p className="mb-10 text-xl text-[#c3dacb]">Cuisine provençale — Aix-en-Provence</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#reserver" className="rounded-full bg-[#d4a853] px-8 py-4 text-lg font-bold text-[#1a3a2a] transition-transform hover:scale-105">
              Réserver une table
            </a>
            <a href="#carte" className="rounded-full border-2 border-[#d4a853] px-8 py-4 text-lg font-bold text-[#d4a853] hover:bg-white/10">
              Voir la carte
            </a>
          </div>
        </div>
      </section>

      <div aria-hidden="true" className="overflow-hidden bg-[#d4a853] py-3 text-sm font-bold text-[#1a3a2a]">
        <div className="marquee">
          {[0, 1].map((i) => (
            <span key={i} className="px-8 whitespace-nowrap">
              🍷 Ouvert midi et soir &nbsp;•&nbsp; 📍 Aix-en-Provence &nbsp;•&nbsp; 📞 Réservation conseillée &nbsp;•&nbsp; 🌿
              Produits locaux &nbsp;•&nbsp;
            </span>
          ))}
        </div>
      </div>

      <section id="carte" className="px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-12 text-center text-4xl font-bold">Notre carte</h2>
          <Tabs
            label="Carte du restaurant"
            listClassName="mb-12 flex justify-center gap-2"
            tabClasses={{
              base: "rounded-full border-2 border-[#1a3a2a] px-6 py-3 text-sm font-bold transition-colors",
              on: "bg-[#1a3a2a] text-[#d4a853]",
              off: "text-[#1a3a2a] hover:bg-[#1a3a2a]/5",
            }}
            tabs={Object.entries(CARTE).map(([rubrique, plats]) => ({
              label: rubrique,
              content: (
                <ul>
                  {plats.map((p) => (
                    <li key={p.nom} className="flex items-start justify-between border-b border-[#d4a853]/30 py-5">
                      <div>
                        <h3 className="text-lg font-bold">{p.nom}</h3>
                        <p className="mt-1 text-sm text-[#4b5563]">{p.desc}</p>
                      </div>
                      <p className="ml-8 shrink-0 text-lg font-bold text-[#8a6a1f]">{p.prix}</p>
                    </li>
                  ))}
                </ul>
              ),
            }))}
          />
        </div>
      </section>

      <section className="px-6 py-20" style={{ background: vert }}>
        <div className="mx-auto grid max-w-5xl items-center gap-12 md:grid-cols-2">
          <div>
            <h2 className="mb-6 text-4xl font-bold text-[#d4a853]">Notre histoire</h2>
            <p className="mb-4 leading-relaxed text-[#c3dacb]">
              Fondée en 1998, La Table Provençale est bien plus qu&apos;un restaurant : c&apos;est un hommage vivant aux
              saveurs de la Provence, transmises de génération en génération.
            </p>
            <p className="leading-relaxed text-[#c3dacb]">
              Chaque matin, nous parcourons les marchés locaux pour sélectionner les meilleurs produits de saison. Notre
              cuisine est une célébration du terroir méditerranéen.
            </p>
          </div>
          <div className="flex h-80 items-center justify-center rounded-2xl border-2 border-[#d4a853]/40 bg-linear-to-br from-[#2d5a3d] to-[#1a3a2a]">
            <div className="text-center">
              <p aria-hidden="true" className="mb-4 text-6xl">
                🌿
              </p>
              <p className="font-bold text-[#d4a853]">Depuis 1998</p>
              <p className="mt-1 text-sm text-[#c3dacb]">Aix-en-Provence</p>
            </div>
          </div>
        </div>
      </section>

      <section id="reserver" className="px-6 py-20">
        <div className="mx-auto max-w-xl">
          <h2 className="mb-10 text-center text-4xl font-bold">Réserver une table</h2>
          <DemoForm
            submitLabel="Confirmer la réservation →"
            submitClassName="rounded-xl bg-[#1a3a2a] py-4 text-lg font-bold text-[#d4a853] opacity-90"
            noteClassName="text-[#4b5563]"
          >
            <div>
              <label htmlFor="resto-nom" className={libelle}>Nom</label>
              <input id="resto-nom" type="text" autoComplete="name" className={champ} />
            </div>
            <div>
              <label htmlFor="resto-tel" className={libelle}>Téléphone</label>
              <input id="resto-tel" type="tel" autoComplete="tel" className={champ} />
            </div>
            <div>
              <label htmlFor="resto-date" className={libelle}>Date</label>
              <input id="resto-date" type="date" className={champ} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="resto-heure" className={libelle}>Heure</label>
                <select id="resto-heure" className={champ}>
                  {["12h00", "12h30", "13h00", "13h30", "19h30", "20h00", "20h30", "21h00"].map((h) => (
                    <option key={h}>{h}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="resto-couverts" className={libelle}>Couverts</label>
                <select id="resto-couverts" className={champ}>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                    <option key={n}>
                      {n} {n === 1 ? "couvert" : "couverts"}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </DemoForm>
        </div>
      </section>

      <section className="bg-[#f5f0e8] px-6 py-20">
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-10 text-center text-4xl font-bold">Horaires</h2>
          <table className="w-full overflow-hidden rounded-2xl border-2 border-[#d4a853]/40 text-left">
            <caption className="sr-only">Horaires d&apos;ouverture</caption>
            <thead className="sr-only">
              <tr>
                <th scope="col">Jour</th>
                <th scope="col">Midi</th>
                <th scope="col">Soir</th>
              </tr>
            </thead>
            <tbody>
              {HORAIRES.map((h, i) => {
                const ferme = h.midi === "Fermé" && h.soir === "Fermé";
                return (
                  <tr key={h.jour} className={`${i % 2 === 0 ? "bg-white" : "bg-[#fdf6e3]"} border-b border-[#d4a853]/20 last:border-0`}>
                    <th scope="row" className={`px-6 py-4 font-bold ${ferme ? "text-[#8b1a1a]" : ""}`}>
                      {h.jour}
                    </th>
                    <td className={`px-3 py-4 text-sm ${h.midi === "Fermé" ? "text-[#8b1a1a]" : "text-[#4b5563]"}`}>{h.midi}</td>
                    <td className={`px-6 py-4 text-right text-sm ${h.soir === "Fermé" ? "text-[#8b1a1a]" : "font-semibold"}`}>{h.soir}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <footer className="bg-[#1a3a2a] px-6 py-10 text-center text-[#c3dacb]">
        <p className="mb-2 text-2xl font-bold text-[#d4a853]">La Table Provençale</p>
        <p className="text-sm">12 rue des Artisans, Aix-en-Provence • 04 65 71 00 12</p>
        <p className="mt-4 text-xs">© La Table Provençale — entreprise fictive</p>
      </footer>
    </div>
  );
}
