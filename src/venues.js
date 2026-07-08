// src/venues.js
// CSVenue Plugin - CS Conference Database
// Covers CCF A/B/C recommended conferences (CCF 2022 Catalog)
// Based on ccfddl/ccf-deadlines data structure
//
// Each entry:
//   abbr    : canonical abbreviation shown in Zotero
//   full    : official full name
//   aliases : lowercase substrings to match against Proceedings Title / Conference Name
//   rank    : CCF rank ('A' | 'B' | 'C')
//   area    : research area tag
//   dblp    : DBLP venue keys (lowercase) for online lookup matching

/* global VENUE_DB */
var VENUE_DB = [

  // ============================================================
  // Area 1: Computer Architecture / Parallel & Distributed / Storage
  // ============================================================

  // --- CCF A ---
  { abbr: "ASPLOS",       rank: "A", area: "Arch",
    dblp: ["asplos"],
    aliases: ["architectural support for programming languages and operating systems", "asplos"] },

  { abbr: "ISCA",         rank: "A", area: "Arch",
    dblp: ["isca"],
    aliases: ["international symposium on computer architecture", "isca"] },

  { abbr: "MICRO",        rank: "A", area: "Arch",
    dblp: ["micro"],
    aliases: ["international symposium on microarchitecture", "ieee/acm micro"] },

  { abbr: "HPCA",         rank: "A", area: "Arch",
    dblp: ["hpca"],
    aliases: ["high performance computer architecture", "hpca"] },

  { abbr: "PPoPP",        rank: "A", area: "Arch",
    dblp: ["ppopp"],
    aliases: ["principles and practice of parallel programming", "ppopp"] },

  { abbr: "SC",           rank: "A", area: "Arch",
    dblp: ["sc"],
    aliases: ["international conference for high performance computing, networking, storage, and analysis",
              "supercomputing conference", "sc22", "sc23", "sc24"] },

  { abbr: "USENIX ATC",   rank: "A", area: "Arch",
    dblp: ["usenix-atc", "atc"],
    aliases: ["usenix annual technical conference", "usenix atc", "annual technical conference",
              "{usenix} annual technical"] },

  { abbr: "EuroSys",      rank: "A", area: "Arch",
    dblp: ["eurosys"],
    aliases: ["european conference on computer systems", "eurosys"] },

  { abbr: "SOSP",         rank: "A", area: "Arch",
    dblp: ["sosp"],
    aliases: ["acm symposium on operating systems principles", "symposium on operating systems principles", "sosp"] },

  { abbr: "OSDI",         rank: "A", area: "Arch",
    dblp: ["osdi"],
    aliases: ["usenix symposium on operating systems design and implementation",
              "operating systems design and implementation", "osdi"] },

  { abbr: "FAST",         rank: "A", area: "Arch",
    dblp: ["fast"],
    aliases: ["usenix conference on file and storage technologies", "file and storage technologies", "fast"] },

  { abbr: "NSDI",         rank: "A", area: "Arch",
    dblp: ["nsdi"],
    aliases: ["usenix symposium on networked systems design and implementation",
              "networked systems design and implementation", "nsdi"] },

  { abbr: "DAC",          rank: "A", area: "Arch",
    dblp: ["dac"],
    aliases: ["design automation conference", "dac"] },

  // --- CCF B ---
  { abbr: "IPDPS",        rank: "B", area: "Arch",
    dblp: ["ipdps"],
    aliases: ["international parallel and distributed processing symposium", "ipdps"] },

  { abbr: "ICS",          rank: "B", area: "Arch",
    dblp: ["ics"],
    aliases: ["international conference on supercomputing", "ics"] },

  { abbr: "SPAA",         rank: "B", area: "Arch",
    dblp: ["spaa"],
    aliases: ["symposium on parallelism in algorithms and architectures", "spaa"] },

  { abbr: "PACT",         rank: "B", area: "Arch",
    dblp: ["pact"],
    aliases: ["parallel architectures and compilation techniques", "pact"] },

  { abbr: "DATE",         rank: "B", area: "Arch",
    dblp: ["date"],
    aliases: ["design, automation and test in europe", "design automation and test in europe", "date conference"] },

  { abbr: "SIGMETRICS",   rank: "B", area: "Arch",
    dblp: ["sigmetrics"],
    aliases: ["acm sigmetrics", "measurement and modeling of computer systems", "sigmetrics"] },

  { abbr: "RTAS",         rank: "B", area: "Arch",
    dblp: ["rtas"],
    aliases: ["real-time and embedded technology and applications symposium", "rtas"] },

  { abbr: "RTSS",         rank: "B", area: "Arch",
    dblp: ["rtss"],
    aliases: ["real-time systems symposium", "rtss"] },

  { abbr: "VEE",          rank: "B", area: "Arch",
    dblp: ["vee"],
    aliases: ["virtual execution environments", "vee"] },

  { abbr: "SoCC",         rank: "B", area: "Arch",
    dblp: ["socc"],
    aliases: ["acm symposium on cloud computing", "socc", "cloud computing"] },

  { abbr: "MSST",         rank: "B", area: "Arch",
    dblp: ["msst"],
    aliases: ["mass storage systems and technologies", "msst"] },

  { abbr: "Middleware",   rank: "B", area: "Arch",
    dblp: ["middleware"],
    aliases: ["acm/ifip/usenix middleware conference", "middleware conference"] },

  { abbr: "HPCC",         rank: "C", area: "Arch",
    dblp: ["hpcc"],
    aliases: ["high performance computing and communications", "hpcc"] },

  // --- CCF C ---
  { abbr: "CF",           rank: "C", area: "Arch",
    dblp: ["cf"],
    aliases: ["acm international conference on computing frontiers", "computing frontiers"] },

  { abbr: "LCTES",        rank: "C", area: "Arch",
    dblp: ["lctes"],
    aliases: ["languages, compilers, and tools for embedded systems", "lctes"] },

  { abbr: "CLUSTER",      rank: "C", area: "Arch",
    dblp: ["cluster"],
    aliases: ["ieee international conference on cluster computing", "ieee cluster"] },

  { abbr: "CASES",        rank: "C", area: "Arch",
    dblp: ["cases"],
    aliases: ["compilers, architecture, and synthesis for embedded systems", "cases"] },

  { abbr: "FPL",          rank: "C", area: "Arch",
    dblp: ["fpl"],
    aliases: ["field programmable logic and applications", "fpl"] },

  { abbr: "HiPC",         rank: "C", area: "Arch",
    dblp: ["hipc"],
    aliases: ["high performance computing", "hipc"] },

  { abbr: "NPC",          rank: "C", area: "Arch",
    dblp: ["npc"],
    aliases: ["network and parallel computing", "npc"] },

  { abbr: "HotOS",        rank: "C", area: "Arch",
    dblp: ["hotos"],
    aliases: ["hot topics in operating systems", "hotos"] },

  { abbr: "SYSTOR",       rank: "C", area: "Arch",
    dblp: ["systor"],
    aliases: ["acm international systems and storage conference", "systor"] },

  { abbr: "SOCC",         rank: "C", area: "Arch",
    dblp: [],
    aliases: ["symposium on cloud computing"] },

  // ============================================================
  // Area 2: Computer Networks
  // ============================================================

  // --- CCF A ---
  { abbr: "SIGCOMM",      rank: "A", area: "Network",
    dblp: ["sigcomm"],
    aliases: ["acm sigcomm", "acm special interest group on data communication", "sigcomm"] },

  { abbr: "MobiCom",      rank: "A", area: "Network",
    dblp: ["mobicom"],
    aliases: ["mobile computing and networking", "mobicom"] },

  { abbr: "INFOCOM",      rank: "A", area: "Network",
    dblp: ["infocom"],
    aliases: ["ieee infocom", "ieee conference on computer communications", "infocom"] },

  // --- CCF B ---
  { abbr: "CoNEXT",       rank: "B", area: "Network",
    dblp: ["conext"],
    aliases: ["emerging networking experiments and technologies", "conext"] },

  { abbr: "SECON",        rank: "B", area: "Network",
    dblp: ["secon"],
    aliases: ["sensor, mesh, and ad hoc communications and networks", "secon"] },

  { abbr: "ICNP",         rank: "B", area: "Network",
    dblp: ["icnp"],
    aliases: ["ieee international conference on network protocols", "icnp"] },

  { abbr: "MobiSys",      rank: "B", area: "Network",
    dblp: ["mobisys"],
    aliases: ["mobile systems, applications, and services", "mobisys"] },

  { abbr: "MobiHoc",      rank: "B", area: "Network",
    dblp: ["mobihoc"],
    aliases: ["mobile ad hoc networking and computing", "mobihoc"] },

  { abbr: "SenSys",       rank: "B", area: "Network",
    dblp: ["sensys"],
    aliases: ["embedded networked sensor systems", "sensys"] },

  { abbr: "IWQoS",        rank: "B", area: "Network",
    dblp: ["iwqos"],
    aliases: ["international workshop on quality of service", "iwqos"] },

  { abbr: "ICDCS",        rank: "B", area: "Network",
    dblp: ["icdcs"],
    aliases: ["ieee international conference on distributed computing systems", "icdcs"] },

  { abbr: "IPSN",         rank: "B", area: "Network",
    dblp: ["ipsn"],
    aliases: ["information processing in sensor networks", "ipsn"] },

  { abbr: "IMC",          rank: "B", area: "Network",
    dblp: ["imc"],
    aliases: ["internet measurement conference", "imc"] },

  // --- CCF C ---
  { abbr: "MASS",         rank: "C", area: "Network",
    dblp: ["mass"],
    aliases: ["mobile adhoc and sensor systems", "mass"] },

  { abbr: "HotNets",      rank: "C", area: "Network",
    dblp: ["hotnets"],
    aliases: ["hot topics in networks", "hotnets"] },

  { abbr: "NOSSDAV",      rank: "C", area: "Network",
    dblp: ["nossdav"],
    aliases: ["network and operating system support for digital audio and video", "nossdav"] },

  { abbr: "IWCMC",        rank: "C", area: "Network",
    dblp: ["iwcmc"],
    aliases: ["international wireless communications and mobile computing", "iwcmc"] },

  // ============================================================
  // Area 3: Network and Information Security
  // ============================================================

  // --- CCF A ---
  { abbr: "CCS",          rank: "A", area: "Security",
    dblp: ["ccs"],
    aliases: ["acm conference on computer and communications security", "acm ccs",
              "computer and communications security", "ccs"] },

  { abbr: "IEEE S&P",     rank: "A", area: "Security",
    dblp: ["sp"],
    aliases: ["ieee symposium on security and privacy", "ieee s&p", "ieee security and privacy",
              "security and privacy symposium", "oakland"] },

  { abbr: "USENIX Security", rank: "A", area: "Security",
    dblp: ["uss"],
    aliases: ["usenix security symposium", "usenix security", "{usenix} security"] },

  { abbr: "NDSS",         rank: "A", area: "Security",
    dblp: ["ndss"],
    aliases: ["network and distributed system security symposium", "ndss"] },

  { abbr: "CRYPTO",       rank: "A", area: "Security",
    dblp: ["crypto"],
    aliases: ["annual international cryptology conference", "crypto"] },

  { abbr: "EUROCRYPT",    rank: "A", area: "Security",
    dblp: ["eurocrypt"],
    aliases: ["advances in cryptology - eurocrypt", "european cryptology conference", "eurocrypt"] },

  // --- CCF B ---
  { abbr: "ASIACRYPT",    rank: "B", area: "Security",
    dblp: ["asiacrypt"],
    aliases: ["advances in cryptology - asiacrypt", "asiacrypt"] },

  { abbr: "ESORICS",      rank: "B", area: "Security",
    dblp: ["esorics"],
    aliases: ["european symposium on research in computer security", "esorics"] },

  { abbr: "CSF",          rank: "B", area: "Security",
    dblp: ["csf"],
    aliases: ["ieee computer security foundations symposium", "computer security foundations", "csf"] },

  { abbr: "ACSAC",        rank: "B", area: "Security",
    dblp: ["acsac"],
    aliases: ["annual computer security applications conference", "acsac"] },

  { abbr: "RAID",         rank: "B", area: "Security",
    dblp: ["raid"],
    aliases: ["research in attacks, intrusions and defenses", "raid symposium"] },

  { abbr: "PKC",          rank: "B", area: "Security",
    dblp: ["pkc"],
    aliases: ["public key cryptography", "pkc"] },

  { abbr: "TCC",          rank: "B", area: "Security",
    dblp: ["tcc"],
    aliases: ["theory of cryptography conference", "tcc"] },

  // --- CCF C ---
  { abbr: "ACNS",         rank: "C", area: "Security",
    dblp: ["acns"],
    aliases: ["applied cryptography and network security", "acns"] },

  { abbr: "CHES",         rank: "C", area: "Security",
    dblp: ["ches"],
    aliases: ["cryptographic hardware and embedded systems", "ches"] },

  { abbr: "FC",           rank: "C", area: "Security",
    dblp: ["fc"],
    aliases: ["financial cryptography and data security", "financial cryptography"] },

  { abbr: "PETS",         rank: "C", area: "Security",
    dblp: ["pets"],
    aliases: ["privacy enhancing technologies symposium", "pets"] },

  { abbr: "ISC",          rank: "C", area: "Security",
    dblp: ["isc"],
    aliases: ["information security conference", "isc"] },

  { abbr: "SOUPS",        rank: "C", area: "Security",
    dblp: ["soups"],
    aliases: ["symposium on usable privacy and security", "soups"] },

  // ============================================================
  // Area 4: Software Engineering / System Software / PL
  // ============================================================

  // --- CCF A ---
  { abbr: "PLDI",         rank: "A", area: "PL",
    dblp: ["pldi"],
    aliases: ["programming language design and implementation", "pldi"] },

  { abbr: "POPL",         rank: "A", area: "PL",
    dblp: ["popl"],
    aliases: ["principles of programming languages", "popl"] },

  { abbr: "FSE",          rank: "A", area: "SE",
    dblp: ["fse"],
    aliases: ["foundations of software engineering", "fse", "esec/fse", "esec-fse",
              "joint european software engineering conference", "acm sigsoft symposium on the foundation of software engineering"] },

  { abbr: "ICSE",         rank: "A", area: "SE",
    dblp: ["icse"],
    aliases: ["international conference on software engineering", "icse"] },

  { abbr: "ISSTA",        rank: "A", area: "SE",
    dblp: ["issta"],
    aliases: ["international symposium on software testing and analysis", "issta"] },

  { abbr: "ASE",          rank: "A", area: "SE",
    dblp: ["ase"],
    aliases: ["ieee/acm international conference on automated software engineering",
              "automated software engineering", "ase"] },

  { abbr: "OOPSLA",       rank: "A", area: "PL",
    dblp: ["oopsla"],
    aliases: ["object-oriented programming, systems, languages, and applications", "oopsla"] },

  // --- CCF B ---
  { abbr: "ECOOP",        rank: "B", area: "PL",
    dblp: ["ecoop"],
    aliases: ["european conference on object-oriented programming", "ecoop"] },

  { abbr: "ICFP",         rank: "B", area: "PL",
    dblp: ["icfp"],
    aliases: ["acm sigplan international conference on functional programming", "icfp"] },

  { abbr: "CGO",          rank: "B", area: "PL",
    dblp: ["cgo"],
    aliases: ["acm/ieee international symposium on code generation and optimization",
              "code generation and optimization", "cgo"] },

  { abbr: "ICSME",        rank: "B", area: "SE",
    dblp: ["icsme", "icsm"],
    aliases: ["ieee international conference on software maintenance and evolution",
              "software maintenance and evolution", "icsme", "icsm"] },

  { abbr: "SANER",        rank: "B", area: "SE",
    dblp: ["saner"],
    aliases: ["ieee international conference on software analysis, evolution and reengineering",
              "software analysis, evolution and reengineering", "saner"] },

  { abbr: "MSR",          rank: "B", area: "SE",
    dblp: ["msr"],
    aliases: ["ieee/acm working conference on mining software repositories",
              "mining software repositories", "msr"] },

  { abbr: "RE",           rank: "B", area: "SE",
    dblp: ["re"],
    aliases: ["ieee international requirements engineering conference", "requirements engineering conference"] },

  { abbr: "CAV",          rank: "B", area: "SE",
    dblp: ["cav"],
    aliases: ["computer aided verification", "cav"] },

  { abbr: "TACAS",        rank: "B", area: "SE",
    dblp: ["tacas"],
    aliases: ["tools and algorithms for the construction and analysis of systems", "tacas"] },

  { abbr: "FASE",         rank: "B", area: "SE",
    dblp: ["fase"],
    aliases: ["fundamental approaches to software engineering", "fase"] },

  { abbr: "EMSE",         rank: "B", area: "SE",
    dblp: ["emse"],
    aliases: ["empirical software engineering", "emse"] },

  // --- CCF C ---
  { abbr: "ISPASS",       rank: "C", area: "SE",
    dblp: ["ispass"],
    aliases: ["ieee international symposium on performance analysis of systems and software", "ispass"] },

  { abbr: "SCAM",         rank: "C", area: "SE",
    dblp: ["scam"],
    aliases: ["ieee international working conference on source code analysis and manipulation", "scam"] },

  { abbr: "WCRE",         rank: "C", area: "SE",
    dblp: ["wcre"],
    aliases: ["working conference on reverse engineering", "wcre"] },

  { abbr: "QRS",          rank: "C", area: "SE",
    dblp: ["qrs"],
    aliases: ["ieee international conference on software quality, reliability and security", "qrs"] },

  { abbr: "ICPC",         rank: "C", area: "SE",
    dblp: ["icpc"],
    aliases: ["ieee international conference on program comprehension", "program comprehension", "icpc"] },

  { abbr: "ISSRE",        rank: "C", area: "SE",
    dblp: ["issre"],
    aliases: ["international symposium on software reliability engineering", "issre"] },

  { abbr: "ICST",         rank: "C", area: "SE",
    dblp: ["icst"],
    aliases: ["ieee international conference on software testing, verification and validation", "icst"] },

  { abbr: "SPIN",         rank: "C", area: "SE",
    dblp: ["spin"],
    aliases: ["model checking of software", "spin"] },

  // ============================================================
  // Area 5: Database / Data Mining / Information Retrieval
  // ============================================================

  // --- CCF A ---
  { abbr: "SIGMOD",       rank: "A", area: "DB",
    dblp: ["sigmod"],
    aliases: ["acm sigmod", "acm sigmod international conference on management of data",
              "management of data", "sigmod"] },

  { abbr: "VLDB",         rank: "A", area: "DB",
    dblp: ["vldb"],
    aliases: ["international conference on very large data bases",
              "very large data bases", "vldb", "proceedings of the vldb endowment"] },

  { abbr: "ICDE",         rank: "A", area: "DB",
    dblp: ["icde"],
    aliases: ["ieee international conference on data engineering", "data engineering", "icde"] },

  { abbr: "KDD",          rank: "A", area: "DB",
    dblp: ["kdd"],
    aliases: ["acm sigkdd", "knowledge discovery and data mining", "kdd", "sigkdd"] },

  { abbr: "SIGIR",        rank: "A", area: "DB",
    dblp: ["sigir"],
    aliases: ["acm sigir", "international acm sigir conference on research and development in information retrieval",
              "information retrieval", "sigir"] },

  // --- CCF B ---
  { abbr: "EDBT",         rank: "B", area: "DB",
    dblp: ["edbt"],
    aliases: ["extending database technology", "edbt"] },

  { abbr: "CIKM",         rank: "B", area: "DB",
    dblp: ["cikm"],
    aliases: ["acm international conference on information and knowledge management", "cikm"] },

  { abbr: "ISWC",         rank: "B", area: "DB",
    dblp: ["iswc"],
    aliases: ["international semantic web conference", "iswc"] },

  { abbr: "WSDM",         rank: "B", area: "DB",
    dblp: ["wsdm"],
    aliases: ["acm international conference on web search and data mining", "web search and data mining", "wsdm"] },

  { abbr: "PODS",         rank: "B", area: "DB",
    dblp: ["pods"],
    aliases: ["acm sigmod-sigact-sigart symposium on principles of database systems",
              "principles of database systems", "pods"] },

  { abbr: "DASFAA",       rank: "B", area: "DB",
    dblp: ["dasfaa"],
    aliases: ["database systems for advanced applications", "dasfaa"] },

  { abbr: "RecSys",       rank: "B", area: "DB",
    dblp: ["recsys"],
    aliases: ["acm conference on recommender systems", "recommender systems", "recsys"] },

  // --- CCF C ---
  { abbr: "ECIR",         rank: "C", area: "DB",
    dblp: ["ecir"],
    aliases: ["european conference on information retrieval", "ecir"] },

  { abbr: "ER",           rank: "C", area: "DB",
    dblp: ["er"],
    aliases: ["international conference on conceptual modeling", "er conference"] },

  { abbr: "MDM",          rank: "C", area: "DB",
    dblp: ["mdm"],
    aliases: ["ieee international conference on mobile data management", "mobile data management", "mdm"] },

  { abbr: "SSDBM",        rank: "C", area: "DB",
    dblp: ["ssdbm"],
    aliases: ["scientific and statistical database management", "ssdbm"] },

  { abbr: "WISE",         rank: "C", area: "DB",
    dblp: ["wise"],
    aliases: ["web information systems engineering", "wise"] },

  // ============================================================
  // Area 6: Theory of Computer Science
  // ============================================================

  // --- CCF A ---
  { abbr: "STOC",         rank: "A", area: "Theory",
    dblp: ["stoc"],
    aliases: ["acm symposium on theory of computing", "theory of computing", "stoc"] },

  { abbr: "FOCS",         rank: "A", area: "Theory",
    dblp: ["focs"],
    aliases: ["ieee symposium on foundations of computer science", "foundations of computer science", "focs"] },

  { abbr: "LICS",         rank: "A", area: "Theory",
    dblp: ["lics"],
    aliases: ["acm/ieee symposium on logic in computer science", "logic in computer science", "lics"] },

  // --- CCF B ---
  { abbr: "SODA",         rank: "B", area: "Theory",
    dblp: ["soda"],
    aliases: ["acm-siam symposium on discrete algorithms", "discrete algorithms", "soda"] },

  { abbr: "ICALP",        rank: "B", area: "Theory",
    dblp: ["icalp"],
    aliases: ["international colloquium on automata, languages, and programming", "icalp"] },

  { abbr: "CONCUR",       rank: "B", area: "Theory",
    dblp: ["concur"],
    aliases: ["international conference on concurrency theory", "concurrency theory", "concur"] },

  { abbr: "ESA",          rank: "B", area: "Theory",
    dblp: ["esa"],
    aliases: ["european symposium on algorithms", "esa"] },

  { abbr: "CCC",          rank: "B", area: "Theory",
    dblp: ["ccc"],
    aliases: ["conference on computational complexity", "computational complexity conference", "ccc"] },

  { abbr: "HSCC",         rank: "B", area: "Theory",
    dblp: ["hscc"],
    aliases: ["acm international conference on hybrid systems", "hybrid systems", "hscc"] },

  // --- CCF C ---
  { abbr: "PODC",         rank: "C", area: "Theory",
    dblp: ["podc"],
    aliases: ["acm symposium on principles of distributed computing", "principles of distributed computing", "podc"] },

  { abbr: "STACS",        rank: "C", area: "Theory",
    dblp: ["stacs"],
    aliases: ["symposium on theoretical aspects of computer science", "stacs"] },

  { abbr: "FSTTCS",       rank: "C", area: "Theory",
    dblp: ["fsttcs"],
    aliases: ["foundations of software technology and theoretical computer science", "fsttcs"] },

  { abbr: "ISAAC",        rank: "C", area: "Theory",
    dblp: ["isaac"],
    aliases: ["international symposium on algorithms and computation", "isaac"] },

  { abbr: "MFCS",         rank: "C", area: "Theory",
    dblp: ["mfcs"],
    aliases: ["mathematical foundations of computer science", "mfcs"] },

  // ============================================================
  // Area 7: Computer Graphics and Multimedia
  // ============================================================

  // --- CCF A ---
  { abbr: "SIGGRAPH",     rank: "A", area: "Graphics",
    dblp: ["siggraph"],
    aliases: ["acm siggraph", "siggraph"] },

  { abbr: "SIGGRAPH Asia",rank: "A", area: "Graphics",
    dblp: ["siggraph-asia"],
    aliases: ["siggraph asia", "acm siggraph asia"] },

  { abbr: "IEEE VIS",     rank: "A", area: "Graphics",
    dblp: ["vis"],
    aliases: ["ieee visualization", "ieee vis", "ieee vgtc conference on visualization"] },

  { abbr: "ACM MM",       rank: "A", area: "Graphics",
    dblp: ["mm"],
    aliases: ["acm international conference on multimedia", "acm multimedia"] },

  // --- CCF B ---
  { abbr: "EGSR",         rank: "B", area: "Graphics",
    dblp: ["egsr"],
    aliases: ["eurographics symposium on rendering", "egsr"] },

  { abbr: "SCA",          rank: "B", area: "Graphics",
    dblp: ["sca"],
    aliases: ["acm siggraph / eurographics symposium on computer animation",
              "symposium on computer animation", "sca"] },

  { abbr: "ICME",         rank: "B", area: "Graphics",
    dblp: ["icme"],
    aliases: ["ieee international conference on multimedia and expo", "icme"] },

  { abbr: "ISMAR",        rank: "B", area: "Graphics",
    dblp: ["ismar"],
    aliases: ["ieee international symposium on mixed and augmented reality", "ismar"] },

  { abbr: "3DV",          rank: "B", area: "Graphics",
    dblp: ["3dv"],
    aliases: ["international conference on 3d vision", "3dv"] },

  { abbr: "Pacific Graphics", rank: "B", area: "Graphics",
    dblp: ["pg"],
    aliases: ["pacific conference on computer graphics and applications", "pacific graphics"] },

  { abbr: "ICMR",         rank: "B", area: "Graphics",
    dblp: ["icmr"],
    aliases: ["acm international conference on multimedia retrieval", "icmr"] },

  // --- CCF C ---
  { abbr: "CGI",          rank: "C", area: "Graphics",
    dblp: ["cgi"],
    aliases: ["computer graphics international", "cgi"] },

  { abbr: "VRST",         rank: "C", area: "Graphics",
    dblp: ["vrst"],
    aliases: ["acm symposium on virtual reality software and technology", "vrst"] },

  // ============================================================
  // Area 8: Artificial Intelligence
  // ============================================================

  // --- CCF A ---
  { abbr: "AAAI",         rank: "A", area: "AI",
    dblp: ["aaai"],
    aliases: ["aaai conference on artificial intelligence", "aaai"] },

  { abbr: "NeurIPS",      rank: "A", area: "AI",
    dblp: ["nips", "neurips"],
    aliases: ["neural information processing systems", "nips", "neurips",
              "advances in neural information processing systems"] },

  { abbr: "IJCAI",        rank: "A", area: "AI",
    dblp: ["ijcai"],
    aliases: ["international joint conference on artificial intelligence", "ijcai"] },

  { abbr: "ICML",         rank: "A", area: "AI",
    dblp: ["icml"],
    aliases: ["international conference on machine learning", "icml"] },

  { abbr: "ICLR",         rank: "A", area: "AI",
    dblp: ["iclr"],
    aliases: ["international conference on learning representations", "iclr"] },

  { abbr: "CVPR",         rank: "A", area: "AI",
    dblp: ["cvpr"],
    aliases: ["ieee/cvf conference on computer vision and pattern recognition",
              "computer vision and pattern recognition", "cvpr"] },

  { abbr: "ICCV",         rank: "A", area: "AI",
    dblp: ["iccv"],
    aliases: ["ieee/cvf international conference on computer vision",
              "international conference on computer vision", "iccv"] },

  { abbr: "ACL",          rank: "A", area: "AI",
    dblp: ["acl"],
    aliases: ["annual meeting of the association for computational linguistics",
              "association for computational linguistics", "acl"] },

  { abbr: "EMNLP",        rank: "A", area: "AI",
    dblp: ["emnlp"],
    aliases: ["conference on empirical methods in natural language processing",
              "empirical methods in natural language processing", "emnlp"] },

  { abbr: "ECCV",         rank: "A", area: "AI",
    dblp: ["eccv"],
    aliases: ["european conference on computer vision", "eccv"] },

  // --- CCF B ---
  { abbr: "NAACL",        rank: "B", area: "AI",
    dblp: ["naacl"],
    aliases: ["north american chapter of the association for computational linguistics", "naacl"] },

  { abbr: "COLING",       rank: "B", area: "AI",
    dblp: ["coling"],
    aliases: ["international conference on computational linguistics", "coling"] },

  { abbr: "KR",           rank: "B", area: "AI",
    dblp: ["kr"],
    aliases: ["international conference on principles of knowledge representation and reasoning",
              "knowledge representation and reasoning", "kr"] },

  { abbr: "COLT",         rank: "B", area: "AI",
    dblp: ["colt"],
    aliases: ["annual conference on computational learning theory", "computational learning theory", "colt"] },

  { abbr: "UAI",          rank: "B", area: "AI",
    dblp: ["uai"],
    aliases: ["conference on uncertainty in artificial intelligence", "uncertainty in artificial intelligence", "uai"] },

  { abbr: "AISTATS",      rank: "B", area: "AI",
    dblp: ["aistats"],
    aliases: ["international conference on artificial intelligence and statistics", "aistats"] },

  { abbr: "ICAPS",        rank: "B", area: "AI",
    dblp: ["icaps"],
    aliases: ["international conference on automated planning and scheduling", "icaps"] },

  { abbr: "ICRA",         rank: "B", area: "AI",
    dblp: ["icra"],
    aliases: ["ieee international conference on robotics and automation", "robotics and automation", "icra"] },

  { abbr: "INTERSPEECH",  rank: "B", area: "AI",
    dblp: ["interspeech"],
    aliases: ["interspeech", "eurospeech"] },

  { abbr: "ICASSP",       rank: "B", area: "AI",
    dblp: ["icassp"],
    aliases: ["ieee international conference on acoustics, speech and signal processing",
              "acoustics, speech and signal processing", "icassp"] },

  { abbr: "ICCBR",        rank: "B", area: "AI",
    dblp: ["iccbr"],
    aliases: ["international conference on case-based reasoning", "case-based reasoning", "iccbr"] },

  { abbr: "CP",           rank: "B", area: "AI",
    dblp: ["cp"],
    aliases: ["international conference on principles and practice of constraint programming",
              "constraint programming", "cp conference"] },

  // --- CCF C ---
  { abbr: "IROS",         rank: "C", area: "AI",
    dblp: ["iros"],
    aliases: ["ieee/rsj international conference on intelligent robots and systems",
              "intelligent robots and systems", "iros"] },

  { abbr: "ECAI",         rank: "C", area: "AI",
    dblp: ["ecai"],
    aliases: ["european conference on artificial intelligence", "ecai"] },

  { abbr: "ACCV",         rank: "C", area: "AI",
    dblp: ["accv"],
    aliases: ["asian conference on computer vision", "accv"] },

  { abbr: "BMVC",         rank: "C", area: "AI",
    dblp: ["bmvc"],
    aliases: ["british machine vision conference", "bmvc"] },

  { abbr: "EACL",         rank: "C", area: "AI",
    dblp: ["eacl"],
    aliases: ["european chapter of the association for computational linguistics", "eacl"] },

  { abbr: "CoNLL",        rank: "C", area: "AI",
    dblp: ["conll"],
    aliases: ["conference on natural language learning", "conll"] },

  { abbr: "ACML",         rank: "C", area: "AI",
    dblp: ["acml"],
    aliases: ["asian conference on machine learning", "acml"] },

  { abbr: "ICTAI",        rank: "C", area: "AI",
    dblp: ["ictai"],
    aliases: ["ieee international conference on tools with artificial intelligence",
              "tools with artificial intelligence", "ictai"] },

  // ============================================================
  // Area 9: Human-Computer Interaction & Ubiquitous Computing
  // ============================================================

  // --- CCF A ---
  { abbr: "CHI",          rank: "A", area: "HCI",
    dblp: ["chi"],
    aliases: ["acm chi conference on human factors in computing systems",
              "human factors in computing systems", "acm chi"] },

  { abbr: "UbiComp",      rank: "A", area: "HCI",
    dblp: ["ubicomp"],
    aliases: ["acm international joint conference on pervasive and ubiquitous computing",
              "ubiquitous computing", "ubicomp"] },

  // --- CCF B ---
  { abbr: "UIST",         rank: "B", area: "HCI",
    dblp: ["uist"],
    aliases: ["acm symposium on user interface software and technology", "user interface software and technology", "uist"] },

  { abbr: "CSCW",         rank: "B", area: "HCI",
    dblp: ["cscw"],
    aliases: ["acm conference on computer-supported cooperative work and social computing",
              "computer-supported cooperative work", "cscw"] },

  { abbr: "IUI",          rank: "B", area: "HCI",
    dblp: ["iui"],
    aliases: ["acm international conference on intelligent user interfaces", "intelligent user interfaces", "iui"] },

  { abbr: "ASSETS",       rank: "B", area: "HCI",
    dblp: ["assets"],
    aliases: ["acm sigaccess conference on computers and accessibility", "assets"] },

  { abbr: "GROUP",        rank: "B", area: "HCI",
    dblp: ["group"],
    aliases: ["acm international conference on supporting group work", "supporting group work", "group conference"] },

  { abbr: "DIS",          rank: "B", area: "HCI",
    dblp: ["dis"],
    aliases: ["acm conference on designing interactive systems", "designing interactive systems", "dis"] },

  { abbr: "INTERACT",     rank: "B", area: "HCI",
    dblp: ["interact"],
    aliases: ["ifip conference on human-computer interaction", "interact"] },

  // --- CCF C ---
  { abbr: "ICMI",         rank: "C", area: "HCI",
    dblp: ["icmi"],
    aliases: ["acm international conference on multimodal interaction", "multimodal interaction", "icmi"] },

  { abbr: "MobileHCI",    rank: "C", area: "HCI",
    dblp: ["mobilehci"],
    aliases: ["acm international conference on mobile human-computer interaction", "mobilehci", "mobile hci"] },

  { abbr: "AVI",          rank: "C", area: "HCI",
    dblp: ["avi"],
    aliases: ["international conference on advanced visual interfaces", "advanced visual interfaces", "avi"] },

  { abbr: "PERCOM",       rank: "C", area: "HCI",
    dblp: ["percom"],
    aliases: ["ieee international conference on pervasive computing and communications", "percom"] },

  // ============================================================
  // Area 10: Interdisciplinary / Web / Emerging
  // ============================================================

  // --- CCF A ---
  { abbr: "WWW",          rank: "A", area: "Web",
    dblp: ["www"],
    aliases: ["the world wide web conference", "world wide web conference", "thewebconf",
              "international world wide web conference", "www conference"] },

  // --- CCF B ---
  { abbr: "WebSci",       rank: "B", area: "Web",
    dblp: ["websci"],
    aliases: ["acm web science conference", "web science", "websci"] },

  { abbr: "HT",           rank: "B", area: "Web",
    dblp: ["ht"],
    aliases: ["acm conference on hypertext", "hypertext and social media"] },

  // --- CCF C ---
  { abbr: "ICWSM",        rank: "C", area: "Web",
    dblp: ["icwsm"],
    aliases: ["international aaai conference on web and social media", "icwsm"] },

  // Bioinformatics / Computational Biology
  { abbr: "ISMB",         rank: "B", area: "Bio",
    dblp: ["ismb"],
    aliases: ["intelligent systems for molecular biology", "ismb"] },

  { abbr: "RECOMB",       rank: "B", area: "Bio",
    dblp: ["recomb"],
    aliases: ["research in computational molecular biology", "recomb"] },

];
