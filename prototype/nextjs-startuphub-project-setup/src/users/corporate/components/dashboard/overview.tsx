import {
  AlertTriangle,
  ArrowRight,
  Banknote,
  Compass,
  FilePlus2,
  FlaskConical,
  Gauge,
  Handshake,
  Lightbulb,
  Rocket,
  ShoppingCart,
  Sparkles,
  Target,
  Trophy,
} from "lucide-react";
import { Bar, Chip, Panel, StatCard } from "@/components/app/widgets";
import { PageHead } from "@/components/app/boards";
import {
  CORP_MATCHES,
  CORP_STATS,
  PILOTS,
  SCOUTED_TECHS,
  INNOVATION_SPEND,
} from "../../constants/corporate-data";
import { CORP_NOTIFICATIONS, CORP_UPCOMING } from "../../constants/ops-data";
import { Spark } from "@/components/app/widgets";

const QUICK = [
  { label: "Create Problem", href: "/corporate/innovation/problems", icon: FilePlus2 },
  { label: "Create Challenge", href: "/corporate/innovation/challenges", icon: Trophy },
  { label: "Discover Startup", href: "/corporate/discovery", icon: Compass },
  { label: "Scout Technology", href: "/corporate/discovery/scouting", icon: Sparkles },
  { label: "Create Pilot", href: "/corporate/pilots", icon: FlaskConical },
  { label: "Start Partnership", href: "/corporate/partnerships", icon: Handshake },
  { label: "Create RFP", href: "/corporate/procurement/opportunities", icon: ShoppingCart },
  { label: "View KPIs", href: "/corporate/performance", icon: Target },
];

