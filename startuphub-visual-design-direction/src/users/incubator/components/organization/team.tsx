"use client";

import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  Briefcase,
  GraduationCap,
  Network,
  UserPlus,
  Users,
} from "lucide-react";
import Link from "next/link";
import { Badge, Card, PageHeader, Progress } from "@/components/app/widgets";
import { cn } from "@/lib/utils";
import {
  ADVISORS,
  DEPARTURES,
  HIRING_PLAN,
  ONBOARDING,
  TEAM_FUNCTIONS,
  TEAM_MEMBERS,
  TEAM_REPORTS,
  type TeamMember,
} from "../../constants/organization-data";

const FILTERS = ["All", "Leadership", "Programs", "IPR", "Operations", "Community"] as const;

const TEAM_FILTER: Record<string, (m: TeamMember) => boolean> = {
  Leadership: (m) => m.tone === "accent",
  Programs: (m) => m.role.includes("Program"),
  IPR: (m) => m.role.includes("IPR") || m.role.includes("Grant"),
  Operations: (m) => m.role === "Operations",
  Community: (m) => m.role.includes("Community") || m.role.includes("Mentor"),
};

export function TeamStaff() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return TEAM_MEMBERS.filter((m) => {
      const inFilter =
        filter === "All" || (TEAM_FILTER[filter] ? TEAM_FILTER[filter](m) : true);
      if (!inFilter) return false;
      if (!q) return true;
      return [m.name, m.role, m.location].join(" ").toLowerCase().includes(q);
    });
  }, [filter, query]);

  const totalWorkload = Math.round(
    TEAM_MEMBERS.reduce((s, m) => s + m.workload, 0) / TEAM_MEMBERS.length,
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Team & Staff"
        desc="The 18 people behind StartupHub Labs — who they are, what they own and how loaded they are."
        actions={
          <button className="inline-flex items-center gap-1.5 rounded-[10px] bg-accent px-4 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-accent-deep">
            <UserPlus className="h-3.5 w-3.5" /> Add staff
          </button>
        }
      />

      {/* ── 01 · Filters ──────────────────────────────────────── */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "rounded-[10px] border px-3.5 py-2 text-[12.5px] font-medium transition-colors",
                filter === f
                  ? "border-ink bg-ink text-white"
                  : "border-line bg-white text-slate-500 hover:border-slate-300 hover:text-ink",
              )}
            >
              {f}
              <span className="ml-1.5 text-[11px] opacity-60">
                {f === "All"
                  ? TEAM_MEMBERS.length
                  : TEAM_MEMBERS.filter((m) => TEAM_FILTER[f]?.(m)).length}
              </span>
            </button>
          ))}
        </div>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search name, role or city"
          aria-label="Search team"
          className="w-full rounded-[10px] border border-line bg-white px-3.5 py-2 text-[13px] text-ink outline-none placeholder:text-slate-400 focus:border-accent/50 sm:ml-auto sm:max-w-[240px]"
        />
      </div>

      {/* ── 02 · Directory ────────────────────────────────────── */}
      <Card
        title={`${filter === "All" ? "All staff" : filter} · ${filtered.length}`}
        action={<Badge tone="accent">Avg load {totalWorkload}%</Badge>}
        pad={false}
      >
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center gap-2 px-5 py-14 text-center">
            <Users className="h-6 w-6 text-slate-300" />
            <p className="text-[13px] text-slate-400">
              Nobody matches that filter yet.
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-line">
            {filtered.map((m) => (
              <li
                key={m.name}
                className="group flex flex-wrap items-center gap-4 px-5 py-4 transition-colors hover:bg-soft"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent-soft text-[12px] font-bold text-accent">
                  {m.initials}
                </span>
                <div className="min-w-[190px] flex-1">
                  <p className="text-[13.5px] font-semibold text-ink">{m.name}</p>
                  <p className="mt-0.5 text-[11.5px] text-slate-400">{m.role}</p>
                </div>
                <span className="hidden min-w-[150px] text-[12px] text-slate-500 lg:block">
                  {m.scope}
                </span>
                <span className="hidden font-mono text-[10.5px] text-slate-400 xl:block">
                  {m.location} · since {m.since}
                </span>
                <div className="flex w-[120px] items-center gap-2">
                  <Progress
                    value={m.workload}
                    tone={m.workload > 75 ? "warn" : "accent"}
                    className="flex-1"
                  />
                  <span className="w-8 text-right text-[11px] font-semibold tabular-nums text-ink">
                    {m.workload}%
                  </span>
                </div>
                <Badge tone={m.status === "Active" ? m.tone : "warn"}>
                  {m.status}
                </Badge>
              </li>
            ))}
          </ul>
        )}
      </Card>

      {/* ── 03 · Reporting lines ──────────────────────────────── */}
      <div className="grid gap-5 lg:grid-cols-2">
        <Card
          title="Reporting lines"
          sub="Who answers to whom"
          action={
            <span className="flex items-center gap-1.5 text-[12px] font-semibold text-slate-400">
              <Network className="h-3.5 w-3.5" /> Connected
            </span>
          }
        >
          <ul className="space-y-4">
            {TEAM_REPORTS.map((r) => (
              <li key={r.name}>
                <div className="flex items-center gap-2.5">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-ink text-[10.5px] font-bold text-white">
                    {r.initials}
                  </span>
                  <div>
                    <p className="text-[13px] font-semibold text-ink">{r.name}</p>
                    <p className="text-[11px] text-slate-400">{r.role}</p>
                  </div>
                </div>
                <ul className="mt-2.5 space-y-1.5 border-l border-line pl-4">
                  {r.reports.map((rep) => (
                    <li
                      key={rep}
                      className="text-[12px] text-slate-500 transition-colors hover:text-ink"
                    >
                      {rep}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </Card>

        {/* ── 04 · Workload & capacity ───────────────────────── */}
        <Card
          title="Workload & capacity"
          sub="Committed time against a 100% load"
          action={<Badge tone={totalWorkload > 70 ? "warn" : "good"}>{totalWorkload}% avg</Badge>}
        >
          <div className="space-y-4">
            {TEAM_MEMBERS.map((m) => (
              <div key={m.name} className="flex items-center gap-3">
                <span className="w-[132px] shrink-0 truncate text-[12.5px] font-medium text-slate-600">
                  {m.name}
                </span>
                <Progress
                  value={m.workload}
                  tone={m.workload > 80 ? "bad" : m.workload > 65 ? "warn" : "good"}
                  className="flex-1"
                />
                <span className="w-9 text-right text-[12px] font-semibold tabular-nums text-ink">
                  {m.workload}%
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* ── 05 · Onboarding pipeline ─────────────────────────── */}
      <Card
        title="Onboarding pipeline"
        sub="Five hires in flight"
        action={<Badge tone="accent">5 joining</Badge>}
        pad={false}
      >
        <ol className="divide-y divide-line">
          {ONBOARDING.map((o, i) => (
            <li
              key={o.name}
              className="flex flex-wrap items-center gap-4 px-5 py-4 transition-colors hover:bg-soft"
            >
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-line font-mono text-[10.5px] font-semibold text-slate-400">
                {i + 1}
              </span>
              <div className="min-w-[180px] flex-1">
                <p className="text-[13.5px] font-semibold text-ink">{o.name}</p>
                <p className="mt-0.5 text-[11.5px] text-slate-400">{o.role}</p>
              </div>
              <span className="hidden font-mono text-[10.5px] text-slate-400 sm:block">
                starts {o.start} · owner {o.owner}
              </span>
              <Badge tone={o.tone}>{o.stage}</Badge>
            </li>
          ))}
        </ol>
      </Card>

      {/* ── 06 · Mentors & advisors ──────────────────────────── */}
      <Card
        title="Mentors & advisors"
        sub="External operators on the panel"
        action={
          <Link
            href="/incubator/mentors"
            className="flex items-center gap-1 text-[12.5px] font-semibold text-accent"
          >
            All mentors <ArrowUpRight className="h-3 w-3" />
          </Link>
        }
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {ADVISORS.map((a) => (
            <div
              key={a.name}
              className="group rounded-xl border border-line p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-soft"
            >
              <div className="flex items-center gap-2.5">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ink text-[11px] font-bold text-white">
                  {a.name
                    .split(" ")
                    .map((w) => w[0])
                    .join("")
                    .slice(0, 2)}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-[13px] font-semibold text-ink">
                    {a.name}
                  </p>
                  <p className="truncate text-[11px] text-slate-400">{a.org}</p>
                </div>
              </div>
              <p className="mt-3 text-[12px] text-accent">{a.expertise}</p>
              <div className="mt-3 flex items-center justify-between border-t border-line pt-2.5 text-[11.5px] text-slate-500">
                <span className="flex items-center gap-1.5">
                  <GraduationCap className="h-3.5 w-3.5" /> {a.sessions} sessions
                </span>
                <span className="font-semibold text-ink">{a.rating} ★</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* ── 07 · Departures ──────────────────────────────────── */}
      <Card
        title="Recent departures"
        sub="Handovers still in flight"
        action={<Badge tone="warn">1 handover pending</Badge>}
        pad={false}
      >
        <ul className="divide-y divide-line">
          {DEPARTURES.map((d) => (
            <li
              key={d.name}
              className="flex flex-wrap items-center gap-4 px-5 py-4 transition-colors hover:bg-soft"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-soft text-[11px] font-bold text-slate-400">
                {d.name
                  .split(" ")
                  .map((w) => w[0])
                  .join("")
                  .slice(0, 2)}
              </span>
              <div className="min-w-[180px] flex-1">
                <p className="text-[13.5px] font-semibold text-ink">{d.name}</p>
                <p className="mt-0.5 text-[11.5px] text-slate-400">{d.role}</p>
              </div>
              <span className="hidden min-w-[160px] text-[12px] text-slate-500 sm:block">
                Handover: {d.handover}
              </span>
              <span className="font-mono text-[10.5px] text-slate-400">
                last day {d.lastDay}
              </span>
              <Badge tone={d.tone}>
                {d.tone === "warn" ? "Pending" : "Complete"}
              </Badge>
            </li>
          ))}
        </ul>
      </Card>

      {/* ── 08 · Headcount by function ──────────────────────── */}
      <Card
        title="Headcount by function"
        sub="Where the 18 people actually sit"
        action={<Badge tone="accent">18 people</Badge>}
      >
        <div className="space-y-4">
          {TEAM_FUNCTIONS.map((f) => (
            <div key={f.function} className="flex items-center gap-3">
              <span className="w-[168px] shrink-0 truncate text-[12.5px] font-medium text-slate-600">
                {f.function}
              </span>
              <Progress
                value={f.share}
                tone={f.share >= 40 ? "accent" : "good"}
                className="flex-1"
              />
              <span className="w-10 text-right text-[12px] font-semibold tabular-nums text-ink">
                {f.headcount}
              </span>
              <span className="hidden min-w-[210px] text-[12px] text-slate-500 xl:block">
                {f.scope}
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* ── 09 · Hiring plan ─────────────────────────────────── */}
      <Card
        title="Hiring plan"
        sub="Open roles for the next two quarters"
        action={
          <span className="flex items-center gap-1.5 text-[12px] font-semibold text-slate-400">
            <Briefcase className="h-3.5 w-3.5" /> 5 openings
          </span>
        }
        pad={false}
      >
        <ul className="divide-y divide-line">
          {HIRING_PLAN.map((h) => (
            <li
              key={h.role}
              className="flex flex-wrap items-center gap-4 px-5 py-4 transition-colors hover:bg-soft"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent">
                <Briefcase className="h-4 w-4" />
              </span>
              <div className="min-w-[200px] flex-1">
                <p className="text-[13.5px] font-semibold text-ink">{h.role}</p>
                <p className="mt-0.5 text-[11.5px] text-slate-400">{h.team}</p>
              </div>
              <span className="font-mono text-[10.5px] text-slate-400">
                target {h.target}
              </span>
              <span className="text-[12px] text-slate-500">
                <b className="font-semibold text-ink">{h.openings}</b>{" "}
                {h.openings === 1 ? "opening" : "openings"}
              </span>
              <Badge tone={h.tone}>{h.priority}</Badge>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
