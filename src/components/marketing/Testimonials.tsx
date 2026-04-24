export function Testimonials() {
  const testimonials = [
    {
      name: "Marie Dubois",
      role: "Boulangère artisanale",
      content: "Mon site a été livré en 36h exactement comme promis. Le design est vraiment à mon image, mes clients me demandent souvent qui l'a fait !",
      rating: 5,
      avatar: "🧑‍🍳",
    },
    {
      name: "Thomas Martin",
      role: "Plombier indépendant",
      content: "J'avais peur que ça soit compliqué mais l'équipe a géré tout de A à Z. Maintenant je reçois des demandes de devis chaque semaine via le site.",
      rating: 5,
      avatar: "👷",
    },
    {
      name: "Sophie Laurent",
      role: "Photographe",
      content: "Le rapport qualité/prix est imbattable. Pour 7,99€/mois j'ai un site qui fait vraiment professionnel. Je recommande les yeux fermés.",
      rating: 5,
      avatar: "📸",
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
            <div key={t.name} className="bg-white/5 border border-white/10 rounded-3xl p-7 hover:bg-white/8 transition-all">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <span key={i} className="text-yellow-400 text-lg">★</span>
                ))}
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-6">&ldquo;{t.content}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-xl">
                  {t.avatar}
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">{t.name}</div>
                  <div className="text-gray-500 text-xs">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
