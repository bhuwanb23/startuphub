import { Badge, Card, PageHeader } from "@/components/app/widgets";

const buckets = [
  { type: "Patents", count: 3, value: "₹1.9 Cr est.", note: "2 filed, 1 ready to file", tone: "accent" as const },
  { type: "Trademarks", count: 1, value: "—", note: "v2 brand unprotected — gap", tone: "warn" as const },
  { type: "Copyrights", count: 2, value: "—", note: "Platform code + data schemas", tone: "good" as const },
  { type: "Designs", count: 0, value: "—", note: "Dashboard UX patentable design review pending", tone: "default" as const },
  { type: "Trade secrets", count: 4, value: "—", note: "Model weights, pricing logic, FPO list, inference pipeline", tone: "good" as const },
];

const ownership = [
  ["Lumen AI Pvt Ltd", "6 assets", "Clean"],
  ["Founders (pre-incorp)", "1 asset", "Assignment pending"],
  ["University research tie-in", "0 assets", "N/A — no encumbrance"],
];

export function IpPortfolio() {
  return (
    <div className="space-y-5">
      <PageHeader title="IP Portfolio" desc="Every instrument, counted and valued — the sheet investors will actually look at." />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {buckets.map((b) => (
          <Card key={b.type} className={b.tone === "warn" ? "border-amber-200" : ""}>
            <div className="flex items-center justify-between">
              <h3 className="text-[14px] font-semibold text-ink">{b.type}</h3>
              <Badge tone={b.tone === "warn" ? "warn" : b.tone === "good" ? "good" : "default"}>{b.count} assets</Badge>
            </div>
            <p className="mt-3 text-2xl font-semibold tracking-tight text-ink">{b.value}</p>
            <p className="mt-1 text-[12px] leading-relaxed text-slate-500">{b.note}</p>
          </Card>
        ))}
      </div>
      <Card title="Ownership map">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-line">
                {["Owner", "Assets", "Status"].map((h) => (
                  <th key={h} className="px-2 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {ownership.map(([o, n, s]) => (
                <tr key={o}>
                  <td className="px-2 py-3.5 text-[13.5px] font-semibold text-ink">{o}</td>
                  <td className="px-2 py-3.5 text-[13px] text-slate-500">{n}</td>
                  <td className="px-2 py-3.5">
                    <Badge tone={s === "Clean" ? "good" : "warn"}>{s}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
