import { useMemo } from "react";
import { motion } from "framer-motion";

/**
 * Filter Chamber — animated.
 *
 * Metaphor: rainbow particles (good intent / good will) and a dark cloud (bad intent)
 * both enter the maelstrom. Rainbow particles desaturate as they spiral inward; output
 * is a uniformly dark plume. The contrast between elegance and entropic outcome is the diagnosis.
 */

const VIEW_W = 800;
const VIEW_H = 700;
const CENTER_X = VIEW_W / 2;
const CENTER_Y = 380;
const MAELSTROM_R = 180;

/* rainbow palette — saturated good will */
const RAINBOW = [
  "#e64545", // crimson
  "#e88a2e", // amber
  "#e6c34a", // gold
  "#7fbf5a", // green
  "#5a9fd0", // azure
  "#7a6cc4", // violet
];

type Particle = {
  id: number;
  // entry angle on the rim (radians, where it enters the chamber)
  entryAngle: number;
  // initial spiral radius (starts outside the chamber, spirals in)
  initialR: number;
  // total rotations during descent
  spins: number;
  // duration in seconds
  duration: number;
  // delay
  delay: number;
  // particle radius
  size: number;
  // color
  color: string;
  // dark cloud or rainbow
  kind: "good" | "bad";
};

function buildParticles(seed: number): Particle[] {
  // simple deterministic PRNG so renders are stable
  let s = seed;
  const rand = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };

  const goodCount = 22;
  const badCount = 10;
  const ps: Particle[] = [];

  // GOOD particles enter from the upper-left funnel (angle around 200°–250° in screen coords)
  for (let i = 0; i < goodCount; i++) {
    ps.push({
      id: i,
      // entry funnel: roughly 195°–250° (upper-left, sweeping down)
      entryAngle: ((195 + rand() * 55) * Math.PI) / 180,
      initialR: 1.55 + rand() * 0.25, // beyond the rim
      spins: 1.5 + rand() * 0.9,
      duration: 7 + rand() * 4,
      delay: rand() * 8,
      size: 2.2 + rand() * 2.4,
      color: RAINBOW[Math.floor(rand() * RAINBOW.length)],
      kind: "good",
    });
  }

  // BAD particles (dark cloud puffs) enter from the upper-right funnel (~290°–345°)
  for (let i = 0; i < badCount; i++) {
    ps.push({
      id: goodCount + i,
      entryAngle: ((290 + rand() * 55) * Math.PI) / 180,
      initialR: 1.55 + rand() * 0.25,
      spins: 1.4 + rand() * 0.7,
      duration: 8 + rand() * 4,
      delay: rand() * 8,
      size: 6 + rand() * 6,
      color: "#0a0a0c",
      kind: "bad",
    });
  }

  return ps;
}

/* Build a spiral path from outside the chamber to the center.
   Returns CSS keyframe values for cx, cy. We pre-compute discrete waypoints
   along an exponential-decay spiral and let framer-motion interpolate. */
function spiralWaypoints(
  entryAngle: number,
  initialR: number,
  spins: number,
  steps = 24,
) {
  const cxs: number[] = [];
  const cys: number[] = [];
  const opacities: number[] = [];
  const grays: number[] = []; // 0..1, 0 = full color, 1 = full desaturated black
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    // radius shrinks exponentially: r(t) = initialR * R * (decayFactor)^t
    // we want it to end at ~0 at t=1
    const r = initialR * MAELSTROM_R * Math.pow(0.02, t);
    const angle = entryAngle + spins * 2 * Math.PI * t;
    cxs.push(CENTER_X + Math.cos(angle) * r);
    cys.push(CENTER_Y + Math.sin(angle) * r);

    // opacity: fade in quickly, fade out at the very center
    const opacity =
      t < 0.05 ? t / 0.05 : t > 0.92 ? Math.max(0, (1 - t) / 0.08) : 1;
    opacities.push(opacity);

    // gray progression: starts at 0, ramps up faster near the center.
    // Curve: cubic — most decay happens in the inner half (UX open question, picked exponential-near-mouth).
    grays.push(Math.min(1, Math.pow(t, 1.6)));
  }
  return { cxs, cys, opacities, grays };
}

