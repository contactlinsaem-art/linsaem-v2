import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 font-extrabold text-xl text-gray-900">
            <span
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold"
              style={{ background: "var(--gradient)" }}
            >
              L
            </span>
            LINSAEM
          </Link>
          <p className="text-gray-500 mt-2 text-sm">Réinitialisation du mot de passe</p>
        </div>

        <div className="card p-8 text-center">
          <div className="text-4xl mb-4">🔒</div>
          <h1 className="text-xl font-extrabold text-gray-900 mb-3">Mot de passe oublié ?</h1>
          <p className="text-gray-500 text-sm leading-relaxed mb-6">
            Contactez-nous à{" "}
            <a href="mailto:contact@linsaem.fr" className="text-sky-500 hover:underline font-semibold">
              contact@linsaem.fr
            </a>{" "}
            pour réinitialiser votre mot de passe.
            <br />
            Nous vous répondrons dans les plus brefs délais.
          </p>
          <Link href="/login" className="btn-outline text-sm">
            ← Retour à la connexion
          </Link>
        </div>
      </div>
    </div>
  );
}
