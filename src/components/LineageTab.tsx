import { useEffect, useMemo, useState } from "react";
import { ExternalLink } from "lucide-react";
import {
  LINEAGE,
  TRADITIONS,
  TRADITION_ORDER,
  type LineageEntry,
  type TraditionKey,
} from "../data/lineage";
import { useBodyScrollLock } from "../hooks/useBodyScrollLock";

/**
 * Lineage tab — pre-modern history of the filter.
 *
 * Working thesis: modern public choice and institutional economics did not
 * *discover* the filter's mechanisms; they *measured* what Aristotle, Polybius,
 * Tacitus, Ibn Khaldūn, La Boétie, Montesquieu, and Bastiat had already diagnosed.
 *
 * Layout: short framing paragraph → entries grouped by tradition → closing
 * paragraph on the 20th-century contribution as measurement, not insight.
 *
 * Each entry is a card. Click opens a modal with the original-language passage,
 * full claim, source, external reference link, and the honest_caveat surfaced
 * in italic mute color.
 */

function LineageCard({
  e,
  onOpen,
}: {
  e: LineageEntry;
  onOpen: (e: LineageEntry) => void;
}) {
  const tint = TRADITIONS[e.tradition].tint;
  const verificationPending = e.passage.includes("verification pending");
  return (
    <button
      onClick={() => onOpen(e)}
      className="font-display lineage-card"
      style={{
        textAlign: "left",
        background: "transparent",
        border: "none",
        borderLeft: `2px solid ${tint}`,
        padding: "20px 22px 22px 22px",
        cursor: "pointer",
        width: "100%",
        color: "inherit",
        transition: "background-color .15s",
        display: "block",
      }}
    >
      <div
        className="font-mono"
        style={{
          fontSize: 10.5,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: tint,
          marginBottom: 6,
        }}
      >
        {e.year} · {e.originator}
      </div>
      <div
        className="d-md text-ink-ivory"
        style={{ marginBottom: 8, lineHeight: 1.18 }}
      >
        {e.name}
      </div>
      {e.original && (
        <div
          style={{
            fontFamily: "'EB Garamond', ui-serif, Georgia, serif",
            fontStyle: "italic",
            fontSize: 14.5,
            color: "var(--paper)",
            marginBottom: 8,
            opacity: 0.85,
          }}
        >
          {e.original}
        </div>
      )}
      <div
        className="b-md text-ink-paper"
        style={{
          fontStyle: "italic",
          margin: 0,
          maxWidth: "60ch",
          fontSize: 16,
          lineHeight: 1.5,
        }}
      >
        {e.brief}
      </div>
      <div
        className="font-mono"
        style={{
          fontSize: 10,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: "var(--dim)",
          marginTop: 12,
          display: "flex",
          gap: 14,
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <span>{e.work}</span>
        {verificationPending && (
          <span
            style={{
              color: "var(--oxblood)",
              border: "1px solid var(--oxblood)",
              padding: "2px 6px",
              fontSize: 9,
              letterSpacing: "0.18em",
            }}
          >
            verification pending
          </span>
        )}
      </div>
    </button>
  );
}

function TraditionSection({
  tradition,
  entries,
  onOpen,
}: {
  tradition: TraditionKey;
  entries: LineageEntry[];
  onOpen: (e: LineageEntry) => void;
}) {
  if (entries.length === 0) return null;
  const t = TRADITIONS[tradition];
  return (
    <section style={{ marginBottom: 64 }}>
      <header
        style={{
          marginBottom: 28,
          paddingBottom: 14,
          borderBottom: `1px solid ${t.tint}`,
          opacity: 0.96,
        }}
      >
        <div
          className="font-mono"
          style={{
            fontSize: 11,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: t.tint,
            marginBottom: 4,
          }}
        >
          § — {t.label}
        </div>
        <div
          className="font-mono"
          style={{
            fontSize: 10,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "var(--dim)",
          }}
        >
          {t.subtitle}
        </div>
      </header>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 320px), 1fr))",
          gap: 18,
        }}
      >
        {entries.map((e) => (
          <LineageCard key={e.id} e={e} onOpen={onOpen} />
        ))}
      </div>
    </section>
  );
}

