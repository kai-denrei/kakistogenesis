---
role: arch
owner: Gerald
status: active
last-updated: 2026-05-02
---

# Arch

## Scope
Structural decisions: animation framework, rendering strategy (SVG vs canvas vs CSS), state model for the particle simulation, and how the Names section integrates with the existing component tree without bloating the file beyond a comfortable single-file budget.

## Decisions
| Date | Decision | Rationale | Linked roles |
|---|---|---|---|
| 2026-05-02 | Stack proposal (PM agent has authority to revise): Vite + React 18 + Tailwind + framer-motion + vite-plugin-pwa | Vite: dev-server speed, static-build output, no SSR overhead. React: matches the PoC's component model and the team's familiarity. Tailwind: utility-first styling consistent with the PoC and fast for prototyping a content-heavy page. framer-motion: declarative React-friendly animation, handles particle physics and maelstrom rotation without leaving the React render cycle. vite-plugin-pwa: one-shot manifest + service worker wiring per the mobile-pwa skill. Alternatives considered: pure HTML+SVG+vanilla JS (rejected: more code for the same animations, harder to compose tabs); Next.js (rejected: SSR/RSC unnecessary for static content); GSAP (rejected: framer-motion's React integration is more natural for this scope). | [[dev]] |

## Dead Ends
| Date | What was tried | Why it failed / was rejected |
|---|---|---|

## Lessons

## Open Questions
- [ ] Rendering surface: SVG (matches the diagram-on-paper aesthetic, natural overlay on the existing static layer, easy React integration) vs Canvas (better at many particles, harder to compose with React's existing rendering of the mechanism nodes) vs CSS-only (simplest, but constrained motion vocabulary). SVG is the default frontrunner unless particle count forces canvas. — owner: Gerald — since: 2026-05-02
- [ ] Motion model: deterministic choreography (scripted paths, predictable, easier to author/debug) vs emergent simulation (physics with attractor at maelstrom center, particles "feel" pulled). Emergent feels more honest to the subject; deterministic is more legible. — owner: Gerald — since: 2026-05-02
- [ ] File-size budget: kakistogenesis.jsx is 50KB. Is 80KB acceptable for animation code, or should the animation be a separate module? Single-file artifact has reproducibility advantages but bounds the complexity. — owner: Gerald — since: 2026-05-02

## Assumptions
- [rendering target is a browser running React 18+ with Tailwind already wired] — status: untested — since: 2026-05-02
- [the current static layout uses absolute-positioned coordinates per mechanism (x/y in MECHANISMS array) — confirmed by reading the file] — status: validated — since: 2026-05-02

## Dependencies
Blocked by:
Feeds into: [[dev]]

## Session Log
2026-05-02 — Stack delivered with one revision: **Vite 7** (not 8) — vite-plugin-pwa@1.2 peers Vite ^3..^7 only. Locked: Vite 7.3.2 + React 19.2 + TS 6 + Tailwind 3.4 + framer-motion 11.18 + vite-plugin-pwa 1.2 + lucide-react 0.460. Rendering surface = SVG (resolved); ~32 particles is well within SVG's comfort zone, no canvas needed. Motion model = deterministic-choreography (resolved) — pre-computed exponential-decay spiral waypoints fed to framer-motion's keyframe interpolator. File-size budget non-issue: production JS bundle 347KB raw / 112KB gzipped including framer-motion. Single-file artifact constraint relaxed; project is multi-file under src/ (data/, components/).
2026-05-02 — Stack proposal committed (Vite + React + Tailwind + framer-motion + vite-plugin-pwa); PM agent has revision authority.
2026-05-02 — Initialized; rendering surface and motion model surfaced as open questions
