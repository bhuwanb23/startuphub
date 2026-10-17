import { ArrowRight, Check, Sparkles } from "lucide-react";
import { Badge, Card, PageHeader } from "@/components/app/widgets";

const recs = [
  { p: 1, action: "File 'Field Alert' trademark before the launch", impact: "High", effort: "2 hrs · ₹9K", why: "Biggest single IP-health lift; blocks a diligence red flag.", area: "IPR" },
  { p: 2, action: "Attach pilot testimonials to the data room", impact: "High", effort: "45 min", why: "Northgate's stated top diligence item; assets already approved.", area: "Funding" },
  { p: 3, action: "Use GPU grant ($8.2K remaining) for v2 load testing", impact: "Medium", effort: "1 week", why: "Expires in 18 days; removes a product risk for free.", area: "Product" },
  { p: 4, action: "Apply for BIRAC BioIgnite (₹50L, non-dilutive)", impact: "Medium", effort: "1 day", why: ".application fit 81% — extends runway ~6 weeks if won.", area: "Funding" },
  { p: 5, action: "Close 2 missing contractor IP assignments", impact: "Medium", effort: "30 min", why: "Contract coverage is your only legal soft spot.", area: "Legal" },
];

export function Recommendations() {
  return (
    <div className="space-y-5">
      <PageHeader title="Recommendations" desc="Prioritized by Copilot from your live state — impact per unit of effort, ranked." />
      <Card
        title="This week's priority actions"
        action={<span className="flex items-center gap-1.5 text-[11px] font-semibold text-accent"><Sparkles className="h-3.5 w-3.5" /> AI ranked</span>}
        pad={false}
      >
        <ul className="divide-y divide-line">
          {recs.map((r) => (
            <li key={r.p} className="group flex items-start gap-4 px-5 py-4">
              <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-[12px] font-bold ${r.p === 1 ? "bg-accent text-white" : "bg-accent-soft text-accent"}`}>
                {r.p}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[14px] font-semibold leading-snug text-ink">{r.action}</p>
                <p className="mt-1 text-[12px] leading-relaxed text-slate-500">{r.why}</p>  
                <div className="mt-2 flex flex-wrap gap-1.5">
                  <Badge tone={r.impact === "High" ? "bad" : "warn"}>{r.impact} impact</Badge>
                  <Badge>{r.area}</Badge>
                  <span className="text-[11px] font-medium text-slate-400">effort: {r.effort}</span>
                </div>
              </div>
              <button className="group mt-1 flex shrink-0 items-center gap-1 rounded-lg border border-line px-3 py-1.5 text-[12px] font-semibold text-ink transition-all hover:border-accent hover:bg-accent hover:text-white">
                Do it <ArrowRight className="h-3 w-3" />
              </button>
            </li>
          ))}
        </ul>
      </Card>
      <Card title="Completed recommendations (30 days)">
        <ul className="space-y-2.5">
          {["Refresh Q2 runway forecast — done Mar 28", "Add per-acre pricing test to validation — done Mar 21", "Request Meera's IP portfolio review — done Mar 15"].map((c) => (
            <li key={c} className="flex items-center gap-2.5 text-[13px] text-slate-500">
              <span className="grid h-4.5 w-4.5 shrink-0 place-items-center rounded-full bg-emerald-500 text-white">
                <Check className="h-2.5 w-2.5" />
              </span>
              {c}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
