"use client";

import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  Award,
  GraduationCap,
  LineChart,
  TrendingUp,
  Users,
} from "lucide-react";
import Link from "next/link";
import { Badge, Card, PageHeader, Progress } from "@/components/app/widgets";
import { cn } from "@/lib/utils";
import {
  BENCHMARKS,
  HISTORICAL_COHORTS,
  OUTCOME_METRICS,
  SURVIVAL_CURVE,
} from "../../constants/cohorts-data";

const METRICS = [
  "All",
  "Graduation rate",
  "12-month survival",
  "36-month survival",
  "Capital raised",
  "IP filings",
] as const;

export function CohortAnalytics() {
  const [metric, setMetric] = useState<(typeof METRICS)[number]>("All");

  const rows = useMemo(
    () =>
      metric === "All"
        ? OUTCOME_METRICS
        : OUTCOME_METRICS.filter((m) => m.metric === metric),
    [metric],
  );

  const best = HISTORICAL_COHORTS.reduce((a, b) =>
    b.survival36 > a.survival36 ? b : a,
  );
  const avgSurvival = Math.round(
    HISTORICAL_COHORTS.reduce((s, c) => s + c.survival36, 0) /
      HISTORICAL_COHORTS.length,
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Cohort Analytics"
        desc="How our batches compare on survival, graduation, capital and IP — against each other and the network."
        actions={
          <Link
            href="/incubator/cohorts"
            className="inline-flex items-center gap-1.5 rounded-[10px] border border-line bg-white px-4 py-2.5 text-[13px] font-semibold text-ink transition-colors hover:bg-soft"
          >
            <Users className="h-3.5 w-3.5 text-slate-400" /> Back to cohorts
          </Link>
        }
      />

      {/* ── 01 · KPI strip ───────────────────────────────────── */}
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        {[
          { label: "Cohorts run", value: "6", note: "since 2022", tone: "default" as const },
          { label: "Avg 36-mo survival", value: `${avgSurvival}%`, note: "vs 49% network", tone: "good" as const },
          { label: "Capital mobilised", value: "₹220 Cr", note: "across 5 cohorts", tone: "good" as const },
          { label: "IP filings", value: "70", note: "1.7 per startup", tone: "accent" as const },
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

      {/* ── 02 · Outcome comparison ──────────────────────────── */}
      <Card
        title="Outcome comparison"
        sub="Every metric we track, against the ecosystem average"
        action={
          <div className="flex flex-wrap gap-1.5">
            {METRICS.map((m) => (
              <button
                key={m}
                onClick={() => setMetric(m)}
                className={cn(
                  "rounded-lg px-2.5 py-1 text-[11.5px] font-semibold transition-colors",
                  metric === m
                    ? "bg-ink text-white"
                    : "bg-soft text-slate-500 hover:text-ink",
                )}
              >
                {m}
              </button>
            ))}
          </div>
        }
        pad={false}
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[620px] text-left">
            <thead>
              <tr className="border-b border-line">
                {["Metric", "StartupHub Labs", "Network average", "Delta"].map((h) => (
                  <th
                    key={h}
                    className="px-5 py-3.5 text-[11px] font-semibold tracking-[0.12em] text-slate-400 uppercase"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {rows.map((m) => (
                <tr key={m.metric} className="transition-colors hover:bg-soft">
                  <td className="px-5 py-4 text-[13px] font-medium text-ink">
                    {m.metric}
                  </td>
                  <td className="px-5 py-4 text-[13px] font-semibold text-ink tabular-nums">
                    {m.cohort}
                  </td>
                  <td className="px-5 py-4 text-[12.5px] text-slate-500 tabular-nums">
                    {m.network}
                  </td>
                  <td className="px-5 py-4">
                    <Badge tone={m.better ? "good" : "warn"}>{m.delta}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="border-t border-line px-5 py-3.5 text-[11.5px] text-slate-400">
          Network average is the median across 240 comparable Indian incubators for
          the same cohort years.
        </p>
      </Card>

      {/* ── 03 · Survival curve ──────────────────────────────── */}
      <Card
        title="Survival curve"
        sub="Share of each cohort still operating, months after graduation"
        action={
          <span className="flex items-center gap-1.5 text-[12px] font-semibold text-slate-400">
            <LineChart className="h-3.5 w-3.5" /> 36 months
          </span>
        }
      >
        <div className="space-y-4">
          {SURVIVAL_CURVE.map((p) => (
            <div key={p.month} className="flex items-center gap-3">
              <span className="w-14 shrink-0 font-mono text-[11px] text-slate-400">
                +{p.month} mo
              </span>
              <div className="flex-1 space-y-1.5">
                <Progress value={p.cohortV} tone="good" />
                <Progress value={p.cohortIV} tone="accent" />
                <Progress value={p.cohortIII} tone="warn" />
              </div>
              <div className="w-[132px] shrink-0 text-right font-mono text-[10.5px] leading-[1.5] text-slate-400">
                <div className="text-rise">{p.cohortV}%</div>
                <div className="text-accent">{p.cohortIV}%</div>
                <div className="text-amber-dim">{p.cohortIII}%</div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-4 border-t border-line pt-3.5">
          {[
            { c: "bg-rise", l: "Cohort V" },
            { c: "bg-accent", l: "Cohort IV" },
            { c: "bg-amber-dim", l: "Cohort III" },
          ].map((x) => (
            <span key={x.l} className="flex items-center gap-1.5 text-[11.5px] text-slate-500">
              <span className={cn("h-2 w-2 rounded-full", x.c)} /> {x.l}
            </span>
          ))}
        </div>
        <p className="mt-3 text-[12px] leading-relaxed text-slate-500">
          <span className="font-semibold text-ink">+29 points at 36 months</span> — the
          gap widens with time, which is where cohort quality compounds.
        </p>
      </Card>

      {/* ── 04 · Graduation rate ─────────────────────────────── */}
      <div className="grid gap-5 lg:grid-cols-2">
        <Card
          title="Graduation rate"
          sub="Share of each batch that reached demo day"
          action={<Badge tone="good">86% average</Badge>}
        >
          <div className="space-y-4">
            {HISTORICAL_COHORTS.map((c) => {
              const pct = Math.round((c.graduated / c.size) * 100);
              return (
                <div key={c.name} className="flex items-center gap-3">
                  <span className="w-[104px] shrink-0 truncate text-[12.5px] font-medium text-slate-600">
                    {c.name}
                  </span>
                  <Progress
                    value={pct}
                    tone={pct >= 80 ? "good" : pct >= 65 ? "accent" : "warn"}
                    className="flex-1"
                  />
                  <span className="w-12 text-right text-[12px] font-semibold tabular-nums text-ink">
                    {c.graduated}/{c.size}
                  </span>
                </div>
              );
            })}
          </div>
        </Card>

        {/* ── 05 · Capital & IP ─────────────────────────────── */}
        <Card
          title="Capital & IP"
          sub="What each cohort took with them"
          action={<Badge tone="accent">₹220 Cr raised</Badge>}
          pad={false}
        >
          <ul className="divide-y divide-line">
            {HISTORICAL_COHORTS.map((c) => (
              <li
                key={c.name}
                className="flex flex-wrap items-center gap-4 px-5 py-4 transition-colors hover:bg-soft"
              >
                <div className="min-w-[130px] flex-1">
                  <p className="text-[13px] font-semibold text-ink">{c.name}</p>
                  <p className="mt-0.5 text-[11px] text-slate-400">
                    {c.track} · {c.year}
                  </p>
                </div>
                <span className="text-[13px] font-semibold text-ink tabular-nums">
                  {c.funding}
                </span>
                <span className="w-[52px] text-right text-[12px] text-slate-500 tabular-nums">
                  {c.ipr} IPR
                </span>
                <span className="w-[52px] text-right text-[12px] text-slate-500 tabular-nums">
                  {c.jobs} jobs
                </span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* ── 06 · Benchmarks ──────────────────────────────────── */}
      <Card
        title="Against the network"
        sub="How we compare on the six numbers the ecosystem judges us by"
        action={
          <span className="flex items-center gap-1.5 text-[12px] font-semibold text-slate-400">
            <Award className="h-3.5 w-3.5" /> 6 benchmarks
          </span>
        }
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {BENCHMARKS.map((b) => (
            <div
              key={b.metric}
              className="group rounded-xl border border-line p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-soft"
            >
              <p className="text-[12.5px] font-medium text-slate-500">{b.metric}</p>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-[24px] font-semibold tracking-[-0.03em] text-ink tabular-nums">
                  {b.ours}
                </span>
                <span className="text-[12px] text-slate-400">vs {b.network}</span>
              </div>
              <p className="mt-2.5 border-t border-line pt-2.5 text-[11.5px] leading-relaxed text-slate-500">
                {b.note}
              </p>
            </div>
          ))}
        </div>
      </Card>

      {/* ── 07 · Side-by-side comparison ────────────────────── */}
      <Card
        title="Side by side"
        sub="Every cohort on the six numbers that matter"
        action={<Badge tone="accent">{HISTORICAL_COHORTS.length} cohorts</Badge>}
        pad={false}
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-left">
            <thead>
              <tr className="border-b border-line">
                {["Cohort", "Year", "Size", "Graduated", "12-mo", "36-mo", "Funding", "IP", "Active"].map(
                  (h) => (
                    <th
                      key={h}
                      className="px-5 py-3.5 text-[11px] font-semibold tracking-[0.12em] text-slate-400 uppercase"
                    >
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {HISTORICAL_COHORTS.map((c) => (
                <tr key={c.name} className="transition-colors hover:bg-soft">
                  <td className="px-5 py-4 text-[13px] font-semibold text-ink">
                    {c.name}
                  </td>
                  <td className="px-5 py-4 text-[12px] text-slate-400">{c.year}</td>
                  <td className="px-5 py-4 text-[12.5px] tabular-nums text-slate-500">
                    {c.size}
                  </td>
                  <td className="px-5 py-4 text-[12.5px] tabular-nums text-slate-500">
                    {c.graduated}/{c.size}
                  </td>
                  <td className="px-5 py-4 text-[12.5px] font-semibold tabular-nums text-rise">
                    {c.survival12}%
                  </td>
                  <td className="px-5 py-4 text-[12.5px] font-semibold tabular-nums text-rise">
                    {c.survival36}%
                  </td>
                  <td className="px-5 py-4 text-[12.5px] font-medium tabular-nums text-ink">
                    {c.funding}
                  </td>
                  <td className="px-5 py-4 text-[12.5px] tabular-nums text-slate-500">
                    {c.ipr}
                  </td>
                  <td className="px-5 py-4 text-[12.5px] tabular-nums text-slate-500">
                    {c.stillActive}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* ── 08 · Best-performing cohort ──────────────────────── */}
      <Card
        title="Best-performing cohort"
        sub="What Cohort V did that the others did not"
        action={
          <Link
            href="/incubator/cohorts/cohort-vi"
            className="flex items-center gap-1 text-[12.5px] font-semibold text-accent"
          >
            Current batch <ArrowUpRight className="h-3 w-3" />
          </Link>
        }
      >
        <div className="grid gap-5 lg:grid-cols-3">
          <div className="rounded-xl border border-line p-5">
            <p className="font-mono text-[9.5px] tracking-[0.18em] text-slate-400 uppercase">
              Leader
            </p>
            <p className="mt-2 text-[22px] font-semibold tracking-[-0.025em] text-ink">
              {best.name}
            </p>
            <p className="mt-1 text-[12px] text-slate-400">
              {best.track} · {best.year}
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {[
                { l: "36-mo survival", v: `${best.survival36}%` },
                { l: "Capital raised", v: best.funding },
                { l: "IP filed", v: String(best.ipr) },
                { l: "Still active", v: `${best.stillActive}%` },
              ].map((x) => (
                <div key={x.l} className="rounded-lg bg-soft p-3 text-center">
                  <p className="text-[14px] font-semibold text-ink tabular-nums">
                    {x.v}
                  </p>
                  <p className="mt-0.5 font-mono text-[8.5px] tracking-[0.1em] text-slate-400 uppercase">
                    {x.l}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-2">
            <p className="text-[15px] leading-[1.45] font-medium tracking-[-0.015em] text-ink">
              Cohort V entered with 16 startups and left with 14 that raised a combined
              ₹86 Cr — 2.4× the network median.
            </p>
            <ul className="mt-4 space-y-2.5">
              {[
                "Hired a dedicated IP counsel before the cohort started, not in week 13.",
                "Ran demo day as a two-track evening — 6 health startups, 8 from other sectors.",
                "Pushed the first pilot requirement into week 9, which pulled commercial traction forward by three weeks.",
                "Closed 11 of 14 term sheets within 60 days of demo day.",
              ].map((t) => (
                <li
                  key={t}
                  className="flex items-start gap-2.5 text-[12.5px] leading-relaxed text-slate-500"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Card>

      {/* ── 09 · Where to go next ────────────────────────────── */}
      <Card title="Where to go next" sub="From history to the live picture">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              href: "/incubator/cohorts/progress",
              title: "Cohort progress",
              body: "Where every live batch is right now.",
              icon: TrendingUp,
            },
            {
              href: "/incubator/cohorts",
              title: "Cohort management",
              body: "The live portfolio, blockers and demo-day schedule.",
              icon: Users,
            },
            {
              href: "/incubator/performance",
              title: "Portfolio performance",
              body: "The same health rubric across every startup.",
              icon: GraduationCap,
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
