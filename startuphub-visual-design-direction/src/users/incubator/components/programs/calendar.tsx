"use client";

import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  CalendarClock,
  CalendarDays,
  CircleAlert,
  Clock3,
  Users,
} from "lucide-react";
import Link from "next/link";
import { Badge, Card, PageHeader } from "@/components/app/widgets";
import { cn } from "@/lib/utils";
import {
  CALENDAR_CONFLICTS,
  CALENDAR_EVENTS,
  KEY_DATES,
  PROGRAMS,
  type CalendarEventType,
} from "../../constants/programs-data";

const TYPE_FILTERS = [
  "All",
  "Intake",
  "Review",
  "Demo day",
  "Milestone",
  "Deadline",
  "Workshop",
] as const;

const TYPE_TONE: Record<CalendarEventType, "default" | "accent" | "good" | "warn" | "bad"> = {
  Intake: "accent",
  Review: "warn",
  "Demo day": "good",
  Milestone: "default",
  Deadline: "bad",
  Decision: "accent",
  Workshop: "default",
};

const MONTHS = ["March", "April", "May", "June"];
const WEEKDAYS = ["M", "T", "W", "T", "F", "S", "S"];

/* April 2026 starts on a Wednesday. */
const LEADING_BLANKS = 2;

export function ProgramCalendar() {
  const [type, setType] = useState<(typeof TYPE_FILTERS)[number]>("All");

  const events = useMemo(
    () =>
      CALENDAR_EVENTS.filter((e) => {
        if (e.month !== 4) return false;
        if (type !== "All" && e.type !== type) return false;
        return true;
      }),
    [type],
  );

  const byDay = useMemo(() => {
    const map = new Map<number, typeof CALENDAR_EVENTS>();
    for (const e of events) {
      const list = map.get(e.day) ?? [];
      map.set(e.day, [...list, e]);
    }
    return map;
  }, [events]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Program Calendar"
        desc="One calendar across programmes — intakes, reviews, demo days, milestones and deadlines."
        actions={
          <span className="inline-flex items-center gap-1.5 rounded-[10px] border border-line bg-white px-4 py-2.5 text-[13px] font-semibold text-ink">
            <CalendarDays className="h-3.5 w-3.5 text-slate-400" /> April 2026
          </span>
        }
      />

      {/* ── 01 · Type filters ────────────────────────────────── */}
      <div className="flex flex-wrap gap-2">
        {TYPE_FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setType(f)}
            className={cn(
              "rounded-[10px] border px-3.5 py-2 text-[12.5px] font-medium transition-colors",
              type === f
                ? "border-ink bg-ink text-white"
                : "border-line bg-white text-slate-500 hover:border-slate-300 hover:text-ink",
            )}
          >
            {f}
            <span className="ml-1.5 text-[11px] opacity-60">
              {f === "All"
                ? CALENDAR_EVENTS.filter((e) => e.month === 4).length
                : CALENDAR_EVENTS.filter((e) => e.month === 4 && e.type === f)
                    .length}
            </span>
          </button>
        ))}
      </div>

      {/* ── 02 · Month grid ─────────────────────────────────── */}
      <Card
        title="April 2026"
        sub={`${events.length} events across ${PROGRAMS.length} programmes`}
        action={
          <div className="flex gap-3">
            {(["Review", "Demo day", "Deadline"] as const).map((t) => (
              <span key={t} className="flex items-center gap-1.5 text-[11px] text-slate-400">
                <span
                  className={cn(
                    "h-2 w-2 rounded-full",
                    t === "Review"
                      ? "bg-amber-dim"
                      : t === "Demo day"
                        ? "bg-rise"
                        : "bg-red-500",
                  )}
                />
                {t}
              </span>
            ))}
          </div>
        }
      >
        <div className="grid grid-cols-7 gap-1.5">
          {WEEKDAYS.map((d, i) => (
            <span
              key={`${d}-${i}`}
              className="pb-1 text-center font-mono text-[9.5px] tracking-[0.12em] text-slate-400 uppercase"
            >
              {d}
            </span>
          ))}
          {Array.from({ length: LEADING_BLANKS }).map((_, i) => (
            <span key={`blank-${i}`} />
          ))}
          {Array.from({ length: 30 }).map((_, i) => {
            const day = i + 1;
            const dayEvents = byDay.get(day) ?? [];
            return (
              <div
                key={day}
                className={cn(
                  "flex min-h-[74px] flex-col gap-1 rounded-lg border p-1.5 transition-colors",
                  dayEvents.length
                    ? "border-line bg-white"
                    : "border-transparent bg-soft/50",
                )}
              >
                <span
                  className={cn(
                    "text-[11px] font-semibold tabular-nums",
                    dayEvents.length ? "text-ink" : "text-slate-300",
                  )}
                >
                  {day}
                </span>
                {dayEvents.map((e) => (
                  <span
                    key={e.id}
                    className={cn(
                      "truncate rounded px-1 py-0.5 text-[9.5px] font-medium",
                      e.type === "Review"
                        ? "bg-amber-tint text-amber-dim"
                        : e.type === "Demo day"
                          ? "bg-rise-tint text-rise"
                          : e.type === "Deadline"
                            ? "bg-red-50 text-red-600"
                            : e.type === "Intake"
                              ? "bg-accent-soft text-accent"
                              : "bg-slate-100 text-slate-500",
                    )}
                    title={`${e.title} · ${e.time}`}
                  >
                    {e.title}
                  </span>
                ))}
              </div>
            );
          })}
        </div>
      </Card>

      {/* ── 03 · Key dates ───────────────────────────────────── */}
      <Card
        title="Next 90 days"
        sub="Every hard date, soonest first"
        action={<Badge tone="accent">8 dates</Badge>}
        pad={false}
      >
        <ul className="divide-y divide-line">
          {KEY_DATES.map((k) => (
            <li
              key={k.title}
              className="flex flex-wrap items-center gap-4 px-5 py-4 transition-colors hover:bg-soft"
            >
              <span className="w-14 shrink-0 font-mono text-[12px] font-semibold text-ink">
                {k.date}
              </span>
              <div className="min-w-[200px] flex-1">
                <p className="text-[13.5px] font-semibold text-ink">{k.title}</p>
                <p className="mt-0.5 text-[11.5px] text-slate-400">{k.detail}</p>
              </div>
              <span className="font-mono text-[11px] text-slate-400">{k.days}</span>
              <Badge tone={TYPE_TONE[k.type]}>{k.type}</Badge>
            </li>
          ))}
        </ul>
      </Card>

      {/* ── 04 · Intake windows timeline ─────────────────────── */}
      <Card
        title="Intake windows"
        sub="When each batch opens and closes"
        action={
          <span className="flex items-center gap-1.5 text-[12px] font-semibold text-slate-400">
            <CalendarClock className="h-3.5 w-3.5" /> 3 open
          </span>
        }
      >
        <ol className="space-y-4">
          {PROGRAMS.filter((p) => p.status !== "Completed").map((p) => (
            <li key={p.slug}>
              <div className="flex items-baseline justify-between gap-3">
                <p className="text-[13px] font-semibold text-ink">{p.name}</p>
                <span className="font-mono text-[10.5px] text-slate-400">
                  {p.start} → {p.end}
                </span>
              </div>
              <div className="relative mt-2 h-1.5 rounded-full bg-soft">
                <div
                  className={cn(
                    "absolute inset-y-0 left-0 rounded-full",
                    p.status === "Intake" ? "bg-amber-dim" : "bg-accent",
                  )}
                  style={{ width: p.status === "Intake" ? "18%" : "74%" }}
                />
              </div>
              <p className="mt-1.5 text-[11.5px] text-slate-400">
                {p.weeks} weeks · {p.seats} seats · {p.lead}
              </p>
            </li>
          ))}
        </ol>
      </Card>

      {/* ── 05 · Review & decision deadlines ─────────────────── */}
      <Card
        title="Review & decision deadlines"
        sub="The gates that decide who gets a seat"
        action={<Badge tone="bad">2 hard dates</Badge>}
        pad={false}
      >
        <ul className="divide-y divide-line">
          {CALENDAR_EVENTS.filter((e) => e.type === "Review" || e.type === "Deadline")
            .sort((a, b) => a.day - b.day)
            .map((e) => (
              <li
                key={e.id}
                className="flex flex-wrap items-center gap-4 px-5 py-4 transition-colors hover:bg-soft"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent">
                  <Clock3 className="h-4 w-4" />
                </span>
                <div className="min-w-[200px] flex-1">
                  <p className="text-[13.5px] font-semibold text-ink">{e.title}</p>
                  <p className="mt-0.5 text-[11.5px] text-slate-400">
                    {e.cohort} · {e.time} · {e.location}
                  </p>
                </div>
                <span className="font-mono text-[11.5px] text-slate-500">
                  0{e.day} Apr
                </span>
                <Badge tone={TYPE_TONE[e.type]}>{e.type}</Badge>
              </li>
            ))}
        </ul>
      </Card>

      {/* ── 06 · Demo-day timeline ────────────────────────────── */}
      <Card
        title="Demo-day timeline"
        sub="From dry run to the room"
        action={
          <span className="flex items-center gap-1.5 text-[12px] font-semibold text-slate-400">
            <Users className="h-3.5 w-3.5" /> 240 guests
          </span>
        }
      >
        <ol className="relative space-y-4 border-l border-line pl-5">
          {CALENDAR_EVENTS.filter((e) => e.type === "Demo day")
            .sort((a, b) => a.day - b.day)
            .map((e) => (
              <li key={e.id} className="relative">
                <span className="absolute -left-[26.5px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-rise bg-white" />
                <p className="font-mono text-[10px] tracking-[0.1em] text-rise uppercase">
                  0{e.day} Apr · {e.time}
                </p>
                <p className="mt-0.5 text-[13.5px] font-semibold text-ink">{e.title}</p>
                <p className="mt-0.5 text-[12px] text-slate-500">{e.note}</p>
                <p className="mt-1 font-mono text-[10.5px] text-slate-400">
                  {e.cohort} · {e.location}
                </p>
              </li>
            ))}
        </ol>
        <p className="mt-5 rounded-xl border border-line bg-soft p-4 text-[12.5px] leading-relaxed text-slate-500">
          <span className="font-semibold text-ink">Run of show:</span> dry run 25 Apr,
          investor office hours 24 Apr, main demo day 28 Apr at 16:00 — hybrid, with
          the data room closed 48 hours before.
        </p>
      </Card>

      {/* ── 07 · Capacity conflicts ──────────────────────────── */}
      <Card
        title="Capacity conflicts"
        sub="Where the calendar fights itself"
        action={<Badge tone="bad">3 flagged</Badge>}
        pad={false}
      >
        <ul className="divide-y divide-line">
          {CALENDAR_CONFLICTS.map((c) => (
            <li
              key={c.title}
              className="flex flex-wrap items-start gap-4 px-5 py-4 transition-colors hover:bg-soft"
            >
              <span
                className={cn(
                  "grid h-9 w-9 shrink-0 place-items-center rounded-lg",
                  c.tone === "bad"
                    ? "bg-red-50 text-red-600"
                    : "bg-amber-tint text-amber-dim",
                )}
              >
                <CircleAlert className="h-4 w-4" />
              </span>
              <div className="min-w-[200px] flex-1">
                <p className="text-[13.5px] font-semibold text-ink">{c.title}</p>
                <p className="mt-0.5 text-[12px] leading-relaxed text-slate-500">
                  {c.detail}
                </p>
              </div>
              <span className="font-mono text-[10.5px] tracking-[0.06em] text-slate-400 uppercase">
                {c.impact}
              </span>
            </li>
          ))}
        </ul>
      </Card>

      {/* ── 08 · By programme ───────────────────────────────── */}
      <Card
        title="By programme"
        sub="How the month's load splits across batches"
        action={<Badge tone="accent">{PROGRAMS.length} programmes</Badge>}
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {PROGRAMS.filter((p) => p.status !== "Completed").map((p) => {
            const count = CALENDAR_EVENTS.filter(
              (e) => e.cohort.includes(p.name.split(" — ")[0]) || e.cohort === p.name,
            ).length;
            return (
              <div
                key={p.slug}
                className="rounded-xl border border-line p-4 transition-colors hover:border-accent/25"
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="text-[13px] font-semibold text-ink">{p.name}</p>
                  <span className="shrink-0 text-[17px] font-semibold tracking-[-0.02em] text-ink tabular-nums">
                    {count}
                  </span>
                </div>
                <p className="mt-1 text-[11.5px] text-slate-400">
                  events in the current window
                </p>
                <p className="mt-2.5 border-t border-line pt-2.5 font-mono text-[10px] tracking-[0.06em] text-slate-400 uppercase">
                  {p.start} → {p.end}
                </p>
              </div>
            );
          })}
        </div>
      </Card>

      {/* ── 09 · Where to go next ────────────────────────────── */}
      <Card title="Where to go next" sub="The calendar in context">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              href: "/incubator/programs",
              title: "Back to programs",
              body: "Every batch and its current phase.",
              icon: CalendarDays,
            },
            {
              href: "/incubator/programs/applications",
              title: "Intake in flight",
              body: "23 applications inside the April window.",
              icon: Users,
            },
            {
              href: "/incubator/programs/evaluation",
              title: "What is being scored",
              body: "Five reviews open, two already overdue.",
              icon: Clock3,
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
