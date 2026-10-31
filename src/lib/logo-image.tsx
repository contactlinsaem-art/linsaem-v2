import { ImageResponse } from "next/og";

/** Logo carré « L » sur dégradé, généré au build (icône Apple, logo du JSON-LD). */
export function logoImage(taille: number) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0ea5e9, #8b5cf6, #ec4899)",
          color: "white",
          fontSize: Math.round(taille * 0.62),
          fontWeight: 800,
          fontFamily: "sans-serif",
        }}
      >
        L
      </div>
    ),
    { width: taille, height: taille },
  );
}
