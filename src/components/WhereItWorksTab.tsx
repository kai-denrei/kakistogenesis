import { useEffect, useMemo, useRef, useState } from "react";
import { ExternalLink } from "lucide-react";

/**
 * Where It Works — the Ostrom counter-section.
 *
 * Honest framing: this is the *thin candle*. Some communities do govern
 * their commons well — but they are tiny, and the design has not been
 * shown to scale or transfer. The artifact's load-bearing number is
 * 0.015% : 99.985%. Display restraint matches the framing: smaller
 * display type than the filter, narrower color range, more whitespace.
 */

const STRICT_TOTAL = 1_200_000; // ~1.2M — strict Ostrom-validated, named cases
const PERMISSIVE_TOTAL = 75_000_000; // ~50–100M — broader Ostrom-functional commons globally
const WIDEST_TOTAL = 2_250_000_000; // ~2–2.5B — anyone whose life depends on a traditional commons of any kind
const WORLD_POP = 8_000_000_000;

const APERTURES: {
  id: string;
  label: string;
  total: number;
  pct: string;
  rangeNote: string;
  methodologyNote: string;
}[] = [
  {
    id: "strict",
    label: "Strictly Ostrom-validated, named case-list",
    total: STRICT_TOTAL,
    pct: "0.015%",
    rangeNote: "≈ 1 in 6,500",
    methodologyNote:
      "The six communities below: Alpine commons, Spanish huertas, Subak Bali, Iriai Japan, Maine lobster + Alanya fishery, Filipino zanjeras. Active members and immediate dependents.",
  },
  {
    id: "permissive",
    label: "Documented Ostrom-functional commons globally",
    total: PERMISSIVE_TOTAL,
    pct: "0.6 – 1.25%",
    rangeNote: "50 – 100 million",
    methodologyNote:
      "Every fishery, forest, and irrigation system globally that meets her eight design principles, beyond her original case list. Estimate widens with documentation depth.",
  },
  {
    id: "widest",
    label: "Lives dependent on any traditional commons",
    total: WIDEST_TOTAL,
    pct: "≈ 28%",
    rangeNote: "2 – 2.5 billion",
    methodologyNote:
      "FAO-style framing: anyone whose subsistence depends on a traditional commons of any kind, including degraded and captured ones across the global south. Most are not Ostrom-functional — they are commons being eaten by the filter in real time.",
  },
];

const CASES: {
  id: string;
  name: string;
  geography: string;
  population: string;
  commons: string;
  works_because: string;
}[] = [
  {
    id: "alpine",
    name: "Alpine Commons",
    geography: "Switzerland, Austria, Bavaria — Törbel and Allmenden",
    population: "≈ 200,000",
    commons:
      "Communal alpine pasture (Allmend) shared among village households. Each household has rights of use, maintenance duties, and a vote in seasonal grazing decisions. The governance dates back to the 13th century in Törbel and remains active across hundreds of Swiss, Tyrolean, and Bavarian villages.",
    works_because:
      "Clearly defined boundaries, locally crafted rules matched to ecology, graduated sanctions, and monitoring done by users themselves — Ostrom's first four design principles, all visible.",
  },
  {
    id: "huerta",
    name: "Spanish Huertas",
    geography: "Valencia, Murcia, Alicante, Orihuela",
    population: "≈ 100,000",
    commons:
      "Irrigation networks carrying water from the Turia, Júcar, and Segura rivers across thousands of small terraced plots. Disputes are resolved by elected farmer-judges, including the Tribunal de las Aguas of Valencia, which has met every Thursday in front of the cathedral for at least eight centuries.",
    works_because:
      "Conflict-resolution mechanism is fast, cheap, public, and locally legitimate. Farmers are the judges; appeals are rare; the institution outlasted Romans, Visigoths, the Caliphate of Córdoba, and the Spanish state.",
  },
  {
    id: "subak",
    name: "Subak, Bali",
    geography: "Indonesia — ≈ 1,200 subak associations across Bali",
    population: "≈ 600,000",
    commons:
      "Irrigation cooperatives that coordinate water flow from a single source across 50–400 farmers per subak, plus synchronised pest-control fallow periods and shared temple rituals. The system is religious and agricultural at once; UNESCO recognised it in 2012 as part of Bali's cultural landscape.",
    works_because:
      "Ritual schedules carry the coordination problem — temple festivals are when fallow synchronisation is decided. Religious legitimacy and ecological feedback combine into a single institution that the colonial state and the Green Revolution both tried to bypass and both failed.",
  },
  {
    id: "iriai",
    name: "Iriai, Japan",
    geography: "Mountain villages, mostly Tōhoku and Kyushu",
    population: "≈ 100,000 (mostly vestigial)",
    commons:
      "Iriai-ken — the right to enter and use mountain or forest commons (firewood, charcoal, fodder, mushrooms) — was the dominant rural property regime through the Edo period. The Meiji land reforms partially privatised the underlying land, leaving an attenuated practice that persists in surviving mountain villages.",
    works_because:
      "Where it survives, it survives because the commons is recognisable to its users as belonging to them — not to the state, not to a corporation. The post-Meiji decline is the cautionary half of the case study.",
  },
  {
    id: "lobster",
    name: "Maine Lobster + Alanya Fishery",
    geography: "Maine coast (USA) and Alanya (Turkey)",
    population: "≈ 10,000 combined",
    commons:
      "Maine lobstering operates through informal 'harbor gangs' that allocate fishing territories among local boats; the Alanya inshore fishery uses a rotating draw to assign fishing spots each day. Both regimes are formally illegal under their respective national laws and yet have persisted for decades.",
    works_because:
      "Allocation rules emerged from the users themselves; outsiders are excluded by gang convention or rotation slot, not by patrol boat. The institutions are small enough that monitoring is incidental to fishing itself.",
  },
  {
    id: "zanjera",
    name: "Filipino Zanjeras",
    geography: "Ilocos Norte, northern Luzon — ≈ 1,000 zanjeras",
    population: "≈ 200,000",
    commons:
      "Voluntary irrigation associations that build and maintain canals from rivers to terraced rice paddies. New members earn shares by contributing labour to canal construction; water and obligations are then distributed proportionally. Pre-colonial in origin, formalised under Spanish rule, and largely intact today.",
    works_because:
      "Membership is earned, proportional, and transparent. Failure to contribute labour at the appointed time forfeits the share. The contract is short, observable, and enforced by neighbours rather than by the state.",
  },
];

