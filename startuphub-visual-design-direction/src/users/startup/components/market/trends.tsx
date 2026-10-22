"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Bell, Flame, LineChart, Radar } from "lucide-react";
import Link from "next/link";
import { Badge, Card, PageHeader, Progress, Stat } from "@/components/app/widgets";
import {
  averageMomentum,
  highImpactTrends,
  leadingAxes,
  marketAxes,
  trends,
  type Impact,
  type Trend,
} from "@/users/startup/constants/market-data";

type Filter = Impact | "All signals";

const filters: Filter[] = ["All signals", "High", "Medium", "Low"];

const impactTone: Record<Impact, "bad" | "warn" | "default"> = {
  High: "bad",
  Medium: "warn",
  Low: "default",
};

const axisName = (id?: string) => marketAxes.find((a) => a.id === id)?.axis;

export function Trends() {
  const [filter, setFilter] = useState<Filter>("All signals");

  const results = useMemo(
    () =>
      (filter === "All signals" ? trends : trends.filter((t) => t.impact === filter))
        .slice()
        .sort((a, b) => b.momentum - a.momentum),
    [filter],
  );

  /* The trends that touch an axis we already lead on. */
  const defending = trends.filter((t) => t.axisId && leadingAxes.some((a) => a.id === t.axisId));
  const newThisMonth = trends.filter((t) => t.since.startsWith("Mar 2026"));

  return (
    <div className="space-y-5">
      <PageHeader
        title="Trends"
        desc="Every signal we track, with the action each one demands — a trend nobody acts on is just weather."
        actions={
          <Link
            href="/founder/market"
            className="inline-flex items-center gap-1.5 rounded-[10px] border border-line bg-white px-4 py-2.5 text-[13px] font-semibold text-ink hover:border-slate-300"
          >
            Market overview
          </Link>
        }
      />

      {/* 1 — Headline metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat
          icon={Radar}
          label="Signals tracked"
          value={String(trends.length)}
          delta={`${highImpactTrends.length} high impact`}
          tone="default"
        />
        <Stat
          icon={Flame}
          label="Average momentum"
          value={String(averageMomentum)}
          delta="across every signal"
          tone="warn"
        />
        <Stat
          icon={Bell}
          label="New this month"
          value={String(newThisMonth.length)}
          delta="since March 2026"
          tone="default"
        />
        <Stat
          icon={LineChart}
          label="Trends on our axes"
          value={String(defending.length)}
          delta="touch a competitive axis"
          tone="good"
        />
      </div>

      {/* 2 — Filter */}
      <Card title="Filter by impact" action={<span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">{results.length} shown</span>}>
        <div className="flex flex-wrap items-center gap-2">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`rounded-full px-3 py-1.5 text-[12px] font-semibold transition-colors ${
                filter === f
                  ? "bg-accent text-white"
                  : "border border-line bg-white text-slate-500 hover:border-slate-300 hover:text-ink"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </Card>

      {/* 3 — The signals */}
      <div className="grid gap-4 lg:grid-cols-2">
        {results.map((t) => (
          <Card key={t.id} className="flex flex-col">
            <div className="flex items-start justify-between gap-3">
              <p className="text-[14px] font-semibold leading-snug text-ink">{t.title}</p>
              <Badge tone={impactTone[t.impact]}>{t.impact}</Badge>
            </div>

            <div className="mt-3">
              <div className="flex items-baseline justify-between text-[11.5px]">
                <span className="text-slate-400">Momentum</span>
                <span className="font-semibold tabular-nums text-ink">{t.momentum}</span>
              </div>
              <Progress
                value={t.momentum}
                tone={t.momentum >= 70 ? "bad" : t.momentum >= 45 ? "warn" : "accent"}
                className="mt-1.5"
              />
            </div>

            <p className="mt-3 text-[12.5px] leading-relaxed text-slate-500">{t.note}</p>

            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-slate-400">
              <span>Since {t.since}</span>
              <span>{t.window}</span>
              <span>{t.source}</span>
            </div>

            <div className="mt-4 rounded-xl bg-accent-mist p-3.5">
              <p className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                What we do about it
              </p>
              <p className="mt-1 text-[12.5px] leading-relaxed text-slate-600">{t.action}</p>
              {t.axisId && (
                <p className="mt-2 text-[11.5px] text-slate-400">
                  Touches: <span className="font-semibold text-ink">{axisName(t.axisId)}</span>
                </p>
              )}
            </div>
          </Card>
        ))}
      </div>

      {results.length === 0 && (
        <Card className="border-dashed">
          <p className="py-12 text-center text-[13px] text-slate-400">
            No signals at that impact level right now.
          </p>
        </Card>
      )}

      {/* 4 — Where to go next */}
      <Card title="Where to go next">
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            {
              label: "Market Overview",
              href: "/founder/market",
              body: "The market these signals are moving, sized and watched.",
            },
            {
              label: "Competitor Analysis",
              href: "/founder/market/competitors",
              body: "Who each trend hits first.",
            },
            {
              label: "Product Roadmap",
              href: "/founder/product/roadmap",
              body: "Where the trend-driven actions land in the build plan.",
            },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group rounded-xl border border-line p-4 transition-colors hover:border-accent"
            >
              <p className="flex items-center gap-1.5 text-[13px] font-semibold text-ink">
                {link.label}
                <ArrowRight className="h-3.5 w-3.5 text-accent transition-transform group-hover:translate-x-0.5" />
              </p>
              <p className="mt-1 text-[12px] leading-relaxed text-slate-500">{link.body}</p>
            </Link>
          ))}
        </div>
      </Card>
    </div>
  );
}
