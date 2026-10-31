/**
 * Les brouillons (pages métiers, articles avec publie: false) sont générés en local et sur les previews
 * Vercel pour relecture, avec un bandeau et en noindex. Ils ne sont jamais générés en production.
 */
export const afficherBrouillons = process.env.VERCEL_ENV !== "production";

export function estVisible(contenu: { publie: boolean }): boolean {
  return contenu.publie || afficherBrouillons;
}
