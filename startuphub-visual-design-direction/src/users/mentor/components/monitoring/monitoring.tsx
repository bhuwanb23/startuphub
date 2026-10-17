import { TriangleAlert } from "lucide-react";
import { Badge, Card, PageHeader, Progress } from "@/components/app/widgets";

const assessments = [
  { name: "Lumen AI", last: "Mar 28", dims: [["Product", 86], ["Market", 79], ["Team", 91], ["Financial", 84], ["IP", 62]], overall: 80 },
  { name: "OrbitalWorks", last: "Mar 30", dims: [["Product", 81], ["Market", 68], ["Team", 88], ["Financial", 72], ["IP", 90]], overall: 79 },
  { name: "GridSense", last: "Mar 24", dims: [["Product", 58], ["Market", 49], ["Team", 61], ["Financial", 22], ["IP", 40]], overall: 46 },
];

const attention = [
  { startup: "GridSense", issue: "Runway critically low — 3.4 months", severity: "Critical", action: "Bridge plan by Friday", tone: "bad" as const },
  { startup: "GridSense", issue: "Milestone drift — third sprint slipping", severity: "High", action: "Scope re-baseline in Friday's session", tone: "bad" as const },
  { startup: "BloomBio", issue: "Throughput data 4 weeks stale", severity: "Watch", action: "Asked for logs Apr 14 — follow up", tone: "warn" as const },
  { startup: "Lumen AI", issue: "Overdue: your cost-dashboard review", severity: "Minor", action: "Finish tonight — needed Thursday", tone: "default" as const },
];

const feedbackGiven = [
  [ "Lumen AI demo deck v2", "Sharp. India-slide first, market-slide second. The cost trend earns the whole room.", "5.0 founder rating"],
  [ "OrbitalWorks mesh v2", "Root-cause reads clean now. Scale #10 with confidence.", "5.0 founder rating"],
];

export function Monitoring() {
  return (
    <div className="space-y-5">
      <PageHeader title="Monitoring" desc="Assessment snapshots of every startup you guide — where they stand, where you're pushing." />

      <Card title="Startup assessments" pad={false}>
        <ul className="divide-y divide-line">
          {assessments.map((a) => (
            <li key={a.name} className="px-5 py-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[14.5px] font-semibold text-ink">{a.name}</p>
                  <p className="text-[11.5px] text-slate-400">last evaluated {a.last}</p>
                </div>
                <Badge tone={a.overall > 75 ? "good" : "warn"}>Overall {a.overall}</Badge>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-5">
                {a.dims.map(([d, v]) => (
                  <div key={d} className="rounded-lg bg-slate-50 p-3">
                    <div className="flex items-baseline justify-between text-[11.5px]">
                      <span className="font-medium text-slate-500">{d}</span>
                      <span className="font-semibold tabular-nums text-ink">{v}</span>
                    </div>
                    <Progress value={v as number} tone={(v as number) < 50 ? "bad" : "accent"} className="mt-2" />
                  </div>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </Card>

      <div className="grid gap-5 lg:grid-cols-2">
        <Card title="Risk & attention" action={<TriangleAlert className="h-4 w-4 text-amber-500" />} pad={false}>
          <ul className="divide-y divide-line">
            {attention.map((a) => (
              <li key={a.issue} className="px-5 py-4">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-[13px] font-semibold leading-snug text-ink">{a.issue}</p>
                  <Badge tone={a.tone === "bad" ? "bad" : a.tone === "warn" ? "warn" : "default"}>{a.severity}</Badge>
                </div>
                <p className="mt-1.5 text-[11.5px] text-slate-500">{a.startup} · {a.action}</p>
              </li>
            ))}
          </ul>
        </Card>
        <Card title="Feedback you've given">
          <ul className="space-y-3">
            {feedbackGiven.map(([topic, text, rating]) => (
              <li key={topic} className="rounded-xl border border-line p-4">
                <p className="text-[13px] font-semibold text-ink">{topic}</p>
                <blockquote className="mt-1.5 text-[12.5px] italic leading-relaxed text-slate-500">“{text}”</blockquote>
                <p className="mt-2.5 text-[11px] font-semibold text-emerald-600">{rating}</p>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
