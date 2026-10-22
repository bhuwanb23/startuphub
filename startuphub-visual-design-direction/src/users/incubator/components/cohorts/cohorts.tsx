import {
  ArrowUpRight,
  CalendarDays,
  CircleAlert,
  GraduationCap,
  Plus,
  Target,
  Users,
} from "lucide-react";
import Link from "next/link";
import { Badge, Card, PageHeader, Progress, Stat } from "@/components/app/widgets";
import {
  COHORTS,
  COHORT_BLOCKERS,
  COHORT_KPIS,
  HISTORICAL_COHORTS,
} from "../../constants/cohorts-data";

/* Cohort Management — every batch we run, how it is doing and what is
   at risk. The entry point into a cohort's own workspace. */
export function Cohorts() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Cohort Management"
        desc="Every batch we run — where it is, how healthy it is and what needs intervention."
        actions={
          <button className="inline-flex items-center gap-1.5 rounded-[10px] bg-accent px-4 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-accent-deep">
            <Plus className="h-3.5 w-3.5" /> Create cohort
          </button>
        }
      />

      {/* ── 01 · Cohort portfolio ────────────────────────────── */}
      <Card
        title="Cohort portfolio"
        sub="Live batches, intake and alumni"
        action={<Badge tone="accent">5 cohorts</Badge>}
        pad={false}
      >
        <ul className="divide-y divide-line">
          {COHORTS.map((c) => {
            const fill = Math.round((c.filled / c.seats) * 100);
            const weekPct = Math.round((c.currentWeek / c.weeks) * 100);
            return (
              <li
                key={c.slug}
                className="group flex flex-col gap-4 px-5 py-4 transition-colors hover:bg-soft lg:flex-row lg:items-center"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent">
                  <Users className="h-4 w-4" />
                </span>
                <div className="min-w-[220px] flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-[14px] font-semibold text-ink">{c.name}</p>
                    <Badge>{c.track}</Badge>
                    <Badge tone={c.tone}>{c.status}</Badge>
                  </div>
                  <p className="mt-1 text-[12px] text-slate-400">
                    {c.phase} · week {c.currentWeek} of {c.weeks} · {c.start} →{" "}
                    {c.end}
                  </p>
                </div>
                <span className="hidden text-[12px] text-slate-500 lg:block">
                  lead <b className="font-semibold text-ink">{c.lead}</b>
                </span>
                <div className="w-full lg:w-[150px]">
                  <div className="flex justify-between text-[10.5px] text-slate-400">
                    <span>
                      {c.filled}/{c.seats} seats
                    </span>
                    <span>{fill}%</span>
                  </div>
                  <Progress
                    value={fill}
                    tone={c.status === "Intake" ? "warn" : c.status === "Alumni" ? "good" : "accent"}
                    className="mt-1.5"
                  />
                </div>
                <div className="w-full lg:w-[150px]">
                  <div className="flex justify-between text-[10.5px] text-slate-400">
                    <span>programme</span>
                    <span>{c.currentWeek}/{c.weeks} wk</span>
                  </div>
                  <Progress
                    value={weekPct}
                    tone={c.status === "Alumni" ? "good" : "accent"}
                    className="mt-1.5"
                  />
                </div>
                <span className="w-[86px] shrink-0 text-right font-mono text-[11px] text-slate-400">
                  demo {c.demoDay}
                </span>
                {c.status === "Alumni" ? (
                  <span className="text-[12.5px] font-semibold text-slate-300">
                    Closed
                  </span>
                ) : (
                  <Link
                    href={`/incubator/cohorts/${c.slug}`}
                    className="flex items-center gap-1 text-[12.5px] font-semibold text-accent"
                  >
                    Open cohort <ArrowUpRight className="h-3 w-3" />
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </Card>

      {/* ── 02 · KPI strip ───────────────────────────────────── */}
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        {COHORT_KPIS.map((k) => (
          <Stat
            key={k.label}
            icon={
              k.tone === "good"
                ? GraduationCap
                : k.tone === "accent"
                  ? Users
                  : Target
            }
            label={k.label}
            value={k.value}
            delta={k.note}
            tone={k.tone === "accent" ? "good" : k.tone}
          />
        ))}
      </div>

      {/* ── 03 · Phase tracker across live batches ──────────── */}
      <Card
        title="Where every live batch is"
        sub="Programme phase against the 16-week spine"
        action={
          <Link
            href="/incubator/cohorts/progress"
            className="flex items-center gap-1 text-[12.5px] font-semibold text-accent"
          >
            Full progress <ArrowUpRight className="h-3 w-3" />
          </Link>
        }
        pad={false}
      >
        <ul className="divide-y divide-line">
          {COHORTS.filter((c) => c.status === "Active").map((c) => (
            <li
              key={c.slug}
              className="flex flex-wrap items-center gap-4 px-5 py-4 transition-colors hover:bg-soft"
            >
              <span className="w-[110px] shrink-0 text-[13px] font-semibold text-ink">
                {c.name}
              </span>
              <div className="flex min-w-[260px] flex-1 items-center gap-1">
                {Array.from({ length: c.weeks }).map((_, i) => {
                  const w = i + 1;
                  const done = w < c.currentWeek;
                  const active = w === c.currentWeek;
                  return (
                    <span
                      key={w}
                      title={`Week ${w}`}
                      className={`h-6 flex-1 rounded-sm ${
                        active
                          ? "bg-accent"
                          : done
                            ? "bg-accent-soft"
                            : "bg-soft"
                      }`}
                    />
                  );
                })}
              </div>
              <span className="w-[124px] shrink-0 text-right text-[12px] text-slate-500">
                {c.phase}
              </span>
              <Badge tone={c.tone}>Week {c.currentWeek}</Badge>
            </li>
          ))}
        </ul>
        <p className="border-t border-line px-5 py-3.5 text-[11.5px] text-slate-400">
          Each bar is one programme week. Cohort VI is in week 14 of 16, Cohort VII in
          week 9, and the AgriTech sprint in week 6 of 8.
        </p>
      </Card>

      {/* ── 04 · Seat utilisation ─────────────────────────────── */}
      <div className="grid gap-5 lg:grid-cols-2">
        <Card
          title="Seat utilisation"
          sub="Filled against allocated seats"
          action={<Badge tone="warn">Cohort VIII empty</Badge>}
        >
          <div className="space-y-4">
            {COHORTS.map((c) => {
              const fill = Math.round((c.filled / c.seats) * 100);
              return (
                <div key={c.slug} className="flex items-center gap-3">
                  <span className="w-[104px] shrink-0 truncate text-[12.5px] font-medium text-slate-600">
                    {c.name}
                  </span>
                  <Progress
                    value={fill}
                    tone={fill >= 100 ? "good" : fill === 0 ? "warn" : "accent"}
                    className="flex-1"
                  />
                  <span className="w-14 text-right text-[12px] font-semibold tabular-nums text-ink">
                    {c.filled}/{c.seats}
                  </span>
                </div>
              );
            })}
          </div>
        </Card>

        {/* ── 05 · Demo-day schedule ─────────────────────────── */}
        <Card
          title="Demo-day schedule"
          sub="The dates the whole batch is working towards"
          action={
            <span className="flex items-center gap-1.5 text-[12px] font-semibold text-slate-400">
              <CalendarDays className="h-3.5 w-3.5" /> 3 booked
            </span>
          }
          pad={false}
        >
          <ul className="divide-y divide-line">
            {COHORTS.filter((c) => c.demoDay !== "—").map((c) => (
              <li
                key={c.slug}
                className="flex flex-wrap items-center gap-4 px-5 py-4 transition-colors hover:bg-soft"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent">
                  <GraduationCap className="h-4 w-4" />
                </span>
                <div className="min-w-[180px] flex-1">
                  <p className="text-[13.5px] font-semibold text-ink">{c.name}</p>
                  <p className="mt-0.5 text-[11.5px] text-slate-400">
                    {c.filled} startups · {c.track}
                  </p>
                </div>
                <span className="font-mono text-[12px] font-semibold text-ink">
                  {c.demoDay}
                </span>
                <Badge tone={c.tone}>
                  {c.status === "Alumni" ? "Closed" : c.status === "Intake" ? "Planned" : "Booked"}
                </Badge>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* ── 06 · Mentor allocation ───────────────────────────── */}
      <Card
        title="Mentor allocation"
        sub="Who is carrying the batch"
        action={<Badge tone="accent">6 mentors</Badge>}
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {COHORTS.filter((c) => c.status === "Active").map((c) => (
            <div
              key={c.slug}
              className="rounded-xl border border-line p-4 transition-colors hover:border-accent/25"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ink text-[11px] font-bold text-white">
                  {c.leadInitials}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-[13px] font-semibold text-ink">
                    {c.lead}
                  </p>
                  <p className="truncate text-[11.5px] text-slate-400">Cohort lead</p>
                </div>
              </div>
              <div className="mt-3.5 flex items-center gap-2.5">
                <Progress value={c.health} tone={c.health > 75 ? "good" : "accent"} className="flex-1" />
                <span className="w-8 text-right text-[11.5px] font-semibold tabular-nums text-ink">
                  {c.health}
                </span>
              </div>
              <p className="mt-2.5 border-t border-line pt-2.5 text-[11.5px] text-slate-400">
                {c.name} · {c.filled} startups · {c.health} health
              </p>
            </div>
          ))}
        </div>
      </Card>

      {/* ── 07 · Blockers & at-risk watchlist ────────────────── */}
      <Card
        title="Blockers & at-risk watchlist"
        sub="Everything currently needing an intervention"
        action={<Badge tone="bad">2 critical</Badge>}
        pad={false}
      >
        <ul className="divide-y divide-line">
          {COHORT_BLOCKERS.map((b) => (
            <li
              key={b.startup}
              className="flex flex-wrap items-center gap-4 px-5 py-4 transition-colors hover:bg-soft"
            >
              <span
                className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg ${
                  b.tone === "bad"
                    ? "bg-red-50 text-red-600"
                    : b.tone === "warn"
                      ? "bg-amber-tint text-amber-dim"
                      : "bg-soft text-slate-400"
                }`}
              >
                <CircleAlert className="h-4 w-4" />
              </span>
              <div className="min-w-[200px] flex-1">
                <p className="text-[13.5px] font-semibold text-ink">{b.startup}</p>
                <p className="mt-0.5 text-[11.5px] text-slate-400">
                  {b.blocker} · owner {b.owner}
                </p>
              </div>
              <span className="hidden min-w-[190px] text-[12px] text-slate-500 lg:block">
                {b.action}
              </span>
              <span className="font-mono text-[10.5px] text-slate-400">
                {b.age} open
              </span>
              <Badge tone={b.tone}>{b.severity}</Badge>
            </li>
          ))}
        </ul>
      </Card>

      {/* ── 08 · Historical outcomes ─────────────────────────── */}
      <Card
        title="Historical cohort outcomes"
        sub="What previous batches actually achieved"
        action={
          <Link
            href="/incubator/cohorts/analytics"
            className="flex items-center gap-1 text-[12.5px] font-semibold text-accent"
          >
            Full analytics <ArrowUpRight className="h-3 w-3" />
          </Link>
        }
        pad={false}
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left">
            <thead>
              <tr className="border-b border-line">
                {["Cohort", "Size", "Graduated", "12-mo survival", "Funding", "IP", "Jobs"].map(
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
              {HISTORICAL_COHORTS.map((h) => (
                <tr key={h.name} className="transition-colors hover:bg-soft">
                  <td className="px-5 py-4">
                    <p className="text-[13px] font-semibold text-ink">{h.name}</p>
                    <p className="mt-0.5 text-[11px] text-slate-400">
                      {h.track} · {h.year}
                    </p>
                  </td>
                  <td className="px-5 py-4 text-[12.5px] tabular-nums text-slate-500">
                    {h.size}
                  </td>
                  <td className="px-5 py-4 text-[12.5px] tabular-nums text-slate-500">
                    {h.graduated}/{h.size}
                  </td>
                  <td className="px-5 py-4 text-[12.5px] font-semibold tabular-nums text-rise">
                    {h.survival12}%
                  </td>
                  <td className="px-5 py-4 text-[12.5px] font-medium tabular-nums text-ink">
                    {h.funding}
                  </td>
                  <td className="px-5 py-4 text-[12.5px] tabular-nums text-slate-500">
                    {h.ipr}
                  </td>
                  <td className="px-5 py-4 text-[12.5px] tabular-nums text-slate-500">
                    {h.jobs}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* ── 09 · Where to go next ────────────────────────────── */}
      <Card title="Where to go next" sub="The four views into a cohort">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              href: "/incubator/cohorts/cohort-vi",
              title: "Cohort VI workspace",
              body: "The live batch — roster, mentors, burn-up and demo readiness.",
              icon: Users,
            },
            {
              href: "/incubator/cohorts/progress",
              title: "Cohort progress",
              body: "Where every live batch is against the 16-week spine.",
              icon: Target,
            },
            {
              href: "/incubator/cohorts/analytics",
              title: "Cohort analytics",
              body: "Survival, funding, IPR and graduation across cohorts.",
              icon: GraduationCap,
            },
            {
              href: "/incubator/programs/calendar",
              title: "Programme calendar",
              body: "Every intake, review and demo-day date in one place.",
              icon: CalendarDays,
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
