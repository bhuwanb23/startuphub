"use client";

import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  CalendarDays,
  ClipboardList,
  Lightbulb,
  Plus,
  Presentation,
  Users,
} from "lucide-react";
import Link from "next/link";
import { Badge, Card, PageHeader, Progress, Stat } from "@/components/app/widgets";
import { cn } from "@/lib/utils";
import {
  EVENTS,
  EVENT_ATTENDANCE,
  EVENT_ATTENTION,
  EVENT_KPIS,
  EVENT_REACH,
  EVENT_SERIES,
  EVENT_TYPE_MIX,
  EVENT_TOTALS,
  FORMAT_SPLIT,
  type EventKind,
} from "../../constants/events-data";

const KIND_FILTERS = [
  "All",
  "Demo Day",
  "Workshop",
  "Investor Event",
  "Networking",
  "Hackathon",
  "Webinar",
] as const;

const KIND_TONE: Record<EventKind, "default" | "accent" | "good" | "warn" | "bad"> = {
  "Demo Day": "accent",
  Workshop: "default",
  "Investor Event": "accent",
  Networking: "default",
  Hackathon: "warn",
  Webinar: "bad",
  Conference: "default",
};

export function Events() {
  const [kind, setKind] = useState<(typeof KIND_FILTERS)[number]>("All");

  const filtered = useMemo(
    () => (kind === "All" ? EVENTS : EVENTS.filter((e) => e.kind === kind)),
    [kind],
  );

  const fill = Math.round((EVENT_TOTALS.registered / EVENT_TOTALS.capacity) * 100);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Events & Workshops"
        desc="Demo days, workshops and mixers your startups show up to — registration, attendance and outcomes included."
        actions={
          <button className="inline-flex items-center gap-1.5 rounded-[10px] bg-accent px-4 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-accent-deep">
            <Plus className="h-3.5 w-3.5" /> Create event
          </button>
        }
      />

      {/* ── 01 · KPIs ────────────────────────────────────────── */}
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        {EVENT_KPIS.map((k) => (
          <Stat
            key={k.label}
            icon={
              k.tone === "good"
                ? Users
                : k.tone === "warn"
                  ? Lightbulb
                  : CalendarDays
            }
            label={k.label}
            value={k.value}
            delta={k.note}
            tone={k.tone === "accent" ? "good" : k.tone}
          />
        ))}
      </div>

      {/* ── 02 · Event type mix ──────────────────────────────── */}
      <div className="grid gap-5 lg:grid-cols-2">
        <Card
          title="Event type mix"
          sub="What the quarter is made of, and how many seats each type carries"
          action={<Badge tone="accent">{EVENT_TYPE_MIX.length} types</Badge>}
        >
          <div className="space-y-3.5">
            {EVENT_TYPE_MIX.map((t) => (
              <div key={t.kind} className="flex items-center gap-3">
                <span className="w-[104px] shrink-0 truncate text-[12.5px] font-medium text-slate-600">
                  {t.kind}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[11.5px] text-slate-400">{t.note}</p>
                </div>
                <span className="w-16 shrink-0 text-right text-[12px] tabular-nums text-slate-500">
                  <b className="font-semibold text-ink">{t.events}</b> events
                </span>
                <span className="w-20 shrink-0 text-right text-[12px] tabular-nums text-slate-400">
                  {t.seats.toLocaleString()} seats
                </span>
                <Badge tone={t.tone}>{t.events === 0 ? "None" : "Running"}</Badge>
              </div>
            ))}
          </div>
        </Card>

        {/* ── 03 · Format split ────────────────────────────── */}
        <Card
          title="Format split"
          sub="Virtual reaches more, in-person converts more"
          action={<Badge tone="accent">{fill}% filled</Badge>}
        >
          <div className="space-y-4">
            {FORMAT_SPLIT.map((f) => (
              <div key={f.format}>
                <div className="flex items-center gap-3">
                  <span className="w-20 shrink-0 text-[12.5px] font-medium text-slate-600">
                    {f.format}
                  </span>
                  <div className="flex-1">
                    <Progress
                      value={(f.seats / EVENT_TOTALS.capacity) * 100}
                      tone={f.tone === "good" ? "good" : "accent"}
                    />
                  </div>
                  <span className="w-14 text-right text-[12px] font-semibold tabular-nums text-ink">
                    {f.events}
                  </span>
                  <span className="w-20 text-right text-[11.5px] tabular-nums text-slate-400">
                    {f.seats.toLocaleString()} seats
                  </span>
                </div>
                <p className="mt-1 pl-[84px] text-[11.5px] text-slate-400">{f.note}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 rounded-xl border border-line bg-soft p-4 text-[12.5px] leading-relaxed text-slate-600">
            <span className="font-semibold text-ink">
              Two thirds of the seats are virtual
            </span>{" "}
            — but every one of the last three investor introductions came out of
            an in-person event. Reach is not the same as outcome.
          </p>
        </Card>
      </div>

      {/* ── 04 · Type filter ─────────────────────────────────── */}
      <div className="flex flex-wrap gap-2">
        {KIND_FILTERS.map((k) => (
          <button
            key={k}
            onClick={() => setKind(k)}
            className={cn(
              "rounded-[10px] border px-3.5 py-2 text-[12.5px] font-medium transition-colors",
              kind === k
                ? "border-ink bg-ink text-white"
                : "border-line bg-white text-slate-500 hover:border-slate-300 hover:text-ink",
            )}
          >
            {k}
            <span className="ml-1.5 text-[11px] opacity-60">
              {k === "All"
                ? EVENTS.length
                : EVENTS.filter((e) => e.kind === k).length}
            </span>
          </button>
        ))}
      </div>

      {/* ── 05 · Event list ──────────────────────────────────── */}
      <Card
        title={`The programme · ${filtered.length}`}
        sub="Every event this quarter, with its fill level"
        action={<Badge tone="warn">{EVENT_TOTALS.waitlist} waiting</Badge>}
        pad={false}
      >
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center gap-2 px-5 py-14 text-center">
            <CalendarDays className="h-6 w-6 text-slate-300" />
            <p className="text-[13px] text-slate-400">No events of that type.</p>
          </div>
        ) : (
          <ul className="divide-y divide-line">
            {filtered.map((e) => {
              const pct = Math.round((e.registered / e.capacity) * 100);
              return (
                <li
                  key={e.id}
                  className="flex flex-col gap-3 px-5 py-4 transition-colors hover:bg-soft lg:flex-row lg:items-center lg:gap-4"
                >
                  <span
                    className={cn(
                      "grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-line",
                      e.tone === "bad"
                        ? "bg-red-50 text-red-600"
                        : e.tone === "warn"
                          ? "bg-amber-tint text-amber-dim"
                          : e.tone === "good"
                            ? "bg-rise-tint text-rise"
                            : "bg-accent-mist text-accent",
                    )}
                  >
                    <CalendarDays className="h-4 w-4" />
                  </span>
                  <div className="min-w-[220px] flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-[13.5px] font-semibold text-ink">{e.title}</p>
                      <Badge tone={KIND_TONE[e.kind]}>{e.kind}</Badge>
                    </div>
                    <p className="mt-0.5 text-[11.5px] text-slate-400">
                      {e.date} · {e.time} · {e.format} · {e.location}
                    </p>
                  </div>
                  <div className="w-36 shrink-0">
                    <Progress
                      value={pct}
                      tone={pct >= 100 ? "bad" : pct > 85 ? "warn" : "accent"}
                    />
                  </div>
                  <span className="w-20 shrink-0 text-right text-[12px] tabular-nums text-slate-500">
                    <b className="font-semibold text-ink">{e.registered.toLocaleString()}</b>
                    /{e.capacity.toLocaleString()}
                  </span>
                  <span className="w-20 shrink-0 text-right text-[11.5px] text-slate-400">
                    {e.waitlist > 0 ? `${e.waitlist} waiting` : e.status}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </Card>

      {/* ── 06 · Needs attention ─────────────────────────────── */}
      <Card
        title="Needs attention"
        sub="The things that will go wrong if nobody moves this week"
        action={<Badge tone="bad">{EVENT_ATTENTION.length} open</Badge>}
        pad={false}
      >
        <ul className="divide-y divide-line">
          {EVENT_ATTENTION.map((a) => (
            <li
              key={a.id}
              className="flex flex-col gap-3 px-5 py-4 transition-colors hover:bg-soft lg:flex-row lg:items-center lg:gap-4"
            >
              <span
                className={cn(
                  "grid h-9 w-9 shrink-0 place-items-center rounded-lg",
                  a.tone === "bad"
                    ? "bg-red-50 text-red-600"
                    : a.tone === "warn"
                      ? "bg-amber-tint text-amber-dim"
                      : "bg-accent-soft text-accent",
                )}
              >
                <Lightbulb className="h-4 w-4" />
              </span>
              <div className="min-w-[220px] flex-1">
                <p className="text-[13.5px] font-semibold text-ink">{a.issue}</p>
                <p className="mt-0.5 text-[11.5px] text-slate-400">
                  {a.event} · {a.impact}
                </p>
              </div>
              <span className="hidden min-w-[220px] text-[12px] text-slate-500 lg:block">
                {a.note}
              </span>
              <span className="w-28 shrink-0 text-right text-[12px] text-slate-600">
                {a.owner}
              </span>
            </li>
          ))}
        </ul>
      </Card>

      {/* ── 07 · Event series ────────────────────────────────── */}
      <Card
        title="Recurring series"
        sub="What runs on a rhythm rather than a date"
        action={<Badge tone="accent">{EVENT_SERIES.length} series</Badge>}
        pad={false}
      >
        <ul className="divide-y divide-line">
          {EVENT_SERIES.map((s) => (
            <li
              key={s.name}
              className="flex flex-wrap items-center gap-4 px-5 py-4 transition-colors hover:bg-soft"
            >
              <span
                className={cn(
                  "grid h-9 w-9 shrink-0 place-items-center rounded-lg",
                  s.tone === "good"
                    ? "bg-rise-tint text-rise"
                    : s.tone === "warn"
                      ? "bg-amber-tint text-amber-dim"
                      : s.tone === "bad"
                        ? "bg-red-50 text-red-600"
                        : "bg-accent-soft text-accent",
                )}
              >
                <ClipboardList className="h-4 w-4" />
              </span>
              <div className="min-w-[180px] flex-1">
                <p className="text-[13.5px] font-semibold text-ink">{s.name}</p>
                <p className="mt-0.5 text-[11.5px] text-slate-400">
                  {s.cadence} · {s.audience}
                </p>
              </div>
              <span className="hidden min-w-[190px] text-[12px] text-slate-500 lg:block">
                {s.note}
              </span>
              <span className="w-20 text-right text-[12px] tabular-nums text-slate-500">
                <b className="font-semibold text-ink">{s.sessions}</b> sessions
              </span>
              <span className="w-28 shrink-0 text-right font-mono text-[10.5px] text-slate-400">
                next {s.next}
              </span>
            </li>
          ))}
        </ul>
      </Card>

      {/* ── 08 · Who's in the room ───────────────────────────── */}
      <Card
        title="Who's in the room"
        sub="How much of the programme each startup actually uses"
        action={<Badge tone="accent">{EVENT_ATTENDANCE.length} startups</Badge>}
        pad={false}
      >
        <ul className="divide-y divide-line">
          {EVENT_ATTENDANCE.map((a) => (
            <li
              key={a.startupSlug}
              className="flex flex-col gap-3 px-5 py-4 transition-colors hover:bg-soft lg:flex-row lg:items-center lg:gap-4"
            >
              <span
                className={cn(
                  "grid h-9 w-9 shrink-0 place-items-center rounded-lg text-[11px] font-bold",
                  a.tone === "good"
                    ? "bg-rise-tint text-rise"
                    : a.tone === "bad"
                      ? "bg-red-50 text-red-600"
                      : a.tone === "accent"
                        ? "bg-accent-soft text-accent"
                        : "bg-soft text-slate-500",
                )}
              >
                {a.startup
                  .split(" ")
                  .map((w) => w[0])
                  .join("")
                  .slice(0, 2)}
              </span>
              <div className="min-w-[150px] flex-1">
                <p className="text-[13.5px] font-semibold text-ink">{a.startup}</p>
                <p className="mt-0.5 text-[11.5px] text-slate-400">{a.sessions}</p>
              </div>
              <span className="hidden min-w-[200px] text-[12px] text-slate-500 lg:block">
                {a.note}
              </span>
              <span className="w-16 text-right text-[13px] font-semibold tabular-nums text-ink">
                {a.events}
              </span>
              <span className="w-14 text-right text-[11px] text-slate-400">events</span>
            </li>
          ))}
        </ul>
      </Card>

      {/* ── 09 · Programme reach ─────────────────────────────── */}
      <Card
        title="Programme reach"
        sub="Whether the events are actually being used"
        action={<Badge tone="bad">5 startups never came</Badge>}
        pad={false}
      >
        <ul className="divide-y divide-line">
          {EVENT_REACH.map((r) => {
            const pct = Math.round((r.value / r.total) * 100);
            return (
              <li
                key={r.label}
                className="flex flex-wrap items-center gap-4 px-5 py-4 transition-colors hover:bg-soft"
              >
                <span className="min-w-[220px] flex-1">
                  <span className="block text-[13.5px] font-semibold text-ink">
                    {r.label}
                  </span>
                  <span className="block text-[11.5px] text-slate-400">{r.note}</span>
                </span>
                <div className="w-28 shrink-0">
                  <Progress
                    value={pct}
                    tone={r.tone === "good" ? "good" : r.tone === "bad" ? "bad" : "accent"}
                  />
                </div>
                <span className="w-16 text-right text-[12.5px] font-semibold tabular-nums text-ink">
                  {r.value}/{r.total}
                </span>
                <span className="w-10 text-right text-[12px] tabular-nums text-slate-400">
                  {pct}%
                </span>
              </li>
            );
          })}
        </ul>
      </Card>

      {/* ── 10 · Where to go next ────────────────────────────── */}
      <Card title="Where to go next" sub="Open a part of the programme">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              href: "/incubator/events/calendar",
              title: "Event calendar",
              body: "The schedule, the clashes and the key dates.",
              icon: CalendarDays,
            },
            {
              href: "/incubator/events/registrations",
              title: "Registrations",
              body: "Who booked, who showed up, who did not.",
              icon: Users,
            },
            {
              href: "/incubator/events/speakers",
              title: "Speakers & sessions",
              body: "Who is on, and what they are running.",
              icon: Presentation,
            },
            {
              href: "/incubator/events/feedback",
              title: "Feedback & outcomes",
              body: "What the events produced, not just filled seats.",
              icon: Lightbulb,
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
