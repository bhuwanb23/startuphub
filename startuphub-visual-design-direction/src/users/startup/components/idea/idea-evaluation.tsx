import { CheckCircle2, AlertTriangle } from "lucide-react";
import { Badge, Card, Progress, Stat } from "@/components/app/widgets";

const evaluation = [
  { dim: "Problem clarity", score: 92 },
  { dim: "Solution fit", score: 84 },
  { dim: "Market size", score: 88 },
  { dim: "Moat / IP", score: 71 },
  { dim: "Feasibility", score: 79 },
  { dim: "Scalability", score: 90 },
];

export function IdeaEvaluation() {
  return (
    <Card title="Idea evaluation">
      <div className="space-y-3.5">
        {evaluation.map((e) => (
          <div key={e.dim} className="flex items-center gap-3">
            <span className="w-28 shrink-0 text-[12.5px] font-medium text-slate-600">
              {e.dim}
            </span>
            <Progress value={e.score} tone={e.score < 75 ? "warn" : "accent"} className="flex-1" />
            <span className="w-8 text-right text-[12.5px] font-semibold tabular-nums text-ink">
              {e.score}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-5">
        <p className="text-[12.5px] text-slate-500">
          Strongest dimension: Problem clarity (92). Most opportunity: Moat/IP — complete patent filing to lift above 80.
        </p>
      </div>
    </Card>
  );
}