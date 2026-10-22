"use client";

import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  CircleAlert,
  Clock3,
  Gauge,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import Link from "next/link";
import { Badge, Card, PageHeader, Progress } from "@/components/app/widgets";
import { cn } from "@/lib/utils";
import {
  AT_RISK,
  EARLY_WARNINGS,
  OWNER_LOADS,
  RISK_TREND,
  RUNWAY_EXPOSURE,
  type AtRiskRecord,
} from "../../constants/startups-data";

const SEVERITIES = ["All", "High", "Medium", "Low"] as const;

export function AtRiskStartups() {
  const [severity, setSeverity] = useState<(typeof SEVERITIES)[number]>("All");

  const filtered = useMemo(
    () =>
      severity === "All"
        ? AT_RISK
        : AT_RISK.filter((r) => r.severity === severity),
    [severity],
  );

  const critical = AT_RISK.filter((r) => r.severity === "High").length;
  const avgAge = Math.round(
    AT_RISK.reduce((s, r) => s + parseInt(r.age, 10), 0) / AT_RISK.length,
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="At-Risk Startups"
        desc="Everything currently slipping — the register, the trend, the runway exposure and the signals we watch."
        actions={
          <Link
            href="/incubator/startups/interventions"
            className="inline-flex items-center gap-1.5 rounded-[10px] bg-accent px-4 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-accent-deep"
          >
            Open interventions
          </Link>
        }
      />

      {/* ── 01 · Risk register ───────────────────────────────── */}
      <Card
        title="Risk register"
        sub="Ranked by severity, then by how long it has been open"
        action={<Badge tone="bad">{critical} critical</Badge>}
        pad={false}
      >
        <ul className="divide-y divide-line">
          {filtered.map((r) => (
            <li
              key={r.slug}
              className="flex flex-col gap-3 px-5 py-4 transition-colors hover:bg-soft lg:flex-row lg:items-center"
            >
              <span
                className={cn(
                  "grid h-10 w-10 shrink-0 place-items-center rounded-lg",
                  r.tone === "bad"
                    ? "bg-red-50 text-red-600"
                    : r.tone === "warn"
                      ? "bg-amber-tint text-amber-dim"
                      : "bg-soft text-slate-400",
                )}
              >
                <CircleAlert className="h-4.5 w-4.5" />
              </span>
              <div className="min-w-[200px] flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-[13.5px] font-semibold text-ink">{r.name}</p>
                  <Badge tone={r.tone}>{r.severity}</Badge>
                </div>
                <p className="mt-0.5 text-[11.5px] text-slate-400">
                  {r.sector} · {r.risk}
                </p>
              </div>
              <span className="hidden min-w-[150px] text-[12px] text-slate-500 lg:block">
                {r.action}
              </span>
              <span className="text-[12px] text-slate-500">
                owner <b className="font-semibold text-ink">{r.owner}</b>
              </span>
              <span className="flex w-24 shrink-0 items-center gap-1.5 font-mono text-[10.5px] text-slate-400">
                <Clock3 className="h-3 w-3" /> {r.age}
              </span>
              <Link
                href={`/explore/startups/${r.slug}`}
                className="flex items-center gap-1 text-[12px] font-semibold text-accent hover:underline"
              >
                Profile <ArrowUpRight className="h-3 w-3" />
              </Link>
            </li>
          ))}
        </ul>
      </Card>

      {/* ── 02 · Severity filters ─────────────────────────────── */}
      <div className="flex flex-wrap gap-2">
        {SEVERITIES.map((s) => (
          <button
            key={s}
            onClick={() => setSeverity(s)}
            className={cn(
              "rounded-[10px] border px-3.5 py-2 text-[12.5px] font-medium transition-colors",
              severity === s
                ? "border-ink bg-ink text-white"
                : "border-line bg-white text-slate-500 hover:border-slate-300 hover:text-ink",
            )}
          >
            {s}
            <span className="ml-1.5 text-[11px] opacity-60">
              {s === "All"
                ? AT_RISK.length
                : AT_RISK.filter((r) => r.severity === s).length}
            </span>
          </button>
        ))}
      </div>

      {/* ── 03 · Risk trend ──────────────────────────────────── */}
      <div className="grid gap-5 lg:grid-cols-2">
        <Card
          title="Risk trend"
          sub="At-risk count and average risk score, by week"
          action={
            <span className="flex items-center gap-1.5 text-[12px] font-semibold text-slate-400">
              <TrendingUp className="h-3.5 w-3.5" /> 8 weeks
            </span>
          }
        >
          <div className="space-y-3">
            {RISK_TREND.map((p) => (
              <div key={p.week} className="flex items-center gap-3">
                <span className="w-12 shrink-0 font-mono text-[11px] text-slate-400">
                  W{p.week}
                </span>
                <div className="flex-1">
                  <Progress
                    value={p.avgScore}
                    tone={p.avgScore >= 75 ? "good" : p.avgScore >= 68 ? "accent" : "warn"}
                  />
                </div>
                <span className="w-8 text-right text-[12px] font-semibold tabular-nums text-ink">
                  {p.avgScore}
                </span>
                <span
                  className={cn(
                    "w-14 text-right font-mono text-[10.5px]",
                    p.atRisk > 5 ? "text-red-600" : p.atRisk > 3 ? "text-amber-dim" : "text-slate-400",
                  )}
                >
                  {p.atRisk} at risk
                </span>
              </div>
            ))}
          </div>
          <p className="mt-4 border-t border-line pt-3.5 text-[12px] leading-relaxed text-slate-500">
            <span className="font-semibold text-ink">Six at-risk in week 6, four now</span>{" "}
            — two interventions closed out. Average score is back above 70.
          </p>
        </Card>

        {/* ── 04 · Severity breakdown ─────────────────────────── */}
        <Card
          title="Severity breakdown"
          sub="How the register splits by level"
          action={<Badge tone="accent">{AT_RISK.length} open</Badge>}
        >
          <div className="space-y-4">
            {(["High", "Medium", "Low"] as const).map((s) => {
              const rows = AT_RISK.filter((r) => r.severity === s);
              const pct = Math.round((rows.length / AT_RISK.length) * 100);
              return (
                <div key={s} className="flex items-center gap-3">
                  <span className="w-[76px] shrink-0 text-[12.5px] font-medium text-slate-600">
                    {s}
                  </span>
                  <Progress
                    value={pct}
                    tone={s === "High" ? "bad" : s === "Medium" ? "warn" : "accent"}
                    className="flex-1"
                  />
                  <span className="w-6 text-right text-[12px] font-semibold tabular-nums text-ink">
                    {rows.length}
                  </span>
                  <span className="hidden min-w-[150px] text-[11.5px] text-slate-400 sm:block">
                    {rows.map((r) => r.name).join(", ") || "None"}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="mt-5 grid grid-cols-3 gap-3">
            {[
              { l: "Open cases", v: String(AT_RISK.length) },
              { l: "Critical", v: String(critical) },
              { l: "Avg age", v: `${avgAge} days` },
            ].map((x) => (
              <div key={x.l} className="rounded-xl bg-soft p-3.5 text-center">
                <p className="text-[18px] font-semibold tracking-tight text-ink tabular-nums">
                  {x.v}
                </p>
                <p className="mt-0.5 font-mono text-[9px] tracking-[0.12em] text-slate-400 uppercase">
                  {x.l}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* ── 05 · Runway exposure ─────────────────────────────── */}
      <Card
        title="Runway exposure"
        sub="How long the at-risk portfolio can keep going"
        action={<Badge tone="bad">2 critical</Badge>}
        pad={false}
      >
        <ul className="divide-y divide-line">
          {RUNWAY_EXPOSURE.map((r) => (
            <li
              key={r.name}
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
                <Gauge className="h-4 w-4" />
              </span>
              <div className="min-w-[130px] flex-1">
                <p className="text-[13.5px] font-semibold text-ink">{r.name}</p>
                <p className="mt-0.5 text-[11.5px] text-slate-400">
                  ARR {r.arr} · burn {r.burn}
                </p>
              </div>
              <div className="w-[120px] shrink-0">
                <Progress
                  value={(r.months / 12) * 100}
                  tone={r.tone === "bad" ? "bad" : r.tone === "warn" ? "warn" : "good"}
                />
              </div>
              <span className="w-[92px] shrink-0 text-right text-[12.5px] font-semibold tabular-nums text-ink">
                {r.runway}
              </span>
              <Badge tone={r.tone}>{r.severity}</Badge>
            </li>
          ))}
        </ul>
      </Card>

      {/* ── 06 · Early-warning signals ───────────────────────── */}
      <Card
        title="Early-warning signals"
        sub="What we watch before a startup shows up in the register"
        action={<Badge tone="accent">6 signals</Badge>}
        pad={false}
      >
        <ul className="divide-y divide-line">
          {EARLY_WARNINGS.map((e) => (
            <li
              key={e.signal}
              className="flex flex-wrap items-center gap-4 px-5 py-4 transition-colors hover:bg-soft"
            >
              <span
                className={cn(
                  "grid h-9 w-9 shrink-0 place-items-center rounded-lg",
                  e.tone === "bad"
                    ? "bg-red-50 text-red-600"
                    : e.tone === "warn"
                      ? "bg-amber-tint text-amber-dim"
                      : "bg-soft text-slate-400",
                )}
              >
                <CircleAlert className="h-4 w-4" />
              </span>
              <div className="min-w-[180px] flex-1">
                <p className="text-[13.5px] font-semibold text-ink">{e.signal}</p>
                <p className="mt-0.5 text-[11.5px] text-slate-400">{e.note}</p>
              </div>
              <span className="text-[12.5px] tabular-nums text-slate-500">
                <b className="font-semibold text-ink">{e.startups}</b> startups
              </span>
              <span className="font-mono text-[10.5px] text-slate-400">
                {e.detected}
              </span>
              <Badge tone={e.tone}>{e.severity}</Badge>
            </li>
          ))}
        </ul>
      </Card>

      {/* ── 07 · Owner load ─────────────────────────────────── */}
      <div className="grid gap-5 lg:grid-cols-2">
        <Card
          title="Owner load"
          sub="Who is carrying the open cases"
          action={<Badge tone="bad">2 critical with Meera</Badge>}
          pad={false}
        >
          <ul className="divide-y divide-line">
            {OWNER_LOADS.map((o) => (
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
                    oldest case {o.age}
                  </p>
                </div>
                <span className="text-[12.5px] tabular-nums text-slate-500">
                  <b className="font-semibold text-ink">{o.cases}</b> cases
                </span>
                {o.critical > 0 ? (
                  <Badge tone="bad">{o.critical} critical</Badge>
                ) : (
                  <Badge tone="default">No critical</Badge>
                )}
              </li>
            ))}
          </ul>
        </Card>

        {/* ── 08 · Watch vs act queue ────────────────────────── */}
        <Card
          title="Watch or act"
          sub="Which cases can be monitored and which need a plan"
          action={<Badge tone="accent">{AT_RISK.length} cases</Badge>}
        >
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-line p-4">
              <p className="font-mono text-[9.5px] tracking-[0.18em] text-slate-400 uppercase">
                Act now
              </p>
              <p className="mt-2 text-[24px] font-semibold leading-none tracking-[-0.03em] text-red-600 tabular-nums">
                {AT_RISK.filter((r) => r.severity === "High").length}
              </p>
              <ul className="mt-3 space-y-1.5">
                {AT_RISK.filter((r) => r.severity === "High").map((r) => (
                  <li key={r.slug} className="text-[12px] font-medium text-ink">
                    {r.name}
                  </li>
                ))}
              </ul>
              <p className="mt-3 border-t border-line pt-2.5 text-[11.5px] text-slate-400">
                Needs an intervention plan this week.
              </p>
            </div>
            <div className="rounded-xl border border-line p-4">
              <p className="font-mono text-[9.5px] tracking-[0.18em] text-slate-400 uppercase">
                Watch
              </p>
              <p className="mt-2 text-[24px] font-semibold leading-none tracking-[-0.03em] text-amber-dim tabular-nums">
                {AT_RISK.filter((r) => r.severity === "Medium").length}
              </p>
              <ul className="mt-3 space-y-1.5">
                {AT_RISK.filter((r) => r.severity === "Medium").map((r) => (
                  <li key={r.slug} className="text-[12px] font-medium text-ink">
                    {r.name}
                  </li>
                ))}
              </ul>
              <p className="mt-3 border-t border-line pt-2.5 text-[11.5px] text-slate-400">
                Monitor for two more weeks before escalating.
              </p>
            </div>
          </div>
          <Link
            href="/incubator/startups/interventions"
            className="mt-4 flex items-center gap-1 text-[12.5px] font-semibold text-accent"
          >
            Open the intervention plans <ArrowUpRight className="h-3 w-3" />
          </Link>
        </Card>
      </div>
      {/* ── 08 · Intervention triggers ──────────────────────── */}
      <Card
        title="What triggered these cases"
        sub="The signal that opened each intervention plan"
        action={
          <Link
            href="/incubator/startups/interventions"
            className="flex items-center gap-1 text-[12.5px] font-semibold text-accent"
          >
            Open plans <ArrowUpRight className="h-3 w-3" />
          </Link>
        }
        pad={false}
      >
        <ul className="divide-y divide-line">
          {AT_RISK.map((r) => (
            <li
              key={`trigger-${r.slug}`}
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
                <Target className="h-4 w-4" />
              </span>
              <div className="min-w-[180px] flex-1">
                <p className="text-[13.5px] font-semibold text-ink">{r.name}</p>
                <p className="mt-0.5 text-[11.5px] text-slate-400">{r.risk}</p>
              </div>
              <span className="hidden min-w-[150px] text-[12px] text-slate-500 sm:block">
                {r.action}
              </span>
              <span className="text-[12px] text-slate-500">
                owner <b className="font-semibold text-ink">{r.owner}</b>
              </span>
              <Badge tone={r.tone}>
                {r.severity === "High" ? "Intervention open" : "Monitoring"}
              </Badge>
            </li>
          ))}
        </ul>
      </Card>

      {/* ── 09 · Where to go next ────────────────────────────── */}
      <Card title="Where to go next" sub="From a risk to a plan">
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            {
              href: "/incubator/startups/interventions",
              title: "Open interventions",
              body: "Plans, tasks, owners and outcomes for every rescue.",
              icon: Target,
            },
            {
              href: "/incubator/startups/assessment",
              title: "Re-assess",
              body: "The six dimensions behind every risk score.",
              icon: Gauge,
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
