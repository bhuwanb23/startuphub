"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  MessageSquare,
  Plus,
  Sparkles,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import Link from "next/link";
import { Badge, Card, GaugeRing, PageHeader, Progress, Spark, Stat } from "@/components/app/widgets";
import {
  averageFit,
  customerActions,
  discoveryFunnel,
  discoveryConfidence,
  experiments,
  feedback,
  liveExperiments,
  netSentiment,
  personas,
  positiveShare,
  segmentProgressTone,
  segments,
  sentimentMix,
  sentimentTrend,
  surveys,
  themeTallies,
  totalInterviews,
  totalResponses,
  validationScore,
  worstTheme,
  type Sentiment,
} from "@/users/startup/constants/customer-data";

const sentimentTone: Record<Sentiment, "good" | "warn" | "bad"> = {
  positive: "good",
  neutral: "warn",
  negative: "bad",
};

const experimentTone: Record<string, "good" | "warn" | "bad"> = {
  Confirmed: "good",
  Testing: "warn",
  Failed: "bad",
};

const segmentName = (id: string) => segments.find((s) => s.id === id)?.name ?? id;

type FeedbackFilter = "All" | Sentiment;

export function Customers() {
  const [filter, setFilter] = useState<FeedbackFilter>("All");

  /* The most recent feedback first, filtered by sentiment. */
  const recent = useMemo(() => {
    const list = filter === "All" ? feedback : feedback.filter((f) => f.sentiment === filter);
    return [...list].sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, 5);
  }, [filter]);

  const filters: FeedbackFilter[] = ["All", "positive", "neutral", "negative"];

  return (
    <div className="space-y-5">
      <PageHeader
        title="Customers"
        desc="Segments, personas, validation, surveys and feedback — every customer signal the plan depends on, in one place."
        actions={
          <button className="inline-flex items-center gap-1.5 rounded-[10px] bg-accent px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-accent-deep">
            <Plus className="h-3.5 w-3.5" /> Log feedback
          </button>
        }
      />

      {/* 1 — Headline metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat
          icon={Users}
          label="Segments mapped"
          value={String(segments.length)}
          delta="1 validated · 1 pilot · 1 rejected"
          tone="default"
        />
        <Stat
          icon={Target}
          label="Personas"
          value={String(personas.length)}
          delta="one decision-maker per segment"
          tone="default"
        />
        <Stat
          icon={CheckCircle2}
          label="Validation score"
          value={`${validationScore}%`}
          delta={`${liveExperiments.length} experiments live`}
          tone="good"
        />
        <Stat
          icon={MessageSquare}
          label="Net sentiment"
          value={`+${netSentiment}`}
          delta={`${sentimentMix.positive} positive · ${sentimentMix.negative} negative`}
          tone="warn"
        />
      </div>

      {/* 2 — Validation dashboard */}
      <div className="grid gap-5 lg:grid-cols-3">
        <Card title="Validation dashboard" className="lg:col-span-1">
          <div className="flex items-center gap-5">
            <GaugeRing value={validationScore} size={104} label="validated" />
            <div className="min-w-0">
              <Badge tone="good">{liveExperiments.length} experiments live</Badge>
              <p className="mt-2 text-[12.5px] leading-relaxed text-slate-600">
                {totalInterviews} interviews and {totalResponses} survey responses
                across {segments.length} mapped segments.
              </p>
            </div>
          </div>
          <div className="mt-5 flex items-start gap-2.5 rounded-xl bg-accent-mist p-3.5">
            <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
            <p className="text-[12px] leading-relaxed text-slate-600">
              <span className="font-semibold text-ink">Copilot:</span> Pricing and
              channel are confirmed. Federation billing is the last open
              assumption — close it before the cooperative pilot signs.
            </p>
          </div>
        </Card>

        <Card
          title="Discovery funnel"
          className="lg:col-span-2"
          action={<Badge tone="accent">120 outreach</Badge>}
        >
          <div className="space-y-3">
            {discoveryFunnel.map((f) => (
              <div key={f.stage} className="grid grid-cols-[130px_1fr_54px] items-center gap-3">
                <span className="truncate text-[12.5px] font-medium text-slate-600">{f.stage}</span>
                <div>
                  <Progress value={(f.count / discoveryFunnel[0].count) * 100} tone="accent" />
                  <p className="mt-1 text-[11px] text-slate-400">{f.note}</p>
                </div>
                <span className="text-right text-[13px] font-semibold tabular-nums text-ink">
                  {f.count}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-4 border-t border-line pt-4 text-[12px] leading-relaxed text-slate-500">
            Discovery confidence sits at {discoveryConfidence}% — enough interviews to commit to one
            primary segment, not enough to call the market won.
          </p>
        </Card>
      </div>

      {/* 3 — Experiments */}
      <Card
        title="Validation experiments"
        action={<Badge tone="accent">{experiments.length} hypotheses</Badge>}
        pad={false}
      >
        <ul className="divide-y divide-line">
          {experiments.map((e) => (
            <li key={e.id} className="px-5 py-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <p className="min-w-0 flex-1 text-[13px] font-medium leading-snug text-ink">
                  {e.hypothesis}
                </p>
                <Badge tone={experimentTone[e.status]}>{e.status}</Badge>
              </div>
              <div className="mt-2.5 flex items-center gap-3">
                <Progress
                  value={e.confidence}
                  tone={e.status === "Confirmed" ? "good" : "warn"}
                  className="flex-1"
                />
                <span className="w-9 text-right text-[12px] font-bold tabular-nums text-ink">
                  {e.confidence}
                </span>
              </div>
              <p className="mt-1.5 text-[11.5px] leading-snug text-slate-400">{e.evidence}</p>
              <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-400">
                <span className="rounded-md bg-slate-100 px-1.5 py-0.5 font-medium text-slate-500">
                  {segmentName(e.segmentId)}
                </span>
                <span>{e.metric}</span>
                <span>{e.owner}</span>
                <span>due {e.due}</span>
              </div>
            </li>
          ))}
        </ul>
      </Card>

      {/* 4 — Segments + personas */}
      <div className="grid gap-5 lg:grid-cols-2">
        <Card
          title="Segment health"
          action={<Badge tone="default">avg fit {averageFit}</Badge>}
          pad={false}
        >
          <ul className="divide-y divide-line">
            {segments.map((s) => (
              <li key={s.id} className="px-5 py-3.5">
                <div className="flex items-center justify-between gap-3">
                  <p className="truncate text-[13px] font-semibold text-ink">{s.name}</p>
                  <Badge tone={segmentProgressTone[s.status] === "accent" ? "accent" : segmentProgressTone[s.status]}>
                    {s.status}
                  </Badge>
                </div>
                <div className="mt-2 flex items-center gap-3">
                  <Progress value={s.fit} tone={segmentProgressTone[s.status]} className="flex-1" />
                  <span className="w-20 text-right text-[11.5px] font-semibold tabular-nums text-ink">
                    {s.fit}% fit
                  </span>
                </div>
                <p className="mt-1 text-[11px] text-slate-400">
                  {s.interviews} interviews · {s.reachable} reachable farms · {s.potential} potential
                </p>
              </li>
            ))}
          </ul>
        </Card>

        <Card title="Personas" action={<Badge tone="default">{personas.length} buyers</Badge>} pad={false}>
          <ul className="divide-y divide-line">
            {personas.map((p) => (
              <li key={p.id} className="px-5 py-3.5">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-[13px] font-semibold text-ink">{p.name}</p>
                  <span className="text-[11.5px] text-slate-400">{p.org}</span>
                  <Badge tone={p.tone === "good" ? "good" : p.tone === "accent" ? "accent" : "bad"}>
                    {p.stance}
                  </Badge>
                </div>
                <p className="mt-1.5 border-l-2 border-accent-200 pl-3 text-[12.5px] italic leading-relaxed text-slate-600">
                  “{p.quote}”
                </p>
                <p className="mt-1.5 text-[11px] text-slate-400">
                  {p.channel} · {p.adoption}% adoption
                </p>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* 5 — Feedback sentiment */}
      <div className="grid gap-5 lg:grid-cols-2">
        <Card title="Feedback sentiment" action={<Badge tone="warn">+{netSentiment} net</Badge>}>
          <div className="space-y-3.5">
            {[
              { label: "Positive", count: sentimentMix.positive, tone: "good" as const },
              { label: "Neutral", count: sentimentMix.neutral, tone: "accent" as const },
              { label: "Negative", count: sentimentMix.negative, tone: "bad" as const },
            ].map((row) => (
              <div key={row.label} className="flex items-center gap-3">
                <span className="w-20 shrink-0 text-[12px] font-medium text-slate-600">{row.label}</span>
                <Progress
                  value={(row.count / feedback.length) * 100}
                  tone={row.tone}
                  className="flex-1"
                />
                <span className="w-12 text-right text-[12px] font-semibold tabular-nums text-ink">
                  {row.count} · {Math.round((row.count / feedback.length) * 100)}%
                </span>
              </div>
            ))}
          </div>
          <div className="mt-5 flex items-end justify-between gap-4 border-t border-line pt-4">
            <div>
              <span className="text-3xl font-semibold tracking-tight text-ink tabular-nums">
                {positiveShare}%
              </span>
              <p className="mt-1 text-[11.5px] text-slate-400">
                of everything we heard is positive
              </p>
            </div>
            <Spark points={sentimentTrend} good={netSentiment >= 0} className="h-10 w-36" />
          </div>
        </Card>

        <Card
          title="Themes that need attention"
          action={<Badge tone="bad">worst: {worstTheme.name}</Badge>}
          pad={false}
        >
          <ul className="divide-y divide-line">
            {themeTallies.slice(0, 4).map((t) => (
              <li key={t.id} className="px-5 py-3.5">
                <div className="flex items-center justify-between gap-3">
                  <p className="truncate text-[13px] font-semibold text-ink">{t.name}</p>
                  <span
                    className={`text-[12px] font-bold tabular-nums ${
                      t.score < 0 ? "text-red-500" : t.score < 10 ? "text-amber-600" : "text-emerald-600"
                    }`}
                  >
                    {t.score > 0 ? `+${t.score}` : t.score}
                  </span>
                </div>
                <p className="mt-1 text-[11.5px] leading-snug text-slate-400">{t.action}</p>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* 6 — Latest feedback */}
      <Card
        title="Latest feedback"
        action={
          <div className="flex flex-wrap gap-1.5">
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={`rounded-full px-2.5 py-1 text-[11px] font-semibold capitalize transition-colors ${
                  filter === f
                    ? "bg-accent text-white"
                    : "border border-line bg-white text-slate-500 hover:border-slate-300 hover:text-ink"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        }
        pad={false}
      >
        <ul className="divide-y divide-line">
          {recent.map((f) => (
            <li key={f.id} className="px-5 py-3.5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <p className="min-w-0 flex-1 text-[12.5px] leading-relaxed text-slate-600">
                  “{f.quote}”
                </p>
                <Badge tone={sentimentTone[f.sentiment]}>
                  {f.score > 0 ? `+${f.score}` : f.score}
                </Badge>
              </div>
              <p className="mt-1.5 text-[11px] text-slate-400">
                {f.author} · {f.source} · {segmentName(f.segmentId)} · {f.date}
              </p>
            </li>
          ))}
        </ul>
      </Card>

      {/* 7 — Actions */}
      <Card title="What this changes" action={<Badge tone="accent">{customerActions.length} actions</Badge>} pad={false}>
        <ul className="divide-y divide-line">
          {customerActions.map((a) => (
            <li key={a.id} className="flex flex-wrap items-center gap-3 px-5 py-3.5">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
                <TrendingUp className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-semibold text-ink">{a.action}</p>
                <p className="mt-0.5 text-[11.5px] text-slate-400">
                  {a.owner} · due {a.due}
                </p>
              </div>
              <Badge tone={a.impact === "High" ? "bad" : a.impact === "Medium" ? "warn" : "default"}>
                {a.impact}
              </Badge>
            </li>
          ))}
        </ul>
      </Card>

      {/* 8 — Where to go next */}
      <Card title="Where to go next">
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            {
              label: "Segments & Personas",
              href: "/founder/customers/segments",
              body: "Who we sell to, who decides, and who we refuse.",
            },
            {
              label: "Surveys",
              href: "/founder/customers/surveys",
              body: "The survey program and what each question proved.",
            },
            {
              label: "Feedback & Sentiment",
              href: "/founder/customers/feedback",
              body: "Every piece of feedback, scored and themed.",
            },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group rounded-xl border border-line p-4 transition-colors hover:border-accent"
            >
              <p className="flex items-center gap-1.5 text-[13px] font-semibold text-ink">
                {link.label}
                <ArrowRight className="h-3.5 w-3.5 text-accent transition-transform group-hover:translate-x-0.5" />
              </p>
              <p className="mt-1 text-[12px] leading-relaxed text-slate-500">{link.body}</p>
            </Link>
          ))}
        </div>
      </Card>
    </div>
  );
}