function formatNumber(n: number): string {
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1)}B`;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(0)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}k`;
  return String(n);
}

function ApertureBars() {
  // log scale for visual sanity — strict total is 0.015% which is invisible on linear
  const max = WORLD_POP;
  const widths = APERTURES.map((a) => {
    // Use sqrt scale to keep small bars visible without lying about the asymmetry
    const ratio = a.total / max;
    return Math.max(2, Math.sqrt(ratio) * 100); // percent of bar track
  });
  return (
    <div
      style={{
        marginBottom: 36,
        padding: "30px clamp(16px, 3vw, 30px)",
        border: "1px solid var(--border-soft)",
        background: "rgba(255,255,255,0.012)",
      }}
    >
      <div
        className="font-mono"
        style={{
          fontSize: 10.5,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "var(--dim)",
          marginBottom: 18,
        }}
      >
        Three apertures · √-scaled bars · world population (8B) is the full track
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        {APERTURES.map((a, i) => (
          <div key={a.id}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                marginBottom: 6,
                gap: 16,
                flexWrap: "wrap",
              }}
            >
              <div
                className="font-display"
                style={{
                  fontSize: 16,
                  color: "var(--paper)",
                  fontWeight: 400,
                }}
              >
                {a.label}
              </div>
              <div
                className="font-mono"
                style={{
                  fontSize: 11,
                  letterSpacing: "0.16em",
                  color: "var(--ivory)",
                  whiteSpace: "nowrap",
                }}
              >
                {formatNumber(a.total)} · {a.pct}
              </div>
            </div>
            <div
              style={{
                position: "relative",
                height: 8,
                background: "rgba(255,255,255,0.04)",
                marginBottom: 6,
              }}
            >
              <div
                style={{
                  width: `${widths[i]}%`,
                  height: "100%",
                  background:
                    i === 0
                      ? "var(--ivory)"
                      : i === 1
                      ? "var(--paper)"
                      : "var(--mute)",
                  opacity: i === 0 ? 1 : 0.7,
                  transition: "width .8s ease-out",
                }}
              />
            </div>
            <div
              className="font-mono"
              style={{
                fontSize: 10,
                letterSpacing: "0.14em",
                color: "var(--dim)",
                marginBottom: 4,
              }}
            >
              {a.rangeNote}
            </div>
            <div
              style={{
                fontFamily: "'EB Garamond', ui-serif, Georgia, serif",
                fontSize: 14,
                lineHeight: 1.5,
                color: "var(--mute)",
                fontStyle: "italic",
                maxWidth: "70ch",
              }}
            >
              {a.methodologyNote}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CaseCard({ c }: { c: (typeof CASES)[number] }) {
  return (
    <article
      style={{
        padding: "22px 24px 24px 24px",
        border: "1px solid var(--border-soft)",
        background: "rgba(255,255,255,0.008)",
      }}
    >
      <div
        className="font-mono"
        style={{
          fontSize: 10,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "var(--mute)",
          marginBottom: 4,
        }}
      >
        {c.geography}
      </div>
      <div
        className="d-md text-ink-ivory"
        style={{ marginBottom: 4, lineHeight: 1.18 }}
      >
        {c.name}
      </div>
      <div
        className="font-mono"
        style={{
          fontSize: 11,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "var(--paper)",
          marginBottom: 14,
        }}
      >
        {c.population}
      </div>
      <p
        style={{
          fontFamily: "'EB Garamond', ui-serif, Georgia, serif",
          fontSize: 15.5,
          lineHeight: 1.55,
          color: "var(--paper)",
          marginBottom: 14,
        }}
      >
        {c.commons}
      </p>
      <div
        className="font-mono"
        style={{
          fontSize: 9.5,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "var(--dim)",
          marginBottom: 6,
        }}
      >
        Why it works
      </div>
      <p
        style={{
          fontFamily: "'EB Garamond', ui-serif, Georgia, serif",
          fontStyle: "italic",
          fontSize: 14.5,
          lineHeight: 1.5,
          color: "var(--mute)",
          margin: 0,
        }}
      >
        {c.works_because}
      </p>
    </article>
  );
}

/**
 * RatioReveal — animates the 0.015 / 99.985 split into view as the panel
 * scrolls onto screen. Restrained: no bounce, no easing flourish, just a
 * slow fade-in that gives the user time to read the number.
 */
function RatioReveal() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        margin: "32px 0 36px 0",
        padding: "32px clamp(16px, 3vw, 30px)",
        border: "1px solid var(--border-soft)",
        background: "rgba(255,255,255,0.012)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(8px)",
        transition: "opacity .8s ease-out, transform .8s ease-out",
      }}
    >
      <div
        className="font-mono"
        style={{
          fontSize: 10,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "var(--dim)",
          marginBottom: 14,
        }}
      >
        The honest ratio
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 24,
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            fontFamily: "'Fraunces', ui-serif, serif",
            fontSize: "clamp(2.2rem, 6vw, 4rem)",
            fontWeight: 300,
            color: "var(--ivory)",
            lineHeight: 1,
            letterSpacing: "-0.012em",
          }}
        >
          0.015%
        </div>
        <div
          style={{
            fontFamily: "'EB Garamond', ui-serif, Georgia, serif",
            fontSize: 15,
            color: "var(--mute)",
            fontStyle: "italic",
          }}
        >
          works · the strict, named case-list
        </div>
      </div>
      <div
        style={{
          height: 1,
          background: "var(--border-soft)",
          margin: "20px 0",
        }}
      />
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 24,
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            fontFamily: "'Fraunces', ui-serif, serif",
            fontSize: "clamp(2.2rem, 6vw, 4rem)",
            fontWeight: 300,
            color: "var(--mute)",
            lineHeight: 1,
            letterSpacing: "-0.012em",
            opacity: 0.85,
          }}
        >
          99.985%
        </div>
        <div
          style={{
            fontFamily: "'EB Garamond', ui-serif, Georgia, serif",
            fontSize: 15,
            color: "var(--mute)",
            fontStyle: "italic",
          }}
        >
          everyone else
        </div>
      </div>
    </div>
  );
}

