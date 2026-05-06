"use client";

import { useState } from "react";
import Link from "next/link";

const FORMULES = [
  {
    id: "starter",
    label: "Starter",
    prix: "5,99€/mois",
    description: "Site vitrine 1 page, hébergement inclus",
    color: "sky",
    ring: "ring-sky-500",
    bg: "bg-sky-500",
    bgLight: "bg-sky-50",
    border: "border-sky-500",
    text: "text-sky-700",
    badge: false,
  },
  {
    id: "pro",
    label: "Pro",
    prix: "7,99€/mois",
    description: "Site multi-pages, blog, formulaire de contact",
    color: "violet",
    ring: "ring-violet-500",
    bg: "bg-violet-500",
    bgLight: "bg-violet-50",
    border: "border-violet-500",
    text: "text-violet-700",
    badge: true,
  },
  {
    id: "business",
    label: "Business",
    prix: "11,99€/mois",
    description: "E-commerce, fonctionnalités avancées",
    color: "pink",
    ring: "ring-pink-500",
    bg: "bg-pink-500",
    bgLight: "bg-pink-50",
    border: "border-pink-500",
    text: "text-pink-700",
    badge: false,
  },
];

export default function CreateClientPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    formule: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successEmail, setSuccessEmail] = useState("");
  const [createdClientId, setCreatedClientId] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.email || !form.formule) {
      setError("Le nom, l'email et la formule sont obligatoires.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/admin/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone || undefined,
          formule: form.formule,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Une erreur est survenue.");
      } else {
        setSuccessEmail(form.email);
        setCreatedClientId(data.clientId);
      }
    } catch {
      setError("Erreur réseau. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setForm({ name: "", email: "", phone: "", formule: "", message: "" });
    setSuccessEmail("");
    setCreatedClientId("");
    setError("");
  };

  // ── Success state ──────────────────────────────────────────────────────
  if (successEmail) {
    return (
      <div className="max-w-lg mx-auto mt-16 text-center">
        <div className="card p-12">
          <div className="text-5xl mb-6">✅</div>
          <h2 className="text-2xl font-extrabold text-gray-900 mb-2">Compte créé !</h2>
          <p className="text-gray-500 mb-8">
            Un email d&apos;activation a été envoyé à <strong>{successEmail}</strong>.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href={`/admin/clients/${createdClientId}`}
              className="btn-primary text-center"
            >
              Voir le client →
            </Link>
            <button
              onClick={handleReset}
              className="btn-secondary"
            >
              Créer un autre client
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Form ───────────────────────────────────────────────────────────────
  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Nouveau client</h1>
          <p className="text-gray-500 mt-1">Créer un compte manuellement et envoyer l&apos;email d&apos;activation.</p>
        </div>
        <Link href="/admin/clients" className="text-sm text-gray-400 hover:text-gray-600">
          ← Retour
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Infos client */}
        <div className="card p-6 space-y-4">
          <h2 className="text-base font-semibold text-gray-800 mb-2">Informations client</h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nom complet <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Jean Dupont"
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="jean@exemple.fr"
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Téléphone
            </label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="+33 6 00 00 00 00"
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
            />
          </div>
        </div>

        {/* Formule */}
        <div className="card p-6">
          <h2 className="text-base font-semibold text-gray-800 mb-4">
            Formule <span className="text-red-500">*</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {FORMULES.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setForm({ ...form, formule: f.id })}
                className={`relative text-left rounded-xl border-2 p-4 transition-all focus:outline-none ${
                  form.formule === f.id
                    ? `${f.border} ${f.bgLight} ${f.ring} ring-2`
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                {f.badge && (
                  <span className={`absolute top-2 right-2 text-xs font-bold ${f.bg} text-white px-2 py-0.5 rounded-full`}>
                    Populaire
                  </span>
                )}
                <p className={`font-bold text-base mb-1 ${form.formule === f.id ? f.text : "text-gray-800"}`}>
                  {f.label}
                </p>
                <p className="text-xs text-gray-500 mb-2">{f.description}</p>
                <p className={`font-semibold text-sm ${form.formule === f.id ? f.text : "text-gray-600"}`}>
                  {f.prix}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Message (UI only) */}
        <div className="card p-6">
          <h2 className="text-base font-semibold text-gray-800 mb-2">Note interne</h2>
          <textarea
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder="Notes sur ce client (usage interne, non envoyé au client)…"
            rows={3}
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-violet-400"
          />
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="btn-primary min-w-[200px] flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                </svg>
                Création en cours…
              </>
            ) : (
              "Créer le client & envoyer l'email"
            )}
          </button>
        </div>

      </form>
    </div>
  );
}
