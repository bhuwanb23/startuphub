import {
  ArrowUpRight,
  Brain,
  FilePlus2,
  Flag,
  Lightbulb,
  LineChart,
  Radar,
  TrendingUp,
} from "lucide-react";
import { Bar, Chip, Panel, Spark } from "@/components/app/widgets";
import { PageHead } from "@/components/app/boards";
import {
  GAP_ANALYSIS,
  OPPORTUNITIES,
  POLICY_INSIGHTS,
  POLICY_RECOMMENDATIONS,
  SCENARIOS,
  TREND_ANALYSIS,
} from "../../constants/intel-data";

/* ── Policy Insights ────────────────────────────────────────── */
export function PolicyInsights() {
  return (
    <div className="space-y-5">
      <PageHead
        title="Policy insights"
        sub="Evidence-backed findings from ecosystem data — feeds the recommendation pipeline"
        action={<Chip tone="accent" className="px-3 py-1.5"><Brain className="h-3 w-3" /> 4 new this month</Chip>}
      />
      <div className="grid gap-4 lg:grid-cols-2">
        {POLICY_INSIGHTS.map((p, i) => (
          <Panel key={p.title} className="transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft">
            <div className="flex items-start justify-between gap-3">
              <span className="font-mono text-[11px] font-semibold text-accent">I-0{i + 1}</span>
              <Chip tone={p.confidence === "High" ? "rise" : "amber"}>{p.confidence} confidence</Chip>
            </div>
            <h3 className="mt-2.5 text-[16px] leading-snug font-semibold tracking-[-0.015em] text-ink">{p.title}</h3>
            <p className="mt-2 text-[12.5px] leading-relaxed text-slate-500">
              <span className="font-semibold text-slate-600">Evidence: </span>{p.evidence}
            </p>
            <a href="/government/policy/recommendations" className="mt-3.5 inline-flex items-center gap-1 text-[12px] font-semibold text-accent">
              Linked recommendation <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </Panel>
        ))}
      </div>
    </div>
  );
}

/* ── Trend Analysis ─────────────────────────────────────────── */
export function TrendAnalysis() {
  return (
    <div className="space-y-5">
      <PageHead
        title="Trend analysis"
        sub="Emerging sectors, technologies, funding and market shifts on the horizon"
        action={<LineChart className="h-4 w-4 text-slate-300" />}
      />
      <Panel pad={false}>
        <ul className="divide-y divide-line">
          {TREND_ANALYSIS.map((t, i) => (
            <li key={t.trend} className="flex items-start gap-4 px-5 py-4.5 transition-colors hover:bg-soft">
              <span className="font-mono text-[11px] font-semibold text-slate-400">T{i + 1}</span>
              <div className="min-w-0 flex-1">
                <p className="text-[13.5px] font-semibold text-ink">{t.trend}</p>
                <p className="mt-1 text-[12px] text-slate-500">
                  <span className="font-medium text-accent">Policy implication →</span> {t.implication}
                </p>
              </div>
              <Chip tone="ink">{t.horizon}</Chip>
            </li>
          ))}
        </ul>
      </Panel>
      <Panel title="Signal strength" sub="Sector momentum 6M">
        <Spark points={[52, 58, 55, 64, 69, 74, 71, 80, 86, 91, 96, 102]} className="h-16 w-56" />
        <p className="mt-2 text-[12.5px] text-slate-500">
          Aggregate emerging-sector signal at a 3-year high — led by ClimateTech (+26.7%) and spacetech components.
        </p>
      </Panel>
    </div>
  );
}

/* ── Gap Analysis ───────────────────────────────────────────── */
const SEV_TONE: Record<string, "amber" | "accent" | "rise"> = { High: "amber", Medium: "accent", Low: "rise" };

