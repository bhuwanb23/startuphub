"use client";

import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  BadgeIndianRupee,
  CircleAlert,
  Gavel,
  Scale,
  UserCheck,
  Users,
} from "lucide-react";
import Link from "next/link";
import { Badge, Card, PageHeader, Progress } from "@/components/app/widgets";
import { cn } from "@/lib/utils";
import {
  COMMITTEE,
  DECISIONS,
  OFFER_TERMS,
  ONBOARDING_STEPS,
  PROGRAMS,
  SEAT_ALLOCATION,
  SHORTLIST,
} from "../../constants/programs-data";

const REC_TONE = {
  Accept: "good",
  Hold: "warn",
  Reject: "bad",
} as const;

export function StartupSelection() {
  const [view, setView] = useState<"All" | "Accept" | "Hold">("All");

  const filtered = useMemo(
    () =>
      view === "All"
        ? SHORTLIST
        : SHORTLIST.filter((s) => s.recommendation === view),
    [view],
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Startup Selection"
        desc="Who joins Cohort VIII — the shortlist, the committee's votes and the offers on the table."
        actions={
          <Link
            href="/incubator/programs/evaluation"
            className="inline-flex items-center gap-1.5 rounded-[10px] border border-line bg-white px-4 py-2.5 text-[13px] font-semibold text-ink transition-colors hover:bg-soft"
          >
            <Scale className="h-3.5 w-3.5 text-slate-400" /> Back to scoring
          </Link>
        }
      />

      {/* ── 01 · Shortlist board ─────────────────────────────── */}
      <Card
        title="Shortlist board"
        sub="Ranked by weighted composite score"
        action={
          <div className="flex gap-1.5">
            {(["All", "Accept", "Hold"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setView(f)}
                className={cn(
                  "rounded-lg px-2.5 py-1 text-[11.5px] font-semibold transition-colors",
                  view === f
                    ? "bg-ink text-white"
                    : "bg-soft text-slate-500 hover:text-ink",
                )}
              >
                {f}
              </button>
            ))}
          </div>
        }
        pad={false}
      >
        <ul className="divide-y divide-line">
          {filtered.map((s, i) => (
            <li
              key={s.applicationId}
              className="group flex flex-wrap items-center gap-4 px-5 py-4 transition-colors hover:bg-soft"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent-soft font-mono text-[12px] font-bold text-accent">
                {i + 1}
              </span>
              <div className="min-w-[200px] flex-1">
                <p className="text-[13.5px] font-semibold text-ink">{s.startup}</p>
                <p className="mt-0.5 text-[11.5px] text-slate-400">
                  {s.sector} · {s.note}
                </p>
              </div>
              <div className="flex w-[130px] items-center gap-2.5">
                <span className="w-14 text-[11px] text-slate-400">Fit {s.fit}</span>
                <Progress
                  value={s.fit}
                  tone={s.fit >= 85 ? "good" : "accent"}
                  className="flex-1"
                />
              </div>
              <div className="flex w-[130px] items-center gap-2.5">
                <span className="w-14 text-[11px] text-slate-400">Trac {s.traction}</span>
                <Progress
                  value={s.traction}
                  tone={s.traction >= 80 ? "good" : "warn"}
                  className="flex-1"
                />
              </div>
              <span className="w-10 text-right text-[16px] font-semibold tracking-[-0.02em] text-ink tabular-nums">
                {s.composite}
              </span>
              <Badge tone={REC_TONE[s.recommendation]}>{s.recommendation}</Badge>
            </li>
          ))}
        </ul>
      </Card>

      {/* ── 02 · Committee ───────────────────────────────────── */}
      <div className="grid gap-5 lg:grid-cols-2">
        <Card
          title="Selection committee"
          sub="Five members, quorum of five"
          action={<Badge tone="good">Quorum met</Badge>}
        >
          <ul className="space-y-3.5">
            {COMMITTEE.map((c) => (
              <li key={c.name} className="flex items-center gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ink text-[11px] font-bold text-white">
                  {c.initials}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-semibold text-ink">{c.name}</p>
                  <p className="truncate text-[11.5px] text-slate-400">{c.role}</p>
                </div>
                <span className="shrink-0 font-mono text-[11.5px] text-slate-500">
                  {c.votes}
                </span>
                <Badge tone={c.tone}>Voted</Badge>
              </li>
            ))}
          </ul>
          <p className="mt-4 border-t border-line pt-3.5 text-[12px] leading-relaxed text-slate-500">
            <span className="font-semibold text-ink">Chair:</span> Meera Iyer holds a
            casting vote. Kavi Sharma has not yet voted on two candidates.
          </p>
        </Card>

        {/* ── 03 · Decisions made ──────────────────────────── */}
        <Card
          title="Decisions made"
          sub="Cohort VIII and earlier intakes"
          action={<Badge tone="accent">5 recorded</Badge>}
          pad={false}
        >
          <ul className="divide-y divide-line">
            {DECISIONS.map((d) => (
              <li
                key={`${d.startup}-${d.date}`}
                className="flex flex-wrap items-center gap-4 px-5 py-4 transition-colors hover:bg-soft"
              >
                <span
                  className={cn(
                    "grid h-9 w-9 shrink-0 place-items-center rounded-lg",
                    d.tone === "good"
                      ? "bg-rise-tint text-rise"
                      : d.tone === "warn"
                        ? "bg-amber-tint text-amber-dim"
                        : "bg-red-50 text-red-600",
                  )}
                >
                  <UserCheck className="h-4 w-4" />
                </span>
                <div className="min-w-[180px] flex-1">
                  <p className="text-[13.5px] font-semibold text-ink">{d.startup}</p>
                  <p className="mt-0.5 text-[11.5px] text-slate-400">{d.reason}</p>
                </div>
                <span className="font-mono text-[11px] text-slate-400">{d.date}</span>
                <Badge tone={d.tone}>{d.decision}</Badge>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* ── 04 · Seat allocation ─────────────────────────────── */}
      <Card
        title="Seat allocation"
        sub="Offers made against capacity, across every live batch"
        action={<Badge tone="warn">Cohort VIII has 14 open</Badge>}
      >
        <div className="space-y-4">
          {SEAT_ALLOCATION.map((s) => {
            const used = Math.round((s.offered / s.seats) * 100);
            return (
              <div key={s.program} className="flex items-center gap-3">
                <span className="w-[190px] shrink-0 truncate text-[12.5px] font-medium text-slate-600">
                  {s.program}
                </span>
                <Progress
                  value={used}
                  tone={used >= 100 ? "good" : used > 60 ? "accent" : "warn"}
                  className="flex-1"
                />
                <span className="w-14 text-right text-[12px] font-semibold tabular-nums text-ink">
                  {s.offered}/{s.seats}
                </span>
                <span className="hidden w-[104px] text-right text-[11.5px] text-slate-400 sm:block">
                  {s.seats - s.offered} free
                </span>
              </div>
            );
          })}
        </div>
        <p className="mt-4 border-t border-line pt-3.5 text-[12px] leading-relaxed text-slate-500">
          <span className="font-semibold text-ink">Cohort VIII is the constraint</span> —
          16 seats, 2 offers out. The AgriTech sprint is two seats short of a
          viable minimum cohort.
        </p>
      </Card>

      {/* ── 05 · Cohort fit ──────────────────────────────────── */}
      <Card
        title="Cohort fit"
        sub="Does this startup belong in this batch"
        action={<Badge tone="accent">7 candidates</Badge>}
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {SHORTLIST.map((s) => (
            <div
              key={s.applicationId}
              className="rounded-xl border border-line p-4 transition-colors hover:border-accent/25"
            >
              <div className="flex items-start justify-between gap-3">
                <p className="text-[13px] font-semibold text-ink">{s.startup}</p>
                <span className="shrink-0 text-[15px] font-semibold tracking-[-0.02em] text-ink tabular-nums">
                  {s.fit}
                </span>
              </div>
              <div className="mt-2.5">
                <Progress
                  value={s.fit}
                  tone={s.fit >= 85 ? "good" : s.fit >= 75 ? "accent" : "warn"}
                />
              </div>
              <p className="mt-2.5 text-[11.5px] leading-relaxed text-slate-500">
                {s.note}
              </p>
              <p className="mt-2 font-mono text-[10px] tracking-[0.06em] text-slate-400 uppercase">
                {s.sector} · {s.seats} seat
              </p>
            </div>
          ))}
        </div>
      </Card>

      {/* ── 06 · Offer terms ─────────────────────────────────── */}
      <Card
        title="Offer terms"
        sub="What is actually on the table for each candidate"
        action={<Badge tone="warn">2 pending</Badge>}
        pad={false}
      >
        <ul className="divide-y divide-line">
          {OFFER_TERMS.map((o) => (
            <li
              key={o.startup}
              className="flex flex-wrap items-center gap-4 px-5 py-4 transition-colors hover:bg-soft"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent">
                <BadgeIndianRupee className="h-4 w-4" />
              </span>
              <div className="min-w-[180px] flex-1">
                <p className="text-[13.5px] font-semibold text-ink">{o.startup}</p>
                <p className="mt-0.5 text-[11.5px] text-slate-400">
                  {o.duration} · {o.equity} · {o.facilities}
                </p>
              </div>
              <span className="text-[14px] font-semibold tracking-[-0.01em] text-ink">
                {o.grant}
              </span>
              <Badge tone={o.status === "Ready" ? "good" : "warn"}>{o.status}</Badge>
            </li>
          ))}
        </ul>
      </Card>

      {/* ── 07 · Onboarding readiness ────────────────────────── */}
      <div className="grid gap-5 lg:grid-cols-2">
        <Card
          title="Onboarding readiness"
          sub="Getting accepted founders through the door"
          action={<Badge tone="accent">2 joining</Badge>}
        >
          <div className="space-y-4">
            {ONBOARDING_STEPS.map((s) => {
              const pct = Math.round((s.done / s.total) * 100);
              return (
                <div key={s.step} className="flex items-center gap-3">
                  <span className="w-[168px] shrink-0 truncate text-[12.5px] font-medium text-slate-600">
                    {s.step}
                  </span>
                  <Progress
                    value={pct}
                    tone={pct === 100 ? "good" : pct === 0 ? "warn" : "accent"}
                    className="flex-1"
                  />
                  <span className="w-10 text-right text-[12px] font-semibold tabular-nums text-ink">
                    {s.done}/{s.total}
                  </span>
                  <span className="hidden min-w-[104px] text-[11.5px] text-slate-400 sm:block">
                    {s.owner}
                  </span>
                </div>
              );
            })}
          </div>
        </Card>

        {/* ── 08 · Risk flags ─────────────────────────────── */}
        <Card
          title="Selection risks"
          sub="What could still go wrong before we announce"
          action={<Badge tone="bad">2 open</Badge>}
          pad={false}
        >
          <ul className="divide-y divide-line">
            {[
              {
                title: "Demo day and the committee clash",
                detail: "Selection committee sits 18 Apr, demo day 28 Apr — Cohort VI graduates before Cohort VIII starts.",
                impact: "Two batches overlap for 10 days",
                tone: "warn" as const,
              },
              {
                title: "Only two seats filled for Cohort VIII",
                detail: "Fourteen of sixteen seats are still open with three weeks to intake close.",
                impact: "Cohort may under-fill",
                tone: "bad" as const,
              },
              {
                title: "AgriTech sprint below minimum",
                detail: "Eight of ten seats filled; a five-startup batch is not a viable cohort.",
                impact: "May need to merge with Cohort VII",
                tone: "warn" as const,
              },
            ].map((r) => (
              <li
                key={r.title}
                className="px-5 py-4 transition-colors hover:bg-soft"
              >
                <div className="flex items-start gap-3">
                  <CircleAlert
                    className={cn(
                      "mt-0.5 h-4 w-4 shrink-0",
                      r.tone === "bad" ? "text-red-600" : "text-amber-dim",
                    )}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-[13.5px] font-semibold text-ink">{r.title}</p>
                    <p className="mt-0.5 text-[12px] leading-relaxed text-slate-500">
                      {r.detail}
                    </p>
                    <p className="mt-1.5 font-mono text-[10px] tracking-[0.08em] text-slate-400 uppercase">
                      {r.impact}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* ── 09 · Where to go next ────────────────────────────── */}
      <Card title="Where to go next" sub="Turning decisions into a cohort">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              href: "/incubator/programs",
              title: "Back to programs",
              body: "Cohort VIII appears as an active batch once offers are out.",
              icon: Gavel,
            },
            {
              href: "/incubator/programs/calendar",
              title: "Announce it",
              body: "Demo day on 28 Apr, Cohort VIII intake closes 12 Apr.",
              icon: Users,
            },
            {
              href: "/incubator/programs/applications",
              title: "Keep the pipeline warm",
              body: "Five applications are still waiting on a first read.",
              icon: Scale,
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
