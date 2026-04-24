import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <Link href="/" className="flex items-center gap-2 font-extrabold text-lg text-white mb-4">
              <span className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold" style={{ background: "var(--gradient)" }}>
                L
              </span>
              LINSAEM
            </Link>
            <p className="text-sm leading-relaxed">
              Agence de création web professionnelle à prix imbattable. Design sur-mesure, tout inclus, sans prise de tête.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Offres</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/#tarifs" className="hover:text-white transition-colors">Starter — 5,99€</Link></li>
              <li><Link href="/#tarifs" className="hover:text-white transition-colors">Pro — 7,99€</Link></li>
              <li><Link href="/#tarifs" className="hover:text-white transition-colors">Business — 11,99€</Link></li>
              <li><Link href="/#services" className="hover:text-white transition-colors">Nos Services</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Infos</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/#inclus" className="hover:text-white transition-colors">Ce qui est inclus</Link></li>
              <li><Link href="/#comment-ca-marche" className="hover:text-white transition-colors">Comment ça marche</Link></li>
              <li><Link href="/#faq" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="/mentions-legales" className="hover:text-white transition-colors">Mentions légales</Link></li>
              <li><Link href="/cgv" className="hover:text-white transition-colors">CGV</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="mailto:contact@linsaem.fr" className="hover:text-white transition-colors">📧 contact@linsaem.fr</a></li>
              <li><a href="tel:+33189701526" className="hover:text-white transition-colors">📱 +33 1 89 70 15 26</a></li>
              <li className="pt-2">
                <Link href="/login" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-sm px-4 py-2 rounded-full transition-colors">
                  Mon espace client →
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-xs text-gray-600">
          <p>© 2025 LINSAEM. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
