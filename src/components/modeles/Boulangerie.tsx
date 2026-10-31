const SPECIALITES = [
  { emoji: "🥖", nom: "Baguette Tradition", desc: "Farine de blé française, fermentation lente 24 h, croûte croustillante garantie." },
  { emoji: "🥐", nom: "Croissant Pur Beurre", desc: "Feuilletage maison, beurre AOP Charentes-Poitou, doré à la perfection." },
  { emoji: "🍫", nom: "Pain au Chocolat", desc: "Chocolat noir 66 %, pâte feuilletée pur beurre, fondant à cœur." },
];

const HORAIRES: [string, string, boolean][] = [
  ["Mardi — Vendredi", "6h30 — 20h00", false],
  ["Samedi", "6h00 — 19h30", false],
  ["Dimanche", "7h00 — 13h00", false],
  ["Lundi", "Fermé", true],
];

const AVIS = [
  { texte: "Le meilleur pain du quartier, sans hésitation ! J'y passe tous les matins.", auteur: "Cliente du quartier", lieu: "Paris 11e" },
  { texte: "Des croissants à tomber par terre. Un vrai travail d'artisan.", auteur: "Client fidèle", lieu: "Paris 12e" },
  { texte: "Accueil chaleureux et produits exceptionnels. Ma boulangerie de référence !", auteur: "Cliente", lieu: "Vincennes" },
];

const TELEPHONE = "01 99 00 12 34";

