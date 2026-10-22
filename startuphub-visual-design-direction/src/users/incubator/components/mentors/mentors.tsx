"use client";

import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  GraduationCap,
  Search,
  Sparkles,
  Star,
  Target,
  Users,
} from "lucide-react";
import Link from "next/link";
import { Badge, Card, PageHeader, Progress, Stat } from "@/components/app/widgets";
import { cn } from "@/lib/utils";
import {
  ASSIGNMENTS,
  BENCH,
  BENCH_KPIS,
  EXPERTISE_GAPS,
  OPEN_SLOTS,
} from "../../constants/mentors-data";

export function Mentors() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return BENCH;
    return BENCH.filter((m) =>
      [m.name, m.role, m.industry, ...m.expertise]
        .join(" ")
        .toLowerCase()
        .includes(q),
    );
  }, [query]);

  const totalHours = BENCH.reduce((s, m) => s + m.hours, 0);
  const totalTarget = BENCH.reduce((s, m) => s + m.target, 0);
  const avgRating =
    Math.round((BENCH.reduce((s, m) => s + m.rating, 0) / BENCH.length) * 10) / 10;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Mentor Management"
        desc="Your expert bench — who carries which startups, how many hours, and whether it is working."
        actions={
          <button className="inline-flex items-center gap-1.5 rounded-[10px] bg-accent px-4 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-accent-deep">
            <GraduationCap className="h-3.5 w-3.5" /> Add mentor
          </button>
        }
      />

      {/* ── 01 · Bench KPIs ──────────────────────────────────── */}
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        {BENCH_KPIS.map((k) => (
          <Stat
            key={k.label}
            icon={
              k.tone === "good"
                ? Star
                : k.tone === "warn"
                  ? Target
                  : Users
            }
            label={k.label}
            value={k.value}
            delta={k.note}
            tone={k.tone === "accent" ? "good" : k.tone}
          />
        ))}
      </div>

      {/* ── 02 · Search ──────────────────────────────────────── */}
      <div className="relative sm:max-w-sm">
        <Search className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search mentor, expertise or industry…"
          aria-label="Search mentors"
          className="h-11 w-full rounded-[10px] border border-line bg-white pl-10 pr-4 text-sm text-ink placeholder:text-slate-400 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/15"
        />
      </div>

      {/* ── 03 · The bench ───────────────────────────────────── */}
      <Card
        title={`Mentor bench · ${filtered.length}`}
        sub="Who is on the bench and what they carry"
        action={
          <Link
            href="/incubator/mentors/discover"
            className="flex items-center gap-1 text-[12.5px] font-semibold text-accent"
          >
            Discover more <ArrowUpRight className="h-3 w-3" />
          </Link>
        }
        pad={false}
      >
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center gap-2 px-5 py-14 text-center">
            <Users className="h-6 w-6 text-slate-300" />
            <p className="text-[13px] text-slate-400">No mentor matches that search.</p>
          </div>
        ) : (
          <ul className="divide-y divide-line">
            {filtered.map((m) => {
              const load = Math.round((m.hours / m.target) * 100);
              return (
                <li
                  key={m.slug}
                  className="flex flex-col gap-3 px-5 py-4 transition-colors hover:bg-soft lg:flex-row lg:items-center"
                >
                  <div className="flex items-center gap-3.5 lg:w-60">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent-soft text-[12px] font-bold text-accent">
                      {m.initials}
                    </span>
                    <div className="min-w-0">
                      <p className="text-[13.5px] font-semibold text-ink">{m.name}</p>
                      <p className="truncate text-[11px] text-slate-400">{m.role}</p>
                    </div>
                  </div>
                  <div className="flex min-w-0 flex-1 flex-wrap gap-1.5">
                    {m.expertise.map((e) => (
                      <span
                        key={e}
                        className="rounded-md bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-600"
                      >
                        {e}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    {m.assigned.map((s) => (
                      <span
                        key={s}
                        className="rounded-md border border-line bg-soft px-2 py-1 text-[11px] font-medium text-slate-600"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  <div className="flex w-32 shrink-0 items-center gap-2.5">
                    <Progress
                      value={load}
                      tone={load > 95 ? "good" : load < 60 ? "warn" : "accent"}
                      className="flex-1"
                    />
                    <span className="w-12 text-right text-[11.5px] font-semibold tabular-nums text-ink">
                      {m.hours}/{m.target}h
                    </span>
                  </div>
                  <span className="flex w-16 shrink-0 items-center gap-1 text-[12px] font-semibold text-amber-500">
                    <Star className="h-3.5 w-3.5" /> {m.rating}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </Card>

      {/* ── 04 · Session cadence ────────────────────────────── */}
      <Card
        title="Session cadence"
        sub="How often each mentor actually meets"
        action={<Badge tone="good">41 sessions YTD</Badge>}
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {[
            { m: "Priya Nair", perWeek: "1.5", state: "Weekly", tone: "good" as const },
            { m: "Vikram Rao", perWeek: "0.8", state: "Fortnightly", tone: "warn" as const },
            { m: "Sunita Deshmukh", perWeek: "1.2", state: "Weekly", tone: "good" as const },
            { m: "Karan Chadha", perWeek: "0.5", state: "Monthly", tone: "bad" as const },
            { m: "Arjun Bedekar", perWeek: "1.0", state: "Weekly", tone: "good" as const },
          ].map((c) => (
            <div
              key={c.m}
              className="rounded-xl border border-line p-4 transition-colors hover:border-accent/25"
            >
              <p className="text-[12.5px] font-semibold text-ink">{c.m}</p>
              <p className="mt-2 text-[22px] font-semibold leading-none tracking-[-0.03em] text-ink tabular-nums">
                {c.perWeek}
                <span className="ml-1 text-[11px] font-normal text-slate-400">
                  / week
                </span>
              </p>
              <div className="mt-2.5">
                <Badge tone={c.tone}>{c.state}</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* ── 05 · Capacity & load ─────────────────────────────── */}
      <div className="grid gap-5 lg:grid-cols-2">
        <Card
          title="Capacity & load"
          sub="Hours delivered against the programme allowance"
          action={
            <Badge tone={totalHours > totalTarget * 0.8 ? "warn" : "good"}>
              {totalHours}/{totalTarget} hrs
            </Badge>
          }
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
                    value={load}
                    tone={load > 95 ? "good" : load < 60 ? "warn" : "accent"}
                    className="flex-1"
                  />
                  <span className="w-14 text-right text-[12px] font-semibold tabular-nums text-ink">
                    {m.hours}/{m.target}h
                  </span>
                  <Badge tone={m.tone}>
                    {load > 95 ? "Over" : load < 60 ? "Under" : "On target"}
                  </Badge>
                </div>
              );
            })}
          </div>
          <p className="mt-4 rounded-xl border border-line bg-soft p-4 text-[12.5px] leading-relaxed text-slate-600">
            <span className="font-semibold text-ink">Karan Chadha is at 55%</span> — he is
            on waitlist, so those hours will not arrive. Two startups are carrying
            the gap.
          </p>
        </Card>

        {/* ── 05 · Expertise coverage ──────────────────────── */}
        <Card
          title="Expertise coverage"
          sub="What the bench covers — and what it does not"
          action={<Badge tone="bad">3 gaps</Badge>}
          pad={false}
        >
          <ul className="divide-y divide-line">
            {EXPERTISE_GAPS.map((g) => (
              <li
                key={g.expertise}
                className="flex flex-wrap items-center gap-4 px-5 py-4 transition-colors hover:bg-soft"
              >
                <span
                  className={cn(
                    "grid h-9 w-9 shrink-0 place-items-center rounded-lg",
                    g.tone === "good"
                      ? "bg-rise-tint text-rise"
                      : g.tone === "warn"
                        ? "bg-amber-tint text-amber-dim"
                        : "bg-red-50 text-red-600",
                  )}
                >
                  <Target className="h-4 w-4" />
                </span>
                <div className="min-w-[170px] flex-1">
                  <p className="text-[13.5px] font-semibold text-ink">{g.expertise}</p>
                  <p className="mt-0.5 text-[11.5px] text-slate-400">{g.mentors}</p>
                </div>
                <span className="text-[12.5px] tabular-nums text-slate-500">
                  <b className="font-semibold text-ink">{g.covered}</b>/
                  {g.needed} needed
                </span>
                <Badge tone={g.tone}>
                  {g.covered >= g.needed ? "Covered" : "Gap"}
                </Badge>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* ── 06 · Assignment snapshot ────────────────────────── */}
      <Card
        title="Active assignments"
        sub="Every mentor-startup pairing, and whether it is working"
        action={
          <Link
            href="/incubator/mentors/assignments"
            className="flex items-center gap-1 text-[12.5px] font-semibold text-accent"
          >
            Manage <ArrowUpRight className="h-3 w-3" />
          </Link>
        }
        pad={false}
      >
        <ul className="divide-y divide-line">
          {ASSIGNMENTS.map((a) => (
            <li
              key={a.id}
              className="flex flex-wrap items-center gap-4 px-5 py-4 transition-colors hover:bg-soft"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent-soft text-[11px] font-bold text-accent">
                {a.mentor
                  .split(" ")
                  .map((w) => w[0])
                  .join("")
                  .slice(0, 2)}
              </span>
              <div className="min-w-[190px] flex-1">
                <p className="text-[13.5px] font-semibold text-ink">
                  {a.mentor} → {a.startup}
                </p>
                <p className="mt-0.5 text-[11.5px] text-slate-400">
                  {a.focus} · since {a.since}
                </p>
              </div>
              <span className="hidden min-w-[220px] text-[12px] text-slate-500 lg:block">
                {a.outcome}
              </span>
              <Badge tone={a.tone}>{a.state}</Badge>
            </li>
          ))}
        </ul>
      </Card>

      {/* ── 07 · Open slots ─────────────────────────────────── */}
      <Card
        title="Open slots"
        sub="Startups still waiting for the right mentor"
        action={<Badge tone="warn">{OPEN_SLOTS.length} unmatched</Badge>}
        pad={false}
      >
        <ul className="divide-y divide-line">
          {OPEN_SLOTS.map((s) => (
            <li
              key={s.startupSlug}
              className="flex flex-wrap items-center gap-4 px-5 py-4 transition-colors hover:bg-soft"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-dashed border-line bg-soft text-accent">
                <Users className="h-4 w-4" />
              </span>
              <div className="min-w-[190px] flex-1">
                <p className="text-[13.5px] font-semibold text-ink">{s.startup}</p>
                <p className="mt-0.5 text-[11.5px] text-slate-400">
                  Needs: {s.needs}
                </p>
              </div>
              <span className="text-[12px] font-medium text-accent">{s.note}</span>
              <Badge tone={s.tone}>
                {s.shortlisted} shortlisted
              </Badge>
            </li>
          ))}
        </ul>
        <Link
          href="/incubator/mentors/discover"
          className="flex items-center gap-1 border-t border-line px-5 py-3.5 text-[12.5px] font-semibold text-accent hover:underline"
        >
          Discover mentors in the network →
        </Link>
      </Card>

      {/* ── 08 · Ratings & feedback ──────────────────────────── */}
      <Card
        title="Ratings & feedback"
        sub="How the bench is being received"
        action={
          <span className="flex items-center gap-1.5 text-[12px] font-semibold text-slate-400">
            <Star className="h-3.5 w-3.5" /> 4.8 average
          </span>
        }
        pad={false}
      >
        <ul className="divide-y divide-line">
          {BENCH.map((m) => {
            const pct = Math.round((m.rating / 5) * 100);
            return (
              <li
                key={m.slug}
                className="flex flex-wrap items-center gap-4 px-5 py-4 transition-colors hover:bg-soft"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ink text-[10.5px] font-bold text-white">
                  {m.initials}
                </span>
                <div className="min-w-[150px] flex-1">
                  <p className="text-[13.5px] font-semibold text-ink">{m.name}</p>
                  <p className="mt-0.5 text-[11.5px] text-slate-400">
                    {m.sessions} sessions delivered
                  </p>
                </div>
                <div className="flex w-32 shrink-0 items-center gap-2.5">
                  <Progress
                    value={pct}
                    tone={m.rating >= 4.7 ? "good" : "accent"}
                    className="flex-1"
                  />
                  <span className="w-7 text-right text-[12px] font-semibold tabular-nums text-ink">
                    {m.rating}
                  </span>
                </div>
                <Badge tone={m.tone}>
                  {m.rating >= 4.7 ? "Excellent" : m.rating >= 4.5 ? "Good" : "Mixed"}
                </Badge>
              </li>
            );
          })}
        </ul>
      </Card>

      {/* ── 09 · Where to go next ────────────────────────────── */}
      <Card title="Where to go next" sub="The three workflows behind the bench">
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            {
              href: "/incubator/mentors/discover",
              title: "Find new mentors",
              body: "The wider network, matched to programme gaps.",
              icon: Search,
            },
            {
              href: "/incubator/mentors/assignments",
              title: "Rebalance the board",
              body: "Pairings, load balancing and history.",
              icon: Users,
            },
            {
              href: "/incubator/mentors/tracking",
              title: "Track what is working",
              body: "Sessions, action items and impact.",
              icon: Sparkles,
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
