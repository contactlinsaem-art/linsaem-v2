import { Text } from "react-email";
import { entreprise } from "@/content/entreprise";
import { EmailLayout, styles } from "./Layout";

/**
 * Accusé de réception envoyé au visiteur.
 * Texte fixe, sans aucune donnée saisie : le formulaire ne peut pas servir à envoyer
 * un contenu choisi par un tiers depuis l'adresse de LINSAEM.
 */
export function AccuseReception() {
  return (
    <EmailLayout preview="Votre demande a bien été reçue">
      <Text style={styles.h1}>Votre demande a bien été reçue</Text>
      <Text style={styles.text}>Bonjour,</Text>
      <Text style={styles.text}>
        Merci pour votre message. Une réponse vous sera apportée sous {entreprise.delais.reponse}.
      </Text>
      <Text style={styles.text}>
        Si vous n&apos;êtes pas à l&apos;origine de cette demande, vous pouvez ignorer cet email.
      </Text>
      <Text style={styles.text}>— {entreprise.nom}</Text>
    </EmailLayout>
  );
}
