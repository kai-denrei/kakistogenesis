import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import {
  CATEGORIES,
  CATEGORY_ORDER,
  MECHANISMS,
  type CategoryKey,
  type Mechanism,
} from "../data/mechanisms";
import {
  LOSSES,
  LOSS_CATEGORIES,
  type Loss,
} from "../data/losses";
import { useBodyScrollLock } from "../hooks/useBodyScrollLock";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { useIsNarrow } from "../hooks/useIsNarrow";

/**
 * Filter Chamber — V1.4 (cost-field surgery).
 *
 * Honors the 2016 origin sketch:
 *   • Rectangular chamber containing the 22 mechanisms spatially mapped (3x2 category panels).
 *   • Bright rainbow "good intentions" stream enters from above.
 *   • Dark "bad intentions" cloud enters from upper right.
 *   • Particles random-walk through 3–7 mechanism nodes, losing saturation per visit (0.6x — grey by visit 3).
 *
 * Cost field (replaces the V1.1 three-estuary system):
 *   • Below the chamber, particles route into ten cost nodes laid out as two dice
 *     (Die A: Material & Human · Die B: Social & Epistemic — center + 4 corners each).
 *   • Routing weight = Σ overlap(particle.visited_mechanism_ids, loss.produced_by).
 *   • Extreme-saturation flanks: finalSat > 0.6 → DILUTED plume (warm-tinted, far left);
 *                                finalSat < 0.04 → HURTFUL plume (dark red, far right).
 */

/* ---------- viewport ---------- */
const VIEW_W = 1100;
const VIEW_H = 1020;

/* ---------- chamber rectangle (the "box" from the 2016 sketch) ---------- */
const BOX = {
  x: 80,
  y: 200,
  w: 940,
  h: 420,
} as const;
const COLS = 3;
const ROWS = 2;
const PANEL_W = BOX.w / COLS;
const PANEL_H = BOX.h / ROWS;

/* ---------- input/output anchors ---------- */
const GOOD_ENTRY = { x: BOX.x + 220, y: BOX.y + 28 };
const BAD_ENTRY = { x: BOX.x + BOX.w - 220, y: BOX.y + 28 };
const CHAMBER_EXIT = { x: BOX.x + BOX.w / 2, y: BOX.y + BOX.h - 8 };

/* ---------- rainbow palette — vibrant, 2016-vivid ---------- */
const RAINBOW = [
  "#ff2a3a", // crimson
  "#ff7a1c", // orange
  "#ffd23a", // gold
  "#3acb4f", // green
  "#2aa1ff", // azure
  "#7a4cff", // violet
];

/* ---------- cost field (two dice + extreme-saturation flanks) ---------- */
/**
 * Layout: two die-5 grids side by side, centered under the chamber.
 *  - Die A (left)  — Material & Human, center: misallocation, 4 corners: innovation-foreclosure, consumed-effort, human-capital-exodus, moral-conditioning
 *  - Die B (right) — Social & Epistemic, center: coordination-tax, 4 corners: legitimacy-depletion, problem-latency, lost-correction, epistemic-capture
 *
 * Flanks:
 *  - DILUTED plume on the far left  (warm amber, finalSat > 0.6)
 *  - HURTFUL plume on the far right (dark red,   finalSat < 0.04)
 */
const FIELD_TOP = BOX.y + BOX.h + 80; // 700
const DIE_GAP = 56; // gutter between dice
const DIE_SIZE = 200; // square footprint per die
const FIELD_CENTER_X = BOX.x + BOX.w / 2; // 550
const DIE_A_CX = FIELD_CENTER_X - DIE_GAP / 2 - DIE_SIZE / 2; // ~422
const DIE_B_CX = FIELD_CENTER_X + DIE_GAP / 2 + DIE_SIZE / 2; // ~678
const DIE_CY = FIELD_TOP + DIE_SIZE / 2; // 800

/** Per-die: center point + 4 corners offset by ±DIE_INSET on each axis. */
const DIE_INSET = 64;

type CostNode = {
  id: string;
  loss: Loss;
  cx: number;
  cy: number;
  /** Display label override (used for "Trust" override on coordination-tax). */
  display: string;
};

/**
 * Build the ten cost-node positions.
 * - "wide": full 5-pip die (center + 4 corners), two dice side-by-side.
 * - "narrow": same two dice, but each die collapses to a 2x2 grid (drop the
 *   center pip into the second column of the bottom row — the visual still
 *   reads as a die, just simpler).
 */
