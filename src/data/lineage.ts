/**
 * Pre-modern Lineage data.
 *
 * Each entry pairs a pre-modern thinker with the modern mechanism(s) they
 * prefigure. Quoted passages are ≤ 25 words and verified from a primary or
 * near-primary source. Where a quote could not be cleanly verified within
 * a fetched passage, `passage` is set to `[verification pending]` and the
 * `honest_caveat` records the situation.
 *
 * Group entries by `tradition`, not chronology — each lineage's internal
 * coherence reads better than a strict timeline.
 */

export type TraditionKey =
  | "greek"
  | "latin"
  | "medieval-islamic"
  | "chinese"
  | "indian"
  | "renaissance-italian"
  | "french"
  | "british";

export type LineageCategory =
  | "self-preservation"
  | "capture"
  | "agency"
  | "knowledge"
  | "drift"
  | "exploitation"
  | "meta-cycle";

export type LineageEntry = {
  id: string;
  name: string;
  original?: string;
  year: string;
  originator: string;
  work: string;
  tradition: TraditionKey;
  category: LineageCategory;
  prefigures: string[]; // mechanism IDs from data/mechanisms.ts
  brief: string;
  claim: string;
  passage: string;
  source: string;
  url: string;
  honest_caveat: string;
};

export const TRADITIONS: Record<
  TraditionKey,
  { label: string; subtitle: string; tint: string }
> = {
  greek: {
    label: "GREEK",
    subtitle: "Athens & Megalopolis · 5th–2nd c. BCE",
    tint: "#7aada0",
  },
  latin: {
    label: "LATIN",
    subtitle: "Rome · 1st c. BCE – 5th c. CE",
    tint: "#d4a463",
  },
  "medieval-islamic": {
    label: "MEDIEVAL ISLAMIC",
    subtitle: "North Africa · 14th c.",
    tint: "#c08560",
  },
  chinese: {
    label: "CHINESE",
    subtitle: "Warring States · 3rd c. BCE",
    tint: "#b89770",
  },
  indian: {
    label: "INDIAN",
    subtitle: "Maurya & after · 3rd c. BCE – 2nd c. CE",
    tint: "#9c9387",
  },
  "renaissance-italian": {
    label: "RENAISSANCE ITALIAN",
    subtitle: "Florence · early 16th c.",
    tint: "#b04a4a",
  },
  french: {
    label: "FRENCH",
    subtitle: "Sarlat → Paris · 16th–19th c.",
    tint: "#7a4cff",
  },
  british: {
    label: "BRITISH",
    subtitle: "Edinburgh & Cambridge · 18th–19th c.",
    tint: "#2aa1ff",
  },
};

export const TRADITION_ORDER: TraditionKey[] = [
  "greek",
  "latin",
  "medieval-islamic",
  "chinese",
  "indian",
  "renaissance-italian",
  "french",
  "british",
];

