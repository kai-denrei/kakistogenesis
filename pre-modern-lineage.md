# Pre-Modern Lineage of the Filter Chamber

> Research brief for Claude CLI sub-agents.
> Project: *The Filter Chamber* — meta-theory of institutional moral entropy / *corruptio optimi pessima*.
> Goal: build a verifiable, citable "Pre-Modern Lineage" section to sit between the chamber diagram and the modern-mechanism ledger, demonstrating that almost nothing in the chamber is a 20th-century discovery.

---

## Working thesis

Modern public choice and institutional economics did not *discover* the mechanisms of institutional moral entropy. They *measured* what Aristotle, Polybius, Tacitus, Ibn Khaldun, La Boétie, Montesquieu, and Bastiat had already diagnosed — sometimes by millennia. The 20th-century contribution is empirical pointing and formal modeling, not original insight.

Each entry below pairs a pre-modern thinker with the modern mechanism they prefigure. Sub-agents should verify the textual hooks (passage, edition, translation), confirm the conceptual mapping is honest rather than retrofit, and flag any cases of overreach.

---

## Output format

Each finalized entry should produce a card matching the modern-mechanism schema in the artifact:

```js
{
  id:          'kebab-case-id',
  name:        'Concept name (English working title)',
  original:    'Original-language phrase if applicable',
  year:        'YYYY BCE | YYYY CE | c. YYYY',
  originator:  'Author',
  work:        'Primary text + canonical reference (book / chapter / section)',
  tradition:   'Greek | Latin | Medieval Islamic | Chinese | Indian | Renaissance Italian | French | British',
  category:    'self-preservation | capture | agency | knowledge | drift | exploitation | meta-cycle',
  prefigures:  ['modern-mechanism-id-1', 'modern-mechanism-id-2'],  // links into existing ledger
  brief:       'One-line tooltip (~80 chars).',
  claim:       'Full paragraph (~80–140 words). What did the thinker actually argue, and how does it map to the modern mechanism without overreach?',
  passage:     'Verbatim short quote (≤ 25 words) in original language with translation, OR a precise textual locus if quotation is impractical.',
  source:      'Best modern critical edition + standard translation. Include translator and publication year.',
  url:         'Stable public reference (Perseus / archive.org / SEP / Wikisource / authoritative).',
  honest_caveat: 'Where does the parallel break down? What anachronism are we risking?',
}
```

Sub-agents must populate `passage`, `source`, `url`, and `honest_caveat` from primary or near-primary sources. No paraphrase masquerading as quotation. No retrofitting.

---

## Categories (shared with modern ledger)

- **meta-cycle** — endogenous regime decay, anacyclosis, dynastic cycle. (NEW category, pre-moderns are heavy here.)
- **self-preservation** — institutions acquire interests of their own.
- **capture** — the regulated buy the regulator; rents flow to organized minorities.
- **agency** — decision-makers diverge from those they nominally serve.
- **knowledge** — local information and target metrics fail at scale.
- **drift** — process expands; substance recedes.
- **exploitation** — a small minority weaponizes the rest of the chamber.

---

## Lineage — entries to research

Each section below is a research task. Format: **Thinker → modern mechanism(s) prefigured → textual hook → research questions.**

### 1. Aristotle — *Politics* III–V

- **Prefigures:** principal-agent (`principal-agent`), iron law of oligarchy (`oligarchy`), regime decay (`meta-cycle`).
- **Hook:** III.7 — the three good constitutions (kingship, aristocracy, polity) each have a corrupted counterpart (tyranny, oligarchy, democracy in the pejorative sense). The corruption is defined precisely as: rulers governing for themselves rather than for the common good. This is the agency problem stated in 350 BCE.
- **Hook:** V.1–7 — how oligarchies and democracies decay through their own internal logic. Michels's iron law as structural account.
- **Research:**
  - Best Greek text: Ross OCT or Dreizehnter Teubner.
  - Standard translation: Reeve (Hackett 2017) or Lord (Chicago 2nd ed. 2013).
  - Verify the *eu zēn* / *koinon sympheron* (common advantage) framing in III.6–7.
  - Identify a quotable passage ≤ 25 words tying ruler-self-interest to constitutional corruption.
  - Confirm the V.1 *stasis* analysis is genuinely about elite defection rather than mass uprising.

