export function Testimonials() {
  const testimonials = [
    {
      name: "Marie Dubois",
      role: "Boulangère artisanale",
      location: "Lyon",
      content: "Mon site a été livré en 36h exactement comme promis. Le design est vraiment à mon image, mes clients me demandent souvent qui l'a fait !",
      rating: 5,
      initials: "MD",
      avatarColor: "#f59e0b",
      siteUrl: "marie-boulangerie.fr",
    },
    {
      name: "Thomas Martin",
      role: "Plombier indépendant",
      location: "Bordeaux",
      content: "J'avais peur que ça soit compliqué mais l'équipe a géré tout de A à Z. Maintenant je reçois des demandes de devis chaque semaine via le site.",
      rating: 5,
      initials: "TM",
      avatarColor: "#0ea5e9",
      siteUrl: "martin-plomberie.fr",
    },
    {
      name: "Sophie Laurent",
      role: "Photographe",
      location: "Paris",
      content: "Le rapport qualité/prix est imbattable. Pour 7,99€/mois j'ai un site qui fait vraiment professionnel. Je recommande les yeux fermés.",
      rating: 5,
      initials: "SL",
      avatarColor: "#8b5cf6",
      siteUrl: "sophie-laurent-photo.fr",
    },
  ];

  return (
    <section className="py-28 bg-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-violet-400 bg-violet-400/10 px-3 py-1 rounded-full uppercase tracking-wider mb-4">
            Témoignages
          </div>
          <h2 className="text-4xl font-extrabold text-white mb-4">Ils nous font confiance</h2>
          <p className="text-gray-400 text-lg">Des entrepreneurs qui ont franchi le pas</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 stagger">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-white/5 border border-white/10 rounded-3xl p-7 hover:bg-white/[0.08] transition-all flex flex-col">
              {/* Étoiles + badge vérifié */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg">★</span>
                  ))}
                </div>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="inline-block">
                    <path d="M2 5l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Avis vérifié
                </span>
              </div>

              {/* Contenu */}
              <p className="text-gray-300 text-sm leading-relaxed mb-4 flex-1">&ldquo;{t.content}&rdquo;</p>

              {/* Lien site fictif */}
              <p className="text-gray-600 text-xs mb-6">
                → <span className="hover:text-gray-400 transition-colors cursor-default">{t.siteUrl}</span>
              </p>

              {/* Avatar + identité */}
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                  style={{ background: t.avatarColor }}
                >
                  {t.initials}
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">{t.name}</div>
                  <div className="text-gray-500 text-xs">{t.role} — {t.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bas de section */}
        <div className="mt-16 text-center">
          <p className="text-gray-400 text-sm">
            Rejoignez les entrepreneurs qui nous font confiance
          </p>
        </div>
      </div>
    </section>
  );
}
