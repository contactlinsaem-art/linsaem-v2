import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { getAbonnementByClientId, getFacturesByClientId, FORMULES } from "@/lib/db";
import { createBillingPortalSession, formatDate, formatPrice } from "@/lib/stripe";
import Link from "next/link";
import { ExternalLink, CreditCard, CheckCircle, AlertCircle, Download } from "lucide-react";

export default async function AbonnementPage() {
  const session = await getSession();
  if (!session) redirect("/login");
  const clientId = session.clientId;

  const [abonnement, factures] = await Promise.all([
    getAbonnementByClientId(clientId).catch(() => null),
    getFacturesByClientId(clientId).catch(() => []),
  ]);

  const formule = abonnement?.formule ? FORMULES[abonnement.formule as keyof typeof FORMULES] : null;

  async function openBillingPortal(formData: FormData) {
    "use server";
    const customerId = formData.get("customerId") as string;
    if (!customerId) return;
    const portalSession = await createBillingPortalSession(
      customerId,
      `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/abonnement`
    );
    redirect(portalSession.url);
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-gray-900">Mon abonnement</h1>
        <p className="text-gray-500 mt-1">Gérez votre formule et consultez vos factures.</p>
      </div>

      {/* Abonnement actuel */}
      <div className="card p-8 mb-6">
        {abonnement && formule ? (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="text-2xl font-extrabold text-gray-900">Formule {formule.nom}</div>
                <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full ${
                  abonnement.statut === "actif" ? "bg-green-50 text-green-600" : "bg-gray-100 text-gray-500"
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${abonnement.statut === "actif" ? "bg-green-400" : "bg-gray-300"}`} />
                  {abonnement.statut === "actif" ? "Actif" : abonnement.statut}
                </span>
              </div>
              <div className="text-3xl font-extrabold gradient-text mb-1">
                {formatPrice(formule.prix)}<span className="text-base font-normal text-gray-400">/mois</span>
              </div>
              <div className="text-sm text-gray-400">
                Depuis le {abonnement.date_debut ? formatDate(abonnement.date_debut) : "—"}
              </div>
            </div>

            {abonnement.stripe_customer_id && (
              <form action={openBillingPortal}>
                <input type="hidden" name="customerId" value={abonnement.stripe_customer_id} />
                <button type="submit" className="btn-outline flex items-center gap-2">
                  <CreditCard size={16} />
                  Gérer le paiement
                  <ExternalLink size={13} />
                </button>
              </form>
            )}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="text-4xl mb-4">📋</div>
            <h3 className="font-bold text-gray-900 mb-2">Aucun abonnement actif</h3>
            <p className="text-gray-500 text-sm mb-6">Choisissez une formule pour lancer votre site web.</p>
            <Link href="/#tarifs" className="btn-gradient">Voir les formules →</Link>
          </div>
        )}
      </div>

      {/* Factures */}
      <div className="card p-6">
        <h2 className="font-bold text-gray-900 mb-5">Historique des factures</h2>
        {factures.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <div className="text-3xl mb-2">🧾</div>
            <p className="text-sm">Aucune facture pour l&apos;instant.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Date</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Montant TTC</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Statut</th>
                  <th className="text-right py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">PDF</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {factures.map((facture) => (
                  <tr key={facture.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4 text-gray-600">{formatDate(facture.date_facture)}</td>
                    <td className="py-4 px-4 font-semibold text-gray-900">{formatPrice(facture.montant)}</td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${
                        facture.statut === "paid" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-500"
                      }`}>
                        {facture.statut === "paid" ? <CheckCircle size={11} /> : <AlertCircle size={11} />}
                        {facture.statut === "paid" ? "Payée" : "Échec"}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      {facture.stripe_hosted_invoice_url ? (
                        <a
                          href={facture.stripe_hosted_invoice_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sky-500 hover:text-sky-600 text-xs font-medium transition-colors"
                        >
                          <Download size={13} />
                          Télécharger
                        </a>
                      ) : (
                        <span className="text-gray-300 text-xs">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
