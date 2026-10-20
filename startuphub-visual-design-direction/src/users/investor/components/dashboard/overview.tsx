import {
  AlertTriangle,
  ArrowRight,
  ArrowUpRight,
  Banknote,
  BellRing,
  Briefcase,
  CalendarDays,
  Compass,
  FileSearch,
  Gauge,
  Handshake,
  Kanban,
  Radar,
  Rocket,
  Search,
  Sparkles,
  Star,
  TrendingUp,
  Video,
  Wallet,
} from "lucide-react";
import { Bar, Chip, Panel, Spark, StatCard } from "@/components/app/widgets";
import { PageHead } from "@/components/app/boards";
import { INVEST_HISTORY_EXTRA } from "../../constants/deal-dd-data";
import { AI_MATCHES, MONITORING_FEED, OPPORTUNITY_LIST, TRENDING_CHIPS, WATCHLIST_FEED } from "../../constants/ops-data";
import { PORTFOLIO, SCHEDULE, SIGNALS } from "../../constants/investor-data";

const QUICK_ACTIONS = [
  { label: "Discover Startups", href: "/investor/discovery", icon: Compass },
  { label: "Search Startups", href: "/investor/discovery/search", icon: Search },
  { label: "Review Deal", href: "/investor/deal", icon: Handshake },
  { label: "Add to Watchlist", href: "/investor/discovery/watchlist", icon: Star },
  { label: "Start Due Diligence", href: "/investor/dd", icon: FileSearch },
  { label: "Create Deal", href: "/investor/pipeline", icon: Kanban },
  { label: "Schedule Meeting", href: "/investor/comm/meetings", icon: Video },
];

