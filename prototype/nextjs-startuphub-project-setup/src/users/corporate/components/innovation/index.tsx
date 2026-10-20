import {
  ArrowRight,
  FilePlus2,
  Lightbulb,
  Target,
  Trophy,
} from "lucide-react";
import { Bar, Chip, Panel, StatCard } from "@/components/app/widgets";
import { PageHead } from "@/components/app/boards";
import {
  CORP_CHALLENGES,
  CORP_STATS,
  INNOVATION_SPEND,
  OPEN_INNOVATION,
  PROBLEMS,
  THEMES,
} from "../../constants/corporate-data";
import { Spark } from "@/components/app/widgets";

const PS_TONE: Record<string, "rise" | "accent" | "amber" | "slate"> = {
  Open: "accent", Draft: "slate", "Active pilot": "rise", "Solved (FY25)": "slate", Archived: "slate",
};
const CH_TONE: Record<string, "rise" | "amber" | "accent" | "slate"> = {
  Active: "rise", Evaluation: "amber", Upcoming: "accent", Completed: "slate",
};

/* ── Innovation Overview ────────────────────────────────────── */
export function InnovationOverview() {
  return (
    <div className="space-y-5">
      <PageHead title="Innovation overview" sub="Strategy, pipeline, budget and KPIs — FY26 plan of record" />
      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Traceable Harvest 2026" sub="Board-level flagship program">
          <p className="text-[13.5px] leading-relaxed text-slate-600">
            Make 40% of supply chain traceable to the farm, with documented quality at
            every collection point. Delivered through startup-sourced technology across
            QC, MRV and cold-chain themes.
          </p>
          <div className="mt-5 grid grid-cols-3 gap-3 text-center">
            {[
              { l: "Traceable share", v: "34%" },
              { l: "Programs underway", v: "6" },
              { l: "Board reviews", v: "Quarterly" },
            ].map((x) => (
              <div key={x.l} className="rounded-lg bg-soft p-3">
                <p className="text-[15px] font-semibold text-ink">{x.v}</p>
                <p className="mt-0.5 font-mono text-[8.5px] tracking-[0.1em] text-slate-400 uppercase">{x.l}</p>
              </div>
            ))}
          </div>
        </Panel>
        <Panel title="Innovation budget" sub="FY26 · ₹4.2 Cr plan">
          <Spark points={INNOVATION_SPEND} className="h-16 w-full" />
          <ul className="mt-4 space-y-2.5 text-[12.5px]">
            {[
              { l: "Pilots & PoCs", v: "₹2.1 Cr", pct: 86 },
              { l: "Challenges & open calls", v: "₹0.6 Cr", pct: 70 },
              { l: "Scouting & evaluation", v: "₹0.5 Cr", pct: 58 },
              { l: "Reserve (opportunistic)", v: "₹1.0 Cr", pct: 0 },
            ].map((b) => (
              <li key={b.l} className="flex items-center gap-3">
                <span className="w-40 text-slate-500">{b.l}</span>
                <Bar pct={b.pct} className="flex-1" />
                <span className="w-14 text-right font-mono text-[11px] font-semibold text-ink">{b.v}</span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="Innovation ROI" value="3.1×" delta="+0.2 Q/Q" icon={Target} />
        <StatCard label="Pilot→deploy rate" value="61%" delta="target 55%" icon={Trophy} />
        <StatCard label="Cycle time" value="104 days" delta="problem → decision" icon={Lightbulb} />
        <StatCard label="Startup savings" value="₹2.7 Cr" delta="FY26 sourced" icon={Target} />
      </div>
    </div>
  );
}

/* ── Problem Statement Management ───────────────────────────── */
export function ProblemStatements() {
  return (
    <div className="space-y-5">
      <PageHead
        title="Problem statements"
        sub="9 active problems · business need, technical requirements, budget and timeline"
        action={
          <button className="flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-accent-deep">
            <FilePlus2 className="h-3.5 w-3.5" /> Create problem
          </button>
        }
      />
      <div className="space-y-3">
        {PROBLEMS.map((p) => (
          <Panel key={p.id} className="transition-all duration-300 hover:shadow-soft">
            <div className="flex items-start gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-soft font-mono text-[10px] font-bold text-accent">{p.id}</span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-[14.5px] leading-snug font-semibold text-ink">{p.title}</h3>
                  <Chip tone={PS_TONE[p.status]}>{p.status}</Chip>
                </div>
                <p className="mt-1.5 text-[12.5px] leading-relaxed text-slate-600">
                  <b>Need:</b> {p.need}
                </p>
                <p className="mt-1 text-[12px] text-slate-500">
                  <b>Tech:</b> {p.tech}
                </p>
                <div className="mt-2.5 flex flex-wrap gap-x-5 gap-y-1 font-mono text-[10px] tracking-[0.06em] text-slate-400 uppercase">
                  <span>{p.bu}</span><span>{p.budget}</span><span>{p.timeline}</span>
                </div>
              </div>
              <a href="/corporate/discovery" className="flex items-center gap-1 rounded-lg border border-line px-3.5 py-2 text-[12px] font-semibold text-ink hover:bg-soft">
                Discover solutions <ArrowRight className="h-3 w-3" />
              </a>
            </div>
          </Panel>
        ))}
      </div>
    </div>
  );
}

/* ── Challenge Management ───────────────────────────────────── */
export function ChallengeManagement() {
  return (
    <div className="space-y-5">
      <PageHead
        title="Challenge management"
        sub="Open problems as public challenges — co-hosted with the State Innovation Mission"
        action={
          <button className="flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-accent-deep">
            <Trophy className="h-3.5 w-3.5" /> Create challenge
          </button>
        }
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CORP_CHALLENGES.map((c) => (
          <Panel key={c.id} className="transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft">
            <div className="flex items-start justify-between">
              <Chip tone={CH_TONE[c.status]}>{c.status}</Chip>
              <span className="font-mono text-[10px] text-slate-400">{c.id}</span>
            </div>
            <h3 className="mt-3 text-[16px] font-semibold tracking-[-0.015em] text-ink">{c.title}</h3>
            <p className="mt-1 text-[11.5px] text-slate-400">Problem {c.problem} · deadline {c.deadline}</p>
            <div className="mt-4 grid grid-cols-2 gap-2 text-center">
              <div className="rounded-lg bg-soft p-3">
                <p className="text-[13px] font-semibold text-ink">{c.prize}</p>
                <p className="mt-0.5 font-mono text-[8px] tracking-[0.1em] text-slate-400 uppercase">Reward</p>
              </div>
              <div className="rounded-lg bg-soft p-3">
                <p className="text-[13px] font-semibold text-ink">{c.submissions}</p>
                <p className="mt-0.5 font-mono text-[8px] tracking-[0.1em] text-slate-400 uppercase">Submissions</p>
              </div>
            </div>
            <button className="mt-4 w-full rounded-lg bg-accent py-2.5 text-[12.5px] font-semibold text-white hover:bg-accent-deep">Manage challenge</button>
          </Panel>
        ))}
      </div>
    </div>
  );
}

/* ── Innovation Themes ──────────────────────────────────────── */
export function InnovationThemes() {
  return (
    <div className="space-y-5">
      <PageHead title="Innovation themes" sub="Strategic priorities for FY26–28 with business rationale" />
      <Panel pad={false}>
        <ul className="divide-y divide-line">
          {THEMES.map((t) => (
            <li key={t.theme} className="flex items-center gap-4 px-5 py-4.5 transition-colors hover:bg-soft">
              <Chip tone={t.priority === "P1" ? "amber" : t.priority === "P2" ? "accent" : "slate"} className="w-12 justify-center">{t.priority}</Chip>
              <div className="min-w-0 flex-1">
                <p className="text-[14px] font-semibold text-ink">{t.theme}</p>
                <p className="mt-0.5 text-[12px] text-slate-400">{t.note}</p>
              </div>
              <a href="/corporate/discovery/scouting" className="text-[12px] font-semibold text-accent">Scout →</a>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}

/* ── Open Innovation ────────────────────────────────────────── */
export function OpenInnovation() {
  return (
    <div className="space-y-5">
      <PageHead
        title="Open innovation"
        sub="Open calls, idea boxes and research collaborations"
        action={<button className="rounded-lg bg-accent px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-accent-deep">+ New open call</button>}
      />
      <Panel pad={false}>
        <ul className="divide-y divide-line">
          {OPEN_INNOVATION.map((o) => (
            <li key={o.title} className="flex flex-wrap items-center gap-4 px-5 py-4.5 transition-colors hover:bg-soft">
              <Chip tone="accent" className="w-24 justify-center">{o.kind}</Chip>
              <div className="min-w-0 flex-1">
                <p className="text-[14px] font-semibold text-ink">{o.title}</p>
                <p className="mt-0.5 font-mono text-[10px] tracking-[0.08em] text-slate-400 uppercase">
                  {o.submissions} submissions · {o.selected} selected
                </p>
              </div>
              <Chip tone="rise">{o.status}</Chip>
              <a href="/corporate/innovation/challenges" className="rounded-lg border border-line px-3.5 py-2 text-[12px] font-semibold text-ink hover:bg-white">Review</a>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}

/* ── Innovation Pipeline ────────────────────────────────────── */
const PIPE_ROWS = [
  { stage: "Problem", count: 9, note: "9 open · 2 flagged P1", tone: "ink" as const },
  { stage: "Challenge", count: 2, note: "96 + 61 submissions", tone: "accent" as const },
  { stage: "Discovery", count: 34, note: "34 startups scouted", tone: "accent" as const },
  { stage: "Evaluation", count: 6, note: "6 in formal evaluation", tone: "accent" as const },
  { stage: "Pilot / PoC", count: 5, note: "3 pilots · 2 PoCs live", tone: "accent" as const },
  { stage: "Validation", count: 2, note: "2 at deployment review", tone: "amber" as const },
  { stage: "Partnership", count: 6, note: "6 active partners", tone: "rise" as const },
  { stage: "Deployment", count: 4, note: "4 solutions in production", tone: "rise" as const },
];

export function InnovationPipeline() {
  return (
    <div className="space-y-5">
      <PageHead title="Innovation pipeline" sub="Problem → deployment, everything accounted for" />
      <div className="no-scrollbar -mx-4 overflow-x-auto px-4 lg:mx-0 lg:px-0">
        <div className="flex min-w-[1100px] items-stretch gap-2">
          {PIPE_ROWS.map((s, i) => (
            <div key={s.stage} className="flex flex-1 items-center gap-2">
              <div className={`flex-1 rounded-xl border p-3.5 ${i >= 6 ? "border-rise/30 bg-rise-tint" : i >= 4 ? "border-accent/25 bg-accent-mist" : "border-line bg-white"}`}>
                <p className="font-mono text-[8.5px] tracking-[0.14em] text-slate-400 uppercase">{s.stage}</p>
                <p className="mt-1.5 text-[22px] font-semibold tracking-tight text-ink">{s.count}</p>
                <p className="mt-0.5 text-[10px] text-slate-500">{s.note}</p>
              </div>
              {i < PIPE_ROWS.length - 1 && <ArrowRight className="h-3.5 w-3.5 shrink-0 text-slate-300" />}
            </div>
          ))}
        </div>
      </div>
      <Panel title="Conversion health" sub="Rolling 4 quarters">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { l: "Problem → pilot", v: "38%" },
            { l: "Pilot → validation", v: "61%" },
            { l: "Validation → deployment", v: "68%" },
            { l: "End-to-end conversion", v: "16%" },
          ].map((x) => (
            <div key={x.l} className="rounded-lg bg-soft p-4 text-center">
              <p className="text-[18px] font-semibold text-ink">{x.v}</p>
              <p className="mt-1 text-[10.5px] text-slate-400">{x.l}</p>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
