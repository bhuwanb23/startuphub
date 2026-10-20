import {
  ArrowRight,
  FlaskConical,
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
  CORP_MATCHES,
  SCOUTED_TECHS,
  SOLUTIONS_SHORTLIST,
  WATCHLIST_CORP,
} from "../../constants/corporate-data";

const FILTER_GROUPS = [
  { g: "Industry", o: ["Agritech", "ClimateTech", "HealthTech", "Logistics"] },
  { g: "Technology", o: ["Computer vision", "Satellite MRV", "IoT", "Bio-materials"] },
  { g: "Stage", o: ["Pre-seed", "Seed", "Series A"] },
  { g: "Problem area", o: ["QC", "Cold-chain", "Traceability", "Packaging"] },
];

const DISCOVERY_STARTUPS = [
  { name: "CropLens AI", sector: "Agritech · CV", fit: 96, note: "Farm-gate QC stations — solves PS-014", problem: "PS-014" },
  { name: "Terragrid", sector: "ClimateTech · MRV", fit: 90, note: "Soil health scoring for supplier farms", problem: "PS-002" },
  { name: "Frostat", sector: "IoT · Cold-chain", fit: 84, note: "Predictive excursion ML on routes", problem: "PS-008" },
  { name: "BioShell", sector: "Materials · Packaging", fit: 76, note: "Compostable export films", problem: "PS-006" },
  { name: "Mandiverse", sector: "Agritech · Exchange", fit: 72, note: "Mandi price-exchange intelligence", problem: "Watch" },
  { name: "AquaMend Robotics", sector: "Robotics · Water", fit: 68, note: "Adjacent: processing-water uptime", problem: "Watch" },
];

