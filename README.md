# Leaders Holding — Nexus Portal

A premium corporate-ecosystem portal: an abstract 3D **Nexus map** (Three.js frosted-glass field) over a refined light/glass UI, with a radial constellation of **11 sectors**, a persistent **Global Anchor + Nexus Index** for all **23 societies**, and fully-built **world** pages (Leaders Luxury is the showcase; every society opens a templated world in its sector's accent).

Built with **Vite + React 18 + Three.js**.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
```

```bash
npm run build    # production build → dist/
npm run preview  # preview the build
```

## Structure

```
react-app/
├─ index.html              # fonts (Inter Tight + IBM Plex Mono) + root
├─ vite.config.js
├─ src/
│  ├─ main.jsx             # entry (no StrictMode — avoids double Three.js init)
│  ├─ index.css            # reset, keyframes, hover states (accent via CSS vars)
│  ├─ App.jsx              # all data + UI + the useNexusField() 3D hook
│  └─ assets/
│     └─ leaders-logo.webp
```

## Where to edit

- **Societies & sectors** — the `SECTORS` array at the top of `App.jsx`. Each sector
  has `accent`, `tag`, `about`, `svc` (services), `stat` (stats) and `societies`.
- **A society's world page** — `buildWorld(name)`. `Leaders Luxury` is special-cased
  with rich bento content; all others are generated from their sector. Add more
  `if (name === '…')` branches to flag-ship additional worlds.
- **The 3D field** — `useNexusField()` hook: `nodeDensity` (orb count) and
  `showCore` (wireframe icosahedron) are the tunables.
- **Hover / motion** — `src/index.css`. Accent-dependent hovers read the
  `--accent` / `--accentSoft` / `--accentGlow` CSS vars set on the world container.

## Notes

- Project images are striped placeholders — swap them for real renders.
- The logo is transparent gold and used in the HUD anchor and the Nexus nucleus.
