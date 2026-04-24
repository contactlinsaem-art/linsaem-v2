import Link from "next/link";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 -left-32 w-96 h-96 bg-sky-100 rounded-full blur-3xl opacity-60" />
        <div className="absolute top-40 -right-32 w-96 h-96 bg-violet-100 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-pink-100 rounded-full blur-3xl opacity-40" />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-24 text-center">
        <div className="animate-fade-up">
          <div className="inline-flex items-center gap-2 bg-white border border-gray-200 shadow-sm px-4 py-2 rounded-full text-sm font-medium text-gray-600 mb-8">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            ⚡ 2× moins cher que les offres du marché
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-[1.1] tracking-tight mb-6">
            Votre site web pro<br />
            dès{" "}
            <span className="gradient-text">5,99€/mois</span>
          </h1>

          <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            Design sur-mesure, hébergement inclus, sans compétences techniques.
            Un vrai accompagnement humain à prix imbattable.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/#tarifs" className="btn-gradient text-base px-8 py-4 shadow-lg shadow-violet-200">
              Voir les offres →
            </Link>
            <Link href="/#comment-ca-marche" className="btn-outline text-base px-8 py-4">
              Comment ça marche ?
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto stagger">
          {[
            { value: "48h", label: "Délai de livraison" },
            { value: "100%", label: "Responsive mobile" },
            { value: "99,9%", label: "Disponibilité" },
            { value: "0€", label: "Frais cachés" },
          ].map((stat) => (
            <div key={stat.label} className="card p-5 text-center">
              <div className="text-3xl font-extrabold gradient-text mb-1">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
