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
2026-05-02 — V1.4 cost-field architecture. New data file `src/data/losses.ts` mirroring the schema discipline of `mechanisms.ts` and `lineage.ts`: `LossCategoryKey` typed union (4 keys), `LOSS_CATEGORIES` color/label/desc map, `LOSS_CATEGORY_ORDER`, `LOSSES: Loss[]` with all 10 entries verbatim from the brief, and a computed `MECHANISM_TO_LOSSES: Record<string, Loss[]>` inverse map plus a `LOSS_BY_ID` lookup. The inverse map is computed once at module load via an IIFE — no runtime cost on render, no possibility of drift between the forward and reverse references. `produced_by` validation: 19 unique mechanism IDs referenced from the 10 losses, all 19 resolve cleanly against the 22 mechanism IDs in `mechanisms.ts` — script-verified before integration. New component `src/components/WhatIsLostSection.tsx` extends the existing section pattern (label-mono header, d-xl heading, body intro, pill-filter row, divider, card list, closing italic) with no new dependencies. The cost-card layout mirrors `MechanismCard`'s left-rail-plus-body composition for consistency; the only structural addition is the `OBSERVABLE` and `INCIDENCE` mono-captioned blocks per the brief schema. Surgery in `FilterChamber.tsx`: VIEW_H grew 880 → 1020 to accommodate the cost field; chamber rectangle, mechanism map, and particle planner are untouched in their core logic — the only physics change is the routing decision in `planParticles`, which now consults `visitedIds ∩ loss.produced_by` for weighted-roulette selection among the 10 cost nodes (with extreme-saturation thresholds escaping to flank plumes). The two-mode `buildCostNodes("wide" | "narrow")` is parameterized at the data layer so the JSX render and modal/tooltip wiring stays identical across viewports; `useIsNarrow(768)` selects the mode and `useMemo` re-runs the planner on viewport change. Tooltip and modal state types unified as discriminated unions (`{kind: "mech"} | {kind: "cost"}`) — single state slot, single Esc handler, single scroll-lock; no parallel state machines. Cost-node modal reuses the same overlay/backdrop/iOS-safe-scroll-lock pattern as the mechanism modal — only the inner content varies. Bundle delta: 418 KB → 451 KB raw (+33 KB), 135.77 KB → 144.43 KB gz (+8.66 KB) — proportional to the prose content of `losses.ts` plus the new section component. No new packages.

2026-05-02 — V1.3 mobile architecture. Three small `src/hooks/` utilities introduced: `useBodyScrollLock`, `usePrefersReducedMotion`, `useIsNarrow`. Each ~25 LOC, no dependencies, covered by TypeScript. The decision to ship them as hooks rather than ad-hoc effects in each component is motivated by reuse across two modals (FilterChamber, LineageTab share scroll-lock) and the need for a single iOS-safe scroll-lock implementation. CSS class `.is-scroll-locked` carries the styling (`position: fixed; inset: 0; width: 100%`) so the hook only manages the scroll-position dance — locating styling in CSS keeps the SSR story clean. `prefers-reduced-motion` is honored both in component logic (lower particle count, no decorative motion) and in a CSS blanket rule (`animation-duration: 0.01ms !important`) — the former handles framer-motion (which uses inline styles, not CSS animations), the latter handles tab-cross-fade transitions and CSS `transition` props. Particle-count tuning is pure: 50 desktop / 24 narrow / 12 reduced-motion-static — all gated by useMemo so re-tuning on viewport change doesn't churn DOM. Bundle delta: zero (~419KB / 136KB gz unchanged) — runtime perf wins only. No new packages.
2026-05-02 — V1.2 architecture. Two new tabs slotted into the existing static-page architecture without further dependency churn — pure React state for the tab-switch (no router), framer-motion for the cross-fade transition (matches Chamber/Origin/Alternatives), no new packages. New data file `src/data/lineage.ts` mirrors the schema discipline of `src/data/mechanisms.ts` (typed, exported constants, frozen IDs). The Lineage tab's "verification pending" status is encoded in-data (passage string check) rather than as a separate boolean — single source of truth, no possibility of drift between badge and content. Where-it-Works numerical totals are encoded as constants at the top of the component for easy adjustment without touching the rendering code; the √-scaled bar widths are computed at render time so any future case-additions or population-revision updates the chart without manual width fiddling. IntersectionObserver is used directly (no library) for the ratio-reveal scroll trigger. Bundle delta: +28KB raw / +7.7KB gzipped (390→418 raw / 128→135.77 gzipped) — proportional to the prose content, well under any meaningful budget.
2026-05-02 — Stack delivered with one revision: **Vite 7** (not 8) — vite-plugin-pwa@1.2 peers Vite ^3..^7 only. Locked: Vite 7.3.2 + React 19.2 + TS 6 + Tailwind 3.4 + framer-motion 11.18 + vite-plugin-pwa 1.2 + lucide-react 0.460. Rendering surface = SVG (resolved); ~32 particles is well within SVG's comfort zone, no canvas needed. Motion model = deterministic-choreography (resolved) — pre-computed exponential-decay spiral waypoints fed to framer-motion's keyframe interpolator. File-size budget non-issue: production JS bundle 347KB raw / 112KB gzipped including framer-motion. Single-file artifact constraint relaxed; project is multi-file under src/ (data/, components/).
2026-05-02 — Stack proposal committed (Vite + React + Tailwind + framer-motion + vite-plugin-pwa); PM agent has revision authority.
2026-05-02 — Initialized; rendering surface and motion model surfaced as open questions
