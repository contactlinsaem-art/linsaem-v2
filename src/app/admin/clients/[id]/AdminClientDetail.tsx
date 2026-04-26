"use client";

import { useState } from "react";
import { CheckCircle } from "lucide-react";

const SITE_STATUTS = ["en_attente", "en_creation", "en_validation", "en_ligne"];

type Site = {
  id?: string;
  statut?: string;
  url?: string;
  notes?: string;
} | null;

export default function AdminClientDetail({ clientId, site }: { clientId: string; site: Site }) {
  const [statut, setStatut] = useState(site?.statut || "en_attente");
  const [url, setUrl] = useState(site?.url || "");
  const [notes, setNotes] = useState(site?.notes || "");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch("/api/admin/site", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clientId, statut, url, notes }),
      });

      if (res.ok) {
        setSuccess(true);
      } else {
        const data = await res.json();
        setError(data.error || "Erreur lors de la sauvegarde.");
      }
    } catch {
      setError("Erreur réseau.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card p-6">
      <h2 className="font-bold text-gray-900 mb-5">Site web</h2>

      {success && (
        <div className="flex items-center gap-2 bg-green-50 border border-green-100 text-green-700 text-sm px-4 py-3 rounded-xl mb-4">
          <CheckCircle size={15} />
          Sauvegardé.
        </div>
      )}
      {error && (
        <div className="bg-red-50 border border-red-100 text-red-600 text-sm px-4 py-3 rounded-xl mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Statut</label>
          <select
            value={statut}
            onChange={(e) => setStatut(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300 bg-white"
          >
            {SITE_STATUTS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">URL du site</label>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://..."
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Notes internes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            placeholder="Notes visibles par le client..."
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300 resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-gradient w-full disabled:opacity-60"
        >
          {loading ? "Sauvegarde..." : "Sauvegarder →"}
        </button>
      </form>
    </div>
  );
}