function buildCostNodes(mode: "wide" | "narrow" = "wide"): {
  dieA: CostNode[];
  dieB: CostNode[];
} {
  const byId: Record<string, Loss> = Object.fromEntries(
    LOSSES.map((l) => [l.id, l]),
  );

  if (mode === "narrow") {
    // 2x2 grid per die, narrower spacing
    const inset = 50;
    const a: CostNode[] = [
      { id: "innovation-foreclosure", loss: byId["innovation-foreclosure"], cx: DIE_A_CX - inset, cy: DIE_CY - inset, display: "Innovation Foreclosure" },
      { id: "consumed-effort", loss: byId["consumed-effort"], cx: DIE_A_CX + inset, cy: DIE_CY - inset, display: "Consumed Effort" },
      { id: "human-capital-exodus", loss: byId["human-capital-exodus"], cx: DIE_A_CX - inset, cy: DIE_CY + inset, display: "Human Capital Exodus" },
      { id: "moral-conditioning", loss: byId["moral-conditioning"], cx: DIE_A_CX + inset, cy: DIE_CY + inset, display: "Moral Conditioning" },
      // misallocation (the would-be-center) tucked just below the 2x2 grid
      { id: "misallocation", loss: byId["misallocation"], cx: DIE_A_CX, cy: DIE_CY + inset * 2 + 4, display: "Misallocation" },
    ];
    const b: CostNode[] = [
      { id: "legitimacy-depletion", loss: byId["legitimacy-depletion"], cx: DIE_B_CX - inset, cy: DIE_CY - inset, display: "Legitimacy Depletion" },
      { id: "problem-latency", loss: byId["problem-latency"], cx: DIE_B_CX + inset, cy: DIE_CY - inset, display: "Problem Latency" },
      { id: "lost-correction", loss: byId["lost-correction"], cx: DIE_B_CX - inset, cy: DIE_CY + inset, display: "Lost Correction" },
      { id: "epistemic-capture", loss: byId["epistemic-capture"], cx: DIE_B_CX + inset, cy: DIE_CY + inset, display: "Epistemic Capture" },
      { id: "coordination-tax", loss: byId["coordination-tax"], cx: DIE_B_CX, cy: DIE_CY + inset * 2 + 4, display: "Trust" },
    ];
    return { dieA: a, dieB: b };
  }

  // Wide / default: full 5-pip die.
  const a: CostNode[] = [
    { id: "misallocation", loss: byId["misallocation"], cx: DIE_A_CX, cy: DIE_CY, display: "Misallocation" },
    { id: "innovation-foreclosure", loss: byId["innovation-foreclosure"], cx: DIE_A_CX - DIE_INSET, cy: DIE_CY - DIE_INSET, display: "Innovation Foreclosure" },
    { id: "consumed-effort", loss: byId["consumed-effort"], cx: DIE_A_CX + DIE_INSET, cy: DIE_CY - DIE_INSET, display: "Consumed Effort" },
    { id: "human-capital-exodus", loss: byId["human-capital-exodus"], cx: DIE_A_CX - DIE_INSET, cy: DIE_CY + DIE_INSET, display: "Human Capital Exodus" },
    { id: "moral-conditioning", loss: byId["moral-conditioning"], cx: DIE_A_CX + DIE_INSET, cy: DIE_CY + DIE_INSET, display: "Moral Conditioning" },
  ];
  const b: CostNode[] = [
    { id: "coordination-tax", loss: byId["coordination-tax"], cx: DIE_B_CX, cy: DIE_CY, display: "Trust" },
    { id: "legitimacy-depletion", loss: byId["legitimacy-depletion"], cx: DIE_B_CX - DIE_INSET, cy: DIE_CY - DIE_INSET, display: "Legitimacy Depletion" },
    { id: "problem-latency", loss: byId["problem-latency"], cx: DIE_B_CX + DIE_INSET, cy: DIE_CY - DIE_INSET, display: "Problem Latency" },
    { id: "lost-correction", loss: byId["lost-correction"], cx: DIE_B_CX - DIE_INSET, cy: DIE_CY + DIE_INSET, display: "Lost Correction" },
    { id: "epistemic-capture", loss: byId["epistemic-capture"], cx: DIE_B_CX + DIE_INSET, cy: DIE_CY + DIE_INSET, display: "Epistemic Capture" },
  ];
  return { dieA: a, dieB: b };
}

const FLANK_DILUTED = {
  cx: BOX.x + 60,
  cy: DIE_CY,
  color: "#c9a070",
  label: "DILUTED",
};
const FLANK_HURTFUL = {
  cx: BOX.x + BOX.w - 60,
  cy: DIE_CY,
  color: "#8a1f1f",
  label: "HURTFUL",
};

/* ---------- node layout: position each mechanism inside its category panel ---------- */
type Node = {
  m: Mechanism;
  cx: number;
  cy: number;
  color: string;
};

function buildNodes(): Node[] {
  // group mechanisms by category, in CATEGORY_ORDER
  const grouped: Record<CategoryKey, Mechanism[]> = {
    "self-preservation": [],
    capture: [],
    agency: [],
    knowledge: [],
    drift: [],
    exploitation: [],
  };
  for (const m of MECHANISMS) grouped[m.category].push(m);

  // deterministic jitter so node positions are stable
  const seeded = (key: string) => {
    let h = 0;
    for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) | 0;
    return () => {
      h = (h * 9301 + 49297) | 0;
      return ((h >>> 0) % 10000) / 10000;
    };
  };

  const nodes: Node[] = [];
  CATEGORY_ORDER.forEach((catKey, idx) => {
    const col = idx % COLS;
    const row = Math.floor(idx / COLS);
    const panelX = BOX.x + col * PANEL_W;
    const panelY = BOX.y + row * PANEL_H;
    const cat = CATEGORIES[catKey];
    const items = grouped[catKey];
    const rand = seeded(catKey);
    items.forEach((m, i) => {
      // distribute mechanisms in the panel — roughly grid with jitter
      const n = items.length;
      // arrange in 2 rows of up-to-3 within the panel
      const localCols = n <= 2 ? n : Math.ceil(n / 2);
      const localRows = Math.ceil(n / localCols);
      const localCol = i % localCols;
      const localRow = Math.floor(i / localCols);
      const padX = 30;
      const padY = 44; // leave room for category label at top
      const slotW = (PANEL_W - padX * 2) / localCols;
      const slotH = (PANEL_H - padY - 24) / localRows;
      const baseX = panelX + padX + slotW * localCol + slotW / 2;
      const baseY = panelY + padY + slotH * localRow + slotH / 2;
      const jx = (rand() - 0.5) * slotW * 0.32;
      const jy = (rand() - 0.5) * slotH * 0.30;
      nodes.push({
        m,
        cx: Math.round(baseX + jx),
        cy: Math.round(baseY + jy),
        color: cat.color,
      });
    });
  });
  return nodes;
}

/* ---------- particle path planner ---------- */

type ParticleDestination =
  | { kind: "diluted" }
  | { kind: "hurtful" }
  | { kind: "cost"; node: CostNode };

type ParticlePlan = {
  id: number;
  /** sequence of waypoints: [entry, n1, n2, ..., exit] */
  waypoints: { x: number; y: number }[];
  /** per-waypoint saturation (0..1) — multiplies the base color */
  saturations: number[];
  /** per-waypoint timestamps (0..1) */
  times: number[];
  color: string;
  duration: number;
  delay: number;
  size: number;
  /** chosen destination */
  destination: ParticleDestination;
  /** final saturation, used to assign color of the rendered exit dot */
  finalSat: number;
};

