import Image from "next/image";
import { Bricolage_Grotesque, Figtree } from "next/font/google";
import { Briefcase, Compass, HeartHandshake, Sparkles, Check, Video, MapPin } from "lucide-react";
import { SlotPicker } from "./shared/SlotPicker";
import horizon from "@/assets/modeles/cap-equilibre/horizon.jpg";
import atelier from "@/assets/modeles/cap-equilibre/atelier.jpg";
import echange from "@/assets/modeles/cap-equilibre/echange.jpg";
import reussite from "@/assets/modeles/cap-equilibre/reussite.jpg";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--cap-display" });
const texte = Figtree({ subsets: ["latin"], variable: "--cap-texte" });

const titre = "[font-family:var(--cap-display)]";

const POUR_QUI = [
  { icone: Compass, titre: "Reconversion", texte: "Vous sentez qu'il est temps de changer de voie, sans savoir encore laquelle." },
  { icone: Briefcase, titre: "Prise de poste", texte: "Nouveau management, nouvelle équipe : trouver vite sa place et sa posture." },
  { icone: HeartHandshake, titre: "Équilibre de vie", texte: "Le travail déborde sur tout le reste, et vous voulez reprendre la main." },
  { icone: Sparkles, titre: "Confiance en soi", texte: "Prendre la parole, s'affirmer, oser demander : avancer sans se freiner." },
];

const METHODE = [
  { titre: "Appel découverte", texte: "20 minutes offertes pour faire connaissance et clarifier votre demande." },
  { titre: "Bilan de départ", texte: "Où en êtes-vous, où voulez-vous aller : un objectif concret et mesurable." },
  { titre: "Séances", texte: "Toutes les deux semaines, avec des exercices simples à faire entre deux rendez-vous." },
  { titre: "Point d'arrivée", texte: "Une dernière séance pour mesurer le chemin parcouru et préparer la suite." },
];

const PROGRAMMES = [
  { nom: "Séance ponctuelle", prix: "90 €", duree: "1 séance de 1 h", points: ["Pour débloquer une situation précise", "En cabinet ou en visio", "Compte rendu écrit"] },
  { nom: "Cap 6 semaines", prix: "540 €", duree: "4 séances + suivi", points: ["Bilan de départ et objectif", "Exercices entre les séances", "Échanges par message", "Paiement en 2 fois possible"], miseEnAvant: true },
  { nom: "Transition 3 mois", prix: "980 €", duree: "7 séances + suivi", points: ["Pour une reconversion ou une prise de poste", "Outils d'orientation", "Séance de bilan à 6 mois"] },
];

const FAQ = [
  { q: "Les séances en visio sont-elles aussi efficaces ?", r: "Oui pour la grande majorité des accompagnements. Le format se choisit au départ et peut changer en cours de route." },
  { q: "Combien de temps dure un accompagnement ?", r: "De 6 semaines à 3 mois selon l'objectif. Le rythme est fixé ensemble lors du bilan de départ." },
  { q: "Mon employeur peut-il financer le coaching ?", r: "C'est souvent possible dans le cadre du plan de développement des compétences. Une facture au nom de l'entreprise peut être établie." },
];

