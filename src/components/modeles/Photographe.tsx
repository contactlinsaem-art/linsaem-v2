import Image, { type StaticImageData } from "next/image";
import portraitStudio from "@/assets/modeles/photographe/portrait-studio.jpg";
import mariageProvence from "@/assets/modeles/photographe/mariage-provence.jpg";
import mode from "@/assets/modeles/photographe/mode.jpg";
import evenement from "@/assets/modeles/photographe/evenement.jpg";
import couple from "@/assets/modeles/photographe/couple.jpg";
import portraitArtistique from "@/assets/modeles/photographe/portrait-artistique.jpg";
import { FilterGrid } from "./shared/FilterGrid";
import { Carousel } from "./shared/Carousel";
import { DemoForm } from "./shared/DemoForm";

const GALERIE: { titre: string; categorie: string; image: StaticImageData }[] = [
  { titre: "Portrait studio", categorie: "Portraits", image: portraitStudio },
  { titre: "Mariage en Provence", categorie: "Mariages", image: mariageProvence },
  { titre: "Séance mode", categorie: "Mode", image: mode },
  { titre: "Soirée d'entreprise", categorie: "Événements", image: evenement },
  { titre: "Couple bohème", categorie: "Mariages", image: couple },
  { titre: "Portrait artistique", categorie: "Portraits", image: portraitArtistique },
];

const CATEGORIES = ["Tous", "Portraits", "Mariages", "Événements", "Mode"].map((c) => ({ value: c, label: c }));

const PRESTATIONS = [
  { titre: "Séance portrait", prix: "150 €", duree: "1 h 30", points: ["10 photos retouchées", "Studio ou extérieur", "Livraison en 7 jours", "Galerie privée en ligne"] },
  { titre: "Mariage", prix: "800 €", duree: "Journée", points: ["400+ photos retouchées", "Cérémonie et soirée", "Album numérique HD", "Livraison en 4 semaines"] },
  { titre: "Événement d'entreprise", prix: "500 €", duree: "Demi-journée", points: ["200+ photos retouchées", "Remise sous 5 jours", "Licence commerciale", "Sélection pour vos réseaux"] },
];

const TEMOIGNAGES = [
  { texte: "Les plus beaux moments de notre mariage, capturés avec justesse. Les photos sont magnifiques.", type: "Mariage" },
  { texte: "Une séance portrait d'une grande bienveillance. Je me suis sentie libre et le résultat est superbe.", type: "Portrait" },
  { texte: "Pour notre événement d'entreprise, les photos reflètent parfaitement l'ambiance de la soirée.", type: "Événement" },
];

const champ = "w-full rounded-xl border border-white/40 bg-white/15 px-4 py-3 text-sm text-white focus:border-white focus:outline-none";

