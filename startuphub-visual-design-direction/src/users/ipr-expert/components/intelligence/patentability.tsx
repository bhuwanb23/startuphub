import { Check, Download, X } from "lucide-react";
import { Badge, Card, GaugeRing, PageHeader, Progress } from "@/components/app/widgets";

const criteria = [
  { name: "Novelty", verdict: "Yes", score: 88, note: "Per-acre attribution step not found in 4 closest references." },
  { name: "Inventive step", verdict: "Yes", score: 78, note: "Non-obvious combination of band selection + attribution method." },
  { name: "Industrial applicability", verdict: "Yes", score: 96, note: "Deployed across 3.2M hectares in commercial production." },
  { name: "Prior art", verdict: "Manageable", score: 72, note: "US 11,248,102 overlaps 78% — narrow claims to attribution." },
  { name: "Disclosure risk", verdict: "No", score: 100, note: "No public disclosure before filing date." },
];

export function PatentabilityAssessment() {
  const overall = Math.round(criteria.reduce((a, c) => a + c.score, 0) / criteria.length);
  return (
    <div className="space-y-5">
      <PageHeader
        title="Patentability Assessment"
        desc="The structured verdict a filing decision is built on — criteria, evidence, recommendation."
        actions={<button className="inline-flex items-center gap-1.5 rounded-[10px] border border-line bg-white px-4 py-2.5 text-[13px] font-semibold text-ink hover:border-slate-300"><Download className="h-3.5 w-3.5" /> Export report</button>}
      />
      <Card>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <GaugeRing value={overall} size={104} label="score" />
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg font-semibold tracking-tight text-ink">Lumen AI — “Multispectral crop stress inference”</h2>
              <Badge tone="good">File with narrowed claims</Badge>
            </div>
            <p className="mt-2 max-w-xl text-[13.5px] leading-relaxed text-slate-500">
              Strong candidate. The novel step is <span className="font-semibold text-ink">per-acre yield attribution</span>, not stress detection — claims must be carved accordingly. Recommend complete specification within 11 weeks to hold the provisional date.
            </p>
          </div>
        </div>
      </Card>

      <Card title="Criteria evaluation" pad={false}>
        <ul className="divide-y divide-line">
          {criteria.map((c) => (
            <li key={c.name} className="grid gap-3 px-5 py-4 sm:grid-cols-[180px_auto_1fr] sm:items-center">
              <p className="text-[13.5px] font-semibold text-ink">{c.name}</p>
              <span className={`inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold ${c.verdict === "No" ? "bg-emerald-50 text-emerald-600" : c.verdict === "Yes" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`}>
                {c.verdict === "Yes" || c.verdict === "No" ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                {c.verdict}
              </span>
              <div className="sm:flex sm:items-center sm:gap-4">
                <p className="flex-1 text-[12px] leading-snug text-slate-500">{c.note}</p>
                <div className="w-24 shrink-0">
                  <Progress value={c.score} tone={c.score < 75 ? "warn" : "accent"} />
                  <p className="mt-1 text-right text-[10.5px] tabular-nums text-slate-400">{c.score}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Card>

      <Card title="Recommendations">
        <ul className="space-y-3">
          {[
            "File complete specification within 11 weeks — provisional date is the moat.",
            "Carve claim 1 around per-acre attribution, not detection.",
            "Add US filing via associate — 78% overlap reference is US-granted.",
            "File the “Field Alert” trademark this week; it is unprotected and launch is in 9 days.",
          ].map((r) => (
            <li key={r} className="flex items-start gap-2.5 text-[13px] text-slate-600">
              <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent-soft text-accent">
                <Check className="h-3 w-3" />
              </span>
              {r}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