### 2. Plato — *Republic* VIII

- **Prefigures:** `meta-cycle` (the endogenous decay sequence).
- **Hook:** Books VIII–IX. Timocracy → oligarchy → democracy → tyranny, each form generating its successor through its own internal corruption. Endogenous, not exogenous. Premise of the chamber: institutions decay from within.
- **Research:**
  - Best Greek text: Slings OCT (2003).
  - Standard translation: Bloom 2nd ed. (1991) or Reeve (Hackett 2004).
  - The five-regime sequence is at 543a–576b; locate the cleanest single-passage statement of the *mechanism* of decay (not just the catalogue of forms).
  - Honest caveat: Plato's psychology of regime decay (the soul of the city mirroring the soul of the man) is a stronger metaphysical claim than the chamber needs. Note this rather than smuggle it.

### 3. Polybius — *Histories* VI

- **Prefigures:** `meta-cycle` — gives it its formal name.
- **Hook:** VI.4–9, *anakyklōsis politeiōn*. Six-form cycle: monarchy → tyranny → aristocracy → oligarchy → democracy → ochlocracy → return. Olson's *Rise and Decline of Nations* (1982) is anacyclosis with distributional coalitions doing the corrupting work.
- **Research:**
  - Best text: Büttner-Wobst Teubner; modern Loeb (Paton, rev. Walbank & Habicht).
  - The clearest single-paragraph statement of the cycle is at VI.4 or VI.9; pick whichever gives a quotable hook ≤ 25 words.
  - Walbank's *Historical Commentary on Polybius* vol. 1 (1957) is the standard secondary reference.
  - Note: Polybius credits Plato; the cycle is not original to him. The contribution is the formal naming and the application to Rome.

### 4. Thucydides — *History* III.82–83 (the Corcyraean stasis)

- **Prefigures:** Goodhart's Law (`goodhart`), Campbell's Law (`campbell`) — applied to moral vocabulary.
- **Hook:** III.82.4 — *kai tēn eiōthuian axiōsin tōn onomatōn es ta erga antēllaxan tē dikaiōsei*. "And they exchanged the customary valuation of words in deeds for their justification." Words change meaning to serve power: reckless audacity becomes loyal courage; prudent hesitation becomes cowardice.
- **This is the strongest pre-modern hook in the entire lineage.** Goodhart's Law applied to the moral lexicon, 24 centuries before Goodhart.
- **Research:**
  - Best Greek text: Alberti Mondadori or OCT (Stuart Jones / Powell).
  - Translations: Hammond (Oxford 2009), Mynott (Cambridge 2013) — Mynott's notes are the best for this passage.
  - Hornblower's *Commentary on Thucydides* vol. I (1991) on III.82 is the standard secondary reference.
  - The 25-word quote should be from III.82.4 specifically.
  - Honest caveat: Thucydides is describing wartime stasis specifically, not steady-state institutional drift. The mapping to Goodhart is real but should not claim he was theorizing measurement-target dynamics.

### 5. Tacitus — *Annals* III.27

- **Prefigures:** Parkinson's Law (`parkinson`), institutional sclerosis (`olson82`).
- **Hook:** *corruptissima re publica plurimae leges*. "The more corrupt the state, the more its laws." Six words. Parkinson with a sharper edge — and a causal direction: laws proliferate *because* of the underlying disorder.
- **Research:**
  - Best Latin text: Heubner Teubner or OCT (Fisher).
  - Translation: Woodman (Hackett 2004) is current scholarly standard.
  - Verify the exact passage is III.27 and locate the surrounding sentences for context. Tacitus is making a historical argument about Republican-era legislation, not just an aphorism.
  - Goodyear's *Annals of Tacitus* commentary vol. I (1972) is the standard secondary reference.

