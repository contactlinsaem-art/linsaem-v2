/** Constantes et types du formulaire de contact, partagés client / serveur (sans Zod). */

/** Nom du champ piège : invisible pour un humain, rempli par la plupart des robots. */
export const HONEYPOT = "site_web";

export const typesProjet = ["vitrine", "developpement"] as const;
export const choixFormule = ["starter", "pro", "business", "indecis"] as const;

export type TypeProjet = (typeof typesProjet)[number];
export type ChoixFormule = (typeof choixFormule)[number];

export const libellesType: Record<TypeProjet, string> = {
  vitrine: "Site vitrine",
  developpement: "Développement sur mesure",
};

export const libellesFormule: Record<ChoixFormule, string> = {
  starter: "Starter",
  pro: "Pro",
  business: "Business",
  indecis: "Je ne sais pas encore",
};

export type ContactField = "type" | "nom" | "email" | "telephone" | "formule" | "message";

export type ContactState =
  | { status: "idle" }
  | {
      status: "error";
      message: string;
      fieldErrors?: Partial<Record<ContactField, string>>;
      /** Saisie renvoyée pour réafficher le formulaire sans tout perdre. */
      values?: Partial<Record<ContactField, string>>;
    };
