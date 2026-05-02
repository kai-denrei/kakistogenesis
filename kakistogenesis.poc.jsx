import { useState, useMemo, useEffect, useRef } from 'react';
import { ExternalLink } from 'lucide-react';

/* =============================================================================
   THE FILTER CHAMBER
   An interactive reference for the institutional mechanisms that convert
   mixed input intent into asymmetrically negative output.
   Reconstruction of a 2016 hand-sketch, with academic provenance attached.
   ============================================================================= */

const MECHANISMS = [
  /* ---------------------- self-preservation (5) ---------------------- */
  {
    id: 'oligarchy',
    name: 'Iron Law of Oligarchy',
    year: '1911',
    originator: 'Robert Michels',
    field: 'Political sociology',
    category: 'self-preservation',
    brief: 'All organizations drift toward minority rule, regardless of founding intent.',
    claim:
      'Every organization, however democratic its founding intent, drifts toward rule by an entrenched minority. The classic formulation: who says organization, says oligarchy.',
    source:
      'Zur Soziologie des Parteiwesens in der modernen Demokratie (1911); Eng. tr. Political Parties (1915).',
    url: 'https://en.wikipedia.org/wiki/Iron_law_of_oligarchy',
    x: 145, y: 295,
  },
  {
    id: 'pournelle',
    name: 'Iron Law of Bureaucracy',
    year: 'c. 1980',
    originator: 'Jerry Pournelle',
    field: 'Organizational observation',
    category: 'self-preservation',
    brief: 'Two factions form in every institution; the one loyal to the institution always wins.',
    claim:
      'In every institution two factions form: those dedicated to the stated goal, and those dedicated to the institution itself. The latter come, in time, to dominate.',
    source:
      'Pournelle’s columns and essays, popularized through Chaos Manor and later attributed broadly. A pragmatic reformulation of Michels.',
    url: 'https://en.wikipedia.org/wiki/Jerry_Pournelle#Pournelle%27s_iron_law_of_bureaucracy',
    x: 305, y: 330,
  },
  {
    id: 'niskanen',
    name: 'Budget-Maximizing Bureaucrat',
    year: '1971',
    originator: 'William Niskanen',
    field: 'Public choice economics',
    category: 'self-preservation',
    brief: 'Without profit discipline, agencies optimize the only variable they have — budget.',
    claim:
      'Bureaucratic agencies, lacking the discipline of profit, instead optimize the variable they can: budget. Headcount, prestige, and remit grow as proxies for success.',
    source:
      'Niskanen, W. A. (1971). Bureaucracy and Representative Government. Aldine-Atherton.',
    url: 'https://en.wikipedia.org/wiki/Budget-maximizing_model',
    x: 145, y: 390,
  },
  {
    id: 'shirky',
    name: 'Shirky Principle',
    year: '2010',
    originator: 'Clay Shirky',
    field: 'Networked organizations',
    category: 'self-preservation',
    brief: 'Institutions develop an interest in preserving the problem they exist to solve.',
    claim:
      'Institutions will try to preserve the problem to which they are the solution. Once a constituency forms around a problem, that constituency develops an interest in the problem persisting.',
    source:
      'Shirky, C. (2010). Coined in essays on networked institutions; popularized by Kevin Kelly (The Technium).',
    url: 'https://kk.org/thetechnium/the-shirky-prin/',
    x: 295, y: 425,
  },
  {
    id: 'conquest3',
    name: 'Conquest’s Third Law',
    year: '1986',
    originator: 'Robert Conquest',
    field: 'Political observation',
    category: 'self-preservation',
    brief: 'The simplest model of any bureaucracy is that it is run by a cabal of its enemies.',
    claim:
      'Conquest’s sharpest formulation: the simplest way to explain the behavior of any bureaucratic organization is to assume it is controlled by a cabal of its enemies. A pithier sibling of Michels and Pournelle.',
    source:
      'Attributed to Robert Conquest in essays from the 1980s; see Amis (1991), Memoirs, and Derbyshire on Conquest. The first two laws (incl. the often-misattributed “O’Sullivan’s Law”) circulate in various phrasings.',
    url: 'https://en.wikipedia.org/wiki/Robert_Conquest#Conquest%27s_three_laws_of_politics',
    x: 175, y: 480,
  },

  /* ---------------------- capture & rent (6) ---------------------- */
  {
    id: 'olson65',
    name: 'Logic of Collective Action',
    year: '1965',
    originator: 'Mancur Olson',
    field: 'Political economy',
    category: 'capture',
    brief: 'Concentrated benefits beat diffuse costs. The few mobilize; the many free-ride.',
    claim:
      'Concentrated benefits and diffuse costs systematically favor small organized minorities over large unorganized majorities. The few mobilize; the many free-ride.',
    source:
      'Olson, M. (1965). The Logic of Collective Action: Public Goods and the Theory of Groups. Harvard University Press.',
    url: 'https://en.wikipedia.org/wiki/The_Logic_of_Collective_Action',
    x: 410, y: 290,
  },
  {
    id: 'stigler',
    name: 'Regulatory Capture',
    year: '1971',
    originator: 'George Stigler',
    field: 'Industrial organization',
    category: 'capture',
    brief: 'Over time, the watchdog is fed by the watched.',
    claim:
      'As a rule, regulation is acquired by the industry and is designed and operated primarily for its benefit. The watchdog tends, over time, to be fed by the watched.',
    source:
      'Stigler, G. J. (1971). The Theory of Economic Regulation. Bell Journal of Economics and Management Science, 2(1), 3–21.',
    url: 'https://en.wikipedia.org/wiki/Regulatory_capture',
    x: 575, y: 295,
  },
  {
    id: 'tullock-rent',
    name: 'Rent-Seeking',
    year: '1967',
    originator: 'Gordon Tullock / Anne Krueger',
    field: 'Public choice',
    category: 'capture',
    brief: 'Resources spent on capturing existing wealth instead of creating new wealth.',
    claim:
      'Resources spent on capturing existing wealth via the political process rather than producing new wealth. Society pays not only the transfer but the deadweight cost of the contest itself.',
    source:
      'Tullock, G. (1967). The Welfare Costs of Tariffs, Monopolies, and Theft. Western Economic Journal, 5(3), 224–232. Krueger, A. O. (1974). The Political Economy of the Rent-Seeking Society. AER, 64(3).',
    url: 'https://en.wikipedia.org/wiki/Rent-seeking',
    x: 455, y: 350,
  },
  {
    id: 'yandle',
    name: 'Bootleggers and Baptists',
    year: '1983',
    originator: 'Bruce Yandle',
    field: 'Public choice',
    category: 'capture',
    brief: 'Durable rent-seeking pairs a moral cover with the financial beneficiary.',
    claim:
      'Durable rent-seeking coalitions pair a moral cover (the Baptists) with the financial beneficiaries (the bootleggers) of the same regulation. Each provides what the other cannot.',
    source:
      'Yandle, B. (1983). Bootleggers and Baptists: The Education of a Regulatory Economist. Regulation, 7(3), 12–16.',
    url: 'https://www.cato.org/regulation/may-june-1983/bootleggers-baptists-education-regulatory-economist',
    x: 600, y: 385,
  },
  {
    id: 'tullock-paradox',
    name: 'Tullock’s Paradox',
    year: '1972',
    originator: 'Gordon Tullock',
    field: 'Public choice',
    category: 'capture',
    brief: 'Lobbying spend is far smaller than the returns suggest. Most of the contest is hidden.',
    claim:
      'The puzzle: given the enormous returns to political favor, observed lobbying expenditure is implausibly small. Either we are mismeasuring (most of the contest is non-monetary — revolving doors, ideological alignment, soft favors), or political markets do not clear like normal markets. Either reading reinforces capture as a softer, harder-to-track phenomenon than it appears.',
    source:
      'Tullock, G. (1972). The Purchase of Politicians. Western Economic Journal. Empirical formulation: Ansolabehere, S., de Figueiredo, J. M., & Snyder, J. M. (2003). Why Is There So Little Money in U.S. Politics? Journal of Economic Perspectives, 17(1), 105–130.',
    url: 'https://en.wikipedia.org/wiki/Tullock_paradox',
    x: 545, y: 460,
  },
  {
    id: 'olson82',
    name: 'Institutional Sclerosis',
    year: '1982',
    originator: 'Mancur Olson',
    field: 'Political economy',
    category: 'capture',
    brief: 'Stable societies accumulate distributional coalitions over time, ossifying.',
    claim:
      'Stable societies accumulate distributional coalitions — small organized groups capturing rents — and the cumulative drag of these coalitions slows growth and ossifies governance. Olson’s explanation for why catastrophes (wars, revolutions) sometimes precede growth spurts: they reset the coalition layer.',
    source:
      'Olson, M. (1982). The Rise and Decline of Nations: Economic Growth, Stagflation, and Social Rigidities. Yale University Press.',
    url: 'https://en.wikipedia.org/wiki/The_Rise_and_Decline_of_Nations',
    x: 410, y: 415,
  },

  /* ---------------------- agency (3) ---------------------- */
  {
    id: 'moral-hazard',
    name: 'Moral Hazard',
    year: '1963',
    originator: 'Kenneth Arrow',
    field: 'Welfare economics',
    category: 'agency',
    brief: 'Insure someone against risk and they take more of it.',
    claim:
      'When one party is insured against risk, they take more of it than the social optimum. Insurance privatizes upside while socializing downside; behavior shifts accordingly.',
    source:
      'Arrow, K. J. (1963). Uncertainty and the Welfare Economics of Medical Care. American Economic Review, 53(5), 941–973. Holmström, B. (1979). Moral Hazard and Observability. Bell Journal of Economics, 10(1).',
    url: 'https://en.wikipedia.org/wiki/Moral_hazard',
    x: 720, y: 295,
  },
  {
    id: 'principal-agent',
    name: 'Principal–Agent / Skin in the Game',
    year: '1976 / 2018',
    originator: 'Jensen & Meckling; Taleb',
    field: 'Agency theory',
    category: 'agency',
    brief: 'Decision-makers without consequence diverge predictably from those they serve.',
    claim:
      'Decision-makers insulated from the consequences of their decisions diverge predictably from the interests they are nominally serving. The agent’s utility function is not the principal’s.',
    source:
      'Jensen, M. C. & Meckling, W. H. (1976). Theory of the Firm: Managerial Behavior, Agency Costs and Ownership Structure. JFE, 3(4). Taleb, N. N. (2018). Skin in the Game.',
    url: 'https://en.wikipedia.org/wiki/Principal%E2%80%93agent_problem',
    x: 800, y: 350,
  },
  {
    id: 'peter',
    name: 'Peter Principle',
    year: '1969',
    originator: 'Peter & Hull',
    field: 'Hierarchical promotion',
    category: 'agency',
    brief: 'People rise to their level of incompetence and then stop rising.',
    claim:
      'In a hierarchy, every employee tends to rise to their level of incompetence. Competence at level N earns promotion to N+1; incompetence at N+1 stops the elevator. Steady-state: most positions held by people just past the limit of their ability.',
    source:
      'Peter, L. J. & Hull, R. (1969). The Peter Principle: Why Things Always Go Wrong. William Morrow. Modern empirical work: Benson, A., Li, D., & Shue, K. (2019). Promotions and the Peter Principle. QJE, 134(4).',
    url: 'https://en.wikipedia.org/wiki/Peter_principle',
    x: 730, y: 425,
  },

  /* ---------------------- knowledge & measurement (4) ---------------------- */
  {
    id: 'merton',
    name: 'Unanticipated Consequences',
    year: '1936',
    originator: 'Robert K. Merton',
    field: 'Sociology',
    category: 'knowledge',
    brief: 'Purposive action systematically produces outcomes nobody intended.',
    claim:
      'Purposive action systematically generates outcomes its actors did not foresee and would not have chosen. The cobra effect, named for British India’s bounty that was met by farming the snakes, is one species of this.',
    source:
      'Merton, R. K. (1936). The Unanticipated Consequences of Purposive Social Action. American Sociological Review, 1(6), 894–904.',
    url: 'https://en.wikipedia.org/wiki/Unintended_consequences',
    x: 145, y: 580,
  },
  {
    id: 'hayek',
    name: 'Knowledge Problem',
    year: '1945',
    originator: 'F. A. Hayek',
    field: 'Economics of information',
    category: 'knowledge',
    brief: 'Local, tacit, dispersed knowledge cannot be aggregated by central planners.',
    claim:
      'The knowledge required for rational economic decisions is dispersed, tacit, and locally held. No central planner can aggregate it; prices and feedback loops compress it where directives cannot.',
    source:
      'Hayek, F. A. (1945). The Use of Knowledge in Society. American Economic Review, 35(4), 519–530.',
    url: 'https://www.econlib.org/library/Essays/hykKnw.html',
    x: 295, y: 620,
  },
  {
    id: 'goodhart',
    name: 'Goodhart’s Law',
    year: '1975',
    originator: 'Charles Goodhart',
    field: 'Monetary economics',
    category: 'knowledge',
    brief: 'When a measure becomes a target, it ceases to be a good measure.',
    claim:
      'When a measure becomes a target, it ceases to be a good measure. Strathern’s 1997 sharpening is now standard. The metric is gamed; the underlying construct drifts free.',
    source:
      'Goodhart, C. A. E. (1975). Problems of Monetary Management: The U.K. Experience. Strathern, M. (1997). Improving Ratings: Audit in the British University System. European Review, 5(3).',
    url: 'https://en.wikipedia.org/wiki/Goodhart%27s_law',
    x: 145, y: 685,
  },
  {
    id: 'campbell',
    name: 'Campbell’s Law',
    year: '1979',
    originator: 'Donald T. Campbell',
    field: 'Social science methodology',
    category: 'knowledge',
    brief: 'Quantitative social indicators corrupt under decision-making pressure.',
    claim:
      'The more any quantitative social indicator is used for social decision-making, the more subject it will be to corruption pressures, and the more apt it will be to distort and corrupt the social processes it is intended to monitor. Campbell’s 1979 formulation predates Goodhart’s and is sharper about social policy specifically.',
    source:
      'Campbell, D. T. (1979). Assessing the Impact of Planned Social Change. Evaluation and Program Planning, 2(1), 67–90.',
    url: 'https://en.wikipedia.org/wiki/Campbell%27s_law',
    x: 285, y: 730,
  },

  /* ---------------------- bureaucratic drift (3) ---------------------- */
  {
    id: 'parkinson',
    name: 'Parkinson’s Law',
    year: '1955',
    originator: 'C. Northcote Parkinson',
    field: 'Public administration',
    category: 'drift',
    brief: 'Work expands to fill the time available; staffing has its own inertia.',
    claim:
      'Work expands so as to fill the time available for its completion. Bureaucracies grow at a constant rate independent of workload; staffing has a life of its own.',
    source:
      'Parkinson, C. N. (1955). Parkinson’s Law. The Economist, November 19. Expanded in book form 1957.',
    url: 'https://en.wikipedia.org/wiki/Parkinson%27s_law',
    x: 460, y: 580,
  },
  {
    id: 'bikeshed',
    name: 'Law of Triviality (Bikeshedding)',
    year: '1957',
    originator: 'C. Northcote Parkinson',
    field: 'Committee dynamics',
    category: 'drift',
    brief: 'Trivial issues get disproportionate attention; complex ones are nodded through.',
    claim:
      'Committees give disproportionate weight to trivial issues. A nuclear plant is approved swiftly because nobody understands it; the bike shed is debated for hours because everyone has an opinion about paint.',
    source:
      'Parkinson, C. N. (1957). Parkinson’s Law: The Pursuit of Progress. John Murray. Adopted into software culture via Poul-Henning Kamp (1999).',
    url: 'https://en.wikipedia.org/wiki/Law_of_triviality',
    x: 580, y: 645,
  },
  {
    id: 'trained-incapacity',
    name: 'Trained Incapacity',
    year: '1899 / 1935',
    originator: 'Veblen; Burke',
    field: 'Sociology / rhetoric',
    category: 'drift',
    brief: 'Expertise in the existing system disqualifies you from seeing alternatives.',
    claim:
      'A state of affairs in which one’s abilities function as blindnesses. Skill in the existing system constitutes, by the same gesture, an inability to see what the system precludes. The expert protects what made them expert.',
    source:
      'Veblen, T. (1899). The Theory of the Leisure Class — origin of the concept. Burke, K. (1935). Permanence and Change — explicit treatment as “trained incapacity.”',
    url: 'https://en.wikipedia.org/wiki/Trained_incapacity',
    x: 460, y: 730,
  },

  /* ---------------------- asymmetric exploitation (1) ---------------------- */
  {
    id: 'psychopathy',
    name: 'The Asymmetric Exploiter',
    year: '2006 / 2011',
    originator: 'Babiak & Hare; Boddy',
    field: 'Industrial psychology',
    category: 'exploitation',
    brief: 'A small minority with elevated dark-triad traits weaponizes the rest of the chamber.',
    claim:
      'A small minority with elevated dark-triad traits is overrepresented in senior corporate and institutional roles — estimates run roughly 4–20% versus a ~1% population baseline. The mechanisms above are precisely what they exploit; their advantage scales with institutional dysfunction. (Caveat: prevalence estimates are debated, sample-dependent, and methodologically contested.)',
    source:
      'Babiak, P. & Hare, R. D. (2006). Snakes in Suits: When Psychopaths Go to Work. Boddy, C. R. (2011). Corporate Psychopaths: Organisational Destroyers. For methodological critique, see Landay, K., Harms, P. D., & Credé, M. (2019). Shall We Serve the Dark Lords? J. Applied Psych., 104(1).',
    url: 'https://en.wikipedia.org/wiki/Corporate_psychopathy',
    x: 770, y: 660,
  },
];

