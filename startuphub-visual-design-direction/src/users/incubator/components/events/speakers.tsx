"use client";

import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  CalendarDays,
  Mic,
  Presentation,
  Star,
  Users,
} from "lucide-react";
import Link from "next/link";
import { Badge, Card, PageHeader, Progress, Stat } from "@/components/app/widgets";
import { cn } from "@/lib/utils";
import {
  SESSIONS,
  SPEAKER_AVAILABILITY,
  SPEAKER_RATINGS,
  SPEAKERS,
  TOPIC_DEMAND,
  type EventFormat,
} from "../../constants/events-data";

const FORMAT_TONE: Record<EventFormat, "default" | "accent" | "good" | "warn" | "bad"> = {
  Virtual: "good",
  "In-person": "accent",
  Hybrid: "accent",
};

export function EventSpeakers() {
  const [format, setFormat] = useState<"All" | EventFormat>("All");

  const sessions = useMemo(
    () =>
      format === "All"
        ? SESSIONS
        : SESSIONS.filter((s) => s.format === format),
    [format],
  );

  const mentorLed = SPEAKERS.filter((s) => s.kind === "Mentor").length;
  const totalSeats = SESSIONS.reduce((s, x) => s + x.seats, 0);
  const totalFilled = SESSIONS.reduce((s, x) => s + x.filled, 0);
  const avgRating =
    Math.round(
      (SPEAKERS.reduce((s, x) => s + x.rating, 0) / SPEAKERS.length) * 10,
    ) / 10;
  const uncovered = TOPIC_DEMAND.filter((t) => !t.covered).length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Speakers & Sessions"
        desc="Who is on the bill, what they are running, and which topics nobody is covering."
        actions={
          <Link
            href="/incubator/events"
            className="inline-flex items-center gap-1.5 rounded-[10px] border border-line bg-white px-4 py-2.5 text-[13px] font-semibold text-ink transition-colors hover:bg-soft"
          >
            All events
          </Link>
        }
      />

      {/* ── 01 · KPIs ────────────────────────────────────────── */}
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        <Stat
          icon={Mic}
          label="Speakers & mentors"
          value={String(SPEAKERS.length)}
          delta={`${mentorLed} of them are on the bench`}
          tone="good"
        />
        <Stat
          icon={Presentation}
          label="Sessions running"
          value={String(SESSIONS.length)}
          delta="across 8 distinct events"
          tone="good"
        />
        <Stat
          icon={Star}
          label="Average rating"
          value={avgRating.toFixed(1)}
          delta="out of 5 from attendees"
          tone="good"
        />
        <Stat
          icon={Users}
          label="Seats filled"
          value={totalFilled.toLocaleString()}
          delta={`of ${totalSeats.toLocaleString()} across sessions`}
          tone="warn"
        />
      </div>

      {/* ── 02 · Speaker roster ──────────────────────────────── */}
      <Card
        title="Speaker roster"
        sub="Every voice on the programme this quarter"
        action={<Badge tone="accent">{SPEAKERS.length} speakers</Badge>}
        pad={false}
      >
        <ul className="divide-y divide-line">
          {SPEAKERS.map((s) => (
            <li
              key={s.id}
              className="flex flex-col gap-3 px-5 py-4 transition-colors hover:bg-soft lg:flex-row lg:items-center lg:gap-4"
            >
              <span
                className={cn(
                  "grid h-10 w-10 shrink-0 place-items-center rounded-lg text-[11px] font-bold",
                  s.kind === "Mentor"
                    ? "bg-accent-soft text-accent"
                    : s.kind === "Investor"
                      ? "bg-rise-tint text-rise"
                      : s.kind === "Founder"
                        ? "bg-amber-tint text-amber-dim"
                        : "bg-soft text-slate-500",
                )}
              >
                {s.initials}
              </span>
              <div className="min-w-[190px] flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-[13.5px] font-semibold text-ink">{s.name}</p>
                  <Badge tone={s.tone}>{s.kind}</Badge>
                </div>
                <p className="mt-0.5 text-[11.5px] text-slate-400">
                  {s.role} · {s.org} · {s.topics.join(", ")}
                </p>
              </div>
              <span className="hidden min-w-[210px] text-[12px] text-slate-500 lg:block">
                {s.note}
              </span>
              <span className="w-16 text-right text-[12px] tabular-nums text-slate-500">
                <b className="font-semibold text-ink">{s.sessions}</b> sessions
              </span>
              <span className="w-14 text-right text-[12.5px] font-semibold tabular-nums text-ink">
                {s.rating}
              </span>
              <span className="hidden w-32 text-right text-[11.5px] text-slate-400 sm:block">
                {s.availability}
              </span>
            </li>
          ))}
        </ul>
      </Card>

      {/* ── 03 · Format filter ───────────────────────────────── */}
      <div className="flex flex-wrap gap-2">
        {(["All", "Virtual", "In-person", "Hybrid"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFormat(f)}
            className={cn(
              "rounded-[10px] border px-3.5 py-2 text-[12.5px] font-medium transition-colors",
              format === f
                ? "border-ink bg-ink text-white"
                : "border-line bg-white text-slate-500 hover:border-slate-300 hover:text-ink",
            )}
          >
            {f}
            <span className="ml-1.5 text-[11px] opacity-60">
              {f === "All"
                ? SESSIONS.length
                : SESSIONS.filter((s) => s.format === f).length}
            </span>
          </button>
        ))}
      </div>

      {/* ── 04 · Session line-up ─────────────────────────────── */}
      <Card
        title="Session line-up"
        sub="Every session, who runs it and how full it is"
        action={<Badge tone="warn">{sessions.length} sessions</Badge>}
        pad={false}
      >
        <ul className="divide-y divide-line">
          {sessions.map((s) => {
            const pct = Math.round((s.filled / s.seats) * 100);
            return (
              <li
                key={s.id}
                className="flex flex-col gap-3 px-5 py-4 transition-colors hover:bg-soft lg:flex-row lg:items-center lg:gap-4"
              >
                <span
                  className={cn(
                    "grid h-9 w-9 shrink-0 place-items-center rounded-lg",
                    s.tone === "bad"
                      ? "bg-red-50 text-red-600"
                      : s.tone === "warn"
                        ? "bg-amber-tint text-amber-dim"
                        : s.tone === "good"
                          ? "bg-rise-tint text-rise"
                          : "bg-accent-soft text-accent",
                  )}
                >
                  <Presentation className="h-4 w-4" />
                </span>
                <div className="min-w-[210px] flex-1">
                  <p className="text-[13.5px] font-semibold text-ink">{s.title}</p>
                  <p className="mt-0.5 text-[11.5px] text-slate-400">
                    {s.event} · {s.date} · {s.duration} · {s.facilitator}
                  </p>
                </div>
                <span className="hidden min-w-[190px] text-[12px] text-slate-500 lg:block">
                  {s.note}
                </span>
                <div className="w-24 shrink-0">
                  <Progress
                    value={pct}
                    tone={pct >= 100 ? "bad" : pct > 85 ? "warn" : "accent"}
                  />
                </div>
                <span className="w-16 text-right text-[12px] tabular-nums text-slate-500">
                  <b className="font-semibold text-ink">{s.filled}</b>/{s.seats}
                </span>
                <Badge tone={FORMAT_TONE[s.format]}>{s.format}</Badge>
              </li>
            );
          })}
        </ul>
      </Card>

      {/* ── 05 · Facilitator load ────────────────────────────── */}
      <Card
        title="Who is carrying the load"
        sub="Sessions per speaker across the quarter"
        action={<Badge tone="warn">2 people on 4 sessions</Badge>}
        pad={false}
      >
        <ul className="divide-y divide-line">
          {SPEAKERS.filter((s) => s.sessions >= 2).map((s) => (
            <li
              key={s.id}
              className="flex flex-wrap items-center gap-4 px-5 py-4 transition-colors hover:bg-soft"
            >
              <span
                className={cn(
                  "grid h-9 w-9 shrink-0 place-items-center rounded-lg text-[11px] font-bold",
                  s.sessions >= 4 ? "bg-red-50 text-red-600" : "bg-accent-soft text-accent",
                )}
              >
                {s.initials}
              </span>
              <span className="min-w-[170px] flex-1">
                <span className="block text-[13.5px] font-semibold text-ink">{s.name}</span>
                <span className="block text-[11.5px] text-slate-400">
                  {s.topics.join(", ")}
                </span>
              </span>
              <div className="w-32 shrink-0">
                <Progress
                  value={(s.sessions / 4) * 100}
                  tone={s.sessions >= 4 ? "bad" : s.sessions >= 3 ? "warn" : "accent"}
                />
              </div>
              <span className="w-20 text-right text-[12.5px] font-semibold tabular-nums text-ink">
                {s.sessions} sessions
              </span>
              <Badge tone={s.tone}>
                {s.sessions >= 4 ? "Overloaded" : s.sessions >= 3 ? "Heavy" : "Steady"}
              </Badge>
            </li>
          ))}
        </ul>
      </Card>

      {/* ── 06 · Topic demand ────────────────────────────────── */}
      <Card
        title="Topic demand"
        sub="What founders asked for, against what we actually run"
        action={<Badge tone="bad">{uncovered} topics uncovered</Badge>}
        pad={false}
      >
        <ul className="divide-y divide-line">
          {TOPIC_DEMAND.map((t) => (
            <li
              key={t.topic}
              className="flex flex-wrap items-center gap-4 px-5 py-4 transition-colors hover:bg-soft"
            >
              <span
                className={cn(
                  "grid h-9 w-9 shrink-0 place-items-center rounded-lg",
                  t.covered
                    ? "bg-rise-tint text-rise"
                    : "bg-red-50 text-red-600",
                )}
              >
                {t.covered ? (
                  <Presentation className="h-4 w-4" />
                ) : (
                  <Mic className="h-4 w-4" />
                )}
              </span>
              <span className="min-w-[170px] flex-1">
                <span className="block text-[13.5px] font-semibold text-ink">{t.topic}</span>
                <span className="block text-[11.5px] text-slate-400">{t.note}</span>
              </span>
              <span className="w-20 text-right text-[12px] tabular-nums text-slate-500">
                <b className="font-semibold text-ink">{t.asked}</b> asked
              </span>
              <Badge tone={t.tone}>{t.covered ? "Covered" : "No session"}</Badge>
            </li>
          ))}
        </ul>
      </Card>

      {/* ── 07 · Mentor coverage ─────────────────────────────── */}
      <Card
        title="Mentor coverage"
        sub="Which of the bench actually turn up to teach"
        action={<Badge tone="accent">{mentorLed} on the bill</Badge>}
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { l: "Mentors on the bill", v: String(mentorLed), n: "out of 4 on the bench" },
            { l: "Investor voices", v: String(SPEAKERS.filter((s) => s.kind === "Investor").length), n: "they only come for demo days" },
            { l: "Founder voices", v: String(SPEAKERS.filter((s) => s.kind === "Founder").length), n: "alumni, and the most useful" },
            { l: "External voices", v: String(SPEAKERS.filter((s) => s.kind === "External").length), n: "brought in by a partner" },
          ].map((x) => (
            <div
              key={x.l}
              className="rounded-xl border border-line p-4 transition-colors hover:border-accent/25"
            >
              <p className="text-[12px] font-medium text-slate-500">{x.l}</p>
              <p className="mt-2 text-[26px] font-semibold leading-none tracking-[-0.03em] text-ink tabular-nums">
                {x.v}
              </p>
              <p className="mt-2 text-[11.5px] text-slate-400">{x.n}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 rounded-xl border border-line bg-soft p-4 text-[12.5px] leading-relaxed text-slate-600">
          <span className="font-semibold text-ink">
            The bench is 70% of the bill, and the mentors are the ones who repeat.
          </span>{" "}
          That is not a criticism — but it does mean the programme has no outside
          voice except at the demo day.
        </p>
      </Card>

      {/* ── 09 · Speaker ratings ─────────────────────────────── */}
      <Card
        title="What people said about the speakers"
        sub="Verbatim from the post-event forms"
        action={<Badge tone="accent">{SPEAKER_RATINGS.length} rated</Badge>}
        pad={false}
      >
        <ul className="divide-y divide-line">
          {SPEAKER_RATINGS.map((s) => (
            <li
              key={s.id}
              className="flex flex-col gap-3 px-5 py-4 transition-colors hover:bg-soft lg:flex-row lg:items-center lg:gap-4"
            >
              <span
                className={cn(
                  "grid h-9 w-9 shrink-0 place-items-center rounded-lg text-[11px] font-bold",
                  s.tone === "good"
                    ? "bg-rise-tint text-rise"
                    : s.tone === "warn"
                      ? "bg-amber-tint text-amber-dim"
                      : "bg-accent-soft text-accent",
                )}
              >
                {s.initials}
              </span>
              <span className="min-w-[150px] text-[13.5px] font-semibold text-ink">
                {s.name}
              </span>
              <span className="min-w-[240px] flex-1 text-[12.5px] leading-relaxed text-slate-600 italic">
                &ldquo;{s.quote}&rdquo;
              </span>
              <span className="w-16 text-right text-[12px] tabular-nums text-slate-400">
                {s.responses} resp.
              </span>
              <span className="w-10 text-right text-[12.5px] font-semibold tabular-nums text-ink">
                {s.rating}
              </span>
              <Badge tone={s.tone}>
                {s.rating >= 4.8 ? "Excellent" : s.rating >= 4.5 ? "Strong" : "Good"}
              </Badge>
            </li>
          ))}
        </ul>
      </Card>

      {/* ── 10 · Availability ────────────────────────────────── */}
      <Card
        title="Who is free"
        sub="Capacity on the bench that nobody has used"
        action={<Badge tone="good">2 speakers under-used</Badge>}
        pad={false}
      >
        <ul className="divide-y divide-line">
          {SPEAKER_AVAILABILITY.map((s) => (
            <li
              key={s.name}
              className="flex flex-wrap items-center gap-4 px-5 py-4 transition-colors hover:bg-soft"
            >
              <span
                className={cn(
                  "grid h-9 w-9 shrink-0 place-items-center rounded-lg text-[11px] font-bold",
                  s.tone === "good"
                    ? "bg-rise-tint text-rise"
                    : s.tone === "warn"
                      ? "bg-amber-tint text-amber-dim"
                      : "bg-accent-soft text-accent",
                )}
              >
                {s.initials}
              </span>
              <div className="min-w-[170px] flex-1">
                <p className="text-[13.5px] font-semibold text-ink">{s.name}</p>
                <p className="mt-0.5 text-[11.5px] text-slate-400">{s.note}</p>
              </div>
              <span className="min-w-[150px] text-[12px] text-slate-500">{s.slots}</span>
              <span className="min-w-[170px] text-[11.5px] text-slate-400">
                {s.blackout}
              </span>
              <span className="w-24 text-right text-[12.5px] font-semibold tabular-nums text-ink">
                {s.canTake} more
              </span>
              <Badge tone={s.tone}>
                {s.canTake >= 2 ? "Available" : s.canTake === 1 ? "Limited" : "Full"}
              </Badge>
            </li>
          ))}
        </ul>
      </Card>

      {/* ── 11 · Where to go next ────────────────────────────── */}
      <Card title="Where to go next" sub="From the bill to the results">
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            {
              href: "/incubator/events",
              title: "All events",
              body: "The programme these sessions belong to.",
              icon: CalendarDays,
            },
            {
              href: "/incubator/events/feedback",
              title: "Feedback & outcomes",
              body: "What attendees said about each session.",
              icon: Star,
            },
            {
              href: "/incubator/mentors",
              title: "Mentor bench",
              body: "The wider bench these speakers come from.",
              icon: Users,
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
