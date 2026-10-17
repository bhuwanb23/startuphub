export type Startup = {
  slug: string;
  name: string;
  initials: string;
  sector: string;
  industry: string;
  location: string;
  stage: string;
  tech: string;
  fundingStage: string;
  incubator: string;
  model: string;
  tags: string[];
  oneLiner: string;
  overview: string;
  problem: string;
  solution: string;
  product: string[];
  traction: { value: string; label: string }[];
  funding: { round: string; amount: string; date: string; lead: string }[];
  ipr: { type: string; title: string; status: string }[];
  team: { name: string; role: string }[];
  website: string;
  founded: string;
  employees: string;
};

export const startups: Startup[] = [
  {
    slug: "lumen-ai",
    name: "Lumen AI",
    initials: "Lu",
    sector: "Applied AI",
    industry: "AgriTech",
    location: "Bengaluru",
    stage: "Growth",
    tech: "Computer Vision",
    fundingStage: "Series A",
    incubator: "StartupHub Labs",
    model: "B2B SaaS",
    tags: ["AI", "Agriculture", "Remote Sensing", "SaaS"],
    oneLiner: "Vision models measuring crop health across 3.2M hectares of farmland.",
    overview:
      "Lumen AI turns satellite and drone imagery into per-acre crop intelligence for agri-businesses, cooperatives and government missions. What used to need a field officer's week now lands in an agronomist's inbox every morning.",
    problem:
      "Crop stress is detected weeks too late. Field scouting covers under 5% of cultivated area, and by the time damage is visible to the eye, 30–40% of yield is already gone.",
    solution:
      "Multispectral vision models flag water stress, pest onset and nutrient gaps at per-acre resolution, 10–14 days before visible symptoms — with treatment maps pushed to field teams automatically.",
    product: [
      "Per-acre stress alerts with 10–14 day early warning",
      "Treatment priority maps for field teams",
      "API for agri ERPs and government dashboards",
    ],
    traction: [
      { value: "3.2M", label: "hectares mapped" },
      { value: "14", label: "states deployed" },
      { value: "₹2.9 Cr", label: "ARR" },
    ],
    funding: [
      { round: "Pre-seed", amount: "₹60L", date: "Mar 2024", lead: "Nexus Angels" },
      { round: "Seed", amount: "₹3.5 Cr", date: "Nov 2024", lead: "Atlas Capital" },
      { round: "Series A", amount: "₹2.4 Cr", date: "Feb 2026", lead: "Northgate Partners" },
    ],
    ipr: [
      { type: "Patent", title: "Multispectral crop stress inference", status: "Filed" },
      { type: "Patent", title: "Per-acre yield attribution method", status: "Filed" },
      { type: "Trademark", title: "Lumen AI wordmark", status: "Registered" },
    ],
    team: [
      { name: "Ananya Rao", role: "Co-founder & CEO" },
      { name: "Vikash Jha", role: "Co-founder & CTO" },
      { name: "Meera Pillai", role: "Head of Agronomy" },
    ],
    website: "lumenai.example.com",
    founded: "2023",
    employees: "28",
  },
  {
    slug: "terragrid",
    name: "TerraGrid",
    initials: "TG",
    sector: "ClimateTech",
    industry: "Energy",
    location: "Pune",
    stage: "MVP",
    tech: "Edge ML",
    fundingStage: "Seed",
    incubator: "CIED Pune",
    model: "B2B",
    tags: ["Climate", "Energy", "Storage", "ML"],
    oneLiner: "Grid-scale storage intelligence for renewable operators.",
    overview:
      "TerraGrid optimises when battery assets charge, discharge and sell — squeezing 11–18% more revenue from the same hardware through price forecasting and degradation-aware cycling.",
    problem:
      "Renewable operators leave crores on the table: batteries cycle in and out at the wrong hours and degrade faster than models assume.",
    solution:
      "A forecasting + control layer that learns each asset's degradation curve and grid price rhythm, then automates dispatch within operator-set guardrails.",
    product: ["Dispatch automation with guardrails", "Degradation-aware cycling models", "Revenue attribution dashboard"],
    traction: [
      { value: "41 MWh", label: "assets under management" },
      { value: "14.2%", label: "avg. revenue uplift" },
      { value: "6", label: "paying operators" },
    ],
    funding: [
      { round: "Pre-seed", amount: "₹45L", date: "Jun 2024", lead: "Foundry Six" },
      { round: "Seed", amount: "₹2.1 Cr", date: "Jan 2026", lead: "Horizon Fund" },
    ],
    ipr: [{ type: "Patent", title: "Degradation-aware dispatch scheduling", status: "Filed" }],
    team: [
      { name: "Ishita Kulkarni", role: "Co-founder & CEO" },
      { name: "Arvind Menon", role: "Co-founder & CTO" },
    ],
    website: "terragrid.example.com",
    founded: "2024",
    employees: "11",
  },
  {
    slug: "medsync",
    name: "MedSync",
    initials: "MS",
    sector: "HealthTech",
    industry: "Healthcare",
    location: "Hyderabad",
    stage: "Growth",
    tech: "FHIR APIs",
    fundingStage: "Series A",
    incubator: "T-Hub Health",
    model: "B2B SaaS",
    tags: ["Health", "Interoperability", "Records", "API"],
    oneLiner: "Interoperable patient records for 400+ clinics.",
    overview:
      "MedSync pipes patient records between clinics, labs and hospitals that were never designed to talk to each other — so the record follows the patient instead of the photocopy.",
    problem:
      "India's clinics run on paper and WhatsApp photos of reports. Repeat tests, missed allergies and lost histories cost providers time and patients safety.",
    solution:
      "A FHIR-native interoperability layer with consent-first sharing: clinics see a unified timeline regardless of where the data was created.",
    product: ["Unified patient timeline", "Consent-first record sharing", "Lab & pharmacy integrations"],
    traction: [
      { value: "412", label: "clinics live" },
      { value: "1.8M", label: "records unified" },
      { value: "₹1.6 Cr", label: "ARR" },
    ],
    funding: [
      { round: "Seed", amount: "₹1.8 Cr", date: "Aug 2024", lead: "Meridian Labs" },
      { round: "Series A", amount: "₹6 Cr", date: "Dec 2025", lead: "Vertex Global" },
    ],
    ipr: [
      { type: "Patent", title: "Consent-scoped health record exchange", status: "Filed" },
      { type: "Trademark", title: "MedSync", status: "Registered" },
    ],
    team: [
      { name: "Sarah Fernandes", role: "Co-founder & COO" },
      { name: "Dr. Nikhil Anand", role: "Co-founder & Medical Director" },
    ],
    website: "medsync.example.com",
    founded: "2023",
    employees: "34",
  },
  {
    slug: "finedge",
    name: "FinEdge",
    initials: "FE",
    sector: "FinTech",
    industry: "Financial Services",
    location: "Mumbai",
    stage: "Validation",
    tech: "Alt-data scoring",
    fundingStage: "Pre-seed",
    incubator: "StartupHub Labs",
    model: "B2B2C",
    tags: ["FinTech", "Credit", "MSME", "Lending"],
    oneLiner: "Credit rails for India's micro-entrepreneurs.",
    overview:
      "FinEdge scores micro-entrepreneurs on cash-flow signals instead of collateral, giving lenders a defensible way to say yes to first-time borrowers.",
    problem:
      "63M micro-enterprises are credit-invisible: no bureau history, no collateral, no chance — despite healthy daily cash flows.",
    solution:
      "Alternate-data scoring from payment, inventory and utility signals, delivered as a lender-facing API with explainable decisions.",
    product: ["Alt-data credit scores", "Lender decisioning API", "Portfolio early-warning"],
    traction: [
      { value: "18K", label: "borrowers scored" },
      { value: "3", label: "NBFC pilots" },
      { value: "11%", label: "lower NPA in pilots" },
    ],
    funding: [{ round: "Pre-seed", amount: "₹50L", date: "Oct 2025", lead: "Cobalt Partners" }],
    ipr: [{ type: "Patent", title: "Cash-flow entropy credit scoring", status: "Provisional" }],
    team: [
      { name: "Kabir Malhotra", role: "Founder & CEO" },
      { name: "Ritu Sharma", role: "Head of Risk" },
    ],
    website: "finedge.example.com",
    founded: "2025",
    employees: "7",
  },
  {
    slug: "orbitalworks",
    name: "OrbitalWorks",
    initials: "OW",
    sector: "SpaceTech",
    industry: "Space",
    location: "Chennai",
    stage: "MVP",
    tech: "Ground segment",
    fundingStage: "Seed",
    incubator: "CIIE Space",
    model: "B2B",
    tags: ["Space", "Satellite", "Data", "Infra"],
    oneLiner: "Realtime satellite data pipelines for logistics and defence.",
    overview:
      "OrbitalWorks builds ground-segment software that turns raw satellite passes into streamed, analysis-ready data — hours faster than incumbent pipelines.",
    problem:
      "Satellite operators sell data; customers need answers. Today's pipelines add 6–12 hours of processing between capture and usable feed.",
    solution:
      "Edge processing at ground stations plus a streaming API, delivering analysis-ready imagery and telemetry in near-real time.",
    product: ["Ground-station edge processing", "Streaming imagery API", "Fleet telemetry mesh"],
    traction: [
      { value: "9", label: "ground stations" },
      { value: "38 min", label: "capture-to-API latency" },
      { value: "4", label: "enterprise contracts" },
    ],
    funding: [
      { round: "Pre-seed", amount: "₹75L", date: "Feb 2025", lead: "Nexus Angels" },
      { round: "Seed", amount: "₹3 Cr", date: "Jan 2026", lead: "Atlas Capital" },
    ],
    ipr: [
      { type: "Patent", title: "Ground-segment edge compression", status: "Filed" },
      { type: "Patent", title: "Multi-pass data stitching", status: "Filed" },
      { type: "Patent", title: "Orbital telemetry mesh protocol", status: "Provisional" },
    ],
    team: [
      { name: "Daniel Mathew", role: "Founder & CEO" },
      { name: "Ayesha Khan", role: "Head of Ground Systems" },
    ],
    website: "orbitalworks.example.com",
    founded: "2024",
    employees: "14",
  },
  {
    slug: "skyline-logistics",
    name: "Skyline Logistics",
    initials: "SL",
    sector: "Logistics",
    industry: "Supply Chain",
    location: "Delhi NCR",
    stage: "Scale",
    tech: "Route AI",
    fundingStage: "Series B",
    incubator: "StartupHub Labs",
    model: "Marketplace",
    tags: ["Logistics", "Routing", "Marketplace"],
    oneLiner: "Empty-mile elimination for 12,000 trucking lanes.",
    overview:
      "Skyline matches return loads across independent fleet owners, cutting deadhead miles and lifting fleet utilisation across intercity corridors.",
    problem: "One in three trucks on Indian highways runs empty on its return leg — fuel burned, margin gone.",
    solution: "A return-load marketplace with lane-level pricing intelligence and verified fleet onboarding.",
    product: ["Return-load marketplace", "Lane pricing intelligence", "Fleet verification rails"],
    traction: [
      { value: "12K", label: "lanes covered" },
      { value: "₹48 Cr", label: "annual GMV" },
      { value: "23%", label: "utilisation uplift" },
    ],
    funding: [
      { round: "Seed", amount: "₹2.5 Cr", date: "Mar 2023", lead: "Horizon Fund" },
      { round: "Series A", amount: "₹11 Cr", date: "Sep 2024", lead: "Vertex Global" },
      { round: "Series B", amount: "₹32 Cr", date: "Nov 2025", lead: "Northgate Partners" },
    ],
    ipr: [{ type: "Trademark", title: "Skyline", status: "Registered" }],
    team: [
      { name: "Aditya Bansal", role: "Co-founder & CEO" },
      { name: "Neha Gupta", role: "Co-founder & CPO" },
    ],
    website: "skyline.example.com",
    founded: "2022",
    employees: "86",
  },
  {
    slug: "edufold",
    name: "EduFold",
    initials: "EF",
    sector: "EdTech",
    industry: "Education",
    location: "Jaipur",
    stage: "Validation",
    tech: "Adaptive learning",
    fundingStage: "Pre-seed",
    incubator: "MNIT Innovation Hub",
    model: "B2C",
    tags: ["Education", "Adaptive", "Vernacular"],
    oneLiner: "Vernacular adaptive learning for tier-3 science students.",
    overview:
      "EduFold rebuilds science fundamentals in nine Indian languages with adaptive sequencing that finds and fixes each student's actual gaps.",
    problem: "Tier-3 students fail competitive exams on fundamentals they missed three years earlier — in a language they think in.",
    solution: "Diagnostic-first adaptive paths in vernacular medium, synced to state board and exam syllabi.",
    product: ["Gap diagnostics", "Adaptive vernacular paths", "Parent progress loops"],
    traction: [
      { value: "24K", label: "students onboard" },
      { value: "9", label: "languages" },
      { value: "31%", label: "score improvement" },
    ],
    funding: [{ round: "Pre-seed", amount: "₹35L", date: "Dec 2025", lead: "Foundry Six" }],
    ipr: [],
    team: [
      { name: "Pooja Rathore", role: "Founder & CEO" },
      { name: "Imran Sheikh", role: "Head of Learning Science" },
    ],
    website: "edufold.example.com",
    founded: "2025",
    employees: "6",
  },
  {
    slug: "aquapure",
    name: "AquaPure",
    initials: "AP",
    sector: "CleanTech",
    industry: "Water",
    location: "Kochi",
    stage: "MVP",
    tech: "IoT + Filtration",
    fundingStage: "Seed",
    incubator: "Kerala Startup Mission",
    model: "Hardware + SaaS",
    tags: ["Water", "IoT", "Hardware", "CleanTech"],
    oneLiner: "Industrial water recycling that pays for itself in 14 months.",
    overview:
      "AquaPure's modular recycling units and IoT monitoring let mid-size factories reuse 80% of process water with payback periods CFOs actually approve.",
    problem: "Mid-size factories face tightening water costs and discharge rules, but plant-grade recycling is sized and priced for giants.",
    solution: "Modular, skid-mounted recycling with remote monitoring and a per-litre pricing model instead of capex shock.",
    product: ["Modular recycling units", "IoT water-quality telemetry", "Compliance reporting"],
    traction: [
      { value: "19", label: "units deployed" },
      { value: "81%", label: "water reused" },
      { value: "14 mo", label: "median payback" },
    ],
    funding: [
      { round: "Pre-seed", amount: "₹40L", date: "May 2024", lead: "Nexus Angels" },
      { round: "Seed", amount: "₹1.9 Cr", date: "Feb 2026", lead: "Meridian Labs" },
    ],
    ipr: [{ type: "Patent", title: "Modular cascade filtration", status: "Filed" }],
    team: [
      { name: "Thomas George", role: "Founder & CEO" },
      { name: "Lakshmi Nair", role: "Head of Engineering" },
    ],
    website: "aquapure.example.com",
    founded: "2024",
    employees: "12",
  },
];

export const startupFilters = {
  industries: ["AgriTech", "Energy", "Healthcare", "Financial Services", "Space", "Supply Chain", "Education", "Water"],
  locations: ["Bengaluru", "Pune", "Hyderabad", "Mumbai", "Chennai", "Delhi NCR", "Jaipur", "Kochi"],
  stages: ["Validation", "MVP", "Growth", "Scale"],
  funding: ["Pre-seed", "Seed", "Series A", "Series B"],
};
