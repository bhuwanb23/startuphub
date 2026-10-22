"use client";

import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  CircleAlert,
  ClipboardCheck,
  Clock3,
  Target,
  Users,
} from "lucide-react";
import Link from "next/link";
import { Badge, Card, PageHeader, Progress, Stat } from "@/components/app/widgets";
import { cn } from "@/lib/utils";
import {
  DRIFT_BUCKETS,
  MILESTONES,
  MILESTONE_KPIS,
  MILESTONE_OWNERS,
  REVIEW_CHECKPOINTS,
  STATE_BUCKETS,
  type MilestoneState,
} from "../../constants/milestones-data";

const STATE_FILTERS = [
  "All",
  "On track",
  "Watch",
  "At risk",
  "Blocked",
  "Overdue",
  "Done",
] as const;

const STATE_TONE: Record<MilestoneState, "default" | "accent" | "good" | "warn" | "bad"> = {
  "On track": "good",
  Watch: "warn",
  "At risk": "bad",
  Blocked: "bad",
  Overdue: "bad",
  Done: "accent",
};

export function Milestones() {
  const [state, setState] = useState<(typeof STATE_FILTERS)[number]>("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return MILESTONES.filter((m) => {
      if (state !== "All" && m.state !== state) return false;
      if (!q) return true;
      return [m.name, m.startup, m.owner, m.phase]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [state, query]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="All Milestones"
        desc="Every commitment across every cohort — progress, ownership and drift visibility."
        actions={
          <button className="inline-flex items-center gap-1.5 rounded-[10px] bg-accent px-4 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-accent-deep">
            <Target className="h-3.5 w-3.5" /> Create milestone
          </button>
        }
      />

      {/* ── 01 · KPI strip ───────────────────────────────────── */}
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        {MILESTONE_KPIS.map((k) => (
          <Stat
            key={k.label}
            icon={
              k.tone === "bad"
                ? CircleAlert
                : k.tone === "good"
                  ? ClipboardCheck
                  : Target
            }
            label={k.label}
            value={k.value}
            delta={k.note}
            tone={k.tone === "accent" ? "good" : k.tone}
          />
        ))}
      </div>

      {/* ── 02 · Filters ─────────────────────────────────────── */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex flex-wrap gap-2">
          {STATE_FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setState(f)}
              className={cn(
                "rounded-[10px] border px-3.5 py-2 text-[12.5px] font-medium transition-colors",
                state === f
                  ? "border-ink bg-ink text-white"
                  : "border-line bg-white text-slate-500 hover:border-slate-300 hover:text-ink",
              )}
            >
              {f}
              <span className="ml-1.5 text-[11px] opacity-60">
                {f === "All"
                  ? MILESTONES.length
                  : MILESTONES.filter((m) => m.state === f).length}
              </span>
            </button>
          ))}
        </div>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search milestone, startup, owner…"
          aria-label="Search milestones"
          className="w-full rounded-[10px] border border-line bg-white px-3.5 py-2 text-[13px] text-ink outline-none placeholder:text-slate-400 focus:border-accent/50 sm:ml-auto sm:max-w-[260px]"
        />
      </div>

      {/* ── 03 · The register ────────────────────────────────── */}
      <Card
        title={`${state === "All" ? "All milestones" : state} · ${filtered.length}`}
        sub="Every commitment, with owner, evidence and drift"
        action={
          <Link
            href="/incubator/milestones/roadmaps"
            className="flex items-center gap-1 text-[12.5px] font-semibold text-accent"
          >
            Programme roadmap <ArrowUpRight className="h-3 w-3" />
          </Link>
        }
        pad={false}
      >
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center gap-2 px-5 py-14 text-center">
            <ClipboardCheck className="h-6 w-6 text-slate-300" />
            <p className="text-[13px] text-slate-400">
              No milestones match that filter.
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-line">
            {filtered.map((m) => (
              <li
                key={m.id}
                className="flex flex-col gap-3 px-5 py-4 transition-colors hover:bg-soft lg:flex-row lg:items-center"
              >
                <span
                  className={cn(
                    "grid h-9 w-9 shrink-0 place-items-center rounded-lg",
                    m.tone === "good"
                      ? "bg-rise-tint text-rise"
                      : m.tone === "warn"
                        ? "bg-amber-tint text-amber-dim"
                        : m.tone === "bad"
                          ? "bg-red-50 text-red-600"
                          : "bg-accent-soft text-accent",
                  )}
                >
                  <ClipboardCheck className="h-4 w-4" />
                </span>
                <div className="min-w-[210px] flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-[13.5px] font-semibold text-ink">{m.name}</p>
                    <Badge tone={STATE_TONE[m.state]}>{m.state}</Badge>
                  </div>
                  <p className="mt-0.5 text-[11.5px] text-slate-400">
                    {m.startup} · cohort {m.cohort} · {m.phase} · owner {m.owner}
                  </p>
                  <p className="mt-1 text-[11.5px] text-slate-400">{m.evidence}</p>
                </div>
                <span className="flex w-24 shrink-0 items-center gap-1.5 font-mono text-[10.5px] text-slate-400">
                  <Clock3 className="h-3 w-3" /> {m.due}
                </span>
                {m.blockedBy && (
                  <span className="hidden min-w-[130px] text-[11.5px] text-amber-dim sm:block">
                    blocked by {m.blockedBy}
                  </span>
                )}
                <div className="w-28 shrink-0">
                  <div className="flex justify-between text-[10.5px] text-slate-400">
                    <span>progress</span>
                    <span>{m.pct}%</span>
                  </div>
                  <Progress
                    value={m.pct}
                    tone={
                      m.tone === "bad"
                        ? "bad"
                        : m.tone === "warn"
                          ? "warn"
                          : m.tone === "good"
                            ? "good"
                            : "accent"
                    }
                    className="mt-1"
                  />
                </div>
                <span
                  className={cn(
                    "w-[74px] shrink-0 text-right font-mono text-[10.5px]",
                    m.driftDays === 0
                      ? "text-slate-400"
                      : m.driftDays > 7
                        ? "text-red-600"
                        : "text-amber-dim",
                  )}
                >
                  {m.driftDays === 0 ? "on time" : `+${m.driftDays} d`}
                </span>
              </li>
            ))}
          </ul>
        )}
      </Card>

      {/* ── 04 · State breakdown ─────────────────────────────── */}
      <div className="grid gap-5 lg:grid-cols-2">
        <Card
          title="State breakdown"
          sub="Where every commitment sits"
          action={<Badge tone="accent">133 tracked</Badge>}
        >
          <div className="space-y-3.5">
            {STATE_BUCKETS.map((s) => (
              <div key={s.state} className="flex items-center gap-3">
                <span className="w-[86px] shrink-0 text-[12.5px] font-medium text-slate-600">
                  {s.state}
                </span>
                <Progress
                  value={s.share * 2}
                  tone={
                    s.tone === "good"
                      ? "good"
                      : s.tone === "warn"
                        ? "warn"
                        : s.tone === "bad"
                          ? "bad"
                          : "accent"
                  }
                  className="flex-1"
                />
                <span className="w-6 text-right text-[12px] font-semibold tabular-nums text-ink">
                  {s.count}
                </span>
                <span className="hidden min-w-[150px] text-[11.5px] text-slate-400 sm:block">
                  {s.note}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* ── 05 · Drift analysis ────────────────────────────── */}
        <Card
          title="Drift & slippage"
          sub="How far behind the plan we are running"
          action={<Badge tone="bad">12 badly late</Badge>}
        >
          <div className="space-y-4">
            {DRIFT_BUCKETS.map((d) => {
              const total = 133;
              return (
                <div key={d.bucket} className="flex items-center gap-3">
                  <span className="w-[124px] shrink-0 text-[12.5px] font-medium text-slate-600">
                    {d.bucket}
                  </span>
                  <Progress
                    value={(d.count / total) * 100}
                    tone={
                      d.tone === "good"
                        ? "good"
                        : d.tone === "warn"
                          ? "warn"
                          : d.tone === "bad"
                            ? "bad"
                            : "accent"
                    }
                    className="flex-1"
                  />
                  <span className="w-6 text-right text-[12px] font-semibold tabular-nums text-ink">
                    {d.count}
                  </span>
                </div>
              );
            })}
          </div>
          <p className="mt-4 rounded-xl border border-line bg-soft p-4 text-[12.5px] leading-relaxed text-slate-600">
            <span className="font-semibold text-ink">86% on time</span> — up from 74%
            across the network. The 12 badly-late commitments are concentrated in
            Commercialise, where pilots wait on partners outside our control.
          </p>
        </Card>
      </div>

      {/* ── 06 · Phase distribution ─────────────────────────── */}
      <Card
        title="Milestones by programme phase"
        sub="Where the load sits across the 16-week spine"
        action={
          <Link
            href="/incubator/milestones/roadmaps"
            className="flex items-center gap-1 text-[12.5px] font-semibold text-accent"
          >
            See the roadmap <ArrowUpRight className="h-3 w-3" />
          </Link>
        }
        pad={false}
      >
        <ul className="divide-y divide-line">
          {[
            { phase: "Orientation", count: 6, done: 6, owner: "Rohan Pillai" },
            { phase: "Validation", count: 9, done: 8, owner: "Rohan Pillai" },
            { phase: "Build", count: 11, done: 9, owner: "Farhan Qureshi" },
            { phase: "Commercialise", count: 14, done: 10, owner: "Arjun Nair" },
            { phase: "Protect", count: 7, done: 5, owner: "Nandita Bose" },
            { phase: "Fund", count: 5, done: 3, owner: "Arjun Nair" },
          ].map((p) => {
            const pct = Math.round((p.done / p.count) * 100);
            return (
              <li
                key={p.phase}
                className="flex flex-wrap items-center gap-4 px-5 py-4 transition-colors hover:bg-soft"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent">
                  <Target className="h-4 w-4" />
                </span>
                <div className="min-w-[150px] flex-1">
                  <p className="text-[13.5px] font-semibold text-ink">{p.phase}</p>
                  <p className="mt-0.5 text-[11.5px] text-slate-400">owner {p.owner}</p>
                </div>
                <span className="text-[12.5px] tabular-nums text-slate-500">
                  <b className="font-semibold text-ink">{p.done}</b>/{p.count} done
                </span>
                <div className="w-32 shrink-0">
                  <Progress
                    value={pct}
                    tone={pct >= 90 ? "good" : pct >= 65 ? "accent" : "warn"}
                  />
                </div>
                <span className="w-10 text-right text-[12px] font-semibold tabular-nums text-ink">
                  {pct}%
                </span>
              </li>
            );
          })}
        </ul>
      </Card>

      {/* ── 07 · Cohort distribution ────────────────────────── */}
      <Card
        title="Milestones by cohort"
        sub="Which batch is carrying the most commitments"
        action={<Badge tone="accent">8 cohorts</Badge>}
        pad={false}
      >
        <ul className="divide-y divide-line">
          {[
            { cohort: "Cohort VI", count: 42, done: 34, tone: "accent" as const },
            { cohort: "Cohort VII", count: 38, done: 26, tone: "warn" as const },
            { cohort: "Sprint: AgriTech", count: 21, done: 19, tone: "good" as const },
            { cohort: "Cohort V", count: 18, done: 17, tone: "accent" as const },
            { cohort: "Earlier cohorts", count: 14, done: 14, tone: "accent" as const },
          ].map((c) => {
            const pct = Math.round((c.done / c.count) * 100);
            return (
              <li
                key={c.cohort}
                className="flex flex-wrap items-center gap-4 px-5 py-4 transition-colors hover:bg-soft"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent">
                  <Users className="h-4 w-4" />
                </span>
                <span className="min-w-[150px] flex-1 text-[13.5px] font-semibold text-ink">
                  {c.cohort}
                </span>
                <span className="text-[12.5px] tabular-nums text-slate-500">
                  <b className="font-semibold text-ink">{c.done}</b>/{c.count} done
                </span>
                <div className="w-32 shrink-0">
                  <Progress
                    value={pct}
                    tone={
                      c.tone === "good"
                        ? "good"
                        : c.tone === "warn"
                          ? "warn"
                          : "accent"
                    }
                  />
                </div>
                <span className="w-10 text-right text-[12px] font-semibold tabular-nums text-ink">
                  {pct}%
                </span>
              </li>
            );
          })}
        </ul>
      </Card>

      {/* ── 08 · Blocked & overdue ──────────────────────────── */}
      <Card
        title="Blocked & overdue"
        sub="The commitments that are holding something else up"
        action={<Badge tone="bad">5 need escalation</Badge>}
        pad={false}
      >
        <ul className="divide-y divide-line">
          {MILESTONES.filter(
            (m) => m.state === "Blocked" || m.state === "Overdue" || m.state === "At risk",
          ).map((m) => (
            <li
              key={`blocked-${m.id}`}
              className="flex flex-wrap items-center gap-4 px-5 py-4 transition-colors hover:bg-soft"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-red-50 text-red-600">
                <CircleAlert className="h-4 w-4" />
              </span>
              <div className="min-w-[200px] flex-1">
                <p className="text-[13.5px] font-semibold text-ink">{m.name}</p>
                <p className="mt-0.5 text-[11.5px] text-slate-400">
                  {m.startup} · owner {m.owner} · {m.evidence}
                </p>
              </div>
              {m.blockedBy && (
                <span className="hidden min-w-[120px] text-[11.5px] text-amber-dim sm:block">
                  blocked by {m.blockedBy}
                </span>
              )}
              <span className="w-16 shrink-0 text-right font-mono text-[10.5px] text-slate-400">
                due {m.due}
              </span>
              <Badge tone={m.tone}>{m.state}</Badge>
            </li>
          ))}
        </ul>
      </Card>

      {/* ── 09 · Owner load ─────────────────────────────────── */}
      <div className="grid gap-5 lg:grid-cols-2">
        <Card
          title="Owner load"
          sub="Who is carrying the commitments"
          action={<Badge tone="warn">3 owners at capacity</Badge>}
        >
          <div className="space-y-3.5">
            {MILESTONE_OWNERS.map((o) => {
              const load = Math.round((o.assigned / o.capacity) * 100);
              return (
                <div key={o.owner} className="flex items-center gap-3">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-ink text-[10px] font-bold text-white">
                    {o.initials}
                  </span>
                  <span className="w-[110px] shrink-0 truncate text-[12.5px] font-medium text-slate-600">
                    {o.owner}
                  </span>
                  <Progress
                    value={load}
                    tone={o.tone === "bad" ? "bad" : o.tone === "warn" ? "warn" : "accent"}
                    className="flex-1"
                  />
                  <span className="w-12 text-right text-[12px] font-semibold tabular-nums text-ink">
                    {o.assigned}/{o.capacity}
                  </span>
                  {o.overdue > 0 ? (
                    <Badge tone="bad">{o.overdue} late</Badge>
                  ) : (
                    <Badge tone="good">Clear</Badge>
                  )}
                </div>
              );
            })}
          </div>
        </Card>

        {/* ── 10 · Review checkpoints ───────────────────────── */}
        <Card
          title="Review checkpoints"
          sub="Every gate a milestone passes through"
          action={<Badge tone="accent">6 stages</Badge>}
          pad={false}
        >
          <ul className="divide-y divide-line">
            {REVIEW_CHECKPOINTS.map((c) => (
              <li
                key={c.name}
                className="flex flex-wrap items-center gap-4 px-5 py-4 transition-colors hover:bg-soft"
              >
                <span
                  className={cn(
                    "grid h-9 w-9 shrink-0 place-items-center rounded-lg",
                    c.tone === "good"
                      ? "bg-rise-tint text-rise"
                      : c.tone === "warn"
                        ? "bg-amber-tint text-amber-dim"
                        : c.tone === "bad"
                          ? "bg-red-50 text-red-600"
                          : "bg-soft text-slate-400",
                  )}
                >
                  <ClipboardCheck className="h-4 w-4" />
                </span>
                <div className="min-w-[160px] flex-1">
                  <p className="text-[13.5px] font-semibold text-ink">{c.name}</p>
                  <p className="mt-0.5 text-[11.5px] text-slate-400">
                    {c.reviewer} · due {c.due}
                  </p>
                </div>
                <Badge tone={c.tone}>{c.state}</Badge>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
