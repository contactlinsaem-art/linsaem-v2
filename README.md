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
| `npm run test:e2e` | Playwright : formulaire de contact + audit d'accessibilité axe (WCAG AA) sur toutes les pages |

Première utilisation de Playwright : `npx playwright install chromium`.

## Modifier le contenu

Tout le texte métier vient de `src/content/` :

| Fichier | Contenu |
|---|---|
| `entreprise.ts` | coordonnées, **mentions légales `[À REMPLIR]`**, délais affichés |
| `offres.ts` | formules, prix TTC, frais de mise en service, process, offre développement |
| `realisations.ts` | sites clients (`publie: false` tant que le client n'a pas donné son accord) et produits LINSAEM |
| `modeles.ts` | les 7 modèles de design (le rendu de chacun est dans `src/components/modeles/`) |
| `faq.ts` | FAQ de l'accueil, des sites vitrines et du développement (alimente aussi le JSON-LD) |

Un prix modifié dans `offres.ts` se répercute partout : cartes, CGV, JSON-LD, formulaire. Pensez à modifier le Price correspondant dans Stripe.

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
| `STRIPE_PORTAL_URL` | lien « Factures et résiliation » (pied de page, CGV, page Sites vitrines) : résiliation en ligne obligatoire pour les particuliers (lu au build) |

À activer dans le dashboard Vercel : **Web Analytics** (mesure d'audience sans cookie).

## Redirections

Dans `next.config.ts` (vérifiées par `tests/redirections.spec.ts`) : `/demos` et `/demos/<modèle>` → `/modeles…` (301) ; `/login`, `/register` et `/dashboard/*` → accueil ; `/politique-de-confidentialite` → `/confidentialite` ; anciennes routes v2 (`/admin`, `/set-password`…) et pages `.html` de la v1.
