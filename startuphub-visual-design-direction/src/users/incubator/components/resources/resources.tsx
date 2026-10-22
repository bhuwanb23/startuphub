"use client";

import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  Boxes,
  Cpu,
  Search,
  Sparkles,
  Users,
} from "lucide-react";
import Link from "next/link";
import { Badge, Card, PageHeader, Progress, Stat } from "@/components/app/widgets";
import { cn } from "@/lib/utils";
import {
  CATEGORY_COVERAGE,
  CREDIT_LINES,
  INVENTORY,
  PROVIDERS,
  RESOURCE_KPIS,
  RESOURCE_REQUESTS,
  type ResourceCategory,
} from "../../constants/resources-data";

const CATEGORIES: (ResourceCategory | "All")[] = [
  "All",
  "Compute",
  "Cloud credits",
  "Lab & hardware",
  "Legal & IP",
  "Workspace",
  "Data",
];

export function Resources() {
  const [category, setCategory] = useState<ResourceCategory | "All">("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return INVENTORY.filter((r) => {
      if (category !== "All" && r.category !== category) return false;
      if (!q) return true;
      return [r.name, r.pool, r.category].join(" ").toLowerCase().includes(q);
    });
  }, [category, query]);

  const openRequests = RESOURCE_REQUESTS.filter(
    (r) => r.status === "Pending" || r.status === "Partially approved",
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Resource Inventory"
        desc="Everything your startups can draw from — inventory, requests, allocation and utilisation."
        actions={
          <button className="inline-flex items-center gap-1.5 rounded-[10px] bg-accent px-4 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-accent-deep">
            <Boxes className="h-3.5 w-3.5" /> Allocate resource
          </button>
        }
      />

      {/* ── 01 · KPIs ────────────────────────────────────────── */}
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        {RESOURCE_KPIS.map((k) => (
          <Stat
            key={k.label}
            icon={
              k.tone === "good"
                ? Cpu
                : k.tone === "warn"
                  ? Users
                  : Boxes
            }
            label={k.label}
            value={k.value}
            delta={k.note}
            tone={k.tone === "accent" ? "good" : k.tone}
          />
        ))}
      </div>

      {/* ── 02 · Filters ─────────────────────────────────────── */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={cn(
                "rounded-[10px] border px-3.5 py-2 text-[12.5px] font-medium transition-colors",
                category === c
                  ? "border-ink bg-ink text-white"
                  : "border-line bg-white text-slate-500 hover:border-slate-300 hover:text-ink",
              )}
            >
              {c}
              <span className="ml-1.5 text-[11px] opacity-60">
                {c === "All"
                  ? INVENTORY.length
                  : INVENTORY.filter((r) => r.category === c).length}
              </span>
            </button>
          ))}
        </div>
        <div className="relative sm:ml-auto sm:w-[230px]">
          <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search asset, pool or category"
            aria-label="Search resources"
            className="h-11 w-full rounded-[10px] border border-line bg-white pl-10 pr-4 text-sm text-ink placeholder:text-slate-400 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/15"
          />
        </div>
      </div>

      {/* ── 03 · Inventory ───────────────────────────────────── */}
      <Card
        title={`Inventory · ${filtered.length}`}
        sub="Every asset in the pool, with utilisation and cost basis"
        action={
          <Link
            href="/incubator/resources/utilization"
            className="flex items-center gap-1 text-[12.5px] font-semibold text-accent"
          >
            Utilisation <ArrowUpRight className="h-3 w-3" />
          </Link>
        }
        pad={false}
      >
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center gap-2 px-5 py-14 text-center">
            <Boxes className="h-6 w-6 text-slate-300" />
            <p className="text-[13px] text-slate-400">No assets match that filter.</p>
          </div>
        ) : (
          <ul className="divide-y divide-line">
            {filtered.map((r) => (
              <li key={r.id} className="px-5 py-4 transition-colors hover:bg-soft">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-[13.5px] font-semibold text-ink">{r.name}</p>
                      <Badge tone={r.tone}>{r.used}% used</Badge>
                    </div>
                    <p className="mt-0.5 text-[11.5px] text-slate-400">
                      {r.category} · {r.pool} · {r.capacity}
                    </p>
                  </div>
                  <span className="shrink-0 text-right font-mono text-[10.5px] text-slate-400">
                    {r.cost}
                  </span>
                </div>
                <Progress
                  value={r.used}
                  tone={r.tone === "warn" ? "warn" : "accent"}
                  className="mt-2.5"
                />
                <p className="mt-1.5 text-[11px] text-slate-400">{r.note}</p>
              </li>
            ))}
          </ul>
        )}
      </Card>

      {/* ── 04 · Category coverage ────────────────────────────── */}
      <div className="grid gap-5 lg:grid-cols-2">
        <Card
          title="Category coverage"
          sub="What each category of resource the pool holds"
          action={<Badge tone="accent">{CATEGORY_COVERAGE.length} categories</Badge>}
        >
          <div className="space-y-3.5">
            {CATEGORY_COVERAGE.map((c) => (
              <div key={c.category} className="flex items-center gap-3">
                <span className="w-[112px] shrink-0 truncate text-[12.5px] font-medium text-slate-600">
                  {c.category}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[11.5px] text-slate-400">{c.note}</p>
                </div>
                <span className="w-16 shrink-0 text-right text-[12px] tabular-nums text-slate-500">
                  <b className="font-semibold text-ink">{c.supplied}</b> asset
                </span>
                <Badge tone={c.tone}>
                  {c.supplied > 1 ? "Covered" : "Single"}
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        {/* ── 05 · Providers ────────────────────────────────── */}
        <Card
          title="Providers behind the pool"
          sub="Who supplies what, and how reliably"
          action={
            <Link
              href="/incubator/resources/requests"
              className="flex items-center gap-1 text-[12.5px] font-semibold text-accent"
            >
              Requests <ArrowUpRight className="h-3 w-3" />
            </Link>
          }
          pad={false}
        >
          <ul className="divide-y divide-line">
            {PROVIDERS.map((p) => (
              <li
                key={p.name}
                className="flex flex-wrap items-center gap-4 px-5 py-4 transition-colors hover:bg-soft"
              >
                <span className="min-w-[150px] flex-1">
                  <span className="block text-[13px] font-semibold text-ink">
                    {p.name}
                  </span>
                  <span className="block text-[11px] text-slate-400">
                    {p.kind} · {p.note}
                  </span>
                </span>
                <span className="w-20 shrink-0 text-right text-[12px] tabular-nums text-slate-500">
                  <b className="font-semibold text-ink">{p.items}</b> assets
                </span>
                <span className="w-16 shrink-0 text-right text-[12px] font-semibold tabular-nums text-ink">
                  {p.reliability}%
                </span>
                <Badge tone={p.tone}>
                  {p.reliability >= 90
                    ? "Reliable"
                    : p.reliability >= 80
                      ? "Steady"
                      : "Watch"}
                </Badge>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* ── 06 · Allocation snapshot ──────────────────────────── */}
      <Card
        title="Allocation snapshot"
        sub="How the committed budget sits right now"
        action={
          <Link
            href="/incubator/resources/allocation"
            className="flex items-center gap-1 text-[12.5px] font-semibold text-accent"
          >
            Full ledger <ArrowUpRight className="h-3 w-3" />
          </Link>
        }
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
                <span className="min-w-[170px] flex-1">
                  <span className="block text-[13px] font-semibold text-ink">
                    {c.label}
                  </span>
                  <span className="block text-[11px] text-slate-400">
                    {c.provider} · {c.allocatedTo}
                  </span>
                </span>
                <div className="flex w-[140px] shrink-0 items-center gap-2.5">
                  <Progress
                    value={pct}
                    tone={pct > 80 ? "warn" : pct > 40 ? "accent" : "good"}
                    className="flex-1"
                  />
                  <span className="w-12 text-right text-[11.5px] font-semibold tabular-nums text-ink">
                    {c.used}/{c.granted}
                  </span>
                </div>
                <span
                  className={cn(
                    "w-24 shrink-0 text-right font-mono text-[10.5px]",
                    c.daysLeft < 60 ? "text-red-600" : c.daysLeft < 90 ? "text-amber-dim" : "text-slate-400",
                  )}
                >
                  {c.daysLeft}d left
                </span>
              </li>
            );
          })}
        </ul>
      </Card>

      {/* ── 07 · Cost basis ──────────────────────────────────── */}
      <Card
        title="Cost basis"
        sub="What each asset actually costs the programme"
        action={<Badge tone="accent">₹32 L cap</Badge>}
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { l: "Grant funded", v: "₹0", n: "GPU cluster and wet lab", tone: "good" as const },
            { l: "Partner funded", v: "₹0", n: "CIED benches and ISRO data", tone: "good" as const },
            { l: "Billed at cost", v: "₹4.2 L", n: "KSM electronics and licences", tone: "accent" as const },
            { l: "Programme overhead", v: "₹2.8 L", n: "Facilities, partner fees", tone: "default" as const },
          ].map((x) => (
            <div
              key={x.l}
              className="rounded-xl border border-line p-4 transition-colors hover:border-accent/25"
            >
              <p className="text-[11.5px] font-semibold uppercase tracking-[0.1em] text-slate-400">
                {x.l}
              </p>
              <p className="mt-2 text-[22px] font-semibold leading-none tracking-[-0.03em] text-ink tabular-nums">
                {x.v}
              </p>
              <p className="mt-2 text-[11.5px] leading-relaxed text-slate-500">{x.n}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* ── 08 · Open requests ────────────────────────────────── */}
      <Card
        title="Open requests"
        sub="What is in flight against the pool"
        action={
          <Badge tone="warn">{openRequests.length} awaiting approval</Badge>
        }
        pad={false}
      >
        <ul className="divide-y divide-line">
          {RESOURCE_REQUESTS.filter(
            (r) => r.status === "Pending" || r.status === "Partially approved",
          ).map((r) => (
            <li
              key={r.id}
              className="flex flex-wrap items-center gap-4 px-5 py-4 transition-colors hover:bg-soft"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent">
                <Boxes className="h-4 w-4" />
              </span>
              <div className="min-w-[190px] flex-1">
                <p className="text-[13.5px] font-semibold text-ink">{r.item}</p>
                <p className="mt-0.5 text-[11.5px] text-slate-400">
                  {r.startup} · {r.qty} · submitted {r.submitted}
                </p>
              </div>
              <span className="hidden min-w-[130px] text-[12px] text-slate-500 sm:block">
                {r.approver} · {r.sla}
              </span>
              <Badge tone={r.tone}>{r.status}</Badge>
            </li>
          ))}
        </ul>
        <Link
          href="/incubator/resources/requests"
          className="flex items-center gap-1 border-t border-line px-5 py-3.5 text-[12.5px] font-semibold text-accent hover:underline"
        >
          Open the full request queue →
        </Link>
      </Card>

      {/* ── 09 · Copilot insight ──────────────────────────────── */}
      <Card
        title="Copilot insight"
        sub="Where the pool is being wasted, and what to do about it"
        action={
          <span className="flex items-center gap-1.5 text-[12px] font-semibold text-accent">
            <Sparkles className="h-3.5 w-3.5" /> Live
          </span>
        }
      >
        <div className="rounded-xl bg-accent-mist p-5 text-[13.5px] leading-relaxed text-slate-600">
          <span className="font-semibold text-ink">
            Converting 2 wet-lab bench-hours per day into 8 additional GPU hours
          </span>{" "}
          would relieve the AI-block waitlist while keeping bio capacity. Net cost: ₹0
          — same providers, different quota.
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            href="/incubator/resources/allocation"
            className="inline-flex items-center gap-1.5 rounded-[10px] bg-accent px-4 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-accent-deep"
          >
            Apply rebalancing
          </Link>
          <Link
            href="/incubator/resources/utilization"
            className="inline-flex items-center gap-1.5 rounded-[10px] border border-line bg-white px-4 py-2.5 text-[13px] font-semibold text-ink transition-colors hover:bg-soft"
          >
            See utilisation
          </Link>
        </div>
      </Card>
    </div>
  );
}
