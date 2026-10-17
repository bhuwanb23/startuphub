import { Plus, Sparkles } from "lucide-react";
import { Badge, Card, PageHeader, Progress } from "@/components/app/widgets";

const idea = {
  name: "Per-acre crop stress early warning",
  version: "v3.2 · iteration 9",
  statement: "Every hectare tells a story daily. Lumen reads it before damage becomes visible — turning prevention from luxury into default.",
  problem: "Field scouting covers <5% of area; visible symptoms mean 30–40% yield already lost.",
  solution: "Multispectral inference flags water/pest/nutrient stress at per-acre resolution, 10–14 days ahead of the eye.",
  vps: [
    "10× cheaper than agronomist-per-acre scouting",
    "Works on existing satellite passes — no hardware for farmers",
    "Action maps, not dashboards — field teams just execute",
  ],
};

const evaluation = [
  { dim: "Problem clarity", score: 92 },
  { dim: "Solution fit", score: 84 },
  { dim: "Market size", score: 88 },
  { dim: "Moat / IP", score: 71 },
  { dim: "Feasibility", score: 79 },
  { dim: "Scalability", score: 90 },
];

const experiments = [
  { name: "50-farmer interview wave", status: "Completed", learning: "Water stress is felt, pest stress is missed", tone: "good" as const },
  { name: "Landing page A/B — agribusiness", status: "Live", learning: "4.6% signup; CFO angle beats agronomy angle 2:1", tone: "accent" as const },
  { name: "Per-acre pricing test", status: "Live", learning: "₹180–220/acre shows 71% acceptance", tone: "accent" as const },
  { name: "Channel: FPO partnerships", status: "Designing", learning: "Hypothesis: FPOs cut CAC 60%", tone: "default" as const },
];

const discovery = { interviews: 47, segments: 3, validated: "Agri-businesses with 5K+ acre networks", rejected: "Individual smallholders (service cost too high)" };

export function IdeaValidation() {
  return (
    <div className="space-y-5">
      <PageHeader
        title="Idea & Validation"
        desc="The living record of what you believe — and how hard you've tested it."
        actions={<button className="inline-flex items-center gap-1.5 rounded-[10px] bg-accent px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-accent-deep"><Plus className="h-3.5 w-3.5" /> New experiment</button>}
      />

      <div className="grid gap-5 lg:grid-cols-3">
        <Card title="Idea score" className="lg:col-span-1">
          <div className="text-center">
            <span className="text-5xl font-semibold tracking-tight text-ink">82</span>
            <span className="text-lg text-slate-400">/100</span>
            <p className="mt-2 text-[12.5px] text-slate-500">Strong idea — IP dimension is pulling it down.</p>
          </div>
          <div className="mt-5 flex items-start gap-2.5 rounded-xl bg-accent-mist p-3.5">
            <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
            <p className="text-[12px] leading-relaxed text-slate-600">
              <span className="font-semibold text-ink">Copilot:</span> Your complete-spec filing would push Moat/IP above 80 — single highest-leverage move this month.
            </p>
          </div>
        </Card>

        <Card title={idea.name} className="lg:col-span-2" action={<Badge tone="accent">{idea.version}</Badge>}>
          <p className="text-[14.5px] font-medium italic leading-relaxed text-ink">“{idea.statement}”</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl bg-slate-50 p-3.5">
              <p className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-slate-400">Problem</p>
              <p className="mt-1 text-[12.5px] leading-relaxed text-slate-600">{idea.problem}</p>
            </div>
            <div className="rounded-xl bg-accent-mist p-3.5">
              <p className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-accent">Solution</p>
              <p className="mt-1 text-[12.5px] leading-relaxed text-slate-600">{idea.solution}</p>
            </div>
          </div>
          <ul className="mt-4 space-y-2">
            {idea.vps.map((v) => (
              <li key={v} className="flex items-start gap-2.5 text-[13px] text-slate-600">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {v}
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <Card title="Idea evaluation">
          <div className="space-y-3.5">
            {evaluation.map((e) => (
              <div key={e.dim} className="flex items-center gap-3">
                <span className="w-28 shrink-0 text-[12.5px] font-medium text-slate-600">{e.dim}</span>
                <Progress value={e.score} tone={e.score < 75 ? "warn" : "accent"} className="flex-1" />
                <span className="w-8 text-right text-[12.5px] font-semibold tabular-nums text-ink">{e.score}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Validation experiments" action={<Badge tone="accent">2 live</Badge>} pad={false}>
          <ul className="divide-y divide-line">
            {experiments.map((x) => (
              <li key={x.name} className="px-5 py-3.5">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[13.5px] font-medium text-ink">{x.name}</p>
                  <Badge tone={x.tone === "good" ? "good" : x.tone === "accent" ? "accent" : "default"}>{x.status}</Badge>
                </div>
                <p className="mt-1 text-[12px] leading-snug text-slate-500">{x.learning}</p>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card title="Customer discovery">
        <div className="grid gap-4 sm:grid-cols-4">
          {[
            ["Interviews", discovery.interviews],
            ["Segments tested", discovery.segments],
          ].map(([l, v]) => (
            <div key={l as string} className="rounded-xl border border-line p-4 text-center">
              <span className="text-2xl font-semibold text-ink tabular-nums">{v}</span>
              <span className="mt-1 block text-[11.5px] text-slate-400">{l}</span>
            </div>
          ))}
          <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-4 sm:col-span-1">
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-emerald-600">Validated</p>
            <p className="mt-1 text-[12px] font-medium leading-snug text-ink">{discovery.validated}</p>
          </div>
          <div className="rounded-xl border border-red-100 bg-red-50/50 p-4 sm:col-span-1">
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-red-400">Rejected</p>
            <p className="mt-1 text-[12px] font-medium leading-snug text-ink">{discovery.rejected}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
