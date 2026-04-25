import Link from "next/link";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden" style={{ backgroundColor: "#0f0f0f" }}>
      {/* Gradient overlay */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: "linear-gradient(135deg, #667eea, #764ba2, #f093fb, #4facfe)",
          opacity: 0.15,
        }}
      />

      <div className="max-w-7xl mx-auto px-6 py-24 text-center">
        <div className="animate-fade-up">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-full text-sm font-medium text-white mb-8">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            ⚡ 2× moins cher que les offres du marché
          </div>

          <h1 className="text-6xl sm:text-6xl lg:text-8xl font-extrabold text-white leading-[1.1] tracking-tight mb-6">
            Agence de création web<br />
            dès{" "}
            <span className="gradient-text">5,99€ TTC/mois</span>
          </h1>

          <p className="text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
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
            <div key={stat.label} className="p-5 text-center rounded-xl" style={{ backgroundColor: "rgba(255,255,255,0.1)" }}>
              <div className="text-3xl font-extrabold gradient-text mb-1">{stat.value}</div>
              <div className="text-sm text-white/70">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
