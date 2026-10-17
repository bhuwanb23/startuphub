import { ArrowLeft, CalendarDays } from "lucide-react";
import Link from "next/link";
import { Badge, Card, PageHeader, Progress } from "@/components/app/widgets";

const cohortStartups = [
  { name: "Lumen AI", sector: "AgriTech", health: 84, readiness: 78, milestones: "10/12", mentor: "Priya Nair", tone: "good" as const },
  { name: "TerraGrid", sector: "ClimateTech", health: 72, readiness: 66, milestones: "8/12", mentor: "Vikram Rao", tone: "accent" as const },
  { name: "AquaPure", sector: "CleanTech", health: 88, readiness: 81, milestones: "11/12", mentor: "Sunita D.", tone: "good" as const },
  { name: "FinEdge", sector: "FinTech", health: 68, readiness: 61, milestones: "7/12", mentor: "Karan Chadha", tone: "warn" as const },
  { name: "OrbitalWorks", sector: "SpaceTech", health: 81, readiness: 74, milestones: "10/12", mentor: "Priority N.", tone: "good" as const },
  { name: "FreshChain", sector: "AgriTech", health: 41, readiness: 38, milestones: "5/12", mentor: "Vikram Rao", tone: "bad" as const },
];

const events = [
  { name: "Demo Day dry-run", when: "Apr 21 · virtual", for: "All 6 startups" },
  { name: "Investor office hours", when: "Apr 24 · Bengaluru", for: "Seed+ startups" },
  { name: "Demo Day — graduation", when: "Apr 28 · hybrid", for: "Cohort VI + 240 guests" },
];

export function CohortDetail() {
  return (
    <div className="space-y-5">
      <Link href="/incubator/cohorts" className="inline-flex items-center gap-1.5 text-[13px] font-medium text-slate-400 hover:text-ink">
        <ArrowLeft className="h-3.5 w-3.5" /> All cohorts
      </Link>
      <PageHeader
        title="Cohort VI — graduating Apr 28"
        desc="14 startups · 6 in the final demo block · week 14 of 16 · 78 avg health."
        actions={<Badge tone="accent">Graduation sprint</Badge>}
      />

      <Card title="Cohort startups" pad={false}>
        <ul className="divide-y divide-line">
          {cohortStartups.map((s) => (
            <li key={s.name} className="flex flex-col gap-3 px-5 py-4 sm:grid sm:grid-cols-[1fr_auto_auto_auto] sm:items-center">
              <div className="flex items-center gap-3.5">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent-soft text-[12px] font-bold text-accent">
                  {s.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                </span>
                <div>
                  <p className="text-[14px] font-semibold text-ink">{s.name}</p>
                  <p className="text-[11.5px] text-slate-400">{s.sector} · mentor: {s.mentor}</p>
                </div>
              </div>
              <Badge tone={s.tone}>{s.health} health</Badge>
              <span className="text-[12px] tabular-nums text-slate-500">Readiness {s.readiness} · {s.milestones} milestones</span>
              <Progress value={s.health} tone={s.tone === "bad" ? "bad" : s.tone === "good" ? "good" : "accent"} className="w-28" />
            </li>
          ))}
        </ul>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card title="Upcoming cohort events" action={<CalendarDays className="h-4 w-4 text-slate-400" />}>
          <ul className="space-y-3">
            {events.map((e) => (
              <li key={e.name} className="rounded-xl border border-line p-4">
                <p className="text-[13.5px] font-semibold text-ink">{e.name}</p>
                <p className="mt-1 text-[12px] text-slate-500">{e.when}</p>
                <p className="mt-1.5 text-[11px] font-medium text-slate-400">{e.for}</p>
              </li>
            ))}
          </ul>
        </Card>
        <Card title="Cohort completion checklist">
          <ul className="space-y-3">
            {[
              ["KPI baselines submitted", 100],
              ["Mentor hours target (40h)", 80],
              ["Demo-day decks reviewed", 64],
              ["Data-room completeness avg", 74],
              ["Graduation invites sent", 100],
            ].map(([l, v]) => (
              <li key={l as string}>
                <div className="flex items-center justify-between text-[12.5px]">
                  <span className="font-medium text-slate-600">{l}</span>
                  <span className="font-semibold tabular-nums text-ink">{v}%</span>
                </div>
                <Progress value={v as number} tone={(v as number) < 70 ? "warn" : "accent"} className="mt-1.5" />
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
