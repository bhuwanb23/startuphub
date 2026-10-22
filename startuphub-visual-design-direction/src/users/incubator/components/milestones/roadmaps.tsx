"use client";

import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  CheckCircle2,
  GitBranch,
  Route,
  Target,
  TriangleAlert,
} from "lucide-react";
import Link from "next/link";
import { Badge, Card, PageHeader, Progress } from "@/components/app/widgets";
import { cn } from "@/lib/utils";
import {
  CRITICAL_PATH,
  DEPENDENCIES,
  MILESTONES,
  ROADMAP_PHASES,
  SWIMLANES,
  type RoadmapPhase,
} from "../../constants/milestones-data";

const COHORTS = ["Cohort VI", "Cohort VII", "Sprint: AgriTech"] as const;

const DEP_KIND_LABEL: Record<string, string> = {
  gates: "gates",
  informs: "informs",
  parallel: "parallel",
};

export function Roadmaps() {
  const [cohort, setCohort] = useState<(typeof COHORTS)[number]>("Cohort VI");

  const phaseById = useMemo(() => {
    const map = new Map<string, RoadmapPhase>();
    for (const p of ROADMAP_PHASES) map.set(p.id, p);
    return map;
  }, []);

  const milestoneById = useMemo(() => {
    const map = new Map<string, (typeof MILESTONES)[number]>();
    for (const m of MILESTONES) map.set(m.id, m);
    return map;
  }, []);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Roadmaps"
        desc="Programme-level roadmaps and per-startup timelines — what gates what, and where the plan is breaking."
        actions={
          <Link
            href="/incubator/milestones"
            className="inline-flex items-center gap-1.5 rounded-[10px] border border-line bg-white px-4 py-2.5 text-[13px] font-semibold text-ink transition-colors hover:bg-soft"
          >
            All milestones
          </Link>
        }
      />

      {/* ── 01 · Cohort switcher ─────────────────────────────── */}
      <div className="flex flex-wrap gap-2">
        {COHORTS.map((c) => (
          <button
            key={c}
            onClick={() => setCohort(c)}
            className={cn(
              "rounded-[10px] border px-4 py-2.5 text-[12.5px] font-medium transition-colors",
              cohort === c
                ? "border-ink bg-ink text-white"
                : "border-line bg-white text-slate-500 hover:border-slate-300 hover:text-ink",
            )}
          >
            {c}
          </button>
        ))}
      </div>

      {/* ── 02 · Programme phase timeline ────────────────────── */}
      <Card
        title="Programme timeline"
        sub="The 16-week spine every incubation programme follows"
        action={
          <span className="flex items-center gap-1.5 text-[12px] font-semibold text-slate-400">
            <Route className="h-3.5 w-3.5" /> 6 phases
          </span>
        }
      >
        <div className="relative">
          {/* week scale */}
          <div className="mb-2 flex items-center gap-3 pl-[132px]">
            {[0, 4, 8, 12, 16].map((w) => (
              <span
                key={w}
                className="flex-1 font-mono text-[9.5px] tracking-[0.08em] text-slate-400 uppercase"
              >
                wk {w}
              </span>
            ))}
          </div>
          <div className="space-y-2.5">
            {ROADMAP_PHASES.map((p) => {
              const pct = Math.round((p.complete / p.milestones) * 100);
              return (
                <div key={p.id} className="flex items-center gap-3">
                  <span className="w-[120px] shrink-0 text-[12.5px] font-semibold text-ink">
                    {p.name}
                  </span>
                  <div className="relative h-9 flex-1 rounded-lg bg-soft">
                    <span
                      className={cn(
                        "absolute inset-y-0 rounded-lg",
                        p.tone === "good"
                          ? "bg-rise/15"
                          : p.tone === "warn"
                            ? "bg-amber-500/15"
                            : "bg-accent/15",
                      )}
                      style={{
                        left: `${(p.startWeek / 16) * 100}%`,
                        width: `${((p.endWeek - p.startWeek + 1) / 16) * 100}%`,
                      }}
                    />
                    <span
                      className={cn(
                        "absolute inset-y-1 left-1.5 flex items-center rounded-md text-[10.5px] font-semibold",
                        p.tone === "good"
                          ? "text-rise"
                          : p.tone === "warn"
                            ? "text-amber-dim"
                            : "text-accent",
                      )}
                    >
                      {p.name} · {p.weeks}
                    </span>
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 font-mono text-[10px] text-slate-500">
                      {p.complete}/{p.milestones}
                    </span>
                  </div>
                  <div className="w-16 shrink-0">
                    <Progress
                      value={pct}
                      tone={
                        p.tone === "good"
                          ? "good"
                          : p.tone === "warn"
                            ? "warn"
                            : "accent"
                      }
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <p className="mt-5 border-t border-line pt-3.5 text-[12px] leading-relaxed text-slate-500">
          <span className="font-semibold text-ink">Commercialise is the bottleneck</span> —
          14 milestones with only 10 closed. Everything in Fund depends on what clears
          there first.
        </p>
      </Card>

      {/* ── 03 · Dependency chains ──────────────────────────── */}
      <Card
        title="Dependency chains"
        sub="What gates what — the links that decide the graduation date"
        action={
          <span className="flex items-center gap-1.5 text-[12px] font-semibold text-slate-400">
            <GitBranch className="h-3.5 w-3.5" /> {DEPENDENCIES.length} links
          </span>
        }
        pad={false}
      >
        <ul className="divide-y divide-line">
          {DEPENDENCIES.map((d) => {
            const from = milestoneById.get(d.from);
            const to = milestoneById.get(d.to);
            return (
              <li
                key={`${d.from}-${d.to}`}
                className="flex flex-wrap items-center gap-3 px-5 py-4 transition-colors hover:bg-soft"
              >
                <span
                  className={cn(
                    "grid h-9 w-9 shrink-0 place-items-center rounded-lg",
                    d.kind === "gates"
                      ? "bg-red-50 text-red-600"
                      : d.kind === "informs"
                        ? "bg-accent-soft text-accent"
                        : "bg-soft text-slate-400",
                  )}
                >
                  <GitBranch className="h-4 w-4" />
                </span>
                <div className="min-w-[150px] flex-1">
                  <p className="text-[13px] font-semibold text-ink">
                    {from?.name ?? d.from}
                  </p>
                  <p className="mt-0.5 text-[11px] text-slate-400">
                    {from?.startup} · due {from?.due}
                  </p>
                </div>
                <span
                  className={cn(
                    "shrink-0 rounded-md px-2 py-0.5 font-mono text-[9.5px] font-medium tracking-[0.06em] uppercase",
                    d.kind === "gates"
                      ? "bg-red-50 text-red-600"
                      : d.kind === "informs"
                        ? "bg-accent-soft text-accent"
                        : "bg-soft text-slate-400",
                  )}
                >
                  {DEP_KIND_LABEL[d.kind]}
                </span>
                <span className="text-slate-300">→</span>
                <div className="min-w-[150px] flex-1">
                  <p className="text-[13px] font-semibold text-ink">
                    {to?.name ?? d.to}
                  </p>
                  <p className="mt-0.5 text-[11px] text-slate-400">
                    {to?.startup} · due {to?.due}
                  </p>
                </div>
                {to?.state === "Blocked" || to?.state === "Overdue" ? (
                  <Badge tone="bad">Holding it up</Badge>
                ) : (
                  <Badge tone="good">On track</Badge>
                )}
              </li>
            );
          })}
        </ul>
      </Card>

      {/* ── 04 · Critical path ───────────────────────────────── */}
      <Card
        title="Critical path"
        sub="The chain that decides the graduation date"
        action={
          <Badge tone="warn">
            {CRITICAL_PATH.leadWeeks} of {CRITICAL_PATH.totalWeeks} weeks
          </Badge>
        }
      >
        <div className="grid gap-6 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <ol className="relative space-y-4 border-l border-line pl-6">
              {CRITICAL_PATH.steps.map((s, i) => {
                const m = milestoneById.get(s.id);
                const blocked = m?.state === "Blocked" || m?.state === "Overdue";
                return (
                  <li key={s.id} className="relative">
                    <span
                      className={cn(
                        "absolute -left-[31px] grid h-6 w-6 place-items-center rounded-full border-2 bg-white",
                        blocked ? "border-red-500" : "border-accent",
                      )}
                    >
                      {blocked ? (
                        <TriangleAlert className="h-3 w-3 text-red-600" />
                      ) : (
                        <CheckCircle2 className="h-3 w-3 text-accent" />
                      )}
                    </span>
                    <p className="font-mono text-[10px] tracking-[0.1em] text-accent uppercase">
                      Week {s.week} · {s.owner}
                    </p>
                    <p className="mt-0.5 text-[13.5px] font-semibold text-ink">
                      {s.name}
                    </p>
                    <p className="mt-0.5 text-[11.5px] text-slate-400">
                      {m?.state} · {m?.pct}% complete
                    </p>
                    {i < CRITICAL_PATH.steps.length - 1 && (
                      <span className="mt-2 block font-mono text-[10px] tracking-[0.08em] text-slate-400 uppercase">
                        gates ↓
                      </span>
                    )}
                  </li>
                );
              })}
            </ol>
          </div>
          <div className="lg:col-span-2">
            <div className="rounded-xl border border-line bg-soft p-5">
              <p className="font-mono text-[9.5px] tracking-[0.18em] text-slate-400 uppercase">
                Why it matters
              </p>
              <p className="mt-2.5 text-[13px] leading-relaxed text-slate-600">
                {CRITICAL_PATH.summary}
              </p>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-line p-4 text-center">
                <p className="text-[24px] font-semibold leading-none tracking-[-0.03em] text-ink tabular-nums">
                  {CRITICAL_PATH.leadWeeks}
                </p>
                <p className="mt-1 font-mono text-[9px] tracking-[0.12em] text-slate-400 uppercase">
                  weeks on the chain
                </p>
              </div>
              <div className="rounded-xl border border-line p-4 text-center">
                <p className="text-[24px] font-semibold leading-none tracking-[-0.03em] text-ink tabular-nums">
                  {CRITICAL_PATH.steps.length}
                </p>
                <p className="mt-1 font-mono text-[9px] tracking-[0.12em] text-slate-400 uppercase">
                  linked milestones
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* ── 05 · Per-startup swimlanes ───────────────────────── */}
      <Card
        title="Per-startup timelines"
        sub="Each venture's chain, in phase order"
        action={
          <span className="flex items-center gap-1.5 text-[12px] font-semibold text-slate-400">
            <Route className="h-3.5 w-3.5" /> {SWIMLANES.length} startups
          </span>
        }
        pad={false}
      >
        <ul className="divide-y divide-line">
          {SWIMLANES.map((s) => (
            <li
              key={s.startupSlug}
              className="flex flex-col gap-3 px-5 py-4 transition-colors hover:bg-soft"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent-soft text-[11px] font-bold text-accent">
                  {s.startup
                    .split(" ")
                    .map((w) => w[0])
                    .join("")
                    .slice(0, 2)}
                </span>
                <div className="min-w-[140px] flex-1">
                  <p className="text-[13.5px] font-semibold text-ink">{s.startup}</p>
                  <p className="mt-0.5 text-[11px] text-slate-400">
                    cohort {s.cohort}
                  </p>
                </div>
                <span className="text-[14px] font-semibold tabular-nums text-ink">
                  {s.overall}%
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2 pl-12">
                {s.chain.map((c, i) => (
                  <span key={c.id} className="flex items-center gap-2">
                    {i > 0 && (
                      <span className="text-slate-300">→</span>
                    )}
                    <span
                      className={cn(
                        "rounded-lg border px-2.5 py-1.5 text-[11.5px] font-medium",
                        c.tone === "good"
                          ? "border-rise/20 bg-rise-tint text-rise"
                          : c.tone === "warn"
                            ? "border-amber-dim/20 bg-amber-tint text-amber-dim"
                            : c.tone === "bad"
                              ? "border-red-200 bg-red-50 text-red-600"
                              : "border-accent/20 bg-accent-soft text-accent",
                      )}
                    >
                      {c.name}
                      <span className="ml-1.5 font-mono text-[9.5px] opacity-70">
                        {c.pct}%
                      </span>
                    </span>
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </Card>

      {/* ── 06 · Progress overlay ────────────────────────────── */}
      <Card
        title="Progress overlay"
        sub="Plan against reality, phase by phase"
        action={<Badge tone="warn">2 phases behind</Badge>}
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {ROADMAP_PHASES.map((p) => {
            const pct = Math.round((p.complete / p.milestones) * 100);
            const behind = p.complete / p.milestones < 0.8;
            return (
              <div
                key={p.id}
                className="rounded-xl border border-line p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-soft"
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="text-[13px] font-semibold text-ink">{p.name}</p>
                  {behind ? (
                    <Badge tone="warn">Behind</Badge>
                  ) : (
                    <Badge tone="good">On plan</Badge>
                  )}
                </div>
                <p className="mt-0.5 font-mono text-[9.5px] tracking-[0.08em] text-slate-400 uppercase">
                  {p.weeks} · owner {p.owner}
                </p>
                <p className="mt-2.5 text-[11.5px] leading-relaxed text-slate-500">
                  {p.goal}
                </p>
                <div className="mt-3 flex items-center gap-2.5">
                  <Progress
                    value={pct}
                    tone={
                      p.tone === "good"
                        ? "good"
                        : p.tone === "warn"
                          ? "warn"
                          : "accent"
                    }
                    className="flex-1"
                  />
                  <span className="w-9 text-right text-[11.5px] font-semibold tabular-nums text-ink">
                    {pct}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* ── 07 · Phase goals & deliverables ──────────────────── */}
      <Card
        title="Phase goals & deliverables"
        sub="What each phase is actually accountable for"
        action={<Badge tone="accent">6 phases</Badge>}
        pad={false}
      >
        <ul className="divide-y divide-line">
          {ROADMAP_PHASES.map((p, i) => (
            <li
              key={p.id}
              className="flex flex-wrap items-center gap-4 px-5 py-4 transition-colors hover:bg-soft"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent-soft font-mono text-[11px] font-bold text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="min-w-[180px] flex-1">
                <p className="text-[13.5px] font-semibold text-ink">{p.name}</p>
                <p className="mt-0.5 text-[11.5px] text-slate-400">
                  {p.weeks} · owner {p.owner}
                </p>
              </div>
              <span className="min-w-[220px] flex-[2] text-[12.5px] leading-snug text-slate-500">
                {p.goal}
              </span>
              <span className="hidden min-w-[160px] rounded-lg bg-soft px-3 py-2 text-[12px] font-medium text-ink sm:block">
                {p.deliverable}
              </span>
              <Badge tone={p.tone}>
                {p.complete}/{p.milestones}
              </Badge>
            </li>
          ))}
        </ul>
      </Card>

      {/* ── 08 · Roadmap health ─────────────────────────────── */}
      <Card
        title="Roadmap health"
        sub="Which phases are carrying the programme right now"
        action={
          <span className="flex items-center gap-1.5 text-[12px] font-semibold text-slate-400">
            <Target className="h-3.5 w-3.5" /> {cohort}
          </span>
        }
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              l: "Phases on plan",
              v: "4 of 6",
              note: "Validation, Orientation and two others",
              tone: "good" as const,
            },
            {
              l: "Phases behind",
              v: "2 of 6",
              note: "Commercialise and Protect",
              tone: "warn" as const,
            },
            {
              l: "Milestones closed",
              v: "41 of 52",
              note: "79% of the programme total",
              tone: "warn" as const,
            },
            {
              l: "Weeks to demo day",
              v: "2 of 16",
              note: "Demo day 28 Apr",
              tone: "accent" as const,
            },
          ].map((x) => (
            <div
              key={x.l}
              className="rounded-xl border border-line p-4 transition-colors hover:border-accent/25"
            >
              <p className="text-[12px] font-medium text-slate-500">{x.l}</p>
              <p className="mt-2 text-[22px] font-semibold leading-none tracking-[-0.03em] text-ink tabular-nums">
                {x.v}
              </p>
              <p className="mt-2 text-[11.5px] leading-relaxed text-slate-400">
                {x.note}
              </p>
            </div>
          ))}
        </div>
      </Card>

      {/* ── 09 · Where to go next ────────────────────────────── */}
      <Card title="Where to go next" sub="From the plan to the work">
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            {
              href: "/incubator/milestones",
              title: "All milestones",
              body: "Every commitment with owner, evidence and drift.",
              icon: Target,
            },
            {
              href: "/incubator/cohorts/progress",
              title: "Cohort progress",
              body: "Where each live batch sits against this plan.",
              icon: Route,
            },
            {
              href: "/incubator/programs",
              title: "Program portfolio",
              body: "The batches these roadmaps belong to.",
              icon: GitBranch,
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
