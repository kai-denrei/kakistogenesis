/**
 * Origin (2016) tab — provenance and exegesis.
 *
 * Displays the user's hand-photographed 2016 sketch with framing copy.
 * The image is the canonical visual reference for the Filter Chamber animation.
 */
export default function OriginTab() {
  return (
    <section className="col-wide px-5 pt-12 pb-24">
      <h2 className="d-xl text-ink-ivory" style={{ marginBottom: 20 }}>
        The 2016 sketch.
      </h2>
      <p
        className="b-md text-ink-paper col-text"
        style={{ marginLeft: 0, maxWidth: "62ch", marginBottom: 28 }}
      >
        This artifact began as a keynote-made visual nearly a decade before
        this build. Two ink columns; one a vibrant rainbow for{" "}
        <span className="text-ink-ivory">good intentions</span>, the other a
        drifting black volute for{" "}
        <span className="text-ink-ivory">bad intentions</span>. They both fall
        into a grinder labeled with the mechanisms that render
        governments/organizations inefficient. A single dark plume exits below.
        Regardless of intent, the outcome rarely survives the oppressive
        reality of large inefficient governments.{" "}
        <em>“2% of psychopaths ruining it”</em>, yeah, but I’d venture that
        psychopaths/sociopaths tend to be over-represented in high positions in
        bureaucracies.{" "}
        <em>“We are mostly ruled by idiots and/or psychos”</em> is my working
        theory. Prove me wrong.
      </p>

      <figure
        style={{
          margin: "0 auto",
          maxWidth: 1100,
          background: "var(--surface)",
          border: "1px solid var(--border-soft)",
          padding: "clamp(8px, 1.4vw, 18px)",
        }}
      >
        <img
          src="/origin-2016.jpeg"
          alt="2016 hand-sketch original of the Filter Chamber: rainbow ink and dark ink streams falling into a rectangular box labeled 'Mechanisms that render governments inefficient' containing the names No-skin-in-the-game, Loopholes, Greed, Moral Hazard, Bureaucratic waste, Unintended consequences. Below the box, a black ink plume captioned 'Diluted positive outcomes to downright hurtful outcomes', with a marginal note '2% of psychopaths ruining it'."
          style={{
            width: "100%",
            height: "auto",
            display: "block",
          }}
          loading="lazy"
        />
        <figcaption
          className="font-mono"
          style={{
            fontSize: 10.5,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--mute)",
            marginTop: 14,
            lineHeight: 1.7,
          }}
        >
          Hand sketch · ca. 2016 · photographed from the original notebook page
        </figcaption>
      </figure>

      <div
        className="col-mid"
        style={{ marginLeft: 0, marginRight: "auto", marginTop: 56 }}
      >
        <div className="label-mono mb-3">§ — WHAT IS IN THE BOX</div>
        <p
          className="b-md text-ink-paper"
          style={{ marginBottom: "1.2em", maxWidth: "62ch" }}
        >
          The 2016 page named six mechanisms in plain language:{" "}
          <em>No-skin-in-the-game</em>, <em>Loopholes</em>, <em>Greed</em>,{" "}
          <em>Moral Hazard</em>, <em>Bureaucratic waste</em>,{" "}
          <em>Unintended consequences</em>. The current build extends that list
          to twenty-two academically-rooted mechanisms across six families,
          keeping the original six under their formal names; Principal–Agent /
          Skin in the Game; Tullock’s Paradox and the rent-seeking literature;
          the Asymmetric Exploiter; Moral Hazard itself; Parkinson’s Law and
          Bikeshedding; Merton’s Unanticipated Consequences.
        </p>
        <p
          className="b-md text-ink-paper"
          style={{ marginBottom: "1.2em", maxWidth: "62ch" }}
        >
          The chamber animation in tab I is built directly against this image.
          Particles enter from the rainbow column above, traverse a random-walk
          subset of the mechanism nodes inside the box, lose saturation at each
          contact, and converge into a dark stream below that branches into
          three estuary mouths; 1) diluted, 2) diminished, 3) hurtful. The
          2016 sketch is the source; the animation is the reading.
        </p>
      </div>
    </section>
  );
}
