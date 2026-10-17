import { Badge, Card, GaugeRing, PageHeader, Progress } from "@/components/app/widgets";

const dims = [
  ["Growth health", 81], ["Financial health", 74], ["Product health", 79],
  ["Team health", 83], ["Market health", 77], ["IP health", 58],
];

const riskBoard = [
  { startup: "FreshChain", risk: "Co-founder conflict + cash", score: 91, trend: "worsening", owner: "Meera", action: "Mediation + bridge plan" },
  { startup: "GridSense", risk: "Runway 3.4 months", score: 78, trend: "stable", owner: "Arjun", action: "Bridge angel shortlist" },
  { startup: "HealthLoop", risk: "Pilot stalled 6 wks", score: 62, trend: "improving", owner: "Rohan", action: "New hospital intro booked" },
  { startup: "QuantumLeaf", risk: "Milestone drift", score: 48, trend: "improving", owner: "Meera", action: "Re-baselined scope" },
];

export function Performance() {
  return (
    <div className="space-y-5">
      <PageHeader title="Performance" desc="Portfolio-level health and risk — the numbers your board and funders ask for." />

      <Card title="Portfolio health — 6 dimensions">
        <div className="grid gap-x-10 gap-y-5 sm:grid-cols-2">
          {dims.map(([l, v]) => (
            <div key={l} className="flex items-center gap-3">
              <span className="w-32 text-[12.5px] font-medium text-slate-600">{l}</span>
              <Progress value={v as number} tone={(v as number) < 65 ? "warn" : "accent"} className="flex-1" />
              <span className="w-8 text-right text-[12.5px] font-semibold tabular-nums text-ink">{v}</span>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid gap-5 lg:grid-cols-2">
        <Card title="Risk board" action={<Badge tone="bad">1 critical</Badge>} pad={false}>
          <ul className="divide-y divide-line">
            {riskBoard.map((r) => (
              <li key={r.startup} className="flex items-center gap-4 px-5 py-4">
                <GaugeRing value={r.score} size={56} label="risk" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-[13.5px] font-semibold text-ink">{r.startup}</p>
                    <Badge tone={r.score > 75 ? "bad" : r.score > 55 ? "warn" : "default"}>{r.trend}</Badge>
                  </div>
                  <p className="mt-0.5 text-[12px] leading-snug text-slate-500">{r.risk}</p>
                  <p className="mt-1 text-[11px] font-medium text-slate-400">{r.owner} · {r.action}</p>
                </div>
              </li>
            ))}
          </ul>
        </Card>

        <Card title="Portfolio KPI snapshot">
          <div className="grid grid-cols-2 gap-4">
            {[
              ["Avg ARR per startup", "₹68L"],
              ["Avg monthly growth", "+9.2%"],
              ["Cohort VI graduation forecast", "86%"],
              ["Patents per startup", "0.9"],
              ["Jobs created (portfolio)", "1,840"],
              ["Follow-on rate", "44%"],
            ].map(([l, v]) => (
              <div key={l} className="rounded-xl border border-line p-4">
                <span className="text-lg font-semibold tracking-tight text-ink tabular-nums">{v}</span>
                <p className="mt-1 text-[11px] leading-tight text-slate-400">{l}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
