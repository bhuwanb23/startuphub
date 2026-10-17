import { ArrowUpRight } from "lucide-react";
import { Badge, Card, PageHeader } from "@/components/app/widgets";

const investors = [
  { name: "Vertex Global", type: "VC Fund", stage: "Series A–B", ticket: "₹4–20 Cr", thesis: "Health, logistics, climate — growth with working unit economics", fit: 92 },
  { name: "Samriddhi Fund", type: "Government Fund", stage: "Seed–A", ticket: "₹20L–2Cr", thesis: "Inclusive growth · tier-2/3 · rural value chains", fit: 88 },
  { name: "Atlas Capital", type: "VC Fund", stage: "Pre-seed–A", ticket: "₹25L–4Cr", thesis: "Deep-tech first cheques; patient with R&D timelines", fit: 84 },
  { name: "Horizon Fund", type: "VC Fund", stage: "Seed", ticket: "$120K fixed", thesis: "Climate sandbox programs with pilot guarantees", fit: 79 },
  { name: "Meridian Labs CVC", type: "Corporate VC", stage: "Seed–A", ticket: "₹1–8 Cr", thesis: "Strategic suppliers & partners for industrial engineering", fit: 76 },
];

const grants = [
  { name: "BIRAC BioIgnite", amount: "₹50L", close: "Apr 30", note: "Bio-adjacent agronomy models qualify via FPO outcomes", fit: 81 },
  { name: "Karnataka Startup Window", amount: "₹30L", close: "Apr 15 open", note: "14-state footprint → max slab", fit: 93 },
  { name: "NSF DeepTech Milestone Grant", amount: "₹1Cr", close: "May 20", note: "TRL 6-7 requirement — currently at TRL 8", fit: 87 },
];

export function FundingDiscovery() {
  return (
    <div className="space-y-5">
      <PageHeader title="Funding Discovery" desc="Capital sources matched to your stage, sector and ticket — ranked by AI fit." />
      <Card title="Recommended investors" action={<Badge tone="accent">{investors.length} live matches</Badge>} pad={false}>
        <ul className="divide-y divide-line">
          {investors.map((i) => (
            <li key={i.name} className="flex items-center gap-4 px-5 py-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent-soft text-[12px] font-bold text-accent">{i.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}</span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-[14px] font-semibold text-ink">{i.name}</p>
                  <Badge>{i.type}</Badge>
                </div>
                <p className="mt-0.5 truncate text-[12px] text-slate-500">{i.thesis}</p>
                <p className="mt-0.5 text-[11px] text-slate-400">{i.stage} · {i.ticket}</p>
              </div>
              <div className="flex shrink-0 items-center gap-2.5">
                <span className="rounded-full bg-accent-soft px-2.5 py-1 text-[11px] font-bold text-accent">{i.fit}%</span>
                <button className="flex items-center gap-1 rounded-lg border border-line px-3 py-1.5 text-[12px] font-semibold text-ink hover:border-accent hover:text-accent">
                  Request intro <ArrowUpRight className="h-3 w-3" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </Card>
      <Card title="Recommended grants" pad={false}>
        <ul className="divide-y divide-line">
          {grants.map((g) => (
            <li key={g.name} className="flex items-center gap-4 px-5 py-4">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2.5">
                  <p className="text-[14px] font-semibold text-ink">{g.name}</p>
                  <span className="text-[12px] font-bold text-emerald-600">{g.amount}</span>
                </div>
                <p className="mt-0.5 text-[12px] text-slate-500">{g.note}</p>
              </div>
              <div className="flex shrink-0 items-center gap-2.5">
                <span className="text-[11px] font-semibold uppercase tracking-wide text-amber-500">{g.close}</span>
                <span className="rounded-full bg-accent-soft px-2.5 py-1 text-[11px] font-bold text-accent">{g.fit}%</span>
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