function planParticles(
  seed: number,
  nodes: Node[],
  count: number,
  costNodes: CostNode[],
): ParticlePlan[] {
  let s = seed;
  const rand = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  const plans: ParticlePlan[] = [];
  for (let i = 0; i < count; i++) {
    const visitCount = 3 + Math.floor(rand() * 5); // 3..7
    // pick `visitCount` distinct nodes randomly
    const picked: Node[] = [];
    const pool = [...nodes];
    for (let v = 0; v < visitCount && pool.length > 0; v++) {
      const idx = Math.floor(rand() * pool.length);
      picked.push(pool[idx]);
      pool.splice(idx, 1);
    }
    // sort visits roughly top-to-bottom so motion looks like flow
    picked.sort((a, b) => a.cy - b.cy + (rand() - 0.5) * 80);
    const visitedIds = picked.map((n) => n.m.id);

    // build waypoints (chamber traversal)
    const wp: { x: number; y: number }[] = [];
    wp.push({ x: GOOD_ENTRY.x + (rand() - 0.5) * 80, y: GOOD_ENTRY.y - 40 });
    for (const n of picked) {
      wp.push({ x: n.cx + (rand() - 0.5) * 14, y: n.cy + (rand() - 0.5) * 14 });
    }

    // saturation chain — 0.6 decay per visit
    const sats: number[] = [];
    sats.push(1.0); // entry: full color
    let sat = 1.0;
    for (let k = 0; k < picked.length; k++) {
      sat *= 0.6;
      sats.push(sat);
    }
    const finalSat = sats[sats.length - 1];

    // ---- routing decision ----
    let destination: ParticleDestination;
    let exitX: number;
    let exitY: number;

    if (finalSat > 0.6) {
      // rare survivor — DILUTED flank
      destination = { kind: "diluted" };
      exitX = FLANK_DILUTED.cx + (rand() - 0.5) * 24;
      exitY = FLANK_DILUTED.cy + 40 + (rand() - 0.5) * 60;
    } else if (finalSat < 0.04) {
      // utterly drained — HURTFUL flank
      destination = { kind: "hurtful" };
      exitX = FLANK_HURTFUL.cx + (rand() - 0.5) * 24;
      exitY = FLANK_HURTFUL.cy + 40 + (rand() - 0.5) * 60;
    } else {
      // route to a cost node weighted by produced_by overlap
      const weights = costNodes.map((cn) => {
        let w = 0;
        for (const mid of visitedIds) {
          if (cn.loss.produced_by.includes(mid)) w++;
        }
        return w;
      });
      const totalW = weights.reduce((a, b) => a + b, 0);
      let pick = 0;
      if (totalW === 0) {
        pick = Math.floor(rand() * costNodes.length);
      } else {
        const r = rand() * totalW;
        let acc = 0;
        for (let k = 0; k < weights.length; k++) {
          acc += weights[k];
          if (r <= acc) {
            pick = k;
            break;
          }
        }
      }
      const cn = costNodes[pick];
      destination = { kind: "cost", node: cn };
      exitX = cn.cx + (rand() - 0.5) * 14;
      exitY = cn.cy + (rand() - 0.5) * 14;
    }

    // exit transit: chamber bottom center → midpoint → destination
    wp.push({ x: CHAMBER_EXIT.x + (rand() - 0.5) * 60, y: CHAMBER_EXIT.y });
    wp.push({ x: exitX, y: exitY });
    sats.push(finalSat * 0.85);
    sats.push(finalSat * 0.7);

    // timestamps: distribute roughly evenly
    const N = wp.length;
    const times: number[] = [];
    for (let k = 0; k < N; k++) times.push(k / (N - 1));

    plans.push({
      id: i,
      waypoints: wp,
      saturations: sats,
      times,
      color: RAINBOW[Math.floor(rand() * RAINBOW.length)],
      duration: 11 + rand() * 7,
      delay: rand() * 14,
      size: 3.4 + rand() * 1.6,
      destination,
      finalSat,
    });
  }
  return plans;
}

/* ---------- helpers ---------- */

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const h = hex.replace("#", "");
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}
/** mix(color, target='#0a0a0c') by amount 0..1 (1 = full target) */
function fadeToShadow(hex: string, amount: number): string {
  const { r, g, b } = hexToRgb(hex);
  const tr = 0x0a, tg = 0x0a, tb = 0x0c;
  const m = (a: number, t: number) => Math.round(a * (1 - amount) + t * amount);
  return `rgb(${m(r, tr)}, ${m(g, tg)}, ${m(b, tb)})`;
}

/* ---------- mechanism node component ---------- */

function MechanismNode({
  node,
  onHover,
  onLeave,
  onSelect,
}: {
  node: Node;
  onHover: (n: Node, x: number, y: number) => void;
  onLeave: () => void;
  onSelect: (n: Node) => void;
}) {
  // On touch devices we skip the tooltip and go straight to the modal — the
  // modal contains the same brief plus the source. The double-fire of
  // touchstart+click was opening the modal before the tooltip could be read.
  return (
    <g
      style={{ cursor: "pointer" }}
      onMouseEnter={(e) => onHover(node, e.clientX, e.clientY)}
      onMouseMove={(e) => onHover(node, e.clientX, e.clientY)}
      onMouseLeave={onLeave}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(node);
      }}
    >
      {/* invisible larger hit area — 22px radius gives ~44px touch diameter */}
      <circle cx={node.cx} cy={node.cy} r={22} fill="transparent" />
      {/* outer halo */}
      <circle
        cx={node.cx}
        cy={node.cy}
        r={7}
        fill={node.color}
        opacity={0.18}
      />
      {/* core dot */}
      <circle
        cx={node.cx}
        cy={node.cy}
        r={3.4}
        fill={node.color}
        opacity={0.95}
      />
      {/* label below */}
      <text
        x={node.cx}
        y={node.cy + 18}
        textAnchor="middle"
        fontFamily="'EB Garamond', ui-serif, Georgia, serif"
        fontStyle="italic"
        fontSize="11.5"
        fill="#d8cfb8"
        opacity={0.88}
        style={{ pointerEvents: "none" }}
      >
        {node.m.name}
      </text>
    </g>
  );
}

/* ---------- particle stream component ---------- */

function ParticleStream({ plan, reduced }: { plan: ParticlePlan; reduced: boolean }) {
  const xs = plan.waypoints.map((w) => w.x);
  const ys = plan.waypoints.map((w) => w.y);
  const colors = plan.saturations.map((s) => fadeToShadow(plan.color, 1 - s));
  // opacities: fade in at start, gentle fade as the particle exits the chamber
  const N = plan.waypoints.length;
  const opacities = plan.waypoints.map((_, i) => {
    if (i === 0) return 0;
    if (i === 1) return 1;
    if (i === N - 1) return 0;
    if (i === N - 2) return 0.85;
    return 1;
  });

  // Reduced-motion: render a single static dot at a mid-path waypoint so
  // the chamber composition still reads as "particles passing through filters"
  // without continuous animation.
  if (reduced) {
    const midIdx = Math.max(1, Math.floor(N / 2));
    return (
      <circle
        cx={xs[midIdx]}
        cy={ys[midIdx]}
        r={plan.size}
        fill={colors[midIdx]}
        opacity={0.85}
        style={{ mixBlendMode: "screen" }}
      />
    );
  }

  return (
    <motion.circle
      r={plan.size}
      initial={{ opacity: 0 }}
      animate={{
        cx: xs,
        cy: ys,
        fill: colors,
        opacity: opacities,
      }}
      transition={{
        duration: plan.duration,
        delay: plan.delay,
        repeat: Infinity,
        ease: "easeInOut",
        times: plan.times,
      }}
      style={{ mixBlendMode: "screen" }}
    />
  );
}

