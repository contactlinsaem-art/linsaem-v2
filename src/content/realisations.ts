export type Realisation = {
  nom: string;
  url: string;
  /** "client" = site livré à un client ; "produit" = projet interne développé et exploité par LINSAEM. */
  type: "client" | "produit";
  description: string;
  points?: string[];
  /** Passer à true uniquement après accord du client. */
  publie: boolean;
};

export const realisations: Realisation[] = [
  // Sites clients — publiés avec l'accord des clients
  {
    nom: "fatuiali.fr",
    url: "https://fatuiali.fr",
    type: "client",
    description: "Site vitrine pour une prestataire de ménage à domicile dans le Val-d'Oise et la Seine-Saint-Denis : quatre formules détaillées, zone d'intervention, demande de devis et contact WhatsApp.",
    publie: true,
  },
  {
    nom: "auxmilleetunebeautes.fr",
    url: "https://auxmilleetunebeautes.fr",
    type: "client",
    description: "Site vitrine pour une esthéticienne à La Ciotat, en cabinet et à domicile : présentation des soins, grille tarifaire complète par catégorie, horaires et prise de rendez-vous.",
    publie: true,
  },
  {
    nom: "renaissance-securite-mr.com",
    url: "https://renaissance-securite-mr.com",
    type: "client",
    description: "Site multipages pour une société de sécurité privée à Nouakchott (Mauritanie) : services, formation, vidéo de présentation et demande de devis.",
    publie: true,
  },

  // Produits LINSAEM
  {
    nom: "Cvuzz",
    url: "https://cvuzz.com",
    type: "produit",
    description:
      "Plateforme SaaS d'entretien vidéo différé pour les recruteurs. Le recruteur envoie ses questions, le candidat enregistre ses réponses en vidéo quand il le souhaite, le recruteur les évalue à son rythme.",
    points: ["SaaS", "Vidéo", "Recrutement"],
    publie: true,
  },
  {
    nom: "Cosmalian",
    url: "https://cosmalian.com",
    type: "produit",
    description:
      "Jeu de plateau économique sur le thème de l'espace, de 2 à 6 joueurs, directement dans le navigateur, sans installation ni inscription : on crée une partie et on partage le lien.",
    points: ["Temps réel", "Multijoueur", "Jeu"],
    publie: true,
  },
];

export const realisationsPubliees = realisations.filter((r) => r.publie);
export const sitesClients = realisationsPubliees.filter((r) => r.type === "client");
export const produits = realisationsPubliees.filter((r) => r.type === "produit");
