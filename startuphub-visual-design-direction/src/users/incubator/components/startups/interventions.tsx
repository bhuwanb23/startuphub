"use client";

import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  CheckCircle2,
  ClipboardList,
  Handshake,
  Target,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { Badge, Card, PageHeader, Progress } from "@/components/app/widgets";
import { cn } from "@/lib/utils";
import {
  INTERVENTION_OUTCOMES,
  INTERVENTION_TASKS,
  INTERVENTIONS,
  type InterventionPlan,
} from "../../constants/startups-data";

const STATUSES = ["All", "Active", "Monitoring", "Closed"] as const;

const STATUS_TONE = {
  Active: "bad",
  Monitoring: "warn",
  Closed: "good",
} as const;

export function Interventions() {
  const [status, setStatus] = useState<(typeof STATUSES)[number]>("All");
  const [selectedId, setSelectedId] = useState(INTERVENTIONS[0].id);

  const filtered = useMemo(
    () =>
      status === "All"
        ? INTERVENTIONS
        : INTERVENTIONS.filter((p) => p.status === status),
    [status],
  );

  const selected = useMemo(
    () => INTERVENTIONS.find((p) => p.id === selectedId) ?? INTERVENTIONS[0],
    [selectedId],
  );
  const selectedTasks = useMemo(
    () => INTERVENTION_TASKS.filter((t) => t.planId === selected.id),
    [selected],
  );

  const livePlans = INTERVENTIONS.filter((p) => p.status !== "Closed");
  const openTasks = INTERVENTION_TASKS.filter((t) => t.state !== "Done").length;
  const doneTasks = INTERVENTION_TASKS.length - openTasks;
  const avgRecovery = Math.round(
    INTERVENTION_OUTCOMES.filter((o) => o.tone === "good").reduce(
      (s, o) => s + (o.healthAfter - o.healthBefore),
      0,
    ) / Math.max(
      1,
      INTERVENTION_OUTCOMES.filter((o) => o.tone === "good").length,
    ),
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Interventions"
        desc="Intervention plans for at-risk startups — owners, tasks, progress and outcomes."
        actions={
          <button className="inline-flex items-center gap-1.5 rounded-[10px] bg-accent px-4 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-accent-deep">
            <Target className="h-3.5 w-3.5" /> New intervention
          </button>
        }
      />

      {/* ── 01 · KPI strip ───────────────────────────────────── */}
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        {[
          { label: "Live interventions", value: String(livePlans.length), note: "across 5 startups", tone: "warn" as const },
          { label: "Open tasks", value: String(openTasks), note: `${doneTasks} already done`, tone: "default" as const },
          { label: "Avg health gain", value: `+${avgRecovery}`, note: "on closed plans", tone: "good" as const },
          { label: "Capital deployed", value: "₹1.8 L", note: "across all plans", tone: "accent" as const },
        ].map((k) => (
          <div
            key={k.label}
            className="rounded-2xl border border-line bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-soft"
          >
            <p className="text-[12px] font-medium text-slate-500">{k.label}</p>
            <p className="mt-2.5 text-[26px] font-semibold leading-none tracking-[-0.03em] text-ink tabular-nums">
              {k.value}
            </p>
            <p className="mt-1.5 text-[11.5px] text-slate-400">{k.note}</p>
          </div>
        ))}
      </div>

      {/* ── 02 · Status filters ──────────────────────────────── */}
      <div className="flex flex-wrap gap-2">
        {STATUSES.map((s) => (
          <button
            key={s}
            onClick={() => setStatus(s)}
            className={cn(
              "rounded-[10px] border px-3.5 py-2 text-[12.5px] font-medium transition-colors",
              status === s
                ? "border-ink bg-ink text-white"
                : "border-line bg-white text-slate-500 hover:border-slate-300 hover:text-ink",
            )}
          >
            {s}
            <span className="ml-1.5 text-[11px] opacity-60">
              {s === "All"
                ? INTERVENTIONS.length
                : INTERVENTIONS.filter((p) => p.status === s).length}
            </span>
          </button>
        ))}
      </div>

      {/* ── 03 · Intervention plans ──────────────────────────── */}
      <Card
        title="Intervention plans"
        sub="Every active rescue, with owner and progress"
        action={
          <Badge tone="accent">{filtered.length} plans</Badge>
        }
        pad={false}
      >
        <ul className="divide-y divide-line">
          {filtered.map((p) => {
            const pct = Math.round((p.tasksDone / p.tasksTotal) * 100);
            const on = p.id === selectedId;
            return (
              <li key={p.id}>
                <button
                  onClick={() => setSelectedId(p.id)}
                  className={cn(
                    "flex w-full flex-col gap-3 px-5 py-4 text-left transition-colors lg:flex-row lg:items-center",
                    on ? "bg-accent-mist" : "hover:bg-soft",
                  )}
                >
                  <span
                    className={cn(
                      "grid h-9 w-9 shrink-0 place-items-center rounded-lg",
                      p.tone === "bad"
                        ? "bg-red-50 text-red-600"
                        : p.tone === "warn"
                          ? "bg-amber-tint text-amber-dim"
                          : "bg-rise-tint text-rise",
                    )}
                  >
                    <Target className="h-4 w-4" />
                  </span>
                  <div className="min-w-[190px] flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-[13.5px] font-semibold text-ink">{p.startup}</p>
                      <Badge tone={STATUS_TONE[p.status]}>{p.status}</Badge>
                    </div>
                    <p className="mt-0.5 text-[11.5px] text-slate-400">
                      {p.plan} · {p.sector}
                    </p>
                  </div>
                  <span className="hidden min-w-[130px] text-[12px] text-slate-500 lg:block">
                    owner <b className="font-semibold text-ink">{p.owner}</b>
                  </span>
                  <div className="w-[110px] shrink-0">
                    <div className="flex justify-between text-[10.5px] text-slate-400">
                      <span>tasks</span>
                      <span>
                        {p.tasksDone}/{p.tasksTotal}
                      </span>
                    </div>
                    <Progress
                      value={pct}
                      tone={p.status === "Closed" ? "good" : p.tone === "bad" ? "bad" : "warn"}
                      className="mt-1.5"
                    />
                  </div>
                  <span className="font-mono text-[10.5px] text-slate-400">
                    due {p.due}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </Card>

      {/* ── 04 · Plan detail + task tracking ─────────────────── */}
      <div className="grid gap-5 lg:grid-cols-5">
        <Card
          className="lg:col-span-3"
          title={`${selected.startup} — plan`}
          sub={selected.plan}
          action={
            <Badge tone={STATUS_TONE[selected.status]}>{selected.status}</Badge>
          }
        >
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { l: "Owner", v: selected.owner },
              { l: "Trigger", v: selected.trigger },
              { l: "Started", v: selected.started },
              { l: "Due", v: selected.due },
            ].map((x) => (
              <div key={x.l} className="rounded-xl bg-soft p-3.5">
                <p className="font-mono text-[9px] tracking-[0.12em] text-slate-400 uppercase">
                  {x.l}
                </p>
                <p className="mt-1.5 text-[13px] font-semibold text-ink">{x.v}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 border-t border-line pt-4">
            <p className="mb-2.5 font-mono text-[9.5px] tracking-[0.18em] text-slate-400 uppercase">
              Outcome so far
            </p>
            <p className="text-[12.5px] leading-relaxed text-slate-600">
              {selected.outcome}
            </p>
          </div>
          <div className="mt-4 border-t border-line pt-4">
            <div className="mb-2.5 flex items-center justify-between">
              <p className="font-mono text-[9.5px] tracking-[0.18em] text-slate-400 uppercase">
                Task progress
              </p>
              <span className="text-[12px] font-semibold tabular-nums text-ink">
                {selected.tasksDone}/{selected.tasksTotal}
              </span>
            </div>
            <Progress
              value={(selected.tasksDone / selected.tasksTotal) * 100}
              tone={selected.status === "Closed" ? "good" : "accent"}
            />
          </div>
        </Card>

        {/* ── 05 · Task list ────────────────────────────────── */}
        <Card
          className="lg:col-span-2"
          title="Tasks"
          sub="What this plan is actually doing"
          action={
            <span className="flex items-center gap-1.5 text-[12px] font-semibold text-slate-400">
              <ClipboardList className="h-3.5 w-3.5" /> {selectedTasks.length}
            </span>
          }
          pad={false}
        >
          <ul className="divide-y divide-line">
            {selectedTasks.map((t) => (
              <li
                key={`${t.planId}-${t.task}`}
                className="flex flex-wrap items-center gap-3 px-5 py-3.5 transition-colors hover:bg-soft"
              >
                {t.state === "Done" ? (
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-rise" />
                ) : (
                  <span
                    className={cn(
                      "h-4 w-4 shrink-0 rounded-full border-2",
                      t.tone === "accent"
                        ? "border-accent"
                        : t.tone === "warn"
                          ? "border-amber-dim"
                          : "border-line",
                    )}
                  />
                )}
                <div className="min-w-[140px] flex-1">
                  <p className="text-[12.5px] font-medium text-ink">{t.task}</p>
                  <p className="mt-0.5 text-[11px] text-slate-400">
                    {t.owner} · due {t.due}
                  </p>
                </div>
                <Badge tone={t.tone}>{t.state}</Badge>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* ── 06 · Outcomes before and after ───────────────────── */}
      <Card
        title="Outcomes"
        sub="What each intervention actually changed"
        action={
          <span className="flex items-center gap-1.5 text-[12px] font-semibold text-slate-400">
            <TrendingUp className="h-3.5 w-3.5" /> 6 closed cases
          </span>
        }
        pad={false}
      >
        <ul className="divide-y divide-line">
          {INTERVENTION_OUTCOMES.map((o) => {
            const delta = o.healthAfter - o.healthBefore;
            return (
              <li
                key={o.startup}
                className="flex flex-wrap items-center gap-4 px-5 py-4 transition-colors hover:bg-soft"
              >
                <span
                  className={cn(
                    "grid h-9 w-9 shrink-0 place-items-center rounded-lg",
                    o.tone === "good"
                      ? "bg-rise-tint text-rise"
                      : o.tone === "warn"
                        ? "bg-amber-tint text-amber-dim"
                        : "bg-red-50 text-red-600",
                  )}
                >
                  <Handshake className="h-4 w-4" />
                </span>
                <div className="min-w-[160px] flex-1">
                  <p className="text-[13.5px] font-semibold text-ink">{o.startup}</p>
                  <p className="mt-0.5 text-[11.5px] text-slate-400">{o.outcome}</p>
                </div>
                <span className="w-[92px] text-right text-[12px] tabular-nums text-slate-500">
                  {o.healthBefore} →{" "}
                  <b className="font-semibold text-ink">{o.healthAfter}</b>
                </span>
                <Badge tone={o.tone}>
                  {delta > 0 ? `+${delta} health` : delta < 0 ? `${delta} health` : "Flat"}
                </Badge>
                <span className="font-mono text-[10.5px] text-slate-400">
                  {o.cost}
                </span>
              </li>
            );
          })}
        </ul>
      </Card>

      {/* ── 07 · Trigger sources ─────────────────────────────── */}
      <Card
        title="What triggers an intervention"
        sub="The signals that open a plan automatically"
        action={<Badge tone="accent">6 triggers</Badge>}
        pad={false}
      >
        <ul className="divide-y divide-line">
          {[
            { t: "Assessment score below 50", n: 1, note: "FreshChain at 43", tone: "bad" as const },
            { t: "Runway under 4 months", n: 1, note: "GridSense at 3.8 months", tone: "bad" as const },
            { t: "Milestone slipped twice", n: 1, note: "QuantumLeaf A-3", tone: "warn" as const },
            { t: "Pilot stalled 6+ weeks", n: 1, note: "HealthLoop, 6 weeks", tone: "warn" as const },
            { t: "Assessment score down 10+ points", n: 1, note: "FinEdge 70 → 66", tone: "warn" as const },
            { t: "Supplier or partner failure", n: 1, note: "TerraGrid, resolved", tone: "good" as const },
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
                      : "bg-rise-tint text-rise",
                )}
              >
                <Target className="h-4 w-4" />
              </span>
              <div className="min-w-[200px] flex-1">
                <p className="text-[13.5px] font-semibold text-ink">{r.t}</p>
                <p className="mt-0.5 text-[11.5px] text-slate-400">{r.note}</p>
              </div>
              <span className="text-[12.5px] tabular-nums text-slate-500">
                <b className="font-semibold text-ink">{r.n}</b> plan
              </span>
              <Badge tone={r.tone}>
                {r.tone === "good" ? "Resolved" : r.tone === "bad" ? "Critical" : "Open"}
              </Badge>
            </li>
          ))}
        </ul>
      </Card>

      {/* ── 08 · Owner assignment ────────────────────────────── */}
      <Card
        title="Owner assignment"
        sub="Who is carrying each open plan"
        action={<Badge tone="warn">1 owner over capacity</Badge>}
        pad={false}
      >
        <ul className="divide-y divide-line">
          {[
            { owner: "Meera Iyer", initials: "MI", plans: 2, tasks: 6, critical: 2, tone: "bad" as const },
            { owner: "Arjun Nair", initials: "AN", plans: 1, tasks: 4, critical: 1, tone: "warn" as const },
            { owner: "Rohan Pillai", initials: "RP", plans: 1, tasks: 3, critical: 0, tone: "default" as const },
            { owner: "Karan Chadha", initials: "KC", plans: 1, tasks: 2, critical: 0, tone: "default" as const },
            { owner: "Vikram Rao", initials: "VR", plans: 1, tasks: 3, critical: 0, tone: "good" as const },
          ].map((o) => (
            <li
              key={o.owner}
              className="flex flex-wrap items-center gap-4 px-5 py-4 transition-colors hover:bg-soft"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ink text-[10.5px] font-bold text-white">
                {o.initials}
              </span>
              <div className="min-w-[130px] flex-1">
                <p className="text-[13.5px] font-semibold text-ink">{o.owner}</p>
                <p className="mt-0.5 text-[11.5px] text-slate-400">
                  {o.plans} {o.plans === 1 ? "plan" : "plans"} · {o.tasks} tasks
                </p>
              </div>
              <div className="w-[120px] shrink-0">
                <Progress
                  value={(o.tasks / 9) * 100}
                  tone={o.tone === "bad" ? "bad" : o.tone === "warn" ? "warn" : "accent"}
                />
              </div>
              {o.critical > 0 ? (
                <Badge tone="bad">{o.critical} critical</Badge>
              ) : (
                <Badge tone="default">No critical</Badge>
              )}
            </li>
          ))}
        </ul>
      </Card>

      {/* ── 09 · Cost & effort ───────────────────────────────── */}
      <Card
        title="Cost & effort"
        sub="What each rescue actually consumes"
        action={<Badge tone="accent">₹1.8 L deployed</Badge>}
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {INTERVENTION_OUTCOMES.map((o) => (
            <div
              key={`cost-${o.startup}`}
              className="rounded-xl border border-line p-4 transition-colors hover:border-accent/25"
            >
              <div className="flex items-start justify-between gap-3">
                <p className="text-[13px] font-semibold text-ink">{o.startup}</p>
                <span className="shrink-0 text-[13px] font-semibold tabular-nums text-ink">
                  {o.cost}
                </span>
              </div>
              <p className="mt-2.5 text-[11.5px] leading-relaxed text-slate-500">
                {o.outcome}
              </p>
              <p className="mt-2.5 border-t border-line pt-2.5 font-mono text-[10px] tracking-[0.08em] text-slate-400 uppercase">
                health {o.healthBefore} → {o.healthAfter}
              </p>
            </div>
          ))}
        </div>
      </Card>

      {/* ── 10 · Where to go next ────────────────────────────── */}
      <Card title="Where to go next" sub="From rescue to the wider portfolio">
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            {
              href: "/incubator/startups/at-risk",
              title: "At-risk register",
              body: "Where every open case and early-warning signal lives.",
              icon: Target,
            },
            {
              href: "/incubator/startups/assessment",
              title: "Assessment scores",
              body: "The six dimensions behind every trigger.",
              icon: ClipboardList,
            },
            {
              href: "/incubator/performance",
              title: "Portfolio performance",
              body: "Health and risk across every startup we run.",
              icon: TrendingUp,
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
