import Image from "next/image";
import tuyauterie from "@/assets/modeles/covers/artisan.jpg";
import { Counter } from "./shared/Counter";
import { DemoForm } from "./shared/DemoForm";

const SERVICES = [
  { icon: "🔧", titre: "Dépannage urgent", desc: "Intervention rapide, 7 jours sur 7" },
  { icon: "🚿", titre: "Installation", desc: "Pose de sanitaires, robinetterie, douches" },
  { icon: "🏗️", titre: "Rénovation", desc: "Réfection complète de salle de bain" },
  { icon: "🔥", titre: "Chaudière", desc: "Entretien, réparation, remplacement" },
  { icon: "🛁", titre: "Salle de bain", desc: "Conception et installation clé en main" },
  { icon: "💧", titre: "Détection de fuite", desc: "Localisation sans destruction" },
];

const POURQUOI = [
  "Artisan certifié — garantie de qualité",
  "Devis gratuit sous 24 h par email",
  "Assurance décennale sur tous les travaux",
  "Techniciens qualifiés disponibles rapidement",
];

const ETAPES = [
  { num: "01", titre: "Contact", desc: "Appelez ou remplissez le formulaire en ligne" },
  { num: "02", titre: "Devis", desc: "Réception d'un devis détaillé et gratuit" },
  { num: "03", titre: "Intervention", desc: "Le technicien intervient à la date choisie" },
  { num: "04", titre: "Garantie", desc: "Travaux garantis pièces et main d'œuvre" },
];

const TELEPHONE = "01 99 00 56 78";
const orange = "bg-[#c2410c]";
const champ =
  "w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-[#c2410c] focus:outline-none focus:ring-2 focus:ring-orange-200";

