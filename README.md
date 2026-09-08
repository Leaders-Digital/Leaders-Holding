# Leaders Holding — Portail Nexus

Un portail haut de gamme pour un écosystème d'entreprise : une **carte Nexus** abstraite en 3D (champ Three.js effet verre dépoli) au-dessus d'une interface claire et raffinée, avec une constellation radiale de **13 secteurs**, un **Ancrage global + Index Nexus** permanent pour les **25 sociétés**, et des pages **monde** entièrement construites.

Built with **Next.js 15 + React 18 + Three.js**.

## Lancer

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build    # build de production
npm run start    # serveur de production
```

## Structure

```
app/
├─ layout.jsx              # fonts, metadata SEO, JSON-LD
├─ page.jsx                # page d'accueil (hub Nexus)
├─ recrutement/page.jsx    # offres d'emploi
├─ societe/[slug]/page.jsx # pages société (SSG, 25 routes)
├─ sitemap.js              # sitemap auto-généré
└─ robots.js               # robots.txt
components/
├─ Home.jsx                # interface + Three.js
└─ Recruitment.jsx
lib/
├─ group-data.js           # secteurs, sociétés, buildWorld()
├─ logos.js                # chemins publics des logos
└─ seo.js                  # metadata, slugs, JSON-LD
public/
├─ logos/                  # logos des sociétés
├─ images/                 # visuels statiques
└─ intro.mp4
```

## SEO

- **SSG** : la home, `/recrutement` et les 25 pages `/societe/[slug]` sont pré-rendues à la build
- Metadata Next.js (title, description, Open Graph, Twitter, canonical)
- `sitemap.xml` et `robots.txt` générés automatiquement
- JSON-LD Organization dans le layout

## Config

Copy `.env.example` to `.env.local` (dev) or `.env` (production Docker):

```bash
NEXT_PUBLIC_SITE_URL=https://leadersholding.tn
NEXT_PUBLIC_LEADERS_API_URL=https://serveur.leaders-business.com/api
NEXT_PUBLIC_LEADERS_UPLOADS_URL=https://serveur.leaders-business.com

# Server-only — read-only CRM account (never commit real values)
LEADERS_API_URL=https://serveur.leaders-business.com/api
LEADERS_API_TELEPHONE=+216XXXXXXXX
LEADERS_API_PASSWORD=<password>
```

## Offres d'emploi (API)

Le listing passe par un **proxy serveur** (`/api/job-offers`) qui s'authentifie avec un JWT — les identifiants CRM ne sont jamais exposés au navigateur.

| Action | Route | Auth |
|--------|-------|------|
| Lister les offres | `GET /api/job-offers` | JWT côté serveur |
| Détail d'une offre | `GET /api/job-offers/:id` | JWT côté serveur |
| Postuler | `POST …/job-offers/:id/apply` | Public (direct depuis le navigateur) |

Sans `LEADERS_API_TELEPHONE` / `LEADERS_API_PASSWORD`, la page carrières affiche des données d'exemple.

## Où modifier

- **Sociétés et secteurs** — tableau `SECTORS` dans `lib/group-data.js`
- **La page monde d'une société** — `buildWorld()` dans le même fichier
- **Le champ 3D** — hook `useNexusField()` dans `components/Home.jsx`
- **Styles / responsive** — `app/globals.css`

## Déploiement

Docker (standalone Next.js). Create `/home/ubuntu/leaders-holding/.env` on the server with the variables above, then:

```bash
docker build -t leaders-holding .
docker run -p 3000:3000 --env-file .env leaders-holding
```
