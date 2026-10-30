import Link from "next/link";
import { entreprise, portailClientUrl } from "@/content/entreprise";
import { Container } from "@/components/ui/Container";
import { Logo } from "./Logo";
import { navigation } from "./navigation";

const legal = [
  { href: "/mentions-legales", label: "Mentions légales" },
  { href: "/cgv", label: "CGV" },
  { href: "/confidentialite", label: "Confidentialité" },
];

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <Logo tone="light" />
          <p className="mt-4 max-w-sm text-sm leading-relaxed">
            Sites vitrines par abonnement et développement web sur mesure.
          </p>
          <ul className="mt-6 space-y-2 text-sm">
            <li>
              <a href={`mailto:${entreprise.email}`} className="text-white underline-offset-4 hover:underline">
                {entreprise.email}
              </a>
            </li>
            <li>
              <a href={`tel:${entreprise.telephone.lien}`} className="text-white underline-offset-4 hover:underline">
                {entreprise.telephone.affichage}
              </a>
            </li>
          </ul>
        </div>

        <nav aria-label="Plan du site">
          <h2 className="text-sm font-semibold text-white">Le site</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {[...navigation, { href: "/contact", label: "Contact" }].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-semibold text-white">Clients</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {portailClientUrl && (
              <li>
                <a href={portailClientUrl} className="hover:text-white" rel="noopener">
                  Factures et résiliation
                </a>
              </li>
            )}
            {legal.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
      <div className="border-t border-white/10">
        <Container className="py-6 text-sm text-slate-400">
          © {new Date().getFullYear()} {entreprise.legal.raisonSociale} {entreprise.legal.formeSociale}. Tous droits réservés.
        </Container>
      </div>
    </footer>
  );
}
