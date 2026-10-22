"use client";

import { useState } from "react";
import {
  ArrowRight,
  BarChart3,
  Download,
  Radar,
  Target,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { Badge, Card, PageHeader, Progress, Stat } from "@/components/app/widgets";
import {
  averageOverlap,
  leadingAxes,
  marketActions,
  marketAxes,
  marketSegments,
  reports,
  sam,
  samShare,
  som,
  somShare,
  tam,
  trackedCompetitors,
  trends,
  trailingAxes,
  whitespaceScore,
} from "@/users/startup/constants/market-data";

/* The bottom of the ladder is small enough that a billion is noise. */
const size = (billions: number) =>
  billions < 1 ? `$${Math.round(billions * 1000)}M` : `$${billions.toFixed(1)}B`;

export function Market() {
  const [scope, setScope] = useState<"signals" | "reports">("signals");

  const topTrends = [...trends].sort((a, b) => b.momentum - a.momentum).slice(0, 4);
  const topReports = [...reports].sort((a, b) => b.relevance - a.relevance).slice(0, 3);

  return (
    <div className="space-y-5">
      <PageHeader
        title="Market Overview"
        desc="Your sector, sized and watched — the same signals investors use to diligence you."
        actions={
          <button className="inline-flex items-center gap-1.5 rounded-[10px] border border-line bg-white px-4 py-2.5 text-[13px] font-semibold text-ink hover:border-slate-300">
            <Download className="h-3.5 w-3.5" /> Export view
          </button>
        }
      />

      {/* 1 — Headline metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat
          icon={BarChart3}
          label="Market size"
          value={size(tam.size)}
          delta={`+${tam.growth}% YoY`}
          tone="good"
        />
        <Stat
          icon={Target}
          label="Addressable slice"
          value={size(sam.size)}
          delta={`${samShare}% of the market`}
          tone="default"
        />
        <Stat
          icon={Radar}
          label="Competitors tracked"
          value={String(trackedCompetitors)}
          delta={`${averageOverlap}% average overlap`}
          tone="warn"
        />
        <Stat
          icon={TrendingUp}
          label="Whitespace score"
          value={String(whitespaceScore)}
          delta={`${leadingAxes.length} of ${marketAxes.length} axes uncontested`}
          tone="good"
        />
      </div>

      {/* 2 — The ladder */}
      <Card title="The market, sized" action={<Badge tone="default">TAM to SOM</Badge>}>
        <div className="space-y-4">
          {marketSegments.map((s) => {
            const share = s.kind === "TAM" ? 100 : s.kind === "SAM" ? samShare : somShare;
            return (
              <div key={s.id}>
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <span className="text-[12.5px] font-medium text-slate-600">
                    <span className="mr-2 rounded-md bg-accent-soft px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] text-accent">
                      {s.kind}
                    </span>
                    {s.name}
                  </span>
                  <span className="text-[11.5px] text-slate-400">
                    <span className="font-semibold tabular-nums text-ink">{size(s.size)}</span> ·{" "}
                    <span className="font-semibold tabular-nums text-emerald-600">+{s.growth}%</span> ·{" "}
                    {share}% of TAM
                  </span>
                </div>
                <Progress value={share} className="mt-2" />
                <p className="mt-1.5 text-[11.5px] leading-snug text-slate-400">{s.note}</p>
              </div>
            );
          })}
        </div>
        <p className="mt-4 border-t border-line pt-4 text-[12px] leading-relaxed text-slate-500">
          Lumen sells into the smallest band — {size(som.size)} of the {size(tam.size)} market — which is
          why the plan is about depth in two crop belts, not share of the whole.
        </p>
      </Card>

      {/* 3 — Position */}
      <div className="grid gap-5 lg:grid-cols-2">
        <Card
          title="Where nobody matches us"
          action={<Badge tone="good">{leadingAxes.length} axes</Badge>}
          pad={false}
        >
          <ul className="divide-y divide-line">
            {leadingAxes.map((a) => (
              <li key={a.id} className="px-5 py-3.5">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[13px] font-semibold text-ink">{a.axis}</p>
                  <span className="text-[11.5px] font-semibold tabular-nums text-emerald-600">
                    {a.us} vs {a.best}
                  </span>
                </div>
                <p className="mt-0.5 text-[11.5px] leading-relaxed text-slate-400">{a.note}</p>
              </li>
            ))}
          </ul>
        </Card>

        <Card title="Where we are behind" action={<Badge tone="warn">{trailingAxes.length} axes</Badge>} pad={false}>
          <ul className="divide-y divide-line">
            {trailingAxes.map((a) => (
              <li key={a.id} className="px-5 py-3.5">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[13px] font-semibold text-ink">{a.axis}</p>
                  <span className="text-[11.5px] font-semibold tabular-nums text-amber-600">
                    {a.us} vs {a.best}
                  </span>
                </div>
                <p className="mt-0.5 text-[11.5px] leading-relaxed text-slate-400">{a.note}</p>
              </li>
            ))}
          </ul>
          <p className="border-t border-line px-5 py-3 text-[11.5px] leading-relaxed text-slate-400">
            Two axes behind is survivable. Letting them become three is how a lead turns into a price
            fight.
          </p>
        </Card>
      </div>

      {/* 4 — Signals + reports */}
      <Card
        title={scope === "signals" ? "Sector signals this month" : "Saved & recommended reports"}
        action={
          <div className="flex flex-wrap gap-1.5">
            {(["signals", "reports"] as const).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setScope(s)}
                className={`rounded-full px-2.5 py-1 text-[11px] font-semibold transition-colors ${
                  scope === s
                    ? "bg-accent text-white"
                    : "border border-line bg-white text-slate-500 hover:border-slate-300 hover:text-ink"
                }`}
              >
                {s === "signals" ? "Signals" : "Reports"}
              </button>
            ))}
          </div>
        }
        pad={false}
      >
        {scope === "signals" ? (
          <ul className="divide-y divide-line">
            {topTrends.map((t) => (
              <li key={t.id} className="px-5 py-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <p className="min-w-0 flex-1 text-[13px] font-medium leading-snug text-ink">
                    {t.title}
                  </p>
                  <span className="shrink-0 text-[12px] font-bold tabular-nums text-accent">
                    {t.momentum}
                  </span>
                </div>
                <Progress value={t.momentum} className="mt-2" />
                <p className="mt-1.5 text-[11.5px] leading-snug text-slate-400">{t.note}</p>
              </li>
            ))}
          </ul>
        ) : (
          <ul className="divide-y divide-line">
            {topReports.map((r) => (
              <li key={r.id} className="flex items-center justify-between gap-3 px-5 py-4">
                <div className="min-w-0">
                  <p className="truncate text-[13.5px] font-medium text-ink">{r.title}</p>
                  <p className="mt-0.5 text-[11px] text-slate-400">{r.meta}</p>
                </div>
                {r.unread ? (
                  <span className="h-2 w-2 shrink-0 rounded-full bg-accent" />
                ) : (
                  <Badge>{r.relevance}% relevant</Badge>
                )}
              </li>
            ))}
          </ul>
        )}
      </Card>

      {/* 5 — Actions */}
      <Card title="What this changes" action={<Badge tone="accent">{marketActions.length} actions</Badge>} pad={false}>
        <ul className="divide-y divide-line">
          {marketActions.map((a) => (
            <li key={a.id} className="flex flex-wrap items-center gap-3 px-5 py-3.5">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
                <Target className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-semibold text-ink">{a.action}</p>
                <p className="mt-0.5 text-[11.5px] text-slate-400">
                  {a.owner} · due {a.due}
                </p>
              </div>
              <Badge tone={a.impact === "High" ? "bad" : a.impact === "Medium" ? "warn" : "default"}>
                {a.impact}
              </Badge>
              <Link
                href={a.href}
                className="text-[12px] font-semibold text-accent hover:underline"
              >
                Open
              </Link>
            </li>
          ))}
        </ul>
      </Card>

      {/* 6 — Where to go next */}
      <Card title="Where to go next">
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            {
              label: "Competitor Analysis",
              href: "/founder/market/competitors",
              body: "The field you are actually fighting on, axis by axis.",
            },
            {
              label: "Reports",
              href: "/founder/market/reports",
              body: "The full library — with what each report changes.",
            },
            {
              label: "Trends",
              href: "/founder/market/trends",
              body: "Every signal we track, and the action each one demands.",
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
