import { Clock3, FileSignature, FolderKanban, ShieldCheck } from "lucide-react";
import {
  Avatar,
  Bar,
  PageIntro,
  Panel,
  PanelLink,
  StatCard,
} from "@/components/app/widgets";

const DEADLINES = [
  { matter: "Lumen AI · Provisional → complete specification", date: "In 5 days", tone: "amber" as const },
  { matter: "VoltEdge · Trademark class 9 response", date: "In 9 days", tone: "green" as const },
  { matter: "RootStack · PCT national phase", date: "In 21 days", tone: "green" as const },
];

const MATTERS = [
  { client: "Lumen AI", type: "Patent", progress: 72 },
  { client: "MedSynapse", type: "Patent ×2", progress: 45 },
  { client: "HarvestOS", type: "Trademark", progress: 88 },
];

export function IprDashboard() {
  return (
    <div className="space-y-6">
      <PageIntro
        title="IP desk, Kavya"
        description="Nine active matters. One statutory deadline this week — the Lumen AI complete specification."
        action={
          <a
            href="#"
            className="inline-flex h-9 items-center gap-2 rounded-lg bg-accent px-4 text-[13px] font-semibold text-white transition-colors hover:bg-accent-deep"
          >
            <FileSignature className="h-4 w-4" /> New filing
          </a>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Active matters" value="9" hint="4 patents · 3 TM · 2 design" icon={FolderKanban} />
        <StatCard label="Filed this quarter" value="12" delta="+5" hint="vs Q3" icon={FileSignature} />
        <StatCard label="Deadlines ≤ 30 days" value="4" hint="1 this week" icon={Clock3} />
        <StatCard label="Grant rate" value="92%" delta="+3 pts" icon={ShieldCheck} />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Statutory deadlines" action={<PanelLink href="#">Calendar</PanelLink>}>
          <ul className="divide-y divide-line">
            {DEADLINES.map((d) => (
              <li key={d.matter} className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
                <span className="text-[13.5px] font-medium text-ink">{d.matter}</span>
                <span
                  className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                    d.tone === "amber"
                      ? "bg-amber-50 text-amber-700"
                      : "bg-emerald-50 text-emerald-700"
                  }`}
                >
                  {d.date}
                </span>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Matter progress" action={<PanelLink href="#">All matters</PanelLink>}>
          <ul className="space-y-4">
            {MATTERS.map((m) => (
              <li key={m.client}>
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="flex items-center gap-2.5 text-[13.5px] font-medium text-ink">
                    <Avatar name={m.client} className="h-6 w-6 text-[9px]" />
                    {m.client}
                    <span className="text-[11.5px] font-normal text-slate-400">{m.type}</span>
                  </span>
                  <span className="text-[12px] font-semibold text-slate-500">{m.progress}%</span>
                </div>
                <Bar value={m.progress} />
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </div>
  );
}