const CATEGORIES = {
  'self-preservation': { label: 'Self-Preservation',       color: '#d4a463', desc: 'The institution acquires interests of its own.' },
  'capture':           { label: 'Capture & Rent',          color: '#c08560', desc: 'The regulated buy the regulator.' },
  'agency':            { label: 'Agency Problems',         color: '#b89770', desc: 'Decision-makers and bearers of consequence diverge.' },
  'knowledge':         { label: 'Knowledge & Measurement', color: '#7aada0', desc: 'Local information and target metrics fail at scale.' },
  'drift':             { label: 'Bureaucratic Drift',      color: '#9c9387', desc: 'Process expands; substance recedes.' },
  'exploitation':      { label: 'Asymmetric Exploitation', color: '#b04a4a', desc: 'A small minority weaponizes the rest.' },
};

const CATEGORY_ORDER = ['self-preservation', 'capture', 'agency', 'knowledge', 'drift', 'exploitation'];

/* ----------------------------- styles ---------------------------------- */

const Styles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600;9..144,700&family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=JetBrains+Mono:wght@400;500&display=swap');

    :root {
      --bg: #0d0d0f;
      --surface: #161618;
      --surface-2: #1a1a1d;
      --border-soft: #26262a;
      --border-mid: #3a3a3e;
      --primary: #ece4d0;
      --secondary: #c9c0ad;
      --tertiary: #a89e8a;
      --caption: #8a8275;
      --teal: #7aada0;
      --teal-bright: #a8d0c4;
      --amber: #d4a463;
      --oxblood: #b04a4a;
    }

    body, html {
      background: var(--bg);
      color: var(--primary);
      margin: 0;
    }

    .filter-chamber {
      background: var(--bg);
      color: var(--primary);
      min-height: 100vh;
      font-family: 'EB Garamond', serif;
      position: relative;
    }
    .filter-chamber::after {
      content: '';
      position: absolute; inset: 0;
      pointer-events: none;
      background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.4 0'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.5'/></svg>");
      opacity: 0.06;
      mix-blend-mode: overlay;
      z-index: 1;
    }
    .filter-chamber > * { position: relative; z-index: 2; }

    .ff-display { font-family: 'Fraunces', serif; font-feature-settings: 'ss01', 'ss02'; letter-spacing: -0.01em; }
    .ff-body    { font-family: 'EB Garamond', serif; }
    .ff-mono    { font-family: 'JetBrains Mono', monospace; font-feature-settings: 'zero', 'ss01'; }

    .c-primary   { color: var(--primary); }
    .c-secondary { color: var(--secondary); }
    .c-tertiary  { color: var(--tertiary); }
    .c-caption   { color: var(--caption); }
    .c-teal      { color: var(--teal); }
    .c-amber     { color: var(--amber); }
    .c-oxblood   { color: var(--oxblood); }

    .b-soft   { border-color: var(--border-soft); }
    .b-mid    { border-color: var(--border-mid); }

    .bg-surface  { background: var(--surface); }
    .bg-surface2 { background: var(--surface-2); }

    /* mono labels at various sizes */
    .ml-xs { font-family: 'JetBrains Mono', monospace; font-size: 10px; letter-spacing: 0.22em; text-transform: uppercase; }
    .ml-sm { font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: 0.14em; }
    .ml-tiny { font-family: 'JetBrains Mono', monospace; font-size: 10px; letter-spacing: 0.18em; }

    /* body sizes */
    .b-sm { font-size: 15px; line-height: 1.55; }
    .b-md { font-size: 17px; line-height: 1.5; }
    .b-lg { font-size: 18px; line-height: 1.6; }
    .b-xl { font-size: 22px; line-height: 1.4; }

    /* display sizes */
    .d-xl  { font-family: 'Fraunces', serif; font-weight: 300; line-height: 0.95; letter-spacing: -0.015em; font-size: clamp(2.6rem, 6.5vw, 4.2rem); }
    .d-lg  { font-family: 'Fraunces', serif; font-weight: 300; line-height: 1.05; letter-spacing: -0.01em; font-size: clamp(1.85rem, 4.2vw, 2.5rem); }
    .d-md  { font-family: 'Fraunces', serif; font-weight: 500; line-height: 1.1; letter-spacing: -0.005em; font-size: clamp(1.5rem, 2.8vw, 1.7rem); }

    /* link styles */
    a.lk-teal { color: var(--teal); text-decoration: none; transition: color .15s; }
    a.lk-teal:hover { color: var(--teal-bright); }
    a.lk-inline { color: var(--secondary); border-bottom: 1px solid var(--teal); padding-bottom: 1px; transition: color .15s; text-decoration: none; }
    a.lk-inline:hover { color: var(--primary); }

    /* pill button */
    .pill {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 6px 12px;
      border: 1px solid var(--border-mid);
      background: transparent;
      color: var(--secondary);
      font-family: 'JetBrains Mono', monospace;
      font-size: 11px;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      cursor: pointer;
      transition: all .15s;
    }
    .pill:hover { border-color: var(--caption); color: var(--primary); }
    .pill.active { background: var(--primary); color: var(--bg); border-color: var(--primary); }
    .pill-dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; }

    /* card */
    .ledger-card {
      border-left: 2px solid var(--border-soft);
      padding: 20px 16px 20px 24px;
      cursor: pointer;
      transition: background-color .15s, border-color .15s;
      scroll-margin-top: 80px;
    }
    .ledger-card.selected { background: var(--surface); }

    /* lists */
    ul.os-list { list-style: none; padding-left: 0; }
    ul.os-list li {
      padding-left: 22px;
      position: relative;
      margin-bottom: 8px;
      color: var(--secondary);
      font-size: 17px;
      line-height: 1.55;
    }
    ul.os-list li::before {
      content: '—';
      position: absolute; left: 0;
      color: var(--teal);
    }
    ul.os-list li strong { color: var(--primary); font-weight: 500; }

    /* animations */
    @keyframes drift-good {
      0%, 100% { transform: translateY(0) scale(1); opacity: 0.9; }
      50% { transform: translateY(8px) scale(1.02); opacity: 1; }
    }
    @keyframes drift-bad {
      0%, 100% { transform: translateY(0) scale(1); opacity: 0.9; }
      50% { transform: translateY(-6px) scale(0.98); opacity: 1; }
    }
    @keyframes drift-out {
      0%, 100% { transform: translateY(0) scaleY(1); opacity: 0.9; }
      50% { transform: translateY(4px) scaleY(1.03); opacity: 1; }
    }
    .stream-good { animation: drift-good 6s ease-in-out infinite; transform-origin: center top; }
    .stream-bad  { animation: drift-bad 7s ease-in-out infinite; transform-origin: center top; }
    .stream-out  { animation: drift-out 5s ease-in-out infinite; transform-origin: center top; }

    /* layout helpers */
    .container-wide { max-width: 1100px; margin: 0 auto; padding: 0 16px; }
    .container-text { max-width: 820px; margin: 0 auto; padding: 0 16px; }
    .stack-y > * + * { margin-top: 20px; }
    .stack-y-tight > * + * { margin-top: 12px; }

    /* category label inside ledger card */
    .cat-tag {
      font-family: 'JetBrains Mono', monospace;
      font-size: 10px;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      margin-top: 8px;
    }
  `}</style>
);

/* ----------------------------- ink diagram --------------------------------- */

const Diagram = ({ selected, setSelected }) => {
  const [hoveredId, setHoveredId] = useState(null);
  const hovered = hoveredId ? MECHANISMS.find((m) => m.id === hoveredId) : null;

  let ttX = 0, ttY = 0;
  const ttW = 270, ttH = 110;
  if (hovered) {
    const flip = hovered.x + ttW + 24 > 980;
    ttX = flip ? hovered.x - ttW - 14 : hovered.x + 14;
    ttY = Math.max(225, Math.min(hovered.y - 24, 1010 - ttH - 8));
  }

  return (
    <div className="container-wide">
      <svg
        viewBox="0 0 1000 1110"
        style={{ width: '100%', height: 'auto', display: 'block' }}
        aria-label="The filter chamber diagram"
      >
        <defs>
          <filter id="ink-turb" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.012 0.04" numOctaves="3" seed="7" />
            <feDisplacementMap in="SourceGraphic" scale="14" />
          </filter>
          <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
          <linearGradient id="grad-good" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"  stopColor="#e9b86b" stopOpacity="0" />
            <stop offset="20%" stopColor="#e9b86b" stopOpacity="0.85" />
            <stop offset="45%" stopColor="#9c7ab8" stopOpacity="0.75" />
            <stop offset="65%" stopColor="#5d8aa8" stopOpacity="0.7" />
            <stop offset="85%" stopColor="#5d8aa8" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#5d8aa8" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="grad-bad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"  stopColor="#1a1a1d" stopOpacity="0" />
            <stop offset="20%" stopColor="#161618" stopOpacity="0.95" />
            <stop offset="60%" stopColor="#0f0f11" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#0a0a0c" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="grad-out" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"  stopColor="#1a1a1d" stopOpacity="0.95" />
            <stop offset="60%" stopColor="#0c0c0e" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#080809" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="glow-good" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#e9b86b" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#e9b86b" stopOpacity="0" />
          </radialGradient>
        </defs>

        <g className="stream-good">
          <ellipse cx="240" cy="20" rx="40" ry="14" fill="url(#glow-good)" filter="url(#soft)" />
          <path
            d="M 200 0 Q 220 60 200 120 Q 240 180 220 250 Q 280 290 250 340 L 290 340 Q 270 280 300 220 Q 250 160 280 100 Q 260 50 280 0 Z"
            fill="url(#grad-good)"
            filter="url(#ink-turb)"
            opacity="0.95"
          />
        </g>

        <g className="stream-bad">
          <path
            d="M 690 0 Q 720 80 700 160 Q 760 220 720 300 L 780 300 Q 770 240 800 180 Q 760 100 790 0 Z"
            fill="url(#grad-bad)"
            filter="url(#ink-turb)"
          />
        </g>

        <g fontFamily="'JetBrains Mono', monospace" fill="#c9c0ad" fontSize="11" letterSpacing="0.18em">
          <text x="245" y="40" textAnchor="middle">GOOD INTENT</text>
          <text x="745" y="40" textAnchor="middle">BAD INTENT</text>
        </g>

        <g>
          <rect x="80" y="220" width="840" height="790" rx="14" ry="14" fill="#101013" stroke="#3a3a3e" strokeWidth="1.2" />
          <rect x="82" y="222" width="836" height="786" rx="14" ry="14" fill="none" stroke="#26262a" strokeWidth="0.6" strokeDasharray="2 3" />
          <text x="100" y="248" fontFamily="'JetBrains Mono', monospace" fill="#a89e8a" fontSize="10" letterSpacing="0.22em">
            FILTER CHAMBER — INSTITUTIONAL MECHANISMS
          </text>

          <g fontFamily="'JetBrains Mono', monospace" fontSize="9" letterSpacing="0.2em" fill="#8a8275">
            <text x="115" y="275">SELF-PRESERVATION</text>
            <text x="395" y="275">CAPTURE &amp; RENT</text>
            <text x="710" y="275">AGENCY</text>
            <text x="115" y="555">KNOWLEDGE &amp; MEASUREMENT</text>
            <text x="447" y="555">BUREAUCRATIC DRIFT</text>
            <text x="710" y="555">EXPLOITATION</text>
          </g>

          <line x1="380" y1="265" x2="380" y2="535" stroke="#1f1f22" strokeWidth="1" />
          <line x1="690" y1="265" x2="690" y2="535" stroke="#1f1f22" strokeWidth="1" />
          <line x1="100" y1="540" x2="900" y2="540" stroke="#1f1f22" strokeWidth="1" />
          <line x1="380" y1="555" x2="380" y2="800" stroke="#1f1f22" strokeWidth="1" />
          <line x1="690" y1="555" x2="690" y2="800" stroke="#1f1f22" strokeWidth="1" />
        </g>

        {MECHANISMS.map((m) => {
          const cat = CATEGORIES[m.category];
          const isSel = selected === m.id;
          const isHov = hoveredId === m.id;
          const r = isSel || isHov ? 7.5 : 5;
          return (
            <g
              key={m.id}
              onClick={() => setSelected(isSel ? null : m.id)}
              onMouseEnter={() => setHoveredId(m.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{ cursor: 'pointer' }}
            >
              <rect
                x={m.x - 8}
                y={m.y - 14}
                width={Math.max(140, m.name.length * 7.2)}
                height="28"
                fill="transparent"
              />
              <circle
                cx={m.x}
                cy={m.y}
                r={r}
                fill={cat.color}
                fillOpacity={isSel || isHov ? 1 : 0.85}
                stroke={isSel ? '#ece4d0' : 'none'}
                strokeWidth="1.5"
              />
              {isSel && (
                <circle cx={m.x} cy={m.y} r="14" fill="none" stroke={cat.color} strokeWidth="0.8" strokeOpacity="0.6" />
              )}
              <text
                x={m.x + 12}
                y={m.y + 4}
                fontFamily="'EB Garamond', serif"
                fill={isSel || isHov ? '#ece4d0' : '#c9c0ad'}
                fontSize={isSel || isHov ? 13.5 : 12.5}
                fontStyle="italic"
              >
                {m.name}
              </text>
            </g>
          );
        })}

        {hovered && (
          <g pointerEvents="none">
            <rect x={ttX + 2} y={ttY + 3} width={ttW} height={ttH} fill="#000" opacity="0.55" rx="3" ry="3" />
            <foreignObject x={ttX} y={ttY} width={ttW} height={ttH}>
              <div
                xmlns="http://www.w3.org/1999/xhtml"
                style={{
                  background: '#161618',
                  borderLeft: `2.5px solid ${CATEGORIES[hovered.category].color}`,
                  padding: '10px 14px',
                  fontFamily: "'EB Garamond', serif",
                  color: '#c9c0ad',
                  fontSize: '13.5px',
                  lineHeight: '1.4',
                  height: '100%',
                  boxSizing: 'border-box',
                }}
              >
                <div style={{
                  fontFamily: "'Fraunces', serif",
                  fontSize: '15px',
                  color: '#ece4d0',
                  marginBottom: '3px',
                  fontWeight: 500,
                  letterSpacing: '-0.01em',
                }}>
                  {hovered.name}
                </div>
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '10px',
                  color: '#a89e8a',
                  marginBottom: '7px',
                  letterSpacing: '0.05em',
                }}>
                  {hovered.year} · {hovered.originator}
                </div>
                <div style={{ fontStyle: 'italic', color: '#c9c0ad' }}>
                  {hovered.brief}
                </div>
              </div>
            </foreignObject>
          </g>
        )}

        <g className="stream-out">
          <path
            d="M 460 1010 Q 470 1050 480 1090 L 520 1090 Q 530 1050 540 1010 Z"
            fill="url(#grad-out)"
            filter="url(#ink-turb)"
          />
          <ellipse cx="500" cy="1088" rx="55" ry="18" fill="#0a0a0c" filter="url(#soft)" opacity="0.9" />
        </g>

        <g fontFamily="'JetBrains Mono', monospace" fontSize="11" letterSpacing="0.18em">
          <text x="500" y="1102" textAnchor="middle" fill="#a89e8a">DILUTED → HARMFUL OUTCOMES</text>
        </g>
      </svg>

      <p
        className="ml-xs c-tertiary"
        style={{ textAlign: 'center', marginTop: 12 }}
      >
        Hover for a brief · click for the full citation below.
      </p>
    </div>
  );
};

/* --------------------------- category filter ------------------------------- */

const CategoryFilter = ({ active, setActive }) => (
  <div className="container-wide" style={{ marginTop: 56 }}>
    <div className="ml-xs c-tertiary" style={{ marginBottom: 12 }}>
      Filter by family
    </div>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      <button
        onClick={() => setActive('all')}
        className={`pill${active === 'all' ? ' active' : ''}`}
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
            className={`pill${isActive ? ' active' : ''}`}
          >
            <span className="pill-dot" style={{ backgroundColor: cat.color }} />
            {cat.label}
          </button>
        );
      })}
    </div>
    {active !== 'all' && (
      <p className="ff-body c-secondary" style={{ fontStyle: 'italic', marginTop: 16, fontSize: 16 }}>
        {CATEGORIES[active].desc}
      </p>
    )}
  </div>
);

/* ------------------------------ ledger card -------------------------------- */

const MechanismCard = ({ mechanism, isSelected, onSelect, registerRef }) => {
  const cat = CATEGORIES[mechanism.category];
  const ref = useRef(null);

  useEffect(() => {
    if (registerRef) registerRef(mechanism.id, ref.current);
  }, [mechanism.id, registerRef]);

  return (
    <article
      ref={ref}
      id={`m-${mechanism.id}`}
      className={`ledger-card${isSelected ? ' selected' : ''}`}
      style={{ borderLeftColor: isSelected ? cat.color : 'var(--border-soft)' }}
      onClick={() => onSelect(mechanism.id)}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'baseline' }}>
          <div style={{ minWidth: 170 }}>
            <div className="ml-sm c-tertiary">{mechanism.year}</div>
            <div className="ml-sm c-secondary" style={{ marginTop: 2 }}>{mechanism.originator}</div>
            <div className="cat-tag" style={{ color: cat.color }}>{cat.label}</div>
          </div>
          <div style={{ flex: 1, minWidth: 280 }}>
            <h3 className="d-md c-primary" style={{ margin: '0 0 8px 0' }}>{mechanism.name}</h3>
            <p className="ff-body c-secondary b-md" style={{ margin: '0 0 12px 0' }}>{mechanism.claim}</p>
            <div className="ff-mono c-tertiary" style={{ fontSize: 10.5, lineHeight: 1.5 }}>
              <span className="c-caption" style={{ textTransform: 'uppercase', letterSpacing: '0.14em', marginRight: 8 }}>Source</span>
              {mechanism.source}
            </div>
            {mechanism.url && (
              <a
                href={mechanism.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="lk-teal ff-mono"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 10.5, letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 8 }}
              >
                Reference <ExternalLink size={11} />
              </a>
            )}
            <div className="ff-mono c-caption" style={{ fontSize: 10, fontStyle: 'italic', marginTop: 8 }}>
              {mechanism.field}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

/* -------------------------------- ledger ----------------------------------- */

const Ledger = ({ mechanisms, selected, setSelected, registerRef }) => (
  <div className="container-wide" style={{ marginTop: 32 }}>
    <div style={{ borderTop: '1px solid var(--border-soft)' }}>
      {mechanisms.map((m) => (
        <MechanismCard
          key={m.id}
          mechanism={m}
          isSelected={selected === m.id}
          onSelect={(id) => setSelected(id === selected ? null : id)}
          registerRef={registerRef}
        />
      ))}
      {mechanisms.length === 0 && (
        <div className="ff-body c-tertiary" style={{ fontStyle: 'italic', padding: '48px 0', textAlign: 'center' }}>
          No mechanisms in this family.
        </div>
      )}
    </div>
  </div>
);

/* --------------------------------- hero ------------------------------------ */

const Hero = () => (
  <header className="container-wide" style={{ paddingTop: 80, paddingBottom: 40 }}>
    <div className="ml-xs c-tertiary" style={{ marginBottom: 24, letterSpacing: '0.32em' }}>
      A reference · reconstructed from 2016 · with provenance attached
    </div>
    <h1 className="d-xl c-primary" style={{ margin: 0 }}>
      The Filter <span style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--amber)' }}>Chamber</span>
    </h1>
    <p className="ff-body c-secondary b-xl" style={{ fontStyle: 'italic', marginTop: 24, maxWidth: 780 }}>
      Two streams enter — one good, one bad. One stream leaves, and it is darker than the average of the input. The vessel between is not a neutral pipe. It is a filter, and the filter is biased.
    </p>
    <p className="ff-body c-tertiary b-md" style={{ marginTop: 20, maxWidth: 780 }}>
      Below: twenty-two mechanisms by which institutions convert mixed intent into asymmetrically negative output, each linked to its academic root. The original sketch from 2016 named five of them; the literature names many more, and they have names, dates, and citations.
    </p>
  </header>
);

/* ------------------------------ synthesis ---------------------------------- */

const Synthesis = () => (
  <section className="container-text" style={{ marginTop: 96, marginBottom: 32 }}>
    <div className="ml-xs c-tertiary" style={{ marginBottom: 16 }}>§ — Synthesis</div>
    <h2 className="d-lg c-primary" style={{ margin: '0 0 28px 0' }}>
      The asymmetry is the whole point.
    </h2>
    <div className="ff-body c-secondary b-lg stack-y">
      <p style={{ margin: 0 }}>
        Each mechanism above is, taken alone, a tax on good intent: bureaucratic drift dilutes it, capture redirects it, agency problems disconnect decision from consequence, knowledge problems route it past the people who would have known better.
      </p>
      <p style={{ margin: 0 }}>
        But the same mechanisms are, for the asymmetric exploiter, a <em>technology</em>. Loopholes that slow the conscientious are an opportunity for the unconscientious. Insulation from consequence is a hazard for the well-meaning and a strategy for the ill-meaning. Goodhart’s and Campbell’s Laws are problems for measurement and features for those who only need to look good on the metric.
      </p>
      <p style={{ margin: 0 }}>
        Hence the 2016 footnote. You do not need a majority of bad actors. The chamber is configured such that even a small minority — a few percent with elevated dark-triad traits in senior positions — can dominate the output. The mechanisms do not just dilute; they <em>amplify with a sign change</em>. Good intent attenuates as it passes through, bad intent compounds.
      </p>
    </div>

    {/* DOMINANT SECTION — chamber wins */}
    <div style={{ marginTop: 80 }}>
      <div className="ml-xs c-oxblood" style={{ marginBottom: 16 }}>§ — At eight-billion scale</div>
      <h2 className="d-lg c-primary" style={{ margin: '0 0 28px 0' }}>
        The chamber generally wins. The numbers are not close.
      </h2>
      <div className="ff-body c-secondary b-lg stack-y">
        <p style={{ margin: 0 }}>
          Of eight billion humans, roughly <span className="c-primary" style={{ fontWeight: 500 }}>1.2 million</span> live inside Ostrom-functional commons regimes — about <span className="c-primary" style={{ fontWeight: 500 }}>0.015%</span>. One person in six and a half thousand. The other 99.985% live under institutions that this diagram is describing.
        </p>
        <p style={{ margin: 0 }}>
          The empirical record across that majority is bracing. <a className="lk-inline" href="https://www.transparency.org/en/cpi" target="_blank" rel="noopener noreferrer">Transparency International’s Corruption Perceptions Index</a> places the majority of countries — most of the non-OECD world and a non-trivial number of OECD members — in the lower half of perceived public-sector integrity. The <a className="lk-inline" href="https://info.worldbank.org/governance/wgi/" target="_blank" rel="noopener noreferrer">World Bank’s Worldwide Governance Indicators</a> tell a similar story across rule of law, regulatory quality, government effectiveness, and control of corruption. The numbers are aggregations of dozens of independent expert and survey sources; they are not opinions.
        </p>
        <p style={{ margin: 0 }}>
          Inside the OECD, regulatory capture, revolving-door dynamics, and chronic budget-driven distortion are well documented. The 2008 financial crisis post-mortems are the canonical reference; the rotation of personnel between Wall Street, Treasury, and the Fed is a textbook case of Stigler’s mechanism in continuous operation. Lobbying volume in the United States and the European Union is a public artifact, easily traced. Across the non-OECD world the picture is, on average, considerably worse — bribery, clientelism, and outright extraction sit closer to the surface of daily life than they do in high-income jurisdictions.
        </p>
        <p style={{ margin: 0 }}>
          <a className="lk-inline" href="https://en.wikipedia.org/wiki/Why_Nations_Fail" target="_blank" rel="noopener noreferrer">Acemoglu and Robinson’s</a> framing — <em>Why Nations Fail</em> (2012), building on the 2001 “Colonial Origins of Comparative Development” paper — is the modern synthesis: institutions sit on a spectrum from extractive (a small elite captures the surplus) to inclusive (broad participation, secure property rights, contestable elites). Most institutions, historically and presently, sit toward the extractive end. The chamber’s mechanisms are not bugs in their design. They are the design.
        </p>
        <p style={{ margin: 0 }}>
          The variance matters but does not save the average. The Nordic states, the Netherlands, Switzerland, New Zealand, and Singapore consistently score high on institutional quality across multiple decades and indices. Their good output is not luck — it is the product of historically contingent design choices: political settlements, legal traditions, civil-service norms that hold the chamber’s defaults at bay. They are also, combined, a small fraction of humanity. The point is not that good institutions are impossible. It is that they are unusual, hard-won, and not the universal endpoint of well-meaning reform.
        </p>
        <p style={{ margin: 0, fontStyle: 'italic' }}>
          At eight-billion scale, the asymmetric filter is the empirical default, not the exception. The 2% argument scales worst exactly where institutional quality is weakest — which is to say, across most of the inhabited world.
        </p>
      </div>
    </div>

    {/* SHORTER — Ostrom existence proof */}
    <div style={{ marginTop: 80 }}>
      <div className="ml-xs c-tertiary" style={{ marginBottom: 16 }}>§ — Ostrom, the existence proof</div>
      <h2 className="d-lg c-primary" style={{ margin: '0 0 28px 0' }}>
        The chamber can be beaten — at toy scale.
      </h2>
      <div className="ff-body c-secondary b-lg stack-y">
        <p style={{ margin: 0 }}>
          The 0.015% is real. <a className="lk-inline" href="https://en.wikipedia.org/wiki/Elinor_Ostrom" target="_blank" rel="noopener noreferrer">Elinor Ostrom’s</a> <em>Governing the Commons</em> (1990) catalogued the cases that make it up: Törbel’s communal alpine pastures (1483 charter, still operating), the Spanish huertas of Valencia, Murcia, Alicante and Orihuela — the <a className="lk-inline" href="https://en.wikipedia.org/wiki/Tribunal_de_las_Aguas" target="_blank" rel="noopener noreferrer">Tribunal de las Aguas</a> of Valencia is the oldest continuously functioning judicial institution in Europe — Bali’s subak rice-irrigation system (UNESCO 2012, eleven centuries), Japan’s iriai (入会地, eroded since Meiji), Maine lobster gangs and the Alanya fishery in Turkey, Filipino zanjeras. They share Ostrom’s eight design principles: clear boundaries, congruence between rules and local conditions, collective-choice arrangements, monitoring, graduated sanctions, conflict resolution, recognition by higher authorities, and (for larger systems) nested enterprises. <a className="lk-inline" href="https://onlinelibrary.wiley.com/doi/10.1111/j.1539-6924.2010.01382.x" target="_blank" rel="noopener noreferrer">Cox, Arnold &amp; Villamayor-Tomás (2010)</a> meta-analyzed 91 studies and found broad empirical validation.
        </p>
        <p style={{ margin: 0 }}>
          But every functioning case is a village, a valley, a fishery, an irrigation district. There is no Törbel-equivalent for federal taxation, no Valencia huerta for central banking. Ostrom’s work is not a refutation of the diagram. It is a proof that the chamber <em>can</em> be beaten by small communities willing to do the work. It says nothing about whether the design transfers up — and the empirical record at the scale where most humans actually live, the previous section, says it generally doesn’t.
        </p>
      </div>
    </div>
  </section>
);

/* -------------------------------- footer ----------------------------------- */

const Footer = () => (
  <footer className="container-wide" style={{ paddingTop: 40, paddingBottom: 40, borderTop: '1px solid var(--border-soft)', marginTop: 64 }}>
    <div className="ml-xs c-tertiary" style={{ marginBottom: 12 }}>Original</div>
    <p className="ff-body c-secondary" style={{ fontStyle: 'italic', fontSize: 16, lineHeight: 1.55, maxWidth: 780, margin: 0 }}>
      Reconstructed from a 2016 hand-sketch: two ink columns flowing into a chamber labeled “mechanisms that render governments inefficient,” single black plume below, marginal note: <span className="c-primary">2% of psychopaths ruining it</span>.
    </p>
    <p className="ml-tiny c-caption" style={{ marginTop: 32, lineHeight: 1.6, maxWidth: 880, textTransform: 'uppercase' }}>
      All citations link to public references. Provenance is attached for each claim; methodology of contested estimates — especially corporate psychopathy prevalence and CPI/WGI aggregation choices — is flagged in the source line or in the linked literature.
    </p>
  </footer>
);

/* --------------------------------- App ------------------------------------- */

export default function App() {
  const [selected, setSelected] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const refs = useRef({});

  const registerRef = (id, el) => {
    refs.current[id] = el;
  };

  const filtered = useMemo(() => {
    if (activeCategory === 'all') return MECHANISMS;
    return MECHANISMS.filter((m) => m.category === activeCategory);
  }, [activeCategory]);

  useEffect(() => {
    if (!selected) return;
    const el = refs.current[selected];
    if (el && typeof el.scrollIntoView === 'function') {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [selected]);

  return (
    <div className="filter-chamber">
      <Styles />
      <Hero />
      <Diagram selected={selected} setSelected={setSelected} />
      <CategoryFilter active={activeCategory} setActive={setActiveCategory} />
      <Ledger
        mechanisms={filtered}
        selected={selected}
        setSelected={setSelected}
        registerRef={registerRef}
      />
      <Synthesis />
      <Footer />
    </div>
  );
}
