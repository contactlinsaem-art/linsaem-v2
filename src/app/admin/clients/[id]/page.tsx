import { getClientWithDetails } from "@/lib/db";
import { formatDate } from "@/lib/stripe";
import { notFound } from "next/navigation";
import AdminClientDetail from "./AdminClientDetail";

export default async function AdminClientDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await getClientWithDetails(id).catch(() => null);
  if (!data) notFound();

  return (
    <div>
      <div className="mb-8">
        <div className="text-sm text-gray-400 mb-2">← <a href="/admin/clients" className="hover:text-gray-600">Clients</a></div>
        <h1 className="text-2xl font-extrabold text-gray-900">{data.client.name}</h1>
        <p className="text-gray-500 mt-1">{data.client.email}</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Infos + site */}
        <AdminClientDetail clientId={id} site={data.site} />

        {/* Messages */}
        <div className="card p-6">
          <h2 className="font-bold text-gray-900 mb-4">Messages</h2>
          {data.messages.length === 0 ? (
            <p className="text-sm text-gray-400">Aucun message.</p>
          ) : (
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {data.messages.map((msg: { id: string; expediteur: string; contenu: string; created_at: string }) => (
                <div key={msg.id} className={`rounded-xl px-4 py-3 text-sm ${
                  msg.expediteur === "admin"
                    ? "bg-violet-50 text-violet-800"
                    : "bg-gray-50 text-gray-700"
                }`}>
                  <div className="text-xs font-semibold mb-1 opacity-60">
                    {msg.expediteur === "admin" ? "Admin" : data.client.name} · {formatDate(msg.created_at)}
                  </div>
                  {msg.contenu}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Factures */}
        <div className="card p-6 lg:col-span-2">
          <h2 className="font-bold text-gray-900 mb-4">Factures</h2>
          {data.factures.length === 0 ? (
            <p className="text-sm text-gray-400">Aucune facture.</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-2 font-semibold text-gray-500">Date</th>
                  <th className="text-left py-2 font-semibold text-gray-500">Montant TTC</th>
                  <th className="text-left py-2 font-semibold text-gray-500">Statut</th>
                </tr>
              </thead>
              <tbody>
                {data.factures.map((f: { id: string; created_at: string; montant: number; statut: string }) => (
                  <tr key={f.id} className="border-b border-gray-50">
                    <td className="py-2 text-gray-500">{formatDate(f.created_at)}</td>
                    <td className="py-2 font-medium">{(f.montant / 100).toFixed(2)} €</td>
                    <td className="py-2">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        f.statut === "paid" ? "bg-green-50 text-green-600" : "bg-gray-100 text-gray-500"
                      }`}>{f.statut}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
