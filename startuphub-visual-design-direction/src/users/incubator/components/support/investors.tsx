"use client";

import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  Handshake,
  Radio,
  ShieldAlert,
  Sparkles,
  TrendingUp,
  UserRoundCheck,
  Users,
} from "lucide-react";
import Link from "next/link";
import { Badge, Card, PageHeader, Progress, Stat } from "@/components/app/widgets";
import { cn } from "@/lib/utils";
import { investors } from "@/views/explore/investors/constants/investors";
import {
  INTRO_CAPACITY,
  INTRO_FUNNEL,
  INTRO_PIPELINE,
  INVESTOR_DEMAND,
  INVESTOR_MATCHES,
  RELATIONSHIPS,
  SECTOR_FIT,
} from "../../constants/support-data";

export function InvestorConnections() {
  const [investor, setInvestor] = useState<string>("All");

  const names = useMemo(
    () => ["All", ...investors.map((i) => i.name)],
    [],
  );

  const matches = useMemo(
    () =>
      investor === "All"
        ? INVESTOR_MATCHES
        : INVESTOR_MATCHES.filter((m) => m.investor === investor),
    [investor],
  );

  const warm = INVESTOR_MATCHES.filter((m) => m.warm === "Warm").length;
  const delivered = INTRO_FUNNEL.delivered;
  const conversion = Math.round((INTRO_FUNNEL.termSheet / INTRO_FUNNEL.requested) * 100);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Investor Connections"
        desc="The investor network, who it fits, and how the introductions are actually converting."
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
          icon={Users}
          label="Investor network"
          value={String(investors.length)}
          delta="funds, angels and strategics"
          tone="good"
        />
        <Stat
          icon={Handshake}
          label="Intros delivered"
          value={String(delivered)}
          delta={`of ${INTRO_FUNNEL.requested} requested`}
          tone="good"
        />
        <Stat
          icon={UserRoundCheck}
          label="Warm matches"
          value={String(warm)}
          delta={`of ${INVESTOR_MATCHES.length} live matches`}
          tone="good"
        />
        <Stat
          icon={TrendingUp}
          label="Term-sheet rate"
          value={`${conversion}%`}
          delta="requested to term sheet"
          tone="warn"
        />
      </div>

      {/* ── 02 · Investor network ────────────────────────────── */}
      <Card
        title="Investor network"
        sub="Who the programme can put in front of a founder"
        action={<Badge tone="accent">{investors.length} investors</Badge>}
        pad={false}
      >
        <ul className="divide-y divide-line">
          {investors.map((i) => {
            const rel = RELATIONSHIPS.find((r) => r.investorSlug === i.slug);
            return (
              <li
                key={i.slug}
                className="flex flex-wrap items-center gap-4 px-5 py-4 transition-colors hover:bg-soft"
              >
                <span
                  className={cn(
                    "grid h-9 w-9 shrink-0 place-items-center rounded-lg text-[11px] font-bold",
                    rel?.tone === "good"
                      ? "bg-rise-tint text-rise"
                      : rel?.tone === "warn"
                        ? "bg-amber-tint text-amber-dim"
                        : "bg-accent-soft text-accent",
                  )}
                >
                  {i.initials}
                </span>
                <div className="min-w-[180px] flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-[13.5px] font-semibold text-ink">{i.name}</p>
                    <Badge tone={rel?.tone ?? "default"}>{i.type}</Badge>
                  </div>
                  <p className="mt-0.5 text-[11.5px] text-slate-400">
                    {i.stages.join(", ")} · {i.sectors.slice(0, 3).join(", ")} ·{" "}
                    {i.ticket}
                  </p>
                </div>
                <span className="hidden min-w-[180px] text-[12px] text-slate-500 lg:block">
                  {i.geography} · {i.portfolio} companies
                </span>
                <div className="w-24 shrink-0">
                  <Progress
                    value={rel?.strength ?? 0}
                    tone={
                      rel?.tone === "good"
                        ? "good"
                        : rel?.tone === "warn"
                          ? "warn"
                          : "accent"
                    }
                  />
                </div>
                <span className="w-10 text-right text-[12px] font-semibold tabular-nums text-ink">
                  {rel?.strength ?? 0}%
                </span>
              </li>
            );
          })}
        </ul>
      </Card>

      {/* ── 03 · Matched investors ───────────────────────────── */}
      <Card
        title="Matched investors"
        sub="Every live match, with how warm it is"
        action={<Badge tone="accent">{INVESTOR_MATCHES.length} matches</Badge>}
        pad={false}
      >
        <ul className="divide-y divide-line">
          {matches.map((m) => (
            <li
              key={m.id}
              className="flex flex-col gap-3 px-5 py-4 transition-colors hover:bg-soft lg:flex-row lg:items-center lg:gap-4"
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
                  <Badge tone={m.tone}>{m.warm}</Badge>
                </div>
                <p className="mt-0.5 text-[11.5px] text-slate-400">
                  {m.investor} · {m.stage}
                </p>
              </div>
              <span className="hidden min-w-[220px] text-[12px] text-slate-500 lg:block">
                {m.note}
              </span>
              <div className="w-24 shrink-0">
                <Progress
                  value={m.score}
                  tone={m.tone === "good" ? "good" : m.tone === "warn" ? "warn" : "accent"}
                />
              </div>
              <span className="w-10 text-right text-[12.5px] font-semibold tabular-nums text-ink">
                {m.score}
              </span>
            </li>
          ))}
        </ul>
      </Card>

      {/* ── 04 · Investor filter ─────────────────────────────── */}
      <div className="flex flex-wrap gap-2">
        {names.map((n) => (
          <button
            key={n}
            onClick={() => setInvestor(n)}
            className={cn(
              "rounded-[10px] border px-3.5 py-2 text-[12.5px] font-medium transition-colors",
              investor === n
                ? "border-ink bg-ink text-white"
                : "border-line bg-white text-slate-500 hover:border-slate-300 hover:text-ink",
            )}
          >
            {n}
            <span className="ml-1.5 text-[11px] opacity-60">
              {n === "All"
                ? INVESTOR_MATCHES.length
                : INVESTOR_MATCHES.filter((m) => m.investor === n).length}
            </span>
          </button>
        ))}
      </div>

      {/* ── 05 · Intro pipeline ──────────────────────────────── */}
      <Card
        title="Introduction pipeline"
        sub="From request to term sheet, one view"
        action={<Badge tone="warn">1 declined</Badge>}
        pad={false}
      >
        <ul className="divide-y divide-line">
          {INTRO_PIPELINE.map((p) => (
            <li
              key={p.id}
              className="flex flex-wrap items-center gap-4 px-5 py-4 transition-colors hover:bg-soft"
            >
              <span
                className={cn(
                  "grid h-9 w-9 shrink-0 place-items-center rounded-lg",
                  p.tone === "good"
                    ? "bg-rise-tint text-rise"
                    : p.tone === "warn"
                      ? "bg-amber-tint text-amber-dim"
                      : p.tone === "bad"
                        ? "bg-red-50 text-red-600"
                        : "bg-accent-soft text-accent",
                )}
              >
                <Radio className="h-4 w-4" />
              </span>
              <div className="min-w-[190px] flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-[13.5px] font-semibold text-ink">{p.startup}</p>
                  <Badge tone={p.tone}>{p.status}</Badge>
                </div>
                <p className="mt-0.5 text-[11.5px] text-slate-400">
                  {p.investor} · requested {p.requested}
                </p>
              </div>
              <span className="hidden min-w-[200px] text-[12px] text-slate-500 lg:block">
                {p.note}
              </span>
              <span className="w-20 shrink-0 text-right text-[12px] tabular-nums text-slate-500">
                <b className="font-semibold text-ink">{p.meetings}</b> meetings
              </span>
            </li>
          ))}
        </ul>
      </Card>

      {/* ── 06 · Conversion funnel ───────────────────────────── */}
      <Card
        title="Conversion funnel"
        sub="Where introductions are lost"
        action={<Badge tone="accent">{conversion}% to term sheet</Badge>}
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { l: "Intros requested", v: INTRO_FUNNEL.requested, note: "From the portfolio", tone: "accent" as const },
            { l: "Delivered", v: INTRO_FUNNEL.delivered, note: "A meeting was actually set up", tone: "accent" as const },
            { l: "Met", v: INTRO_FUNNEL.met, note: "The founder and the investor talked", tone: "good" as const },
            { l: "Term sheet", v: INTRO_FUNNEL.termSheet, note: "The round moved forward", tone: "good" as const },
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
                value={(x.v / INTRO_FUNNEL.requested) * 100}
                tone={x.tone}
                className="mt-3"
              />
              <p className="mt-2.5 text-[11.5px] text-slate-400">{x.note}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 rounded-xl border border-line bg-soft p-4 text-[12.5px] leading-relaxed text-slate-600">
          <span className="font-semibold text-ink">The leak is at delivery, not at meeting.</span>{" "}
          Fourteen requests never became a meeting — mostly because the data room
          was not ready on the day we asked.
        </p>
      </Card>

      {/* ── 07 · Investor demand ─────────────────────────────── */}
      <Card
        title="What investors are asking for"
        sub="Stage appetite across the network"
        action={<Badge tone="accent">{INVESTOR_DEMAND.length} stages</Badge>}
        pad={false}
      >
        <ul className="divide-y divide-line">
          {INVESTOR_DEMAND.map((d) => (
            <li
              key={d.stage}
              className="flex flex-wrap items-center gap-4 px-5 py-4 transition-colors hover:bg-soft"
            >
              <span className="w-24 shrink-0 text-[12.5px] font-medium text-slate-600">
                {d.stage}
              </span>
              <div className="w-40 shrink-0">
                <Progress
                  value={d.interest}
                  tone={d.tone === "good" ? "good" : d.tone === "warn" ? "warn" : "accent"}
                />
              </div>
              <span className="w-10 text-right text-[12.5px] font-semibold tabular-nums text-ink">
                {d.interest}%
              </span>
              <span className="w-14 text-right text-[12px] tabular-nums text-slate-400">
                {d.count} investors
              </span>
              <span className="hidden min-w-[220px] flex-1 text-[12px] text-slate-500 lg:block">
                {d.note}
              </span>
            </li>
          ))}
        </ul>
      </Card>

      {/* ── 09 · Intro capacity ──────────────────────────────── */}
      <Card
        title="Introduction capacity"
        sub="How many intros the programme can actually make each month"
        action={<Badge tone="warn">March ran at 88%</Badge>}
        pad={false}
      >
        <ul className="divide-y divide-line">
          {INTRO_CAPACITY.map((c) => (
            <li
              key={c.month}
              className="flex flex-wrap items-center gap-4 px-5 py-4 transition-colors hover:bg-soft"
            >
              <span className="w-24 shrink-0 font-mono text-[11px] text-slate-400">
                {c.month}
              </span>
              <div className="w-40 shrink-0">
                <Progress
                  value={(c.used / c.capacity) * 100}
                  tone={c.tone === "good" ? "good" : c.tone === "warn" ? "warn" : "accent"}
                />
              </div>
              <span className="w-12 text-right text-[12px] font-semibold tabular-nums text-ink">
                {c.used}/{c.capacity}
              </span>
              <span className="hidden min-w-[220px] flex-1 text-[12px] text-slate-500 lg:block">
                {c.note}
              </span>
              <Badge tone={c.tone}>
                {c.used / c.capacity > 0.8 ? "Near limit" : "Headroom"}
              </Badge>
            </li>
          ))}
        </ul>
        <p className="border-t border-line px-5 py-3.5 text-[11.5px] text-slate-400">
          Capacity is 16 a month across the team. March ran at 88% — one more
          good month like that and the intro queue becomes the bottleneck.
        </p>
      </Card>

      {/* ── 10 · Sector fit ──────────────────────────────────── */}
      <Card
        title="Sector fit"
        sub="Where the network covers the portfolio, and where it does not"
        action={<Badge tone="bad">3 sectors uncovered</Badge>}
        pad={false}
      >
        <ul className="divide-y divide-line">
          {SECTOR_FIT.map((s) => (
            <li
              key={s.sector}
              className="flex flex-wrap items-center gap-4 px-5 py-4 transition-colors hover:bg-soft"
            >
              <span
                className={cn(
                  "grid h-9 w-9 shrink-0 place-items-center rounded-lg",
                  s.covered
                    ? "bg-rise-tint text-rise"
                    : "bg-red-50 text-red-600",
                )}
              >
                {s.covered ? (
                  <UserRoundCheck className="h-4 w-4" />
                ) : (
                  <ShieldAlert className="h-4 w-4" />
                )}
              </span>
              <span className="min-w-[140px] flex-1">
                <span className="block text-[13.5px] font-semibold text-ink">
                  {s.sector}
                </span>
                <span className="block text-[11.5px] text-slate-400">{s.note}</span>
              </span>
              <span className="w-20 shrink-0 text-right text-[12px] tabular-nums text-slate-500">
                <b className="font-semibold text-ink">{s.investors}</b> investors
              </span>
              <span className="w-20 shrink-0 text-right text-[12px] tabular-nums text-slate-500">
                <b className="font-semibold text-ink">{s.startups}</b> startups
              </span>
              <Badge tone={s.tone}>{s.covered ? "Covered" : "Gap"}</Badge>
            </li>
          ))}
        </ul>
      </Card>

      {/* ── 11 · Where to go next ────────────────────────────── */}
      <Card title="Where to go next" sub="From the network to the rest of the stack">
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            {
              href: "/incubator/support",
              title: "All support",
              body: "The full queue across four pillars.",
              icon: Users,
            },
            {
              href: "/incubator/support/funding",
              title: "Funding support",
              body: "The raises these matches will close.",
              icon: TrendingUp,
            },
            {
              href: "/incubator/support/market",
              title: "Market support",
              body: "Buyer interest is half of the story.",
              icon: Sparkles,
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
