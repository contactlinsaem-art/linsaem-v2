"use client";
import { useEffect, useState } from "react";

export function FloatingCTA() {
  const [visible, setVisible] = useState(false);
  const [hidden, setHidden] = useState(false);

  // Apparaît après 3 secondes
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Disparaît quand #contact ou #tarifs est dans le viewport
  useEffect(() => {
    const targets = ["#contact", "#tarifs"]
      .map((id) => document.querySelector(id))
      .filter(Boolean) as Element[];

    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const anyVisible = entries.some((e) => e.isIntersecting);
        setHidden(anyVisible);
      },
      { threshold: 0.15 }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const show = visible && !hidden;

  return (
    <a
      href="#contact"
      onClick={(e) => {
        e.preventDefault();
        document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
      }}
      aria-label="Commencer"
      className={`fixed bottom-5 right-5 z-40 text-white font-medium shadow-lg shadow-black/20 transition-all duration-500
        rounded-[50px] text-sm
        px-5 py-3 sm:px-6 sm:py-[14px]
        ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"}
      `}
      style={{ background: "#111827" }}
    >
      <span className="hidden sm:inline">Commencer →</span>
      <span className="sm:hidden">Commencer</span>
    </a>
  );
}
