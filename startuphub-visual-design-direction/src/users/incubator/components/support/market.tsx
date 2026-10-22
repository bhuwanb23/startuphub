"use client";

import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  Building2,
  Globe,
  Handshake,
  Lightbulb,
  Route,
  Target,
} from "lucide-react";
import Link from "next/link";
import { Badge, Card, PageHeader, Progress, Stat } from "@/components/app/widgets";
import { cn } from "@/lib/utils";
import {
  CORPORATE_PILOTS,
  GOV_OPPORTUNITIES,
  MARKET_BLOCKERS,
  MARKET_COVERAGE,
  MARKET_INTROS,
  MARKET_READINESS,
  PILOT_FUNNEL,
  SECTOR_DEMAND,
} from "../../constants/support-data";

export function MarketSupport() {
  const [view, setView] = useState<"readiness" | "pilots">("readiness");

  const avgReadiness = Math.round(
    MARKET_READINESS.reduce((s, m) => s + m.readiness, 0) /
      MARKET_READINESS.length,
  );
  const signed = MARKET_INTROS.filter((m) => m.status === "Signed").length;
  const running = CORPORATE_PILOTS.filter((p) => p.stage !== "Proposed").length;
  const govMatches = GOV_OPPORTUNITIES.reduce((s, g) => s + g.matches, 0);

  const visible = useMemo(
    () =>
      view === "readiness"
        ? MARKET_READINESS.map((m) => ({
            key: m.startupSlug,
            startup: m.startup,
            detail: m.market,
            metric: m.firstRevenue,
            blocker: m.blocker,
            readiness: m.readiness,
            tone: m.tone,
          }))
        : CORPORATE_PILOTS.map((p) => ({
            key: p.id,
            startup: p.startup,
            detail: p.objective,
            metric: p.corporate,
            blocker: p.window,
            readiness: p.stage === "Scaled" ? 100 : p.stage === "Pilot" ? 65 : p.stage === "Negotiation" ? 40 : 20,
            tone: p.tone,
          })),
    [view],
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Market Support"
        desc="Getting products in front of buyers — pilots, procurement and the introductions behind them."
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
          icon={Target}
          label="Average readiness"
          value={`${avgReadiness}%`}
          delta="across the tracked portfolio"
          tone="good"
        />
        <Stat
          icon={Building2}
          label="Corporate pilots"
          value={String(running)}
          delta="live or in negotiation"
          tone="good"
        />
        <Stat
          icon={Handshake}
          label="Intros made"
          value={String(MARKET_INTROS.length)}
          delta={`${signed} converted to a contract`}
          tone="good"
        />
        <Stat
          icon={Globe}
          label="Gov opportunities"
          value={String(GOV_OPPORTUNITIES.length)}
          delta={`${govMatches} portfolio matches`}
          tone="warn"
        />
      </div>

      {/* ── 02 · View toggle ─────────────────────────────────── */}
      <div className="flex flex-wrap gap-2">
        {(
          [
            { key: "readiness", label: "Go-to-market readiness" },
            { key: "pilots", label: "Corporate pilots" },
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

      {/* ── 03 · Readiness / pilots list ─────────────────────── */}
      <Card
        title={view === "readiness" ? "Go-to-market readiness" : "Corporate pilots"}
        sub={
          view === "readiness"
            ? "Every startup, the market it is going after and what is in the way"
            : "Pilots the programme brokered, and where each one stands"
        }
        action={
          <Badge tone="accent">
            {view === "readiness"
              ? `${MARKET_READINESS.length} startups`
              : `${CORPORATE_PILOTS.length} pilots`}
          </Badge>
        }
        pad={false}
      >
        <ul className="divide-y divide-line">
          {visible.map((v) => (
            <li
              key={v.key}
              className="flex flex-col gap-3 px-5 py-4 transition-colors hover:bg-soft lg:flex-row lg:items-center lg:gap-4"
            >
              <div className="min-w-[190px] flex-1">
                <p className="text-[13.5px] font-semibold text-ink">{v.startup}</p>
                <p className="mt-0.5 text-[11.5px] text-slate-400">{v.detail}</p>
              </div>
              <span className="hidden min-w-[190px] text-[12px] text-slate-500 lg:block">
                {v.blocker}
              </span>
              <span className="w-24 shrink-0 text-right text-[12px] tabular-nums text-slate-500">
                {v.metric}
              </span>
              <div className="w-28 shrink-0">
                <Progress
                  value={v.readiness}
                  tone={v.tone === "bad" ? "bad" : v.tone === "warn" ? "warn" : "good"}
                />
              </div>
              <span className="w-10 text-right text-[12px] font-semibold tabular-nums text-ink">
                {v.readiness}%
              </span>
            </li>
          ))}
        </ul>
      </Card>

      {/* ── 04 · Market blockers ─────────────────────────────── */}
      <Card
        title="Market blockers"
        sub="What stands between a startup and its first customer"
        action={<Badge tone="bad">{MARKET_BLOCKERS.length} blockers</Badge>}
        pad={false}
      >
        <ul className="divide-y divide-line">
          {MARKET_BLOCKERS.map((b) => (
            <li
              key={b.blocker}
              className="flex flex-col gap-3 px-5 py-4 transition-colors hover:bg-soft sm:flex-row sm:items-center sm:gap-4"
            >
              <span
                className={cn(
                  "grid h-9 w-9 shrink-0 place-items-center rounded-lg",
                  b.tone === "bad"
                    ? "bg-red-50 text-red-600"
                    : b.tone === "warn"
                      ? "bg-amber-tint text-amber-dim"
                      : "bg-soft text-slate-400",
                )}
              >
                <Route className="h-4 w-4" />
              </span>
              <div className="min-w-[200px] flex-1">
                <p className="text-[13.5px] font-semibold text-ink">{b.blocker}</p>
                <p className="mt-0.5 text-[11.5px] text-slate-400">{b.note}</p>
              </div>
              <span className="min-w-[180px] text-[12px] text-slate-500">{b.fix}</span>
              <span className="w-24 shrink-0 text-right text-[12px] tabular-nums text-slate-500">
                <b className="font-semibold text-ink">{b.startups}</b> startups
              </span>
              <span className="w-20 shrink-0 text-right font-mono text-[10.5px] text-slate-400">
                {b.cost}
              </span>
            </li>
          ))}
        </ul>
      </Card>

      {/* ── 05 · Introductions made ──────────────────────────── */}
      <Card
        title="Introductions made"
        sub="Every corporate and procurement intro the programme ran"
        action={<Badge tone="accent">{MARKET_INTROS.length} intros</Badge>}
        pad={false}
      >
        <ul className="divide-y divide-line">
          {MARKET_INTROS.map((m) => (
            <li
              key={m.id}
              className="flex flex-wrap items-center gap-4 px-5 py-4 transition-colors hover:bg-soft"
            >
              <span
                className={cn(
                  "grid h-9 w-9 shrink-0 place-items-center rounded-lg",
                  m.tone === "good"
                    ? "bg-rise-tint text-rise"
                    : m.tone === "warn"
                      ? "bg-amber-tint text-amber-dim"
                      : "bg-accent-soft text-accent",
                )}
              >
                <Handshake className="h-4 w-4" />
              </span>
              <div className="min-w-[190px] flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-[13.5px] font-semibold text-ink">{m.startup}</p>
                  <Badge tone={m.tone}>{m.status}</Badge>
                </div>
                <p className="mt-0.5 text-[11.5px] text-slate-400">
                  {m.partner} · {m.type}
                </p>
              </div>
              <span className="hidden min-w-[200px] text-[12px] text-slate-500 lg:block">
                {m.note}
              </span>
              <span className="w-20 shrink-0 text-right text-[12.5px] font-semibold text-ink">
                {m.value}
              </span>
            </li>
          ))}
        </ul>
      </Card>

      {/* ── 06 · Government opportunities ─────────────────────── */}
      <Card
        title="Government & procurement opportunities"
        sub="Public schemes and procurements the portfolio can reach"
        action={<Badge tone="warn">{govMatches} matches</Badge>}
        pad={false}
      >
        <ul className="divide-y divide-line">
          {GOV_OPPORTUNITIES.map((g) => (
            <li
              key={g.id}
              className="flex flex-wrap items-center gap-4 px-5 py-4 transition-colors hover:bg-soft"
            >
              <span
                className={cn(
                  "grid h-9 w-9 shrink-0 place-items-center rounded-lg",
                  g.tone === "good"
                    ? "bg-rise-tint text-rise"
                    : g.tone === "warn"
                      ? "bg-amber-tint text-amber-dim"
                      : g.tone === "bad"
                        ? "bg-red-50 text-red-600"
                        : "bg-accent-soft text-accent",
                )}
              >
                <Globe className="h-4 w-4" />
              </span>
              <div className="min-w-[210px] flex-1">
                <p className="text-[13.5px] font-semibold text-ink">{g.name}</p>
                <p className="mt-0.5 text-[11.5px] text-slate-400">
                  {g.provider} · {g.amount} · closes {g.deadline}
                </p>
              </div>
              <span className="hidden min-w-[200px] text-[12px] text-slate-500 lg:block">
                {g.note}
              </span>
              <span className="text-[12px] tabular-nums text-slate-500">
                <b className="font-semibold text-ink">{g.matches}</b> match
                {g.matches === 1 ? "" : "es"}
              </span>
              <Badge tone={g.tone}>
                {g.matches === 0 ? "No fit" : "Open"}
              </Badge>
            </li>
          ))}
        </ul>
      </Card>

      {/* ── 07 · Sector demand ───────────────────────────────── */}
      <Card
        title="Sector demand"
        sub="Where buyer and investor interest actually is"
        action={<Badge tone="accent">{SECTOR_DEMAND.length} sectors</Badge>}
        pad={false}
      >
        <ul className="divide-y divide-line">
          {SECTOR_DEMAND.map((s) => (
            <li
              key={s.sector}
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
                <Lightbulb className="h-4 w-4" />
              </span>
              <span className="min-w-[140px] flex-1">
                <span className="block text-[13.5px] font-semibold text-ink">
                  {s.sector}
                </span>
                <span className="block text-[11.5px] text-slate-400">{s.note}</span>
              </span>
              <span className="w-20 shrink-0 text-right text-[12px] tabular-nums text-slate-500">
                <b className="font-semibold text-ink">{s.startups}</b> startups
              </span>
              <div className="w-28 shrink-0">
                <Progress
                  value={s.interest}
                  tone={s.tone === "good" ? "good" : s.tone === "warn" ? "warn" : "accent"}
                />
              </div>
              <span className="w-10 text-right text-[12px] font-semibold tabular-nums text-ink">
                {s.interest}
              </span>
            </li>
          ))}
        </ul>
      </Card>

      {/* ── 09 · Pilot conversion ────────────────────────────── */}
      <Card
        title="Pilot conversion"
        sub="From a proposed pilot to a signed contract"
        action={
          <Badge tone="warn">
            {Math.round((PILOT_FUNNEL.contract / PILOT_FUNNEL.proposed) * 100)}% convert
          </Badge>
        }
      >
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { l: "Proposed", v: PILOT_FUNNEL.proposed, note: "An intro has been made", tone: "accent" as const },
            { l: "In pilot", v: PILOT_FUNNEL.pilot, note: "Running against a KPI", tone: "accent" as const },
            { l: "Signed", v: PILOT_FUNNEL.contract, note: "A commercial contract", tone: "good" as const },
          ].map((x) => (
            <div
              key={x.l}
              className="rounded-xl border border-line p-4 transition-colors hover:border-accent/25"
            >
              <p className="text-[12px] font-medium text-slate-500">{x.l}</p>
              <p className="mt-2 text-[26px] font-semibold leading-none tracking-[-0.03em] text-ink tabular-nums">
                {x.v}
              </p>
              <Progress
                value={(x.v / PILOT_FUNNEL.proposed) * 100}
                tone={x.tone}
                className="mt-3"
              />
              <p className="mt-2.5 text-[11.5px] text-slate-400">{x.note}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 rounded-xl border border-line bg-soft p-4 text-[12.5px] leading-relaxed text-slate-600">
          <span className="font-semibold text-ink">One pilot in six becomes a contract.</span>{" "}
          Both losses were a missing success metric agreed before the pilot
          started — not a product problem.
        </p>
      </Card>

      {/* ── 10 · Market coverage ─────────────────────────────── */}
      <Card
        title="Market coverage"
        sub="Where the portfolio is going, and how ready each market is"
        action={<Badge tone="accent">{MARKET_COVERAGE.length} markets</Badge>}
        pad={false}
      >
        <ul className="divide-y divide-line">
          {MARKET_COVERAGE.map((m) => (
            <li
              key={m.market}
              className="flex flex-wrap items-center gap-4 px-5 py-4 transition-colors hover:bg-soft"
            >
              <span className="min-w-[160px] flex-1">
                <span className="block text-[13.5px] font-semibold text-ink">
                  {m.market}
                </span>
                <span className="block text-[11.5px] text-slate-400">{m.note}</span>
              </span>
              <span className="w-16 shrink-0 text-right text-[12px] tabular-nums text-slate-500">
                <b className="font-semibold text-ink">{m.startups}</b> startups
              </span>
              <div className="w-32 shrink-0">
                <Progress
                  value={m.readiness}
                  tone={m.tone === "good" ? "good" : m.tone === "warn" ? "warn" : "accent"}
                />
              </div>
              <span className="w-12 text-right text-[12px] font-semibold tabular-nums text-ink">
                {m.readiness}%
              </span>
              <Badge tone={m.tone}>
                {m.readiness >= 70 ? "Ready" : m.readiness >= 60 ? "Building" : "Early"}
              </Badge>
            </li>
          ))}
        </ul>
      </Card>

      {/* ── 11 · Where to go next ────────────────────────────── */}
      <Card title="Where to go next" sub="From market access to the rest of the stack">
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            {
              href: "/incubator/support",
              title: "All support",
              body: "The full queue across four pillars.",
              icon: Handshake,
            },
            {
              href: "/incubator/support/investors",
              title: "Investor connections",
              body: "Buyer interest is only half of the raise.",
              icon: Building2,
            },
            {
              href: "/incubator/support/funding",
              title: "Funding support",
              body: "Grant routes the market path depends on.",
              icon: Target,
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
