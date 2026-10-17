import {
  BrainCircuit,
  FileSearch,
  Gauge,
  HandCoins,
  Radar,
  TrendingUp,
  Workflow,
} from "lucide-react";
import type { SolutionData } from "@/components/solution/types";

export const investorsData: SolutionData = {
  slug: "investors",
  audience: "Investors",
  icon: HandCoins,
  title: "Deal flow where the diligence is already started.",
  lead: "Verified traction, readiness scores and IP status — attached to every startup you meet. Spend partner meetings on judgment, not fact-finding.",
  ticks: ["Thesis-matched deal flow", "Double opt-in only", "Signals, not noise"],
  panel: {
    title: "Investor deal desk",
    rows: [
      { icon: Radar, label: "New matches this week", value: "12 startups" },
      { icon: BrainCircuit, label: "Thesis fit", value: "91% avg" },
      { icon: FileSearch, label: "Diligence-ready rooms", value: "7 open" },
      { icon: Gauge, label: "Portfolio health", value: "8 on track" },
    ],
    stat: { value: "80%", label: "of diligence pre-assembled before first call" },
  },
  capabilitiesHeading: "From sourcing to monitoring, one desk.",
  capabilities: [
    { icon: Radar, title: "Discover Startups", desc: "Filter 10,000+ ventures by stage, sector, traction and readiness — refreshed daily." },
    { icon: BrainCircuit, title: "AI Deal Matching", desc: "Matches scored against your actual thesis, cheque size and timing — not keyword spam." },
    { icon: TrendingUp, title: "Startup Intelligence", desc: "Sector momentum, comparable rounds and IP activity before you take the meeting." },
    { icon: FileSearch, title: "Due Diligence", desc: "Structured deal rooms: verified metrics, IP filings, cap table summaries and references." },
    { icon: Workflow, title: "Deal Flow", desc: "A clean pipeline from first look to term sheet, shared with your team in real time." },
    { icon: Gauge, title: "Portfolio Monitoring", desc: "Post-investment tracking with honest KPIs and anomaly alerts across your portfolio." },
  ],
  workflow: [
    { n: "01", title: "Define your thesis", desc: "Stages, sectors, geographies, cheque sizes. The desk tunes itself around it." },
    { n: "02", title: "Review matched flow", desc: "A short weekly list of high-fit startups — each with verified data attached." },
    { n: "03", title: "Diligence in days", desc: "Open the deal room. Most of what you'd request is already structured inside." },
    { n: "04", title: "Invest & monitor", desc: "Close, then watch the same performance layer keep your portfolio honest." },
  ],
  outcomes: [
    { to: 480, suffix: "+", label: "investors active on the network" },
    { to: 1.2, decimals: 1, prefix: "₹", suffix: "K Cr", label: "capital connected to date" },
    { to: 3.4, decimals: 1, suffix: "×", label: "faster average time to close" },
  ],
  quote: {
    text: "The readiness score alone changed how we screen. We're seeing startups two quarters earlier than the rest of the market.",
    name: "Vikram Sethi",
    role: "General Partner, Northgate Ventures",
  },
  ctaLabel: "Join the Investor Network",
};
