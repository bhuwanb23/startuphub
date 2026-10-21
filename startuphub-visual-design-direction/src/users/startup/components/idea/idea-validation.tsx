import { CheckCircle2, Clock } from "lucide-react";
import { Badge, Card, Progress, Stat } from "@/components/app/widgets";

const experiments = [
  { name: "50-farmer interview wave", status: "Completed", learning: "Water stress is felt, pest stress is missed", tone: "good" as const },
  { name: "Landing page A/B — agribusiness", status: "Live", learning: "4.6% signup; CFO angle beats agronomy angle 2:1", tone: "accent" as const },
  { name: "Per-acre pricing test", status: "Live", learning: "₹180–220/acre shows 71% acceptance", tone: "accent" as const },
  { name: "Channel: FPO partnerships", status: "Designing", learning: "Hypothesis: FPOs cut CAC 60%", tone: "default" as const },
  { name: "Pricing elasticity survey", status: "Planned", learning: "Expected: 15% lift in conversion", tone: "warn" as const },
];

const validationMetrics = {
  interviews: 47,
  segments: 3,
  validated: "Agri-businesses with 5K+ acre networks",
  rejected: "Individual smallholders (service cost too high)",
};

export function IdeaValidation() {
  return (
    <Card title="Validation experiments">
      <div className="space-y-3.5">
        {experiments.map((x) => (
          <div key={x.name} className="px-5 py-3.5">
            <div className="flex items-center justify-between gap-3">
              <p className="text-[13.5px] font-medium text-ink">
                {x.name}
              </p>
              <Badge tone={x.tone === "good" ? "good" : x.tone === "accent" ? "accent" : "default"}>
                {x.status}
              </Badge>
            </div>
            <p className="mt-1 text-[12px] leading-snug text-slate-500">
              {x.learning}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-5 grid grid-cols-2 gap-4">
        <Stat icon={CheckCircle2} label="Interviews conducted" value={String(validationMetrics.interviews)} />
        <Stat icon={Clock} label="Segments tested" value={String(validationMetrics.segments)} />
      </div>
      <div className="mt-5">
        <p className="text-[12px] text-slate-500">
          {validationMetrics.validated} — validated segment. {validationMetrics.rejected} — rejected due to service cost.
        </p>
      </div>
    </Card>
  );
}