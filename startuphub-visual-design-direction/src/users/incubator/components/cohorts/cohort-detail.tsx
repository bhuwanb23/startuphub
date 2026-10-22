import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  Gauge,
  GraduationCap,
  Users,
} from "lucide-react";
import Link from "next/link";
import { Badge, Card, GaugeRing, PageHeader, Progress } from "@/components/app/widgets";
import {
  COHORT_VI_COMPLETION,
  COHORT_VI_DEMO_READINESS,
  COHORT_VI_HEALTH,
  COHORT_VI_MENTORS,
  COHORT_VI_MILESTONES,
  COHORT_VI_PHASES,
  COHORT_VI_PULSE,
  COHORT_VI_STARTUPS,
} from "../../constants/cohorts-data";

/* Cohort VI — the live batch. Everything the cohort lead touches on a
   weekly basis: health, phases, the roster, mentors and demo readiness. */
export function CohortDetail() {
  return (
    <div className="space-y-6">
      <Link
        href="/incubator/cohorts"
        className="inline-flex items-center gap-1.5 text-[13px] font-medium text-slate-400 transition-colors hover:text-ink"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> All cohorts
      </Link>

      <PageHeader
        title="Cohort VI"
        desc="14 startups · week 14 of 16 · graduation sprint · demo day 28 Apr 2026."
        actions={<Badge tone="accent">Graduation sprint</Badge>}
      />

      {/* ── 01 · Identity + KPI strip ────────────────────────── */}
      <Card>
        <div className="flex flex-col gap-7 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex items-start gap-5">
            <span className="grid h-20 w-20 shrink-0 place-items-center rounded-2xl bg-ink text-[22px] font-bold tracking-tight text-white">
              VI
            </span>
            <div className="max-w-2xl">
              <div className="flex flex-wrap items-center gap-2.5">
                <h2 className="text-[26px] font-semibold tracking-[-0.025em] text-ink">
                  Cohort VI
                </h2>
                <Badge tone="accent">Active</Badge>
                <Badge tone="good">78 health</Badge>
              </div>
              <p className="mt-1.5 font-mono text-[10px] tracking-[0.14em] text-slate-400 uppercase">
                Multi-sector · 02 Feb 2026 → 28 Apr 2026 · 16 weeks
              </p>
              <p className="mt-3.5 text-[14px] leading-relaxed text-slate-500">
                Our strongest batch yet — 11 of 14 have a working MVP, three have
                signed pilots, and the demo day is fully booked for 240 guests.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Badge>14 startups</Badge>
                <Badge>16 seats</Badge>
                <Badge tone="good">86% on track</Badge>
                <Badge tone="warn">2 critical blockers</Badge>
              </div>
            </div>
          </div>

          <div className="grid w-full shrink-0 grid-cols-2 gap-3 lg:w-[280px]">
            {[
              { l: "Week", v: "14/16" },
              { l: "Mentor hours", v: "1,240" },
              { l: "Avg health", v: "78" },
              { l: "Demo day", v: "28 Apr" },
            ].map((x) => (
              <div key={x.l} className="rounded-xl bg-soft p-3.5 text-center">
                <p className="text-[16px] font-semibold tracking-tight text-ink tabular-nums">
                  {x.v}
                </p>
                <p className="mt-0.5 font-mono text-[8.5px] tracking-[0.12em] text-slate-400 uppercase">
                  {x.l}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* ── 02 · Health dimensions ───────────────────────────── */}
      <Card
        title="Cohort health — six dimensions"
        sub="The same rubric the performance board reviews"
        action={
          <span className="flex items-center gap-1.5 text-[12px] font-semibold text-slate-400">
            <Gauge className="h-3.5 w-3.5" /> 78 average
          </span>
        }
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {COHORT_VI_HEALTH.map((h) => (
            <div
              key={h.label}
              className="group flex items-center gap-4 rounded-xl border border-line p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-soft"
            >
              <GaugeRing
                value={h.score}
                size={56}
                label={h.score >= 75 ? "strong" : "watch"}
              />
              <div className="min-w-0">
                <p className="text-[13.5px] font-semibold text-ink">{h.label}</p>
                <p className="mt-0.5 text-[11.5px] leading-snug text-slate-400">
                  {h.note}
                </p>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-4 border-t border-line pt-3.5 text-[12px] leading-relaxed text-slate-500">
          <span className="font-semibold text-ink">IP health is the drag</span> — five
          filings are still outstanding before demo day, and they gate the
          graduation paperwork.
        </p>
      </Card>

      {/* ── 03 · Phase tracker ──────────────────────────────── */}
      <Card
        title="Programme phases"
        sub="Where the batch is in the 16-week spine"
        action={
          <Link
            href="/incubator/cohorts/progress"
            className="flex items-center gap-1 text-[12.5px] font-semibold text-accent"
          >
            All batches <ArrowUpRight className="h-3 w-3" />
          </Link>
        }
      >
        <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {COHORT_VI_PHASES.map((p, i) => (
            <li
              key={p.name}
              className="group rounded-xl border border-line p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-soft"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] font-semibold tracking-[0.14em] text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <Badge tone={p.tone}>{p.state}</Badge>
              </div>
              <p className="mt-2.5 text-[14px] font-semibold tracking-tight text-ink">
                {p.name}
              </p>
              <p className="mt-0.5 font-mono text-[10px] tracking-[0.08em] text-slate-400 uppercase">
                {p.weeks}
              </p>
              <p className="mt-2.5 border-t border-line pt-2.5 text-[12px] leading-relaxed text-slate-500">
                {p.focus}
              </p>
            </li>
          ))}
        </ol>
      </Card>

      {/* ── 04 · Startup roster ──────────────────────────────── */}
      <Card
        title="Cohort startups"
        sub="14 ventures, with health, readiness and milestone progress"
        action={<Badge tone="accent">14 startups</Badge>}
        pad={false}
      >
        <ul className="divide-y divide-line">
          {COHORT_VI_STARTUPS.map((s) => (
            <li
              key={s.name}
              className="flex flex-col gap-3 px-5 py-4 transition-colors hover:bg-soft lg:flex-row lg:items-center"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent-soft text-[12px] font-bold text-accent">
                {s.name
                  .split(" ")
                  .map((w) => w[0])
                  .join("")
                  .slice(0, 2)}
              </span>
              <div className="min-w-[180px] flex-1">
                <p className="text-[13.5px] font-semibold text-ink">{s.name}</p>
                <p className="mt-0.5 text-[11.5px] text-slate-400">
                  {s.sector} · {s.stage} · mentor {s.mentor}
                </p>
              </div>
              <span className="text-[12px] tabular-nums text-slate-500">
                readiness <b className="font-semibold text-ink">{s.readiness}</b> ·{" "}
                {s.milestones} milestones
              </span>
              <div className="w-28 shrink-0">
                <Progress
                  value={s.health}
                  tone={s.tone === "bad" ? "bad" : s.tone === "warn" ? "warn" : "good"}
                />
              </div>
              <Badge tone={s.tone}>{s.risk}</Badge>
            </li>
          ))}
        </ul>
      </Card>

      {/* ── 05 · Mentor allocation ───────────────────────────── */}
      <Card
        title="Mentor allocation"
        sub="Six mentors, 40 hours each"
        action={<Badge tone="warn">2 below target</Badge>}
        pad={false}
      >
        <ul className="divide-y divide-line">
          {COHORT_VI_MENTORS.map((m) => {
            const pct = Math.round((m.hours / m.target) * 100);
            return (
              <li
                key={m.mentor}
                className="flex flex-wrap items-center gap-4 px-5 py-4 transition-colors hover:bg-soft"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ink text-[10.5px] font-bold text-white">
                  {m.initials}
                </span>
                <div className="min-w-[180px] flex-1">
                  <p className="text-[13.5px] font-semibold text-ink">{m.mentor}</p>
                  <p className="mt-0.5 text-[11.5px] text-slate-400">
                    {m.expertise} · {m.startups} startups
                  </p>
                </div>
                <div className="flex w-[160px] items-center gap-2.5">
                  <Progress
                    value={pct}
                    tone={pct >= 95 ? "good" : pct >= 60 ? "warn" : "bad"}
                    className="flex-1"
                  />
                  <span className="w-14 text-right text-[11.5px] font-semibold tabular-nums text-ink">
                    {m.hours}/{m.target}h
                  </span>
                </div>
                <Badge tone={m.tone}>
                  {pct >= 100 ? "Complete" : pct >= 60 ? "On track" : "Behind"}
                </Badge>
              </li>
            );
          })}
        </ul>
      </Card>

      {/* ── 06 · Milestone burn-up ──────────────────────────── */}
      <Card
        title="Milestone burn-up"
        sub="Where the batch's commitments actually stand"
        action={
          <Link
            href="/incubator/milestones"
            className="flex items-center gap-1 text-[12.5px] font-semibold text-accent"
          >
            All milestones <ArrowUpRight className="h-3 w-3" />
          </Link>
        }
        pad={false}
      >
        <ul className="divide-y divide-line">
          {COHORT_VI_MILESTONES.map((m) => (
            <li
              key={m.milestone}
              className="flex flex-wrap items-center gap-4 px-5 py-4 transition-colors hover:bg-soft"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent">
                <ClipboardCheck className="h-4 w-4" />
              </span>
              <div className="min-w-[200px] flex-1">
                <p className="text-[13.5px] font-semibold text-ink">{m.milestone}</p>
                <p className="mt-0.5 text-[11.5px] text-slate-400">
                  {m.owner} · due {m.due}
                </p>
              </div>
              <span className="hidden min-w-[110px] text-[12px] text-slate-500 sm:block">
                {m.drift}
              </span>
              <div className="w-28 shrink-0">
                <Progress
                  value={m.pct}
                  tone={m.tone === "bad" ? "bad" : m.tone === "warn" ? "warn" : "good"}
                />
              </div>
              <span className="w-9 text-right text-[12px] font-semibold tabular-nums text-ink">
                {m.pct}%
              </span>
            </li>
          ))}
        </ul>
      </Card>

      {/* ── 07 · Completion checklist ────────────────────────── */}
      <div className="grid gap-5 lg:grid-cols-2">
        <Card title="Cohort completion checklist" sub="The batch-level gates">
          <div className="space-y-4">
            {COHORT_VI_COMPLETION.map((c) => (
              <div key={c.item} className="flex items-center gap-3">
                <span className="w-[176px] shrink-0 truncate text-[12.5px] font-medium text-slate-600">
                  {c.item}
                </span>
                <Progress
                  value={c.pct}
                  tone={c.pct === 100 ? "good" : c.pct < 70 ? "warn" : "accent"}
                  className="flex-1"
                />
                <span className="w-8 text-right text-[12px] font-semibold tabular-nums text-ink">
                  {c.pct}%
                </span>
              </div>
            ))}
          </div>
          <p className="mt-4 border-t border-line pt-3.5 text-[11.5px] text-slate-400">
            Owners: {COHORT_VI_COMPLETION.map((c) => c.owner).join(" · ")}
          </p>
        </Card>

        {/* ── 08 · Demo-day readiness ──────────────────────── */}
        <Card
          title="Demo-day readiness"
          sub="What has to be true by 28 Apr"
          action={<Badge tone="warn">6 of 14 ready</Badge>}
        >
          <div className="space-y-4">
            {COHORT_VI_DEMO_READINESS.map((d) => (
              <div key={d.item} className="flex items-center gap-3">
                <span className="w-[186px] shrink-0 truncate text-[12.5px] font-medium text-slate-600">
                  {d.item}
                </span>
                <Progress
                  value={d.pct}
                  tone={d.tone === "bad" ? "bad" : d.tone === "warn" ? "warn" : "good"}
                  className="flex-1"
                />
                <span className="w-9 text-right text-[12px] font-semibold tabular-nums text-ink">
                  {d.pct}%
                </span>
              </div>
            ))}
          </div>
          <p className="mt-4 rounded-xl border border-amber-dim/20 bg-amber-tint p-4 text-[12.5px] leading-relaxed text-amber-dim">
            <span className="font-semibold">Watch IP filings</span> — 6 of 14 startups have
            incomplete filings, and the data room closes 48 hours before the demo.
          </p>
        </Card>
      </div>

      {/* ── 09 · Recent pulse + where to go next ─────────────── */}
      <div className="grid gap-5 lg:grid-cols-2">
        <Card
          title="Weekly pulse"
          sub="Attendance, mentor hours and what happened"
          action={
            <span className="flex items-center gap-1.5 text-[12px] font-semibold text-slate-400">
              <CalendarDays className="h-3.5 w-3.5" /> Last 5 weeks
            </span>
          }
          pad={false}
        >
          <ul className="divide-y divide-line">
            {COHORT_VI_PULSE.map((p) => (
              <li
                key={p.week}
                className="flex flex-wrap items-center gap-4 px-5 py-3.5 transition-colors hover:bg-soft"
              >
                <span className="w-14 shrink-0 font-mono text-[11.5px] font-semibold text-ink">
                  Week {p.week}
                </span>
                <span className="w-16 shrink-0 text-[11.5px] text-slate-500">
                  {p.attendance}% present
                </span>
                <span className="w-16 shrink-0 text-[11.5px] text-slate-500">
                  {p.mentorHours}h mentor
                </span>
                <span className="min-w-[160px] flex-1 text-[11.5px] text-slate-400">
                  {p.note}
                </span>
              </li>
            ))}
          </ul>
        </Card>

        <Card title="Where to go next" sub="From this batch to the wider picture">
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              {
                href: "/incubator/cohorts/progress",
                title: "Cohort progress",
                body: "Every live batch against the 16-week spine.",
                icon: Users,
              },
              {
                href: "/incubator/cohorts/analytics",
                title: "Cohort analytics",
                body: "Survival, funding, IPR and graduation across cohorts.",
                icon: GraduationCap,
              },
              {
                href: "/incubator/milestones",
                title: "Milestones",
                body: "Every commitment across every cohort.",
                icon: ClipboardCheck,
              },
              {
                href: "/incubator/cohorts",
                title: "All cohorts",
                body: "The portfolio, blockers and demo-day schedule.",
                icon: CheckCircle2,
              },
            ].map((a) => (
              <Link
                key={a.href}
                href={a.href}
                className="group rounded-xl border border-line p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-soft"
              >
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-accent-soft text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                  <a.icon className="h-4 w-4" />
                </span>
                <p className="mt-3 text-[13.5px] font-semibold text-ink">{a.title}</p>
                <p className="mt-1.5 text-[12.5px] leading-relaxed text-slate-500">
                  {a.body}
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-[12px] font-semibold text-accent">
                  Open <ArrowUpRight className="h-3 w-3" />
                </span>
              </Link>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
