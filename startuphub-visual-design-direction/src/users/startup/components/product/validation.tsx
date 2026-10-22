"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  Beaker,
  CheckCircle2,
  CircleHelp,
  FlaskConical,
  Layers,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { Badge, Card, PageHeader, Progress, Stat } from "@/components/app/widgets";
import {
  averageValidatedLift,
  demandSegments,
  experiments,
  featureName,
  inconclusiveCount,
  invalidatedCount,
  validationQueue,
  validatedCount,
  type Verdict,
} from "@/users/startup/constants/product-data";

type Filter = Verdict | "All experiments";

const filters: Filter[] = ["All experiments", "Validated", "Inconclusive", "Invalidated"];

const verdictTone: Record<Verdict, "good" | "warn" | "bad"> = {
  Validated: "good",
  Inconclusive: "warn",
  Invalidated: "bad",
};

export function ProductValidation() {
  const [filter, setFilter] = useState<Filter>("All experiments");

  const results = useMemo(
    () => (filter === "All experiments" ? experiments : experiments.filter((e) => e.verdict === filter)),
    [filter],
  );

  const totalSample = experiments.reduce((sum, e) => sum + e.sampleSize, 0);
  const segmentFpos = demandSegments.reduce((sum, s) => sum + s.fpos, 0);

  return (
    <div className="space-y-5">
      <PageHeader
        title="Product Validation"
        desc="What was actually tested, what settled the question, and what is still open — including the one that said no."
        actions={
          <Link
            href="/founder/product/roadmap"
            className="inline-flex items-center gap-1.5 rounded-[10px] border border-line bg-white px-4 py-2.5 text-[13px] font-semibold text-ink hover:border-slate-300"
          >
            See what it changed
          </Link>
        }
      />

      {/* 1 — Headline metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat
          icon={FlaskConical}
          label="Experiments run"
          value={String(experiments.length)}
          delta={`${totalSample} users in the samples`}
          tone="default"
        />
        <Stat
          icon={CheckCircle2}
          label="Validated"
          value={String(validatedCount)}
          delta={`+${averageValidatedLift}% average lift`}
          tone="good"
        />
        <Stat
          icon={CircleHelp}
          label="Still inconclusive"
          value={String(inconclusiveCount)}
          delta="needs a bigger sample"
          tone="warn"
        />
        <Stat
          icon={XCircle}
          label="Invalidated"
          value={String(invalidatedCount)}
          delta="the plan that did not ship"
          tone="bad"
        />
      </div>

      {/* 2 — Scorecard + segments */}
      <div className="grid gap-5 lg:grid-cols-[1fr_1.15fr]">
        <Card title="The scorecard" action={<Badge tone="default">{experiments.length} experiments</Badge>}>
          <div className="space-y-4">
            {(
              [
                { verdict: "Validated" as Verdict, count: validatedCount, tone: "good" as const },
                { verdict: "Inconclusive" as Verdict, count: inconclusiveCount, tone: "warn" as const },
                { verdict: "Invalidated" as Verdict, count: invalidatedCount, tone: "bad" as const },
              ]
            ).map((row) => (
              <div key={row.verdict}>
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-[12.5px] font-medium text-slate-600">{row.verdict}</span>
                  <span className="text-[11.5px] text-slate-400">
                    <span className="font-semibold tabular-nums text-ink">{row.count}</span> of {experiments.length}
                  </span>
                </div>
                <Progress
                  value={(row.count / experiments.length) * 100}
                  tone={row.tone}
                  className="mt-2"
                />
              </div>
            ))}
          </div>
          <p className="mt-4 border-t border-line pt-4 text-[12px] leading-relaxed text-slate-500">
            An experiment that settles nothing is still worth the sample size. The invalidated one saved
            the team a quarter of building a weekly digest nobody wanted.
          </p>
        </Card>

        <Card
          title="Who we tested on"
          action={<Badge tone="default">{segmentFpos} FPOs</Badge>}
          pad={false}
        >
          <ul className="divide-y divide-line">
            {demandSegments.map((s) => (
              <li key={s.id} className="flex flex-wrap items-center gap-3 px-5 py-3.5">
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-semibold text-ink">{s.name}</p>
                  <p className="mt-0.5 text-[11.5px] text-slate-400">
                    {s.fpos} FPOs · top need: {s.topNeed} · {s.willingness}
                  </p>
                </div>
                <div className="w-20">
                  <Progress value={s.nps} tone={s.nps >= 50 ? "good" : s.nps >= 30 ? "accent" : "warn"} />
                </div>
                <span className="w-10 text-right text-[12.5px] font-semibold tabular-nums text-ink">
                  {s.nps}
                </span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* 3 — Experiments */}
      <Card
        title="The experiments"
        action={
          <div className="flex flex-wrap gap-1.5">
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={`rounded-full px-2.5 py-1 text-[11px] font-semibold transition-colors ${
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
      >
        <div className="grid gap-4 md:grid-cols-2">
          {results.map((e) => (
            <div key={e.id} className="rounded-xl border border-line p-4">
              <div className="flex items-start justify-between gap-3">
                <p className="text-[13.5px] font-semibold leading-snug text-ink">{e.hypothesis}</p>
                <Badge tone={verdictTone[e.verdict]}>{e.verdict}</Badge>
              </div>
              <p className="mt-2 text-[12px] leading-relaxed text-slate-500">{e.result}</p>

              <dl className="mt-3 space-y-1.5 border-t border-line pt-3 text-[11.5px]">
                <div className="flex gap-2">
                  <dt className="w-20 shrink-0 text-slate-400">Method</dt>
                  <dd className="min-w-0 flex-1 text-slate-600">{e.method}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="w-20 shrink-0 text-slate-400">Sample</dt>
                  <dd className="min-w-0 flex-1 text-slate-600">
                    {e.sample} · {e.segment}
                  </dd>
                </div>
                <div className="flex gap-2">
                  <dt className="w-20 shrink-0 text-slate-400">Ran</dt>
                  <dd className="min-w-0 flex-1 text-slate-600">{e.ranOn}</dd>
                </div>
              </dl>

              <div className="mt-3 flex items-center gap-3 rounded-xl bg-slate-50 p-3">
                <Beaker className="h-4 w-4 shrink-0 text-accent" />
                <p className="min-w-0 flex-1 text-[12px] leading-relaxed text-slate-600">{e.decision}</p>
                <span
                  className={`text-[13px] font-semibold tabular-nums ${
                    e.lift >= 0 ? "text-emerald-600" : "text-rose-500"
                  }`}
                >
                  {e.lift >= 0 ? "+" : ""}
                  {e.lift}%
                </span>
              </div>

              {e.shippedAs && (
                <p className="mt-2.5 text-[11.5px] text-slate-400">
                  Shipped as{" "}
                  <span className="font-semibold text-ink">{featureName(e.shippedAs)}</span> in the current
                  MVP.
                </p>
              )}
            </div>
          ))}
        </div>

        {results.length === 0 && (
          <p className="py-8 text-center text-[13px] text-slate-400">
            No experiment with that verdict yet.
          </p>
        )}
      </Card>

      {/* 4 — Next experiments */}
      <Card
        title="The next questions"
        action={<Badge tone="warn">{validationQueue.length} queued</Badge>}
        pad={false}
      >
        <ul className="divide-y divide-line">
          {validationQueue.map((q) => (
            <li key={q.id} className="flex flex-wrap items-center gap-3 px-5 py-3.5">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
                <Layers className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-semibold text-ink">{q.hypothesis}</p>
                <p className="mt-0.5 text-[11.5px] text-slate-400">
                  {q.method} · {q.sample} · {q.owner} · starts {q.starts}
                </p>
              </div>
              <span className="text-[11.5px] text-slate-400">blocks {q.blocks}</span>
            </li>
          ))}
        </ul>
      </Card>

      {/* 5 — Where to go next */}
      <Card title="Where to go next">
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            {
              label: "MVP Management",
              href: "/founder/product",
              body: "The release these answers changed, feature by feature.",
            },
            {
              label: "Product Roadmap",
              href: "/founder/product/roadmap",
              body: "Which slot each validated experiment moved, and how confident the team is.",
            },
            {
              label: "Idea & Validation",
              href: "/founder/idea/validation",
              body: "The idea-stage experiments that came before any of this shipped.",
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