export default function WhereItWorksTab() {
  // Compute roughly how many people are in each case, for header arithmetic
  const casesTotal = useMemo(
    () =>
      [200_000, 100_000, 600_000, 100_000, 10_000, 200_000].reduce(
        (a, b) => a + b,
        0
      ),
    []
  );

  return (
    <section className="col-wide px-5 pt-12 pb-24">
      <div className="label-mono mb-3">§ — Where it works</div>
      <h2
        className="d-lg text-ink-ivory"
        style={{ marginBottom: 20, maxWidth: "22ch" }}
      >
        An existence proof at toy scale.
      </h2>
      <div className="col-mid" style={{ marginLeft: 0, marginBottom: 56 }}>
        <p
          className="b-lg text-ink-paper"
          style={{ marginBottom: "1.2em", maxWidth: "60ch" }}
        >
          Some communities <em>do</em> get governance right. The political
          economist Elinor Ostrom won the 2009 Nobel for documenting them. They
          are real, they are old, and they have resisted both privatisation and
          state takeover for centuries. They are also{" "}
          <span className="text-ink-ivory">tiny</span>, and the design has not
          been shown to scale or transfer.
        </p>
        <p
          className="b-md text-ink-paper"
          style={{ marginBottom: "1em", maxWidth: "60ch" }}
        >
          This tab is not a counterpoint to the filter. It is an
          <em> existence proof </em>
          that the filter can be beaten — by communities willing to do the
          work, at small scale, with rules of their own. It says nothing about
          whether the filter{" "}
          <em>usually</em> is beaten. It says nothing about whether the design
          transfers up.
        </p>
      </div>

      {/* SECTION 1 — three apertures */}
      <div style={{ marginBottom: 56 }}>
        <div className="label-mono mb-3">§ I — Three apertures</div>
        <h3
          className="d-md text-ink-ivory"
          style={{ marginBottom: 20, fontWeight: 400 }}
        >
          How many people, depending on how you count.
        </h3>
        <ApertureBars />
        <p
          className="b-md text-ink-paper"
          style={{
            fontStyle: "italic",
            color: "var(--mute)",
            maxWidth: "60ch",
            margin: 0,
          }}
        >
          The widest aperture (≈ 2 – 2.5 billion) is people whose subsistence
          touches a traditional commons of <em>any</em> kind. Most of those
          commons are not Ostrom-functional — they are commons being eaten by
          the filter in real time. The strictly-functioning cases remain tiny.
        </p>
      </div>

      {/* SECTION 2 — case cards */}
      <div style={{ marginBottom: 56 }}>
        <div className="label-mono mb-3">§ II — The six cases</div>
        <h3
          className="d-md text-ink-ivory"
          style={{ marginBottom: 8, fontWeight: 400 }}
        >
          Ostrom's named, validated commons.
        </h3>
        <div
          className="font-mono"
          style={{
            fontSize: 11,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "var(--dim)",
            marginBottom: 24,
          }}
        >
          {CASES.length} communities · ≈ {formatNumber(casesTotal)} people
          combined
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill, minmax(min(100%, 320px), 1fr))",
            gap: 18,
          }}
        >
          {CASES.map((c) => (
            <CaseCard key={c.id} c={c} />
          ))}
        </div>
      </div>

      {/* SECTION 3 — honest framing + ratio reveal */}
      <div className="col-mid" style={{ marginLeft: 0, marginBottom: 56 }}>
        <div className="label-mono mb-3">§ III — Honest framing</div>
        <h3
          className="d-md text-ink-ivory"
          style={{ marginBottom: 18, fontWeight: 400 }}
        >
          What this is, and what it is not.
        </h3>
        <p
          className="b-md text-ink-paper"
          style={{ marginBottom: "1em", maxWidth: "60ch" }}
        >
          The artifact's framing inverts the empirical weight if the Ostrom
          material gets equal billing with the filter. The honest ratio is
          closer to <span className="text-ink-ivory">0.015% : 99.985%</span> —
          her case studies are not a counterpoint, they are an{" "}
          <em>existence proof at toy scale</em>. They show the filter can be
          beaten by communities willing to do the work. They show nothing about
          whether it usually is, or whether the design transfers up.
        </p>
        <p
          className="b-md text-ink-paper"
          style={{ marginBottom: "1em", maxWidth: "60ch" }}
        >
          The cases are rare, small, and fragile. The Iriai entry above is a
          warning shot: the post-Meiji decline is what happens when a
          functioning commons meets a modern state with property-titling
          ambitions. The Subak's UNESCO listing in 2012 is how a working
          institution becomes a museum exhibit. The Spanish huertas survive
          partly because the Spanish state has so far declined to rationalise
          them.
        </p>
        <p
          className="b-md text-ink-paper"
          style={{ maxWidth: "60ch" }}
        >
          What Ostrom shows is that the filter's defaults are not laws of
          physics — there are local exits. What she does not show, and could
          not have shown, is that the exits scale. That problem is open.
        </p>

        <RatioReveal />
      </div>

      {/* SECTION 4 — Ostrom quote */}
      <div className="col-mid" style={{ marginLeft: 0, marginTop: 24 }}>
        <div className="label-mono mb-3">§ IV — Ostrom in her own words</div>
        <blockquote
          style={{
            margin: "0 0 16px 0",
            padding: "20px 22px",
            borderLeft: "2px solid var(--teal)",
            background: "rgba(255,255,255,0.012)",
            fontFamily: "'EB Garamond', ui-serif, Georgia, serif",
            fontStyle: "italic",
            fontSize: 18,
            lineHeight: 1.55,
            color: "var(--ivory)",
          }}
        >
          “Resource users frequently develop sophisticated mechanisms for
          decision-making and rule enforcement to handle conflicts of interest.”
          <footer
            className="font-mono"
            style={{
              fontSize: 10.5,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--mute)",
              marginTop: 14,
              fontStyle: "normal",
            }}
          >
            — Elinor Ostrom · 2009 Nobel Prize in Economic Sciences
            <br />
            (Royal Swedish Academy press release, 12 October 2009)
          </footer>
        </blockquote>
        <a
          href="https://www.nobelprize.org/prizes/economic-sciences/2009/press-release/"
          target="_blank"
          rel="noreferrer"
          className="font-mono"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontSize: 11,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "var(--teal)",
            borderBottom: "1px solid var(--teal)",
            paddingBottom: 2,
          }}
        >
          Nobel Prize 2009 <ExternalLink size={11} />
        </a>
      </div>
    </section>
  );
}
