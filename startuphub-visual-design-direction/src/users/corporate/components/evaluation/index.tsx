import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Gauge,
  History,
  Scale,
  ShieldCheck,
} from "lucide-react";
import { Bar, Chip, Panel, ScoreRing } from "@/components/app/widgets";
import { PageHead, StageTrail, SubjectBanner } from "@/components/app/boards";
import {
  BUSINESS_FIT,
  EVAL_DIMS_CORP,
  EVAL_HISTORY_CORP,
  EVAL_SUBJECT_CORP,
  RISK_MATRIX_CORP,
  SOLUTION_EVAL,
  TECH_ASSESSMENT_CORP,
} from "../../constants/corporate-data";

/* ── Startup Evaluation ─────────────────────────────────────── */
export function StartupEvaluation() {
  const s = EVAL_SUBJECT_CORP;
  return (
    <div className="space-y-5">
      <SubjectBanner
        kicker="Corporate evaluation · Scout-of-quarter"
        title={s.name}
        meta={`${s.overall} · solving PS-014 farm-gate QC`}
        score={s.fit}
        action={<Chip tone="rise" className="px-3 py-1.5">{s.recommendation}</Chip>}
      />

      <div className="rounded-xl border border-line bg-white p-4">
        <StageTrail stages={["Scout", "Eval", "Tech", "Fit", "Risk", "Pilot", "Partner"]} active={4} />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Panel title="Evaluation dimensions" sub="Corporate rubric v4" className="lg:col-span-2">
          <ul className="space-y-4">
            {EVAL_DIMS_CORP.map((d) => (
              <li key={d.label} className="grid grid-cols-[150px_1fr_40px] items-center gap-3">
                <span className="text-[12.5px] font-semibold text-ink">{d.label}</span>
                <div className="flex items-center gap-2.5">
                  <Bar pct={d.score} className="flex-1" barClass={d.score >= 85 ? "bg-rise" : d.score >= 70 ? "bg-accent" : "bg-amber-dim"} />
                  <span className="hidden text-[10.5px] text-slate-400 sm:block">{d.note}</span>
                </div>
                <span className="text-right font-mono text-[12px] font-bold text-ink">{d.score}</span>
              </li>
            ))}
          </ul>
        </Panel>
        <div className="space-y-4">
          <Panel title="Corporate fit verdict" action={<Gauge className="h-4 w-4 text-slate-300" />}>
            <div className="rounded-lg border border-rise/25 bg-rise-tint p-4">
              <p className="flex items-center gap-2 text-[14px] font-semibold text-rise">
                <CheckCircle2 className="h-4 w-4" /> {s.recommendation}
              </p>
              <p className="mt-2 text-[12px] leading-relaxed text-ink/75">
                Score {s.fit} clears the 75 deployment bar. Expand pilot to 12 points and
                begin partnership structuring in parallel.
              </p>
            </div>
            <ul className="mt-4 space-y-2 text-[12px] text-slate-500">
              <li className="flex justify-between"><span>IC threshold</span><span className="font-semibold text-ink">75</span></li>
              <li className="flex justify-between"><span>Next gate</span><span className="font-semibold text-ink">Risk sign-off</span></li>
            </ul>
          </Panel>
          <Panel title="Evaluator comments">
            <ul className="space-y-3 text-[12px] text-slate-600">
              <li><b className="text-ink">R. Agarwal:</b> &quot;Field robustness exceeded expectations; rural ops capability is rare.&quot;</li>
              <li><b className="text-ink">Dr. S. Iyer:</b> &quot;Jetson supply chain is the only real hardware risk.&quot;</li>
              <li><b className="text-ink">S. Reddy (BU):</b> &quot;Field leads asked to keep the pilot units permanently.&quot;</li>
            </ul>
          </Panel>
        </div>
      </div>
    </div>
  );
}

