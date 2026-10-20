import {
  BadgeIndianRupee,
  Briefcase,
  Landmark,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  TrendingUp,
  Users,
} from "lucide-react";
import { Bar, Chip, Panel, StatCard } from "@/components/app/widgets";
import { PageHead } from "@/components/app/boards";
import {
  EMPLOYMENT_ANALYTICS,
  FUNDING_ANALYTICS,
  GROWTH_ANALYTICS,
  IPR_ANALYTICS,
} from "../../constants/intel-data";

/* ── Funding Analytics ──────────────────────────────────────── */
export function FundingAnalytics() {
  const f = FUNDING_ANALYTICS;
  return (
    <div className="space-y-5">
      <PageHead title="Funding analytics" sub="Government + private capital flows into the ecosystem" />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="Total funding (12M)" value={f.total.split(" in")[0]} delta="+31.2% YoY" icon={TrendingUp} />
        <StatCard label="Government share" value={`${f.govt.pct}%`} sub={f.govt.v} icon={Landmark} />
        <StatCard label="Private share" value={`${f.private.pct}%`} sub={f.private.v} icon={BadgeIndianRupee} />
        <StatCard label="Seed-stage gap" value="₹640 Cr/yr" delta="geographic, not total" icon={Briefcase} deltaGood={false} />
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Funding by stage" sub="Share of 12M deal value">
          {f.byStage.map((s) => (
            <div key={s.label} className="mb-3 flex items-center gap-3">
              <span className="w-20 text-[12px] text-slate-500">{s.label}</span>
              <Bar pct={s.pct * 2.8} className="flex-1" />
              <span className="w-8 text-right font-mono text-[11.5px] font-semibold text-ink">{s.pct}%</span>
            </div>
          ))}
          <p className="mt-4 text-[11.5px] text-slate-400">Seed + Series A = 60% of deal count but only 41% of value.</p>
        </Panel>
        <Panel title="The gap" sub="Where policy must land" action={<Chip tone="amber">₹640 Cr</Chip>}>
          <p className="text-[13.5px] leading-relaxed text-ink">{f.gap.amount}</p>
          <p className="mt-2 text-[12.5px] leading-relaxed text-slate-500">{f.gap.note}</p>
          <a href="/government/policy/recommendations" className="mt-3 inline-block text-[12.5px] font-semibold text-accent">
            See the P1 recommendation →
          </a>
        </Panel>
      </div>
    </div>
  );
}

/* ── Employment Analytics ───────────────────────────────────── */
export function EmploymentAnalytics() {
  const e = EMPLOYMENT_ANALYTICS;
  return (
    <div className="space-y-5">
      <PageHead title="Employment analytics" sub="Direct + indirect jobs created by the startup ecosystem" />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="Total jobs" value={e.total} delta={`${e.growth} YoY`} icon={Users} />
        <StatCard label="Direct employment" value={e.direct} delta="64% of total" icon={Briefcase} />
        <StatCard label="Indirect employment" value={e.indirect} delta="supply-chain linked" icon={TrendingUp} />
        <StatCard label="Skilled share" value="62%" delta="+4 pts YoY" icon={Sparkles} />
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Jobs by sector" sub="Direct employment">
          <ul className="space-y-3">
            {e.bySector.map((s) => (
              <li key={s.label} className="flex items-center gap-3">
                <span className="w-24 text-[12px] text-slate-500">{s.label}</span>
                <Bar pct={(s.n / 13140) * 100} className="flex-1" />
                <span className="w-14 text-right font-mono text-[11.5px] font-semibold text-ink">{s.n.toLocaleString("en-IN")}</span>
              </li>
            ))}
          </ul>
        </Panel>
        <Panel title="Skill demand" sub="Open roles across ecosystem — feed to universities" action={<Stethoscope className="h-4 w-4 text-slate-300" />}>
          <div className="flex flex-wrap gap-2">
            {e.skillDemand.map((s) => <Chip key={s} tone="accent" className="px-3 py-1.5">{s}</Chip>)}
          </div>
          <div className="mt-5 rounded-lg bg-amber-tint p-3.5 text-[12.5px] leading-relaxed text-ink">
            2,400 open ML-engineering roles vs. constrained supply — co-op expansion
            proposal is in Gap Analysis.
          </div>
        </Panel>
      </div>
    </div>
  );
}

/* ── IPR Analytics ──────────────────────────────────────────── */
export function IprAnalytics() {
  const i = IPR_ANALYTICS;
  return (
    <div className="space-y-5">
      <PageHead title="IPR analytics" sub="Filings, grants and commercialization across the state" />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        <StatCard label="Patents filed" value={i.filed} delta="+27.6% YoY" icon={ShieldCheck} />
        <StatCard label="Patents granted" value={i.granted} delta="36% conversion" icon={ShieldCheck} />
        <StatCard label="Trademarks" value={i.trademarks} icon={ShieldCheck} sub="registered" />
        <StatCard label="Designs" value={i.designs} icon={ShieldCheck} sub="registered" />
        <StatCard label="Commercialized IP" value={i.commercialized} delta={i.trend} icon={TrendingUp} />
      </div>
      <Panel title="Filings by sector" sub="Last 12 months">
        <ul className="space-y-3">
          {i.bySector.map((s) => (
            <li key={s.label} className="flex items-center gap-3">
              <span className="w-24 text-[12px] text-slate-500">{s.label}</span>
              <Bar pct={(s.n / 804) * 100} className="flex-1" barClass="bg-rise" />
              <span className="w-10 text-right font-mono text-[11.5px] font-semibold text-ink">{s.n}</span>
            </li>
          ))}
        </ul>
        <div className="mt-5 rounded-lg bg-rise-tint p-3.5 text-[12.5px] leading-relaxed text-ink">
          Commercialization +38% YoY after the IPR desk launched free FTO scans and the
          patent reimbursement scheme — evidence cited in Policy Insights.
        </div>
      </Panel>
    </div>
  );
}

/* ── Growth Analytics ───────────────────────────────────────── */
export function GrowthAnalytics() {
  return (
    <div className="space-y-5">
      <PageHead title="Growth analytics" sub="Year-over-year expansion of every ecosystem lever" />
      <div className="grid gap-4 sm:grid-cols-2">
        {GROWTH_ANALYTICS.map((g) => (
          <Panel key={g.metric}>
            <div className="flex items-end justify-between">
              <div>
                <p className="font-mono text-[9.5px] tracking-[0.16em] text-slate-400 uppercase">{g.metric}</p>
                <p className="mt-1.5 text-[24px] font-semibold tracking-[-0.03em] text-ink">{g.current}</p>
              </div>
              <Chip tone="rise"><TrendingUp className="h-3 w-3" /> {g.yoy}</Chip>
            </div>
            <div className="mt-4 flex h-16 items-end gap-1">
              {g.series.map((v, i) => {
                const max = Math.max(...g.series);
                return (
                  <div key={i} className={`flex-1 rounded-t-sm ${i >= g.series.length - 3 ? "bg-rise" : "bg-rise/25"}`} style={{ height: `${(v / max) * 56 + 6}px` }} />
                );
              })}
            </div>
            <p className="mt-2 font-mono text-[9px] text-slate-400">12-MONTH TRAJECTORY</p>
          </Panel>
        ))}
      </div>
    </div>
  );
}