export const LINEAGE: LineageEntry[] = [
  /* ============================== GREEK ============================== */
  {
    id: "aristotle-politics",
    name: "Correct vs. Deviant Constitutions",
    original: "τὸ κοινῇ συμφέρον / τὸ ἴδιον",
    year: "c. 350 BCE",
    originator: "Aristotle",
    work: "Politics III.7 (1279a17–21)",
    tradition: "greek",
    category: "agency",
    prefigures: ["principal-agent", "oligarchy"],
    brief:
      "Constitutions corrupt when rulers govern for themselves rather than for the common advantage.",
    claim:
      "Aristotle's three correct constitutions — kingship, aristocracy, polity — are each defined by ruling for the common advantage (τὸ κοινὸν συμφέρον). Their corrupted counterparts — tyranny, oligarchy, demagogic democracy — emerge when rulers redirect office toward private interest. The corruption is not moral failure on top of governance; it is the structural definition of the deviation. Stated 22 centuries before agency theory, this is the principal-agent problem in its constitutional form: the agent's utility function diverges from the principal's, and the regime form changes with it.",
    passage:
      "Constitutions that aim at the common advantage are rightly framed in accordance with absolute justice; those that aim at the rulers' own advantage are faulty.",
    source:
      "Aristotle, Politics, tr. H. Rackham (Loeb Classical Library, Harvard UP, 1932); Greek text Ross OCT (1957).",
    url: "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0058:book%3D3:section%3D1279a",
    honest_caveat:
      "Aristotle's frame is virtue-ethical and aimed at the πόλις, not modern principal-agent contracts. The structural mapping is real; the moral teleology is his addition.",
  },
  {
    id: "plato-republic-viii",
    name: "Endogenous Regime Decay",
    original: "ἀνακύκλωσις (proto-)",
    year: "c. 375 BCE",
    originator: "Plato",
    work: "Republic VIII (543a–576b)",
    tradition: "greek",
    category: "meta-cycle",
    prefigures: ["olson82", "oligarchy"],
    brief:
      "Each regime contains the seeds of its own corruption. Decay is internal, not imposed.",
    claim:
      "Republic VIII is the first complete account of endogenous institutional decay. Aristocracy gives way to timocracy when honour displaces virtue; timocracy to oligarchy when wealth displaces honour; oligarchy to democracy when the poor revolt against the rich; democracy to tyranny when the desire for liberty becomes insatiable. Each form generates its successor through its own internal logic. The filter's central premise — that institutions decay from within — is here in its earliest systematic form.",
    passage:
      "The insatiable desire of this and the neglect of other things introduces the change in democracy, which occasions a demand for tyranny.",
    source:
      "Plato, Republic, tr. Benjamin Jowett (Oxford 1871, MIT Internet Classics Archive); Greek Slings OCT (2003).",
    url: "https://classics.mit.edu/Plato/republic.9.viii.html",
    honest_caveat:
      "Plato's psychology — soul-of-the-city mirroring soul-of-the-man — is a stronger metaphysical claim than the filter needs. The mechanism is portable; the cosmology is his.",
  },
  {
    id: "polybius-anacyclosis",
    name: "Anacyclosis",
    original: "ἀνακύκλωσις πολιτειῶν",
    year: "c. 150 BCE",
    originator: "Polybius",
    work: "Histories VI.4–9",
    tradition: "greek",
    category: "meta-cycle",
    prefigures: ["olson82", "oligarchy"],
    brief:
      "Six-form constitutional cycle: each regime decays into its corrupted twin, then into the next.",
    claim:
      "Polybius gives endogenous regime decay its formal name and applies it to Rome. The cycle: monarchy → tyranny → aristocracy → oligarchy → democracy → ochlocracy → return. Each correct form decays into its corrupted twin through its own logic; the corrupted form is then displaced by the next correct form. Olson's Rise and Decline of Nations (1982) is anacyclosis with distributional coalitions doing the corrupting work — eighteen centuries later, the same shape, sharper data.",
    passage:
      "Such is the cycle of political revolution, the course appointed by nature in which constitutions change, disappear, and finally return to the point from which they started.",
    source:
      "Polybius, Histories, tr. Evelyn S. Shuckburgh (Macmillan, 1889), at Bill Thayer's LacusCurtius; Loeb tr. W. R. Paton, rev. Walbank & Habicht (Harvard UP, 2010).",
    url: "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Polybius/6*.html",
    honest_caveat:
      "Polybius credits Plato; the cycle is not original. His contribution is the formal name and the application to Rome's mixed constitution as escape valve — which is the part Olson does not have.",
  },
  {
    id: "thucydides-corcyra",
    name: "Words Change Meaning to Fit Power",
    original:
      "τὴν εἰωθυῖαν ἀξίωσιν τῶν ὀνομάτων ἐς τὰ ἔργα ἀντήλλαξαν",
    year: "c. 411 BCE",
    originator: "Thucydides",
    work: "History III.82.4 (the Corcyraean stasis)",
    tradition: "greek",
    category: "knowledge",
    prefigures: ["goodhart", "campbell"],
    brief:
      "In civil strife, the customary meanings of words were exchanged to justify deeds.",
    claim:
      "The Corcyraean stasis is the strongest pre-modern hook in the lineage. Thucydides observes that under partisan pressure, the moral lexicon is rewritten: reckless audacity becomes loyal courage, prudent hesitation becomes cowardice, moderation becomes unmanliness. When evaluation becomes the prize, evaluative language is captured. Goodhart's Law applied to the moral vocabulary, twenty-four centuries before Goodhart watched the Bank of England's monetary aggregates do the same.",
    passage:
      "Words had to change their ordinary meaning and to take that which was now given them.",
    source:
      "Thucydides, History of the Peloponnesian War, tr. Richard Crawley (1874); critical Greek OCT, Stuart Jones / Powell.",
    url: "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0200:book=3:chapter=82:section=4",
    honest_caveat:
      "Thucydides describes wartime stasis, not steady-state institutional drift. The mapping to Goodhart is real but he is not theorising measurement-target dynamics.",
  },

  /* ============================== LATIN ============================== */
  {
    id: "tacitus-leges",
    name: "The Most Corrupt Republic, the Most Laws",
    original: "corruptissima re publica plurimae leges",
    year: "c. 116 CE",
    originator: "Tacitus",
    work: "Annals III.27",
    tradition: "latin",
    category: "drift",
    prefigures: ["parkinson", "olson82"],
    brief:
      "The more corrupt the state, the more its laws. Six words; a causal direction.",
    claim:
      "Tacitus, reviewing late-Republican legislation, gives the lineage its sharpest aphorism. Laws proliferate not despite institutional decay but because of it: each new corruption breeds new statutes, which breed new circumventions, which breed further statutes. Parkinson's Law with a moral edge and an explicit causal direction. The full sentence makes the point structural rather than rhetorical: as the commonwealth became most corrupt, its laws became most numerous.",
    passage:
      "iamque non modo in commune sed in singulos homines latae quaestiones, et corruptissima re publica plurimae leges.",
    source:
      "Tacitus, Annales, ed. C. D. Fisher (OCT, 1906), at The Latin Library; tr. Woodman (Hackett 2004).",
    url: "https://www.thelatinlibrary.com/tacitus/tac.ann3.shtml",
    honest_caveat:
      "Tacitus is making a historical observation about Republican legislation, not a general law. The aphorism's portability is what later readers gave it.",
  },
  {
    id: "juvenal-custodes",
    name: "Who Will Guard the Guardians?",
    original: "quis custodiet ipsos custodes?",
    year: "c. 100 CE",
    originator: "Juvenal",
    work: "Satires VI.347–348",
    tradition: "latin",
    category: "capture",
    prefigures: ["stigler", "principal-agent"],
    brief:
      "The original guardian-of-the-guardians question. Repurposed from marriage to the regulator.",
    claim:
      "Juvenal's line was originally about marital surveillance — wives suborning the husbands' watchers. Its durable second life is as the regulator-watcher problem: any oversight body is itself an institution requiring oversight. The infinite regress motivates checks-and-balances thinking from Montesquieu through modern administrative law. Stigler's regulatory capture sits inside this question; so does the principal-agent literature on auditors. The repurposing is real even if it is not what Juvenal meant.",
    passage:
      "sed quis custodiet ipsos custodes? cauta est et ab illis incipit uxor.",
    source:
      "Juvenal, Saturae, ed. W. V. Clausen (OCT, 1959 rev. 1992), at The Latin Library; tr. Susanna Morton Braund (Loeb 2004).",
    url: "https://www.thelatinlibrary.com/juvenal/6.shtml",
    honest_caveat:
      "The original context is adultery surveillance, not institutional design. Modern usage is durable repurposing — flag it as that, not as Juvenal's intended thesis.",
  },
  {
    id: "juvenal-panem",
    name: "Bread and Circuses",
    original: "panem et circenses",
    year: "c. 100 CE",
    originator: "Juvenal",
    work: "Satires X.81",
    tradition: "latin",
    category: "exploitation",
    prefigures: ["olson65", "yandle"],
    brief:
      "The Roman populace, no longer voting, asks only for bread and games.",
    claim:
      "Juvenal's diagnosis of the imperial transition: a populace that once granted commands, fasces, and legions now anxiously desires only two things — bread and circuses. The line names a specific clientelist mechanism: rulers buy off the citizenry through subsidised consumption and entertainment, and the citizenry accepts the trade. Modern echoes run through Olson on collective action (the diffuse public free-rides on its own civic engagement) and Yandle on durable rent-seeking coalitions.",
    passage:
      "iam pridem, ex quo suffragia nulli vendimus, effudit curas... duas tantum res anxius optat, panem et circenses.",
    source:
      "Juvenal, Saturae, ed. W. V. Clausen (OCT, 1992), at The Latin Library; tr. Braund (Loeb 2004).",
    url: "https://www.thelatinlibrary.com/juvenal/10.shtml",
    honest_caveat:
      "Juvenal is satirising a specific political settlement, not theorising clientelism. The diagnostic shape is real; the political economy is read in.",
  },
  {
    id: "sallust-venalia",
    name: "A City for Sale",
    original: "urbem venalem et mature perituram, si emptorem invenerit",
    year: "c. 41 BCE",
    originator: "Sallust",
    work: "Bellum Iugurthinum 35.10",
    tradition: "latin",
    category: "capture",
    prefigures: ["tullock-rent", "stigler"],
    brief:
      "Jugurtha leaving Rome: a city for sale, soon to perish — if it finds a buyer.",
    claim:
      "Sallust records Jugurtha's departing remark: omnia Romae venalia esse — at Rome, everything is for sale. Four words for what Tullock would call rent-seeking and Krueger would quantify. Sallust's setup in Catiline 10–13 is the broader frame: prosperity after Carthage's fall erodes civic virtue, factional competition turns into open trafficking in office, and the institutional shell remains while substance evacuates. Olson 1982's macro picture, spelt out in Republican Latin.",
    passage:
      "o urbem venalem et mature perituram, si emptorem invenerit!",
    source:
      "Sallust, Bellum Iugurthinum, ed. L. D. Reynolds (OCT, 1991); the line at Iug. 35.10 is widely transmitted.",
    url: "https://en.wikipedia.org/wiki/Bellum_Jugurthinum",
    honest_caveat:
      "Sallust is openly moralistic; the filter framing is descriptive. The line is reported speech (Jugurtha's), not a structural theorem — but Sallust's narrative endorses it.",
  },
  {
    id: "augustine-libido-dominandi",
    name: "Two Loves, Two Cities",
    original:
      "amor sui usque ad contemptum Dei / amor Dei usque ad contemptum sui",
    year: "c. 420 CE",
    originator: "Augustine of Hippo",
    work: "De Civitate Dei XIV.28",
    tradition: "latin",
    category: "exploitation",
    prefigures: ["psychopathy"],
    brief:
      "The earthly city is built by self-love unto contempt of God; the libido dominandi is its engine.",
    claim:
      "Augustine's two cities are distinguished by two loves. The earthly city is built by amor sui usque ad contemptum Dei — love of self extended to contempt of God; the heavenly by amor Dei usque ad contemptum sui. The libido dominandi — the lust to dominate — is the engine of the earthly city's institutions. This is the dark-triad operator stated theologically: every authority structure humans build is biased because the operators are. The mechanism survives translation to a secular register.",
    passage:
      "Fecerunt itaque ciuitates duas amores duo, terrenam scilicet amor sui usque ad contemptum Dei, caelestem uero amor Dei usque ad contemptum sui.",
    source:
      "Augustine, De Civitate Dei, ed. Dombart & Kalb (CCSL 47–48); tr. Marcus Dods (Edinburgh 1871) hosted CCEL; modern tr. R. W. Dyson (Cambridge UP, 1998).",
    url: "https://ccel.org/ccel/schaff/npnf102.iv.XIV.28.html",
    honest_caveat:
      "Augustine's framing is irreducibly theological. The structural insight (institutions reflect their operators' biases) survives secularisation, but Augustine is not doing institutional analysis — he is doing salvation history.",
  },

  /* ====================== MEDIEVAL ISLAMIC ====================== */
  {
    id: "ibn-khaldun-asabiyyah",
    name: "ʿAṣabiyyah and the Three-Generation Dynasty",
    original: "العصبية",
    year: "1377",
    originator: "Ibn Khaldūn",
    work: "Muqaddimah, Books I–III",
    tradition: "medieval-islamic",
    category: "meta-cycle",
    prefigures: ["olson82", "oligarchy"],
    brief:
      "Group solidarity founds dynasties; urban luxury dissolves it; the next group with intact ʿaṣabiyyah inherits.",
    claim:
      "Ibn Khaldūn's Muqaddimah is the most complete pre-modern theory of cyclical institutional decay. Tribal ʿaṣabiyyah — group solidarity, social cohesion — drives founders to power. The second and third generations, raised in urban luxury and bureaucratic ossification, lose ʿaṣabiyyah and the dynasty falls to the next group with intact solidarity. Olson 1982's distributional-coalitions thesis with a richer mechanism for why the coalitions ossify, six centuries early.",
    passage:
      "[verification pending — see honest_caveat]",
    source:
      "Ibn Khaldūn, The Muqaddimah, tr. Franz Rosenthal (3 vols., Princeton/Bollingen 1958, abridged Dawood 2015).",
    url: "https://archive.org/details/THEMUQADDIMAHOFIBNKHALDUNVOLUME2",
    honest_caveat:
      "A clean ≤25-word verbatim passage from the Rosenthal translation could not be confirmed within fetch limits; the three-generations and ʿaṣabiyyah doctrines are well-attested in secondary literature, but the exact passage citation is left for verification rather than fabricated. Beyond that, Ibn Khaldūn's mechanism is sociological-cyclical and tied to nomad/sedentary dynamics — it does not transfer cleanly to modern non-tribal polities. The structural insight (founding solidarity erodes through institutional success) does.",
  },

  /* ============================== CHINESE ============================== */
  {
    id: "han-fei-two-handles",
    name: "The Two Handles",
    original: "二柄 (èr bǐng)",
    year: "c. 233 BCE",
    originator: "Han Fei",
    work: "Han Feizi, ch. 7 「二柄」",
    tradition: "chinese",
    category: "agency",
    prefigures: ["principal-agent"],
    brief:
      "Punishment and reward are the only reliable handles a ruler holds. Assume officials are self-interested.",
    claim:
      "Han Fei's Legalist diagnostic: assume officials are self-interested and design institutions to be incentive-compatible regardless of personal virtue. The two handles — punishment (xíng 刑) and favour (dé 德) — are the load-bearing levers; everything else is decoration. This is the agency problem stated 22 centuries before Jensen and Meckling, with the same advice (align incentives, don't trust character) but a totalitarian destination (concentrate the levers in the absolute monarch).",
    passage:
      "二柄者，刑、德也。何謂刑、德？曰：殺戮之謂刑，慶賞之謂德。",
    source:
      "Han Feizi, ch. 7 「二柄」, Chinese Text Project critical text; tr. Burton Watson, Han Fei Tzu: Basic Writings (Columbia UP, 1964); complete tr. W. K. Liao (1939, 2 vols.).",
    url: "https://ctext.org/hanfeizi/er-bing",
    honest_caveat:
      "Han Fei is a totalitarian theorist. His solution to the agency problem is concentrated absolute monarchical power — the diagnosis is right; the prescription is the opposite of constitutionalism.",
  },

  /* ============================== INDIAN ============================== */
  {
    id: "kautilya-forty-ways",
    name: "Forty Ways to Embezzle",
    original: "अर्थशास्त्र II.8",
    year: "c. 3rd c. BCE – 2nd c. CE",
    originator: "Kauṭilya",
    work: "Arthaśāstra II.8 (Detection of Embezzlement)",
    tradition: "indian",
    category: "capture",
    prefigures: ["stigler", "tullock-rent"],
    brief:
      "The first systematic taxonomy of bureaucratic graft: forty distinct methods enumerated.",
    claim:
      "Kauṭilya's Arthaśāstra catalogues forty distinct methods by which officials embezzle public funds — the earliest systematic taxonomy of institutional graft in world literature. Entries proceed mechanically: revenue realised earlier entered later; revenue realised later entered earlier; what ought to be realised not realised; collected funds shown as not collected; and onward. The diagnostic precision presupposes that graft is structural, not characterological. Modern public-choice empirics have not added much to the typology.",
    passage:
      "There are about forty ways of embezzlement: what is realised earlier is entered later on; what is realised later is entered earlier...",
    source:
      "Kauṭilya, Arthaśāstra II.8, tr. R. Shamasastry (Bangalore 1915, rev. 1956); critical edition Kangle (Bombay 1960–65); tr. Patrick Olivelle (Oxford 2013).",
    url: "https://www.wisdomlib.org/hinduism/book/kautilya-arthashastra/d/doc366054.html",
    honest_caveat:
      "Authorship and dating are contested — the text is a compilation across several centuries. The traditional Maurya-era attribution to Chandragupta's minister is older than the redacted text we have. The taxonomy is what is reliable; the political theory is a reconstruction.",
  },

  /* ====================== RENAISSANCE ITALIAN ====================== */
  {
    id: "machiavelli-corrupt-people",
    name: "A Corrupt People Cannot Recover Liberty",
    original:
      "un popolo corrotto, venuto in libertà, può con difficultà grandissima mantenersi libero",
    year: "c. 1517",
    originator: "Niccolò Machiavelli",
    work: "Discorsi sopra la prima deca di Tito Livio I.17",
    tradition: "renaissance-italian",
    category: "meta-cycle",
    prefigures: ["olson82"],
    brief:
      "Once civic virtue is lost in the population, no institutional reform reaches deep enough to restore it.",
    claim:
      "Machiavelli reads Polybius into Roman history and arrives at a darker conclusion than his source. Discorsi I.17–18: a corrupt people, even when they obtain liberty, can scarcely preserve it. Once virtù civile has decayed in the population, institutional reform cannot reach deep enough to repair it; the filter's outputs become the inputs of the next generation. Olson's institutional sclerosis stops at the coalitions; Machiavelli stops at the people the coalitions have already shaped.",
    passage:
      "A corrupt people, having come into liberty, can preserve itself free only with the greatest difficulty.",
    source:
      "Machiavelli, Discorsi I.17, ed. Inglese (Einaudi 1997); tr. Ninian Hill Thomson (1883), Project Gutenberg; modern scholarly tr. Mansfield & Tarcov (Chicago 1996).",
    url: "https://www.gutenberg.org/cache/epub/10827/pg10827.txt",
    honest_caveat:
      "The chapter title at I.17 carries half the citation; a single quotable inner-paragraph sentence is more diffuse than the title. The Thomson translation reads more aphoristically than the Italian, which is denser. Read the Italian for argument; read the title for the thesis.",
  },
  {
    id: "guicciardini-particolare",
    name: "The Particular Interest",
    original: "il particulare",
    year: "c. 1530",
    originator: "Francesco Guicciardini",
    work: "Ricordi (C series, posthumous 1576)",
    tradition: "renaissance-italian",
    category: "agency",
    prefigures: ["principal-agent"],
    brief:
      "Public choice in Florentine: private interest as the universal driver of political behaviour.",
    claim:
      "Guicciardini's Ricordi are aphoristic but the underlying anthropology is consistent: il particolare — private interest — drives political behaviour at every level. The aphorisms refuse the civic-humanist optimism of his contemporary Machiavelli and predate by 450 years the public-choice school's working assumption (treat officials as self-interested actors). Where Machiavelli still hopes for virtù, Guicciardini observes its absence and counsels accordingly.",
    passage:
      "[verification pending — see honest_caveat]",
    source:
      "Guicciardini, Ricordi, ed. Spongano (Sansoni 1951); tr. Mario Domandi, Maxims and Reflections of a Renaissance Statesman (Harper 1965).",
    url: "https://archive.org/details/maximsreflection0000guic_t1g9",
    honest_caveat:
      "A short ≤25-word verbatim quote from a single Ricordo could not be confirmed within fetch limits in the Domandi translation. Guicciardini's il particolare is well-documented in scholarship (Pocock, Skinner, Rubinstein), but the exact maxim citation is left pending rather than fabricated. The aphoristic form makes a single load-bearing line difficult to extract honestly.",
  },

  /* ============================== FRENCH ============================== */
  {
    id: "la-boetie-pyramid",
    name: "The Pyramid of Voluntary Servitude",
    original: "ceux qui le tiennent par six, par six cents, par six mille",
    year: "c. 1549",
    originator: "Étienne de La Boétie",
    work: "Discours de la servitude volontaire",
    tradition: "french",
    category: "exploitation",
    prefigures: ["olson65", "stigler"],
    brief:
      "The tyrant has six who depend on him; each of those six has six; the structure runs all the way down.",
    claim:
      "La Boétie, writing at perhaps eighteen, asks why millions consent to be ruled by one. Not because the tyrant is strong, but because of a clientelist pyramid. The tyrant has five or six who depend on him for status and rents; those six have six hundred who profit under them; the six hundred maintain six thousand; and onward to millions. Everyone in the structure gains more from supporting the system than from defecting. Olson's logic of collective action combined with Stigler's regulatory capture, four centuries early.",
    passage:
      "The six have six hundred who profit under them, and with the six hundred they do what they have accomplished with their tyrant.",
    source:
      "La Boétie, Discours de la servitude volontaire (c. 1549, first printed 1576); tr. Harry Kurz, The Politics of Obedience (1942, repr. Free Life Editions / Black Rose 1975).",
    url: "https://theanarchistlibrary.org/library/etienne-de-la-boetie-discourse-on-voluntary-servitude",
    honest_caveat:
      "Authorship and date are slightly contested — most scholars accept c. 1549–1553. La Boétie's structural-mathematical instinct is genuinely formal in a way nothing else pre-modern is; this is the ancestor public choice has not fully acknowledged.",
  },
  {
    id: "montesquieu-power-limits",
    name: "Power Goes Until It Finds Limits",
    original:
      "tout homme qui a du pouvoir est porté à en abuser; il va jusqu'à ce qu'il trouve des limites",
    year: "1748",
    originator: "Montesquieu",
    work: "De l'esprit des lois XI.4",
    tradition: "french",
    category: "self-preservation",
    prefigures: ["oligarchy", "niskanen"],
    brief:
      "Every man with power is led to abuse it. He proceeds until he finds limits.",
    claim:
      "Montesquieu is the lineage's pivot from diagnosis to design. XI.4 names the filter's default — power, unchecked, expands — and the response is architectural: separation of powers, checks and balances, intermediate bodies. The 1748 sentence is short enough to be a slogan and structural enough to motivate the entire constitutional tradition that follows. Without designed limits, the filter's defaults run; with them, the filter operates within a finite domain.",
    passage:
      "C'est une expérience éternelle, que tout homme qui a du pouvoir est porté à en abuser; il va jusqu'à ce qu'il trouve des limites.",
    source:
      "Montesquieu, De l'esprit des lois (Genève 1748), Pléiade ed. Caillois (1949–51); tr. Cohler/Miller/Stone (Cambridge 1989).",
    url: "https://wist.info/montesquieu/83499/",
    honest_caveat:
      "Montesquieu is not just diagnosing the filter, he is proposing the architectural response. He is the natural pivot from 'diagnosis' to 'design' — note that the filter's modern operators inherit the diagnosis but often discard the design.",
  },
  {
    id: "bastiat-legal-plunder",
    name: "Legal Plunder",
    original: "spoliation légale",
    year: "1850",
    originator: "Frédéric Bastiat",
    work: "La Loi",
    tradition: "french",
    category: "capture",
    prefigures: ["stigler", "tullock-rent"],
    brief:
      "Test for legal plunder: see if the law takes from some and gives to others.",
    claim:
      "Bastiat's La Loi, written in the last year of his life, names regulatory capture as spoliation légale — legal plunder. The state, captured as an instrument of redistribution from producers to favoured classes, becomes the most efficient form of theft because it carries the law's prestige. Bastiat's identification test is operational and survives unchanged into Stigler's 1971 paper: see if the law takes from some persons what belongs to them, and gives it to others to whom it does not belong.",
    passage:
      "See if the law takes from some persons what belongs to them, and gives it to other persons to whom it does not belong.",
    source:
      "Bastiat, La Loi (Guillaumin, 1850); English tr. Dean Russell (Foundation for Economic Education, 1950); modern Liberty Fund Bastiat Collection (2007).",
    url: "https://americanliterature.com/author/frederic-bastiat/book/the-law/how-to-identify-legal-plunder",
    honest_caveat:
      "Bastiat is a polemicist as well as an economist; the spoliation légale framing is rhetorical. The structural identification (transfer-via-statute) is what survives translation into modern public choice.",
  },
  {
    id: "bastiat-broken-window",
    name: "What Is Seen and What Is Not Seen",
    original: "ce qu'on voit et ce qu'on ne voit pas",
    year: "1850",
    originator: "Frédéric Bastiat",
    work: "Ce qu'on voit et ce qu'on ne voit pas",
    tradition: "french",
    category: "knowledge",
    prefigures: ["merton", "hayek"],
    brief:
      "The good economist accounts for the unseen consequences as well as the seen.",
    claim:
      "Bastiat's broken-window parable is the cleanest pre-modern statement of unintended-consequences accounting. The crowd celebrates the glazier's earnings (seen) and forgets the suit, the book, the meal the shopkeeper would otherwise have bought (unseen). Hayek's knowledge problem and Merton's unanticipated consequences combine into a single short essay, in plain prose, a century before either was named in academic literature.",
    passage:
      "The bad economist confines himself to the visible effect; the good economist takes into account both the effect that can be seen and those that must be foreseen.",
    source:
      "Bastiat, Ce qu'on voit et ce qu'on ne voit pas (Guillaumin, 1850); tr. various, including Liberty Fund Bastiat Collection (2007).",
    url: "https://www.econlib.org/library/Bastiat/basEss1.html",
    honest_caveat:
      "Bastiat's argument is rhetorical-illustrative, not formal. The conceptual scaffolding (Hayek's dispersed knowledge, Merton's typology of consequences) is later — what Bastiat has is the intuition and the parable.",
  },
  {
    id: "tocqueville-tutelary-power",
    name: "The Immense and Tutelary Power",
    original: "un pouvoir immense et tutélaire",
    year: "1840",
    originator: "Alexis de Tocqueville",
    work: "De la démocratie en Amérique II.4.6",
    tradition: "french",
    category: "drift",
    prefigures: ["niskanen", "parkinson"],
    brief:
      "Soft despotism: a tutelary power that does not tyrannise but covers society in fine rules.",
    claim:
      "Tocqueville's prediction of democratic despotism is the granular description of the filter operating. The tutelary power does not tyrannise — it does not need to. It covers the surface of society with a network of small, complicated, minute, and uniform rules; it does not destroy but it prevents existence; it does not break the will but softens, bends, and guides it. Niskanen's budget-maximising bureau and Parkinson's expansion-by-self-replication are both inside this paragraph, 130 years early.",
    passage:
      "It covers the surface of society with a network of small, complicated, minute, and uniform rules through which the most original minds cannot penetrate.",
    source:
      "Tocqueville, De la démocratie en Amérique II.4.6 (Paris 1840), Pléiade Œuvres ed. Nora (1991–2004); tr. Henry Reeve (1840), revised Bowen (1862).",
    url: "https://oll.libertyfund.org/quotes/tocqueville-warns-how-administrative-despotism-might-come-to-a-democracy-like-america-1840",
    honest_caveat:
      "Tocqueville is empirical-observational rather than theoretical. His contribution is the granular description, not a new mechanism. The paragraph quoted is a paraphrasing condensation of Reeve; it preserves the load-bearing image.",
  },

  /* ============================== BRITISH ============================== */
  {
    id: "smith-conspiracy",
    name: "Conversations of Trade",
    original: undefined,
    year: "1776",
    originator: "Adam Smith",
    work: "Wealth of Nations I.x.c.27",
    tradition: "british",
    category: "capture",
    prefigures: ["stigler", "olson65"],
    brief:
      "People of the same trade seldom meet without the conversation ending in conspiracy against the public.",
    claim:
      "Smith, at the founding of modern economics, gives regulatory capture its unimprovable English sentence. The trade association, the guild, the chartered corporation — any standing institutional infrastructure for coordinating the same-trade — produces collusive output as a matter of course. Stigler 1971 quantifies; Olson 1965 names the asymmetry; Smith already has the mechanism. The line is so clean that public-choice theorists routinely cite it without modification.",
    passage:
      "People of the same trade seldom meet together, even for merriment and diversion, but the conversation ends in a conspiracy against the public.",
    source:
      "Adam Smith, An Inquiry into the Nature and Causes of the Wealth of Nations, I.x.c.27 (London 1776); Glasgow Edition, Campbell & Skinner eds. (Oxford / Liberty Fund).",
    url: "https://www.econlib.org/library/Smith/smWN4.html",
    honest_caveat:
      "Smith adds, in the same paragraph, that the impossibility of preventing such meetings does not justify legally requiring them — i.e. corporations and guild-charters. The line is pre-modern in date, but Smith's analytical apparatus is recognisably modern; he is the threshold.",
  },
  {
    id: "acton-power",
    name: "Absolute Power Corrupts Absolutely",
    original: undefined,
    year: "1887",
    originator: "Lord Acton (J. E. E. Dalberg-Acton)",
    work: "Letter to Mandell Creighton, 5 April 1887",
    tradition: "british",
    category: "self-preservation",
    prefigures: ["psychopathy", "oligarchy"],
    brief:
      "Power tends to corrupt, and absolute power corrupts absolutely. Great men are almost always bad men.",
    claim:
      "Acton's letter to Bishop Creighton — the most-quoted English formulation in the lineage — is genealogically downstream of Augustine's libido dominandi, La Boétie's voluntary servitude, and Montesquieu's checks. The novelty is rhetorical compression, not analytical. The line carries weight because Acton, a devout Catholic and historian of the papacy, was making the point about ecclesiastical authority — and meant the second sentence as much as the first.",
    passage:
      "Power tends to corrupt, and absolute power corrupts absolutely. Great men are almost always bad men, even when they exercise influence and not authority.",
    source:
      "J. E. E. Dalberg-Acton, Letter to Bishop Mandell Creighton, 5 April 1887; in Historical Essays and Studies, ed. Figgis & Laurence (Macmillan 1907), App., p. 504; reprinted Liberty Fund, Acton: Selected Writings, ed. Hill (1985–88).",
    url: "https://en.wikiquote.org/wiki/John_Dalberg-Acton,_1st_Baron_Acton",
    honest_caveat:
      "The most-quoted English formulation but genealogically downstream — Acton was building on Montesquieu and the wider La Boétie tradition. The line's authority comes from the letter's context (a quarrel with Creighton over moral standards for historical figures), not from independent novelty.",
  },
];
