import {
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  CircleDot,
  ClipboardCheck,
  FileText,
  TriangleAlert,
  Users,
} from "lucide-react";
import Link from "next/link";
import { Badge, Card, PageHeader, Progress, Stat } from "@/components/app/widgets";
import {
  cohort,
  keyDates,
  milestonePhases,
  milestones,
  reviewCheckpoints,
  risks,
} from "@/users/startup/constants/incubation-data";

const boardColumns = [
  { state: "Completed", tone: "good" as const, dot: "bg-emerald-500" },
  { state: "In progress", tone: "warn" as const, dot: "bg-amber-400" },
  { state: "Blocked", tone: "bad" as const, dot: "bg-red-400" },
  { state: "Upcoming", tone: "accent" as const, dot: "bg-accent" },
];

const readinessChecklist = [
  { item: "All cohort deliverables approved", done: false, note: "Pilot deployment report still in review" },
  { item: "IP filing receipt on file", done: false, note: "Hard gate — due Apr 08" },
  { item: "50 of 50 mentor hours logged", done: false, note: "10 hours remaining before Apr 30" },
  { item: "KPI baseline and unit economics submitted", done: true, note: "Baseline submitted Apr 05" },
  { item: "Demo deck and one-pager ready", done: false, note: "Both due before Apr 28" },
  { item: "Investor data room populated", done: true, note: "6 of 6 documents uploaded" },
];

