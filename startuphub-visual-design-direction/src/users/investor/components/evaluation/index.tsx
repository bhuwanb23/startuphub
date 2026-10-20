import {
  ArrowRight,
  BarChart3,
  Brain,
  ClipboardList,
  FileText,
  Gauge,
  Globe2,
  Plus,
  TrendingUp,
} from "lucide-react";
import { Bar, Chip, Panel, ScoreRing } from "@/components/app/widgets";
import { PageHead, SubjectBanner } from "@/components/app/boards";
import {
  COMPETITORS,
  EVAL_SECTIONS,
  EVAL_SUBJECT,
  MARKET_ANALYSIS,
  SCORE_DIMENSIONS,
  SCORE_HISTORY,
  SWOT,
} from "../../constants/evaluation-data";

/* ── Startup Evaluation (dashboard over the subject) ────────── */
export function StartupEvaluation() {
  return (
    <div className="space-y-5">
      <SubjectBanner
        kicker="Active evaluation · Series A"
        title={EVAL_SUBJECT.name}
        meta={`${EVAL_SUBJECT.tagline} · ${EVAL_SUBJECT.location} · asking ${EVAL_SUBJECT.ask}`}
        score={EVAL_SUBJECT.overallScore}
        action={
          <div className="flex gap-2">
            <button className="flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-accent-deep">
              Start DD <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        }
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <Panel title="Evaluation canvas" sub="12 dimensions · click to open analysis" className="lg:col-span-2">
          <div className="grid gap-2.5 sm:grid-cols-2">
            {EVAL_SECTIONS.map((s) => (
              <a
                key={s.label}
                href={`/investor/evaluation/${s.label === "Market" ? "market" : s.label === "Financials" ? "financial" : s.label === "Team" ? "team" : s.label === "Technology" ? "technology" : s.label === "IPR" ? "ip" : "scoring"}`}
                className="group rounded-lg border border-line p-3.5 transition-all duration-300 hover:border-accent/40 hover:bg-accent-mist"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[12.5px] font-semibold text-ink">{s.label}</span>
                  <span className={`font-mono text-[11px] font-bold ${s.score >= 85 ? "text-rise" : s.score >= 70 ? "text-accent" : "text-amber-dim"}`}>
                    {s.score}
                  </span>
                </div>
                <Bar pct={s.score} className="mt-2" barClass={s.score >= 85 ? "bg-rise" : s.score >= 70 ? "bg-accent" : "bg-amber-dim"} />
                <p className="mt-2 line-clamp-2 text-[11.5px] leading-relaxed text-slate-500">{s.summary}</p>
              </a>
            ))}
          </div>
        </Panel>

        <div className="space-y-4">
          <Panel title="Recommendation" sub="Partner view · updated today">
            <div className="rounded-lg border border-rise/25 bg-rise-tint p-4">
              <p className="flex items-center gap-2 text-[14px] font-semibold text-rise">
                <Gauge className="h-4 w-4" /> {EVAL_SUBJECT.recommendation}
              </p>
              <p className="mt-2 text-[12px] leading-relaxed text-ink/70">
                Score 84 clears our IC threshold of 75. Two risks to structure around:
                reimbursement timing and payer concentration — both solvable via tranche terms.
              </p>
            </div>
            <ul className="mt-4 space-y-2 text-[12px] text-slate-500">
              <li className="flex justify-between"><span>IC threshold</span><span className="font-semibold text-ink">75</span></li>
              <li className="flex justify-between"><span>Current score</span><span className="font-semibold text-rise">84</span></li>
              <li className="flex justify-between"><span>Next gate</span><span className="font-semibold text-ink">DD kickoff</span></li>
            </ul>
          </Panel>

          <Panel title="Evaluation history" sub="Score → verdict trail">
            <ul className="space-y-3">
              {[
                { d: "Mar 26", t: "Final partner review — score 84, advance recommended" },
                { d: "Mar 19", t: "Unit economics deep-dive complete" },
                { d: "Mar 12", t: "Founder deep-dive + product walk-through" },
                { d: "Mar 08", t: "Evaluation opened from screening (score 78)" },
              ].map((h) => (
                <li key={h.d} className="flex gap-3 text-[12px]">
                  <span className="w-12 shrink-0 font-mono text-[10px] text-slate-400">{h.d}</span>
                  <span className="text-slate-600">{h.t}</span>
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </div>
    </div>
  );
}

/* ── Startup Scoring ────────────────────────────────────────── */
export function StartupScoring() {
  const overall = Math.round(SCORE_DIMENSIONS.reduce((a, s) => a + s.score, 0) / SCORE_DIMENSIONS.length);
  return (
    <div className="space-y-5">
      <SubjectBanner
        kicker="Scoring · PathPilot"
        title="Startup scoring"
        meta="Weighted rubric · Meridian v4 · 8 dimensions + custom"
        score={overall}
        action={<button className="flex items-center gap-1.5 rounded-lg border border-line bg-white px-4 py-2.5 text-[13px] font-semibold text-ink hover:bg-soft"><Plus className="h-3.5 w-3.5 text-slate-400" /> Custom dimension</button>}
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <Panel title="Dimension scores" sub="Weighted into overall" className="lg:col-span-2">
          <ul className="space-y-4">
            {SCORE_DIMENSIONS.map((d) => (
              <li key={d.label} className="grid grid-cols-[110px_1fr_44px] items-center gap-3 sm:grid-cols-[130px_1fr_180px_44px]">
                <span className="text-[12.5px] font-semibold text-ink">{d.label}</span>
                <Bar pct={d.score} barClass={d.score >= 85 ? "bg-rise" : d.score >= 70 ? "bg-accent" : "bg-amber-dim"} />
                <span className="hidden text-[11px] text-slate-400 sm:block">{d.note}</span>
                <span className="text-right font-mono text-[12px] font-bold text-ink">{d.score}</span>
              </li>
            ))}
            <li className="grid grid-cols-[110px_1fr_44px] items-center gap-3 sm:grid-cols-[130px_1fr_180px_44px]">
              <span className="text-[12.5px] font-semibold text-ink">Investment</span>
              <Bar pct={85} />
              <span className="hidden text-[11px] text-slate-400 sm:block">Terms-attractiveness composite</span>
              <span className="text-right font-mono text-[12px] font-bold text-ink">85</span>
            </li>
          </ul>
        </Panel>

        <div className="space-y-4">
          <Panel title="Score history" sub="Re-scored as evidence arrives">
            <ul className="space-y-3">
              {SCORE_HISTORY.map((h) => (
                <li key={h.date} className="flex items-center gap-3 rounded-lg border border-line p-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-soft font-mono text-[12px] font-bold text-accent">{h.score}</span>
                  <div className="min-w-0">
                    <p className="text-[12px] font-semibold text-ink">{h.date} · {h.by}</p>
                    <p className="truncate text-[11px] text-slate-400">{h.note}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Panel>
          <Panel title="Weights" sub="Set by IC, editable per deal">
            <ul className="space-y-2.5 text-[12.5px]">
              {[
                ["Team", "20%"], ["Market", "18%"], ["Traction", "16%"],
                ["Financial", "12%"], ["Technology", "12%"], ["IP", "8%"], ["Risk", "14%"],
              ].map(([l, w]) => (
                <li key={l} className="flex justify-between"><span className="text-slate-500">{l}</span><span className="font-mono font-semibold text-accent">{w}</span></li>
              ))}
            </ul>
          </Panel>
        </div>
      </div>
    </div>
  );
}

/* ── Market Analysis ────────────────────────────────────────── */
export function MarketAnalysis() {
  const m = MARKET_ANALYSIS;
  return (
    <div className="space-y-5">
      <PageHead title="Market analysis" sub="Pathology AI tier-2 wedge — PathPilot evaluation" />

      {/* TAM funnel */}
      <div className="grid gap-4 sm:grid-cols-3">
        {[m.tam, m.sam, m.som].map((x, i) => (
          <div key={x.label} className="relative overflow-hidden rounded-xl border border-line bg-white p-5">
            <div className="absolute inset-y-0 left-0 bg-accent" style={{ width: `${4 + i * 2}px`, opacity: 1 - i * 0.25 }} />
            <p className="font-mono text-[10px] tracking-[0.2em] text-slate-400 uppercase">{x.label}</p>
            <p className="mt-2 text-[24px] font-semibold tracking-[-0.03em] text-ink">{x.value}</p>
            <p className="mt-1 text-[12px] text-slate-500">{x.note}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Market trends" sub={`Growing at ${m.cagr} CAGR`} action={<TrendingUp className="h-4 w-4 text-rise" />}>
          <ul className="space-y-3">
            {m.trends.map((t, i) => (
              <li key={t} className="flex gap-3 text-[13px] leading-relaxed text-ink">
                <span className="font-mono text-[10px] font-semibold text-accent">0{i + 1}</span>
                {t}
              </li>
            ))}
          </ul>
          <div className="mt-5 border-t border-line pt-4">
            <p className="mb-3 font-mono text-[9px] tracking-[0.18em] text-slate-400 uppercase">Segments</p>
            {m.segments.map((s) => (
              <div key={s.label} className="mb-2.5 flex items-center gap-3">
                <span className="w-32 text-[12px] text-slate-500">{s.label}</span>
                <Bar pct={s.pct * 2} className="flex-1" />
                <span className="w-8 text-right font-mono text-[11px] text-ink">{s.pct}%</span>
              </div>
            ))}
          </div>
        </Panel>

        <div className="space-y-4">
          <Panel title="Opportunities" sub="Where PathPilot wins" action={<Globe2 className="h-4 w-4 text-slate-300" />}>
            <ul className="space-y-2.5">
              {m.opportunities.map((o) => (
                <li key={o} className="flex gap-2.5 rounded-lg border border-rise/20 bg-rise-tint p-3.5 text-[12.5px] leading-relaxed text-ink">
                  <TrendingUp className="mt-0.5 h-3.5 w-3.5 shrink-0 text-rise" />{o}
                </li>
              ))}
            </ul>
          </Panel>
          <Panel title="Market risks" sub="What could break the thesis">
            <ul className="space-y-2.5">
              {m.risks.map((r) => (
                <li key={r} className="flex gap-2.5 rounded-lg border border-amber-dim/20 bg-amber-tint p-3.5 text-[12.5px] leading-relaxed text-ink">
                  <ClipboardList className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-dim" />{r}
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </div>
    </div>
  );
}

/* ── Competitor Analysis ────────────────────────────────────── */
export function CompetitorAnalysis() {
  return (
    <div className="space-y-5">
      <PageHead title="Competitor analysis" sub="PathPilot positioning — diagnostics AI market map" />

      <Panel title="Competitive matrix" sub="Direct + adjacent players" pad={false}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-left">
            <thead>
              <tr className="border-b border-line">
                {["Player", "Funding", "Focus", "Pricing", "Share", "Core strength"].map((h) => (
                  <th key={h} className="px-5 py-3.5 font-mono text-[9.5px] font-medium tracking-[0.16em] text-slate-400 uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              <tr className="bg-accent-mist">
                <td className="px-5 py-4"><Chip tone="accent">PathPilot</Chip></td>
                <td className="px-5 py-4 font-mono text-[12px] text-slate-500">$9.5M</td>
                <td className="px-5 py-4 text-[12.5px] text-ink">Pathology AI, tier-2</td>
                <td className="px-5 py-4 text-[12.5px] text-slate-500">Per report + licence</td>
                <td className="px-5 py-4 font-mono text-[12px] text-ink">Wedge: 140 centres</td>
                <td className="px-5 py-4 text-[12.5px] font-medium text-ink">Tier-2 distribution</td>
              </tr>
              {COMPETITORS.map((c) => (
                <tr key={c.name} className="transition-colors hover:bg-soft">
                  <td className="px-5 py-4 text-[13px] font-semibold text-ink">{c.name}</td>
                  <td className="px-5 py-4 font-mono text-[12px] text-slate-500">{c.funding}</td>
                  <td className="px-5 py-4 text-[12.5px] text-slate-600">{c.focus}</td>
                  <td className="px-5 py-4 text-[12.5px] text-slate-500">{c.pricing}</td>
                  <td className="px-5 py-4 font-mono text-[12px] text-slate-500">{c.share}</td>
                  <td className="px-5 py-4 text-[12.5px] text-slate-500">{c.strength}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>

      <Panel title="SWOT" sub="PathPilot vs. the field" action={<Brain className="h-4 w-4 text-slate-300" />}>
        <div className="grid gap-3 sm:grid-cols-2">
          {([
            { k: "Strengths", items: SWOT.strengths, cls: "border-rise/20 bg-rise-tint text-rise" },
            { k: "Weaknesses", items: SWOT.weaknesses, cls: "border-amber-dim/20 bg-amber-tint text-amber-dim" },
            { k: "Opportunities", items: SWOT.opportunities, cls: "border-accent/20 bg-accent-mist text-accent" },
            { k: "Threats", items: SWOT.threats, cls: "border-line bg-soft text-slate-500" },
          ] as const).map((q) => (
            <div key={q.k} className={`rounded-xl border p-4.5 ${q.cls.split(" ").slice(0, 2).join(" ")}`}>
              <p className={`font-mono text-[10px] font-semibold tracking-[0.18em] uppercase ${q.cls.split(" ")[2]}`}>{q.k}</p>
              <ul className="mt-3 space-y-2">
                {q.items.map((i) => (
                  <li key={i} className="flex gap-2 text-[12.5px] leading-relaxed text-ink">
                    <span className={`mt-[7px] h-1 w-3 shrink-0 rounded-full ${q.cls.split(" ")[2].replace("text-", "bg-")}`} />{i}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
