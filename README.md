# LINSAEM v2

Site web Next.js 15 avec espace client, Stripe, Resend et Auth.js.

## Stack

- **Next.js 15** (App Router)
- **Auth.js v5** (Google + Email/Password)
- **Vercel Postgres** (base de données)
- **Stripe** (paiements & factures)
- **Resend** (emails transactionnels)
- **Tailwind CSS**

## Installation locale

```bash
npm install
cp .env.example .env.local
# Remplir les variables d'environnement
npm run dev
```

## Déploiement sur Vercel

### 1. Pusher sur GitHub

```bash
git init
git add .
git commit -m "feat: LINSAEM v2"
git remote add origin https://github.com/votre-compte/linsaem-v2.git
git push -u origin main
```

### 2. Connecter à Vercel

1. Aller sur [vercel.com](https://vercel.com) → New Project → Import depuis GitHub
2. Vercel détecte automatiquement Next.js
3. Cliquer **Deploy**

### 3. Ajouter Vercel Postgres

Dashboard Vercel → Storage → Create → Postgres → Connecter au projet
→ Les variables `POSTGRES_*` sont auto-ajoutées

### 4. Variables d'environnement (Vercel Dashboard → Settings → Env Vars)

```
AUTH_SECRET=          # openssl rand -base64 32
AUTH_GOOGLE_ID=       # Google Cloud Console
AUTH_GOOGLE_SECRET=   # Google Cloud Console
RESEND_API_KEY=       # resend.com → API Keys
RESEND_FROM_EMAIL=    contact@linsaem.fr
RESEND_TO_EMAIL=      contact@linsaem.fr
STRIPE_SECRET_KEY=    # dashboard.stripe.com
STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=  # stripe listen --forward-to ...
STRIPE_STARTER_PRICE_ID=
STRIPE_PRO_PRICE_ID=
STRIPE_BUSINESS_PRICE_ID=
NEXT_PUBLIC_APP_URL=  https://www.linsaem.fr
```

### 5. Initialiser la base de données

Dans Vercel Dashboard → Storage → Postgres → Query :
```sql
-- Copier-coller le contenu du SCHEMA dans src/lib/db.ts
```

### 6. Configurer Stripe

1. Créer 3 produits dans le dashboard Stripe (Starter, Pro, Business) avec facturation mensuelle
2. Copier les Price IDs dans les variables d'environnement
3. Configurer le webhook : `stripe listen --forward-to https://www.linsaem.fr/api/stripe/webhook`
   - Événements : `customer.subscription.created`, `customer.subscription.deleted`, `invoice.payment_succeeded`, `invoice.payment_failed`

### 7. Configurer Resend

1. Créer un compte sur [resend.com](https://resend.com)
2. Vérifier le domaine `linsaem.fr` (ajouter les DNS records)
3. Créer une API key et l'ajouter dans les variables Vercel

### 8. Configurer Google OAuth

1. [Google Cloud Console](https://console.cloud.google.com) → APIs & Services → Credentials
2. Créer OAuth 2.0 Client ID
3. Authorized redirect URIs : `https://www.linsaem.fr/api/auth/callback/google`

### 9. Pointer linsaem.fr vers Vercel

Dans votre registrar DNS :
- Type : `CNAME`
- Name : `www`
- Value : `cname.vercel-dns.com`

Et configurer le domaine dans Vercel Dashboard → Settings → Domains.

## Structure du projet

```
src/
├── app/
│   ├── page.tsx                    # Page d'accueil
│   ├── login/page.tsx              # Connexion
│   ├── dashboard/
│   │   ├── layout.tsx              # Layout avec sidebar (protégé)
│   │   ├── page.tsx                # Tableau de bord
│   │   ├── abonnement/page.tsx     # Abonnement + factures
│   │   └── modifications/page.tsx  # Demandes de modifications
│   └── api/
│       ├── auth/[...nextauth]/     # Auth.js handler
│       ├── contact/route.ts        # Formulaire → Resend
│       ├── stripe/
│       │   ├── checkout/route.ts   # Créer session Stripe
│       │   └── webhook/route.ts    # Webhooks Stripe
│       └── modifications/route.ts  # API modifications
├── components/
│   └── marketing/                  # Tous les composants de la page d'accueil
└── lib/
    ├── db.ts                       # Schéma + helpers Postgres
    ├── emails.ts                   # Templates Resend
    └── stripe.ts                   # Helpers Stripe
```
