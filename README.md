# ペシ魔鉄則 — Peshi-ma Tessoku

> *the "iron rule of the worst-demon"*

An interactive visual reference for the institutional mechanisms by which mixed intent becomes asymmetrically negative output.

A diagnosis of the numerous mechanisms whereby institutions, even those founded with the best intent, systematically convert positive intents into negative outcomes — and how a small minority with elevated dark-triad traits exploits the gaps in any well-meaning system.

## The name

- **ペシ** (*peshi*) — Latin *pessimum* (worst, opposite of *optimum*), transliterated into katakana.
- **魔** (*ma*) — demon. The dark-triad operator, the asymmetric exploiter.
- **鉄則** (*tessoku*) — an iron rule.

Read together: *the iron rule of the worst-demon*.

## What's in the box

The filter catalogues twenty-two academically-rooted institutional mechanisms across six families:

- **Self-preservation** — institutions acquire interests of their own
- **Capture & rent** — the regulated buy the regulator
- **Agency** — decision-makers diverge from those they nominally serve
- **Knowledge & measurement** — local information and target metrics fail at scale
- **Bureaucratic drift** — process expands; substance recedes
- **Exploitation** — a small minority weaponizes the rest

Each mechanism is animated, hover-described, and fully cited.

## Stack

- Vite 7 + React 19 + TypeScript
- Tailwind CSS 3
- framer-motion for the filter animation
- vite-plugin-pwa for offline / installable

## Local development

```bash
npm install
npm run dev          # http://localhost:5173/
```

```bash
npm run build        # static output in dist/
npm run preview      # serve the production build locally
```

## Deployment

Pushed to `main` → GitHub Actions builds and deploys to GitHub Pages at
[kai-denrei.github.io/kakistogenesis](https://kai-denrei.github.io/kakistogenesis/).

## Origin

The artifact began as a hand-photographed sketch (2016, see `public/origin-2016.jpeg` and the *Origin* tab in the app). Two ink columns — vibrant rainbow for good intentions, drifting black for bad — fall into a filter labeled with the mechanisms that render governments inefficient. A single dark plume exits below.

The *current* build is the 2026 reading of that 2016 page.

## License

Code: MIT. Prose, illustrations, and the conceptual scheme: CC BY-NC-SA 4.0.
