"use client";

import { useState } from "react";
import { CheckCircle } from "lucide-react";

type ProfileData = {
  name: string;
  email: string;
  phone: string;
};

export default function ProfilPage() {
  const [profileSuccess, setProfileSuccess] = useState(false);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [profileLoading, setProfileLoading] = useState(false);

  const [pwSuccess, setPwSuccess] = useState(false);
  const [pwError, setPwError] = useState<string | null>(null);
  const [pwLoading, setPwLoading] = useState(false);

  async function handleProfileSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setProfileError(null);
    setProfileSuccess(false);
    setProfileLoading(true);

    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const phone = (form.elements.namedItem("phone") as HTMLInputElement).value;

    try {
      const res = await fetch("/api/profil", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone }),
      });
      if (res.ok) {
        setProfileSuccess(true);
      } else {
        const data = await res.json();
        setProfileError(data.error || "Erreur lors de la sauvegarde.");
      }
    } catch {
      setProfileError("Erreur réseau.");
    } finally {
      setProfileLoading(false);
    }
  }

  async function handlePasswordSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPwError(null);
    setPwSuccess(false);
    setPwLoading(true);

    const form = e.currentTarget;
    const currentPassword = (form.elements.namedItem("currentPassword") as HTMLInputElement).value;
    const newPassword = (form.elements.namedItem("newPassword") as HTMLInputElement).value;
    const confirmPassword = (form.elements.namedItem("confirmPassword") as HTMLInputElement).value;

    if (newPassword !== confirmPassword) {
      setPwError("Les nouveaux mots de passe ne correspondent pas.");
      setPwLoading(false);
      return;
    }
    if (newPassword.length < 8) {
      setPwError("Le nouveau mot de passe doit faire au moins 8 caractères.");
      setPwLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      if (res.ok) {
        setPwSuccess(true);
        form.reset();
      } else {
        const data = await res.json();
        setPwError(data.error || "Erreur lors du changement de mot de passe.");
      }
    } catch {
      setPwError("Erreur réseau.");
    } finally {
      setPwLoading(false);
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-gray-900">Mon profil</h1>
        <p className="text-gray-500 mt-1">Gérez vos informations personnelles.</p>
      </div>

      {/* Informations */}
      <div className="card p-8 mb-6">
        <h2 className="font-bold text-gray-900 mb-6">Informations personnelles</h2>

        {profileSuccess && (
          <div className="flex items-center gap-2 bg-green-50 border border-green-100 text-green-700 text-sm px-4 py-3 rounded-xl mb-5">
            <CheckCircle size={16} />
            Profil mis à jour avec succès.
          </div>
        )}
        {profileError && (
          <div className="bg-red-50 border border-red-100 text-red-600 text-sm px-4 py-3 rounded-xl mb-5">
            {profileError}
          </div>
        )}

        <form onSubmit={handleProfileSubmit} className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Nom complet</label>
              <input
                type="text"
                name="name"
                required
                placeholder="Votre nom"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Téléphone</label>
              <input
                type="tel"
                name="phone"
                placeholder="+33 6 00 00 00 00"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-transparent transition-all"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email</label>
            <input
              type="email"
              disabled
              className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 text-sm text-gray-400 cursor-not-allowed"
            />
            <p className="text-xs text-gray-400 mt-1">L&apos;adresse email n&apos;est pas modifiable.</p>
          </div>
          <button
            type="submit"
            disabled={profileLoading}
            className="btn-gradient disabled:opacity-60"
          >
            {profileLoading ? "Sauvegarde..." : "Sauvegarder →"}
          </button>
        </form>
      </div>

      {/* Mot de passe */}
      <div className="card p-8">
        <h2 className="font-bold text-gray-900 mb-6">Changer mon mot de passe</h2>

        {pwSuccess && (
          <div className="flex items-center gap-2 bg-green-50 border border-green-100 text-green-700 text-sm px-4 py-3 rounded-xl mb-5">
            <CheckCircle size={16} />
            Mot de passe modifié avec succès.
          </div>
        )}
        {pwError && (
          <div className="bg-red-50 border border-red-100 text-red-600 text-sm px-4 py-3 rounded-xl mb-5">
            {pwError}
          </div>
        )}

        <form onSubmit={handlePasswordSubmit} className="space-y-4 max-w-md">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Mot de passe actuel</label>
            <input
              type="password"
              name="currentPassword"
              required
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Nouveau mot de passe</label>
            <input
              type="password"
              name="newPassword"
              required
              minLength={8}
              placeholder="Minimum 8 caractères"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Confirmer le nouveau mot de passe</label>
            <input
              type="password"
              name="confirmPassword"
              required
              minLength={8}
              placeholder="Retapez le nouveau mot de passe"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-transparent transition-all"
            />
          </div>
          <button
            type="submit"
            disabled={pwLoading}
            className="btn-gradient disabled:opacity-60"
          >
            {pwLoading ? "Modification..." : "Changer le mot de passe →"}
          </button>
        </form>
      </div>
    </div>
  );
}
