import {
  ArrowUpRight,
  Award,
  Gauge,
  ListChecks,
  Plus,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import { Bar, Chip, Panel, StatCard } from "@/components/app/widgets";
import { PageHead } from "@/components/app/boards";
import { CORP_KPIS, PARTNERSHIPS, PILOTS } from "../../constants/corporate-data";
import { WATCHLIST_CORP } from "../../constants/corporate-data";

/* ── Performance Tracking ───────────────────────────────────── */
export function PerformanceTracking() {
  return (
    <div className="space-y-5">
      <PageHead
        title="Performance tracking"
        sub="Corporate-level innovation KPIs — reviewed by the board quarterly"
        action={<Chip tone="rise" className="px-3 py-1.5"><TrendingUp className="h-3 w-3" /> 5 of 6 KPIs trending up</Chip>}
      />
      <Panel pad={false}>
        <ul className="divide-y divide-line">
          {CORP_KPIS.map((k) => (
            <li key={k.kpi} className="grid items-center gap-3 px-5 py-4 transition-colors hover:bg-soft sm:grid-cols-[220px_1fr_auto]">
              <div>
                <p className="text-[13.5px] font-semibold text-ink">{k.kpi}</p>
                <p className="font-mono text-[9px] tracking-[0.08em] text-slate-400 uppercase">Owner · {k.owner}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[12px] text-slate-500">Target <b className="text-ink">{k.target}</b></span>
                <span className="text-[12px] text-slate-500">Actual <b className="text-rise">{k.actual}</b></span>
              </div>
              <Chip tone={k.trend === "up" ? "rise" : "accent"}>
                {k.trend === "up" ? <ArrowUpRight className="h-3 w-3" /> : null}{k.trend}
              </Chip>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}

/* ── Startup Performance ────────────────────────────────────── */
export function StartupPerformance() {
  return (
    <div className="space-y-5">
      <PageHead title="Startup performance" sub="How partner and pilot startups perform against delivery" />
      <Panel pad={false}>
        <ul className="divide-y divide-line">
          {WATCHLIST_CORP.map((s) => (
            <li key={s.name} className="grid items-center gap-3 px-5 py-4 transition-colors hover:bg-soft sm:grid-cols-[1fr_auto_auto]">
              <div>
                <p className="text-[13.5px] font-semibold text-ink">{s.name}</p>
                <p className="mt-0.5 text-[11.5px] text-slate-400">{s.type}</p>
              </div>
              <span className="text-[12px] font-medium text-rise">{s.momentum}</span>
              <Chip tone="rise">On track</Chip>
            </li>
          ))}
        </ul>
      </Panel>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="Delivery on time" value="96%" delta="partner startups" icon={Target} />
        <StatCard label="Startup health avg" value="A−" delta="external data" icon={Users} />
        <StatCard label="Escalated risks" value="1" delta="supply chain watch" icon={Gauge} deltaGood={false} />
        <StatCard label="Co-developed IP" value="6" delta="joint filings" icon={Award} />
      </div>
    </div>
  );
}

/* ── Pilot Performance ──────────────────────────────────────── */
export function PilotPerformance() {
  return (
    <div className="space-y-5">
      <PageHead title="Pilot performance" sub="Cost, efficiency, ROI and user feedback across active pilots" />
      <Panel pad={false}>
        <ul className="divide-y divide-line">
          {PILOTS.map((p) => (
            <li key={p.id} className="grid items-center gap-4 px-5 py-4.5 transition-colors hover:bg-soft lg:grid-cols-[1fr_220px_auto]">
              <div>
                <p className="text-[13.5px] font-semibold text-ink">{p.name}</p>
                <p className="mt-0.5 text-[11.5px] text-slate-400">{p.startup} · {p.bu} · budget {p.budget}</p>
              </div>
              <div className="flex items-center gap-3">
                <Bar pct={p.kpis} className="flex-1" barClass={p.kpis >= 70 ? "bg-rise" : "bg-accent"} />
                <span className="w-8 font-mono text-[11px] font-bold text-ink">{p.kpis}%</span>
              </div>
              <Chip tone={p.kpis >= 70 ? "rise" : "accent"}>{p.kpis >= 70 ? "Ahead" : "In flight"}</Chip>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}

/* ── Solution Performance ───────────────────────────────────── */
export function SolutionPerformance() {
  const sols = [
    { name: "QC stations (deployed)", reliability: "99.2%", adoption: "12/12 points live", impact: "₹1.2 Cr/yr recovered", uptime: 92 },
    { name: "Soil MRV feed", reliability: "99.8%", adoption: "3,900/4,000 farms", impact: "audit -38% cost", uptime: 97 },
    { name: "Forecasting (Terragrid weather)", reliability: "97.4%", adoption: "2 BUs", impact: "planning accuracy +11pts", uptime: 84 },
    { name: "Cold telemetry (pilot)", reliability: "98.9%", adoption: "8/26 routes", impact: "excursion -44%", uptime: 79 },
  ];
  return (
    <div className="space-y-5">
      <PageHead title="Solution performance" sub="Deployed solutions in production — reliability, adoption, impact" />
      <div className="grid gap-4 sm:grid-cols-2">
        {sols.map((s) => (
          <Panel key={s.name}>
            <h3 className="text-[15px] font-semibold text-ink">{s.name}</h3>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              {[
                { l: "Reliability", v: s.reliability },
                { l: "Adoption", v: s.adoption },
                { l: "Impact", v: s.impact },
              ].map((x) => (
                <div key={x.l} className="rounded-lg bg-soft p-2.5">
                  <p className="text-[12px] font-semibold text-ink">{x.v}</p>
                  <p className="mt-1 font-mono text-[8px] tracking-[0.08em] text-slate-400 uppercase">{x.l}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-3">
              <span className="text-[11px] text-slate-400">Health</span>
              <Bar pct={s.uptime} className="flex-1" barClass={s.uptime >= 90 ? "bg-rise" : "bg-accent"} />
              <span className="font-mono text-[11px] font-bold text-ink">{s.uptime}%</span>
            </div>
          </Panel>
        ))}
      </div>
    </div>
  );
}

/* ── Partnership Performance ────────────────────────────────── */
export function PartnershipPerformance() {
  return (
    <div className="space-y-5">
      <PageHead
        title="Partnership performance"
        sub="Strategic impact and ROI across the partnership portfolio"
      />
      <Panel pad={false}>
        <ul className="divide-y divide-line">
          {PARTNERSHIPS.filter((p) => p.stage === "Active").map((p) => (
            <li key={p.id} className="flex items-center gap-4 px-5 py-4">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-rise-tint font-mono text-[12px] font-bold text-rise">{p.score}</span>
              <div className="min-w-0 flex-1">
                <p className="text-[13.5px] font-semibold text-ink">{p.partner}</p>
                <p className="mt-0.5 text-[11.5px] text-slate-400">{p.area}</p>
              </div>
              <span className="font-mono text-[11.5px] font-semibold text-ink">{p.value}</span>
              <Chip tone="rise">Reviewed Q4</Chip>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}

/* ── KPI Management ─────────────────────────────────────────── */
export function KpiManagement() {
  return (
    <div className="space-y-5">
      <PageHead
        title="KPI management"
        sub="Library, targets, tracking and alerts for program KPIs"
        action={
          <button className="flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-accent-deep">
            <Plus className="h-3.5 w-3.5" /> Create KPI
          </button>
        }
      />
      <Panel title="KPI library" sub="Roles, owners and thresholds" pad={false}>
        <ul className="divide-y divide-line">
          {CORP_KPIS.map((k) => (
            <li key={k.kpi} className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-soft">
              <ListChecks className="h-4 w-4 shrink-0 text-slate-300" />
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-semibold text-ink">{k.kpi}</p>
                <p className="font-mono text-[9.5px] tracking-[0.08em] text-slate-400 uppercase">target {k.target} · owner {k.owner}</p>
              </div>
              <span className="font-mono text-[12px] font-semibold text-rise">{k.actual}</span>
              <Chip tone="accent">Tracked</Chip>
            </li>
          ))}
        </ul>
      </Panel>
      <Panel title="Alert rules" sub="Notify owners on breach">
        <ul className="space-y-2.5 text-[12.5px] text-slate-600">
          <li>· Innovation ROI below 2.5× for 2 consecutive quarters → CIO + CFO</li>
          <li>· Pilot KPI behind schedule for 3 weeks → BU head + innovation manager</li>
          <li>· Spend variance beyond 15% → weekly until normalized</li>
        </ul>
      </Panel>
    </div>
  );
}
