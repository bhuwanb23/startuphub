"use client";

import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  ClipboardCheck,
  Clock3,
  Scale,
  ShieldCheck,
  TrendingUp,
  Users,
} from "lucide-react";
import Link from "next/link";
import { Badge, Card, PageHeader, Progress } from "@/components/app/widgets";
import { cn } from "@/lib/utils";
import {
  APPROVAL_ROUTES,
  COVERAGE_GAPS,
  ESCALATION,
  REQUEST_TREND,
  RESOURCE_REQUESTS,
  TURNAROUND,
  type RequestStatus,
} from "../../constants/resources-data";

const STATUS_FILTERS = [
  "All",
  "Pending",
  "Approved",
  "Partially approved",
  "Rejected",
] as const;

const STATUS_TONE: Record<RequestStatus, "default" | "accent" | "good" | "warn" | "bad"> = {
  Approved: "good",
  Pending: "warn",
  Rejected: "bad",
  "Partially approved": "accent",
};

export function ResourceRequests() {
  const [status, setStatus] = useState<(typeof STATUS_FILTERS)[number]>("All");

  const filtered = useMemo(
    () =>
      status === "All"
        ? RESOURCE_REQUESTS
        : RESOURCE_REQUESTS.filter((r) => r.status === status),
    [status],
  );

  const pending = RESOURCE_REQUESTS.filter((r) => r.status === "Pending");
  const approvedValue = RESOURCE_REQUESTS.filter(
    (r) => r.status === "Approved" || r.status === "Partially approved",
  ).reduce((s, r) => s + r.value, 0);
  const askedValue = RESOURCE_REQUESTS.reduce((s, r) => s + r.value, 0);
  const avgTurnaround = Math.round(
    TURNAROUND.reduce((s, t) => s + t.days * t.volume, 0) /
      TURNAROUND.reduce((s, t) => s + t.volume, 0),
  );
  const counts = RESOURCE_REQUESTS.reduce(
    (acc, r) => ({ ...acc, [r.status]: (acc[r.status] ?? 0) + 1 }),
    {} as Record<RequestStatus, number>,
  );
  const valueOf = (s: RequestStatus) =>
    RESOURCE_REQUESTS.filter((r) => r.status === s).reduce((t, r) => t + r.value, 0);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Resource Requests"
        desc="Every request against the pool — who asked, who approves it and how long it waits."
        actions={
          <Link
            href="/incubator/resources"
            className="inline-flex items-center gap-1.5 rounded-[10px] border border-line bg-white px-4 py-2.5 text-[13px] font-semibold text-ink transition-colors hover:bg-soft"
          >
            Resource inventory
          </Link>
        }
      />

      {/* ── 01 · Filters ─────────────────────────────────────── */}
      <div className="flex flex-wrap gap-2">
        {STATUS_FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setStatus(f)}
            className={cn(
              "rounded-[10px] border px-3.5 py-2 text-[12.5px] font-medium transition-colors",
              status === f
                ? "border-ink bg-ink text-white"
                : "border-line bg-white text-slate-500 hover:border-slate-300 hover:text-ink",
            )}
          >
            {f}
            <span className="ml-1.5 text-[11px] opacity-60">
              {f === "All"
                ? RESOURCE_REQUESTS.length
                : RESOURCE_REQUESTS.filter((r) => r.status === f).length}
            </span>
          </button>
        ))}
      </div>

      {/* ── 02 · Request queue ───────────────────────────────── */}
      <Card
        title={`Request queue · ${filtered.length}`}
        sub="Every request, with the approver and the SLA it was promised against"
        action={<Badge tone="warn">{pending.length} awaiting approval</Badge>}
        pad={false}
      >
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center gap-2 px-5 py-14 text-center">
            <ClipboardCheck className="h-6 w-6 text-slate-300" />
            <p className="text-[13px] text-slate-400">No requests with that status.</p>
          </div>
        ) : (
          <ul className="divide-y divide-line">
            {filtered.map((r) => (
              <li
                key={r.id}
                className="flex flex-col gap-3 px-5 py-4 transition-colors hover:bg-soft lg:flex-row lg:items-center"
              >
                <span
                  className={cn(
                    "grid h-9 w-9 shrink-0 place-items-center rounded-lg",
                    r.tone === "good"
                      ? "bg-rise-tint text-rise"
                      : r.tone === "warn"
                        ? "bg-amber-tint text-amber-dim"
                        : r.tone === "bad"
                          ? "bg-red-50 text-red-600"
                          : "bg-accent-soft text-accent",
                  )}
                >
                  <ClipboardCheck className="h-4 w-4" />
                </span>
                <div className="min-w-[200px] flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-[13.5px] font-semibold text-ink">{r.item}</p>
                    <Badge tone={STATUS_TONE[r.status]}>{r.status}</Badge>
                  </div>
                  <p className="mt-0.5 text-[11.5px] text-slate-400">
                    {r.startup} · {r.category} · {r.qty} · {r.submitted}
                  </p>
                </div>
                <span className="hidden min-w-[190px] text-[12px] text-slate-500 lg:block">
                  {r.note}
                </span>
                <span className="w-28 shrink-0 text-right text-[12px] text-slate-500">
                  {r.approver}
                </span>
                <span className="flex w-16 shrink-0 items-center gap-1 font-mono text-[10.5px] text-slate-400">
                  <Clock3 className="h-3 w-3" /> {r.sla}
                </span>
              </li>
            ))}
          </ul>
        )}
      </Card>

      {/* ── 03 · Who approves what ───────────────────────────── */}
      <Card
        title="Who approves what"
        sub="One approver per category, with the service level they are held to"
        action={<Badge tone="accent">{APPROVAL_ROUTES.length} routes</Badge>}
        pad={false}
      >
        <ul className="divide-y divide-line">
          {APPROVAL_ROUTES.map((a) => (
            <li
              key={a.category}
              className="flex flex-wrap items-center gap-4 px-5 py-4 transition-colors hover:bg-soft"
            >
              <span
                className={cn(
                  "grid h-9 w-9 shrink-0 place-items-center rounded-lg",
                  a.tone === "accent"
                    ? "bg-accent-soft text-accent"
                    : a.tone === "warn"
                      ? "bg-amber-tint text-amber-dim"
                      : "bg-soft text-slate-400",
                )}
              >
                <ShieldCheck className="h-4 w-4" />
              </span>
              <div className="min-w-[150px] flex-1">
                <p className="text-[13.5px] font-semibold text-ink">{a.category}</p>
                <p className="mt-0.5 text-[11.5px] text-slate-400">{a.note}</p>
              </div>
              <span className="min-w-[140px] text-[12.5px] text-slate-600">
                {a.approver}
                <span className="block text-[11px] text-slate-400">{a.role}</span>
              </span>
              <span className="w-16 shrink-0 text-right font-mono text-[11px] text-slate-500">
                {a.sla}
              </span>
            </li>
          ))}
        </ul>
      </Card>

      {/* ── 04 · Turnaround by category ──────────────────────── */}
      <Card
        title="Turnaround by category"
        sub="Average days from request to decision, and how many were raised"
        action={
          <Badge tone="warn">avg {avgTurnaround} days</Badge>
        }
      >
        <div className="space-y-4">
          {TURNAROUND.map((t) => {
            const maxDays = 5;
            return (
              <div key={t.category} className="flex items-center gap-3">
                <span className="w-[112px] shrink-0 truncate text-[12.5px] font-medium text-slate-600">
                  {t.category}
                </span>
                <Progress
                  value={(t.days / maxDays) * 100}
                  tone={t.tone === "good" ? "good" : t.tone === "warn" ? "warn" : "accent"}
                  className="flex-1"
                />
                <span className="w-12 text-right text-[12px] font-semibold tabular-nums text-ink">
                  {t.days}d
                </span>
                <span className="w-14 text-right text-[11.5px] tabular-nums text-slate-400">
                  {t.volume} req
                </span>
              </div>
            );
          })}
        </div>
        <p className="mt-4 rounded-xl border border-line bg-soft p-4 text-[12.5px] leading-relaxed text-slate-600">
          <span className="font-semibold text-ink">Legal and data are the slow lanes</span>{" "}
          — both are approval-bound outside our control. Everything we own turns
          around in three days or less.
        </p>
      </Card>

      {/* ── 05 · Coverage gap ────────────────────────────────── */}
      <Card
        title="Coverage gap — what has not been asked for"
        sub="Absence of a request is often absence of awareness"
        action={<Badge tone="bad">2 blind spots</Badge>}
        pad={false}
      >
        <ul className="divide-y divide-line">
          {COVERAGE_GAPS.map((g) => (
            <li
              key={g.area}
              className="flex flex-wrap items-center gap-4 px-5 py-4 transition-colors hover:bg-soft"
            >
              <span
                className={cn(
                  "grid h-9 w-9 shrink-0 place-items-center rounded-lg",
                  g.tone === "good"
                    ? "bg-rise-tint text-rise"
                    : g.tone === "warn"
                      ? "bg-amber-tint text-amber-dim"
                      : "bg-red-50 text-red-600",
                )}
              >
                <Scale className="h-4 w-4" />
              </span>
              <div className="min-w-[190px] flex-1">
                <p className="text-[13.5px] font-semibold text-ink">{g.area}</p>
                <p className="mt-0.5 text-[11.5px] text-slate-400">{g.note}</p>
              </div>
              <span className="text-[12.5px] tabular-nums text-slate-500">
                <b className="font-semibold text-ink">{g.asked}</b>/{g.needed} asked
              </span>
              <Badge tone={g.tone}>
                {g.asked >= g.needed ? "Covered" : "Blind spot"}
              </Badge>
            </li>
          ))}
        </ul>
      </Card>

      {/* ── 06 · Request volume trend ────────────────────────── */}
      <Card
        title="Request volume"
        sub="Raised against approved, by month"
        action={
          <span className="flex items-center gap-1.5 text-[12px] font-semibold text-slate-400">
            <TrendingUp className="h-3.5 w-3.5" /> 6 months
          </span>
        }
      >
        <div className="space-y-3.5">
          {REQUEST_TREND.map((t) => (
            <div key={t.month} className="flex items-center gap-3">
              <span className="w-10 shrink-0 font-mono text-[11px] text-slate-400">
                {t.month}
              </span>
              <div className="flex-1">
                <Progress value={(t.raised / 20) * 100} tone="accent" />
              </div>
              <span className="w-10 text-right text-[12px] font-semibold tabular-nums text-ink">
                {t.raised}
              </span>
              <span className="w-12 text-right text-[11.5px] tabular-nums text-slate-400">
                {t.approved} ok
              </span>
            </div>
          ))}
        </div>
        <p className="mt-4 border-t border-line pt-3.5 text-[11.5px] text-slate-400">
          March was the peak — the Cohort VI demo-day push. April is partial.
        </p>
      </Card>

      {/* ── 07 · Value requested vs approved ─────────────────── */}
      <Card
        title="Value requested vs approved"
        sub="What the pool actually gave away"
        action={
          <Badge tone="accent">
            ₹{approvedValue.toFixed(1)} L of ₹{askedValue.toFixed(1)} L
          </Badge>
        }
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              l: "Approved in full",
              v: String(counts.Approved),
              note: `₹${valueOf("Approved").toFixed(1)} L of requests`,
              tone: "good",
            },
            {
              l: "Partially approved",
              v: String(counts["Partially approved"]),
              note: `₹${valueOf("Partially approved").toFixed(1)} L of requests`,
              tone: "accent",
            },
            {
              l: "Awaiting decision",
              v: String(counts.Pending),
              note: `₹${valueOf("Pending").toFixed(1)} L of requests`,
              tone: "warn",
            },
            {
              l: "Rejected",
              v: String(counts.Rejected),
              note: `₹${valueOf("Rejected").toFixed(1)} L of requests`,
              tone: "bad",
            },
          ].map((x) => (
            <div
              key={x.l}
              className="rounded-xl border border-line p-4 transition-colors hover:border-accent/25"
            >
              <p className="text-[12px] font-medium text-slate-500">{x.l}</p>
              <p className="mt-2 text-[24px] font-semibold leading-none tracking-[-0.03em] text-ink tabular-nums">
                {x.v}
              </p>
              <p className="mt-2 text-[11.5px] text-slate-400">{x.note}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* ── 08 · Escalation path ─────────────────────────────── */}
      <Card
        title="Escalation path"
        sub="What happens when a request stalls"
        action={<Badge tone="bad">{ESCALATION.length} steps</Badge>}
        pad={false}
      >
        <ul className="divide-y divide-line">
          {ESCALATION.map((e) => (
            <li
              key={e.step}
              className="flex flex-col gap-3 px-5 py-4 transition-colors hover:bg-soft sm:flex-row sm:items-center sm:gap-4"
            >
              <span
                className={cn(
                  "grid h-8 w-8 shrink-0 place-items-center rounded-lg font-mono text-[11px] font-bold",
                  e.tone === "bad"
                    ? "bg-red-50 text-red-600"
                    : e.tone === "warn"
                      ? "bg-amber-tint text-amber-dim"
                      : "bg-soft text-slate-500",
                )}
              >
                {e.step}
              </span>
              <div className="min-w-[220px] flex-1">
                <p className="text-[13px] font-semibold text-ink">{e.trigger}</p>
                <p className="mt-0.5 text-[11.5px] text-slate-400">{e.action}</p>
              </div>
              <span className="min-w-[160px] text-[12.5px] text-slate-600">
                {e.owner}
              </span>
              <span className="w-24 shrink-0 text-right font-mono text-[10.5px] text-slate-400">
                {e.window}
              </span>
            </li>
          ))}
        </ul>
      </Card>

      {/* ── 09 · Where to go next ────────────────────────────── */}
      <Card title="Where to go next" sub="From the queue to the allocation">
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            {
              href: "/incubator/resources",
              title: "Back to inventory",
              body: "The pool these requests draw from.",
              icon: ClipboardCheck,
            },
            {
              href: "/incubator/resources/allocation",
              title: "Allocation ledger",
              body: "Who holds what, and what is expiring.",
              icon: Scale,
            },
            {
              href: "/incubator/resources/utilization",
              title: "Utilisation trends",
              body: "Are the requests turning into usage?",
              icon: TrendingUp,
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
