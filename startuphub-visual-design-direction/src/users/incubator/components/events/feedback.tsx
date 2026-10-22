"use client";

import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  CalendarDays,
  Lightbulb,
  MessageSquareQuote,
  Star,
  Target,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { Badge, Card, PageHeader, Progress, Stat } from "@/components/app/widgets";
import { cn } from "@/lib/utils";
import {
  FEEDBACK,
  FEEDBACK_THEMES,
  IMPROVEMENT_ACTIONS,
  OUTCOMES,
  QUARTER_TREND,
} from "../../constants/events-data";

export function EventFeedback() {
  const [view, setView] = useState<"feedback" | "actions">("feedback");

  const avgRating =
    Math.round(
      (FEEDBACK.reduce((s, f) => s + f.rating, 0) / FEEDBACK.length) * 10,
    ) / 10;
  const avgNps = Math.round(
    FEEDBACK.reduce((s, f) => s + f.nps, 0) / FEEDBACK.length,
  );
  const responses = FEEDBACK.reduce((s, f) => s + f.responses, 0);
  const outcomes = OUTCOMES.reduce((s, o) => s + o.count, 0);

  const best = useMemo(
    () => [...FEEDBACK].sort((a, b) => b.nps - a.nps)[0],
    [],
  );
  const worst = useMemo(
    () => [...FEEDBACK].sort((a, b) => a.nps - b.nps)[0],
    [],
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Feedback & Outcomes"
        desc="What people said, and what the programme actually produced once the seats were filled."
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
          icon={Star}
          label="Average rating"
          value={avgRating.toFixed(1)}
          delta="out of 5, from post-event forms"
          tone="good"
        />
        <Stat
          icon={TrendingUp}
          label="Net promoter score"
          value={String(avgNps)}
          delta="across 6 measured events"
          tone="good"
        />
        <Stat
          icon={MessageSquareQuote}
          label="Responses"
          value={responses.toLocaleString()}
          delta="43% of everyone registered"
          tone="good"
        />
        <Stat
          icon={Target}
          label="Outcomes produced"
          value={String(outcomes)}
          delta="investor meetings, pilots, filings"
          tone="good"
        />
      </div>

      {/* ── 02 · View toggle ─────────────────────────────────── */}
      <div className="flex flex-wrap gap-2">
        {(
          [
            { key: "feedback", label: "Event feedback" },
            { key: "actions", label: "Improvement actions" },
          ] as const
        ).map((t) => (
          <button
            key={t.key}
            onClick={() => setView(t.key)}
            className={cn(
              "rounded-[10px] border px-3.5 py-2 text-[12.5px] font-medium transition-colors",
              view === t.key
                ? "border-ink bg-ink text-white"
                : "border-line bg-white text-slate-500 hover:border-slate-300 hover:text-ink",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ── 03 · Feedback / actions list ─────────────────────── */}
      <Card
        title={view === "feedback" ? "Event feedback" : "Improvement actions"}
        sub={
          view === "feedback"
            ? "What people said about each event, and what they want changed"
            : "What the programme has committed to fixing, and by when"
        }
        action={
          <Badge tone={view === "feedback" ? "accent" : "warn"}>
            {view === "feedback"
              ? `${FEEDBACK.length} events`
              : `${IMPROVEMENT_ACTIONS.length} open`}
          </Badge>
        }
        pad={false}
      >
        {view === "feedback" ? (
          <ul className="divide-y divide-line">
            {FEEDBACK.map((f) => (
              <li
                key={f.id}
                className="flex flex-col gap-3 px-5 py-4 transition-colors hover:bg-soft"
              >
                <div className="flex flex-wrap items-center gap-4">
                  <span
                    className={cn(
                      "grid h-9 w-9 shrink-0 place-items-center rounded-lg",
                      f.tone === "good"
                        ? "bg-rise-tint text-rise"
                        : f.tone === "bad"
                          ? "bg-red-50 text-red-600"
                          : "bg-accent-soft text-accent",
                    )}
                  >
                    <MessageSquareQuote className="h-4 w-4" />
                  </span>
                  <div className="min-w-[190px] flex-1">
                    <p className="text-[13.5px] font-semibold text-ink">{f.event}</p>
                    <p className="mt-0.5 text-[11.5px] text-slate-400">
                      {f.responses.toLocaleString()} responses
                    </p>
                  </div>
                  <span className="w-16 text-right text-[13px] font-semibold tabular-nums text-ink">
                    {f.rating}
                  </span>
                  <div className="w-20 shrink-0">
                    <Progress
                      value={f.nps}
                      tone={
                        f.nps >= 60
                          ? "good"
                          : f.nps >= 40
                            ? "accent"
                            : "bad"
                      }
                    />
                  </div>
                  <span className="w-14 text-right text-[12px] tabular-nums text-slate-500">
                    NPS {f.nps}
                  </span>
                  <Badge tone={f.tone}>
                    {f.nps >= 60 ? "Promoter" : f.nps >= 40 ? "Passive" : "Detractor"}
                  </Badge>
                </div>
                <div className="grid gap-3 pl-13 sm:grid-cols-2">
                  <p className="rounded-lg border border-line bg-soft p-3 text-[12px] leading-relaxed text-slate-600">
                    <span className="font-semibold text-rise">Worked:</span> {f.best}
                  </p>
                  <p className="rounded-lg border border-line bg-soft p-3 text-[12px] leading-relaxed text-slate-600">
                    <span className="font-semibold text-amber-dim">
                      Did not:
                    </span>{" "}
                    {f.worst}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <ul className="divide-y divide-line">
            {IMPROVEMENT_ACTIONS.map((a) => (
              <li
                key={a.id}
                className="flex flex-col gap-3 px-5 py-4 transition-colors hover:bg-soft sm:flex-row sm:items-center sm:gap-4"
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
                  <p className="text-[13.5px] font-semibold text-ink">{a.action}</p>
                  <p className="mt-0.5 text-[11.5px] text-slate-400">
                    {a.event} · {a.note}
                  </p>
                </div>
                <span className="w-28 shrink-0 text-[12px] text-slate-600">{a.owner}</span>
                <span className="w-36 shrink-0 text-right font-mono text-[10.5px] text-slate-400">
                  {a.due}
                </span>
                <Badge tone={a.tone}>{a.status}</Badge>
              </li>
            ))}
          </ul>
        )}
      </Card>

      {/* ── 04 · Best and worst ──────────────────────────────── */}
      <div className="grid gap-5 lg:grid-cols-2">
        <Card
          title="The one that works"
          sub="The session people will tell their co-founder about"
          action={<Badge tone="good">NPS {best.nps}</Badge>}
        >
          <p className="text-[15px] font-semibold tracking-tight text-ink">
            {best.event}
          </p>
          <p className="mt-2.5 text-[12.5px] leading-relaxed text-slate-600">
            {best.note}
          </p>
          <div className="mt-4 flex items-center gap-3">
            <span className="text-[24px] font-semibold leading-none tracking-[-0.03em] text-ink tabular-nums">
              {best.rating}
            </span>
            <div className="flex-1">
              <Progress value={best.nps} tone="good" />
            </div>
            <span className="text-[12px] tabular-nums text-slate-400">
              NPS {best.nps}
            </span>
          </div>
        </Card>

        {/* ── 05 · The one that does not ──────────────────── */}
        <Card
          title="The one that does not"
          sub="Reach without a conversation is not an event"
          action={<Badge tone="bad">NPS {worst.nps}</Badge>}
        >
          <p className="text-[15px] font-semibold tracking-tight text-ink">
            {worst.event}
          </p>
          <p className="mt-2.5 text-[12.5px] leading-relaxed text-slate-600">
            {worst.note}
          </p>
          <div className="mt-4 flex items-center gap-3">
            <span className="text-[24px] font-semibold leading-none tracking-[-0.03em] text-ink tabular-nums">
              {worst.rating}
            </span>
            <div className="flex-1">
              <Progress value={worst.nps} tone="bad" />
            </div>
            <span className="text-[12px] tabular-nums text-slate-400">
              NPS {worst.nps}
            </span>
          </div>
        </Card>
      </div>

      {/* ── 06 · Outcomes ────────────────────────────────────── */}
      <Card
        title="What the events produced"
        sub="Outcomes, not just filled seats"
        action={<Badge tone="accent">{OUTCOMES.length} outcome types</Badge>}
        pad={false}
      >
        <ul className="divide-y divide-line">
          {OUTCOMES.map((o) => (
            <li
              key={o.id}
              className="flex flex-wrap items-center gap-4 px-5 py-4 transition-colors hover:bg-soft"
            >
              <span
                className={cn(
                  "grid h-9 w-9 shrink-0 place-items-center rounded-lg",
                  o.tone === "good"
                    ? "bg-rise-tint text-rise"
                    : o.tone === "accent"
                      ? "bg-accent-soft text-accent"
                      : "bg-soft text-slate-400",
                )}
              >
                <Target className="h-4 w-4" />
              </span>
              <div className="min-w-[200px] flex-1">
                <p className="text-[13.5px] font-semibold text-ink">{o.outcome}</p>
                <p className="mt-0.5 text-[11.5px] text-slate-400">{o.detail}</p>
              </div>
              <span className="hidden min-w-[210px] text-[12px] text-slate-500 lg:block">
                {o.note}
              </span>
              <span className="w-16 text-right text-[15px] font-semibold tabular-nums text-ink">
                {o.count}
              </span>
            </li>
          ))}
        </ul>
      </Card>

      {/* ── 07 · Response rate ───────────────────────────────── */}
      <Card
        title="Who is answering"
        sub="Response rate decides whether the feedback is worth reading"
        action={<Badge tone="warn">43% response rate</Badge>}
      >
        <div className="space-y-4">
          {[
            { l: "Workshops and clinics", v: 68, note: "People who sat in a session answer" },
            { l: "Demo days", v: 53, note: "Half of everyone who registered" },
            { l: "Office hours and investor events", v: 73, note: "The highest response rate we get" },
            { l: "Networking and mixers", v: 63, note: "Dinner helps" },
            { l: "Webinars", v: 32, note: "Most of them never attended" },
          ].map((r) => (
            <div key={r.l} className="flex items-center gap-3">
              <span className="w-[190px] shrink-0 text-[12.5px] font-medium text-slate-600">
                {r.l}
              </span>
              <Progress
                value={r.v}
                tone={r.v >= 60 ? "good" : r.v >= 45 ? "warn" : "bad"}
                className="flex-1"
              />
              <span className="w-12 text-right text-[12px] font-semibold tabular-nums text-ink">
                {r.v}%
              </span>
              <span className="hidden min-w-[220px] text-[11.5px] text-slate-400 lg:block">
                {r.note}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-4 rounded-xl border border-line bg-soft p-4 text-[12.5px] leading-relaxed text-slate-600">
          <span className="font-semibold text-ink">
            The webinar answers are not a signal.
          </span>{" "}
          A third of them never turned up, so their feedback is about the
          confirmation email, not the session.
        </p>
      </Card>

      {/* ── 09 · Feedback themes ─────────────────────────────── */}
      <Card
        title="What people keep saying"
        sub="The themes in the free-text, across every form"
        action={<Badge tone="accent">{FEEDBACK_THEMES.length} themes</Badge>}
        pad={false}
      >
        <ul className="divide-y divide-line">
          {FEEDBACK_THEMES.map((t) => (
            <li
              key={t.theme}
              className="flex flex-col gap-3 px-5 py-4 transition-colors hover:bg-soft lg:flex-row lg:items-center lg:gap-4"
            >
              <span
                className={cn(
                  "grid h-9 w-9 shrink-0 place-items-center rounded-lg",
                  t.tone === "good"
                    ? "bg-rise-tint text-rise"
                    : t.tone === "bad"
                      ? "bg-red-50 text-red-600"
                      : "bg-amber-tint text-amber-dim",
                )}
              >
                <MessageSquareQuote className="h-4 w-4" />
              </span>
              <div className="min-w-[190px] flex-1">
                <p className="text-[13.5px] font-semibold text-ink">{t.theme}</p>
                <p className="mt-0.5 text-[11.5px] text-slate-400 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>
              <span className="w-20 text-right text-[12px] tabular-nums text-slate-500">
                <b className="font-semibold text-ink">{t.mentions}</b> mentions
              </span>
              <Badge tone={t.tone}>{t.sentiment}</Badge>
            </li>
          ))}
        </ul>
      </Card>

      {/* ── 10 · Quarter on quarter ──────────────────────────── */}
      <Card
        title="Quarter on quarter"
        sub="Whether the programme is getting better or just bigger"
        action={<Badge tone="good">+17 NPS in 3 quarters</Badge>}
        pad={false}
      >
        <ul className="divide-y divide-line">
          {QUARTER_TREND.map((q) => (
            <li
              key={q.quarter}
              className="flex flex-wrap items-center gap-4 px-5 py-4 transition-colors hover:bg-soft"
            >
              <span className="w-24 shrink-0 font-mono text-[11px] text-slate-400">
                {q.quarter}
              </span>
              <div className="min-w-[200px] flex-1">
                <p className="text-[12.5px] text-slate-600">{q.note}</p>
              </div>
              <span className="w-16 text-right text-[12px] tabular-nums text-slate-500">
                <b className="font-semibold text-ink">{q.events}</b> events
              </span>
              <div className="w-28 shrink-0">
                <Progress
                  value={(q.rating / 5) * 100}
                  tone={q.tone === "good" ? "good" : q.tone === "warn" ? "warn" : "accent"}
                />
              </div>
              <span className="w-12 text-right text-[12.5px] font-semibold tabular-nums text-ink">
                {q.rating}
              </span>
              <span className="w-14 text-right text-[12px] tabular-nums text-slate-500">
                NPS {q.nps}
              </span>
            </li>
          ))}
        </ul>
        <p className="border-t border-line px-5 py-3.5 text-[11.5px] text-slate-400">
          Ratings have moved 0.5 points and NPS 17 points since the webinar-heavy
          quarter — the same quarter that had the biggest reach.
        </p>
      </Card>

      {/* ── 11 · Where to go next ────────────────────────────── */}
      <Card title="Where to go next" sub="From the feedback to the programme">
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            {
              href: "/incubator/events",
              title: "All events",
              body: "The programme these results belong to.",
              icon: CalendarDays,
            },
            {
              href: "/incubator/events/registrations",
              title: "Registrations",
              body: "Who booked, and who actually came.",
              icon: TrendingUp,
            },
            {
              href: "/incubator/events/speakers",
              title: "Speakers & sessions",
              body: "Who is on the bill next quarter.",
              icon: Star,
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
