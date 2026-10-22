"use client";

import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  ChartNoAxesColumn,
  ClipboardCheck,
  Scale,
  TrendingUp,
  Users,
} from "lucide-react";
import Link from "next/link";
import { Badge, Card, GaugeRing, PageHeader, Progress } from "@/components/app/widgets";
import { cn } from "@/lib/utils";
import {
  ASSESSMENT_HISTORY,
  ASSESSMENT_QUEUE,
  ASSESSMENTS,
  PORTFOLIO,
  RUBRIC,
  type AssessmentScores,
} from "../../constants/startups-data";

const TREND_TONE = { up: "good", flat: "default", down: "bad" } as const;

export function StartupAssessment() {
  const [selectedSlug, setSelectedSlug] = useState(ASSESSMENTS[0].startupSlug);

  const selected = useMemo(
    () => ASSESSMENTS.find((a) => a.startupSlug === selectedSlug) ?? ASSESSMENTS[0],
    [selectedSlug],
  );
  const startup = useMemo(
    () => PORTFOLIO.find((s) => s.slug === selected.startupSlug),
    [selected],
  );
  const history = useMemo(
    () => ASSESSMENT_HISTORY.find((h) => h.startupSlug === selected.startupSlug),
    [selected],
  );
  const cohortAverage = Math.round(
    ASSESSMENTS.reduce((s, a) => s + a.overall, 0) / ASSESSMENTS.length,
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Startup Assessment"
        desc="Periodic scored assessments per startup — six dimensions, a trend, and what to do about it."
        actions={
          <Link
            href="/incubator/startups"
            className="inline-flex items-center gap-1.5 rounded-[10px] border border-line bg-white px-4 py-2.5 text-[13px] font-semibold text-ink transition-colors hover:bg-soft"
          >
            <Users className="h-3.5 w-3.5 text-slate-400" /> Back to portfolio
          </Link>
        }
      />

      {/* ── 01 · Rubric & weights ─────────────────────────────── */}
      <Card
        title="Assessment rubric"
        sub="Six weighted dimensions, applied to every startup"
        action={
          <span className="flex items-center gap-1.5 text-[12px] font-semibold text-slate-400">
            <Scale className="h-3.5 w-3.5" /> v3 · from 08 Apr 2026
          </span>
        }
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {RUBRIC.map((r) => (
            <div
              key={r.key}
              className="group rounded-xl border border-line p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-soft"
            >
              <div className="flex items-start justify-between gap-3">
                <p className="text-[13.5px] font-semibold text-ink">{r.label}</p>
                <span className="shrink-0 text-[20px] font-semibold tracking-[-0.03em] text-accent tabular-nums">
                  {r.weight}%
                </span>
              </div>
              <p className="mt-2 text-[12px] leading-relaxed text-slate-500">
                {r.rubric}
              </p>
              <div className="mt-3">
                <Progress value={r.weight * 5} tone="accent" />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* ── 02 · Scorecard for the selected startup ───────────── */}
      <Card
        title={
          startup ? `${startup.name} — assessment` : "Assessment scorecard"
        }
        sub={
          startup
            ? `${startup.sector} · ${startup.stage} · assessed ${selected.date} by ${selected.assessor}`
            : undefined
        }
        action={
          <Badge tone={TREND_TONE[selected.trend]}>
            {selected.trend === "up"
              ? "Improving"
              : selected.trend === "down"
                ? "Declining"
                : "Flat"}
          </Badge>
        }
      >
        <div className="grid gap-6 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <div className="space-y-3.5">
              {RUBRIC.map((r) => {
                const score = selected.scores[r.key] ?? 0;
                return (
                  <div key={r.key} className="flex items-center gap-3">
                    <span className="w-[136px] shrink-0 truncate text-[12.5px] font-medium text-slate-600">
                      {r.label}
                    </span>
                    <Progress
                      value={score}
                      tone={score >= 80 ? "good" : score >= 65 ? "accent" : "warn"}
                      className="flex-1"
                    />
                    <span className="w-8 text-right text-[12.5px] font-semibold tabular-nums text-ink">
                      {score}
                    </span>
                    <span className="hidden w-9 text-right font-mono text-[10px] text-slate-400 sm:block">
                      {r.weight}%
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
              <p className="text-[12.5px] text-slate-500">Weighted overall</p>
              <p className="text-[24px] font-semibold tracking-[-0.03em] text-ink tabular-nums">
                {selected.overall}
                <span className="ml-1 text-[12px] font-normal text-slate-400">
                  / 100
                </span>
              </p>
            </div>
            <p className="mt-4 rounded-xl border border-line bg-soft p-4 text-[12.5px] leading-relaxed text-slate-600">
              <span className="font-semibold text-ink">Recommendation:</span>{" "}
              {selected.recommendation}
            </p>
          </div>

          {/* overall ring + switcher */}
          <div className="lg:col-span-2">
            <div className="flex flex-col items-center rounded-xl border border-line p-5 text-center">
              <GaugeRing
                value={selected.overall}
                size={104}
                label={selected.overall >= 80 ? "strong" : selected.overall >= 65 ? "watch" : "at risk"}
              />
              <p className="mt-3 text-[12.5px] font-semibold text-ink">
                {selected.overall >= 80
                  ? "Above cohort average"
                  : selected.overall >= cohortAverage
                    ? "At cohort average"
                    : "Below cohort average"}
              </p>
              <p className="mt-0.5 font-mono text-[10px] tracking-[0.08em] text-slate-400 uppercase">
                cohort avg {cohortAverage}
              </p>
            </div>
            <p className="mt-4 mb-2 font-mono text-[9.5px] tracking-[0.18em] text-slate-400 uppercase">
              Switch startup
            </p>
            <ul className="space-y-1.5">
              {ASSESSMENTS.map((a) => {
                const s = PORTFOLIO.find((x) => x.slug === a.startupSlug);
                const on = a.startupSlug === selectedSlug;
                return (
                  <li key={a.startupSlug}>
                    <button
                      onClick={() => setSelectedSlug(a.startupSlug)}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-xl border px-3.5 py-2.5 text-left transition-colors",
                        on
                          ? "border-accent bg-accent-mist"
                          : "border-line bg-white hover:border-slate-300",
                      )}
                    >
                      <span
                        className={cn(
                          "grid h-8 w-8 shrink-0 place-items-center rounded-full text-[10.5px] font-bold",
                          on ? "bg-accent text-white" : "bg-soft text-slate-500",
                        )}
                      >
                        {(s?.name ?? "?")
                          .split(" ")
                          .map((w) => w[0])
                          .join("")
                          .slice(0, 2)}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[12.5px] font-semibold text-ink">
                          {s?.name}
                        </span>
                        <span className="block truncate text-[11px] text-slate-400">
                          {s?.sector}
                        </span>
                      </span>
                      <span className="shrink-0 text-[13px] font-semibold tabular-nums text-ink">
                        {a.overall}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Card>

      {/* ── 03 · Assessment history ──────────────────────────── */}
      <Card
        title="Assessment history"
        sub="Score movement across the last three quarters"
        action={
          <span className="flex items-center gap-1.5 text-[12px] font-semibold text-slate-400">
            <TrendingUp className="h-3.5 w-3.5" /> Quarterly cadence
          </span>
        }
        pad={false}
      >
        <ul className="divide-y divide-line">
          {ASSESSMENT_HISTORY.map((h) => {
            const s = PORTFOLIO.find((x) => x.slug === h.startupSlug);
            const move = h.quarters[h.quarters.length - 1].score - h.quarters[0].score;
            return (
              <li
                key={h.startupSlug}
                className="flex flex-wrap items-center gap-4 px-5 py-4 transition-colors hover:bg-soft"
              >
                <span className="min-w-[120px] flex-1">
                  <span className="block text-[13.5px] font-semibold text-ink">
                    {s?.name}
                  </span>
                  <span className="block text-[11.5px] text-slate-400">
                    {s?.sector}
                  </span>
                </span>
                <div className="flex w-[220px] items-end gap-1.5">
                  {h.quarters.map((q) => (
                    <span key={q.label} className="flex flex-1 flex-col items-center gap-1">
                      <span
                        className={cn(
                          "w-full rounded-sm",
                          q.score >= 80
                            ? "bg-rise"
                            : q.score >= 65
                              ? "bg-accent"
                              : "bg-amber-dim",
                        )}
                        style={{ height: `${Math.max(10, q.score * 0.6)}px` }}
                      />
                      <span className="font-mono text-[9.5px] text-slate-400">
                        {q.score}
                      </span>
                      <span className="font-mono text-[9px] text-slate-300">
                        {q.label}
                      </span>
                    </span>
                  ))}
                </div>
                <Badge tone={move > 0 ? "good" : move < 0 ? "bad" : "default"}>
                  {move > 0 ? `+${move}` : move < 0 ? `${move}` : "Flat"}
                </Badge>
              </li>
            );
          })}
        </ul>
      </Card>

      {/* ── 04 · Cohort benchmark ─────────────────────────────── */}
      <div className="grid gap-5 lg:grid-cols-2">
        <Card
          title="Cohort benchmark"
          sub="This startup against the assessed cohort average"
          action={<Badge tone="accent">avg {cohortAverage}</Badge>}
        >
          <div className="space-y-3.5">
            {RUBRIC.map((r) => {
              const ours = selected.scores[r.key] ?? 0;
              const diff = ours - cohortAverage;
              return (
                <div key={r.key} className="flex items-center gap-3">
                  <span className="w-[136px] shrink-0 truncate text-[12.5px] font-medium text-slate-600">
                    {r.label}
                  </span>
                  <Progress
                    value={ours}
                    tone={ours >= 80 ? "good" : ours >= 65 ? "accent" : "warn"}
                    className="flex-1"
                  />
                  <span
                    className={cn(
                      "w-14 text-right text-[12px] font-semibold tabular-nums",
                      diff > 0 ? "text-rise" : diff < 0 ? "text-amber-dim" : "text-slate-400",
                    )}
                  >
                    {diff > 0 ? `+${diff}` : diff < 0 ? `${diff}` : "—"}
                  </span>
                </div>
              );
            })}
          </div>
        </Card>

        {/* ── 05 · Assessor & cadence ───────────────────────── */}
        <Card
          title="Assessor & cadence"
          sub="Who scores what, and when"
          action={<Badge tone="accent">5 assessors</Badge>}
          pad={false}
        >
          <ul className="divide-y divide-line">
            {ASSESSMENT_QUEUE.map((q) => {
              const s = PORTFOLIO.find((x) => x.slug === q.startupSlug);
              return (
                <li
                  key={q.startupSlug}
                  className="flex flex-wrap items-center gap-4 px-5 py-4 transition-colors hover:bg-soft"
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent">
                    <ClipboardCheck className="h-4 w-4" />
                  </span>
                  <div className="min-w-[140px] flex-1">
                    <p className="text-[13.5px] font-semibold text-ink">{s?.name}</p>
                    <p className="mt-0.5 text-[11.5px] text-slate-400">
                      assessor {q.assessor} · due {q.due}
                    </p>
                  </div>
                  <Badge tone={q.tone}>{q.state}</Badge>
                </li>
              );
            })}
          </ul>
        </Card>
      </div>

      {/* ── 06 · Dimension gaps ──────────────────────────────── */}
      <Card
        title="Dimension gaps"
        sub="Where the weakest scores are across the assessed pool"
        action={<Badge tone="warn">2 systemic gaps</Badge>}
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {RUBRIC.map((r) => {
            const scores = ASSESSMENTS.map((a) => a.scores[r.key] ?? 0);
            const avg = Math.round(scores.reduce((s, v) => s + v, 0) / scores.length);
            const weakest = Math.min(...scores);
            return (
              <div
                key={r.key}
                className="rounded-xl border border-line p-4 transition-colors hover:border-accent/25"
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="text-[13px] font-semibold text-ink">{r.label}</p>
                  <span
                    className={cn(
                      "shrink-0 text-[19px] font-semibold tracking-[-0.03em] tabular-nums",
                      avg >= 78 ? "text-rise" : avg >= 68 ? "text-accent" : "text-amber-dim",
                    )}
                  >
                    {avg}
                  </span>
                </div>
                <div className="mt-2.5">
                  <Progress
                    value={avg}
                    tone={avg >= 78 ? "good" : avg >= 68 ? "accent" : "warn"}
                  />
                </div>
                <p className="mt-2.5 text-[11.5px] text-slate-400">
                  lowest {weakest} · weight {r.weight}%
                </p>
              </div>
            );
          })}
        </div>
      </Card>

      {/* ── 07 · Recommendations ─────────────────────────────── */}
      <Card
        title="Recommendations"
        sub="What each assessment is asking for next"
        action={<Badge tone="accent">{ASSESSMENTS.length} issued</Badge>}
        pad={false}
      >
        <ul className="divide-y divide-line">
          {ASSESSMENTS.map((a) => {
            const s = PORTFOLIO.find((x) => x.slug === a.startupSlug);
            return (
              <li
                key={a.startupSlug}
                className="flex flex-wrap items-center gap-4 px-5 py-4 transition-colors hover:bg-soft"
              >
                <span
                  className={cn(
                    "grid h-9 w-9 shrink-0 place-items-center rounded-lg",
                    a.overall >= 80
                      ? "bg-rise-tint text-rise"
                      : a.overall >= 65
                        ? "bg-accent-soft text-accent"
                        : "bg-amber-tint text-amber-dim",
                  )}
                >
                  <TrendingUp className="h-4 w-4" />
                </span>
                <div className="min-w-[150px] flex-1">
                  <p className="text-[13.5px] font-semibold text-ink">{s?.name}</p>
                  <p className="mt-0.5 text-[11.5px] text-slate-400">
                    {a.recommendation}
                  </p>
                </div>
                <span className="text-[14px] font-semibold tabular-nums text-ink">
                  {a.overall}
                </span>
                <Badge tone={TREND_TONE[a.trend]}>
                  {a.trend === "up" ? "Improving" : a.trend === "down" ? "Declining" : "Flat"}
                </Badge>
              </li>
            );
          })}
        </ul>
      </Card>

      {/* ── 08 · Assessment queue ───────────────────────────── */}
      <Card
        title="Assessment queue"
        sub="Still to be scored this cycle"
        action={<Badge tone="bad">1 overdue</Badge>}
        pad={false}
      >
        <ul className="divide-y divide-line">
          {ASSESSMENT_QUEUE.map((q) => {
            const s = PORTFOLIO.find((x) => x.slug === q.startupSlug);
            return (
              <li
                key={q.startupSlug}
                className="flex flex-wrap items-center gap-4 px-5 py-4 transition-colors hover:bg-soft"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent">
                  <ClipboardCheck className="h-4 w-4" />
                </span>
                <div className="min-w-[140px] flex-1">
                  <p className="text-[13.5px] font-semibold text-ink">{s?.name}</p>
                  <p className="mt-0.5 text-[11.5px] text-slate-400">
                    {q.assessor} · due {q.due}
                  </p>
                </div>
                <Badge tone={q.tone}>{q.state}</Badge>
              </li>
            );
          })}
        </ul>
      </Card>

      {/* ── 09 · Where to go next ────────────────────────────── */}
      <Card title="Where to go next" sub="Turning a score into an action">
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            {
              href: "/incubator/startups/at-risk",
              title: "At-risk register",
              body: "Where a low score needs a rescue plan.",
              icon: Scale,
            },
            {
              href: "/incubator/startups/interventions",
              title: "Interventions",
              body: "Open a plan with tasks, owners and outcomes.",
              icon: ClipboardCheck,
            },
            {
              href: "/incubator/performance",
              title: "Portfolio performance",
              body: "The same rubric across every startup we run.",
              icon: ChartNoAxesColumn,
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