function Particle({ p }: { p: Particle }) {
  const wp = useMemo(
    () => spiralWaypoints(p.entryAngle, p.initialR, p.spins),
    [p.entryAngle, p.initialR, p.spins],
  );

  if (p.kind === "good") {
    // For rainbow particles: animate cx/cy and a CSS filter for desaturation
    return (
      <motion.circle
        r={p.size}
        fill={p.color}
        initial={{ opacity: 0 }}
        animate={{
          cx: wp.cxs,
          cy: wp.cys,
          opacity: wp.opacities,
          // simulate desaturation+darken via filter — animate as a string array
          // We can't tween filter strings smoothly in all browsers, so we use a stepped
          // approximation by mapping grayness to fillOpacity AND apply an attribute change.
        }}
        transition={{
          duration: p.duration,
          delay: p.delay,
          repeat: Infinity,
          ease: "easeIn",
          times: wp.cxs.map((_, i) => i / (wp.cxs.length - 1)),
        }}
        style={{
          mixBlendMode: "screen",
        }}
      />
    );
  }

  // BAD particles: dark, soft, larger blobs spiraling in
  return (
    <motion.circle
      r={p.size}
      fill="#000"
      initial={{ opacity: 0 }}
      animate={{
        cx: wp.cxs,
        cy: wp.cys,
        opacity: wp.opacities.map((o) => o * 0.55),
      }}
      transition={{
        duration: p.duration,
        delay: p.delay,
        repeat: Infinity,
        ease: "easeIn",
        times: wp.cxs.map((_, i) => i / (wp.cxs.length - 1)),
      }}
      style={{ filter: "blur(6px)" }}
    />
  );
}

/* Desaturated overlay copy of each rainbow particle, drawn underneath in black.
   By layering the screen-blended color particle ON TOP of a black clone with
   inverted opacity (high opacity at center, where the color is fading out),
   the visual effect is: color fades into shadow as the particle reaches center. */
function ParticleShadow({ p }: { p: Particle }) {
  const wp = useMemo(
    () => spiralWaypoints(p.entryAngle, p.initialR, p.spins),
    [p.entryAngle, p.initialR, p.spins],
  );
  if (p.kind !== "good") return null;
  return (
    <motion.circle
      r={p.size + 0.5}
      fill="#0c0b0a"
      initial={{ opacity: 0 }}
      animate={{
        cx: wp.cxs,
        cy: wp.cys,
        // shadow ramps up as gray increases; this "eats" the rainbow particle
        opacity: wp.grays.map((g) => g * 0.95),
      }}
      transition={{
        duration: p.duration,
        delay: p.delay,
        repeat: Infinity,
        ease: "easeIn",
        times: wp.cxs.map((_, i) => i / (wp.cxs.length - 1)),
      }}
    />
  );
}

