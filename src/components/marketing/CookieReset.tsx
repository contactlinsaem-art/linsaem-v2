"use client";

export function CookieReset({ label = "Retirer mon consentement" }: { label?: string }) {
  const handleReset = () => {
    localStorage.removeItem("cookie_consent");
    window.location.reload();
  };

  return (
    <button
      onClick={handleReset}
      className="text-xs text-gray-700 hover:text-gray-500 transition-colors mt-2 underline"
    >
      {label}
    </button>
  );
}
