import Image, { type StaticImageData } from "next/image";
import hero from "@/assets/modeles/covers/vitrine.jpg";
import robeLucie from "@/assets/modeles/vitrine/robe-lucie.jpg";
import chemiseLea from "@/assets/modeles/vitrine/chemise-lea.jpg";
import pantalonIris from "@/assets/modeles/vitrine/pantalon-iris.jpg";
import robeCeleste from "@/assets/modeles/vitrine/robe-celeste.jpg";
import foulardBrume from "@/assets/modeles/vitrine/foulard-brume.jpg";
import hautNuage from "@/assets/modeles/vitrine/haut-nuage.jpg";
import robeAlba from "@/assets/modeles/vitrine/robe-alba.jpg";
import sacMiel from "@/assets/modeles/vitrine/sac-miel.jpg";
import lookBoheme from "@/assets/modeles/vitrine/look-boheme.jpg";
import lookElegance from "@/assets/modeles/vitrine/look-elegance.jpg";
import lookLumiere from "@/assets/modeles/vitrine/look-lumiere.jpg";
import atelier from "@/assets/modeles/vitrine/atelier.jpg";
import { FilterGrid } from "./shared/FilterGrid";
import { Carousel } from "./shared/Carousel";
import { DemoForm } from "./shared/DemoForm";

const COLLECTION: { nom: string; prix: string; categorie: string; image: StaticImageData }[] = [
  { nom: "Robe Lucie", prix: "185 €", categorie: "robes", image: robeLucie },
  { nom: "Chemise Léa", prix: "95 €", categorie: "hauts", image: chemiseLea },
  { nom: "Pantalon Iris", prix: "145 €", categorie: "pantalons", image: pantalonIris },
  { nom: "Robe Céleste", prix: "220 €", categorie: "robes", image: robeCeleste },
  { nom: "Foulard Brume", prix: "65 €", categorie: "accessoires", image: foulardBrume },
  { nom: "Haut Nuage", prix: "110 €", categorie: "hauts", image: hautNuage },
  { nom: "Robe Alba", prix: "195 €", categorie: "robes", image: robeAlba },
  { nom: "Sac Miel", prix: "175 €", categorie: "accessoires", image: sacMiel },
];

const FILTRES = [
  { value: "tout", label: "Tout" },
  { value: "robes", label: "Robes" },
  { value: "hauts", label: "Hauts" },
  { value: "pantalons", label: "Pantalons" },
  { value: "accessoires", label: "Accessoires" },
];

const LOOKS = [
  { numero: "01", titre: "Bohème parisienne", pieces: [["Robe Lucie", "185 €"], ["Foulard Brume", "65 €"]], image: lookBoheme },
  { numero: "02", titre: "Élégance naturelle", pieces: [["Chemise Léa", "95 €"], ["Pantalon Iris", "145 €"]], image: lookElegance },
  { numero: "03", titre: "Lumière du soir", pieces: [["Robe Céleste", "220 €"], ["Sac Miel", "175 €"]], image: lookLumiere },
];

const TEMOIGNAGES = [
  { texte: "Une qualité exceptionnelle, les matières sont divines. Je ne commande plus qu'ici.", lieu: "Paris" },
  { texte: "Le style bohème que je cherchais depuis des années. Chaque pièce est une œuvre.", lieu: "Lyon" },
  { texte: "Service impeccable, livraison rapide. La robe Alba est sublime.", lieu: "Bordeaux" },
];

const or = "#c9a84c";
const gris = "text-[#5f5f5f]";
const lien = "text-xs tracking-[0.12em] uppercase text-[#5f5f5f] hover:text-[#2d2d2d]";
const champ = "w-full border-0 border-b border-[#bdbdbd] bg-transparent py-2 text-[15px] text-[#2d2d2d] focus:border-[#c9a84c] focus:outline-none";
const libelle = "block text-[11px] font-semibold tracking-[0.08em] uppercase text-[#5f5f5f]";

