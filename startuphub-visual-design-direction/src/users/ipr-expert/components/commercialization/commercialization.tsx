import { ArrowUpRight, Download } from "lucide-react";
import { Badge, Card, PageHeader, Progress } from "@/components/app/widgets";

const valuations = [
  { asset: "GroundEdge Stream (OrbitalWorks)", method: "Income approach", value: "₹5.4 Cr", basis: "₹42L/yr licensing × 5-yr multiple", growth: "+18%" },
  { asset: "Crop-stress inference (Lumen AI)", method: "Market approach", value: "₹4.8 Cr", basis: "3 comparable AI-patent acquisitions", growth: "+31%" },
  { asset: "Consent Mesh (MedSync)", method: "Income approach", value: "₹2.6 Cr", basis: "₹18L/yr site licenses + pipeline", growth: "+9%" },
  { asset: "Dispatch scheduling (TerraGrid)", method: "Cost approach", value: "₹1.9 Cr", basis: "Recreation cost + 2-yr lead time", growth: "+6%" },
];

const licenses = [
  { client: "OrbitalWorks", deal: "GroundEdge Stream — data licensing", licensee: "SkyPort Logistics", value: "₹42L / yr", term: "3 yrs", stage: "Negotiation", tone: "accent" as const },
  { client: "MedSync", deal: "Consent Mesh API — site license", licensee: "Apollo Chennai", value: "₹18L / yr", term: "2 yrs", stage: "Signed", tone: "good" as const },
  { client: "Lumen AI", deal: "Vision model — agri-coop licensing", licensee: "Guntur FPO", value: "₹64L / yr", term: "3 yrs", stage: "Term sheet", tone: "accent" as const },
];

export function IpValuation() {
  return (
    <div className="space-y-5">
      <PageHeader
        title="IP Valuation"
        desc="What each asset is worth, how it was valued, and what it earns."
        actions={<button className="inline-flex items-center gap-1.5 rounded-[10px] border border-line bg-white px-4 py-2.5 text-[13px] font-semibold text-ink hover:border-slate-300"><Download className="h-3.5 w-3.5" /> Export valuation report</button>}
      />
      <Card title="Valuation dashboard" pad={false}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left">
            <thead>
              <tr className="border-b border-line">
                {["Asset", "Method", "Valuation", "Basis", "12-mo"].map((h) => (
                  <th key={h} className="px-5 py-3.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {valuations.map((v) => (
                <tr key={v.asset}>
                  <td className="px-5 py-4 text-[13px] font-semibold text-ink">{v.asset}</td>
                  <td className="px-5 py-4"><Badge>{v.method}</Badge></td>
                  <td className="px-5 py-4 text-[14px] font-bold tabular-nums text-accent">{v.value}</td>
                  <td className="max-w-[260px] px-5 py-4 text-[12px] leading-snug text-slate-500">{v.basis}</td>
                  <td className="px-5 py-4"><span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-emerald-600">{v.growth}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      <Card title="Portfolio value trend">
        <div className="grid gap-4 sm:grid-cols-4">
          {[
            ["Total portfolio", "₹18.6 Cr"],
            ["Licensing revenue / yr", "₹1.24 Cr"],
            ["Assets commercialized", "11"],
            ["Avg. value per asset", "₹45L"],
          ].map(([l, v]) => (
            <div key={l} className="rounded-xl border border-line p-5 text-center">
              <span className="text-xl font-semibold tracking-tight text-ink tabular-nums">{v}</span>
              <p className="mt-1 text-[11.5px] font-medium text-slate-500">{l}</p>
            </div>
          ))}
        </div>
        <Progress value={68} className="mt-5" />
        <p className="mt-2 text-[11.5px] text-slate-400">68% of portfolio value is income-producing — up from 41% last year.</p>
      </Card>
    </div>
  );
}

export function LicensingManagement() {
  return (
    <div className="space-y-5">
      <PageHeader title="Licensing Management" desc="License agreements, royalties and terms — the revenue side of IP." />
      <Card title={`License portfolio (${licenses.length})`} pad={false}>
        <ul className="divide-y divide-line">
          {licenses.map((l) => (
            <li key={l.deal} className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-[14px] font-semibold text-ink">{l.deal}</p>
                  <Badge tone={l.tone === "good" ? "good" : "accent"}>{l.stage}</Badge>
                </div>
                <p className="mt-1 text-[11.5px] text-slate-400">IP owner: {l.client} · Licensee: {l.licensee} · Term {l.term}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[14px] font-bold tabular-nums text-emerald-600">{l.value}</span>
                <ArrowUpRight className="h-4 w-4 text-slate-300" />
              </div>
            </li>
          ))}
        </ul>
      </Card>
      <Card title="Royalty schedule">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            ["Q1 2026 collected", "₹31L"],
            ["Q2 2026 projected", "₹42L"],
            ["Renewals due 2026", "4 licenses"],
          ].map(([l, v]) => (
            <div key={l} className="rounded-xl bg-accent-mist p-5">
              <span className="text-xl font-semibold tracking-tight text-ink tabular-nums">{v}</span>
              <p className="mt-1 text-[11.5px] font-medium text-slate-600">{l}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
