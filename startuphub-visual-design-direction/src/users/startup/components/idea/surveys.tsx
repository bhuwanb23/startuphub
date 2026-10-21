import {
  AlertTriangle,
  CheckCircle2,
  Clipboard,
  MessageSquare,
  Plus,
  Sparkles,
  TrendingUp,
  Users,
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

/* ── Survey inventory ────────────────────────────────────────
   `sent` and `responses` drive the completion ratio. `pct` is
   the share of respondents who rated the survey's focus
   positively.                                                      */
const surveys = [
  {
    name: "Problem validation survey",
    sent: 160,
    responses: 128,
    pct: 73,
    tone: "good" as const,
    segment: "Large-scale farms",
  },
  {
    name: "Pricing sensitivity survey",
    sent: 130,
    responses: 89,
    pct: 61,
    tone: "accent" as const,
    segment: "Smallholder farms",
  },
  {
    name: "Feature priority survey",
    sent: 110,
    responses: 67,
    pct: 55,
    tone: "accent" as const,
    segment: "Cooperative farms",
  },
  {
    name: "NPS survey",
    sent: 90,
    responses: 45,
    pct: 48,
    tone: "warn" as const,
    segment: "All segments",
  },
  {
    name: "Usability test survey",
    sent: 70,
    responses: 33,
    pct: 42,
    tone: "warn" as const,
    segment: "Product users",
  },
];

const questionResults = [
  {
    question: "How painful is water stress in a normal season?",
    answer: "8.2 / 10 average severity",
    pct: 84,
    tone: "good" as const,
  },
  {
    question: "Would you pay ₹200 per acre for 10-day-early alerts?",
    answer: "71% said yes at ₹180–220",
    pct: 71,
    tone: "good" as const,
  },
  {
    question: "Which channel should carry the alert?",
    answer: "WhatsApp 54% · SMS 31% · App 15%",
    pct: 54,
    tone: "accent" as const,
  },
  {
    question: "How do you currently detect crop stress?",
    answer: "Scouting 62% · Farmer gut 31% · Nothing 7%",
    pct: 62,
    tone: "accent" as const,
  },
  {
    question: "Would you recommend this to another grower?",
    answer: "NPS 42 — promoters exceed detractors 3:1",
    pct: 48,
    tone: "warn" as const,
  },
];

const segmentBreakdown = [
  {
    key: "large_scaled",
    label: "Large-scale farms",
    count: "12K+",
    percent: "35%",
    status: "Validated",
    tone: "good" as const,
  },
  {
    key: "cooperatives",
    label: "Cooperative farms",
    count: "8K+",
    percent: "22%",
    status: "Pilot",
    tone: "accent" as const,
  },
  {
    key: "smallholders",
    label: "Smallholder farms",
    count: "5K+",
    percent: "20%",
    status: "Rejected",
    tone: "bad" as const,
  },
  {
    key: "individuals",
    label: "Individual growers",
    count: "3K+",
    percent: "15%",
    status: "Unknown",
    tone: "default" as const,
  },
];

const insights = {
  nps: 42,
  response_rate: "68%",
  response_rate_trend: "+8% since last quarter",
  key_finding: "Water stress is the #1 unmet need across all farmer segments",
  secondary_finding:
    "Willingness to pay for the solution is 40% higher than expected",
  credibility_score: 85,
};

const responseTrend = [42, 46, 51, 55, 58, 60, 63, 65, 67, 68];

const recommendedActions = [
  {
    action: "Develop prototype based on top survey findings",
    impact: "High",
    timeline: "10 weeks",
    cost: "₹10L",
    priority: "high" as const,
  },
  {
    action: "A/B test pricing models with pilot users",
    impact: "Medium",
    timeline: "6 weeks",
    cost: "₹4L",
    priority: "medium" as const,
  },
  {
    action: "Build community of early adopters",
    impact: "Medium",
    timeline: "8 weeks",
    cost: "₹3L",
    priority: "medium" as const,
  },
  {
    action: "File provisional patent on core innovation",
    impact: "High",
    timeline: "4 weeks",
    cost: "₹2L",
    priority: "high" as const,
  },
];

const priorityTone = (priority: "high" | "medium") =>
  priority === "high" ? "good" : "accent";

const surveyTone = (tone: "good" | "accent" | "warn") =>
  tone === "good" ? "good" : tone === "accent" ? "accent" : "warn";

export function Surveys() {
  const totalSent = surveys.reduce((sum, s) => sum + s.sent, 0);
  const totalResponses = surveys.reduce((sum, s) => sum + s.responses, 0);
  const completion = Math.round((totalResponses / totalSent) * 100);

  return (
    <div className="space-y-5">
      <PageHeader
        title="Survey Results"
        desc="What the numbers said when you asked — and how much weight each answer can carry."
        actions={
          <button className="inline-flex items-center gap-1.5 rounded-[10px] bg-accent px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-accent-deep">
            <Plus className="h-3.5 w-3.5" /> New survey
          </button>
        }
      />

      {/* 1 — NPS headline */}
      <div className="grid gap-5 lg:grid-cols-3">
        <Card title="Net promoter score" className="lg:col-span-1">
          <div className="flex items-center gap-5">
            <GaugeRing value={insights.nps} size={104} label="NPS" />
            <div className="min-w-0">
              <Badge tone="good">Strong promoter base</Badge>
              <p className="mt-2 text-[12.5px] leading-relaxed text-slate-600">
                Promoters outnumber detractors 3:1, driven almost entirely by
                large-scale farm operators.
              </p>
            </div>
          </div>
          <div className="mt-5 flex items-start gap-2.5 rounded-xl bg-accent-mist p-3.5">
            <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
            <p className="text-[12px] leading-relaxed text-slate-600">
              <span className="font-semibold text-ink">Copilot:</span> 71%
              acceptance at ₹180–220/acre clears the pricing gate. Run the A/B
              pricing test before the pilot commitments are signed.
            </p>
          </div>
        </Card>

        <Card
          title="Survey inventory"
          className="lg:col-span-2"
          action={<Badge tone="accent">5 active</Badge>}
          pad={false}
        >
          <ul className="divide-y divide-line">
            {surveys.map((s) => (
              <li key={s.name} className="px-5 py-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-[13.5px] font-semibold text-ink">{s.name}</p>
                  <div className="flex items-center gap-3">
                    <Badge tone={surveyTone(s.tone)}>
                      {s.responses} responses
                    </Badge>
                    <span className="text-[11.5px] text-slate-400">{s.segment}</span>
                  </div>
                </div>
                <div className="mt-2.5 flex items-center gap-3">
                  <Progress value={s.pct} tone={surveyTone(s.tone)} className="flex-1" />
                  <span className="w-10 text-right text-[12px] font-semibold tabular-nums text-ink">
                    {s.pct}%
                  </span>
                </div>
                <p className="mt-1.5 text-[11px] text-slate-400">
                  {s.responses} of {s.sent} sent answered ·{" "}
                  {Math.round((s.responses / s.sent) * 100)}% completion
                </p>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* 2 — Headline metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat
          icon={CheckCircle2}
          label="NPS score"
          value={String(insights.nps)}
          delta="+6 this quarter"
          tone="good"
        />
        <Stat
          icon={Users}
          label="Response rate"
          value={insights.response_rate}
          delta={insights.response_rate_trend}
          tone="good"
        />
        <Stat
          icon={Clipboard}
          label="Total responses"
          value={String(totalResponses)}
          hint={`of ${totalSent} sent`}
          tone="default"
        />
        <Stat
          icon={AlertTriangle}
          label="Credibility score"
          value={String(insights.credibility_score)}
          hint="sample quality"
          tone="default"
        />
      </div>

      {/* 3 — Response trend */}
      <Card title="Response rate trend" action={<Badge tone="good">+26 since v1</Badge>}>
        <div className="flex items-end justify-between gap-4">
          <div>
            <span className="text-4xl font-semibold tracking-tight text-ink tabular-nums">
              {completion}%
            </span>
            <p className="mt-1 text-[12px] text-slate-400">
              Aggregate completion across all active surveys
            </p>
          </div>
          <Spark points={responseTrend} good className="h-12 w-40" />
        </div>
      </Card>

      {/* 4 — Question-level results */}
      <Card title="Question-level results" action={<Badge tone="accent">5 questions</Badge>} pad={false}>
        <ul className="divide-y divide-line">
          {questionResults.map((q) => (
            <li key={q.question} className="px-5 py-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-[13px] font-semibold text-ink">{q.question}</p>
                <Badge tone={surveyTone(q.tone)}>{q.pct}%</Badge>
              </div>
              <div className="mt-2 flex items-center gap-3">
                <Progress value={q.pct} tone={surveyTone(q.tone)} className="flex-1" />
                <span className="text-[11.5px] text-slate-500">{q.answer}</span>
              </div>
            </li>
          ))}
        </ul>
      </Card>

      {/* 5 — Key findings */}
      <div className="grid gap-5 lg:grid-cols-2">
        <Card title="Key findings">
          <ul className="space-y-4">
            <li>
              <p className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                Primary finding
              </p>
              <p className="mt-1 text-[13px] font-medium leading-relaxed text-ink">
                {insights.key_finding}
              </p>
            </li>
            <li>
              <p className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                Secondary finding
              </p>
              <p className="mt-1 text-[13px] font-medium leading-relaxed text-ink">
                {insights.secondary_finding}
              </p>
            </li>
          </ul>
        </Card>

        <Card title="Distribution of responses" action={<TrendingUp className="h-4 w-4 text-slate-300" />}>
          <div className="space-y-3.5">
            <div className="flex items-center gap-3">
              <span className="w-24 shrink-0 text-[12px] font-medium text-slate-600">
                Promoters
              </span>
              <Progress value={58} tone="good" className="flex-1" />
              <span className="w-9 text-right text-[12px] font-semibold tabular-nums text-ink">
                58%
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-24 shrink-0 text-[12px] font-medium text-slate-600">
                Passives
              </span>
              <Progress value={26} tone="accent" className="flex-1" />
              <span className="w-9 text-right text-[12px] font-semibold tabular-nums text-ink">
                26%
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-24 shrink-0 text-[12px] font-medium text-slate-600">
                Detractors
              </span>
              <Progress value={16} tone="bad" className="flex-1" />
              <span className="w-9 text-right text-[12px] font-semibold tabular-nums text-ink">
                16%
              </span>
            </div>
          </div>
          <p className="mt-4 text-[11.5px] leading-relaxed text-slate-400">
            Detractors cluster almost entirely in the usability test cohort —
            the survey itself scored 42% positive, the lowest of the five.
          </p>
        </Card>
      </div>

      {/* 6 — Segment breakdown */}
      <Card title="Segment breakdown" action={<Badge tone="accent">4 segments</Badge>} pad={false}>
        <ul className="divide-y divide-line">
          {segmentBreakdown.map((s) => (
            <li key={s.key} className="flex flex-wrap items-center gap-4 px-5 py-4">
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-semibold text-ink">{s.label}</p>
                <p className="mt-0.5 text-[11.5px] text-slate-400">
                  {s.count} reachable farms · {s.percent} of addressable base
                </p>
              </div>
              <Progress
                value={parseInt(s.percent, 10)}
                tone={s.tone === "good" ? "good" : s.tone === "accent" ? "accent" : s.tone === "bad" ? "bad" : "warn"}
                className="w-40"
              />
              <Badge
                tone={
                  s.tone === "good"
                    ? "good"
                    : s.tone === "accent"
                      ? "accent"
                      : s.tone === "bad"
                        ? "bad"
                        : "default"
                }
              >
                {s.status}
              </Badge>
            </li>
          ))}
        </ul>
      </Card>

      {/* 7 — Recommended actions */}
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

      {/* 8 — Channels */}
      <Card title="Where responses come from" action={<MessageSquare className="h-4 w-4 text-slate-300" />}>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-line p-4">
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-slate-400">
              Direct outreach
            </p>
            <p className="mt-1 text-xl font-semibold text-ink">196</p>
            <p className="mt-1 text-[11.5px] text-slate-400">52% of all responses</p>
          </div>
          <div className="rounded-xl border border-line p-4">
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-slate-400">
              FPO network
            </p>
            <p className="mt-1 text-xl font-semibold text-ink">108</p>
            <p className="mt-1 text-[11.5px] text-slate-400">29% of all responses</p>
          </div>
          <div className="rounded-xl border border-line p-4">
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-slate-400">
              In-product
            </p>
            <p className="mt-1 text-xl font-semibold text-ink">58</p>
            <p className="mt-1 text-[11.5px] text-slate-400">19% of all responses</p>
          </div>
        </div>
        <p className="mt-4 text-[11.5px] leading-relaxed text-slate-400">
          Direct outreach still carries the majority of responses but is the
          most expensive channel per completed survey.
        </p>
      </Card>
    </div>
  );
}
