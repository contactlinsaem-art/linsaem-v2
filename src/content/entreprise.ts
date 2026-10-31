/**
 * Identité et coordonnées de LINSAEM : source unique pour le site, les emails et le JSON-LD.
 * Toute valeur « [À REMPLIR] » apparaîtrait telle quelle sur /mentions-legales et /cgv.
 */
export const entreprise = {
  nom: "LINSAEM",
  url: "https://www.linsaem.fr",
  email: "contact@linsaem.fr",
  telephone: { affichage: "+33 6 25 73 43 35", lien: "+33625734335" },
  zone: "France",
  /** Ville du siège, reprise dans les données structurées (sans la rue). */
  ville: { nom: "Antony", codePostal: "92160" },

  legal: {
    formeSociale: "SASU",
    raisonSociale: "LINSAEM",
    capital: "1 000 €",
    rcs: "RCS Nanterre 928 206 671",
    siren: "928 206 671",
    siege: "24 avenue Paul Valéry, 92160 Antony",
    tva: "FR91928206671",
    directeurPublication: "Issam Ben Jazia, Président",
  },

  hebergeur: {
    nom: "Vercel, Inc.",
    adresse: "440 North Barranca Avenue, Suite 4133, Covina, California 91723, États-Unis",
    email: "support@vercel.com",
    site: "https://vercel.com",
  },

  delais: {
    reponse: "24 h ouvrées",
    modification: "48 h ouvrées",
    livraison: "48 à 72 h ouvrées",
  },
} as const;

/** URL du portail client Stripe (connexion par email, sans code). */
export const portailClientUrl = process.env.STRIPE_PORTAL_URL || null;
