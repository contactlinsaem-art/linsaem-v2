import type { StaticImageData } from "next/image";
import coverVitrine from "@/assets/modeles/covers/vitrine.jpg";
import coverBoulangerie from "@/assets/modeles/covers/boulangerie.jpg";
import coverArtisan from "@/assets/modeles/covers/artisan.jpg";
import coverArchitecte from "@/assets/modeles/covers/architecte.jpg";
import coverPhotographe from "@/assets/modeles/covers/photographe.jpg";
import coverRestaurant from "@/assets/modeles/covers/restaurant.jpg";
import coverCoach from "@/assets/modeles/covers/coach.jpg";

export type Modele = {
  slug: string;
  /** Nom de l'entreprise fictive affichée dans le modèle */
  nom: string;
  secteur: string;
  description: string;
  cover: StaticImageData;
  coverAlt: string;
};

export const modeles: Modele[] = [
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

export function getModele(slug: string): Modele | undefined {
  return modeles.find((m) => m.slug === slug);
}