export function CorporateDashboard() {
  const s = CORP_STATS;
  const alerts = CORP_NOTIFICATIONS.filter((n) => n.unread);
  return (
    <div className="space-y-6">
      <PageHead
        title="Innovation command center"
        sub="Arjuna Industries · FY26 program · Traceable Harvest 2026 in flight"
        action={
          <a href="/corporate/discovery/matching" className="group flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-accent-deep">
            <Sparkles className="h-3.5 w-3.5" /> {s.techOpportunities} tech opportunities
          </a>
        }
      />

      {/* quick actions */}
      <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
        {QUICK.map((q) => (
          <a key={q.label} href={q.href} className="flex shrink-0 items-center gap-2 rounded-lg border border-line bg-white px-3.5 py-2.5 text-[12.5px] font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:text-accent">
            <q.icon className="h-3.5 w-3.5 text-accent" /> {q.label}
          </a>
        ))}
      </div>

      {/* stats */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <StatCard label="Active programs" value={String(s.programs)} delta="Traceable Harvest on top" icon={Lightbulb} />
        <StatCard label="Open problems" value={String(s.problems)} delta="2 new this quarter" icon={Target} />
        <StatCard label="Startup pipeline" value={String(s.startupPipeline)} delta="+9 scouted" icon={Rocket} />
        <StatCard label="Active pilots" value={String(s.pilots + s.pocs)} delta="3 pilots · 2 PoCs" icon={FlaskConical} />
        <StatCard label="Active challenges" value={String(s.challenges)} delta="96 submissions" icon={Trophy} />
        <StatCard label="Partnerships" value={String(s.partnerships)} delta="1 in partner-track" icon={Handshake} />
        <StatCard label="Innovation spend" value={s.spend} delta="within FY budget" icon={Banknote} />
        <StatCard label="Innovation ROI" value="3.1×" delta="+0.2 Q/Q" icon={Gauge} />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* pilots */}
        <Panel title="Pilots in flight" sub="KPI progress vs. targets" className="lg:col-span-2" pad={false}>
          <ul className="divide-y divide-line">
            {PILOTS.map((p) => (
              <li key={p.id}>
                <a href="/corporate/pilots" className="group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-soft">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="truncate text-[13.5px] font-semibold text-ink">{p.name}</p>
                      <Chip tone={p.stage === "Active" ? "rise" : "accent"}>{p.stage}</Chip>
                    </div>
                    <p className="mt-0.5 text-[11.5px] text-slate-400">{p.startup} · {p.bu} · {p.window}</p>
                    <div className="mt-2.5 flex items-center gap-3">
                      <Bar pct={p.kpis} className="w-32" barClass={p.kpis >= 70 ? "bg-rise" : "bg-accent"} />
                      <span className="font-mono text-[10.5px] font-semibold text-ink">{p.kpis}% KPIs</span>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 shrink-0 text-slate-300 transition-all group-hover:translate-x-0.5 group-hover:text-accent" />
                </a>
              </li>
            ))}
          </ul>
        </Panel>

        {/* alerts */}
        <Panel title="Alerts awaiting action" sub={String(alerts.length) + " unread"} action={<AlertTriangle className="h-4 w-4 text-slate-300" />}>
          <ul className="space-y-2.5">
            {alerts.map((a) => (
              <li key={a.id} className="flex gap-2.5 rounded-lg border border-line p-3">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <div className="min-w-0">
                  <p className="text-[12px] leading-snug text-ink">{a.text}</p>
                  <p className="mt-0.5 font-mono text-[9px] tracking-[0.1em] text-slate-400 uppercase">{a.group} · {a.time}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4 border-t border-line pt-3.5">
            <p className="mb-2 font-mono text-[9px] tracking-[0.18em] text-slate-400 uppercase">This week</p>
            <ul className="space-y-2 text-[11.5px] text-slate-600">
              {CORP_UPCOMING.slice(0, 3).map((u) => (
                <li key={u.date} className="flex gap-2">
                  <span className="w-11 shrink-0 font-mono text-[10px] text-accent">{u.date.split(" ")[1]} {u.date.split(" ")[0].slice(0, 3)}</span>
                  <span className="truncate">{u.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </Panel>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* top matches */}
        <Panel title="Top AI matches" sub="Against open problem statements" pad={false} action={<a href="/corporate/discovery/matching" className="text-[12px] font-semibold text-accent">All →</a>}>
          <ul className="divide-y divide-line">
            {CORP_MATCHES.slice(0, 3).map((m) => (
              <li key={m.startup} className="flex items-center gap-3.5 px-5 py-3.5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent text-[13px] font-bold text-white">{m.overall}</span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-semibold text-ink">{m.startup}</p>
                  <p className="truncate text-[11px] text-slate-400">{m.action}</p>
                </div>
                <Chip tone={m.overall >= 90 ? "rise" : "accent"}>{m.overall >= 90 ? "Hot" : "Strong"}</Chip>
              </li>
            ))}
          </ul>
        </Panel>

        {/* tech scouting */}
        <Panel title="Technology scouting" sub="Emerging tech under watch" pad={false} action={<a href="/corporate/discovery/scouting" className="text-[12px] font-semibold text-accent">All →</a>}>
          <ul className="divide-y divide-line">
            {SCOUTED_TECHS.slice(0, 3).map((t) => (
              <li key={t.tech} className="flex items-center gap-4 px-5 py-3.5">
                <Chip tone="ink" className="w-14 justify-center">{t.trl}</Chip>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[12.5px] font-semibold text-ink">{t.tech}</p>
                  <p className="truncate text-[10.5px] text-slate-400">{t.watch}</p>
                </div>
                <Chip tone={t.maturity === "Deployable" ? "rise" : t.maturity === "Pilotable" ? "accent" : "amber"}>{t.maturity}</Chip>
              </li>
            ))}
          </ul>
          <div className="border-t border-line px-5 py-3.5">
            <p className="flex items-center justify-between text-[11.5px] text-slate-400">
              <span>Innovation spend trajectory</span>
              <Spark points={INNOVATION_SPEND} className="h-6 w-24" />
            </p>
          </div>
        </Panel>
      </div>
    </div>
  );
}
