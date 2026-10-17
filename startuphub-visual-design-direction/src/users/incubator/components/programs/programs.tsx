import { ArrowUpRight, Plus } from "lucide-react";
import { Badge, Card, PageHeader, Progress } from "@/components/app/widgets";

const programs = [
  { name: "Cohort VI — General", type: "Incubation", startups: 14, capacity: 16, stage: "Graduation sprint", status: "Active", tone: "accent" as const, pct: 86 },
  { name: "Cohort VII — General", type: "Incubation", startups: 12, capacity: 16, stage: "Week 9 of 16", status: "Active", tone: "accent" as const, pct: 56 },
  { name: "Sprint: AgriTech Deep Dive", type: "Sprint", startups: 8, capacity: 10, stage: "Milestone week 6", status: "Active", tone: "accent" as const, pct: 68 },
  { name: "Cohort VIII — Intake", type: "Incubation", startups: 0, capacity: 16, stage: "Applications open", status: "Intake", tone: "warn" as const, pct: 0 },
  { name: "Cohort V — Alumni", type: "Incubation", startups: 16, capacity: 16, stage: "Graduated Jan 2026", status: "Completed", tone: "default" as const, pct: 100 },
];

const applications = [
  { startup: "MedData Labs", sector: "HealthTech", stage: "MVP", score: 84, status: "Shortlisted", since: "Mar 24", reviewer: "Rohan" },
  { startup: "SilkRoute AI", sector: "Logistics", stage: "Validation", score: 79, status: "In review", since: "Mar 27", reviewer: "Meera" },
  { startup: "BloomBio", sector: "BioTech", stage: "MVP", score: 76, status: "In review", since: "Mar 28", reviewer: "Arjun" },
  { startup: "CartEdge", sector: "Commerce", stage: "Idea", score: 71, status: "New", since: "Apr 01", reviewer: "Unassigned" },
  { startup: "NorthWind Energy", sector: "ClimateTech", stage: "MVP", score: 88, status: "Shortlisted", since: "Mar 22", reviewer: "Meera" },
  { startup: "Ledgerly", sector: "FinTech", stage: "Growth", score: 66, status: "New", since: "Apr 02", reviewer: "Unassigned" },
];

const tone = (s: string) =>
  s === "Shortlisted" ? "good" : s === "In review" ? "warn" : "default" as const;

export function Programs() {
  return (
    <div className="space-y-5">
      <PageHeader
        title="Programs"
        desc="Design, run and graduate programs — with the full intake pipeline attached."
        actions={<button className="inline-flex items-center gap-1.5 rounded-[10px] bg-accent px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-accent-deep"><Plus className="h-3.5 w-3.5" /> Create program</button>}
      />

      <Card title="All programs" pad={false}>
        <ul className="divide-y divide-line">
          {programs.map((p) => (
            <li key={p.name} className="flex flex-col gap-3 px-5 py-4 lg:flex-row lg:items-center">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-[14px] font-semibold text-ink">{p.name}</p>
                  <Badge>{p.type}</Badge>
                  <Badge tone={p.tone === "accent" ? "accent" : p.tone === "warn" ? "warn" : "default"}>{p.status}</Badge>
                </div>
                <p className="mt-1 text-[12px] text-slate-400">{p.stage}</p>
              </div>
              <div className="flex items-center gap-5">
                <div className="w-36">
                  <div className="flex justify-between text-[10.5px] text-slate-400"><span>{p.startups}/{p.capacity} startups</span><span>{p.pct}%</span></div>
                  <Progress value={p.pct} tone={p.status === "Intake" ? "warn" : "accent"} className="mt-1.5" />
                </div>
                <ArrowUpRight className="h-4 w-4 text-slate-300" />
              </div>
            </li>
          ))}
        </ul>
      </Card>

      {/* applications */}
      <Card
        id="applications"
        title="Applications — Cohort VIII intake"
        action={<Badge tone="accent">{applications.length} received</Badge>}
        pad={false}
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left">
            <thead>
              <tr className="border-b border-line">
                {["Startup", "Sector", "Stage", "AI score", "Reviewer", "Applied", "Status", ""].map((h) => (
                  <th key={h} className="px-5 py-3.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {applications.map((a) => (
                <tr key={a.startup} className="group">
                  <td className="px-5 py-4 text-[13.5px] font-semibold text-ink">{a.startup}</td>
                  <td className="px-5 py-4"><Badge>{a.sector}</Badge></td>
                  <td className="px-5 py-4 text-[12.5px] text-slate-500">{a.stage}</td>
                  <td className="px-5 py-4">
                    <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${a.score >= 80 ? "bg-emerald-50 text-emerald-600" : a.score >= 72 ? "bg-accent-soft text-accent" : "bg-slate-100 text-slate-400"}`}>
                      {a.score}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-[12.5px] text-slate-500">{a.reviewer}</td>
                  <td className="px-5 py-4 text-[12.5px] text-slate-400">{a.since}</td>
                  <td className="px-5 py-4"><Badge tone={tone(a.status)}>{a.status}</Badge></td>
                  <td className="px-5 py-4">
                    <button className="text-[12px] font-semibold text-accent opacity-0 transition-opacity hover:underline group-hover:opacity-100">
                      Evaluate
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* evaluation criteria */}
      <Card title="Evaluation criteria — Cohort VIII" action={<button className="text-[12px] font-semibold text-accent">Edit weights</button>}>
        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {[
            ["Problem clarity", "20%"], ["Team", "20%"], ["Market size", "15%"],
            ["Traction signal", "15%"], ["MVP maturity", "15%"], ["Coachability", "15%"],
          ].map(([c, w]) => (
            <div key={c} className="rounded-xl border border-line p-4 text-center">
              <span className="text-xl font-semibold tabular-nums text-accent">{w}</span>
              <p className="mt-1 text-[11.5px] font-medium leading-tight text-slate-500">{c}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
