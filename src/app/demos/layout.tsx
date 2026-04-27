import type { ReactNode } from "react";

export default function DemosLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="sticky top-0 z-50 bg-black text-white text-xs text-center py-2 px-4">
        🚀 Démo LINSAEM — Votre site sur-mesure dès 5,99€ TTC/mois —{" "}
        <a
          href="https://www.linsaem.fr/#contact"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            background: "linear-gradient(135deg, #667eea, #764ba2, #f093fb)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontWeight: 600,
          }}
        >
          Commencer →
        </a>
      </div>
      {children}
    </>
  );
}
