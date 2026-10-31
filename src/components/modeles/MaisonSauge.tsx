import Image, { type StaticImageData } from "next/image";
import { Cormorant } from "next/font/google";
import { ArrowRight, MapPin } from "lucide-react";
import { FilterGrid } from "./shared/FilterGrid";
import { DemoForm } from "./shared/DemoForm";
import { Counter } from "./shared/Counter";
import atelier from "@/assets/modeles/vitrine/atelier.jpg";
import portants from "@/assets/modeles/maison-sauge/portants.jpg";
import boutique from "@/assets/modeles/maison-sauge/boutique.jpg";
import chemise from "@/assets/modeles/vitrine/chemise-lea.jpg";
import blouseBrodee from "@/assets/modeles/vitrine/haut-nuage.jpg";
import manteauCarreaux from "@/assets/modeles/vitrine/look-elegance.jpg";
import blousePois from "@/assets/modeles/vitrine/look-lumiere.jpg";
import pantalonRaye from "@/assets/modeles/vitrine/pantalon-iris.jpg";
import combinaison from "@/assets/modeles/vitrine/robe-alba.jpg";
import manteauBordeaux from "@/assets/modeles/vitrine/look-boheme.jpg";
import ensemble from "@/assets/modeles/vitrine/robe-lucie.jpg";

const display = Cormorant({ subsets: ["latin"], weight: "500", style: ["normal", "italic"], variable: "--sauge-display" });

const serif = "[font-family:var(--sauge-display)]";

type Piece = { nom: string; matiere: string; prix: string; categorie: string; image: StaticImageData; alt: string };

const PIECES: Piece[] = [
  { nom: "Chemise Léa", matiere: "Chambray de coton", prix: "89 €", categorie: "hauts", image: chemise, alt: "Chemise en chambray bleu à petits pois blancs, sur cintre" },
  { nom: "Manteau Odon", matiere: "Laine à carreaux", prix: "245 €", categorie: "manteaux", image: manteauCarreaux, alt: "Manteau long à carreaux bleu marine porté dans la rue" },
  { nom: "Blouse Nuage", matiere: "Coton brodé", prix: "79 €", categorie: "hauts", image: blouseBrodee, alt: "Chemisier blanc brodé de petites fleurs, noué à la taille" },
  { nom: "Combinaison Alba", matiere: "Satin fluide", prix: "159 €", categorie: "combinaisons", image: combinaison, alt: "Combinaison bleu canard à col croisé et ceinture" },
  { nom: "Pantalon Iris", matiere: "Viscose rayée", prix: "95 €", categorie: "bas", image: pantalonRaye, alt: "Pantalon large à rayures noires et blanches devant un mur turquoise" },
  { nom: "Blouse Aube", matiere: "Voile à pois", prix: "85 €", categorie: "hauts", image: blousePois, alt: "Blouse rose pâle à volants et pois noirs, épaules dénudées" },
  { nom: "Manteau Grenat", matiere: "Drap de laine", prix: "265 €", categorie: "manteaux", image: manteauBordeaux, alt: "Manteau bordeaux porté avec des lunettes de soleil et des sacs de courses" },
  { nom: "Ensemble Soleil", matiere: "Molleton de coton", prix: "119 €", categorie: "bas", image: ensemble, alt: "Ensemble jaune moutarde en molleton, devant un panier de basket" },
];

const CATEGORIES = [
  { value: "tout", label: "Tout" },
  { value: "hauts", label: "Hauts" },
  { value: "bas", label: "Bas" },
  { value: "manteaux", label: "Manteaux" },
  { value: "combinaisons", label: "Combinaisons" },
];

const champ =
  "w-full border-0 border-b border-[#2a2620]/40 bg-transparent px-0 py-3 text-base placeholder:text-[#6b645a] focus:border-[#5b6b4e] focus:ring-0 focus:outline-none";

