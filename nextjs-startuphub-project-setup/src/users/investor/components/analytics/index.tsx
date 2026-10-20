import {
  ArrowUpRight,
  BarChart3,
  FileText,
  Gauge,
  PieChart,
  Radar,
  TrendingUp,
} from "lucide-react";
import { Bar, Chip, Panel, Spark, StatCard } from "@/components/app/widgets";
import { PageHead } from "@/components/app/boards";
import {
  ALLOCATION,
  FUND_CURVE,
  FUND_SERIES,
  LP_REPORTS,
  SECTOR_REPORTS,
  SIGNALS,
} from "../../constants/investor-data";
import { DEAL_SOURCES } from "../../constants/ops-data";
import { PIPELINE_STAGE_SUMMARY } from "../../constants/deal-dd-data";

/* ── Investment Analytics ───────────────────────────────────── */
export function InvestmentAnalytics() {
  const max = Math.max(...FUND_CURVE);
  const w = 720;
  const h = 200;
  const pts = FUND_CURVE.map((v, i) => ({ x: (i / (FUND_CURVE.length - 1)) * w, y: h - 14 - (v / max) * (h - 32) }));
  const line = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  return (
    <div className="space-y-5">
      <PageHead title="Investment analytics" sub="Deployment, frequency and returns across Fund I" />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {FUND_SERIES.map((f) => (
          <div key={f.label} className="rounded-xl border border-line bg-white p-4 text-center">
            <p className="font-mono text-[9.5px] tracking-[0.16em] text-slate-400 uppercase">{f.label}</p>
            <p className="mt-1.5 text-[20px] font-semibold tracking-tight text-ink">{f.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-5">
        <Panel title="Deployment curve" sub="Cumulative capital, ₹ Cr" className="lg:col-span-3">
          <div className="overflow-x-auto">
            <svg viewBox={`0 0 ${w} ${h}`} className="h-48 w-full min-w-[520px]" fill="none">
              <defs>
                <linearGradient id="inv-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3157e8" stopOpacity="0.14" />
                  <stop offset="100%" stopColor="#3157e8" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d={`${line} L ${w} ${h} L 0 ${h} Z`} fill="url(#inv-fill)" />
              <path d={line} stroke="#3157e8" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx={pts[pts.length - 1].x} cy={pts[pts.length - 1].y} r="5" fill="#3157e8" stroke="#fff" strokeWidth="2" />
            </svg>
          </div>
          <div className="mt-2 flex justify-between font-mono text-[9.5px] text-slate-400">
            <span>Q1'24</span><span>Q3'24</span><span>Q1'25</span><span>Q3'25</span><span>Q1'26</span>
          </div>
        </Panel>

        <Panel title="Investment frequency" sub="Deals per quarter" className="lg:col-span-2">
          <ul className="space-y-3">
            {[
              { l: "Q4 FY25", n: 5 }, { l: "Q3 FY25", n: 4 }, { l: "Q2 FY25", n: 3 },
              { l: "Q1 FY25", n: 4 }, { l: "Q4 FY24", n: 2 },
            ].map((q) => (
              <li key={q.l} className="flex items-center gap-3">
                <span className="w-16 font-mono text-[11px] text-slate-400">{q.l}</span>
                <Bar pct={q.n * 20} className="flex-1" />
                <span className="w-4 text-right font-mono text-[11.5px] font-semibold text-ink">{q.n}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 rounded-lg bg-accent-mist p-3.5 text-[12px] text-ink">
            Avg. cheque <b>₹3.8 Cr</b> · avg. time between deals <b>24 days</b>
          </div>
        </Panel>
      </div>
    </div>
  );
}

/* ── Portfolio Analytics ────────────────────────────────────── */
export function PortfolioAnalytics() {
  return (
    <div className="space-y-5">
      <PageHead title="Portfolio analytics" sub="Growth, distribution and exposure analysis" />
      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Sector exposure" sub="By current value" action={<PieChart className="h-4 w-4 text-slate-300" />}>
          <ul className="space-y-3.5">
            {ALLOCATION.map((a, i) => (
              <li key={a.label} className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-[3px] bg-accent" style={{ opacity: 1 - i * 0.16 }} />
                <span className="w-32 text-[12.5px] text-slate-500">{a.label}</span>
                <Bar pct={a.pct * 3} className="flex-1" barClass="bg-accent" />
                <span className="w-10 text-right font-mono text-[11.5px] font-semibold text-ink">{a.pct}%</span>
              </li>
            ))}
          </ul>
        </Panel>
        <Panel title="Growth distribution" sub="Portfolio companies by QoQ growth" action={<BarChart3 className="h-4 w-4 text-slate-300" />}>
          <ul className="space-y-3.5">
            {[
              { l: "> 25% QoQ", n: 7, tone: "bg-rise" },
              { l: "15 – 25%", n: 11, tone: "bg-accent" },
              { l: "5 – 15%", n: 12, tone: "bg-accent/60" },
              { l: "0 – 5%", n: 5, tone: "bg-slate-300" },
              { l: "Negative", n: 3, tone: "bg-amber-dim" },
            ].map((g) => (
              <li key={g.l} className="flex items-center gap-3">
                <span className="w-20 text-[12px] text-slate-500">{g.l}</span>
                <div className="h-[7px] flex-1 overflow-hidden rounded-full bg-slate-100">
                  <div className={`h-full rounded-full ${g.tone}`} style={{ width: `${g.n * 8}%` }} />
                </div>
                <span className="w-6 text-right font-mono text-[11.5px] font-semibold text-ink">{g.n}</span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </div>
  );
}

/* ── Deal Analytics ─────────────────────────────────────────── */
export function DealAnalytics() {
  return (
    <div className="space-y-5">
      <PageHead title="Deal analytics" sub="Flow, conversion and source performance" />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="Lead → close rate" value="4.8%" delta="+0.9 pts" icon={Gauge} />
        <StatCard label="Screen pass rate" value="43%" delta="healthy" icon={Gauge} />
        <StatCard label="DD → term rate" value="61%" delta="improving" icon={Gauge} />
        <StatCard label="Avg. close time" value="47 days" delta="-6d vs Q4" icon={Gauge} />
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Conversion funnel" sub="Rolling 12 months">
          <ul className="space-y-3">
            {PIPELINE_STAGE_SUMMARY.slice(0, 8).map((s) => (
              <li key={s.key} className="flex items-center gap-3.5">
                <span className="w-28 truncate text-[12px] font-medium text-slate-600">{s.label}</span>
                <Bar pct={Math.max(6, (s.count / 42) * 100)} className="flex-1" barClass={s.key === "closed" || s.key === "ic" ? "bg-rise" : "bg-accent"} />
                <span className="w-8 text-right font-mono text-[11.5px] font-semibold text-ink">{s.count}</span>
              </li>
            ))}
          </ul>
        </Panel>
        <Panel title="Deal sources" sub="Volume and quality by channel">
          <ul className="space-y-3">
            {DEAL_SOURCES.map((s) => (
              <li key={s.label} className="flex items-center gap-3.5">
                <span className="w-40 text-[12px] font-medium text-slate-600">{s.label}</span>
                <span className="w-8 font-mono text-[11px] text-slate-400">{s.count}</span>
                <Bar pct={s.quality} className="flex-1" barClass={s.quality >= 80 ? "bg-rise" : "bg-accent"} />
                <span className="w-10 text-right font-mono text-[11px] font-semibold text-ink">{s.quality}%</span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </div>
  );
}

/* ── Performance Analytics ──────────────────────────────────── */
export function PerformanceAnalytics() {
  return (
    <div className="space-y-5">
      <PageHead title="Performance analytics" sub="Benchmarked against India seed funds, 2023 vintage" />
      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Fund metrics" sub="Audited · Q4 FY25" action={<Gauge className="h-4 w-4 text-slate-300" />}>
          <ul className="space-y-3.5">
            {FUND_SERIES.map((f) => (
              <li key={f.label} className="flex items-center justify-between">
                <span className="text-[13px] text-slate-500">{f.label}</span>
                <span className="font-mono text-[14px] font-semibold text-ink">{f.value}</span>
              </li>
            ))}
          </ul>
        </Panel>
        <Panel title="Benchmark position" sub="vs. same-vintage funds">
          <ul className="space-y-4">
            {[
              { l: "Top quartile threshold", v: "2.0× TVPI", pct: 96 },
              { l: "Meridian Fund I", v: "2.14× TVPI", pct: 100, you: true },
              { l: "Median fund", v: "1.3× TVPI", pct: 58 },
              { l: "Bottom quartile", v: "0.9× TVPI", pct: 38 },
            ].map((b) => (
              <li key={b.l}>
                <div className="mb-1.5 flex items-center justify-between text-[12px]">
                  <span className={b.you ? "font-semibold text-accent" : "text-slate-500"}>{b.l}</span>
                  <span className="font-mono text-[11px] text-slate-400">{b.v}</span>
                </div>
                <Bar pct={b.pct} barClass={b.you ? "bg-accent" : "bg-slate-200"} />
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </div>
  );
}

/* ── Market Analytics ───────────────────────────────────────── */
export function MarketAnalytics() {
  return (
    <div className="space-y-5">
      <PageHead
        title="Market analytics"
        sub="Industry, funding and startup trends from ecosystem intelligence"
        action={<Chip tone="accent" className="px-3 py-1.5"><Radar className="h-3 w-3" /> Scanning 24 sectors</Chip>}
      />
      <div className="grid gap-4 lg:grid-cols-2">
        {SECTOR_REPORTS.map((s) => (
          <Panel key={s.id} title={s.name} sub={s.read} pad={false}>
            <div className="grid grid-cols-4 divide-x divide-line border-b border-line">
              {[
                { l: "Size", v: s.size },
                { l: "Growth", v: s.growth, green: true },
                { l: "Deals", v: String(s.deals) },
                { l: "Median", v: s.median },
              ].map((m) => (
                <div key={m.l} className="px-4 py-3.5 text-center">
                  <p className={`text-[15px] font-semibold tracking-tight ${m.green ? "text-rise" : "text-ink"}`}>{m.v}</p>
                  <p className="mt-0.5 font-mono text-[8.5px] tracking-[0.12em] text-slate-400 uppercase">{m.l}</p>
                </div>
              ))}
            </div>
            <div className="flex items-end justify-between px-5 py-4">
              <p className="font-mono text-[9px] tracking-[0.16em] text-slate-400 uppercase">12M funding index</p>
              <Spark points={s.spark} className="h-10 w-32" />
            </div>
          </Panel>
        ))}
      </div>
      <Panel title="Latest signals" sub="Opportunities and warnings for your thesis" pad={false}>
        <ul className="divide-y divide-line">
          {SIGNALS.map((sg) => (
            <li key={sg.id} className="flex items-start gap-4 px-5 py-4">
              <Chip tone={sg.good ? "rise" : "amber"} className="mt-0.5 w-28 shrink-0 justify-center">{sg.sector}</Chip>
              <div className="min-w-0 flex-1">
                <p className="text-[13.5px] font-semibold text-ink">{sg.headline}</p>
                <p className="mt-1 line-clamp-2 text-[12.5px] text-slate-500">{sg.summary}</p>
              </div>
              <ArrowUpRight className={`mt-1 h-4 w-4 shrink-0 ${sg.good ? "text-rise" : "rotate-90 text-amber-dim"}`} />
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}

/* ── Reports ────────────────────────────────────────────────── */
export function AnalyticsReports() {
  return (
    <div className="space-y-5">
      <PageHead
        title="Reports"
        sub="Investment, portfolio, deal, market and risk reports — scheduled and on-demand"
        action={<button className="rounded-lg bg-accent px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-accent-deep">+ Custom report</button>}
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { t: "Investment report", d: "Deployment, instrument mix, returns", s: "Auto · monthly" },
          { t: "Portfolio report", d: "Value, health, distribution, risks", s: "Auto · monthly" },
          { t: "Deal flow report", d: "Sources, conversion, velocity", s: "Auto · weekly" },
          { t: "Market report", d: "Sector momentum + signals", s: "Auto · weekly" },
          { t: "Risk report", d: "Open findings + portfolio exposure", s: "Auto · fortnight" },
          { t: "LP quarterly pack", d: "LP letter + valuation + outlook", s: "Draft · Q4 due" },
        ].map((r) => (
          <Panel key={r.t} className="transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft">
            <FileText className="h-5 w-5 text-accent" />
            <h3 className="mt-3 text-[15px] font-semibold text-ink">{r.t}</h3>
            <p className="mt-1 text-[12px] leading-relaxed text-slate-500">{r.d}</p>
            <p className="mt-3 border-t border-line pt-3 font-mono text-[10px] tracking-[0.08em] text-accent uppercase">{r.s}</p>
          </Panel>
        ))}
      </div>
    </div>
  );
}
