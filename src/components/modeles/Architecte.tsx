import Image from "next/image";
import villa from "@/assets/modeles/architecte/villa.jpg";
import bureaux from "@/assets/modeles/architecte/bureaux.jpg";
import loft from "@/assets/modeles/architecte/loft.jpg";
import spa from "@/assets/modeles/architecte/spa.jpg";
import { Counter } from "./shared/Counter";
import { DemoForm } from "./shared/DemoForm";

const PROJETS = [
  { titre: "Villa Contemporaine", categorie: "Résidentiel", image: villa },
  { titre: "Tour de Bureaux", categorie: "Commercial", image: bureaux },
  { titre: "Loft Haussmannien", categorie: "Rénovation", image: loft },
  { titre: "Spa de Luxe", categorie: "Intérieur", image: spa },
];

const EQUIPE = [
  { role: "Architecte principal·e", initiales: "AP" },
  { role: "Architecte d'intérieur", initiales: "AI" },
  { role: "Chef·fe de projet", initiales: "CP" },
];

const NAV = [
  { href: "#projets", label: "Projets" },
  { href: "#philosophie", label: "Philosophie" },
  { href: "#equipe", label: "Équipe" },
  { href: "#contact-archi", label: "Contact" },
];

const champ = "w-full border-b border-gray-700 bg-transparent pb-2 text-sm text-white focus:border-[#c9a84c] focus:outline-none";
const libelle = "mb-2 block text-xs tracking-widest text-gray-300 uppercase";

export function Architecte() {
  return (
    <div className="bg-[#0a0a0a] text-white">
      <nav
        aria-label="Navigation du modèle"
        className="nav-on-scroll sticky top-0 z-30 flex items-center justify-between px-6 py-4 backdrop-blur-sm sm:px-8 [--nav-bg:rgba(10,10,10,0.95)]"
      >
        <span className="text-sm font-extrabold tracking-[0.25em] text-[#c9a84c]">ATELIER HORIZON</span>
        <ul className="hidden gap-8 text-xs tracking-widest text-gray-300 uppercase md:flex">
          {NAV.map((n) => (
            <li key={n.href}>
              <a href={n.href} className="hover:text-white">
                {n.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <section className="flex min-h-[85vh] items-center justify-center px-6 text-center">
        <div className="max-w-4xl">
          <h1 className="mb-8 text-5xl leading-tight font-extrabold tracking-[0.04em] uppercase lg:text-8xl">
            Nous créons
            <br />
            des espaces
            <br />
            <span className="text-[#c9a84c]">qui durent</span>
          </h1>
          <div aria-hidden="true" className="grow-x mx-auto mb-8 h-0.5 w-20 bg-[#c9a84c]" />
          <p className="mx-auto mb-10 max-w-xl text-xl text-gray-300">
            Cabinet d&apos;architecture haut de gamme. Résidentiel, commercial, rénovation.
          </p>
          <a
            href="#projets"
            className="inline-block border border-white px-8 py-4 text-sm font-bold tracking-widest transition-colors hover:bg-white hover:text-black"
          >
            DÉCOUVRIR NOS PROJETS →
          </a>
        </div>
      </section>

      <section aria-label="Chiffres clés" className="bg-[#111111] px-6 py-20">
        <dl className="mx-auto grid max-w-3xl grid-cols-3 gap-6 text-center sm:gap-12">
          {[
            { value: 120, suffix: "+", label: "Projets réalisés" },
            { value: 15, suffix: "", label: "Ans d'expertise" },
            { value: 98, suffix: " %", label: "Satisfaction client" },
          ].map((s) => (
            <div key={s.label} className="flex flex-col-reverse">
              <dt className="text-xs tracking-widest text-gray-300 uppercase">{s.label}</dt>
              <dd className="mb-2 text-3xl font-extrabold text-[#c9a84c] sm:text-4xl">
                <Counter value={s.value} suffix={s.suffix} />
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section id="projets" className="px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-14 text-center text-3xl font-extrabold tracking-widest text-[#c9a84c] uppercase">Nos projets</h2>
          <ul className="grid gap-6 md:grid-cols-2">
            {PROJETS.map((p) => (
              <li key={p.titre} className="group reveal relative h-72 overflow-hidden">
                <Image
                  src={p.image}
                  alt={p.titre}
                  fill
                  placeholder="blur"
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/85 to-transparent p-5">
                  <h3 className="text-xl font-extrabold tracking-wider">{p.titre}</h3>
                  <p className="text-xs tracking-widest text-[#c9a84c] uppercase">{p.categorie}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="philosophie" className="bg-white px-6 py-24 text-[#0a0a0a]">
        <div className="mx-auto max-w-3xl text-center">
          <div aria-hidden="true" className="mx-auto mb-10 h-0.5 w-20 bg-[#c9a84c]" />
          <figure>
            <blockquote className="mb-8 font-serif text-3xl leading-relaxed italic">
              « L&apos;architecture est le jeu savant, correct et magnifique des volumes assemblés sous la lumière. »
            </blockquote>
            <figcaption className="text-sm tracking-widest text-gray-600">— LE CORBUSIER</figcaption>
          </figure>
          <div aria-hidden="true" className="mx-auto mt-10 h-0.5 w-20 bg-[#c9a84c]" />
          <p className="mx-auto mt-10 max-w-xl leading-relaxed text-gray-700">
            Chaque projet est une conversation entre la fonctionnalité et la beauté. Nous concevons des espaces qui durent,
            qui inspirent, qui vivent.
          </p>
        </div>
      </section>

      <section id="equipe" className="bg-[#111111] px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-14 text-center text-3xl font-extrabold tracking-widest text-[#c9a84c] uppercase">L&apos;équipe</h2>
          <ul className="grid gap-10 text-center md:grid-cols-3">
            {EQUIPE.map((m) => (
              <li key={m.role}>
                <div
                  aria-hidden="true"
                  className="mx-auto mb-4 flex size-24 items-center justify-center rounded-full bg-[#c9a84c] text-2xl font-extrabold text-[#0a0a0a]"
                >
                  {m.initiales}
                </div>
                <p className="text-xs tracking-widest text-gray-300 uppercase">{m.role}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="contact-archi" className="px-6 py-20">
        <div className="mx-auto max-w-xl">
          <h2 className="mb-12 text-center text-3xl font-extrabold tracking-widest text-[#c9a84c] uppercase">Contact</h2>
          <DemoForm
            submitLabel="ENVOYER →"
            submitClassName="bg-[#c9a84c] py-4 text-sm font-bold tracking-widest text-[#0a0a0a] opacity-80"
            noteClassName="text-gray-300"
          >
            <div>
              <label htmlFor="archi-nom" className={libelle}>Nom</label>
              <input id="archi-nom" type="text" autoComplete="name" className={champ} />
            </div>
            <div>
              <label htmlFor="archi-email" className={libelle}>Email</label>
              <input id="archi-email" type="email" autoComplete="email" className={champ} />
            </div>
            <div>
              <label htmlFor="archi-message" className={libelle}>Votre projet</label>
              <textarea id="archi-message" rows={4} className={`${champ} resize-none`} />
            </div>
          </DemoForm>
        </div>
      </section>

      <footer className="border-t border-[#c9a84c]/20 bg-black px-6 py-10 text-center">
        <p className="mb-2 text-sm tracking-[0.3em] text-[#c9a84c]">ATELIER HORIZON</p>
        <p className="text-xs text-gray-300">contact@atelier-horizon.example • Paris, France</p>
        <p className="mt-4 text-xs text-gray-400">© Atelier Horizon — entreprise fictive</p>
      </footer>
    </div>
  );
}
