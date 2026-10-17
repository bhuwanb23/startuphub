import { ArrowRight, ArrowUpRight, CalendarDays, Sparkles, Video } from "lucide-react";
import Link from "next/link";
import { Badge, Card, Progress, Stat } from "@/components/app/widgets";
import {
  mentorActivity,
  mentorKpis,
  mentorImpact,
  mentorRecommendations,
  overdueActions,
  pendingRequests,
  startupPulse,
  todaysSessions,
} from "@/users/mentor/constants/dashboard-data";

const quickActions = [
  ["Discover startup", "/mentor/startups"],
  ["Find match", "/mentor/startups/matching"],
  ["Schedule session", "/mentor/mentorship/scheduling"],
  ["Add recommendation", "/mentor/mentorship/recommendations"],
  ["Assign task", "/mentor/mentorship/tasks"],
  ["Review milestone", "/mentor/mentorship/milestones"],
];

export function MentorDashboard() {
  return (
    <div className="space-y-4">
      {/* header */}
      <div className="mb-2 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-[13px] font-medium text-slate-400">Good afternoon, Priya</p>
          <h1 className="mt-1 text-[clamp(1.5rem,2.6vw,2rem)] font-semibold tracking-[-0.02em] text-ink">
            2 sessions today — <span className="text-accent">Lumen AI at 16:00</span>.
          </h1>
          <div className="mt-3 flex flex-wrap gap-2">
            <Badge tone="accent">Architecture · Scaling · FinTech</Badge>
            <Badge>16 yrs operator</Badge>
            <Badge tone="good">Accepting 2/wk</Badge>
          </div>
        </div>
        <div className="rounded-2xl border border-accent/25 bg-accent-mist px-5 py-4">
          <p className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-accent">
            <Sparkles className="h-3.5 w-3.5" /> Copilot note
          </p>
          <p className="mt-1.5 max-w-xs text-[12.5px] leading-relaxed text-slate-600">
            FinEdge's request has aged 2 days — your fastest accept ever led to their strongest quarter. This one's been sitting loud, not waiting.
          </p>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        {mentorKpis.map((k) => (
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
          {/* today's sessions */}
          <Card title="Today's sessions" action={<Badge tone="accent">2 booked</Badge>}>
            <ul className="space-y-3">
              {todaysSessions.map((s) => (
                <li key={s.topic} className="rounded-xl border border-line p-4.5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[14px] font-semibold text-ink">{s.topic}</p>
                      <p className="mt-0.5 text-[12px] text-slate-400">
                        {s.startup} · with {s.founder} · {s.mode}
                      </p>
                    </div>
                    <Badge tone="accent">{s.time}</Badge>
                  </div>
                  <p className="mt-2 rounded-lg bg-slate-50 px-3 py-2 text-[11.5px] text-slate-500">
                    Prep: {s.prep}
                  </p>
                  <div className="mt-3 flex gap-2">
                    <button className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-accent py-2 text-[12px] font-semibold text-white hover:bg-accent-deep">
                      <Video className="h-3.5 w-3.5" /> Join room
                    </button>
                    <button className="rounded-lg border border-line px-3.5 py-2 text-[12px] font-semibold text-ink hover:border-slate-300">
                      Reschedule
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </Card>

          {/* startup pulse */}
          <Card title="Startup progress & health" action={<Link href="/mentor/startups/assigned" className="text-[12px] font-semibold text-accent">All assigned</Link>} pad={false}>
            <ul className="divide-y divide-line">
              {startupPulse.map((s) => (
                <li key={s.name} className="flex items-center gap-4 px-5 py-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent-soft text-[12px] font-bold text-accent">
                    {s.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-[13.5px] font-semibold text-ink">{s.name}</p>
                      <Badge tone={s.tone === "good" ? "good" : s.tone === "warn" ? "warn" : "bad"}>{s.health}</Badge>
                    </div>
                    <p className="truncate text-[11.5px] text-slate-400">Focus: {s.focus}</p>
                  </div>
                  <div className="w-32 shrink-0">
                    <div className="flex justify-between text-[10.5px] text-slate-400"><span>roadmap</span><span>{s.progress}%</span></div>
                    <Progress value={s.progress} tone={s.health < 50 ? "bad" : s.health < 70 ? "warn" : "accent"} className="mt-1" />
                  </div>
                </li>
              ))}
            </ul>
          </Card>

          {/* requests + overdue */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card title="Pending requests" action={<Badge tone="warn">{pendingRequests.length} new</Badge>}>
              <ul className="space-y-3">
                {pendingRequests.map((r) => (
                  <li key={r.startup} className="rounded-xl border border-line p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-[13.5px] font-semibold text-ink">{r.startup}</p>
                      <span className="rounded-full bg-accent-soft px-2 py-0.5 text-[11px] font-bold text-accent">{r.match}%</span>
                    </div>
                    <p className="mt-1 line-clamp-2 text-[12px] leading-snug text-slate-500">{r.ask}</p>
                    <p className="mt-1.5 text-[10.5px] font-medium text-slate-300">{r.founder} · waiting {r.age}</p>
                    <div className="mt-3 flex gap-1.5">
                      <button className="flex-1 rounded-lg bg-accent py-1.5 text-[11.5px] font-semibold text-white hover:bg-accent-deep">Accept</button>
                      <button className="flex-1 rounded-lg border border-line py-1.5 text-[11.5px] font-semibold text-ink hover:border-slate-300">Review</button>
                    </div>
                  </li>
                ))}
              </ul>
            </Card>
            <Card title="Overdue actions" action={<Badge tone="bad">{overdueActions.length}</Badge>}>
              <ul className="space-y-3">
                {overdueActions.map((a) => (
                  <li key={a.what} className="rounded-xl border border-amber-200 bg-amber-50/50 p-4">
                    <p className="text-[13px] font-semibold leading-snug text-ink">{a.what}</p>
                    <p className="mt-1 text-[11.5px] text-slate-500">{a.why}</p>
                    <p className="mt-2 text-[11px] font-bold uppercase tracking-wide text-amber-600">{a.days} day{a.days > 1 ? "s" : ""} overdue</p>
                  </li>
                ))}
              </ul>
              <Link href="/mentor/mentorship/tasks" className="mt-4 inline-flex items-center gap-1 text-[12px] font-semibold text-accent">
                Open action board <ArrowRight className="h-3 w-3" />
              </Link>
            </Card>
          </div>
        </div>

        {/* right rail */}
        <div className="space-y-4">
          <Card title="This month's impact">
            <div className="grid grid-cols-2 gap-3">
              {mentorImpact.map(([l, v]) => (
                <div key={l} className="rounded-xl bg-slate-50 p-4 text-center">
                  <span className="text-xl font-semibold tracking-tight text-ink tabular-nums">{v}</span>
                  <p className="mt-1 text-[10.5px] font-medium leading-tight text-slate-400">{l}</p>
                </div>
              ))}
            </div>
            <Link href="/mentor/impact" className="mt-4 flex items-center justify-center gap-1.5 rounded-[10px] border border-line py-2.5 text-[12.5px] font-semibold text-ink transition-colors hover:border-accent hover:text-accent">
              Full impact story <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </Card>

          <Card title="Copilot recommendations" action={<Sparkles className="h-4 w-4 text-accent" />}>
            <ul className="space-y-3">
              {mentorRecommendations.map((r) => (
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

          <Card title="Recent activity" action={<CalendarDays className="h-4 w-4 text-slate-400" />}>
            <ul className="space-y-3">
              {mentorActivity.map((a) => (
                <li key={a.text} className="flex items-start gap-2.5 text-[12.5px]">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-md bg-slate-100 text-slate-400">
                    <a.icon className="h-3 w-3" />
                  </span>
                  <div>
                    <p className="leading-snug text-slate-600">{a.text}</p>
                    <p className="mt-0.5 text-[10.5px] text-slate-300">{a.when}</p>
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
