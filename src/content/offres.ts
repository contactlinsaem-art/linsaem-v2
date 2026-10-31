import { entreprise } from "./entreprise";

export type FormuleId = "starter" | "pro" | "business";

export type Formule = {
  id: FormuleId;
  nom: string;
  /** Prix mensuel TTC en euros (TVA 20 %). Doit correspondre au Price Stripe. */
  prixMensuelTTC: number;
  /** Frais de mise en service TTC, facturés une fois avec la première mensualité. */
  fraisMiseEnServiceTTC: number;
  accroche: string;
  miseEnAvant?: boolean;
  caracteristiques: string[];
};

export const formules: Formule[] = [
  {
    id: "starter",
    nom: "Starter",
    prixMensuelTTC: 5.99,
    fraisMiseEnServiceTTC: 50,
    accroche: "Pour démarrer avec une page claire et efficace.",
    caracteristiques: [
      "Site d'une page, personnalisé",
      "Design adapté à votre activité",
      "Affichage optimisé sur mobile, tablette et ordinateur",
      "Formulaire de contact",
      "Hébergement, nom de domaine et HTTPS inclus",
      "1 modification par mois",
    ],
  },
  {
    id: "pro",
    nom: "Pro",
    prixMensuelTTC: 7.99,
    fraisMiseEnServiceTTC: 50,
    accroche: "Pour présenter vos services en détail.",
    miseEnAvant: true,
    caracteristiques: [
      "Site jusqu'à 3 pages",
      "Design premium personnalisé",
      "Galerie photos ou portfolio",
      "Carte Google Maps intégrée",
      "Optimisation SEO de base",
      "Hébergement, nom de domaine et HTTPS inclus",
      "3 modifications par mois",
      "Support prioritaire",
    ],
  },
  {
    id: "business",
    nom: "Business",
    prixMensuelTTC: 11.99,
    fraisMiseEnServiceTTC: 50,
    accroche: "Pour un site complet, avec blog.",
    caracteristiques: [
      "Site jusqu'à 10 pages",
      "Design haut de gamme",
      "Blog intégré",
      "Animations et effets",
      "SEO avancé",
      "Statistiques de visite, sans cookie",
      "Hébergement, nom de domaine et HTTPS inclus",
      "Modifications mineures illimitées",
      "Support prioritaire",
    ],
  },
];

export const prixMinimum = Math.min(...formules.map((f) => f.prixMensuelTTC));

const euros = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" });
const eurosRonds = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });

/** 5.99 → « 5,99 € » ; 50 → « 50 € » */
export function formatPrix(montant: number): string {
  return Number.isInteger(montant) ? eurosRonds.format(montant) : euros.format(montant);
}

export const inclusVitrine = [
  {
    titre: "Un design adapté à votre activité",
    texte: "Couleurs, typographies et mise en page choisies selon votre métier et votre image.",
  },
  {
    titre: "Votre nom de domaine",
    texte:
      "Enregistré à votre nom : achat, configuration et renouvellement pris en charge. Il vous reste acquis si vous résiliez.",
  },
  { titre: "Hébergement", texte: "Votre site est hébergé sur une infrastructure rapide et fiable." },
  {
    titre: "HTTPS",
    texte: "Certificat de sécurité inclus, indispensable pour la confiance des visiteurs et pour Google.",
  },
  { titre: "Maintenance", texte: "Mises à jour techniques et de sécurité prises en charge." },
  {
    titre: "Modifications",
    texte: `Un texte, une photo, des horaires ou des tarifs à changer ? Envoyez votre demande par email, elle est traitée sous ${entreprise.delais.modification}.`,
  },
  { titre: "Un interlocuteur humain", texte: "Par email ou par téléphone, pas de chatbot." },
];

export type Etape = { titre: string; texte: string };

export const processVitrine: Etape[] = [
  {
    titre: "Votre demande",
    texte: `Décrivez votre activité et choisissez une formule via le formulaire de contact. Une réponse vous est apportée sous ${entreprise.delais.reponse}.`,
  },
  {
    titre: "Vos contenus",
    texte:
      "Vous transmettez vos textes, photos et logo s'il existe. Pas de contenus ? Une aide à la rédaction et des photos libres de droits peuvent être proposées.",
  },
  {
    titre: "Création et validation",
    texte: `Un lien de prévisualisation vous est envoyé sous ${entreprise.delais.livraison} après réception de tous les contenus. Vous demandez les ajustements souhaités.`,
  },
  {
    titre: "Paiement et mise en ligne",
    texte:
      "Après votre validation, vous recevez un lien de paiement sécurisé Stripe (abonnement et frais de mise en service). Le site est mis en ligne dès le paiement.",
  },
];

export const typesDeveloppement = [
  {
    titre: "Applications web",
    texte: "Outils métier, tableaux de bord, back-offices, espaces clients ou partenaires.",
  },
  {
    titre: "SaaS",
    texte: "Un produit en ligne vendu par abonnement, avec comptes utilisateurs, formules et facturation récurrente.",
  },
  {
    titre: "Applications temps réel",
    texte: "Messagerie, notifications instantanées, suivi en direct, collaboration à plusieurs.",
  },
  {
    titre: "Intégrations",
    texte:
      "Paiement en ligne (Stripe), connexion à des API tierces, emails transactionnels, automatisations entre vos outils.",
  },
];

export const processDeveloppement: Etape[] = [
  {
    titre: "Premier échange",
    texte:
      "Un échange gratuit de 30 minutes, sans engagement, pour comprendre votre besoin, vos utilisateurs, vos contraintes et vos délais.",
  },
  {
    titre: "Cadrage",
    texte:
      "Pour les projets importants, un cadrage détaillé fixe le périmètre et les priorités. Il est payant, et son montant est déduit du devis si vous le signez.",
  },
  {
    titre: "Devis",
    texte:
      "Un devis détaillé, en HT et en TTC, présente les fonctionnalités, le planning et le prix. Rien n'est engagé avant sa signature.",
  },
  {
    titre: "Développement",
    texte:
      "Le projet avance par étapes. Une version de test en ligne vous permet de suivre l'avancement et d'ajuster au fil de l'eau.",
  },
  {
    titre: "Mise en ligne",
    texte:
      "Déploiement, configuration du domaine, vérifications finales. Après paiement complet, les droits sur le code vous sont cédés et les accès vous sont remis.",
  },
  {
    titre: "Maintenance",
    texte:
      "Au choix : un forfait mensuel optionnel (hébergement, mises à jour de sécurité, petites corrections) ou des interventions à la demande.",
  },
];

export const technologies = ["TypeScript", "React", "Next.js", "Node.js", "PostgreSQL", "Stripe", "Resend", "Vercel"];
