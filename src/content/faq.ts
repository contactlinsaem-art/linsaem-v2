import { entreprise } from "./entreprise";

export type QuestionReponse = { question: string; reponse: string };

export const faqAccueil: QuestionReponse[] = [
  {
    question: "Quelle différence entre un site vitrine et un développement sur mesure ?",
    reponse:
      "Le site vitrine présente votre activité (services, coordonnées, photos) pour un abonnement mensuel fixe. Le développement sur mesure concerne les projets avec des fonctionnalités propres : comptes utilisateurs, paiements, outils métier. Il est chiffré sur devis.",
  },
  {
    question: "Comment les prix des sites vitrines restent-ils aussi bas ?",
    reponse:
      "Les sites sont construits sur une base technique commune, éprouvée, puis adaptés à chaque activité. L'hébergement est mutualisé et le travail est organisé pour aller vite, sans intermédiaire.",
  },
  {
    question: "Y a-t-il un engagement de durée ?",
    reponse: "Non. L'abonnement est sans engagement et résiliable à tout moment avec un mois de préavis.",
  },
  {
    question: "Comment se passe le paiement ?",
    reponse:
      "Après validation de votre site, vous recevez un lien de paiement sécurisé Stripe. L'abonnement est ensuite prélevé chaque mois par carte. Les factures sont envoyées par email et restent disponibles dans le portail client Stripe.",
  },
  {
    question: "Je n'ai ni textes ni photos, est-ce un problème ?",
    reponse:
      "Non. Une aide à la rédaction et des photos libres de droits adaptées à votre activité peuvent être proposées.",
  },
  {
    question: "Mon site sera-t-il visible sur Google ?",
    reponse:
      "Chaque site est livré avec une structure propre, des balises renseignées, un affichage mobile et un chargement rapide. Ce sont les bases d'un bon référencement, sans garantie de position.",
  },
];

export const faqVitrines: QuestionReponse[] = [
  {
    question: "Puis-je changer de formule ?",
    reponse:
      "Oui, à tout moment, en écrivant à LINSAEM. Le changement prend effet au mois suivant, avec le tarif de la nouvelle formule.",
  },
  {
    question: "Que se passe-t-il si je résilie ?",
    reponse:
      "Le site reste en ligne jusqu'à la fin de la période payée. Le nom de domaine est enregistré à votre nom : il vous reste acquis, sans frais. Vos contenus (textes, images) vous sont remis sur demande. Le design et le code du site restent la propriété de LINSAEM.",
  },
  {
    question: "Qu'est-ce qu'une modification mineure ?",
    reponse: `Un changement de texte, d'image, d'horaires ou de tarifs. Une nouvelle page ou une nouvelle fonctionnalité n'en fait pas partie. Les demandes sont traitées une à la fois, sous ${entreprise.delais.modification}.`,
  },
  {
    question: "Puis-je modifier mon site moi-même ?",
    reponse: "Ce n'est pas nécessaire : les modifications incluses dans votre formule sont réalisées pour vous.",
  },
  {
    question: "Le site est-il adapté aux mobiles ?",
    reponse: "Oui, chaque site est conçu pour s'afficher correctement sur mobile, tablette et ordinateur.",
  },
];

export const faqDeveloppement: QuestionReponse[] = [
  {
    question: "Combien coûte un projet sur mesure ?",
    reponse:
      "Cela dépend du périmètre. Le devis, en HT et en TTC, détaille le prix fonctionnalité par fonctionnalité.",
  },
  {
    question: "Le premier échange est-il payant ?",
    reponse:
      "Non. Le premier échange de 30 minutes est gratuit et sans engagement. Pour les projets importants, un cadrage payant peut être proposé ; son montant est déduit du devis si vous le signez.",
  },
  {
    question: "À qui appartient le code ?",
    reponse:
      "Les droits sur le code développé pour votre projet vous sont cédés après paiement complet. LINSAEM conserve le droit de réutiliser ses composants génériques.",
  },
  {
    question: "Combien de temps faut-il ?",
    reponse:
      "De quelques semaines pour une intégration à plusieurs mois pour un SaaS complet. Le planning figure dans le devis.",
  },
  {
    question: "Et après la mise en ligne ?",
    reponse:
      "Deux options : un forfait de maintenance mensuel (hébergement, mises à jour de sécurité, petites corrections) ou des interventions à la demande.",
  },
];
