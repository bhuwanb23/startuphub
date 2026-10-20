import {
  Boxes,
  Landmark,
  Network,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import type {
  MarketSector,
  Opportunity,
  Startup,
  Story,
} from "@/db/schema";

/* ------------------------------------------------------------------ */
/* Home view — typed content + resilient fallbacks for the DB-backed   */
/* sections (used when tables are empty or the database is offline).   */
/* ------------------------------------------------------------------ */

export const RIBBON = [
  "Idea",
  "Incubation",
  "IPR",
  "Resources",
  "Market",
  "Funding",
  "Growth",
];

export const PILLARS = [
  {
    id: "01",
    title: "Build",
    desc: "Product, MVP and validation in one workspace — from idea canvas to shipped experiment.",
    icon: Boxes,
    chips: ["Idea canvas", "MVP studio", "Experiment tracker"],
  },
  {
    id: "02",
    title: "Protect",
    desc: "IPR, legal and compliance without friction — protect the innovation before you scale it.",
    icon: ShieldCheck,
    chips: ["Patent desk", "Trademark filing", "Compliance vault"],
  },
  {
    id: "03",
    title: "Connect",
    desc: "Mentors, resources and partners on demand — matched by stage, sector and signal.",
    icon: Network,
    chips: ["Mentor match", "Resource bank", "Corporate pilots"],
  },
  {
    id: "04",
    title: "Fund",
    desc: "Investors, grants and non-dilutive capital — the right money at the right milestone.",
    icon: Landmark,
    chips: ["Investor graph", "Grant radar", "Data room"],
  },
  {
    id: "05",
    title: "Grow",
    desc: "Market, performance and intelligence loops that turn traction into durable scale.",
    icon: TrendingUp,
    chips: ["Market radar", "Growth loops", "Benchmarks"],
  },
];

export const STATS = [
  { value: 10, suffix: "K+", label: "Startups" },
  { value: 450, suffix: "+", label: "Incubators" },
  { value: 2.8, suffix: "K+", label: "Mentors", decimals: 1 },
  {
    value: 1.2,
    prefix: "₹",
    suffix: "K Cr",
    label: "Capital connected",
    decimals: 1,
  },
  { value: 68, suffix: "K+", label: "Ecosystem connections" },
];

export const TILE_BG = [
  "linear-gradient(135deg,#3157E8 0%,#1F2F74 100%)",
  "linear-gradient(135deg,#0B1220 0%,#22389C 130%)",
  "linear-gradient(135deg,#2743C4 0%,#0B1220 120%)",
];

export const FALLBACK_STARTUPS: Startup[] = [
  {
    id: 1,
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
    createdAt: new Date(),
  },
  {
    id: 2,
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
    createdAt: new Date(),
  },
  {
    id: 3,
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
    createdAt: new Date(),
  },
];

export const FALLBACK_OPPORTUNITIES: Opportunity[] = [
  {
    id: 1,
    slug: "climate-capital-seed",
    type: "funding",
    title: "Climate Capital Fund — Seed",
    org: "Terra Ventures",
    amount: "Up to $1.5M",
    deadline: "Apr 15, 2026",
    location: "Global",
    createdAt: new Date(),
  },
  {
    id: 2,
    slug: "deeptech-residency",
    type: "incubation",
    title: "Global DeepTech Residency — Batch 07",
    org: "StartupHub × MIT Sandbox",
    amount: "Equity-free",
    deadline: "Apr 02, 2026",
    location: "Cambridge, US",
    createdAt: new Date(),
  },
  {
    id: 3,
    slug: "agri-challenge",
    type: "challenge",
    title: "National Agri Intelligence Challenge",
    org: "Ministry of Agriculture",
    amount: "₹25L grant pool",
    deadline: "Mar 28, 2026",
    location: "India",
    createdAt: new Date(),
  },
];

export const FALLBACK_SECTORS: MarketSector[] = [
  {
    id: 1,
    slug: "ai-agritech",
    name: "AI & Agritech",
    descriptor: "AI × AGRITECH",
    marketSize: "$42.8B",
    yoyGrowth: "+18.4%",
    activeStartups: 1284,
    capitalDeployed: "$6.2B",
    ipFilings: 412,
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
    id: 2,
    slug: "climatetech",
    name: "ClimateTech",
    descriptor: "CLIMATE & ENERGY",
    marketSize: "$61.4B",
    yoyGrowth: "+22.1%",
    activeStartups: 2140,
    capitalDeployed: "$11.8B",
    ipFilings: 689,
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
    id: 3,
    slug: "fintech",
    name: "FinTech Infra",
    descriptor: "FINTECH INFRASTRUCTURE",
    marketSize: "$124.6B",
    yoyGrowth: "+9.8%",
    activeStartups: 3862,
    capitalDeployed: "$18.3B",
    ipFilings: 527,
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
    id: 4,
    slug: "healthtech",
    name: "HealthTech",
    descriptor: "DIGITAL HEALTH",
    marketSize: "$78.9B",
    yoyGrowth: "+15.2%",
    activeStartups: 2731,
    capitalDeployed: "$9.4B",
    ipFilings: 845,
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

export const FALLBACK_STORIES: Story[] = [
  {
    id: 1,
    slug: "canopy",
    quote:
      "We went from a forest-fire prototype to Series A in fourteen months. StartupHub connected the IP desk, our first enterprise pilot and the round lead — in one place.",
    founder: "Ananya Rao",
    role: "Co-founder & CEO",
    startup: "Canopy Analytics",
    sector: "ClimateTech",
    metricLabel: "Series A · $11M raised",
    metricValue: "14 months",
    timeline: "Prototype → Series A",
  },
  {
    id: 2,
    slug: "neuraforge",
    quote:
      "The IP desk alone saved us six months. We filed in three markets before demo day.",
    founder: "Ritu Verma",
    role: "Founder",
    startup: "NeuraForge",
    sector: "AI Infrastructure",
    metricLabel: "IP filings in 3 markets",
    metricValue: "6 months",
    timeline: "Idea → Protected MVP",
  },
];
