"use client";

import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  ClipboardCheck,
  FileText,
  Search,
  TrendingUp,
  Users,
} from "lucide-react";
import Link from "next/link";
import { Badge, Card, PageHeader, Progress } from "@/components/app/widgets";
import { cn } from "@/lib/utils";
import {
  APPLICATIONS,
  INTAKE_SOURCES,
  PIPELINE,
  REVIEWER_LOADS,
  SCREENING_CHECKS,
  type Application,
} from "../../constants/programs-data";

const STATUS_FILTERS = [
  "All",
  "New",
  "In review",
  "Shortlisted",
  "Offer out",
] as const;

const STATUS_TONE: Record<Application["status"], "default" | "accent" | "good" | "warn" | "bad"> = {
  New: "default",
  "In review": "warn",
  Shortlisted: "accent",
  "Offer out": "accent",
  Accepted: "good",
  Waitlisted: "warn",
  Declined: "bad",
};

export function Applications() {
  const [status, setStatus] = useState<(typeof STATUS_FILTERS)[number]>("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return APPLICATIONS.filter((a) => {
      if (status !== "All" && a.status !== status) return false;
      if (!q) return true;
      return [a.startup, a.sector, a.reviewer, a.stage]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [status, query]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Applications"
        desc="Cohort VIII intake — 23 applications, screened against seven checks and scored on six criteria."
        actions={
          <Link
            href="/incubator/programs/evaluation"
            className="inline-flex items-center gap-1.5 rounded-[10px] bg-accent px-4 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-accent-deep"
          >
            <ClipboardCheck className="h-3.5 w-3.5" /> Open evaluation
          </Link>
        }
      />

      {/* ── 01 · Filters ─────────────────────────────────────── */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
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
                  ? APPLICATIONS.length
                  : APPLICATIONS.filter((a) => a.status === f).length}
              </span>
            </button>
          ))}
        </div>
        <div className="relative sm:ml-auto sm:w-[240px]">
          <Search className="pointer-events-none absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search startup, sector or reviewer"
            aria-label="Search applications"
            className="w-full rounded-[10px] border border-line bg-white py-2 pr-3.5 pl-9 text-[13px] text-ink outline-none placeholder:text-slate-400 focus:border-accent/50"
          />
        </div>
      </div>

      {/* ── 02 · Pipeline funnel ──────────────────────────────── */}
      <Card
        title="Intake funnel"
        sub="Where the 23 applications sit"
        action={<Badge tone="accent">6% converted</Badge>}
      >
        <div className="grid gap-3 sm:grid-cols-5">
          {PIPELINE.map((p, i) => (
            <div
              key={p.stage}
              className="group relative rounded-xl border border-line p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-soft"
            >
              <span className="font-mono text-[10px] font-semibold tracking-[0.14em] text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="mt-2 text-[28px] font-semibold leading-none tracking-[-0.03em] text-ink tabular-nums">
                {p.count}
              </p>
              <p className="mt-2 text-[12.5px] font-semibold text-ink">{p.stage}</p>
              <p className="mt-0.5 text-[11.5px] text-slate-400">{p.note}</p>
              <p className="mt-2.5 border-t border-line pt-2 font-mono text-[10px] tracking-[0.08em] text-slate-400 uppercase">
                {p.conversion} of intake
              </p>
            </div>
          ))}
        </div>
      </Card>

      {/* ── 03 · Applications table ──────────────────────────── */}
      <Card
        title={`${status === "All" ? "All applications" : status} · ${filtered.length}`}
        action={
          <span className="font-mono text-[10.5px] text-slate-400">
            {filtered.length} of {APPLICATIONS.length} shown
          </span>
        }
        pad={false}
      >
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center gap-2 px-5 py-14 text-center">
            <FileText className="h-6 w-6 text-slate-300" />
            <p className="text-[13px] text-slate-400">
              No applications match that filter.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[860px] text-left">
              <thead>
                <tr className="border-b border-line">
                  {["Startup", "Sector", "Stage", "Score", "Reviewer", "Applied", "Docs", "Status", ""].map(
                    (h) => (
                      <th
                        key={h}
                        className="px-5 py-3.5 text-[11px] font-semibold tracking-[0.12em] text-slate-400 uppercase"
                      >
                        {h}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {filtered.map((a) => (
                  <tr key={a.id} className="group transition-colors hover:bg-soft">
                    <td className="px-5 py-4">
                      <p className="text-[13.5px] font-semibold text-ink">{a.startup}</p>
                      <p className="mt-0.5 text-[11px] text-slate-400">
                        needs {a.need} · has {a.funding}
                      </p>
                    </td>
                    <td className="px-5 py-4">
                      <Badge>{a.sector}</Badge>
                    </td>
                    <td className="px-5 py-4 text-[12.5px] text-slate-500">
                      {a.stage}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={cn(
                          "rounded-full px-2 py-0.5 text-[11px] font-bold tabular-nums",
                          a.score >= 80
                            ? "bg-rise-tint text-rise"
                            : a.score >= 72
                              ? "bg-accent-soft text-accent"
                              : "bg-slate-100 text-slate-400",
                        )}
                      >
                        {a.score}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-[12.5px] text-slate-500">
                      {a.reviewer}
                    </td>
                    <td className="px-5 py-4 font-mono text-[11px] text-slate-400">
                      {a.applied}
                    </td>
                    <td className="px-5 py-4">
                      <span className="font-mono text-[11px] text-slate-500">
                        {a.documents}
                      </span>
                      <div className="mt-1 w-14">
                        <Progress
                          value={a.completeness}
                          tone={a.completeness === 100 ? "good" : a.completeness < 60 ? "bad" : "warn"}
                        />
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <Badge tone={STATUS_TONE[a.status]}>{a.status}</Badge>
                    </td>
                    <td className="px-5 py-4">
                      <Link
                        href="/incubator/programs/evaluation"
                        className="text-[12px] font-semibold text-accent opacity-0 transition-opacity group-hover:opacity-100 hover:underline"
                      >
                        Evaluate
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* ── 04 · Intake sources ──────────────────────────────── */}
      <div className="grid gap-5 lg:grid-cols-2">
        <Card
          title="Where applications come from"
          sub="Which channels actually convert"
          action={
            <span className="flex items-center gap-1.5 text-[12px] font-semibold text-slate-400">
              <TrendingUp className="h-3.5 w-3.5" /> 23 total
            </span>
          }
        >
          <div className="space-y-4">
            {INTAKE_SOURCES.map((s) => (
              <div key={s.source} className="flex items-center gap-3">
                <span className="w-[136px] shrink-0 truncate text-[12.5px] font-medium text-slate-600">
                  {s.source}
                </span>
                <Progress value={s.share * 2.5} tone="accent" className="flex-1" />
                <span className="w-7 text-right text-[12px] font-semibold tabular-nums text-ink">
                  {s.count}
                </span>
                <span className="hidden min-w-[150px] text-[11.5px] text-slate-400 sm:block">
                  {s.note}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* ── 05 · Reviewer workload ─────────────────────────── */}
        <Card
          title="Reviewer workload"
          sub="Who is carrying the queue"
          action={<Badge tone="bad">2 overdue</Badge>}
        >
          <ul className="space-y-3.5">
            {REVIEWER_LOADS.map((r) => {
              const load = Math.round((r.assigned / r.capacity) * 100);
              return (
                <li key={r.reviewer} className="flex items-center gap-3">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-ink text-[10.5px] font-bold text-white">
                    {r.initials}
                  </span>
                  <span className="w-[112px] shrink-0 truncate text-[12.5px] font-medium text-slate-600">
                    {r.reviewer}
                  </span>
                  <Progress
                    value={load}
                    tone={r.overdue > 0 ? "bad" : load > 80 ? "warn" : "accent"}
                    className="flex-1"
                  />
                  <span className="w-11 text-right text-[12px] font-semibold tabular-nums text-ink">
                    {r.assigned}/{r.capacity}
                  </span>
                  {r.overdue > 0 ? (
                    <Badge tone="bad">{r.overdue} late</Badge>
                  ) : (
                    <Badge tone="good">Clear</Badge>
                  )}
                </li>
              );
            })}
          </ul>
        </Card>
      </div>

      {/* ── 06 · Screening checklist ─────────────────────────── */}
      <Card
        title="Screening checklist"
        sub="Seven checks run before a human reads an application"
        action={<Badge tone="accent">6 required</Badge>}
        pad={false}
      >
        <ul className="divide-y divide-line">
          {SCREENING_CHECKS.map((c) => {
            const pct = Math.round((c.passed / c.total) * 100);
            return (
              <li
                key={c.check}
                className="flex flex-wrap items-center gap-4 px-5 py-4 transition-colors hover:bg-soft"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent">
                  <ClipboardCheck className="h-4 w-4" />
                </span>
                <div className="min-w-[200px] flex-1">
                  <p className="text-[13.5px] font-semibold text-ink">{c.check}</p>
                  <p className="mt-0.5 text-[11.5px] text-slate-400">
                    {c.note} · {c.required ? "Required" : "Optional"}
                  </p>
                </div>
                <div className="flex w-[150px] items-center gap-2.5">
                  <Progress
                    value={pct}
                    tone={pct === 100 ? "good" : pct < 80 ? "warn" : "accent"}
                    className="flex-1"
                  />
                  <span className="w-12 text-right text-[11.5px] font-semibold tabular-nums text-ink">
                    {c.passed}/{c.total}
                  </span>
                </div>
                <Badge tone={c.required ? "accent" : "default"}>
                  {c.required ? "Required" : "Optional"}
                </Badge>
              </li>
            );
          })}
        </ul>
      </Card>

      {/* ── 07 · Completeness ────────────────────────────────── */}
      <Card
        title="Application completeness"
        sub="How much of each file set has arrived"
        action={<Badge tone="warn">4 incomplete</Badge>}
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {APPLICATIONS.map((a) => (
            <div
              key={a.id}
              className="rounded-xl border border-line p-4 transition-colors hover:border-accent/25"
            >
              <div className="flex items-start justify-between gap-3">
                <p className="text-[13px] font-semibold text-ink">{a.startup}</p>
                <span className="shrink-0 font-mono text-[10.5px] text-slate-400">
                  {a.completeness}%
                </span>
              </div>
              <div className="mt-2.5">
                <Progress
                  value={a.completeness}
                  tone={a.completeness === 100 ? "good" : a.completeness < 60 ? "bad" : "warn"}
                />
              </div>
              <p className="mt-2.5 text-[11.5px] text-slate-400">
                {a.documents} documents · {a.stage} stage
              </p>
            </div>
          ))}
        </div>
      </Card>

      {/* ── 07 · Recently received ──────────────────────────── */}
      <Card
        title="Recently received"
        sub="Filed in the last seven days"
        action={<Badge tone="accent">7 new</Badge>}
        pad={false}
      >
        <ul className="divide-y divide-line">
          {APPLICATIONS.filter((a) => a.status === "New").map((a) => (
            <li
              key={a.id}
              className="flex flex-wrap items-center gap-4 px-5 py-4 transition-colors hover:bg-soft"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent">
                <FileText className="h-4 w-4" />
              </span>
              <div className="min-w-[180px] flex-1">
                <p className="text-[13.5px] font-semibold text-ink">{a.startup}</p>
                <p className="mt-0.5 text-[11.5px] text-slate-400">
                  {a.sector} · {a.stage} · applied {a.applied}
                </p>
              </div>
              <span className="text-[12px] text-slate-500">
                needs <b className="font-semibold text-ink">{a.need}</b>
              </span>
              <span className="hidden font-mono text-[11px] text-slate-400 sm:block">
                {a.documents} docs
              </span>
              <Badge tone="default">Unread</Badge>
            </li>
          ))}
        </ul>
      </Card>

      {/* ── 08 · Where to go next ────────────────────────────── */}
      <Card title="Where to go next" sub="From a file set to a seat at the table">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              href: "/incubator/programs/evaluation",
              title: "Score the pool",
              body: "Six weighted criteria, a queue and per-reviewer calibration.",
              icon: ClipboardCheck,
            },
            {
              href: "/incubator/programs/selection",
              title: "Fill the seats",
              body: "Shortlist, committee votes and offer terms for Cohort VIII.",
              icon: Users,
            },
            {
              href: "/incubator/programs/calendar",
              title: "Hit the dates",
              body: "Scoring closes 08 Apr, committee sits 18 Apr, intake locks 12 Apr.",
              icon: FileText,
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
