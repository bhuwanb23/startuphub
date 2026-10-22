"use client";

import { useState } from "react";
import { ArrowRight, CalendarDays, LayoutGrid, Sparkles, Target } from "lucide-react";
import Link from "next/link";
import { Badge, Card, PageHeader, Progress, Stat } from "@/components/app/widgets";
import {
  featureName,
  laneItems,
  roadmapConfidence,
  roadmapItems,
  roadmapLanes,
  type RoadmapState,
} from "@/users/startup/constants/product-data";

const stateTone: Record<RoadmapState, "good" | "accent" | "warn" | "default"> = {
  ship: "good",
  dev: "accent",
  qa: "warn",
  plan: "default",
  idea: "default",
};

const stateLabel: Record<RoadmapState, string> = {
  ship: "shipped",
  dev: "in dev",
  qa: "in QA",
  plan: "planned",
  idea: "idea",
};

export function ProductRoadmap() {
  const [open, setOpen] = useState<string | null>(null);

  const nowItems = laneItems("Now");
  const totalRequests = roadmapItems.reduce((sum, i) => sum + i.requests, 0);

  return (
    <div className="space-y-5">
      <PageHeader
        title="Product Roadmap"
        desc="Now, Next and Later — with the confidence behind every slot, because a date without one is a guess."
        actions={
          <Link
            href="/founder/product"
            className="inline-flex items-center gap-1.5 rounded-[10px] border border-line bg-white px-4 py-2.5 text-[13px] font-semibold text-ink hover:border-slate-300"
          >
            Back to the MVP
          </Link>
        }
      />

      {/* 1 — Headline metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat
          icon={Target}
          label="Committed this quarter"
          value={String(nowItems.length)}
          delta={`${roadmapConfidence("Now")}% confidence`}
          tone="good"
        />
        <Stat
          icon={LayoutGrid}
          label="Items on the board"
          value={String(roadmapItems.length)}
          delta={`${laneItems("Next").length} next · ${laneItems("Later").length} later`}
          tone="default"
        />
        <Stat
          icon={Sparkles}
          label="Customer requests covered"
          value={String(totalRequests)}
          delta="across every lane"
          tone="good"
        />
        <Stat
          icon={CalendarDays}
          label="Quarters planned"
          value={String(roadmapLanes.length)}
          delta="Q2 to Q4 2026"
          tone="default"
        />
      </div>

      {/* 2 — The board */}
      <div className="grid gap-4 lg:grid-cols-3">
        {roadmapLanes.map((lane) => {
          const items = laneItems(lane.lane);
          const confidence = roadmapConfidence(lane.lane);
          const active = lane.lane === "Now";
          return (
            <div
              key={lane.lane}
              className={`rounded-2xl border p-4 ${
                active ? "border-accent/30 bg-accent-mist/40" : "border-line bg-white/60"
              }`}
            >
              <div className="flex items-center gap-2 px-1 pb-3">
                <h3 className={`text-[13px] font-bold ${active ? "text-accent" : "text-slate-400"}`}>
                  {lane.lane} — {lane.quarter}
                </h3>
                {active && <Badge tone="accent">Active</Badge>}
              </div>
              <p className="px-1 pb-3 text-[11.5px] leading-relaxed text-slate-400">{lane.caption}</p>

              <div className="space-y-2.5">
                {items.map((item) => {
                  const expanded = open === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setOpen(expanded ? null : item.id)}
                      className={`w-full rounded-xl border bg-white p-3.5 text-left transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_24px_-14px_rgba(11,18,32,0.2)] ${
                        expanded ? "border-accent/40" : "border-line"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-[13.5px] font-semibold leading-snug text-ink">{item.name}</p>
                        <Badge tone={stateTone[item.state]}>{stateLabel[item.state]}</Badge>
                      </div>
                      <p className="mt-1 text-[11px] text-slate-400">
                        {item.owner} · {item.requests} requests
                      </p>
                      <div className="mt-2.5 flex items-center gap-2">
                        <Progress
                          value={item.confidence}
                          tone={item.confidence >= 70 ? "good" : item.confidence >= 45 ? "accent" : "warn"}
                          className="flex-1"
                        />
                        <span className="w-8 text-right text-[11px] font-semibold tabular-nums text-ink">
                          {item.confidence}%
                        </span>
                      </div>

                      {expanded && (
                        <div className="mt-3 border-t border-line pt-3">
                          <p className="text-[12px] leading-relaxed text-slate-500">{item.note}</p>
                          {item.featureId && (
                            <p className="mt-2 text-[11.5px] text-slate-400">
                              In the current MVP as{" "}
                              <span className="font-semibold text-ink">{featureName(item.featureId)}</span>
                            </p>
                          )}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              <p className="mt-3 px-1 text-[11px] font-medium text-slate-400">
                {items.length} items · {confidence}% average confidence
              </p>
            </div>
          );
        })}
      </div>

      {/* 3 — Quarter by quarter */}
      <Card title="Quarter by quarter" action={<Badge tone="default">commitment, not a promise</Badge>}>
        <div className="space-y-4">
          {roadmapLanes.map((lane) => {
            const items = laneItems(lane.lane);
            const confidence = roadmapConfidence(lane.lane);
            const requests = items.reduce((sum, i) => sum + i.requests, 0);
            return (
              <div key={lane.lane}>
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <span className="text-[12.5px] font-medium text-slate-600">
                    {lane.quarter}{" "}
                    <span className="text-slate-400">· {lane.lane}</span>
                  </span>
                  <span className="text-[11.5px] text-slate-400">
                    {items.length} items · {requests} requests ·{" "}
                    <span className="font-semibold tabular-nums text-ink">{confidence}% confidence</span>
                  </span>
                </div>
                <Progress
                  value={confidence}
                  tone={confidence >= 70 ? "good" : confidence >= 45 ? "accent" : "warn"}
                  className="mt-2"
                />
              </div>
            );
          })}
        </div>
      </Card>

      {/* 4 — Demand behind the board */}
      <Card
        title="The demand behind every slot"
        action={<Badge tone="default">customer requests</Badge>}
        pad={false}
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left">
            <thead>
              <tr className="border-b border-line">
                {["Item", "Lane", "Owner", "Requests", "Confidence"].map((h) => (
                  <th
                    key={h}
                    className="px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {[...roadmapItems]
                .sort((a, b) => b.requests - a.requests)
                .map((item) => (
                  <tr key={item.id}>
                    <td className="px-5 py-3">
                      <p className="text-[13px] font-semibold text-ink">{item.name}</p>
                      <p className="mt-0.5 text-[11px] text-slate-400">{item.note}</p>
                    </td>
                    <td className="px-5 py-3">
                      <Badge tone={item.lane === "Now" ? "accent" : "default"}>{item.lane}</Badge>
                    </td>
                    <td className="px-5 py-3 text-[12.5px] text-slate-600">{item.owner}</td>
                    <td className="px-5 py-3 text-[12.5px] font-semibold tabular-nums text-ink">
                      {item.requests}
                    </td>
                    <td className="px-5 py-3">
                      <span className="text-[12.5px] font-semibold tabular-nums text-ink">
                        {item.confidence}%
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* 5 — Where to go next */}
      <Card title="Where to go next">
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            {
              label: "MVP Management",
              href: "/founder/product",
              body: "What is shipping on the next release, and what is still open on it.",
            },
            {
              label: "Product Validation",
              href: "/founder/product/validation",
              body: "The experiments behind these slots — and the ones that killed a plan.",
            },
            {
              label: "Growth",
              href: "/founder/growth",
              body: "What the release does to activation, retention and the health score.",
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
