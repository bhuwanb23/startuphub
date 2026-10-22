import {
  AlertTriangle,
  Award,
  CheckCircle2,
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
import { healthScore } from "@/users/startup/constants/ipr-data";

/* ── Assessment dimensions ──────────────────────────────────
   Scored 0–100 against what the ecosystem expects at this
   stage. Anything under 70 is flagged amber.                     */
const assessment = [
  { dim: "Product", score: 84, note: "Working v3 in 3 pilot accounts" },
  { dim: "Market", score: 79, note: "4 agri belts mapped, 1 untested" },
  { dim: "Team", score: 91, note: "28 people, full founding trio in place" },
  { dim: "Traction", score: 72, note: "3 paid pilots, no renewal cycle yet" },
  { dim: "Funding readiness", score: 78, note: "Data room 80% complete" },
  { dim: "IP & Legal", score: healthScore, note: "Trademark pending, patent claims open" },
];

/* Stage-A cohort averages for the same dimensions. */
const cohort = [
  { dim: "Product", idea: 84, stage: 76 },
  { dim: "Market", idea: 79, stage: 71 },
  { dim: "Team", idea: 91, stage: 74 },
  { dim: "Traction", idea: 72, stage: 64 },
  { dim: "Funding readiness", idea: 78, stage: 69 },
  { dim: "IP & Legal", idea: healthScore, stage: 61 },
];

const strengths = [
  {
    title: "Team is the strongest dimension",
    body: "Full founding trio with a domain expert — rarely true at this stage and the single most-cited strength by investors.",
  },
  {
    title: "Product already works in production",
    body: "Three paid pilot accounts running on v3, not a demo. Support load stays under four tickets a week.",
  },
  {
    title: "Market is mapped with real numbers",
    body: "4 agri belts quantified, 12K+ reachable farms, and a segment already narrowed to large-scale operations.",
  },
];

const gaps = [
  {
    title: "IP & Legal trails every dimension",
    body: "Patent claims review is still open and the v2 trademark is pending — this is the one thing that can block a Series A.",
  },
  {
    title: "Traction has no renewal evidence",
    body: "3 pilots signed, none renewed. Without a renewal cycle the traction score will not move.",
  },
  {
    title: "Funding readiness is a checkbox, not a narrative",
    body: "Data room is 80% complete but the unit economics per acre are not yet modelled in a form an investor can read.",
  },
];

const recommendedActions = [
  {
    title: "Complete patent claim review",
    impact: "High",
    alt: "File trademark for the v2 product name",
    altImpact: "Medium",
    timeline: "6 weeks",
  },
  {
    title: "Respond to pilot RFP",
    impact: "Medium",
    alt: "Book mentor session for Q2",
    altImpact: "Low",
    timeline: "2 weeks",
  },
  {
    title: "Model per-acre unit economics for the data room",
    impact: "High",
    alt: "Publish a one-page traction memo",
    altImpact: "Medium",
    timeline: "4 weeks",
  },
  {
    title: "Close the first pilot renewal",
    impact: "High",
    alt: "Convert two pilot accounts to annual",
    altImpact: "Medium",
    timeline: "8 weeks",
  },
];

const certification = [
  { name: "StartupHub verified profile", state: "Granted", tone: "good" as const, note: "Re-verified 12 Aug 2026" },
  { name: "DPIIT recognition", state: "Granted", tone: "good" as const, note: "Valid through Mar 2027" },
  { name: "ISO 27001 readiness", state: "In progress", tone: "accent" as const, note: "Gap analysis complete, controls building" },
  { name: "SOC 2 Type I", state: "Not started", tone: "warn" as const, note: "Required before enterprise contracts" },
];

const assessmentTrend = [58, 61, 64, 66, 68, 70, 71, 73, 74, 78];

const dimensionTone = (score: number) =>
  score >= 80 ? "good" : score >= 70 ? "accent" : "warn";

export function StartupAssessment() {
  const overall = Math.round(
    assessment.reduce((sum, a) => sum + a.score, 0) / assessment.length,
  );
  const strongest = assessment.reduce((a, b) => (a.score > b.score ? a : b));
  const weakest = assessment.reduce((a, b) => (a.score < b.score ? a : b));

  return (
    <div className="space-y-5">
      <PageHeader
        title="Startup Assessment"
        desc="How your startup measures up against what the ecosystem expects at this stage — and the three things holding it back."
      />

      {/* 1 — Overall readiness */}
      <div className="grid gap-5 lg:grid-cols-3">
        <Card title="Assessment score" className="lg:col-span-1">
          <div className="flex items-center gap-5">
            <GaugeRing value={overall} size={104} label="readiness" />
            <div className="min-w-0">
              <Badge tone="good">Above stage average</Badge>
              <p className="mt-2 text-[12.5px] leading-relaxed text-slate-600">
                Averages {overall}/100 across {assessment.length} dimensions, ahead
                of the Stage A cohort on every one.
              </p>
            </div>
          </div>
          <div className="mt-5 flex items-start gap-2.5 rounded-xl bg-accent-mist p-3.5">
            <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
            <p className="text-[12px] leading-relaxed text-slate-600">
              <span className="font-semibold text-ink">Copilot:</span> Closing the
              patent claim review lifts IP &amp; Legal past 80 and takes the
              overall score to 82 — the fastest single move available.
            </p>
          </div>
        </Card>

        <Card
          title="Dimension breakdown"
          className="lg:col-span-2"
          action={<Badge tone="accent">6 dimensions</Badge>}
        >
          <div className="space-y-3.5">
            {assessment.map((a) => (
              <div key={a.dim} className="flex items-center gap-3">
                <span className="w-32 shrink-0 text-[12.5px] font-medium text-slate-600">
                  {a.dim}
                </span>
                <Progress value={a.score} tone={dimensionTone(a.score)} className="flex-1" />
                <span className="w-8 text-right text-[12.5px] font-semibold tabular-nums text-ink">
                  {a.score}
                </span>
                <span className="hidden w-56 truncate text-[11px] text-slate-400 lg:block">
                  {a.note}
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
          label="Assessment score"
          value={`${overall}/100`}
          delta="+20 since v1"
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
          icon={Award}
          label="Above cohort"
          value={`${cohort.filter((c) => c.idea > c.stage).length}/6`}
          hint="dimensions"
          tone="default"
        />
      </div>

      {/* 3 — Cohort benchmark */}
      <Card
        title="Benchmark against Stage A cohort"
        action={<Scale className="h-4 w-4 text-slate-300" />}
      >
        <div className="space-y-3">
          {cohort.map((c) => (
            <div key={c.dim} className="grid grid-cols-[150px_1fr_52px] items-center gap-3">
              <span className="truncate text-[12px] font-medium text-slate-600">
                {c.dim}
              </span>
              <div className="relative h-4">
                <div className="absolute inset-x-0 top-0 h-2 rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-accent"
                    style={{ width: `${c.idea}%` }}
                  />
                </div>
                <div
                  className="absolute top-0 h-2 rounded-full bg-ink/25"
                  style={{ width: `${c.stage}%` }}
                />
              </div>
              <span className="text-right text-[12px] font-semibold tabular-nums text-ink">
                +{c.idea - c.stage}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-4 flex items-center gap-2 text-[11.5px] text-slate-400">
          <span className="inline-block h-2 w-4 rounded-full bg-accent" />
          Lumen AI
          <span className="ml-3 inline-block h-2 w-4 rounded-full bg-ink/25" />
          Stage A average
        </p>
      </Card>

      {/* 4 — Strengths & gaps */}
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

        <Card title="Gaps" action={<Badge tone="warn">3 open</Badge>} pad={false}>
          <ul className="divide-y divide-line">
            {gaps.map((g) => (
              <li key={g.title} className="px-5 py-4">
                <div className="flex items-start gap-2.5">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                  <div>
                    <p className="text-[13px] font-semibold text-ink">{g.title}</p>
                    <p className="mt-1 text-[12px] leading-relaxed text-slate-500">
                      {g.body}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* 5 — Focus areas */}
      <Card title="Focus areas" action={<Badge tone="accent">4 queued</Badge>} pad={false}>
        <ul className="divide-y divide-line">
          {recommendedActions.map((r) => (
            <li key={r.title} className="px-5 py-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-[13px] font-semibold text-ink">{r.title}</p>
                <div className="flex items-center gap-2">
                  <Badge tone={r.impact === "High" ? "good" : "accent"}>
                    {r.impact} impact
                  </Badge>
                  <span className="text-[11px] text-slate-400">{r.timeline}</span>
                </div>
              </div>
              <p className="mt-1 text-[12px] leading-relaxed text-slate-500">
                Alternative — {r.alt}{" "}
                <span className="text-slate-400">({r.altImpact} impact)</span>
              </p>
            </li>
          ))}
        </ul>
      </Card>

      {/* 6 — Recommended focus */}
      <Card title="Recommended focus">
        <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-4">
          <p className="text-[12.5px] font-semibold text-ink">IP &amp; Legal</p>
          <p className="mt-1 text-[12px] leading-relaxed text-slate-600">
            IP &amp; Legal is your weakest dimension — complete the trademark for
            the v2 product name and the ongoing patent claims review to lift
            it.
          </p>
        </div>
        <p className="mt-4 text-[12.5px] leading-relaxed text-slate-600">
          Nothing else on this page blocks a raise. The team, product and market
          dimensions are all ahead of the cohort — IP is the only dimension
          where a diligence conversation could stall.
        </p>
      </Card>

      {/* 7 — Certifications */}
      <Card
        title="Certifications & compliance"
        action={<ShieldCheck className="h-4 w-4 text-slate-300" />}
        pad={false}
      >
        <ul className="divide-y divide-line">
          {certification.map((c) => (
            <li key={c.name} className="flex flex-wrap items-center gap-3 px-5 py-4">
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-semibold text-ink">{c.name}</p>
                <p className="mt-0.5 text-[11.5px] text-slate-400">{c.note}</p>
              </div>
              <Badge
                tone={c.tone === "good" ? "good" : c.tone === "accent" ? "accent" : "warn"}
              >
                {c.state}
              </Badge>
            </li>
          ))}
        </ul>
      </Card>

      {/* 8 — Score history */}
      <Card title="Score history" action={<Badge tone="good">+20 since v1</Badge>}>
        <div className="flex items-end justify-between gap-4">
          <div>
            <span className="text-4xl font-semibold tracking-tight text-ink tabular-nums">
              {overall}
            </span>
            <p className="mt-1 text-[12px] text-slate-400">
              Latest assessment · 10 review cycles
            </p>
          </div>
          <Spark points={assessmentTrend} good className="h-12 w-40" />
        </div>
      </Card>

      {/* 9 — How it is scored */}
      <Card title="How the assessment works">
        <ul className="space-y-3">
          <li className="flex items-start gap-2.5 text-[12.5px] leading-relaxed text-slate-600">
            <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
            Each dimension is scored against the Stage A benchmark, not against
            your own previous quarter.
          </li>
          <li className="flex items-start gap-2.5 text-[12.5px] leading-relaxed text-slate-600">
            <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
            Scores below 70 are flagged amber, and every flagged dimension must
            have a dated action attached to it.
          </li>
          <li className="flex items-start gap-2.5 text-[12.5px] leading-relaxed text-slate-600">
            <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
            Incubators and investors see this same score, so it is worth keeping
            honest rather than flattering.
          </li>
        </ul>
      </Card>
    </div>
  );
}
