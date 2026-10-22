"use client";

import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  Banknote,
  CalendarDays,
  FileWarning,
  HandCoins,
  Target,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { Badge, Card, PageHeader, Progress, Stat } from "@/components/app/widgets";
import { cn } from "@/lib/utils";
import { FUNDING_READINESS } from "../../constants/startups-data";
import {
  FUNDING_BLOCKERS,
  FUNDING_CALENDAR,
  FUNDING_DEALS,
  FUNDING_INTERVENTIONS,
  FUNDING_STATUS,
  FUNDING_VELOCITY,
  GRANT_SCHEMES,
} from "../../constants/support-data";

export function FundingSupport() {
  const [stage, setStage] = useState<string>("All");

  const stages = useMemo(
    () => ["All", ...new Set(FUNDING_STATUS.map((f) => f.stage))],
    [],
  );

  const filtered = useMemo(
    () =>
      stage === "All"
        ? FUNDING_STATUS
        : FUNDING_STATUS.filter((f) => f.stage === stage),
    [stage],
  );

  const live = FUNDING_DEALS.filter(
    (d) => d.status !== "Paused" && d.status !== "Not raising",
  );
  const liveTarget = live.reduce((s, d) => s + parseFloat(d.target.replace(/[^\d.]/g, "")), 0);
  const openGrants = GRANT_SCHEMES.filter((g) => g.applied < g.eligible);
  const avgReadiness = Math.round(
    FUNDING_STATUS.reduce((s, f) => s + f.readiness, 0) / FUNDING_STATUS.length,
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Funding Support"
        desc="Who is raising, who is ready, and where the programme is holding the process up."
        actions={
          <Link
            href="/incubator/support"
            className="inline-flex items-center gap-1.5 rounded-[10px] border border-line bg-white px-4 py-2.5 text-[13px] font-semibold text-ink transition-colors hover:bg-soft"
          >
            All support
          </Link>
        }
      />

      {/* ── 01 · KPIs ────────────────────────────────────────── */}
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        <Stat
          icon={HandCoins}
          label="Live raises"
          value={String(live.length)}
          delta={`₹${liveTarget.toFixed(1)} Cr in play`}
          tone="good"
        />
        <Stat
          icon={Target}
          label="Average readiness"
          value={`${avgReadiness}%`}
          delta="across the tracked portfolio"
          tone="good"
        />
        <Stat
          icon={FileWarning}
          label="Open grants"
          value={String(openGrants.length)}
          delta={`${openGrants.reduce((s, g) => s + (g.eligible - g.applied), 0)} applications missing`}
          tone="warn"
        />
        <Stat
          icon={Banknote}
          label="Critical blockers"
          value={String(FUNDING_BLOCKERS.filter((b) => b.severity === "Critical").length)}
          delta="startups with no data room"
          tone="bad"
        />
      </div>

      {/* ── 02 · Readiness by stage ──────────────────────────── */}
      <Card
        title="Readiness by stage"
        sub="Startups ready to raise, against the total at that stage"
        action={<Badge tone="accent">{FUNDING_READINESS.length} stages</Badge>}
      >
        <div className="space-y-4">
          {FUNDING_READINESS.map((f) => (
            <div key={f.stage} className="flex items-center gap-3">
              <span className="w-24 shrink-0 text-[12.5px] font-medium text-slate-600">
                {f.stage}
              </span>
              <Progress
                value={(f.ready / f.total) * 100}
                tone={f.tone === "good" ? "good" : f.tone === "accent" ? "accent" : "warn"}
                className="flex-1"
              />
              <span className="w-14 text-right text-[12px] font-semibold tabular-nums text-ink">
                {f.ready}/{f.total}
              </span>
              <span className="w-16 text-right font-mono text-[10.5px] text-slate-400">
                {f.raised}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-4 rounded-xl border border-line bg-soft p-4 text-[12.5px] leading-relaxed text-slate-600">
          <span className="font-semibold text-ink">Seed is the crowded stage</span> —
          38 of 64 are ready, but the funds in our network are writing there the
          most. Pre-seed is where the readiness gap hurts.
        </p>
      </Card>

      {/* ── 03 · Stage filter ────────────────────────────────── */}
      <div className="flex flex-wrap gap-2">
        {stages.map((s) => (
          <button
            key={s}
            onClick={() => setStage(s)}
            className={cn(
              "rounded-[10px] border px-3.5 py-2 text-[12.5px] font-medium transition-colors",
              stage === s
                ? "border-ink bg-ink text-white"
                : "border-line bg-white text-slate-500 hover:border-slate-300 hover:text-ink",
            )}
          >
            {s}
            <span className="ml-1.5 text-[11px] opacity-60">
              {s === "All"
                ? FUNDING_STATUS.length
                : FUNDING_STATUS.filter((f) => f.stage === s).length}
            </span>
          </button>
        ))}
      </div>

      {/* ── 04 · Portfolio funding status ────────────────────── */}
      <Card
        title="Portfolio funding status"
        sub="Every tracked startup, with the round it is preparing for"
        action={<Badge tone="accent">{FUNDING_STATUS.length} startups</Badge>}
        pad={false}
      >
        <ul className="divide-y divide-line">
          {filtered.map((f) => (
            <li
              key={f.startupSlug}
              className="flex flex-col gap-3 px-5 py-4 transition-colors hover:bg-soft lg:flex-row lg:items-center lg:gap-4"
            >
              <div className="min-w-[190px] flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-[13.5px] font-semibold text-ink">{f.startup}</p>
                  <Badge tone={f.tone}>{f.stage}</Badge>
                </div>
                <p className="mt-0.5 text-[11.5px] text-slate-400">
                  {f.sector} · raised {f.raised} · {f.target}
                </p>
              </div>
              <div className="w-32 shrink-0">
                <Progress
                  value={f.readiness}
                  tone={f.tone === "bad" ? "bad" : f.tone === "warn" ? "warn" : "good"}
                />
              </div>
              <span className="w-12 shrink-0 text-right text-[12px] font-semibold tabular-nums text-ink">
                {f.readiness}%
              </span>
              <span className="hidden min-w-[200px] text-[12px] text-slate-500 xl:block">
                {f.next}
              </span>
            </li>
          ))}
        </ul>
      </Card>

      {/* ── 05 · Fundraising pipeline ────────────────────────── */}
      <Card
        title="Fundraising pipeline"
        sub="Every raise in motion, and where it has stalled"
        action={<Badge tone="bad">1 at risk</Badge>}
        pad={false}
      >
        <ul className="divide-y divide-line">
          {FUNDING_DEALS.map((d) => (
            <li
              key={d.id}
              className="flex flex-wrap items-center gap-4 px-5 py-4 transition-colors hover:bg-soft"
            >
              <span
                className={cn(
                  "grid h-9 w-9 shrink-0 place-items-center rounded-lg",
                  d.tone === "bad"
                    ? "bg-red-50 text-red-600"
                    : d.tone === "warn"
                      ? "bg-amber-tint text-amber-dim"
                      : d.tone === "good"
                        ? "bg-rise-tint text-rise"
                        : "bg-accent-soft text-accent",
                )}
              >
                <HandCoins className="h-4 w-4" />
              </span>
              <div className="min-w-[190px] flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-[13.5px] font-semibold text-ink">{d.startup}</p>
                  <Badge tone={d.tone}>{d.status}</Badge>
                </div>
                <p className="mt-0.5 text-[11.5px] text-slate-400">
                  {d.round} · {d.target} · lead {d.lead}
                </p>
              </div>
              <span className="hidden min-w-[220px] text-[12px] text-slate-500 lg:block">
                {d.note}
              </span>
              <span className="w-20 shrink-0 text-right font-mono text-[10.5px] text-slate-400">
                {d.days}d open
              </span>
            </li>
          ))}
        </ul>
      </Card>

      {/* ── 06 · Grant schemes ───────────────────────────────── */}
      <Card
        title="Grant & scheme support"
        sub="Government money the programme can help the portfolio reach"
        action={
          <Badge tone="warn">
            {openGrants.reduce((s, g) => s + (g.eligible - g.applied), 0)} missing
          </Badge>
        }
        pad={false}
      >
        <ul className="divide-y divide-line">
          {GRANT_SCHEMES.map((g) => (
            <li
              key={g.name}
              className="flex flex-wrap items-center gap-4 px-5 py-4 transition-colors hover:bg-soft"
            >
              <span
                className={cn(
                  "grid h-9 w-9 shrink-0 place-items-center rounded-lg",
                  g.tone === "good"
                    ? "bg-rise-tint text-rise"
                    : g.tone === "warn"
                      ? "bg-amber-tint text-amber-dim"
                      : g.tone === "bad"
                        ? "bg-red-50 text-red-600"
                        : "bg-accent-soft text-accent",
                )}
              >
                <Banknote className="h-4 w-4" />
              </span>
              <div className="min-w-[200px] flex-1">
                <p className="text-[13.5px] font-semibold text-ink">{g.name}</p>
                <p className="mt-0.5 text-[11.5px] text-slate-400">
                  {g.provider} · {g.amount} · closes {g.deadline}
                </p>
              </div>
              <span className="hidden min-w-[190px] text-[12px] text-slate-500 lg:block">
                {g.note}
              </span>
              <span className="text-[12px] tabular-nums text-slate-500">
                <b className="font-semibold text-ink">{g.applied}</b>/{g.eligible} applied
              </span>
              <Badge tone={g.tone}>
                {g.applied >= g.eligible ? "Complete" : "Open"}
              </Badge>
            </li>
          ))}
        </ul>
      </Card>

      {/* ── 07 · Funding blockers ────────────────────────────── */}
      <Card
        title="Funding blockers"
        sub="Why a raise stalls — and the cheapest way to unstick it"
        action={<Badge tone="bad">{FUNDING_BLOCKERS.length} blockers</Badge>}
        pad={false}
      >
        <ul className="divide-y divide-line">
          {FUNDING_BLOCKERS.map((b) => (
            <li
              key={b.reason}
              className="flex flex-col gap-3 px-5 py-4 transition-colors hover:bg-soft sm:flex-row sm:items-center sm:gap-4"
            >
              <span
                className={cn(
                  "grid h-9 w-9 shrink-0 place-items-center rounded-lg",
                  b.tone === "bad"
                    ? "bg-red-50 text-red-600"
                    : b.tone === "warn"
                      ? "bg-amber-tint text-amber-dim"
                      : "bg-soft text-slate-400",
                )}
              >
                <FileWarning className="h-4 w-4" />
              </span>
              <div className="min-w-[190px] flex-1">
                <p className="text-[13.5px] font-semibold text-ink">{b.reason}</p>
                <p className="mt-0.5 text-[11.5px] text-slate-400">{b.note}</p>
              </div>
              <span className="min-w-[190px] text-[12px] text-slate-500">{b.fix}</span>
              <span className="w-20 shrink-0 text-right text-[12px] tabular-nums text-slate-500">
                <b className="font-semibold text-ink">{b.startups}</b> startups
              </span>
              <Badge tone={b.tone}>{b.severity}</Badge>
            </li>
          ))}
        </ul>
      </Card>

      {/* ── 08 · Interventions ───────────────────────────────── */}
      <Card
        title="Funding interventions"
        sub="What the programme did, and what it moved"
        action={
          <span className="flex items-center gap-1.5 text-[12px] font-semibold text-slate-400">
            <TrendingUp className="h-3.5 w-3.5" /> {FUNDING_INTERVENTIONS.length} this quarter
          </span>
        }
        pad={false}
      >
        <ul className="divide-y divide-line">
          {FUNDING_INTERVENTIONS.map((f) => (
            <li
              key={f.id}
              className="flex flex-wrap items-center gap-4 px-5 py-4 transition-colors hover:bg-soft"
            >
              <span
                className={cn(
                  "grid h-9 w-9 shrink-0 place-items-center rounded-lg",
                  f.tone === "good"
                    ? "bg-rise-tint text-rise"
                    : f.tone === "warn"
                      ? "bg-amber-tint text-amber-dim"
                      : "bg-accent-soft text-accent",
                )}
              >
                <Target className="h-4 w-4" />
              </span>
              <div className="min-w-[210px] flex-1">
                <p className="text-[13.5px] font-semibold text-ink">{f.action}</p>
                <p className="mt-0.5 text-[11.5px] text-slate-400">
                  {f.startup} · {f.note}
                </p>
              </div>
              <Badge tone={f.tone}>{f.outcome}</Badge>
            </li>
          ))}
        </ul>
      </Card>

      {/* ── 09 · Funding calendar ────────────────────────────── */}
      <Card
        title="Funding calendar"
        sub="Deadlines the portfolio cannot miss"
        action={<CalendarDays className="h-4 w-4 text-slate-400" />}
        pad={false}
      >
        <ul className="divide-y divide-line">
          {FUNDING_CALENDAR.map((c) => (
            <li
              key={`${c.month}-${c.event}`}
              className="flex flex-wrap items-center gap-4 px-5 py-4 transition-colors hover:bg-soft"
            >
              <span className="w-20 shrink-0 font-mono text-[11px] text-slate-400">
                {c.month}
              </span>
              <div className="min-w-[210px] flex-1">
                <p className="text-[13.5px] font-semibold text-ink">{c.event}</p>
                <p className="mt-0.5 text-[11.5px] text-slate-400">{c.note}</p>
              </div>
              <span className="text-[12px] tabular-nums text-slate-500">
                <b className="font-semibold text-ink">{c.count}</b> items
              </span>
              <Badge tone={c.tone}>
                {c.tone === "bad" ? "Missed" : c.tone === "warn" ? "Closing" : "Open"}
              </Badge>
            </li>
          ))}
        </ul>
        <Link
          href="/incubator/support/investors"
          className="flex items-center gap-1 border-t border-line px-5 py-3.5 text-[12.5px] font-semibold text-accent hover:underline"
        >
          Match these raises to investors →
        </Link>
      </Card>
      {/* ── 10 · Funding velocity ────────────────────────────── */}
      <Card
        title="Funding velocity"
        sub="How long each step of a raise actually takes"
        action={<Badge tone="warn">9 days to first meeting</Badge>}
      >
        <div className="space-y-4">
          {FUNDING_VELOCITY.map((v) => (
            <div key={v.stage} className="flex items-center gap-3">
              <span className="w-[190px] shrink-0 text-[12.5px] font-medium text-slate-600">
                {v.stage}
              </span>
              <Progress
                value={(v.days / 100) * 100}
                tone={v.tone === "good" ? "good" : v.tone === "warn" ? "warn" : "accent"}
                className="flex-1"
              />
              <span className="w-12 text-right text-[12px] font-semibold tabular-nums text-ink">
                {v.days}d
              </span>
            </div>
          ))}
        </div>
        <p className="mt-4 rounded-xl border border-line bg-soft p-4 text-[12.5px] leading-relaxed text-slate-600">
          <span className="font-semibold text-ink">The programme answers in two days.</span>{" "}
          Everything after that is the market — and nine days to a first meeting
          is the part we still control.
        </p>
      </Card>

      {/* ── 11 · Where to go next ────────────────────────────── */}
      <Card title="Where to go next" sub="From the raise to the rest of the stack">
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            {
              href: "/incubator/support/investors",
              title: "Investor connections",
              body: "Who the network says will actually fund this.",
              icon: HandCoins,
            },
            {
              href: "/incubator/support/ipr",
              title: "IPR support",
              body: "Diligence stops on filings, not on pitch.",
              icon: FileWarning,
            },
            {
              href: "/incubator/support",
              title: "All support",
              body: "The full queue across four pillars.",
              icon: Target,
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
