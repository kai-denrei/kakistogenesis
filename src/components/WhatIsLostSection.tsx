import { useMemo, useState } from "react";
import { ExternalLink } from "lucide-react";
import {
  LOSSES,
  LOSS_CATEGORIES,
  LOSS_CATEGORY_ORDER,
  type Loss,
  type LossCategoryKey,
} from "../data/losses";

/**
 * § — What is lost.
 *
 * The cost ledger. Sister section to the mechanism catalogue, downstream where
 * the catalogue is upstream. Ten loss cards, four categories
 * (material / human / epistemic / social), each card linked back to the
 * mechanisms that produce it via `produced_by`.
 *
 * Visual register mirrors `MechanismCard` — left rail of metadata, claim
 * paragraph, OBSERVABLE/INCIDENCE/Reference. Loss-category colors replace
 * the mechanism palette. Each card carries `id="l-<id>"` for the reciprocal
 * cross-link from the mechanism cards.
 *
 * Filter pills follow the catalogue pattern.
 */

function CategoryFilter({
  active,
  setActive,
}: {
  active: LossCategoryKey | "all";
  setActive: (k: LossCategoryKey | "all") => void;
}) {
  return (
    <div className="col-wide px-5" style={{ marginBottom: 28 }}>
      <div className="label-mono mb-3">Filter by family</div>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActive("all")}
          className="font-mono"
          style={{
            padding: "10px 14px",
            minHeight: 44,
            border: `1px solid ${active === "all" ? "var(--ivory)" : "var(--border-mid)"}`,
            background: active === "all" ? "var(--ivory)" : "transparent",
            color: active === "all" ? "var(--bg)" : "var(--ink-paper, #d8cfb8)",
            fontSize: 11,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            cursor: "pointer",
            transition: "all .15s",
            touchAction: "manipulation",
          }}
        >
          All ten
        </button>
        {LOSS_CATEGORY_ORDER.map((key) => {
          const cat = LOSS_CATEGORIES[key];
          const isActive = active === key;
          return (
            <button
              key={key}
              onClick={() => setActive(key)}
              className="font-mono"
              style={{
                padding: "10px 14px",
                minHeight: 44,
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
                touchAction: "manipulation",
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
          {LOSS_CATEGORIES[active].desc}
        </p>
      )}
    </div>
  );
}

function LossCard({ l }: { l: Loss }) {
  const cat = LOSS_CATEGORIES[l.category];
  return (
    <article
      id={`l-${l.id}`}
      style={{
        borderLeft: `2px solid ${cat.color}`,
        padding: "26px 18px 26px 26px",
        scrollMarginTop: 80,
      }}
    >
      <div className="flex flex-wrap gap-6 items-baseline">
        {/* Left rail: produced_by mechanism tags */}
        <div style={{ minWidth: 180, maxWidth: 220 }}>
          <div
            className="font-mono"
            style={{
              fontSize: 10,
              color: cat.color,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              marginBottom: 10,
            }}
          >
            {cat.label}
          </div>
          <div
            className="font-mono"
            style={{
              fontSize: 9.5,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--dim)",
              marginBottom: 8,
            }}
          >
            Produced by
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 6,
            }}
          >
            {l.produced_by.map((mid) => (
              <a
                key={mid}
                href={`#m-${mid}`}
                className="font-mono"
                style={{
                  fontSize: 9.5,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--paper)",
                  border: "1px solid var(--border-mid)",
                  padding: "3px 6px",
                  borderRadius: 2,
                  textDecoration: "none",
                  lineHeight: 1.2,
                }}
              >
                {mid.replace(/-/g, " ")}
              </a>
            ))}
          </div>
        </div>

        {/* Body */}
        <div style={{ flex: 1, minWidth: 280 }}>
          <h3
            className="d-md text-ink-ivory"
            style={{ margin: "0 0 12px 0" }}
          >
            {l.name}
          </h3>
          <p
            className="b-md text-ink-paper"
            style={{ margin: "0 0 18px 0", maxWidth: "62ch" }}
          >
            {l.claim}
          </p>

          {/* OBSERVABLE — small mono caption + body */}
          <div style={{ marginBottom: 12, maxWidth: "70ch" }}>
            <div
              className="font-mono"
              style={{
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
                fontSize: 14.5,
                lineHeight: 1.55,
                color: "var(--paper)",
              }}
            >
              {l.observable}
            </div>
          </div>

          {/* INCIDENCE — italic, one shade lighter */}
          <div style={{ marginBottom: 16, maxWidth: "70ch" }}>
            <div
              className="font-mono"
              style={{
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
                fontSize: 14,
                lineHeight: 1.55,
                color: "var(--mute)",
              }}
            >
              {l.incidence}
            </div>
          </div>

          {/* Reference (citation + external link) */}
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
            {l.reference}
          </div>
          {l.url && (
            <a
              href={l.url}
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
                color: cat.color,
                borderBottom: "none",
              }}
            >
              Reference <ExternalLink size={11} />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default function WhatIsLostSection() {
  const [active, setActive] = useState<LossCategoryKey | "all">("all");
  const filtered = useMemo(() => {
    if (active === "all") return LOSSES;
    return LOSSES.filter((l) => l.category === active);
  }, [active]);

  return (
    <section className="pt-12 pb-16">
      <div className="col-wide px-5" style={{ marginBottom: 24 }}>
        <div className="label-mono mb-4">§ — What is lost</div>
        <h2 className="d-xl text-ink-ivory" style={{ marginBottom: 20 }}>
          What is lost.
        </h2>
        <p
          className="b-md text-ink-paper col-text"
          style={{ marginLeft: 0, marginBottom: 16, maxWidth: "62ch" }}
        >
          The mechanism ledger describes how the chamber operates. The cost
          ledger describes what it consumes. These are not the same list. A
          mechanism is a property of the apparatus; a loss is what comes out
          the bottom — or, more accurately, what fails to. Some losses are
          tangible and measurable (misallocated capital, foregone innovation).
          Others are diagnostic by nature: you cannot point to the medical
          treatment that was never developed, the problem that was never
          named, the conscientious official who quietly left for the private
          sector at thirty-one. The chamber's most expensive outputs are the
          ones it forecloses.
        </p>
      </div>

      <CategoryFilter active={active} setActive={setActive} />

      <div className="col-wide px-5">
        <hr className="rule" />
        <div>
          {filtered.map((l) => (
            <div
              key={l.id}
              style={{ borderBottom: "1px solid var(--border-soft)" }}
            >
              <LossCard l={l} />
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
              No losses in this family.
            </div>
          )}
        </div>
      </div>

      {/* Closing paragraph (italic) */}
      <div className="col-wide px-5" style={{ marginTop: 56 }}>
        <p
          className="b-md text-ink-paper col-text"
          style={{
            marginLeft: 0,
            maxWidth: "62ch",
            fontStyle: "italic",
            color: "var(--paper)",
          }}
        >
          Not every loss falls evenly. Most fall hardest on those without exit
          options — the poor, the unconnected, the institutionally illiterate.
          The chamber sorts not just <em>what</em> output reaches whom, but{" "}
          <em>who absorbs the cost when the output is bad</em>. Sen's
          capability framing is the rigorous version of the asymmetry. The
          chamber does not just produce bad outputs; it produces a
          distributional layer that decides who lives with them.
        </p>
      </div>
    </section>
  );
}
