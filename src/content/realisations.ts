import type { StaticImageData } from "next/image";
import apercuFatuiali from "@/assets/realisations/fatuiali.jpg";
import apercuAuxMille from "@/assets/realisations/aux-mille-et-une-beautes.jpg";
import apercuRenaissance from "@/assets/realisations/renaissance-securite.jpg";
import apercuCvuzz from "@/assets/realisations/cvuzz.jpg";
import apercuCosmalian from "@/assets/realisations/cosmalian.jpg";

export type Realisation = {
  slug: string;
  nom: string;
  url: string;
  /** "client" = site vitrine livré à un client ; "application" = application conçue et développée par LINSAEM. */
  type: "client" | "application";
  /** Secteur ou catégorie, affiché en sous-titre. */
  secteur: string;
  description: string;
  points?: string[];
  /** Capture de la page d'accueil du site (1440 × 900). */
  apercu: StaticImageData;
  detail: {
    contexte: string;
    besoin: string;
    solution: string;
    fonctionnalites: string[];
  };
  /** Page métier correspondante (maillage interne). */
  metier?: string;
  /** Passer à true uniquement après accord du client. */
  publie: boolean;
};

export const libelleType: Record<Realisation["type"], string> = {
  client: "Site client",
  application: "Développement d'application",
};

