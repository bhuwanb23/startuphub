"use client";

import { useState } from "react";
import { ArrowRight, Crosshair, Eye, Shield, Swords, Users } from "lucide-react";
import Link from "next/link";
import { Badge, Card, PageHeader, Progress, Stat } from "@/components/app/widgets";
import {
  adjacentCompetitors,
  averageOverlap,
  closestRival,
  directCompetitors,
  leadingAxes,
  marketAxes,
  substituteCompetitors,
  swot,
  trackedCompetitors,
  whitespaceScore,
} from "@/users/startup/constants/market-data";

type View = "direct" | "adjacent" | "substitute";

const views: { id: View; label: string }[] = [
  { id: "direct", label: "Direct rivals" },
  { id: "adjacent", label: "Adjacent" },
  { id: "substitute", label: "Substitutes" },
];

export function Competitors() {
  const [view, setView] = useState<View>("direct");

  const players =
    view === "adjacent" ? adjacentCompetitors : view === "substitute" ? substituteCompetitors : [];

  return (
    <div className="space-y-5">
      <PageHeader
        title="Competitor Analysis"
        desc="The field you are actually fighting on — compared on the axes buyers care about."
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
          icon={Swords}
          label="Direct rivals"
          value={String(directCompetitors.length)}
          delta={`${trackedCompetitors} players tracked`}
          tone="warn"
        />
        <Stat
          icon={Crosshair}
          label="Average overlap"
          value={`${averageOverlap}%`}
          delta="share of the buying decision"
          tone="default"
        />
        <Stat
          icon={Eye}
          label="Closest rival"
          value={closestRival.overlap + "%"}
          delta={closestRival.name}
          tone="bad"
        />
        <Stat
          icon={Shield}
          label="Whitespace score"
          value={String(whitespaceScore)}
          delta={`${leadingAxes.length} of ${marketAxes.length} axes uncontested`}
          tone="good"
        />
      </div>

      {/* 2 — Direct comparison */}
      <Card
        title="Competitive comparison"
        action={<Badge tone="default">{directCompetitors.length} direct</Badge>}
        pad={false}
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left">
            <thead>
              <tr className="border-b border-line">
                {["Player", "USP", "Pricing", "Tech", "Stage", "Overlap"].map((h) => (
                  <th
                    key={h}
                    className="px-5 py-3.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              <tr className="bg-accent-mist/40">
                <td className="px-5 py-4">
                  <p className="text-[13.5px] font-semibold text-ink">Lumen AI (you)</p>
                  <p className="mt-0.5 text-[11px] text-slate-400">
                    10–14 day early warning + vernacular field ops
                  </p>
                </td>
                <td className="max-w-[220px] px-5 py-4 text-[12.5px] leading-snug text-slate-500">
                  Field ops that work without hardware or connectivity
                </td>
                <td className="px-5 py-4 text-[12.5px] font-medium text-slate-600">
                  ₹180–220/acre/yr
                </td>
                <td className="px-5 py-4 text-[12.5px] text-slate-500">Satellite + edge inference</td>
                <td className="px-5 py-4">
                  <Badge tone="accent">Series A</Badge>
                </td>
                <td className="px-5 py-4">
                  <span className="text-[12.5px] font-semibold tabular-nums text-ink">—</span>
                </td>
              </tr>
              {directCompetitors.map((c) => (
                <tr key={c.id}>
                  <td className="px-5 py-4">
                    <p className="text-[13.5px] font-semibold text-ink">{c.name}</p>
                    <p className="mt-0.5 text-[11px] text-slate-400">{c.lastMove}</p>
                  </td>
                  <td className="max-w-[220px] px-5 py-4 text-[12.5px] leading-snug text-slate-500">
                    {c.usp}
                  </td>
                  <td className="px-5 py-4 text-[12.5px] font-medium text-slate-600">{c.price}</td>
                  <td className="px-5 py-4 text-[12.5px] text-slate-500">{c.tech}</td>
                  <td className="px-5 py-4">
                    <Badge>{c.stage}</Badge>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16">
                        <Progress
                          value={c.overlap}
                          tone={c.overlap >= 70 ? "bad" : c.overlap >= 50 ? "warn" : "accent"}
                        />
                      </div>
                      <span className="text-[12.5px] font-semibold tabular-nums text-ink">
                        {c.overlap}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* 3 — Axis by axis */}
      <Card title="Axis by axis" action={<Badge tone="default">us against the best rival</Badge>}>
        <div className="space-y-4">
          {marketAxes.map((a) => {
            const ahead = a.us > a.best;
            return (
              <div key={a.id}>
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <span className="text-[12.5px] font-medium text-slate-600">{a.axis}</span>
                  <span className="text-[11.5px] text-slate-400">
                    us <span className="font-semibold tabular-nums text-ink">{a.us}</span> · best rival{" "}
                    <span className="font-semibold tabular-nums text-ink">{a.best}</span>
                  </span>
                </div>
                <Progress
                  value={(a.us / 10) * 100}
                  tone={ahead ? "good" : "warn"}
                  className="mt-2"
                />
                <p className="mt-1.5 text-[11.5px] leading-snug text-slate-400">{a.note}</p>
              </div>
            );
          })}
        </div>
      </Card>

      {/* 4 — The wider watchlist */}
      <Card
        title="The wider watchlist"
        action={
          <div className="flex flex-wrap gap-1.5">
            {views.map((v) => (
              <button
                key={v.id}
                type="button"
                onClick={() => setView(v.id)}
                className={`rounded-full px-2.5 py-1 text-[11px] font-semibold transition-colors ${
                  view === v.id
                    ? "bg-accent text-white"
                    : "border border-line bg-white text-slate-500 hover:border-slate-300 hover:text-ink"
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>
        }
        pad={false}
      >
        {view === "direct" ? (
          <p className="px-5 py-8 text-center text-[13px] text-slate-400">
            The direct table above holds all {directCompetitors.length} rivals. Pick adjacent or substitutes
            to see the rest of the field.
          </p>
        ) : (
          <ul className="divide-y divide-line">
            {players.map((p) => (
              <li key={p.id} className="flex flex-wrap items-center gap-3 px-5 py-3.5">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-slate-50 text-slate-400">
                  <Users className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-semibold text-ink">{p.name}</p>
                  <p className="mt-0.5 text-[11.5px] text-slate-400">{p.note}</p>
                </div>
                <Badge>{p.category}</Badge>
              </li>
            ))}
          </ul>
        )}
      </Card>

      {/* 5 — SWOT */}
      <div className="grid gap-4 sm:grid-cols-2">
        {swot.map((s) => (
          <Card key={s.label} title={s.label} action={<Badge tone={s.tone}>{s.items.length}</Badge>}>
            <ul className="space-y-2.5">
              {s.items.map((i) => (
                <li key={i} className="flex items-start gap-2.5 text-[13px] leading-snug text-slate-600">
                  <span
                    className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${
                      s.tone === "good"
                        ? "bg-emerald-500"
                        : s.tone === "warn"
                          ? "bg-amber-400"
                          : s.tone === "accent"
                            ? "bg-accent"
                            : "bg-rose-400"
                    }`}
                  />
                  {i}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>

      {/* 6 — Where to go next */}
      <Card title="Where to go next">
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            {
              label: "Market Overview",
              href: "/founder/market",
              body: "The market ladder and where Lumen sits inside it.",
            },
            {
              label: "Trends",
              href: "/founder/market/trends",
              body: "The signals that move each rival before they move you.",
            },
            {
              label: "Product Roadmap",
              href: "/founder/product/roadmap",
              body: "What the competitive read changed in the build plan.",
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
