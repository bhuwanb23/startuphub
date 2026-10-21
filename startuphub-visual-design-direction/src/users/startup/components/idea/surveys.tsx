import { Clipboard, MessageSquare, CheckCircle2 } from "lucide-react";
import { Badge, Card, Progress, Stat } from "@/components/app/widgets";

const surveys = [
  { name: "Problem validation survey", responses: 128, pct: 73, tone: "good" as const },
  { name: "Pricing sensitivity survey", responses: 89, pct: 61, tone: "accent" as const },
  { name: "Feature priority survey", responses: 67, pct: 55, tone: "good" as const },
  { name: "NPS survey", responses: 45, pct: 48, tone: "warn" as const },
];

const surveyInsights = {
  nps: 42,
  responseRate: "68%",
  keyFinding: "Water stress is the #1 unmet need across all farmer segments",
};

export function Surveys() {
  return (
    <Card title="Survey results">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {surveys.map((s) => (
            <div key={s.name} className="rounded-xl border border-line bg-white p-4">
              <div className="flex items-between justify-between">
                <span className="text-[11px] font-medium uppercase tracking-[0.1em] text-slate-400">
                  {s.name}
                </span>
                <Badge tone={s.tone === "good" ? "good" : s.tone === "accent" ? "accent" : "default"}>
                  {s.responses} responses
                </Badge>
              </div>
              <Progress value={s.pct} tone={s.tone} className="mt-2" />
              <p className="mt-1 text-[11px] text-slate-500">
                {s.pct}% positive
              </p>
            </div>
          ))}
        </div>

        <div className="mt-5 pt-5 border-t border-line">
          <div className="grid grid-cols-2 gap-4">
            <Stat icon={CheckCircle2} label="NPS score" value={String(surveyInsights.nps)} />
            <Stat icon={Clipboard} label="Response rate" value={String(surveyInsights.responseRate)} />
          </div>
          <p className="mt-3 text-[11px] text-slate-500 line-clamp-2">
            {surveyInsights.keyFinding}
          </p>
        </div>
      </div>
    </Card>
  );
}