"use client";

import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  History,
  RefreshCw,
  Scale,
  ShieldCheck,
  Star,
  UserPlus,
  Users,
} from "lucide-react";
import Link from "next/link";
import { Badge, Card, PageHeader, Progress } from "@/components/app/widgets";
import { cn } from "@/lib/utils";
import {
  ASSIGNMENTS,
  BENCH,
  OPEN_SLOTS,
  type Assignment,
} from "../../constants/mentors-data";

const MENTOR_FILTERS = ["All", ...BENCH.map((m) => m.name)] as const;

const STATE_TONE: Record<Assignment["state"], "good" | "warn" | "accent"> = {
  Working: "good",
  "Needs review": "warn",
  New: "accent",
};

export function MentorAssignments() {
  const [mentor, setMentor] = useState<(typeof MENTOR_FILTERS)[number]>("All");
  const [rebalanced, setRebalanced] = useState<string[]>([]);

  const filtered = useMemo(
    () =>
      mentor === "All"
        ? ASSIGNMENTS
        : ASSIGNMENTS.filter((a) => a.mentor === mentor),
    [mentor],
  );

  const totalHours = BENCH.reduce((s, m) => s + m.hours, 0);
  const totalTarget = BENCH.reduce((s, m) => s + m.target, 0);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Mentor Assignments"
        desc="Every mentor-startup pairing, who is carrying too much, and what history says about it."
        actions={
          <button className="inline-flex items-center gap-1.5 rounded-[10px] bg-accent px-4 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-accent-deep">
            <UserPlus className="h-3.5 w-3.5" /> New assignment
          </button>
        }
      />

      {/* ── 01 · Filters ─────────────────────────────────────── */}
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
                {ASSIGNMENTS.filter((a) => a.mentor === m).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* ── 02 · Assignment board ────────────────────────────── */}
      <Card
        title={`Assignment board · ${filtered.length}`}
        sub="Every pairing on the books, with focus and outcome"
        action={
          <Link
            href="/incubator/mentors/tracking"
            className="flex items-center gap-1 text-[12.5px] font-semibold text-accent"
          >
            Track sessions <ArrowUpRight className="h-3 w-3" />
          </Link>
        }
        pad={false}
      >
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center gap-2 px-5 py-14 text-center">
            <Users className="h-6 w-6 text-slate-300" />
            <p className="text-[13px] text-slate-400">No assignments for that mentor.</p>
          </div>
        ) : (
          <ul className="divide-y divide-line">
            {filtered.map((a) => (
              <li
                key={a.id}
                className="flex flex-col gap-3 px-5 py-4 transition-colors hover:bg-soft lg:flex-row lg:items-center"
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
                <span className="hidden min-w-[230px] text-[12px] text-slate-500 lg:block">
                  {a.outcome}
                </span>
                <Badge tone={STATE_TONE[a.state]}>{a.state}</Badge>
              </li>
            ))}
          </ul>
        )}
      </Card>

      {/* ── 03 · Load balancing ──────────────────────────────── */}
      <Card
        title="Load balancing"
        sub="Who is carrying too much, and who has room"
        action={
          <span className="flex items-center gap-1.5 text-[12px] font-semibold text-slate-400">
            <Scale className="h-3.5 w-3.5" /> {totalHours}/{totalTarget} hrs
          </span>
        }
        pad={false}
      >
        <ul className="divide-y divide-line">
          {BENCH.map((m) => {
            const load = Math.round((m.hours / m.target) * 100);
            const over = m.hours > m.target;
            const under = load < 60;
            const moved = rebalanced.includes(m.slug);
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
                    {m.assigned.length} startups
                  </p>
                </div>
                <div className="flex w-[150px] shrink-0 items-center gap-2.5">
                  <Progress
                    value={Math.min(100, load)}
                    tone={over ? "bad" : under ? "warn" : "accent"}
                    className="flex-1"
                  />
                  <span className="w-12 text-right text-[12px] font-semibold tabular-nums text-ink">
                    {m.hours}/{m.target}h
                  </span>
                </div>
                <button
                  onClick={() =>
                    setRebalanced((r) =>
                      r.includes(m.slug)
                        ? r.filter((x) => x !== m.slug)
                        : [...r, m.slug],
                    )
                  }
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[11.5px] font-semibold transition-colors",
                    moved
                      ? "bg-rise-tint text-rise"
                      : over
                        ? "border border-red-200 bg-red-50 text-red-600 hover:bg-red-100"
                        : "border border-line bg-white text-slate-600 hover:border-accent/40 hover:text-accent",
                  )}
                >
                  {moved ? (
                    <>
                      <ShieldCheck className="h-3 w-3" /> Rebalanced
                    </>
                  ) : over ? (
                    <>
                      <RefreshCw className="h-3 w-3" /> Rebalance
                    </>
                  ) : (
                    <>
                      <Users className="h-3 w-3" /> {m.assigned.length} pairings
                    </>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
        <p className="border-t border-line px-5 py-3.5 text-[11.5px] text-slate-400">
          Rebalancing moves the most recent pairing off a mentor who is over their
          allowance. Two of the three startups on Vikram Rao can move to Nikhil Verma.
        </p>
      </Card>

      {/* ── 04 · Unassigned queue ────────────────────────────── */}
      <Card
        title="Unassigned startups"
        sub="Waiting for the right mentor"
        action={<Badge tone="warn">{OPEN_SLOTS.length} waiting</Badge>}
        pad={false}
      >
        <ul className="divide-y divide-line">
          {OPEN_SLOTS.map((s) => (
            <li
              key={s.startupSlug}
              className="flex flex-wrap items-center gap-4 px-5 py-4 transition-colors hover:bg-soft"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-dashed border-line bg-soft text-accent">
                <UserPlus className="h-4 w-4" />
              </span>
              <div className="min-w-[190px] flex-1">
                <p className="text-[13.5px] font-semibold text-ink">{s.startup}</p>
                <p className="mt-0.5 text-[11.5px] text-slate-400">
                  Needs: {s.needs}
                </p>
              </div>
              <span className="text-[12px] font-medium text-accent">{s.note}</span>
              <Badge tone={s.tone}>{s.shortlisted} shortlisted</Badge>
            </li>
          ))}
        </ul>
        <Link
          href="/incubator/mentors/discover"
          className="flex items-center gap-1 border-t border-line px-5 py-3.5 text-[12.5px] font-semibold text-accent hover:underline"
        >
          Find a match in the network →
        </Link>
      </Card>

      {/* ── 05 · Pairing coverage ────────────────────────────── */}
      <Card
        title="Pairing coverage"
        sub="How many startups each mentor carries, against a fair share"
        action={<Badge tone="warn">1 over benchmark</Badge>}
        pad={false}
      >
        <ul className="divide-y divide-line">
          {BENCH.map((m) => {
            const over = m.assigned.length > 3;
            return (
              <li
                key={m.slug}
                className="flex flex-wrap items-center gap-4 px-5 py-4 transition-colors hover:bg-soft"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ink text-[10.5px] font-bold text-white">
                  {m.initials}
                </span>
                <span className="min-w-[130px] flex-1 text-[13.5px] font-semibold text-ink">
                  {m.name}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {m.assigned.map((s) => (
                    <span
                      key={s}
                      className="rounded-md border border-line bg-soft px-2 py-1 text-[11px] font-medium text-slate-600"
                    >
                      {s}
                    </span>
                  ))}
                </div>
                <span className="w-20 shrink-0 text-right text-[12px] tabular-nums text-slate-500">
                  <b className="font-semibold text-ink">{m.assigned.length}</b> of 3
                </span>
                <Badge tone={over ? "bad" : "good"}>
                  {over ? "Over" : "Fair"}
                </Badge>
              </li>
            );
          })}
        </ul>
      </Card>

      {/* ── 06 · Pairing history ────────────────────────────── */}
      <Card
        title="Pairing history"
        sub="Assignments that ended, and what they produced"
        action={
          <span className="flex items-center gap-1.5 text-[12px] font-semibold text-slate-400">
            <History className="h-3.5 w-3.5" /> 4 closed
          </span>
        }
        pad={false}
      >
        <ul className="divide-y divide-line">
          {[
            { mentor: "Dev Malhotra", startup: "BloomBio", ended: "Nov 2025", outcome: "Moved to board advisory — 2 hrs/quarter", rating: "5.0" },
            { mentor: "Latha Menon", startup: "AquaPure", ended: "Jan 2026", outcome: "Handed to Sunita — licensing now covered", rating: "4.6" },
            { mentor: "Nikhil Verma", startup: "TerraGrid", ended: "Dec 2025", outcome: "Re-assigned — infrastructure focus changed", rating: "4.2" },
            { mentor: "Raghav Iyer", startup: "CartEdge", ended: "Oct 2025", outcome: "Mentor stepped down — seat still open", rating: "3.8" },
          ].map((h) => (
            <li
              key={`${h.mentor}-${h.startup}`}
              className="flex flex-wrap items-center gap-4 px-5 py-4 transition-colors hover:bg-soft"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-soft text-[11px] font-bold text-slate-400">
                {h.mentor
                  .split(" ")
                  .map((w) => w[0])
                  .join("")
                  .slice(0, 2)}
              </span>
              <div className="min-w-[190px] flex-1">
                <p className="text-[13.5px] font-semibold text-ink">
                  {h.mentor} → {h.startup}
                </p>
                <p className="mt-0.5 text-[11.5px] text-slate-400">{h.outcome}</p>
              </div>
              <span className="font-mono text-[10.5px] text-slate-400">
                ended {h.ended}
              </span>
              <span className="flex w-16 shrink-0 items-center gap-1 text-[12px] font-semibold text-amber-500">
                <Star className="h-3.5 w-3.5" /> {h.rating}
              </span>
            </li>
          ))}
        </ul>
      </Card>

      {/* ── 06 · Rating history ─────────────────────────────── */}
      <Card
        title="Rating history"
        sub="How each pairing has been received"
        action={<Badge tone="good">4.8 average</Badge>}
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {BENCH.map((m) => (
            <div
              key={m.slug}
              className="rounded-xl border border-line p-4 transition-colors hover:border-accent/25"
            >
              <div className="flex items-start justify-between gap-3">
                <p className="text-[13px] font-semibold text-ink">{m.name}</p>
                <span className="flex shrink-0 items-center gap-1 text-[12px] font-semibold text-amber-500">
                  <Star className="h-3.5 w-3.5" /> {m.rating}
                </span>
              </div>
              <p className="mt-1.5 text-[11.5px] text-slate-400">
                {m.sessions} sessions delivered
              </p>
              <div className="mt-3">
                <Progress
                  value={(m.rating / 5) * 100}
                  tone={m.rating >= 4.7 ? "good" : "accent"}
                />
              </div>
              <p className="mt-2 text-[11.5px] text-slate-400">
                {m.assigned.length} startups on the bench
              </p>
            </div>
          ))}
        </div>
      </Card>

      {/* ── 07 · Reassignment rules ──────────────────────────── */}
      <Card
        title="Reassignment rules"
        sub="What we do when a pairing is not working"
        action={<Badge tone="accent">3 rules</Badge>}
        pad={false}
      >
        <ul className="divide-y divide-line">
          {[
            {
              t: "Over the hour allowance",
              b: "The most recent pairing moves to a mentor with open capacity.",
              n: "Triggered for 2 mentors this quarter",
              tone: "warn" as const,
            },
            {
              t: "No session in 30 days",
              b: "The pairing is flagged for review before it lapses quietly.",
              n: "Triggered for 1 pairing this quarter",
              tone: "default" as const,
            },
            {
              t: "Rating below 3.5",
              b: "We ask the startup directly what went wrong, then reassign.",
              n: "Triggered for 1 pairing this quarter",
              tone: "bad" as const,
            },
          ].map((r) => (
            <li
              key={r.t}
              className="flex flex-wrap items-center gap-4 px-5 py-4 transition-colors hover:bg-soft"
            >
              <span
                className={cn(
                  "grid h-9 w-9 shrink-0 place-items-center rounded-lg",
                  r.tone === "bad"
                    ? "bg-red-50 text-red-600"
                    : r.tone === "warn"
                      ? "bg-amber-tint text-amber-dim"
                      : "bg-soft text-slate-400",
                )}
              >
                <RefreshCw className="h-4 w-4" />
              </span>
              <div className="min-w-[200px] flex-1">
                <p className="text-[13.5px] font-semibold text-ink">{r.t}</p>
                <p className="mt-0.5 text-[11.5px] text-slate-400">{r.b}</p>
              </div>
              <span className="text-[11.5px] text-slate-500">{r.n}</span>
            </li>
          ))}
        </ul>
      </Card>

      {/* ── 08 · Where to go next ────────────────────────────── */}
      <Card title="Where to go next" sub="From the board to the sessions">
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            {
              href: "/incubator/mentors",
              title: "Back to the bench",
              body: "Hours, load and expertise gaps across the team.",
              icon: Users,
            },
            {
              href: "/incubator/mentors/discover",
              title: "Find more mentors",
              body: "The wider network, matched to programme gaps.",
              icon: UserPlus,
            },
            {
              href: "/incubator/mentors/tracking",
              title: "Track the sessions",
              body: "Hours logged, action items and impact.",
              icon: History,
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
