import Link from "next/link";

export function CTABanner() {
  return (
    <section
      className="py-20 px-6 text-center"
      style={{ background: "linear-gradient(135deg, #667eea, #764ba2, #f093fb)" }}
    >
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-extrabold text-white mb-4">
          Prêt à lancer votre site ?
        </h2>
        <p className="text-white/80 text-lg mb-8">
          Rejoignez les entrepreneurs qui nous font confiance.
        </p>
        <Link
          href="/#contact"
          className="inline-block bg-white text-violet-700 font-semibold text-base px-8 py-4 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
        >
          Commencer maintenant →
        </Link>
      </div>
    </section>
  );
}
