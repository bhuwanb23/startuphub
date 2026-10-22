"use client";

import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  CalendarClock,
  FileCheck2,
  Scale,
  ShieldAlert,
  Users,
} from "lucide-react";
import Link from "next/link";
import { Badge, Card, PageHeader, Progress, Stat } from "@/components/app/widgets";
import { cn } from "@/lib/utils";
import {
  COUNSEL_SLOTS,
  FILING_TURNAROUND,
  IP_DEADLINES,
  IP_EXPERTS,
  IP_MATURITY,
  IP_PORTFOLIO,
  IP_RISKS,
  IP_STATUS,
} from "../../constants/support-data";

export function IprSupport() {
  const [view, setView] = useState<"portfolio" | "risks">("portfolio");

  const totalFilings = IP_STATUS.reduce((s, i) => s + i.filings, 0);
  const startupsWithIp = IP_STATUS.filter((i) => i.filings > 0).length;
  const noIp = IP_STATUS.filter((i) => i.filings === 0).length;
  const slotsFree = COUNSEL_SLOTS.reduce((s, c) => s + (c.slots - c.booked), 0);

  const visible = useMemo(
    () => (view === "portfolio" ? IP_STATUS : IP_RISKS),
    [view],
  );

  const portfolio = view === "portfolio" ? (visible as typeof IP_STATUS) : [];
  const risks = view === "risks" ? (visible as typeof IP_RISKS) : [];

  return (
    <div className="space-y-6">
      <PageHeader
        title="IPR Support"
        desc="Filings, gaps and exposure across the portfolio — and the counsel capacity behind them."
        actions={
          <Link
            href="/incubator/support"
            className="inline-flex items-center gap-1.5 rounded-[10px] border border-line bg-white px-4 py-2.5 text-[13px] font-semibold text-ink transition-colors hover:bg-soft"
          >
            All support
          </Link>
        }
      />

      {/* ── 01 · KPIs ────────────────────────────────────────── */}
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        <Stat
          icon={FileCheck2}
          label="Live filings"
          value={String(totalFilings)}
          delta={`across ${startupsWithIp} startups`}
          tone="good"
        />
        <Stat
          icon={ShieldAlert}
          label="High IP risk"
          value={String(IP_RISKS.filter((r) => r.tone === "bad").length)}
          delta="exposure to act on this month"
          tone="bad"
        />
        <Stat
          icon={Scale}
          label="Counsel slots free"
          value={String(slotsFree)}
          delta="of 4 a month, pro bono"
          tone="warn"
        />
        <Stat
          icon={Users}
          label="Startups with no IP"
          value={String(noIp)}
          delta="no filings, no strategy"
          tone="warn"
        />
      </div>

      {/* ── 02 · Filing portfolio ────────────────────────────── */}
      <Card
        title="Filing portfolio"
        sub="What the portfolio has actually filed"
        action={<Badge tone="accent">{totalFilings} filings</Badge>}
      >
        <div className="space-y-4">
          {IP_PORTFOLIO.map((p) => (
            <div key={p.type} className="flex items-center gap-3">
              <span className="w-24 shrink-0 text-[12.5px] font-medium text-slate-600">
                {p.type}
              </span>
              <Progress
                value={p.share}
                tone={p.tone === "good" ? "good" : p.tone === "warn" ? "warn" : p.tone === "bad" ? "bad" : "accent"}
                className="flex-1"
              />
              <span className="w-8 text-right text-[12px] font-semibold tabular-nums text-ink">
                {p.count}
              </span>
              <span className="w-10 text-right text-[11.5px] tabular-nums text-slate-400">
                {p.share}%
              </span>
            </div>
          ))}
        </div>
        <p className="mt-4 rounded-xl border border-line bg-soft p-4 text-[12.5px] leading-relaxed text-slate-600">
          <span className="font-semibold text-ink">Trademarks are under-filed</span> —
          nine marks across thirteen startups, and four class gaps are still
          open. It is the cheapest filing type and the most missed.
        </p>
      </Card>

      {/* ── 03 · View toggle ─────────────────────────────────── */}
      <div className="flex flex-wrap gap-2">
        {(
          [
            { key: "portfolio", label: "Startup IP status" },
            { key: "risks", label: "Risk exposure" },
          ] as const
        ).map((t) => (
          <button
            key={t.key}
            onClick={() => setView(t.key)}
            className={cn(
              "rounded-[10px] border px-3.5 py-2 text-[12.5px] font-medium transition-colors",
              view === t.key
                ? "border-ink bg-ink text-white"
                : "border-line bg-white text-slate-500 hover:border-slate-300 hover:text-ink",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ── 04 · Portfolio / risk list ───────────────────────── */}
      <Card
        title={
          view === "portfolio" ? "Startup IP status" : "IP risk exposure"
        }
        sub={
          view === "portfolio"
            ? "Filings held, and the gap each startup is carrying"
            : "What is exposed, and the cheapest way to close it"
        }
        action={
          <Badge tone={view === "portfolio" ? "accent" : "bad"}>
            {view === "portfolio"
              ? `${IP_STATUS.length} startups`
              : `${IP_RISKS.length} exposures`}
          </Badge>
        }
        pad={false}
      >
        {view === "portfolio" ? (
          <ul className="divide-y divide-line">
            {portfolio.map((i) => (
              <li
                key={i.startupSlug}
                className="flex flex-col gap-3 px-5 py-4 transition-colors hover:bg-soft lg:flex-row lg:items-center lg:gap-4"
              >
                <span
                  className={cn(
                    "grid h-9 w-9 shrink-0 place-items-center rounded-lg text-[11px] font-bold",
                    i.tone === "good"
                      ? "bg-rise-tint text-rise"
                      : i.tone === "bad"
                        ? "bg-red-50 text-red-600"
                        : i.tone === "warn"
                          ? "bg-amber-tint text-amber-dim"
                          : "bg-accent-soft text-accent",
                  )}
                >
                  {i.filings}
                </span>
                <div className="min-w-[180px] flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-[13.5px] font-semibold text-ink">{i.startup}</p>
                    <Badge tone={i.tone}>{i.risk} risk</Badge>
                  </div>
                  <p className="mt-0.5 text-[11.5px] text-slate-400">
                    {i.sector} · {i.patents} patents · {i.trademarks} trademarks
                  </p>
                </div>
                <span className="min-w-[210px] flex-1 text-[12px] text-slate-500">
                  {i.gaps}
                </span>
                <span className="w-20 shrink-0 text-right text-[12px] tabular-nums text-slate-500">
                  <b className="font-semibold text-ink">{i.filings}</b> filings
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <ul className="divide-y divide-line">
            {(risks as typeof IP_RISKS).map((r) => (
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
                        : "bg-amber-tint text-amber-dim",
                    )}
                  >
                    <ShieldAlert className="h-4 w-4" />
                  </span>
                  <div className="min-w-[200px] flex-1">
                    <p className="text-[13.5px] font-semibold text-ink">{r.risk}</p>
                    <p className="mt-0.5 text-[11.5px] text-slate-400">
                      {r.startup} · {r.exposure}
                    </p>
                  </div>
                  <Badge tone={r.tone}>
                    {r.tone === "bad" ? "Act now" : "This quarter"}
                  </Badge>
                </div>
                <p className="pl-13 text-[12px] leading-relaxed text-slate-500">
                  <span className="font-medium text-slate-600">Fix:</span>{" "}
                  {r.mitigation} — {r.note}
                </p>
              </li>
            ))}
          </ul>
        )}
      </Card>

      {/* ── 05 · Expert network ──────────────────────────────── */}
      <Card
        title="Expert network"
        sub="Who the programme can reach for IP help"
        action={<Badge tone="accent">{IP_EXPERTS.length} experts</Badge>}
        pad={false}
      >
        <ul className="divide-y divide-line">
          {IP_EXPERTS.map((e) => (
            <li
              key={e.slug}
              className="flex flex-wrap items-center gap-4 px-5 py-4 transition-colors hover:bg-soft"
            >
              <span
                className={cn(
                  "grid h-9 w-9 shrink-0 place-items-center rounded-lg text-[11px] font-bold",
                  e.tone === "good"
                    ? "bg-rise-tint text-rise"
                    : e.tone === "accent"
                      ? "bg-accent-soft text-accent"
                      : "bg-soft text-slate-500",
                )}
              >
                {e.initials}
              </span>
              <div className="min-w-[190px] flex-1">
                <p className="text-[13.5px] font-semibold text-ink">{e.name}</p>
                <p className="mt-0.5 text-[11.5px] text-slate-400">
                  {e.role} · {e.expertise.join(", ")}
                </p>
              </div>
              <span className="hidden min-w-[210px] text-[12px] text-slate-500 lg:block">
                {e.reason}
              </span>
              <span className="w-16 shrink-0 text-right text-[12.5px] font-semibold tabular-nums text-ink">
                {e.match}%
              </span>
              <Badge tone={e.tone}>{e.availability}</Badge>
            </li>
          ))}
        </ul>
      </Card>

      {/* ── 06 · Counsel capacity ────────────────────────────── */}
      <Card
        title="Counsel capacity"
        sub="Four pro bono slots a month, from the SH Legal Desk"
        action={<Badge tone="warn">{slotsFree} free</Badge>}
      >
        <div className="grid gap-3 sm:grid-cols-3">
          {COUNSEL_SLOTS.map((c) => (
            <div
              key={c.month}
              className="rounded-xl border border-line p-4 transition-colors hover:border-accent/25"
            >
              <div className="flex items-center justify-between">
                <p className="text-[12.5px] font-semibold text-ink">{c.month}</p>
                <Badge tone={c.tone}>
                  {c.booked >= c.slots ? "Full" : c.booked > 0 ? "Partly booked" : "Open"}
                </Badge>
              </div>
              <p className="mt-2.5 text-[24px] font-semibold leading-none tracking-[-0.03em] text-ink tabular-nums">
                {c.booked}/{c.slots}
              </p>
              <Progress
                value={(c.booked / c.slots) * 100}
                tone={c.tone === "bad" ? "bad" : c.tone === "warn" ? "warn" : "good"}
                className="mt-3"
              />
              <p className="mt-2.5 text-[11.5px] leading-relaxed text-slate-400">
                {c.note}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-4 rounded-xl border border-line bg-soft p-4 text-[12.5px] leading-relaxed text-slate-600">
          <span className="font-semibold text-ink">The line expires on 31 May.</span>{" "}
          Every unrenewed slot returns to the legal desk — renew it or convert the
          filings to self-service.
        </p>
      </Card>

      {/* ── 07 · Filing deadlines ────────────────────────────── */}
      <Card
        title="Filing deadlines"
        sub="What is due, and who is carrying it"
        action={<CalendarClock className="h-4 w-4 text-slate-400" />}
        pad={false}
      >
        <ul className="divide-y divide-line">
          {IP_DEADLINES.map((d) => (
            <li
              key={d.id}
              className="flex flex-wrap items-center gap-4 px-5 py-4 transition-colors hover:bg-soft"
            >
              <span
                className={cn(
                  "grid h-9 w-9 shrink-0 place-items-center rounded-lg",
                  d.tone === "bad"
                    ? "bg-red-50 text-red-600"
                    : d.tone === "warn"
                      ? "bg-amber-tint text-amber-dim"
                      : "bg-soft text-slate-400",
                )}
              >
                <Scale className="h-4 w-4" />
              </span>
              <div className="min-w-[210px] flex-1">
                <p className="text-[13.5px] font-semibold text-ink">{d.filing}</p>
                <p className="mt-0.5 text-[11.5px] text-slate-400">
                  {d.startup} · {d.due} · {d.owner}
                </p>
              </div>
              <span className="hidden min-w-[190px] text-[12px] text-slate-500 lg:block">
                {d.note}
              </span>
              <span
                className={cn(
                  "w-20 shrink-0 text-right font-mono text-[10.5px]",
                  d.days < 15 ? "text-red-600" : d.days < 40 ? "text-amber-dim" : "text-slate-400",
                )}
              >
                {d.days}d left
              </span>
              <Badge tone={d.tone}>
                {d.days < 15 ? "Urgent" : d.days < 40 ? "Soon" : "Scheduled"}
              </Badge>
            </li>
          ))}
        </ul>
      </Card>

      {/* ── 09 · IP maturity ─────────────────────────────────── */}
      <Card
        title="IP maturity"
        sub="How defensible each startup's position actually is"
        action={<Badge tone="bad">{IP_MATURITY[3].startups} with no position</Badge>}
        pad={false}
      >
        <ul className="divide-y divide-line">
          {IP_MATURITY.map((m) => (
            <li
              key={m.band}
              className="flex flex-wrap items-center gap-4 px-5 py-4 transition-colors hover:bg-soft"
            >
              <span
                className={cn(
                  "grid h-9 w-9 shrink-0 place-items-center rounded-lg",
                  m.tone === "good"
                    ? "bg-rise-tint text-rise"
                    : m.tone === "warn"
                      ? "bg-amber-tint text-amber-dim"
                      : m.tone === "bad"
                        ? "bg-red-50 text-red-600"
                        : "bg-accent-soft text-accent",
                )}
              >
                <FileCheck2 className="h-4 w-4" />
              </span>
              <div className="min-w-[160px] flex-1">
                <p className="text-[13.5px] font-semibold text-ink">{m.band}</p>
                <p className="mt-0.5 text-[11.5px] text-slate-400">{m.note}</p>
              </div>
              <span className="hidden min-w-[190px] text-[12px] text-slate-500 lg:block">
                {m.range}
              </span>
              <span className="text-[12px] tabular-nums text-slate-500">
                <b className="font-semibold text-ink">{m.startups}</b> startups
              </span>
              <Badge tone={m.tone}>{m.band}</Badge>
            </li>
          ))}
        </ul>
      </Card>

      {/* ── 10 · Filing turnaround ───────────────────────────── */}
      <Card
        title="Filing turnaround"
        sub="How long each kind of filing takes end to end"
        action={<Badge tone="accent">{FILING_TURNAROUND.length} filing types</Badge>}
      >
        <div className="space-y-4">
          {FILING_TURNAROUND.map((f) => (
            <div key={f.type} className="flex items-center gap-3">
              <span className="w-[170px] shrink-0 text-[12.5px] font-medium text-slate-600">
                {f.type}
              </span>
              <Progress
                value={(f.days / 100) * 100}
                tone={f.tone === "good" ? "good" : f.tone === "warn" ? "warn" : "accent"}
                className="flex-1"
              />
              <span className="w-12 text-right text-[12px] font-semibold tabular-nums text-ink">
                {f.days}d
              </span>
              <span className="w-14 text-right text-[11.5px] tabular-nums text-slate-400">
                {f.volume} filed
              </span>
            </div>
          ))}
        </div>
        <p className="mt-4 rounded-xl border border-line bg-soft p-4 text-[12.5px] leading-relaxed text-slate-600">
          <span className="font-semibold text-ink">Design registrations are the slow one</span>{" "}
          — 47 days, and two of ours are still provisional. Everything else fits
          inside a grant cycle.
        </p>
      </Card>

      {/* ── 11 · Where to go next ────────────────────────────── */}
      <Card title="Where to go next" sub="From IP to the rest of the support stack">
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            {
              href: "/incubator/support",
              title: "All support",
              body: "The full queue across four pillars.",
              icon: Scale,
            },
            {
              href: "/incubator/support/market",
              title: "Market support",
              body: "Get the product in front of a buyer.",
              icon: Users,
            },
            {
              href: "/incubator/resources/allocation",
              title: "Counsel capacity",
              body: "The legal slot line in the allocation ledger.",
              icon: CalendarClock,
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