export function Boulangerie() {
  return (
    <div className="font-serif text-[#78350f]">
      {/* Hero */}
      <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden bg-[#2c1207] px-6">
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse at center, rgba(245,158,11,0.18) 0%, rgba(44,18,7,0.95) 70%)" }}
        />
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <p className="mb-8 inline-block rounded-full bg-[#f59e0b] px-5 py-2 text-xs font-bold tracking-widest text-[#2c1207] uppercase">
            <span aria-hidden="true">🌾 </span>Fait maison chaque jour
          </p>
          <h1 className="mb-4 text-5xl leading-tight font-bold text-[#fef3c7] lg:text-7xl">
            La Boulangerie
            <br />
            <span className="text-[#f59e0b]">Dorée</span>
          </h1>
          <p className="mb-10 text-xl text-[#e7cfae]">Artisan boulanger depuis 1987</p>
          <a
            href="#specialites"
            className="inline-block rounded-full bg-[#f59e0b] px-9 py-4 text-lg font-bold text-[#2c1207] transition-transform hover:scale-105"
          >
            Voir nos pains →
          </a>
        </div>
      </section>

      {/* Bandeau */}
      <div className="overflow-hidden bg-[#f59e0b] py-3 text-sm font-bold text-[#2c1207]" aria-hidden="true">
        <div className="marquee">
          {[0, 1].map((i) => (
            <span key={i} className="px-6 whitespace-nowrap">
              🥖 Pains &nbsp;•&nbsp; 🥐 Viennoiseries &nbsp;•&nbsp; 🎂 Gâteaux &nbsp;•&nbsp; ☕ Café &nbsp;•&nbsp; 🥧 Tartes
              &nbsp;•&nbsp; 🍞 Baguettes tradition &nbsp;•&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* Spécialités */}
      <section id="specialites" className="bg-[#fef9f0] px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="reveal mb-14 text-center">
            <h2 className="mb-3 text-4xl font-bold text-[#92400e]">Nos spécialités</h2>
            <p className="text-[#92400e]">Préparées avec passion chaque matin dès 4 h</p>
          </div>
          <ul className="grid gap-8 md:grid-cols-3">
            {SPECIALITES.map((s) => (
              <li
                key={s.nom}
                className="reveal rounded-2xl border-2 border-[#f59e0b] bg-[#fef3c7] p-8 text-center transition-transform hover:scale-105"
              >
                <div aria-hidden="true" className="mb-4 text-6xl">
                  {s.emoji}
                </div>
                <h3 className="mb-2 text-xl font-bold text-[#92400e]">{s.nom}</h3>
                <p className="text-sm leading-relaxed text-[#78350f]">{s.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Horaires et adresse */}
      <section className="bg-white px-6 py-20">
        <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-2">
          <div className="reveal">
            <h2 className="mb-8 text-3xl font-bold text-[#92400e]">
              <span aria-hidden="true">🕐 </span>Horaires d&apos;ouverture
            </h2>
            <dl>
              {HORAIRES.map(([jour, heure, ferme]) => (
                <div key={jour} className="flex items-center justify-between border-b border-[#fde68a] py-3">
                  <dt className="font-medium">{jour}</dt>
                  <dd
                    className={`rounded-full px-3 py-1 text-sm font-bold ${ferme ? "bg-[#fee2e2] text-[#b91c1c]" : "bg-[#fef3c7] text-[#92400e]"}`}
                  >
                    {heure}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="reveal">
            <h2 className="mb-8 text-3xl font-bold text-[#92400e]">
              <span aria-hidden="true">📍 </span>Nous trouver
            </h2>
            <address className="flex flex-col justify-center rounded-2xl bg-[#fef3c7] p-8 not-italic">
              <p className="mb-2 text-lg font-bold">La Boulangerie Dorée</p>
              <p className="mb-4">
                24 rue de la Paix
                <br />
                75001 Paris
              </p>
              <p className="mb-2 text-sm">
                <span aria-hidden="true">🚇 </span>Métro Opéra — lignes 3, 7, 8
              </p>
              <p className="font-bold text-[#92400e]">
                <span aria-hidden="true">📞 </span>
                {TELEPHONE}
              </p>
            </address>
          </div>
        </div>
      </section>

      {/* Avis */}
      <section className="bg-[#fef9f0] px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="reveal mb-14 text-center">
            <h2 className="mb-3 text-4xl font-bold text-[#92400e]">Ce que disent nos clients</h2>
            <p className="text-2xl" aria-hidden="true">
              ⭐⭐⭐⭐⭐
            </p>
            <p className="mt-2 text-[#92400e]">4,9/5 sur Google</p>
          </div>
          <ul className="grid gap-6 md:grid-cols-3">
            {AVIS.map((a) => (
              <li key={a.texte} className="reveal rounded-2xl border border-[#f59e0b]/30 bg-[#f59e0b]/10 p-6">
                <p className="mb-3 text-lg" aria-label="5 étoiles sur 5">
                  ⭐⭐⭐⭐⭐
                </p>
                <blockquote className="mb-4 text-sm leading-relaxed italic">« {a.texte} »</blockquote>
                <p className="text-sm font-bold text-[#92400e]">{a.auteur}</p>
                <p className="text-xs">{a.lieu}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Appel à l'action */}
      <section className="bg-[#2c1207] px-6 py-20 text-center">
        <h2 className="mb-4 text-4xl font-bold text-[#fef3c7]">Commandez par téléphone</h2>
        <p className="mb-8 text-lg text-[#e7cfae]">Réservez votre commande à l&apos;avance pour être sûr de trouver votre pain</p>
        <p className="inline-block rounded-full bg-[#f59e0b] px-10 py-5 text-xl font-bold text-[#2c1207]">
          <span aria-hidden="true">📞 </span>
          {TELEPHONE}
        </p>
      </section>

      <footer className="bg-[#1a0a02] px-6 py-10 text-center text-[#e7cfae]">
        <p className="mb-2 text-2xl font-bold text-[#f59e0b]">La Boulangerie Dorée</p>
        <p className="text-sm">24 rue de la Paix, 75001 Paris • Tél : {TELEPHONE}</p>
        <p className="mt-4 text-xs">© La Boulangerie Dorée — entreprise fictive</p>
      </footer>
    </div>
  );
}
