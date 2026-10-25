# Plan v3 — à valider avant de coder

> Branche `v3`. Ce document remplace la §11.7 d'AUDIT.md.
> Les passages **[À CONFIRMER]** sont des choix que je ne peux pas faire à votre place.
> Ton du site : il parle au nom de « LINSAEM », sans « nous », sans « notre équipe » ni « agence ». Le visiteur est vouvoyé.
> Les chiffres invérifiables de la v2 sont retirés (« 99,9 % de disponibilité », « moins de 2 secondes », « surveillance 24/7 », « 2× moins cher »).

---

## 1. Arborescence

### 1.1 Routes

| URL | Page | Rendu |
|---|---|---|
| `/` | Accueil | statique |
| `/sites-vitrines` | Les 3 formules, ce qui est inclus, le process | statique |
| `/developpement` | Offre sur mesure, process, exemples | statique |
| `/realisations` | Sites clients (`publie: true` uniquement) et produits LINSAEM | statique |
| `/modeles` | Galerie des 7 modèles de design | statique |
| `/modeles/[slug]` | `vitrine`, `boulangerie`, `artisan`, `architecte`, `photographe`, `restaurant`, `coach` | statique (`generateStaticParams`) |
| `/contact` | Formulaire (type de projet : site vitrine ou développement) | statique + Server Action |
| `/merci` | Confirmation (noindex) | statique |
| `/mentions-legales`, `/cgv`, `/confidentialite` | Pages légales (indexables, absentes du sitemap) | statique |

### 1.2 Redirections (`next.config.ts`)

