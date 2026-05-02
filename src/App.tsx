import { useMemo, useState } from "react";
import { ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CATEGORIES,
  CATEGORY_ORDER,
  MECHANISMS,
  type CategoryKey,
} from "./data/mechanisms";
import FilterChamber from "./components/FilterChamber";
import OriginTab from "./components/OriginTab";

type Tab = "chamber" | "alternatives" | "origin";

function Hero() {
  return (
    <header className="col-wide px-5 pt-12 pb-12 md:pt-16 md:pb-20">
      <h1
        className="d-hero text-ink-ivory"
        style={{ marginBottom: "0.4em" }}
        aria-label="Peshi-ma Tessoku"
      >
        ペシ<span style={{ color: "var(--oxblood)" }}>魔</span>鉄則
      </h1>

      <div
        className="font-display text-ink-paper"
        style={{
          fontStyle: "italic",
          fontWeight: 300,
          fontSize: "clamp(1.2rem, 2.4vw, 1.6rem)",
          marginBottom: "2.4rem",
          letterSpacing: "0.01em",
        }}
      >
        Peshi-ma Tessoku &nbsp;;&nbsp; the “iron rule of the worst-demon”
      </div>

      <div className="col-text" style={{ marginLeft: 0 }}>
        <p className="b-lg text-ink-paper" style={{ marginBottom: "1.2em" }}>
          A name in three pieces.{" "}
          <span className="text-ink-ivory">ペシ</span> is{" "}
          <em>pessimum</em> (Latin for <em>worst</em>, opposite of{" "}
          <em>Optimum</em>), transliterated into katakana.{" "}
          <span className="text-ink-ivory" style={{ color: "var(--oxblood)" }}>
            魔
          </span>{" "}
          is <em>ma</em> (demon), a play on word and the dark-triad operator,
          the asymmetric exploiter who finds the gaps in any well-meaning
          system.{" "}
          <span className="text-ink-ivory">鉄則</span> is{" "}
          <em>tessoku</em>, an iron rule, a nod to other similar “laws” which
          are just theories or heuristics.
        </p>
        <p className="b-lg text-ink-paper" style={{ marginBottom: "1.2em" }}>
          Read together: the iron rule of the worst outcome. A diagnosis of the
          numerous mechanisms whereby institutions, even those founded with the
          best intent, systematically convert even the most positive intents
          into asymmetrically negative output. Almost everywhere there is
          governance of large numbers of people, a minority with elevated
          dark-triad traits exploits these mechanisms and ruin it for the
          majority, while sometimes operating under the disguise of being
          meritocratic or democratic. Not fooling anyone. Uh… Fool me again
          shame on someone.
        </p>
        <p className="b-md text-ink-mute" style={{ fontStyle: "italic" }}>
          Above, an animated reading of the Great Filter, with no less than
          twenty-two academic mechanisms that name the parts — catalogued
          below. Surely you’ve seen some or even all at work in your own
          organizations small and large. Why would the Benevolent Governments
          be any different? (Gell-Mann Amnesia)
        </p>
      </div>
    </header>
  );
}

function ChamberSection() {
  return (
    <section className="col-wide px-5 pt-8 pb-12 md:pt-10 md:pb-16">
      <div className="label-mono mb-3 text-center">
        § — The Filter Chamber
      </div>
      <h2 className="d-lg text-ink-ivory col-text text-center" style={{ marginBottom: "0.9em", maxWidth: "52ch", marginLeft: "auto", marginRight: "auto" }}>
        “Regardless of initial intent of a given bureaucrat, the outcome will turn to sh… negative outcomes”
      </h2>
      <FilterChamber />
      <p
        className="font-mono text-ink-dim col-text text-center"
        style={{
          fontSize: 11,
          letterSpacing: "0.18em",
          marginTop: 28,
          textTransform: "uppercase",
        }}
      >
        Particles random-walk through the mechanisms.
        <br className="md:hidden" />
        <span className="hidden md:inline"> · </span>
        Each contact takes a little color. Hover any node.
      </p>
      <p
        className="b-md text-ink-mute col-text"
        style={{ fontStyle: "italic", marginTop: 28, textAlign: "center" }}
      >
        The filters do not “add malevolence” as much as they strip the original
        positive dreams out of any power, they render them grey and void of
        effect in the face of near-inescapable entropy.
      </p>
    </section>
  );
}