/* ---------- bad-intent dark cloud (does not visit nodes; pours straight down to output) ---------- */

function BadIntentCloud({ id, seed }: { id: number; seed: number }) {
  // simple deterministic per-puff jitter
  const rng = useMemo(() => {
    let s = seed + id * 31;
    return () => {
      s = (s * 9301 + 49297) % 233280;
      return s / 233280;
    };
  }, [id, seed]);
  const startX = BAD_ENTRY.x + (rng() - 0.5) * 90;
  const endX = CHAMBER_EXIT.x + 80 + (rng() - 0.5) * 120;
  const size = 14 + rng() * 16;
  const dur = 9 + rng() * 5;
  const delay = rng() * 10;
  const xs = [
    startX,
    startX + (rng() - 0.5) * 30,
    (startX + endX) / 2 + (rng() - 0.5) * 60,
    endX,
    endX + (rng() - 0.5) * 30,
  ];
  const ys = [
    BAD_ENTRY.y - 50,
    BAD_ENTRY.y + 60,
    BOX.y + BOX.h / 2,
    CHAMBER_EXIT.y + 30,
    VIEW_H - 80,
  ];
  return (
    <motion.circle
      r={size}
      fill="#0a0a0c"
      initial={{ opacity: 0 }}
      animate={{
        cx: xs,
        cy: ys,
        opacity: [0, 0.55, 0.45, 0.4, 0],
      }}
      transition={{
        duration: dur,
        delay,
        repeat: Infinity,
        ease: "easeIn",
      }}
      style={{ filter: "blur(7px)" }}
    />
  );
}

/* ---------- cost node (one of ten) ---------- */

function CostNodeGlyph({
  cn,
  onHover,
  onLeave,
  onSelect,
}: {
  cn: CostNode;
  onHover: (cn: CostNode, x: number, y: number) => void;
  onLeave: () => void;
  onSelect: (cn: CostNode) => void;
}) {
  const color = LOSS_CATEGORIES[cn.loss.category].color;
  return (
    <g
      style={{ cursor: "pointer" }}
      onMouseEnter={(e) => onHover(cn, e.clientX, e.clientY)}
      onMouseMove={(e) => onHover(cn, e.clientX, e.clientY)}
      onMouseLeave={onLeave}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(cn);
      }}
    >
      {/* invisible larger hit area — ~44px diameter */}
      <circle cx={cn.cx} cy={cn.cy} r={22} fill="transparent" />
      {/* outer halo */}
      <circle cx={cn.cx} cy={cn.cy} r={8} fill={color} opacity={0.18} />
      {/* core dot */}
      <circle cx={cn.cx} cy={cn.cy} r={4.2} fill={color} opacity={0.95} />
      {/* italic label below */}
      <text
        x={cn.cx}
        y={cn.cy + 22}
        textAnchor="middle"
        fontFamily="'EB Garamond', ui-serif, Georgia, serif"
        fontStyle="italic"
        fontSize="11.5"
        fill="#d8cfb8"
        opacity={0.9}
        style={{ pointerEvents: "none" }}
      >
        {cn.display}
      </text>
    </g>
  );
}

/* ---------- die frame (subtle outline + mono header) ---------- */

function DieFrame({
  cx,
  cy,
  size,
  header,
}: {
  cx: number;
  cy: number;
  size: number;
  header: string;
}) {
  const half = size / 2;
  return (
    <g>
      {/* faint frame */}
      <rect
        x={cx - half}
        y={cy - half}
        width={size}
        height={size}
        rx={10}
        ry={10}
        fill="none"
        stroke="#3a362e"
        strokeWidth={1}
        strokeDasharray="2 4"
        opacity={0.6}
      />
      {/* mono header above the die */}
      <text
        x={cx}
        y={cy - half - 14}
        textAnchor="middle"
        fontFamily="'JetBrains Mono', ui-monospace, monospace"
        fontSize="9.5"
        letterSpacing="0.22em"
        fill="#a89e8a"
        opacity={0.8}
      >
        {header}
      </text>
    </g>
  );
}

/* ---------- flank plume (DILUTED / HURTFUL) ---------- */

