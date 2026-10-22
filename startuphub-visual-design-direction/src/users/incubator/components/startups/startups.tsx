"use client";

import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  ChartNoAxesColumn,
  Handshake,
  Search,
  Users,
} from "lucide-react";
import Link from "next/link";
import { Badge, Card, PageHeader, Progress, Stat } from "@/components/app/widgets";
import { cn } from "@/lib/utils";
import {
  COHORT_SPREAD,
  FUNDING_READINESS,
  HEALTH_BANDS,
  MENTOR_COVERAGE,
  PORTFOLIO,
  PORTFOLIO_KPIS,
  SECTOR_SPLIT,
  STAGE_SPLIT,
  type PortfolioStartup,
} from "../../constants/startups-data";

const riskTone = { Low: "good", Medium: "warn", High: "bad" } as const;

const FILTERS = ["All", "Pre-seed", "Seed", "Series A", "At-risk"] as const;

export function Startups() {
  const [query, setQuery] = useState("");
  const [filt, setFilt] = useState<(typeof FILTERS)[number]>("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PORTFOLIO.filter((s) => {
      if (filt === "At-risk" && s.risk === "Low") return false;
      if (filt !== "All" && filt !== "At-risk" && s.stage !== filt) return false;
      if (!q) return true;
      return [s.name, s.sector, s.mentor].join(" ").toLowerCase().includes(q);
    });
  }, [query, filt]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Startup Portfolio"
        desc="240 startups across 12 programmes — filter, inspect and jump to any startup's full profile."
        actions={
          <button className="inline-flex items-center gap-1.5 rounded-[10px] bg-accent px-4 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-accent-deep">
            Add startup
          </button>
        }
      />

      {/* ── 01 · Portfolio KPI strip ─────────────────────────── */}
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        {PORTFOLIO_KPIS.map((k) => (
          <Stat
            key={k.label}
            icon={
              k.tone === "good"
                ? ChartNoAxesColumn
                : k.tone === "warn"
                  ? Users
                  : Handshake
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
        <div className="relative flex-1 sm:max-w-sm">
          <Search className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name, sector, mentor…"
            aria-label="Search startups"
            className="h-11 w-full rounded-[10px] border border-line bg-white pl-10 pr-4 text-sm text-ink placeholder:text-slate-400 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/15"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilt(f)}
              className={cn(
                "rounded-full border px-3.5 py-2 text-[12.5px] font-medium transition-all",
                filt === f
                  ? "border-accent bg-accent text-white"
                  : "border-line bg-white text-slate-600 hover:border-slate-300",
              )}
            >
              {f}
              <span className="ml-1.5 text-[11px] opacity-60">
                {f === "All"
                  ? PORTFOLIO.length
                  : f === "At-risk"
                    ? PORTFOLIO.filter((s) => s.risk !== "Low").length
                    : PORTFOLIO.filter((s) => s.stage === f).length}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ── 03 · Startup grid ────────────────────────────────── */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((s) => (
          <Card
            key={s.slug}
            className="transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_32px_-18px_rgba(11,18,32,0.2)]"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent-soft text-[12px] font-bold text-accent">
                  {s.name
                    .split(" ")
                    .map((w) => w[0])
                    .join("")
                    .slice(0, 2)}
                </span>
                <div>
                  <p className="text-[14.5px] font-semibold text-ink">{s.name}</p>
                  <p className="text-[11px] text-slate-400">
                    Cohort {s.cohort} · {s.sector}
                  </p>
                </div>
              </div>
              <Badge tone={riskTone[s.risk]}>{s.risk}</Badge>
            </div>
            <div className="mt-4 space-y-3">
              {(
                [
                  ["Health", s.health],
                  ["Readiness", s.readiness],
                ] as [string, number][]
              ).map(([l, v]) => (
                <div key={l} className="flex items-center gap-3">
                  <span className="w-16 text-[11.5px] text-slate-500">{l}</span>
                  <Progress
                    value={v}
                    tone={v < 50 ? "bad" : v < 70 ? "warn" : "accent"}
                    className="flex-1"
                  />
                  <span className="w-7 text-right text-[12px] font-semibold tabular-nums text-ink">
                    {v}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-line pt-3.5">
              <span className="text-[11.5px] text-slate-400">
                {s.stage} · mentor {s.mentor}
              </span>
              <Link
                href={`/explore/startups/${s.slug}`}
                className="flex items-center gap-1 text-[12px] font-semibold text-accent hover:underline"
              >
                Profile <ArrowUpRight className="h-3 w-3" />
              </Link>
            </div>
          </Card>
        ))}
      </div>

      {/* ── 04 · Sector & stage distribution ──────────────────── */}
      <div className="grid gap-5 lg:grid-cols-2">
        <Card
          title="Sector distribution"
          sub="Where the portfolio is concentrated"
          action={<Badge tone="accent">6 sectors</Badge>}
        >
          <div className="space-y-3.5">
            {SECTOR_SPLIT.map((s) => (
              <div key={s.label} className="flex items-center gap-3">
                <span className="w-[92px] shrink-0 truncate text-[12.5px] font-medium text-slate-600">
                  {s.label}
                </span>
                <Progress value={s.share * 4} tone="accent" className="flex-1" />
                <span className="w-6 text-right text-[12px] font-semibold tabular-nums text-ink">
                  {s.count}
                </span>
                <span className="hidden min-w-[130px] text-[11.5px] text-slate-400 sm:block">
                  {s.note}
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card
          title="Stage distribution"
          sub="Where the portfolio sits on the journey"
          action={<Badge tone="accent">5 stages</Badge>}
        >
          <div className="space-y-3.5">
            {STAGE_SPLIT.map((s) => (
              <div key={s.label} className="flex items-center gap-3">
                <span className="w-[92px] shrink-0 truncate text-[12.5px] font-medium text-slate-600">
                  {s.label}
                </span>
                <Progress value={s.share * 3.5} tone="accent" className="flex-1" />
                <span className="w-6 text-right text-[12px] font-semibold tabular-nums text-ink">
                  {s.count}
                </span>
                <span className="hidden min-w-[130px] text-[11.5px] text-slate-400 sm:block">
                  {s.note}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* ── 05 · Cohort spread ───────────────────────────────── */}
      <Card
        title="Cohort spread"
        sub="How each batch is tracking"
        action={
          <Link
            href="/incubator/cohorts"
            className="flex items-center gap-1 text-[12.5px] font-semibold text-accent"
          >
            All cohorts <ArrowUpRight className="h-3 w-3" />
          </Link>
        }
        pad={false}
      >
        <ul className="divide-y divide-line">
          {COHORT_SPREAD.map((c) => (
            <li
              key={c.cohort}
              className="flex flex-wrap items-center gap-4 px-5 py-4 transition-colors hover:bg-soft"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent">
                <Users className="h-4 w-4" />
              </span>
              <div className="min-w-[150px] flex-1">
                <p className="text-[13.5px] font-semibold text-ink">{c.cohort}</p>
                <p className="mt-0.5 text-[11.5px] text-slate-400">{c.status}</p>
              </div>
              <span className="text-[12.5px] tabular-nums text-slate-500">
                <b className="font-semibold text-ink">{c.startups}</b> startups
              </span>
              <div className="flex w-[140px] items-center gap-2.5">
                <Progress
                  value={c.avgHealth}
                  tone={c.avgHealth >= 80 ? "good" : c.avgHealth >= 70 ? "accent" : "warn"}
                  className="flex-1"
                />
                <span className="w-8 text-right text-[12px] font-semibold tabular-nums text-ink">
                  {c.avgHealth}
                </span>
              </div>
              <Badge tone={c.tone}>
                {c.avgHealth >= 80 ? "Healthy" : c.avgHealth >= 70 ? "Watch" : "At risk"}
              </Badge>
            </li>
          ))}
        </ul>
      </Card>

      {/* ── 06 · Health distribution ─────────────────────────── */}
      <Card
        title="Health distribution"
        sub="142 healthy, 71 on watch, 27 needing help"
        action={
          <Link
            href="/incubator/startups/at-risk"
            className="flex items-center gap-1 text-[12.5px] font-semibold text-accent"
          >
            At-risk register <ArrowUpRight className="h-3 w-3" />
          </Link>
        }
      >
        <div className="grid gap-3 sm:grid-cols-3">
          {HEALTH_BANDS.map((b) => (
            <div
              key={b.band}
              className="rounded-xl border border-line p-4 transition-colors hover:border-accent/25"
            >
              <div className="flex items-center justify-between">
                <p className="text-[13px] font-semibold text-ink">{b.band}</p>
                <Badge tone={b.tone}>{b.range}</Badge>
              </div>
              <p className="mt-2.5 text-[28px] font-semibold leading-none tracking-[-0.03em] text-ink tabular-nums">
                {b.count}
              </p>
              <div className="mt-3">
                <Progress
                  value={(b.count / 240) * 100}
                  tone={b.tone === "good" ? "good" : b.tone === "accent" ? "accent" : "bad"}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* ── 07 · Mentor coverage ─────────────────────────────── */}
      <Card
        title="Mentor coverage"
        sub="Who is carrying the portfolio"
        action={<Badge tone="warn">2 near capacity</Badge>}
        pad={false}
      >
        <ul className="divide-y divide-line">
          {MENTOR_COVERAGE.map((m) => (
            <li
              key={m.mentor}
              className="flex flex-wrap items-center gap-4 px-5 py-4 transition-colors hover:bg-soft"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ink text-[10.5px] font-bold text-white">
                {m.initials}
              </span>
              <div className="min-w-[160px] flex-1">
                <p className="text-[13.5px] font-semibold text-ink">{m.mentor}</p>
                <p className="mt-0.5 text-[11.5px] text-slate-400">
                  {m.sectors} · {m.hours}h logged
                </p>
              </div>
              <span className="text-[12.5px] tabular-nums text-slate-500">
                <b className="font-semibold text-ink">{m.startups}</b> startups
              </span>
              <div className="flex w-[140px] items-center gap-2.5">
                <Progress
                  value={m.load}
                  tone={m.load > 75 ? "warn" : "accent"}
                  className="flex-1"
                />
                <span className="w-9 text-right text-[12px] font-semibold tabular-nums text-ink">
                  {m.load}%
                </span>
              </div>
              <Badge tone={m.tone}>
                {m.load > 75 ? "Near capacity" : m.load > 60 ? "Balanced" : "Free"}
              </Badge>
            </li>
          ))}
        </ul>
      </Card>

      {/* ── 08 · Funding readiness ───────────────────────────── */}
      <Card
        title="Funding readiness"
        sub="How many are actually ready to raise"
        action={<Badge tone="good">₹186 Cr mobilised</Badge>}
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {FUNDING_READINESS.map((f) => {
            const pct = Math.round((f.ready / f.total) * 100);
            return (
              <div
                key={f.stage}
                className="group rounded-xl border border-line p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-soft"
              >
                <div className="flex items-center justify-between">
                  <p className="text-[13px] font-semibold text-ink">{f.stage}</p>
                  <Badge tone={f.tone}>{f.raised}</Badge>
                </div>
                <p className="mt-2.5 text-[22px] font-semibold leading-none tracking-[-0.03em] text-ink tabular-nums">
                  {f.ready}
                  <span className="ml-1 text-[12px] font-normal text-slate-400">
                    / {f.total}
                  </span>
                </p>
                <div className="mt-3">
                  <Progress
                    value={pct}
                    tone={f.tone === "good" ? "good" : f.tone === "accent" ? "accent" : "warn"}
                  />
                </div>
                <p className="mt-2 text-[11.5px] text-slate-400">{pct}% ready</p>
              </div>
            );
          })}
        </div>
      </Card>

      {/* ── 09 · Where to go next ────────────────────────────── */}
      <Card title="Where to go next" sub="The three workflows behind the portfolio">
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            {
              href: "/incubator/startups/assessment",
              title: "Assess the portfolio",
              body: "Six weighted dimensions, scored quarterly with history.",
              icon: ChartNoAxesColumn,
            },
            {
              href: "/incubator/startups/at-risk",
              title: "Work the at-risk list",
              body: "Risk register, runway exposure and early-warning signals.",
              icon: Users,
            },
            {
              href: "/incubator/startups/interventions",
              title: "Run interventions",
              body: "Plans, tasks, owners and outcomes for every rescue.",
              icon: Handshake,
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
