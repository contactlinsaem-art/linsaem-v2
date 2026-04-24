import Link from "next/link";

export function Services() {
  const services = [
    { icon: "🛒", title: "E-commerce", desc: "Boutique en ligne complète pour vendre vos produits. Paiement sécurisé, gestion des stocks, suivi des commandes." },
    { icon: "📱", title: "Gestion réseaux sociaux", desc: "Création et gestion de vos comptes Instagram, Facebook, LinkedIn. Publications régulières, engagement, croissance." },
    { icon: "🎨", title: "Création de contenu", desc: "Logos professionnels, posts pour réseaux sociaux, stories Instagram, vidéos courtes TikTok/Reels. Identité visuelle complète." },
    { icon: "💼", title: "CV en ligne", desc: "Portfolio professionnel moderne pour vous démarquer. Design élégant, responsive, facile à partager avec les recruteurs." },
    { icon: "📋", title: "Formulaires avancés", desc: "Formulaires de contact personnalisés, devis en ligne, réservations, questionnaires. Intégration avec vos outils." },
    { icon: "⭐", title: "Section avis clients", desc: "Intégration de vos témoignages et avis Google. Système de notation, photos clients, preuve sociale pour convertir." },
  ];

  return (
    <section id="services" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="section-tag">Nos Services</div>
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
            Des services complets pour votre présence en ligne
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Au-delà de la création de sites web, nous vous accompagnons sur tous les aspects de votre communication digitale.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger">
          {services.map((s) => (
            <div key={s.title} className="card p-7 hover:-translate-y-1 transition-all group">
              <div className="text-4xl mb-4">{s.icon}</div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">{s.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">{s.desc}</p>
              <Link href="/#contact" className="text-sky-500 text-sm font-semibold hover:text-sky-600 transition-colors group-hover:underline">
                Demander un devis →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Included() {
  const items = [
    { icon: "🎨", title: "Design personnalisé", desc: "Un site unique créé spécialement pour vous, pas un template générique. On adapte les couleurs, polices et mise en page à votre image." },
    { icon: "🌐", title: "Nom de domaine", desc: "Votre-site.fr ou .com inclus dans l'abonnement. On s'occupe de tout : achat, configuration, renouvellement." },
    { icon: "☁️", title: "Hébergement premium", desc: "Serveurs rapides et fiables. Votre site charge en moins de 2 secondes, 99,9% de disponibilité garantie." },
    { icon: "🔒", title: "Sécurité SSL", desc: "Certificat HTTPS inclus pour sécuriser votre site et rassurer vos visiteurs. Indispensable pour le référencement Google." },
    { icon: "🛠️", title: "Maintenance incluse", desc: "Mises à jour de sécurité, sauvegardes automatiques, surveillance 24/7. On s'occupe de tout, vous n'avez rien à faire." },
    { icon: "✏️", title: "Modifications incluses", desc: "Besoin de changer un texte, une photo ? C'est inclus dans votre abonnement. Demandez, on le fait sous 48h." },
    { icon: "💬", title: "Support humain", desc: "Pas de chatbot ! Une vraie personne vous répond par email ou téléphone. Questions, problèmes, on est là." },
  ];

  return (
    <section id="inclus" className="py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="section-tag">Tout inclus</div>
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Ce que vous obtenez</h2>
          <p className="text-gray-500 text-lg">Pas de frais cachés. Tout est compris dans votre abonnement.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 stagger">
          {items.map((item) => (
            <div key={item.title} className="card p-6 flex gap-4 hover:-translate-y-0.5 transition-all">
              <div className="text-3xl flex-shrink-0">{item.icon}</div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HowItWorks() {
  const steps = [
    {
      n: "1",
      title: "Vous nous décrivez votre projet",
      desc: "Remplissez notre formulaire en 2 minutes : votre activité, vos couleurs préférées, vos contenus. C'est tout ce dont on a besoin.",
      color: "from-sky-400 to-sky-600",
    },
    {
      n: "2",
      title: "On crée votre site",
      desc: "Notre équipe design votre site sur-mesure en 24-48h. Vous recevez un lien de prévisualisation pour valider ou demander des ajustements.",
      color: "from-violet-400 to-violet-600",
    },
    {
      n: "3",
      title: "C'est en ligne !",
      desc: "Après validation, votre site est publié immédiatement. Vous recevez toutes les infos de connexion et notre support reste disponible.",
      color: "from-pink-400 to-pink-600",
    },
  ];

  return (
    <section id="comment-ca-marche" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="section-tag">Processus</div>
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Votre site en 3 étapes</h2>
          <p className="text-gray-500 text-lg">Simple, rapide, sans prise de tête. On s&apos;occupe de tout.</p>
        </div>
        <div className="grid lg:grid-cols-3 gap-8 stagger">
          {steps.map((step) => (
            <div key={step.n} className="text-center">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} text-white text-2xl font-extrabold flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                {step.n}
              </div>
              <h3 className="font-bold text-gray-900 text-xl mb-3">{step.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
