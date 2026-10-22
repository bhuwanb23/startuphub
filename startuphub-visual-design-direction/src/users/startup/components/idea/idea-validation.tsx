import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  FlaskConical,
  Plus,
  Sparkles,
  Target,
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

/* ── Experiment pipeline ───────────────────────────────────────
   Every experiment moves through design → live → concluded. The
   `status` drives the badge tone and the pipeline counters.        */
const experiments = [
  {
    name: "50-farmer interview wave",
    status: "Completed",
    stage: "Concluded",
    learning: "Water stress is felt, pest stress is missed",
    tone: "good" as const,
    impact: "High",
    duration: "2 weeks",
    cost: "₹2L",
  },
  {
    name: "Landing page A/B — agribusiness",
    status: "Live",
    stage: "Live",
    learning: "4.6% signup; CFO angle beats agronomy angle 2:1",
    tone: "accent" as const,
    impact: "High",
    duration: "4 weeks",
    cost: "₹3L",
  },
  {
    name: "Per-acre pricing test",
    status: "Live",
    stage: "Live",
    learning: "₹180–220/acre shows 71% acceptance",
    tone: "accent" as const,
    impact: "Medium",
    duration: "3 weeks",
    cost: "₹1.5L",
  },
  {
    name: "Channel: FPO partnerships",
    status: "Designing",
    stage: "Design",
    learning: "Hypothesis: FPOs cut CAC 60%",
    tone: "default" as const,
    impact: "Medium",
    duration: "6 weeks",
    cost: "₹2L",
  },
  {
    name: "Pricing elasticity survey",
    status: "Planned",
    stage: "Planned",
    learning: "Expected: 15% lift in conversion",
    tone: "warn" as const,
    impact: "Low",
    duration: "2 weeks",
    cost: "₹50K",
  },
  {
    name: "Soil health mapping",
    status: "Planned",
    stage: "Planned",
    learning: "Expected: correlation with crop stress",
    tone: "warn" as const,
    impact: "Low",
    duration: "3 weeks",
    cost: "₹1L",
  },
];

const pipeline = [
  { stage: "Planned", count: 2, note: "Scoped, awaiting a start date" },
  { stage: "Design", count: 1, note: "Protocol being written" },
  { stage: "Live", count: 2, note: "Collecting data now" },
  { stage: "Concluded", count: 1, note: "Learning locked in" },
];

const learningLog = [
  {
    experiment: "50-farmer interview wave",
    learning: "Water stress is felt, pest stress is missed",
    relevance: "High",
    evidence: "47 interviews across 4 agri belts",
  },
  {
    experiment: "Landing page A/B",
    learning: "CFO angle beats agronomy angle 2:1",
    relevance: "High",
    evidence: "2,340 landing-page sessions",
  },
  {
    experiment: "Per-acre pricing test",
    learning: "₹180–220/acre shows 71% acceptance",
    relevance: "Medium",
    evidence: "89 pricing responses collected",
  },
  {
    experiment: "Channel: FPO partnerships",
    learning: "Hypothesis: FPOs cut CAC 60%",
    relevance: "Medium",
    evidence: "2 FPO discussions in progress",
  },
];

const metrics = {
  total_interviews: "47",
  valid_interviews: "38",
  rejection_rate: "20%",
  positive_learnings: "12",
  negative_learnings: "5",
  key_insight:
    "Water stress is the #1 unmet need across all farmer segments",
  supporting_data: "30+ farmer testimonials collected, 3 pilot studies completed",
};

const decisionGates = [
  {
    gate: "Problem is real and expensive",
    threshold: "≥70% of interviewees report the pain unprompted",
    status: "Passed",
    tone: "good" as const,
  },
  {
    gate: "Someone will pay for it",
    threshold: "≥50% acceptance at ₹200/acre or above",
    status: "Passed",
    tone: "good" as const,
  },
  {
    gate: "We can deliver it repeatedly",
    threshold: "3 consecutive successful pilot deliveries",
    status: "In progress",
    tone: "accent" as const,
  },
  {
    gate: "We can reach buyers cheaply",
    threshold: "CAC below ₹4,000 per acre under contract",
    status: "Not yet tested",
    tone: "warn" as const,
  },
];

const nextExperiments = [
  {
    name: "SMS-based stress alert pilot",
    hypothesis: "Alerts without app installs keep weekly active use above 60%",
    window: "6 weeks",
    cost: "₹8L",
  },
  {
    name: "FPO channel economics study",
    hypothesis: "FPO-led acquisition cuts CAC by at least 40%",
    window: "8 weeks",
    cost: "₹12L",
  },
  {
    name: "Second agri-belt discovery wave",
    hypothesis: "The water-stress insight replicates outside the home belt",
    window: "5 weeks",
    cost: "₹4L",
  },
];

