import { ArrowRight, ArrowUpRight, CalendarDays, Sparkles } from "lucide-react";
import Link from "next/link";
import { Badge, Card, Progress, Stat } from "@/components/app/widgets";
import {
  applications,
  atRiskStartups,
  cohortPulse,
  fundingActivity,
  incubActivity,
  incubKpis,
  incubRecommendations,
  mentorsActivity,
  resourceUtilization,
  upcomingMilestones,
} from "@/users/incubator/constants/dashboard-data";

const quickActions = [
  ["Create program", "/incubator/programs"],
  ["Review applications", "/incubator/programs"],
  ["Add startup", "/incubator/startups"],
  ["Assign mentor", "/incubator/mentors/assignments"],
  ["Allocate resource", "/incubator/resources"],
  ["Create event", "/incubator/events"],
  ["Generate report", "/incubator/reports"],
];

export function IncubatorDashboard() {
  return (
    <div className="space-y-4">
      {/* header */}
      <div className="mb-2 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-[13px] font-medium text-slate-400">Welcome back, Meera</p>
          <h1 className="mt-1 text-[clamp(1.5rem,2.6vw,2rem)] font-semibold tracking-[-0.02em] text-ink">
            StartupHub Labs — <span className="text-accent">3 programs running</span>, 7 startups need attention.
          </h1>
          <div className="mt-3 flex flex-wrap gap-2">
            <Badge tone="accent">Program Director</Badge>
            <Badge>12 programs · 240 startups</Badge>
            <Badge tone="good">Portfolio healthy</Badge>
          </div>
        </div>
        <div className="rounded-2xl border border-accent/25 bg-accent-mist px-5 py-4">
          <p className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-accent">
            <Sparkles className="h-3.5 w-3.5" /> Copilot brief
          </p>
          <p className="mt-1.5 max-w-xs text-[12.5px] leading-relaxed text-slate-600">
            FreshChain&apos;s conflict is 11 days old — the threshold where recovery odds drop. Intervene this week.
          </p>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        {incubKpis.map((k) => (
          <Stat key={k.label} {...k} />
        ))}
      </div>

      {/* quick actions */}
      <Card pad={false}>
        <div className="flex flex-wrap gap-2 px-5 py-4">
          {quickActions.map(([l, href]) => (
            <Link
              key={l}
              href={href}
              className="rounded-full border border-line bg-white px-3.5 py-2 text-[12.5px] font-semibold text-slate-600 transition-all hover:border-accent/40 hover:text-accent"
            >
              {l}
            </Link>
          ))}
        </div>
      </Card>

      <div className="grid gap-4 xl:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          {/* cohorts */}
          <Card title="Active cohorts" action={<Link href="/incubator/cohorts" className="text-[12px] font-semibold text-accent">Manage</Link>} pad={false}>
            <ul className="divide-y divide-line">
              {cohortPulse.map((c) => (
                <li key={c.name} className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-[14px] font-semibold text-ink">{c.name}</p>
                      <Badge tone={c.health > 80 ? "good" : c.health > 70 ? "accent" : "warn"}>{c.health} health</Badge>
                    </div>
                    <p className="mt-0.5 text-[11.5px] text-slate-400">{c.startups} startups · {c.status}</p>
                  </div>
                  <div className="flex items-center gap-5">
                    <div className="w-40">
                      <div className="flex justify-between text-[11px] text-slate-400"><span>to graduation</span><span>{c.graduation}</span></div>
                      <Progress value={c.health} tone={c.health > 80 ? "good" : "accent"} className="mt-1.5" />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </Card>

          {/* middle row */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card title="Applications pipeline" action={<Badge tone="accent">{applications.reduce((a, s) => a + s.count, 0)} live</Badge>}>
              <div className="grid grid-cols-4 gap-2.5">
                {applications.map((a) => (
                  <div key={a.stage} className="rounded-xl border border-line p-3 text-center">
                    <span className="text-xl font-semibold text-ink tabular-nums">{a.count}</span>
                    <p className="mt-1 text-[10.5px] font-medium leading-tight text-slate-400">{a.stage}</p>
                  </div>
                ))}
              </div>
              <Link href="/incubator/programs" className="mt-4 inline-flex items-center gap-1 text-[12px] font-semibold text-accent">
                Open applications queue <ArrowRight className="h-3 w-3" />
              </Link>
            </Card>

            <Card title="At-risk startups" action={<span className="text-[11px] font-semibold text-amber-600">2 need intervention</span>}>
              <ul className="space-y-3">
                {atRiskStartups.slice(0, 3).map((s) => (
                  <li key={s.name} className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[13px] font-semibold text-ink">{s.name}</p>
                      <p className="mt-0.5 text-[11.5px] leading-snug text-slate-500">{s.risk} · {s.action}</p>
                    </div>
                    <Badge tone={s.level === "High" ? "bad" : "warn"}>{s.level}</Badge>
                  </li>
                ))}
              </ul>
              <Link href="/incubator/startups/interventions" className="mt-4 inline-flex items-center gap-1 text-[12px] font-semibold text-accent">
                Intervention board <ArrowRight className="h-3 w-3" />
              </Link>
            </Card>
          </div>

          {/* milestones */}
          <Card title="Upcoming milestones — all cohorts" pad={false}>
            <ul className="divide-y divide-line">
              {upcomingMilestones.map((m) => (
                <li key={m.milestone} className="flex items-center gap-4 px-5 py-3.5">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-accent-soft text-[10px] font-bold text-accent">
                    {m.startup.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13.5px] font-medium text-ink">{m.milestone}</p>
                    <p className="text-[11px] text-slate-400">{m.startup} · due {m.due}</p>
                  </div>
                  <div className="w-28 shrink-0">
                    <Progress value={m.pct} tone={m.pct > 70 ? "good" : m.pct > 45 ? "accent" : "warn"} />
                    <p className="mt-1 text-right text-[10.5px] tabular-nums text-slate-400">{m.pct}%</p>
                  </div>
                </li>
              ))}
            </ul>
          </Card>

          {/* mentors + resources */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card title="Mentor activity">
              <ul className="space-y-3.5">
                {mentorsActivity.map((m) => (
                  <li key={m.mentor} className="flex items-center gap-3">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent-soft text-[11px] font-bold text-accent">
                      {m.mentor.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-[13px] font-semibold text-ink">{m.mentor} · {m.hours}/mo</p>
                      <p className="truncate text-[11.5px] text-slate-400">{m.note}</p>
                    </div>
                    <Badge>{m.startups} startups</Badge>
                  </li>
                ))}
              </ul>
            </Card>
            <Card title="Resource utilization">
              <ul className="space-y-3.5">
                {resourceUtilization.map((r) => (
                  <li key={r.resource}>
                    <div className="flex items-center justify-between text-[12.5px]">
                      <span className="font-medium text-slate-600">{r.resource}</span>
                      <span className="tabular-nums text-slate-400">{r.used}%</span>
                    </div>
                    <Progress value={r.used} tone={r.used > 75 ? "warn" : "accent"} className="mt-1.5" />
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>

        {/* right rail */}
        <div className="space-y-4">
          <Card title="Copilot recommendations" action={<Sparkles className="h-4 w-4 text-accent" />}>
            <ul className="space-y-3">
              {incubRecommendations.map((r) => (
                <li key={r.action} className="rounded-xl border border-line bg-soft/70 p-3.5">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-[13px] font-semibold leading-snug text-ink">{r.action}</p>
                    <Badge tone={r.impact === "High" ? "bad" : "warn"}>{r.impact}</Badge>
                  </div>
                  <p className="mt-1.5 text-[11.5px] leading-relaxed text-slate-500">{r.why}</p>
                </li>
              ))}
            </ul>
          </Card>

          <Card title="Funding activity" action={<ArrowUpRight className="h-4 w-4 text-slate-400" />}>
            <ul className="space-y-3.5">
              {fundingActivity.map((f) => (
                <li key={f.startup} className="border-l-2 border-emerald-400/60 pl-3.5">
                  <p className="text-[13px] font-semibold text-ink">{f.startup}</p>
                  <p className="text-[12px] text-slate-500">{f.event}</p>
                  <p className="mt-0.5 text-[10.5px] text-slate-300">{f.when}</p>
                </li>
              ))}
            </ul>
          </Card>

          <Card title="Recent activity">
            <ul className="space-y-3">
              {incubActivity.map((a) => (
                <li key={a.text} className="flex items-start gap-2.5 text-[12.5px]">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-md bg-slate-100 text-slate-400">
                    <a.icon className="h-3 w-3" />
                  </span>
                  <div>
                    <p className="leading-snug text-slate-600">{a.text}</p>
                    <p className="mt-0.5 flex items-center gap-1 text-[10.5px] text-slate-300">
                      <CalendarDays className="h-2.5 w-2.5" /> {a.when}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
