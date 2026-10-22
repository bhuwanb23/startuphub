"use client";

import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  Building2,
  Compass,
  Handshake,
  MapPin,
  Search,
  Sparkles,
  Users,
} from "lucide-react";
import Link from "next/link";
import { Badge, Card, PageHeader, Progress } from "@/components/app/widgets";
import { cn } from "@/lib/utils";
import {
  ALUMNI_OUTCOMES,
  APPLICATION_WINDOWS,
  CONSORTIUMS,
  EXTERNAL_PROGRAMS,
} from "../../constants/programs-data";

const MODE_FILTERS = ["All", "Cohort", "Open call", "Accelerator", "Challenge"] as const;

export function ProgramDiscovery() {
  const [mode, setMode] = useState<(typeof MODE_FILTERS)[number]>("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return EXTERNAL_PROGRAMS.filter((p) => {
      if (mode !== "All" && p.mode !== mode) return false;
      if (!q) return true;
      return [p.name, p.org, p.sector, p.location]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [mode, query]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Program Discovery"
        desc="External ecosystem programs our startups can enter — and programmes we can partner with."
        actions={
          <button className="inline-flex items-center gap-1.5 rounded-[10px] border border-line bg-white px-4 py-2.5 text-[13px] font-semibold text-ink transition-colors hover:bg-soft">
            <Building2 className="h-3.5 w-3.5 text-slate-400" /> Partner with us
          </button>
        }
      />

      {/* ── 01 · Filters ─────────────────────────────────────── */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex flex-wrap gap-2">
          {MODE_FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setMode(f)}
              className={cn(
                "rounded-[10px] border px-3.5 py-2 text-[12.5px] font-medium transition-colors",
                mode === f
                  ? "border-ink bg-ink text-white"
                  : "border-line bg-white text-slate-500 hover:border-slate-300 hover:text-ink",
              )}
            >
              {f}
              <span className="ml-1.5 text-[11px] opacity-60">
                {f === "All"
                  ? EXTERNAL_PROGRAMS.length
                  : EXTERNAL_PROGRAMS.filter((p) => p.mode === f).length}
              </span>
            </button>
          ))}
        </div>
        <div className="relative sm:ml-auto sm:w-[240px]">
          <Search className="pointer-events-none absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search programme, sector or city"
            aria-label="Search programmes"
            className="w-full rounded-[10px] border border-line bg-white py-2 pr-3.5 pl-9 text-[13px] text-ink outline-none placeholder:text-slate-400 focus:border-accent/50"
          />
        </div>
      </div>

      {/* ── 02 · Programme catalogue ──────────────────────────── */}
      <Card
        title={`${mode === "All" ? "All programmes" : mode} · ${filtered.length}`}
        sub="Programmes outside StartupHub Labs that our founders can apply to"
        action={<Badge tone="accent">{filtered.length} found</Badge>}
        pad={false}
      >
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center gap-2 px-5 py-14 text-center">
            <Compass className="h-6 w-6 text-slate-300" />
            <p className="text-[13px] text-slate-400">
              No programmes match that search.
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-line">
            {filtered.map((p) => (
              <li
                key={p.slug}
                className="group flex flex-col gap-4 px-5 py-4.5 transition-colors hover:bg-soft lg:flex-row lg:items-center"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent">
                  <Compass className="h-4 w-4" />
                </span>
                <div className="min-w-[220px] flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-[13.5px] font-semibold text-ink">{p.name}</p>
                    <Badge>{p.mode}</Badge>
                    {p.partner && <Badge tone="accent">Partner</Badge>}
                  </div>
                  <p className="mt-0.5 text-[11.5px] text-slate-400">
                    {p.org} · {p.sector} · {p.location}
                  </p>
                </div>
                <span className="hidden text-[12px] text-slate-500 lg:block">
                  <b className="font-semibold text-ink">{p.seats}</b> seats
                </span>
                <div className="w-full lg:w-[130px]">
                  <div className="flex justify-between text-[10.5px] text-slate-400">
                    <span>fit</span>
                    <span>{p.fit}</span>
                  </div>
                  <Progress
                    value={p.fit}
                    tone={p.fit >= 80 ? "good" : p.fit >= 60 ? "accent" : "warn"}
                    className="mt-1.5"
                  />
                </div>
                <span className="hidden min-w-[150px] text-[11.5px] text-slate-400 xl:block">
                  {p.deadline}
                </span>
                <Badge tone={p.tone}>{p.window}</Badge>
              </li>
            ))}
          </ul>
        )}
      </Card>

      {/* ── 03 · Application windows ──────────────────────────── */}
      <Card
        title="Application windows"
        sub="What is open right now across the ecosystem"
        action={<Badge tone="good">4 open</Badge>}
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {APPLICATION_WINDOWS.map((w) => (
            <div
              key={w.program}
              className="rounded-xl border border-line p-4 transition-colors hover:border-accent/25"
            >
              <div className="flex items-start justify-between gap-3">
                <p className="text-[13px] font-semibold text-ink">{w.program}</p>
                <Badge tone={w.tone}>{w.window}</Badge>
              </div>
              <p className="mt-2.5 text-[12px] text-slate-500">{w.next}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* ── 04 · Comparison table ────────────────────────────── */}
      <Card
        title="Compare programmes"
        sub="The three that fit our sectors best"
        action={
          <span className="flex items-center gap-1.5 text-[12px] font-semibold text-slate-400">
            <MapPin className="h-3.5 w-3.5" /> 7 tracked
          </span>
        }
        pad={false}
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px] text-left">
            <thead>
              <tr className="border-b border-line">
                {["Programme", "Mode", "Location", "Seats", "Deadline", "Fit"].map((h) => (
                  <th
                    key={h}
                    className="px-5 py-3.5 text-[11px] font-semibold tracking-[0.12em] text-slate-400 uppercase"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {EXTERNAL_PROGRAMS.filter((p) => p.fit >= 60)
                .sort((a, b) => b.fit - a.fit)
                .map((p) => (
                  <tr key={p.slug} className="transition-colors hover:bg-soft">
                    <td className="px-5 py-4">
                      <p className="text-[13px] font-semibold text-ink">{p.name}</p>
                      <p className="mt-0.5 text-[11px] text-slate-400">{p.org}</p>
                    </td>
                    <td className="px-5 py-4 text-[12.5px] text-slate-500">
                      {p.mode}
                    </td>
                    <td className="px-5 py-4 text-[12.5px] text-slate-500">
                      {p.location}
                    </td>
                    <td className="px-5 py-4 text-[12.5px] tabular-nums text-slate-500">
                      {p.seats}
                    </td>
                    <td className="px-5 py-4 text-[12.5px] text-slate-500">
                      {p.deadline}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={cn(
                          "rounded-full px-2 py-0.5 text-[11px] font-bold tabular-nums",
                          p.fit >= 80
                            ? "bg-rise-tint text-rise"
                            : p.fit >= 60
                              ? "bg-accent-soft text-accent"
                              : "bg-slate-100 text-slate-400",
                        )}
                      >
                        {p.fit}
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* ── 05 · Alumni outcomes ─────────────────────────────── */}
      <Card
        title="Alumni outcomes"
        sub="Where our founders ended up after an external programme"
        action={<Badge tone="good">₹155 Cr raised</Badge>}
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {ALUMNI_OUTCOMES.map((a) => (
            <div
              key={a.startup}
              className="group rounded-xl border border-line p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-soft"
            >
              <p className="text-[13.5px] font-semibold text-ink">{a.startup}</p>
              <p className="mt-0.5 font-mono text-[10px] tracking-[0.08em] text-slate-400 uppercase">
                {a.cohort} · {a.year}
              </p>
              <p className="mt-3 border-t border-line pt-2.5 text-[12.5px] font-medium text-rise">
                {a.outcome}
              </p>
            </div>
          ))}
        </div>
      </Card>

      {/* ── 06 · Consortiums ─────────────────────────────────── */}
      <Card
        title="Consortium programmes"
        sub="Multi-organisation programmes we join together"
        action={
          <span className="flex items-center gap-1.5 text-[12px] font-semibold text-slate-400">
            <Handshake className="h-3.5 w-3.5" /> 3 active
          </span>
        }
        pad={false}
      >
        <ul className="divide-y divide-line">
          {CONSORTIUMS.map((c) => (
            <li
              key={c.name}
              className="flex flex-wrap items-center gap-4 px-5 py-4 transition-colors hover:bg-soft"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent">
                <Handshake className="h-4 w-4" />
              </span>
              <div className="min-w-[200px] flex-1">
                <p className="text-[13.5px] font-semibold text-ink">{c.name}</p>
                <p className="mt-0.5 text-[11.5px] text-slate-400">{c.focus}</p>
              </div>
              <span className="text-[12px] text-slate-500">
                <b className="font-semibold text-ink">{c.members}</b> members
              </span>
              <span className="hidden min-w-[190px] text-[12px] text-slate-500 sm:block">
                {c.next}
              </span>
            </li>
          ))}
        </ul>
      </Card>

      {/* ── 07 · Recommendation ───────────────────────────────── */}
      <Card
        title="Recommended for us"
        sub="Ranked against our sectors, geography and current cohort gaps"
        action={
          <span className="flex items-center gap-1.5 text-[12px] font-semibold text-accent">
            <Sparkles className="h-3.5 w-3.5" /> Copilot
          </span>
        }
      >
        <div className="grid gap-3 sm:grid-cols-3">
          {EXTERNAL_PROGRAMS.filter((p) => p.partner)
            .sort((a, b) => b.fit - a.fit)
            .slice(0, 3)
            .map((p, i) => (
              <div
                key={p.slug}
                className="group rounded-xl border border-line p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-soft"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-semibold tracking-[0.14em] text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[18px] font-semibold tracking-[-0.02em] text-ink tabular-nums">
                    {p.fit}
                  </span>
                </div>
                <p className="mt-2.5 text-[13.5px] font-semibold text-ink">{p.name}</p>
                <p className="mt-0.5 text-[11.5px] text-slate-400">
                  {p.org} · {p.location}
                </p>
                <p className="mt-2.5 border-t border-line pt-2.5 text-[12px] leading-relaxed text-slate-500">
                  {p.note}
                </p>
              </div>
            ))}
        </div>
      </Card>

      {/* ── 08 · Partner programmes ──────────────────────────── */}
      <Card
        title="Partner programmes"
        sub="Programmes where we are a delivery partner, not an applicant"
        action={
          <span className="flex items-center gap-1.5 text-[12px] font-semibold text-slate-400">
            <Handshake className="h-3.5 w-3.5" /> 3 active
          </span>
        }
      >
        <div className="grid gap-3 sm:grid-cols-3">
          {EXTERNAL_PROGRAMS.filter((p) => p.partner).map((p) => (
            <div
              key={p.slug}
              className="group rounded-xl border border-line p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-soft"
            >
              <div className="flex items-start justify-between gap-3">
                <p className="text-[13px] font-semibold text-ink">{p.name}</p>
                <Badge tone={p.tone}>{p.window}</Badge>
              </div>
              <p className="mt-1 text-[11.5px] text-accent">{p.org}</p>
              <p className="mt-2.5 border-t border-line pt-2.5 text-[12px] leading-relaxed text-slate-500">
                {p.note}
              </p>
              <p className="mt-2.5 font-mono text-[10px] tracking-[0.06em] text-slate-400 uppercase">
                {p.sector} · {p.seats} seats · {p.deadline}
              </p>
            </div>
          ))}
        </div>
      </Card>

      {/* ── 09 · Where to go next ────────────────────────────── */}
      <Card title="Where to go next" sub="Turning discovery into action">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              href: "/incubator/programs",
              title: "Back to our programs",
              body: "See how our own batches compare with these.",
              icon: Building2,
            },
            {
              href: "/incubator/programs/applications",
              title: "Our own intake",
              body: "23 applications waiting on the same week of decisions.",
              icon: Users,
            },
            {
              href: "/incubator/programs/calendar",
              title: "Deadline calendar",
              body: "Every external deadline in one place.",
              icon: Compass,
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
