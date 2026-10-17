import { Plus } from "lucide-react";
import Link from "next/link";
import { Badge, Card, PageHeader, Progress } from "@/components/app/widgets";

const applications = [
  { program: "Climate Sandbox Accelerator", org: "Horizon Fund", status: "Under review", applied: "Mar 22", stage: 3, stages: 4 },
  { program: "AgriTech Innovation Challenge", org: "National Agri Mission", status: "Accepted", applied: "Mar 10", stage: 4, stages: 4 },
  { program: "DeepTech Scale Lab", org: "CIED Pune", status: "Draft", applied: "—", stage: 1, stages: 4 },
];

const recommended = [
  { name: "Startup Karnataka Grant Window", fit: 93, note: "Your 14-state footprint qualifies for the max slab", when: "Opens Apr 15" },
  { name: "Space-Tech Transfer Program", fit: 81, note: "ISRO data sandbox matches your inference stack", when: "Rolling" },
  { name: "T-Hub Cross-Border Cohort", fit: 77, note: "SEA expansion is your stated Q3 goal", when: "May 02" },
];

const milestones = [
  { name: "Cohort VI final demo", due: "Apr 28", done: false },
  { name: "Mentor hours: 40/50 completed", due: "Apr 30", done: false },
  { name: "KPI baseline submitted", due: "Apr 05", done: true },
];

export function Incubation() {
  return (
    <div className="space-y-5">
      <PageHeader
        title="Incubation"
        desc="Programs you're in, programs you're courting, and the work between."
        actions={<Link href="/founder/incubation/discover" className="inline-flex items-center gap-1.5 rounded-[10px] bg-accent px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-accent-deep"><Plus className="h-3.5 w-3.5" /> Discover programs</Link>}
      />

      <Card
        title="My applications"
        action={<Badge tone="accent">{applications.length} active</Badge>}
        pad={false}
      >
        <ul className="divide-y divide-line">
          {applications.map((a) => (
            <li key={a.program} className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center">
              <div className="min-w-0 flex-1">
                <p className="text-[14px] font-semibold text-ink">{a.program}</p>
                <p className="mt-0.5 text-[12px] text-slate-400">{a.org} · applied {a.applied}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {Array.from({ length: a.stages }).map((_, i) => (
                    <span key={i} className={`h-1.5 w-6 rounded-full ${i < a.stage ? "bg-accent" : "bg-slate-100"}`} />
                  ))}
                </div>
                <Badge tone={a.status === "Accepted" ? "good" : a.status === "Draft" ? "default" : "warn"}>{a.status}</Badge>
              </div>
            </li>
          ))}
        </ul>
      </Card>

      <div className="grid gap-5 lg:grid-cols-2">
        <Card title="Recommended programs">
          <ul className="space-y-3">
            {recommended.map((r) => (
              <li key={r.name} className="rounded-xl border border-line p-4 transition-all hover:border-accent/30 hover:bg-accent-mist/40">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[13.5px] font-semibold text-ink">{r.name}</p>
                  <span className="shrink-0 rounded-full bg-accent-soft px-2.5 py-1 text-[11px] font-bold text-accent">{r.fit}% fit</span>
                </div>
                <p className="mt-1.5 text-[12px] leading-relaxed text-slate-500">{r.note}</p>
                <p className="mt-2 text-[11px] font-semibold uppercase tracking-wide text-slate-400">{r.when}</p>
              </li>
            ))}
          </ul>
        </Card>

        <div className="space-y-5">
          <Card title="Incubation workspace — StartupHub Labs">
            <div className="flex items-center justify-between">
              <p className="text-[13.5px] font-semibold text-ink">Cohort VI · Graduation sprint</p>
              <Badge tone="good">On track</Badge>
            </div>
            <Progress value={86} className="mt-3" />
            <p className="mt-2 text-[11.5px] text-slate-400">86% of program requirements complete · Demo Day Apr 28</p>
            <ul className="mt-4 space-y-2.5 border-t border-line pt-4">
              {milestones.map((m) => (
                <li key={m.name} className="flex items-center gap-2.5 text-[12.5px]">
                  <span className={`h-1.5 w-1.5 rounded-full ${m.done ? "bg-emerald-500" : "bg-amber-400"}`} />
                  <span className={m.done ? "text-slate-300 line-through" : "text-slate-600"}>{m.name}</span>
                  <span className="ml-auto text-[11px] text-slate-400">{m.due}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card title="Program benefits in use">
            <div className="grid grid-cols-2 gap-3">
              {[
                ["Mentor hours", "40 / 50"],
                ["Lab credits used", "₹3.2L"],
                ["Legal sessions", "3 used"],
                ["Peer AMAs attended", "11"],
              ].map(([l, v]) => (
                <div key={l} className="rounded-xl bg-slate-50 p-3.5 text-center">
                  <span className="block text-[15px] font-semibold text-ink tabular-nums">{v}</span>
                  <span className="mt-0.5 block text-[10.5px] text-slate-400">{l}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