function CategoryFilter({
  active,
  setActive,
}: {
  active: CategoryKey | "all";
  setActive: (k: CategoryKey | "all") => void;
}) {
  return (
    <div className="col-wide px-5" style={{ marginBottom: 28 }}>
      <div className="label-mono mb-3">Filter by family</div>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActive("all")}
          className="font-mono"
          style={{
            padding: "6px 12px",
            border: `1px solid ${active === "all" ? "var(--ivory)" : "var(--border-mid)"}`,
            background: active === "all" ? "var(--ivory)" : "transparent",
            color: active === "all" ? "var(--bg)" : "var(--ink-paper, #d8cfb8)",
            fontSize: 11,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            cursor: "pointer",
            transition: "all .15s",
          }}
        >
          All twenty-two
        </button>
        {CATEGORY_ORDER.map((key) => {
          const cat = CATEGORIES[key];
          const isActive = active === key;
          return (
            <button
              key={key}
              onClick={() => setActive(key)}
              className="font-mono"
              style={{
                padding: "6px 12px",
                border: `1px solid ${isActive ? "var(--ivory)" : "var(--border-mid)"}`,
                background: isActive ? "var(--ivory)" : "transparent",
                color: isActive ? "var(--bg)" : "var(--paper)",
                fontSize: 11,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                transition: "all .15s",
              }}
            >
              <span
                className="dot"
                style={{ backgroundColor: cat.color }}
              />
              {cat.label}
            </button>
          );
        })}
      </div>
      {active !== "all" && (
        <p
          className="b-md text-ink-paper"
          style={{ fontStyle: "italic", marginTop: 16 }}
        >
          {CATEGORIES[active].desc}
        </p>
      )}
    </div>
  );
}

function MechanismCard({
  m,
}: {
  m: (typeof MECHANISMS)[number];
}) {
  const cat = CATEGORIES[m.category];
  return (
    <article
      id={`m-${m.id}`}
      style={{
        borderLeft: `2px solid ${cat.color}`,
        padding: "26px 18px 26px 26px",
      }}
    >
      <div className="flex flex-wrap gap-6 items-baseline">
        <div style={{ minWidth: 180, maxWidth: 220 }}>
          <div
            className="font-mono"
            style={{
              fontSize: 11,
              color: "var(--paper)",
              letterSpacing: "0.14em",
            }}
          >
            {m.year}
          </div>
          <div
            className="font-mono"
            style={{
              fontSize: 11,
              color: "var(--mute)",
              letterSpacing: "0.1em",
              marginTop: 2,
            }}
          >
            {m.originator}
          </div>
          <div
            className="font-mono"
            style={{
              fontSize: 10,
              color: cat.color,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              marginTop: 10,
            }}
          >
            {cat.label}
          </div>
        </div>
        <div style={{ flex: 1, minWidth: 280 }}>
          <h3
            className="d-md text-ink-ivory"
            style={{ margin: "0 0 12px 0" }}
          >
            {m.name}
          </h3>
          <p
            className="b-md text-ink-paper"
            style={{ margin: "0 0 14px 0", maxWidth: "62ch" }}
          >
            {m.claim}
          </p>
          <div
            className="font-mono"
            style={{
              fontSize: 11,
              lineHeight: 1.55,
              color: "var(--mute)",
              maxWidth: "70ch",
            }}
          >
            <span
              style={{
                textTransform: "uppercase",
                letterSpacing: "0.16em",
                color: "var(--dim)",
                marginRight: 8,
              }}
            >
              Source
            </span>
            {m.source}
          </div>
          {m.url && (
            <a
              href={m.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 5,
                fontSize: 10.5,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginTop: 14,
                color: "var(--teal)",
                borderBottom: "none",
              }}
            >
              Reference <ExternalLink size={11} />
            </a>
          )}
          <div
            className="font-mono"
            style={{
              fontSize: 10,
              fontStyle: "italic",
              color: "var(--dim)",
              marginTop: 10,
              letterSpacing: "0.04em",
            }}
          >
            {m.field}
          </div>
        </div>
      </div>
    </article>
  );
}

