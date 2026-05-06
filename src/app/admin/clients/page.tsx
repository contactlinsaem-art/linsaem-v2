import { getAllClients } from "@/lib/db";
import { formatDate } from "@/lib/stripe";
import Link from "next/link";

const STATUT_COLORS: Record<string, string> = {
  actif: "bg-green-50 text-green-600",
  inactif: "bg-gray-100 text-gray-500",
  suspendu: "bg-red-50 text-red-500",
};

export default async function AdminClientsPage() {
  const clients = await getAllClients().catch(() => []);

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Clients</h1>
          <p className="text-gray-500 mt-1">{clients.length} client(s) au total</p>
        </div>
        <Link
          href="/admin/clients/create"
          className="btn-primary text-sm"
        >
          + Nouveau client
        </Link>
      </div>

      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left px-6 py-4 font-semibold text-gray-500">Nom</th>
              <th className="text-left px-6 py-4 font-semibold text-gray-500">Email</th>
              <th className="text-left px-6 py-4 font-semibold text-gray-500">Formule</th>
              <th className="text-left px-6 py-4 font-semibold text-gray-500">Statut</th>
              <th className="text-left px-6 py-4 font-semibold text-gray-500">Depuis</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-900">{client.name}</td>
                <td className="px-6 py-4 text-gray-500">{client.email}</td>
                <td className="px-6 py-4 text-gray-500">{client.formule || "—"}</td>
                <td className="px-6 py-4">
                  {client.statut ? (
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${STATUT_COLORS[client.statut] || "bg-gray-100 text-gray-500"}`}>
                      {client.statut}
                    </span>
                  ) : "—"}
                </td>
                <td className="px-6 py-4 text-gray-400 text-xs">{client.created_at ? formatDate(client.created_at) : "—"}</td>
                <td className="px-6 py-4">
                  <Link
                    href={`/admin/clients/${client.id}`}
                    className="text-sky-600 hover:text-sky-700 font-medium text-xs"
                  >
                    Voir →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {clients.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <p className="text-sm">Aucun client pour le moment.</p>
          </div>
        )}
      </div>
    </div>
  );
}
