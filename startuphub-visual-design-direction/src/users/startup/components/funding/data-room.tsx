import { ArrowUpRight, Eye, Lock, Plus } from "lucide-react";
import { Badge, Card, PageHeader, Progress } from "@/components/app/widgets";

const sections = [
  { name: "Corporate & Legal", docs: 14, completeness: 78, access: "Northgate (read)", visits: 9 },
  { name: "Financials", docs: 8, completeness: 92, access: "Northgate (read)", visits: 14 },
  { name: "IPR & Patents", docs: 5, completeness: 60, access: "Legal counsel only", visits: 6 },
  { name: "Product & Tech", docs: 11, completeness: 88, access: "Northgate (read)", visits: 11 },
  { name: "Customer & Traction", docs: 9, completeness: 71, access: "Requested", visits: 4 },
  { name: "Team & ESOP", docs: 6, completeness: 100, access: "Northgate (read)", visits: 3 },
];

const activity = [
  { who: "Northgate — legal partner", what: "22 min in IPR & Patents", when: "2h ago" },
  { who: "Northgate — Vikram S.", what: "Downloaded Q1 Financial Model", when: "1d ago" },
  { who: "Samriddhi analyst", what: "Requested Traction section access", when: "2d ago" },
];

export function DataRoom() {
  return (
    <div className="space-y-5">
      <PageHeader
        title="Data Room"
        desc="Diligence, pre-assembled — every document versioned, every visitor logged."
        actions={<button className="inline-flex items-center gap-1.5 rounded-[10px] bg-accent px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-accent-deep"><Plus className="h-3.5 w-3.5" /> Grant access</button>}
      />
      <div className="grid gap-5 lg:grid-cols-[1.3fr_1fr]">
        <Card title="Sections" pad={false}>
          <ul className="divide-y divide-line">
            {sections.map((s) => (
              <li key={s.name} className="px-5 py-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <Lock className="h-3.5 w-3.5 text-slate-300" />
                    <p className="text-[13.5px] font-semibold text-ink">{s.name}</p>
                  </div>
                  <div className="flex items-center gap-2.5 text-[11px] text-slate-400">
                    <span>{s.docs} docs</span>
                    <span className="flex items-center gap-1"><Eye className="h-3 w-3" /> {s.visits}</span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-slate-300" />
                  </div>
                </div>
                <div className="mt-2 flex items-center gap-3">
                  <Progress value={s.completeness} tone={s.completeness < 70 ? "warn" : "accent"} className="flex-1" />
                  <span className="w-10 text-right text-[12px] font-semibold tabular-nums text-ink">{s.completeness}%</span>
                </div>
                <p className="mt-1.5 text-[11px] text-slate-400">Access: {s.access}</p>
              </li>
            ))}
          </ul>
        </Card>
        <Card title="Visitor activity" action={<Badge tone="accent">3 this week</Badge>}>
          <ul className="space-y-4">
            {activity.map((a) => (
              <li key={a.when} className="border-l-2 border-accent/60 pl-4">
                <p className="text-[13px] font-semibold text-ink">{a.who}</p>
                <p className="mt-0.5 text-[12.5px] text-slate-500">{a.what}</p>
                <p className="mt-1 text-[11px] text-slate-300">{a.when}</p>
              </li>
            ))}
          </ul>
          <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50/60 p-4 text-[12.5px] leading-relaxed text-slate-600">
            Legal spent most time on the unfiled v2 trademark — expect that question first in the partner meeting.
          </div>
        </Card>
      </div>
    </div>
  );
}
