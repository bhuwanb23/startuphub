import {
  ArrowRight,
  CheckCircle2,
  FlaskConical,
  Rocket,
  Scale,
  ShieldCheck,
  ThumbsUp,
  TrendingUp,
  XCircle,
} from "lucide-react";
import { Bar, Chip, Panel, StatCard } from "@/components/app/widgets";
import { PageHead, SubjectBanner, Timeline } from "@/components/app/boards";
import {
  DEPLOY_READINESS,
  PILOTS,
  PILOT_EVAL_SUBJECT,
  POCS,
} from "../../constants/corporate-data";

const STAGE_TONE: Record<string, "rise" | "accent" | "amber" | "slate"> = {
  Proposed: "accent", Approved: "accent", Planning: "amber", Active: "rise",
  Completed: "slate", Cancelled: "slate",
};
const POC_STAGE: Record<string, "rise" | "accent" | "amber" | "slate"> = {
  Proposed: "accent", Evaluation: "amber", Active: "rise", Completed: "slate",
};

/* ── Pilot Management ───────────────────────────────────────── */
export function PilotManagement() {
  return (
    <div className="space-y-5">
      <PageHead
        title="Pilot management"
        sub="4 pilots + proposals · objectives, budgets, KPIs and outcomes"
        action={
          <button className="flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-accent-deep">
            <FlaskConical className="h-3.5 w-3.5" /> Create pilot
          </button>
        }
      />
      <div className="no-scrollbar flex gap-2 overflow-x-auto">
        {["All", "Proposed", "Approved", "Planning", "Active", "Completed", "Cancelled"].map((s, i) => (
          <button key={s} className={`shrink-0 rounded-lg border px-3.5 py-2 text-[12.5px] font-semibold ${i === 0 ? "border-accent bg-accent text-white" : "border-line bg-white text-slate-500 hover:text-ink"}`}>{s}</button>
        ))}
      </div>
      <div className="space-y-3">
        {PILOTS.map((p) => (
          <Panel key={p.id} className="transition-all duration-300 hover:shadow-soft">
            <div className="grid items-center gap-4 lg:grid-cols-[1fr_280px_auto]">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-[15px] font-semibold text-ink">{p.name}</h3>
                  <Chip tone={STAGE_TONE[p.stage]}>{p.stage}</Chip>
                </div>
                <p className="mt-1 text-[12.5px] font-medium text-accent">
                  {p.startup} · {p.bu}
                </p>
                <p className="mt-1.5 text-[12.5px] text-slate-500">
                  <b>Objective:</b> {p.objective}
                </p>
                <p className="mt-2 font-mono text-[10px] tracking-[0.06em] text-slate-400 uppercase">
                  {p.id} · {p.window} · budget {p.budget}
                </p>
              </div>
              <div>
                <div className="mb-1.5 flex justify-between text-[11px]">
                  <span className="text-slate-400">KPI progress</span>
                  <span className="font-semibold text-ink">{p.kpis}%</span>
                </div>
                <Bar pct={p.kpis} barClass={p.kpis >= 70 ? "bg-rise" : "bg-accent"} />
              </div>
              <a href="/corporate/pilots/evaluation" className="rounded-lg bg-accent px-4 py-2.5 text-[12.5px] font-semibold text-white hover:bg-accent-deep">Open pilot</a>
            </div>
          </Panel>
        ))}
      </div>
    </div>
  );
}

/* ── PoC Management ─────────────────────────────────────────── */
export function PocManagement() {
  return (
    <div className="space-y-5">
      <PageHead
        title="PoC management"
        sub="Smaller technical validations before full pilots"
        action={<button className="rounded-lg bg-accent px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-accent-deep">+ New PoC</button>}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {POCS.map((p) => (
          <Panel key={p.id} className="transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft">
            <div className="flex items-start justify-between">
              <Chip tone={POC_STAGE[p.stage]}>{p.stage}</Chip>
              <span className="font-mono text-[10px] text-slate-400">{p.id}</span>
            </div>
            <h3 className="mt-3 text-[16px] font-semibold tracking-[-0.015em] text-ink">{p.name}</h3>
            <p className="mt-1 text-[13px] font-medium text-accent">{p.startup}</p>
            <p className="mt-2 text-[12.5px] leading-relaxed text-slate-500">Scope: {p.scope}</p>
            <div className="mt-4 flex items-center justify-between border-t border-line pt-3.5">
              <span className="font-mono text-[11px] text-slate-400">Budget {p.budget}</span>
              <div className="flex gap-2">
                {p.stage === "Proposed" ? (
                  <button className="rounded-lg bg-accent px-3.5 py-2 text-[12px] font-semibold text-white hover:bg-accent-deep">Approve</button>
                ) : (
                  <button className="rounded-lg border border-line px-3.5 py-2 text-[12px] font-semibold text-ink hover:bg-soft">Track</button>
                )}
              </div>
            </div>
          </Panel>
        ))}
      </div>
    </div>
  );
}

