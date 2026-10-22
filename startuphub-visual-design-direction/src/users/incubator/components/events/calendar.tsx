"use client";

import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  CalendarClock,
  CalendarDays,
  CircleAlert,
  ClipboardList,
  Clock3,
  ListChecks,
} from "lucide-react";
import Link from "next/link";
import { Badge, Card, PageHeader, Progress } from "@/components/app/widgets";
import { cn } from "@/lib/utils";
import {
  EVENTS,
  EVENT_CONFLICTS,
  EVENT_LOGISTICS,
  KEY_DATES,
  MONTHS,
  type EventKind,
} from "../../constants/events-data";

const WEEKDAYS = ["M", "T", "W", "T", "F", "S", "S"];

const KIND_TONE: Record<EventKind, "default" | "accent" | "good" | "warn" | "bad"> = {
  "Demo Day": "accent",
  Workshop: "default",
  "Investor Event": "accent",
  Networking: "default",
  Hackathon: "warn",
  Webinar: "bad",
  Conference: "default",
};

export function EventCalendar() {
  const [month, setMonth] = useState(4);

  const monthEvents = useMemo(
    () => EVENTS.filter((e) => e.month === month),
    [month],
  );

  /* Day-of-month → events, for the grid. */
  const byDay = useMemo(() => {
    const map = new Map<number, typeof EVENTS>();
    for (const e of EVENTS) {
      const list = map.get(e.day) ?? [];
      list.push(e);
      map.set(e.day, list);
    }
    return map;
  }, []);

  const leading = MONTHS.find((m) => m.month === month)?.leading ?? 0;
  const daysInMonth = new Date(2026, month, 0).getDate();
  const cells = [
    ...Array.from({ length: leading }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const selected = useMemo(
    () => EVENTS.filter((e) => e.month === month).sort((a, b) => a.day - b.day),
    [month],
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Event Calendar"
        desc="One calendar across the quarter — every event, the clashes, and the dates that cannot move."
        actions={
          <Link
            href="/incubator/events"
            className="inline-flex items-center gap-1.5 rounded-[10px] border border-line bg-white px-4 py-2.5 text-[13px] font-semibold text-ink transition-colors hover:bg-soft"
          >
            All events
          </Link>
        }
      />

      {/* ── 01 · Month tabs ──────────────────────────────────── */}
      <div className="flex flex-wrap gap-2">
        {MONTHS.map((m) => (
          <button
            key={m.month}
            onClick={() => setMonth(m.month)}
            className={cn(
              "rounded-[10px] border px-4 py-2 text-[12.5px] font-medium transition-colors",
              month === m.month
                ? "border-ink bg-ink text-white"
                : "border-line bg-white text-slate-500 hover:border-slate-300 hover:text-ink",
            )}
          >
            {m.name} 2026
            <span className="ml-1.5 text-[11px] opacity-60">
              {EVENTS.filter((e) => e.month === m.month).length}
            </span>
          </button>
        ))}
      </div>

      {/* ── 02 · Calendar grid ───────────────────────────────── */}
      <Card
        title={`${MONTHS.find((m) => m.month === month)?.name} 2026`}
        sub="Every event on the day it happens"
        action={
          <Badge tone="accent">
            {monthEvents.length} event{monthEvents.length === 1 ? "" : "s"}
          </Badge>
        }
      >
        <div className="grid grid-cols-7 gap-px overflow-hidden rounded-xl border border-line bg-line">
          {WEEKDAYS.map((w, i) => (
            <div
              key={`${w}-${i}`}
              className="bg-soft py-2 text-center font-mono text-[10px] tracking-[0.12em] text-slate-400 uppercase"
            >
              {w}
            </div>
          ))}
          {cells.map((day, i) => {
            const entries = day ? (byDay.get(day) ?? []) : [];
            const isToday = month === 4 && day === 3;
            return (
              <div
                key={i}
                className={cn(
                  "min-h-[72px] p-1.5 transition-colors",
                  day ? "bg-white hover:bg-soft" : "bg-white/60",
                )}
              >
                {day !== null && (
                  <>
                    <span
                      className={cn(
                        "inline-grid h-5 w-5 place-items-center rounded-md font-mono text-[10.5px] font-semibold",
                        isToday
                          ? "bg-accent text-white"
                          : entries.length
                            ? "text-ink"
                            : "text-slate-300",
                      )}
                    >
                      {day}
                    </span>
                    <div className="mt-1 space-y-0.5">
                      {entries.slice(0, 2).map((e) => (
                        <p
                          key={e.id}
                          className="truncate rounded bg-accent-mist px-1.5 py-0.5 text-[10px] font-medium text-accent"
                          title={e.title}
                        >
                          {e.time} {e.title}
                        </p>
                      ))}
                      {entries.length > 2 && (
                        <p className="px-1.5 text-[10px] text-slate-400">
                          +{entries.length - 2} more
                        </p>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </Card>

      {/* ── 03 · Month schedule ──────────────────────────────── */}
      <Card
        title={`${MONTHS.find((m) => m.month === month)?.name} schedule`}
        sub="Each event with its agenda"
        action={<Badge tone="warn">{selected.length} in month</Badge>}
        pad={false}
      >
        <ul className="divide-y divide-line">
          {selected.map((e) => (
            <li key={e.id} className="px-5 py-4 transition-colors hover:bg-soft">
              <div className="flex flex-wrap items-center gap-4">
                <span className="grid h-12 w-12 shrink-0 flex-col place-items-center rounded-xl border border-line bg-accent-mist">
                  <span className="text-[15px] font-semibold leading-none text-ink">
                    {e.day}
                  </span>
                  <span className="mt-0.5 font-mono text-[9px] tracking-[0.1em] text-accent uppercase">
                    {e.date.split(" ")[1]}
                  </span>
                </span>
                <div className="min-w-[220px] flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-[13.5px] font-semibold text-ink">{e.title}</p>
                    <Badge tone={KIND_TONE[e.kind]}>{e.kind}</Badge>
                  </div>
                  <p className="mt-0.5 text-[11.5px] text-slate-400">
                    {e.time} · {e.duration} · {e.format} · {e.location}
                  </p>
                </div>
                <span className="hidden min-w-[200px] text-[12px] text-slate-500 lg:block">
                  {e.organizer}
                </span>
                <span className="w-24 shrink-0 text-right text-[12px] tabular-nums text-slate-500">
                  <b className="font-semibold text-ink">{e.registered.toLocaleString()}</b>
                  /{e.capacity.toLocaleString()}
                </span>
                <Badge tone={e.tone}>{e.status}</Badge>
              </div>
              <ol className="mt-3 ml-16 space-y-1 border-l border-line pl-4">
                {e.agenda.map((a) => (
                  <li key={a} className="text-[11.5px] text-slate-500">
                    {a}
                  </li>
                ))}
              </ol>
            </li>
          ))}
        </ul>
      </Card>

      {/* ── 04 · Key dates ───────────────────────────────────── */}
      <Card
        title="Key dates"
        sub="The ones the whole programme is built around"
        action={<CalendarClock className="h-4 w-4 text-slate-400" />}
        pad={false}
      >
        <ul className="divide-y divide-line">
          {KEY_DATES.map((k) => (
            <li
              key={`${k.date}-${k.title}`}
              className="flex flex-wrap items-center gap-4 px-5 py-4 transition-colors hover:bg-soft"
            >
              <span className="w-16 shrink-0 font-mono text-[11px] text-slate-400">
                {k.date}
              </span>
              <div className="min-w-[190px] flex-1">
                <p className="text-[13.5px] font-semibold text-ink">{k.title}</p>
                <p className="mt-0.5 text-[11.5px] text-slate-400">{k.detail}</p>
              </div>
              <span className="w-20 shrink-0 text-right text-[11.5px] text-slate-400">
                {k.days}
              </span>
              <Badge tone={k.tone}>
                {k.tone === "warn" ? "Watch" : k.tone === "bad" ? "Critical" : "Planned"}
              </Badge>
            </li>
          ))}
        </ul>
      </Card>

      {/* ── 05 · Conflicts ───────────────────────────────────── */}
      <Card
        title="Scheduling conflicts"
        sub="Where the calendar argues with itself"
        action={<Badge tone="bad">{EVENT_CONFLICTS.length} clashes</Badge>}
        pad={false}
      >
        <ul className="divide-y divide-line">
          {EVENT_CONFLICTS.map((c) => (
            <li
              key={c.title}
              className="flex flex-col gap-3 px-5 py-4 transition-colors hover:bg-soft sm:flex-row sm:items-center sm:gap-4"
            >
              <span
                className={cn(
                  "grid h-9 w-9 shrink-0 place-items-center rounded-lg",
                  c.tone === "bad"
                    ? "bg-red-50 text-red-600"
                    : c.tone === "warn"
                      ? "bg-amber-tint text-amber-dim"
                      : "bg-accent-soft text-accent",
                )}
              >
                <CircleAlert className="h-4 w-4" />
              </span>
              <div className="min-w-[200px] flex-1">
                <p className="text-[13.5px] font-semibold text-ink">{c.title}</p>
                <p className="mt-0.5 text-[11.5px] text-slate-400">{c.detail}</p>
              </div>
              <span className="min-w-[190px] text-[12px] text-slate-500">{c.impact}</span>
              <span className="min-w-[170px] text-[12px] text-slate-600">{c.fix}</span>
            </li>
          ))}
        </ul>
      </Card>

      {/* ── 06 · Event density ───────────────────────────────── */}
      <Card
        title="Load by week"
        sub="How many events land in each week of the quarter"
        action={<Clock3 className="h-4 w-4 text-slate-400" />}
      >
        <div className="space-y-3.5">
          {[
            { l: "Week of 06 Apr", v: 2, note: "Masterclass and the climate webinar" },
            { l: "Week of 20 Apr", v: 3, note: "Dry run, office hours and demo day" },
            { l: "Week of 04 May", v: 3, note: "Mixer, GTM clinic and hackathon" },
            { l: "Week of 25 May", v: 1, note: "Reverse pitch" },
            { l: "Week of 01 Jun", v: 2, note: "Roundtable and filing clinic" },
            { l: "Week of 15 Jun", v: 1, note: "Cohort VII welcome" },
          ].map((w) => (
            <div key={w.l} className="flex items-center gap-3">
              <span className="w-28 shrink-0 text-[12.5px] font-medium text-slate-600">
                {w.l}
              </span>
              <div className="flex-1">
                <Progress
                  value={(w.v / 3) * 100}
                  tone={w.v >= 3 ? "warn" : "accent"}
                />
              </div>
              <span className="w-8 text-right text-[12px] font-semibold tabular-nums text-ink">
                {w.v}
              </span>
              <span className="hidden min-w-[220px] text-[11.5px] text-slate-400 lg:block">
                {w.note}
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* ── 07 · Attendance by event ──────────────────────────── */}
      <Card
        title="Who each event is for"
        sub="The cohort and the audience that shows up"
        action={<ListChecks className="h-4 w-4 text-slate-400" />}
        pad={false}
      >
        <ul className="divide-y divide-line">
          {EVENTS.map((e) => (
            <li
              key={e.id}
              className="flex flex-wrap items-center gap-4 px-5 py-3.5 transition-colors hover:bg-soft"
            >
              <span className="w-16 shrink-0 font-mono text-[11px] text-slate-400">
                {e.date}
              </span>
              <span className="min-w-[190px] flex-1">
                <span className="block text-[13px] font-semibold text-ink">{e.title}</span>
                <span className="block text-[11.5px] text-slate-400">{e.eligibility}</span>
              </span>
              <span className="w-20 shrink-0 text-right text-[12px] tabular-nums text-slate-500">
                <b className="font-semibold text-ink">{e.capacity.toLocaleString()}</b> seats
              </span>
              <Badge tone={KIND_TONE[e.kind]}>{e.kind}</Badge>
            </li>
          ))}
        </ul>
      </Card>

      {/* ── 08 · Logistics ───────────────────────────────────── */}
      <Card
        title="Room & logistics"
        sub="What has to be in place before the doors open"
        action={<Badge tone="accent">{EVENT_LOGISTICS.length} events</Badge>}
        pad={false}
      >
        <ul className="divide-y divide-line">
          {EVENT_LOGISTICS.map((l) => (
            <li
              key={l.id}
              className="flex flex-col gap-3 px-5 py-4 transition-colors hover:bg-soft lg:flex-row lg:items-start lg:gap-4"
            >
              <span
                className={cn(
                  "grid h-9 w-9 shrink-0 place-items-center rounded-lg",
                  l.tone === "good"
                    ? "bg-rise-tint text-rise"
                    : l.tone === "warn"
                      ? "bg-amber-tint text-amber-dim"
                      : "bg-accent-soft text-accent",
                )}
              >
                <ClipboardList className="h-4 w-4" />
              </span>
              <div className="min-w-[200px] flex-1">
                <p className="text-[13.5px] font-semibold text-ink">{l.event}</p>
                <p className="mt-0.5 text-[11.5px] text-slate-400">
                  {l.venue} · {l.setup}
                </p>
              </div>
              <div className="flex flex-1 flex-wrap gap-1.5">
                {l.checklist.map((c) => (
                  <span
                    key={c}
                    className="rounded-md bg-soft px-2 py-1 text-[10.5px] font-medium text-slate-500"
                  >
                    {c}
                  </span>
                ))}
              </div>
              <span className="w-20 shrink-0 text-right text-[12px] tabular-nums text-slate-500">
                <b className="font-semibold text-ink">{l.crew}</b> crew
              </span>
            </li>
          ))}
        </ul>
      </Card>

      {/* ── 09 · Where to go next ────────────────────────────── */}
      <Card title="Where to go next" sub="From the schedule to the detail">
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            {
              href: "/incubator/events",
              title: "All events",
              body: "The full programme with fill levels.",
              icon: CalendarDays,
            },
            {
              href: "/incubator/events/registrations",
              title: "Registrations",
              body: "Who booked and who showed up.",
              icon: ListChecks,
            },
            {
              href: "/incubator/events/speakers",
              title: "Speakers & sessions",
              body: "Who is running each of these.",
              icon: CircleAlert,
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
