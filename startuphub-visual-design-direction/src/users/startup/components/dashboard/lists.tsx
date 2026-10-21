import { ArrowRight, CalendarDays, CircleDot, TriangleAlert } from "lucide-react";
import Link from "next/link";
import { Badge, Card, Progress } from "@/components/app/widgets";
import {
  activity,
  events,
  mentorActions,
  milestones,
  opportunities,
  risks,
  riskTone,
  tasks,
} from "@/users/startup/constants/dashboard-data";

export function MilestonesCard() {
  return (
    <Card
      title="Active milestones"
      action={<Link href="/founder/incubation/milestones" className="text-[12px] font-semibold text-accent">All milestones</Link>}
    >
      <div className="space-y-4">
        {milestones.map((m) => (
          <div key={m.name}>
            <div className="flex items-baseline justify-between gap-3">
              <p className="truncate text-[13.5px] font-medium text-ink">{m.name}</p>
              <div className="flex shrink-0 items-center gap-2">
                <Badge tone={m.status === "At risk" ? "warn" : "good"}>{m.status}</Badge>
                <span className="text-[11.5px] text-slate-400">{m.due}</span>
              </div>
            </div>
            <Progress value={m.pct} tone={m.status === "At risk" ? "warn" : "accent"} className="mt-2" />
          </div>
        ))}
      </div>
    </Card>
  );
}

export function TasksCard() {
  return (
    <Card
      title="Pending tasks"
      action={<Badge tone="default">{tasks.filter((t) => !t.done).length} open</Badge>}
    >
      <ul className="space-y-1">
        {tasks.map((t) => (
          <li key={t.title} className="flex items-center gap-3 rounded-lg py-2 transition-colors hover:bg-slate-50">
            <span
              className={
                t.done
                  ? "grid h-5 w-5 place-items-center rounded-full bg-emerald-500 text-[10px] font-bold text-white"
                  : "grid h-5 w-5 place-items-center rounded-full border-2 border-slate-200"
              }
            >
              {t.done ? "✓" : ""}
            </span>
            <span className={`min-w-0 flex-1 truncate text-[13px] ${t.done ? "text-slate-300 line-through" : "text-slate-600"}`}>
              {t.title}
            </span>
            <span className="hidden rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-500 sm:block">
              {t.tag}
            </span>
            <span className="w-16 shrink-0 text-right text-[11px] text-slate-400">{t.due}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

export function RisksCard() {
  return (
    <Card
      title="Current risks"
      action={<span className="flex items-center gap-1 text-[11px] font-semibold text-amber-600"><TriangleAlert className="h-3 w-3" /> 1 high</span>}
    >
      <ul className="space-y-3">
        {risks.map((r) => (
          <li key={r.text} className="flex items-start gap-2.5">
            <Badge tone={riskTone[r.level]}>{r.level}</Badge>
            <p className="flex-1 text-[12.5px] leading-relaxed text-slate-600">{r.text}</p>
          </li>
        ))}
      </ul>
      <Link href="/founder/growth/risks" className="mt-4 flex items-center gap-1 text-[12px] font-semibold text-accent">
        Open risk register <ArrowRight className="h-3 w-3" />
      </Link>
    </Card>
  );
}

export function OpportunitiesCard() {
  return (
    <Card
      title="Matched opportunities"
      action={<Link href="/founder/opportunities" className="text-[12px] font-semibold text-accent">View all</Link>}
    >
      <ul className="space-y-3">
        {opportunities.map((o) => (
          <li key={o.title} className="group flex cursor-pointer items-center justify-between gap-3 rounded-lg py-1">
            <div className="min-w-0">
              <p className="truncate text-[13.5px] font-medium text-ink group-hover:text-accent">{o.title}</p>
              <p className="truncate text-[11.5px] text-slate-400">{o.meta}</p>
            </div>
            <span className="shrink-0 rounded-full bg-accent-soft px-2.5 py-1 text-[11px] font-bold text-accent">
              {o.fit}% fit
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

export function RightRail() {
  return (
    <div className="space-y-4">
      <Card title="Upcoming events">
        <ul className="space-y-3">
          {events.map((e) => (
            <li key={e.name} className="flex items-start gap-3">
              <span className={`mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg ${e.going ? "bg-accent-soft text-accent" : "bg-slate-100 text-slate-400"}`}>
                <CalendarDays className="h-3.5 w-3.5" />
              </span>
              <div className="min-w-0">
                <p className="truncate text-[13px] font-medium text-ink">{e.name}</p>
                <p className="text-[11px] text-slate-400">{e.when}</p>
              </div>
              {e.going && <span className="ml-auto text-[10px] font-bold uppercase text-emerald-500">Going</span>}
            </li>
          ))}
        </ul>
      </Card>

      <Card title="Mentor actions">
        <ul className="space-y-3">
          {mentorActions.map((m) => (
            <li key={m.action} className="flex items-start gap-3">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-accent-soft text-[10px] font-bold text-accent">
                {m.mentor.split(" ").map((w) => w[0]).join("").slice(0, 2)}
              </span>
              <div className="min-w-0">
                <p className="text-[12.5px] font-medium leading-snug text-ink">{m.action}</p>
                <p className="mt-0.5 text-[11px] text-slate-400">
                  {m.mentor} · {m.when}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Card>

      <Card title="Recent activity">
        <ul className="space-y-3">
          {activity.map((a) => (
            <li key={a.text} className="flex items-start gap-2.5 text-[12.5px]">
              <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-md bg-slate-100 text-slate-400">
                <a.icon className="h-3 w-3" />
              </span>
              <div className="min-w-0">
                <p className="leading-snug text-slate-600">{a.text}</p>
                <p className="mt-0.5 flex items-center gap-1 text-[10.5px] text-slate-300">
                  <CircleDot className="h-2.5 w-2.5" />
                  {a.when}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
