import Image from "next/image";
import Link from "next/link";
import type { Modele } from "@/content/modeles";
import { Badge } from "@/components/ui/Badge";

export function ModeleCard({ modele, titleAs: Title = "h3" }: { modele: Modele; titleAs?: "h2" | "h3" }) {
  return (
    <article className="group reveal relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <Image
          src={modele.cover}
          alt={modele.coverAlt}
          placeholder="blur"
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="accent">Modèle de design</Badge>
          <Badge>{modele.secteur}</Badge>
        </div>
        <Title className="mt-3 text-lg font-semibold">
          <Link href={`/modeles/${modele.slug}`} className="after:absolute after:inset-0">
            {modele.nom}
          </Link>
        </Title>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">{modele.description}</p>
      </div>
    </article>
  );
}