export function IncubationMilestones() {
  const completed = milestones.filter((m) => m.state === "Completed").length;
  const inProgress = milestones.filter((m) => m.state === "In progress").length;
  const blocked = milestones.filter((m) => m.state === "Blocked").length;
  const overall = Math.round((completed / milestones.length) * 100);

  return (
    <div className="space-y-5">
      <PageHeader
        title="Milestones"
        desc="Every commitment the programme has made to you, and every one you have made back — with dates, owners and evidence."
        actions={
          <Link
            href="/founder/incubation/workspace"
            className="inline-flex items-center gap-1.5 rounded-[10px] border border-line bg-white px-4 py-2.5 text-[13px] font-semibold text-ink hover:border-slate-300"
          >
            Back to workspace
          </Link>
        }
      />

      {/* 1 — Headline metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat icon={ClipboardCheck} label="Total milestones" value={String(milestones.length)} hint={`${overall}% complete`} tone="default" />
        <Stat icon={CheckCircle2} label="Completed" value={String(completed)} delta="on schedule" tone="good" />
        <Stat icon={CircleDot} label="In progress" value={String(inProgress)} hint="3 due within 10 days" tone="warn" />
        <Stat icon={TriangleAlert} label="Blocked" value={String(blocked)} hint="IP filing — needs escalation" tone="bad" />
      </div>

      {/* 2 — Phase progress */}
      <Card title="Progress by phase" action={<Badge tone="accent">{cohort.batch}</Badge>}>
        <div className="grid gap-x-8 gap-y-5 lg:grid-cols-2">
          {milestonePhases.map((p) => {
            const pct = Math.round((p.done / p.total) * 100);
            return (
              <div key={p.name}>
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-[12.5px] font-medium text-slate-600">{p.name}</span>
                  <span className="text-[12.5px] font-semibold tabular-nums text-ink">
                    {p.done} / {p.total}
                  </span>
                </div>
                <Progress value={pct} tone={pct === 100 ? "good" : pct >= 50 ? "accent" : "warn"} className="mt-2" />
                <p className="mt-1.5 text-[11.5px] text-slate-400">{pct}% of phase milestones closed</p>
              </div>
            );
          })}
        </div>
      </Card>

      {/* 3 — Milestone board */}
      <Card title="Milestone board" action={<Badge tone="default">by status</Badge>}>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {boardColumns.map((col) => {
            const items = milestones.filter((m) => m.state === col.state);
            return (
              <div key={col.state} className="rounded-xl border border-line p-3.5">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-[12px] font-semibold text-ink">
                    <span className={`h-2 w-2 rounded-full ${col.dot}`} />
                    {col.state}
                  </span>
                  <span className="text-[11px] font-semibold tabular-nums text-slate-400">
                    {items.length}
                  </span>
                </div>
                <ul className="mt-3 space-y-2">
                  {items.length === 0 ? (
                    <li className="text-[11.5px] text-slate-300">Nothing here</li>
                  ) : (
                    items.map((m) => (
                      <li key={m.id} className="rounded-lg bg-slate-50 p-3">
                        <p className="text-[12.5px] font-medium leading-snug text-ink">{m.name}</p>
                        <p className="mt-1 text-[11px] text-slate-400">
                          {m.owner} · {m.due}
                        </p>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            );
          })}
        </div>
      </Card>

      {/* 4 — Upcoming timeline */}
      <Card
        title="Upcoming milestones"
        action={<CalendarClock className="h-4 w-4 text-slate-300" />}
        pad={false}
      >
        <ul className="divide-y divide-line">
          {milestones
            .filter((m) => m.state !== "Completed")
            .sort((a, b) => a.due.localeCompare(b.due))
            .map((m) => (
              <li key={m.id} className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-start">
                <div className="w-20 shrink-0">
                  <p className="text-[13px] font-semibold tabular-nums text-ink">{m.due}</p>
                  <p className="mt-0.5 text-[11px] text-slate-400">{m.phase}</p>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-[13.5px] font-semibold text-ink">{m.name}</p>
                    <Badge tone={m.tone}>{m.state}</Badge>
                  </div>
                  <p className="mt-1 text-[12px] leading-relaxed text-slate-500">
                    <span className="font-semibold text-ink">Evidence:</span> {m.evidence}
                  </p>
                  <p className="mt-1 flex items-center gap-1.5 text-[11.5px] text-slate-400">
                    <Users className="h-3 w-3" /> {m.owner}
                  </p>
                </div>
              </li>
            ))}
        </ul>
      </Card>

      {/* 5 — Key dates */}
      <Card title="Key dates" pad={false}>
        <ul className="divide-y divide-line">
          {keyDates.map((k) => (
            <li key={k.title} className="flex flex-wrap items-center gap-4 px-5 py-3.5">
              <span className="w-16 shrink-0 rounded-lg bg-accent-soft px-2 py-1 text-center text-[12px] font-bold tabular-nums text-accent">
                {k.date}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-semibold text-ink">{k.title}</p>
                <p className="mt-0.5 text-[12px] text-slate-500">{k.note}</p>
              </div>
            </li>
          ))}
        </ul>
      </Card>

      {/* 6 — Review checkpoints */}
      <Card
        title="Review checkpoints & sign-off"
        action={<FileText className="h-4 w-4 text-slate-300" />}
        pad={false}
      >
        <ul className="divide-y divide-line">
          {reviewCheckpoints.map((r) => (
            <li key={r.name} className="flex flex-wrap items-center gap-3 px-5 py-3.5">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-slate-50 text-slate-400">
                <ClipboardCheck className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-semibold text-ink">{r.name}</p>
                <p className="mt-0.5 text-[11.5px] text-slate-400">{r.reviewer}</p>
              </div>
              <Badge tone={r.tone}>{r.state}</Badge>
            </li>
          ))}
        </ul>
      </Card>

      {/* 7 — Risks */}
      <Card title="Risks & blockers" action={<Badge tone="bad">1 high impact</Badge>}>
        <ul className="space-y-3">
          {risks.map((r) => (
            <li key={r.title} className="rounded-xl border border-line p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-[13.5px] font-semibold text-ink">{r.title}</p>
                <Badge tone={r.tone}>{r.impact} impact</Badge>
              </div>
              <p className="mt-1.5 text-[12px] leading-relaxed text-slate-500">{r.mitigation}</p>
            </li>
          ))}
        </ul>
      </Card>

      {/* 8 — Graduation readiness */}
      <Card
        title="Graduation readiness"
        action={<Badge tone="warn">4 of 6 outstanding</Badge>}
      >
        <ul className="space-y-2.5">
          {readinessChecklist.map((r) => (
            <li key={r.item} className="flex items-start gap-3">
              <span
                className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full ${
                  r.done ? "bg-emerald-100 text-emerald-600" : "border border-slate-200 text-slate-300"
                }`}
              >
                {r.done ? <CheckCircle2 className="h-3.5 w-3.5" /> : <CircleDot className="h-3.5 w-3.5" />}
              </span>
              <div className="min-w-0 flex-1">
                <p
                  className={`text-[13px] font-medium ${
                    r.done ? "text-slate-400 line-through" : "text-ink"
                  }`}
                >
                  {r.item}
                </p>
                <p className="mt-0.5 text-[11.5px] text-slate-400">{r.note}</p>
              </div>
            </li>
          ))}
        </ul>
      </Card>

      {/* 9 — Where to go next */}
      <Card title="Where to go next">
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            {
              label: "Incubation Workspace",
              href: "/founder/incubation/workspace",
              body: "The cohort sprint plan, deliverables, mentor sessions and KPI dashboard.",
            },
            {
              label: "Applications",
              href: "/founder/incubation",
              body: "Your other programmes, the application pipeline and outstanding documents.",
            },
            {
              label: "Discover Incubators",
              href: "/founder/incubation/discover",
              body: "Compare matched programmes and open new application windows.",
            },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group rounded-xl border border-line p-4 transition-colors hover:border-accent"
            >
              <p className="flex items-center gap-1.5 text-[13px] font-semibold text-ink">
                {link.label}
                <ArrowRight className="h-3.5 w-3.5 text-accent transition-transform group-hover:translate-x-0.5" />
              </p>
              <p className="mt-1 text-[12px] leading-relaxed text-slate-500">{link.body}</p>
            </Link>
          ))}
        </div>
      </Card>
    </div>
  );
}
