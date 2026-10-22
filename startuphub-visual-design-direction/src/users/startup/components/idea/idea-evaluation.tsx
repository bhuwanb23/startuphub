import {
  AlertTriangle,
  ArrowUpRight,
  CheckCircle2,
  Plus,
  Scale,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import {
  Badge,
  Card,
  GaugeRing,
  PageHeader,
  Progress,
  Spark,
  Stat,
} from "@/components/app/widgets";

/* ── Evaluation dimensions ────────────────────────────────────
   Each dimension is scored 0–100 and ranked. `band` decides the
   progress-bar colour: anything below 75 is flagged amber.        */
const dimensions = [
  {
    dim: "Problem clarity",
    score: 92,
    note: "Well-defined problem statement validated across 47 interviews",
  },
  {
    dim: "Scalability",
    score: 90,
    note: "High growth potential — no hardware dependency for farmers",
  },
  {
    dim: "Market size",
    score: 88,
    note: "Large addressable market identified across 4 agri belts",
  },
  {
    dim: "Team strength",
    score: 85,
    note: "Strong founding team with relevant agronomy + SaaS experience",
  },
  {
    dim: "Solution fit",
    score: 84,
    note: "Solution maps directly to the top-ranked customer pain point",
  },
  {
    dim: "Feasibility",
    score: 79,
    note: "Technically achievable on existing satellite passes",
  },
  {
    dim: "Go-to-market readiness",
    score: 76,
    note: "GTM strategy still needs pilot-partner validation",
  },
  {
    dim: "Moat / IP",
    score: 71,
    note: "IP filing in progress — critical for defensibility",
  },
] as const;

/* Cohort comparison — how this idea scores against the platform
   average for ideas at the same stage.                            */
const cohortBenchmarks = [
  { dim: "Problem clarity", idea: 92, cohort: 74 },
  { dim: "Solution fit", idea: 84, cohort: 69 },
  { dim: "Market size", idea: 88, cohort: 71 },
  { dim: "Moat / IP", idea: 71, cohort: 58 },
  { dim: "Feasibility", idea: 79, cohort: 66 },
  { dim: "Scalability", idea: 90, cohort: 70 },
  { dim: "Team strength", idea: 85, cohort: 63 },
  { dim: "Go-to-market readiness", idea: 76, cohort: 60 },
] as const;

const strengths = [
  {
    title: "Problem is felt, not imagined",
    body: "Water stress ranked #1 across every farmer segment interviewed — no segment-level disagreement.",
  },
  {
    title: "Zero-hardware delivery model",
    body: "Runs on existing satellite passes, so adoption cost per acre stays an order of magnitude below scouting.",
  },
  {
    title: "Large headroom on market size",
    body: "12K+ potential pilot farms identified, with 35% sitting in the validated large-scale segment.",
  },
];

const risks = [
  {
    title: "Moat / IP is the weakest dimension",
    body: "A complete-spec filing would move this above 80 — currently the single highest-leverage move available.",
  },
  {
    title: "GTM readiness trails the rest",
    body: "No signed pilot partner yet; channel economics still assumed rather than measured.",
  },
  {
    title: "Smallholder unit economics unresolved",
    body: "Service cost per acre exceeds what individual smallholders will bear — segment intentionally deprioritised.",
  },
];

const reviewerNotes = [
  {
    reviewer: "Mentor panel",
    role: "Agri-tech review",
    note: "Problem framing is the strongest we have seen this quarter — keep the language farmer-native.",
    tone: "good" as const,
  },
  {
    reviewer: "Incubation office",
    role: "Programme review",
    note: "Patent timing must land before the competitive-incubation cohort opens in 8 weeks.",
    tone: "warn" as const,
  },
  {
    reviewer: "Investor scout",
    role: "Market review",
    note: "Market-size score is credible; bring the per-acre unit economics to the next data room.",
    tone: "accent" as const,
  },
];

const recommendedActions = [
  {
    action: "File complete-spec patent claims for v2 product",
    impact: "Critical",
    timeline: "8 weeks",
    cost: "₹5L",
    priority: "high" as const,
  },
  {
    action: "Develop GTM strategy with three pilot partners",
    impact: "High",
    timeline: "12 weeks",
    cost: "₹8L",
    priority: "high" as const,
  },
  {
    action: "Complete IP portfolio review across jurisdictions",
    impact: "Medium",
    timeline: "6 weeks",
    cost: "₹3L",
    priority: "medium" as const,
  },
  {
    action: "Expand market research to three new agri belts",
    impact: "Low",
    timeline: "8 weeks",
    cost: "₹2L",
    priority: "low" as const,
  },
];

const scoreHistory = [64, 67, 69, 72, 74, 78, 80, 82, 83, 85];

const dimensionBand = (score: number) =>
  score >= 85 ? "good" : score >= 75 ? "accent" : "warn";

const priorityTone = (priority: "high" | "medium" | "low") =>
  priority === "high" ? "good" : priority === "medium" ? "accent" : "default";

const priorityCard = (priority: "high" | "medium" | "low") =>
  priority === "high"
    ? "border-emerald-200 bg-emerald-50/60"
    : priority === "medium"
      ? "border-accent-200 bg-accent-mist"
      : "border-line bg-white";

export function IdeaEvaluation() {
  const average = Math.round(
    dimensions.reduce((sum, d) => sum + d.score, 0) / dimensions.length,
  );
  const strongest = dimensions.reduce((a, b) => (a.score > b.score ? a : b));
  const weakest = dimensions.reduce((a, b) => (a.score < b.score ? a : b));

  return (
    <div className="space-y-5">
      <PageHeader
        title="Idea Evaluation"
        desc="A scored read on how well this idea holds up — across the dimensions that decide whether it gets funded."
        actions={
          <button className="inline-flex items-center gap-1.5 rounded-[10px] bg-accent px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-accent-deep">
            <Plus className="h-3.5 w-3.5" /> Re-run evaluation
          </button>
        }
      />

      {/* 1 — Overall verdict */}
      <div className="grid gap-5 lg:grid-cols-3">
        <Card title="Overall evaluation score" className="lg:col-span-1">
          <div className="flex items-center gap-5">
            <GaugeRing value={average} size={104} label="overall" />
            <div className="min-w-0">
              <Badge tone="good">Strong idea</Badge>
              <p className="mt-2 text-[12.5px] leading-relaxed text-slate-600">
                Averages {average}/100 across {dimensions.length} dimensions.
                The IP dimension is the only one holding the score back.
              </p>
            </div>
          </div>
          <div className="mt-5 flex items-start gap-2.5 rounded-xl bg-accent-mist p-3.5">
            <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
            <p className="text-[12px] leading-relaxed text-slate-600">
              <span className="font-semibold text-ink">Copilot:</span> A
              complete-spec filing pushes Moat / IP above 80 — that single move
              lifts the overall score by roughly four points.
            </p>
          </div>
        </Card>

        <Card
          title="Dimension breakdown"
          className="lg:col-span-2"
          action={<Badge tone="accent">8 dimensions</Badge>}
        >
          <div className="space-y-3.5">
            {dimensions.map((d) => (
              <div key={d.dim} className="flex items-center gap-3">
                <span className="w-40 shrink-0 text-[12.5px] font-medium text-slate-600">
                  {d.dim}
                </span>
                <Progress
                  value={d.score}
                  tone={dimensionBand(d.score)}
                  className="flex-1"
                />
                <span className="w-8 text-right text-[12.5px] font-semibold tabular-nums text-ink">
                  {d.score}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* 2 — Headline metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat
          icon={TrendingUp}
          label="Average score"
          value={`${average}/100`}
          delta="+7 vs. last review"
          tone="good"
        />
        <Stat
          icon={CheckCircle2}
          label="Strongest dimension"
          value={strongest.dim}
          hint={`${strongest.score}/100`}
          tone="good"
        />
        <Stat
          icon={AlertTriangle}
          label="Weakest dimension"
          value={weakest.dim}
          hint={`${weakest.score}/100`}
          tone="warn"
        />
        <Stat
          icon={ShieldCheck}
          label="Above cohort average"
          value={`${cohortBenchmarks.filter((b) => b.idea > b.cohort).length}/8`}
          hint="dimensions"
          tone="default"
        />
      </div>

      {/* 3 — Cohort benchmark */}
      <Card
        title="Benchmark against cohort"
        action={<Badge tone="accent">Platform average · same stage</Badge>}
      >
        <div className="space-y-3">
          {cohortBenchmarks.map((b) => (
            <div key={b.dim} className="grid grid-cols-[140px_1fr_52px] items-center gap-3">
              <span className="truncate text-[12px] font-medium text-slate-600">
                {b.dim}
              </span>
              <div className="relative h-4">
                <div className="absolute inset-x-0 top-0 h-2 rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-accent"
                    style={{ width: `${b.idea}%` }}
                  />
                </div>
                <div
                  className="absolute top-0 h-2 rounded-full bg-ink/25"
                  style={{ width: `${b.cohort}%` }}
                />
              </div>
              <span className="text-right text-[12px] font-semibold tabular-nums text-ink">
                +{b.idea - b.cohort}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-4 flex items-center gap-2 text-[11.5px] text-slate-400">
          <span className="inline-block h-2 w-4 rounded-full bg-accent" />
          This idea
          <span className="ml-3 inline-block h-2 w-4 rounded-full bg-ink/25" />
          Cohort average
        </p>
      </Card>

      {/* 4 — Strengths & risks */}
      <div className="grid gap-5 lg:grid-cols-2">
        <Card title="Strengths" action={<Badge tone="good">3 identified</Badge>} pad={false}>
          <ul className="divide-y divide-line">
            {strengths.map((s) => (
              <li key={s.title} className="px-5 py-4">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  <div>
                    <p className="text-[13px] font-semibold text-ink">{s.title}</p>
                    <p className="mt-1 text-[12px] leading-relaxed text-slate-500">
                      {s.body}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Card>

        <Card title="Risks & gaps" action={<Badge tone="warn">3 open</Badge>} pad={false}>
          <ul className="divide-y divide-line">
            {risks.map((r) => (
              <li key={r.title} className="px-5 py-4">
                <div className="flex items-start gap-2.5">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                  <div>
                    <p className="text-[13px] font-semibold text-ink">{r.title}</p>
                    <p className="mt-1 text-[12px] leading-relaxed text-slate-500">
                      {r.body}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* 5 — Reviewer notes */}
      <Card title="Reviewer notes" action={<Badge tone="default">3 reviews</Badge>} pad={false}>
        <ul className="divide-y divide-line">
          {reviewerNotes.map((n) => (
            <li key={n.reviewer} className="px-5 py-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[13px] font-semibold text-ink">{n.reviewer}</p>
                  <p className="text-[11.5px] text-slate-400">{n.role}</p>
                </div>
                <Badge
                  tone={
                    n.tone === "good"
                      ? "good"
                      : n.tone === "warn"
                        ? "warn"
                        : "accent"
                  }
                >
                  {n.tone === "good"
                    ? "Endorsed"
                    : n.tone === "warn"
                      ? "Action needed"
                      : "Follow-up"}
                </Badge>
              </div>
              <p className="mt-2 text-[12.5px] leading-relaxed text-slate-600">
                {n.note}
              </p>
            </li>
          ))}
        </ul>
      </Card>

      {/* 6 — Recommended actions */}
      <Card title="Recommended actions" action={<Badge tone="accent">4 queued</Badge>} pad={false}>
        <ul className="divide-y divide-line">
          {recommendedActions.map((r) => (
            <li key={r.action} className="px-5 py-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-[13px] font-semibold text-ink">{r.action}</p>
                <Badge tone={priorityTone(r.priority)}>{r.priority} priority</Badge>
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-3 text-[11.5px] text-slate-500">
                <span className="rounded-md bg-slate-100 px-2 py-0.5 font-medium">
                  {r.impact} impact
                </span>
                <span>{r.timeline}</span>
                <span>{r.cost}</span>
              </div>
            </li>
          ))}
        </ul>
      </Card>

      {/* 7 — Score history */}
      <div className="grid gap-5 lg:grid-cols-2">
        <Card title="Score history" action={<Badge tone="good">+21 since v1</Badge>}>
          <div className="flex items-end justify-between gap-4">
            <div>
              <span className="text-4xl font-semibold tracking-tight text-ink tabular-nums">
                {average}
              </span>
              <p className="mt-1 text-[12px] text-slate-400">
                Latest evaluation · 10 review cycles
              </p>
            </div>
            <Spark points={scoreHistory} good className="h-12 w-40" />
          </div>
        </Card>

        <Card title="Scoring methodology" action={<Scale className="h-4 w-4 text-slate-300" />}>
          <ul className="space-y-3">
            <li className="flex items-start gap-2.5 text-[12.5px] leading-relaxed text-slate-600">
              <ArrowUpRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
              Each dimension blends customer evidence, competitive review and
              internal capability — not founder self-assessment.
            </li>
            <li className="flex items-start gap-2.5 text-[12.5px] leading-relaxed text-slate-600">
              <ArrowUpRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
              Scores below 75 are flagged and every flagged dimension must have
              a dated action attached.
            </li>
            <li className="flex items-start gap-2.5 text-[12.5px] leading-relaxed text-slate-600">
              <ArrowUpRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
              Re-scoring happens automatically whenever a validation experiment
              closes.
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