export function GapAnalysis() {
  return (
    <div className="space-y-5">
      <PageHead
        title="Gap analysis"
        sub="Funding, regional, infrastructure, skill, incubation and IPR gaps — each linked to an action"
        action={<Chip tone="amber" className="px-3 py-1.5"><Flag className="h-3 w-3" /> 2 high-severity</Chip>}
      />
      <Panel pad={false}>
        <ul className="divide-y divide-line">
          {GAP_ANALYSIS.map((g) => (
            <li key={g.area} className="grid items-center gap-3 px-5 py-4.5 transition-colors hover:bg-soft lg:grid-cols-[1fr_auto]">
              <div>
                <div className="flex flex-wrap items-center gap-2.5">
                  <p className="text-[13.5px] font-semibold text-ink">{g.area}</p>
                  <Chip tone={SEV_TONE[g.severity]}>{g.severity}</Chip>
                </div>
                <p className="mt-1 text-[12.5px] text-slate-500">
                  {g.gap} <span className="font-mono text-[9.5px] tracking-[0.08em] text-slate-400 uppercase">· evidence: {g.evidence}</span>
                </p>
                <p className="mt-1.5 text-[12.5px] font-medium text-accent">→ Fix: {g.action}</p>
              </div>
              <a href="/government/policy/recommendations" className="w-fit rounded-lg border border-line px-3.5 py-2 text-[12px] font-semibold text-ink hover:bg-white">
                Linked policy →
              </a>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}

/* ── Opportunity Analysis ───────────────────────────────────── */
export function OpportunityAnalysis() {
  return (
    <div className="space-y-5">
      <PageHead
        title="Opportunity analysis"
        sub="Emerging industries and regional windows worth acting on now"
        action={<Radar className="h-4 w-4 text-slate-300" />}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {OPPORTUNITIES.map((o, i) => (
          <Panel key={o.opportunity} className="transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft">
            <div className="flex items-start justify-between gap-3">
              <span className="font-mono text-[11px] font-semibold text-accent">O{i + 1}</span>
              <Chip tone="amber">{o.window}</Chip>
            </div>
            <h3 className="mt-2.5 text-[16.5px] leading-snug font-semibold tracking-[-0.015em] text-ink">{o.opportunity}</h3>
            <p className="mt-2.5 text-[14px] font-semibold text-rise">{o.potential}</p>
          </Panel>
        ))}
      </div>
    </div>
  );
}

/* ── Policy Recommendations ─────────────────────────────────── */
const PRI_TONE: Record<string, "amber" | "accent" | "slate"> = { P1: "amber", P2: "accent", P3: "slate" };

export function PolicyRecommendations() {
  return (
    <div className="space-y-5">
      <PageHead
        title="Policy recommendations"
        sub="Prioritized, evidence-linked and impact-projected — staged for steering committee Apr 18"
        action={
          <button className="flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-accent-deep">
            <FilePlus2 className="h-3.5 w-3.5" /> Draft memo
          </button>
        }
      />
      <div className="space-y-3">
        {POLICY_RECOMMENDATIONS.map((r, i) => (
          <Panel key={r.rec} className="transition-all duration-300 hover:shadow-soft">
            <div className="flex items-start gap-4">
              <Chip tone={PRI_TONE[r.priority]} className="mt-1 shrink-0 px-3 py-1.5">{r.priority}</Chip>
              <div className="min-w-0 flex-1">
                <h3 className="text-[15px] leading-snug font-semibold text-ink">{r.rec}</h3>
                <div className="mt-2.5 grid gap-2 sm:grid-cols-2">
                  <p className="rounded-lg bg-rise-tint px-3.5 py-2.5 text-[12px] font-medium text-ink">
                    <span className="font-mono text-[9px] tracking-[0.12em] text-rise uppercase block mb-1">Expected impact</span>
                    {r.impact}
                  </p>
                  <p className="rounded-lg bg-soft px-3.5 py-2.5 text-[12px] text-slate-600">
                    <span className="font-mono text-[9px] tracking-[0.12em] text-slate-400 uppercase block mb-1">Evidence base</span>
                    {r.evidence}
                  </p>
                </div>
              </div>
            </div>
          </Panel>
        ))}
      </div>
    </div>
  );
}

/* ── Scenario Analysis ──────────────────────────────────────── */
export function ScenarioAnalysis() {
  return (
    <div className="space-y-5">
      <PageHead
        title="Scenario analysis"
        sub="Simulated outcomes of policy options over 3 years — the case for Scenario C"
        action={<Lightbulb className="h-4 w-4 text-slate-300" />}
      />
      <div className="grid gap-4 lg:grid-cols-3">
        {SCENARIOS.map((s, i) => (
          <div key={s.name} className={`rounded-2xl border p-6 ${i === 2 ? "border-accent/40 bg-accent text-white shadow-[0_16px_40px_rgba(49,87,232,0.25)]" : "border-line bg-white"}`}>
            <div className="flex items-center justify-between">
              <p className={`font-mono text-[10px] font-semibold tracking-[0.14em] uppercase ${i === 2 ? "text-white/70" : "text-slate-400"}`}>{s.name}</p>
              {i === 2 && <Chip tone="ink" className="!bg-white/15 !text-white">Recommended</Chip>}
            </div>
            <p className={`mt-1.5 font-mono text-[11px] ${i === 2 ? "text-white/70" : "text-slate-400"}`}>{s.investment}</p>
            <dl className={`mt-5 space-y-4 border-t ${i === 2 ? "border-white/15" : "border-line"} pt-5`}>
              {[
                ["Startups by 2028", s.startups26],
                ["Jobs by 2028", s.jobs26],
                ["Funding gap", s.gap],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className={`font-mono text-[9px] tracking-[0.14em] uppercase ${i === 2 ? "text-white/60" : "text-slate-400"}`}>{k}</dt>
                  <dd className={`mt-1 text-[14.5px] leading-snug font-semibold ${i === 2 ? "text-white" : "text-ink"}`}>{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
      <Panel title="Simulation assumptions" sub="Modelled on registry, funding and employment elasticity from FY24–26 data">
        <ul className="grid gap-3 text-[12.5px] text-slate-600 sm:grid-cols-2">
          <li>· Formation elasticity: each accredited incubator adds ~48 formations/yr in-district</li>
          <li>· Seed-gap closure: co-investment window clears 3.1× its corpus in follow-on private capital</li>
          <li>· Mentored programs lift completion from 41% → 78% (urban benchmark transfer)</li>
          <li>· Employment multiplier: 41.2 direct jobs per ₹1 Cr deployed at seed stage</li>
        </ul>
      </Panel>
    </div>
  );
}