export function CapEquilibre() {
  return (
    <div className={`${display.variable} ${texte.variable} bg-[#fff8ef] text-[#16323d] [font-family:var(--cap-texte)]`}>
      <header className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-6">
        <p className={`${titre} flex items-center gap-2 text-xl font-bold`}>
          <span aria-hidden="true" className="size-6 rounded-full bg-[#e8664a] ring-4 ring-[#ffd9cc]" />
          Cap Équilibre
        </p>
        <nav aria-label="Menu Cap Équilibre" className="hidden gap-8 font-medium md:flex">
          <a href="#pour-qui" className="hover:text-[#b83f27]">Pour qui</a>
          <a href="#methode" className="hover:text-[#b83f27]">Méthode</a>
          <a href="#programmes" className="hover:text-[#b83f27]">Programmes</a>
        </nav>
        <a href="#rendez-vous" className="rounded-full bg-[#16323d] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0d2129]">
          Prendre rendez-vous
        </a>
      </header>

      {/* Hero */}
      <section className="relative mx-auto grid max-w-6xl items-center gap-14 px-6 pt-8 pb-24 lg:grid-cols-[1.1fr_1fr]">
        <div aria-hidden="true" className="absolute top-10 -left-20 -z-0 size-72 rounded-full bg-[#ffe1d6] blur-3xl" />
        <div className="relative">
          <p className="fade-up inline-flex items-center gap-2 rounded-full bg-[#dff1ea] px-4 py-1.5 text-sm font-semibold text-[#16323d]">
            Coaching professionnel et de vie · Lille et visio
          </p>
          <h1 className={`fade-up ${titre} mt-6 text-5xl leading-[1.02] font-extrabold tracking-tight [animation-delay:100ms] sm:text-6xl lg:text-7xl`}>
            Retrouver un cap, <span className="relative whitespace-nowrap text-[#b83f27]">pas à pas</span>
          </h1>
          <p className="fade-up mt-6 max-w-lg text-lg leading-relaxed text-[#3c5560] [animation-delay:200ms]">
            Un accompagnement concret pour changer de voie, prendre un poste ou retrouver de l&apos;équilibre, à votre
            rythme.
          </p>
          <div className="fade-up mt-9 flex flex-wrap gap-3 [animation-delay:300ms]">
            <a href="#rendez-vous" className="rounded-full bg-[#b83f27] px-7 py-4 font-semibold text-white shadow-lg shadow-[#e8664a]/30 transition-transform hover:-translate-y-0.5">
              Réserver l&apos;appel découverte
            </a>
            <a href="#programmes" className="rounded-full border-2 border-[#16323d] px-7 py-4 font-semibold hover:bg-[#16323d] hover:text-white">
              Voir les programmes
            </a>
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-md">
          <div className="relative aspect-square overflow-hidden rounded-[42%_58%_55%_45%/48%_42%_58%_52%]">
            <Image
              src={horizon}
              alt="Silhouette en posture de méditation face à un paysage baigné de soleil couchant"
              fill
              priority
              fetchPriority="high"
              placeholder="blur"
              sizes="(min-width: 1024px) 28rem, 90vw"
              className="slow-zoom object-cover"
            />
          </div>
          <div className="absolute -bottom-2 left-0 rounded-2xl bg-white px-5 py-4 shadow-xl shadow-[#16323d]/10">
            <p className={`${titre} text-lg font-bold`}>Premier appel offert</p>
            <p className="text-sm text-[#3c5560]">20 minutes, sans engagement</p>
          </div>
          <span aria-hidden="true" className="absolute -top-4 right-2 size-16 rounded-full bg-[#e8664a]" />
          <span aria-hidden="true" className="absolute right-12 -bottom-6 size-8 rounded-full bg-[#7cc4ac]" />
        </div>
      </section>

      {/* Pour qui */}
      <section id="pour-qui" className="bg-white px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className={`${titre} max-w-2xl text-4xl font-extrabold tracking-tight sm:text-5xl`}>Vous vous reconnaissez ?</h2>
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {POUR_QUI.map(({ icone: Icone, titre: t, texte: tx }) => (
              <li key={t} className="reveal rounded-3xl bg-[#fff8ef] p-7 transition-transform hover:-translate-y-1">
                <span className="grid size-12 place-items-center rounded-2xl bg-[#16323d] text-[#ffd9cc]">
                  <Icone aria-hidden="true" size={22} />
                </span>
                <h3 className={`${titre} mt-5 text-xl font-bold`}>{t}</h3>
                <p className="mt-2 leading-relaxed text-[#3c5560]">{tx}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Méthode */}
      <section id="methode" className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <h2 className={`${titre} text-4xl font-extrabold tracking-tight sm:text-5xl`}>Une méthode en quatre temps</h2>
            <p className="mt-5 text-lg leading-relaxed text-[#3c5560]">
              Pas de grandes théories : des objectifs clairs, des outils simples et un point régulier sur vos progrès.
            </p>
            <div className="mt-10 grid grid-cols-2 gap-4">
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
                <Image src={atelier} alt="Femme présentant des notes adhésives au mur devant un groupe en réunion" fill placeholder="blur" sizes="(min-width: 1024px) 20vw, 45vw" className="object-cover" />
              </div>
              <div className="relative mt-8 aspect-[4/5] overflow-hidden rounded-3xl">
                <Image src={echange} alt="Trois personnes discutant en souriant autour d'une table avec des ordinateurs" fill placeholder="blur" sizes="(min-width: 1024px) 20vw, 45vw" className="object-cover" />
              </div>
            </div>
          </div>
          <ol className="relative space-y-4 before:absolute before:top-6 before:bottom-6 before:left-6 before:w-0.5 before:bg-[#16323d]/15">
            {METHODE.map((e, i) => (
              <li key={e.titre} className="reveal relative flex gap-5 rounded-3xl bg-white p-6 shadow-sm">
                <span className={`${titre} relative z-10 grid size-12 shrink-0 place-items-center rounded-full bg-[#ffd9cc] text-lg font-extrabold text-[#16323d]`}>
                  {i + 1}
                </span>
                <div>
                  <h3 className={`${titre} text-xl font-bold`}>{e.titre}</h3>
                  <p className="mt-1 leading-relaxed text-[#3c5560]">{e.texte}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Programmes */}
      <section id="programmes" className="bg-[#16323d] px-6 py-24 text-white">
        <div className="mx-auto max-w-6xl">
          <h2 className={`${titre} text-center text-4xl font-extrabold tracking-tight sm:text-5xl`}>Programmes</h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-[#c4d6dc]">
            <Video aria-hidden="true" size={18} className="mr-1 inline" /> En visio ou <MapPin aria-hidden="true" size={18} className="mr-1 inline" /> en cabinet à Lille, au choix.
          </p>
          <ul className="mt-14 grid items-start gap-6 lg:grid-cols-3">
            {PROGRAMMES.map((p) => (
              <li
                key={p.nom}
                className={`reveal rounded-3xl p-8 ${p.miseEnAvant ? "bg-[#fff8ef] text-[#16323d] lg:-mt-4 lg:pb-12" : "border border-white/15"}`}
              >
                {p.miseEnAvant && (
                  <p className="mb-4 inline-flex rounded-full bg-[#b83f27] px-3 py-1 text-xs font-bold text-white">Le plus choisi</p>
                )}
                <h3 className={`${titre} text-2xl font-bold`}>{p.nom}</h3>
                <p className={`mt-1 text-sm ${p.miseEnAvant ? "text-[#3c5560]" : "text-[#c4d6dc]"}`}>{p.duree}</p>
                <p className={`${titre} mt-6 text-5xl font-extrabold`}>{p.prix}</p>
                <ul className="mt-8 space-y-3">
                  {p.points.map((pt) => (
                    <li key={pt} className="flex gap-3">
                      <Check aria-hidden="true" size={20} className={`mt-0.5 shrink-0 ${p.miseEnAvant ? "text-[#b83f27]" : "text-[#7cc4ac]"}`} />
                      {pt}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Rendez-vous */}
      <section id="rendez-vous" className="mx-auto grid max-w-6xl gap-14 px-6 py-24 lg:grid-cols-2">
        <div>
          <h2 className={`${titre} text-4xl font-extrabold tracking-tight sm:text-5xl`}>Choisissez un créneau</h2>
          <p className="mt-5 text-lg leading-relaxed text-[#3c5560]">
            L&apos;appel découverte dure 20 minutes, par téléphone ou en visio. Il permet de vérifier que l&apos;accompagnement
            vous correspond.
          </p>
          <div className="relative mt-10 hidden aspect-[16/10] overflow-hidden rounded-3xl lg:block">
            <Image src={reussite} alt="Deux collègues se tapant dans la main, assis à un bureau" fill placeholder="blur" sizes="40vw" className="object-cover" />
          </div>
        </div>
        <div className="rounded-3xl bg-white p-8 shadow-sm sm:p-10">
          <SlotPicker
            slots={{ "Mardi 12": ["9h00", "11h30", "14h00", "17h30"], "Jeudi 14": ["8h30", "12h30", "18h00"], "Samedi 16": ["10h00", "11h00"] }}
            theme={{
              heading: "text-[#3c5560]",
              slot: {
                base: "rounded-full px-5 py-2.5 text-sm font-semibold transition-colors",
                on: "bg-[#16323d] text-white",
                off: "border-2 border-[#16323d]/20 hover:border-[#16323d]",
              },
              confirm: {
                base: "rounded-full py-4 font-semibold",
                on: "bg-[#b83f27] text-white",
                off: "bg-[#f1ece4] text-[#3c5560]",
              },
              note: "text-[#3c5560]",
            }}
          />
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white px-6 py-24">
        <div className="mx-auto max-w-3xl">
          <h2 className={`${titre} text-4xl font-extrabold tracking-tight`}>Questions fréquentes</h2>
          <div className="mt-10 space-y-3">
            {FAQ.map((f) => (
              <details key={f.q} className="group rounded-2xl bg-[#fff8ef] p-6 open:shadow-sm">
                <summary className={`${titre} flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-bold`}>
                  {f.q}
                  <span aria-hidden="true" className="grid size-8 shrink-0 place-items-center rounded-full bg-[#16323d] text-white transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-4 leading-relaxed text-[#3c5560]">{f.r}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <footer className="px-6 py-8 text-center text-sm text-[#3c5560]">Cap Équilibre · Coaching à Lille et en visio · Entreprise fictive</footer>
    </div>
  );
}
