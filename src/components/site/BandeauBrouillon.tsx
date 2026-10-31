/** Signale une page non publiée (visible seulement en local et en preview). */
export function BandeauBrouillon() {
  return (
    <p role="note" className="bg-amber-100 px-4 py-2.5 text-center text-sm font-medium text-amber-950">
      Brouillon : cette page n&apos;est pas publiée. Elle n&apos;apparaît qu&apos;en aperçu et n&apos;est pas indexée.
    </p>
  );
}
