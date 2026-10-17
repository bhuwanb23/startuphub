import { Badge, Card, PageHeader } from "@/components/app/widgets";

const dims = [
  ["Expertise overlap", 96], ["Problem recency", 88], ["Stage fit", 91], ["Time-zone/venue", 85], ["Style compatibility", 79], ["Claimed goals", 82],
];

const matches = [
  { startup: "FinEdge", score: 96, founder: "Kabir Malhotra", need: "Credit-scoring pipeline + first infra hire", evidence: ["FinTech = your domain", "ML infra = your exact scale problem", "Pre-seed = your strongest stage"] },
  { startup: "Lumen AI", score: 88, founder: "Ravi Sharma", need: "GPU cost per acre at 3M+ hectares", evidence: ["Working together since Oct", "Cost problem identical to ZetaPay 2019", "Vernacular ops = emerging fit"] },
  { startup: "OrbitalWorks", score: 85, founder: "Daniel Mathew", need: "Ground-segment reliability patterns", evidence: ["Distributed systems = core bench", "Space = adjacent but structured", "Existing engagement"] },
];

export function MentorMatching() {
  return (
    <div className="space-y-5">
      <PageHeader title="Startup Matching" desc="How the algorithm decides who invests in your time — explained, not opaque." />
      <div className="grid gap-5 lg:grid-cols-[1fr_1.3fr]">
        <Card title="Your match dimensions">
          <ul className="space-y-4">
            {dims.map(([l, v]) => (
              <li key={l} className="flex items-center gap-3">
                <span className="w-40 text-[12.5px] font-medium text-slate-600">{l}</span>
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-accent" style={{ width: `${v}%` }} />
                </div>
                <span className="w-8 text-right text-[12.5px] font-semibold tabular-nums text-ink">{v}</span>
              </li>
            ))}
          </ul>
        </Card>
        <div className="space-y-4">
          {matches.map((m) => (
            <Card key={m.startup} action={<span className="rounded-full bg-accent-soft px-2.5 py-1 text-[11px] font-bold text-accent">{m.score}%</span>}>
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent-soft text-[12px] font-bold text-accent">{m.startup.slice(0, 2).toUpperCase()}</span>
                <div>
                  <p className="text-[14px] font-semibold text-ink">{m.startup}</p>
                  <p className="text-[11px] text-slate-400">Founder: {m.founder}</p>
                </div>
              </div>
              <p className="mt-2.5 text-[13px] leading-relaxed text-slate-600">{m.need}</p>
              <ul className="mt-3 space-y-1.5">
                {m.evidence.map((e) => (
                  <li key={e} className="flex items-start gap-2 text-[12px] text-slate-500">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" /> {e}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
