import { Counter } from "./shared/Counter";
import { SlotPicker } from "./shared/SlotPicker";

const PROGRAMMES = [
  {
    nom: "Découverte",
    duree: "1 mois",
    prix: "199 €",
    populaire: false,
    points: ["4 séances individuelles", "Programme personnalisé", "Suivi par messagerie", "Ressources en ligne"],
  },
  {
    nom: "Progression",
    duree: "3 mois",
    prix: "499 €",
    populaire: true,
    points: ["12 séances individuelles", "Suivi hebdomadaire", "Groupe d'échange privé", "Ressources en ligne", "1 bilan mensuel"],
  },
  {
    nom: "Intensif",
    duree: "6 mois",
    prix: "899 €",
    populaire: false,
    points: ["24 séances individuelles", "Disponibilité prioritaire", "Ressources en ligne", "Bilans hebdomadaires", "Suivi nutrition inclus"],
  },
];

const METHODE = [
  { etape: "01", titre: "Diagnostic", desc: "Bilan complet de votre situation, de vos objectifs et de vos blocages." },
  { etape: "02", titre: "Stratégie", desc: "Plan d'action personnalisé et mesurable, adapté à votre rythme de vie." },
  { etape: "03", titre: "Mise en pratique", desc: "Des outils concrets, avec un soutien constant à chaque étape." },
  { etape: "04", titre: "Ancrage", desc: "Consolidation des nouvelles habitudes et bilan des progrès." },
];

const RESULTATS = [
  { chiffre: "+85 %", texte: "Confiance en soi retrouvée, promotion obtenue en 3 mois.", profil: "Cadre, 38 ans" },
  { chiffre: "−12 kg", texte: "Objectif atteint et maintenu depuis 8 mois grâce à la méthode.", profil: "Enseignante, 45 ans" },
  { chiffre: "×3", texte: "Chiffre d'affaires multiplié par 3 en 6 mois avec le coaching business.", profil: "Entrepreneur, 31 ans" },
];

const CRENEAUX = {
  Matin: ["8h00", "9h00", "10h00", "11h00"],
  "Après-midi": ["14h00", "15h00", "16h00", "17h00"],
  Soir: ["18h00", "19h00", "20h00"],
};

