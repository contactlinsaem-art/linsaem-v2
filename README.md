# linsaem.fr — v3

Site de LINSAEM : sites vitrines par abonnement et développement web sur mesure.
Next.js 16 (pages statiques), Tailwind CSS v4, déployé sur Vercel (région `cdg1`).

Pas de base de données, pas d'authentification, pas de code Stripe : les abonnements se gèrent dans le dashboard Stripe (liens de paiement envoyés à la main, portail client sans code).

## Démarrer

```bash
npm install
cp .env.example .env.local   # remplir les valeurs (voir ci-dessous)
npm run dev                  # http://localhost:3000
```

| Commande | Rôle |
|---|---|
| `npm run dev` | serveur de développement |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript |
| `npm run build` | build de production |
| `npm run test:e2e` | Playwright : formulaire de contact, redirections, SEO (sitemap, données structurées, images de partage), téléphones fictifs des modèles et audit d'accessibilité axe (WCAG AA) |

Première utilisation de Playwright : `npx playwright install chromium`.

## Modifier le contenu

Tout le texte métier vient de `src/content/` :

| Fichier | Contenu |
|---|---|
| `entreprise.ts` | coordonnées, mentions légales, délais affichés |
| `offres.ts` | formules, prix TTC, frais de mise en service, process, offre développement |
| `realisations.ts` | sites clients et applications développées, avec le contenu de leur page `/realisations/[slug]` (`publie: false` tant que le client n'a pas donné son accord) ; capture d'écran dans `src/assets/realisations/` |
| `modeles.ts` | collection actuelle (7 modèles, une route chacun dans `src/app/modeles/<slug>/`) et première collection (route `/modeles/[slug]`) ; le rendu de chacun est dans `src/components/modeles/` |
| `metiers.ts` | pages `/creation-site-internet/[metier]` : besoins, fonctionnalités, modèle et réalisation liés, FAQ |
| `blog/` | articles en MDX (`*.mdx`) et leur registre (`index.ts` : titre, description, date, `publie`) |
| `faq.ts` | FAQ de l'accueil, des sites vitrines et du développement (alimente aussi le JSON-LD) |

Un prix modifié dans `offres.ts` se répercute partout : cartes, CGV, JSON-LD, formulaire. Pensez à modifier le Price correspondant dans Stripe.

### Brouillons et publication

Les pages métiers et les articles ont un champ `publie`. Tant qu'il vaut `false`, la page est générée **en local et sur les previews Vercel** (bandeau « Brouillon », `noindex`), mais **jamais en production**, et elle n'apparaît pas dans le sitemap. Pour publier : passer `publie: true`, commiter, déployer.

Les articles renvoient vers des pages métiers : publiez-les ensemble.

### Images de partage (Open Graph)

Déclarées par `pageMetadata()` (`src/lib/seo.ts`), en URL absolue, pour `og:image` et `twitter:image` :

| Pages | Image |
|---|---|
| accueil et pages générales | `/og.png`, image générale générée au build (`src/lib/image-partage.tsx`, police DM Sans dans `src/assets/fonts/`) |
| pages métiers, articles | image générale avec le titre de la page : `/og/creation-site-internet/<slug>.png`, `/og/blog/<slug>.png` |
| réalisations | capture du site (`apercu` dans `realisations.ts`) |
| modèles | capture de la page du modèle (`apercu` dans `modeles.ts`) |

Une page qui définit `openGraph` remplace entièrement celui du layout : passez toujours par `pageMetadata()`. `tests/partage.spec.ts` vérifie chaque page.

### Vignettes des modèles

Les vignettes de la collection actuelle et les images de partage de tous les modèles (`src/assets/modeles/apercus/`) sont des captures des pages. Après une modification visuelle d'un modèle :

```bash
npm run build && npx next start --port 3100   # dans un terminal
node scripts/apercus-modeles.mjs              # dans un autre
```

Chaque modèle de la collection actuelle a sa propre route : `next/font` rattache les polices à la route, une route commune ferait précharger les polices de tous les modèles sur chaque page.

## Formulaire de contact

`src/app/(site)/contact/actions.tsx` (Server Action), dans cet ordre :
champ piège → validation Zod → Cloudflare Turnstile → email à LINSAEM (Resend) → accusé de réception au visiteur, au **texte fixe** (aucune saisie recopiée).

`CONTACT_DRY_RUN=1` désactive Turnstile et l'envoi (tests). Ce mode ne s'active jamais sur Vercel.

## Variables d'environnement (Vercel → Settings → Environment Variables)

| Variable | Usage |
|---|---|
| `RESEND_API_KEY` | envoi des emails |
| `RESEND_FROM_EMAIL` | expéditeur (domaine vérifié dans Resend) |
| `RESEND_TO_EMAIL` | destinataire des demandes |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY` | Cloudflare Turnstile |
| `STRIPE_PORTAL_URL` | lien « Factures et résiliation » (pied de page, CGV, page Sites vitrines) : factures et résiliation en ligne pour les clients (lu au build) |

À activer dans le dashboard Vercel : **Web Analytics** (mesure d'audience sans cookie).

## Redirections

Dans `next.config.ts` (vérifiées par `tests/redirections.spec.ts`) : `/demos` et `/demos/<modèle>` → `/modeles…` (301) ; `/login`, `/register` et `/dashboard/*` → accueil ; `/politique-de-confidentialite` → `/confidentialite` ; anciennes routes v2 (`/admin`, `/set-password`…) ; pages `.html` de la v1 (`/index.html` → accueil, 301) ; anciens slugs des modèles renommés (301).

Les noms des modèles doivent être manifestement fictifs : avant d'en créer ou d'en renommer un, vérifier qu'aucune entreprise ne le porte (annuaire-entreprises.data.gouv.fr et recherche web). Téléphones dans les plages réservées à la fiction par l'ARCEP, emails en `.example`, adresses inexistantes.
