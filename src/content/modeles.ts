import type { StaticImageData } from "next/image";
import coverVitrine from "@/assets/modeles/covers/vitrine.jpg";
import coverBoulangerie from "@/assets/modeles/covers/boulangerie.jpg";
import coverArtisan from "@/assets/modeles/covers/artisan.jpg";
import coverArchitecte from "@/assets/modeles/covers/architecte.jpg";
import coverPhotographe from "@/assets/modeles/covers/photographe.jpg";
import coverRestaurant from "@/assets/modeles/covers/restaurant.jpg";
import coverCoach from "@/assets/modeles/covers/coach.jpg";
import apercuSauge from "@/assets/modeles/apercus/maison-sauge.jpg";
import apercuFournil from "@/assets/modeles/apercus/fournil-saint-roch.jpg";
import apercuFerrand from "@/assets/modeles/apercus/ferrand-plomberie.jpg";
import apercuLigne from "@/assets/modeles/apercus/studio-ligne.jpg";
import apercuGrain from "@/assets/modeles/apercus/atelier-grain.jpg";
import apercuOlivette from "@/assets/modeles/apercus/maison-olivette.jpg";
import apercuCap from "@/assets/modeles/apercus/cap-equilibre.jpg";

export type Modele = {
  slug: string;
  /** Nom de l'entreprise fictive affichée dans le modèle */
  nom: string;
  secteur: string;
  description: string;
  /**
   * Vignette. Collection actuelle : capture du haut de la page du modèle (1440 × 900),
   * régénérée par `node scripts/apercus-modeles.mjs` après une modification visuelle.
   */
  cover: StaticImageData;
  /** Vide pour une capture d'écran (décorative : le nom du modèle sert de lien). */
  coverAlt: string;
  /** Palette et typographies, affichées sur la vignette. */
  palette?: string[];
  typographies?: string;
};

/** Collection actuelle : chaque modèle a sa propre identité (palette, typographies, mise en page). */
export const modeles: Modele[] = [
  {
    slug: "maison-sauge",
    nom: "Maison Sauge",
    secteur: "Boutique de mode",
    description: "Une boutique éditoriale aux tons naturels : collection filtrable, lookbook, histoire de l'atelier et visite en boutique.",
    cover: apercuSauge,
    coverAlt: "",
    palette: ["#f4efe6", "#5b6b4e", "#2a2620"],
    typographies: "Cormorant · DM Sans",
  },
  {
    slug: "fournil-saint-roch",
    nom: "Fournil Saint-Roch",
    secteur: "Boulangerie artisanale",
    description: "Un commerce de quartier chaleureux : horaires de sortie du four, spécialités, commande à emporter et horaires d'ouverture.",
    cover: apercuFournil,
    coverAlt: "",
    palette: ["#fbf4e8", "#8a3b12", "#e2a93b"],
    typographies: "Fraunces · Work Sans",
  },
  {
    slug: "ferrand-plomberie",
    nom: "Ferrand Plomberie",
    secteur: "Artisan du bâtiment",
    description: "Un site qui fait sonner le téléphone : urgence 7 j/7, prestations, zone d'intervention et devis en ligne.",
    cover: apercuFerrand,
    coverAlt: "",
    palette: ["#0c1b2e", "#ffc53d", "#f4f6f8"],
    typographies: "Archivo",
  },
  {
    slug: "studio-ligne",
    nom: "Studio Ligne",
    secteur: "Cabinet d'architecture",
    description: "Un portfolio minimal et typographique : projets en grand format, démarche en quatre temps et contact.",
    cover: apercuLigne,
    coverAlt: "",
    palette: ["#f2f1ed", "#141414", "#b0502c"],
    typographies: "Syne · DM Sans",
  },
  {
    slug: "atelier-grain",
    nom: "Atelier Grain",
    secteur: "Photographe",
    description: "Un écrin sombre pour les images : galerie en mosaïque filtrable, prestations avec tarifs et demande de date.",
    cover: apercuGrain,
    coverAlt: "",
    palette: ["#0f0e0d", "#e9e4dc", "#c9a27a"],
    typographies: "Playfair Display · Manrope",
  },
  {
    slug: "maison-olivette",
    nom: "Maison Olivette",
    secteur: "Restaurant",
    description: "Une table méditerranéenne : carte par onglets, menu du moment, histoire de la maison et réservation.",
    cover: apercuOlivette,
    coverAlt: "",
    palette: ["#1e2a1c", "#d9b46a", "#f6f0e2"],
    typographies: "DM Serif Display · Karla",
  },
  {
    slug: "cap-equilibre",
    nom: "Cap Équilibre",
    secteur: "Coach",
    description: "Un site qui met en confiance : pour qui, méthode en étapes, programmes avec tarifs et choix d'un créneau.",
    cover: apercuCap,
    coverAlt: "",
    palette: ["#fff8ef", "#16323d", "#e8664a"],
    typographies: "Bricolage Grotesque · Figtree",
  },
];

/** Première collection, conservée en ligne. */
export const modelesClassiques: Modele[] = [
  {
    slug: "vitrine",
    nom: "Céleste",
    secteur: "Boutique de mode",
    description: "Une vitrine élégante pour une marque de prêt-à-porter : collection filtrable, lookbook et prise de contact.",
    cover: coverVitrine,
    coverAlt: "Vêtements aux tons naturels suspendus à une branche sur un mur clair",
  },
  {
    slug: "boulangerie",
    nom: "La Boulangerie Dorée",
    secteur: "Boulangerie artisanale",
    description: "Un site chaleureux pour un commerce de proximité : spécialités, horaires, adresse et commande par téléphone.",
    cover: coverBoulangerie,
    coverAlt: "Pains de campagne aux graines et épis de blé sur une table farinée",
  },
  {
    slug: "artisan",
    nom: "Plomberie du Centre",
    secteur: "Artisan du bâtiment",
    description: "Un site orienté demandes de devis : services, urgences, étapes d'intervention et formulaire de contact.",
    cover: coverArtisan,
    coverAlt: "Tuyauterie et compteur de gaz fixés sur un mur de briques",
  },
  {
    slug: "architecte",
    nom: "Atelier Horizon",
    secteur: "Cabinet d'architecture",
    description: "Un portfolio sobre et haut de gamme : projets en grand format, philosophie du cabinet et prise de contact.",
    cover: coverArchitecte,
    coverAlt: "Mains traçant le croquis d'un bâtiment sur un plan, règle posée sur la feuille",
  },
  {
    slug: "photographe",
    nom: "Studio Lumen",
    secteur: "Photographe",
    description: "Une galerie en mosaïque filtrable par thème, des prestations avec tarifs et une demande de réservation.",
    cover: coverPhotographe,
    coverAlt: "Appareil photo reflex lancé en l'air dans une forêt en automne",
  },
  {
    slug: "restaurant",
    nom: "La Table Provençale",
    secteur: "Restaurant",
    description: "Une carte par onglets, l'histoire de la maison, les horaires et un formulaire de réservation.",
    cover: coverRestaurant,
    coverAlt: "Assiette dressée servie sur une table de restaurant éclairée à la bougie",
  },
  {
    slug: "coach",
    nom: "Élan Coaching",
    secteur: "Coach",
    description: "Un site qui convertit : programmes avec tarifs, méthode en étapes et choix d'un créneau de rendez-vous.",
    cover: coverCoach,
    coverAlt: "Réunion de travail autour d'un mur couvert de notes adhésives",
  },
];

export const tousLesModeles = [...modeles, ...modelesClassiques];

export function getModele(slug: string): Modele | undefined {
  return tousLesModeles.find((m) => m.slug === slug);
}
