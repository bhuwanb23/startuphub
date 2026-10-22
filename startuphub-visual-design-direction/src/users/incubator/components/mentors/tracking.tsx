"use client";

import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  History,
  MessageSquare,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";
import Link from "next/link";
import { Badge, Card, PageHeader, Progress } from "@/components/app/widgets";
import { cn } from "@/lib/utils";
import {
  ACTION_ITEMS,
  BENCH,
  FEEDBACK_SIGNALS,
  IMPACT,
  SESSION_LOG,
} from "../../constants/mentors-data";

const MENTOR_FILTERS = ["All", ...BENCH.map((m) => m.name)] as const;

export function MentorshipTracking() {
  const [mentor, setMentor] = useState<(typeof MENTOR_FILTERS)[number]>("All");
  const [showClosed, setShowClosed] = useState(false);

  const sessions = useMemo(
    () =>
      mentor === "All"
        ? SESSION_LOG
        : SESSION_LOG.filter((s) => s.mentor === mentor),
    [mentor],
  );

  const actions = useMemo(
    () => ACTION_ITEMS.filter((a) => showClosed || !a.done),
    [showClosed],
  );

  const totalSessions = SESSION_LOG.length;
  const totalActions = ACTION_ITEMS.length;
  const closedActions = ACTION_ITEMS.filter((a) => a.done).length;
  const avgRating =
    Math.round((SESSION_LOG.reduce((s, x) => s + x.rating, 0) / totalSessions) * 10) / 10;
  const avgImproved = Math.round(
    IMPACT.reduce((s, i) => s + (i.healthAfter - i.healthBefore), 0) / IMPACT.length,
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Mentorship Tracking"
        desc="Sessions, action items, mentee progress and impact attribution across the whole bench."
        actions={
          <Link
            href="/incubator/mentors/assignments"
            className="inline-flex items-center gap-1.5 rounded-[10px] border border-line bg-white px-4 py-2.5 text-[13px] font-semibold text-ink transition-colors hover:bg-soft"
          >
            Assignment board
          </Link>
        }
      />

      {/* ── 01 · Tracking KPIs ───────────────────────────────── */}
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        {[
          { label: "Sessions delivered", value: String(totalSessions), note: "since January", tone: "accent" as const },
          { label: "Action items closed", value: `${closedActions}/${totalActions}`, note: "across all pairings", tone: "good" as const },
          { label: "Average session rating", value: String(avgRating), note: "out of 5", tone: "good" as const },
          { label: "Avg health gain", value: `+${avgImproved}`, note: "per mentored startup", tone: "good" as const },
        ].map((k) => (
          <div
            key={k.label}
            className="rounded-2xl border border-line bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-soft"
          >
            <p className="text-[12px] font-medium text-slate-500">{k.label}</p>
            <p className="mt-2.5 text-[26px] font-semibold leading-none tracking-[-0.03em] text-ink tabular-nums">
              {k.value}
            </p>
            <p className="mt-1.5 text-[11.5px] text-slate-400">{k.note}</p>
          </div>
        ))}
      </div>

      {/* ── 02 · Mentor filter ───────────────────────────────── */}
      <div className="flex flex-wrap gap-2">
        {MENTOR_FILTERS.map((m) => (
          <button
            key={m}
            onClick={() => setMentor(m)}
            className={cn(
              "rounded-[10px] border px-3.5 py-2 text-[12.5px] font-medium transition-colors",
              mentor === m
                ? "border-ink bg-ink text-white"
                : "border-line bg-white text-slate-500 hover:border-slate-300 hover:text-ink",
            )}
          >
            {m}
            {m !== "All" && (
              <span className="ml-1.5 text-[11px] opacity-60">
                {SESSION_LOG.filter((s) => s.mentor === m).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* ── 03 · Session log ─────────────────────────────────── */}
      <Card
        title={`Session log · ${sessions.length}`}
        sub="Every session, what it covered and how it landed"
        action={
          <span className="flex items-center gap-1.5 text-[12px] font-semibold text-slate-400">
            <History className="h-3.5 w-3.5" /> Since Jan 2026
          </span>
        }
        pad={false}
      >
        {sessions.length === 0 ? (
          <div className="flex flex-col items-center gap-2 px-5 py-14 text-center">
            <CalendarDays className="h-6 w-6 text-slate-300" />
            <p className="text-[13px] text-slate-400">No sessions logged yet.</p>
          </div>
        ) : (
          <ul className="divide-y divide-line">
            {sessions.map((s) => (
              <li
                key={s.id}
                className="flex flex-col gap-3 px-5 py-4 transition-colors hover:bg-soft lg:flex-row lg:items-center"
              >
                <span
                  className={cn(
                    "grid h-9 w-9 shrink-0 place-items-center rounded-lg",
                    s.tone === "good"
                      ? "bg-rise-tint text-rise"
                      : s.tone === "warn"
                        ? "bg-amber-tint text-amber-dim"
                        : "bg-red-50 text-red-600",
                  )}
                >
                  <MessageSquare className="h-4 w-4" />
                </span>
                <div className="min-w-[210px] flex-1">
                  <p className="text-[13.5px] font-semibold text-ink">{s.topic}</p>
                  <p className="mt-0.5 text-[11.5px] text-slate-400">
                    {s.mentor} · {s.startup} · {s.date} · {s.duration}
                  </p>
                </div>
                <span className="text-[11.5px] tabular-nums text-slate-500">
                  {s.closed}/{s.actions} actions closed
                </span>
                <span className="flex w-16 shrink-0 items-center gap-1 text-[12px] font-semibold text-amber-500">
                  <Star className="h-3.5 w-3.5" /> {s.rating}
                </span>
              </li>
            ))}
          </ul>
        )}
      </Card>

      {/* ── 04 · Action items ────────────────────────────────── */}
      <Card
        title="Action items"
        sub="What each session left open"
        action={
          <button
            onClick={() => setShowClosed((v) => !v)}
            className="rounded-lg border border-line bg-white px-2.5 py-1.5 text-[11.5px] font-semibold text-slate-600 transition-colors hover:border-accent/40 hover:text-accent"
          >
            {showClosed ? "Hide closed" : "Show closed"}
          </button>
        }
        pad={false}
      >
        {actions.length === 0 ? (
          <div className="flex flex-col items-center gap-2 px-5 py-14 text-center">
            <CheckCircle2 className="h-6 w-6 text-rise" />
            <p className="text-[13px] text-slate-400">Every action item is closed.</p>
          </div>
        ) : (
          <ul className="divide-y divide-line">
            {actions.map((a) => (
              <li
                key={a.id}
                className="flex flex-wrap items-center gap-4 px-5 py-4 transition-colors hover:bg-soft"
              >
                {a.done ? (
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-rise" />
                ) : (
                  <span className="h-4 w-4 shrink-0 rounded-full border-2 border-line" />
                )}
                <div className="min-w-[210px] flex-1">
                  <p
                    className={cn(
                      "text-[13px] font-medium",
                      a.done ? "text-slate-400 line-through" : "text-ink",
                    )}
                  >
                    {a.text}
                  </p>
                  <p className="mt-0.5 text-[11.5px] text-slate-400">
                    {a.owner} · {a.due}
                  </p>
                </div>
                <Badge tone={a.done ? "good" : a.due === "Overdue" ? "bad" : "warn"}>
                  {a.done ? "Closed" : a.due === "Overdue" ? "Overdue" : "Open"}
                </Badge>
              </li>
            ))}
          </ul>
        )}
      </Card>

      {/* ── 05 · Sessions per month ─────────────────────────── */}
      <Card
        title="Sessions per month"
        sub="Cadence across the bench, month by month"
        action={<Badge tone="good">Steady at 8–10</Badge>}
      >
        <div className="space-y-3.5">
          {[
            { m: "Jan", n: 8, tone: "accent" as const },
            { m: "Feb", n: 9, tone: "accent" as const },
            { m: "Mar", n: 12, tone: "good" as const },
            { m: "Apr", n: 6, tone: "warn" as const },
          ].map((x) => (
            <div key={x.m} className="flex items-center gap-3">
              <span className="w-12 shrink-0 font-mono text-[11px] text-slate-400">
                {x.m}
              </span>
              <Progress
                value={(x.n / 12) * 100}
                tone={x.tone === "good" ? "good" : x.tone === "warn" ? "warn" : "accent"}
                className="flex-1"
              />
              <span className="w-8 text-right text-[12px] font-semibold tabular-nums text-ink">
                {x.n}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-4 rounded-xl border border-line bg-soft p-4 text-[12.5px] leading-relaxed text-slate-600">
          <span className="font-semibold text-ink">March was the peak</span> — driven by
          the Cohort VI demo-day push. April is lighter because graduation
          sessions have not been scheduled yet.
        </p>
      </Card>

      {/* ── 06 · Topics covered ──────────────────────────────── */}
      <Card
        title="Topics covered"
        sub="What the bench has actually worked on"
        action={<Badge tone="accent">8 themes</Badge>}
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { t: "Cost & unit economics", n: 6, tone: "good" as const },
            { t: "Architecture review", n: 5, tone: "good" as const },
            { t: "Enterprise procurement", n: 4, tone: "accent" as const },
            { t: "Fundraising readiness", n: 4, tone: "accent" as const },
            { t: "Product & onboarding", n: 3, tone: "default" as const },
            { t: "Supply chain", n: 2, tone: "default" as const },
            { t: "Growth & retention", n: 2, tone: "default" as const },
            { t: "IP & licensing", n: 1, tone: "warn" as const },
          ].map((x) => (
            <div
              key={x.t}
              className="rounded-xl border border-line p-4 transition-colors hover:border-accent/25"
            >
              <p className="text-[12.5px] font-semibold text-ink">{x.t}</p>
              <p className="mt-2 text-[20px] font-semibold leading-none tracking-[-0.03em] text-ink tabular-nums">
                {x.n}
                <span className="ml-1 text-[11px] font-normal text-slate-400">
                  sessions
                </span>
              </p>
              <div className="mt-2.5">
                <Badge tone={x.tone}>
                  {x.tone === "good"
                    ? "Covered"
                    : x.tone === "warn"
                      ? "Thin"
                      : "Covered"}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* ── 07 · Hours against allowance ─────────────────────── */}
      <Card
        title="Hours against allowance"
        sub="Per mentor, against the programme allowance"
        action={<Badge tone="warn">2 under target</Badge>}
      >
        <div className="space-y-4">
          {BENCH.map((m) => {
            const load = Math.round((m.hours / m.target) * 100);
            return (
              <div key={m.slug} className="flex items-center gap-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-ink text-[10px] font-bold text-white">
                  {m.initials}
                </span>
                <span className="w-[110px] shrink-0 truncate text-[12.5px] font-medium text-slate-600">
                  {m.name}
                </span>
                <Progress
                  value={Math.min(100, load)}
                  tone={load > 95 ? "good" : load < 60 ? "warn" : "accent"}
                  className="flex-1"
                />
                <span className="w-14 text-right text-[12px] font-semibold tabular-nums text-ink">
                  {m.hours}/{m.target}h
                </span>
                <span className="hidden w-20 text-right font-mono text-[10.5px] text-slate-400 sm:block">
                  {m.sessions} sessions
                </span>
              </div>
            );
          })}
        </div>
      </Card>

      {/* ── 08 · Feedback signals ────────────────────────────── */}
      <Card
        title="Feedback signals"
        sub="What is moving the match scores"
        action={
          <span className="flex items-center gap-1.5 text-[12px] font-semibold text-slate-400">
            <TrendingUp className="h-3.5 w-3.5" /> Live
          </span>
        }
        pad={false}
      >
        <ul className="divide-y divide-line">
          {FEEDBACK_SIGNALS.map((f) => (
            <li
              key={f.signal}
              className="flex flex-wrap items-center gap-4 px-5 py-4 transition-colors hover:bg-soft"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent">
                <TrendingUp className="h-4 w-4" />
              </span>
              <div className="min-w-[190px] flex-1">
                <p className="text-[13.5px] font-semibold text-ink">{f.signal}</p>
                <p className="mt-0.5 text-[11.5px] text-slate-400">{f.when}</p>
              </div>
              <span className="text-[12.5px] font-semibold text-rise">{f.effect}</span>
            </li>
          ))}
        </ul>
      </Card>

      {/* ── 09 · Impact attribution ──────────────────────────── */}
      <Card
        title="Impact attribution"
        sub="Startup health before and after being mentored"
        action={<Badge tone="good">+{avgImproved} average</Badge>}
        pad={false}
      >
        <ul className="divide-y divide-line">
          {IMPACT.map((i) => {
            const delta = i.healthAfter - i.healthBefore;
            return (
              <li
                key={i.startup}
                className="flex flex-wrap items-center gap-4 px-5 py-4 transition-colors hover:bg-soft"
              >
                <span
                  className={cn(
                    "grid h-9 w-9 shrink-0 place-items-center rounded-lg",
                    delta > 0 ? "bg-rise-tint text-rise" : "bg-red-50 text-red-600",
                  )}
                >
                  <TrendingUp className="h-4 w-4" />
                </span>
                <div className="min-w-[190px] flex-1">
                  <p className="text-[13.5px] font-semibold text-ink">{i.startup}</p>
                  <p className="mt-0.5 text-[11.5px] text-slate-400">{i.note}</p>
                </div>
                <span className="w-[92px] text-right text-[12px] tabular-nums text-slate-500">
                  {i.healthBefore} →{" "}
                  <b className="font-semibold text-ink">{i.healthAfter}</b>
                </span>
                <Badge tone={delta > 0 ? "good" : "bad"}>
                  {delta > 0 ? `+${delta} health` : `${delta} health`}
                </Badge>
              </li>
            );
          })}
        </ul>
      </Card>

      {/* ── 10 · Where to go next ────────────────────────────── */}
      <Card title="Where to go next" sub="From the log to the decision">
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            {
              href: "/incubator/mentors",
              title: "Back to the bench",
              body: "Hours, load and expertise gaps across the team.",
              icon: Clock3,
            },
            {
              href: "/incubator/mentors/assignments",
              title: "Rebalance the board",
              body: "Move a pairing off a mentor who is over their allowance.",
              icon: Users,
            },
            {
              href: "/incubator/mentors/discover",
              title: "Find more mentors",
              body: "The wider network, matched to programme gaps.",
              icon: MessageSquare,
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
