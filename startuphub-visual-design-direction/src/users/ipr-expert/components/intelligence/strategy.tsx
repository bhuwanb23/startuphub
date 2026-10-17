import { Badge, Card, PageHeader, Progress } from "@/components/app/widgets";

const strategy = [
  { area: "Protection strategy", detail: "Patent-core + trademark-brand + trade-secret-data. Three-layer moat, not one big filing.", status: "Active" },
  { area: "Filing strategy", detail: "Provisional first (₹1,600), complete spec within 12 months, PCT only if revenue is international.", status: "Active" },
  { area: "Geographic strategy", detail: "IN primary. US only where the 78% overlap reference lives. EU deferred until pilot lands.", status: "Active" },
  { area: "Portfolio strategy", detail: "Patents defend the method; designs defend the dashboard UX; trademarks defend the name.", status: "In review" },
  { area: "Commercialization", detail: "License the model to agri-coops, not the patent. Patent prevents copycats; license earns revenue.", status: "Term sheet" },
  { area: "Risk strategy", detail: "Contractor IP assignments + NDA discipline before every pilot conversation.", status: "Gap found" },
];

const roadmap = [
  { phase: "Now (Apr)", items: ["File “Field Alert” trademark", "Complete Lumen AI claims v3", "BloomBio assessment"] },
  { phase: "Q2 2026", items: ["Lumen AI complete spec", "OrbitalWorks PCT US entry", "MedSync class 9 filing"] },
  { phase: "Q3 2026", items: ["FinEdge provisional + US", "AquaPure design registration", "Portfolio audit"] },
  { phase: "Q4 2026", items: ["Licensing renewals", "EduFold filings", "Annual risk review"] },
];

export function IpStrategy() {
  return (
    <div className="space-y-5">
      <PageHeader title="IP Strategy" desc="How protection, filing, geography and commercialization fit together per client." />

      <Card title="Strategy overview — Lumen AI" action={<Badge tone="accent">Flagship client</Badge>} pad={false}>
        <ul className="divide-y divide-line">
          {strategy.map((s) => (
            <li key={s.area} className="grid gap-2 px-5 py-4 sm:grid-cols-[200px_1fr_auto] sm:items-center">
              <p className="text-[13px] font-semibold text-ink">{s.area}</p>
              <p className="text-[12.5px] leading-relaxed text-slate-500">{s.detail}</p>
              <Badge tone={s.status === "Active" ? "good" : s.status === "Gap found" ? "bad" : "accent"}>{s.status}</Badge>
            </li>
          ))}
        </ul>
      </Card>

      <Card title="IP roadmap — all clients">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {roadmap.map((r) => (
            <div key={r.phase} className="rounded-xl border border-line p-4">
              <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-accent">{r.phase}</p>
              <ul className="mt-3 space-y-2">
                {r.items.map((i) => (
                  <li key={i} className="flex items-start gap-2 text-[12px] leading-snug text-slate-600">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-300" />
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Card>

      <Card title="Portfolio coverage — top clients">
        <div className="space-y-4">
          {([
            ["OrbitalWorks", 91],
            ["Lumen AI", 78],
            ["TerraGrid", 88],
            ["MedSync", 68],
            ["AquaPure", 74],
            ["BloomBio", 40],
          ] as [string, number][]).map(([c, v]) => (
            <div key={c} className="flex items-center gap-3">
              <span className="w-32 text-[12.5px] font-medium text-slate-600">{c}</span>
              <Progress value={v} tone={v < 60 ? "warn" : "accent"} className="flex-1" />
              <span className="w-8 text-right text-[12.5px] font-semibold tabular-nums text-ink">{v}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
