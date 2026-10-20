import {
  ArrowRight,
  Check,
  Clock3,
  Kanban,
  Pause,
  Plus,
  X,
} from "lucide-react";
import { Avatar, Bar, Chip, Panel, ScoreRing, StatCard } from "@/components/app/widgets";
import { PageHead } from "@/components/app/boards";
import {
  EVAL_ACTIVE,
  NEW_LEADS_LIST,
  PIPELINE_STAGE_SUMMARY,
} from "../../constants/deal-dd-data";
import { SCREENING_ROWS } from "../../constants/investor-data";

/* ── Pipeline Overview — visual stage flow ──────────────────── */
export function PipelineOverview() {
  return (
    <div className="space-y-5">
      <PageHead
        title="Deal pipeline"
        sub="24 deals in active motion · New Lead → Portfolio"
        action={
          <button className="flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-accent-deep">
            <Plus className="h-3.5 w-3.5" /> Create deal
          </button>
        }
      />

      {/* stage flow */}
      <div className="no-scrollbar -mx-4 overflow-x-auto px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="flex min-w-[1080px] items-stretch gap-2">
          {PIPELINE_STAGE_SUMMARY.map((s, i) => (
            <div key={s.key} className="flex flex-1 items-center gap-2">
              <a
                href={`/investor/pipeline/${s.key === "leads" ? "leads" : s.key === "ic" ? "committee" : s.key === "dd" ? "due-diligence" : s.key}`}
                className={`group flex-1 rounded-xl border p-3.5 transition-all duration-300 hover:-translate-y-0.5 ${
                  s.accent ? "border-accent/30 bg-accent text-white shadow-[0_8px_20px_rgba(49,87,232,0.25)]" : "border-line bg-white hover:border-accent/40"
                }`}
              >
                <p className={`font-mono text-[8.5px] tracking-[0.14em] uppercase ${s.accent ? "text-white/70" : "text-slate-400"}`}>{s.label}</p>
                <p className={`mt-1.5 text-[22px] font-semibold tracking-tight ${s.accent ? "text-white" : "text-ink"}`}>{s.count}</p>
                {s.conv !== null ? (
                  <p className={`mt-1 text-[10px] ${s.accent ? "text-white/70" : "text-slate-400"}`}>
                    ↓ {s.conv}% convert
                  </p>
                ) : (
                  <p className={`mt-1 text-[10px] ${s.accent ? "text-white/70" : "text-slate-400"}`}>lifetime</p>
                )}
              </a>
              {i < PIPELINE_STAGE_SUMMARY.length - 1 && (
                <ArrowRight className="h-3.5 w-3.5 shrink-0 text-slate-300" />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="Avg. time in pipeline" value="47 days" delta="-6d vs Q4" icon={Clock3} />
        <StatCard label="Lead → close rate" value="4.8%" delta="+0.9 pts" icon={Kanban} />
        <StatCard label="Screen pass rate" value="43%" delta="healthy band" icon={Check} />
        <StatCard label="IC approval rate" value="78%" delta="last 12 months" icon={Check} />
      </div>

      {/* open stages inline */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Panel title="Hottest leads" sub="Score-ranked intake" pad={false}>
          <ul className="divide-y divide-line">
            {NEW_LEADS_LIST.filter((l) => l.score !== null).slice(0, 4).map((l) => (
              <li key={l.id} className="flex items-center gap-3 px-5 py-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-soft font-mono text-[11px] font-bold text-accent">{l.score}</span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[12.5px] font-semibold text-ink">{l.name}</p>
                  <p className="truncate text-[10.5px] text-slate-400">{l.sector}</p>
                </div>
                <a href="/investor/pipeline/leads" className="text-[11px] font-semibold text-accent">Review →</a>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="In evaluation" sub="Deep analysis underway" pad={false}>
          <ul className="divide-y divide-line">
            {EVAL_ACTIVE.map((e) => (
              <li key={e.id} className="flex items-center gap-3.5 px-5 py-3">
                <ScoreRing score={e.score} size={36} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[12.5px] font-semibold text-ink">{e.name}</p>
                  <p className="truncate text-[10.5px] text-slate-400">{e.stage} · day {e.days}</p>
                </div>
                <Avatar label={e.analyst} className="h-6.5 w-6.5 text-[9px]" />
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="This week's movement" sub="Stage transitions" pad={false}>
          <ul className="divide-y divide-line text-[12.5px]">
            {[
              { t: "CarbonKart → Investment Committee", d: "Today" },
              { t: "SehatGrid → Due Diligence", d: "Yesterday" },
              { t: "LedgerPort → Evaluation", d: "Mar 24" },
              { t: "GameVerse → Passed (off-thesis)", d: "Mar 22" },
            ].map((m) => (
              <li key={m.t} className="flex items-center justify-between px-5 py-3">
                <span className="text-ink">{m.t}</span>
                <span className="font-mono text-[10px] text-slate-400">{m.d}</span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </div>
  );
}

/* ── New Leads ──────────────────────────────────────────────── */
export function NewLeads() {
  return (
    <div className="space-y-5">
      <PageHead
        title="New leads"
        sub="42 unreviewed this month · oldest first keeps SLA green"
        action={<Chip tone="amber" className="px-3 py-1.5"><Clock3 className="h-3 w-3" /> SLA: respond in 5 days</Chip>}
      />
      <Panel pad={false}>
        <ul className="divide-y divide-line">
          {NEW_LEADS_LIST.map((l) => (
            <li key={l.id} className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-soft">
              <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg font-mono text-[12px] font-bold ${l.score ? "bg-accent text-white" : "bg-slate-100 text-slate-400"}`}>
                {l.score ?? "·"}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[13.5px] font-semibold text-ink">{l.name}</p>
                <p className="text-[11.5px] text-slate-400">{l.sector} · {l.source} · {l.received}</p>
              </div>
              {!l.score && <Chip tone="amber">Unscored</Chip>}
              <div className="flex gap-2">
                <button className="rounded-lg bg-accent px-3.5 py-2 text-[12px] font-semibold text-white hover:bg-accent-deep">Screen</button>
                <button className="rounded-lg border border-line px-3.5 py-2 text-[12px] font-semibold text-ink hover:bg-white">Assign</button>
              </div>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}

/* ── Screening stage ────────────────────────────────────────── */
const SCREEN_TONE = { Advance: "rise", Park: "amber", Pass: "slate" } as const;

export function ScreeningStage() {
  return (
    <div className="space-y-5">
      <PageHead
        title="Screening queue"
        sub="Thesis-fit scoring · pass, reject or hold with one click"
      />
      <Panel pad={false}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[780px] text-left">
            <thead>
              <tr className="border-b border-line">
                {["Company", "Fit score", "Thesis area", "Ask", "Est. IRR", "Analyst", "Decision"].map((h) => (
                  <th key={h} className="px-5 py-3.5 font-mono text-[9.5px] font-medium tracking-[0.16em] text-slate-400 uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {SCREENING_ROWS.map((r) => (
                <tr key={r.id} className="transition-colors hover:bg-soft">
                  <td className="px-5 py-4">
                    <p className="text-[13.5px] font-semibold text-ink">{r.company}</p>
                    <p className="text-[11px] text-slate-400">{r.sector}</p>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2.5">
                      <Bar pct={r.fit} className="w-20" barClass={r.fit >= 75 ? "bg-accent" : r.fit >= 60 ? "bg-amber-dim" : "bg-slate-300"} />
                      <span className="font-mono text-[12px] font-semibold text-ink">{r.fit}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-[12.5px] text-slate-500">{r.thesis}</td>
                  <td className="px-5 py-4 text-[12.5px] font-semibold text-ink">{r.ask}</td>
                  <td className="px-5 py-4 font-mono text-[12px] text-slate-500">{r.irr}</td>
                  <td className="px-5 py-4"><Avatar label={r.analyst} className="h-7 w-7 text-[10px]" /></td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1.5">
                      <Chip tone={SCREEN_TONE[r.status]}>{r.status}</Chip>
                      <button className="flex h-7 w-7 items-center justify-center rounded-md text-rise hover:bg-rise-tint" aria-label="Advance"><Check className="h-3.5 w-3.5" /></button>
                      <button className="flex h-7 w-7 items-center justify-center rounded-md text-slate-400 hover:bg-slate-100" aria-label="Hold"><Pause className="h-3.5 w-3.5" /></button>
                      <button className="flex h-7 w-7 items-center justify-center rounded-md text-slate-400 hover:bg-amber-tint hover:text-amber-dim" aria-label="Pass"><X className="h-3.5 w-3.5" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}

/* ── Evaluation stage ───────────────────────────────────────── */
export function EvaluationStage() {
  return (
    <div className="space-y-5">
      <PageHead
        title="Active evaluations"
        sub="Deep analysis in progress — 9-dimension rubric per deal"
        action={<Chip tone="accent" className="px-3 py-1.5">Avg. 5.2 days per evaluation</Chip>}
      />
      <div className="grid gap-4 sm:grid-cols-3">
        {EVAL_ACTIVE.map((e) => (
          <Panel key={e.id} className="transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-[16px] font-semibold tracking-[-0.01em] text-ink">{e.name}</h3>
                <p className="mt-1 font-mono text-[10px] tracking-[0.1em] text-slate-400 uppercase">{e.stage}</p>
              </div>
              <ScoreRing score={e.score} size={48} />
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-line pt-3.5 text-[12px]">
              <span className="text-slate-400">Analyst <span className="font-semibold text-ink">{e.analyst}</span></span>
              <span className="font-mono text-slate-400">day {e.days}</span>
            </div>
            <div className="mt-3.5 flex gap-2">
              <a href="/investor/evaluation" className="flex-1 rounded-lg bg-accent py-2 text-center text-[12px] font-semibold text-white hover:bg-accent-deep">Open evaluation</a>
              <a href="/investor/pipeline/due-diligence" className="flex-1 rounded-lg border border-line py-2 text-center text-[12px] font-semibold text-ink hover:bg-soft">Move to DD</a>
            </div>
          </Panel>
        ))}
      </div>
    </div>
  );
}
