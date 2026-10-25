/**
 * Identité et coordonnées de LINSAEM : source unique pour le site, les emails et le JSON-LD.
 * Les valeurs « [À REMPLIR] » apparaissent telles quelles sur /mentions-legales et /cgv.
 */
export const entreprise = {
  nom: "LINSAEM",
  url: "https://www.linsaem.fr",
  email: "contact@linsaem.fr",
  telephone: { affichage: "+33 6 25 73 43 35", lien: "+33625734335" },
  zone: "France",

  legal: {
    formeSociale: "SASU",
    raisonSociale: "LINSAEM",
    capital: "[À REMPLIR] €",
    rcs: "RCS [À REMPLIR] [À REMPLIR]",
    siren: "[À REMPLIR]",
    siege: "[À REMPLIR]",
    tva: "FR[À REMPLIR]",
    directeurPublication: "[À REMPLIR]",
    mediateur: {
      nom: "[À REMPLIR]",
      adresse: "[À REMPLIR]",
      site: "[À REMPLIR]",
    },
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