export function Photographe() {
  return (
    <div className="bg-[#0f0f0f] text-white">
      <section className="flex min-h-[85vh] items-center justify-center px-6 text-center">
        <div>
          <h1 className="mb-4 bg-linear-to-br from-[#ec4899] to-[#8b5cf6] bg-clip-text text-7xl font-extrabold text-transparent lg:text-9xl">
            STUDIO LUMEN
          </h1>
          <p className="mb-8 text-xl text-gray-300">Photographe — Portraits et événements — Paris</p>
          <a
            href="#portfolio"
            className="inline-block rounded-full bg-linear-to-br from-[#db2777] to-[#7c3aed] px-8 py-4 text-lg font-bold transition-transform hover:scale-105"
          >
            Voir le portfolio →
          </a>
        </div>
      </section>

      <section id="portfolio" className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-8 text-center text-4xl font-extrabold">Portfolio</h2>
          <FilterGrid
            label="Filtrer le portfolio"
            all="Tous"
            categories={CATEGORIES}
            listClassName="mb-12 flex flex-wrap justify-center gap-3"
            buttonClasses={{
              base: "rounded-full px-5 py-2 text-sm font-semibold transition-colors",
              on: "bg-linear-to-br from-[#db2777] to-[#7c3aed]",
              off: "border border-white/25 bg-white/5 hover:bg-white/10",
            }}
            gridClassName="columns-1 gap-4 md:columns-3 [&>li]:mb-4"
            emptyText="Aucune photo dans cette catégorie."
            items={GALERIE.map((g) => ({
              key: g.titre,
              category: g.categorie,
              node: (
                <figure className="group relative overflow-hidden rounded-xl">
                  <Image
                    src={g.image}
                    alt={g.titre}
                    placeholder="blur"
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="block w-full transition-transform duration-500 group-hover:scale-105"
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/80 to-transparent p-4">
                    <span className="block font-bold">{g.titre}</span>
                    <span className="text-sm text-pink-300">{g.categorie}</span>
                  </figcaption>
                </figure>
              ),
            }))}
          />
        </div>
      </section>

      <section className="bg-[#111111] px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-14 text-center text-4xl font-extrabold">Prestations et tarifs</h2>
          <ul className="grid gap-6 md:grid-cols-3">
            {PRESTATIONS.map((s) => (
              <li key={s.titre} className="reveal rounded-2xl border border-white/10 bg-white/5 p-8">
                <h3 className="mb-1 text-xl font-bold">{s.titre}</h3>
                <p className="mb-1 text-3xl font-extrabold text-[#f472b6]">{s.prix}</p>
                <p className="mb-6 text-sm text-gray-300">{s.duree}</p>
                <ul className="space-y-2">
                  {s.points.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-200">
                      <span aria-hidden="true" className="text-[#a78bfa]">
                        ✓
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-linear-to-br from-[#be185d] to-[#6d28d9] px-6 py-20">
        <div className="mx-auto max-w-xl">
          <h2 className="mb-10 text-center text-4xl font-extrabold">Réserver une séance</h2>
          <div className="rounded-2xl bg-white/15 p-8 backdrop-blur">
            <DemoForm
              submitLabel="Envoyer ma demande →"
              submitClassName="rounded-xl bg-white py-4 font-bold text-[#be185d] opacity-90"
              noteClassName="text-white"
            >
              <div>
                <label htmlFor="photo-nom" className="mb-1 block text-sm font-semibold">Votre nom</label>
                <input id="photo-nom" type="text" autoComplete="name" className={champ} />
              </div>
              <div>
                <label htmlFor="photo-email" className="mb-1 block text-sm font-semibold">Email</label>
                <input id="photo-email" type="email" autoComplete="email" className={champ} />
              </div>
              <div>
                <label htmlFor="photo-date" className="mb-1 block text-sm font-semibold">Date souhaitée</label>
                <input id="photo-date" type="date" className={champ} />
              </div>
              <div>
                <label htmlFor="photo-type" className="mb-1 block text-sm font-semibold">Type de séance</label>
                <select id="photo-type" className={`${champ} [&>option]:text-gray-900`}>
                  <option value="">Sélectionnez…</option>
                  <option>Portrait</option>
                  <option>Mariage</option>
                  <option>Événement d&apos;entreprise</option>
                  <option>Mode</option>
                </select>
              </div>
            </DemoForm>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 text-center">
        <h2 className="mb-14 text-4xl font-extrabold">Ce qu&apos;en disent les clients</h2>
        <div className="mx-auto max-w-2xl">
          <Carousel
            label="Avis clients"
            controlClassName="grid size-10 shrink-0 place-items-center rounded-full border border-white/25 text-xl hover:bg-white/10"
            dotClasses={{ base: "h-2 rounded-full transition-all", on: "w-5 bg-[#ec4899]", off: "w-2 bg-white/30" }}
            slides={TEMOIGNAGES.map((t) => (
              <figure key={t.type}>
                <p aria-hidden="true" className="mb-6 text-4xl text-[#ec4899]">
                  ❝
                </p>
                <blockquote className="mb-6 text-xl leading-relaxed text-gray-200 italic">{t.texte}</blockquote>
                <figcaption className="text-sm text-pink-300">{t.type}</figcaption>
              </figure>
            ))}
          />
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-10 text-center">
        <p className="mb-3 bg-linear-to-br from-[#ec4899] to-[#8b5cf6] bg-clip-text text-2xl font-extrabold text-transparent">
          STUDIO LUMEN
        </p>
        <p className="text-sm text-gray-300">contact@studio-lumen.example • Paris, France</p>
        <p className="mt-4 text-xs text-gray-400">© Studio Lumen — entreprise fictive</p>
      </footer>
    </div>
  );
}
