import { Badge, Card, PageHeader } from "@/components/app/widgets";

const risks = [
  { cat: "IP / Legal", risk: "Launching 'Field Alert' unprotected", prob: 90, impact: "High", mitigation: "File trademark this week (₹9K fixed fee)" },
  { cat: "Funding", risk: "Follow-on timeline assumed by investors is looser than plan", prob: 60, impact: "Medium", mitigation: "Set explicit Q3 timeline on profile + brief Northgate" },
  { cat: "Operational", risk: "Pilot 3 depends on cooperative sign-off", prob: 40, impact: "High", mitigation: "Escalate via mentor Sunita's agri-board contacts" },
  { cat: "Product", risk: "GPU grant expiry before v2 load testing", prob: 55, impact: "Medium", mitigation: "Burn remaining grant in 18 days for load + tuning" },
  { cat: "Team", risk: "Agronomy hiring 1 month behind plan", prob: 50, impact: "Medium", mitigation: "Tap StartupHub talent pool — 3 vetted candidates ready" },
  { cat: "Market", risk: "Big-tech free-data entry compresses data-only pricing", prob: 25, impact: "High", mitigation: "Accelerate workflow-lock features (action maps, offline)" },
];

const tone = (i: string) => (i === "High" ? "bad" : i === "Medium" ? "warn" : "default") as "bad" | "warn" | "default";

export function RiskManagement() {
  return (
    <div className="space-y-5">
      <PageHeader
        title="Risk Management"
        desc="Named, scored and mitigated — the register Copilot watches so you don't have to."
      />
      <Card title="Active risk register" pad={false}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left">
            <thead>
              <tr className="border-b border-line">
                {["Category", "Risk", "Prob.", "Impact", "Mitigation"].map((h) => (
                  <th key={h} className="px-5 py-3.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {risks.map((r) => (
                <tr key={r.risk} className="align-top">
                  <td className="px-5 py-4"><Badge>{r.cat}</Badge></td>
                  <td className="max-w-[240px] px-5 py-4 text-[13px] font-medium leading-snug text-ink">{r.risk}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-14 overflow-hidden rounded-full bg-slate-100">
                        <div className={`h-full rounded-full ${r.prob > 70 ? "bg-red-400" : r.prob > 45 ? "bg-amber-400" : "bg-slate-300"}`} style={{ width: `${r.prob}%` }} />
                      </div>
                      <span className="text-[11.5px] font-semibold tabular-nums text-slate-500">{r.prob}%</span>
                    </div>
                  </td>
                  <td className="px-5 py-4"><Badge tone={tone(r.impact)}>{r.impact}</Badge></td>
                  <td className="max-w-[260px] px-5 py-4 text-[12.5px] leading-snug text-slate-500">{r.mitigation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
