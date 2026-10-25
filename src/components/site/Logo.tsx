import Link from "next/link";

export function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  return (
    <Link href="/" className="inline-flex items-center gap-2.5 rounded-lg font-bold tracking-wide">
      <span
        aria-hidden="true"
        className="bg-brand-gradient grid size-9 place-items-center rounded-xl text-lg font-extrabold text-white"
      >
        L
      </span>
      <span className={tone === "light" ? "text-white" : "text-slate-900"}>LINSAEM</span>
      <span className="sr-only">— accueil</span>
    </Link>
  );
}