function LineageModal({
  entry,
  onClose,
}: {
  entry: LineageEntry | null;
  onClose: () => void;
}) {
  // Esc to close
  useEffect(() => {
    if (!entry) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [entry, onClose]);

  // body scroll-lock while modal open — iOS-safe
  useBodyScrollLock(entry !== null);

  if (!entry) return null;
  const tint = TRADITIONS[entry.tradition].tint;
  const verificationPending = entry.passage.includes("verification pending");

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={`lineage-modal-title-${entry.id}`}
      onClick={onClose}
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
        overscrollBehavior: "contain",
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
          maxHeight: "min(88dvh, calc(100dvh - 32px))",
          overflowY: "auto",
          overscrollBehavior: "contain",
          padding: "clamp(22px, 3.4vw, 38px)",
          paddingBottom:
            "max(clamp(22px, 3.4vw, 38px), env(safe-area-inset-bottom))",
          position: "relative",
          boxShadow: "0 24px 64px rgba(0,0,0,0.7)",
          borderRadius: 2,
          color: "var(--ivory)",
        }}
      >
        <button
          onClick={onClose}
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
            marginBottom: 12,
            paddingRight: 56,
          }}
        >
          {TRADITIONS[entry.tradition].label} · {entry.year} · {entry.originator}
        </div>

        <h3
          id={`lineage-modal-title-${entry.id}`}
          style={{
            fontFamily: "'Fraunces', ui-serif, serif",
            fontSize: "clamp(1.5rem, 3vw, 2rem)",
            fontWeight: 500,
            color: "var(--ivory)",
            marginBottom: 8,
            lineHeight: 1.15,
            letterSpacing: "-0.005em",
          }}
        >
          {entry.name}
        </h3>

        {entry.original && (
          <div
            style={{
              fontFamily: "'EB Garamond', ui-serif, Georgia, serif",
              fontStyle: "italic",
              fontSize: 17,
              color: "var(--paper)",
              marginBottom: 18,
              opacity: 0.9,
            }}
          >
            {entry.original}
          </div>
        )}

        <div
          className="font-mono"
          style={{
            fontSize: 10,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "var(--mute)",
            marginBottom: 22,
          }}
        >
          {entry.work}
        </div>

        {/* Passage block */}
        <blockquote
          style={{
            margin: "0 0 22px 0",
            padding: "16px 18px",
            background: "rgba(255,255,255,0.018)",
            borderLeft: `3px solid ${tint}`,
            fontFamily: "'EB Garamond', ui-serif, Georgia, serif",
            fontStyle: "italic",
            fontSize: 17,
            lineHeight: 1.55,
            color: verificationPending ? "var(--mute)" : "var(--ivory)",
          }}
        >
          {entry.passage}
        </blockquote>

        <p
          style={{
            fontFamily: "'EB Garamond', ui-serif, Georgia, serif",
            fontSize: 17,
            lineHeight: 1.6,
            color: "var(--paper)",
            marginBottom: 22,
          }}
        >
          {entry.claim}
        </p>

        {entry.prefigures.length > 0 && (
          <div
            style={{
              marginBottom: 18,
              display: "flex",
              flexWrap: "wrap",
              gap: 8,
              alignItems: "center",
            }}
          >
            <span
              className="font-mono"
              style={{
                fontSize: 10,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--dim)",
                marginRight: 4,
              }}
            >
              Prefigures
            </span>
            {entry.prefigures.map((p) => (
              <a
                key={p}
                href={`#m-${p}`}
                className="font-mono"
                style={{
                  fontSize: 10.5,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--paper)",
                  border: "1px solid var(--border-mid)",
                  padding: "4px 8px",
                  borderRadius: 2,
                  textDecoration: "none",
                  borderBottom: "1px solid var(--border-mid)",
                }}
              >
                {p.replace(/-/g, " ")}
              </a>
            ))}
          </div>
        )}

        <p
          style={{
            fontFamily: "'EB Garamond', ui-serif, Georgia, serif",
            fontSize: 13.5,
            lineHeight: 1.55,
            fontStyle: "italic",
            color: "var(--mute)",
            paddingTop: 14,
            marginBottom: 18,
            borderTop: "1px solid var(--border-soft)",
          }}
        >
          {entry.source}
        </p>

        <div style={{ marginBottom: 22 }}>
          <div
            className="font-mono"
            style={{
              fontSize: 10,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--dim)",
              marginBottom: 6,
            }}
          >
            Honest caveat
          </div>
          <p
            style={{
              fontFamily: "'EB Garamond', ui-serif, Georgia, serif",
              fontStyle: "italic",
              fontSize: 14.5,
              lineHeight: 1.55,
              color: "var(--mute)",
              margin: 0,
            }}
          >
            {entry.honest_caveat}
          </p>
        </div>

        {entry.url && (
          <a
            href={entry.url}
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
}

export default function LineageTab() {
  const [open, setOpen] = useState<LineageEntry | null>(null);

  const grouped = useMemo(() => {
    const out: Record<TraditionKey, LineageEntry[]> = {
      greek: [],
      latin: [],
      "medieval-islamic": [],
      chinese: [],
      indian: [],
      "renaissance-italian": [],
      french: [],
      british: [],
    };
    for (const e of LINEAGE) out[e.tradition].push(e);
    return out;
  }, []);

  const verificationPendingCount = useMemo(
    () => LINEAGE.filter((e) => e.passage.includes("verification pending")).length,
    []
  );

  return (
    <section className="col-wide px-5 pt-12 pb-24">
      <div className="label-mono mb-3">§ — Pre-modern lineage</div>
      <h2
        className="d-xl text-ink-ivory"
        style={{ marginBottom: 24, maxWidth: "20ch" }}
      >
        Almost none of this is new.
      </h2>

      <div className="col-mid" style={{ marginLeft: 0, marginBottom: 56 }}>
        <p
          className="b-lg text-ink-paper"
          style={{ marginBottom: "1.2em", maxWidth: "62ch" }}
        >
          Modern public choice and institutional economics did not{" "}
          <em>discover</em> the filter's mechanisms. They{" "}
          <em>measured</em> what Aristotle, Polybius, Tacitus, Ibn Khaldūn, La
          Boétie, Montesquieu, and Bastiat had already diagnosed — sometimes by
          millennia. The 20th-century contribution is empirical pointing and
          formal modeling, not original insight.
        </p>
        <p
          className="b-md text-ink-paper"
          style={{ marginBottom: "1em", maxWidth: "62ch" }}
        >
          Each entry below pairs a pre-modern thinker with the modern mechanism
          they prefigure. Quotations are ≤ 25 words, verbatim, from a verified
          primary or near-primary source. Entries that resisted clean
          verification within reasonable effort are flagged{" "}
          <span
            style={{
              color: "var(--oxblood)",
              fontFamily: "'JetBrains Mono', ui-monospace, monospace",
              fontSize: 12,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            verification pending
          </span>{" "}
          rather than fabricated. Entries are grouped by tradition rather than
          chronologically, to respect each lineage's internal coherence.
        </p>
        <p
          className="font-mono text-ink-mute"
          style={{
            fontSize: 10.5,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            marginTop: 14,
          }}
        >
          {LINEAGE.length} entries · {verificationPendingCount} flagged for
          passage verification · click any card to expand
        </p>
      </div>

      {TRADITION_ORDER.map((t) => (
        <TraditionSection
          key={t}
          tradition={t}
          entries={grouped[t]}
          onOpen={setOpen}
        />
      ))}

      <div
        className="col-mid"
        style={{ marginLeft: 0, marginTop: 64, marginBottom: 24 }}
      >
        <div className="label-mono mb-3">§ — What the 20th century actually contributed</div>
        <h3 className="d-lg text-ink-ivory" style={{ marginBottom: 20 }}>
          Not the insight. The measurement.
        </h3>
        <p
          className="b-md text-ink-paper"
          style={{ marginBottom: "1.1em", maxWidth: "62ch" }}
        >
          The lineage above is not a victory lap for the ancients. It is a
          calibration check: the filter's mechanisms are old, robust, and have
          resisted institutional reform across millennia and across
          civilizations. That is the diagnostic weight the synthesis depends on.
        </p>
        <p
          className="b-md text-ink-paper"
          style={{ marginBottom: "1.1em", maxWidth: "62ch" }}
        >
          What the 20th century did add: <em>measurement</em>. Olson's data on
          collective action and distributional coalitions. Stigler's empirics on
          who actually captures regulators and at what price. Goodhart watching
          his own law happen at the Bank of England. Niskanen counting agency
          budgets. Campbell tracing how teaching-to-the-test corrupts the test.
          Tullock's paradox sharpened by Ansolabehere's lobbying-spend numbers.
          Babiak and Hare quantifying the dark-triad operator's
          over-representation in senior corporate roles.
        </p>
        <p
          className="b-md text-ink-paper"
          style={{ maxWidth: "62ch" }}
        >
          The intuitions were ancient. The numbers are recent. The numbers
          confirm the intuitions and refuse to let us pretend the filter is a
          contemporary problem in need of a contemporary fix.
        </p>
      </div>

      <LineageModal entry={open} onClose={() => setOpen(null)} />
    </section>
  );
}
