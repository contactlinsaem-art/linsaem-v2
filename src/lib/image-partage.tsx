import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { ACCROCHE, tailleImagePartage } from "@/lib/partage";

/**
 * Image de partage (Open Graph / Twitter) aux couleurs du site, 1200 × 630.
 * Sans titre : image générale (accueil et pages générales). Avec titre : pages métiers et articles.
 * Aucune capture, aucun numéro de téléphone ; textes en grand pour rester lisibles dans un aperçu mobile.
 */
const DEGRADE = "linear-gradient(135deg, #0ea5e9, #8b5cf6, #ec4899)";

async function polices() {
  const dossier = join(process.cwd(), "src/assets/fonts");
  const [medium, bold, extraBold] = await Promise.all(
    ["500", "700", "800"].map((poids) => readFile(join(dossier, `dm-sans-latin-${poids}.woff`))),
  );
  return [
    { name: "DM Sans", data: medium!, weight: 500 as const, style: "normal" as const },
    { name: "DM Sans", data: bold!, weight: 700 as const, style: "normal" as const },
    { name: "DM Sans", data: extraBold!, weight: 800 as const, style: "normal" as const },
  ];
}

function Marque({ grande }: { grande: boolean }) {
  const cote = grande ? 104 : 76;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: grande ? 28 : 22 }}>
      <div
        style={{
          width: cote,
          height: cote,
          borderRadius: cote * 0.25,
          background: DEGRADE,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: cote * 0.62,
          fontWeight: 800,
          color: "white",
        }}
      >
        L
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: grande ? 76 : 48, fontWeight: 800, letterSpacing: grande ? 6 : 4, lineHeight: 1 }}>LINSAEM</div>
        {!grande && <div style={{ marginTop: 8, fontSize: 28, fontWeight: 500, color: "#c4b5fd" }}>Agence de création web</div>}
      </div>
    </div>
  );
}

/** Taille du titre selon sa longueur : trois lignes au plus. */
function tailleTitre(titre: string): number {
  if (titre.length <= 40) return 76;
  if (titre.length <= 70) return 64;
  return 54;
}

export async function imagePartage(titre?: string) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 72px 0",
          background: "radial-gradient(circle at 100% 0%, #312e81 0%, #0f172a 55%)",
          color: "white",
          fontFamily: "DM Sans",
        }}
      >
        <Marque grande={!titre} />

        {titre ? (
          <div style={{ display: "flex", fontSize: tailleTitre(titre), fontWeight: 700, lineHeight: 1.12, letterSpacing: -1 }}>{titre}</div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ fontSize: 44, fontWeight: 700, color: "#c4b5fd" }}>Agence de création web</div>
            <div style={{ display: "flex", fontSize: 68, fontWeight: 700, lineHeight: 1.1, letterSpacing: -1, maxWidth: 1000 }}>{ACCROCHE}</div>
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div style={{ fontSize: 30, fontWeight: 500, color: "#cbd5e1" }}>linsaem.fr</div>
          <div style={{ height: 14, marginLeft: -72, marginRight: -72, background: DEGRADE }} />
        </div>
      </div>
    ),
    { ...tailleImagePartage, fonts: await polices() },
  );
}
