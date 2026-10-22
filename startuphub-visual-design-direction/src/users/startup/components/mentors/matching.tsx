"use client";

import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Gauge,
  RefreshCw,
  Sparkles,
  Target,
  Users,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { Badge, Card, GaugeRing, PageHeader, Progress, Stat } from "@/components/app/widgets";
import {
  declinedMatches,
  feedbackSignals,
  matchPipeline,
  matchReasonBySlug,
  matchScoreBySlug,
  matchingDimensions,
  pendingRequests,
  preferenceChoices,
  preferenceLabels,
} from "@/users/startup/constants/mentor-data";
import { mentors } from "@/views/explore/mentors/constants/mentors";

const ranked = [...mentors].sort(
  (a, b) => (matchScoreBySlug[b.slug] ?? 50) - (matchScoreBySlug[a.slug] ?? 50),
);

export function MentorMatching() {
  const [selection, setSelection] = useState<Record<string, string>>({
    challenge: "Inference cost at scale",
    engagement: "Weekly sessions + async",
    style: "Technical, direct, operator-first",
  });

  /* Model confidence is the mean of the three stated preferences —
     tightening any one of them moves the number live. */
  const confidence = Math.round(
    preferenceLabels.reduce((sum, l) => {
      const chosen = preferenceChoices[l.key].find((o) => o.value === selection[l.key]);
      return sum + (chosen?.confidence ?? 0);
    }, 0) / preferenceLabels.length,
  );

  const top = ranked[0];

  return (
    <div className="space-y-5">
      <PageHeader
        title="Mentor Matching"
        desc="How the algorithm decides who can actually move your needle — and how much of it you control."
        actions={
          <Link
            href="/founder/mentors"
            className="inline-flex items-center gap-1.5 rounded-[10px] border border-line bg-white px-4 py-2.5 text-[13px] font-semibold text-ink hover:border-slate-300"
          >
            Browse the catalogue
          </Link>
        }
      />

      {/* 1 — Headline metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat icon={Gauge} label="Model confidence" value={`${confidence}%`} delta={`top score ${matchScoreBySlug[top.slug]}`} tone={confidence >= 80 ? "good" : "warn"} />
        <Stat icon={Target} label="Weighted dimensions" value={String(matchingDimensions.length)} hint="weights sum to 100" tone="default" />
        <Stat icon={Users} label="Screened catalogue" value={String(mentors.length)} hint="every mentor scored" tone="default" />
        <Stat icon={CheckCircle2} label="Requests accepted" value={`${pendingRequests.filter((r) => r.state === "Accepted").length} / ${pendingRequests.length}`} hint="of your open requests" tone="warn" />
      </div>

      {/* 2 — How matching works */}
      <Card title="How matching works" action={<Badge tone="accent">4 steps</Badge>}>
        <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {matchPipeline.map((s, i) => (
            <li key={s.step} className="rounded-xl border border-line p-4">
              <div className="flex items-center justify-between">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-accent text-[11px] font-bold text-white">
                  {i + 1}
                </span>
                <span className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-slate-300">
                  step {i + 1}
                </span>
              </div>
              <p className="mt-3 text-[13.5px] font-semibold text-ink">{s.step}</p>
              <p className="mt-1 text-[12px] leading-relaxed text-slate-500">{s.body}</p>
            </li>
          ))}
        </ol>
      </Card>

      {/* 3 — Live preference picker */}
      <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
        <Card
          title="Your matching preferences"
          action={<span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">click to change</span>}
        >
          <div className="space-y-5">
            {preferenceLabels.map((l) => {
              const chosen = preferenceChoices[l.key].find((o) => o.value === selection[l.key]);
              return (
                <div key={l.key}>
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                      {l.label}
                    </span>
                    <span className="text-[11.5px] font-semibold tabular-nums text-accent">
                      {chosen?.confidence}%
                    </span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {preferenceChoices[l.key].map((o) => (
                      <button
                        key={o.value}
                        type="button"
                        onClick={() => setSelection((prev) => ({ ...prev, [l.key]: o.value }))}
                        className={`rounded-xl border px-3 py-2 text-left text-[12px] font-semibold transition-colors ${
                          selection[l.key] === o.value
                            ? "border-accent bg-accent-mist text-accent"
                            : "border-line bg-white text-slate-500 hover:border-slate-300 hover:text-ink"
                        }`}
                      >
                        {o.value}
                      </button>
                    ))}
                  </div>
                  {chosen && (
                    <p className="mt-2 text-[11.5px] leading-relaxed text-slate-400">{chosen.note}</p>
                  )}
                </div>
              );
            })}
          </div>
          <p className="mt-5 rounded-xl bg-accent-mist p-4 text-[12.5px] leading-relaxed text-slate-600">
            Tightening &quot;primary challenge&quot; from &quot;scaling&quot; to &quot;inference cost&quot;
            improved match quality 41% this month. Specificity is the entire game — every extra qualifier
            cuts the catalogue to the mentors who have actually solved it.
          </p>
        </Card>

        <Card title="Confidence">
          <div className="flex flex-col items-center py-2">
            <GaugeRing value={confidence} size={104} label="confidence" />
            <p className="mt-4 text-[13px] font-medium text-slate-600">
              {confidence >= 85
                ? "High — one unambiguous problem, one obvious mentor."
                : confidence >= 65
                  ? "Good — a narrower challenge would sharpen the ranking."
                  : "Low — the catalogue cannot tell which mentor you need."}
            </p>
          </div>
          <div className="mt-4 space-y-2 border-t border-line pt-4">
            {preferenceLabels.map((l) => {
              const chosen = preferenceChoices[l.key].find((o) => o.value === selection[l.key]);
              return (
                <div key={l.key} className="flex items-center gap-3">
                  <span className="w-28 shrink-0 text-[12px] font-medium text-slate-600">{l.label}</span>
                  <Progress value={chosen?.confidence ?? 0} tone={(chosen?.confidence ?? 0) >= 80 ? "good" : "accent"} className="flex-1" />
                  <span className="w-8 text-right text-[12px] font-semibold tabular-nums text-ink">
                    {chosen?.confidence}
                  </span>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* 4 — Dimensions */}
      <Card
        title="Match dimensions"
        action={<Badge tone="default">weights sum to 100</Badge>}
      >
        <div className="grid gap-x-8 gap-y-4 lg:grid-cols-2">
          {matchingDimensions.map((d) => (
            <div key={d.dim}>
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-[12.5px] font-medium text-slate-600">{d.dim}</span>
                <span className="text-[11.5px] text-slate-400">
                  {d.weight}% weight · <span className="font-semibold tabular-nums text-ink">{d.score}</span>
                </span>
              </div>
              <Progress
                value={d.score}
                tone={d.score >= 90 ? "good" : d.score >= 75 ? "accent" : "warn"}
                className="mt-2"
              />
              <p className="mt-1.5 text-[11.5px] leading-snug text-slate-400">{d.note}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* 5 — Top match deep-dive */}
      <Card title="Your top match" action={<Badge tone="accent">{matchScoreBySlug[top.slug]}% fit</Badge>}>
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center">
          <div className="flex items-center gap-4">
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-accent text-lg font-bold text-white">
              {top.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
            </span>
            <div>
              <p className="text-[16px] font-semibold text-ink">{top.name}</p>
              <p className="text-[12.5px] text-slate-500">{top.role}</p>
              <p className="mt-1 flex items-center gap-1 text-[11.5px] text-slate-400">
                {top.experience} · {top.location} · {top.sessions} sessions · {top.availability}
              </p>
            </div>
          </div>
          <div className="lg:ml-auto">
            <p className="text-[13px] leading-relaxed text-slate-600">
              <span className="font-semibold text-ink">Why this match:</span> {matchReasonBySlug[top.slug]}
            </p>
          </div>
        </div>
        <p className="mt-4 rounded-xl bg-slate-50 p-4 text-[12.5px] leading-relaxed text-slate-600">{top.bio}</p>
      </Card>

      {/* 6 — Shortlist comparison */}
      <Card title="Shortlist, dimension by dimension" pad={false}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left">
            <thead>
              <tr className="border-b border-line">
                <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">Mentor</th>
                <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">Problem fit</th>
                <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">Sector</th>
                <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">Availability</th>
                <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">Network</th>
                <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">Overall</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {ranked.slice(0, 4).map((m, i) => {
                const fit = matchScoreBySlug[m.slug] ?? 50;
                return (
                  <tr key={m.slug}>
                    <td className="px-5 py-3">
                      <p className="text-[13px] font-semibold text-ink">{m.name}</p>
                      <p className="text-[11px] text-slate-400">{m.role}</p>
                    </td>
                    <td className="px-5 py-3 text-[12.5px] tabular-nums text-slate-600">{Math.min(98, fit + 2)}</td>
                    <td className="px-5 py-3 text-[12.5px] tabular-nums text-slate-600">{Math.max(40, fit - (i === 0 ? 0 : 6))}</td>
                    <td className="px-5 py-3 text-[12.5px] text-slate-600">{m.availability}</td>
                    <td className="px-5 py-3 text-[12.5px] tabular-nums text-slate-600">{Math.max(35, fit - 12)}</td>
                    <td className="px-5 py-3">
                      <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${
                        fit > 85 ? "bg-accent-soft text-accent" : "bg-slate-100 text-slate-500"
                      }`}>
                        {fit}%
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* 7 — Feedback loop */}
      <Card title="Signals that moved your scores" action={<RefreshCw className="h-4 w-4 text-slate-300" />} pad={false}>
        <ul className="divide-y divide-line">
          {feedbackSignals.map((f) => (
            <li key={f.signal} className="flex flex-wrap items-center gap-3 px-5 py-3.5">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent">
                <Sparkles className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-semibold text-ink">{f.signal}</p>
                <p className="mt-0.5 text-[11.5px] text-slate-400">{f.when}</p>
              </div>
              <span className="text-[12px] font-semibold text-accent">{f.effect}</span>
            </li>
          ))}
        </ul>
      </Card>

      {/* 8 — Declined */}
      <Card title="Not a fit" action={<Badge tone="default">you declined</Badge>} pad={false}>
        <ul className="divide-y divide-line">
          {declinedMatches.map((d) => (
            <li key={d.mentor} className="flex flex-wrap items-center gap-3 px-5 py-3.5">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-slate-50 text-slate-400">
                <XCircle className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-semibold text-ink">{d.mentor}</p>
                <p className="mt-0.5 text-[12px] text-slate-500">{d.reason}</p>
              </div>
              <span className="text-[11.5px] text-slate-400">{d.when}</span>
            </li>
          ))}
        </ul>
      </Card>

      {/* 9 — Where to go next */}
      <Card title="Where to go next">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            {
              label: "Discover Mentors",
              href: "/founder/mentors",
              body: "Filter the catalogue by expertise, industry and availability, then send a request.",
            },
            {
              label: "Mentor Sessions",
              href: "/founder/mentors/sessions",
              body: "Upcoming calls, session history, agendas and every action item logged.",
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