export function Artisan() {
  return (
    <div className="text-gray-800">
      <section className="flex min-h-[85vh] items-center bg-[#1e3a5f] px-6 py-24">
        <div className="mx-auto w-full max-w-5xl">
          <p className={`mb-6 inline-block rounded-full ${orange} px-4 py-2 text-xs font-bold text-white`}>✓ Artisan certifié</p>
          <h1 className="mb-4 text-5xl font-extrabold text-white lg:text-7xl">
            Plomberie <span className="text-[#fb923c]">du Centre</span>
          </h1>
          <p className="mb-10 text-xl text-blue-100">Dépannage et installation — Île-de-France</p>
          <div className="mb-16 flex flex-wrap gap-4">
            <a href="#urgence" className={`rounded-full ${orange} px-8 py-4 text-lg font-bold text-white hover:bg-[#9a3412]`}>
              <span aria-hidden="true">🚨 </span>Urgence 7j/7
            </a>
            <a href="#devis" className="rounded-full border-2 border-white px-8 py-4 text-lg font-bold text-white hover:bg-white/10">
              Demander un devis
            </a>
          </div>
          <dl className="grid max-w-md grid-cols-3 gap-6">
            {[
              { value: 15, suffix: "+", decimals: 0, label: "ans d'expérience" },
              { value: 2000, suffix: "+", decimals: 0, label: "interventions" },
              { value: 4.9, suffix: "/5", decimals: 1, label: "note moyenne" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col-reverse text-center">
                <dt className="text-sm text-blue-100">{s.label}</dt>
                <dd className="text-3xl font-extrabold text-[#fb923c]">
                  <Counter value={s.value} suffix={s.suffix} decimals={s.decimals} />
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <p id="urgence" className={`${orange} px-6 py-4 text-center font-bold text-white`}>
        <span aria-hidden="true">🔧 </span>Urgence plomberie ? Intervention rapide — Appelez le {TELEPHONE}
      </p>

      <section className="bg-slate-50 px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-14 text-center text-4xl font-extrabold text-[#1e3a5f]">Nos services</h2>
          <ul className="grid gap-6 md:grid-cols-3">
            {SERVICES.map((s) => (
              <li
                key={s.titre}
                className="reveal rounded-xl border-l-4 border-slate-200 bg-white p-6 shadow-sm transition hover:translate-x-1 hover:border-[#c2410c]"
              >
                <div aria-hidden="true" className="mb-3 text-3xl">
                  {s.icon}
                </div>
                <h3 className="mb-1 text-lg font-bold text-[#1e3a5f]">{s.titre}</h3>
                <p className="text-sm text-gray-600">{s.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-white px-6 py-20">
        <div className="mx-auto grid max-w-5xl items-center gap-12 md:grid-cols-2">
          <div>
            <h2 className="mb-8 text-4xl font-extrabold text-[#1e3a5f]">Pourquoi nous choisir ?</h2>
            <ul className="space-y-4">
              {POURQUOI.map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <span aria-hidden="true" className="mt-0.5 text-xl font-bold text-[#c2410c]">
                    ✓
                  </span>
                  <span className="text-gray-700">{p}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative min-h-80 overflow-hidden rounded-2xl">
            <Image
              src={tuyauterie}
              alt="Tuyauterie et compteur fixés sur un mur de briques"
              fill
              placeholder="blur"
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#1e3a5f]/85 text-center">
              <p className="mb-2 text-4xl font-extrabold text-white">4,9/5</p>
              <p className="mb-3 text-blue-100">note moyenne des avis clients</p>
              <p aria-hidden="true" className="text-2xl">
                ⭐⭐⭐⭐⭐
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#1e3a5f] px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-14 text-center text-4xl font-extrabold text-white">Comment ça marche ?</h2>
          <ol className="grid gap-8 md:grid-cols-4">
            {ETAPES.map((e) => (
              <li key={e.num} className="reveal text-center">
                <div
                  aria-hidden="true"
                  className={`mx-auto mb-4 flex size-16 items-center justify-center rounded-full ${orange} text-xl font-extrabold text-white`}
                >
                  {e.num}
                </div>
                <h3 className="mb-2 text-lg font-bold text-white">{e.titre}</h3>
                <p className="text-sm text-blue-100">{e.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="devis" className="bg-slate-50 px-6 py-20">
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-10 text-center text-4xl font-extrabold text-[#1e3a5f]">Demande de devis gratuit</h2>
          <div className="rounded-2xl bg-white p-8 shadow-sm">
            <DemoForm
              submitLabel="Recevoir mon devis gratuit →"
              submitClassName={`rounded-xl ${orange} py-4 text-lg font-bold text-white opacity-80`}
              noteClassName="text-gray-600"
            >
              <div>
                <label htmlFor="artisan-nom" className="mb-1 block text-sm font-semibold text-gray-700">Nom complet</label>
                <input id="artisan-nom" type="text" autoComplete="name" className={champ} />
              </div>
              <div>
                <label htmlFor="artisan-email" className="mb-1 block text-sm font-semibold text-gray-700">Email</label>
                <input id="artisan-email" type="email" autoComplete="email" className={champ} />
              </div>
              <div>
                <label htmlFor="artisan-tel" className="mb-1 block text-sm font-semibold text-gray-700">Téléphone</label>
                <input id="artisan-tel" type="tel" autoComplete="tel" className={champ} />
              </div>
              <div>
                <label htmlFor="artisan-type" className="mb-1 block text-sm font-semibold text-gray-700">Type de travaux</label>
                <select id="artisan-type" className={`${champ} bg-white`}>
                  <option>Dépannage urgent</option>
                  <option>Installation sanitaire</option>
                  <option>Rénovation salle de bain</option>
                  <option>Chaudière</option>
                  <option>Autre</option>
                </select>
              </div>
              <div>
                <label htmlFor="artisan-desc" className="mb-1 block text-sm font-semibold text-gray-700">Description</label>
                <textarea id="artisan-desc" rows={4} className={`${champ} resize-none`} />
              </div>
            </DemoForm>
          </div>
        </div>
      </section>

      <footer className="bg-[#1e3a5f] px-6 py-10 text-center text-blue-100">
        <p className="mb-2 text-2xl font-extrabold text-white">Plomberie du Centre</p>
        <p className="text-sm">Île-de-France • {TELEPHONE} • contact@plomberie-du-centre.example</p>
        <p className="mt-4 text-xs">© Plomberie du Centre — entreprise fictive</p>
      </footer>
    </div>
  );
}
