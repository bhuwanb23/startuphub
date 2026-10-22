"use client";

import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  BarChart3,
  CircleAlert,
  ClipboardCheck,
  Gauge,
  Scale,
  SlidersHorizontal,
  Users,
} from "lucide-react";
import Link from "next/link";
import { Badge, Card, PageHeader, Progress } from "@/components/app/widgets";
import { cn } from "@/lib/utils";
import {
  APPLICATIONS,
  CALIBRATION,
  CRITERIA,
  REVIEW_CHECKPOINTS,
  REVIEW_QUEUE,
  SCORECARDS,
  SCORE_DISTRIBUTION,
} from "../../constants/programs-data";

const REC_TONE = {
  Accept: "good",
  Hold: "warn",
  Reject: "bad",
} as const;

export function ApplicantEvaluation() {
  const [selectedId, setSelectedId] = useState(SCORECARDS[0].applicationId);

  const selected = useMemo(
    () => SCORECARDS.find((s) => s.applicationId === selectedId) ?? SCORECARDS[0],
    [selectedId],
  );
  const applicant = useMemo(
    () => APPLICATIONS.find((a) => a.id === selected.applicationId),
    [selected],
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Applicant Evaluation"
        desc="Score the Cohort VIII pool against six weighted criteria — and keep the committee honest."
        actions={
          <Link
            href="/incubator/programs/selection"
            className="inline-flex items-center gap-1.5 rounded-[10px] bg-accent px-4 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-accent-deep"
          >
            <Users className="h-3.5 w-3.5" /> Shortlist
          </Link>
        }
      />

      {/* ── 01 · Criteria & weights ──────────────────────────── */}
      <Card
        title="Evaluation criteria & weights"
        sub="The rubric every applicant is scored against"
        action={
          <button className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-accent">
            <SlidersHorizontal className="h-3.5 w-3.5" /> Edit weights
          </button>
        }
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CRITERIA.map((c) => (
            <div
              key={c.key}
              className="group rounded-xl border border-line p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-soft"
            >
              <div className="flex items-start justify-between gap-3">
                <p className="text-[13.5px] font-semibold text-ink">{c.label}</p>
                <span className="shrink-0 text-[20px] font-semibold tracking-[-0.03em] text-accent tabular-nums">
                  {c.weight}%
                </span>
              </div>
              <p className="mt-2 text-[12px] leading-relaxed text-slate-500">
                {c.rubric}
              </p>
              <div className="mt-3">
                <Progress value={c.weight * 5} tone="accent" />
              </div>
            </div>
          ))}
        </div>
        <p className="mt-4 border-t border-line pt-3.5 text-[12px] text-slate-400">
          Weights total 100% · unchanged since Cohort VII · last edited 12 Jan 2026 by
          Meera Iyer
        </p>
      </Card>

      {/* ── 02 · Review queue ────────────────────────────────── */}
      <Card
        title="Review queue"
        sub="Applications still waiting on a score"
        action={<Badge tone="bad">2 overdue</Badge>}
        pad={false}
      >
        <ul className="divide-y divide-line">
          {REVIEW_QUEUE.map((q) => (
            <li
              key={q.applicationId}
              className="flex flex-wrap items-center gap-4 px-5 py-4 transition-colors hover:bg-soft"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent">
                <ClipboardCheck className="h-4 w-4" />
              </span>
              <div className="min-w-[180px] flex-1">
                <p className="text-[13.5px] font-semibold text-ink">{q.startup}</p>
                <p className="mt-0.5 text-[11.5px] text-slate-400">
                  reviewer {q.reviewer}
                </p>
              </div>
              <span className="font-mono text-[11.5px] text-slate-500">
                waiting {q.waiting}
              </span>
              <Badge tone={q.tone}>{q.priority}</Badge>
            </li>
          ))}
        </ul>
      </Card>

      {/* ── 03 · Scorecard for the selected applicant ─────────── */}
      <Card
        title={applicant ? `${applicant.startup} — scorecard` : "Scorecard"}
        sub={
          applicant
            ? `${applicant.sector} · ${applicant.stage} · applied ${applicant.applied}`
            : undefined
        }
        action={
          selected.recommendation !== "Reject" ? (
            <Badge tone={REC_TONE[selected.recommendation]}>
              {selected.recommendation}
            </Badge>
          ) : (
            <Badge tone="bad">Reject</Badge>
          )
        }
      >
        <div className="grid gap-6 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <div className="space-y-3.5">
              {CRITERIA.map((c) => {
                const score = selected.scores[c.key] ?? 0;
                return (
                  <div key={c.key} className="flex items-center gap-3">
                    <span className="w-[128px] shrink-0 truncate text-[12.5px] font-medium text-slate-600">
                      {c.label}
                    </span>
                    <Progress
                      value={score}
                      tone={score >= 85 ? "good" : score >= 70 ? "accent" : "warn"}
                      className="flex-1"
                    />
                    <span className="w-8 text-right text-[12.5px] font-semibold tabular-nums text-ink">
                      {score}
                    </span>
                    <span className="hidden w-9 text-right font-mono text-[10px] text-slate-400 sm:block">
                      {c.weight}%
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
              <p className="text-[12.5px] text-slate-500">Weighted total</p>
              <p className="text-[24px] font-semibold tracking-[-0.03em] text-ink tabular-nums">
                {selected.total}
                <span className="ml-1 text-[12px] font-normal text-slate-400">
                  / 100
                </span>
              </p>
            </div>
            <p className="mt-4 rounded-xl border border-line bg-soft p-4 text-[12.5px] leading-relaxed text-slate-600">
              <span className="font-semibold text-ink">Reviewer note:</span>{" "}
              {selected.note}
            </p>
            {selected.flags.length > 0 && (
              <ul className="mt-3 space-y-2">
                {selected.flags.map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-2.5 rounded-lg border border-amber-dim/20 bg-amber-tint px-3.5 py-2.5 text-[12px] font-medium text-amber-dim"
                  >
                    <CircleAlert className="h-3.5 w-3.5 shrink-0" /> {f}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* applicant switcher */}
          <div className="lg:col-span-2">
            <p className="font-mono text-[9.5px] tracking-[0.18em] text-slate-400 uppercase">
              Switch applicant
            </p>
            <ul className="mt-3 space-y-1.5">
              {SCORECARDS.map((s) => {
                const a = APPLICATIONS.find((x) => x.id === s.applicationId);
                const on = s.applicationId === selectedId;
                return (
                  <li key={s.applicationId}>
                    <button
                      onClick={() => setSelectedId(s.applicationId)}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-xl border px-3.5 py-2.5 text-left transition-colors",
                        on
                          ? "border-accent bg-accent-mist"
                          : "border-line bg-white hover:border-slate-300",
                      )}
                    >
                      <span
                        className={cn(
                          "grid h-8 w-8 shrink-0 place-items-center rounded-full text-[10.5px] font-bold",
                          on ? "bg-accent text-white" : "bg-soft text-slate-500",
                        )}
                      >
                        {(a?.startup ?? "??")
                          .split(" ")
                          .map((w) => w[0])
                          .join("")
                          .slice(0, 2)}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[12.5px] font-semibold text-ink">
                          {a?.startup}
                        </span>
                        <span className="block truncate text-[11px] text-slate-400">
                          {a?.sector}
                        </span>
                      </span>
                      <span className="shrink-0 text-[13px] font-semibold tabular-nums text-ink">
                        {s.total}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Card>

      {/* ── 04 · Reviewer agreement ──────────────────────────── */}
      <Card
        title="Reviewer agreement"
        sub="Where two reviewers disagree"
        action={<Badge tone="warn">2 flagged</Badge>}
        pad={false}
      >
        <ul className="divide-y divide-line">
          {[
            {
              startup: "SilkRoute AI",
              criterion: "Team",
              spread: 14,
              note: "One reviewer scored 62, another 76 on team depth.",
              tone: "bad" as const,
            },
            {
              startup: "BloomBio",
              criterion: "Traction signal",
              spread: 9,
              note: "Disputed whether the pilot counts as traction.",
              tone: "warn" as const,
            },
            {
              startup: "MediScan",
              criterion: "Market size",
              spread: 6,
              note: "Different definitions of the imaging market.",
              tone: "warn" as const,
            },
            {
              startup: "NorthWind Energy",
              criterion: "All six",
              spread: 3,
              note: "Consensus — no calibration needed.",
              tone: "good" as const,
            },
          ].map((d) => (
            <li
              key={`${d.startup}-${d.criterion}`}
              className="flex flex-wrap items-center gap-4 px-5 py-4 transition-colors hover:bg-soft"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent">
                <Scale className="h-4 w-4" />
              </span>
              <div className="min-w-[200px] flex-1">
                <p className="text-[13.5px] font-semibold text-ink">{d.startup}</p>
                <p className="mt-0.5 text-[11.5px] text-slate-400">
                  {d.criterion} · {d.note}
                </p>
              </div>
              <span className="font-mono text-[12px] font-semibold tabular-nums text-ink">
                ±{d.spread}
              </span>
              <Badge tone={d.tone}>
                {d.tone === "good" ? "Agreed" : "Needs discussion"}
              </Badge>
            </li>
          ))}
        </ul>
      </Card>

      {/* ── 05 · Score distribution ──────────────────────────── */}
      <div className="grid gap-5 lg:grid-cols-2">
        <Card
          title="Score distribution"
          sub="How the 23-applicant pool is spread"
          action={
            <span className="flex items-center gap-1.5 text-[12px] font-semibold text-slate-400">
              <BarChart3 className="h-3.5 w-3.5" /> Cohort VIII
            </span>
          }
        >
          <div className="space-y-3.5">
            {SCORE_DISTRIBUTION.map((d) => {
              const pct = Math.round((d.count / 11) * 100);
              return (
                <div key={d.band} className="flex items-center gap-3">
                  <span className="w-[74px] shrink-0 font-mono text-[11.5px] text-slate-500">
                    {d.band}
                  </span>
                  <Progress
                    value={pct}
                    tone={
                      d.band.startsWith("85")
                        ? "good"
                        : d.band.startsWith("75")
                          ? "accent"
                          : d.band.startsWith("65")
                            ? "warn"
                            : "bad"
                    }
                    className="flex-1"
                  />
                  <span className="w-5 text-right text-[12px] font-semibold tabular-nums text-ink">
                    {d.count}
                  </span>
                  <span className="hidden w-[84px] text-[11.5px] text-slate-400 sm:block">
                    {d.note}
                  </span>
                </div>
              );
            })}
          </div>
        </Card>

        {/* ── 06 · Calibration ──────────────────────────────── */}
        <Card
          title="Calibration"
          sub="Are we scoring consistently with ourselves"
          action={
            <span className="flex items-center gap-1.5 text-[12px] font-semibold text-slate-400">
              <Gauge className="h-3.5 w-3.5" /> {CALIBRATION.spread} pt spread
            </span>
          }
        >
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-line p-4 text-center">
              <p className="text-[26px] font-semibold tracking-[-0.03em] text-rise tabular-nums">
                {CALIBRATION.acceptedAverage}
              </p>
              <p className="mt-1 font-mono text-[9.5px] tracking-[0.12em] text-slate-400 uppercase">
                Accepted average
              </p>
            </div>
            <div className="rounded-xl border border-line p-4 text-center">
              <p className="text-[26px] font-semibold tracking-[-0.03em] text-slate-400 tabular-nums">
                {CALIBRATION.rejectedAverage}
              </p>
              <p className="mt-1 font-mono text-[9.5px] tracking-[0.12em] text-slate-400 uppercase">
                Rejected average
              </p>
            </div>
          </div>
          <p className="mt-4 rounded-xl border border-amber-dim/20 bg-amber-tint p-4 text-[12.5px] leading-relaxed text-amber-dim">
            <span className="font-semibold">Needs attention:</span>{" "}
            {CALIBRATION.note}
          </p>
        </Card>
      </div>

      {/* ── 07 · Review checkpoints ──────────────────────────── */}
      <Card
        title="Review checkpoints"
        sub="Every stage before the committee sits"
        action={<Badge tone="accent">5 stages</Badge>}
        pad={false}
      >
        <ul className="divide-y divide-line">
          {REVIEW_CHECKPOINTS.map((c) => (
            <li
              key={c.name}
              className="flex flex-wrap items-center gap-4 px-5 py-4 transition-colors hover:bg-soft"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent">
                <ClipboardCheck className="h-4 w-4" />
              </span>
              <div className="min-w-[200px] flex-1">
                <p className="text-[13.5px] font-semibold text-ink">{c.name}</p>
                <p className="mt-0.5 text-[11.5px] text-slate-400">
                  {c.reviewer} · due {c.due}
                </p>
              </div>
              <Badge tone={c.tone}>{c.state}</Badge>
            </li>
          ))}
        </ul>
      </Card>

      {/* ── 08 · Evaluation timeline ─────────────────────────── */}
      <Card
        title="Evaluation timeline"
        sub="The 22 days between intake close and the committee"
        action={
          <Link
            href="/incubator/programs/calendar"
            className="flex items-center gap-1 text-[12.5px] font-semibold text-accent"
          >
            Full calendar <ArrowUpRight className="h-3 w-3" />
          </Link>
        }
      >
        <ol className="relative space-y-4 border-l border-line pl-5">
          {[
            { date: "05 Apr", title: "Reference calls begin", note: "Two calls per shortlisted founder" },
            { date: "08 Apr", title: "Scoring window closes", note: "All six criteria scored for 23 applicants" },
            { date: "12 Apr", title: "Intake closes", note: "Final application cut-off, 18:00" },
            { date: "15 Apr", title: "Shortlist locked", note: "Committee pack circulated" },
            { date: "18 Apr", title: "Selection committee", note: "Quorum of five required" },
          ].map((t) => (
            <li key={t.title} className="relative">
              <span className="absolute -left-[26.5px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-accent bg-white" />
              <p className="font-mono text-[10px] tracking-[0.1em] text-accent uppercase">
                {t.date}
              </p>
              <p className="mt-0.5 text-[13.5px] font-semibold text-ink">{t.title}</p>
              <p className="mt-0.5 text-[12px] text-slate-500">{t.note}</p>
            </li>
          ))}
        </ol>
      </Card>

      {/* ── 09 · Where to go next ────────────────────────────── */}
      <Card title="Where to go next" sub="Scoring turns into decisions here">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              href: "/incubator/programs/selection",
              title: "Take it to committee",
              body: "Rank the shortlist, record votes and prepare offers.",
              icon: Users,
            },
            {
              href: "/incubator/programs/applications",
              title: "Back to the pool",
              body: "Chase the five applications still waiting on a score.",
              icon: ClipboardCheck,
            },
            {
              href: "/incubator/programs/calendar",
              title: "Watch the clock",
              body: "Scoring closes 08 Apr, committee sits 18 Apr.",
              icon: BarChart3,
            },
          ].map((a) => (
            <Link
              key={a.href}
              href={a.href}
              className="group rounded-xl border border-line p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-soft"
            >
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-accent-soft text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                <a.icon className="h-4 w-4" />
              </span>
              <p className="mt-3 text-[13.5px] font-semibold text-ink">{a.title}</p>
              <p className="mt-1.5 text-[12.5px] leading-relaxed text-slate-500">
                {a.body}
              </p>
              <span className="mt-3 inline-flex items-center gap-1 text-[12px] font-semibold text-accent">
                Open <ArrowUpRight className="h-3 w-3" />
              </span>
            </Link>
          ))}
        </div>
      </Card>
    </div>
  );
}
