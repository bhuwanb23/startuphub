import {
  AlertTriangle,
  ArrowRight,
  Banknote,
  Briefcase,
  Building2,
  ClipboardCheck,
  FilePlus2,
  Gauge,
  Landmark,
  ListChecks,
  Rocket,
  School,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Trophy,
  Users,
} from "lucide-react";
import { Chip, Panel, Spark, StatCard } from "@/components/app/widgets";
import { PageHead } from "@/components/app/boards";
import {
  GOV_INTELLIGENCE,
  GOV_QUICK_ACTIONS,
  GOV_STATS,
  REGISTRATION_SERIES,
} from "../../constants/gov-data";
import { ALLOCATION_TRACKING } from "../../constants/gov-data";

const QA_ICONS = [ClipboardCheck, FilePlus2, Landmark, Trophy, Banknote, School, ListChecks];

export function GovDashboard() {
  const s = GOV_STATS;
  return (
    <div className="space-y-6">
      <PageHead
        title="Ecosystem command center"
        sub="State-wide view · Telangana · FY 2025–26 · all data verified Mar 26"
        action={
          <a href="/government/policy" className="group flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-accent-deep">
            <Sparkles className="h-3.5 w-3.5" /> 5 policy signals
          </a>
        }
      />

      {/* quick actions */}
      <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
        {GOV_QUICK_ACTIONS.map((q, i) => {
          const Icon = QA_ICONS[i % QA_ICONS.length];
          return (
            <a key={q.name} href={q.href} className="flex shrink-0 items-center gap-2 rounded-lg border border-line bg-white px-3.5 py-2.5 text-[12.5px] font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:text-accent">
              <Icon className="h-3.5 w-3.5 text-accent" /> {q.name}
            </a>
          );
        })}
      </div>

      {/* overview stats */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <StatCard label="Registered startups" value={s.registered} delta="+412 this month" icon={Rocket} />
        <StatCard label="Verified startups" value={s.verified} delta="84% pass rate" icon={ShieldCheck} />
        <StatCard label="Active schemes" value={String(s.schemes)} delta="1 opening May" icon={ListChecks} />
        <StatCard label="Funding allocated" value={s.allocated} delta="FY26 budget" icon={Banknote} />
        <StatCard label="Funding disbursed" value={s.disbursed} delta="68% of allocation" icon={Landmark} />
        <StatCard label="Funding utilized" value={s.utilized} delta="77% of disbursed" icon={Gauge} />
        <StatCard label="Jobs created" value={s.jobs} delta="+19.8% YoY" icon={Users} />
        <StatCard label="Patents filed" value={s.patents} delta="+27.6% YoY" icon={Briefcase} />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* registrations trend */}
        <Panel title="Registration momentum" sub="New startups / month · 12M" className="lg:col-span-2">
          <div className="flex h-40 items-end gap-2">
            {REGISTRATION_SERIES.map((v, i) => {
              const max = Math.max(...REGISTRATION_SERIES);
              return (
                <div key={i} className="group relative flex-1">
                  <div className={`w-full rounded-t-md transition-all duration-300 group-hover:opacity-80 ${i >= 9 ? "bg-accent" : "bg-accent/25"}`} style={{ height: `${(v / max) * 146 + 6}px` }} />
                  <span className="pointer-events-none absolute -top-6 left-1/2 -translate-x-1/2 rounded bg-ink px-1.5 py-0.5 font-mono text-[9px] text-white opacity-0 transition-opacity group-hover:opacity-100">{v}</span>
                </div>
              );
            })}
          </div>
          <div className="mt-2 flex justify-between font-mono text-[9px] text-slate-400">
            <span>Apr'25</span><span>Aug'25</span><span>Dec'25</span><span>Mar'26</span>
          </div>
          <div className="mt-4 flex items-center justify-between rounded-lg bg-accent-mist px-3.5 py-3 text-[12.5px] text-ink">
            <span>FY26 formation growth</span>
            <span className="flex items-center gap-1 font-semibold text-rise"><TrendingUp className="h-3.5 w-3.5" /> {s.growth}</span>
          </div>
        </Panel>

        {/* intelligence alerts */}
        <Panel title="Intelligence alerts" sub="Signals needing attention" action={<AlertTriangle className="h-4 w-4 text-slate-300" />} className="lg:col-span-1">
          <ul className="space-y-3">
            {GOV_INTELLIGENCE.map((a, i) => (
              <li key={i} className={`flex gap-3 rounded-lg border p-3 ${a.tone === "amber" ? "border-amber-dim/20 bg-amber-tint" : a.tone === "rise" ? "border-rise/20 bg-rise-tint" : "border-accent/20 bg-accent-mist"}`}>
                <Chip tone={a.tone} className="mt-0.5 h-fit shrink-0">{a.kind}</Chip>
                <p className="text-[12px] leading-snug text-ink">{a.text}</p>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* allocations due */}
        <Panel title="Allocation tracking" sub="Milestone-based disbursements" pad={false} action={<a href="/government/funding/tracking" className="text-[12px] font-semibold text-accent">All →</a>}>
          <ul className="divide-y divide-line">
            {ALLOCATION_TRACKING.map((a) => (
              <li key={a.id} className="flex items-center gap-4 px-5 py-3.5 transition-colors hover:bg-soft">
                <span className={`h-2 w-2 shrink-0 rounded-full ${a.status === "On track" ? "bg-rise" : a.status === "Delayed" ? "bg-amber-dim" : "bg-accent"}`} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[12.5px] font-semibold text-ink">{a.program} — {a.milestone}</p>
                  <p className="font-mono text-[9.5px] tracking-[0.08em] text-slate-400 uppercase">{a.id} · due {a.date}</p>
                </div>
                <span className="font-mono text-[12px] font-semibold text-ink">{a.amount}</span>
                <Chip tone={a.status === "On track" ? "rise" : a.status === "Delayed" ? "amber" : "accent"}>{a.status}</Chip>
              </li>
            ))}
          </ul>
        </Panel>

        {/* mission focus */}
        <Panel title="Mission focus this quarter" sub="Steering committee priorities">
          <ul className="space-y-3.5">
            {[
              { t: "Close rural seed-window utilization gap (34% → 75%)", tag: "P1", href: "/government/policy/recommendations" },
              { t: "Karimnagar intervention package — satellite incubator", tag: "P1", href: "/government/policy/gaps" },
              { t: "AgriChain Challenge → pilot procurement for winners", tag: "P2", href: "/government/challenges/outcomes" },
              { t: "Q1 impact report for steering + legislature", tag: "P2", href: "/government/reports/impact" },
            ].map((f) => (
              <li key={f.t}>
                <a href={f.href} className="group flex items-center gap-3 rounded-lg border border-line p-3.5 transition-colors hover:border-accent/40 hover:bg-accent-mist">
                  <Chip tone={f.tag === "P1" ? "amber" : "accent"}>{f.tag}</Chip>
                  <span className="flex-1 text-[12.5px] font-medium text-ink">{f.t}</span>
                  <ArrowRight className="h-3.5 w-3.5 text-slate-300 transition-all group-hover:translate-x-0.5 group-hover:text-accent" />
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-4 rounded-lg border border-rise/20 bg-rise-tint p-3.5 text-[12px] leading-relaxed text-ink">
            <b className="text-rise">On pace:</b> Startup capital attraction ₹2,860 Cr already
            exceeds FY25 total — 6 weeks early.
          </div>
        </Panel>
      </div>
    </div>
  );
}
