"use client";

import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  CalendarDays,
  Gauge,
  TrendingUp,
  UserRoundCheck,
  UserRoundX,
  Users,
} from "lucide-react";
import Link from "next/link";
import { Badge, Card, PageHeader, Progress, Stat } from "@/components/app/widgets";
import { cn } from "@/lib/utils";
import {
  CAPACITY_GAPS,
  EVENTS,
  EVENT_TOTALS,
  NO_SHOW_RISK,
  REGISTRATION_SOURCES,
  REGISTRATION_VELOCITY,
  SHOW_RATES,
} from "../../constants/events-data";

export function EventRegistrations() {
  const [sort, setSort] = useState<"fill" | "waitlist" | "date">("fill");

  const sorted = useMemo(() => {
    const list = [...EVENTS];
    if (sort === "fill")
      return list.sort(
        (a, b) => b.registered / b.capacity - a.registered / a.capacity,
      );
    if (sort === "waitlist") return list.sort((a, b) => b.waitlist - a.waitlist);
    return list.sort((a, b) => a.month * 40 + a.day - (b.month * 40 + b.day));
  }, [sort]);

  const avgShow =
    Math.round(
      SHOW_RATES.reduce((s, r) => s + r.rate, 0) / SHOW_RATES.length,
    );
  const totalShow = SHOW_RATES.reduce((s, r) => s + r.attended, 0);
  const totalReg = SHOW_RATES.reduce((s, r) => s + r.registered, 0);
  const totalGap = CAPACITY_GAPS.reduce((s, g) => s + g.gap, 0);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Registrations"
        desc="Who booked, who showed up, and where the seats went unused."
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
          icon={Users}
          label="Registrations"
          value={EVENT_TOTALS.registered.toLocaleString()}
          delta={`of ${EVENT_TOTALS.capacity.toLocaleString()} seats`}
          tone="good"
        />
        <Stat
          icon={Gauge}
          label="Fill rate"
          value={`${Math.round((EVENT_TOTALS.registered / EVENT_TOTALS.capacity) * 100)}%`}
          delta="across every event this quarter"
          tone="good"
        />
        <Stat
          icon={UserRoundCheck}
          label="Average show rate"
          value={`${avgShow}%`}
          delta={`${totalShow.toLocaleString()} of ${totalReg.toLocaleString()} showed`}
          tone="good"
        />
        <Stat
          icon={UserRoundX}
          label="Seats left empty"
          value={totalGap.toLocaleString()}
          delta="mostly on one webinar"
          tone="warn"
        />
      </div>

      {/* ── 02 · Registration by event ───────────────────────── */}
      <Card
        title="Registration by event"
        sub="Every event against the seats it offered"
        action={
          <Badge tone="warn">
            {EVENTS.filter((e) => e.registered >= e.capacity).length} sold out
          </Badge>
        }
        pad={false}
      >
        <ul className="divide-y divide-line">
          {sorted.map((e) => {
            const pct = Math.round((e.registered / e.capacity) * 100);
            return (
              <li
                key={e.id}
                className="flex flex-col gap-3 px-5 py-4 transition-colors hover:bg-soft lg:flex-row lg:items-center lg:gap-4"
              >
                <div className="min-w-[200px] flex-1">
                  <p className="text-[13.5px] font-semibold text-ink">{e.title}</p>
                  <p className="mt-0.5 text-[11.5px] text-slate-400">
                    {e.date} · {e.format} · {e.fee}
                  </p>
                </div>
                <div className="w-40 shrink-0">
                  <Progress
                    value={pct}
                    tone={pct >= 100 ? "bad" : pct > 85 ? "warn" : "accent"}
                  />
                </div>
                <span className="w-24 shrink-0 text-right text-[12.5px] tabular-nums text-slate-500">
                  <b className="font-semibold text-ink">{e.registered.toLocaleString()}</b>
                  /{e.capacity.toLocaleString()}
                </span>
                <span className="w-10 text-right text-[12px] font-semibold tabular-nums text-ink">
                  {pct}%
                </span>
                <span className="w-24 shrink-0 text-right text-[11.5px] text-slate-400">
                  {e.waitlist > 0 ? `${e.waitlist} waiting` : "—"}
                </span>
                <Badge tone={e.tone}>{e.status}</Badge>
              </li>
            );
          })}
        </ul>
      </Card>

      {/* ── 03 · Sort control ────────────────────────────────── */}
      <div className="flex flex-wrap gap-2">
        {(
          [
            { key: "fill", label: "By fill rate" },
            { key: "waitlist", label: "By waitlist" },
            { key: "date", label: "By date" },
          ] as const
        ).map((s) => (
          <button
            key={s.key}
            onClick={() => setSort(s.key)}
            className={cn(
              "rounded-[10px] border px-3.5 py-2 text-[12.5px] font-medium transition-colors",
              sort === s.key
                ? "border-ink bg-ink text-white"
                : "border-line bg-white text-slate-500 hover:border-slate-300 hover:text-ink",
            )}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* ── 04 · Source mix ──────────────────────────────────── */}
      <Card
        title="Where registrations come from"
        sub="The channels that actually fill the room"
        action={
          <Badge tone="accent">
            {REGISTRATION_SOURCES.reduce((s, x) => s + x.registrations, 0).toLocaleString()}{" "}
            bookings
          </Badge>
        }
      >
        <div className="space-y-4">
          {REGISTRATION_SOURCES.map((s) => (
            <div key={s.source} className="flex items-center gap-3">
              <span className="w-[140px] shrink-0 text-[12.5px] font-medium text-slate-600">
                {s.source}
              </span>
              <Progress
                value={s.share}
                tone={s.tone === "good" ? "good" : "accent"}
                className="flex-1"
              />
              <span className="w-20 text-right text-[12px] tabular-nums text-slate-500">
                <b className="font-semibold text-ink">
                  {s.registrations.toLocaleString()}
                </b>
              </span>
              <span className="w-10 text-right text-[12px] font-semibold tabular-nums text-ink">
                {s.share}%
              </span>
            </div>
          ))}
        </div>
        <p className="mt-4 rounded-xl border border-line bg-soft p-4 text-[12.5px] leading-relaxed text-slate-600">
          <span className="font-semibold text-ink">
            Two thirds of the room is the cohort itself.
          </span>{" "}
          Public listings and partner channels together add 20% — enough to
          matter, not enough to run on.
        </p>
      </Card>

      {/* ── 05 · Show rate ───────────────────────────────────── */}
      <Card
        title="Show rate"
        sub="Registered versus actually in the room"
        action={<Badge tone="warn">{avgShow}% average</Badge>}
        pad={false}
      >
        <ul className="divide-y divide-line">
          {SHOW_RATES.map((s) => (
            <li
              key={s.slug}
              className="flex flex-wrap items-center gap-4 px-5 py-4 transition-colors hover:bg-soft"
            >
              <span className="min-w-[210px] flex-1">
                <span className="block text-[13.5px] font-semibold text-ink">
                  {s.event}
                </span>
                <span className="block text-[11.5px] text-slate-400">{s.note}</span>
              </span>
              <span className="w-24 text-right text-[12px] tabular-nums text-slate-500">
                <b className="font-semibold text-ink">{s.attended.toLocaleString()}</b>
                /{s.registered.toLocaleString()}
              </span>
              <div className="w-28 shrink-0">
                <Progress
                  value={s.rate}
                  tone={s.tone === "good" ? "good" : s.tone === "bad" ? "bad" : "accent"}
                />
              </div>
              <span className="w-12 text-right text-[12.5px] font-semibold tabular-nums text-ink">
                {s.rate}%
              </span>
              <Badge tone={s.tone}>
                {s.rate >= 85 ? "Strong" : s.rate >= 70 ? "Normal" : "Weak"}
              </Badge>
            </li>
          ))}
        </ul>
      </Card>

      {/* ── 06 · Capacity gaps ───────────────────────────────── */}
      <Card
        title="Seats left empty"
        sub="Where the programme is offering more than the market wants"
        action={<Badge tone="bad">{totalGap.toLocaleString()} seats</Badge>}
        pad={false}
      >
        <ul className="divide-y divide-line">
          {CAPACITY_GAPS.map((g) => (
            <li
              key={g.slug}
              className="flex flex-wrap items-center gap-4 px-5 py-4 transition-colors hover:bg-soft"
            >
              <span
                className={cn(
                  "grid h-9 w-9 shrink-0 place-items-center rounded-lg",
                  g.tone === "bad"
                    ? "bg-red-50 text-red-600"
                    : g.tone === "warn"
                      ? "bg-amber-tint text-amber-dim"
                      : "bg-soft text-slate-400",
                )}
              >
                <Gauge className="h-4 w-4" />
              </span>
              <div className="min-w-[200px] flex-1">
                <p className="text-[13.5px] font-semibold text-ink">{g.event}</p>
                <p className="mt-0.5 text-[11.5px] text-slate-400">{g.note}</p>
              </div>
              <span className="w-24 text-right text-[12px] tabular-nums text-slate-500">
                <b className="font-semibold text-ink">{g.filled.toLocaleString()}</b>
                /{g.capacity.toLocaleString()}
              </span>
              <span className="w-24 text-right text-[12.5px] font-semibold tabular-nums text-slate-500">
                {g.gap > 0 ? `${g.gap.toLocaleString()} empty` : "Full"}
              </span>
              <Badge tone={g.tone}>
                {g.gap === 0 ? "At capacity" : g.gap > 100 ? "Over-supplied" : "Under-filled"}
              </Badge>
            </li>
          ))}
        </ul>
      </Card>

      {/* ── 07 · Waitlist ────────────────────────────────────── */}
      <Card
        title="Waitlist"
        sub="Demand that has nowhere to go"
        action={
          <Badge tone="warn">
            {EVENTS.reduce((s, e) => s + e.waitlist, 0)} waiting
          </Badge>
        }
        pad={false}
      >
        <ul className="divide-y divide-line">
          {EVENTS.filter((e) => e.waitlist > 0).map((e) => (
            <li
              key={e.id}
              className="flex flex-wrap items-center gap-4 px-5 py-4 transition-colors hover:bg-soft"
            >
              <span
                className={cn(
                  "grid h-9 w-9 shrink-0 place-items-center rounded-lg",
                  e.tone === "bad"
                    ? "bg-red-50 text-red-600"
                    : "bg-accent-soft text-accent",
                )}
              >
                <TrendingUp className="h-4 w-4" />
              </span>
              <div className="min-w-[200px] flex-1">
                <p className="text-[13.5px] font-semibold text-ink">{e.title}</p>
                <p className="mt-0.5 text-[11.5px] text-slate-400">
                  {e.date} · {e.capacity.toLocaleString()} seats
                </p>
              </div>
              <span className="hidden min-w-[220px] text-[12px] text-slate-500 lg:block">
                {e.note}
              </span>
              <span className="w-24 text-right text-[13px] font-semibold tabular-nums text-ink">
                {e.waitlist}
              </span>
              <Badge tone={e.tone}>Waiting</Badge>
            </li>
          ))}
        </ul>
      </Card>

      {/* ── 09 · Registration velocity ───────────────────────── */}
      <Card
        title="Registration pace"
        sub="How fast the last month filled, and when the peak was"
        action={<Badge tone="warn">3 events peaked this week</Badge>}
        pad={false}
      >
        <ul className="divide-y divide-line">
          {REGISTRATION_VELOCITY.map((v) => (
            <li
              key={v.slug}
              className="flex flex-col gap-3 px-5 py-4 transition-colors hover:bg-soft lg:flex-row lg:items-center lg:gap-4"
            >
              <span className="min-w-[200px] flex-1">
                <span className="block text-[13.5px] font-semibold text-ink">
                  {v.event}
                </span>
                <span className="block text-[11.5px] text-slate-400">{v.note}</span>
              </span>
              <span className="w-20 text-right text-[12px] tabular-nums text-slate-500">
                <b className="font-semibold text-ink">{v.last7}</b> in 7d
              </span>
              <span className="w-20 text-right text-[12px] tabular-nums text-slate-500">
                <b className="font-semibold text-ink">{v.last30}</b> in 30d
              </span>
              <div className="w-28 shrink-0">
                <Progress
                  value={Math.min((v.last7 / Math.max(v.last30, 1)) * 300, 100)}
                  tone={v.tone === "good" ? "good" : v.tone === "bad" ? "bad" : "warn"}
                />
              </div>
              <span className="w-28 shrink-0 text-right font-mono text-[10.5px] text-slate-400">
                peak {v.peak}
              </span>
            </li>
          ))}
        </ul>
      </Card>

      {/* ── 10 · No-show risk ────────────────────────────────── */}
      <Card
        title="No-show risk"
        sub="Seats that get booked and never used"
        action={<Badge tone="bad">2 events at high risk</Badge>}
        pad={false}
      >
        <ul className="divide-y divide-line">
          {NO_SHOW_RISK.map((n) => (
            <li
              key={n.slug}
              className="flex flex-col gap-3 px-5 py-4 transition-colors hover:bg-soft lg:flex-row lg:items-center lg:gap-4"
            >
              <span
                className={cn(
                  "grid h-9 w-9 shrink-0 place-items-center rounded-lg",
                  n.tone === "bad"
                    ? "bg-red-50 text-red-600"
                    : n.tone === "warn"
                      ? "bg-amber-tint text-amber-dim"
                      : "bg-rise-tint text-rise",
                )}
              >
                <UserRoundX className="h-4 w-4" />
              </span>
              <div className="min-w-[200px] flex-1">
                <p className="text-[13.5px] font-semibold text-ink">{n.event}</p>
                <p className="mt-0.5 text-[11.5px] text-slate-400">{n.driver}</p>
              </div>
              <span className="hidden min-w-[200px] text-[12px] text-slate-500 lg:block">
                {n.note}
              </span>
              <div className="w-24 shrink-0">
                <Progress
                  value={n.risk}
                  tone={n.tone === "bad" ? "bad" : n.tone === "warn" ? "warn" : "good"}
                />
              </div>
              <span className="w-12 text-right text-[12.5px] font-semibold tabular-nums text-ink">
                {n.risk}%
              </span>
              <span className="w-40 shrink-0 text-right text-[11.5px] text-slate-600">
                {n.fix}
              </span>
            </li>
          ))}
        </ul>
      </Card>

      {/* ── 11 · Where to go next ────────────────────────────── */}
      <Card title="Where to go next" sub="From the numbers to the action">
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            {
              href: "/incubator/events",
              title: "All events",
              body: "The programme these bookings belong to.",
              icon: CalendarDays,
            },
            {
              href: "/incubator/events/feedback",
              title: "Feedback & outcomes",
              body: "Did the people who registered get value?",
              icon: UserRoundCheck,
            },
            {
              href: "/incubator/events/speakers",
              title: "Speakers & sessions",
              body: "Who is on the bill for each of these.",
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
