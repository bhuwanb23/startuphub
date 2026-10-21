import {
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  Clock,
  FlaskConical,
  GraduationCap,
  Target,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import {
  Badge,
  Card,
  GaugeRing,
  PageHeader,
  Progress,
  Stat,
} from "@/components/app/widgets";
import {
  cohort,
  cohortPeers,
  deliverables,
  facilityAccess,
  kpiTargets,
  mentorPanel,
  sprintPhases,
} from "@/users/startup/constants/incubation-data";

export function IncubationWorkspace() {
  return (
    <div className="space-y-5">
      <PageHeader
        title="Incubation Workspace"
        desc="Your live cohort — the sprint plan, what is due, who is helping, and how the numbers are tracking."
        actions={
          <Link
            href="/founder/incubation/milestones"
            className="inline-flex items-center gap-1.5 rounded-[10px] border border-line bg-white px-4 py-2.5 text-[13px] font-semibold text-ink hover:border-slate-300"
          >
            Open milestone register
          </Link>
        }
      />

      {/* 1 — Cohort hero */}
      <Card>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
          <div className="flex items-start gap-4">
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-accent text-lg font-bold text-white">
              SL
            </span>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl font-semibold tracking-tight text-ink">{cohort.program}</h2>
                <Badge tone="good">On track</Badge>
              </div>
              <p className="mt-1 text-[13.5px] text-slate-500">
                {cohort.track} · {cohort.weeks}-week sprint · {cohort.start} → {cohort.end}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-4 text-[12px] text-slate-500">
                <span className="flex items-center gap-1.5">
                  <GraduationCap className="h-3.5 w-3.5 text-slate-400" />
                  Lead: {cohort.lead} · {cohort.leadRole}
                </span>
                <span className="flex items-center gap-1.5">
                  <Users className="h-3.5 w-3.5 text-slate-400" />
                  {cohort.cohortSize} startups in batch
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-5 lg:ml-auto">
            <GaugeRing value={cohort.progress} size={88} label="complete" />
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                Demo day
              </p>
              <p className="mt-1 text-[18px] font-semibold leading-none text-ink">{cohort.demoDay}</p>
              <p className="mt-1.5 text-[11.5px] text-slate-400">{cohort.daysToDemo} days remaining</p>
            </div>
          </div>
        </div>
      </Card>

      {/* 2 — Headline metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat icon={TrendingUp} label="Program progress" value={`${cohort.progress}%`} delta="+9% this month" tone="good" />
        <Stat icon={Clock} label="Mentor hours" value="40 / 50" hint="10 hours left before Apr 30" tone="warn" />
        <Stat icon={CalendarClock} label="Days to demo day" value={String(cohort.daysToDemo)} hint={cohort.demoDay} tone="default" />
        <Stat icon={Wallet} label="Lab credits used" value="₹3.2L" hint="of ₹5L programme budget" tone="default" />
      </div>

      {/* 3 — Sprint timeline */}
      <Card title="Sprint timeline" action={<Badge tone="accent">Week 12 of {cohort.weeks}</Badge>}>
        <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {sprintPhases.map((p, i) => (
            <li
              key={p.name}
              className={`rounded-xl border p-4 ${
                p.state === "active" ? "border-accent/40 bg-accent-mist/50" : "border-line"
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`grid h-6 w-6 place-items-center rounded-full text-[11px] font-bold ${
                    p.state === "done"
                      ? "bg-emerald-100 text-emerald-600"
                      : p.state === "active"
                        ? "bg-accent text-white"
                        : "bg-slate-100 text-slate-400"
                  }`}
                >
                  {p.state === "done" ? <CheckCircle2 className="h-3.5 w-3.5" /> : i + 1}
                </span>
                <Badge tone={p.tone}>{p.state === "done" ? "Complete" : p.state === "active" ? "In progress" : "Upcoming"}</Badge>
              </div>
              <p className="mt-3 text-[13.5px] font-semibold text-ink">{p.name}</p>
              <p className="mt-0.5 text-[11.5px] text-slate-400">{p.weeks}</p>
            </li>
          ))}
        </ol>
      </Card>

      {/* 4 — Deliverables */}
      <Card
        title="Programme deliverables"
        action={<Badge tone="warn">1 overdue</Badge>}
        pad={false}
      >
        <ul className="divide-y divide-line">
          {deliverables.map((d) => (
            <li key={d.name} className="flex flex-wrap items-center gap-3 px-5 py-3.5">
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-semibold text-ink">{d.name}</p>
                <p className="mt-0.5 text-[11.5px] text-slate-400">
                  {d.owner} · due {d.due}
                </p>
              </div>
              <Badge tone={d.tone}>{d.state}</Badge>
            </li>
          ))}
        </ul>
      </Card>

      {/* 5 — Mentor panel */}
      <Card title="Mentor panel" action={<Badge tone="accent">4 assigned</Badge>} pad={false}>
        <ul className="divide-y divide-line">
          {mentorPanel.map((m) => (
            <li key={m.name} className="flex flex-wrap items-center gap-3 px-5 py-3.5">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent-soft text-[11px] font-bold text-accent">
                {m.name
                  .replace(/^Dr\. /, "")
                  .split(" ")
                  .map((w) => w[0])
                  .join("")
                  .slice(0, 2)}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-semibold text-ink">{m.name}</p>
                <p className="mt-0.5 text-[11.5px] text-slate-400">{m.focus}</p>
              </div>
              <span className="text-[11.5px] text-slate-500">{m.sessions} sessions</span>
              <span className="flex items-center gap-1.5 text-[12px] font-medium text-ink">
                <Clock className="h-3.5 w-3.5 text-slate-300" />
                {m.next}
              </span>
            </li>
          ))}
        </ul>
      </Card>

      {/* 6 — KPI dashboard */}
      <Card title="Programme KPIs" action={<Badge tone="default">5 targets</Badge>}>
        <div className="grid gap-x-8 gap-y-5 lg:grid-cols-2">
          {kpiTargets.map((k) => (
            <div key={k.label}>
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-[12.5px] font-medium text-slate-600">{k.label}</span>
                <span className="text-[12.5px] font-semibold tabular-nums text-ink">
                  {k.actual.toLocaleString("en-IN")} / {k.target.toLocaleString("en-IN")} {k.unit}
                </span>
              </div>
              <Progress
                value={k.pct}
                tone={k.pct >= 95 ? "good" : k.pct >= 80 ? "accent" : "warn"}
                className="mt-2"
              />
              <p className="mt-1.5 text-[11.5px] text-slate-400">
                {k.invert ? "Lower is better" : "of target"} · {k.pct}% reached
              </p>
            </div>
          ))}
        </div>
        <div className="mt-5 flex items-start gap-2.5 rounded-xl bg-accent-mist p-3.5">
          <Target className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
          <p className="text-[12px] leading-relaxed text-slate-600">
            <span className="font-semibold text-ink">Weakest KPI:</span> signed pilot partners at 70% of
            target. Seven of ten are signed — two more legal reviews are the only outstanding step.
          </p>
        </div>
      </Card>

      {/* 7 — Facility access */}
      <Card title="Lab & facility access" action={<FlaskConical className="h-4 w-4 text-slate-300" />} pad={false}>
        <ul className="divide-y divide-line">
          {facilityAccess.map((f) => (
            <li key={f.name} className="flex flex-wrap items-center gap-3 px-5 py-3.5">
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-semibold text-ink">{f.name}</p>
                <p className="mt-0.5 text-[11.5px] text-slate-400">{f.booked}</p>
              </div>
              <Badge tone={f.tone}>{f.state}</Badge>
            </li>
          ))}
        </ul>
      </Card>

      {/* 8 — Cohort peers */}
      <Card title="Your cohort" action={<Badge tone="accent">{cohort.cohortSize} startups</Badge>}>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {cohortPeers.map((p) => (
            <div key={p.startup} className="rounded-xl border border-line p-4">
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent-soft text-[11px] font-bold text-accent">
                  {p.startup.slice(0, 2).toUpperCase()}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-[13px] font-semibold text-ink">{p.startup}</p>
                  <p className="truncate text-[11.5px] text-slate-400">{p.name}</p>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between gap-2">
                <span className="text-[11.5px] text-slate-500">{p.focus}</span>
                <Badge tone="default">{p.stage}</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* 9 — Where to go next */}
      <Card title="Where to go next">
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            {
              label: "Milestones",
              href: "/founder/incubation/milestones",
              body: "The full milestone register with owners, evidence, key dates and open risks.",
            },
            {
              label: "Applications",
              href: "/founder/incubation",
              body: "Your other programmes, the pipeline and the documents still outstanding.",
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