const validationTrend = [22, 28, 31, 38, 42, 49, 55, 61, 68, 74];

const statusTone = (tone: "good" | "accent" | "default" | "warn") =>
  tone === "good" ? "good" : tone === "accent" ? "accent" : tone === "warn" ? "warn" : "default";

const stageDot = (tone: "good" | "accent" | "default" | "warn") =>
  tone === "good"
    ? "bg-emerald-500"
    : tone === "accent"
      ? "bg-accent"
      : tone === "warn"
        ? "bg-amber-400"
        : "bg-slate-300";

const gateTone = (tone: "good" | "accent" | "warn") =>
  tone === "good" ? "good" : tone === "accent" ? "accent" : "warn";

export function IdeaValidation() {
  return (
    <div className="space-y-5">
      <PageHeader
        title="Idea Validation"
        desc="Every claim you have tested, what it cost, and what it changed about the idea."
        actions={
          <button className="inline-flex items-center gap-1.5 rounded-[10px] bg-accent px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-accent-deep">
            <Plus className="h-3.5 w-3.5" /> New experiment
          </button>
        }
      />

      {/* 1 — Validation score */}
      <div className="grid gap-5 lg:grid-cols-3">
        <Card title="Validation confidence" className="lg:col-span-1">
          <div className="flex items-center gap-5">
            <GaugeRing value={74} size={104} label="confidence" />
            <div className="min-w-0">
              <Badge tone="accent">Moderately validated</Badge>
              <p className="mt-2 text-[12.5px] leading-relaxed text-slate-600">
                Two of four decision gates are cleared. The two remaining gates
                need channel and repeatability data.
              </p>
            </div>
          </div>
          <div className="mt-5 flex items-start gap-2.5 rounded-xl bg-accent-mist p-3.5">
            <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
            <p className="text-[12px] leading-relaxed text-slate-600">
              <span className="font-semibold text-ink">Copilot:</span> Closing
              the FPO channel study unlocks two gates at once — it is the
              highest-leverage experiment in the queue.
            </p>
          </div>
        </Card>

        <Card
          title="Experiment pipeline"
          className="lg:col-span-2"
          action={<Badge tone="accent">6 experiments</Badge>}
        >
          <div className="grid gap-3 sm:grid-cols-4">
            {pipeline.map((p) => (
              <div
                key={p.stage}
                className="rounded-xl border border-line bg-white p-4"
              >
                <span className="text-2xl font-semibold text-ink tabular-nums">
                  {p.count}
                </span>
                <p className="mt-0.5 text-[12.5px] font-medium text-ink">
                  {p.stage}
                </p>
                <p className="mt-1 text-[11px] leading-snug text-slate-400">
                  {p.note}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-4 space-y-2.5">
            <div className="flex items-center gap-3">
              <span className="w-24 shrink-0 text-[12px] font-medium text-slate-500">
                Coverage
              </span>
              <Progress value={74} tone="accent" className="flex-1" />
              <span className="w-9 text-right text-[12px] font-semibold tabular-nums text-ink">
                74%
              </span>
            </div>
            <p className="text-[11.5px] text-slate-400">
              Coverage is the share of decision gates with at least one
              completed experiment behind them.
            </p>
          </div>
        </Card>
      </div>

      {/* 2 — Headline metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat
          icon={CheckCircle2}
          label="Total interviews"
          value={metrics.total_interviews}
          delta="38 valid"
          tone="good"
        />
        <Stat
          icon={AlertTriangle}
          label="Rejection rate"
          value={metrics.rejection_rate}
          hint="of interviewed segments"
          tone="warn"
        />
        <Stat
          icon={Sparkles}
          label="Positive learnings"
          value={metrics.positive_learnings}
          delta="+4 this month"
          tone="good"
        />
        <Stat
          icon={AlertTriangle}
          label="Negative learnings"
          value={metrics.negative_learnings}
          hint="logged, not ignored"
          tone="default"
        />
      </div>

      {/* 3 — Experiment list */}
      <Card title="All experiments" action={<Badge tone="default">6 running &amp; queued</Badge>} pad={false}>
        <ul className="divide-y divide-line">
          {experiments.map((x) => (
            <li key={x.name} className="px-5 py-4">
              <div className="flex items-start gap-3">
                <span
                  className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${stageDot(x.tone)}`}
                />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-[13.5px] font-semibold text-ink">{x.name}</p>
                    <div className="flex items-center gap-2">
                      <Badge tone={statusTone(x.tone)}>{x.status}</Badge>
                      <span className="text-[11px] text-slate-400">{x.stage}</span>
                    </div>
                  </div>
                  <p className="mt-1 text-[12.5px] leading-relaxed text-slate-600">
                    {x.learning}
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-3 text-[11px] text-slate-400">
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {x.duration}
                    </span>
                    <span>{x.cost}</span>
                    <span>{x.impact} impact</span>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Card>

      {/* 4 — Decision gates */}
      <Card
        title="Decision gates"
        action={<Badge tone="warn">2 of 4 cleared</Badge>}
        pad={false}
      >
        <ul className="divide-y divide-line">
          {decisionGates.map((g) => (
            <li key={g.gate} className="flex flex-wrap items-center gap-3 px-5 py-4">
              <Target className="h-4 w-4 shrink-0 text-slate-300" />
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-semibold text-ink">{g.gate}</p>
                <p className="mt-0.5 text-[12px] leading-snug text-slate-500">
                  {g.threshold}
                </p>
              </div>
              <Badge tone={gateTone(g.tone)}>{g.status}</Badge>
            </li>
          ))}
        </ul>
      </Card>

      {/* 5 — Learning log */}
      <Card title="Learning log" action={<Badge tone="accent">4 locked learnings</Badge>} pad={false}>
        <ul className="divide-y divide-line">
          {learningLog.map((l) => (
            <li key={l.experiment} className="px-5 py-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-[13px] font-semibold text-ink">{l.experiment}</p>
                <Badge
                  tone={l.relevance === "High" ? "good" : "accent"}
                >
                  {l.relevance} relevance
                </Badge>
              </div>
              <p className="mt-1 text-[12.5px] leading-relaxed text-slate-600">
                {l.learning}
              </p>
              <p className="mt-1.5 text-[11px] text-slate-400">Evidence — {l.evidence}</p>
            </li>
          ))}
        </ul>
      </Card>

      {/* 6 — Key insights */}
      <div className="grid gap-5 lg:grid-cols-2">
        <Card title="Key insight">
          <p className="text-[14px] font-medium leading-relaxed text-ink">
            {metrics.key_insight}
          </p>
          <p className="mt-2 text-[12.5px] leading-relaxed text-slate-500">
            {metrics.supporting_data}
          </p>
        </Card>

        <Card title="Validation trend" action={<Badge tone="good">+52 since v1</Badge>}>
          <div className="flex items-end justify-between gap-4">
            <div>
              <span className="text-4xl font-semibold tracking-tight text-ink tabular-nums">
                74
              </span>
              <p className="mt-1 text-[12px] text-slate-400">
                Confidence score · 10 experiment cycles
              </p>
            </div>
            <Spark points={validationTrend} good className="h-12 w-40" />
          </div>
        </Card>
      </div>

      {/* 7 — Next experiments */}
      <Card title="Next experiments" action={<FlaskConical className="h-4 w-4 text-slate-300" />} pad={false}>
        <ul className="divide-y divide-line">
          {nextExperiments.map((n) => (
            <li key={n.name} className="px-5 py-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-[13px] font-semibold text-ink">{n.name}</p>
                <div className="flex items-center gap-3 text-[11.5px] text-slate-400">
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {n.window}
                  </span>
                  <span>{n.cost}</span>
                </div>
              </div>
              <p className="mt-1 text-[12.5px] leading-relaxed text-slate-600">
                {n.hypothesis}
              </p>
            </li>
          ))}
        </ul>
      </Card>

      {/* 8 — Validation budget */}
      <Card title="Validation budget" action={<TrendingUp className="h-4 w-4 text-slate-300" />}>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-line p-4">
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-slate-400">
              Allocated
            </p>
            <p className="mt-1 text-xl font-semibold text-ink">₹50L</p>
          </div>
          <div className="rounded-xl border border-line p-4">
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-slate-400">
              Spent
            </p>
            <p className="mt-1 text-xl font-semibold text-emerald-600">₹32L (64%)</p>
          </div>
          <div className="rounded-xl border border-line p-4">
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-slate-400">
              Remaining
            </p>
            <p className="mt-1 text-xl font-semibold text-ink">₹18L</p>
          </div>
        </div>
        <Progress value={64} tone="accent" className="mt-4" />
        <p className="mt-2 text-[11.5px] text-slate-400">
          ₹18L remaining comfortably covers the three queued experiments
          (₹24L requested) only if the FPO study is scoped to two partners.
        </p>
      </Card>
    </div>
  );
}
