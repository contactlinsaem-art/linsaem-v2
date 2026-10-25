# Audit technique — www.linsaem.fr (linsaem-v2)

> Date : 25/10/2026 — Phase 1, audit seul : aucun fichier existant n'a été modifié.
> Périmètre : dépôt `linsaem-v2` (branche `main`, dernier commit `494c198`), 90 fichiers suivis, ~7 700 lignes dans `src/`.
> Méthode : lecture de tout le code applicatif, `npm audit`, `npm outdated`, `tsc --noEmit`, scan de l'historique git à la recherche de secrets.
> Pas de test sur le site en production ni sur le dashboard Stripe/Vercel : les points qui en dépendent sont marqués **[à vérifier]**.
>
> **Mise à jour du 25/10/2026 : les décisions prises après l'audit sont en [§11](#11-décisions-et-plan-révisé). Elles remplacent les §8 et §9 là où elles divergent.**

---

## 0. Résumé

Le site marche visiblement pour le visiteur. En revanche, l'espace client et l'intégration Stripe ont des **failles de sécurité** et des **bugs fonctionnels** qui faussent probablement les données affichées aux clients (formule, factures).

Les 5 points les plus urgents :

1. **Le formulaire de contact peut servir à envoyer des emails piégés depuis `contact@linsaem.fr`** vers n'importe quelle adresse. Le HTML n'est pas échappé et il n'y a ni anti-spam ni limite de débit (§5).
2. **Le portail de facturation Stripe s'ouvre avec un `customerId` envoyé par le navigateur.** Un client connecté peut viser le compte Stripe d'un autre client (§4).
3. **Next.js 15.5.15 a une faille critique et plus de 20 avis de sécurité** (contournement du middleware, RCE dans l'optimiseur d'images, empoisonnement de cache…). La mise à jour corrective est dans la même branche (§1).
4. **Le webhook Stripe ne fonctionne pas correctement avec les Payment Links** : formule enregistrée par défaut à « starter », factures jamais enregistrées, doublons en cas de nouvel essai de Stripe (§6).
5. **Mentions légales non conformes** : le site dit « entreprise individuelle » alors que la société est une SASU. Capital, RCS/SIREN, siège, directeur de publication et médiateur de la consommation manquent (§5 et §8).

---

## 1. Stack détectée

### 1.1 Framework et outils