export function InvestorDashboard() {
  return (
    <div className="space-y-6">
      <PageHead
        title="Good morning, Arjun"
        sub="42 new leads this month · IC vote today 16:00 · portfolio up 4.2% this quarter"
        action={
          <a
            href="/investor/discovery/matching"
            className="group flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-accent-deep"
          >
            <Sparkles className="h-3.5 w-3.5" /> 3 new AI matches
          </a>
        }
      />

      {/* quick actions */}
      <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
        {QUICK_ACTIONS.map((q) => (
          <a
            key={q.label}
            href={q.href}
            className="flex shrink-0 items-center gap-2 rounded-lg border border-line bg-white px-3.5 py-2.5 text-[12.5px] font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:text-accent"
          >
            <q.icon className="h-3.5 w-3.5 text-accent" />
            {q.label}
          </a>
        ))}
      </div>

      {/* overview stats */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <StatCard label="Portfolio value" value="₹132.6 Cr" delta="+22% YoY" icon={Briefcase} />
        <StatCard label="Active investments" value="38" delta="3 exits lifetime" icon={Gauge} />
        <StatCard label="Total invested" value="₹86.4 Cr" delta="72% of Fund I" icon={Banknote} />
        <StatCard label="Available capital" value="₹33.6 Cr" delta="₹24 Cr reserves" icon={Wallet} deltaGood={false} />
        <StatCard label="Current pipeline" value="24 deals" delta="+6 this month" icon={Kanban} />
        <StatCard label="New opportunities" value="5" delta="2 high-match" icon={Rocket} />
        <StatCard label="Deals in DD" value="7" delta="2 close to IC" icon={FileSearch} />
        <StatCard label="In negotiation" value="3" delta="1 IC today" icon={Handshake} />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* intelligence: AI matches */}
        <Panel
          title="AI startup matches"
          sub="Scored across 7 dimensions"
          action={<a href="/investor/discovery/matching" className="text-[12px] font-semibold text-accent">All matches</a>}
        >
          <div className="space-y-3.5">
            {AI_MATCHES.map((m) => (
              <a key={m.id} href="/investor/discovery/matching" className="group flex items-center gap-3.5 rounded-lg border border-line p-3.5 transition-colors hover:border-accent/40 hover:bg-accent-mist">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent text-[13px] font-bold text-white">
                  {m.overall}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13.5px] font-semibold text-ink">{m.name}</p>
                  <p className="truncate text-[11px] text-slate-400">{m.sector} · {m.stage}</p>
                </div>
                <ArrowRight className="h-3.5 w-3.5 text-slate-300 transition-all group-hover:translate-x-0.5 group-hover:text-accent" />
              </a>
            ))}
          </div>
          <div className="mt-4 border-t border-line pt-3.5">
            <p className="mb-2 font-mono text-[9px] tracking-[0.18em] text-slate-400 uppercase">Trending sectors</p>
            <div className="flex flex-wrap gap-1.5">
              {TRENDING_CHIPS.map((t) => <Chip key={t} tone="line">{t}</Chip>)}
            </div>
          </div>
        </Panel>

        {/* today + performance */}
        <Panel title="Today" sub={`${SCHEDULE.filter((s) => s.day === "Today").length} meetings`} action={<CalendarDays className="h-4 w-4 text-slate-300" />}>
          <div className="space-y-2.5">
            {SCHEDULE.filter((s) => s.day === "Today").map((m) => (
              <div key={m.id} className="flex items-center gap-3 rounded-lg border border-line p-3">
                <span className="w-10 shrink-0 font-mono text-[11px] font-bold text-accent">{m.time}</span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[12.5px] font-semibold text-ink">{m.title}</p>
                  <p className="truncate text-[10.5px] text-slate-400">{m.withWhom}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 border-t border-line pt-4">
            <p className="mb-2.5 font-mono text-[9px] tracking-[0.18em] text-slate-400 uppercase">Portfolio performance</p>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-[22px] font-semibold tracking-tight text-ink">2.14×</p>
                <p className="text-[10.5px] text-slate-400">Fund I TVPI · Q1 quartile</p>
              </div>
              <Spark points={[2, 3, 3, 5, 4, 6, 7, 9, 8, 11, 12, 14]} className="h-10 w-28" />
            </div>
          </div>
        </Panel>

        {/* alerts */}
        <Panel title="Alerts & recommendations" sub="Portfolio + risk + follow-ups" action={<BellRing className="h-4 w-4 text-slate-300" />}>
          <div className="space-y-2.5">
            <div className="flex gap-2.5 rounded-lg border border-amber-dim/25 bg-amber-tint p-3">
              <AlertTriangle className="h-4 w-4 shrink-0 text-amber-dim" />
              <p className="text-[12px] leading-snug text-ink">
                <b>NomadPay</b> burn 31% over plan — bridge review Apr 02.
              </p>
            </div>
            <div className="flex gap-2.5 rounded-lg border border-rise/25 bg-rise-tint p-3">
              <TrendingUp className="h-4 w-4 shrink-0 text-rise" />
              <p className="text-[12px] leading-snug text-ink">
                <b>Averia</b> Series B insider round — defend 14.2% pro-rata.
              </p>
            </div>
            <div className="flex gap-2.5 rounded-lg border border-accent/20 bg-accent-mist p-3">
              <Radar className="h-4 w-4 shrink-0 text-accent" />
              <p className="text-[12px] leading-snug text-ink">
                <b>SettleX</b> hit your watchlist trigger — TPV ₹40 Cr crossed.
              </p>
            </div>
            <div className="flex gap-2.5 rounded-lg border border-line p-3">
              <ArrowUpRight className="h-4 w-4 shrink-0 text-slate-400" />
              <p className="text-[12px] leading-snug text-ink">
                <b>Finlattice</b> Series A opens — follow-on model ready.
              </p>
            </div>
          </div>
        </Panel>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* portfolio snapshot */}
        <Panel title="Portfolio snapshot" sub="Top 4 by value" pad={false} action={<a href="/investor/portfolio" className="text-[12px] font-semibold text-accent">Overview</a>}>
          <ul className="divide-y divide-line">
            {PORTFOLIO.slice(0, 4).map((p) => (
              <li key={p.id} className="flex items-center gap-3.5 px-5 py-3.5 transition-colors hover:bg-soft">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-soft text-[11px] font-bold text-accent">
                  {p.name.slice(0, 2)}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-semibold text-ink">{p.name}</p>
                  <p className="text-[10.5px] text-slate-400">{p.sector}</p>
                </div>
                <span className="font-mono text-[11px] text-slate-400">{p.multiple}×</span>
                <span className="text-[12px] font-semibold text-rise">{p.growth}</span>
              </li>
            ))}
          </ul>
        </Panel>

        {/* monitoring feed */}
        <Panel title="Portfolio monitoring" sub="Latest company updates" pad={false} action={<a href="/investor/portfolio/monitoring" className="text-[12px] font-semibold text-accent">All updates</a>}>
          <ul className="divide-y divide-line">
            {MONITORING_FEED.slice(0, 4).map((f, i) => (
              <li key={i} className="flex items-start gap-3 px-5 py-3.5">
                <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${f.good ? "bg-rise" : "bg-amber-dim"}`} />
                <div className="min-w-0 flex-1">
                  <p className="text-[12.5px] leading-snug text-ink">
                    <b>{f.company}</b> — {f.text}
                  </p>
                  <p className="mt-0.5 font-mono text-[9px] tracking-[0.1em] text-slate-400 uppercase">{f.type} · {f.time} ago</p>
                </div>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      {/* opportunities strip */}
      <Panel title="Open opportunities" sub="Rounds, co-invests and follow-ons matched to your thesis" pad={false}>
        <ul className="divide-y divide-line">
          {OPPORTUNITY_LIST.slice(0, 3).map((o) => (
            <li key={o.id}>
              <a href="/investor/discovery/opportunities" className="group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-soft">
                <Chip tone="accent" className="w-28 justify-center">{o.kind}</Chip>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13.5px] font-semibold text-ink">{o.title}</p>
                  <p className="truncate text-[11.5px] text-slate-400">{o.detail}</p>
                </div>
                <span className="hidden font-mono text-[10px] text-slate-400 sm:block">{o.window}</span>
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-soft font-mono text-[11px] font-bold text-accent">
                  {o.match}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}