function MechanismsCatalogue() {
  const [active, setActive] = useState<CategoryKey | "all">("all");
  const filtered = useMemo(() => {
    if (active === "all") return MECHANISMS;
    return MECHANISMS.filter((m) => m.category === active);
  }, [active]);

  return (
    <section className="pt-12 pb-24">
      <div className="col-wide px-5" style={{ marginBottom: 24 }}>
        <div className="label-mono mb-4">§ — The mechanisms</div>
        <h2 className="d-xl text-ink-ivory" style={{ marginBottom: 20 }}>
          The catalogue.
        </h2>
        <p className="b-md text-ink-paper col-text" style={{ marginLeft: 0, marginBottom: 16 }}>
          Twenty-two named mechanisms by which institutions convert good or
          mixed intent into asymmetrically negative output. Each links to its
          academic root.
        </p>
      </div>

      <CategoryFilter active={active} setActive={setActive} />

      <div className="col-wide px-5">
        <hr className="rule" />
        <div>
          {filtered.map((m) => (
            <div
              key={m.id}
              style={{ borderBottom: "1px solid var(--border-soft)" }}
            >
              <MechanismCard m={m} />
            </div>
          ))}
          {filtered.length === 0 && (
            <div
              className="b-md text-ink-mute"
              style={{
                fontStyle: "italic",
                padding: "48px 0",
                textAlign: "center",
              }}
            >
              No mechanisms in this family.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

const ALTERNATIVES = [
  {
    name: "Corruptio Optimi Pessima",
    register: "Doctrine",
    blurb:
      "The corruption of the best is the worst. A medieval Latin maxim with a millennium of scholastic and rhetorical citation behind it. Carries doctrinal weight where a 21st-century coinage cannot. Useful when arguing the claim is ancient and the question is only which mechanisms make it operate.",
  },
  {
    name: "Kakistogenesis",
    register: "Process noun",
    blurb:
      "Greek kákistos (worst) + génesis (origin, becoming). Names the process by which the worst is generated. Useful as a verb-form: an institution kakistogenesises its inputs. Sits on the operating-table where Corruptio sits in the courtroom.",
  },
  {
    name: "Mens Bona, Mala Eventa",
    register: "Legal-doctrine inversion",
    blurb:
      "An inversion of the Roman legal maxim mens rea, malum factum (guilty mind, evil deed). Asserts a causal law: good intent, bad outcomes. The legal-doctrine register frames the asymmetry as a regularity of law, not an accident. Useful where the audience expects an actus reus.",
  },
  {
    name: "Negative Maelstrom",
    register: "Atmospheric / essay-title",
    blurb:
      "Loose, imagistic, essayistic. Names the chamber as weather rather than as machine. Useful as a title for the long-form prose treatment, where the diagram itself is presented as a piece of moral atmosphere — not a parts-list.",
  },
  {
    name: "Kakisto / Pessimum Filter",
    register: "Apparatus",
    blurb:
      "Names the device, not the process. The chamber as a literal filter — what physically does the work. Useful in technical or systems-analytic register, where the question is what flows in, what flows out, and what the membrane does.",
  },
];

function AlternativesTab() {
  return (
    <section className="col-wide px-5 pt-12 pb-24">
      <div className="label-mono mb-4">§ — Alternatives & meta-frame</div>
      <h2 className="d-xl text-ink-ivory" style={{ marginBottom: 28 }}>
        Other names. Other registers.
      </h2>
      <p
        className="b-md text-ink-paper col-text"
        style={{ marginLeft: 0, marginBottom: 36, maxWidth: "62ch" }}
      >
        ペシ魔鉄則 is the canonical name in this artifact because it encodes the
        operator inside the name. Five other names were considered, each doing
        different work in a different register. They are not equals to the
        canonical — the canonical earned the position by being diagnostic
        about the dark-triad operator who exploits the chamber's asymmetry.
        But the alternatives below remain useful for the registers they cover.
      </p>

      <div className="col-mid" style={{ marginLeft: 0 }}>
        {ALTERNATIVES.map((alt, idx) => (
          <article
            key={alt.name}
            style={{
              borderTop:
                idx === 0
                  ? "1px solid var(--border-soft)"
                  : "1px solid var(--border-soft)",
              padding: "30px 0",
            }}
          >
            <div className="flex flex-wrap gap-5 items-baseline mb-3">
              <h3
                className="d-md text-ink-ivory"
                style={{ margin: 0, flex: "1 1 auto" }}
              >
                {alt.name}
              </h3>
              <span
                className="font-mono"
                style={{
                  fontSize: 10,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--mute)",
                }}
              >
                {alt.register}
              </span>
            </div>
            <p
              className="b-md text-ink-paper"
              style={{ margin: 0, maxWidth: "62ch" }}
            >
              {alt.blurb}
            </p>
          </article>
        ))}
        <hr className="rule" />
      </div>

      <div className="col-mid" style={{ marginLeft: 0, marginTop: 64 }}>
        <div className="label-mono mb-3">§ — A meta-frame</div>
        <h3 className="d-lg text-ink-ivory" style={{ marginBottom: 24 }}>
          The artifact is admitted to be a model.
        </h3>
        <blockquote
          className="b-lg text-ink-paper"
          style={{
            borderLeft: "2px solid var(--teal)",
            paddingLeft: "1.4em",
            margin: "0 0 1.6em 0",
            fontStyle: "italic",
            maxWidth: "60ch",
          }}
        >
          The map is not the territory.
          <footer
            className="font-mono"
            style={{
              fontSize: 11,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "var(--mute)",
              marginTop: 10,
              fontStyle: "normal",
            }}
          >
            — Alfred Korzybski (1931)
          </footer>
        </blockquote>
        <blockquote
          className="b-lg text-ink-paper"
          style={{
            borderLeft: "2px solid var(--amber)",
            paddingLeft: "1.4em",
            margin: "0 0 1.6em 0",
            fontStyle: "italic",
            maxWidth: "60ch",
          }}
        >
          All models are wrong, but some are useful.
          <footer
            className="font-mono"
            style={{
              fontSize: 11,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "var(--mute)",
              marginTop: 10,
              fontStyle: "normal",
            }}
          >
            — George E. P. Box (1976)
          </footer>
        </blockquote>
        <p
          className="b-md text-ink-paper"
          style={{ maxWidth: "62ch" }}
        >
          The Filter Chamber is a model of how institutions convert mixed
          intent into asymmetrically negative output. It is not the chamber
          itself. The diagram is a useful diagram. The names — six of them,
          one canonical — are six handles on the same model. None claims the
          territory. The point of plurality, here, is to keep the disclaimer
          legible: the artifact knows what it is.
        </p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer
      className="col-wide px-5"
      style={{
        paddingTop: 36,
        paddingBottom: 60,
        borderTop: "1px solid var(--border-soft)",
        marginTop: 32,
      }}
    >
      <div className="label-mono mb-3">Origin</div>
      <p
        className="b-md text-ink-paper"
        style={{
          fontStyle: "italic",
          maxWidth: "62ch",
          marginBottom: 28,
        }}
      >
        Reconstructed from a 2016 hand-sketch: two ink columns flowing into a
        chamber labeled “mechanisms that render governments inefficient,” a
        single black plume below, and a marginal note —{" "}
        <span className="text-ink-ivory">2% of psychopaths ruining it</span>.
      </p>
      <p
        className="font-mono"
        style={{
          fontSize: 10,
          color: "var(--dim)",
          letterSpacing: "0.16em",
          lineHeight: 1.7,
          textTransform: "uppercase",
          maxWidth: "80ch",
        }}
      >
        All citations link to public references. Provenance attached for each
        claim; methodology of contested estimates — especially corporate
        psychopathy prevalence — flagged in the source line or in the linked
        literature.
      </p>
    </footer>
  );
}

function TabBar({
  tab,
  setTab,
}: {
  tab: Tab;
  setTab: (t: Tab) => void;
}) {
  const items: { id: Tab; label: string; n: string }[] = [
    { id: "chamber", label: "The Chamber", n: "I" },
    { id: "alternatives", label: "Other Names", n: "II" },
    { id: "origin", label: "Origin (2016)", n: "III" },
  ];
  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 20,
        background: "rgba(12,11,10,0.86)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        borderBottom: "1px solid var(--border-soft)",
      }}
    >
      <div
        className="col-wide px-5 flex items-center"
        style={{ height: 52, gap: 28 }}
      >
        <span
          className="font-mono"
          style={{
            fontSize: 10,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "var(--mute)",
          }}
        >
          ペシ魔鉄則
        </span>
        <div style={{ flex: 1 }} />
        {items.map((it) => {
          const active = tab === it.id;
          return (
            <button
              key={it.id}
              onClick={() => setTab(it.id)}
              className="font-mono"
              style={{
                background: "transparent",
                border: "none",
                padding: "8px 0",
                cursor: "pointer",
                color: active ? "var(--ivory)" : "var(--mute)",
                fontSize: 11,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                borderBottom: active
                  ? "1px solid var(--amber)"
                  : "1px solid transparent",
                transition: "color .15s, border-color .15s",
              }}
            >
              <span style={{ color: "var(--dim)", marginRight: 8 }}>
                {it.n}
              </span>
              {it.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

export default function App() {
  const [tab, setTab] = useState<Tab>("chamber");

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <TabBar tab={tab} setTab={setTab} />
      <AnimatePresence mode="wait">
        {tab === "chamber" && (
          <motion.main
            key="chamber"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <ChamberSection />
            <Hero />
            <MechanismsCatalogue />
            <Footer />
          </motion.main>
        )}
        {tab === "alternatives" && (
          <motion.main
            key="alternatives"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <AlternativesTab />
            <Footer />
          </motion.main>
        )}
        {tab === "origin" && (
          <motion.main
            key="origin"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <OriginTab />
            <Footer />
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}
