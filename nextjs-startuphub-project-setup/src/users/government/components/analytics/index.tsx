import {
  BarChart3,
  Globe2,
  MapPin,
  Rocket,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";
import { Bar, Chip, Panel, Spark, StatCard } from "@/components/app/widgets";
import { PageHead } from "@/components/app/boards";
import {
  DECLINING_SECTORS,
  EMERGING_SECTORS,
  REGIONAL_ANALYTICS,
  SECTOR_ANALYTICS,
  STARTUP_ANALYTICS,
} from "../../constants/intel-data";
import { GOV_STATS, REGISTRATION_SERIES } from "../../constants/gov-data";

/* ── Ecosystem Analytics ────────────────────────────────────── */
export function EcosystemAnalytics() {
  const s = GOV_STATS;
  return (
    <div className="space-y-5">
      <PageHead title="Ecosystem analytics" sub="The state's innovation economy at a glance" />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="Startup population" value={s.registered} delta={s.growth} icon={Rocket} />
        <StatCard label="Total funding (12M)" value="₹2,860 Cr" delta="+31.2% YoY" icon={TrendingUp} />
        <StatCard label="Direct employment" value="31.0K" delta="+19.8% YoY" icon={Users} />
        <StatCard label="Patent filings" value={s.patents} delta="+27.6% YoY" icon={BarChart3} />
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        <Panel title="Formation momentum" sub="Registrations / month · 12M" className="lg:col-span-2">
          <div className="flex h-36 items-end gap-2">
            {REGISTRATION_SERIES.map((v, i) => {
              const max = Math.max(...REGISTRATION_SERIES);
              return (
                <div key={i} className="group relative flex-1">
                  <div className={`w-full rounded-t-md ${i >= 9 ? "bg-accent" : "bg-accent/25"}`} style={{ height: `${(v / max) * 130 + 6}px` }} />
                  <span className="pointer-events-none absolute -top-6 left-1/2 -translate-x-1/2 rounded bg-ink px-1.5 py-0.5 font-mono text-[9px] text-white opacity-0 transition-opacity group-hover:opacity-100">{v}</span>
                </div>
              );
            })}
          </div>
          <div className="mt-2 flex justify-between font-mono text-[9px] text-slate-400">
            <span>Apr'25</span><span>Aug'25</span><span>Mar'26</span>
          </div>
        </Panel>
        <Panel title="Ecosystem posture" sub="Composite health view">
          <ul className="space-y-3.5">
            {[
              { l: "Formation engine", v: 88, t: "Accelerating" },
              { l: "Capital attraction", v: 76, t: "Strong" },
              { l: "Job creation", v: 81, t: "Strong" },
              { l: "Innovation output", v: 72, t: "Improving" },
              { l: "Regional balance", v: 48, t: "Needs focus" },
            ].map((x) => (
              <li key={x.l} className="flex items-center gap-3">
                <span className="w-32 text-[12px] text-slate-500">{x.l}</span>
                <Bar pct={x.v} className="flex-1" barClass={x.v < 55 ? "bg-amber-dim" : "bg-accent"} />
                <Chip tone={x.v < 55 ? "amber" : "rise"} className="w-24 justify-center">{x.t}</Chip>
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
  const a = STARTUP_ANALYTICS;
  return (
    <div className="space-y-5">
      <PageHead title="Startup analytics" sub="Survival, revenue, health and stage composition" />
      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Survival rates" sub="Verified cohorts tracked from registration">
          <div className="grid grid-cols-3 gap-3">
            {a.survival.map((s) => (
              <div key={s.label} className="rounded-xl border border-line p-4 text-center">
                <p className="text-[24px] font-semibold tracking-tight text-rise">{s.pct}%</p>
                <p className="mt-1 text-[10.5px] text-slate-400">{s.label}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-lg bg-rise-tint p-3.5 text-[12.5px] leading-relaxed text-ink">
            44% five-year survival vs 21% national baseline — the scheme + incubation stack
            shows measurable premium.
          </div>
        </Panel>
        <Panel title="Health distribution" sub="Explainer: monthly KPI-engagement score">
          <div className="grid grid-cols-2 gap-3">
            {a.healthSplit.map((h) => (
              <div key={h.label} className={`rounded-xl border p-4 text-center ${h.tone === "rise" ? "border-rise/20 bg-rise-tint" : h.tone === "accent" ? "border-accent/20 bg-accent-mist" : h.tone === "amber" ? "border-amber-dim/20 bg-amber-tint" : "bg-soft"}`}>
                <p className="text-[24px] font-semibold text-ink">{h.n}%</p>
                <p className="mt-1 font-mono text-[9px] tracking-[0.12em] text-slate-500 uppercase">{h.label}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 border-t border-line pt-4">
            <p className="mb-2.5 font-mono text-[9px] tracking-[0.18em] text-slate-400 uppercase">Revenue bands</p>
            {a.revenueBands.map((r) => (
              <div key={r.label} className="mb-2 flex items-center gap-3">
                <span className="w-32 text-[11.5px] text-slate-500">{r.label}</span>
                <Bar pct={r.pct * 2.4} className="flex-1" />
                <span className="w-8 text-right font-mono text-[11px] text-ink">{r.pct}%</span>
              </div>
            ))}
          </div>
        </Panel>
      </div>
      <Panel title="Key metrics" sub="Verified startups only">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {a.stats.map((x) => (
            <div key={x.label} className="rounded-lg bg-soft p-4 text-center">
              <p className="text-[15px] font-semibold text-ink">{x.value}</p>
              <p className="mt-1 text-[10.5px] text-slate-400">{x.label}</p>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

/* ── Sector Analytics ───────────────────────────────────────── */
export function SectorAnalytics() {
  return (
    <div className="space-y-5">
      <PageHead title="Sector analytics" sub="Distribution, growth, funding, jobs and IPR by sector" />
      <Panel pad={false}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] text-left">
            <thead>
              <tr className="border-b border-line">
                {["Sector", "Startups", "Growth", "Funding (12M)", "Jobs", "IPR filings"].map((h) => (
                  <th key={h} className="px-5 py-3.5 font-mono text-[9.5px] font-medium tracking-[0.16em] text-slate-400 uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {SECTOR_ANALYTICS.map((s) => (
                <tr key={s.sector} className="transition-colors hover:bg-soft">
                  <td className="px-5 py-4 text-[13px] font-semibold text-ink">{s.sector}</td>
                  <td className="px-5 py-4 font-mono text-[12px] text-slate-500">{s.startups}</td>
                  <td className="px-5 py-4 text-[12.5px] font-medium text-rise">{s.growth}</td>
                  <td className="px-5 py-4 font-mono text-[12px] text-ink">{s.funding}</td>
                  <td className="px-5 py-4 font-mono text-[12px] text-slate-500">{s.jobs}</td>
                  <td className="px-5 py-4 font-mono text-[12px] text-slate-500">{s.ipr}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Emerging sectors" sub="Fastest formation momentum" action={<Sparkles className="h-4 w-4 text-accent" />}>
          <ul className="space-y-3">
            {EMERGING_SECTORS.map((s) => (
              <li key={s.name} className="flex items-center gap-4 rounded-lg border border-rise/20 bg-rise-tint p-3.5">
                <div className="flex-1">
                  <p className="text-[13px] font-semibold text-ink">{s.name}</p>
                  <p className="mt-0.5 text-[11.5px] text-slate-500">{s.note}</p>
                </div>
                <span className="font-mono text-[13px] font-bold text-rise">{s.momentum}</span>
              </li>
            ))}
          </ul>
        </Panel>
        <Panel title="Declining sectors" sub="Formation cooling — watchlist only">
          <ul className="space-y-3">
            {DECLINING_SECTORS.map((s) => (
              <li key={s.name} className="flex items-center gap-4 rounded-lg border border-line bg-soft p-3.5">
                <div className="flex-1">
                  <p className="text-[13px] font-semibold text-ink">{s.name}</p>
                  <p className="mt-0.5 text-[11.5px] text-slate-500">{s.note}</p>
                </div>
                <span className="font-mono text-[13px] font-bold text-slate-400">{s.momentum}</span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </div>
  );
}

/* ── Regional Analytics ─────────────────────────────────────── */
export function RegionalAnalytics() {
  return (
    <div className="space-y-5">
      <PageHead
        title="Regional analytics"
        sub="33 districts · density, growth, funding and incubator capacity"
        action={<Chip tone="amber" className="px-3 py-1.5"><MapPin className="h-3 w-3" /> 2 districts flagged</Chip>}
      />
      <Panel pad={false}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[920px] text-left">
            <thead>
              <tr className="border-b border-line">
                {["District", "Startups", "Density /100km²", "Growth", "Funding", "Incubators", "Jobs", "Gap signal"].map((h) => (
                  <th key={h} className="px-5 py-3.5 font-mono text-[9.5px] font-medium tracking-[0.16em] text-slate-400 uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {REGIONAL_ANALYTICS.map((r) => (
                <tr key={r.district} className="transition-colors hover:bg-soft">
                  <td className="px-5 py-4 text-[13px] font-semibold text-ink">{r.district}</td>
                  <td className="px-5 py-4 font-mono text-[12px] text-slate-500">{r.startups}</td>
                  <td className="px-5 py-4 font-mono text-[12px] text-slate-500">{r.density}</td>
                  <td className="px-5 py-4 text-[12.5px] font-medium text-rise">{r.growth}</td>
                  <td className="px-5 py-4 font-mono text-[12px] text-ink">{r.funding}</td>
                  <td className="px-5 py-4 font-mono text-[12px] text-slate-500">{r.incubators}</td>
                  <td className="px-5 py-4 font-mono text-[12px] text-slate-500">{r.jobs}</td>
                  <td className="px-5 py-4">
                    {r.gap ? <Chip tone="amber">{r.gap}</Chip> : <Chip tone="rise">On track</Chip>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-amber-dim/25 bg-amber-tint p-5 text-[13px] leading-relaxed text-ink">
          <b className="text-amber-dim">Karimnagar:</b> density 41% below target. Intervention
          memo (satellite incubator + mentor bench) goes to steering Apr 18.
        </div>
        <div className="rounded-xl border border-accent/20 bg-accent-mist p-5 text-[13px] leading-relaxed text-ink">
          <b className="text-accent">Warangal:</b> fastest formation growth (+26%) driven by the
          makerspace corridor — case study added to Regional Impact.
        </div>
      </div>
    </div>
  );
}
