export const ipTypes = [
  {
    name: "Patents",
    tag: "Protect the invention",
    desc: "20-year exclusive rights for novel, non-obvious inventions — the core moat for deep-tech and product startups.",
    facts: ["~4-6 yrs to grant in India", "Provisional filing buys 12 months", "₹1,600 startup e-filing fee"],
  },
  {
    name: "Trademarks",
    tag: "Protect the brand",
    desc: "Your name, logo and identity — registered so competitors can't ride on the reputation you're building.",
    facts: ["10-year renewable terms", "45 classes to choose from", "™ symbol usable immediately"],
  },
  {
    name: "Copyright",
    tag: "Protect the expression",
    desc: "Code, content, designs of documents and media — automatic on creation, but registration proves ownership.",
    facts: ["Life + 60 years protection", "Software covered as literary work", "Registration in ~3-6 months"],
  },
  {
    name: "Designs",
    tag: "Protect the look",
    desc: "The shape, pattern and aesthetics of your product — crucial for hardware, consumer and industrial products.",
    facts: ["15 years maximum", "Must be novel & non-functional", "Fast grants: ~6-12 months"],
  },
];

export const myths = [
  { myth: "IPR is for later — after we raise.", fact: "Investors price unprotected IP at a discount. Filing a provisional patent before demo day is one week of work." },
  { myth: "A patent means nobody can copy us.", fact: "A granted, well-drafted patent in the right jurisdictions does heavy lifting. A trademark does not." },
  { myth: "Open source kills your IP position.", fact: "Most venture-scale companies blend open source with protected layers — licenses are an IP strategy, not an absence of one." },
  { myth: "IP lawyers cost more than we have.", fact: "StartupHub IPR desk offers fixed-fee packages from ₹14,999 — with the search done in 72 hours." },
];

export const ipStats: { to: number; decimals?: number; suffix: string; label: string }[] = [
  { to: 4.1, decimals: 1, suffix: "K+", label: "Filings managed through StartupHub" },
  { to: 72, suffix: " hrs", label: "Patentability search turnaround" },
  { to: 92, suffix: "%", label: "First-examination success rate" },
  { to: 41, suffix: "%", label: "Of filings from tier 2/3 founders" },
];

export const innovationItems = [
  { name: "Lumen AI", slug: "lumen-ai", sector: "AgriTech · AI", ip: "2 patents filed", note: "Multispectral crop-stress inference protected before Series A — diligence breezed through IP checks." },
  { name: "OrbitalWorks", slug: "orbitalworks", sector: "SpaceTech", ip: "3 patents filed", note: "Ground-segment edge compression and telemetry mesh — the core of their enterprise contracts." },
  { name: "AquaPure", slug: "aquapure", sector: "CleanTech", ip: "1 patent filed", note: "Modular cascade filtration design protected across manufacturing partners from day one." },
  { name: "MedSync", slug: "medsync", sector: "HealthTech", ip: "1 patent + trademark", note: "Consent-scoped record exchange patent anchors their B2B hospital negotiations." },
];

export const ipResources = [
  { title: "IP Checklist for Startups", type: "Checklist", desc: "The 14 IP tasks to finish before your demo day." },
  { title: "Provisional Patent Playbook", type: "Guide", desc: "When to file provisionally, what it buys you, what it costs." },
  { title: "Trademark Class Finder", type: "Tool", desc: "Find your correct classes in 5 minutes, explained without legalese." },
  { title: "IP Assignment Templates", type: "Template", desc: "Founder and contractor IP assignment agreements — India-ready." },
  { title: "Reading a Prior-Art Search", type: "Guide", desc: "How to interpret search results and pivot claims intelligently." },
  { title: "Open Source License Map", type: "Reference", desc: "MIT to AGPL: what each license means for your commercial IP." },
];

export const ipExperts = [
  { name: "Dr. Meera Krishnan", role: "IPR Attorney & Strategist", tag: "Patents · 19 yrs", stat: "900+ filings" },
  { name: "Arvind Seshadri", role: "Patent Agent, DeepTech", tag: "Hardware · 12 yrs", stat: "400+ filings" },
  { name: "Nandini Iyer", role: "Trademark Counsel", tag: "Brands · 10 yrs", stat: "1.2K+ marks" },
  { name: "Prof. R. Venkatesh", role: "IP Policy Advisor", tag: "Strategy · 22 yrs", stat: "3 national programs" },
];