| Élément | Version installée | Remarque |
|---|---|---|
| Next.js (App Router) | 15.5.15 | Dernière 15.x = 15.5.28, dernière majeure = 16.4.3 |
| React / React DOM | 19.2.5 | 19.3.1 disponible |
| TypeScript | 6.0.3 | `strict: true`, `tsc --noEmit` **passe sans erreur** |
| Tailwind CSS | 3.4.17 | **`@tailwindcss/postcss` 4.2.4 est aussi installé** mais pas utilisé (`postcss.config.mjs` utilise le plugin v3) |
| Base de données | Neon Postgres via `@neondatabase/serverless` 0.10.4 | SQL brut en tagged templates (requêtes paramétrées, donc pas d'injection SQL), aucun ORM, aucune migration |
| Auth | Maison : `bcryptjs` + `jsonwebtoken` (côté serveur) + `jose` (dans le middleware) | Deux librairies JWT pour la même chose |
| Paiement | `stripe` 22.1.0 (serveur), `@stripe/stripe-js` 9.3.1 | `@stripe/stripe-js` **jamais importé** |
| Emails | `resend` 6.1.3 | Templates HTML écrits à la main dans `src/lib/emails.ts` |
| Icônes / dates | `lucide-react` 1.9.0, `date-fns` 4.1.0 | OK |
| `clsx` | 2.1.1 | **Jamais importé** |
| Node local | 22.15.0 | — |

### 1.2 Hébergement et build

- **Vercel** (`.vercel/project.json` : projet `linsaem-v2`), déploiement depuis GitHub `contactlinsaem-art/linsaem-v2`.
- Build : `next build` standard. Pas de `vercel.json`, donc les fonctions tournent dans la région par défaut (`iad1`, USA) **[à vérifier]**. Si la base Neon est en UE, chaque requête fait l'aller-retour de l'Atlantique.
- Pas de CI, pas de tests, pas de lint configuré (`next lint` est déclaré mais il n'y a pas de config ESLint et le script est déprécié dans Next 15.5+).
- `tsconfig.tsbuildinfo` et `next-env.d.ts` sont suivis par git (le premier ne devrait pas l'être).
- Pas de dossier `public/`.

### 1.3 Dépendances vulnérables (`npm audit`)

**8 vulnérabilités : 1 critique, 5 hautes, 2 modérées.** Toutes ont un correctif via `npm audit fix` (mises à jour sans changement de majeure).

| Paquet | Sévérité | Résumé |
|---|---|---|
| `next` ≤ 16.3.0-preview | **critique** | Une vingtaine d'avis, dont : contournement du middleware par injection de paramètre de route et par routes de prefetch (GHSA-492v, GHSA-267c), RCE non authentifiée dans l'Image Optimization API avec SVG/AVIF (GHSA-2464, GHSA-2xp9), empoisonnement de cache RSC, DoS via Server Actions, divulgation des endpoints de Server Functions |
| `postcss` ≤ 8.5.22 | haute | XSS via `</style>`, lecture de fichiers via sourceMappingURL |
| `sharp` ≤ 0.35.5 | haute | CVE libvips / libheif / librsvg (utilisé par `next/image`) |
| `browserslist`, `nanoid`, `source-map-js` | haute | DoS / outillage de build |
| `postcss-selector-parser`, `baseline-browser-mapping` | modérée | DoS |

Le contournement du middleware est **directement pertinent** ici : la protection de `/dashboard` et `/admin` repose en premier sur `src/middleware.ts`.

### 1.4 Dépendances obsolètes (`npm outdated`) — extrait utile

`@neondatabase/serverless` 0.10.4 → 1.2.0 (majeure), `resend` 6.1.3 → 6.34.1, `lucide-react` 1.9 → 1.61, `stripe` 22.1 → 22.6 (23.0 en majeure), `tailwindcss` 3.4 → 4.3 (majeure), `next` 15.5 → 16.4 (majeure).

### 1.5 Secrets et variables d'environnement

- **Aucun secret dans l'historique git** (scan de `git log -p` à la recherche de `sk_live`, `re_…`, `whsec_…`, `npg_…`, JWT). `.env.local` est bien ignoré par git et n'a jamais été commité. ✅
- Le `.env.local` local contient les identifiants **de la base Neon (récupérés via `vercel env pull`, donc probablement la base de production)**, un `VERCEL_OIDC_TOKEN`, la clé Resend et `JWT_SECRET`. Le développement local tourne donc probablement **sur les données de production** **[à vérifier]**.
- Absents du `.env.local` alors que le code les utilise : `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_*_PRICE_ID`, `NEXT_PUBLIC_APP_URL`, `NEXT_PUBLIC_BASE_URL` **[à vérifier sur Vercel]**.
- **`NEXT_PUBLIC_BASE_URL` n'est défini nulle part** (ni `.env.example`, ni `.env.local`) mais il sert aux liens des emails de messagerie (`src/app/api/messages/route.ts:29`, `src/app/api/admin/messages/route.ts:54`). Ces liens donnent probablement `undefined/dashboard/messages`.
- Variables présentes mais inutilisées : `AUTH_SECRET`, `NEON_AUTH_BASE_URL`, `VITE_NEON_AUTH_URL`, les variables `AUTH_GOOGLE_*` de `.env.local.example` (vestiges d'Auth.js).
- `src/lib/stripe.ts:4` et `src/lib/emails.ts:3` remplacent silencieusement les clés manquantes par `"sk_test_placeholder"` et `"placeholder"`. Une variable oubliée en prod ne fait pas planter le build : elle produit des erreurs à l'exécution.

---

## 2. Arborescence des routes et des composants

### 2.1 Routes

```
/                              page.tsx (marketing, une seule page longue)
/demos/{vitrine,boulangerie,artisan,architecte,photographe,restaurant,coach}
                               7 démos, chacune 100 % "use client" (200–580 lignes)
/cgv  /mentions-legales  /politique-de-confidentialite   (noindex)
/merci                         confirmation du formulaire de contact (noindex)
/login                         connexion espace client
/forgot-password               page statique « écrivez-nous » (pas de vrai reset)
/set-password?token=           création du mot de passe (lien envoyé par email)
/dashboard                     tableau de bord client
  /abonnement /site /modifications /messages /profil
/admin                         (pas de page index → 404)
  /clients  /clients/create  /clients/[id]  /messages
  /sites                       ⚠ lien dans la sidebar, page inexistante → 404
/api/contact                   POST  formulaire → 2 emails Resend
/api/auth/{login,logout,set-password,change-password}
/api/messages                  GET/POST messagerie client
/api/modifications             POST (doublon de la Server Action, voir 2.3)
/api/profil                    PATCH
/api/stripe/checkout           POST  ⚠ aucune page ne l'appelle
/api/stripe/webhook            POST
/api/admin/{clients,messages,site}
/sitemap.xml /robots.txt /icon.svg
```

Redirections 301 dans `next.config.ts` pour les anciennes URL `.html` de la v1 (toutes vers `/`, y compris un ancien fichier de vérification Google `google3aff1cbc17bc310f.html`, à confirmer si la Search Console l'utilise encore).

### 2.2 Composants (`src/components/marketing/`)

Navbar, Hero, ComparisonBanner, FeaturesStrip, Pricing, Sections (Services + Included + HowItWorks), Portfolio, Testimonials, CTABanner, FAQ, ContactForm, Footer, BackToTop, FloatingCTA, CookieBanner, CookieReset.

Il n'y a **aucun composant partagé** pour l'espace client ou l'admin (boutons, champs, badges, sidebar) : tout est recopié page par page.

### 2.3 Code dupliqué

| Quoi | Où |
|---|---|
| `getDb()` (connexion Neon) | `lib/db.ts`, `api/auth/change-password`, `api/stripe/webhook`, plus un `neon(...)` inline dans `api/admin/clients` |
| `verifyAdmin()` | recopiée dans les 3 routes `api/admin/*` ; vérifiée aussi dans `admin/layout.tsx` |
| Grille tarifaire (5,99 / 7,99 / 11,99) | **25 occurrences** : `Pricing.tsx`, `Footer.tsx`, `ContactForm.tsx` (options), `layout.tsx` (2 blocs JSON-LD), `cgv`, `lib/db.ts` (`FORMULES`), `lib/stripe.ts` (`PLANS`), `api/admin/clients` (`PRIX`), démos, metas |
| Lien Stripe des frais de mise en service `buy.stripe.com/4gM4…` | 3 fois en dur (`Pricing`, `cgv`, `dashboard/abonnement`) |
| Téléphone `+33 6 25 73 43 35` | 9 fois en dur (composants + emails + JSON-LD) |
| Création d'une demande de modification | Server Action dans `dashboard/modifications/page.tsx` **et** route `api/modifications` |
| Libellés et couleurs des statuts (site, modif, facture) | `dashboard/page.tsx`, `dashboard/site`, `admin/clients/[id]`, `admin/clients` |
| Logo « L » en dégradé | login, set-password, forgot-password, dashboard layout, 7 templates d'email |
| Squelette HTML des emails | 7 templates de ~50 lignes quasi identiques |

### 2.4 Code mort ou cassé

- `src/app/images/*.jpg` (4 photos, ~300 Ko) : jamais importées. Les mêmes photos sont chargées depuis Unsplash.
- `/api/stripe/checkout`, `createCheckoutSession`, `PLANS` (avec des mentions « engagement 24 mois / 12 mois » qui **contredisent** les CGV « sans engagement ») : jamais appelés depuis l'interface.
- `export const stripe = getStripe()` (`lib/stripe.ts:10`) : jamais utilisé, instancie Stripe au chargement du module.
- `SCHEMA` (`lib/db.ts:12`) : du SQL dans une constante, jamais exécuté. C'est de la documentation, pas une migration.
- `/register` dans le matcher du middleware : la route n'existe pas.
- `/admin/sites` dans la navigation admin : page inexistante.
- **Lien d'activation cassé** : `api/admin/clients/route.ts:69` envoie `/auth/set-password?token=…`, mais la page est `/set-password`. Les clients créés à la main reçoivent un lien en 404.
- `Services.tsx`, `Included.tsx`, `HowItWorks.tsx` : fichiers d'une ligne qui ré-exportent `Sections.tsx`.
- Dépendances inutiles : `clsx`, `@stripe/stripe-js`, `@tailwindcss/postcss`. Les `@types/*` et `typescript` sont dans `dependencies` au lieu de `devDependencies`.
- `README.md` obsolète : il décrit Auth.js v5, Google OAuth et Vercel Postgres, rien de tout ça n'est utilisé.
- `.gitignore` contient des doublons (`.env.local` / `.env*.local`, `.vercel/` / `.vercel`).

---

## 3. Qualité du code

**Points positifs** : TypeScript strict qui compile sans erreur, requêtes SQL paramétrées, App Router utilisé de façon cohérente, découpage `lib/` lisible, Server Components pour les pages du dashboard.

**À reprendre** :

- **Typage de façade** : les lignes SQL reviennent en `Record<string, any>` (Neon sans ORM). Les champs se lisent sans contrôle (`client.statut`, `f.montant`), ce qui a déjà produit des bugs :
  - `admin/clients/page.tsx:48` lit `client.statut` alors que la requête renvoie `abonnement_statut`, donc la colonne Statut affiche toujours « — ».
  - `admin/clients/[id]/page.tsx:64` affiche `f.montant / 100` alors que le montant est **déjà stocké en euros** (`webhook/route.ts:121`) : une facture de 7,99 € s'affiche « 0,08 € ».
  - `getAllClients()` fait un `LEFT JOIN abonnements` sans filtre : un client avec 2 abonnements (cas fréquent, voir §6) apparaît 2 fois.
- **Aucune validation des entrées** (pas de Zod ni équivalent). Les `req.json()` sont déstructurés et passés tels quels à la base ou aux emails. `priorite`, `statut` et `url` acceptent n'importe quelle chaîne, sans limite de longueur.
- **Pas de couche d'accès aux données ni d'autorisation centralisée** : chaque page ou route refait `getSession()` et sa propre vérification admin.
- **Erreurs avalées** : `.catch(() => [])` et `.catch(() => null)` partout. Une panne de base affiche « Aucun abonnement » au client au lieu d'une erreur, sans aucun log.
- **Composants trop gros** : `demos/vitrine/page.tsx` (582 lignes), `demos/coach` (286), `admin/clients/create` (272), `dashboard/profil` (216), `lib/emails.ts` (445 lignes de HTML dans des template strings).
- **Styles** : Tailwind utilisé sans design system. Les longues classes d'input sont recopiées environ 25 fois. Les démos mélangent Tailwind et des `style={{…}}` inline volumineux. Les dégradés sont définis à la fois dans `tailwind.config.ts`, `globals.css` et inline.
- **Police probablement cassée [à vérifier visuellement]** : `tailwind.config.ts` définit `font-sans: var(--font-dm-sans)`, mais cette variable n'est définie nulle part (les polices viennent d'un `<link>` Google Fonts, pas de `next/font`). La classe `font-sans` sur `<body>` l'emporte sur la règle `body { font-family: 'DM Sans' }` de `globals.css`. Le navigateur risque donc de retomber sur la police par défaut.
- **Contenu en dur** : tarifs, téléphone, liens Stripe, textes, FAQ, témoignages et « © 2025 » dans les emails sont codés en dur dans les composants. Changer un prix demande de modifier une dizaine de fichiers, avec un vrai risque d'incohérence légale (un prix affiché différent du prix facturé).
- **Pas de migrations** : le schéma évolue par des `ALTER TABLE … IF NOT EXISTS` à coller à la main dans la console Neon.
- **Pas de contraintes métier en base** : pas d'`UNIQUE` sur `abonnements.stripe_subscription_id` ni sur `sites.client_id`, pas d'`enum`/`CHECK` sur les statuts, `TIMESTAMP` sans fuseau horaire.
- `scripts/seed-test.js` crée par défaut `test@linsaem.fr` / `password123` dans la base pointée par `.env.local`, donc **probablement la production [à vérifier : ce compte existe-t-il en base ?]**.

---

## 4. Espace client et authentification

### 4.1 Fonctionnement actuel

1. Un client est créé soit **par le webhook Stripe** (`customer.subscription.created`), soit **à la main par l'admin** (`/admin/clients/create`).
2. Un `reset_token` (UUID v4, valable 7 jours) est généré et envoyé par email. Sur `/set-password`, le client choisit un mot de passe (bcrypt, coût 12), le token est effacé et une session est ouverte.
3. Session = JWT HS256 signé avec `JWT_SECRET`, contenant `{clientId, name, email}`, valable 7 jours, dans le cookie `linsaem_session` (`httpOnly`, `secure` en prod, `SameSite=Lax`).
4. `middleware.ts` vérifie la **signature** du JWT sur `/dashboard/*` et `/admin/*`. Chaque page du dashboard rappelle `getSession()`. Le rôle admin se réduit à `session.email === process.env.ADMIN_EMAIL`, vérifié dans `admin/layout.tsx` et dans chaque route `api/admin/*`.

### 4.2 Problèmes

| # | Sévérité | Problème | Emplacement |
|---|---|---|---|
| A1 | **Critique** | **Faille d'accès au portail de facturation (IDOR)** : la Server Action `openBillingPortal` prend le `customerId` dans un champ caché du formulaire et ouvre un portail Stripe pour **ce** client, sans vérifier qu'il appartient à la session (ni même qu'il y a une session). N'importe quel client connecté peut appeler l'action avec un autre `cus_…` et voir ses factures et son adresse, changer sa carte ou résilier son abonnement. Les `cus_…` sont difficiles à deviner, ce qui limite l'exploitation, mais la faille de conception reste. | `dashboard/abonnement/page.tsx:20-29` |
| A2 | **Critique** | Next.js vulnérable au **contournement du middleware** (§1.3). Le middleware est la première barrière de `/dashboard` et `/admin`. | `package.json` |
| A3 | Important | **Pages admin protégées seulement par le layout.** `admin/clients/page.tsx` et `admin/clients/[id]/page.tsx` lisent toute la base sans vérifier la session elles-mêmes. La doc Next.js déconseille explicitement de ne vérifier l'accès que dans un layout (rendu partiel). Le middleware, lui, ne contrôle que « connecté », pas « admin ». | `admin/**` |
| A4 | Important | **Aucune limite de tentatives** sur `/api/auth/login`, `/api/auth/set-password` et `/api/auth/change-password` : le brute-force est illimité. | `api/auth/*` |
| A5 | Important | **Aucune révocation de session** : changer son mot de passe ne déconnecte pas les autres sessions. Un JWT volé reste valable 7 jours. La déconnexion se contente de vider le cookie. | `lib/auth.ts` |
| A6 | Important | **Pas de vrai « mot de passe oublié »** : la page demande d'écrire un email, et le reset se fait à la main. | `forgot-password/page.tsx` |
| A7 | Important | Lien d'activation cassé (`/auth/set-password`), voir §2.4. De plus, le webhook **régénère** le `reset_token` au paiement, ce qui invalide le premier lien. Le client reçoit donc jusqu'à 3 emails avec des liens différents. | `api/admin/clients:69`, `webhook:72` |
| A8 | Important | Rôle admin = comparaison d'email avec une variable d'env. Pas de colonne `role`, pas de 2FA. Le compte admin est une ligne de la table `clients` comme les autres. | `api/admin/*` |
| A9 | Confort | `name` et `email` dans le JWT : un changement de nom via `/api/profil` n'apparaît qu'à la reconnexion. | `lib/auth.ts:37` |
| A10 | Confort | Politique de mot de passe minimale (8 caractères, pas de vérification contre les mots de passe compromis). Le token de reset est stocké en clair en base (un hash suffit). | `api/auth/*`, `lib/db.ts` |
| A11 | Confort | CSRF : `SameSite=Lax` et les POST en JSON bloquent l'essentiel, mais il n'y a pas de vérification `Origin` ni de `Content-Type` sur les routes API. | `api/**` |
| A12 | Confort | Espace client et admin **inutilisables sur mobile** : sidebar fixe de 256 px et `ml-64` sans breakpoint. | `dashboard/layout.tsx`, `admin/layout.tsx` |

**Validation côté serveur** : partielle. Les champs obligatoires sont vérifiés à la main, mais sans types, longueurs ni formats (email, URL). `admin/site` accepte n'importe quel `statut` et n'importe quelle `url`, qui est ensuite rendue en `href` côté client et dans un email.

**Secrets exposés côté client** : aucun. Seule `NEXT_PUBLIC_APP_URL` est publique, ce qui est normal. ✅

---

## 5. Formulaire de contact

**Trajet des données** : `ContactForm.tsx` → `POST /api/contact` → deux emails Resend en parallèle :
(a) une alerte « nouveau lead » vers `RESEND_TO_EMAIL`, (b) un **accusé de réception envoyé à l'adresse saisie par le visiteur**.
Rien n'est stocké en base : la seule trace est la boîte mail.

| # | Sévérité | Problème |
|---|---|---|
| C1 | **Critique** | **Injection HTML dans des emails envoyés à une adresse libre.** `name` et `formule` sont insérés sans échappement dans le HTML de l'accusé de réception (`lib/emails.ts:35,47`), envoyé à **n'importe quel `email` fourni**. Un robot peut donc expédier en masse depuis `contact@linsaem.fr` (domaine authentifié SPF/DKIM) des emails contenant ses propres liens et son propre texte (« Merci <a href=phishing>…</a> »). Conséquences : réputation du domaine détruite, compte Resend suspendu, image de marque atteinte. Même défaut dans l'alerte interne (`message`, `phone` injecté dans `href="tel:…"`) et dans les emails de messagerie (`contenu`). |
| C2 | **Critique** | **Aucun anti-spam** : ni honeypot, ni captcha (Turnstile…), ni limite de débit, ni limite de taille. Chaque requête coûte 2 emails sur le quota Resend. |
| C3 | Important | **Validation serveur minimale** : seuls `name` et `email` sont exigés, sans vérifier le format de l'email ni les longueurs. `formule` est un texte libre. |
| C4 | Important | **Consentement RGPD seulement côté navigateur** : la case `rgpd` est `required` en HTML, mais sa valeur n'est pas envoyée au serveur ni conservée (aucune preuve du consentement). Pour une demande de devis, la base légale correcte est d'ailleurs plutôt **les mesures précontractuelles (art. 6.1.b)** : une simple mention d'information suffit, la case n'est pas nécessaire. À clarifier dans la politique. |
| C5 | Important | **Durée de conservation** : la politique annonce « 3 ans après le dernier contact », mais les données ne vivent que dans la boîte mail, sans purge. La durée annoncée n'est pas appliquée techniquement. |
| C6 | Confort | Si l'envoi de l'accusé de réception échoue (adresse invalide), toute la requête renvoie 500 et le visiteur voit « erreur » alors que le lead a été transmis. Il faudrait `Promise.allSettled` et prioriser l'alerte interne. |
| C7 | Confort | Les `<label>` ne sont pas reliés aux champs (pas de `htmlFor`/`id`), voir §7. |

**RGPD hors formulaire** :

- **Google Analytics** : le script `gtag.js` est chargé **avant tout consentement** (Consent Mode « avancé »), donc des requêtes partent vers Google même en cas de refus. La CNIL considère que ce mode reste soumis au consentement. Seul `analytics_storage` est déclaré : `ad_storage`, `ad_user_data` et `ad_personalization` ne sont pas initialisés à `denied`.
- **Bug** : le consentement n'est **pas réappliqué au chargement suivant**. `gtag('consent','update',…)` n'est appelé qu'au clic sur « Accepter ». Pour un visiteur qui a déjà accepté, GA reste en `denied` sur toutes les visites suivantes, donc les statistiques sont sous-évaluées.
- La politique annonce des cookies valables « 13 mois maximum » mais le tableau indique `_ga` « 2 ans ». C'est incohérent et non conforme à la recommandation CNIL (13 mois).
- **Google Fonts chargé depuis les serveurs de Google** : l'IP du visiteur est transmise à Google sans consentement (le tribunal de Munich a sanctionné ce cas en 2022). Ce n'est pas mentionné dans la politique.
- **Images Unsplash chargées directement** (démos) : l'IP est transmise à Unsplash, non mentionné.
- Politique : la base légale de chaque traitement manque, ainsi que le cadre des transferts hors UE (DPF / clauses contractuelles types), le cookie de session `linsaem_session` (exempté de consentement mais à mentionner) et l'identité complète du responsable de traitement (raison sociale de la SASU, siège).
- **Mentions légales (LCEN art. 6-III)** : « LINSAEM, entreprise individuelle » est inexact pour une SASU. Manquent : forme sociale, capital, RCS + SIREN, siège social, n° de TVA intracommunautaire, directeur de la publication, et l'adresse complète de l'hébergeur est à jour à vérifier.
- **CGV** : pas de **médiateur de la consommation** (obligatoire en B2C, art. L612-1). L'article cité pour la rétractation (L.221-28 = exceptions) est à revoir : pour un service, le droit de rétractation relève de L.221-18, et l'exécution avant la fin du délai demande une demande expresse (L.221-25). Il manque aussi le modèle de formulaire de rétractation. Points à faire valider par un juriste, l'audit ne remplace pas un avis juridique.
- **Témoignages [à confirmer]** : les 3 témoignages (« Marie Dubois, marie-boulangerie.fr »…) ressemblent à des exemples fictifs. S'ils ne sont pas réels, c'est une **pratique commerciale trompeuse** (art. L121-4 du Code de la consommation). Même remarque pour « 0 € frais cachés » (Hero) alors qu'il existe 50 € de frais de mise en service, et pour « 2× moins cher que les offres du marché ».

---

## 6. Intégration Stripe

### 6.1 Ce qui est réellement utilisé

| Mécanisme | Utilisé ? | Où |
|---|---|---|
| **Payment Links** d'abonnement (`STRIPE_LINK_STARTER/PRO/BUSINESS`) | **Oui**, envoyés dans l'email d'activation créé par l'admin | `api/admin/clients` |
| Payment Link des frais de mise en service (`buy.stripe.com/4gM4…`, en dur) | Oui, sur la home, dans les CGV et le dashboard | 3 fichiers |
| Stripe Checkout (`/api/stripe/checkout`) | **Non**, code présent mais aucun bouton ne l'appelle | `lib/stripe.ts` |
| Customer Portal | Oui, depuis `/dashboard/abonnement` (avec la faille A1) | |
| Webhook `/api/stripe/webhook` | Oui : signature vérifiée ✅, `req.text()` brut ✅ | |

Parcours réel : visiteur → formulaire de contact → échange manuel → l'admin crée le client → email avec Payment Link → paiement → webhook. Sur la home, les boutons « Choisir Starter/Pro/Business » mènent tous à `#contact`.

### 6.2 Problèmes du webhook

| # | Sévérité | Problème |
|---|---|---|
| S1 | **Critique** | **Payment Links ⇒ pas de `metadata`.** `subscription.metadata.planName` et `clientId` sont vides. Résultat : la formule est enregistrée en **`"starter"` par défaut** pour tout le monde (`webhook:58`), et le dashboard d'un client Pro ou Business affiche « Starter 5,99 € ». |
| S2 | **Critique** | **Les factures ne sont probablement jamais enregistrées.** `invoice.metadata.clientId` est vide pour les factures d'abonnement : les metadata de l'abonnement ne sont pas recopiées sur la facture, qu'il s'agisse de Payment Link ou de Checkout. La table `factures` reste donc vide **[à vérifier en base]**. |
| S3 | **Critique** | **Pas d'idempotence.** `INSERT INTO abonnements … ON CONFLICT DO NOTHING` sans contrainte `UNIQUE`, donc sans effet. Les emails partent **avant** la réponse 200. Si Resend est lent ou en échec, Stripe renvoie l'événement : abonnement en double, nouveau token et emails de bienvenue renvoyés. Les événements traités ne sont pas enregistrés (`event.id`). |
| S4 | Important | **Cycle de vie incomplet** : `customer.subscription.updated` n'est pas traité (impayé `past_due`/`unpaid`, `cancel_at_period_end`, changement de formule), ni `checkout.session.completed`. Seule la suppression passe le statut à `resilie`. Un client en défaut de paiement reste « Actif ». |
| S5 | Important | **Doublons d'abonnement pour les clients créés à la main** : l'admin insère un abonnement `en_attente`, puis le webhook en ajoute un second `actif`. Le premier reste orphelin (et le client est dupliqué dans la liste admin, §3). |
| S6 | Important | **Frais de mise en service non rattachés** : un Payment Link séparé, payé indépendamment, sans lien avec le client en base ni avec l'abonnement. Rien ne permet de savoir dans l'app qui les a payés. |
| S7 | Important | Prix codés en dur dans l'app (`FORMULES`, `PRIX`) **indépendamment des Prices Stripe** : si un prix change dans Stripe, l'app affiche toujours l'ancien. |
| S8 | Confort | Le webhook appelle `stripe.customers.retrieve` (requête réseau) et `getStripe()` deux fois. `payment_method_types: ['card']` empêche SEPA et les moyens de paiement dynamiques. |

---

## 7. Performance, SEO technique et accessibilité

### 7.1 Performance

- **Polices** : `<link>` Google Fonts bloquant le rendu (5 graisses DM Sans + 2 JetBrains Mono, cette dernière quasi inutilisée), au lieu de `next/font`, qui héberge les fichiers localement et évite le décalage de mise en page.
- **JS client** : la home est un Server Component, mais 8 de ses composants sont `"use client"` (Navbar, FeaturesStrip, Portfolio, FAQ, ContactForm, FloatingCTA, BackToTop, CookieBanner). Les **7 démos sont entièrement client** (`setInterval`, écouteurs `scroll`/`mousemove`), donc rien n'est pré-rendu de façon utile pour le SEO et tout le JS est envoyé.
- **Images** : `Portfolio` utilise `next/image` ✅ mais avec des sources Unsplash distantes. Les démos utilisent `<img>` sans `width`/`height` ni `loading="lazy"`, en 600 à 1 200 px depuis Unsplash, ce qui provoque des décalages de mise en page et un LCP lent. 4 JPG locaux inutilisés.
- `gtag.js` est chargé en `<script async>` dans `<head>` sur toutes les pages, y compris le dashboard et l'admin.
- Le dashboard est entièrement dynamique (cookies), ce qui est normal. En revanche `getSession()` est appelé dans le layout **et** dans chaque page, et `getUnreadCount` est exécuté deux fois sur `/dashboard`.
- Les animations (`.stagger > * { opacity: 0 }`) ne respectent pas `prefers-reduced-motion`.

### 7.2 SEO technique

| Point | État |
|---|---|
| `<title>` / description | Définis sur la home et les pages légales ✅. **Absents des démos** : une page `"use client"` ne peut pas exporter `metadata`, donc les 7 démos héritent du titre de la home. |
| **Canonical** | **Défini dans le layout racine** (`alternates.canonical = "https://www.linsaem.fr"`) donc **hérité par toutes les pages** : chaque démo se déclare doublon de la home. |
| Open Graph | `og-image.jpg` déclarée, mais **le fichier n'existe pas** (pas de `public/`), donc aperçu cassé sur les réseaux sociaux et messageries. |
| `sitemap.xml` | Contient uniquement `/` et les 3 pages légales, qui sont pourtant **`noindex`** (contradiction). Les **démos sont absentes**. `lastModified` = date du build. |
| `robots.txt` | OK sur le fond. `/admin` et `/set-password` ne sont pas exclus (ils redirigent, l'impact est faible). La directive `host` n'est pas standard. |
| Données structurées | `Organization` avec une propriété `offers`, invalide sur ce type (`makesOffer` ou `Service` attendus). Logo en SVG de 32 px, alors que Google demande une image raster d'au moins 112 px. Liens `sameAs` Facebook/Instagram/LinkedIn **[à vérifier : existent-ils ?]**. Pas de `ProfessionalService`/`LocalBusiness` ni de `FAQPage`. 3 blocs JSON-LD qui se recoupent. |
| `keywords` | 18 mots-clés ignorés par Google, sans effet. |
| Structure | Tout le contenu commercial est sur une seule page avec des ancres (`/#tarifs`, `/#services`…) : aucune page dédiée par offre ou par métier, ce qui limite le potentiel SEO. |
| `lang="fr"` | ✅ |

### 7.3 Accessibilité

- **Labels non associés** : dans tous les formulaires (contact, login, set-password, profil, modifications, admin), `<label>` n'a pas de `htmlFor` et les champs n'ont pas d'`id`. Les lecteurs d'écran n'annoncent pas le nom du champ. Seule la case RGPD est correcte.
- **Contrastes** : `text-gray-400` (#9ca3af sur blanc ≈ 2,5:1, minimum WCAG AA = 4,5:1) est utilisé **60 fois** pour du texte porteur de sens (dates, aides, prix « TTC/mois », mentions légales en bas de formulaire). Les `text-white/50` sur fond sombre (ComparisonBanner) et les textes en dégradé sont également à vérifier.
- `alt` : présents sur les images ✅. Les emojis servent d'icônes (📧, 📱, ⏰…) sans `aria-hidden`.
- Le bouton de menu mobile a un `aria-label` mais pas d'`aria-expanded`. La FAQ n'a pas d'`aria-expanded`/`aria-controls`.
- Le focus visible repose sur `focus:ring` côté champs. Les liens et boutons gardent l'outline par défaut, à vérifier sur les fonds en dégradé.
- Messages d'erreur des formulaires non reliés aux champs (`aria-describedby`) ni annoncés (`role="alert"`).
- Dashboard et admin non utilisables sur mobile (A12).

---

## 8. Liste priorisée des corrections

Ces corrections valent **même si la refonte est lancée** : certaines failles sont exploitables aujourd'hui en production.

### 🔴 Critique (à faire tout de suite, avant la refonte)

1. **Mettre à jour Next.js** vers 15.5.28 (`npm audit fix`), corrige la faille critique et le contournement du middleware.
2. **Échapper toutes les valeurs insérées dans les emails** (ou passer à React Email) et **ne plus envoyer d'accusé de réception à une adresse non vérifiée**, ou au minimum ne plus y recopier ce que le visiteur a saisi.
3. **Anti-spam sur `/api/contact`** : honeypot, Cloudflare Turnstile et limite par IP, plus des limites de longueur.
4. **Corriger `openBillingPortal`** : lire `stripe_customer_id` en base à partir de `session.clientId`, ne jamais le prendre dans le formulaire.
5. **Webhook** : déduire la formule du `price.id` (et non des metadata), lire `invoice.parent.subscription_details` / `invoice.subscription` pour rattacher les factures, enregistrer `event.id` pour garantir l'idempotence, ajouter `UNIQUE(stripe_subscription_id)`, répondre 200 avant les envois d'emails non critiques.
6. **Mentions légales** : identité complète de la SASU.
7. Vérifier en base : le compte `test@linsaem.fr` (seed) existe-t-il, et les formules ou factures enregistrées sont-elles fausses (S1/S2) ?

### 🟠 Important (dans la refonte, en priorité)

8. Vérification d'autorisation dans chaque page et route admin (couche d'accès aux données), avec un vrai rôle en base.
9. Limite de tentatives sur login, set-password et change-password.
10. Vrai parcours « mot de passe oublié » (token haché, usage unique, 1 h de validité) ou passage au lien magique.
11. Sessions révocables (stockées en base) et invalidées au changement de mot de passe.
12. Traiter `customer.subscription.updated` (impayés, résiliation en fin de période, changement de formule).
13. Passer à **Stripe Checkout** créé côté serveur, avec les frais de mise en service ajoutés à la première facture. Cela supprime les Payment Links non rattachés.
14. Corriger le lien `/auth/set-password` → `/set-password`, définir `NEXT_PUBLIC_BASE_URL` ou l'unifier avec `NEXT_PUBLIC_APP_URL`.
15. Une source unique pour les offres et les prix (et cohérence avec Stripe).
16. Cookies et analytics : ne charger GA qu'après consentement (ou passer à un outil exempté), réappliquer le consentement à chaque visite, aligner la politique (13 mois), auto-héberger les polices.
17. Compléter la politique de confidentialité et les CGV (médiateur, rétractation), faire valider par un juriste.
18. Retirer ou remplacer les témoignages s'ils ne sont pas réels, revoir « 0 € frais cachés ».
19. Canonical par page, `og-image` réelle, métadonnées des démos, sitemap cohérent (sans les pages `noindex`, avec les démos).
20. Validation Zod de toutes les entrées serveur.
21. Labels de formulaires et contrastes (WCAG AA).
22. Dashboard et admin responsive.
23. Séparer la base de dev de la base de prod (branche Neon).

### 🟢 Confort

24. Supprimer le code mort (§2.4), les dépendances inutiles, et mettre à jour le README.
25. `next/font`, `next/image` dans les démos, `prefers-reduced-motion`.
26. Données structurées propres (`ProfessionalService`, `Offer`, `FAQPage`), logo raster.
27. Migrations versionnées, contraintes `CHECK`/`enum`, `timestamptz`.
28. CI (typecheck, lint, tests) et tests end-to-end sur les parcours critiques (contact, paiement → webhook → set-password → dashboard).
29. Monitoring des erreurs (Sentry ou Vercel Observability) à la place des `.catch(() => null)`.
30. Région des fonctions Vercel alignée sur celle de la base (UE).

---

## 9. Proposition de stack et d'arborescence cible

### 9.1 Stack recommandée

| Couche | Choix | Pourquoi |
|---|---|---|
| Framework | **Next.js 16 (App Router) + TypeScript strict**, sur **Vercel** | Continuité : déjà en place et maîtrisé. Un seul projet pour la vitrine, les démos, l'espace client et l'admin, ce qui est adapté à une structure d'une personne. Les Server Components et Server Actions réduisent le JS envoyé. |
| Région | Fonctions en `cdg1` (Paris) ou `fra1`, base Neon en `eu-central`/`eu-west` | Latence et argument RGPD (données en UE). |
| Base | **Neon Postgres + Drizzle ORM + drizzle-kit (migrations)** | Typage réel des lignes (supprime la classe de bugs du §3), migrations versionnées, contraintes. Neon donne des branches de base pour le dev et les previews. |
| Auth | **Better Auth** (adaptateur Drizzle) : email + mot de passe **ou lien magique**, sessions en base, limite de tentatives intégrée, reset de mot de passe, rôle `admin` | Remplace environ 200 lignes d'auth maison et corrige A4 à A10 d'un coup. Le lien magique convient bien à des clients TPE peu technophiles (pas de mot de passe à retenir). |
| Validation | **Zod** (schémas partagés formulaire ↔ serveur) | Une seule définition par entrée. |
| Paiement | **Stripe Checkout (créé côté serveur)** + **Customer Portal** + webhook idempotent (table `stripe_events`) ; état d'abonnement **synchronisé depuis l'objet Stripe** (`status`, `current_period_end`, `cancel_at_period_end`, `price.id`) | Supprime les Payment Links non rattachés. Les frais de 50 € passent en ligne ponctuelle sur la première facture. Stripe reste la source de vérité. |
| Emails | **React Email + Resend** | Échappement automatique (corrige C1), un layout commun, aperçu local. |
| Anti-spam | **Cloudflare Turnstile** + honeypot + **Upstash Ratelimit** (ou Vercel Firewall) | Gratuit et sans friction pour l'utilisateur. |
| Contenu | Fichiers TS/MDX versionnés dans `content/` (offres, FAQ, témoignages, métiers) | Une seule source de vérité, pas besoin de CMS à ce stade. |
| Style | **Tailwind v4** + quelques composants maison (Button, Input, Field, Badge, Card) ou **shadcn/ui** | Design system minimal, fin des classes recopiées, accessibilité gérée par Radix pour shadcn. |
| Analytics | **Vercel Web Analytics** ou **Plausible/Matomo configuré en mode exempté CNIL** | Pas de bandeau cookies nécessaire, ou bandeau réduit. Si GA4 est gardé : chargement conditionné au consentement. |
| Polices / images | `next/font` (auto-hébergé), `next/image`, images des démos rapatriées en local | Performance et RGPD. |
| Qualité | ESLint + Prettier, **Vitest** (logique : webhook, prix), **Playwright** (parcours), GitHub Actions | Filet de sécurité pour une maintenance en solo. |
| Observabilité | Sentry (offre gratuite) ou Vercel Observability | Remplace les erreurs avalées. |

**Alternative écartée** : Astro pour la vitrine et une app séparée pour l'espace client. Plus performant sur le marketing pur, mais deux projets, deux déploiements et une auth partagée à gérer : trop lourd pour une seule personne. Next.js avec des pages statiques couvre le besoin.

### 9.2 Arborescence cible

```
src/
├── app/
│   ├── (marketing)/                 # layout public : Navbar + Footer
│   │   ├── page.tsx                 # accueil
│   │   ├── offres/page.tsx          # comparatif détaillé des 3 formules
│   │   ├── realisations/page.tsx    # galerie → démos
│   │   ├── metiers/[slug]/page.tsx  # pages SEO par métier (artisan, restaurant…)
│   │   ├── contact/page.tsx
│   │   ├── merci/page.tsx
│   │   └── (legal)/
│   │       ├── mentions-legales/page.tsx
│   │       ├── cgv/page.tsx
│   │       └── confidentialite/page.tsx
│   ├── demos/
│   │   ├── layout.tsx               # bandeau « Démo LINSAEM »
│   │   └── [slug]/page.tsx          # Server Component + metadata ; animations isolées en petits Client Components
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   ├── mot-de-passe-oublie/page.tsx
│   │   └── activer/page.tsx         # remplace /set-password
│   ├── espace/                      # = /dashboard actuel (redirection 301)
│   │   ├── layout.tsx               # responsive
│   │   ├── page.tsx
│   │   ├── abonnement/  site/  modifications/  messages/  profil/
│   ├── admin/
│   │   ├── layout.tsx
│   │   ├── page.tsx                 # vue d'ensemble
│   │   ├── clients/  clients/[id]/  clients/nouveau/
│   │   ├── messages/  sites/
│   ├── api/
│   │   ├── auth/[...all]/route.ts   # Better Auth
│   │   └── webhooks/stripe/route.ts
│   ├── sitemap.ts  robots.ts  opengraph-image.tsx  icon.tsx
│   └── layout.tsx                   # html, polices, analytics
├── components/
│   ├── ui/                          # Button, Input, Field, Badge, Card, Dialog…
│   ├── marketing/                   # Hero, PricingTable, FAQ, ContactForm…
│   └── espace/                      # Sidebar, StatusBadge, Timeline…
├── content/
│   ├── offres.ts                    # SOURCE UNIQUE : noms, prix, features, Stripe price IDs
│   ├── entreprise.ts                # raison sociale, SIREN, adresse, téléphone, email
│   ├── faq.ts  temoignages.ts  demos.ts  metiers.ts
├── server/
│   ├── db/  schema.ts  index.ts  migrations/
│   ├── auth.ts                      # config Better Auth + requireUser() / requireAdmin()
│   ├── dal/                         # accès données AVEC contrôle d'autorisation
│   │   ├── clients.ts  abonnements.ts  messages.ts  modifications.ts
│   ├── actions/                     # Server Actions (formulaires) validées par Zod
│   ├── stripe/  client.ts  checkout.ts  portal.ts  webhook-handlers.ts
│   ├── email/  send.ts  templates/*.tsx   # React Email
│   └── ratelimit.ts
├── lib/  validation/*.ts  format.ts  utils.ts
└── middleware.ts                    # filtre optimiste (cookie présent) ; la vraie vérification est dans la DAL
tests/  e2e/  unit/
```

Principes :

- **Autorisation dans la DAL**, pas dans le layout ni seulement dans le middleware. Chaque fonction `server/dal/*` appelle `requireUser()` ou `requireAdmin()` et filtre par `clientId`.
- **`content/offres.ts` est la seule source des prix** : utilisée par la page Tarifs, le JSON-LD, les CGV, le formulaire, l'espace client et le mapping `price.id` → formule du webhook.
- **Redirections 301** à prévoir : `/dashboard/*` → `/espace/*`, `/set-password` → `/activer`, `/politique-de-confidentialite` → `/confidentialite` (ou garder les URL actuelles si l'on préfère ne rien casser : c'est à décider).
- **Migration des données** : script Drizzle unique qui reprend `clients`, `abonnements` (dédoublonnés et resynchronisés depuis l'API Stripe), `modifications`, `messages` et `sites`. Les mots de passe bcrypt existants se conservent (Better Auth accepte une fonction de vérification personnalisée).

---

## 10. Questions ouvertes (à trancher avant la phase 2)

1. **Paiement aujourd'hui** : passez-vous uniquement par les Payment Links envoyés après échange, ou souhaitez-vous un paiement en ligne direct depuis la page Tarifs (sans échange préalable) ?
2. **Configuration Vercel/Stripe** : `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` et `NEXT_PUBLIC_APP_URL` sont-ils bien définis en production ? Quels événements sont abonnés sur l'endpoint webhook ?
3. **Combien de clients et d'abonnements actifs** existent en base ? (Cela dimensionne la migration et la resynchronisation Stripe.) Les formules et factures affichées dans leur espace sont-elles correctes ?
4. **TVA** : la SASU est-elle en franchise en base (« TVA non applicable, art. 293 B du CGI ») ou assujettie ? Cela change l'affichage « TTC » et les factures.
5. **Frais de mise en service de 50 €** : à maintenir ? À intégrer automatiquement à la première facture ?
6. **Témoignages** : sont-ils de vrais clients ? Sinon, faut-il les retirer ou les remplacer ?
7. **Espace client** : mot de passe, lien magique par email, ou les deux ?
8. **Analytics** : tenez-vous à Google Analytics 4, ou un outil sans cookies (Vercel Analytics / Plausible) vous convient-il ?
9. **Leads du formulaire** : uniquement par email, ou aussi stockés en base et consultables dans l'admin (avec purge automatique à 3 ans) ?
10. **URL** : peut-on renommer `/dashboard` en `/espace` (avec redirections), ou faut-il garder les URL actuelles ?
11. **Démos** : faut-il les garder toutes les 7, et doivent-elles être indexées par Google (pages « réalisations ») ou rester en `noindex` ?
12. **Le script `scripts/seed-test.js` a-t-il été lancé** sur la base de production ? (Si oui, il faut supprimer le compte `test@linsaem.fr`.)
13. **Réseaux sociaux** : les comptes Facebook, Instagram et LinkedIn cités dans le JSON-LD existent-ils ?

---

## 11. Décisions et plan révisé

### 11.1 Réponses reçues (25/10/2026)

| Question | Décision | Conséquence |
|---|---|---|
| Paiement | **Lien de paiement Stripe envoyé à la main**, produit Stripe par formule | Aucun code de paiement dans le site |
| Clients | **4 clients actifs**, prélèvement mensuel | Tout se gère dans le dashboard Stripe |
| TVA | **Assujettie, 20 %** | Prix TTC corrects. Ajouter le n° de TVA intracommunautaire aux mentions légales et aux factures Stripe |
| Témoignages | **Faux, à retirer** | Supprimer la section, ou la remplacer plus tard par de vrais avis clients (avec leur accord) |
| Espace client | **Jamais utilisé, à abandonner** | Suppression de toute la partie app (voir 11.2) |
| Analytics | GA4 en place, alternatives à étudier | Voir 11.4 |
| Base Neon | **Jamais utilisée en production** | Suppression de la base, pas de migration de données |

### 11.2 Ce qui disparaît

L'abandon de l'espace client supprime environ 60 % du code et **la plupart des problèmes de sécurité** de l'audit (A1, A3 à A12, S1 à S8) :

- Routes : `/login`, `/forgot-password`, `/set-password`, `/dashboard/*`, `/admin/*`, `/api/auth/*`, `/api/messages`, `/api/modifications`, `/api/profil`, `/api/admin/*`, `/api/stripe/*`.
- Code : `src/lib/auth.ts`, `src/lib/db.ts`, `src/lib/stripe.ts`, `src/middleware.ts`, `scripts/seed-test.js`, 6 des 8 templates d'email.
- Dépendances : `@neondatabase/serverless`, `bcryptjs`, `jsonwebtoken`, `jose`, `stripe`, `@stripe/stripe-js`, `dotenv`, `date-fns`, `clsx`.
- Infra : projet Neon et intégration Vercel ↔ Neon, variables `DATABASE_*`, `PG*`, `POSTGRES_*`, `JWT_SECRET`, `AUTH_SECRET`, `STRIPE_*`, `ADMIN_EMAIL`.
- Redirections 301 à prévoir : `/login` et `/dashboard/*` → lien du portail client Stripe (voir 11.3), ou vers `/contact`.

### 11.3 Stripe sans code

Ce que l'espace client devait faire est disponible directement dans Stripe :

- **Portail client sans code** (Paramètres → Facturation → Portail client) : Stripe fournit un lien de connexion par email. Les clients y retrouvent leurs factures, mettent à jour leur carte et résilient. Ce lien peut figurer dans le pied de page du site (« Gérer mon abonnement »).
- **Emails automatiques** : reçus et factures envoyés à chaque paiement, relance en cas d'échec de paiement (Smart Retries + emails de relance), avertissement avant expiration de la carte.
- **Frais de mise en service de 50 €** : ajouter le produit ponctuel « Mise en service » **au même Payment Link** que l'abonnement, pour qu'il soit facturé avec la première mensualité **[à vérifier dans le dashboard : mélange ponctuel + récurrent sur un même lien]**. Cela supprime le lien séparé `buy.stripe.com/4gM4…` codé en dur à 3 endroits.
- **Factures conformes** (TVA 20 %) : dans les paramètres de facturation, renseigner la raison sociale de la SASU, l'adresse du siège, le SIREN et le n° de TVA intracommunautaire. Vérifier que chaque Price est configuré **TVA incluse** (5,99 € TTC = 4,99 € HT + 1,00 € de TVA) avec un taux de 20 %.

### 11.4 Mesure d'audience : les options

| Option | Cookies / bandeau | Coût | Ce qu'on perd par rapport à GA4 |
|---|---|---|---|
| **GA4 actuel** | Bandeau obligatoire, chargement à conditionner au consentement. Une part des visiteurs refuse, donc les chiffres sont incomplets | Gratuit | — |
| **Vercel Web Analytics** | Sans cookie, pas de bandeau | Inclus dans Vercel (quota limité sur l'offre gratuite) | Pas de suivi de parcours détaillé, rétention limitée |
| **Plausible** (hébergé en UE) | Sans cookie, pas de bandeau | Payant, quelques euros par mois | Moins de rapports, mais conversions (« formulaire envoyé ») et sources de trafic disponibles |
| **Matomo** (en mode exempté CNIL) | Pas de bandeau si configuré selon la liste CNIL | Gratuit en auto-hébergé, payant en cloud | Plus complexe à configurer correctement |

**Recommandation : Vercel Web Analytics**, ou Plausible si vous voulez suivre les conversions. Le site n'a plus de cookies du tout, donc on supprime le bandeau, la ligne « Google » des sous-traitants, et le bug de consentement (§5). Pour un site d'une page avec un formulaire, GA4 donne bien plus de données que ce qui sert.

### 11.5 Stack cible révisée (remplace §9.1)

Le site devient une **vitrine statique + un formulaire de contact + des démos**, sans base ni auth.

| Couche | Choix |
|---|---|
| Framework | **Next.js 16**, pages générées en statique, une seule Server Action pour le contact. On garde Next plutôt qu'Astro pour réutiliser les démos React existantes sans rien réécrire. |
| Hébergement | Vercel, fonctions en région UE (`cdg1`) |
| Formulaire | Server Action + Zod + **Cloudflare Turnstile** + honeypot + limite par IP, email via **Resend + React Email** (contenu échappé, plus d'accusé de réception qui recopie la saisie du visiteur) |
| Contenu | `content/offres.ts`, `content/entreprise.ts`, `content/faq.ts`, `content/demos.ts` comme sources uniques |
| Style | Tailwind v4 + quelques composants `ui/` (Button, Field, Card, Badge) |
| Polices / images | `next/font` auto-hébergé, `next/image`, images des démos en local |
| Analytics | Vercel Web Analytics (ou Plausible) |
| Qualité | ESLint, typecheck et Playwright (un test : envoi du formulaire) en GitHub Actions |

### 11.6 Arborescence cible révisée (remplace §9.2)

```
src/
├── app/
│   ├── (site)/
│   │   ├── layout.tsx               # Navbar + Footer (+ lien « Gérer mon abonnement » → portail Stripe)
│   │   ├── page.tsx                 # accueil
│   │   ├── offres/page.tsx
│   │   ├── realisations/page.tsx
│   │   ├── metiers/[slug]/page.tsx  # pages SEO par métier (optionnel)
│   │   ├── contact/page.tsx  contact/actions.ts
│   │   ├── merci/page.tsx
│   │   └── mentions-legales/  cgv/  confidentialite/
│   ├── demos/  layout.tsx  [slug]/page.tsx
│   ├── sitemap.ts  robots.ts  opengraph-image.tsx  icon.tsx
│   └── layout.tsx
├── components/  ui/  site/  demos/
├── content/     offres.ts  entreprise.ts  faq.ts  demos.ts
├── emails/      LeadAlert.tsx  ContactConfirmation.tsx
└── lib/         validation.ts  ratelimit.ts
```

### 11.7 Priorités révisées

**🔴 Avant la refonte (le site actuel est en ligne)**
1. Mettre à jour Next.js (`npm audit fix`).
2. Sécuriser `/api/contact` : échapper les champs, ne plus recopier la saisie dans l'accusé de réception, ajouter un honeypot et une limite de débit.
3. Retirer les faux témoignages, et « 0 € frais cachés » du Hero.
4. Mentions légales : identité complète de la SASU (forme, capital, RCS/SIREN, siège, n° TVA, directeur de publication).
5. Désactiver l'espace client en production. Il reste exposé avec ses failles (A1, A2) alors que personne ne l'utilise : supprimer les routes ou les rediriger.

**🟠 Refonte**
6. Supprimer tout le périmètre listé en 11.2, puis le projet Neon et les variables d'environnement.
7. Stripe : portail sans code, frais de mise en service dans le Payment Link, paramètres de facturation (TVA, SIREN).
8. Source unique des offres et des coordonnées, CGV (médiateur, rétractation) et politique de confidentialité mises à jour.
9. Analytics sans cookie et suppression du bandeau.
10. SEO (canonical par page, og-image, métadonnées et sitemap des démos), accessibilité (labels, contrastes), performance (`next/font`, images locales).

**🟢 Confort** : pages par métier, tests et CI, données structurées `ProfessionalService`.

### 11.8 Questions restantes

1. Que voulez-vous afficher à la place des témoignages : rien pour l'instant, ou de vrais avis (Google Business Profile, par exemple) ?
2. Analytics : Vercel Web Analytics (gratuit, simple) ou Plausible (payant, suivi des conversions) ?
3. Pour les URL `/login` et `/dashboard` : redirection vers le portail client Stripe, ou vers la page contact ?
4. Les 7 démos sont-elles toutes à garder, et doivent-elles être indexées par Google ?
5. Les comptes Facebook, Instagram et LinkedIn cités dans le JSON-LD existent-ils ?
6. Pouvez-vous me donner les informations légales de la SASU (capital, RCS, SIREN, adresse du siège, n° TVA, directeur de publication) ? Ou bien je laisse des emplacements à remplir ?
