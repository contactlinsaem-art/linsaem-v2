import type { ReactNode } from "react";

/**
 * Formulaire de démonstration : il illustre la mise en page mais n'envoie rien.
 * Le bouton est désactivé et une mention l'indique clairement.
 */
export function DemoForm({ children, submitLabel, submitClassName, noteClassName = "" }: {
  children: ReactNode;
  submitLabel: string;
  submitClassName: string;
  noteClassName?: string;
}) {
  return (
    <form aria-label="Formulaire de démonstration (inactif)">
      <div className="space-y-5">{children}</div>
      <button type="submit" disabled className={`mt-6 w-full cursor-not-allowed ${submitClassName}`}>
        {submitLabel}
      </button>
      <p className={`mt-3 text-center text-sm ${noteClassName}`}>Formulaire de démonstration : aucun envoi n&apos;est effectué.</p>
    </form>
  );
}
