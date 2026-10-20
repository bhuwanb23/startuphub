import {
  ArrowRight,
  Building2,
  Landmark,
  Radar,
  Save,
  Search,
  Sparkles,
  Star,
  TrendingUp,
} from "lucide-react";
import { Bar, Chip, Panel, ScoreRing } from "@/components/app/widgets";
import { PageHead } from "@/components/app/boards";
import {
  DEMAND_RADAR,
  PROVIDER_MATCHES,
  PROVIDER_OPPORTUNITIES,
} from "../../constants/provider-data";

/* ── Resource Discovery (demand side) ───────────────────────── */
export function MarketplaceDiscovery() {
  return (
    <div className="space-y-5">
      <PageHead
        title="Resource discovery"
        sub="Live demand radar — what startups are searching for, at what budget"
        action={<Chip tone="accent" className="px-3 py-1.5"><Radar className="h-3 w-3" /> Scanning 2,480 active startups</Chip>}
      />
      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-line bg-white p-3.5">
        <Search className="ml-2 h-4.5 w-4.5 text-slate-400" />
        <input placeholder='Search demand… e.g. "battery bench Hyderabad"' className="min-w-[220px] flex-1 bg-transparent text-[14px] text-ink outline-none placeholder:text-slate-400" />
        <button className="rounded-lg bg-accent px-5 py-2.5 text-[13px] font-semibold text-white hover:bg-accent-deep">Search</button>
      </div>

      <Panel title="Demand radar" sub="Search + request volume by need" pad={false}>
        <ul className="divide-y divide-line">
          {DEMAND_RADAR.map((d) => (
            <li key={d.need} className="flex flex-wrap items-center gap-4 px-5 py-4 transition-colors hover:bg-soft">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-rise-tint text-rise">
                <TrendingUp className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[13.5px] font-semibold text-ink">{d.need}</p>
                <p className="mt-0.5 text-[11.5px] text-slate-400">{d.sector} · budget {d.budget}</p>
              </div>
              <span className="text-[12px] font-medium text-slate-600">{d.demand}</span>
              <Chip tone="rise">{d.trend}</Chip>
            </li>
          ))}
        </ul>
      </Panel>

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { t: "High-demand this week", v: "Battery cyclers", d: "+42% — storage cohort wave" },
          { t: "Nearby demand", v: "Gachibowli cluster", d: "61 startups within 5 km" },
          { t: "Saved searches", v: "4 active", d: "Alerts: bench, GPU, cleanroom, range", icon: Save },
        ].map((x) => (
          <div key={x.t} className="rounded-xl border border-line bg-white p-4.5">
            <p className="font-mono text-[9px] tracking-[0.16em] text-slate-400 uppercase">{x.t}</p>
            <p className="mt-1.5 text-[15px] font-semibold text-ink">{x.v}</p>
            <p className="mt-1 text-[12px] text-slate-500">{x.d}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Startup Matching ───────────────────────────────────────── */
export function StartupMatching() {
  return (
    <div className="space-y-5">
      <PageHead
        title="Startup matching"
        sub="AI matches startups to your idle capacity across need, budget, location and stage"
        action={<Chip tone="accent" className="px-3 py-1.5"><Sparkles className="h-3 w-3" /> Refreshed hourly</Chip>}
      />
      <div className="space-y-4">
        {PROVIDER_MATCHES.map((m) => (
          <Panel key={m.startup} className="transition-all duration-300 hover:shadow-soft">
            <div className="grid items-center gap-5 lg:grid-cols-[260px_1fr_auto]">
              <div className="flex items-center gap-4">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-accent text-[19px] font-bold text-white">{m.overall}</span>
                <div>
                  <h3 className="text-[16px] font-semibold text-ink">{m.startup}</h3>
                  <Chip tone={m.overall >= 90 ? "rise" : "accent"} className="mt-1.5">{m.overall >= 90 ? "Hot match" : "Strong"}</Chip>
                </div>
              </div>
              <div>
                <div className="grid grid-cols-2 gap-x-5 gap-y-2 sm:grid-cols-4">
                  {m.dims.map((d) => (
                    <div key={d.label}>
                      <div className="mb-1 flex justify-between text-[10px]">
                        <span className="text-slate-500">{d.label}</span>
                        <span className="font-mono font-semibold text-ink">{d.v}</span>
                      </div>
                      <div className="h-[4px] overflow-hidden rounded-full bg-slate-100">
                        <div className="h-full rounded-full bg-accent" style={{ width: `${d.v}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
                <p className="mt-3 text-[12.5px] leading-relaxed text-slate-500">
                  <span className="font-semibold text-accent">Why:</span> {m.why}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <button className="rounded-lg bg-accent px-4 py-2.5 text-[12.5px] font-semibold text-white hover:bg-accent-deep">{m.action}</button>
                <button className="rounded-lg border border-line px-4 py-2.5 text-[12.5px] font-semibold text-ink hover:bg-soft">
                  <Star className="mr-1 inline h-3 w-3" /> Watch
                </button>
              </div>
            </div>
          </Panel>
        ))}
      </div>
    </div>
  );
}

/* ── Recommended Startups ───────────────────────────────────── */
export function RecommendedStartups() {
  return (
    <div className="space-y-5">
      <PageHead
        title="Recommended startups"
        sub="High-potential accounts matched to your category strengths"
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {PROVIDER_MATCHES.map((m) => (
          <Panel key={m.startup} className="transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft">
            <div className="flex items-center gap-3.5">
              <ScoreRing score={m.overall} size={48} />
              <div className="min-w-0">
                <h3 className="text-[15.5px] font-semibold text-ink">{m.startup}</h3>
                <p className="mt-0.5 text-[11.5px] text-slate-400">Requires: {m.dims[0].label === "Need fit" ? "your category" : "resources"} · {m.action}</p>
              </div>
            </div>
            <p className="mt-3.5 text-[12.5px] leading-relaxed text-slate-500">{m.why}</p>
            <div className="mt-4 flex gap-2 border-t border-line pt-3.5">
              <button className="flex-1 rounded-lg bg-accent py-2 text-[12px] font-semibold text-white hover:bg-accent-deep">Contact startup</button>
              <button className="flex-1 rounded-lg border border-line py-2 text-[12px] font-semibold text-ink hover:bg-soft">Send quote</button>
            </div>
          </Panel>
        ))}
      </div>
    </div>
  );
}

/* ── Opportunities ──────────────────────────────────────────── */
export function MarketplaceOpportunities() {
  return (
    <div className="space-y-5">
      <PageHead
        title="Opportunities"
        sub="Government vendor panels, incubator anchor deals, programs and partnerships"
      />
      <div className="grid gap-4 lg:grid-cols-2">
        {PROVIDER_OPPORTUNITIES.map((o) => (
          <Panel key={o.title} className="transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className={`flex h-10 w-10 items-center justify-center rounded-lg ${o.kind === "Government" ? "bg-rise-tint text-rise" : "bg-accent-soft text-accent"}`}>
                  {o.kind === "Government" ? <Landmark className="h-4.5 w-4.5" /> : <Building2 className="h-4.5 w-4.5" />}
                </span>
                <Chip tone={o.kind === "Government" ? "rise" : "accent"}>{o.kind}</Chip>
              </div>
              <ScoreRing score={o.match} size={44} />
            </div>
            <h3 className="mt-3.5 text-[15.5px] leading-snug font-semibold text-ink">{o.title}</h3>
            <p className="mt-1.5 text-[12.5px] text-slate-500">{o.detail}</p>
            <div className="mt-4 flex items-center justify-between border-t border-line pt-3.5">
              <span className="font-mono text-[10px] tracking-[0.08em] text-amber-dim uppercase">{o.window}</span>
              <button className="flex items-center gap-1 rounded-lg bg-accent px-3.5 py-2 text-[12px] font-semibold text-white hover:bg-accent-deep">
                Apply <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          </Panel>
        ))}
      </div>
    </div>
  );
}
