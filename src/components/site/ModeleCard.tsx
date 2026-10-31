import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Modele } from "@/content/modeles";
import { Badge } from "@/components/ui/Badge";
import { BrowserFrame } from "./BrowserFrame";

export function ModeleCard({ modele, titleAs: Title = "h3" }: { modele: Modele; titleAs?: "h2" | "h3" }) {
  const capture = modele.coverAlt === "";
  return (
    <article className="group reveal relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-shadow hover:shadow-xl hover:shadow-slate-900/5">
      {capture ? (
        <div className="bg-slate-100 p-4 pb-0 sm:p-5 sm:pb-0">
          <BrowserFrame className="rounded-b-none">
            <Image
              src={modele.cover}
              alt=""
              placeholder="blur"
              sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
              className="aspect-[16/10] w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
            />
          </BrowserFrame>
        </div>
      ) : (
        <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
          <Image
            src={modele.cover}
            alt={modele.coverAlt}
            placeholder="blur"
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge>{modele.secteur}</Badge>
          {modele.palette && (
            <span className="ml-auto flex -space-x-1" aria-hidden="true">
              {modele.palette.map((c) => (
                <span key={c} className="size-5 rounded-full ring-2 ring-white" style={{ backgroundColor: c }} />
              ))}
            </span>
          )}
        </div>
        <Title className="mt-3 text-lg font-semibold">
          <Link href={`/modeles/${modele.slug}`} className="after:absolute after:inset-0">
            {modele.nom}
          </Link>
        </Title>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{modele.description}</p>
        <div className="mt-5 flex items-center justify-between gap-3 text-sm">
          {modele.typographies ? <span className="text-slate-600">{modele.typographies}</span> : <span />}
          <span aria-hidden="true" className="inline-flex items-center gap-1 font-semibold text-accent">
            Voir <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </article>
  );
}
