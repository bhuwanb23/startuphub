import {
  ArrowRight,
  ArrowUpRight,
  BellRing,
  Compass,
  Filter,
  History,
  Inbox,
  Radar,
  Save,
  Search,
  SlidersHorizontal,
  Sparkles,
  Star,
} from "lucide-react";
import { Avatar, Bar, Chip, Panel, ScoreRing, StatCard, Spark } from "@/components/app/widgets";
import { PageHead, StatusIcon } from "@/components/app/boards";
import {
  AI_MATCHES,
  DEAL_SOURCES,
  DISCOVERY_FILTERS,
  OPPORTUNITY_LIST,
  SAVED_SEARCHES,
  SEARCH_HISTORY,
  WATCHLIST_FEED,
} from "../../constants/ops-data";
import { INBOX_DECKS, RAISING, WATCHLIST } from "../../constants/investor-data";

/* ── Startup Discovery ──────────────────────────────────────── */
export function StartupDiscovery() {
  return (
    <div className="space-y-5">
      <PageHead
        title="Startup discovery"
        sub="Verified startups across the ecosystem — filtered to your mandate"
        action={<Chip tone="rise" className="px-3 py-1.5"><Compass className="h-3 w-3" /> 214 match your mandate</Chip>}
      />

      {/* filter ribbon */}
      <Panel pad>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <span className="flex items-center gap-2 font-mono text-[9.5px] tracking-[0.18em] text-slate-400 uppercase">
            <SlidersHorizontal className="h-3.5 w-3.5" /> Filters
          </span>
          {DISCOVERY_FILTERS.map((f) => (
            <div key={f.group} className="flex items-center gap-2">
              <span className="text-[11px] font-semibold text-slate-500">{f.group}</span>
              <div className="flex gap-1">
                {f.options.slice(0, 3).map((o) => (
                  <Chip key={o} tone="line" className="cursor-pointer transition-colors hover:border-accent/40 hover:text-accent">{o}</Chip>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Panel>

      {/* collections ribbon */}
      <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:px-0">
        {["All", "Recommended", "Featured", "Trending", "Recently added", "High-growth", "Fundraising", "Emerging"].map((c, i) => (
          <button key={c} className={`shrink-0 rounded-lg border px-3.5 py-2 text-[12.5px] font-semibold transition-colors ${i === 0 ? "border-accent bg-accent text-white" : "border-line bg-white text-slate-500 hover:text-ink"}`}>
            {c}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {RAISING.map((r) => (
          <Panel key={r.id} className="flex flex-col transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="text-[16px] font-semibold tracking-[-0.01em] text-ink">{r.name}</h3>
                <p className="mt-1 flex flex-wrap gap-1.5"><Chip tone="accent">{r.sector}</Chip><Chip tone="line">{r.stage}</Chip></p>
              </div>
              <ScoreRing score={r.score} size={44} />
            </div>
            <p className="mt-3.5 flex items-center gap-1.5 text-[12px] font-medium text-rise">
              <ArrowUpRight className="h-3.5 w-3.5" /> {r.traction}
            </p>
            <div className="mt-4">
              <div className="mb-1.5 flex justify-between text-[12px]">
                <span className="text-slate-400">Raising <span className="font-semibold text-ink">{r.ask}</span></span>
                <span className="font-mono text-[11px] text-slate-400">₹{r.raised}/{r.target} Cr</span>
              </div>
              <Bar pct={(r.raised / r.target) * 100} />
            </div>
            <div className="mt-4 flex gap-2 border-t border-line pt-4">
              <button className="flex-1 rounded-lg bg-accent py-2 text-[12.5px] font-semibold text-white hover:bg-accent-deep">Request intro</button>
              <button className="flex-1 rounded-lg border border-line py-2 text-[12.5px] font-semibold text-ink hover:bg-soft">Evaluate</button>
            </div>
          </Panel>
        ))}
      </div>
    </div>
  );
}

/* ── Startup Search ─────────────────────────────────────────── */
export function StartupSearch() {
  return (
    <div className="space-y-5">
      <PageHead title="Startup search" sub="Full-text + structured search across 10K+ startups" />

      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-line bg-white p-3.5">
        <Search className="ml-2 h-4.5 w-4.5 text-slate-400" />
        <input placeholder='Try "pathology AI Hyderday Series A under ₹20 Cr ask"…' className="min-w-[220px] flex-1 bg-transparent text-[14px] text-ink outline-none placeholder:text-slate-400" />
        <button className="flex items-center gap-1.5 rounded-lg border border-line px-3.5 py-2.5 text-[12.5px] font-semibold text-ink hover:bg-soft">
          <Filter className="h-3.5 w-3.5 text-slate-400" /> Advanced
        </button>
        <button className="rounded-lg bg-accent px-5 py-2.5 text-[13px] font-semibold text-white hover:bg-accent-deep">Search</button>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Panel title="Saved searches" sub="Alerts fire on new matches">
          <ul className="space-y-3">
            {SAVED_SEARCHES.map((s) => (
              <li key={s.name} className="group rounded-lg border border-line p-3.5 transition-colors hover:border-accent/30">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-[13px] font-semibold text-ink">{s.name}</p>
                  <Save className="h-3.5 w-3.5 fill-accent/20 text-accent" />
                </div>
                <p className="mt-1.5 flex items-center gap-2 text-[11px] text-slate-400">
                  {s.results} results · ran {s.last}
                  {s.alerts && <Chip tone="rise">Alerts on</Chip>}
                </p>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Search history" sub="Pick up where you left off">
          <ul className="space-y-2.5">
            {SEARCH_HISTORY.map((h) => (
              <li key={h.q} className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-soft">
                <History className="h-3.5 w-3.5 shrink-0 text-slate-300" />
                <span className="flex-1 truncate font-mono text-[12px] text-ink">&quot;{h.q}&quot;</span>
                <span className="font-mono text-[10px] text-slate-400">{h.results} · {h.ts}</span>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Alert settings" sub="New startup → your inbox">
          <ul className="space-y-3 text-[12.5px]">
            {[
              { l: "Instant alerts (high match only)", on: true },
              { l: "Daily digest", on: true },
              { l: "Weekly sector sweep", on: false },
            ].map((r) => (
              <li key={r.l} className="flex items-center justify-between">
                <span className="text-slate-600">{r.l}</span>
                <span className={`flex h-5 w-9 items-center rounded-full px-0.5 ${r.on ? "justify-end bg-accent" : "justify-start bg-slate-200"}`}>
                  <span className="h-4 w-4 rounded-full bg-white shadow-sm" />
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-center gap-2 rounded-lg bg-accent-mist px-3 py-2.5 text-[11.5px] text-ink">
            <BellRing className="h-3.5 w-3.5 text-accent" /> 14 startups hit your alerts this week
          </div>
        </Panel>
      </div>
    </div>
  );
}

/* ── AI Startup Matching ────────────────────────────────────── */
export function AiMatching() {
  return (
    <div className="space-y-5">
      <PageHead
        title="AI startup matching"
        sub="Seven-dimension fit against your thesis, mandate and historical decisions"
        action={<Chip tone="accent" className="px-3 py-1.5"><Sparkles className="h-3 w-3" /> Refreshed 2h ago</Chip>}
      />

      <div className="space-y-4">
        {AI_MATCHES.map((m) => (
          <Panel key={m.id} className="transition-all duration-300 hover:shadow-soft">
            <div className="grid gap-6 lg:grid-cols-[280px_1fr_220px]">
              <div className="flex items-start gap-4">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-accent text-[19px] font-bold text-white">{m.overall}</span>
                <div>
                  <h3 className="text-[17px] font-semibold tracking-[-0.01em] text-ink">{m.name}</h3>
                  <p className="mt-0.5 font-mono text-[10px] tracking-[0.08em] text-slate-400 uppercase">{m.sector} · {m.stage}</p>
                  <div className="mt-2.5 flex gap-1.5">
                    <Chip tone="rise">Strong match</Chip>
                  </div>
                </div>
              </div>

              <div>
                <p className="mb-3 font-mono text-[9px] tracking-[0.18em] text-slate-400 uppercase">Match dimensions</p>
                <div className="grid grid-cols-2 gap-x-5 gap-y-2.5 sm:grid-cols-4">
                  {m.dims.slice(0, 7).map((d) => (
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
                <p className="mt-4 text-[12.5px] leading-relaxed text-slate-500">
                  <span className="font-semibold text-accent">Why this match:</span> {m.why}
                </p>
              </div>

              <div className="flex flex-col justify-between gap-3 lg:border-l lg:border-line lg:pl-5">
                <div>
                  <p className="font-mono text-[9px] tracking-[0.18em] text-slate-400 uppercase">Recommended action</p>
                  <p className="mt-1.5 text-[13px] font-semibold text-ink">{m.action}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <button className="rounded-lg bg-accent py-2.5 text-[12.5px] font-semibold text-white hover:bg-accent-deep">Start evaluation</button>
                  <button className="rounded-lg border border-line py-2.5 text-[12.5px] font-semibold text-ink hover:bg-soft">
                    <Star className="mr-1 inline h-3.5 w-3.5" /> Watchlist
                  </button>
                </div>
              </div>
            </div>
          </Panel>
        ))}
      </div>
    </div>
  );
}

/* ── Deal Flow ──────────────────────────────────────────────── */
export function DealFlow() {
  return (
    <div className="space-y-5">
      <PageHead
        title="Deal flow"
        sub="Every incoming opportunity, across every channel"
        action={
          <button className="flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-accent-deep">
            + Log sourced deal
          </button>
        }
      />

      <Panel title="Sources — this month" sub="Quality = % advancing past screen" pad={false}>
        <ul className="divide-y divide-line">
          {DEAL_SOURCES.map((s) => (
            <li key={s.label} className="flex items-center gap-4 px-5 py-3.5">
              <span className="w-44 text-[13px] font-semibold text-ink">{s.label}</span>
              <span className="w-10 font-mono text-[12px] text-slate-400">{s.count}</span>
              <Bar pct={s.quality} className="flex-1" barClass={s.quality >= 80 ? "bg-rise" : s.quality >= 60 ? "bg-accent" : "bg-amber-dim"} />
              <span className="font-mono text-[11px] font-semibold text-ink">{s.quality}%</span>
            </li>
          ))}
        </ul>
      </Panel>

      <Panel title="Incoming deals" sub="Newest first" pad={false} action={<Inbox className="h-4 w-4 text-slate-300" />}>
        <ul className="divide-y divide-line">
          {INBOX_DECKS.map((d) => (
            <li key={d.id} className="flex flex-col gap-3 px-5 py-4 transition-colors hover:bg-soft md:flex-row md:items-center">
              <ScoreRing score={d.aiScore} size={42} />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-[14px] font-semibold text-ink">{d.company}</p>
                  <Chip tone="line">{d.sector}</Chip>
                  <Chip tone="ink">{d.stage}</Chip>
                </div>
                <p className="mt-1 text-[12.5px] text-slate-500">{d.oneLiner}</p>
                <p className="mt-0.5 font-mono text-[9px] tracking-[0.08em] text-slate-400 uppercase">{d.via} · {d.received}</p>
              </div>
              <div className="flex shrink-0 gap-2">
                <button className="rounded-lg bg-accent px-3.5 py-2 text-[12px] font-semibold text-white hover:bg-accent-deep">Screen</button>
                <button className="rounded-lg border border-line px-3.5 py-2 text-[12px] font-semibold text-ink hover:bg-white">Park</button>
              </div>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}

/* ── Watchlist ──────────────────────────────────────────────── */
export function WatchlistPage() {
  return (
    <div className="space-y-5">
      <PageHead
        title="Watchlist"
        sub="Companies you're tracking — alerts fire when trigger conditions hit"
        action={<button className="flex items-center gap-1.5 rounded-lg border border-line bg-white px-4 py-2.5 text-[13px] font-semibold text-ink hover:bg-soft"><Star className="h-3.5 w-3.5 text-slate-400" /> Track a company</button>}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        {WATCHLIST.map((w) => (
          <Panel key={w.id} className="transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-[16px] font-semibold tracking-[-0.01em] text-ink">{w.name}</h3>
                <p className="mt-0.5 font-mono text-[10px] tracking-[0.08em] text-slate-400 uppercase">{w.sector}</p>
              </div>
              <span className="flex items-center gap-1 rounded-md bg-rise-tint px-2 py-1 font-mono text-[10.5px] font-semibold text-rise">
                <Radar className="h-3 w-3" /> {w.momentum}
              </span>
            </div>
            <div className="mt-4 flex items-end justify-between gap-3">
              <div>
                <p className="font-mono text-[9.5px] tracking-[0.16em] text-slate-400 uppercase">Latest milestone</p>
                <p className="mt-1 text-[12.5px] font-semibold text-ink">{w.milestone}</p>
              </div>
              <Spark points={w.spark} className="h-9 w-24" />
            </div>
            <div className="mt-4 flex items-center gap-2 rounded-lg bg-amber-tint px-3 py-2.5">
              <Star className="h-3.5 w-3.5 shrink-0 fill-amber-dim/20 text-amber-dim" />
              <p className="text-[11.5px] font-medium text-amber-dim">Trigger: <span className="font-semibold">{w.trigger}</span></p>
            </div>
          </Panel>
        ))}
      </div>

      <Panel title="Watchlist updates" sub="Startup · funding · performance · risk signals" pad={false}>
        <ul className="divide-y divide-line">
          {WATCHLIST_FEED.map((f, i) => (
            <li key={i} className="flex items-center gap-3.5 px-5 py-3.5">
              <Chip tone={f.type === "Risk" ? "amber" : "accent"} className="w-24 justify-center">{f.type}</Chip>
              <p className="flex-1 text-[12.5px] text-ink">{f.text}</p>
              <span className="font-mono text-[10px] text-slate-400">{f.time}</span>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}

/* ── Opportunities ──────────────────────────────────────────── */
export function OpportunitiesPage() {
  return (
    <div className="space-y-5">
      <PageHead
        title="Opportunities"
        sub="Funding rounds, strategic deals, co-investments, syndicates and follow-ons"
      />
      <div className="grid gap-4 lg:grid-cols-2">
        {OPPORTUNITY_LIST.map((o) => (
          <Panel key={o.id} className="group transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft">
            <div className="flex items-start justify-between gap-3">
              <div>
                <Chip tone="accent">{o.kind}</Chip>
                <h3 className="mt-3 text-[16.5px] font-semibold tracking-[-0.015em] text-ink">{o.title}</h3>
                <p className="mt-1.5 text-[12.5px] text-slate-500">{o.detail}</p>
              </div>
              <ScoreRing score={o.match} size={48} />
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-line pt-4">
              <span className="flex items-center gap-1.5 font-mono text-[10px] tracking-[0.08em] text-amber-dim uppercase">
                <ArrowRight className="h-3 w-3 rotate-45" /> {o.window}
              </span>
              <button className="rounded-lg bg-accent px-4 py-2 text-[12.5px] font-semibold text-white hover:bg-accent-deep">Open deal</button>
            </div>
          </Panel>
        ))}
      </div>
    </div>
  );
}
