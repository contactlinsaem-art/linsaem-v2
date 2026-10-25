import { ImageResponse } from "next/og";
import { formatPrix, prixMinimum } from "@/content/offres";

export const alt = "LINSAEM — Sites vitrines par abonnement et développement web sur mesure";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#020617",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 18,
              background: "linear-gradient(135deg, #0ea5e9, #8b5cf6, #ec4899)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 44,
              fontWeight: 800,
            }}
          >
            L
          </div>
          <div style={{ fontSize: 40, fontWeight: 700, letterSpacing: 4 }}>LINSAEM</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.1 }}>
            Sites vitrines par abonnement et développement web sur mesure
          </div>
          <div style={{ fontSize: 32, color: "#cbd5e1" }}>
            {`Dès ${formatPrix(prixMinimum)} TTC / mois · Applications, SaaS et intégrations sur devis`}
          </div>
        </div>
        <div
          style={{ height: 10, width: "100%", borderRadius: 5, background: "linear-gradient(90deg, #0ea5e9, #8b5cf6, #ec4899)" }}
        />
      </div>
    ),
    size,
  );
}
