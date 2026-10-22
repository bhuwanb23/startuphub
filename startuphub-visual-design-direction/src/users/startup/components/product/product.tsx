"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  Gauge,
  Package,
  TrendingUp,
  Users,
} from "lucide-react";
import Link from "next/link";
import { Badge, Card, GaugeRing, PageHeader, Progress, Stat } from "@/components/app/widgets";
import {
  adoptionTrend,
  currentMvp,
  feedback,
  inFlightCount,
  mvpFeatures,
  npsBreakdown,
  pilotRollout,
  productNps,
  releaseChecklist,
  releaseReadiness,
  shippedCount,
  type FeatureState,
} from "@/users/startup/constants/product-data";

type Filter = FeatureState | "All features" | "In flight";

const filters: Filter[] = ["All features", "Shipped", "In QA", "In dev", "Backlog", "In flight"];

const sentimentTone = {
  Promoter: "good",
  Passive: "default",
  Detractor: "bad",
} as const;

export function Product() {
  const [filter, setFilter] = useState<Filter>("All features");

  const features = useMemo(
    () =>
      mvpFeatures.filter((f) => {
        if (filter === "All features") return true;
        if (filter === "In flight") return f.state === "In QA" || f.state === "In dev";
        return f.state === filter;
      }),
    [filter],
  );

  const done = releaseChecklist.filter((c) => c.done).length;

  return (
    <div className="space-y-5">
      <PageHeader
        title="MVP Management"
        desc="The release in flight — what is shipped, what is still open, and how the field is actually using it."
        actions={
          <Link
            href="/founder/product/roadmap"
            className="inline-flex items-center gap-1.5 rounded-[10px] border border-line bg-white px-4 py-2.5 text-[13px] font-semibold text-ink hover:border-slate-300"
          >
            Open the roadmap
          </Link>
        }
      />

      {/* 1 — Headline metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat
          icon={Gauge}
          label="Release readiness"
          value={`${releaseReadiness}%`}
          delta={`${currentMvp.daysToRelease} days to release`}
          tone={releaseReadiness >= 80 ? "good" : "warn"}
        />
        <Stat
          icon={Users}
          label="Weekly active users"
          value={String(currentMvp.weeklyActiveUsers)}
          delta={`+${adoptionTrend}% week on week`}
          tone="good"
        />
        <Stat
          icon={TrendingUp}
          label="Product NPS"
          value={String(productNps)}
          delta={`${npsBreakdown.promoters} promoters`}
          tone={productNps >= 40 ? "good" : "warn"}
        />
        <Stat
          icon={CheckCircle2}
          label="Weekly retention"
          value={`${currentMvp.weeklyRetention}%`}
          delta={`${currentMvp.activeFpos} active FPOs`}
          tone="default"
        />
      </div>

      {/* 2 — Release + readiness */}
      <div className="grid gap-5 lg:grid-cols-[1.35fr_1fr]">
        <Card
          title={`${currentMvp.code} · ${currentMvp.version}`}
          action={
            <Badge tone="accent">
              {shippedCount} shipped · {inFlightCount} in flight
            </Badge>
          }
        >
          <div className="mb-4 flex flex-wrap gap-2">
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

          <ul className="space-y-4">
            {features.map((f) => (
              <li key={f.id}>
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p
                      className={`text-[13.5px] font-semibold ${
                        f.state === "Backlog" ? "text-slate-400" : "text-ink"
                      }`}
                    >
                      {f.name}
                    </p>
                    <p className="mt-0.5 text-[11.5px] text-slate-400">
                      {f.owner} · {f.effort} · {f.requests} customer requests
                    </p>
                  </div>
                  <Badge tone={f.state === "Shipped" ? "good" : f.state === "Backlog" ? "default" : "accent"}>
                    {f.state}
                  </Badge>
                </div>
                <Progress
                  value={f.pct}
                  tone={f.state === "Shipped" ? "good" : f.state === "Backlog" ? "warn" : "accent"}
                  className="mt-2"
                />
                <p className="mt-1.5 text-[11.5px] leading-snug text-slate-400">{f.note}</p>
              </li>
            ))}
          </ul>

          {features.length === 0 && (
            <p className="py-8 text-center text-[13px] text-slate-400">
              Nothing in that state right now.
            </p>
          )}
        </Card>

        <div className="space-y-5">
          <Card title="Release readiness" action={<Badge tone={releaseReadiness >= 80 ? "good" : "warn"}>{done} of {releaseChecklist.length} done</Badge>}>
            <div className="flex items-center gap-5">
              <GaugeRing value={releaseReadiness} size={96} label="ready" />
              <div className="min-w-0">
                <p className="text-[13px] font-semibold text-ink">
                  {currentMvp.code} ships {currentMvp.releaseDate}
                </p>
                <p className="mt-1 text-[11.5px] leading-relaxed text-slate-500">
                  {currentMvp.daysToRelease} days out, into {currentMvp.pilot.toLowerCase()}. The open items
                  are scoped behind flags, so the release date holds either way.
                </p>
              </div>
            </div>
            <ul className="mt-4 space-y-2 border-t border-line pt-4">
              {releaseChecklist.map((c) => (
                <li key={c.id} className="flex items-start gap-2.5">
                  <span
                    className={`mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full text-[9px] font-bold ${
                      c.done ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                    }`}
                  >
                    {c.done ? "✓" : "!"}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className={`text-[12.5px] ${c.done ? "text-slate-500" : "font-medium text-ink"}`}>
                      {c.item}
                    </p>
                    {!c.done && <p className="text-[11px] text-slate-400">{c.owner}</p>}
                  </div>
                </li>
              ))}
            </ul>
          </Card>

          <Card title="The pilot it ships into" action={<Badge tone="accent">{pilotRollout.status}</Badge>}>
            <p className="text-[13px] font-semibold text-ink">{pilotRollout.name}</p>
            <p className="mt-1 text-[11.5px] leading-relaxed text-slate-500">
              {pilotRollout.fpos} FPOs across {pilotRollout.villages} villages, on {pilotRollout.plots.toLocaleString("en-US")}{" "}
              plots since {pilotRollout.startDate}. Owner: {pilotRollout.owner}.
            </p>
            <div className="mt-4 space-y-2.5">
              {[
                { label: "FPOs live", value: pilotRollout.fpos, max: currentMvp.activeFpos },
                { label: "Plots monitored", value: pilotRollout.plots, max: currentMvp.plotsMonitored },
              ].map((row) => (
                <div key={row.label}>
                  <div className="flex items-baseline justify-between text-[11.5px]">
                    <span className="text-slate-500">{row.label}</span>
                    <span className="font-semibold tabular-nums text-ink">
                      {row.value.toLocaleString("en-US")} of {row.max.toLocaleString("en-US")}
                    </span>
                  </div>
                  <Progress value={(row.value / row.max) * 100} className="mt-1.5" />
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* 3 — Adoption */}
      <Card title="How the field is using it" action={<Badge tone="good">+{adoptionTrend}% this week</Badge>}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Weekly active users", value: currentMvp.weeklyActiveUsers, note: `from ${currentMvp.weeklyActiveUsersPrev} last week` },
            { label: "Plots monitored", value: currentMvp.plotsMonitored, note: "across 18 FPOs" },
            { label: "Alerts delivered", value: currentMvp.alertsDelivered, note: "last 30 days" },
            { label: "Weekly retention", value: currentMvp.weeklyRetention, note: "came back the next week", pct: currentMvp.weeklyRetention },
          ].map((m) => (
            <div key={m.label} className="rounded-xl bg-slate-50 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                {m.label}
              </p>
              <p className="mt-2 text-[24px] font-semibold leading-none tabular-nums text-ink">
                {typeof m.value === "number" ? m.value.toLocaleString("en-US") : m.value}
                {m.label === "Weekly retention" ? "%" : ""}
              </p>
              <p className="mt-1.5 text-[12px] leading-relaxed text-slate-500">{m.note}</p>
              {m.pct !== undefined && <Progress value={m.pct} tone="good" className="mt-2" />}
            </div>
          ))}
        </div>
      </Card>

      {/* 4 — Feedback */}
      <Card title="Latest field feedback" action={<Badge tone="default">{feedback.length} of {npsBreakdown.responses} responses</Badge>}>
        <div className="grid gap-4 md:grid-cols-2">
          {feedback.map((f) => (
            <figure key={f.id} className="rounded-xl bg-slate-50 p-4">
              <div className="flex items-start justify-between gap-3">
                <blockquote className="text-[13px] font-medium leading-relaxed text-ink">
                  {f.quote}
                </blockquote>
                <Badge tone={sentimentTone[f.sentiment]}>{f.sentiment}</Badge>
              </div>
              <figcaption className="mt-2 text-[11px] text-slate-400">
                {f.by} · {f.role} · {f.since}
              </figcaption>
            </figure>
          ))}
        </div>
      </Card>

      {/* 5 — Where to go next */}
      <Card title="Where to go next">
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            {
              label: "Product Roadmap",
              href: "/founder/product/roadmap",
              body: "Now, Next and Later — with the confidence behind every slot.",
            },
            {
              label: "Product Validation",
              href: "/founder/product/validation",
              body: "What was actually tested, what settled, and what is still open.",
            },
            {
              label: "Funding",
              href: "/founder/funding",
              body: "The release timeline the investor data room is built around.",
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

      <p className="flex items-center gap-2 px-1 text-[11.5px] text-slate-400">
        <CalendarClock className="h-3.5 w-3.5" />
        Build cut is {currentMvp.releaseDate} minus 48 hours — anything not on the checklist by then ships
        behind a flag.
      </p>
    </div>
  );
}