### 6. Juvenal — Satires VI and X

- **Prefigures:** Regulatory capture (`stigler`), clientelism.
- **Hook A:** Satire VI.347–348 (some editions VI.O.31): *quis custodiet ipsos custodes?* Originally about adultery, not institutions, but the formulation is now indelibly associated with the regulator-watcher problem.
- **Hook B:** Satire X.81: *panem et circenses*. The diagnosis of how rulers buy off the citizenry. Underneath every modern analysis of clientelism.
- **Research:**
  - Best Latin text: Clausen OCT (1959, rev. 1992) or Willis Teubner.
  - Translation: Braund (Loeb 2004).
  - Honest caveat: *Quis custodiet* is genuinely about marital surveillance, not institutional design. The modern repurposing is real and durable but should be flagged as repurposing rather than original intent.
  - Courtney's *Commentary on the Satires of Juvenal* (1980) for textual notes.

### 7. Sallust — *Bellum Iugurthinum* and *Bellum Catilinae*

- **Prefigures:** Rent-seeking (`tullock-rent`), Olson's institutional sclerosis (`olson82`).
- **Hook A:** *Iugurtha* 35.10: *Romae omnia venalia esse*. "At Rome everything is for sale." Four words; Tullock's rent-seeking in classical Latin.
- **Hook B:** *Catilina* 10–13: the complete account of how prosperity (after Carthage's fall) erodes civic virtue. Olson 1982 has its macro setup here.
- **Research:**
  - Best Latin text: Reynolds OCT (1991).
  - Translation: Woodman (Penguin 2007) or Batstone (Oxford World's Classics 2010).
  - The *Cat.* 10–13 passage is the structural one; *Iug.* 35.10 is the quotable one. Both should be cited.
  - Note: Sallust is openly moralistic; the chamber framing is descriptive. Mark the difference.

### 8. Augustine — *De Civitate Dei* XIV.28 and XIX

- **Prefigures:** the *exploitation* category — `psychopathy` in classical theological dress.
- **Hook:** XIV.28 — the two cities are distinguished by two loves: *amor sui usque ad contemptum Dei* (love of self to the contempt of God) builds the earthly city; *amor Dei usque ad contemptum sui* builds the heavenly. The *libido dominandi* (lust to dominate) is the engine of the earthly city's institutions. This is the dark-triad operator stated theologically: every authority structure humans build is biased because the operators are.
- **Research:**
  - Best Latin text: CCSL 47–48 (Dombart & Kalb).
  - Translation: Dyson (Cambridge 1998) or Bettenson (Penguin 1972, still readable).
  - Locate the cleanest *libido dominandi* passage; it appears in the preface and in XIV.28 and XIX.15.
  - Honest caveat: Augustine's framing is irreducibly theological. The structural insight survives translation to a secular register, but we should not pretend he was doing institutional analysis. Mark this clearly.

### 9. Han Fei — *Han Feizi* (3rd c. BCE)

- **Prefigures:** Principal-agent (`principal-agent`), skin-in-the-game.
- **Hook:** The Legalist diagnostic: assume officials are self-interested and design institutions to be incentive-compatible regardless of personal virtue. *Han Feizi* chapters 7 ("The Two Handles" / 二柄), 30 ("Inner Congeries of Sayings, Upper Series"), and 49 ("Five Vermin" / 五蠹) are the load-bearing texts.
- **Research:**
  - Standard text: Chen Qiyou ed., *Han Feizi xin jiaozhu* (Shanghai 2000).
  - Translation: Watson (partial, Columbia 1964) is the standard short version; Liao (1939, two volumes) is complete but dated. Goldin's chapter in *Dao Companion to the Philosophy of Han Fei* (2013) for current scholarship.
  - Identify a quotable passage from "二柄" on reward-and-punishment as the only reliable governance lever — the 22-century-early statement of incentive design.
  - Honest caveat: Han Fei is a totalitarian theorist. His solution to the agency problem is concentrated absolute monarchical power. The diagnosis is right; the prescription is the opposite of constitutionalism. Note this.

### 10. Kauṭilya — *Arthaśāstra* (~3rd c. BCE / compilation through 2nd c. CE)

- **Prefigures:** Regulatory capture (`stigler`), rent-seeking (`tullock-rent`), bureaucratic graft writ large.
- **Hook:** Book II, chapter 8 (sometimes II.8, sometimes II.9 depending on edition) catalogues forty distinct methods by which officials embezzle public funds. The first systematic taxonomy of institutional graft in world literature.
- **Research:**
  - Standard text: Kangle's three-volume critical edition (Bombay 1960–65), still the scholarly reference.
  - Translation: Olivelle (*King, Governance, and Law in Ancient India*, Oxford 2013) is current and authoritative.
  - Locate the forty-methods passage and pick a representative quotable example.
  - Authorship and dating are contested — the text is a compilation across several centuries. Note that the *traditional* attribution to the Maurya-era minister of Chandragupta is older than the *redacted* text we have.
  - McClish & Olivelle (*The Arthaśāstra: Selections*, Hackett 2012) for accessible modern framing.

### 11. Ibn Khaldun — *Muqaddimah* (1377)

- **Prefigures:** Olson's institutional sclerosis (`olson82`), the meta-cycle.
- **Hook:** The complete cyclical theory. Tribal *ʿaṣabiyyah* (group solidarity / social cohesion) drives dynastic founders to power. The second and third generations lose *ʿaṣabiyyah* through urban luxury and bureaucratic ossification. The dynasty falls to the next group with intact *ʿaṣabiyyah*. This is Olson's distributional-coalitions thesis with a richer mechanism for *why* the coalitions ossify, 605 years early.
- **Research:**
  - Best Arabic text: Quatremère (1858, three vols.) is the historical critical edition; modern editions exist (Šaddādī 2005, Beirut).
  - Translation: Rosenthal (Princeton 1958, three vols.; abridged Princeton 2015 ed. Dawood) is the scholarly standard.
  - Books I–II of the *Muqaddimah* contain the *ʿaṣabiyyah* theory. Locate the cleanest single-passage statement.
  - Secondary: Lacoste, *Ibn Khaldoun: Naissance de l'histoire, passé du tiers monde* (1966); Irwin, *Ibn Khaldun: An Intellectual Biography* (Princeton 2018).
  - Honest caveat: Ibn Khaldun's mechanism is sociological-cyclical, tied to nomad/sedentary dynamics. It does not transfer cleanly to modern non-tribal polities — but the *structural* insight (founding solidarity erodes through institutional success) absolutely does. Mark the abstraction.

### 12. Machiavelli — *Discorsi sopra la prima deca di Tito Livio* (c. 1517)

- **Prefigures:** `meta-cycle`, `oligarchy`, the bridge between Polybius and modern thought.
- **Hook A:** I.2 — explicit invocation of Polybian anakyklōsis applied to Rome.
- **Hook B:** I.17–18 — explicitly titled on the corruption of free states (*Una corrotta città che vive sotto un principe...*) and on whether a corrupt populace can recover liberty. Machiavelli's answer is mostly no. Once *virtù civile* is lost in the population, no institutional reform reaches deep enough.
- **Research:**
  - Best Italian text: Inglese ed. (Einaudi 1997) or Bausi (Salerno 2001).
  - Translation: Mansfield & Tarcov (Chicago 1996) is the scholarly standard; Walker (Penguin) is more accessible.
  - The I.17 chapter title alone is half the citation; locate the strongest passage within.
  - Skinner, *Machiavelli: A Very Short Introduction* (2000) for orientation; Pocock, *The Machiavellian Moment* (1975) for the broader civic-humanist tradition.

### 13. Guicciardini — *Ricordi* (1530, posthumous)

- **Prefigures:** `principal-agent`, public choice writ small.
- **Hook:** The pervasive role of *il particolare* — private interest — as universal driver of political behavior. Public choice in Florentine, half a millennium early.
- **Research:**
  - Best Italian text: Spongano (Sansoni 1951) is the scholarly edition; Brown (Bompiani 2013) more recent.
  - Translation: Domandi (*Maxims and Reflections of a Renaissance Statesman*, Harper 1965) is the standard English.
  - Locate the most explicit *il particolare* maxims (the C-series, the mature recension, is the canonical text).
  - Note: Guicciardini is more cynical than Machiavelli, less programmatic. The *Ricordi* are aphoristic; building a 100-word claim around them requires care.

### 14. Étienne de La Boétie — *Discours de la servitude volontaire* (c. 1549)

- **Prefigures:** Logic of collective action (`olson65`), regulatory capture (`stigler`), the entire architecture of clientelist self-perpetuation.
- **Hook:** The radical question: why do millions consent to be ruled by one? Not because the tyrant is strong, but because of a *clientelist pyramid*. The tyrant has six who depend on him for status and rents; each of those six has six; the structure runs all the way down. Everyone gains more from supporting the system than from defecting. This is Olson's *Logic of Collective Action* combined with Stigler's capture, written 416 years before Olson, by an 18-year-old.
- **La Boétie is the ancestor the public-choice tradition has never fully acknowledged.** His structural-mathematical instinct (six who depend on him; six who depend on each of those) is genuinely formal in a way nothing else pre-modern is.
- **Research:**
  - Best French text: Smith (Droz 1987) or Goyard-Fabre (GF Flammarion 1983).
  - Translation: Kurz (1942, in Rothbard's *Politics of Obedience* anthology, Black Rose 1975); newer Bonnefon/Lewis (Hackett 2012).
  - Locate the "six who depend on six who depend on six" passage; it is the most original part of the text.
  - Secondary: Lefort's introduction to the Goyard-Fabre edition; Rothbard's intro to the 1975 Free Life Editions translation (politically charged but textually engaged).
  - Authorship and date are slightly debated; most scholars accept c. 1549, possibly as late as 1553. Note this.

### 15. Montesquieu — *De l'esprit des lois* (1748)

- **Prefigures:** The *constitutional design* response to the chamber. Implicit in: separation of powers, checks and balances, the entire architecture of modern constitutionalism.
- **Hook:** XI.4 — *tout homme qui a du pouvoir est porté à en abuser; il va jusqu'à ce qu'il trouve des limites*. "Every man who has power is led to abuse it; he proceeds until he finds limits." Without architectural limits, the chamber's defaults run.
- **Research:**
  - Best French text: Pléiade (Caillois 1949–51) or the in-progress Voltaire Foundation critical edition.
  - Translation: Cohler/Miller/Stone (Cambridge 1989) is the scholarly standard.
  - Book XI.4 is short and quotable; locate the exact wording.
  - Shklar, *Montesquieu* (1987) for orientation.
  - Note: Montesquieu is *the* designer in the lineage. He is not just diagnosing the chamber, he is proposing the architectural response. This makes him the natural pivot from "diagnosis" to "design."

### 16. Adam Smith — *Wealth of Nations* (1776) and *Theory of Moral Sentiments* (1759)

- **Prefigures:** Regulatory capture (`stigler`).
- **Hook:** WN I.10.2 — "People of the same trade seldom meet together, even for merriment and diversion, but the conversation ends in a conspiracy against the public, or in some contrivance to raise prices." Stigler 1971 in eighteenth-century English. At the founding of modern economics.
- **Research:**
  - Best text: Glasgow Edition of the Works and Correspondence of Adam Smith (Oxford / Liberty Fund), Campbell & Skinner eds. The *Wealth of Nations* is volumes II.a and II.b.
  - The exact citation is WN I.x.c.27 in the Glasgow numbering.
  - Note: this is one of the cleanest pre-modern hits in the lineage. The wording is unimprovable.

### 17. Bastiat — *La Loi* (1850), *Ce qu'on voit et ce qu'on ne voit pas* (1850)

- **Prefigures:** Stigler regulatory capture (`stigler`), Hayek knowledge problem (`hayek`), Merton unanticipated consequences (`merton`).
- **Hook A:** *La Loi* — *spoliation légale*. The state captured as an instrument of redistribution from producers to favored classes. Stigler's regulatory capture in 1850 French.
- **Hook B:** *Ce qu'on voit...* — the parable of the broken window and the systematic accounting of *what is seen and what is not seen*. Hayek's knowledge problem and Merton's unanticipated consequences combined, in plain prose, a century before either.
- **Bastiat is the most prescient classical liberal in the lineage.** He should be in any honest version of the chamber's intellectual history.
- **Research:**
  - Best French text: Œuvres complètes (Guillaumin 1862–64, six vols.); modern Liberty Fund / Coppet edition (Hart, ongoing) is the current scholarly reference.
  - Translation: Liberty Fund's *The Bastiat Collection* (2007) or Hart's new translations on the Online Library of Liberty.
  - *La Loi* is short (~75 pages); locate the strongest *spoliation légale* passage.
  - *Ce qu'on voit...* — the broken window parable is in section I.
  - Hart, *Bastiat's Anti-Socialist Trilogy* (Liberty Fund 2017) for current framing.

### 18. Tocqueville — *De la démocratie en Amérique* II (1840), *L'Ancien Régime et la Révolution* (1856)

- **Prefigures:** Niskanen budget-maximizer (`niskanen`), Parkinson (`parkinson`), bureaucratic drift broadly.
- **Hook A:** *Démocratie* II.4.6 — the famous "soft despotism" passage. The bureaucratic state that "does not tyrannize, it gets in the way." Niskanen and Parkinson combined, 130 years early.
- **Hook B:** *L'Ancien Régime* on pre-revolutionary administrative centralization — the chamber operating under the Bourbon monarchy in granular detail.
- **Research:**
  - Best French text: Nora ed., Œuvres (Pléiade, three vols., 1991–2004).
  - Translation: Mansfield & Winthrop (*Democracy in America*, Chicago 2000); Goldhammer (*The Ancien Régime and the Revolution*, Penguin 2008).
  - The II.4.6 passage on tutelary power is the quotable hook; ~30 lines, distill to ≤ 25 words.
  - Note: Tocqueville is empirical-observational rather than theoretical. His contribution is the granular *description* of the chamber operating, not a new mechanism.

### 19. Lord Acton — letter to Mandell Creighton (1887)

- **Prefigures:** All of `self-preservation`, Augustine's *libido dominandi* in Victorian English.
- **Hook:** *Power tends to corrupt, and absolute power corrupts absolutely. Great men are almost always bad men.*
- **Research:**
  - The letter is dated 5 April 1887. Published in Acton's *Historical Essays and Studies* (1907) and reprinted widely.
  - Best modern source: Hill (ed.), *Lord Acton: Selected Writings* (Liberty Fund, three vols., 1985–88), vol. II *Essays in the Study and Writing of History*.
  - Acton was openly building on Montesquieu and the entire La Boétie tradition. Note this — it is the most-quoted *English* formulation but is genealogically downstream.

---

## Optional / consider for inclusion

Sub-agents may also evaluate these for fit, especially if any of the above prove harder to source cleanly:

- **Cicero** — *De Officiis* I and III on the corruption of public office; *De Re Publica* on the mixed constitution.
- **Seneca** — *De Clementia* on the agency problem of imperial power.
- **Suetonius** — *De Vita Caesarum* as raw material for Conquest's Third Law in Latin.
- **Boethius** — *Consolatio Philosophiae* II on Fortune and the corruption of office.
- **al-Ghazali** — *Naṣīḥat al-Mulūk* (advice-to-kings genre, 11th c.) on princely virtue and its institutional erosion.
- **Confucius** / *Analects* — XII.7, XII.17 — though the Confucian framing is virtue-ethical rather than mechanism-structural; risk of overreach.
- **Mengzi** / Mencius — IA.7, IIA.6 — the right-of-rebellion as endogenous-decay safety valve.
- **Xunzi** — chapter on *li* and the institutional channeling of self-interest. Closer to Han Fei than to Confucius.
- **Hobbes** — *Leviathan* II on the institutional response to the chamber, parallel to Han Fei in solution.
- **Hume** — *Of the Independency of Parliament* (1741) — explicit assumption of self-interest in constitutional design, predecessor to Madison.
- **Madison** — *Federalist* 10 and 51. Constitutional design as response to faction. Sits alongside Montesquieu as the design pole.
- **Burke** — *Reflections on the Revolution in France* (1790) on the institutional capital that revolution destroys. Sits alongside Olson 1982 inverted.
- **Marx** — *18th Brumaire* on the bureaucratic state machine as autonomous interest. Heterodox addition; structurally on-target.
- **Nietzsche** — *Genealogy of Morals* II on the institutional capture of moral vocabulary. Sits alongside Thucydides III.82.

---

## Research protocol for sub-agents

Each entry should be developed as follows:

1. **Source verification.** Confirm the textual passage exists at the cited locus. Use a critical edition wherever possible. Prefer Perseus Digital Library (perseus.tufts.edu), the Loeb Classical Library, the Stanford Encyclopedia of Philosophy, and university press critical editions over secondary or aggregator sources. Wikipedia is acceptable for orientation but never as a primary source.

2. **Translation quality.** When quoting, use the named scholarly translation in the source field. Do not paraphrase and present as quotation. Verify any translation against the original-language text where the language is accessible.

3. **Conceptual mapping check.** For each pre-modern → modern mapping, ask: *Is the parallel structural, or am I retrofitting?* The honest test: would the pre-modern thinker recognize the modern mechanism as a sharper version of their own claim, or only a distant cousin? Mark distance honestly in `honest_caveat`.

4. **Anachronism flagging.** Pre-modern frameworks are often theological (Augustine), aristocratic (Aristotle), totalitarian-prescriptive (Han Fei), or tribal-cyclical (Ibn Khaldun) in ways the modern reader will miss. Flag the framing explicitly. Do not secularize, democratize, or modernize the source to fit.

5. **Quotation budget.** ≤ 25 words verbatim per source. One quote per source maximum. All other content paraphrased in original wording. (This is a strict copyright constraint and also a quality constraint — short verbatim hooks plus paraphrase reads better than long block quotations.)

6. **URL stability.** Prefer Perseus, archive.org, Project Gutenberg, Wikisource, Stanford Encyclopedia of Philosophy, Liberty Fund's Online Library of Liberty, and university-hosted critical editions. Avoid Wikipedia URLs as primary references where a stable scholarly link exists.

7. **Output.** A single JSON-shaped JS object per entry, ready to drop into the artifact's `PRE_MODERN_LINEAGE` array. Plus a short prose note (~50 words) on any uncertainty, contested attribution, or framing concern.

---

## Synthesis goal

The completed lineage section in the artifact should:

- Sit between the chamber diagram and the modern-mechanism ledger.
- Use the same card schema as the modern ledger (with the additional `original`, `tradition`, `prefigures`, `passage`, and `honest_caveat` fields).
- Open with a short framing paragraph on the working thesis (modern public choice measured what classical and pre-modern thinkers had already diagnosed).
- Group entries by tradition (Greek, Latin, Medieval Islamic, Chinese, Indian, Renaissance Italian, French, British) rather than chronologically, to respect each lineage's internal coherence.
- Close with a "what the 20th century actually contributed" paragraph: not the *insight* but the *measurement* — Olson's data, Stigler's empirics, Goodhart watching his law happen at the Bank of England.

The lineage is not a victory lap for the ancients. It is a calibration check: the chamber's mechanisms are old, robust, and have resisted institutional reform across millennia and across civilizations. That is the diagnostic weight the synthesis depends on.

---

## File location

`/the-filter-chamber/research/pre-modern-lineage.md` — this file.
Output entries to: `/the-filter-chamber/research/lineage-entries/` — one `.md` or `.json` per thinker.

Once verified, integrate into the artifact at `/the-filter-chamber/src/data/pre-modern-lineage.js` as a default-exported array.
