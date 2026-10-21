import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Badge, Card, Progress } from "@/components/app/widgets";

const assessment = [
  { dim: "Product", score: 84 },
  { dim: "Market", score: 79 },
  { dim: "Team", score: 91 },
  { dim: "Traction", score: 72 },
  { dim: "Funding readiness", score: 78 },
  { dim: "IP & Legal", score: 66 },
];

const recommendations = [
  {
    title: "Complete patent claim review",
    impact: "High",
    alt: "File trademark for the v2 product name",
    altImpact: "Medium",
  },
  {
    title: "Respond to pilot RFP",
    impact: "Medium",
    alt: "Book mentor session for Q2",
    altImpact: "Low",
  },
];

export function StartupAssessment() {
  return (
    <div className="space-y-5">
      <Card
        title="Startup assessment"
        action={<Badge tone="warn">2 gaps</Badge>}
      >
        <div className="space-y-3.5">
          {assessment.map((a) => (
            <div key={a.dim} className="flex items-center gap-3">
              <span className="w-32 shrink-0 text-[12.5px] font-medium text-slate-600">
                {a.dim}
              </span>
              <Progress value={a.score} tone={a.score < 70 ? "warn" : "accent"} className="flex-1" />
              <span className="w-8 text-right text-[12.5px] font-semibold tabular-nums text-ink">
                {a.score}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50/60 p-4">
          <p className="text-[12.5px] font-semibold text-ink">
            Recommended focus
          </p>
          <p className="mt-1 text-[12px] leading-relaxed text-slate-600">
            IP & Legal is your weakest dimension — complete the trademark for the v2 product name and the ongoing patent claims review to lift it.
          </p>
        </div>
      </Card>

      {/* Recommendations section */}
      <Card title="Focus areas" pad={false}>
        <ul className="space-y-3">
          {recommendations.map((r, i) => (
            <li key={i} className="rounded-xl border border-line p-4">
              <div className="flex items-center justify-between">
                <p className="text-[13.5px] font-semibold text-ink">{r.title}</p>
                <Badge tone="default">{r.impact} impact</Badge>
              </div>
              <p className="mt-1 text-[12px] leading-relaxed text-slate-500">
                {r.alt}
              </p>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}