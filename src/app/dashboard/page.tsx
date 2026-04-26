import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { getAbonnementByClientId, getModificationsByClientId, getFacturesByClientId, getSiteByClientId, getUnreadCount, FORMULES } from "@/lib/db";
import { formatDate, formatPrice } from "@/lib/stripe";
import Link from "next/link";
import { ArrowRight, Clock, CheckCircle, AlertCircle, MessageCircle } from "lucide-react";

const SITE_STATUT = {
  en_attente: { label: "En attente de démarrage", color: "bg-gray-100 text-gray-500" },
  en_creation: { label: "En cours de création", color: "bg-sky-50 text-sky-600" },
  en_validation: { label: "En attente de validation", color: "bg-orange-50 text-orange-600" },
  en_ligne: { label: "En ligne ✓", color: "bg-green-50 text-green-600" },
};

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) redirect("/login");
  const { clientId } = session;

  const [abonnement, modifications, factures, site, unreadCount] = await Promise.all([
    getAbonnementByClientId(clientId).catch(() => null),
    getModificationsByClientId(clientId).catch(() => []),
    getFacturesByClientId(clientId).catch(() => []),
    getSiteByClientId(clientId).catch(() => null),
    getUnreadCount(clientId).catch(() => 0),
  ]);

  const formule = abonnement?.formule ? FORMULES[abonnement.formule as keyof typeof FORMULES] : null;
  const derniereFacture = factures[0];
  const modificationsEnCours = modifications.filter((m) => m.statut !== "termine").length;
  const siteStatut = site?.statut as keyof typeof SITE_STATUT | undefined;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-gray-900">
          Bonjour, {session.name?.split(" ")[0]} 👋
        </h1>
        <p className="text-gray-500 mt-1">Voici un aperçu de votre espace client.</p>
      </div>

      {/* KPI cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {/* Formule */}
        <div className="card p-6">
          <div className="text-sm text-gray-500 mb-1">Formule actuelle</div>
          {formule ? (
            <>
              <div className="text-xl font-extrabold text-gray-900">{formule.nom}</div>
              <div className="text-sky-500 font-semibold text-sm">{formatPrice(formule.prix)}/mois</div>
              <div className="text-xs text-gray-400 mt-1">
                Depuis le {abonnement?.date_debut ? formatDate(abonnement.date_debut) : "—"}
              </div>
            </>
          ) : (
            <div className="text-gray-400 text-sm mt-2">Aucun abonnement</div>
          )}
          <div className={`inline-flex items-center gap-1.5 mt-3 text-xs font-medium px-2.5 py-1 rounded-full ${
            abonnement?.statut === "actif" ? "bg-green-50 text-green-600" : "bg-gray-100 text-gray-500"
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${abonnement?.statut === "actif" ? "bg-green-400" : "bg-gray-300"}`} />
            {abonnement?.statut === "actif" ? "Actif" : abonnement?.statut || "Inactif"}
          </div>
        </div>

        {/* Dernière facture */}
        <div className="card p-6">
          <div className="text-sm text-gray-500 mb-1">Dernière facture</div>
          {derniereFacture ? (
            <>
              <div className="text-xl font-extrabold text-gray-900">{formatPrice(derniereFacture.montant)}</div>
              <div className="text-gray-400 text-xs mt-1">{formatDate(derniereFacture.date_facture)}</div>
              <div className={`inline-flex items-center gap-1.5 mt-3 text-xs font-medium px-2.5 py-1 rounded-full ${
                derniereFacture.statut === "paid" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-500"
              }`}>
                {derniereFacture.statut === "paid" ? <CheckCircle size={11} /> : <AlertCircle size={11} />}
                {derniereFacture.statut === "paid" ? "Payée" : "Échec"}
              </div>
            </>
          ) : (
            <div className="text-gray-400 text-sm mt-2">Aucune facture</div>
          )}
        </div>

        {/* Statut site */}
        <div className="card p-6">
          <div className="text-sm text-gray-500 mb-1">Mon site</div>
          {site ? (
            <>
              <div className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full mt-1 ${
                SITE_STATUT[siteStatut || "en_attente"].color
              }`}>
                {SITE_STATUT[siteStatut || "en_attente"].label}
              </div>
              {site.statut === "en_ligne" && site.url && (
                <a
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-xs text-sky-500 hover:underline mt-2 truncate"
                >
                  {site.url}
                </a>
              )}
            </>
          ) : (
            <div className="text-gray-400 text-sm mt-2">En préparation</div>
          )}
          <Link href="/dashboard/site" className="inline-flex items-center gap-1 mt-3 text-xs font-semibold text-sky-500 hover:text-sky-600 transition-colors">
            Détails <ArrowRight size={11} />
          </Link>
        </div>

        {/* Messages */}
        <div className="card p-6">
          <div className="text-sm text-gray-500 mb-1">Messages</div>
          {unreadCount > 0 ? (
            <div className="flex items-center gap-2 mt-1">
              <span className="bg-red-500 text-white text-sm font-bold px-2 py-0.5 rounded-full">
                {unreadCount}
              </span>
              <span className="text-sm text-gray-700">non lu{unreadCount > 1 ? "s" : ""}</span>
            </div>
          ) : (
            <div className="text-gray-400 text-sm mt-2">Aucun message</div>
          )}
          <Link href="/dashboard/messages" className="inline-flex items-center gap-1.5 mt-3 text-xs font-semibold text-sky-500 hover:text-sky-600 transition-colors">
            <MessageCircle size={13} />
            Voir les messages
          </Link>
        </div>
      </div>

      {/* Modifications récentes */}
      <div className="card p-6 mb-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-bold text-gray-900">Modifications récentes</h2>
          <Link href="/dashboard/modifications" className="text-sm text-sky-500 hover:text-sky-600 font-medium">
            Tout voir →
          </Link>
        </div>

        {modifications.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <div className="text-3xl mb-2">📝</div>
            <p className="text-sm">Aucune demande de modification pour l&apos;instant.</p>
            <Link href="/dashboard/modifications" className="btn-primary mt-4 text-sm inline-block">
              Faire une demande
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {modifications.slice(0, 3).map((m) => (
              <div key={m.id} className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  m.statut === "termine" ? "bg-green-100" : m.statut === "en_cours" ? "bg-sky-100" : "bg-amber-100"
                }`}>
                  {m.statut === "termine" ? (
                    <CheckCircle size={15} className="text-green-500" />
                  ) : (
                    <Clock size={15} className={m.statut === "en_cours" ? "text-sky-500" : "text-amber-500"} />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-gray-900 truncate">{m.titre}</div>
                  <div className="text-xs text-gray-400">{formatDate(m.created_at)}</div>
                </div>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full flex-shrink-0 ${
                  m.statut === "termine" ? "bg-green-50 text-green-600"
                  : m.statut === "en_cours" ? "bg-sky-50 text-sky-600"
                  : "bg-amber-50 text-amber-600"
                }`}>
                  {m.statut === "termine" ? "Terminé" : m.statut === "en_cours" ? "En cours" : "En attente"}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CTA si pas d'abonnement */}
      {!abonnement && (
        <div className="card p-6 border-sky-100 bg-gradient-to-r from-sky-50 to-violet-50">
          <h3 className="font-bold text-gray-900 mb-2">🚀 Lancez votre site web</h3>
          <p className="text-sm text-gray-500 mb-4">
            Choisissez votre formule et votre site sera livré en 48h.
          </p>
          <Link href="/#tarifs" className="btn-gradient text-sm">
            Voir les formules →
          </Link>
        </div>
      )}
    </div>
  );
}
