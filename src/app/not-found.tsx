import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        <div
          className="text-8xl font-extrabold mb-4 inline-block"
          style={{
            background: "var(--gradient-alt)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          404
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-3">Page introuvable</h1>
        <p className="text-gray-500 mb-8">
          Cette page n&apos;existe pas ou a été déplacée.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/" className="btn-gradient">
            Retour à l&apos;accueil →
          </Link>
          <Link href="/#contact" className="btn-outline">
            Nous contacter
          </Link>
        </div>
      </div>
    </div>
  );
}