export function MaisonSauge() {
  return (
    <div className={`${display.variable} bg-[#f4efe6] text-[#2a2620]`}>
      <header className="border-b border-[#2a2620]/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-5">
          <p className={`${serif} text-2xl font-medium tracking-wide`}>Maison Sauge</p>
          <nav aria-label="Menu Maison Sauge" className="hidden gap-8 text-sm tracking-[0.15em] uppercase md:flex">
            <a href="#collection" className="hover:text-[#5b6b4e]">Collection</a>
            <a href="#atelier" className="hover:text-[#5b6b4e]">L&apos;atelier</a>
            <a href="#boutique" className="hover:text-[#5b6b4e]">Boutique</a>
          </nav>
          <a href="#boutique" className="text-sm underline underline-offset-4 md:hidden">
            Nous trouver
          </a>
        </div>
      </header>

      {/* Hero éditorial */}
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 pt-14 pb-20 lg:grid-cols-[1.05fr_1fr] lg:pt-20 lg:pb-28">
        <div>
          <p className="fade-up text-xs tracking-[0.3em] text-[#5b6b4e] uppercase">Collection automne — hiver</p>
          <h1 className={`fade-up ${serif} mt-6 text-6xl leading-[0.95] font-medium [animation-delay:100ms] sm:text-7xl lg:text-8xl`}>
            Des pièces qui durent <em className="text-[#5b6b4e]">plus qu&apos;une saison</em>
          </h1>
          <p className="fade-up mt-8 max-w-md text-lg leading-relaxed text-[#4a443b] [animation-delay:200ms]">
            Vêtements en matières naturelles, dessinés à Lyon et cousus dans trois ateliers français.
          </p>
          <div className="fade-up mt-10 flex flex-wrap items-center gap-6 [animation-delay:300ms]">
            <a
              href="#collection"
              className="inline-flex items-center gap-3 bg-[#2a2620] px-8 py-4 text-sm tracking-[0.15em] text-[#f4efe6] uppercase transition-colors hover:bg-[#5b6b4e]"
            >
              Découvrir la collection <ArrowRight aria-hidden="true" size={16} />
            </a>
            <a href="#atelier" className="text-sm tracking-[0.15em] uppercase underline underline-offset-8">
              L&apos;atelier
            </a>
          </div>
        </div>
        <div className="relative">
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src={atelier}
              alt="Pulls et gilets en maille aux tons naturels sur un portant, à côté de tiges d'herbes séchées"
              fill
              priority
              fetchPriority="high"
              placeholder="blur"
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="slow-zoom object-cover"
            />
          </div>
          <div className="absolute -bottom-10 -left-6 hidden aspect-square w-44 overflow-hidden border-8 border-[#f4efe6] sm:block lg:-left-16 lg:w-56">
            <Image src={portants} alt="" fill placeholder="blur" sizes="224px" className="object-cover" />
          </div>
        </div>
      </section>

      <div aria-hidden="true" className="overflow-hidden border-y border-[#2a2620]/10 py-4">
        <div className="marquee">
          {[0, 1].map((i) => (
            <span key={i} className={`${serif} px-6 text-2xl whitespace-nowrap italic`}>
              Lin lavé · Laine recyclée · Coton biologique · Cousu en France · Retouches offertes ·&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* Collection */}
      <section id="collection" className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <h2 className={`${serif} text-5xl font-medium sm:text-6xl`}>La collection</h2>
          <p className="max-w-sm text-[#4a443b]">Huit pièces, pensées pour se porter ensemble et se garder longtemps.</p>
        </div>
        <FilterGrid
          label="Filtrer la collection"
          all="tout"
          categories={CATEGORIES}
          listClassName="mb-10 flex flex-wrap gap-2"
          buttonClasses={{
            base: "rounded-full border px-5 py-2 text-sm transition-colors",
            on: "border-[#2a2620] bg-[#2a2620] text-[#f4efe6]",
            off: "border-[#2a2620]/30 hover:border-[#2a2620]",
          }}
          gridClassName="grid grid-cols-2 gap-x-5 gap-y-12 lg:grid-cols-4"
          items={PIECES.map((p) => ({
            key: p.nom,
            category: p.categorie,
            node: (
              <article className="group">
                <div className="relative aspect-[3/4] overflow-hidden bg-[#e6dfd2]">
                  <Image
                    src={p.image}
                    alt={p.alt}
                    fill
                    placeholder="blur"
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="mt-4 flex items-baseline justify-between gap-3">
                  <h3 className={`${serif} text-2xl font-medium`}>{p.nom}</h3>
                  <p className="text-sm">{p.prix}</p>
                </div>
                <p className="mt-1 text-sm text-[#5f584e]">{p.matiere}</p>
              </article>
            ),
          }))}
        />
      </section>

      {/* L'atelier */}
      <section id="atelier" className="bg-[#5b6b4e] text-[#f4efe6]">
        <div className="mx-auto grid max-w-7xl lg:grid-cols-2">
          <div className="relative min-h-[26rem]">
            <Image
              src={boutique}
              alt="Portants de vêtements aux tons beiges et bruns devant la vitrine de la boutique"
              fill
              placeholder="blur"
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="px-6 py-20 sm:px-14 lg:py-28">
            <p className="text-xs tracking-[0.3em] uppercase">L&apos;atelier</p>
            <h2 className={`${serif} mt-6 text-5xl leading-tight font-medium`}>Moins de pièces, mieux faites</h2>
            <p className="mt-6 text-lg leading-relaxed">
              Chaque modèle est dessiné à Lyon, prototypé avec nos couturières, puis produit en petites séries. Pas de
              soldes permanentes ni de nouveautés chaque semaine : deux collections par an, et des retouches offertes à vie.
            </p>
            <dl className="mt-12 grid grid-cols-2 gap-8 border-t border-[#f4efe6]/30 pt-10">
              <div className="flex flex-col">
                <dt className="text-sm">Matières naturelles ou recyclées</dt>
                <dd className={`${serif} order-first text-6xl`}>
                  <Counter value={92} suffix=" %" />
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="text-sm">Ateliers partenaires en France</dt>
                <dd className={`${serif} order-first text-6xl`}>
                  <Counter value={3} />
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Boutique */}
      <section id="boutique" className="mx-auto grid max-w-7xl gap-16 px-6 py-24 lg:grid-cols-2">
        <div>
          <h2 className={`${serif} text-5xl font-medium`}>La boutique</h2>
          <p className="mt-6 flex items-start gap-3 text-lg">
            <MapPin aria-hidden="true" className="mt-1 shrink-0 text-[#5b6b4e]" size={20} />
            Rue des Remparts, Lyon 2e
          </p>
          <table className="mt-8 w-full max-w-sm text-left">
            <caption className="sr-only">Horaires de la boutique</caption>
            <tbody>
              {[
                ["Mardi — vendredi", "11h — 19h"],
                ["Samedi", "10h — 19h30"],
                ["Dimanche, lundi", "Fermé"],
              ].map(([jours, heures]) => (
                <tr key={jours} className="border-b border-[#2a2620]/15">
                  <th scope="row" className="py-3 font-normal">{jours}</th>
                  <td className="py-3 text-right">{heures}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-8 max-w-md leading-relaxed text-[#4a443b]">
            Essayages sur rendez-vous le samedi matin, avec conseils de taille et retouches sur place.
          </p>
        </div>
        <div className="bg-[#ebe4d6] p-8 sm:p-12">
          <h3 className={`${serif} text-3xl font-medium`}>La lettre de l&apos;atelier</h3>
          <p className="mt-3 text-[#4a443b]">Une lettre par saison : les nouvelles pièces et les coulisses de leur fabrication.</p>
          <div className="mt-8">
            <DemoForm
              submitLabel="Je m'inscris"
              submitClassName="bg-[#2a2620] px-8 py-4 text-sm tracking-[0.15em] text-[#f4efe6] uppercase"
              noteClassName="text-[#5f584e]"
            >
              <div>
                <label htmlFor="sauge-email" className="text-sm">
                  Adresse email
                </label>
                <input id="sauge-email" type="email" autoComplete="email" placeholder="vous@exemple.fr" className={champ} />
              </div>
            </DemoForm>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#2a2620]/10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-8 text-sm text-[#5f584e]">
          <p className={`${serif} text-xl text-[#2a2620]`}>Maison Sauge</p>
          <p>Vêtements dessinés à Lyon · Entreprise fictive</p>
        </div>
      </footer>
    </div>
  );
}
