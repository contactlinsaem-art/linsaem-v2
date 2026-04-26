import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { getSiteByClientId } from "@/lib/db";

const STEPS = [
  { key: "en_attente", label: "En attente" },
  { key: "en_creation", label: "En création" },
  { key: "en_validation", label: "En validation" },
  { key: "en_ligne", label: "En ligne" },
] as const;

const MESSAGES: Record<string, string> = {
  en_attente: "Votre commande est confirmée. Notre équipe va prendre contact avec vous sous 24h.",
  en_creation: "Votre site est en cours de création ! Vous recevrez un lien de prévisualisation bientôt.",
  en_validation: "Votre site est prêt ! Vérifiez le lien de prévisualisation et validez.",
  en_ligne: "🎉 Votre site est en ligne !",
};

export default async function SitePage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const site = await getSiteByClientId(session.clientId).catch(() => null);
  const currentStep = site?.statut || "en_attente";
  const currentIndex = STEPS.findIndex((s) => s.key === currentStep);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-gray-900">Mon site</h1>
        <p className="text-gray-500 mt-1">Suivez l&apos;avancement de la création de votre site.</p>
      </div>

      <div className="card p-8 mb-6">
        {/* Timeline */}
        <div className="flex items-center mb-8">
          {STEPS.map((step, i) => {
            const done = i <= currentIndex;
            const active = i === currentIndex;
            return (
              <div key={step.key} className="flex items-center flex-1 last:flex-none">
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
                    done
                      ? "bg-sky-500 border-sky-500 text-white"
                      : "bg-white border-gray-200 text-gray-400"
                  } ${active ? "ring-4 ring-sky-100" : ""}`}>
                    {done && i < currentIndex ? "✓" : i + 1}
                  </div>
                  <div className={`text-xs mt-2 font-medium whitespace-nowrap ${done ? "text-sky-600" : "text-gray-400"}`}>
                    {step.label}
                  </div>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`flex-1 h-0.5 mb-5 mx-1 ${i < currentIndex ? "bg-sky-500" : "bg-gray-200"}`} />
                )}
              </div>
            );
          })}
        </div>

        {/* Message */}
        <div className={`rounded-2xl p-6 text-center ${
          currentStep === "en_ligne"
            ? "bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100"
            : "bg-gray-50"
        }`}>
          <p className="text-gray-700 font-medium">{MESSAGES[currentStep]}</p>
        </div>

        {/* URL si en ligne */}
        {currentStep === "en_ligne" && site?.url && (
          <div className="mt-6 text-center">
            <a
              href={site.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gradient inline-flex items-center gap-2"
            >
              Visiter mon site →
            </a>
            <div className="text-sm text-gray-400 mt-2">{site.url}</div>
          </div>
        )}

        {/* Notes de l'équipe */}
        {site?.notes && (
          <div className="mt-6 bg-sky-50 border border-sky-100 rounded-2xl p-5">
            <div className="text-sm font-semibold text-sky-700 mb-1">📝 Note de l&apos;équipe</div>
            <p className="text-sm text-sky-800 leading-relaxed">{site.notes}</p>
          </div>
        )}
      </div>
    </div>
  );
}