/* ── Startup Discovery ──────────────────────────────────────── */
export function StartupDiscovery() {
  return (
    <div className="space-y-5">
      <PageHead
        title="Startup discovery"
        sub="Filtered against your open problems and industry profile"
        action={<Chip tone="accent" className="px-3 py-1.5"><Radar className="h-3 w-3" /> 34 scouted this cycle</Chip>}
      />
      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-line bg-white p-3.5">
        <Search className="ml-2 h-4.5 w-4.5 text-slate-400" />
        <input placeholder='Try "hyperspectral grading offline"' className="min-w-[220px] flex-1 bg-transparent text-[14px] text-ink outline-none placeholder:text-slate-400" />
        <button className="rounded-lg bg-accent px-5 py-2.5 text-[13px] font-semibold text-white hover:bg-accent-deep">Search</button>
      </div>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 rounded-xl border border-line bg-white p-4">
        {FILTER_GROUPS.map((f) => (
          <div key={f.g} className="flex items-center gap-2">
            <span className="text-[11px] font-semibold text-slate-500">{f.g}</span>
            <div className="flex gap-1">
              {f.o.slice(0, 3).map((o) => <Chip key={o} tone="line" className="cursor-pointer hover:border-accent/40 hover:text-accent">{o}</Chip>)}
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {DISCOVERY_STARTUPS.map((s) => (
          <Panel key={s.name} className="group transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-[15.5px] font-semibold tracking-[-0.01em] text-ink">{s.name}</h3>
                <p className="mt-0.5 font-mono text-[9.5px] tracking-[0.08em] text-slate-400 uppercase">{s.sector}</p>
              </div>
              <ScoreRing score={s.fit} size={44} />
            </div>
            <p className="mt-2.5 text-[12.5px] leading-relaxed text-slate-600">{s.note}</p>
            <div className="mt-4 flex items-center gap-2 border-t border-line pt-3.5">
              <Chip tone={s.problem === "Watch" ? "slate" : "amber"}>{s.problem === "Watch" ? "Watch area" : s.problem}</Chip>
              <a href="/corporate/evaluation" className="ml-auto flex items-center gap-1 text-[12px] font-semibold text-accent">
                Evaluate <ArrowRight className="h-3 w-3" />
              </a>
              <button aria-label="Watchlist" className="flex h-7.5 w-7.5 items-center justify-center rounded-lg border border-line text-slate-400 hover:text-amber-dim">
                <Star className="h-3.5 w-3.5" />
              </button>
            </div>
          </Panel>
        ))}
      </div>
    </div>
  );
}

/* ── AI Startup Matching ────────────────────────────────────── */
export function CorporateMatching() {
  return (
    <div className="space-y-5">
      <PageHead
        title="AI startup matching"
        sub="Problem-first matching — every score explains itself"
        action={<Chip tone="accent" className="px-3 py-1.5"><Sparkles className="h-3 w-3" /> Refreshed hourly</Chip>}
      />
      <div className="space-y-4">
        {CORP_MATCHES.map((m) => (
          <Panel key={m.startup} className="transition-all duration-300 hover:shadow-soft">
            <div className="grid items-center gap-5 lg:grid-cols-[250px_1fr_auto]">
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
                  <Star className="mr-1 inline h-3 w-3" /> Watchlist
                </button>
              </div>
            </div>
          </Panel>
        ))}
      </div>
    </div>
  );
}

/* ── Technology Scouting ────────────────────────────────────── */
export function TechnologyScouting() {
  return (
    <div className="space-y-5">
      <PageHead
        title="Technology scouting"
        sub="Emerging technologies, TRL, maturity and provider landscape"
        action={<FlaskConical className="h-4 w-4 text-slate-300" />}
      />
      <Panel pad={false}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-left">
            <thead>
              <tr className="border-b border-line">
                {["Technology", "TRL", "Maturity", "Providers", "Scout note"].map((h) => (
                  <th key={h} className="px-5 py-3.5 font-mono text-[9.5px] font-medium tracking-[0.16em] text-slate-400 uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {SCOUTED_TECHS.map((t) => (
                <tr key={t.tech} className="transition-colors hover:bg-soft">
                  <td className="px-5 py-4 text-[13px] font-semibold text-ink">{t.tech}</td>
                  <td className="px-5 py-4"><Chip tone="ink">{t.trl}</Chip></td>
                  <td className="px-5 py-4">
                    <Chip tone={t.maturity === "Deployable" ? "rise" : t.maturity === "Pilotable" ? "accent" : "amber"}>{t.maturity}</Chip>
                  </td>
                  <td className="px-5 py-4 text-[12px] text-slate-500">{t.providers}</td>
                  <td className="px-5 py-4 text-[12px] leading-relaxed text-slate-500">{t.watch}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
      <Panel title="Patent & research watch" sub="Emerging filings adjacent to your themes">
        <ul className="space-y-2.5 text-[12.5px] text-slate-600">
          {[
            "Multi-modal crop fusion grading — 3 new filings (2 universities, 1 startup)",
            "Predictive cold-chain excursion ML — 4 filings this quarter",
            "Compostable high-barrier films — filing velocity 2.1× baseline",
            "Soil spectroscopy MRV calibration — 1 university lab with spin-out potential",
          ].map((p) => (
            <li key={p} className="flex gap-2.5 rounded-lg border border-line p-3.5">
              <TrendingUp className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />{p}
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}

/* ── Solution Discovery ─────────────────────────────────────── */
export function SolutionDiscovery() {
  return (
    <div className="space-y-5">
      <PageHead
        title="Solution discovery"
        sub="Compare options for a problem before committing to a pilot"
        action={<Chip tone="accent" className="px-3 py-1.5">Problem · PS-014 farm-gate QC</Chip>}
      />
      <Panel pad={false}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-left">
            <thead>
              <tr className="border-b border-line">
                {["Solution", "Provider", "Problem fit", "Cost", "ROI", "Complexity", "Decision"].map((h) => (
                  <th key={h} className="px-5 py-3.5 font-mono text-[9.5px] font-medium tracking-[0.16em] text-slate-400 uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {SOLUTIONS_SHORTLIST.map((s, i) => (
                <tr key={s.solution} className={i === 0 ? "bg-accent-mist" : "transition-colors hover:bg-soft"}>
                  <td className="px-5 py-4 text-[13px] font-semibold text-ink">{s.solution}</td>
                  <td className="px-5 py-4 text-[12px] text-slate-500">{s.startup}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <Bar pct={s.fitP} className="w-16" barClass={s.fitP >= 90 ? "bg-rise" : s.fitP >= 70 ? "bg-accent" : "bg-slate-300"} />
                      <span className="font-mono text-[11px] font-bold text-ink">{s.fitP}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 font-mono text-[11.5px] text-slate-500">{s.cost}</td>
                  <td className="px-5 py-4 font-mono text-[11.5px] text-ink">{s.roi}</td>
                  <td className="px-5 py-4"><Chip tone={s.complexity === "Low" ? "rise" : "amber"}>{s.complexity}</Chip></td>
                  <td className="px-5 py-4">
                    {i === 0 ? <Chip tone="rise">In pilot</Chip> : i === 1 ? <Chip tone="accent">Backup</Chip> : <Chip tone="slate">Status quo</Chip>}
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

/* ── Startup Watchlist ──────────────────────────────────────── */
export function StartupWatchlist() {
  return (
    <div className="space-y-5">
      <PageHead
        title="Startup watchlist"
        sub="Saved startups with live product, funding and partnership updates"
        action={<button className="flex items-center gap-1.5 rounded-lg border border-line bg-white px-4 py-2.5 text-[13px] font-semibold text-ink hover:bg-soft"><Star className="h-3.5 w-3.5 text-slate-400" /> Add startup</button>}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {WATCHLIST_CORP.map((w) => (
          <Panel key={w.name} className="transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-[15.5px] font-semibold text-ink">{w.name}</h3>
                <Chip tone={w.type.startsWith("Direct") ? "accent" : w.type.startsWith("Strategic") ? "rise" : "slate"} className="mt-1.5">{w.type}</Chip>
              </div>
              <Radar className="h-4 w-4 text-slate-300" />
            </div>
            <p className="mt-3.5 text-[12.5px] font-medium text-rise">{w.momentum}</p>
            <div className="mt-3 flex items-center gap-2 rounded-lg bg-amber-tint px-3 py-2.5">
              <Star className="h-3.5 w-3.5 shrink-0 fill-amber-dim/20 text-amber-dim" />
              <p className="text-[11.5px] font-medium text-amber-dim">Trigger: <span className="font-semibold">{w.trigger}</span></p>
            </div>
          </Panel>
        ))}
      </div>
    </div>
  );
}
