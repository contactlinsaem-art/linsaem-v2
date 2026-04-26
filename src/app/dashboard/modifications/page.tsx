import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { getModificationsByClientId, createModification } from "@/lib/db";
import { formatDate } from "@/lib/stripe";
import { revalidatePath } from "next/cache";
import { Clock, CheckCircle, Loader, Plus } from "lucide-react";

const STATUT_CONFIG = {
  en_attente: { label: "En attente", color: "bg-amber-50 text-amber-600", icon: Clock },
  en_cours: { label: "En cours", color: "bg-sky-50 text-sky-600", icon: Loader },
  termine: { label: "Terminé", color: "bg-green-50 text-green-600", icon: CheckCircle },
};

export default async function ModificationsPage() {
  const session = await getSession();
  if (!session) redirect("/login");
  const clientId = session.clientId;

  const modifications = await getModificationsByClientId(clientId).catch(() => []);

  async function submitModification(formData: FormData) {
    "use server";
    const sess = await getSession();
    if (!sess) return;

    const titre = formData.get("titre") as string;
    const description = formData.get("description") as string;
    const priorite = formData.get("priorite") as string;

    if (!titre || !description) return;

    await createModification({ clientId: sess.clientId, titre, description, priorite });
    revalidatePath("/dashboard/modifications");
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-gray-900">Mes modifications</h1>
        <p className="text-gray-500 mt-1">Suivez vos demandes de modification et créez-en de nouvelles.</p>
      </div>

      {/* Nouvelle demande */}
      <div className="card p-8 mb-8">
        <div className="flex items-center gap-2 mb-6">
          <Plus size={18} className="text-sky-500" />
          <h2 className="font-bold text-gray-900">Nouvelle demande</h2>
        </div>

        <form action={submitModification} className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Titre *</label>
              <input
                type="text"
                name="titre"
                required
                placeholder="Ex : Mettre à jour les horaires d'ouverture"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Priorité</label>
              <select
                name="priorite"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-transparent transition-all bg-white"
              >
                <option value="normale">Normale</option>
                <option value="haute">Haute</option>
                <option value="urgente">Urgente</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Description détaillée *</label>
            <textarea
              name="description"
              required
              rows={4}
              placeholder="Décrivez précisément la modification souhaitée. Plus vous êtes précis, plus vite on peut l'effectuer..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-transparent transition-all resize-none"
            />
          </div>

          <button type="submit" className="btn-gradient">
            Envoyer la demande →
          </button>
        </form>
      </div>

      {/* Liste des modifications */}
      <div className="card p-6">
        <h2 className="font-bold text-gray-900 mb-5">Historique des demandes</h2>

        {modifications.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <div className="text-3xl mb-2">✏️</div>
            <p className="text-sm">Aucune demande pour l&apos;instant. Créez votre première demande ci-dessus.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {modifications.map((m) => {
              const statut = STATUT_CONFIG[m.statut as keyof typeof STATUT_CONFIG] || STATUT_CONFIG.en_attente;
              const Icon = statut.icon;
              return (
                <div key={m.id} className="border border-gray-100 rounded-2xl p-5 hover:border-gray-200 transition-colors">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900">{m.titre}</h3>
                      <div className="text-xs text-gray-400 mt-0.5">{formatDate(m.created_at)}</div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {m.priorite && m.priorite !== "normale" && (
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                          m.priorite === "urgente" ? "bg-red-50 text-red-500" : "bg-orange-50 text-orange-500"
                        }`}>
                          {m.priorite === "urgente" ? "🔴 Urgent" : "🟠 Haute"}
                        </span>
                      )}
                      <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${statut.color}`}>
                        <Icon size={11} />
                        {statut.label}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-500 leading-relaxed">{m.description}</p>

                  {m.reponse && (
                    <div className="mt-4 bg-sky-50 border border-sky-100 rounded-xl p-4">
                      <div className="text-xs font-semibold text-sky-600 mb-1">💬 Réponse de l&apos;équipe</div>
                      <p className="text-sm text-sky-800">{m.reponse}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
