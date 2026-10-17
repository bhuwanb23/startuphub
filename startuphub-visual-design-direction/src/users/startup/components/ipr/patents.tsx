import { FileText, Plus } from "lucide-react";
import { Badge, Card, PageHeader } from "@/components/app/widgets";

const lifecycle = ["Draft", "Filed", "Published", "FER", "Responded", "Grant"];

const patents = [
  {
    title: "Multispectral crop stress inference", number: "IN 2024/112233", filed: "Nov 2024",
    stage: 4, counsel: "Dr. Meera Krishnan", next: "Claims v3 review — overdue 3 days", tone: "warn" as const,
  },
  {
    title: "Per-acre yield attribution method", number: "IN 2025/441208", filed: "Feb 2025",
    stage: 3, counsel: "Dr. Meera Krishnan", next: "FER response due Jun 02", tone: "accent" as const,
  },
  {
    title: "Drone-edge preprocessing pipeline", number: "—", filed: "—",
    stage: 0, counsel: "Unassigned", next: "Patentability search clear — ready to file", tone: "good" as const,
  },
];

export function PatentManagement() {
  return (
    <div className="space-y-5">
      <PageHeader
        title="Patent Management"
        desc="Every filing as a living pipeline — stage, counsel and next action on one line."
        actions={<button className="inline-flex items-center gap-1.5 rounded-[10px] bg-accent px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-accent-deep"><Plus className="h-3.5 w-3.5" /> New provisional</button>}
      />
      <div className="space-y-4">
        {patents.map((p) => (
          <Card key={p.title}>
            <div className="flex items-start gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
                <FileText className="h-4.5 w-4.5" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-[15px] font-semibold text-ink">{p.title}</h3>
                  <Badge tone="default">{p.number}</Badge>
                  {p.tone === "warn" && <Badge tone="warn">Action needed</Badge>}
                </div>
                <p className="mt-1 text-[12px] text-slate-400">Filed {p.filed} · Counsel: {p.counsel}</p>
                {/* pipeline */}
                <div className="mt-4 flex items-center">
                  {lifecycle.map((s, i) => {
                    const done = i < p.stage;
                    const current = i === p.stage;
                    return (
                      <div key={s} className="flex flex-1 items-center last:flex-none">
                        <div className="flex flex-col items-center gap-1">
                          <span className={`h-3 w-3 rounded-full border-2 transition-colors ${done ? "border-accent bg-accent" : current ? "border-accent bg-white ring-4 ring-accent/15" : "border-slate-200 bg-white"}`} />
                          <span className={`whitespace-nowrap text-[9.5px] font-semibold ${current ? "text-accent" : "text-slate-300"}`}>{s}</span>
                        </div>
                        {i < lifecycle.length - 1 && <div className={`mx-1 h-0.5 flex-1 rounded ${i < p.stage ? "bg-accent" : "bg-slate-100"}`} />}
                      </div>
                    );
                  })}
                </div>
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-slate-50 px-4 py-3">
                  <p className="text-[12.5px] font-medium text-slate-600">
                    <span className="font-semibold text-accent">Next: </span>{p.next}
                  </p>
                  <button className="text-[12px] font-semibold text-accent hover:underline">Open file</button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
