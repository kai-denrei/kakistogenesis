export type CategoryKey =
  | "self-preservation"
  | "capture"
  | "agency"
  | "knowledge"
  | "drift"
  | "exploitation";

export type Mechanism = {
  id: string;
  name: string;
  year: string;
  originator: string;
  field: string;
  category: CategoryKey;
  brief: string;
  claim: string;
  source: string;
  url: string;
};

export const CATEGORIES: Record<
  CategoryKey,
  { label: string; color: string; desc: string }
> = {
  "self-preservation": {
    label: "Self-Preservation",
    color: "#d4a463",
    desc: "The institution acquires interests of its own.",
  },
  capture: {
    label: "Capture & Rent",
    color: "#c08560",
    desc: "The regulated buy the regulator.",
  },
  agency: {
    label: "Agency Problems",
    color: "#b89770",
    desc: "Decision-makers and bearers of consequence diverge.",
  },
  knowledge: {
    label: "Knowledge & Measurement",
    color: "#7aada0",
    desc: "Local information and target metrics fail at scale.",
  },
  drift: {
    label: "Bureaucratic Drift",
    color: "#9c9387",
    desc: "Process expands; substance recedes.",
  },
  exploitation: {
    label: "Asymmetric Exploitation",
    color: "#b04a4a",
    desc: "A small minority weaponizes the rest.",
  },
};

export const CATEGORY_ORDER: CategoryKey[] = [
  "self-preservation",
  "capture",
  "agency",
  "knowledge",
  "drift",
  "exploitation",
];