export const realisations: Realisation[] = [
  // Sites clients — publiés avec l'accord des clients
  {
    slug: "fatuiali",
    nom: "fatuiali.fr",
    url: "https://fatuiali.fr",
    type: "client",
    secteur: "Ménage à domicile",
    description:
      "Site vitrine pour une prestataire de ménage à domicile dans le Val-d'Oise et la Seine-Saint-Denis : quatre formules détaillées, zone d'intervention, demande de devis et contact WhatsApp.",
    apercu: apercuFatuiali,
    detail: {
      contexte:
        "Une prestataire de ménage à domicile intervient autour de Fosses et du secteur de Roissy, dans le Val-d'Oise et la Seine-Saint-Denis, chez des particuliers comme chez des propriétaires de locations de courte durée.",
      besoin:
        "Présenter quatre prestations aux tarifs différents sans noyer le visiteur, rassurer sur le sérieux du service, et recevoir des demandes de devis complètes plutôt que des appels à rappeler.",
      solution:
        "Un site d'une page construit autour des quatre formules : pour chacune, le détail des tâches, la fréquence conseillée et le tarif (à l'heure ou sur devis). Les communes desservies sont listées, et les boutons de devis, d'appel et de WhatsApp restent à portée de pouce sur mobile.",
      fonctionnalites: [
        "Quatre formules détaillées : ménage régulier, ménage ponctuel, grand ménage, nettoyage Airbnb",
        "Tarifs affichés à l'heure ou sur devis selon la prestation",
        "Zone d'intervention présentée commune par commune",
        "Demande de devis, appel et WhatsApp en un geste",
        "Titre et description optimisés pour les recherches locales",
      ],
    },
    metier: "entreprise-de-menage",
    publie: true,
  },
  {
    slug: "aux-mille-et-une-beautes",
    nom: "auxmilleetunebeautes.fr",
    url: "https://auxmilleetunebeautes.fr",
    type: "client",
    secteur: "Esthéticienne",
    description:
      "Site vitrine pour une esthéticienne à La Ciotat, en cabinet et à domicile : présentation des soins, grille tarifaire complète par catégorie, horaires et prise de rendez-vous.",
    apercu: apercuAuxMille,
    detail: {
      contexte:
        "Une esthéticienne diplômée, installée à La Ciotat depuis 2013, reçoit en cabinet et se déplace à domicile dans les communes voisines.",
      besoin:
        "Rendre lisible une offre large (épilation, soins du visage et du corps, ongles, maquillage, blanchiment dentaire), afficher tous les tarifs et indiquer pour chaque soin s'il se fait en cabinet, à domicile ou les deux.",
      solution:
        "Un site au ton chaleureux qui classe les soins par catégorie, avec un repère cabinet / domicile sur chacun, une grille tarifaire complète et les horaires. Les boutons d'appel mènent directement à la prise de rendez-vous.",
      fonctionnalites: [
        "Soins classés par catégorie, avec repère cabinet / domicile",
        "Grille tarifaire complète, catégorie par catégorie",
        "Horaires d'ouverture et zone de déplacement",
        "Prise de rendez-vous par téléphone en un clic",
        "Offre de bienvenue mise en avant",
      ],
    },
    metier: "estheticienne",
    publie: true,
  },
  {
    slug: "renaissance-securite",
    nom: "renaissance-securite-mr.com",
    url: "https://renaissance-securite-mr.com",
    type: "client",
    secteur: "Sécurité privée",
    description:
      "Site multipages pour une société de sécurité privée à Nouakchott (Mauritanie) : services, formation, vidéo de présentation et demande de devis.",
    apercu: apercuRenaissance,
    detail: {
      contexte:
        "Une société de gardiennage et de sécurité privée basée à Nouakchott, en Mauritanie, travaille pour des entreprises, des sites industriels et des établissements recevant du public.",
      besoin:
        "Présenter une offre étendue (gardiennage, vidéosurveillance, prévention incendie, formation aux premiers secours, vente d'équipements) avec une image professionnelle, et obtenir des demandes de devis qualifiées.",
      solution:
        "Un site multipages : accueil, présentation de la société, services, formation et devis. Une vidéo de présentation montre les équipes sur le terrain, et le formulaire de devis est accessible depuis chaque page.",
      fonctionnalites: [
        "Pages Accueil, À propos, Services, Formation et Devis",
        "Services détaillés par domaine : gardiennage, surveillance, incendie, secours, équipements",
        "Vidéo de présentation intégrée",
        "Formulaire de demande de devis",
        "Mise en page pensée pour le mobile",
      ],
    },
    publie: true,
  },

  // Applications conçues et développées par LINSAEM
  {
    slug: "cvuzz",
    nom: "Cvuzz",
    url: "https://cvuzz.com",
    type: "application",
    secteur: "SaaS de recrutement",
    description:
      "Plateforme SaaS d'entretien vidéo différé pour les recruteurs. Le recruteur envoie ses questions, le candidat enregistre ses réponses en vidéo quand il le souhaite, le recruteur les évalue à son rythme.",
    points: ["SaaS", "Vidéo", "Recrutement"],
    apercu: apercuCvuzz,
    detail: {
      contexte:
        "Pour présélectionner des candidats, beaucoup de recruteurs enchaînent les appels téléphoniques et peinent à trouver un créneau avec des personnes déjà en poste, en formation ou aux horaires décalés.",
      besoin:
        "Poser les mêmes questions à tous les candidats sans prendre de rendez-vous, laisser chacun répondre quand il le peut sans créer de compte, et trier les réponses rapidement.",
      solution:
        "Une plateforme d'entretien vidéo différé : le recruteur écrit ses questions une fois, partage un lien, puis visionne les réponses découpées par question et les classe dans un tableau. Le paiement se fait par crédits, sans abonnement.",
      fonctionnalites: [
        "Campagnes de 3 à 20 questions écrites",
        "Réponse en vidéo depuis un téléphone ou un ordinateur, sans compte",
        "Invitations par email avec relance automatique",
        "Tableau de tri en cinq colonnes, vidéos repérées question par question",
        "Vidéos hébergées dans l'Union européenne, supprimées 30 jours après la clôture",
        "Paiement en ligne par packs de crédits",
      ],
    },
    publie: true,
  },
  {
    slug: "cosmalian",
    nom: "Cosmalian",
    url: "https://cosmalian.com",
    type: "application",
    secteur: "Jeu multijoueur en ligne",
    description:
      "Jeu de plateau économique sur le thème de l'espace, de 2 à 6 joueurs, directement dans le navigateur, sans installation ni inscription : on crée une partie et on partage le lien.",
    points: ["Temps réel", "Multijoueur", "Jeu"],
    apercu: apercuCosmalian,
    detail: {
      contexte:
        "Les jeux de plateau en ligne demandent souvent une installation, un compte ou un abonnement, ce qui décourage les parties improvisées entre amis.",
      besoin:
        "Lancer une partie à plusieurs en quelques secondes, depuis n'importe quel navigateur, avec un plateau identique et à jour pour tous les joueurs.",
      solution:
        "Un jeu de plateau économique sur le thème de l'espace, en temps réel : un joueur crée la partie, partage le lien, et chaque action est répercutée instantanément chez les autres.",
      fonctionnalites: [
        "De 2 à 6 joueurs par partie",
        "Aucune installation ni inscription",
        "Synchronisation des actions en temps réel",
        "Achat de propriétés, construction de Bases puis de Hubs",
        "Partie rejointe par simple lien",
      ],
    },
    publie: true,
  },
];

export const realisationsPubliees = realisations.filter((r) => r.publie);
export const sitesClients = realisationsPubliees.filter((r) => r.type === "client");
export const applications = realisationsPubliees.filter((r) => r.type === "application");

export function getRealisation(slug: string): Realisation | undefined {
  return realisationsPubliees.find((r) => r.slug === slug);
}
