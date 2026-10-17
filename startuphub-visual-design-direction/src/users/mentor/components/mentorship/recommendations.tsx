import { Plus } from "lucide-react";
import { Badge, Card, PageHeader } from "@/components/app/widgets";

const active = [
  { startup: "Lumen AI", rec: "Move inference batching to windowed pre-processing — target ₹2.8/acre by May", impact: "High", status: "In progress", date: "Apr 02", tone: "accent" as const },
  { startup: "OrbitalWorks", rec: "Split ground-segment ingest from compute — independent scaling saves 22% ops cost", impact: "High", status: "Accepted", date: "Mar 30", tone: "good" as const },
  { startup: "GridSense", rec: "Cut scope to 2 pilots; bridge narrative on retention, not growth", impact: "High", status: "In progress", date: "Mar 24", tone: "warn" as const },
];

const history = [
  { startup: "ZetaStack", rec: "Event-sourced ledger rebuild — prevented a haemorrhaging production bug", impact: "₹4 Cr loss avoided", date: "Oct 2024" },
  { startup: "PayU-scale fintech", rec: "Team re-org into 4 pods — shipped the fraud module 8 weeks early", impact: "8 wks faster", date: "Aug 2024" },
  { startup: "Lumen AI", rec: "CFO-angle narrative for agri buyers — doubled enterprise pilot conversion", impact: "2× pilots", date: "Dec 2024" },
];

const tasks = [
  { startup: "Lumen AI", task: "Benchmark spot vs reserved GPU for Q3", due: "Apr 15", status: "In progress", tone: "accent" as const },
  { startup: "OrbitalWorks", task: "Document failure modes of station #7 for postmortem", due: "Apr 18", status: "Pending", tone: "default" as const },
  { startup: "GridSense", task: "Bridge deck v1 — 15 slides, hard retention story", due: "Apr 12", status: "Urgent", tone: "bad" as const },
  { startup: "BloomBio", task: "Send sample throughput logs from last 4 weeks", due: "Apr 14", status: "Pending", tone: "default" as const },
];

export function Recommendations() {
  return (
    <div className="space-y-5">
      <PageHeader
        title="Recommendations & Tasks"
        desc="What you told them to do, what they did with it — and what it changed."
        actions={<button className="inline-flex items-center gap-1.5 rounded-[10px] bg-accent px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-accent-deep"><Plus className="h-3.5 w-3.5" /> New recommendation</button>}
      />
      <div className="grid gap-5 lg:grid-cols-2">
        <Card title="Active recommendations" pad={false}>
          <ul className="divide-y divide-line">
            {active.map((r) => (
              <li key={r.rec} className="px-5 py-4">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-[13.5px] font-medium leading-snug text-ink">{r.rec}</p>
                  <Badge tone={r.tone}>{r.status}</Badge>
                </div>
                <p className="mt-2 flex items-center gap-2 text-[11.5px] text-slate-400">
                  <span className="font-semibold text-slate-500">{r.startup}</span> · {r.date} · impact {r.impact}
                </p>
              </li>
            ))}
          </ul>
        </Card>
        <Card title="Assigned tasks" action={<button className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-accent"><Plus className="h-3 w-3" /> Assign task</button>} pad={false}>
          <ul className="divide-y divide-line">
            {tasks.map((t) => (
              <li key={t.task} className="flex items-center justify-between gap-3 px-5 py-4">
                <div className="min-w-0">
                  <p className="text-[13px] font-medium text-ink">{t.task}</p>
                  <p className="mt-0.5 text-[11px] text-slate-400">{t.startup} · due {t.due}</p>
                </div>
                <Badge tone={t.tone === "bad" ? "bad" : t.tone === "accent" ? "accent" : "default"}>{t.status}</Badge>
              </li>
            ))}
          </ul>
        </Card>
      </div>
      <Card title="Recommendation impact — history that proves it works">
        <div className="grid gap-4 sm:grid-cols-3">
          {history.map((h) => (
            <div key={h.rec} className="rounded-xl border border-line p-5">
              <Badge tone="default">{h.date}</Badge>
              <p className="mt-3 text-[12.5px] font-medium leading-relaxed text-ink">{h.rec}</p>
              <p className="mt-2 text-lg font-semibold text-accent">{h.impact}</p>
              <p className="mt-1 text-[11px] text-slate-400">{h.startup}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
