"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  CheckCircle2,
  Clock,
  Coins,
  Cpu,
  Search,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { Badge, Card, PageHeader, Progress, Stat } from "@/components/app/widgets";
import {
  catalogueCost,
  costBandOf,
  costBands,
  creditsRemaining,
  expiringCredit,
  formatUsd,
  freeCatalogue,
  leadBandOf,
  leadBands,
  paidCatalogue,
  providers,
  rankedCatalogue,
  resourceBudget,
  resourceCategories,
  resourceCatalogue,
  type CostBand,
  type LeadBand,
  type ResourceCategory,
} from "@/users/startup/constants/resource-data";

const allCategories = "All categories";

export function Resources() {
  const [category, setCategory] = useState<string>(allCategories);
  const [cost, setCost] = useState<CostBand | "Any cost">("Any cost");
  const [lead, setLead] = useState<LeadBand | "Any lead time">("Any lead time");
  const [claimed, setClaimed] = useState<string[]>([]);

  const results = useMemo(
    () =>
      rankedCatalogue.filter((r) => {
        if (category !== allCategories && r.category !== category) return false;
        if (cost !== "Any cost" && costBandOf(r.cost) !== cost) return false;
        if (lead !== "Any lead time" && leadBandOf(r.leadDays) !== lead) return false;
        return true;
      }),
    [category, cost, lead],
  );

  const filtered =
    category !== allCategories || cost !== "Any cost" || lead !== "Any lead time";

  const toggleClaim = (id: string) =>
    setClaimed((prev) => (prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]));

  const remaining = resourceBudget.cap - resourceBudget.committed;
  const paidTotal = catalogueCost;

  return (
    <div className="space-y-5">
      <PageHeader
        title="Resource Discovery"
        desc="Every grant, licence, credit line and bench hour the ecosystem can put behind your next quarter — ranked by how well it actually fits."
        actions={
          <Link
            href="/founder/resources/matching"
            className="inline-flex items-center gap-1.5 rounded-[10px] border border-line bg-white px-4 py-2.5 text-[13px] font-semibold text-ink hover:border-slate-300"
          >
            How matching works
          </Link>
        }
      />

      {/* 1 — Headline metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat icon={Search} label="Resources in catalogue" value={String(resourceCatalogue.length)} delta={`${providers.length} providers`} tone="default" />
        <Stat icon={Coins} label="Budget left this quarter" value={`₹${remaining.toFixed(2)} L`} delta={`of ₹${resourceBudget.cap} L cap`} tone={remaining < 2 ? "warn" : "good"} />
        <Stat icon={Cpu} label="Credit left to burn" value={formatUsd(creditsRemaining)} delta={`${formatUsd(expiringCredit.granted - expiringCredit.used)} lapses in ${expiringCredit.daysLeft} days`} tone="warn" />
        <Stat icon={CheckCircle2} label="Claimed this session" value={String(claimed.length)} delta={`of ${resourceCatalogue.length} resources`} tone="default" />
      </div>

      {/* 2 — Filters */}
      <Card title="Filter the catalogue" action={<span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">live</span>}>
        <div className="space-y-3.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="w-24 shrink-0 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
              Category
            </span>
            {[allCategories, ...resourceCategories.map((c) => c.category)].map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(c)}
                className={`rounded-full px-3 py-1.5 text-[12px] font-semibold transition-colors ${
                  category === c
                    ? "bg-accent text-white"
                    : "border border-line bg-white text-slate-500 hover:border-slate-300 hover:text-ink"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="w-24 shrink-0 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
              Cost
            </span>
            {["Any cost", ...costBands].map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCost(c as CostBand | "Any cost")}
                className={`rounded-full px-3 py-1.5 text-[12px] font-semibold transition-colors ${
                  cost === c
                    ? "bg-accent text-white"
                    : "border border-line bg-white text-slate-500 hover:border-slate-300 hover:text-ink"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="w-24 shrink-0 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
              Lead time
            </span>
            {["Any lead time", ...leadBands].map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLead(l as LeadBand | "Any lead time")}
                className={`rounded-full px-3 py-1.5 text-[12px] font-semibold transition-colors ${
                  lead === l
                    ? "bg-accent text-white"
                    : "border border-line bg-white text-slate-500 hover:border-slate-300 hover:text-ink"
                }`}
              >
                {l}
              </button>
            ))}
          </div>
          <div className="flex items-center justify-between border-t border-line pt-3.5">
            <p className="text-[11.5px] text-slate-400">
              {filtered
                ? `Showing ${results.length} of ${resourceCatalogue.length} resources`
                : `${resourceCatalogue.length} resources ranked by fit`}
            </p>
            {filtered && (
              <button
                type="button"
                onClick={() => {
                  setCategory(allCategories);
                  setCost("Any cost");
                  setLead("Any lead time");
                }}
                className="text-[12px] font-semibold text-accent hover:underline"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>
      </Card>

      {/* 3 — Top matches */}
      <Card title="Your strongest matches" action={<Badge tone="accent">top 3</Badge>}>
        <div className="grid gap-3 md:grid-cols-3">
          {rankedCatalogue.slice(0, 3).map((r, i) => (
            <div key={r.id} className="rounded-xl border border-line p-4">
              <div className="flex items-center justify-between">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-accent-soft text-[11px] font-bold text-accent">
                  {i + 1}
                </span>
                <span className="text-[11px] font-semibold text-slate-400">{r.lead}</span>
              </div>
              <p className="mt-3 text-[13.5px] font-semibold text-ink">{r.title}</p>
              <p className="mt-0.5 text-[11.5px] text-slate-400">{r.provider}</p>
              <p className="mt-2 text-[12px] leading-relaxed text-slate-500">{r.note}</p>
              <div className="mt-3 flex items-center justify-between border-t border-line pt-3">
                <span className="text-[12px] font-semibold text-emerald-600">{r.value}</span>
                <span className="rounded-full bg-accent-soft px-2.5 py-1 text-[11px] font-bold text-accent">
                  {r.fit}% fit
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* 4 — Catalogue grid */}
      {results.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {results.map((r) => {
            const isClaimed = claimed.includes(r.id);
            return (
              <Card
                key={r.id}
                className="transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_32px_-18px_rgba(11,18,32,0.2)]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[14px] font-semibold text-ink">{r.title}</p>
                    <p className="mt-0.5 text-[11.5px] text-slate-400">{r.provider}</p>
                  </div>
                  <Badge tone={r.fit > 88 ? "accent" : r.fit > 70 ? "good" : "default"}>
                    {r.fit}% fit
                  </Badge>
                </div>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  <Badge>{r.category}</Badge>
                  <Badge tone={r.cost === 0 ? "good" : "default"}>{costBandOf(r.cost)}</Badge>
                  <Badge tone={r.leadDays <= 7 ? "accent" : "default"}>{r.lead}</Badge>
                </div>

                <p className="mt-3 text-[12.5px] leading-relaxed text-slate-500">{r.note}</p>

                <p className="mt-2 text-[11.5px] leading-relaxed text-slate-400">
                  <span className="font-semibold text-ink">Eligibility:</span> {r.eligibility}
                </p>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {r.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-md bg-slate-100 px-2 py-0.5 text-[10.5px] font-medium text-slate-500"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-line pt-3">
                  <span className="text-[11.5px] font-semibold text-emerald-600">{r.value}</span>
                  <button
                    type="button"
                    onClick={() => toggleClaim(r.id)}
                    className={`flex items-center gap-1 rounded-lg px-3 py-1.5 text-[12px] font-semibold transition-colors ${
                      isClaimed
                        ? "border border-emerald-200 bg-emerald-50 text-emerald-600"
                        : "border border-line text-ink hover:border-accent hover:text-accent"
                    }`}
                  >
                    {isClaimed ? (
                      <>
                        <CheckCircle2 className="h-3 w-3" /> Claimed
                      </>
                    ) : (
                      <>
                        Claim <ArrowUpRight className="h-3 w-3" />
                      </>
                    )}
                  </button>
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card className="border-dashed">
          <div className="flex flex-col items-center py-12 text-center">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-accent-soft text-accent">
              <Search className="h-5 w-5" />
            </span>
            <p className="mt-4 text-[15px] font-semibold text-ink">Nothing matches that combination</p>
            <p className="mt-1.5 max-w-sm text-[13px] leading-relaxed text-slate-500">
              Widen the lead time, or ask the Startup Copilot to find a provider outside the catalogue.
            </p>
            <button
              type="button"
              onClick={() => {
                setCategory(allCategories);
                setCost("Any cost");
                setLead("Any lead time");
              }}
              className="mt-5 rounded-[10px] bg-accent px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-accent-deep"
            >
              Clear filters
            </button>
          </div>
        </Card>
      )}

      {/* 5 — Providers */}
      <Card title="Providers behind the catalogue" action={<Badge tone="default">{providers.length} partners</Badge>} pad={false}>
        <ul className="divide-y divide-line">
          {providers.map((p) => (
            <li key={p.name} className="flex flex-wrap items-center gap-3 px-5 py-3.5">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
                <Building2 className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-semibold text-ink">{p.name}</p>
                <p className="mt-0.5 text-[11.5px] text-slate-400">{p.note}</p>
              </div>
              <span className="text-[11.5px] text-slate-400">{p.kind}</span>
              <span className="text-[11.5px] font-medium tabular-nums text-ink">
                {p.items} {p.items === 1 ? "resource" : "resources"}
              </span>
              <div className="w-24">
                <Progress value={p.reliability} tone={p.reliability >= 88 ? "good" : "accent"} />
              </div>
              <span className="w-8 text-right text-[12px] font-semibold tabular-nums text-ink">
                {p.reliability}
              </span>
            </li>
          ))}
        </ul>
      </Card>

      {/* 6 — Category coverage */}
      <Card title="What each category covers">
        <div className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
          {resourceCategories.map((c) => {
            const count = resourceCatalogue.filter((r) => r.category === c.category).length;
            return (
              <div key={c.category}>
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-[12.5px] font-medium text-slate-600">{c.category}</span>
                  <span className="text-[11.5px] text-slate-400">
                    <span className="font-semibold tabular-nums text-ink">{count}</span>{" "}
                    {count === 1 ? "resource" : "resources"}
                  </span>
                </div>
                <Progress
                  value={(count / resourceCatalogue.length) * 100}
                  tone={count === 0 ? "warn" : "accent"}
                  className="mt-2"
                />
                <p className="mt-1.5 text-[11.5px] leading-snug text-slate-400">{c.note}</p>
              </div>
            );
          })}
        </div>
      </Card>

      {/* 7 — What the catalogue costs */}
      <Card title="What the catalogue costs you" action={<Badge tone="good">{freeCatalogue.length} free of {resourceCatalogue.length}</Badge>}>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
              Grant-funded
            </p>
            <p className="mt-2 text-[24px] font-semibold leading-none tabular-nums text-ink">
              {freeCatalogue.length}
            </p>
            <p className="mt-1.5 text-[12px] leading-relaxed text-slate-500">
              of {resourceCatalogue.length} resources cost nothing — a grant, a pro bono slot or a
              free tier.
            </p>
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
              Paid, if you took them all
            </p>
            <p className="mt-2 text-[24px] font-semibold leading-none tabular-nums text-ink">
              ₹{paidTotal.toFixed(2)} L
            </p>
            <p className="mt-1.5 text-[12px] leading-relaxed text-slate-500">
              against a ₹{resourceBudget.cap} L quarterly cap — the paid half alone is{" "}
              {paidTotal > resourceBudget.cap ? "over" : "inside"} budget.
            </p>
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
              Still free to spend
            </p>
            <p className="mt-2 text-[24px] font-semibold leading-none tabular-nums text-ink">
              ₹{(resourceBudget.cap - resourceBudget.committed).toFixed(2)} L
            </p>
            <p className="mt-1.5 text-[12px] leading-relaxed text-slate-500">
              of the {resourceBudget.period} cap, before a single new claim.
            </p>
          </div>
        </div>
        <p className="mt-4 text-[12px] leading-relaxed text-slate-500">
          The {paidCatalogue.length} paid resources worth having are{" "}
          {paidCatalogue.map((r) => r.title).join(", ")}. Everything else in the
          catalogue is free if you claim it in time.
        </p>
      </Card>

      {/* 8 — Copilot */}
      <Card title="Copilot recommendation">
        <div className="flex items-start gap-3 rounded-xl bg-accent-mist p-4">
          <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
          <div>
            <p className="text-[13px] font-semibold text-ink">
              {formatUsd(expiringCredit.granted - expiringCredit.used)} of your {expiringCredit.label.toLowerCase()}{" "}
              lapses in {expiringCredit.daysLeft} days — release the idle GPU hours to the training pool or
              lose them.
            </p>
            <p className="mt-1 text-[12px] leading-relaxed text-slate-600">
              The allocation screen has the reallocation queued. It is a ₹0 move that saves the entire
              unused balance on the line you have already committed to.
            </p>
          </div>
        </div>
      </Card>

      {/* 9 — Where to go next */}
      <Card title="Where to go next">
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            {
              label: "Resource Matching",
              href: "/founder/resources/matching",
              body: "Set the need, the deadline and the constraint, then watch the fit score move.",
            },
            {
              label: "Resource Requests",
              href: "/founder/resources/requests",
              body: "Raise a request, track who approves it and how long it takes.",
            },
            {
              label: "Resource Allocation",
              href: "/founder/resources/allocation",
              body: "The ledger — what is committed, what is burning, and what to move.",
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

      {/* 10 — Clock note */}
      <p className="flex items-center gap-2 px-1 text-[11.5px] text-slate-400">
        <Clock className="h-3.5 w-3.5" />
        Catalogue last synced 2 hours ago — provider availability moves daily, fit scores do not.
      </p>
    </div>
  );
}
