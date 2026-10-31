import type { ReactNode } from "react";
import { Body, Container, Head, Hr, Html, Preview, Section, Text } from "react-email";
import { entreprise } from "@/content/entreprise";

export const styles = {
  body: { backgroundColor: "#f8fafc", fontFamily: "Arial, Helvetica, sans-serif", margin: 0, padding: "24px 0" },
  container: { backgroundColor: "#ffffff", borderRadius: 12, maxWidth: 560, margin: "0 auto", padding: "32px" },
  brand: { fontSize: 18, fontWeight: 700, letterSpacing: 1, color: "#0f172a", margin: 0 },
  h1: { fontSize: 22, color: "#0f172a", margin: "24px 0 12px" },
  text: { fontSize: 15, lineHeight: "24px", color: "#334155", margin: "0 0 12px" },
  label: { fontSize: 12, textTransform: "uppercase" as const, letterSpacing: 0.5, color: "#64748b", margin: "16px 0 4px" },
  value: { fontSize: 15, lineHeight: "22px", color: "#0f172a", margin: 0, whiteSpace: "pre-wrap" as const },
  footer: { fontSize: 12, color: "#64748b", margin: 0 },
};

export function EmailLayout({ preview, children }: { preview: string; children: ReactNode }) {
  return (
    <Html lang="fr">
      <Head />
      <Preview>{preview}</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Text style={styles.brand}>{entreprise.nom}</Text>
          <Section>{children}</Section>
          <Hr style={{ borderColor: "#e2e8f0", margin: "28px 0 16px" }} />
          <Text style={styles.footer}>
            {entreprise.nom} · {entreprise.email} · {entreprise.url.replace("https://", "")}
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
