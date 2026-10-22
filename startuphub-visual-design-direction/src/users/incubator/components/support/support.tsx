"use client";

import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  Briefcase,
  Lightbulb,
  Scale,
  Users,
} from "lucide-react";
import Link from "next/link";
import { Badge, Card, PageHeader, Progress, Stat } from "@/components/app/widgets";
import { cn } from "@/lib/utils";
import {
  PILLAR_COVERAGE,
  SUPPORT_INTERVENTIONS,
  SUPPORT_KPIS,
  SUPPORT_QUEUE,
  SUPPORT_TEAM,
  type SupportPillar,
} from "../../constants/support-data";

const PILLARS: (SupportPillar | "All")[] = ["All", "Funding", "IPR", "Market", "Investor"];

const PILLAR_HREF: Record<SupportPillar, string> = {
  Funding: "/incubator/support/funding",
  IPR: "/incubator/support/ipr",
  Market: "/incubator/support/market",
  Investor: "/incubator/support/investors",
};

const PILLAR_ICON = {
  Funding: Briefcase,
  IPR: Scale,
  Market: Lightbulb,
  Investor: Users,
} as const;

export function Support() {
  const [pillar, setPillar] = useState<SupportPillar | "All">("All");

  const queue = useMemo(
    () =>
      pillar === "All"
        ? SUPPORT_QUEUE
        : SUPPORT_QUEUE.filter((q) => q.pillar === pillar),
    [pillar],
  );

  const urgent = SUPPORT_QUEUE.filter((q) => q.urgency === "Urgent").length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Startup Support"
        desc="Funding, IPR, market and investor support — where you intervene and where you connect."
        actions={
          <Link
            href="/incubator/support/funding"
            className="inline-flex items-center gap-1.5 rounded-[10px] bg-accent px-4 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-accent-deep"
          >
            <Briefcase className="h-3.5 w-3.5" /> Open a support request
          </Link>
        }
      />

      {/* ── 01 · KPIs ────────────────────────────────────────── */}
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        {SUPPORT_KPIS.map((k) => (
          <Stat
            key={k.label}
            icon={
              k.tone === "good"
                ? Scale
                : k.tone === "warn"
                  ? Users
                  : Briefcase
            }
            label={k.label}
            value={k.value}
            delta={k.note}
            tone={k.tone === "accent" ? "good" : k.tone}
          />
        ))}
      </div>

      {/* ── 02 · Pillars ─────────────────────────────────────── */}
      <Card
        title="Support pillars"
        sub="The four ways the programme helps a startup"
        action={<Badge tone="accent">{PILLAR_COVERAGE.length} pillars</Badge>}
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {PILLAR_COVERAGE.map((p) => {
            const Icon = PILLAR_ICON[p.pillar];
            return (
              <Link
                key={p.pillar}
                href={PILLAR_HREF[p.pillar]}
                className="group rounded-xl border border-line p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-soft"
              >
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-accent-soft text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                  <Icon className="h-4 w-4" />
                </span>
                <div className="mt-3 flex items-center justify-between">
                  <p className="text-[13.5px] font-semibold text-ink">{p.pillar}</p>
                  <span className="text-[12px] font-semibold tabular-nums text-slate-500">
                    {p.delivered}/{p.sessions}
                  </span>
                </div>
                <p className="mt-1.5 text-[11.5px] leading-relaxed text-slate-500">
                  {p.note}
                </p>
                <div className="mt-3">
                  <Progress
                    value={Math.round((p.delivered / p.sessions) * 100)}
                    tone={p.tone === "good" ? "good" : p.tone === "warn" ? "warn" : "accent"}
                  />
                </div>
                <p className="mt-2 text-[11px] text-slate-400">
                  {p.startups} startups in the queue
                </p>
              </Link>
            );
          })}
        </div>
      </Card>

      {/* ── 03 · Filter ──────────────────────────────────────── */}
      <div className="flex flex-wrap gap-2">
        {PILLARS.map((p) => (
          <button
            key={p}
            onClick={() => setPillar(p)}
            className={cn(
              "rounded-[10px] border px-3.5 py-2 text-[12.5px] font-medium transition-colors",
              pillar === p
                ? "border-ink bg-ink text-white"
                : "border-line bg-white text-slate-500 hover:border-slate-300 hover:text-ink",
            )}
          >
            {p}
            <span className="ml-1.5 text-[11px] opacity-60">
              {p === "All"
                ? SUPPORT_QUEUE.length
                : SUPPORT_QUEUE.filter((q) => q.pillar === p).length}
            </span>
          </button>
        ))}
      </div>

      {/* ── 04 · Support queue ───────────────────────────────── */}
      <Card
        title={`Support queue · ${queue.length}`}
        sub="What startups are waiting on, and who owns it"
        action={<Badge tone="warn">{urgent} urgent</Badge>}
        pad={false}
      >
        {queue.length === 0 ? (
          <div className="flex flex-col items-center gap-2 px-5 py-14 text-center">
            <Briefcase className="h-6 w-6 text-slate-300" />
            <p className="text-[13px] text-slate-400">Nothing open on this pillar.</p>
          </div>
        ) : (
          <ul className="divide-y divide-line">
            {queue.map((q) => (
              <li
                key={q.id}
                className="flex flex-col gap-3 px-5 py-4 transition-colors hover:bg-soft lg:flex-row lg:items-center lg:gap-4"
              >
                <span
                  className={cn(
                    "grid h-9 w-9 shrink-0 place-items-center rounded-lg",
                    q.tone === "bad"
                      ? "bg-red-50 text-red-600"
                      : q.tone === "warn"
                        ? "bg-amber-tint text-amber-dim"
                        : q.tone === "good"
                          ? "bg-rise-tint text-rise"
                          : "bg-accent-soft text-accent",
                  )}
                >
                  <Briefcase className="h-4 w-4" />
                </span>
                <div className="min-w-[210px] flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-[13.5px] font-semibold text-ink">{q.need}</p>
                    <Badge tone={q.tone}>{q.urgency}</Badge>
                  </div>
                  <p className="mt-0.5 text-[11.5px] text-slate-400">
                    {q.startup} · {q.pillar} · {q.owner} · due in {q.due}
                  </p>
                </div>
                <span className="hidden min-w-[230px] text-[12px] text-slate-500 lg:block">
                  {q.note}
                </span>
                <Link
                  href={PILLAR_HREF[q.pillar]}
                  className="flex shrink-0 items-center gap-1 text-[12.5px] font-semibold text-accent"
                >
                  Open <ArrowUpRight className="h-3 w-3" />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Card>

      {/* ── 05 · Support team capacity ───────────────────────── */}
      <Card
        title="Support team capacity"
        sub="Who carries which pillar, and how much headroom is left"
        action={<Badge tone="warn">1 person near capacity</Badge>}
        pad={false}
      >
        <ul className="divide-y divide-line">
          {SUPPORT_TEAM.map((t) => (
            <li
              key={t.name}
              className="flex flex-wrap items-center gap-4 px-5 py-4 transition-colors hover:bg-soft"
            >
              <span
                className={cn(
                  "grid h-9 w-9 shrink-0 place-items-center rounded-lg text-[11px] font-bold",
                  t.tone === "bad"
                    ? "bg-red-50 text-red-600"
                    : t.tone === "warn"
                      ? "bg-amber-tint text-amber-dim"
                      : "bg-accent-soft text-accent",
                )}
              >
                {t.initials}
              </span>
              <div className="min-w-[170px] flex-1">
                <p className="text-[13.5px] font-semibold text-ink">{t.name}</p>
                <p className="mt-0.5 text-[11.5px] text-slate-400">
                  {t.role} · {t.pillars.join(", ")}
                </p>
              </div>
              <span className="hidden min-w-[190px] text-[12px] text-slate-500 lg:block">
                {t.note}
              </span>
              <div className="w-32 shrink-0">
                <Progress
                  value={t.load}
                  tone={t.tone === "bad" ? "bad" : t.tone === "warn" ? "warn" : "good"}
                />
              </div>
              <span className="w-12 text-right text-[12px] font-semibold tabular-nums text-ink">
                {t.load}%
              </span>
            </li>
          ))}
        </ul>
      </Card>

      {/* ── 06 · Interventions ───────────────────────────────── */}
      <Card
        title="Recent interventions"
        sub="What the programme actually did, and what it moved"
        action={<Badge tone="accent">{SUPPORT_INTERVENTIONS.length} this quarter</Badge>}
        pad={false}
      >
        <ul className="divide-y divide-line">
          {SUPPORT_INTERVENTIONS.map((s) => (
            <li
              key={s.id}
              className="flex flex-wrap items-center gap-4 px-5 py-4 transition-colors hover:bg-soft"
            >
              <span
                className={cn(
                  "grid h-9 w-9 shrink-0 place-items-center rounded-lg",
                  s.tone === "good"
                    ? "bg-rise-tint text-rise"
                    : s.tone === "warn"
                      ? "bg-amber-tint text-amber-dim"
                      : "bg-accent-soft text-accent",
                )}
              >
                {s.pillar === "IPR" ? (
                  <Scale className="h-4 w-4" />
                ) : s.pillar === "Market" ? (
                  <Lightbulb className="h-4 w-4" />
                ) : s.pillar === "Investor" ? (
                  <Users className="h-4 w-4" />
                ) : (
                  <Briefcase className="h-4 w-4" />
                )}
              </span>
              <div className="min-w-[220px] flex-1">
                <p className="text-[13.5px] font-semibold text-ink">{s.action}</p>
                <p className="mt-0.5 text-[11.5px] text-slate-400">
                  {s.startup} · {s.pillar} · {s.note}
                </p>
              </div>
              <Badge tone={s.tone}>{s.impact}</Badge>
              <span className="w-24 shrink-0 text-right text-[11.5px] text-slate-400">
                {s.status}
              </span>
            </li>
          ))}
        </ul>
      </Card>

      {/* ── 07 · Where to go next ────────────────────────────── */}
      <Card title="Where to go next" sub="Open a pillar directly">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {PILLAR_COVERAGE.map((p) => {
            const Icon = PILLAR_ICON[p.pillar];
            return (
              <Link
                key={p.pillar}
                href={PILLAR_HREF[p.pillar]}
                className="group rounded-xl border border-line p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-soft"
              >
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-accent-soft text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                  <Icon className="h-4 w-4" />
                </span>
                <p className="mt-3 text-[13.5px] font-semibold text-ink">{p.pillar} support</p>
                <p className="mt-1.5 text-[12.5px] leading-relaxed text-slate-500">
                  {p.note}
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-[12px] font-semibold text-accent">
                  Open <ArrowUpRight className="h-3 w-3" />
                </span>
              </Link>
            );
          })}
        </div>
      </Card>

      {/* ── 08 · Copilot insight ─────────────────────────────── */}
      <Card
        title="Copilot insight"
        sub="Where the support load is heading"
        action={
          <span className="flex items-center gap-1.5 text-[12px] font-semibold text-accent">
            <Lightbulb className="h-3.5 w-3.5" /> Live
          </span>
        }
      >
        <div className="rounded-xl bg-accent-mist p-5 text-[13.5px] leading-relaxed text-slate-600">
          <span className="font-semibold text-ink">
            Nandita Bose is at 92% load with four pro bono slots a month
          </span>{" "}
          — and all four are booked. Renewing the counsel line before 31 May or
          converting two filings to self-service will take the IPR queue down by
          a third.
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            href="/incubator/support/ipr"
            className="inline-flex items-center gap-1.5 rounded-[10px] bg-accent px-4 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-accent-deep"
          >
            See the IPR queue
          </Link>
          <Link
            href="/incubator/resources/allocation"
            className="inline-flex items-center gap-1.5 rounded-[10px] border border-line bg-white px-4 py-2.5 text-[13px] font-semibold text-ink transition-colors hover:bg-soft"
          >
            Counsel capacity
          </Link>
        </div>
      </Card>
    </div>
  );
}
