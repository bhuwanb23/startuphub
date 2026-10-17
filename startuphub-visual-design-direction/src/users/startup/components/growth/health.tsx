import { Badge, Card, GaugeRing, PageHeader, Progress } from "@/components/app/widgets";

const dims = [
  { name: "Financial health", score: 84, note: "Runway solid; collections faster than peers" },
  { name: "Product health", score: 78, note: "NPS 44 rising; v2 rollout smooth" },
  { name: "Market health", score: 81, note: "Sector tailwind; whitespace score strong" },
  { name: "Customer health", score: 76, note: "Retention 91%; 2 accounts at renewal risk" },
  { name: "Team health", score: 88, note: "Full founding team intact; hiring on plan" },
  { name: "IP health", score: 66, note: "Trademark gap + claims review overdue" },
  { name: "Operational health", score: 74, note: "Pilot ops stretched; process docs behind" },
  { name: "Growth health", score: 82, note: "3.1× YoY; Q2 targets established" },
];

const changes = [
  ["IP health", -4, "Trademark still unfiled"],
  ["Customer health", -2, "Renewal concentration risk"],
  ["Growth health", 6, "Q1 beat target 18%"],
  ["Product health", 5, "v2 NPS first reads strong"],
];

export function StartupHealth() {
  const overall = Math.round(dims.reduce((a, d) => a + d.score, 0) / dims.length);
  return (
    <div className="space-y-5">
      <PageHeader title="Startup Health" desc="Eight dimensions, one honest number — computed from your live platform signals." />
      <div className="grid gap-5 lg:grid-cols-[320px_1fr]">
        <Card title="Overall health">
          <div className="flex flex-col items-center py-4">
            <GaugeRing value={overall} size={128} label="/100" />
            <Badge tone="good">Strong — trending up</Badge>
            <p className="mt-4 max-w-[220px] text-center text-[12px] leading-relaxed text-slate-500">
              IP health is the only sub-70 dimension and drags the total. One week of focused filings moves overall ~4 points.
            </p>
          </div>
        </Card>
        <div className="space-y-5">
          <Card title="Dimension breakdown">
            <ul className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {dims.map((d) => (
                <li key={d.name}>
                  <div className="flex items-baseline justify-between">
                    <p className="text-[13px] font-semibold text-ink">{d.name}</p>
                    <span className="text-[13px] font-bold tabular-nums text-ink">{d.score}</span>
                  </div>
                  <Progress value={d.score} tone={d.score < 70 ? "warn" : "accent"} className="mt-1.5" />
                  <p className="mt-1 text-[11px] leading-snug text-slate-400">{d.note}</p>
                </li>
              ))}
            </ul>
          </Card>
          <Card title="30-day movement">
            <ul className="space-y-3">
              {changes.map(([d, delta, why]) => (
                <li key={d as string} className="flex items-center justify-between gap-3 text-[13px]">
                  <span className="font-medium text-slate-600">{d}</span>
                  <span className={`font-bold tabular-nums ${(delta as number) > 0 ? "text-emerald-600" : "text-red-500"}`}>
                    {(delta as number) > 0 ? "+" : ""}{delta}
                  </span>
                  <span className="ml-auto max-w-[55%] text-right text-[11.5px] text-slate-400">{why}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