export function FilterChamber() {
  const particles = useMemo(() => buildParticles(7), []);

  return (
    <div className="chamber-wrap" aria-label="The Filter Chamber, animated">
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        style={{ width: "100%", height: "auto", display: "block" }}
        role="img"
      >
        <defs>
          {/* maelstrom gradient — barely-there core glow */}
          <radialGradient id="maelstrom-core" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#000" stopOpacity="0.95" />
            <stop offset="55%" stopColor="#000" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#000" stopOpacity="0" />
          </radialGradient>

          {/* faint chamber rim glow */}
          <radialGradient id="rim-haze" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#d4a463" stopOpacity="0" />
            <stop offset="78%" stopColor="#d4a463" stopOpacity="0.06" />
            <stop offset="92%" stopColor="#7aada0" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#000" stopOpacity="0" />
          </radialGradient>

          {/* good intent stream gradient */}
          <linearGradient id="good-stream" x1="0" y1="0" x2="0.6" y2="1">
            <stop offset="0%" stopColor="#e9b86b" stopOpacity="0" />
            <stop offset="35%" stopColor="#e9b86b" stopOpacity="0.55" />
            <stop offset="80%" stopColor="#7a6cc4" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#000" stopOpacity="0" />
          </linearGradient>

          {/* bad intent stream gradient */}
          <linearGradient id="bad-stream" x1="0" y1="0" x2="-0.6" y2="1">
            <stop offset="0%" stopColor="#1a1a1d" stopOpacity="0" />
            <stop offset="40%" stopColor="#0f0f11" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#000" stopOpacity="0" />
          </linearGradient>

          {/* output plume */}
          <linearGradient id="out-plume" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0a0a0c" stopOpacity="0.95" />
            <stop offset="60%" stopColor="#0a0a0c" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#0a0a0c" stopOpacity="0" />
          </linearGradient>

          {/* turbulence for organic edges */}
          <filter id="turb" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.018 0.05"
              numOctaves="2"
              seed="3"
            />
            <feDisplacementMap in="SourceGraphic" scale="14" />
          </filter>

          <filter id="soft-blur">
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>

        {/* INPUT STREAMS */}
        {/* good intent — upper left funnel */}
        <g style={{ transformOrigin: "200px 140px" }}>
          <path
            d="M 80 0 Q 130 80 180 160 Q 240 200 300 240"
            stroke="url(#good-stream)"
            strokeWidth="46"
            strokeLinecap="round"
            fill="none"
            filter="url(#turb)"
            opacity="0.7"
          />
        </g>
        {/* bad intent — upper right funnel */}
        <g>
          <path
            d="M 720 0 Q 670 80 620 160 Q 560 200 500 240"
            stroke="url(#bad-stream)"
            strokeWidth="56"
            strokeLinecap="round"
            fill="none"
            filter="url(#turb)"
            opacity="0.85"
          />
        </g>

        {/* labels */}
        <g
          fontFamily="'JetBrains Mono', monospace"
          fontSize="10"
          letterSpacing="0.22em"
          fill="#7a7367"
          textAnchor="middle"
        >
          <text x="170" y="32">
            GOOD INTENT
          </text>
          <text x="630" y="32">
            BAD INTENT
          </text>
        </g>

        {/* CHAMBER — rim haze */}
        <circle
          cx={CENTER_X}
          cy={CENTER_Y}
          r={MAELSTROM_R + 60}
          fill="url(#rim-haze)"
        />

        {/* Maelstrom — concentric counter-rotating arcs to give the whirling sense */}
        <motion.g
          style={{ originX: `${CENTER_X}px`, originY: `${CENTER_Y}px` }}
          animate={{ rotate: 360 }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        >
          <circle
            cx={CENTER_X}
            cy={CENTER_Y}
            r={MAELSTROM_R}
            fill="none"
            stroke="#3a362e"
            strokeWidth="0.6"
            strokeDasharray="1 5"
            opacity="0.45"
          />
          <circle
            cx={CENTER_X}
            cy={CENTER_Y}
            r={MAELSTROM_R - 30}
            fill="none"
            stroke="#3a362e"
            strokeWidth="0.5"
            strokeDasharray="2 6"
            opacity="0.35"
          />
        </motion.g>
        <motion.g
          style={{ originX: `${CENTER_X}px`, originY: `${CENTER_Y}px` }}
          animate={{ rotate: -360 }}
          transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
        >
          <circle
            cx={CENTER_X}
            cy={CENTER_Y}
            r={MAELSTROM_R - 60}
            fill="none"
            stroke="#3a362e"
            strokeWidth="0.5"
            strokeDasharray="1 4"
            opacity="0.35"
          />
          <circle
            cx={CENTER_X}
            cy={CENTER_Y}
            r={MAELSTROM_R - 95}
            fill="none"
            stroke="#3a362e"
            strokeWidth="0.4"
            strokeDasharray="1 3"
            opacity="0.3"
          />
        </motion.g>

        {/* Inner core — black sink */}
        <circle
          cx={CENTER_X}
          cy={CENTER_Y}
          r={MAELSTROM_R - 30}
          fill="url(#maelstrom-core)"
        />

        {/* PARTICLES */}
        {/* Bad particles drawn first so they sit underneath the rainbow */}
        {particles
          .filter((p) => p.kind === "bad")
          .map((p) => (
            <Particle key={`b-${p.id}`} p={p} />
          ))}
        {/* Rainbow particles + their shadow eaters */}
        {particles
          .filter((p) => p.kind === "good")
          .map((p) => (
            <Particle key={`g-${p.id}`} p={p} />
          ))}
        {particles
          .filter((p) => p.kind === "good")
          .map((p) => (
            <ParticleShadow key={`s-${p.id}`} p={p} />
          ))}

        {/* OUTPUT plume — uniformly dark, exits below */}
        <g>
          <ellipse
            cx={CENTER_X}
            cy={CENTER_Y + MAELSTROM_R - 6}
            rx="32"
            ry="14"
            fill="#000"
            opacity="0.85"
            filter="url(#soft-blur)"
          />
          <motion.path
            d={`M ${CENTER_X - 30} ${CENTER_Y + MAELSTROM_R - 8}
                Q ${CENTER_X - 14} ${CENTER_Y + MAELSTROM_R + 70}
                  ${CENTER_X - 22} ${CENTER_Y + MAELSTROM_R + 180}
                Q ${CENTER_X} ${CENTER_Y + MAELSTROM_R + 230}
                  ${CENTER_X + 18} ${CENTER_Y + MAELSTROM_R + 250}
                L ${CENTER_X + 22} ${CENTER_Y + MAELSTROM_R + 250}
                Q ${CENTER_X + 4} ${CENTER_Y + MAELSTROM_R + 200}
                  ${CENTER_X + 14} ${CENTER_Y + MAELSTROM_R + 90}
                Q ${CENTER_X + 28} ${CENTER_Y + MAELSTROM_R + 30}
                  ${CENTER_X + 28} ${CENTER_Y + MAELSTROM_R - 8}
                Z`}
            fill="url(#out-plume)"
            filter="url(#turb)"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.65, 0.95, 0.65] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
        </g>

        {/* output label */}
        <text
          x={CENTER_X}
          y={VIEW_H - 14}
          textAnchor="middle"
          fontFamily="'JetBrains Mono', monospace"
          fontSize="10"
          letterSpacing="0.22em"
          fill="#7a7367"
        >
          DILUTED → HARMFUL OUTCOMES
        </text>
      </svg>
    </div>
  );
}

export default FilterChamber;
