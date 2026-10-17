import { Badge, Card, PageHeader } from "@/components/app/widgets";

const rows = [
  { name: "Lumen AI (you)", usp: "10–14 day early warning + vernacular field ops", price: "₹180–220/acre/yr", tech: "Satellite + edge inference", stage: "Series A", us: true },
  { name: "AgriVue Global", usp: "Enterprise dashboards, global coverage", price: "$14/acre/yr", tech: "Satellite + cloud", stage: "Series C", us: false },
  { name: "CropSense Labs", usp: "Hardware sensors + soil data", price: "₹8K/hectare capex+", tech: "IoT hardware", stage: "Series B", us: false },
  { name: "TerraLens", usp: "Raw imagery marketplace", price: "API call pricing", tech: "Data reseller", stage: "Seed", us: false },
];

const swot: [string, string[], string][] = [
  ["Strengths", ["Early-warning accuracy beat incumbents 2:1", "Vernacular field adoption", "Zero-hardware deployment"], "text-emerald-600"],
  ["Weaknesses", ["No US/EU compliance layer yet", "Single-revenue product", "Smaller team than top competitor"], "text-amber-600"],
  ["Opportunities", ["Insurance-linked agronomy wave", "Government precision-farm subsidies", "SEA cooperatives expansion"], "text-accent"],
  ["Threats", ["Big-tech satellite free-data plays", "CropSense bundling hardware+software", "Commodity price shocks cutting budgets"], "text-red-500"],
];

export function Competitors() {
  return (
    <div className="space-y-5">
      <PageHeader title="Competitor Analysis" desc="The field you're actually fighting on — compared on the axes buyers care about." />
      <Card title="Competitive comparison" pad={false}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left">
            <thead>
              <tr className="border-b border-line">
                {["Player", "USP", "Pricing", "Tech", "Stage"].map((h) => (
                  <th key={h} className="px-5 py-3.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {rows.map((r) => (
                <tr key={r.name} className={r.us ? "bg-accent-mist/40" : ""}>
                  <td className="px-5 py-4 text-[13.5px] font-semibold text-ink">
                    {r.name} {r.us && <Badge tone="accent">You</Badge>}
                  </td>
                  <td className="max-w-[220px] px-5 py-4 text-[12.5px] leading-snug text-slate-500">{r.usp}</td>
                  <td className="px-5 py-4 text-[12.5px] font-medium text-slate-600">{r.price}</td>
                  <td className="px-5 py-4 text-[12.5px] text-slate-500">{r.tech}</td>
                  <td className="px-5 py-4"><Badge>{r.stage}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      <div className="grid gap-4 sm:grid-cols-2">
        {swot.map(([label, items, tone]) => (
          <Card key={label}>
            <h3 className={`text-[13px] font-bold uppercase tracking-[0.14em] ${tone}`}>{label}</h3>
            <ul className="mt-4 space-y-2.5">
              {items.map((i) => (
                <li key={i} className="flex items-start gap-2.5 text-[13px] leading-snug text-slate-600">
                  <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${tone.replace("text-", "bg-")}`} />
                  {i}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </div>
  );
}
