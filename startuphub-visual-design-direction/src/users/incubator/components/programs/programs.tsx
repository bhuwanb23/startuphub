import {
  ArrowUpRight,
  CalendarDays,
  Layers,
  Plus,
  Users,
  Workflow,
} from "lucide-react";
import Link from "next/link";
import { Badge, Card, PageHeader, Progress, Stat } from "@/components/app/widgets";
import {
  CURRICULUM,
  PROGRAM_KPIS,
  PROGRAM_LEADS,
  PROGRAM_PARTNERS,
  PROGRAMS,
  PIPELINE,
} from "../../constants/programs-data";

/* Program Management — design, run and graduate programs.
   The portfolio, the curriculum behind it and the people who deliver it. */
export function Programs() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Program Management"
        desc="Design, run and graduate programs — the portfolio, the curriculum and the people delivering it."
        actions={
          <button className="inline-flex items-center gap-1.5 rounded-[10px] bg-accent px-4 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-accent-deep">
            <Plus className="h-3.5 w-3.5" /> Create program
          </button>
        }
      />

      {/* ── 01 · Programme portfolio ──────────────────────────── */}
      <Card
        title="Program portfolio"
        sub="Every batch we run or have run"
        action={<Badge tone="accent">5 programs</Badge>}
        pad={false}
      >
        <ul className="divide-y divide-line">
          {PROGRAMS.map((p) => {
            const fill = Math.round((p.filled / p.seats) * 100);
            return (
              <li
                key={p.slug}
                className="group flex flex-col gap-4 px-5 py-4 transition-colors hover:bg-soft lg:flex-row lg:items-center"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent">
                  <Workflow className="h-4 w-4" />
                </span>
                <div className="min-w-[240px] flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-[14px] font-semibold text-ink">{p.name}</p>
                    <Badge>{p.type}</Badge>
                    <Badge tone={p.tone}>{p.status}</Badge>
                  </div>
                  <p className="mt-1 text-[12px] text-slate-400">
                    {p.stage} · {p.sector} · {p.start} → {p.end}
                  </p>
                </div>
                <span className="hidden text-[12px] text-slate-500 lg:block">
                  lead <b className="font-semibold text-ink">{p.lead}</b>
                </span>
                <div className="w-full lg:w-[180px]">
                  <div className="flex justify-between text-[10.5px] text-slate-400">
                    <span>
                      {p.filled}/{p.seats} seats
                    </span>
                    <span>{fill}%</span>
                  </div>
                  <Progress
                    value={fill}
                    tone={p.status === "Intake" ? "warn" : p.status === "Completed" ? "good" : "accent"}
                    className="mt-1.5"
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </Card>

      {/* ── 02 · KPI strip ───────────────────────────────────── */}
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        {PROGRAM_KPIS.map((k) => (
          <Stat
            key={k.label}
            icon={
              k.tone === "good"
                ? Users
                : k.tone === "accent"
                  ? Workflow
                  : CalendarDays
            }
            label={k.label}
            value={k.value}
            delta={k.note}
            tone={k.tone === "accent" ? "good" : k.tone}
          />
        ))}
      </div>

      {/* ── 03 · Curriculum ──────────────────────────────────── */}
      <Card
        title="Curriculum — the 16-week spine"
        sub="Every incubation program follows the same six phases"
        action={
          <span className="flex items-center gap-1.5 text-[12px] font-semibold text-slate-400">
            <Layers className="h-3.5 w-3.5" /> 6 phases
          </span>
        }
      >
        <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CURRICULUM.map((c, i) => (
            <li
              key={c.phase}
              className="group rounded-xl border border-line p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-soft"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] font-semibold tracking-[0.14em] text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="rounded-md bg-soft px-1.5 py-0.5 font-mono text-[9.5px] text-slate-400">
                  {c.weeks}
                </span>
              </div>
              <p className="mt-2.5 text-[14px] font-semibold tracking-tight text-ink">
                {c.phase}
              </p>
              <p className="mt-1 text-[12.5px] leading-relaxed text-slate-500">
                {c.focus}
              </p>
              <p className="mt-3 border-t border-line pt-2.5 text-[11.5px] text-slate-400">
                <span className="font-medium text-ink">Deliverable:</span>{" "}
                {c.deliverable}
              </p>
              <p className="mt-1 font-mono text-[10px] tracking-[0.06em] text-slate-400 uppercase">
                owner {c.owner}
              </p>
            </li>
          ))}
        </ol>
      </Card>

      {/* ── 04 · Seat utilisation ────────────────────────────── */}
      <div className="grid gap-5 lg:grid-cols-2">
        <Card
          title="Seat utilisation"
          sub="Filled against allocated seats"
          action={<Badge tone="warn">2 seats short on AgriTech</Badge>}
        >
          <div className="space-y-4">
            {PROGRAMS.map((p) => {
              const fill = Math.round((p.filled / p.seats) * 100);
              return (
                <div key={p.slug} className="flex items-center gap-3">
                  <span className="w-[150px] shrink-0 truncate text-[12.5px] font-medium text-slate-600">
                    {p.name}
                  </span>
                  <Progress
                    value={fill}
                    tone={fill >= 100 ? "good" : fill === 0 ? "warn" : "accent"}
                    className="flex-1"
                  />
                  <span className="w-14 text-right text-[12px] font-semibold tabular-nums text-ink">
                    {p.filled}/{p.seats}
                  </span>
                </div>
              );
            })}
          </div>
        </Card>

        {/* ── 05 · Intake pipeline snapshot ─────────────────── */}
        <Card
          title="Intake pipeline"
          sub="Where Cohort VIII applicants sit right now"
          action={
            <Link
              href="/incubator/programs/applications"
              className="flex items-center gap-1 text-[12.5px] font-semibold text-accent"
            >
              All applications <ArrowUpRight className="h-3 w-3" />
            </Link>
          }
        >
          <div className="space-y-3.5">
            {PIPELINE.map((p) => (
              <div key={p.stage} className="flex items-center gap-3">
                <span className="w-[86px] shrink-0 text-[12.5px] font-medium text-slate-600">
                  {p.stage}
                </span>
                <div className="flex h-7 flex-1 items-center rounded-lg bg-soft">
                  <div
                    className={`flex h-7 items-center rounded-lg px-2.5 text-[11.5px] font-semibold text-white ${
                      p.tone === "good"
                        ? "bg-rise"
                        : p.tone === "warn"
                          ? "bg-amber-dim"
                          : p.tone === "accent"
                            ? "bg-accent"
                            : "bg-slate-400"
                    }`}
                    style={{ width: `${Math.max(12, (p.count / 12) * 100)}%` }}
                  >
                    {p.count}
                  </div>
                </div>
                <span className="w-[86px] shrink-0 text-right font-mono text-[10.5px] text-slate-400">
                  {p.conversion}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-4 border-t border-line pt-3.5 text-[12px] leading-relaxed text-slate-500">
            <span className="font-semibold text-ink">6% overall conversion</span> — 23
            applications in, one acceptance so far for Cohort VIII.
          </p>
        </Card>
      </div>

      {/* ── 06 · Programme milestones ─────────────────────────── */}
      <Card
        title="Upcoming programme milestones"
        sub="The next hard dates across all live batches"
        action={
          <Link
            href="/incubator/programs/calendar"
            className="flex items-center gap-1 text-[12.5px] font-semibold text-accent"
          >
            Full calendar <ArrowUpRight className="h-3 w-3" />
          </Link>
        }
        pad={false}
      >
        <ul className="divide-y divide-line">
          {[
            { date: "05 Apr", title: "Reference calls — shortlist", program: "Cohort VIII", tone: "warn" as const },
            { date: "08 Apr", title: "Criterion scoring window closes", program: "Cohort VIII", tone: "accent" as const },
            { date: "10 Apr", title: "Milestone M3 — MVP freeze", program: "Cohort VI", tone: "default" as const },
            { date: "18 Apr", title: "Selection committee", program: "Cohort VIII", tone: "accent" as const },
            { date: "28 Apr", title: "Demo Day — Cohort VI", program: "Cohort VI", tone: "good" as const },
          ].map((m) => (
            <li
              key={m.title}
              className="flex flex-wrap items-center gap-4 px-5 py-4 transition-colors hover:bg-soft"
            >
              <span className="w-14 shrink-0 font-mono text-[12px] font-semibold text-ink">
                {m.date}
              </span>
              <div className="min-w-[200px] flex-1">
                <p className="text-[13.5px] font-semibold text-ink">{m.title}</p>
                <p className="mt-0.5 text-[11.5px] text-slate-400">{m.program}</p>
              </div>
              <Badge tone={m.tone}>Upcoming</Badge>
            </li>
          ))}
        </ul>
      </Card>

      {/* ── 07 · Programme team ─────────────────────────────── */}
      <Card
        title="Programme team"
        sub="Who carries each programme"
        action={<Badge tone="accent">5 leads</Badge>}
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {PROGRAM_LEADS.map((l) => (
            <div
              key={l.name}
              className="group rounded-xl border border-line p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-soft"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-ink text-[11.5px] font-bold text-white">
                  {l.initials}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-[13.5px] font-semibold text-ink">
                    {l.name}
                  </p>
                  <p className="truncate text-[11.5px] text-slate-400">{l.role}</p>
                </div>
              </div>
              <div className="mt-3.5 flex items-center gap-2.5">
                <Progress
                  value={l.load}
                  tone={l.load > 80 ? "warn" : "accent"}
                  className="flex-1"
                />
                <span className="w-8 text-right text-[11.5px] font-semibold tabular-nums text-ink">
                  {l.load}%
                </span>
              </div>
              <p className="mt-2 text-[11.5px] text-slate-400">carries {l.program}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* ── 08 · Partner network ─────────────────────────────── */}
      <Card
        title="Partner network"
        sub="Who makes each programme possible"
        action={
          <Link
            href="/incubator/programs/discover"
            className="flex items-center gap-1 text-[12.5px] font-semibold text-accent"
          >
            Discover programmes <ArrowUpRight className="h-3 w-3" />
          </Link>
        }
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {PROGRAM_PARTNERS.map((p) => (
            <div
              key={p.name}
              className="rounded-xl border border-line p-4 transition-colors hover:border-accent/25"
            >
              <div className="flex items-start justify-between gap-3">
                <p className="text-[13.5px] font-semibold text-ink">{p.name}</p>
                <span className="shrink-0 rounded-md bg-soft px-1.5 py-0.5 font-mono text-[9.5px] text-slate-400">
                  {p.program}
                </span>
              </div>
              <p className="mt-1 text-[11.5px] text-accent">{p.kind}</p>
              <p className="mt-2.5 border-t border-line pt-2.5 text-[12px] leading-relaxed text-slate-500">
                {p.contribution}
              </p>
            </div>
          ))}
        </div>
      </Card>

      {/* ── 09 · Where to go next ────────────────────────────── */}
      <Card title="Where to go next" sub="The four workflows behind this screen">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              href: "/incubator/programs/applications",
              title: "Work the intake",
              body: "23 applications, five screening checks, five reviewers.",
              icon: Users,
            },
            {
              href: "/incubator/programs/evaluation",
              title: "Score the pool",
              body: "Six weighted criteria, a review queue and calibration.",
              icon: Layers,
            },
            {
              href: "/incubator/programs/selection",
              title: "Fill the seats",
              body: "Shortlist, committee votes and offer terms.",
              icon: Workflow,
            },
            {
              href: "/incubator/programs/calendar",
              title: "See the dates",
              body: "One calendar across intakes, reviews and demo days.",
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
