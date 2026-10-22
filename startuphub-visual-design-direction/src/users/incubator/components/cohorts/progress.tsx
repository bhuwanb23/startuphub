"use client";

import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  CalendarDays,
  CircleAlert,
  Clock3,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import Link from "next/link";
import { Badge, Card, PageHeader, Progress } from "@/components/app/widgets";
import { cn } from "@/lib/utils";
import {
  COHORTS,
  COHORT_BLOCKERS,
  NEXT_MILESTONES,
  PROGRESS_PHASES,
  VELOCITY,
} from "../../constants/cohorts-data";

const LIVE = COHORTS.filter((c) => c.status === "Active");

export function CohortProgress() {
  const [cohortId, setCohortId] = useState(LIVE[0].slug);
  const cohort = useMemo(
    () => COHORTS.find((c) => c.slug === cohortId) ?? LIVE[0],
    [cohortId],
  );

  const weekPct = Math.round((cohort.currentWeek / cohort.weeks) * 100);
  const avgAttendance = Math.round(
    VELOCITY.reduce((s, v) => s + v.attendance, 0) / VELOCITY.length,
  );
  const totalMentorHours = VELOCITY.reduce((s, v) => s + v.mentorHours, 0);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Cohort Progress"
        desc="Where every live batch sits in its programme — the week, the phase and what is slipping."
        actions={
          <Link
            href="/incubator/cohorts/analytics"
            className="inline-flex items-center gap-1.5 rounded-[10px] border border-line bg-white px-4 py-2.5 text-[13px] font-semibold text-ink transition-colors hover:bg-soft"
          >
            <TrendingUp className="h-3.5 w-3.5 text-slate-400" /> Compare cohorts
          </Link>
        }
      />

      {/* ── 01 · Batch switcher ──────────────────────────────── */}
      <div className="flex flex-wrap gap-2">
        {LIVE.map((c) => (
          <button
            key={c.slug}
            onClick={() => setCohortId(c.slug)}
            className={cn(
              "rounded-[10px] border px-4 py-2.5 text-[12.5px] font-medium transition-colors",
              cohortId === c.slug
                ? "border-ink bg-ink text-white"
                : "border-line bg-white text-slate-500 hover:border-slate-300 hover:text-ink",
            )}
          >
            {c.name}
            <span className="ml-1.5 text-[11px] opacity-60">
              wk {c.currentWeek}/{c.weeks}
            </span>
          </button>
        ))}
      </div>

      {/* ── 02 · Where this batch is ─────────────────────────── */}
      <Card
        title={`${cohort.name} — position`}
        sub={`${cohort.phase} · ${cohort.filled} startups · lead ${cohort.lead}`}
        action={<Badge tone={cohort.tone}>Week {cohort.currentWeek}</Badge>}
      >
        <div className="flex items-center gap-3">
          <span className="text-[26px] font-semibold tracking-[-0.03em] text-ink tabular-nums">
            {cohort.currentWeek}
          </span>
          <span className="text-[13px] text-slate-400">
            of {cohort.weeks} programme weeks
          </span>
          <span className="ml-auto font-mono text-[11px] text-slate-400">
            {cohort.start} → {cohort.end}
          </span>
        </div>
        <div className="mt-4">
          <Progress
            value={weekPct}
            tone={cohort.health > 75 ? "good" : "accent"}
            className="h-2"
          />
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { l: "Health", v: String(cohort.health) },
            { l: "Demo day", v: cohort.demoDay },
            { l: "Seats filled", v: `${cohort.filled}/${cohort.seats}` },
            { l: "Avg attendance", v: `${avgAttendance}%` },
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
      </Card>

      {/* ── 03 · Phase tracker ───────────────────────────────── */}
      <Card
        title="Phase tracker"
        sub="The 16-week spine every incubation programme follows"
        action={
          <span className="flex items-center gap-1.5 text-[12px] font-semibold text-slate-400">
            <Target className="h-3.5 w-3.5" /> 6 phases
          </span>
        }
      >
        <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {PROGRESS_PHASES.map((p, i) => {
            const active = p.state === "active";
            return (
              <li
                key={p.name}
                className={cn(
                  "rounded-xl border p-4 transition-all duration-300",
                  active
                    ? "border-accent bg-accent-mist"
                    : "border-line bg-white hover:border-accent/30",
                )}
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
            );
          })}
        </ol>
      </Card>

      {/* ── 04 · Velocity & attendance ───────────────────────── */}
      <div className="grid gap-5 lg:grid-cols-2">
        <Card
          title="Velocity trend"
          sub="Attendance and mentor hours by week"
          action={<Badge tone="good">91% this week</Badge>}
        >
          <div className="space-y-3.5">
            {VELOCITY.map((v) => (
              <div key={v.week} className="flex items-center gap-3">
                <span className="w-12 shrink-0 font-mono text-[11px] text-slate-400">
                  W{v.week}
                </span>
                <div className="flex-1">
                  <Progress
                    value={v.attendance}
                    tone={v.attendance >= 85 ? "good" : v.attendance >= 78 ? "accent" : "warn"}
                  />
                </div>
                <span className="w-9 text-right text-[11.5px] font-semibold tabular-nums text-ink">
                  {v.attendance}%
                </span>
                <span className="w-14 text-right font-mono text-[10.5px] text-slate-400">
                  {v.mentorHours}h
                </span>
              </div>
            ))}
          </div>
          <p className="mt-4 border-t border-line pt-3.5 text-[11.5px] text-slate-400">
            {totalMentorHours} mentor hours logged across the last {VELOCITY.length}{" "}
            weeks · {avgAttendance}% average attendance
          </p>
        </Card>

        {/* ── 05 · Weekly log ──────────────────────────────── */}
        <Card
          title="Weekly log"
          sub="What actually happened each week"
          action={
            <span className="flex items-center gap-1.5 text-[12px] font-semibold text-slate-400">
              <CalendarDays className="h-3.5 w-3.5" /> 9 weeks
            </span>
          }
          pad={false}
        >
          <ul className="divide-y divide-line">
            {VELOCITY.slice()
              .reverse()
              .map((v) => (
                <li
                  key={v.week}
                  className="flex flex-wrap items-center gap-4 px-5 py-3.5 transition-colors hover:bg-soft"
                >
                  <span className="w-12 shrink-0 font-mono text-[11.5px] font-semibold text-ink">
                    W{v.week}
                  </span>
                  <span className="min-w-[150px] flex-1 text-[12px] leading-snug text-slate-500">
                    {v.note}
                  </span>
                  <span className="w-12 shrink-0 text-right font-mono text-[10.5px] text-slate-400">
                    {v.events} ev
                  </span>
                </li>
              ))}
          </ul>
        </Card>
      </div>

      {/* ── 06 · Milestone burn-up ──────────────────────────── */}
      <Card
        title="Milestone burn-up"
        sub="Next six commitments across the live batches"
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
          {NEXT_MILESTONES.map((m) => (
            <li
              key={m.milestone}
              className="flex flex-wrap items-center gap-4 px-5 py-4 transition-colors hover:bg-soft"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent">
                <Target className="h-4 w-4" />
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

      {/* ── 07 · Blockers & slippage ─────────────────────────── */}
      <Card
        title="Blockers & slippage"
        sub="Everything currently holding a batch back"
        action={<Badge tone="bad">2 critical</Badge>}
        pad={false}
      >
        <ul className="divide-y divide-line">
          {COHORT_BLOCKERS.map((b) => (
            <li
              key={b.startup}
              className="flex flex-wrap items-center gap-4 px-5 py-4 transition-colors hover:bg-soft"
            >
              <span
                className={cn(
                  "grid h-9 w-9 shrink-0 place-items-center rounded-lg",
                  b.tone === "bad"
                    ? "bg-red-50 text-red-600"
                    : b.tone === "warn"
                      ? "bg-amber-tint text-amber-dim"
                      : "bg-soft text-slate-400",
                )}
              >
                <CircleAlert className="h-4 w-4" />
              </span>
              <div className="min-w-[190px] flex-1">
                <p className="text-[13.5px] font-semibold text-ink">{b.startup}</p>
                <p className="mt-0.5 text-[11.5px] text-slate-400">
                  {b.blocker} · owner {b.owner}
                </p>
              </div>
              <span className="hidden min-w-[180px] text-[12px] text-slate-500 lg:block">
                {b.action}
              </span>
              <span className="flex w-24 shrink-0 items-center gap-1.5 font-mono text-[10.5px] text-slate-400">
                <Clock3 className="h-3 w-3" /> {b.age}
              </span>
              <Badge tone={b.tone}>{b.severity}</Badge>
            </li>
          ))}
        </ul>
      </Card>

      {/* ── 08 · At-risk watchlist ──────────────────────────── */}
      <Card
        title="At-risk watchlist"
        sub="Startups that need a conversation this week"
        action={<Badge tone="bad">6 tracked</Badge>}
        pad={false}
      >
        <ul className="divide-y divide-line">
          {COHORT_BLOCKERS.map((b) => (
            <li
              key={`watch-${b.startup}`}
              className="flex flex-wrap items-center gap-4 px-5 py-3.5 transition-colors hover:bg-soft"
            >
              <span
                className={cn(
                  "grid h-8 w-8 shrink-0 place-items-center rounded-lg",
                  b.tone === "bad"
                    ? "bg-red-50 text-red-600"
                    : b.tone === "warn"
                      ? "bg-amber-tint text-amber-dim"
                      : "bg-soft text-slate-400",
                )}
              >
                <CircleAlert className="h-3.5 w-3.5" />
              </span>
              <div className="min-w-[150px] flex-1">
                <p className="text-[13px] font-semibold text-ink">{b.startup}</p>
                <p className="mt-0.5 text-[11px] text-slate-400">{b.blocker}</p>
              </div>
              <span className="hidden min-w-[150px] text-[11.5px] text-slate-500 sm:block">
                {b.action}
              </span>
              <Badge tone={b.tone}>{b.severity}</Badge>
            </li>
          ))}
        </ul>
      </Card>

      {/* ── 09 · Where to go next ────────────────────────────── */}
      <Card title="Where to go next" sub="From live tracking to the wider picture">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              href: "/incubator/cohorts",
              title: "Cohort management",
              body: "The portfolio, demo-day schedule and seat utilisation.",
              icon: Users,
            },
            {
              href: "/incubator/cohorts/analytics",
              title: "Cohort analytics",
              body: "Survival, funding and graduation across every cohort.",
              icon: TrendingUp,
            },
            {
              href: "/incubator/programs/calendar",
              title: "Programme calendar",
              body: "Every intake, review and demo-day date in one place.",
              icon: CalendarDays,
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
  );
}
