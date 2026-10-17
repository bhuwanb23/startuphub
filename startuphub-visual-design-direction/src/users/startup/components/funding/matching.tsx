import { Badge, Card, PageHeader } from "@/components/app/widgets";

const fitFactors = [
  ["Thesis overlap", 94], ["Stage alignment", 91], ["Cheque size fit", 88],
  ["Portfolio conflicts", 100], ["Geography", 96], ["Timeline urgency", 72],
];

const explain = [
  { fund: "Vertex Global", because: ["Led 2 agronomy-adjacent A rounds in 2025", "Your ₹2.9 Cr ARR clears their growth bar", "Partner has precision-ag domain expertise"] },
  { fund: "Samriddhi Fund", because: ["FPO distribution = direct inclusion story", "Their cheque (₹50L–2Cr) tops up your round without board complexity", "Statutory alignment with government pilots you run"] },
];

export function InvestorMatching() {
  return (
    <div className="space-y-5">
      <PageHeader title="Investor Matching" desc="Not a contact list — explained, evidence-based matches." />
      <div className="grid gap-5 lg:grid-cols-[1fr_1.3fr]">
        <Card title="Your fit profile">
          <ul className="space-y-4">
            {fitFactors.map(([l, v]) => (
              <li key={l} className="flex items-center gap-3">
                <span className="w-36 text-[12.5px] font-medium text-slate-600">{l}</span>
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-accent" style={{ width: `${v}%` }} />
                </div>
                <span className="w-8 text-right text-[12.5px] font-semibold tabular-nums text-ink">{v}</span>
              </li>
            ))}
          </ul>
          <p className="mt-5 rounded-xl bg-accent-mist p-4 text-[12.5px] leading-relaxed text-slate-600">
            Timeline urgency is your lowest factor — investors read the follow-on timeline as “flexible.” If Q3 is real, set it explicitly on your profile to sharpen matches.
          </p>
        </Card>
        <div className="space-y-5">
          {explain.map((e) => (
            <Card key={e.fund} title={e.fund} action={<Badge tone="accent">Why this match</Badge>}>
              <ul className="space-y-2.5">
                {e.because.map((b) => (
                  <li key={b} className="flex items-start gap-2.5 text-[13px] text-slate-600">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                    {b}
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