export const MECHANISMS: Mechanism[] = [
  /* self-preservation */
  {
    id: "oligarchy",
    name: "Iron Law of Oligarchy",
    year: "1911",
    originator: "Robert Michels",
    field: "Political sociology",
    category: "self-preservation",
    brief:
      "All organizations drift toward minority rule, regardless of founding intent.",
    claim:
      "Every organization, however democratic its founding intent, drifts toward rule by an entrenched minority. The classic formulation: who says organization, says oligarchy.",
    source:
      "Zur Soziologie des Parteiwesens in der modernen Demokratie (1911); Eng. tr. Political Parties (1915).",
    url: "https://en.wikipedia.org/wiki/Iron_law_of_oligarchy",
  },
  {
    id: "pournelle",
    name: "Iron Law of Bureaucracy",
    year: "c. 1980",
    originator: "Jerry Pournelle",
    field: "Organizational observation",
    category: "self-preservation",
    brief:
      "Two factions form in every institution; the one loyal to the institution always wins.",
    claim:
      "In every institution two factions form: those dedicated to the stated goal, and those dedicated to the institution itself. The latter come, in time, to dominate.",
    source:
      "Pournelle's columns and essays, popularized through Chaos Manor and later attributed broadly. A pragmatic reformulation of Michels.",
    url: "https://en.wikipedia.org/wiki/Jerry_Pournelle#Pournelle%27s_iron_law_of_bureaucracy",
  },
  {
    id: "niskanen",
    name: "Budget-Maximizing Bureaucrat",
    year: "1971",
    originator: "William Niskanen",
    field: "Public choice economics",
    category: "self-preservation",
    brief:
      "Without profit discipline, agencies optimize the only variable they have — budget.",
    claim:
      "Bureaucratic agencies, lacking the discipline of profit, instead optimize the variable they can: budget. Headcount, prestige, and remit grow as proxies for success.",
    source:
      "Niskanen, W. A. (1971). Bureaucracy and Representative Government. Aldine-Atherton.",
    url: "https://en.wikipedia.org/wiki/Budget-maximizing_model",
  },
  {
    id: "shirky",
    name: "Shirky Principle",
    year: "2010",
    originator: "Clay Shirky",
    field: "Networked organizations",
    category: "self-preservation",
    brief:
      "Institutions develop an interest in preserving the problem they exist to solve.",
    claim:
      "Institutions will try to preserve the problem to which they are the solution. Once a constituency forms around a problem, that constituency develops an interest in the problem persisting.",
    source:
      "Shirky, C. (2010). Coined in essays on networked institutions; popularized by Kevin Kelly (The Technium).",
    url: "https://kk.org/thetechnium/the-shirky-prin/",
  },
  {
    id: "conquest3",
    name: "Conquest's Third Law",
    year: "1986",
    originator: "Robert Conquest",
    field: "Political observation",
    category: "self-preservation",
    brief:
      "The simplest model of any bureaucracy is that it is run by a cabal of its enemies.",
    claim:
      "Conquest's sharpest formulation: the simplest way to explain the behavior of any bureaucratic organization is to assume it is controlled by a cabal of its enemies. A pithier sibling of Michels and Pournelle.",
    source:
      "Attributed to Robert Conquest in essays from the 1980s; see Amis (1991), Memoirs, and Derbyshire on Conquest. The first two laws (incl. the often-misattributed “O'Sullivan's Law”) circulate in various phrasings.",
    url: "https://en.wikipedia.org/wiki/Robert_Conquest#Conquest%27s_three_laws_of_politics",
  },

  /* capture */
  {
    id: "olson65",
    name: "Logic of Collective Action",
    year: "1965",
    originator: "Mancur Olson",
    field: "Political economy",
    category: "capture",
    brief:
      "Concentrated benefits beat diffuse costs. The few mobilize; the many free-ride.",
    claim:
      "Concentrated benefits and diffuse costs systematically favor small organized minorities over large unorganized majorities. The few mobilize; the many free-ride.",
    source:
      "Olson, M. (1965). The Logic of Collective Action: Public Goods and the Theory of Groups. Harvard University Press.",
    url: "https://en.wikipedia.org/wiki/The_Logic_of_Collective_Action",
  },
  {
    id: "stigler",
    name: "Regulatory Capture",
    year: "1971",
    originator: "George Stigler",
    field: "Industrial organization",
    category: "capture",
    brief: "Over time, the watchdog is fed by the watched.",
    claim:
      "As a rule, regulation is acquired by the industry and is designed and operated primarily for its benefit. The watchdog tends, over time, to be fed by the watched.",
    source:
      "Stigler, G. J. (1971). The Theory of Economic Regulation. Bell Journal of Economics and Management Science, 2(1), 3–21.",
    url: "https://en.wikipedia.org/wiki/Regulatory_capture",
  },
  {
    id: "tullock-rent",
    name: "Rent-Seeking",
    year: "1967",
    originator: "Gordon Tullock / Anne Krueger",
    field: "Public choice",
    category: "capture",
    brief:
      "Resources spent on capturing existing wealth instead of creating new wealth.",
    claim:
      "Resources spent on capturing existing wealth via the political process rather than producing new wealth. Society pays not only the transfer but the deadweight cost of the contest itself.",
    source:
      "Tullock, G. (1967). The Welfare Costs of Tariffs, Monopolies, and Theft. Western Economic Journal, 5(3), 224–232. Krueger, A. O. (1974). The Political Economy of the Rent-Seeking Society. AER, 64(3).",
    url: "https://en.wikipedia.org/wiki/Rent-seeking",
  },
  {
    id: "yandle",
    name: "Bootleggers and Baptists",
    year: "1983",
    originator: "Bruce Yandle",
    field: "Public choice",
    category: "capture",
    brief:
      "Durable rent-seeking pairs a moral cover with the financial beneficiary.",
    claim:
      "Durable rent-seeking coalitions pair a moral cover (the Baptists) with the financial beneficiaries (the bootleggers) of the same regulation. Each provides what the other cannot.",
    source:
      "Yandle, B. (1983). Bootleggers and Baptists: The Education of a Regulatory Economist. Regulation, 7(3), 12–16.",
    url: "https://www.cato.org/regulation/may-june-1983/bootleggers-baptists-education-regulatory-economist",
  },
  {
    id: "tullock-paradox",
    name: "Tullock's Paradox",
    year: "1972",
    originator: "Gordon Tullock",
    field: "Public choice",
    category: "capture",
    brief:
      "Lobbying spend is far smaller than the returns suggest. Most of the contest is hidden.",
    claim:
      "The puzzle: given the enormous returns to political favor, observed lobbying expenditure is implausibly small. Either we are mismeasuring (most of the contest is non-monetary — revolving doors, ideological alignment, soft favors), or political markets do not clear like normal markets. Either reading reinforces capture as a softer, harder-to-track phenomenon than it appears.",
    source:
      "Tullock, G. (1972). The Purchase of Politicians. Western Economic Journal. Empirical formulation: Ansolabehere, S., de Figueiredo, J. M., & Snyder, J. M. (2003). Why Is There So Little Money in U.S. Politics? Journal of Economic Perspectives, 17(1), 105–130.",
    url: "https://en.wikipedia.org/wiki/Tullock_paradox",
  },
  {
    id: "olson82",
    name: "Institutional Sclerosis",
    year: "1982",
    originator: "Mancur Olson",
    field: "Political economy",
    category: "capture",
    brief:
      "Stable societies accumulate distributional coalitions over time, ossifying.",
    claim:
      "Stable societies accumulate distributional coalitions — small organized groups capturing rents — and the cumulative drag of these coalitions slows growth and ossifies governance. Olson's explanation for why catastrophes (wars, revolutions) sometimes precede growth spurts: they reset the coalition layer.",
    source:
      "Olson, M. (1982). The Rise and Decline of Nations: Economic Growth, Stagflation, and Social Rigidities. Yale University Press.",
    url: "https://en.wikipedia.org/wiki/The_Rise_and_Decline_of_Nations",
  },

  /* agency */
  {
    id: "moral-hazard",
    name: "Moral Hazard",
    year: "1963",
    originator: "Kenneth Arrow",
    field: "Welfare economics",
    category: "agency",
    brief: "Insure someone against risk and they take more of it.",
    claim:
      "When one party is insured against risk, they take more of it than the social optimum. Insurance privatizes upside while socializing downside; behavior shifts accordingly.",
    source:
      "Arrow, K. J. (1963). Uncertainty and the Welfare Economics of Medical Care. American Economic Review, 53(5), 941–973. Holmström, B. (1979). Moral Hazard and Observability. Bell Journal of Economics, 10(1).",
    url: "https://en.wikipedia.org/wiki/Moral_hazard",
  },
  {
    id: "principal-agent",
    name: "Principal–Agent / Skin in the Game",
    year: "1976 / 2018",
    originator: "Jensen & Meckling; Taleb",
    field: "Agency theory",
    category: "agency",
    brief:
      "Decision-makers without consequence diverge predictably from those they serve.",
    claim:
      "Decision-makers insulated from the consequences of their decisions diverge predictably from the interests they are nominally serving. The agent's utility function is not the principal's.",
    source:
      "Jensen, M. C. & Meckling, W. H. (1976). Theory of the Firm: Managerial Behavior, Agency Costs and Ownership Structure. JFE, 3(4). Taleb, N. N. (2018). Skin in the Game.",
    url: "https://en.wikipedia.org/wiki/Principal%E2%80%93agent_problem",
  },
  {
    id: "peter",
    name: "Peter Principle",
    year: "1969",
    originator: "Peter & Hull",
    field: "Hierarchical promotion",
    category: "agency",
    brief: "People rise to their level of incompetence and then stop rising.",
    claim:
      "In a hierarchy, every employee tends to rise to their level of incompetence. Competence at level N earns promotion to N+1; incompetence at N+1 stops the elevator. Steady-state: most positions held by people just past the limit of their ability.",
    source:
      "Peter, L. J. & Hull, R. (1969). The Peter Principle: Why Things Always Go Wrong. William Morrow. Modern empirical work: Benson, A., Li, D., & Shue, K. (2019). Promotions and the Peter Principle. QJE, 134(4).",
    url: "https://en.wikipedia.org/wiki/Peter_principle",
  },

  /* knowledge */
  {
    id: "merton",
    name: "Unanticipated Consequences",
    year: "1936",
    originator: "Robert K. Merton",
    field: "Sociology",
    category: "knowledge",
    brief:
      "Purposive action systematically produces outcomes nobody intended.",
    claim:
      "Purposive action systematically generates outcomes its actors did not foresee and would not have chosen. The cobra effect, named for British India's bounty that was met by farming the snakes, is one species of this.",
    source:
      "Merton, R. K. (1936). The Unanticipated Consequences of Purposive Social Action. American Sociological Review, 1(6), 894–904.",
    url: "https://en.wikipedia.org/wiki/Unintended_consequences",
  },
  {
    id: "hayek",
    name: "Knowledge Problem",
    year: "1945",
    originator: "F. A. Hayek",
    field: "Economics of information",
    category: "knowledge",
    brief:
      "Local, tacit, dispersed knowledge cannot be aggregated by central planners.",
    claim:
      "The knowledge required for rational economic decisions is dispersed, tacit, and locally held. No central planner can aggregate it; prices and feedback loops compress it where directives cannot.",
    source:
      "Hayek, F. A. (1945). The Use of Knowledge in Society. American Economic Review, 35(4), 519–530.",
    url: "https://www.econlib.org/library/Essays/hykKnw.html",
  },
  {
    id: "goodhart",
    name: "Goodhart's Law",
    year: "1975",
    originator: "Charles Goodhart",
    field: "Monetary economics",
    category: "knowledge",
    brief: "When a measure becomes a target, it ceases to be a good measure.",
    claim:
      "When a measure becomes a target, it ceases to be a good measure. Strathern's 1997 sharpening is now standard. The metric is gamed; the underlying construct drifts free.",
    source:
      "Goodhart, C. A. E. (1975). Problems of Monetary Management: The U.K. Experience. Strathern, M. (1997). Improving Ratings: Audit in the British University System. European Review, 5(3).",
    url: "https://en.wikipedia.org/wiki/Goodhart%27s_law",
  },
  {
    id: "campbell",
    name: "Campbell's Law",
    year: "1979",
    originator: "Donald T. Campbell",
    field: "Social science methodology",
    category: "knowledge",
    brief: "Quantitative social indicators corrupt under decision-making pressure.",
    claim:
      "The more any quantitative social indicator is used for social decision-making, the more subject it will be to corruption pressures, and the more apt it will be to distort and corrupt the social processes it is intended to monitor. Campbell's 1979 formulation predates Goodhart's and is sharper about social policy specifically.",
    source:
      "Campbell, D. T. (1979). Assessing the Impact of Planned Social Change. Evaluation and Program Planning, 2(1), 67–90.",
    url: "https://en.wikipedia.org/wiki/Campbell%27s_law",
  },

  /* drift */
  {
    id: "parkinson",
    name: "Parkinson's Law",
    year: "1955",
    originator: "C. Northcote Parkinson",
    field: "Public administration",
    category: "drift",
    brief: "Work expands to fill the time available; staffing has its own inertia.",
    claim:
      "Work expands so as to fill the time available for its completion. Bureaucracies grow at a constant rate independent of workload; staffing has a life of its own.",
    source:
      "Parkinson, C. N. (1955). Parkinson's Law. The Economist, November 19. Expanded in book form 1957.",
    url: "https://en.wikipedia.org/wiki/Parkinson%27s_law",
  },
  {
    id: "bikeshed",
    name: "Law of Triviality (Bikeshedding)",
    year: "1957",
    originator: "C. Northcote Parkinson",
    field: "Committee dynamics",
    category: "drift",
    brief:
      "Trivial issues get disproportionate attention; complex ones are nodded through.",
    claim:
      "Committees give disproportionate weight to trivial issues. A nuclear plant is approved swiftly because nobody understands it; the bike shed is debated for hours because everyone has an opinion about paint.",
    source:
      "Parkinson, C. N. (1957). Parkinson's Law: The Pursuit of Progress. John Murray. Adopted into software culture via Poul-Henning Kamp (1999).",
    url: "https://en.wikipedia.org/wiki/Law_of_triviality",
  },
  {
    id: "trained-incapacity",
    name: "Trained Incapacity",
    year: "1899 / 1935",
    originator: "Veblen; Burke",
    field: "Sociology / rhetoric",
    category: "drift",
    brief: "Expertise in the existing system disqualifies you from seeing alternatives.",
    claim:
      "A state of affairs in which one's abilities function as blindnesses. Skill in the existing system constitutes, by the same gesture, an inability to see what the system precludes. The expert protects what made them expert.",
    source:
      "Veblen, T. (1899). The Theory of the Leisure Class — origin of the concept. Burke, K. (1935). Permanence and Change — explicit treatment as “trained incapacity.”",
    url: "https://en.wikipedia.org/wiki/Trained_incapacity",
  },

  /* exploitation */
  {
    id: "psychopathy",
    name: "The Asymmetric Exploiter",
    year: "2006 / 2011",
    originator: "Babiak & Hare; Boddy",
    field: "Industrial psychology",
    category: "exploitation",
    brief:
      "A small minority with elevated dark-triad traits weaponizes the rest of the chamber.",
    claim:
      "A small minority with elevated dark-triad traits is overrepresented in senior corporate and institutional roles — estimates run roughly 4–20% versus a ~1% population baseline. The mechanisms above are precisely what they exploit; their advantage scales with institutional dysfunction. (Caveat: prevalence estimates are debated, sample-dependent, and methodologically contested.)",
    source:
      "Babiak, P. & Hare, R. D. (2006). Snakes in Suits: When Psychopaths Go to Work. Boddy, C. R. (2011). Corporate Psychopaths: Organisational Destroyers. For methodological critique, see Landay, K., Harms, P. D., & Credé, M. (2019). Shall We Serve the Dark Lords? J. Applied Psych., 104(1).",
    url: "https://en.wikipedia.org/wiki/Corporate_psychopathy",
  },
];
