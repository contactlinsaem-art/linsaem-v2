"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export function CookieBanner() {
  const [consent, setConsent] = useState<string | null>("accepted"); // default hides banner until hydration

  useEffect(() => {
    setConsent(localStorage.getItem("cookie_consent"));
  }, []);

  if (consent === "accepted" || consent === "refused") return null;

  const handleAccept = () => {
    localStorage.setItem("cookie_consent", "accepted");
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("consent", "update", { analytics_storage: "granted" });
    }
    setConsent("accepted");
  };

  const handleRefuse = () => {
    localStorage.setItem("cookie_consent", "refused");
    setConsent("refused");
  };

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200"
      style={{ padding: "20px" }}
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className="text-sm text-gray-600 flex-1">
          Nous utilisons des cookies Google Analytics pour mesurer notre audience et améliorer votre expérience. Vos données ne sont pas vendues.{" "}
          <Link href="/politique-de-confidentialite" className="text-sky-500 hover:underline">
            Politique de confidentialité
          </Link>
        </p>
        <div className="flex gap-3 flex-shrink-0">
          <button
            onClick={handleRefuse}
            className="px-5 py-2 rounded-full border border-gray-300 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Tout refuser
          </button>
          <button
            onClick={handleAccept}
            className="px-5 py-2 rounded-full bg-black text-white text-sm hover:bg-gray-800 transition-colors"
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
}
