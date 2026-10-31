import "server-only";
import { z } from "zod";
import { choixFormule, typesProjet } from "./contact-fields";

const texte = (min: number, max: number, messageMin: string) =>
  z
    .string()
    .trim()
    .min(min, messageMin)
    .max(max, `${max} caractères maximum.`)
    // Retire les caractères de contrôle (hors retours à la ligne et tabulations).
    .transform((v) => v.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, ""));

export const contactSchema = z
  .object({
    type: z.enum(typesProjet, { error: "Choisissez un type de projet." }),
    nom: texte(2, 100, "Indiquez votre nom."),
    email: z.string().trim().max(254, "Adresse trop longue.").pipe(z.email({ error: "Adresse email invalide." })),
    telephone: z
      .string()
      .trim()
      .max(30, "Numéro trop long.")
      .regex(/^[+\d\s().-]*$/, "Numéro invalide.")
      .transform((v) => v || undefined),
    formule: z.union([z.enum(choixFormule), z.literal("").transform(() => undefined)]),
    message: texte(10, 3000, "Décrivez votre projet en quelques mots (10 caractères minimum)."),
  })
  .transform((data) => ({
    ...data,
    // La formule n'a de sens que pour un site vitrine.
    formule: data.type === "vitrine" ? data.formule : undefined,
  }));

export type ContactInput = z.output<typeof contactSchema>;