export function Vitrine() {
  return (
    <div className="text-[#2d2d2d]">
      <nav
        aria-label="Navigation du modèle"
        className="nav-on-scroll sticky top-0 z-30 flex items-center justify-between px-6 py-5 backdrop-blur-sm sm:px-12 [--nav-bg:rgba(250,250,250,0.95)]"
      >
        <ul className="hidden gap-8 sm:flex">
          <li><a href="#collection" className={lien}>Collection</a></li>
          <li><a href="#lookbook" className={lien}>Lookbook</a></li>
          <li><a href="#histoire" className={lien}>À propos</a></li>
        </ul>
        <span className="font-serif text-xl tracking-[0.3em] uppercase">Céleste</span>
        <a href="#contact-celeste" className={lien}>Contact</a>
      </nav>

      {/* Hero */}
      <section className="flex min-h-[90vh] flex-col items-center gap-10 bg-[#f0ede8] px-6 py-16 lg:flex-row lg:px-12">
        <div className="relative h-[60vh] w-full overflow-hidden rounded lg:h-[80vh] lg:w-[58%]">
          <Image src={hero} alt="Vêtements aux tons naturels suspendus à une branche" fill priority placeholder="blur" sizes="(min-width: 1024px) 58vw, 100vw" className="object-cover" />
        </div>
        <div className="flex flex-1 flex-col gap-5 lg:px-10">
          <p className="text-[11px] tracking-[0.3em] uppercase text-[#5f5f5f]">Nouvelle collection</p>
          <div aria-hidden="true" className="grow-x h-px w-10" style={{ background: or }} />
          <h1 className="font-serif text-5xl leading-tight font-normal lg:text-6xl">
            L&apos;art du
            <br />
            <em>mouvement</em>
          </h1>
          <p className={`max-w-xs leading-loose ${gris}`}>
            Des pièces pensées pour la femme libre. Matières naturelles, coupes intemporelles, éditions limitées.
          </p>
          <a
            href="#collection"
            className="self-start border border-[#2d2d2d] bg-[#2d2d2d] px-8 py-3.5 text-xs font-medium tracking-[0.1em] text-[#fafafa] uppercase transition-colors hover:bg-transparent hover:text-[#2d2d2d]"
          >
            Découvrir la collection
          </a>
        </div>
      </section>

      <div aria-hidden="true" className="overflow-hidden bg-[#2d2d2d] py-7">
        <div className="marquee">
          {[0, 1].map((i) => (
            <span key={i} className="font-serif text-lg tracking-[0.15em] whitespace-nowrap text-[#fafafa] italic">
              NOUVELLE COLLECTION &nbsp;•&nbsp; BOHÈME CHIC &nbsp;•&nbsp; FAIT EN FRANCE &nbsp;•&nbsp; ÉDITION LIMITÉE &nbsp;•&nbsp;
              CÉLESTE &nbsp;•&nbsp; AUTOMNE — HIVER &nbsp;•&nbsp;&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* Collection */}
      <section id="collection" className="bg-[#f0ede8] px-6 py-24 sm:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="reveal mb-14 text-center">
            <h2 className="mb-2 font-serif text-4xl font-normal lg:text-5xl">La collection</h2>
            <p className={`text-sm tracking-[0.1em] italic ${gris}`}>Automne — Hiver</p>
          </div>
          <FilterGrid
            label="Filtrer la collection"
            all="tout"
            categories={FILTRES}
            listClassName="mb-12 flex flex-wrap justify-center gap-x-9 gap-y-3"
            buttonClasses={{
              base: "border-b pb-1 text-[13px] tracking-[0.1em] uppercase transition-colors",
              on: "border-[#c9a84c] font-semibold text-[#2d2d2d]",
              off: "border-transparent text-[#5f5f5f] hover:text-[#2d2d2d]",
            }}
            gridClassName="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>li]:mb-4"
            emptyText="Aucun article dans cette catégorie."
            items={COLLECTION.map((p) => ({
              key: p.nom,
              category: p.categorie,
              node: (
                <figure className="group relative overflow-hidden rounded-sm">
                  <Image
                    src={p.image}
                    alt={p.nom}
                    placeholder="blur"
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="block w-full transition-transform duration-700 group-hover:scale-105"
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 to-transparent p-6 text-[#fafafa]">
                    <span className="block font-serif">{p.nom}</span>
                    <span className="text-sm">{p.prix}</span>
                  </figcaption>
                </figure>
              ),
            }))}
          />
        </div>
      </section>

      {/* Lookbook */}
      <section id="lookbook" className="bg-[#fafafa] px-6 py-24 sm:px-12">
        <div className="mx-auto max-w-5xl">
          <div className="reveal mb-14">
            <h2 className="mb-2 font-serif text-5xl font-normal italic">Lookbook</h2>
            <p className={`italic ${gris}`}>Une histoire de légèreté</p>
          </div>
          <Carousel
            label="Lookbook"
            controlClassName="grid size-11 shrink-0 place-items-center text-2xl text-[#2d2d2d] hover:opacity-70"
            dotClasses={{ base: "h-1.5 rounded-full transition-all", on: "w-6 bg-[#2d2d2d]", off: "w-1.5 bg-[#d4d4d4]" }}
            slides={LOOKS.map((look) => (
              <div key={look.numero} className="flex flex-col items-center gap-8 md:flex-row md:gap-12">
                <div className="relative h-[28rem] w-full max-w-xs shrink-0 overflow-hidden rounded-sm">
                  <Image src={look.image} alt={`Look ${look.numero} : ${look.titre}`} fill placeholder="blur" sizes="320px" className="object-cover" />
                  <span aria-hidden="true" className="absolute right-4 bottom-4 font-serif text-7xl font-bold text-white/30">
                    {look.numero}
                  </span>
                </div>
                <div className="flex flex-col gap-5">
                  <p className="text-[11px] tracking-[0.2em] uppercase" style={{ color: "#8a6d2b" }}>
                    Look {look.numero}
                  </p>
                  <h3 className="font-serif text-3xl font-normal italic">{look.titre}</h3>
                  <ul>
                    {look.pieces.map(([nom, prix]) => (
                      <li key={nom} className="mb-2.5 flex justify-between gap-12 text-sm">
                        <span className="font-serif">{nom}</span>
                        <span className={gris}>{prix}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          />
        </div>
      </section>

      {/* Histoire */}
      <section id="histoire" className="bg-[#2d2d2d] px-6 py-24 sm:px-12">
        <div className="mx-auto grid max-w-5xl items-center gap-16 md:grid-cols-[2fr_3fr]">
          <div className="relative h-[30rem] -rotate-2 overflow-hidden rounded-sm transition-transform duration-500 hover:rotate-0">
            <Image src={atelier} alt="L'atelier Céleste" fill placeholder="blur" sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
          </div>
          <div className="flex flex-col gap-6">
            <p className="text-[11px] font-medium tracking-[0.25em] uppercase" style={{ color: or }}>Notre histoire</p>
            <h2 className="font-serif text-4xl leading-snug font-normal text-[#fafafa]">
              Née d&apos;une passion
              <br />
              pour la liberté
            </h2>
            <p className="max-w-md leading-loose text-[#fafafa]/85">
              Céleste est née d&apos;une vision simple : créer des vêtements qui racontent une histoire. Chaque pièce est
              pensée pour la femme moderne, libre et élégante.
            </p>
            <ul className="flex flex-col gap-3.5 text-[#fafafa]">
              {["Fait en France", "Matières naturelles", "Éditions limitées"].map((v) => (
                <li key={v} className="flex items-center gap-3">
                  <span aria-hidden="true" className="text-xs" style={{ color: or }}>✦</span>
                  {v}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Avis */}
      <section className="bg-[#f0ede8] px-6 py-24 sm:px-12">
        <div className="mx-auto max-w-5xl">
          <h2 className="reveal mb-16 text-center font-serif text-4xl font-normal italic">Elles en parlent</h2>
          <ul className="grid gap-7 md:grid-cols-3">
            {TEMOIGNAGES.map((t) => (
              <li key={t.lieu} className="reveal border border-t-2 border-[#e8e8e8] border-t-[#c9a84c] bg-[#fafafa] px-8 py-9 shadow-sm">
                <p aria-label="5 étoiles sur 5" className="mb-5 text-sm tracking-widest" style={{ color: "#8a6d2b" }}>
                  ★★★★★
                </p>
                <blockquote className="mb-6 font-serif text-[15px] leading-relaxed text-[#4a4a4a] italic">« {t.texte} »</blockquote>
                <p className={`text-[11px] tracking-[0.15em] uppercase ${gris}`}>Cliente — {t.lieu}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Contact */}
      <section id="contact-celeste" className="bg-[#fafafa] px-6 py-24 sm:px-12">
        <div className="mx-auto grid max-w-5xl gap-16 md:grid-cols-2">
          <div className="flex flex-col gap-7">
            <div>
              <h2 className="mb-2 font-serif text-4xl font-normal">Nous écrire</h2>
              <p className={`italic ${gris}`}>Réponse sous 24 h, du lundi au samedi.</p>
            </div>
            <address className="flex flex-col gap-3.5 not-italic">
              {["contact@celeste.example", "01 99 00 34 56", "12 rue du Faubourg, 75008 Paris", "Mar – Sam 10h – 19h"].map((v) => (
                <p key={v} className="flex gap-3">
                  <span aria-hidden="true" className="text-xs" style={{ color: or }}>✦</span>
                  <span className="text-[#4a4a4a]">{v}</span>
                </p>
              ))}
            </address>
          </div>
          <DemoForm
            submitLabel="Envoyer le message"
            submitClassName="bg-[#2d2d2d] py-4 text-xs font-semibold tracking-[0.12em] text-[#fafafa] uppercase opacity-90"
            noteClassName={gris}
          >
            <div>
              <label htmlFor="celeste-nom" className={libelle}>Nom</label>
              <input id="celeste-nom" type="text" autoComplete="name" className={champ} />
            </div>
            <div>
              <label htmlFor="celeste-email" className={libelle}>Email</label>
              <input id="celeste-email" type="email" autoComplete="email" className={champ} />
            </div>
            <div>
              <label htmlFor="celeste-sujet" className={libelle}>Sujet</label>
              <select id="celeste-sujet" className={champ}>
                <option value="">Choisir un sujet</option>
                <option>Commande</option>
                <option>Retour / échange</option>
                <option>Partenariat</option>
                <option>Autre</option>
              </select>
            </div>
            <div>
              <label htmlFor="celeste-message" className={libelle}>Message</label>
              <textarea id="celeste-message" rows={4} className={`${champ} resize-none`} />
            </div>
          </DemoForm>
        </div>
      </section>

      <footer className="relative overflow-hidden bg-[#2d2d2d] px-6 pt-16 pb-10 text-center">
        <p aria-hidden="true" className="pointer-events-none absolute -bottom-3 left-1/2 -translate-x-1/2 font-serif text-[clamp(60px,10vw,120px)] tracking-[0.2em] whitespace-nowrap text-white/5 uppercase select-none">
          Céleste
        </p>
        <div className="relative flex flex-col items-center gap-8">
          <ul className="flex flex-wrap justify-center gap-9">
            {[["#collection", "Collection"], ["#lookbook", "Lookbook"], ["#histoire", "À propos"], ["#contact-celeste", "Contact"]].map(([href, label]) => (
              <li key={href}>
                <a href={href} className="text-xs tracking-[0.12em] text-[#fafafa]/75 uppercase hover:text-[#fafafa]">
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <div aria-hidden="true" className="h-px w-30 opacity-50" style={{ background: or }} />
          <p className="text-xs leading-loose text-[#fafafa]/70">
            © Céleste — entreprise fictive
            <br />
            Modèle de design créé par LINSAEM
          </p>
        </div>
      </footer>
    </div>
  );
}
