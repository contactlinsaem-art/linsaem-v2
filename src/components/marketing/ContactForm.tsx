"use client";
import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [form, setForm] = useState({ name: "", email: "", phone: "", formule: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setForm({ name: "", email: "", phone: "", formule: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <section id="contact" className="py-28 bg-gray-50">
        <div className="max-w-xl mx-auto px-6 text-center">
          <div className="card p-12">
            <CheckCircle size={56} className="text-green-500 mx-auto mb-6" />
            <h3 className="text-2xl font-extrabold text-gray-900 mb-3">Merci {form.name || ""} !</h3>
            <p className="text-gray-500">
              Votre demande a bien été envoyée. Nous vous recontactons sous 24h avec une proposition personnalisée.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 max-w-5xl mx-auto">
          {/* Left */}
          <div>
            <div className="section-tag">Contact</div>
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Parlons de votre projet</h2>
            <p className="text-gray-500 mb-10 leading-relaxed">
              Remplissez ce formulaire, on vous recontacte sous 24h avec une proposition personnalisée.
            </p>

            <div className="space-y-5">
              {[
                { icon: "📧", label: "Email", value: "contact@linsaem.fr", href: "mailto:contact@linsaem.fr" },
                { icon: "📱", label: "Téléphone / WhatsApp", value: "+33 1 89 70 15 26", href: "tel:+33189701526" },
                { icon: "⏰", label: "Réponse", value: "Sous 24h max", href: null },
              ].map((m) => (
                <div key={m.label} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-2xl shadow-sm flex-shrink-0">
                    {m.icon}
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 font-medium">{m.label}</div>
                    {m.href ? (
                      <a href={m.href} className="text-gray-900 font-semibold hover:text-sky-500 transition-colors">
                        {m.value}
                      </a>
                    ) : (
                      <div className="text-gray-900 font-semibold">{m.value}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Form */}
          <form onSubmit={handleSubmit} className="card p-8 space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Votre nom *</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Jean Dupont"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email *</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="jean@exemple.fr"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Téléphone / WhatsApp</label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="06 XX XX XX XX"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Formule souhaitée</label>
              <select
                value={form.formule}
                onChange={(e) => setForm({ ...form, formule: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-transparent transition-all bg-white"
              >
                <option value="">Sélectionnez une formule</option>
                <option value="Starter — 5,99€/mois">Starter — 5,99€/mois</option>
                <option value="Pro — 7,99€/mois">Pro — 7,99€/mois</option>
                <option value="Business — 11,99€/mois">Business — 11,99€/mois</option>
                <option value="Je ne sais pas encore">Je ne sais pas encore</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Décrivez votre activité</label>
              <textarea
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Ex : Je suis plombier à Lyon, j'ai besoin d'un site pour présenter mes services et recevoir des demandes de devis..."
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-transparent transition-all resize-none"
              />
            </div>

            {status === "error" && (
              <p className="text-red-500 text-sm">Une erreur est survenue. Réessayez ou contactez-nous par email.</p>
            )}

            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                name="rgpd"
                id="rgpd"
                required
                className="mt-1 w-4 h-4 rounded border-gray-300 text-sky-500 focus:ring-sky-300 cursor-pointer"
              />
              <label htmlFor="rgpd" className="text-xs text-gray-500 leading-relaxed">
                J&apos;accepte que mes données soient utilisées par LINSAEM pour répondre à ma demande. Consultez notre{" "}
                <a href="/politique-de-confidentialite" className="text-sky-500 hover:underline">
                  politique de confidentialité
                </a>.
              </label>
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full btn-gradient justify-center py-4 text-base disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === "loading" ? (
                <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> Envoi en cours...</span>
              ) : (
                <span className="flex items-center gap-2"><Send size={16} /> Recevoir ma proposition →</span>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
