import { Download } from "lucide-react";
import { Badge, Card, PageHeader } from "@/components/app/widgets";
import { incubOutcomes } from "@/users/incubator/constants/dashboard-data";

const reports = [
  { title: "Q1 2026 Program Report", scope: "All programs", months: "Jan–Mar", format: "PDF · 22 p", ready: true },
  { title: "Cohort V Outcome Report", scope: "Cohort V alumni", months: "Annual", format: "PDF · 14 p", ready: true },
  { title: "Portfolio Funding Summary", scope: "Funding only", months: "Q1 2026", format: "XLSX", ready: true },
  { title: "Funder Impact Deck — April", scope: "For government funder", months: "Monthly", format: "PDF · 8 p", ready: false },
];

export function Reports() {
  return (
    <div className="space-y-5">
      <PageHeader
        title="Reports & Analytics"
        desc="Program effectiveness and portfolio outcomes, exportable for funders and boards."
        actions={<button className="rounded-[10px] border border-line bg-white px-4 py-2.5 text-[13px] font-semibold text-ink hover:border-slate-300">Custom report</button>}
      />

      <Card title="Program impact — trailing 12 months">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {incubOutcomes.map((o) => (
            <div key={o.k} className="rounded-xl bg-accent-mist p-5 text-center">
              <span className="text-[1.7rem] font-semibold tracking-tight text-ink tabular-nums">{o.v}</span>
              <p className="mt-1 text-[11.5px] font-medium leading-tight text-slate-600">{o.k}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card title="Report library" pad={false}>
        <ul className="divide-y divide-line">
          {reports.map((r) => (
            <li key={r.title} className="flex items-center gap-4 px-5 py-4">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent">
                <Download className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[13.5px] font-semibold text-ink">{r.title}</p>
                <p className="mt-0.5 text-[11.5px] text-slate-400">{r.scope} · {r.months} · {r.format}</p>
              </div>
              {r.ready ? (
                <Badge tone="good">Ready</Badge>
              ) : (
                <Badge tone="warn">Generating</Badge>
              )}
              <button className="rounded-lg border border-line px-3.5 py-2 text-[12px] font-semibold text-ink transition-colors hover:border-accent hover:text-accent">
                {r.ready ? "Download" : "Preview"}
              </button>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
