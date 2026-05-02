/**
 * The cost ledger — ten losses produced by the chamber.
 *
 * See `what-is-lost.md` for the full integration brief. IDs and content are
 * verbatim from that brief; do not edit values without updating the source.
 *
 * Each loss links upstream into the mechanism ledger via `produced_by`. The
 * inverse map (`MECHANISM_TO_LOSSES`) is computed at module load and consumed
 * by the mechanism cards to render the reciprocal "Produces:" line.
 */

import { MECHANISMS } from "./mechanisms";

export type LossCategoryKey = "material" | "human" | "epistemic" | "social";

export type Loss = {
  id: string;
  name: string;
  category: LossCategoryKey;
  brief: string;
  claim: string;
  produced_by: string[];
  observable: string;
  incidence: string;
  reference: string;
  url: string;
};

export const LOSS_CATEGORIES: Record<
  LossCategoryKey,
  { label: string; color: string; desc: string }
> = {
  material: {
    label: "Material",
    color: "#9c7a4a",
    desc: "Wasted resources, foreclosed futures.",
  },
  human: {
    label: "Human",
    color: "#a87878",
    desc: "What it costs the people inside and adjacent.",
  },
  epistemic: {
    label: "Epistemic",
    color: "#7a98a8",
    desc: "What the institution loses the ability to know.",
  },
  social: {
    label: "Social",
    color: "#7a9a7a",
    desc: "What erodes between institution and population.",
  },
};

export const LOSS_CATEGORY_ORDER: LossCategoryKey[] = [
  "material",
  "human",
  "epistemic",
  "social",
];

