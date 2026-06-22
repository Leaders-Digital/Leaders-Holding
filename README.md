# Leaders Holding — Portail Nexus

Un portail haut de gamme pour un écosystème d'entreprise : une **carte Nexus** abstraite en 3D (champ Three.js effet verre dépoli) au-dessus d'une interface claire et raffinée, avec une constellation radiale de **11 secteurs**, un **Ancrage global + Index Nexus** permanent pour les **23 sociétés**, et des pages **monde** entièrement construites (Leaders Luxury sert de vitrine ; chaque société ouvre un monde modèle dans l'accent de son secteur).

Built with **Vite + React 18 + Three.js**.

## Lancer

```bash
npm install
npm run dev      # http://localhost:5173
```

```bash
npm run build    # build de production → dist/
npm run preview  # prévisualiser le build
```

## Structure

```
react-app/
├─ index.html              # fonts (Inter Tight + IBM Plex Mono) + root
├─ vite.config.js
├─ src/
│  ├─ main.jsx             # entry (no StrictMode — avoids double Three.js init)
│  ├─ index.css            # reset, keyframes, hover states (accent via CSS vars)
│  ├─ App.jsx              # données + interface + hook 3D useNexusField()
│  └─ assets/
│     └─ leaders-logo.webp
```

## Où modifier

- **Sociétés et secteurs** — le tableau `SECTORS` en haut de `App.jsx`. Chaque secteur
  possède `accent`, `tag`, `about`, `svc` (services), `stat` (stats) et `societies`.
- **La page monde d'une société** — `buildWorld(name)`. `Leaders Luxury` est traité
  à part avec un contenu bento plus riche ; les autres sont générés depuis leur secteur.
  Ajoutez d'autres branches `if (name === '…')` pour mettre en avant des mondes supplémentaires.
- **Le champ 3D** — hook `useNexusField()` : `nodeDensity` (nombre d'orbes) et
  `showCore` (icosaèdre filaire) sont les réglages.
- **Survol / mouvement** — `src/index.css`. Les survols dépendants de l'accent lisent les
  variables CSS `--accent` / `--accentSoft` / `--accentGlow` définies sur le conteneur du monde.

## Notes

- Les images du projet sont des placeholders rayés — remplacez-les par de vrais rendus.
- Le logo est doré transparent et utilisé dans l'ancrage du HUD ainsi que dans le noyau Nexus.