export function Coach() {
  return (
    <div className="bg-[#0a0a0a] text-white">
      <section className="flex min-h-[85vh] items-center px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <p className="mb-6 inline-block rounded-full border border-[#22c55e]/30 bg-[#22c55e]/10 px-4 py-2 text-xs font-bold text-[#22c55e]">
            ✓ Plus de 200 personnes accompagnées
          </p>
          <h1 className="mb-6 text-6xl leading-tight font-extrabold lg:text-8xl">
            TRANSFORMEZ
            <br />
            VOTRE <span className="text-[#22c55e]">VIE</span>
          </h1>
          <p className="mb-10 max-w-xl text-xl text-gray-300">
            Coaching personnel et professionnel. Atteignez vos objectifs, dépassez vos limites.
          </p>
          <a
            href="#reserver"
            className="mb-12 inline-block rounded-full bg-[#22c55e] px-8 py-4 text-lg font-bold text-[#0a0a0a] transition-transform hover:scale-105"
          >
            Réserver ma séance découverte →
          </a>
          <div>
            <div className="mb-2 flex justify-between text-sm">
              <span className="text-gray-300">Prochain groupe — places disponibles</span>
              <span className="font-bold text-[#22c55e]">3 places restantes</span>
            </div>
            <div className="h-2 rounded-full bg-[#1a1a1a]" role="img" aria-label="Groupe rempli à 75 %">
              <div className="grow-x h-2 w-3/4 rounded-full bg-[#22c55e]" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#111111] px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-14 text-center text-4xl font-extrabold">Résultats</h2>
          <ul className="grid gap-6 md:grid-cols-3">
            {RESULTATS.map((r) => (
              <li key={r.profil} className="reveal rounded-2xl border border-[#22c55e]/20 bg-[#1a1a1a] p-8">
                <p className="mb-4 text-4xl font-extrabold text-[#22c55e]">{r.chiffre}</p>
                <blockquote className="mb-4 text-sm text-gray-300 italic">« {r.texte} »</blockquote>
                <p className="text-sm font-bold">{r.profil}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-4 text-center text-4xl font-extrabold">Programmes</h2>
          <p className="mb-14 text-center text-gray-300">Choisissez l&apos;accompagnement adapté à vos ambitions</p>
          <ul className="grid gap-6 md:grid-cols-3">
            {PROGRAMMES.map((p) => (
              <li
                key={p.nom}
                className={`relative rounded-2xl bg-[#1a1a1a] p-8 ${p.populaire ? "border-2 border-[#22c55e]" : "border border-white/10"}`}
              >
                {p.populaire && (
                  <p className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#22c55e] px-4 py-1 text-xs font-bold text-[#0a0a0a]">
                    POPULAIRE
                  </p>
                )}
                <h3 className="mb-1 text-lg font-bold">{p.nom}</h3>
                <p className="mb-1 text-3xl font-extrabold text-[#22c55e]">{p.prix}</p>
                <p className="mb-6 text-sm text-gray-300">{p.duree}</p>
                <ul className="mb-8 space-y-2">
                  {p.points.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-200">
                      <span aria-hidden="true" className="text-[#22c55e]">
                        ✓
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="#reserver"
                  className={`block w-full rounded-xl py-3 text-center text-sm font-bold ${
                    p.populaire ? "bg-[#22c55e] text-[#0a0a0a]" : "border-2 border-[#22c55e] text-[#22c55e]"
                  }`}
                >
                  Choisir ce programme
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-[#111111] px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-14 text-center text-4xl font-extrabold">La méthode</h2>
          <div className="relative">
            <div aria-hidden="true" className="absolute top-0 bottom-0 left-6 w-0.5 bg-[#22c55e]/30" />
            <ol className="space-y-10">
              {METHODE.map((m) => (
                <li key={m.etape} className="reveal flex gap-8">
                  <span
                    aria-hidden="true"
                    className="z-10 flex size-12 shrink-0 items-center justify-center rounded-full bg-[#22c55e] text-sm font-extrabold text-[#0a0a0a]"
                  >
                    {m.etape}
                  </span>
                  <div className="pt-2">
                    <h3 className="mb-2 text-xl font-bold">{m.titre}</h3>
                    <p className="text-sm leading-relaxed text-gray-300">{m.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-5xl items-center gap-12 md:grid-cols-2">
          <div className="flex h-80 items-center justify-center rounded-2xl border border-[#22c55e]/20 bg-[#111111]">
            <div className="text-center">
              <div
                aria-hidden="true"
                className="mx-auto mb-4 flex size-24 items-center justify-center rounded-full bg-[#22c55e] text-3xl font-extrabold text-[#0a0a0a]"
              >
                É
              </div>
              <p className="font-bold">Élan Coaching</p>
              <p className="mt-1 text-xs text-gray-300">Coach certifié·e</p>
            </div>
          </div>
          <div>
            <h2 className="mb-6 text-4xl font-extrabold">À propos</h2>
            <p className="mb-6 leading-relaxed text-gray-300">
              Depuis 8 ans, Élan Coaching accompagne particuliers et professionnels dans leur transformation personnelle et
              professionnelle, avec une méthode qui combine psychologie positive et outils concrets.
            </p>
            <dl className="grid grid-cols-3 gap-6">
              {[
                { value: 200, suffix: "+", label: "personnes" },
                { value: 1500, suffix: "", label: "séances" },
                { value: 98, suffix: " %", label: "satisfaction" },
              ].map((s) => (
                <div key={s.label} className="flex flex-col-reverse text-center">
                  <dt className="text-xs text-gray-300">{s.label}</dt>
                  <dd className="text-2xl font-extrabold text-[#22c55e]">
                    <Counter value={s.value} suffix={s.suffix} />
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section id="reserver" className="bg-[#111111] px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-4 text-center text-4xl font-extrabold">Réserver une séance découverte</h2>
          <p className="mb-12 text-center text-gray-300">Gratuite — 30 minutes — Sans engagement</p>
          <SlotPicker slots={CRENEAUX} />
        </div>
      </section>

      <footer className="border-t border-[#22c55e]/20 bg-black px-6 py-10 text-center">
        <p className="mb-2 text-xl font-extrabold text-[#22c55e]">Élan Coaching</p>
        <p className="text-sm text-gray-300">contact@elan-coaching.example • 06 39 98 00 12</p>
        <p className="mt-4 text-xs text-gray-400">© Élan Coaching — entreprise fictive</p>
      </footer>
    </div>
  );
}