/* ── Solution Evaluation ────────────────────────────────────── */
export function SolutionEvaluation() {
  const s = SOLUTION_EVAL;
  return (
    <div className="space-y-5">
      <PageHead title="Solution evaluation" sub="CropLens farm-gate QC vs. alternatives — the comparison that matters" />
      <Panel title="Solution overview" sub={s.overview}>
        <dl className="grid gap-4 sm:grid-cols-2">
          {[
            ["Problem fit", s.problemFit],
            ["Business fit", s.businessFit],
            ["Cost structure", s.cost],
            ["ROI model", s.roi],
            ["Implementation", s.implementation],
            ["Complexity", s.complexity],
          ].map(([k, v]) => (
            <div key={k} className="rounded-lg border border-line p-4">
              <dt className="font-mono text-[9px] tracking-[0.16em] text-slate-400 uppercase">{k}</dt>
              <dd className="mt-1.5 text-[12.5px] leading-relaxed font-medium text-ink">{v}</dd>
            </div>
          ))}
        </dl>
      </Panel>
      <div className="rounded-xl border border-rise/20 bg-rise-tint px-5 py-4 text-[13px] leading-relaxed text-ink">
        <b className="text-rise">Scalability note:</b> stations are standalone — no ERP
        dependency in phase 1. Integration work is bonus, not blocker. That is why this
        solution won over the line-vision retrofit despite the retrofit&apos;s higher ceiling.
      </div>
    </div>
  );
}

