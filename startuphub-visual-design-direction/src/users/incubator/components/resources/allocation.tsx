"use client";

import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  Clock3,
  Coins,
  Gauge,
  Repeat,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import { Badge, Card, PageHeader, Progress } from "@/components/app/widgets";
import { cn } from "@/lib/utils";
import {
  BUDGET_LEDGER,
  CREDIT_LINES,
  REALLOCATIONS,
  RESOURCE_BUDGET,
  STARTUP_ALLOCATIONS,
} from "../../constants/resources-data";

const TEAM_FILTERS = ["All", ...BUDGET_LEDGER.map((b) => b.team)] as const;

export function ResourceAllocation() {
  const [team, setTeam] = useState<(typeof TEAM_FILTERS)[number]>("All");

  const filtered = useMemo(
    () =>
      team === "All"
        ? STARTUP_ALLOCATIONS
        : STARTUP_ALLOCATIONS.filter((a) => {
            const ledger = BUDGET_LEDGER.find((b) => b.team === team);
            return ledger ? a.share > 0 : true;
          }),
    [team],
  );

  const burnPct = Math.round(
    (RESOURCE_BUDGET.committed / RESOURCE_BUDGET.cap) * 100,
  );
  const creditsLeft = CREDIT_LINES.reduce(
    (s, l) => s + (l.granted - l.used),
    0,
  );
  const expiring = CREDIT_LINES.filter((l) => l.daysLeft < 90);
  const allocatedValue = STARTUP_ALLOCATIONS.reduce((s, a) => s + a.value, 0);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Resource Allocation"
        desc="Who holds what, what is left, and what should move before it expires."
        actions={
          <Link
            href="/incubator/resources"
            className="inline-flex items-center gap-1.5 rounded-[10px] border border-line bg-white px-4 py-2.5 text-[13px] font-semibold text-ink transition-colors hover:bg-soft"
          >
            Resource inventory
          </Link>
        }
      />

      {/* ── 01 · Budget burn ─────────────────────────────────── */}
      <Card
        title="Budget burn"
        sub="Committed against the cap for the quarter"
        action={
          <Badge tone={burnPct > 80 ? "warn" : "good"}>
            {burnPct}% of cap
          </Badge>
        }
      >
        <div className="grid gap-5 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="flex items-baseline gap-3">
              <span className="text-[38px] font-semibold leading-none tracking-[-0.03em] text-ink tabular-nums">
                ₹{RESOURCE_BUDGET.committed.toFixed(1)} L
              </span>
              <span className="text-[13px] text-slate-400">
                of ₹{RESOURCE_BUDGET.cap} L
              </span>
            </div>
            <div className="mt-4">
              <Progress
                value={burnPct}
                tone={burnPct > 80 ? "warn" : "accent"}
                className="h-2"
              />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {[
                { l: "Cap", v: `₹${RESOURCE_BUDGET.cap} L` },
                { l: "Committed", v: `₹${RESOURCE_BUDGET.committed.toFixed(1)} L` },
                { l: "Uncommitted", v: `₹${(RESOURCE_BUDGET.cap - RESOURCE_BUDGET.committed).toFixed(1)} L` },
              ].map((x) => (
                <div key={x.l} className="rounded-xl bg-soft p-3.5 text-center">
                  <p className="text-[15px] font-semibold tracking-tight text-ink tabular-nums">
                    {x.v}
                  </p>
                  <p className="mt-0.5 font-mono text-[9px] tracking-[0.12em] text-slate-400 uppercase">
                    {x.l}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-[11.5px] text-slate-400">
              {RESOURCE_BUDGET.period} · owner {RESOURCE_BUDGET.owner}
            </p>
          </div>

          <div className="space-y-3">
            {[
              { l: "Credits remaining", v: `${creditsLeft.toFixed(1)} units`, tone: "accent" as const },
              { l: "Allocated to startups", v: `₹${allocatedValue.toFixed(1)} L`, tone: "good" as const },
              { l: "Lines expiring in 90 days", v: String(expiring.length), tone: "warn" as const },
            ].map((x) => (
              <div
                key={x.l}
                className="flex items-center justify-between rounded-xl border border-line p-3.5"
              >
                <span className="text-[12px] text-slate-500">{x.l}</span>
                <Badge tone={x.tone}>{x.v}</Badge>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* ── 02 · Where the budget sits ────────────────────────── */}
      <Card
        title="Where the budget sits"
        sub="Split by team — adds up to the committed figure"
        action={<Badge tone="accent">{BUDGET_LEDGER.length} teams</Badge>}
        pad={false}
      >
        <ul className="divide-y divide-line">
          {BUDGET_LEDGER.map((b) => (
            <li
              key={b.team}
              className="flex flex-wrap items-center gap-4 px-5 py-4 transition-colors hover:bg-soft"
            >
              <span className="min-w-[160px] flex-1">
                <span className="block text-[13.5px] font-semibold text-ink">
                  {b.team}
                </span>
                <span className="block text-[11.5px] text-slate-400">{b.note}</span>
              </span>
              <span className="w-20 shrink-0 text-right text-[12.5px] tabular-nums text-slate-500">
                <b className="font-semibold text-ink">₹{b.spend.toFixed(1)} L</b>
              </span>
              <span className="w-14 shrink-0 text-right text-[11.5px] tabular-nums text-slate-400">
                {b.startups} startups
              </span>
              <div className="w-32 shrink-0">
                <Progress
                  value={b.pct}
                  tone={b.tone === "accent" ? "accent" : b.tone === "warn" ? "warn" : "good"}
                />
              </div>
              <span className="w-10 text-right text-[12px] font-semibold tabular-nums text-ink">
                {b.pct}%
              </span>
            </li>
          ))}
        </ul>
      </Card>

      {/* ── 03 · Credit lines ─────────────────────────────────── */}
      <Card
        title="Credit lines"
        sub="Granted against used, and when each expires"
        action={<Badge tone="warn">{expiring.length} expiring</Badge>}
        pad={false}
      >
        <ul className="divide-y divide-line">
          {CREDIT_LINES.map((c) => {
            const pct = Math.round((c.used / c.granted) * 100);
            return (
              <li
                key={c.id}
                className="flex flex-wrap items-center gap-4 px-5 py-4 transition-colors hover:bg-soft"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent">
                  <Wallet className="h-4 w-4" />
                </span>
                <div className="min-w-[170px] flex-1">
                  <p className="text-[13.5px] font-semibold text-ink">{c.label}</p>
                  <p className="mt-0.5 text-[11.5px] text-slate-400">
                    {c.provider} · {c.allocatedTo} · expires {c.expires}
                  </p>
                </div>
                <div className="flex w-[150px] shrink-0 items-center gap-2.5">
                  <Progress
                    value={pct}
                    tone={pct > 80 ? "warn" : pct > 40 ? "accent" : "good"}
                    className="flex-1"
                  />
                  <span className="w-14 text-right text-[11.5px] font-semibold tabular-nums text-ink">
                    {c.used}/{c.granted}
                  </span>
                </div>
                <span
                  className={cn(
                    "flex w-24 shrink-0 items-center gap-1.5 font-mono text-[10.5px]",
                    c.daysLeft < 60 ? "text-red-600" : c.daysLeft < 90 ? "text-amber-dim" : "text-slate-400",
                  )}
                >
                  <Clock3 className="h-3 w-3" /> {c.daysLeft}d
                </span>
              </li>
            );
          })}
        </ul>
      </Card>

      {/* ── 04 · Allocation ledger ────────────────────────────── */}
      <Card
        title="Allocation ledger"
        sub="Every resource held by a startup, and what it is worth"
        action={
          <Badge tone="accent">
            ₹{allocatedValue.toFixed(1)} L to 8 startups
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

      {/* ── 05 · Expiring soon ───────────────────────────────── */}
      <Card
        title="Expiring soon"
        sub="Lines that go back to the provider if they are not used"
        action={<Badge tone="bad">{expiring.length} at risk</Badge>}
        pad={false}
      >
        {expiring.length === 0 ? (
          <div className="flex flex-col items-center gap-2 px-5 py-14 text-center">
            <Gauge className="h-6 w-6 text-rise" />
            <p className="text-[13px] text-slate-400">Nothing expires this quarter.</p>
          </div>
        ) : (
          <ul className="divide-y divide-line">
            {expiring.map((c) => {
              const idle = c.granted - c.used;
              return (
                <li
                  key={c.id}
                  className="flex flex-wrap items-center gap-4 px-5 py-4 transition-colors hover:bg-soft"
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-red-50 text-red-600">
                    <Clock3 className="h-4 w-4" />
                  </span>
                  <div className="min-w-[170px] flex-1">
                    <p className="text-[13.5px] font-semibold text-ink">{c.label}</p>
                    <p className="mt-0.5 text-[11.5px] text-slate-400">
                      {c.provider} · {c.allocatedTo}
                    </p>
                  </div>
                  <span className="w-24 shrink-0 text-right text-[12.5px] tabular-nums text-slate-500">
                    <b className="font-semibold text-ink">{idle.toFixed(1)}</b>{" "}
                    {c.unit} idle
                  </span>
                  <span className="w-20 shrink-0 text-right font-mono text-[10.5px] text-red-600">
                    {c.daysLeft}d left
                  </span>
                  <Badge tone="bad">At risk</Badge>
                </li>
              );
            })}
          </ul>
        )}
      </Card>

      {/* ── 06 · Reallocation queue ──────────────────────────── */}
      <Card
        title="Reallocation queue"
        sub="Moves that would free capacity without spending more"
        action={
          <span className="flex items-center gap-1.5 text-[12px] font-semibold text-slate-400">
            <Repeat className="h-3.5 w-3.5" /> {REALLOCATIONS.length} proposed
          </span>
        }
        pad={false}
      >
        <ul className="divide-y divide-line">
          {REALLOCATIONS.map((r) => (
            <li
              key={r.id}
              className="flex flex-col gap-3 px-5 py-4 transition-colors hover:bg-soft"
            >
              <div className="flex flex-wrap items-center gap-4">
                <span
                  className={cn(
                    "grid h-9 w-9 shrink-0 place-items-center rounded-lg",
                    r.tone === "bad"
                      ? "bg-red-50 text-red-600"
                      : r.tone === "warn"
                        ? "bg-amber-tint text-amber-dim"
                        : "bg-accent-soft text-accent",
                  )}
                >
                  <Repeat className="h-4 w-4" />
                </span>
                <div className="min-w-[210px] flex-1">
                  <p className="text-[13.5px] font-semibold text-ink">{r.move}</p>
                  <p className="mt-0.5 text-[11.5px] text-slate-400">
                    {r.from} → {r.to}
                  </p>
                </div>
                <span className="w-16 shrink-0 text-right text-[13px] font-semibold text-rise tabular-nums">
                  {r.saves}
                </span>
                <Badge tone={r.tone}>
                  {r.requested} · {r.requester}
                </Badge>
              </div>
              <p className="pl-13 text-[12px] leading-relaxed text-slate-500">
                {r.rationale}
              </p>
            </li>
          ))}
        </ul>
      </Card>

      {/* ── 07 · Allocation coverage ─────────────────────────── */}
      <Card
        title="Allocation coverage"
        sub="How the committed budget reaches the portfolio"
        action={<Badge tone="accent">top 8 of 13</Badge>}
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { l: "Startups holding a resource", v: "8", n: "of 13 in the portfolio" },
            { l: "Largest single holding", v: "₹3.2 L", n: "Lumen AI — GPU cluster" },
            { l: "Average per startup", v: "₹1.7 L", n: "across the top 8" },
            { l: "Unallocated", v: "₹7.9 L", n: "of the committed budget" },
          ].map((x) => (
            <div
              key={x.l}
              className="rounded-xl border border-line p-4 transition-colors hover:border-accent/25"
            >
              <p className="text-[12px] font-medium text-slate-500">{x.l}</p>
              <p className="mt-2 text-[22px] font-semibold leading-none tracking-[-0.03em] text-ink tabular-nums">
                {x.v}
              </p>
              <p className="mt-2 text-[11.5px] text-slate-400">{x.n}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* ── 08 · Where to go next ────────────────────────────── */}
      <Card title="Where to go next" sub="From the ledger to the usage">
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            {
              href: "/incubator/resources",
              title: "Back to inventory",
              body: "The pool this budget draws from.",
              icon: Wallet,
            },
            {
              href: "/incubator/resources/requests",
              title: "Request queue",
              body: "What is waiting on an approval.",
              icon: Repeat,
            },
            {
              href: "/incubator/resources/utilization",
              title: "Utilisation trends",
              body: "Are the allocations actually being used?",
              icon: Coins,
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