/* ── Pilot Pipeline ─────────────────────────────────────────── */
const PILOT_FLOW = [
  { l: "Opportunity", n: 14 },
  { l: "Proposal", n: 7 },
  { l: "Evaluation", n: 5 },
  { l: "Approval", n: 4 },
  { l: "Planning", n: 1 },
  { l: "Execution", n: 3 },
  { l: "Validation", n: 2 },
  { l: "Decision", n: 1 },
];

export function PilotPipeline() {
  return (
    <div className="space-y-5">
      <PageHead title="Pilot pipeline" sub="Opportunity → decision with stage gates and owners" />
      <div className="no-scrollbar -mx-4 overflow-x-auto px-4 lg:mx-0 lg:px-0">
        <div className="flex min-w-[1000px] items-stretch gap-2">
          {PILOT_FLOW.map((s, i) => (
            <div key={s.l} className="flex flex-1 items-center gap-2">
              <div className={`flex-1 rounded-xl border p-3.5 ${i >= 6 ? "border-rise/30 bg-rise-tint" : "border-line bg-white"}`}>
                <p className="font-mono text-[8.5px] tracking-[0.14em] text-slate-400 uppercase">{s.l}</p>
                <p className="mt-1.5 text-[22px] font-semibold tracking-tight text-ink">{s.n}</p>
              </div>
              {i < PILOT_FLOW.length - 1 && <ArrowRight className="h-3.5 w-3.5 shrink-0 text-slate-300" />}
            </div>
          ))}
        </div>
      </div>
      <Panel title="Stage gates" sub="What must be true to pass each gate">
        <div className="grid gap-3 sm:grid-cols-4">
          {[
            { g: "Proposal → Evaluation", r: "Problem fit ≥ 75 + BU owner named" },
            { g: "Evaluation → Approval", r: "Tech + risk sign-offs complete" },
            { g: "Execution → Validation", r: "KPI instrumentation live from day 1" },
            { g: "Validation → Decision", r: "Deployment readiness ≥ 80 all areas" },
          ].map((x) => (
            <div key={x.g} className="rounded-lg border border-line p-4">
              <p className="text-[12.5px] font-semibold text-accent">{x.g}</p>
              <p className="mt-1.5 text-[11.5px] leading-relaxed text-slate-500">{x.r}</p>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

/* ── Pilot Evaluation ───────────────────────────────────────── */
export function PilotEvaluation() {
  const p = PILOT_EVAL_SUBJECT;
  return (
    <div className="space-y-5">
      <SubjectBanner
        kicker="Pilot evaluation · PL-021"
        title={p.name}
        meta="Feb 15 – May 01 · 6 of 12 points live · budget ₹40 L"
        score={74}
        action={<Chip tone="rise" className="px-3 py-1.5">3 of 4 KPIs ahead of target</Chip>}
      />
      <Panel title="KPI results" sub="Live instrumented data from collection points" pad={false}>
        <ul className="divide-y divide-line">
          {p.kpis.map((k) => (
            <li key={k.kpi} className="grid items-center gap-3 px-5 py-4 sm:grid-cols-[220px_1fr_auto]">
              <span className="text-[13px] font-semibold text-ink">{k.kpi}</span>
              <span className="text-[12.5px] text-slate-500">
                Target <b className="text-ink">{k.target}</b> · Actual <b className="text-ink">{k.actual}</b>
              </span>
              <Chip tone={k.status === "Ahead" ? "rise" : "amber"}>
                {k.status === "Ahead" ? <CheckCircle2 className="h-3 w-3" /> : null}{k.status}
              </Chip>
            </li>
          ))}
        </ul>
      </Panel>
      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Business impact so far" sub="Vs. control collection points">
          <ul className="space-y-2.5">
            {p.impact.map((i) => (
              <li key={i} className="flex gap-2.5 rounded-lg border border-rise/20 bg-rise-tint p-3.5 text-[12.5px] leading-relaxed text-ink">
                <TrendingUp className="mt-0.5 h-3.5 w-3.5 shrink-0 text-rise" />{i}
              </li>
            ))}
          </ul>
        </Panel>
        <div className="space-y-4">
          <Panel title="Field feedback" sub="Anonymous, from operator survey">
            <p className="rounded-lg bg-soft p-4 text-[13.5px] leading-relaxed text-ink italic">&quot;{p.feedback}&quot;</p>
          </Panel>
          <Panel title="ROI projection">
            <p className="text-[20px] font-semibold tracking-tight text-rise">{p.roi}</p>
            <p className="mt-1 text-[12px] text-slate-500">
              vs. estimate of 14 months at proposal. Cost-per-crate is the one lagging KPI —
              volume renegotiation drafted as the lever.
            </p>
          </Panel>
        </div>
      </div>
    </div>
  );
}

/* ── Results & Outcomes ─────────────────────────────────────── */
export function ResultsOutcomes() {
  return (
    <div className="space-y-5">
      <PageHead title="Results & outcomes" sub="Validated results from completed pilots — decision-grade" />
      <div className="grid gap-4 lg:grid-cols-3">
        {[
          { pilot: "QC stations (CropLens)", outcome: "Spoilage 18% → 7.4%", verdict: "Deploy at 12 points", tone: "rise" as const, detail: "Exceeded target 10%" },
          { pilot: "Cold-chain ML (Frostat)", outcome: "Prediction horizon 5.1h", verdict: "Extend 1 route", tone: "accent" as const, detail: "Target 6h — close" },
          { pilot: "Manual+app baseline", outcome: "No material change", verdict: "Closed", tone: "slate" as const, detail: "Confirmed CV superiority" },
        ].map((r) => (
          <Panel key={r.pilot} className="transition-all duration-300 hover:shadow-soft">
            <h3 className="text-[14px] font-semibold text-ink">{r.pilot}</h3>
            <p className="mt-3 text-[20px] font-semibold tracking-tight text-ink">{r.outcome}</p>
            <p className="mt-1 text-[11.5px] text-slate-400">{r.detail}</p>
            <Chip tone={r.tone} className="mt-4">{r.verdict}</Chip>
          </Panel>
        ))}
      </div>
      <Panel title="Lessons learned" sub="Fed back into the pilot playbook v7">
        <ul className="grid gap-3 text-[12.5px] text-slate-600 sm:grid-cols-2">
          <li className="flex gap-2.5"><CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-rise" /> Instrument KPIs from day one — retrofitting measurement always fails.</li>
          <li className="flex gap-2.5"><CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-rise" /> Field-operator buy-in beats any demo. Run a 1 week hands-on before scoring UX.</li>
          <li className="flex gap-2.5"><CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-rise" /> Keep control groups live — they sell the business case to BU finance.</li>
          <li className="flex gap-2.5"><CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-rise" /> Re-benchmark vendor tech at 18 months or accept plateau silently.</li>
        </ul>
      </Panel>
    </div>
  );
}

/* ── Deployment Readiness ───────────────────────────────────── */
export function DeploymentReadiness() {
  const overall = Math.round(DEPLOY_READINESS.reduce((a, r) => a + r.score, 0) / DEPLOY_READINESS.length);
  return (
    <div className="space-y-5">
      <SubjectBanner
        kicker="Deployment readiness · QC stations"
        title={`${overall}/100 — ready to deploy`}
        meta="6 assessment areas · threshold 80"
        score={overall}
        action={
          <button className="rounded-lg bg-rise px-4 py-2.5 text-[13px] font-semibold text-white">
            <Rocket className="mr-1.5 inline h-3.5 w-3.5" /> Approve deployment
          </button>
        }
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {DEPLOY_READINESS.map((r) => (
          <Panel key={r.area}>
            <div className="flex items-start justify-between">
              <h3 className="text-[14.5px] font-semibold text-ink">{r.area}</h3>
              <span className={`flex h-9 w-9 items-center justify-center rounded-lg font-mono text-[12px] font-bold ${r.score >= 88 ? "bg-rise text-white" : "bg-accent text-white"}`}>{r.score}</span>
            </div>
            <p className="mt-2.5 text-[12px] leading-relaxed text-slate-500">{r.note}</p>
            <Bar pct={r.score} className="mt-3.5" barClass={r.score >= 88 ? "bg-rise" : "bg-accent"} />
          </Panel>
        ))}
      </div>
      <Panel title="Deployment recommendation" sub="From the deployment review board">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-rise-tint">
            <ThumbsUp className="h-5 w-5 text-rise" />
          </span>
          <div>
            <p className="text-[15px] font-semibold text-ink">Deploy to 12 collection points across 3 phases</p>
            <p className="mt-1.5 max-w-3xl text-[13px] leading-relaxed text-slate-600">
              Phase 2 (6 stations) immediately; phase 3 (4) after crop-drift retrain on monsoon
              varieties; phase 4 (2) alongside ERP connector GA. Total deployment cost ₹78 L incl.
              contingency — fits FY26 innovation window with ₹22 L reserve intact.
            </p>
          </div>
        </div>
      </Panel>
    </div>
  );
}
