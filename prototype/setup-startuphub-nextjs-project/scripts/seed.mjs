/* Seed StartupHub demo data — idempotent (upserts by unique slug). */
import pg from "pg";

const { Client } = pg;

const url =
  process.env.DATABASE_URL ??
  "postgresql://postgres:postgres@127.0.0.1:5432/app_db";

const startups = [
  {
    slug: "agrisense",
    name: "AgriSense AI",
    sector: "AI × Agritech",
    stage: "Series A",
    location: "Bengaluru, IN",
    tagline: "Satellite intelligence for 4M smallholder farms.",
    raised: "$8.4M raised",
    initials: "AS",
    featured: true,
    signal: "+212% pilot growth",
  },
  {
    slug: "voltedge",
    name: "VoltEdge",
    sector: "ClimateTech",
    stage: "Seed",
    location: "Munich, DE",
    tagline: "Grid-scale storage analytics for renewable operators.",
    raised: "$3.1M raised",
    initials: "VE",
    featured: false,
    signal: "14 utility pilots",
  },
  {
    slug: "medsynapse",
    name: "MedSynapse",
    sector: "HealthTech",
    stage: "Pre-seed",
    location: "Singapore, SG",
    tagline: "Privacy-first clinical trial matching at scale.",
    raised: "$900K raised",
    initials: "MS",
    featured: false,
    signal: "IP filed in 3 markets",
  },
];

const opportunities = [
  {
    slug: "climate-capital-seed",
    type: "funding",
    title: "Climate Capital Fund — Seed",
    org: "Terra Ventures",
    amount: "Up to $1.5M",
    deadline: "Apr 15, 2026",
    location: "Global",
  },
  {
    slug: "deeptech-residency",
    type: "incubation",
    title: "Global DeepTech Residency — Batch 07",
    org: "StartupHub × MIT Sandbox",
    amount: "Equity-free",
    deadline: "Apr 02, 2026",
    location: "Cambridge, US",
  },
  {
    slug: "agri-challenge",
    type: "challenge",
    title: "National Agri Intelligence Challenge",
    org: "Ministry of Agriculture",
    amount: "₹25L grant pool",
    deadline: "Mar 28, 2026",
    location: "India",
  },
];

const sectors = [
  {
    slug: "ai-agritech",
    name: "AI & Agritech",
    descriptor: "AI × AGRITECH",
    market_size: "$42.8B",
    yoy_growth: "+18.4%",
    active_startups: 1284,
    capital_deployed: "$6.2B",
    ip_filings: 412,
    momentum: "Accelerating",
    spark: [8, 10, 9, 13, 15, 14, 19, 22, 21, 27, 31, 38],
    trends: [
      "Precision-agri LLMs move from pilots to paid deployments",
      "Satellite data costs drop 40% — unlocking smallholder markets",
      "Agri-fintech bundles credit with crop intelligence",
    ],
    emerging: [
      { name: "AgriSense AI", detail: "Series A · Satellite crop intelligence" },
      { name: "RootStack", detail: "Seed · Soil carbon verification" },
      { name: "HarvestOS", detail: "Pre-seed · Farm workflow automation" },
    ],
  },
  {
    slug: "climatetech",
    name: "ClimateTech",
    descriptor: "CLIMATE & ENERGY",
    market_size: "$61.4B",
    yoy_growth: "+22.1%",
    active_startups: 2140,
    capital_deployed: "$11.8B",
    ip_filings: 689,
    momentum: "Accelerating",
    spark: [14, 16, 21, 19, 24, 28, 26, 33, 37, 35, 44, 52],
    trends: [
      "Grid-scale storage procurement doubles in EU corridors",
      "Carbon accounting moves from ESG teams into core finance",
      "Fusion-adjacent materials research hits venture radar",
    ],
    emerging: [
      { name: "VoltEdge", detail: "Seed · Storage analytics" },
      { name: "Canopy Analytics", detail: "Series A · Forest intelligence" },
      { name: "TerraLoop", detail: "Seed · Circular materials" },
    ],
  },
  {
    slug: "fintech",
    name: "FinTech Infra",
    descriptor: "FINTECH INFRASTRUCTURE",
    market_size: "$124.6B",
    yoy_growth: "+9.8%",
    active_startups: 3862,
    capital_deployed: "$18.3B",
    ip_filings: 527,
    momentum: "Steady",
    spark: [30, 32, 31, 35, 34, 38, 40, 39, 43, 45, 47, 49],
    trends: [
      "Cross-border payment rails consolidate around three protocols",
      "Embedded compliance becomes a procurement requirement",
      "Real-time treasury APIs replace legacy ERP plugins",
    ],
    emerging: [
      { name: "KredKart", detail: "Series B · MSME credit rails" },
      { name: "Ledgerline", detail: "Seed · Treasury automation" },
      { name: "PayMeridian", detail: "Series A · Cross-border FX" },
    ],
  },
  {
    slug: "healthtech",
    name: "HealthTech",
    descriptor: "DIGITAL HEALTH",
    market_size: "$78.9B",
    yoy_growth: "+15.2%",
    active_startups: 2731,
    capital_deployed: "$9.4B",
    ip_filings: 845,
    momentum: "Accelerating",
    spark: [18, 20, 24, 22, 27, 25, 30, 34, 33, 39, 42, 46],
    trends: [
      "Clinical-grade AI clears first major regulatory cohort",
      "Hospital-at-home models drive remote monitoring demand",
      "Privacy-preserving trial matching gains institutional trust",
    ],
    emerging: [
      { name: "MedSynapse", detail: "Pre-seed · Trial matching" },
      { name: "CardioMesh", detail: "Seed · Remote cardiac care" },
      { name: "PathwayBio", detail: "Series A · Diagnostics AI" },
    ],
  },
];

