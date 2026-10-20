import {
  Award,
  BadgeIndianRupee,
  BarChart3,
  Gauge,
  ListChecks,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import { Bar, Chip, Panel, Spark, StatCard } from "@/components/app/widgets";
import { PageHead } from "@/components/app/boards";
import {
  BENEFICIARIES,
  FUNDING_PERFORMANCE,
  OUTCOMES,
  PROGRAM_SUMMARY,
} from "../../constants/intel-data";

/* ── Program Overview ───────────────────────────────────────── */
export function ProgramOverview() {
  return (
    <div className="space-y-5">
      <PageHead title="Program overview" sub="All schemes scored on outcomes, utilization and beneficiary results" />
      <Panel pad={false}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left">
            <thead>
              <tr className="border-b border-line">
                {["Program", "Beneficiaries", "Budget", "Utilization", "Approval rate", "Jobs", "Outcome score"].map((h) => (
                  <th key={h} className="px-5 py-3.5 font-mono text-[9.5px] font-medium tracking-[0.16em] text-slate-400 uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {PROGRAM_SUMMARY.map((p) => (
                <tr key={p.name} className="transition-colors hover:bg-soft">
                  <td className="px-5 py-4 text-[13px] font-semibold text-ink">{p.name}</td>
                  <td className="px-5 py-4 font-mono text-[12px] text-slate-500">{p.beneficiaries}</td>
                  <td className="px-5 py-4 font-mono text-[12px] text-ink">{p.budget}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <Bar pct={p.utilization} className="w-16" barClass={p.utilization < 45 ? "bg-amber-dim" : "bg-accent"} />
                      <span className="font-mono text-[11px]">{p.utilization}%</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 font-mono text-[11.5px] text-slate-500">{p.approval}%</td>
                  <td className="px-5 py-4 font-mono text-[11.5px] text-slate-500">{p.jobs}</td>
                  <td className="px-5 py-4">
                    <span className={`flex h-9 w-9 items-center justify-center rounded-lg font-mono text-[12px] font-bold ${p.outcomeScore >= 85 ? "bg-rise text-white" : p.outcomeScore >= 70 ? "bg-accent text-white" : "bg-amber-dim text-white"}`}>
                      {p.outcomeScore}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}

/* ── Program KPIs ───────────────────────────────────────────── */
export function ProgramKpis() {
  const kpis = [
    { label: "Applications received", value: "1,842", delta: "+24% YoY", icon: ListChecks },
    { label: "Approval rate", value: "58%", delta: "target 55%", icon: Gauge },
    { label: "Funding disbursed", value: "₹286 Cr", delta: "68% of allocation", icon: BadgeIndianRupee },
    { label: "Utilization rate", value: "77%", delta: "+17 pts post-milestones", icon: TrendingUp },
    { label: "Jobs via beneficiaries", value: "12,180", delta: "+21% YoY", icon: Users },
    { label: "IPR from beneficiaries", value: "618", delta: "+34% YoY", icon: BarChart3 },
    { label: "Program completion", value: "81%", delta: "cohort-weighted", icon: Target },
    { label: "Beneficiary satisfaction", value: "4.6 / 5", delta: "NPS +58", icon: Award },
  ];
  return (
    <div className="space-y-5">
      <PageHead title="Program KPIs" sub="Eight metrics the steering committee tracks quarterly" />
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {kpis.map((k) => (
          <StatCard key={k.label} label={k.label} value={k.value} delta={k.delta} icon={k.icon} />
        ))}
      </div>
    </div>
  );
}

/* ── Beneficiary Performance ────────────────────────────────── */
export function BeneficiaryPerformance() {
  return (
    <div className="space-y-5">
      <PageHead
        title="Beneficiary performance"
        sub="Milestone completion, jobs and revenue for funded startups"
        action={<Chip tone="amber" className="px-3 py-1.5">1 under watch</Chip>}
      />
      <Panel pad={false}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] text-left">
            <thead>
              <tr className="border-b border-line">
                {["Startup", "Scheme", "Funding", "Milestones", "Jobs", "Revenue", "Status"].map((h) => (
                  <th key={h} className="px-5 py-3.5 font-mono text-[9.5px] font-medium tracking-[0.16em] text-slate-400 uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {BENEFICIARIES.map((b) => (
                <tr key={b.startup} className="transition-colors hover:bg-soft">
                  <td className="px-5 py-4 text-[13px] font-semibold text-ink">{b.startup}</td>
                  <td className="px-5 py-4 text-[11.5px] text-slate-500">{b.scheme}</td>
                  <td className="px-5 py-4 font-mono text-[12px] text-ink">{b.funding}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <Bar pct={b.milestones} className="w-16" barClass={b.milestones < 50 ? "bg-amber-dim" : "bg-rise"} />
                      <span className="font-mono text-[11px]">{b.milestones}%</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 font-mono text-[11.5px] text-slate-500">{b.jobs}</td>
                  <td className="px-5 py-4 text-[12px] text-slate-600">{b.revenue}</td>
                  <td className="px-5 py-4"><Chip tone={b.status === "On track" ? "rise" : "amber"}>{b.status}</Chip></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
      <div className="rounded-xl border border-amber-dim/25 bg-amber-tint px-5 py-4 text-[13px] leading-relaxed text-ink">
        <b className="text-amber-dim">Watch:</b> GridLoom milestone review flagged field-deployment
        delays — program officer visit scheduled; tranche held per SOP.
      </div>
    </div>
  );
}

/* ── Funding Performance ────────────────────────────────────── */
export function FundingPerformance() {
  const f = FUNDING_PERFORMANCE;
  return (
    <div className="space-y-5">
      <PageHead title="Funding performance" sub="Effectiveness of every rupee routed through programs" />
      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Efficiency metrics" sub="FY26 · verified Mar 26">
          <ul className="space-y-4">
            {[
              { l: "Utilization rate", v: `${f.utilizationRate}%`, d: "of disbursed funds deployed by beneficiaries" },
              { l: "Cost per beneficiary", v: f.costPerBeneficiary, d: "fully-loaded incl. program ops" },
              { l: "Leverage", v: f.effectiveness, d: "private capital unlocked per government rupee" },
              { l: "Timeliness", v: f.timeliness, d: "milestone → wire" },
            ].map((x) => (
              <li key={x.l} className="flex items-start justify-between gap-4 border-b border-line pb-3.5 last:border-0">
                <div>
                  <p className="text-[13px] font-semibold text-ink">{x.l}</p>
                  <p className="text-[11.5px] text-slate-400">{x.d}</p>
                </div>
                <span className="shrink-0 font-mono text-[14px] font-semibold text-accent">{x.v}</span>
              </li>
            ))}
          </ul>
        </Panel>
        <Panel title="Utilization curve" sub="Utilization % of disbursed funds · 12M">
          <Spark points={[52, 55, 58, 56, 61, 64, 66, 64, 69, 72, 75, 77]} className="h-20 w-full" />
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-lg bg-rise-tint p-3.5 text-center">
              <p className="text-[15px] font-semibold text-rise">+17 pts</p>
              <p className="mt-0.5 text-[10px] text-slate-500">since milestone model</p>
            </div>
            <div className="rounded-lg bg-soft p-3.5 text-center">
              <p className="text-[15px] font-semibold text-ink">0</p>
              <p className="mt-0.5 text-[10px] text-slate-500">misuse flags this FY</p>
            </div>
          </div>
        </Panel>
      </div>
    </div>
  );
}

/* ── Outcome Tracking ───────────────────────────────────────── */
export function OutcomeTracking() {
  return (
    <div className="space-y-5">
      <PageHead
        title="Outcome tracking"
        sub="What programs actually changed — startup, funding, employment, innovation, market and long-term outcomes"
        action={<Chip tone="rise" className="px-3 py-1.5"><Target className="h-3 w-3" /> Evidence-linked</Chip>}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {OUTCOMES.map((o) => (
          <Panel key={o.category} className="transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft">
            <Chip tone={o.tone}>{o.category}</Chip>
            <p className="mt-3 text-[16px] leading-snug font-semibold tracking-[-0.01em] text-ink">{o.value}</p>
            <p className="mt-3 border-t border-line pt-3 font-mono text-[9.5px] tracking-[0.12em] text-slate-400 uppercase">
              FY26 · verified · audit-linked
            </p>
          </Panel>
        ))}
      </div>
    </div>
  );
}
