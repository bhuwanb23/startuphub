import { Plus } from "lucide-react";
import {
  Bar,
  PageIntro,
  Panel,
  PanelLink,
  StatCard,
} from "@/components/app/widgets";
import { cn } from "@/lib/utils";
import {
  DELIVERABLES,
  DELIVERABLE_TONE,
  PROJECTS,
} from "../../constants/work-data";
import { Briefcase, CheckCircle2, ListTodo, Timer } from "lucide-react";

export function TalentWork() {
  return (
    <div className="space-y-6">
      <PageIntro
        title="My work"
        description="Three active engagements with deliverables flowing through review — Pestlens is the one to watch this week."
        action={
          <button className="inline-flex h-9 items-center gap-2 rounded-lg bg-accent px-4 text-[13px] font-semibold text-white transition-colors hover:bg-accent-deep">
            <Plus className="h-4 w-4" /> Add project
          </button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Active projects" value="3" hint="2 on track · 1 at risk" icon={Briefcase} />
        <StatCard label="Tasks this week" value="12" hint="4 due Friday" icon={ListTodo} />
        <StatCard label="On-time delivery" value="94%" delta="+2 pts" icon={Timer} />
        <StatCard label="Completed projects" value="16" icon={CheckCircle2} />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.5fr_1fr]">
        {/* projects */}
        <Panel title="Active projects" action={<PanelLink href="/talent/work/tasks">Tasks</PanelLink>}>
          <ul className="space-y-4">
            {PROJECTS.map((p) => (
              <li key={p.name} className="rounded-lg border border-line bg-soft p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[14px] font-semibold text-ink">{p.name}</p>
                    <p className="mt-0.5 text-[12px] text-slate-400">
                      {p.client} · {p.role}
                    </p>
                  </div>
                  <span className={cn(
                    "shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold",
                    p.progress >= 85 ? "bg-emerald-50 text-emerald-700" : p.progress >= 50 ? "bg-accent-soft text-accent-deep" : "bg-amber-50 text-amber-700",
                  )}>
                    {p.progress >= 85 ? "On track" : p.progress >= 50 ? "Active" : "At risk"}
                  </span>
                </div>
                <div className="mt-3 flex items-center gap-3">
                  <Bar value={p.progress} className="flex-1" tone={p.progress >= 50 ? "accent" : "amber"} />
                  <span className="text-[11.5px] font-bold tabular-nums text-slate-600">{p.progress}%</span>
                </div>
                <p className="mt-2 flex flex-wrap gap-x-4 text-[11.5px] text-slate-500">
                  <span>Due <span className="font-medium text-ink">{p.due}</span></span>
                  <span>{p.deliverables} deliverables</span>
                  <span>{p.team}</span>
                </p>
              </li>
            ))}
          </ul>
        </Panel>

        {/* deliverables */}
        <Panel title="Deliverables" action={<PanelLink href="#">All</PanelLink>} bodyClassName="px-0 py-0 sm:px-0">
          <ul className="divide-y divide-line">
            {DELIVERABLES.map((d) => (
              <li key={d.name} className="flex items-center justify-between gap-3 px-4.5 py-3 transition-colors hover:bg-soft sm:px-5">
                <span className="min-w-0">
                  <span className="block truncate text-[13px] font-medium text-ink">{d.name}</span>
                  <span className="block truncate text-[11.5px] text-slate-400">
                    {d.project} · due {d.due}
                  </span>
                </span>
                <span className={cn("shrink-0 rounded-full px-2 py-0.5 text-[10.5px] font-semibold", DELIVERABLE_TONE[d.status])}>
                  {d.status}
                </span>
              </li>
            ))}
          </ul>
          <div className="border-t border-line px-4.5 py-3.5 sm:px-5">
            <p className="text-[12px] leading-relaxed text-slate-500">
              The cost-guardrail runbook came back with a revision request —
              version 2 is due Mar 28.
            </p>
          </div>
        </Panel>
      </div>
    </div>
  );
}
