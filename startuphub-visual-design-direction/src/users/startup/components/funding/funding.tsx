import { ArrowUpRight, Plus } from "lucide-react";
import { Badge, Card, GaugeRing, PageHeader, Progress } from "@/components/app/widgets";

const matches = [
  { name: "Vertex Global", match: 92, why: "Growth-stage + agri adjacency; led Horizon's follow-ons", ticket: "₹4–20 Cr", status: "Warm intro requested" },
  { name: "Samriddhi Fund", match: 88, why: "Inclusive-growth thesis fits your FPO channel", ticket: "₹20L–2Cr", status: "Reviewing data room" },
  { name: "Atlas Capital", match: 84, why: "Deep-tech first cheques; portfolio has 0 agronomy conflicts", ticket: "₹25L–4Cr", status: "Connected" },
];

const pipeline = [
  { stage: "First contact", count: 4, pct: 100 },
  { stage: "Intro calls", count: 3, pct: 75 },
  { stage: "Deep diligence", count: 1, pct: 25 },
  { stage: "Term stage", count: 0, pct: 0 },
];

const dataRoom = [
  { section: "Financials", items: 8, completeness: 92 },
  { section: "Legal & compliance", items: 14, completeness: 78 },
  { section: "IPR portfolio", items: 5, completeness: 60 },
  { section: "Product & traction", items: 11, completeness: 88 },
  { section: "Team", items: 6, completeness: 100 },
];

export function Funding() {
  return (
    <div className="space-y-5">
      <PageHeader
        title="Funding"
        desc="Capital as a managed pipeline — matches, meetings and a data room that never sleeps."
        actions={<button className="inline-flex items-center gap-1.5 rounded-[10px] bg-accent px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-accent-deep"><Plus className="h-3.5 w-3.5" /> Start a round</button>}
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <div className="flex items-center gap-4">
            <GaugeRing value={78} size={84} label="score" />
            <div>
              <p className="text-[14px] font-semibold text-ink">Readiness score</p>
              <p className="mt-1 text-[12px] leading-relaxed text-slate-500">
                Pilot references are the final push to 85+. Copilot flagged it on your dashboard.
              </p>
            </div>
          </div>
        </Card>
        <Card title="Investor pipeline" className="lg:col-span-2">
          <div className="grid gap-3 sm:grid-cols-4">
            {pipeline.map((p) => (
              <div key={p.stage} className="rounded-xl border border-line p-4 text-center">
                <span className="text-2xl font-semibold text-ink tabular-nums">{p.count}</span>
                <p className="mt-1 text-[11.5px] leading-tight text-slate-400">{p.stage}</p>
                <Progress value={p.pct} className="mt-3" tone={p.count === 0 ? "warn" : "accent"} />
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.3fr_1fr]">
        <Card title="AI investor matches" action={<Badge tone="accent">3 active threads</Badge>} pad={false}>
          <ul className="divide-y divide-line">
            {matches.map((m) => (
              <li key={m.name} className="flex items-center gap-4 px-5 py-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent-soft text-[13px] font-bold text-accent">
                  {m.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-[14px] font-semibold text-ink">{m.name}</p>
                    <span className="text-[11px] text-slate-400">{m.ticket}</span>
                  </div>
                  <p className="mt-0.5 truncate text-[12px] text-slate-500">{m.why}</p>
                  <p className="mt-1 text-[11px] font-semibold text-accent">{m.status}</p>
                </div>
                <span className="shrink-0 rounded-full bg-accent-soft px-2.5 py-1 text-[11px] font-bold text-accent">{m.match}%</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card title="Data room completeness" action={<ArrowUpRight className="h-4 w-4 text-slate-400" />}>
          <ul className="space-y-4">
            {dataRoom.map((d) => (
              <li key={d.section}>
                <div className="flex items-center justify-between text-[12.5px]">
                  <span className="font-medium text-slate-600">{d.section} <span className="text-slate-300">· {d.items} docs</span></span>
                  <span className="font-semibold tabular-nums text-ink">{d.completeness}%</span>
                </div>
                <Progress value={d.completeness} tone={d.completeness < 70 ? "warn" : "accent"} className="mt-2" />
              </li>
            ))}
          </ul>
          <p className="mt-4 rounded-xl bg-accent-mist p-3.5 text-[12px] leading-relaxed text-slate-600">
            3 views this week — Northgate's legal partner spent 22 min in IPR. Expect questions on the trademark gap.
          </p>
        </Card>
      </div>
    </div>
  );
}
