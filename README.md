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

```bash
NEXT_PUBLIC_SITE_URL=https://leadersholding.tn
```

## Où modifier

- **Sociétés et secteurs** — tableau `SECTORS` dans `lib/group-data.js`
- **La page monde d'une société** — `buildWorld()` dans le même fichier
- **Le champ 3D** — hook `useNexusField()` dans `components/Home.jsx`
- **Styles / responsive** — `app/globals.css`

## Déploiement

Docker (standalone Next.js) :

```bash
docker build -t leaders-holding .
docker run -p 3000:3000 leaders-holding
```
