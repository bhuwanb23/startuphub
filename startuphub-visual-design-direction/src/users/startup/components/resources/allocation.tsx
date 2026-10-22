"use client";

import { useState } from "react";
import {
  ArrowRight,
  CalendarClock,
  Check,
  Coins,
  Flame,
  Repeat,
  TrendingUp,
  Wallet,
  X,
} from "lucide-react";
import Link from "next/link";
import { Badge, Card, GaugeRing, PageHeader, Progress, Stat } from "@/components/app/widgets";
import {
  allocationByTeam,
  allocations,
  budgetUtilisationPct,
  creditLines,
  expiringCredit,
  formatUsd,
  reallocationQueue,
  resourceBudget,
} from "@/users/startup/constants/resource-data";

type Move = "Pending" | "Approved" | "Declined";

export function ResourceAllocation() {
  const [moves, setMoves] = useState<Record<string, Move>>(
    Object.fromEntries(reallocationQueue.map((r) => [r.id, "Pending" as Move])),
  );

  const remaining = resourceBudget.cap - resourceBudget.committed;
  const expiring = allocations.filter((a) => a.daysLeft <= 30);
  const atRisk = allocations.filter((a) => a.status === "At risk");
  const burning = creditLines
    .filter((l) => l.daysLeft <= 30)
    .reduce((sum, l) => sum + (l.granted - l.used), 0);
  /* The two teams that hold most of the committed budget. */
  const topTeams = allocationByTeam
    .filter((t) => t.spend > 0)
    .sort((a, b) => b.spend - a.spend)
    .slice(0, 2);
  const topTeamShare = Math.round(
    (topTeams.reduce((sum, t) => sum + t.spend, 0) / resourceBudget.committed) * 100,
  );

  const decide = (id: string, decision: "Approved" | "Declined") =>
    setMoves((prev) => ({ ...prev, [id]: decision }));

  return (
    <div className="space-y-5">
      <PageHeader
        title="Resource Allocation"
        desc="Where the quarter's resource budget actually went — what is committed, what is burning, and what you should move before it lapses."
        actions={
          <Link
            href="/founder/resources/requests"
            className="inline-flex items-center gap-1.5 rounded-[10px] border border-line bg-white px-4 py-2.5 text-[13px] font-semibold text-ink hover:border-slate-300"
          >
            Raise a request
          </Link>
        }
      />

      {/* 1 — Headline metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat icon={Wallet} label="Committed this quarter" value={`₹${resourceBudget.committed} L`} delta={`of ₹${resourceBudget.cap} L cap`} tone="default" />
        <Stat icon={Coins} label="Budget still free" value={`₹${remaining.toFixed(2)} L`} delta={resourceBudget.period} tone={remaining < 2 ? "warn" : "good"} />
        <Stat icon={TrendingUp} label="Budget utilisation" value={`${budgetUtilisationPct}%`} delta="weighted by committed spend" tone="warn" />
        <Stat icon={CalendarClock} label="Expiring in 30 days" value={String(expiring.length)} delta={`${atRisk.length} already at risk`} tone="bad" />
      </div>

      {/* 2 — Budget burn */}
      <div className="grid gap-5 lg:grid-cols-[1fr_1.2fr]">
        <Card title="Budget burn">
          <div className="flex flex-col items-center py-2">
            <GaugeRing
              value={Math.round((resourceBudget.committed / resourceBudget.cap) * 100)}
              size={104}
              label="committed"
            />
            <p className="mt-4 text-[13px] font-medium text-slate-600">
              ₹{resourceBudget.committed} L committed of a ₹{resourceBudget.cap} L cap
            </p>
          </div>
          <Progress
            value={(resourceBudget.committed / resourceBudget.cap) * 100}
            tone="accent"
            className="mt-4"
          />
          <div className="mt-3 flex items-center justify-between text-[11.5px] text-slate-400">
            <span>{resourceBudget.period}</span>
            <span>Owner: {resourceBudget.owner}</span>
          </div>
          <p className="mt-4 rounded-xl bg-accent-mist p-3.5 text-[12px] leading-relaxed text-slate-600">
            {budgetUtilisationPct}% of the committed spend is being used. {topTeamShare}% of the committed
            budget sits with {topTeams.map((t) => t.team).join(" and ")} — the interns and the edge
            hardware — and both are consumed whether or not you plan for them.
          </p>
        </Card>

        <Card title="Credit lines" action={<Badge tone="warn">dollar balances, not rupee budget</Badge>} pad={false}>
          <ul className="divide-y divide-line">
            {creditLines.map((l) => {
              const usedPct = Math.round((l.used / l.granted) * 100);
              return (
                <li key={l.id} className="px-5 py-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="text-[13.5px] font-semibold text-ink">{l.label}</p>
                    <span className="text-[12px] font-semibold tabular-nums text-ink">
                      {formatUsd(l.granted - l.used)} left
                    </span>
                  </div>
                  <p className="mt-0.5 text-[11.5px] text-slate-400">
                    {l.provider} · {l.allocatedTo}
                  </p>
                  <Progress value={usedPct} tone={usedPct > 75 ? "warn" : "accent"} className="mt-2.5" />
                  <div className="mt-1.5 flex items-center justify-between text-[11px] text-slate-400">
                    <span>
                      {formatUsd(l.used)} of {formatUsd(l.granted)} used · {usedPct}%
                    </span>
                    <span className={l.daysLeft <= 30 ? "font-semibold text-amber-600" : ""}>
                      {l.expires}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
          {burning > 0 && (
            <p className="flex items-center gap-2 border-t border-line bg-amber-50 px-5 py-3 text-[12px] font-medium text-amber-700">
              <Flame className="h-3.5 w-3.5 shrink-0" />
              {formatUsd(burning)} of credit lapses in {expiringCredit.daysLeft} days if nobody books it.
            </p>
          )}
        </Card>
      </div>

      {/* 3 — Allocation ledger */}
      <Card title="Allocation ledger" action={<Badge tone="accent">{allocations.length} lines</Badge>} pad={false}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[880px] text-left">
            <thead>
              <tr className="border-b border-line">
                {["Resource", "Team", "Value", "Used", "Owner", "Expires", "Status"].map((h) => (
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
              {allocations.map((a) => (
                <tr key={a.id}>
                  <td className="px-5 py-4">
                    <p className="text-[13.5px] font-semibold text-ink">{a.name}</p>
                    <p className="mt-0.5 text-[11.5px] text-slate-400">
                      {a.provider} · {a.note}
                    </p>
                  </td>
                  <td className="px-5 py-4">
                    <Badge>{a.team}</Badge>
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-[12.5px] font-medium text-slate-600">{a.value}</p>
                    {a.allocated > 0 && (
                      <p className="text-[11px] text-slate-400">₹{a.allocated} L committed</p>
                    )}
                  </td>
                  <td className="px-5 py-4 w-32">
                    <Progress value={a.usedPct} tone={a.usedPct > 75 ? "warn" : "accent"} />
                    <p className="mt-1 text-[11px] tabular-nums text-slate-400">{a.usedPct}% used</p>
                  </td>
                  <td className="px-5 py-4 text-[12.5px] text-slate-500">{a.owner}</td>
                  <td className="px-5 py-4">
                    <span
                      className={`text-[12.5px] ${
                        a.daysLeft <= 30 ? "font-semibold text-amber-600" : "text-slate-500"
                      }`}
                    >
                      {a.expires}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <Badge tone={a.tone}>{a.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* 4 — Team split */}
      <Card title="Where the budget sits" action={<Badge tone="default">by team</Badge>}>
        <div className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
          {allocationByTeam.map((t) => (
            <div key={t.team}>
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-[12.5px] font-medium text-slate-600">{t.team}</span>
                <span className="text-[11.5px] text-slate-400">
                  <span className="font-semibold tabular-nums text-ink">₹{t.spend} L</span> ·{" "}
                  {t.pct}% · {t.headcount} people
                </span>
              </div>
              <Progress value={t.pct} tone={t.pct > 45 ? "accent" : "good"} className="mt-2" />
              <p className="mt-1.5 text-[11.5px] leading-snug text-slate-400">{t.note}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* 5 — Expiry watchlist */}
      <Card title="Expiring soon" action={<Badge tone="bad">30 days</Badge>} pad={false}>
        <ul className="divide-y divide-line">
          {expiring.map((a) => (
            <li key={a.id} className="flex flex-wrap items-center gap-3 px-5 py-3.5">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-amber-50 text-amber-600">
                <CalendarClock className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-semibold text-ink">{a.name}</p>
                <p className="mt-0.5 text-[11.5px] text-slate-400">{a.note}</p>
              </div>
              <span className="text-[12.5px] font-semibold text-amber-600">{a.daysLeft} days</span>
              <Badge tone={a.tone}>{a.status}</Badge>
            </li>
          ))}
        </ul>
      </Card>

      {/* 6 — Reallocation queue */}
      <Card
        title="Reallocation queue"
        action={
          <Badge tone="accent">
            {Object.values(moves).filter((m) => m === "Approved").length} approved
          </Badge>
        }
        pad={false}
      >
        <ul className="divide-y divide-line">
          {reallocationQueue.map((r) => {
            const state = moves[r.id];
            return (
              <li key={r.id} className="px-5 py-4">
                <div className="flex flex-wrap items-start gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
                    <Repeat className="h-4 w-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[13px] font-semibold text-ink">{r.move}</p>
                    <p className="mt-0.5 text-[11.5px] text-slate-400">
                      {r.from} → {r.to} · requested {r.requested} by {r.requester}
                    </p>
                    <p className="mt-1.5 text-[12px] leading-relaxed text-slate-500">{r.rationale}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <span className="text-[12px] font-semibold text-emerald-600">{r.saves}</span>
                    {state === "Pending" ? (
                      <>
                        <button
                          type="button"
                          onClick={() => decide(r.id, "Approved")}
                          className="flex items-center gap-1 rounded-lg border border-line px-2.5 py-1.5 text-[11.5px] font-semibold text-ink transition-colors hover:border-emerald-300 hover:text-emerald-600"
                        >
                          <Check className="h-3 w-3" /> Approve
                        </button>
                        <button
                          type="button"
                          onClick={() => decide(r.id, "Declined")}
                          className="flex items-center gap-1 rounded-lg border border-line px-2.5 py-1.5 text-[11.5px] font-semibold text-ink transition-colors hover:border-rose-300 hover:text-rose-500"
                        >
                          <X className="h-3 w-3" /> Decline
                        </button>
                      </>
                    ) : (
                      <Badge tone={state === "Approved" ? "good" : "default"}>{state}</Badge>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </Card>

      {/* 7 — Where to go next */}
      <Card title="Where to go next">
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            {
              label: "Resource Discovery",
              href: "/founder/resources",
              body: "The full catalogue — what else the ecosystem can put behind this quarter.",
            },
            {
              label: "Resource Matching",
              href: "/founder/resources/matching",
              body: "How a fit score is computed, and how to make the model more confident.",
            },
            {
              label: "Resource Requests",
              href: "/founder/resources/requests",
              body: "Raise a request, track who approves it and how long it takes.",
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
