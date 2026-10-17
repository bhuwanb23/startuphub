import { Plus } from "lucide-react";
import { Badge, Card, PageHeader, Progress } from "@/components/app/widgets";

const milestones = [
  { startup: "Lumen AI", name: "Final demo — Demo Day", due: "Apr 28", pct: 86, status: "On track", tone: "good" as const },
  { startup: "AquaPure", name: "Unit 20 deployment", due: "Apr 15", pct: 91, status: "On track", tone: "good" as const },
  { startup: "TerraGrid", name: "3-operator pilot bundle", due: "Apr 20", pct: 64, status: "Watch", tone: "warn" as const },
  { startup: "FinEdge", name: "NBFC pilot #3 go-live", due: "Apr 30", pct: 42, status: "Watch", tone: "warn" as const },
  { startup: "FreshChain", name: "Rohatgi distribution MOU", due: "Apr 10", pct: 20, status: "At risk", tone: "bad" as const },
  { startup: "OrbitalWorks", name: "Ground station #10 live", due: "May 06", pct: 55, status: "On track", tone: "good" as const },
];

const stats = [
  ["Active", 24], ["Completed this quarter", 61], ["Overdue", 5], ["At risk", 3],
];

export function Milestones() {
  return (
    <div className="space-y-5">
      <PageHeader
        title="Milestones & Roadmaps"
        desc="Every commitment across every cohort — progress, ownership and drift visibility."
        actions={<button className="inline-flex items-center gap-1.5 rounded-[10px] bg-accent px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-accent-deep"><Plus className="h-3.5 w-3.5" /> Create milestone</button>}
      />

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {stats.map(([l, v]) => (
          <Card key={l as string} pad={false}>
            <div className="p-5 text-center">
              <span className="text-[1.8rem] font-semibold tracking-tight text-ink tabular-nums">{v}</span>
              <p className="mt-1 text-[12px] font-medium text-slate-500">{l}</p>
            </div>
          </Card>
        ))}
      </div>

      <Card title="All milestones" pad={false}>
        <ul className="divide-y divide-line">
          {milestones.map((m) => (
            <li key={m.name} className="grid gap-3 px-5 py-4 sm:grid-cols-[1fr_auto] sm:items-center">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge tone="default">{m.startup}</Badge>
                  <p className="text-[13.5px] font-semibold text-ink">{m.name}</p>
                  <Badge tone={m.tone === "good" ? "good" : m.tone === "warn" ? "warn" : "bad"}>{m.status}</Badge>
                </div>
                <p className="mt-1 text-[11.5px] text-slate-400">Due {m.due}</p>
              </div>
              <div className="w-40 shrink-0">
                <div className="flex justify-between text-[11px] text-slate-400"><span>progress</span><span>{m.pct}%</span></div>
                <Progress value={m.pct} tone={m.tone === "bad" ? "bad" : m.tone === "warn" ? "warn" : "good"} className="mt-1" />
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
