import { Text } from "react-email";
import type { ContactInput } from "@/lib/contact-schema";
import { libellesFormule, libellesType } from "@/lib/contact-fields";
import { EmailLayout, styles } from "./Layout";

/**
 * Alerte interne : contient la saisie du visiteur.
 * React échappe chaque valeur, aucune ne peut injecter de HTML.
 */
export function LeadAlert({ demande }: { demande: ContactInput }) {
  const lignes: [string, string | undefined][] = [
    ["Type de projet", libellesType[demande.type]],
    ["Formule", demande.formule ? libellesFormule[demande.formule] : undefined],
    ["Nom", demande.nom],
    ["Email", demande.email],
    ["Téléphone", demande.telephone],
  ];

  return (
    <EmailLayout preview={`Nouvelle demande : ${libellesType[demande.type]}`}>
      <Text style={styles.h1}>Nouvelle demande : {libellesType[demande.type]}</Text>
      {lignes
        .filter(([, v]) => v)
        .map(([label, value]) => (
          <div key={label}>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.value}>{value}</Text>
          </div>
        ))}
      <Text style={styles.label}>Message</Text>
      <Text style={styles.value}>{demande.message}</Text>
      <Text style={{ ...styles.text, marginTop: 24 }}>Répondez directement à cet email pour écrire à la personne.</Text>
    </EmailLayout>
  );
}