export const LOSSES: Loss[] = [
  /* MATERIAL */
  {
    id: "misallocation",
    name: "Misallocation of Resources",
    category: "material",
    brief:
      "Capital, labor, attention flow toward what the chamber rewards, not toward production.",
    claim:
      "Capital, labor, and attention follow the chamber’s incentive gradient: toward rent extraction, metric performance, headcount growth, regulatory compliance theater. The deadweight loss in Tullock’s rent-seeking literature measures resources spent on the contest itself; this is almost certainly an underestimate, because it does not count the gamed outputs the contest produces. The visible cost is mismeasured GDP. The invisible cost is every product not built, every clinical trial not run, every road not laid because the marginal dollar went to lobbying, compliance, or paperwork.",
    produced_by: [
      "stigler",
      "tullock-rent",
      "yandle",
      "olson65",
      "olson82",
      "goodhart",
      "campbell",
    ],
    observable:
      "Lobbying expenditure as share of GDP. Compliance staff headcount in regulated industries. Hospital administrators per physician.",
    incidence:
      "Falls everywhere, but most heavily on sectors with the heaviest capture (healthcare, finance, defense procurement, real estate).",
    reference:
      "Tullock, G. (1967). Krueger, A. O. (1974). Murphy, K. M., Shleifer, A., & Vishny, R. W. (1991). The Allocation of Talent: Implications for Growth. QJE, 106(2).",
    url: "https://academic.oup.com/qje/article-abstract/106/2/503/1873418",
  },
  {
    id: "innovation-foreclosure",
    name: "Innovation Foreclosure",
    category: "material",
    brief:
      "Incumbents protected; alternatives unbuilt. The cost is the counterfactual that doesn’t exist.",
    claim:
      "New approaches need air, capital, regulatory permission, and social legitimacy to take root. The chamber’s bias toward incumbents withholds all four. The cost is invisible by construction — no one mourns what was never produced. Bastiat’s parable of *what is not seen* is the foundational reference. Olson’s argument that war and revolution sometimes precede growth is the structural claim: catastrophe is occasionally the only thing that clears the foreclosure. Most of what the chamber costs us, in the long run, is futures we will never see.",
    produced_by: ["stigler", "yandle", "olson82", "trained-incapacity", "shirky"],
    observable:
      "Time-to-approval for new entrants vs. incumbents. Decline of firm formation rates. Regulatory grandfathering clauses. Patent thickets.",
    incidence:
      "Falls hardest on outsiders — new firms, new approaches, new professions — and on the populations they would have served.",
    reference:
      "Bastiat, F. (1850). Ce qu’on voit et ce qu’on ne voit pas. Olson, M. (1982). The Rise and Decline of Nations.",
    url: "https://oll.libertyfund.org/title/bastiat-the-bastiat-collection-2-vols",
  },

  /* HUMAN */
  {
    id: "consumed-effort",
    name: "Consumed Moral Effort",
    category: "human",
    brief:
      "Good intent enters, paperwork exits. High-quality attention radiates as exhaustion.",
    claim:
      "The conscientious bureaucrat, the honest regulator, the doctor following protocol over judgment: their effort enters the chamber and emerges as paperwork. The work is not redirected, it is consumed without conversion. There is a real entropy term here — high-quality human attention going in, low-quality output coming out, with the difference radiated away as personal exhaustion, cynicism, and burnout. Over a career it destroys people. Weber’s *iron cage* is the original treatment; Graeber’s *Bullshit Jobs* the popular one. The cost is borne first by the worker, second by everyone who depended on the work being done well.",
    produced_by: [
      "pournelle",
      "parkinson",
      "bikeshed",
      "goodhart",
      "campbell",
      "trained-incapacity",
    ],
    observable:
      "Burnout rates and exit interviews in mid-career civil service, medicine, teaching, social work. Time-use studies showing administrative burden vs. core work.",
    incidence:
      "Falls on the conscientious within the institution. The cynical and the indifferent absorb less of it because they invest less to begin with.",
    reference:
      "Weber, M. (1905). Die protestantische Ethik. Graeber, D. (2018). Bullshit Jobs: A Theory.",
    url: "https://en.wikipedia.org/wiki/Bullshit_Jobs",
  },
  {
    id: "human-capital-exodus",
    name: "Human Capital Exodus",
    category: "human",
    brief:
      "The conscientious leave; the tolerant stay; the exploitative thrive. The institution’s composition drifts.",
    claim:
      "Adverse selection at the personnel level. People who experience the chamber’s bias as morally unbearable leave. People who tolerate it stay. People who exploit it thrive. Over generations the institution’s human composition shifts toward those least troubled by what it does, which makes the bias self-reinforcing. The recruiting pipeline that produces the asymmetric exploiter is not a conspiracy — it is everyone else self-selecting out. Hirschman’s *Exit, Voice, and Loyalty* (1970) is the canonical treatment. The loss is twofold: the institution forfeits the people whose conscience it most needed, and those people forfeit the careers they originally chose.",
    produced_by: ["psychopathy", "pournelle", "principal-agent", "shirky", "peter"],
    observable:
      "Mid-career attrition rates by personality and ethical-orientation measures. Cohort tracking from professional schools to ten-year retention.",
    incidence:
      "Heaviest on idealistic entrants. The institution loses its best human capital first; the broader society absorbs them or loses them to disengagement.",
    reference:
      "Hirschman, A. O. (1970). Exit, Voice, and Loyalty: Responses to Decline in Firms, Organizations, and States. Harvard University Press.",
    url: "https://www.hup.harvard.edu/catalog.php?isbn=9780674276604",
  },
  {
    id: "moral-conditioning",
    name: "Adverse Moral Conditioning",
    category: "human",
    brief:
      "The population is trained out of good faith. Damage persists past institutional reform.",
    claim:
      "The chamber does not just consume good intent in the moment; it trains people out of it over time. Repeated experience of effort-without-effect produces learned helplessness. Repeated experience of cynicism-rewarded produces cynicism. The next cohort entering the institution arrives pre-conditioned by the last cohort’s exit stories. This is the deepest loss because it persists after the institution itself reforms — the human capital is damaged in ways that take a generation to repair. Solzhenitsyn’s *Live Not by Lies* and Havel’s *Power of the Powerless* are the diagnostics. The post-Soviet states are the case study in how long the repair takes.",
    produced_by: ["psychopathy", "principal-agent", "goodhart", "campbell", "shirky"],
    observable:
      "Trust survey decay across generations. Civic participation rates. Whistleblowing frequency vs. observed misconduct rates. Exit-survey patterns.",
    incidence:
      "Population-wide and intergenerational. Strongest where the chamber operates most visibly and corrective mechanisms are weakest.",
    reference:
      "Havel, V. (1978). The Power of the Powerless. Solzhenitsyn, A. (1974). Live Not by Lies.",
    url: "https://en.wikipedia.org/wiki/The_Power_of_the_Powerless",
  },

  /* EPISTEMIC */
  {
    id: "problem-latency",
    name: "Problem Latency",
    category: "epistemic",
    brief:
      "Problems that don’t fit the chamber’s incentives are never named. They exist; they are not registered.",
    claim:
      "Problems that do not fit the chamber’s incentive structure are not merely under-resourced — they are *never named in the first place*. They have no constituency, no metric, no agency owner. They exist in reality but not in policy. The unhoused before homelessness was a category. Repetitive strain injury before ergonomics. Climate change for most of the 20th century. Indoor air quality before COVID. The chamber does not suppress these problems; it never registers them. The cost is measured not in delayed solutions but in the latency between a problem becoming real and the institutional language existing to discuss it. Often decades. Sometimes never.",
    produced_by: ["hayek", "olson65", "merton", "trained-incapacity", "shirky"],
    observable:
      "Lag between first peer-reviewed identification of a problem and first regulatory recognition. Categories that exist in academia but not in policy. Diseases that exist in patients but not in diagnostic manuals.",
    incidence:
      "Heaviest on populations whose problems are not legible to the institution’s existing categories — minorities, women historically in medicine, the poor, the geographically remote.",
    reference:
      "Merton, R. K. (1936). The Unanticipated Consequences of Purposive Social Action. Foucault, M. (1969). L’Archéologie du savoir.",
    url: "https://en.wikipedia.org/wiki/Unintended_consequences",
  },
  {
    id: "lost-correction",
    name: "Lost Corrective Capacity",
    category: "epistemic",
    brief:
      "Feedback loops break in both directions. The system cannot learn from error.",
    claim:
      "The chamber breaks the signal path between consequence and decision-maker. Hayek’s knowledge problem describes one direction — local information not reaching the center. The other direction is consequences not reaching the decision-maker. Both break, with the same effect: the system can no longer learn. A market without prices, an organism without nociception. Errors do not propagate back as corrections; they accumulate. This is why dysfunctional institutions do not recover incrementally — the error-correction substrate is itself part of what has decayed. External shock becomes the only remaining repair mechanism. Olson’s observation that war and revolution precede growth spurts is this loss stated as a historical pattern.",
    produced_by: [
      "hayek",
      "principal-agent",
      "moral-hazard",
      "goodhart",
      "campbell",
      "olson82",
    ],
    observable:
      "Time from policy enactment to measurement of effect. Frequency of post-implementation review. Distance — organizational, geographic, social — between decision-makers and those bearing consequences.",
    incidence:
      "The loss is to the institution’s capacity to function. The bearers are the population subjected to uncorrected error — disproportionately those without the resources to route around it.",
    reference:
      "Hayek, F. A. (1945). The Use of Knowledge in Society. Olson, M. (1982). The Rise and Decline of Nations.",
    url: "https://www.econlib.org/library/Essays/hykKnw.html",
  },
  {
    id: "epistemic-capture",
    name: "Epistemic Capture",
    category: "epistemic",
    brief:
      "The institution loses the ability to know what it is actually doing.",
    claim:
      "Goodhart and Campbell describe the metric-gaming half of measurement failure. The other half is internal honesty: nobody can tell power what is actually happening, because the messenger is shot, demoted, or simply not promoted. Information flowing toward decision-makers is filtered for what they want to hear. The Soviet harvest reports, the BP Macondo well, the Boeing 737-MAX, the COVID lab-leak debate, every intelligence-failure post-mortem in modern history: same mechanism. This is structurally distinct from regulatory capture — the institution does not lose to an outside interest; it loses to itself. It loses the ability to know what it is doing while continuing to do it.",
    produced_by: [
      "goodhart",
      "campbell",
      "principal-agent",
      "pournelle",
      "trained-incapacity",
      "psychopathy",
    ],
    observable:
      "Whistleblower retaliation rates. Internal-audit findings vs. external-audit findings. Post-mortem analyses of institutional failures. Frequency of “we were warned” patterns in disaster reviews.",
    incidence:
      "The institution is the primary victim of its own blindness. Secondary victims are everyone its decisions affect.",
    reference:
      "Goodhart, C. A. E. (1975). Strathern, M. (1997). Improving Ratings. Janis, I. (1972). Victims of Groupthink.",
    url: "https://en.wikipedia.org/wiki/Groupthink",
  },

  /* SOCIAL */
  {
    id: "coordination-tax",
    name: "Coordination Tax — Trust",
    category: "social",
    brief:
      "Trust depletes; transaction costs rise; low-friction exchange becomes impossible.",
    claim:
      "Once the chamber’s bias is recognized by the population, every interaction with institutions carries a tax: *what are they actually optimizing for?* Putnam measured this as social capital. Fukuyama wrote *Trust* (1995) on it. The World Values Survey tracks it across countries. High-trust societies coordinate on a handshake; low-trust societies require notarization, escrow, lawyers, advance payment, parallel relationships. The chamber does not just produce bad outputs — it produces a population that *expects* bad outputs, and that expectation becomes a transaction cost on every future exchange. The cost compounds: each generation pays it forward.",
    produced_by: [
      "stigler",
      "principal-agent",
      "moral-hazard",
      "psychopathy",
      "olson82",
    ],
    observable:
      "World Values Survey trust measures. Notarization frequency, escrow use, lawyer per capita. Bureaucratic friction at the citizen interface (forms, signatures, in-person requirements).",
    incidence:
      "Falls hardest on those without insider connections. The well-connected route around the friction; the unconnected absorb the full transaction cost.",
    reference:
      "Fukuyama, F. (1995). Trust: The Social Virtues and the Creation of Prosperity. Putnam, R. (2000). Bowling Alone.",
    url: "https://en.wikipedia.org/wiki/Trust_(social_science)",
  },
  {
    id: "legitimacy-depletion",
    name: "Legitimacy Depletion",
    category: "social",
    brief:
      "The substrate of voluntary compliance erodes. Enforcement costs rise nonlinearly.",
    claim:
      "Legitimacy is distinct from trust (predictability) and approval (preference). It is the population’s belief that the institution is *for them* — the substrate that allows compliance without enforcement. When it depletes, enforcement costs do not rise linearly; they rise nonlinearly, because every act of coercion further depletes legitimacy in the next period. The chamber does not necessarily produce *illegitimate* institutions. It produces institutions that *deplete* their initial legitimacy stock. La Boétie’s pyramid only stands while those at the base accept it. Habermas’s *Legitimationsprobleme im Spätkapitalismus* (1973) is the modern treatment. When this loss runs to completion, the result is regime change, civil unrest, or quiet disengagement at scale.",
    produced_by: [
      "oligarchy",
      "pournelle",
      "stigler",
      "principal-agent",
      "olson82",
      "psychopathy",
    ],
    observable:
      "Voter turnout decline. Tax compliance rates. Civic participation. Survey questions of the form “does government work for people like me.”",
    incidence:
      "Felt most acutely by populations the institution is nominally serving but visibly failing. Often correlates with which groups bear the asymmetric harm in the first place.",
    reference:
      "Habermas, J. (1973). Legitimationsprobleme im Spätkapitalismus. Levi, M. (1988). Of Rule and Revenue.",
    url: "https://en.wikipedia.org/wiki/Legitimation_crisis",
  },
];

/* ---------- inverse map: mechanism id -> losses produced ---------- */

export const MECHANISM_TO_LOSSES: Record<string, Loss[]> = (() => {
  const map: Record<string, Loss[]> = {};
  for (const m of MECHANISMS) map[m.id] = [];
  for (const loss of LOSSES) {
    for (const mid of loss.produced_by) {
      if (!map[mid]) map[mid] = [];
      map[mid].push(loss);
    }
  }
  return map;
})();

/* ---------- lookup helpers ---------- */

export const LOSS_BY_ID: Record<string, Loss> = Object.fromEntries(
  LOSSES.map((l) => [l.id, l]),
);
