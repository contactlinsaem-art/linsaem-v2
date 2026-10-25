/** Classes d'un contrôle à deux états, sérialisables (passables d'un Server Component à un Client Component). */
export type StateClasses = { base: string; on: string; off: string };

export function cx(c: StateClasses, active: boolean): string {
  return `${c.base} ${active ? c.on : c.off}`;
}
