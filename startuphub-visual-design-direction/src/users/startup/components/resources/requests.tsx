import { Badge, Card, PageHeader } from "@/components/app/widgets";

const requests = [
  { item: "GPU cluster — v2 load test", type: "Compute", qty: "$8.2K", status: "Approved", fit: 96, eta: "Immediate", tone: "good" as const },
  { item: "ArcGIS Pro licenses × 2", type: "Tooling", qty: "2 seats", status: "In review", fit: 88, eta: "2 days", tone: "warn" as const },
  { item: "Wet lab bench — CIED Pune", type: "Lab time", qty: "40 hrs", status: "Approved", fit: 74, eta: "Booked Apr 14", tone: "good" as const },
  { item: "Legal retainer — FER response", type: "IPR", qty: "1 session", status: "Submitted", fit: 91, eta: "Review queue", tone: "default" as const },
  { item: "Agronomy interns × 2 (via talent pool)", type: "Talent", qty: "6 mo", status: "Shortlisting", fit: 85, eta: "3 candidates", tone: "accent" as const },
];

export function ResourceRequests() {
  return (
    <div className="space-y-5">
      <PageHeader title="Resource Requests" desc="Everything you've asked for — status, fit and expected turnaround." />
      <Card pad={false} title={`Active requests (${requests.length})`}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left">
            <thead>
              <tr className="border-b border-line">
                {["Request", "Type", "Qty", "Match score", "Status", "ETA"].map((h) => (
                  <th key={h} className="px-5 py-3.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {requests.map((r) => (
                <tr key={r.item}>
                  <td className="px-5 py-4 text-[13.5px] font-semibold text-ink">{r.item}</td>
                  <td className="px-5 py-4"><Badge>{r.type}</Badge></td>
                  <td className="px-5 py-4 text-[12.5px] font-medium text-slate-500">{r.qty}</td>
                  <td className="px-5 py-4"><span className="rounded-full bg-accent-soft px-2 py-0.5 text-[11px] font-bold text-accent">{r.fit}%</span></td>
                  <td className="px-5 py-4"><Badge tone={r.tone === "good" ? "good" : r.tone === "warn" ? "warn" : r.tone === "accent" ? "accent" : "default"}>{r.status}</Badge></td>
                  <td className="px-5 py-4 text-[12.5px] text-slate-400">{r.eta}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
