import { Building2, Layers, Target, Users } from "lucide-react";
import {
  Bar,
  PageIntro,
  Panel,
  PanelLink,
  StatCard,
} from "@/components/app/widgets";

const COHORTS = [
  { name: "Batch 07 · DeepTech", startups: 14, health: 86 },
  { name: "Batch 06 · Sustainability", startups: 12, health: 74 },
  { name: "Residency · University Track", startups: 9, health: 63 },
];

const WATCHLIST = [
  { name: "VoltEdge", note: "Pilot milestone slipped 2 weeks", flag: "Intervention suggested" },
  { name: "CardioMesh", note: "Key hire open 60+ days", flag: "Talent desk intro" },
  { name: "HarvestOS", note: "Ready for demo day slot", flag: "Advance to market" },
];

export function IncubatorDashboard() {
  return (
    <div className="space-y-6">
      <PageIntro
        title="Program command, Sana"
        description="Three active cohorts, 35 startups in residence. Demo day for Batch 06 is 24 days out."
        action={
          <a
            href="#"
            className="inline-flex h-9 items-center gap-2 rounded-lg bg-accent px-4 text-[13px] font-semibold text-white transition-colors hover:bg-accent-deep"
          >
            <Layers className="h-4 w-4" /> New cohort
          </a>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Startups in residence" value="35" delta="+9" hint="this intake" icon={Building2} />
        <StatCard label="Active cohorts" value="3" hint="1 applications open" icon={Layers} />
        <StatCard label="Mentors engaged" value="48" delta="+6" icon={Users} />
        <StatCard label="Milestone completion" value="81%" delta="+4 pts" icon={Target} />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Cohort health" action={<PanelLink href="#">Analytics</PanelLink>}>
          <ul className="space-y-4">
            {COHORTS.map((c) => (
              <li key={c.name}>
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="text-[13.5px] font-medium text-ink">
                    {c.name}
                    <span className="ml-2 text-[11.5px] font-normal text-slate-400">
                      {c.startups} startups
                    </span>
                  </span>
                  <span className="text-[12px] font-semibold text-slate-500">{c.health}%</span>
                </div>
                <Bar value={c.health} tone={c.health > 80 ? "accent" : c.health > 70 ? "ink" : "amber"} />
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Intervention watchlist" action={<PanelLink href="#">All startups</PanelLink>}>
          <ul className="divide-y divide-line">
            {WATCHLIST.map((w) => (
              <li key={w.name} className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
                <span>
                  <span className="block text-[13.5px] font-medium text-ink">{w.name}</span>
                  <span className="block text-[12px] text-slate-400">{w.note}</span>
                </span>
                <span className="rounded-full bg-accent-soft px-2.5 py-1 text-right text-[11px] font-semibold text-accent-deep">
                  {w.flag}
                </span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </div>
  );
}
