import {
  ArrowUpRight,
  BarChart3,
  Download,
  FileText,
  FlaskConical,
  Gauge,
  Handshake,
  Lightbulb,
  ShoppingCart,
  TrendingUp,
} from "lucide-react";
import { Bar, Chip, Panel, Spark, StatCard } from "@/components/app/widgets";
import { PageHead } from "@/components/app/boards";
import {
  INNOVATION_SPEND,
  PILOT_ANALYTICS,
  SCOUTED_TECHS,
  PROC_HISTORY,
} from "../../constants/corporate-data";

/* ── Innovation Analytics ───────────────────────────────────── */
export function InnovationAnalytics() {
  return (
    <div className="space-y-5">
      <PageHead title="Innovation analytics" sub="Pipeline, investment, outcomes and ROI" />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="Innovation ROI" value="3.1×" delta="+0.2 Q/Q" icon={Gauge} />
        <StatCard label="Investment FY26" value="₹4.2 Cr" delta="86% deployed" icon={Lightbulb} />
        <StatCard label="Outcomes deployed" value="4 solutions" delta="2 more in review" icon={TrendingUp} />
        <StatCard label="Cycle time" value="104 days" delta="target 120" icon={FlaskConical} />
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Investment trajectory" sub="₹ L / month · 12M">
          <Spark points={INNOVATION_SPEND} className="h-24 w-full" />
          <p className="mt-3 text-[12px] text-slate-500">Peak deployment in Oct (₹4.8 L/mo equivalent run) as pilot fleet scaled.</p>
        </Panel>
        <Panel title="ROI by initiative" sub="Current fiscal year">
          <ul className="space-y-3">
            {[
              { l: "QC stations (CropLens)", v: 88 },
              { l: "Soil MRV (Terragrid)", v: 76 },
              { l: "Cold-chain ML (Frostat)", v: 54 },
              { l: "Packaging (BioShell PoC)", v: 24 },
            ].map((x) => (
              <li key={x.l} className="flex items-center gap-3">
                <span className="w-44 text-[12px] text-slate-500">{x.l}</span>
                <Bar pct={x.v} className="flex-1" barClass={x.v >= 70 ? "bg-rise" : "bg-accent"} />
                <span className="w-14 text-right font-mono text-[11px] font-semibold text-ink">{(x.v / 25).toFixed(1)}×</span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </div>
  );
}

/* ── Startup Analytics ──────────────────────────────────────── */
export function StartupAnalytics() {
  return (
    <div className="space-y-5">
      <PageHead title="Startup analytics" sub="Scouting funnel, engagement and outcomes" />
      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Scouting funnel" sub="Rolling 12 months">
          <ul className="space-y-3">
            {[
              { l: "Scouted", n: 214 }, { l: "Qualified", n: 96 }, { l: "Evaluated", n: 38 },
              { l: "Piloted", n: 12 }, { l: "Partnered / deployed", n: 6 },
            ].map((s) => (
              <li key={s.l} className="flex items-center gap-3.5">
                <span className="w-36 text-[12px] font-medium text-slate-600">{s.l}</span>
                <Bar pct={(s.n / 214) * 100} className="flex-1" barClass={s.n <= 12 ? "bg-rise" : "bg-accent"} />
                <span className="w-8 text-right font-mono text-[11.5px] font-semibold text-ink">{s.n}</span>
              </li>
            ))}
          </ul>
        </Panel>
        <Panel title="Engagement by sector" sub="Where our scouting effort concentrates">
          <ul className="space-y-3">
            {[
              { l: "Agritech", pct: 38 }, { l: "ClimateTech", pct: 22 }, { l: "Logistics / Cold", pct: 16 },
              { l: "Materials", pct: 12 }, { l: "HealthTech (adjacent)", pct: 8 }, { l: "Other", pct: 4 },
            ].map((s) => (
              <li key={s.l} className="flex items-center gap-3">
                <span className="w-32 text-[12px] text-slate-500">{s.l}</span>
                <Bar pct={s.pct * 2.4} className="flex-1" />
                <span className="w-8 text-right font-mono text-[11px] font-semibold text-ink">{s.pct}%</span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </div>
  );
}

/* ── Technology Analytics ───────────────────────────────────── */
export function TechnologyAnalytics() {
  return (
    <div className="space-y-5">
      <PageHead title="Technology analytics" sub="Maturity pipeline, adoption and investment themes" />
      <Panel pad={false}>
        <ul className="divide-y divide-line">
          {SCOUTED_TECHS.map((t) => (
            <li key={t.tech} className="flex items-center gap-4 px-5 py-4">
              <Chip tone="ink" className="w-14 justify-center">{t.trl}</Chip>
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-semibold text-ink">{t.tech}</p>
                <p className="font-mono text-[9.5px] tracking-[0.06em] text-slate-400 uppercase">{t.providers} · {t.maturity}</p>
              </div>
              <div className="hidden w-32 sm:block">
                <Bar pct={t.maturity === "Deployable" ? 90 : t.maturity === "Pilotable" ? 60 : 30} className="w-full" barClass={t.maturity === "Deployable" ? "bg-rise" : "bg-accent"} />
              </div>
            </li>
          ))}
        </ul>
      </Panel>
      <Panel title="Adoption curve" sub="Watch → deploy across themes">
        <Spark points={[8, 10, 14, 17, 22, 26, 31, 34, 40, 43, 49, 54]} className="h-16 w-full" />
        <p className="mt-2 text-[12px] text-slate-500">Mature technologies per quarter: adoption nearly doubled since scouting cadence became systematic.</p>
      </Panel>
    </div>
  );
}

/* ── Pilot Analytics ────────────────────────────────────────── */
export function PilotAnalytics() {
  const p = PILOT_ANALYTICS;
  return (
    <div className="space-y-5">
      <PageHead title="Pilot analytics" sub="Success, deployment and ROI across 21 pilots" />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="Total pilots" value={String(p.total)} delta="FY24–26" icon={FlaskConical} />
        <StatCard label="Pilot success rate" value={`${p.successRate}%`} delta="target 55%" icon={Gauge} />
        <StatCard label="Deployment rate" value={`${p.deploymentRate}%`} delta="pilot → production" icon={TrendingUp} />
        <StatCard label="Avg. pilot ROI" value={p.avgRoi} delta="measured at Y1" icon={Gauge} />
      </div>
      <Panel title="Pilot outcomes" sub="Lifetime distribution">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {p.outcomes.map((o) => (
            <div key={o.label} className={`rounded-xl border p-5 text-center ${o.tone === "rise" ? "border-rise/20 bg-rise-tint" : o.tone === "accent" ? "border-accent/20 bg-accent-mist" : "bg-soft"}`}>
              <p className="text-[28px] font-semibold tracking-tight text-ink">{o.n}</p>
              <p className="mt-1 text-[11.5px] text-slate-500">{o.label}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-[11.5px] text-slate-400">Avg. pilot cost {p.avgCost} · avg. decision time 118 days → 104 days after gate automation.</p>
      </Panel>
    </div>
  );
}

/* ── Partnership Analytics ──────────────────────────────────── */
export function PartnershipAnalytics() {
  return (
    <div className="space-y-5">
      <PageHead title="Partnership analytics" sub="Value, ROI and strategic impact" />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <StatCard label="Partnership value" value="₹5.8 Cr pot." delta="+₹4.2 Cr this FY" icon={Handshake} />
        <StatCard label="Portfolio ROI" value="3.4×" delta="weighted average" icon={Gauge} />
        <StatCard label="Avg. score" value="86/100" delta="6 active partners" icon={BarChart3} />
      </div>
      <Panel title="Value by partner type" sub="Current pipeline estimates">
        <ul className="space-y-3">
          {[
            { l: "Solution partnerships", v: "₹4.4 Cr", pct: 100 },
            { l: "Data & MRV partnerships", v: "₹1.3 Cr", pct: 30 },
            { l: "Research / talent", v: "strategic (non-monetized)", pct: 52 },
          ].map((x) => (
            <li key={x.l} className="flex items-center gap-3">
              <span className="w-48 text-[12px] text-slate-500">{x.l}</span>
              <Bar pct={x.pct} className="flex-1" />
              <span className="w-28 text-right text-[11.5px] font-semibold text-ink">{x.v}</span>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}

/* ── Procurement Analytics ──────────────────────────────────── */
export function ProcurementAnalytics() {
  return (
    <div className="space-y-5">
      <PageHead title="Procurement analytics" sub="Spend, savings, vendors and startup-lane performance" />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="Startup procurement FY26" value="₹1.9 Cr" delta="+58% YoY" icon={ShoppingCart} />
        <StatCard label="Verified savings" value="₹2.7 Cr" delta="measured, not claimed" icon={Gauge} />
        <StatCard label="Vendor rating avg." value="4.4★" delta="18 vendors" icon={BarChart3} />
        <StatCard label="Fast-track adoption" value="71%" delta="of startup deals" icon={ArrowUpRight} />
      </div>
      <Panel title="Completed procurement — outcomes" pad={false}>
        <ul className="divide-y divide-line">
          {PROC_HISTORY.map((h) => (
            <li key={h.item} className="flex flex-wrap items-center gap-4 px-5 py-4">
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-semibold text-ink">{h.item}</p>
                <p className="mt-0.5 text-[11px] text-slate-400">{h.vendor} · {h.supplier}</p>
              </div>
              <span className="font-mono text-[12px] font-semibold text-ink">{h.value}</span>
              <Chip tone="rise">{h.saving}</Chip>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}