function FlankPlume({
  cx,
  cy,
  color,
  label,
  reduced,
}: {
  cx: number;
  cy: number;
  color: string;
  label: string;
  reduced: boolean;
}) {
  // turbulence-displaced ink plume, similar register to the prior estuaries
  const plumeD = `M ${cx - 26} ${cy - 60}
            Q ${cx - 12} ${cy - 30} ${cx - 18} ${cy + 30}
            Q ${cx - 6} ${cy + 80} ${cx + 14} ${cy + 70}
            L ${cx + 22} ${cy + 70}
            Q ${cx + 6} ${cy + 30} ${cx + 24} ${cy - 60}
            Q ${cx + 8} ${cy - 50} ${cx - 26} ${cy - 60} Z`;
  return (
    <g>
      {/* central body */}
      <ellipse
        cx={cx}
        cy={cy}
        rx={26}
        ry={62}
        fill={color}
        opacity={0.42}
        filter="url(#fc-soft-blur)"
      />
      {reduced ? (
        <path d={plumeD} fill={color} opacity={0.55} filter="url(#fc-turb)" />
      ) : (
        <motion.path
          d={plumeD}
          fill={color}
          opacity={0.65}
          filter="url(#fc-turb)"
          animate={{ opacity: [0.45, 0.75, 0.45] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
      <text
        x={cx}
        y={cy + 102}
        textAnchor="middle"
        fontFamily="'JetBrains Mono', ui-monospace, monospace"
        fontSize="12"
        fontWeight="500"
        letterSpacing="0.28em"
        fill="#d8cfb8"
      >
        {label}
      </text>
    </g>
  );
}

/* ---------- root chamber ---------- */

export function FilterChamber() {
  const reduced = usePrefersReducedMotion();
  const narrow = useIsNarrow(768);

  // Particle count: 50 on desktop, 24 on phones, 12 frozen-frame for reduced-motion.
  // The chamber composition still reads at lower counts; framer-motion arrays
  // and SVG turbulence + bloom are the heavy bits, not the particle count alone,
  // but every dot saves an `animate` array on the GPU compositor.
  const particleCount = reduced ? 12 : narrow ? 24 : 50;
  const badPuffCount = reduced ? 0 : narrow ? 4 : 8;

  const nodes = useMemo(() => buildNodes(), []);
  const { dieA, dieB } = useMemo(
    () => buildCostNodes(narrow ? "narrow" : "wide"),
    [narrow],
  );
  const costNodesAll = useMemo(() => [...dieA, ...dieB], [dieA, dieB]);
  const particlePlans = useMemo(
    () => planParticles(7, nodes, particleCount, costNodesAll),
    [nodes, particleCount, costNodesAll],
  );
  const badPuffs = useMemo(
    () => Array.from({ length: badPuffCount }, (_, i) => i),
    [badPuffCount],
  );

  // tooltip + modal state — covers both mechanism nodes and cost nodes
  const wrapRef = useRef<HTMLDivElement | null>(null);
  type TipState =
    | { kind: "mech"; node: Node; x: number; y: number }
    | { kind: "cost"; cn: CostNode; x: number; y: number };
  const [tip, setTip] = useState<TipState | null>(null);
  type SelState =
    | { kind: "mech"; node: Node }
    | { kind: "cost"; cn: CostNode };
  const [selected, setSelected] = useState<SelState | null>(null);

  const onHover = (node: Node, clientX: number, clientY: number) => {
    if (selected) return;
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    setTip({ kind: "mech", node, x: clientX - rect.left, y: clientY - rect.top });
  };
  const onCostHover = (cn: CostNode, clientX: number, clientY: number) => {
    if (selected) return;
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    setTip({ kind: "cost", cn, x: clientX - rect.left, y: clientY - rect.top });
  };
  const onLeave = () => setTip(null);
  const onSelect = (node: Node) => {
    setTip(null);
    setSelected({ kind: "mech", node });
  };
  const onCostSelect = (cn: CostNode) => {
    setTip(null);
    setSelected({ kind: "cost", cn });
  };
  const closeModal = () => setSelected(null);

  // close tooltip / modal on escape
  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setTip(null);
        setSelected(null);
      }
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, []);

  // body scroll-lock while modal is open — iOS-safe via class + position fix
  useBodyScrollLock(selected !== null);

  return (
    <div
      ref={wrapRef}
      className="chamber-wrap"
      style={{ position: "relative" }}
      aria-label="The Filter Chamber, animated"
    >
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        style={{ width: "100%", height: "auto", display: "block" }}
        role="img"
      >
        <defs>
          {/* turbulence for organic edges on the output plumes */}
          <filter id="fc-turb" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.022 0.06"
              numOctaves="2"
              seed="3"
            />
            <feDisplacementMap in="SourceGraphic" scale="10" />
          </filter>
          <filter id="fc-soft-blur">
            <feGaussianBlur stdDeviation="2" />
          </filter>
          {/* glow for rainbow input column */}
          <radialGradient id="fc-good-glow" cx="0.5" cy="0.4" r="0.55">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="35%" stopColor="#ffd23a" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#ff2a3a" stopOpacity="0" />
          </radialGradient>
          {/* the rainbow ink-in-water column itself, layered gradient */}
          <linearGradient id="fc-rainbow-stream" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ff2a3a" stopOpacity="0" />
            <stop offset="12%" stopColor="#ff2a3a" stopOpacity="0.9" />
            <stop offset="30%" stopColor="#ff7a1c" stopOpacity="0.95" />
            <stop offset="46%" stopColor="#ffd23a" stopOpacity="0.95" />
            <stop offset="62%" stopColor="#3acb4f" stopOpacity="0.95" />
            <stop offset="78%" stopColor="#2aa1ff" stopOpacity="0.9" />
            <stop offset="92%" stopColor="#7a4cff" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#7a4cff" stopOpacity="0" />
          </linearGradient>
          {/* dark cloud column gradient */}
          <linearGradient id="fc-bad-stream" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0a0a0c" stopOpacity="0" />
            <stop offset="40%" stopColor="#0a0a0c" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#0a0a0c" stopOpacity="0" />
          </linearGradient>
          {/* bloom for rainbow */}
          <filter
            id="fc-bloom"
            x="-30%"
            y="-30%"
            width="160%"
            height="160%"
          >
            <feGaussianBlur stdDeviation="6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ---------- INPUT LABELS ---------- */}
        <g
          fontFamily="'EB Garamond', ui-serif, Georgia, serif"
          fontStyle="italic"
          fontSize="14"
          fill="#d8cfb8"
        >
          <text x={GOOD_ENTRY.x - 110} y={70} textAnchor="end">
            Good intentions
          </text>
          <text x={BAD_ENTRY.x + 110} y={70} textAnchor="start">
            Bad intentions
          </text>
        </g>

        {/* ---------- RAINBOW INK COLUMN (good intent) ---------- */}
        <g filter="url(#fc-bloom)">
          {/* main column */}
          <path
            d={`M ${GOOD_ENTRY.x - 30} 30
                Q ${GOOD_ENTRY.x - 14} 100 ${GOOD_ENTRY.x - 28} ${GOOD_ENTRY.y - 30}
                Q ${GOOD_ENTRY.x - 4} ${GOOD_ENTRY.y - 8} ${GOOD_ENTRY.x + 22} ${GOOD_ENTRY.y - 30}
                Q ${GOOD_ENTRY.x + 16} 100 ${GOOD_ENTRY.x + 30} 30 Z`}
            fill="url(#fc-rainbow-stream)"
            filter="url(#fc-turb)"
            opacity="0.95"
          />
          {/* secondary swirl */}
          {!reduced && (
            <motion.path
              data-motion-decoration="true"
              d={`M ${GOOD_ENTRY.x - 18} 40
                Q ${GOOD_ENTRY.x + 6} 110 ${GOOD_ENTRY.x - 8} ${GOOD_ENTRY.y - 40}
                Q ${GOOD_ENTRY.x + 12} ${GOOD_ENTRY.y - 18} ${GOOD_ENTRY.x + 18} ${GOOD_ENTRY.y - 50}
                Q ${GOOD_ENTRY.x + 4} 90 ${GOOD_ENTRY.x + 14} 40 Z`}
              fill="url(#fc-rainbow-stream)"
              filter="url(#fc-turb)"
              opacity="0.7"
              animate={{ opacity: [0.5, 0.85, 0.5] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
        </g>

        {/* ---------- DARK INK COLUMN (bad intent) ---------- */}
        <g>
          <path
            d={`M ${BAD_ENTRY.x - 36} 30
                Q ${BAD_ENTRY.x - 14} 110 ${BAD_ENTRY.x - 30} ${BAD_ENTRY.y - 30}
                Q ${BAD_ENTRY.x + 4} ${BAD_ENTRY.y - 12} ${BAD_ENTRY.x + 30} ${BAD_ENTRY.y - 30}
                Q ${BAD_ENTRY.x + 16} 110 ${BAD_ENTRY.x + 36} 30 Z`}
            fill="url(#fc-bad-stream)"
            filter="url(#fc-turb)"
            opacity="0.92"
          />
        </g>

        {/* ---------- CHAMBER RECTANGLE (the box) ---------- */}
        {/* hand-drawn-ish stroke via SVG turbulence on a duplicate */}
        <g>
          <rect
            x={BOX.x}
            y={BOX.y}
            width={BOX.w}
            height={BOX.h}
            rx={32}
            ry={32}
            fill="#0e0d0b"
            stroke="#3a362e"
            strokeWidth={1.6}
            filter="url(#fc-turb)"
            opacity={0.9}
          />
          {/* clean overlay rect for crisp inner border */}
          <rect
            x={BOX.x}
            y={BOX.y}
            width={BOX.w}
            height={BOX.h}
            rx={32}
            ry={32}
            fill="none"
            stroke="#5a554a"
            strokeWidth={1}
            strokeDasharray="0"
            opacity={0.55}
          />
        </g>

        {/* CHAMBER LEFT-MARGIN ANNOTATION (mirrors 2016 sketch) */}
        <g
          fontFamily="'EB Garamond', ui-serif, Georgia, serif"
          fontStyle="italic"
          fontSize="12.5"
          fill="#a89e8a"
        >
          <text x={BOX.x - 14} y={BOX.y + 30} textAnchor="end">
            Mechanisms
          </text>
          <text x={BOX.x - 14} y={BOX.y + 46} textAnchor="end">
            That render
          </text>
          <text x={BOX.x - 14} y={BOX.y + 62} textAnchor="end">
            governments
          </text>
          <text x={BOX.x - 14} y={BOX.y + 78} textAnchor="end">
            inefficient
          </text>
        </g>

        {/* ---------- CATEGORY PANEL HEADERS ---------- */}
        {CATEGORY_ORDER.map((catKey, idx) => {
          const col = idx % COLS;
          const row = Math.floor(idx / COLS);
          const px = BOX.x + col * PANEL_W;
          const py = BOX.y + row * PANEL_H;
          const cat = CATEGORIES[catKey];
          return (
            <g key={catKey}>
              {/* faint divider lines between panels */}
              {col > 0 && (
                <line
                  x1={px}
                  y1={BOX.y + 14}
                  x2={px}
                  y2={BOX.y + BOX.h - 14}
                  stroke="#26241f"
                  strokeWidth={1}
                  strokeDasharray="2 4"
                />
              )}
              {row > 0 && (
                <line
                  x1={px + 14}
                  y1={py}
                  x2={px + PANEL_W - 14}
                  y2={py}
                  stroke="#26241f"
                  strokeWidth={1}
                  strokeDasharray="2 4"
                />
              )}
              {/* category label */}
              <text
                x={px + PANEL_W / 2}
                y={py + 22}
                textAnchor="middle"
                fontFamily="'JetBrains Mono', ui-monospace, monospace"
                fontSize="9.5"
                letterSpacing="0.22em"
                fill={cat.color}
                opacity={0.88}
              >
                {cat.label.toUpperCase()}
              </text>
            </g>
          );
        })}

        {/* ---------- MECHANISM NODES ---------- */}
        {nodes.map((n) => (
          <MechanismNode
            key={n.m.id}
            node={n}
            onHover={onHover}
            onLeave={onLeave}
            onSelect={onSelect}
          />
        ))}

        {/* ---------- BAD-INTENT CLOUD PUFFS (drawn under particles) ---------- */}
        {badPuffs.map((i) => (
          <BadIntentCloud key={`bad-${i}`} id={i} seed={31} />
        ))}

        {/* ---------- PARTICLES (random walk through nodes) ---------- */}
        {particlePlans.map((p) => (
          <ParticleStream key={`p-${p.id}`} plan={p} reduced={reduced} />
        ))}

        {/* ---------- THIN FILAMENTS from chamber exit branching to destinations ---------- */}
        <g
          stroke="#1a1916"
          strokeWidth={1.2}
          fill="none"
          opacity={0.55}
          filter="url(#fc-turb)"
        >
          {/* to DILUTED flank */}
          <path
            d={`M ${CHAMBER_EXIT.x} ${CHAMBER_EXIT.y}
                Q ${CHAMBER_EXIT.x - 200} ${CHAMBER_EXIT.y + 60}
                  ${FLANK_DILUTED.cx} ${FLANK_DILUTED.cy - 40}`}
          />
          {/* to Die A center */}
          <path
            d={`M ${CHAMBER_EXIT.x} ${CHAMBER_EXIT.y}
                Q ${CHAMBER_EXIT.x - 60} ${CHAMBER_EXIT.y + 50}
                  ${DIE_A_CX} ${DIE_CY - DIE_INSET - 8}`}
          />
          {/* to Die B center */}
          <path
            d={`M ${CHAMBER_EXIT.x} ${CHAMBER_EXIT.y}
                Q ${CHAMBER_EXIT.x + 60} ${CHAMBER_EXIT.y + 50}
                  ${DIE_B_CX} ${DIE_CY - DIE_INSET - 8}`}
          />
          {/* to HURTFUL flank */}
          <path
            d={`M ${CHAMBER_EXIT.x} ${CHAMBER_EXIT.y}
                Q ${CHAMBER_EXIT.x + 200} ${CHAMBER_EXIT.y + 60}
                  ${FLANK_HURTFUL.cx} ${FLANK_HURTFUL.cy - 40}`}
          />
        </g>

        {/* ---------- FLANK PLUMES (DILUTED · HURTFUL) ---------- */}
        <FlankPlume
          cx={FLANK_DILUTED.cx}
          cy={FLANK_DILUTED.cy}
          color={FLANK_DILUTED.color}
          label={FLANK_DILUTED.label}
          reduced={reduced}
        />
        <FlankPlume
          cx={FLANK_HURTFUL.cx}
          cy={FLANK_HURTFUL.cy}
          color={FLANK_HURTFUL.color}
          label={FLANK_HURTFUL.label}
          reduced={reduced}
        />

        {/* ---------- TWO DICE FRAMES + HEADERS ---------- */}
        <DieFrame
          cx={DIE_A_CX}
          cy={DIE_CY}
          size={DIE_SIZE}
          header="§ — MATERIAL & HUMAN"
        />
        <DieFrame
          cx={DIE_B_CX}
          cy={DIE_CY}
          size={DIE_SIZE}
          header="§ — SOCIAL & EPISTEMIC"
        />

        {/* ---------- COST NODES (ten dots) ---------- */}
        {dieA.map((cn) => (
          <CostNodeGlyph
            key={cn.id}
            cn={cn}
            onHover={onCostHover}
            onLeave={onLeave}
            onSelect={onCostSelect}
          />
        ))}
        {dieB.map((cn) => (
          <CostNodeGlyph
            key={cn.id}
            cn={cn}
            onHover={onCostHover}
            onLeave={onLeave}
            onSelect={onCostSelect}
          />
        ))}

        {/* ---------- OUTPUT GRADIENT LABEL ---------- */}
        <g
          fontFamily="'EB Garamond', ui-serif, Georgia, serif"
          fontStyle="italic"
          fontSize="13"
          fill="#a89e8a"
        >
          <text x={BOX.x + 12} y={VIEW_H - 26}>
            Diluted positive outcomes
          </text>
          <text x={BOX.x + 38} y={VIEW_H - 12}>
            to downright hurtful outcomes
          </text>
          <text
            x={VIEW_W - 14}
            y={VIEW_H - 12}
            textAnchor="end"
            fontStyle="italic"
            fill="#7a7367"
          >
            2% of psychopaths ruining it
          </text>
        </g>
      </svg>

      {/* ---------- TOOLTIP (HTML overlay, follows cursor) ---------- */}
      {tip && tip.kind === "mech" && (() => {
        const producedLosses =
          // small "Produces:" footer (truncate at 2; full list lives in the modal)
          LOSSES.filter((l) => l.produced_by.includes(tip.node.m.id));
        return (
          <div
            role="tooltip"
            style={{
              position: "absolute",
              left: Math.min(tip.x + 14, (wrapRef.current?.clientWidth ?? 9999) - 320),
              top: Math.max(tip.y - 12, 0),
              pointerEvents: "none",
              zIndex: 5,
              maxWidth: 300,
              background: "rgba(20,19,17,0.96)",
              border: `1px solid ${tip.node.color}`,
              borderLeft: `3px solid ${tip.node.color}`,
              padding: "10px 12px",
              color: "var(--ivory)",
              fontFamily: "'EB Garamond', ui-serif, Georgia, serif",
              fontSize: 14,
              lineHeight: 1.45,
              boxShadow: "0 8px 24px rgba(0,0,0,0.45)",
              borderRadius: 2,
            }}
          >
            <div
              style={{
                fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                fontSize: 9.5,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: tip.node.color,
                marginBottom: 6,
              }}
            >
              {tip.node.m.year} · {tip.node.m.originator}
            </div>
            <div
              style={{
                fontFamily: "'Fraunces', ui-serif, serif",
                fontSize: 16,
                fontWeight: 500,
                marginBottom: 6,
                color: "var(--ivory)",
              }}
            >
              {tip.node.m.name}
            </div>
            <div style={{ color: "var(--paper)", fontStyle: "italic" }}>
              {tip.node.m.brief}
            </div>
            {producedLosses.length > 0 && (
              <div
                style={{
                  marginTop: 8,
                  paddingTop: 8,
                  borderTop: "1px solid var(--border-soft)",
                  fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                  fontSize: 9.5,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--mute)",
                }}
              >
                → Produces:{" "}
                {producedLosses
                  .slice(0, 2)
                  .map((l) => l.name)
                  .join(", ")}
                {producedLosses.length > 2 && ` +${producedLosses.length - 2}`}
              </div>
            )}
          </div>
        );
      })()}
      {tip && tip.kind === "cost" && (() => {
        const tint = LOSS_CATEGORIES[tip.cn.loss.category].color;
        return (
          <div
            role="tooltip"
            style={{
              position: "absolute",
              left: Math.min(tip.x + 14, (wrapRef.current?.clientWidth ?? 9999) - 320),
              top: Math.max(tip.y - 12, 0),
              pointerEvents: "none",
              zIndex: 5,
              maxWidth: 300,
              background: "rgba(20,19,17,0.96)",
              border: `1px solid ${tint}`,
              borderLeft: `3px solid ${tint}`,
              padding: "10px 12px",
              color: "var(--ivory)",
              fontFamily: "'EB Garamond', ui-serif, Georgia, serif",
              fontSize: 14,
              lineHeight: 1.45,
              boxShadow: "0 8px 24px rgba(0,0,0,0.45)",
              borderRadius: 2,
            }}
          >
            <div
              style={{
                fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                fontSize: 9.5,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: tint,
                marginBottom: 6,
              }}
            >
              {LOSS_CATEGORIES[tip.cn.loss.category].label}
            </div>
            <div
              style={{
                fontFamily: "'Fraunces', ui-serif, serif",
                fontSize: 16,
                fontWeight: 500,
                marginBottom: 6,
                color: "var(--ivory)",
              }}
            >
              {tip.cn.display}
            </div>
            <div style={{ color: "var(--paper)", fontStyle: "italic" }}>
              {tip.cn.loss.brief}
            </div>
          </div>
        );
      })()}

      {/* ---------- MODAL (mechanism node — click-through; full claim + source + link) ---------- */}
      {selected && selected.kind === "mech" && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={`fc-modal-title-${selected.node.m.id}`}
          onClick={closeModal}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            background: "rgba(8,7,6,0.78)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "clamp(16px, 4vw, 48px)",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "var(--surface)",
              border: `1px solid ${selected.node.color}`,
              borderLeft: `4px solid ${selected.node.color}`,
              maxWidth: 640,
              width: "100%",
              maxHeight: "85vh",
              overflowY: "auto",
              padding: "clamp(22px, 3.4vw, 36px)",
              position: "relative",
              boxShadow: "0 24px 64px rgba(0,0,0,0.7)",
              borderRadius: 2,
              color: "var(--ivory)",
            }}
          >
            <button
              onClick={closeModal}
              aria-label="Close"
              style={{
                position: "absolute",
                top: 8,
                right: 8,
                background: "transparent",
                border: "1px solid var(--border-mid)",
                color: "var(--paper)",
                width: 44,
                height: 44,
                cursor: "pointer",
                fontSize: 22,
                lineHeight: 1,
                fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 0,
                borderRadius: 2,
                touchAction: "manipulation",
                transition: "border-color .15s, color .15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = selected.node.color;
                e.currentTarget.style.color = "var(--ivory)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border-mid)";
                e.currentTarget.style.color = "var(--paper)";
              }}
            >
              ×
            </button>

            <div
              style={{
                fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                fontSize: 10.5,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: selected.node.color,
                marginBottom: 14,
                paddingRight: 56,
              }}
            >
              {selected.node.m.year} · {selected.node.m.originator} ·{" "}
              {selected.node.m.field}
            </div>

            <h3
              id={`fc-modal-title-${selected.node.m.id}`}
              style={{
                fontFamily: "'Fraunces', ui-serif, serif",
                fontSize: "clamp(1.5rem, 3vw, 2rem)",
                fontWeight: 500,
                color: "var(--ivory)",
                marginBottom: 18,
                lineHeight: 1.15,
                letterSpacing: "-0.005em",
              }}
            >
              {selected.node.m.name}
            </h3>

            <p
              style={{
                fontFamily: "'EB Garamond', ui-serif, Georgia, serif",
                fontSize: 17,
                lineHeight: 1.55,
                color: "var(--paper)",
                marginBottom: 22,
              }}
            >
              {selected.node.m.claim}
            </p>

            <p
              style={{
                fontFamily: "'EB Garamond', ui-serif, Georgia, serif",
                fontSize: 13,
                lineHeight: 1.55,
                fontStyle: "italic",
                color: "var(--mute)",
                paddingTop: 14,
                marginBottom: 18,
                borderTop: "1px solid var(--border-soft)",
              }}
            >
              {selected.node.m.source}
            </p>

            {selected.node.m.url && (
              <a
                href={selected.node.m.url}
                target="_blank"
                rel="noreferrer"
                style={{
                  fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                  fontSize: 11,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: selected.node.color,
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  borderBottom: `1px solid ${selected.node.color}`,
                  paddingBottom: 2,
                }}
              >
                Reference <ExternalLink size={12} />
              </a>
            )}
          </div>
        </div>
      )}

      {/* ---------- MODAL (cost node — full claim, observable, incidence, links) ---------- */}
      {selected && selected.kind === "cost" && (() => {
        const loss = selected.cn.loss;
        const tint = LOSS_CATEGORIES[loss.category].color;
        return (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={`fc-modal-loss-title-${loss.id}`}
            onClick={closeModal}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 100,
              background: "rgba(8,7,6,0.78)",
              backdropFilter: "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "clamp(16px, 4vw, 48px)",
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                background: "var(--surface)",
                border: `1px solid ${tint}`,
                borderLeft: `4px solid ${tint}`,
                maxWidth: 720,
                width: "100%",
                maxHeight: "88vh",
                overflowY: "auto",
                padding: "clamp(22px, 3.4vw, 38px)",
                position: "relative",
                boxShadow: "0 24px 64px rgba(0,0,0,0.7)",
                borderRadius: 2,
                color: "var(--ivory)",
              }}
            >
              <button
                onClick={closeModal}
                aria-label="Close"
                style={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  background: "transparent",
                  border: "1px solid var(--border-mid)",
                  color: "var(--paper)",
                  width: 44,
                  height: 44,
                  cursor: "pointer",
                  fontSize: 22,
                  lineHeight: 1,
                  fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 0,
                  borderRadius: 2,
                  touchAction: "manipulation",
                  transition: "border-color .15s, color .15s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = tint;
                  e.currentTarget.style.color = "var(--ivory)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border-mid)";
                  e.currentTarget.style.color = "var(--paper)";
                }}
              >
                ×
              </button>

              <div
                style={{
                  fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                  fontSize: 10.5,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: tint,
                  marginBottom: 14,
                  paddingRight: 56,
                }}
              >
                {LOSS_CATEGORIES[loss.category].label} · cost ledger
              </div>

              <h3
                id={`fc-modal-loss-title-${loss.id}`}
                style={{
                  fontFamily: "'Fraunces', ui-serif, serif",
                  fontSize: "clamp(1.5rem, 3vw, 2rem)",
                  fontWeight: 500,
                  color: "var(--ivory)",
                  marginBottom: 18,
                  lineHeight: 1.15,
                  letterSpacing: "-0.005em",
                }}
              >
                {loss.name}
              </h3>

              <p
                style={{
                  fontFamily: "'EB Garamond', ui-serif, Georgia, serif",
                  fontSize: 17,
                  lineHeight: 1.6,
                  color: "var(--paper)",
                  marginBottom: 22,
                }}
              >
                {loss.claim}
              </p>

              {/* OBSERVABLE */}
              <div style={{ marginBottom: 16 }}>
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                    fontSize: 10,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "var(--dim)",
                    marginBottom: 4,
                  }}
                >
                  Observable
                </div>
                <div
                  style={{
                    fontFamily: "'EB Garamond', ui-serif, Georgia, serif",
                    fontSize: 15,
                    lineHeight: 1.55,
                    color: "var(--paper)",
                  }}
                >
                  {loss.observable}
                </div>
              </div>

              {/* INCIDENCE */}
              <div style={{ marginBottom: 22 }}>
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                    fontSize: 10,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "var(--dim)",
                    marginBottom: 4,
                  }}
                >
                  Incidence
                </div>
                <div
                  style={{
                    fontFamily: "'EB Garamond', ui-serif, Georgia, serif",
                    fontStyle: "italic",
                    fontSize: 14.5,
                    lineHeight: 1.55,
                    color: "var(--mute)",
                  }}
                >
                  {loss.incidence}
                </div>
              </div>

              {/* PRODUCED BY — anchor pills */}
              {loss.produced_by.length > 0 && (
                <div
                  style={{
                    marginBottom: 22,
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 8,
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                      fontSize: 10,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "var(--dim)",
                      marginRight: 4,
                    }}
                  >
                    Produced by
                  </span>
                  {loss.produced_by.map((mid) => (
                    <a
                      key={mid}
                      href={`#m-${mid}`}
                      onClick={closeModal}
                      style={{
                        fontFamily:
                          "'JetBrains Mono', ui-monospace, monospace",
                        fontSize: 10.5,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: "var(--paper)",
                        border: "1px solid var(--border-mid)",
                        padding: "4px 8px",
                        borderRadius: 2,
                        textDecoration: "none",
                      }}
                    >
                      {mid.replace(/-/g, " ")}
                    </a>
                  ))}
                </div>
              )}

              <p
                style={{
                  fontFamily: "'EB Garamond', ui-serif, Georgia, serif",
                  fontSize: 13,
                  lineHeight: 1.55,
                  fontStyle: "italic",
                  color: "var(--mute)",
                  paddingTop: 14,
                  marginBottom: 18,
                  borderTop: "1px solid var(--border-soft)",
                }}
              >
                {loss.reference}
              </p>

              {loss.url && (
                <a
                  href={loss.url}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                    fontSize: 11,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: tint,
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    borderBottom: `1px solid ${tint}`,
                    paddingBottom: 2,
                  }}
                >
                  Reference <ExternalLink size={12} />
                </a>
              )}
            </div>
          </div>
        );
      })()}
    </div>
  );
}

export default FilterChamber;