| Ancienne URL | Destination | Type |
|---|---|---|
| `/login`, `/dashboard`, `/dashboard/:path*` | `process.env.STRIPE_PORTAL_URL` | 307 (temporaire, au cas où l'URL du portail change) |
| `/demos/:slug` | `/modeles/:slug` | 301 |
| `/politique-de-confidentialite` | `/confidentialite` | 301 |
| `/admin/:path*`, `/set-password`, `/forgot-password` | `/` | 301 |
| Anciennes `.html` de la v1 | `/` | 301 (conservées) |

### 1.3 Fichiers

```
.
├── src/
│   ├── app/
│   │   ├── (site)/
│   │   │   ├── layout.tsx                 # Header + Footer
│   │   │   ├── page.tsx                   # accueil
│   │   │   ├── sites-vitrines/page.tsx
│   │   │   ├── developpement/page.tsx
│   │   │   ├── realisations/page.tsx
│   │   │   ├── modeles/page.tsx
│   │   │   ├── contact/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── ContactForm.tsx        # seul Client Component du formulaire
│   │   │   │   └── actions.ts             # Server Action : Zod, honeypot, Turnstile, limite IP, Resend
│   │   │   ├── merci/page.tsx
│   │   │   ├── mentions-legales/page.tsx
│   │   │   ├── cgv/page.tsx
│   │   │   └── confidentialite/page.tsx
│   │   ├── modeles/[slug]/
│   │   │   ├── layout.tsx                 # bandeau « Modèle de design LINSAEM »
│   │   │   └── page.tsx                   # metadata + rendu du modèle
│   │   ├── layout.tsx                     # <html lang="fr">, next/font, Vercel Analytics
│   │   ├── opengraph-image.tsx            # image OG générée
│   │   ├── icon.svg  apple-icon.png
│   │   ├── sitemap.ts  robots.ts
│   │   └── not-found.tsx
│   ├── components/
│   │   ├── ui/            Button, Card, Field (label + input + erreur), Badge, Section, Container
│   │   ├── site/          Header (menu mobile accessible), Footer, OffreCard, FormuleCard,
│   │   │                  ProcessSteps, FaqList (<details>/aria), ModeleCard, RealisationCard, CtaBand
│   │   ├── seo/           JsonLd
│   │   └── modeles/       un dossier par modèle, découpé en Server Components
│   │                      + petits Client Components pour les animations
│   ├── content/
│   │   ├── entreprise.ts  # nom, email, téléphone, mentions légales [À REMPLIR], URL portail
│   │   ├── offres.ts      # 3 formules, frais de mise en service, offre développement, process
│   │   ├── realisations.ts
│   │   ├── modeles.ts
│   │   └── faq.ts         # FAQ par page (accueil, vitrines, développement)
│   ├── emails/            LeadAlert.tsx, AccuseReception.tsx (React Email)
│   └── lib/               contact-schema.ts (Zod), turnstile.ts, ratelimit.ts, seo.ts
├── public/modeles/        images des modèles rapatriées d'Unsplash (licence Unsplash : usage libre)
├── tests/contact.spec.ts  # Playwright
├── vercel.json            # "regions": ["cdg1"]
├── eslint.config.mjs  playwright.config.ts  .env.example
└── AUDIT.md  PLAN-V3.md
```

### 1.4 Méthode

1. Sur `v3`, j'installe Next.js 16 + Tailwind v4 à la racine. L'ancien `src/` est déplacé dans `legacy/` (exclu du build) pour pouvoir y reprendre les modèles et les textes.
2. Je construis les pages, le formulaire et les tests.
3. Une fois `build`, `lint`, `typecheck` et Playwright au vert, je supprime `legacy/`, les dépendances et les variables d'environnement inutiles.
4. Vous testez la preview Vercel de la branche, puis on fusionne dans `main`.

### 1.5 Variables d'environnement v3

`RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`, `TURNSTILE_SECRET_KEY`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `STRIPE_PORTAL_URL`, plus celles de la limite par IP (voir question 8). Toutes les autres (Neon, JWT, Stripe API…) sont supprimées de Vercel.

---

## 2. Plan de la page d'accueil

| # | Section | Contenu | Source |
|---|---|---|---|
| 1 | **Header** | Logo LINSAEM · Sites vitrines · Développement · Réalisations · Modèles · bouton « Contact ». Menu mobile avec `aria-expanded` et `aria-controls`. | — |
| 2 | **Hero** | H1 : « Sites vitrines par abonnement et développement web sur mesure ». Sous-titre : « Un site professionnel hébergé et maintenu dès 5,99 € TTC par mois, ou une application conçue pour votre besoin, sur devis. » Deux boutons : « Voir les sites vitrines » → `/sites-vitrines`, « Parler d'un projet sur mesure » → `/developpement`. | `offres.ts` |
| 3 | **Les deux offres** | Deux cartes côte à côte. *Sites vitrines* : 3 points clés, « dès 5,99 € TTC/mois », lien. *Développement sur mesure* : 4 types de projets, « sur devis », lien. | `offres.ts` |
| 4 | **Les formules** | Aperçu compact des 3 prix (nom, prix, 3 points), frais de mise en service et « sans engagement », lien « Comparer les formules ». | `offres.ts` |
| 5 | **Modèles de design** | 4 à 6 vignettes avec le badge « Modèle », lien « Voir les 7 modèles ». Phrase : « Des exemples de styles. Chaque site est ensuite adapté à votre activité. » | `modeles.ts` |
| 6 | **Réalisations** | Sites clients publiés et produits LINSAEM (badge « Projet interne »). Tant qu'aucun client n'est publié, seuls les deux produits s'affichent. | `realisations.ts` |
| 7 | **Comment ça se passe** | Deux colonnes de 4 étapes courtes : vitrine (demande → contenus → validation → mise en ligne) et sur mesure (cadrage → devis → développement → mise en ligne + maintenance). | `offres.ts` |
| 8 | **FAQ** | 6 questions générales, avec le JSON-LD `FAQPage`. | `faq.ts` |
| 9 | **Bandeau final** | « Un projet en tête ? Décrivez-le en quelques lignes. » → `/contact`. | — |
| 10 | **Footer** | Navigation, email, téléphone, « Gérer mon abonnement » → portail Stripe, mentions légales, CGV, confidentialité, © année courante. | `entreprise.ts` |

JSON-LD sur l'accueil : `ProfessionalService` (nom, URL, email, téléphone, zone desservie : France, `makesOffer` avec les 3 formules TTC) et `FAQPage`.

**FAQ de l'accueil (proposition)**

1. **Quelle différence entre un site vitrine et un développement sur mesure ?** Le site vitrine présente votre activité (services, coordonnées, photos) pour un abonnement mensuel fixe. Le développement sur mesure concerne les projets avec des fonctionnalités propres : comptes utilisateurs, paiements, outils métier. Il est chiffré sur devis.
2. **Comment les prix des sites vitrines restent-ils aussi bas ?** Les sites sont construits sur une base technique commune, éprouvée, puis adaptés à chaque activité. L'hébergement est mutualisé et le travail est organisé pour aller vite, sans intermédiaire.
3. **Y a-t-il un engagement de durée ?** Non. L'abonnement est sans engagement et résiliable à tout moment avec un mois de préavis.
4. **Comment se passe le paiement ?** Après validation de votre site, vous recevez un lien de paiement sécurisé Stripe. L'abonnement est ensuite prélevé chaque mois par carte. Les factures sont envoyées par email et restent disponibles dans le portail client Stripe.
5. **Je n'ai ni textes ni photos, est-ce un problème ?** Non. Une aide à la rédaction et des photos libres de droits adaptées à votre activité peuvent être proposées.
6. **Mon site sera-t-il visible sur Google ?** Chaque site est livré avec une structure propre, des balises renseignées, un affichage mobile et un chargement rapide. Ce sont les bases d'un bon référencement, sans garantie de position.

---

## 3. Texte de la page /sites-vitrines

> Les prix, les listes et le process viennent de `content/offres.ts`. Le texte ci-dessous est le rendu final.

**Meta title** : Sites vitrines par abonnement dès 5,99 € TTC/mois | LINSAEM
**Meta description** : Site vitrine professionnel conçu pour votre activité, hébergé et maintenu. Trois formules de 5,99 € à 11,99 € TTC par mois, sans engagement.

---

### Sites vitrines par abonnement

Un site professionnel conçu pour votre activité, hébergé, sécurisé et maintenu, pour un abonnement mensuel. Sans engagement de durée.

[Choisir ma formule] [Voir les modèles]

---

### Trois formules, tout compris

**Starter — 5,99 € TTC/mois**
*Pour démarrer avec une page claire et efficace.*
- Site d'une page, personnalisé
- Design adapté à votre activité
- Affichage optimisé sur mobile, tablette et ordinateur
- Formulaire de contact
- Hébergement, nom de domaine et HTTPS inclus
- 1 modification par mois

**Pro — 7,99 € TTC/mois** · *Formule la plus choisie*
*Pour présenter vos services en détail.*
- Site jusqu'à 3 pages
- Design premium personnalisé
- Galerie photos ou portfolio
- Carte Google Maps intégrée
- Optimisation SEO de base
- Hébergement, nom de domaine et HTTPS inclus
- 3 modifications par mois
- Support prioritaire

**Business — 11,99 € TTC/mois**
*Pour un site complet, avec blog.*
- Site jusqu'à 10 pages
- Design haut de gamme
- Blog intégré
- Animations et effets
- SEO avancé
- Statistiques de visite, sans cookie
- Hébergement, nom de domaine et HTTPS inclus
- Modifications illimitées **[À CONFIRMER]**
- Support prioritaire **[À CONFIRMER : la v2 annonçait « Support VIP 7j/7 »]**

Frais de mise en service : **50 € TTC**, facturés une seule fois avec la première mensualité. Ils couvrent la configuration technique, l'achat du nom de domaine et la mise en ligne.
Sans engagement : résiliation possible à tout moment avec un mois de préavis.

---

### Inclus dans chaque formule

- **Un design adapté à votre activité** : couleurs, typographies et mise en page choisies selon votre métier et votre image.
- **Votre nom de domaine** : achat, configuration et renouvellement pris en charge.
- **Hébergement** : votre site est hébergé sur une infrastructure rapide et fiable.
- **HTTPS** : certificat de sécurité inclus, indispensable pour la confiance des visiteurs et pour Google.
- **Maintenance** : mises à jour techniques et de sécurité prises en charge.
- **Modifications** : un texte, une photo ou des horaires à changer ? Envoyez votre demande par email, elle est traitée sous **[À CONFIRMER : 48 h ouvrées]**.
- **Un interlocuteur humain** : par email ou par téléphone, pas de chatbot.

---

### Comment ça se passe

1. **Votre demande** : décrivez votre activité et choisissez une formule via le formulaire de contact. Une réponse vous est apportée sous **[À CONFIRMER : 24 h ouvrées]**.
2. **Vos contenus** : vous transmettez vos textes, photos et logo s'il existe. Pas de contenus ? Une aide à la rédaction et des photos libres de droits peuvent être proposées.
3. **Création et validation** : un lien de prévisualisation vous est envoyé sous 48 à 72 h ouvrées après réception de tous les contenus. Vous demandez les ajustements souhaités.
4. **Paiement et mise en ligne** : après votre validation, vous recevez un lien de paiement sécurisé Stripe (abonnement + frais de mise en service). Le site est mis en ligne dès le paiement.

**Ensuite** : vos factures et votre moyen de paiement se gèrent dans le portail client Stripe, accessible depuis le lien « Gérer mon abonnement » en bas de chaque page. Vous pouvez aussi y résilier.

---

### Questions fréquentes

- **Puis-je changer de formule ?** Oui, à tout moment, en écrivant à LINSAEM. Le nouveau tarif s'applique à la mensualité suivante. **[À CONFIRMER]**
- **Que se passe-t-il si je résilie ?** Le site reste en ligne jusqu'à la fin de la période payée. Vos contenus (textes, images) vous sont remis sur demande. **[À CONFIRMER : le nom de domaine vous est-il transféré ?]**
- **Puis-je modifier mon site moi-même ?** Ce n'est pas nécessaire : les modifications incluses dans votre formule sont réalisées pour vous.
- **Le site est-il adapté aux mobiles ?** Oui, chaque site est conçu pour s'afficher correctement sur mobile, tablette et ordinateur.

---

### Prêt à lancer votre site ?

Décrivez votre activité en quelques lignes : vous recevez une réponse avec la formule la plus adaptée.

[Demander mon site] → `/contact?type=vitrine`

---

## 4. Texte de la page /developpement

**Meta title** : Développement web sur mesure : applications, SaaS, intégrations | LINSAEM
**Meta description** : Applications web, SaaS, outils temps réel et intégrations (paiement, API, emails), du cadrage à la maintenance. Projets sur devis.

---

### Développement web sur mesure

Applications web, SaaS, outils temps réel et intégrations : LINSAEM conçoit et développe des projets adaptés à votre besoin, du cadrage à la maintenance. Chaque projet fait l'objet d'un devis détaillé.

[Parler de mon projet] [Voir des exemples]

---

### Ce qui peut être développé

- **Applications web** : outils métier, tableaux de bord, back-offices, espaces clients ou partenaires.
- **SaaS** : un produit en ligne vendu par abonnement, avec comptes utilisateurs, formules et facturation récurrente.
- **Applications temps réel** : messagerie, notifications instantanées, suivi en direct, collaboration à plusieurs.
- **Intégrations** : paiement en ligne (Stripe), connexion à des API tierces, emails transactionnels, automatisations entre vos outils.

---

### Un process en cinq étapes

1. **Cadrage** : un échange pour comprendre votre besoin, vos utilisateurs, vos contraintes et vos délais. Il aboutit à un résumé écrit du périmètre et des priorités. **[À CONFIRMER : cadrage gratuit ?]**
2. **Devis** : un devis détaillé présente les fonctionnalités, le planning et le prix. Rien n'est engagé avant sa signature.
3. **Développement** : le projet avance par étapes. Une version de test en ligne vous permet de suivre l'avancement et d'ajuster au fil de l'eau.
4. **Mise en ligne** : déploiement, configuration du domaine, vérifications finales. Les accès et la documentation vous sont remis. **[À CONFIRMER : propriété du code source]**
5. **Maintenance** : corrections, mises à jour de sécurité et évolutions, dans le cadre d'un contrat de maintenance optionnel. **[À CONFIRMER : modalités, forfait mensuel ou à la demande]**

---

### Exemples de projets

*Produits conçus, développés et exploités par LINSAEM.*

- **cvuzz.com** : plateforme SaaS d'entretien vidéo différé pour les recruteurs. Le recruteur envoie ses questions, le candidat enregistre ses réponses en vidéo quand il le souhaite, le recruteur les évalue à son rythme.
- **cosmalian.com** : jeu de plateau économique sur le thème de l'espace, de 2 à 6 joueurs, directement dans le navigateur, sans installation ni inscription : on crée une partie et on partage le lien.

[Voir toutes les réalisations] → `/realisations`

---

### Technologies **[section optionnelle, À CONFIRMER]**

TypeScript, React, Next.js, Node.js, PostgreSQL, Stripe, Resend, hébergement Vercel. Le choix technique est fait selon le projet, et expliqué dans le devis.

---

### Questions fréquentes

- **Combien coûte un projet sur mesure ?** Cela dépend du périmètre. Le devis remis après le cadrage détaille le prix, fonctionnalité par fonctionnalité.
- **Combien de temps faut-il ?** De quelques semaines pour une intégration à plusieurs mois pour un SaaS complet. Le planning figure dans le devis.
- **Pouvez-vous reprendre un projet existant ?** Oui, après un audit du code existant, qui permet d'évaluer ce qui peut être conservé. **[À CONFIRMER]**
- **Les prix sont-ils HT ou TTC ?** **[À CONFIRMER : HT pour les professionnels ?]**

---

### Un projet en tête ?

Décrivez votre besoin en quelques lignes, même s'il n'est pas encore précis : le cadrage sert justement à le clarifier.

[Parler de mon projet] → `/contact?type=developpement`

---

## 5. Formulaire de contact (pour mémoire)

- **Champs** : type de projet (site vitrine / développement, prérempli par `?type=`), nom, email, téléphone (facultatif), formule (si site vitrine), message, plus un champ honeypot caché et le widget Turnstile.
- **Validation** : Zod côté serveur (longueurs, format email), puis vérification Turnstile, puis limite par IP.
- **Emails** : (1) alerte à LINSAEM avec toute la saisie, échappée par React Email ; (2) accusé de réception au visiteur avec un **texte fixe** (« Votre demande a bien été reçue, une réponse vous sera apportée prochainement »), sans aucun champ saisi.
- **RGPD** : la case à cocher est remplacée par une mention d'information (base légale : mesures précontractuelles) avec un lien vers `/confidentialite`. Les données restent uniquement dans votre boîte mail ; la politique l'indique.

---

## 6. Questions avant de coder

1. **Business** : garder « Modifications illimitées » et un support étendu (la v2 annonçait « VIP 7j/7 ») ? En solo, je conseille « Modifications mineures illimitées » et « Support prioritaire ».
2. **Délais** à afficher : réponse à une demande (24 h ouvrées ?), traitement d'une modification (48 h ouvrées ?).
3. **Frais de mise en service** : 50 € TTC fixes pour toutes les formules ? (La v2 disait « à partir de 50 € ».)
4. **Résiliation** : le nom de domaine est-il transféré au client ? Changement de formule possible ?
5. **Développement** : prix HT ou TTC ? Cadrage gratuit ? Qui est propriétaire du code livré ? Maintenance au forfait ou à la demande ?
6. **cvuzz.com et cosmalian.com** : une ou deux phrases sur chacun (ce que fait le produit, pour qui, 2-3 fonctionnalités notables).
7. **Section Technologies** sur /developpement : à garder ?
8. **Limite par IP** : Upstash Redis (compte gratuit à créer, 2 variables d'env) ou règle de rate limiting dans le pare-feu Vercel (aucun code, se règle dans le dashboard) ? Je recommande Upstash pour que la règle soit dans le code et testable.
9. **Comptes à me fournir au moment du déploiement** (pas maintenant) : clés Turnstile, URL du portail client Stripe, clé Resend.
10. **Ton** : la formulation impersonnelle (« LINSAEM conçoit… », « une réponse vous est apportée ») vous convient-elle ?
