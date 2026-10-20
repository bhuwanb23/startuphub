import { Award, Building2, Video } from "lucide-react";
import {
  Avatar,
  PageIntro,
  Panel,
  PanelLink,
  StatCard,
} from "@/components/app/widgets";

const MENTEES = [
  { name: "Ravi Sharma", startup: "Lumen AI", stage: "Incubation", next: "Today · 4:30 PM" },
  { name: "Ananya Rao", startup: "Canopy Analytics", stage: "Seed", next: "Tomorrow · 10:00 AM" },
  { name: "Vikram Iyer", startup: "RootStack", stage: "Validation", next: "Thu · 1:00 PM" },
];

const REQUESTS = [
  { name: "HarvestOS", sector: "AgriTech", note: "Needs pricing strategy review" },
  { name: "CardioMesh", sector: "HealthTech", note: "Enterprise sales motion" },
];

export function MentorDashboard() {
  return (
    <div className="space-y-6">
      <PageIntro
        title="Welcome back, Priya"
        description="Three mentees have sessions this week. Two new startup requests match your GTM expertise."
        action={
          <a
            href="#"
            className="inline-flex h-9 items-center gap-2 rounded-lg bg-accent px-4 text-[13px] font-semibold text-white transition-colors hover:bg-accent-deep"
          >
            <Video className="h-4 w-4" /> Start session
          </a>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Active mentees" value="5" hint="across 3 sectors" icon={Building2} />
        <StatCard label="Sessions this month" value="14" delta="+3" hint="vs last month" icon={Award} />
        <StatCard label="Milestones guided" value="21" delta="6 new" icon={Award} />
        <StatCard label="Mentor rating" value="4.9" hint="from 38 reviews" icon={Award} />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Your startups" action={<PanelLink href="#">View all</PanelLink>}>
          <ul className="divide-y divide-line">
            {MENTEES.map((m) => (
              <li key={m.startup} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                <Avatar name={m.name} />
                <span className="flex-1">
                  <span className="block text-[13.5px] font-medium text-ink">{m.startup}</span>
                  <span className="block text-[12px] text-slate-400">
                    {m.name} · {m.stage}
                  </span>
                </span>
                <span className="text-right text-[12px] font-medium text-slate-500">{m.next}</span>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Matching requests" action={<PanelLink href="#">All requests</PanelLink>}>
          <ul className="divide-y divide-line">
            {REQUESTS.map((r) => (
              <li key={r.name} className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
                <span>
                  <span className="block text-[13.5px] font-medium text-ink">{r.name}</span>
                  <span className="block text-[12px] text-slate-400">
                    {r.sector} · {r.note}
                  </span>
                </span>
                <span className="flex gap-2">
                  <a href="#" className="rounded-lg border border-line px-3 py-1.5 text-[12px] font-medium text-slate-500 transition-colors hover:bg-soft">Pass</a>
                  <a href="#" className="rounded-lg bg-accent px-3 py-1.5 text-[12px] font-semibold text-white transition-colors hover:bg-accent-deep">Accept</a>
                </span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </div>
  );
}
