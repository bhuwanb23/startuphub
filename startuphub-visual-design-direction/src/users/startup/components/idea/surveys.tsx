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
import {
  credibilityScore,
  nps,
  promoterMix,
  responseChannels,
  responseRate,
  responseTrend,
  segmentProgressTone,
  segmentTone,
  segments,
  surveyFindings,
  surveyRecommendedActions,
  surveyQuestions,
  surveyTone,
  surveys,
  totalResponses,
  totalSent,
} from "@/users/startup/constants/customer-data";

const segmentName = (id: string) => segments.find((s) => s.id === id)?.name ?? id;

export function Surveys() {
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
            <GaugeRing value={nps} size={104} label="NPS" />
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
              <li key={s.id} className="px-5 py-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-[13.5px] font-semibold text-ink">{s.name}</p>
                  <div className="flex items-center gap-3">
                    <Badge tone={surveyTone(s.positive)}>
                      {s.responses} responses
                    </Badge>
                    <span className="text-[11.5px] text-slate-400">
                      {segmentName(s.segmentId)}
                    </span>
                  </div>
                </div>
                <div className="mt-2.5 flex items-center gap-3">
                  <Progress value={s.positive} tone={surveyTone(s.positive)} className="flex-1" />
                  <span className="w-10 text-right text-[12px] font-semibold tabular-nums text-ink">
                    {s.positive}%
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
          value={String(nps)}
          delta="+6 this quarter"
          tone="good"
        />
        <Stat
          icon={Users}
          label="Response rate"
          value={`${responseRate}%`}
          delta="+4 pts since last quarter"
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
          value={String(credibilityScore)}
          hint="sample quality"
          tone="default"
        />
      </div>

      {/* 3 — Response trend */}
      <Card title="Response rate trend" action={<Badge tone="good">+26 since v1</Badge>}>
        <div className="flex items-end justify-between gap-4">
          <div>
            <span className="text-4xl font-semibold tracking-tight text-ink tabular-nums">
              {responseRate}%
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
          {surveyQuestions.map((q) => (
            <li key={q.id} className="px-5 py-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-[13px] font-semibold text-ink">{q.question}</p>
                <Badge tone={surveyTone(q.pct)}>{q.pct}%</Badge>
              </div>
              <div className="mt-2 flex items-center gap-3">
                <Progress value={q.pct} tone={surveyTone(q.pct)} className="flex-1" />
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
                {surveyFindings.key}
              </p>
            </li>
            <li>
              <p className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                Secondary finding
              </p>
              <p className="mt-1 text-[13px] font-medium leading-relaxed text-ink">
                {surveyFindings.secondary}
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
              <Progress value={promoterMix.promoters} tone="good" className="flex-1" />
              <span className="w-9 text-right text-[12px] font-semibold tabular-nums text-ink">
                {promoterMix.promoters}%
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-24 shrink-0 text-[12px] font-medium text-slate-600">
                Passives
              </span>
              <Progress value={promoterMix.passives} tone="accent" className="flex-1" />
              <span className="w-9 text-right text-[12px] font-semibold tabular-nums text-ink">
                {promoterMix.passives}%
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-24 shrink-0 text-[12px] font-medium text-slate-600">
                Detractors
              </span>
              <Progress value={promoterMix.detractors} tone="bad" className="flex-1" />
              <span className="w-9 text-right text-[12px] font-semibold tabular-nums text-ink">
                {promoterMix.detractors}%
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
          {segments.map((s) => (
            <li key={s.id} className="flex flex-wrap items-center gap-4 px-5 py-4">
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-semibold text-ink">{s.name}</p>
                <p className="mt-0.5 text-[11.5px] text-slate-400">
                  {s.reachable} reachable farms · {s.share}% of addressable base
                </p>
              </div>
              <Progress value={s.share} tone={segmentProgressTone[s.status]} className="w-40" />
              <Badge tone={segmentTone[s.status]}>{s.status}</Badge>
            </li>
          ))}
        </ul>
      </Card>

      {/* 7 — Recommended actions */}
      <Card title="Recommended actions" action={<Badge tone="accent">4 queued</Badge>} pad={false}>
        <ul className="divide-y divide-line">
          {surveyRecommendedActions.map((r) => (
            <li key={r.action} className="px-5 py-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-[13px] font-semibold text-ink">{r.action}</p>
                <Badge tone={r.priority === "high" ? "good" : "accent"}>
                  {r.priority} priority
                </Badge>
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
          {responseChannels.map((c) => (
            <div key={c.id} className="rounded-xl border border-line p-4">
              <p className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                {c.label}
              </p>
              <p className="mt-1 text-xl font-semibold text-ink">{c.responses}</p>
              <p className="mt-1 text-[11.5px] text-slate-400">{c.note}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-[11.5px] leading-relaxed text-slate-400">
          Direct outreach still carries the majority of responses but is the
          most expensive channel per completed survey.
        </p>
      </Card>
    </div>
  );
}