/* ── Technology Assessment ──────────────────────────────────── */
export function TechnologyAssessment() {
  const t = TECH_ASSESSMENT_CORP;
  return (
    <div className="space-y-5">
      <SubjectBanner
        kicker="Technology assessment · CropLens AI"
        title="Edge CV + offline sync, production-proven"
        meta={t.readiness}
        score={t.score}
        action={<Chip tone="rise" className="px-3 py-1.5"><Cpu className="h-3 w-3" /> TRL 8 verified</Chip>}
      />
      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Stack & architecture">
          <div className="flex flex-wrap gap-2">
            {t.stack.map((s) => <Chip key={s} tone="line" className="px-3 py-1.5">{s}</Chip>)}
          </div>
          <ul className="mt-5 space-y-3.5">
            {[
              ["Integration", t.integration],
              ["Security", t.security],
              ["Maturity", t.maturity],
              ["IP ownership", t.ipOwnership],
            ].map(([k, v]) => (
              <li key={k}>
                <p className="font-mono text-[9px] tracking-[0.16em] text-slate-400 uppercase">{k}</p>
                <p className="mt-1 text-[12.5px] leading-relaxed text-ink">{v}</p>
              </li>
            ))}
          </ul>
        </Panel>
        <div className="space-y-4">
          <Panel title="Technical risks" action={<ShieldCheck className="h-4 w-4 text-slate-300" />}>
            <ul className="space-y-2.5">
              {t.risks.map((r) => (
                <li key={r} className="flex gap-2.5 rounded-lg border border-amber-dim/20 bg-amber-tint p-3.5 text-[12.5px] leading-relaxed text-ink">
                  <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-dim" />{r}
                </li>
              ))}
            </ul>
          </Panel>
          <div className="rounded-2xl bg-ink p-6 text-white">
            <Cpu className="h-5 w-5 text-accent" />
            <p className="mt-4 font-mono text-[9.5px] tracking-[0.18em] text-white/50 uppercase">Assessor&apos;s summary</p>
            <p className="mt-2 text-[13.5px] leading-relaxed text-white/85">
              Architecture is boring in the best way: proven edge hardware, documented retrain
              cadence, and no exotic dependencies. Deploy with standard vendor-support SLA.
            </p>
            <p className="mt-3 font-mono text-[10px] text-white/50">— Dr. S. Iyer, Technology Expert</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Business Fit ───────────────────────────────────────────── */
export function BusinessFit() {
  return (
    <div className="space-y-5">
      <PageHead title="Business fit" sub="Strategic, operational, market, BU, customer and cost alignment" />
      <Panel pad={false}>
        <ul className="divide-y divide-line">
          {BUSINESS_FIT.map((b) => (
            <li key={b.area} className="flex items-center gap-4 px-5 py-4.5 transition-colors hover:bg-soft">
              <span className="w-36 text-[13px] font-semibold text-ink">{b.area}</span>
              <Chip tone={b.verdict === "Strong" ? "rise" : "accent"} className="w-20 justify-center">{b.verdict}</Chip>
              <span className="flex-1 text-[12.5px] text-slate-500">{b.note}</span>
            </li>
          ))}
        </ul>
      </Panel>
      <Panel title="Implementation requirements" sub="What the BU must bring">
        <div className="grid gap-3 sm:grid-cols-4">
          {[
            { l: "Collection-point power audit", t: "1 week" },
            { l: "Operator training (2h)", t: "per station" },
            { l: "Network for cloud sync", t: "4G fallback OK" },
            { l: "BU pilot owner", t: "dedicated 20%" },
          ].map((x) => (
            <div key={x.l} className="rounded-lg border border-line p-4 text-center">
              <p className="text-[12.5px] font-semibold text-ink">{x.l}</p>
              <p className="mt-1 font-mono text-[10px] text-accent">{x.t}</p>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

/* ── Risk Assessment ────────────────────────────────────────── */
const LVL_TONE: Record<string, "amber" | "accent" | "rise"> = { High: "amber", Medium: "accent", Low: "rise" };

export function RiskAssessment() {
  return (
    <div className="space-y-5">
      <PageHead
        title="Risk assessment"
        sub="9 risk families reviewed for CropLens AI — mitigation plans attached"
        action={<Chip tone="rise" className="px-3 py-1.5">No red flags · proceed</Chip>}
      />
      <Panel pad={false}>
        <ul className="divide-y divide-line">
          {RISK_MATRIX_CORP.map((r) => (
            <li key={r.area} className="flex items-center gap-4 px-5 py-4">
              <span className="w-32 text-[13px] font-semibold text-ink">{r.area}</span>
              <Chip tone={LVL_TONE[r.level]} className="w-20 justify-center">{r.level}</Chip>
              <Bar pct={r.weight} className="w-24" barClass={r.weight > 55 ? "bg-amber-dim" : r.weight > 40 ? "bg-accent" : "bg-rise"} />
              <span className="font-mono text-[11px] font-semibold text-ink">{r.weight}</span>
              <span className="flex-1 text-[12px] text-slate-500">{r.mitigation}</span>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}

/* ── Evaluation History ─────────────────────────────────────── */
export function EvaluationHistory() {
  return (
    <div className="space-y-5">
      <PageHead
        title="Evaluation history"
        sub="Decisions, scores and reviewers — full audit trail"
        action={<History className="h-4 w-4 text-slate-300" />}
      />
      <Panel pad={false}>
        <ul className="divide-y divide-line">
          {EVAL_HISTORY_CORP.map((h) => (
            <li key={h.date} className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-soft">
              <span className="w-14 shrink-0 font-mono text-[11px] font-semibold text-accent">{h.date}</span>
              <span className="flex-1 text-[13px] text-ink">{h.action}</span>
              <Chip tone="line">{h.by}</Chip>
            </li>
          ))}
        </ul>
      </Panel>
      <Panel title="Timeline view" sub="Scout → recommendation in 36 days">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { l: "Scout → eval", v: "10 days" },
            { l: "Evaluation", v: "12 days" },
            { l: "Tech + fit", v: "8 days" },
            { l: "Decision", v: "6 days" },
          ].map((x) => (
            <div key={x.l} className="rounded-lg bg-soft p-4 text-center">
              <p className="text-[14px] font-semibold text-ink">{x.v}</p>
              <p className="mt-1 text-[10.5px] text-slate-400">{x.l}</p>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
