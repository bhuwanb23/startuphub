"use client";

import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  ChartNoAxesColumn,
  Clock3,
  Gauge,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { Badge, Card, PageHeader, Progress } from "@/components/app/widgets";
import { cn } from "@/lib/utils";
import {
  INVENTORY,
  PROVIDER_EFFICIENCY,
  STARTUP_ALLOCATIONS,
  UNDERUSED_ASSETS,
  UTILISATION_TREND,
} from "../../constants/resources-data";

const RANGES = ["6 months", "3 months", "This month"] as const;

export function ResourceUtilization() {
  const [range, setRange] = useState<(typeof RANGES)[number]>("6 months");

  const months = useMemo(() => {
    if (range === "6 months") return UTILISATION_TREND;
    if (range === "3 months") return UTILISATION_TREND.slice(-3);
    return UTILISATION_TREND.slice(-1);
  }, [range]);

  const avgPool = Math.round(
    months.reduce((s, m) => s + m.pool, 0) / months.length,
  );
  const avgLab = Math.round(
    months.reduce((s, m) => s + m.lab, 0) / months.length,
  );
  const avgWorkspace = Math.round(
    months.reduce((s, m) => s + m.workspace, 0) / months.length,
  );
  const overall = Math.round((avgPool + avgLab + avgWorkspace) / 3);
  const idleValue = UNDERUSED_ASSETS.reduce((s, a) => s + a.used, 0);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Resource Utilization"
        desc="Usage analytics across the pool, the startups drawing on it and the providers behind it."
        actions={
          <Link
            href="/incubator/resources"
            className="inline-flex items-center gap-1.5 rounded-[10px] border border-line bg-white px-4 py-2.5 text-[13px] font-semibold text-ink transition-colors hover:bg-soft"
          >
            Resource inventory
          </Link>
        }
      />

      {/* ── 01 · Range filter ────────────────────────────────── */}
      <div className="flex flex-wrap gap-2">
        {RANGES.map((r) => (
          <button
            key={r}
            onClick={() => setRange(r)}
            className={cn(
              "rounded-[10px] border px-3.5 py-2 text-[12.5px] font-medium transition-colors",
              range === r
                ? "border-ink bg-ink text-white"
                : "border-line bg-white text-slate-500 hover:border-slate-300 hover:text-ink",
            )}
          >
            {r}
          </button>
        ))}
      </div>

      {/* ── 02 · Utilisation KPIs ────────────────────────────── */}
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        {[
          { label: "Overall utilisation", value: `${overall}%`, note: "across the whole pool", tone: "accent" as const },
          { label: "Compute & cloud", value: `${avgPool}%`, note: "up 14 pts since Nov", tone: "warn" as const },
          { label: "Lab & hardware", value: `${avgLab}%`, note: "the biggest idle asset", tone: "bad" as const },
          { label: "Workspace", value: `${avgWorkspace}%`, note: "near capacity", tone: "warn" as const },
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

      {/* ── 03 · Utilisation trend ───────────────────────────── */}
      <Card
        title="Utilisation trend"
        sub="By pool, month by month"
        action={
          <span className="flex items-center gap-1.5 text-[12px] font-semibold text-slate-400">
            <TrendingUp className="h-3.5 w-3.5" /> {months.length} months
          </span>
        }
      >
        <div className="space-y-4">
          {months.map((m) => (
            <div key={m.month} className="flex items-center gap-4">
              <span className="w-10 shrink-0 font-mono text-[11px] text-slate-400">
                {m.month}
              </span>
              <div className="flex-1 space-y-1.5">
                <Progress value={m.pool} tone="accent" />
                <Progress value={m.lab} tone="warn" />
                <Progress value={m.workspace} tone="good" />
              </div>
              <div className="w-14 shrink-0 text-right font-mono text-[10.5px] leading-[1.6]">
                <div className="text-accent">{m.pool}%</div>
                <div className="text-amber-dim">{m.lab}%</div>
                <div className="text-rise">{m.workspace}%</div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-4 border-t border-line pt-3.5">
          {[
            { c: "bg-accent", l: "Compute & cloud credits" },
            { c: "bg-amber-dim", l: "Lab & hardware" },
            { c: "bg-rise", l: "Workspace" },
          ].map((x) => (
            <span
              key={x.l}
              className="flex items-center gap-1.5 text-[11.5px] text-slate-500"
            >
              <span className={cn("h-2 w-2 rounded-full", x.c)} /> {x.l}
            </span>
          ))}
        </div>
      </Card>

      {/* ── 04 · Utilisation by resource ─────────────────────── */}
      <Card
        title="Utilisation by resource"
        sub="Every asset against its own capacity"
        action={<Badge tone="accent">{INVENTORY.length} assets</Badge>}
        pad={false}
      >
        <ul className="divide-y divide-line">
          {INVENTORY.map((r) => (
            <li
              key={r.id}
              className="flex flex-wrap items-center gap-4 px-5 py-4 transition-colors hover:bg-soft"
            >
              <div className="min-w-[190px] flex-1">
                <p className="text-[13.5px] font-semibold text-ink">{r.name}</p>
                <p className="mt-0.5 text-[11.5px] text-slate-400">
                  {r.category} · {r.capacity} · {r.unit}
                </p>
              </div>
              <div className="w-40 shrink-0">
                <Progress
                  value={r.used}
                  tone={r.tone === "warn" ? "warn" : "accent"}
                />
              </div>
              <span className="w-12 shrink-0 text-right text-[12.5px] font-semibold tabular-nums text-ink">
                {r.used}%
              </span>
              <Badge tone={r.tone}>
                {r.used > 80 ? "Oversubscribed" : r.used < 50 ? "Underused" : "On plan"}
              </Badge>
            </li>
          ))}
        </ul>
      </Card>

      {/* ── 05 · Cost per startup ────────────────────────────── */}
      <Card
        title="Cost per startup"
        sub="What the pool actually costs each venture drawing on it"
        action={
          <Badge tone="accent">
            ₹{STARTUP_ALLOCATIONS.reduce((s, a) => s + a.value, 0).toFixed(1)} L
          </Badge>
        }
        pad={false}
      >
        <ul className="divide-y divide-line">
          {STARTUP_ALLOCATIONS.map((a) => (
            <li
              key={a.startupSlug}
              className="flex flex-wrap items-center gap-4 px-5 py-4 transition-colors hover:bg-soft"
            >
              <span
                className={cn(
                  "grid h-9 w-9 shrink-0 place-items-center rounded-lg text-[11px] font-bold",
                  a.tone === "good"
                    ? "bg-rise-tint text-rise"
                    : a.tone === "accent"
                      ? "bg-accent-soft text-accent"
                      : a.tone === "warn"
                        ? "bg-amber-tint text-amber-dim"
                        : "bg-soft text-slate-500",
                )}
              >
                {a.startup
                  .split(" ")
                  .map((w) => w[0])
                  .join("")
                  .slice(0, 2)}
              </span>
              <div className="min-w-[150px] flex-1">
                <p className="text-[13.5px] font-semibold text-ink">{a.startup}</p>
                <p className="mt-0.5 text-[11.5px] text-slate-400">{a.resource}</p>
              </div>
              <span className="w-20 shrink-0 text-right text-[13px] font-semibold tabular-nums text-ink">
                ₹{a.value.toFixed(1)} L
              </span>
              <div className="w-24 shrink-0">
                <Progress value={a.share} tone="accent" />
              </div>
              <span className="w-10 text-right text-[12px] font-semibold tabular-nums text-slate-500">
                {a.share}%
              </span>
            </li>
          ))}
        </ul>
      </Card>

      {/* ── 06 · Provider efficiency ─────────────────────────── */}
      <Card
        title="Provider efficiency"
        sub="Who is supplying value, and who is supplying idle capacity"
        action={<Badge tone="bad">2 under 50%</Badge>}
        pad={false}
      >
        <ul className="divide-y divide-line">
          {PROVIDER_EFFICIENCY.map((p) => (
            <li
              key={p.provider}
              className="flex flex-wrap items-center gap-4 px-5 py-4 transition-colors hover:bg-soft"
            >
              <span className="min-w-[170px] flex-1">
                <span className="block text-[13.5px] font-semibold text-ink">
                  {p.provider}
                </span>
                <span className="block text-[11.5px] text-slate-400">{p.note}</span>
              </span>
              <span className="w-16 shrink-0 text-right text-[12px] tabular-nums text-slate-500">
                <b className="font-semibold text-ink">{p.supplied}</b> items
              </span>
              <div className="w-28 shrink-0">
                <Progress
                  value={p.utilisation}
                  tone={
                    p.tone === "good"
                      ? "good"
                      : p.tone === "bad"
                        ? "bad"
                        : p.tone === "warn"
                          ? "warn"
                          : "accent"
                  }
                />
              </div>
              <span className="w-12 text-right text-[12.5px] font-semibold tabular-nums text-ink">
                {p.utilisation}%
              </span>
            </li>
          ))}
        </ul>
      </Card>

      {/* ── 07 · Underused assets ───────────────────────────── */}
      <Card
        title="Underused assets"
        sub="What is sitting idle, and what to do about it"
        action={<Badge tone="bad">{UNDERUSED_ASSETS.length} under 70%</Badge>}
        pad={false}
      >
        <ul className="divide-y divide-line">
          {UNDERUSED_ASSETS.map((a) => (
            <li
              key={a.resource}
              className="flex flex-col gap-3 px-5 py-4 transition-colors hover:bg-soft"
            >
              <div className="flex flex-wrap items-center gap-4">
                <span
                  className={cn(
                    "grid h-9 w-9 shrink-0 place-items-center rounded-lg",
                    a.tone === "bad"
                      ? "bg-red-50 text-red-600"
                      : a.tone === "warn"
                        ? "bg-amber-tint text-amber-dim"
                        : "bg-soft text-slate-400",
                  )}
                >
                  <Gauge className="h-4 w-4" />
                </span>
                <div className="min-w-[190px] flex-1">
                  <p className="text-[13.5px] font-semibold text-ink">{a.resource}</p>
                  <p className="mt-0.5 text-[11.5px] text-slate-400">
                    {a.idle} idle
                  </p>
                </div>
                <div className="w-28 shrink-0">
                  <Progress
                    value={a.used}
                    tone={a.tone === "bad" ? "bad" : a.tone === "warn" ? "warn" : "accent"}
                  />
                </div>
                <span className="w-12 text-right text-[12.5px] font-semibold tabular-nums text-ink">
                  {a.used}%
                </span>
              </div>
              <p className="pl-13 text-[12px] leading-relaxed text-slate-500">
                {a.recommendation}
              </p>
            </li>
          ))}
        </ul>
        <p className="border-t border-line px-5 py-3.5 text-[11.5px] text-slate-400">
          Idle capacity across the pool averages {Math.round(idleValue / UNDERUSED_ASSETS.length)}%
          of each asset — moving quotas between providers costs nothing.
        </p>
      </Card>

      {/* ── 08 · Where to go next ────────────────────────────── */}
      <Card title="Where to go next" sub="From the numbers to the actions">
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            {
              href: "/incubator/resources/allocation",
              title: "Allocation ledger",
              body: "Move capacity where it is actually needed.",
              icon: ChartNoAxesColumn,
            },
            {
              href: "/incubator/resources/requests",
              title: "Request queue",
              body: "Two requests are still waiting on an approval.",
              icon: Clock3,
            },
            {
              href: "/incubator/resources",
              title: "Back to inventory",
              body: "The pool these numbers describe.",
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