const stories = [
  {
    slug: "canopy",
    quote:
      "We went from a forest-fire prototype to Series A in fourteen months. StartupHub connected the IP desk, our first enterprise pilot and the round lead — in one place.",
    founder: "Ananya Rao",
    role: "Co-founder & CEO",
    startup: "Canopy Analytics",
    sector: "ClimateTech",
    metric_label: "Series A · $11M raised",
    metric_value: "14 months",
    timeline: "Prototype → Series A",
  },
  {
    slug: "neuraforge",
    quote:
      "The IP desk alone saved us six months. We filed in three markets before demo day.",
    founder: "Ritu Verma",
    role: "Founder",
    startup: "NeuraForge",
    sector: "AI Infrastructure",
    metric_label: "IP filings in 3 markets",
    metric_value: "6 months",
    timeline: "Idea → Protected MVP",
  },
];

const client = new Client({ connectionString: url });

try {
  await client.connect();

  for (const s of startups) {
    await client.query(
      `INSERT INTO startups (slug, name, sector, stage, location, tagline, raised, initials, featured, signal)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
       ON CONFLICT (slug) DO NOTHING`,
      [s.slug, s.name, s.sector, s.stage, s.location, s.tagline, s.raised, s.initials, s.featured, s.signal],
    );
  }

  for (const o of opportunities) {
    await client.query(
      `INSERT INTO opportunities (slug, type, title, org, amount, deadline, location)
       VALUES ($1,$2,$3,$4,$5,$6,$7)
       ON CONFLICT (slug) DO NOTHING`,
      [o.slug, o.type, o.title, o.org, o.amount, o.deadline, o.location],
    );
  }

  for (const m of sectors) {
    await client.query(
      `INSERT INTO market_sectors (slug, name, descriptor, market_size, yoy_growth, active_startups, capital_deployed, ip_filings, momentum, spark, trends, emerging)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
       ON CONFLICT (slug) DO NOTHING`,
      [
        m.slug, m.name, m.descriptor, m.market_size, m.yoy_growth,
        m.active_startups, m.capital_deployed, m.ip_filings, m.momentum,
        JSON.stringify(m.spark), JSON.stringify(m.trends), JSON.stringify(m.emerging),
      ],
    );
  }

  for (const st of stories) {
    await client.query(
      `INSERT INTO stories (slug, quote, founder, role, startup, sector, metric_label, metric_value, timeline)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
       ON CONFLICT (slug) DO NOTHING`,
      [st.slug, st.quote, st.founder, st.role, st.startup, st.sector, st.metric_label, st.metric_value, st.timeline],
    );
  }

  console.log("Seed complete:",
    `${startups.length} startups,`,
    `${opportunities.length} opportunities,`,
    `${sectors.length} sectors,`,
    `${stories.length} stories`);
} finally {
  await client.end();
}
