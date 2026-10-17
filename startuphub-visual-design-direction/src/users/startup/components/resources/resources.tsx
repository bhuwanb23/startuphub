import { ArrowUpRight, Plus } from "lucide-react";
import { Badge, Card, PageHeader, Progress } from "@/components/app/widgets";

const recommended = [
  { title: "GPU Compute Grant", provider: "Nimbus Cloud Research", value: "$40K", fit: 96, why: "Your Q2 inference scaling plan qualifies directly" },
  { title: "Satellite Data Sandbox", provider: "ISRO Tech Transfer", value: "Free tier", fit: 91, why: "New multispectral bands available for your models" },
  { title: "ESOP Design Session", provider: "SH Legal Desk", value: "Free", fit: 83, why: "Team of 28 — ESOP pool refresh is due" },
];

const allocated = [
  { name: "Nimbus Cloud — Tier I", type: "Cloud credits", used: 62, note: "$15.5K of $25K used", expiry: "Dec 2026" },
  { name: "GPU Cluster Grant", type: "Compute", used: 78, note: "Expires in 18 days — unused portion lost", expiry: "18 days" },
  { name: "SignalWorks Analytics", type: "Tooling", used: 34, note: "1 year free · renews Jul", expiry: "Jul 2026" },
];

const requests = [
  { item: "Wet lab bench — CIED Pune", status: "Approved", date: "Mar 20", tone: "good" as const },
  { item: "ArcGIS Pro licenses × 2", status: "In review", date: "Mar 28", tone: "warn" as const },
  { item: "Legal retainer — IP review", status: "Approved", date: "Mar 12", tone: "good" as const },
  { item: "Hiring: 2 agronomy interns", status: "Submitted", date: "Apr 01", tone: "default" as const },
];

export function Resources() {
  return (
    <div className="space-y-5">
      <PageHeader
        title="Resources"
        desc="Everything the ecosystem offers — claimed, requested, and recommended for your stage."
        actions={<button className="inline-flex items-center gap-1.5 rounded-[10px] bg-accent px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-accent-deep"><Plus className="h-3.5 w-3.5" /> New request</button>}
      />

      <Card title="AI resource matches" action={<Badge tone="accent">3 recommended</Badge>} pad={false}>
        <ul className="divide-y divide-line">
          {recommended.map((r) => (
            <li key={r.title} className="flex items-center gap-4 px-5 py-4">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2.5">
                  <p className="text-[14px] font-semibold text-ink">{r.title}</p>
                  <span className="text-[11.5px] font-semibold text-emerald-600">{r.value}</span>
                </div>
                <p className="mt-0.5 text-[12px] text-slate-500">{r.provider} · {r.why}</p>
              </div>
              <div className="flex shrink-0 items-center gap-2.5">
                <span className="rounded-full bg-accent-soft px-2.5 py-1 text-[11px] font-bold text-accent">{r.fit}%</span>
                <button className="flex items-center gap-1 rounded-lg border border-line px-3 py-1.5 text-[12px] font-semibold text-ink transition-colors hover:border-accent hover:text-accent">
                  Claim <ArrowUpRight className="h-3 w-3" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </Card>

      <div className="grid gap-5 lg:grid-cols-2">
        <Card title="Allocated resources" action={<Badge>3 active</Badge>}>
          <ul className="space-y-4">
            {allocated.map((a) => (
              <li key={a.name}>
                <div className="flex items-baseline justify-between gap-3">
                  <p className="text-[13.5px] font-semibold text-ink">{a.name}</p>
                  <span className="text-[11px] text-slate-400">{a.type}</span>
                </div>
                <Progress value={a.used} tone={a.used > 75 ? "warn" : "accent"} className="mt-2" />
                <div className="mt-1.5 flex items-center justify-between text-[11px] text-slate-400">
                  <span>{a.note}</span>
                  <span className={a.expiry.includes("days") ? "font-semibold text-amber-500" : ""}>{a.expiry}</span>
                </div>
              </li>
            ))}
          </ul>
        </Card>

        <Card title="Resource requests" pad={false}>
          <ul className="divide-y divide-line">
            {requests.map((r) => (
              <li key={r.item} className="flex items-center justify-between gap-3 px-5 py-4">
                <div className="min-w-0">
                  <p className="truncate text-[13.5px] font-medium text-ink">{r.item}</p>
                  <p className="mt-0.5 text-[11px] text-slate-400">Requested {r.date}</p>
                </div>
                <Badge tone={r.tone === "good" ? "good" : r.tone === "warn" ? "warn" : "default"}>{r.status}</Badge>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
