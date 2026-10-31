import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { libelleType, type Realisation } from "@/content/realisations";
import { Badge } from "@/components/ui/Badge";
import { BrowserFrame } from "./BrowserFrame";

export function RealisationCard({ realisation, titleAs: Title = "h3" }: { realisation: Realisation; titleAs?: "h2" | "h3" }) {
  const domaine = new URL(realisation.url).hostname;
  return (
    <article className="group reveal relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-shadow hover:shadow-xl hover:shadow-slate-900/5">
      <div className="bg-slate-100 p-4 pb-0 sm:p-6 sm:pb-0">
        <BrowserFrame domaine={domaine} className="rounded-b-none">
          <Image
            src={realisation.apercu}
            alt=""
            placeholder="blur"
            sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 90vw"
            className="aspect-[16/10] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </BrowserFrame>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone={realisation.type === "application" ? "dark" : "accent"}>{libelleType[realisation.type]}</Badge>
          <Badge>{realisation.secteur}</Badge>
        </div>
        <Title className="mt-4 text-xl font-semibold">
          <Link href={`/realisations/${realisation.slug}`} className="after:absolute after:inset-0">
            {realisation.nom}
          </Link>
        </Title>
        <p className="mt-3 flex-1 leading-relaxed text-slate-700">{realisation.description}</p>
        <p aria-hidden="true" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
          Voir la réalisation <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </p>
      </div>
    </article>
  );
}
