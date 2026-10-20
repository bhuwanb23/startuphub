import {
  AlertTriangle,
  ArrowUpRight,
  Banknote,
  Briefcase,
  CircleDollarSign,
  Download,
  FileText,
  Gauge,
  HeartPulse,
  PieChart,
  Send,
  TrendingUp,
} from "lucide-react";
import { Bar, Chip, Panel, Spark, StatCard } from "@/components/app/widgets";
import { PageHead } from "../shared/boards";
import {
  ALLOCATION,
  FUND_SERIES,
  LP_REPORTS,
  PORTFOLIO,
} from "../../constants/investor-data";
import {
  COMPANY_KPI,
  MONITORING_FEED,
  PORTFOLIO_EVENTS,
  PORTFOLIO_RISKS,
} from "../../constants/ops-data";

const HEALTH_TONE = { Strong: "rise", Stable: "accent", Watch: "amber" } as const;
const LEVEL_TONE = { High: "amber", Medium: "accent", Low: "rise" } as const;

/* ── Portfolio Overview ─────────────────────────────────────── */
export function PortfolioOverview() {
  const r = 52;
  const c = 2 * Math.PI * r;
  let acc = 0;
  return (
    <div className="space-y-5">
      <PageHead title="Portfolio overview" sub="38 companies · ₹132.6 Cr current value" />
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <StatCard label="Portfolio value" value="₹132.6 Cr" delta="+22% YoY" icon={Briefcase} />
        <StatCard label="Invested capital" value="₹86.4 Cr" delta="72% deployed" icon={Banknote} />
        <StatCard label="Returns (gross)" value="2.14× MOIC" delta="top quartile" icon={TrendingUp} />
        <StatCard label="Realized (DPI)" value="₹36.2 Cr" delta="+₹3.2 Cr Mar" icon={CircleDollarSign} />
      </div>

      <div className="grid gap-4 lg:grid-cols-5">
        <Panel title="Distribution" sub="By current value" className="lg:col-span-2">
          <div className="flex items-center gap-6">
            <svg viewBox="0 0 140 140" className="h-36 w-36 shrink-0 -rotate-90">
              <circle cx="70" cy="70" r={r} fill="none" stroke="#edf1fe" strokeWidth="16" />
              {ALLOCATION.map((a, i) => {
                const seg = (a.pct / 100) * c;
                const dash = `${seg} ${c - seg}`;
                const offset = -(acc / 100) * c;
                acc += a.pct;
                return (
                  <circle key={a.label} cx="70" cy="70" r={r} fill="none" stroke="#3157e8"
                    strokeOpacity={1 - i * 0.16} strokeWidth="16" strokeDasharray={dash} strokeDashoffset={offset} />
                );
              })}
              <text x="70" y="66" textAnchor="middle" transform="rotate(90 70 70)" className="fill-ink text-[17px] font-bold">38</text>
              <text x="70" y="80" textAnchor="middle" transform="rotate(90 70 70)" className="fill-slate-400 text-[8px] tracking-widest">COMPANIES</text>
            </svg>
            <ul className="flex-1 space-y-2.5">
              {ALLOCATION.map((a, i) => (
                <li key={a.label} className="flex items-center gap-2.5">
                  <span className="h-2.5 w-2.5 rounded-[3px] bg-accent" style={{ opacity: 1 - i * 0.16 }} />
                  <span className="flex-1 text-[12px] text-slate-500">{a.label}</span>
                  <span className="font-mono text-[11.5px] font-semibold text-ink">{a.pct}%</span>
                </li>
              ))}
            </ul>
          </div>
        </Panel>

        <Panel title="Portfolio health" sub="Health + risk posture" className="lg:col-span-3" action={<HeartPulse className="h-4 w-4 text-slate-300" />}>
          <div className="grid grid-cols-3 gap-3">
            {[
              { l: "Strong", n: 18, tone: "rise" },
              { l: "Stable", n: 16, tone: "accent" },
              { l: "Watch", n: 4, tone: "amber" },
            ].map((h) => (
              <div key={h.l} className={`rounded-xl border p-4 text-center ${h.tone === "rise" ? "border-rise/20 bg-rise-tint" : h.tone === "accent" ? "border-accent/20 bg-accent-mist" : "border-amber-dim/20 bg-amber-tint"}`}>
                <p className={`text-[24px] font-semibold ${h.tone === "rise" ? "text-rise" : h.tone === "accent" ? "text-accent" : "text-amber-dim"}`}>{h.n}</p>
                <p className="mt-0.5 font-mono text-[9px] tracking-[0.14em] text-slate-500 uppercase">{h.l}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 space-y-2.5">
            {PORTFOLIO_RISKS.slice(0, 3).map((rk) => (
              <div key={rk.company} className="flex items-center gap-3 rounded-lg border border-line p-3">
                <AlertTriangle className={`h-3.5 w-3.5 shrink-0 ${rk.level === "High" ? "text-amber-dim" : "text-accent"}`} />
                <p className="flex-1 text-[12px] text-ink"><b>{rk.company}:</b> {rk.detail}</p>
                <Chip tone={LEVEL_TONE[rk.level as keyof typeof LEVEL_TONE]}>{rk.level}</Chip>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <Panel title="Valuation summary" sub="Peer quartile: Q1 · audited Q4 FY25">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {FUND_SERIES.map((f) => (
            <div key={f.label} className="rounded-lg border border-line p-4 text-center">
              <p className="font-mono text-[9.5px] tracking-[0.16em] text-slate-400 uppercase">{f.label}</p>
              <p className="mt-1.5 text-[20px] font-semibold tracking-tight text-ink">{f.value}</p>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

/* ── Portfolio Companies ────────────────────────────────────── */
export function PortfolioCompanies() {
  return (
    <div className="space-y-5">
      <PageHead
        title="Portfolio companies"
        sub="All · Active · High growth · At risk · Underperforming · Exited"
        action={<button className="rounded-lg border border-line bg-white px-4 py-2.5 text-[13px] font-semibold text-ink hover:bg-soft">Export CSV</button>}
      />
      <div className="no-scrollbar flex gap-2 overflow-x-auto">
        {["All", "Active", "High growth", "At risk", "Underperforming", "Exited"].map((f, i) => (
          <button key={f} className={`shrink-0 rounded-lg border px-3.5 py-2 text-[12.5px] font-semibold ${i === 0 ? "border-accent bg-accent text-white" : "border-line bg-white text-slate-500 hover:text-ink"}`}>{f}</button>
        ))}
      </div>
      <Panel pad={false}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[880px] text-left">
            <thead>
              <tr className="border-b border-line">
                {["Company", "Stage", "Invested", "Current value", "Multiple", "Growth", "Health", "Next round"].map((h) => (
                  <th key={h} className="px-5 py-3.5 font-mono text-[9.5px] font-medium tracking-[0.16em] text-slate-400 uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {PORTFOLIO.map((p) => (
                <tr key={p.id} className="transition-colors hover:bg-soft">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-[11px] font-bold text-accent">{p.name.slice(0, 2)}</span>
                      <div>
                        <p className="text-[13px] font-semibold text-ink">{p.name}</p>
                        <p className="text-[10.5px] text-slate-400">{p.sector}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4"><Chip tone="ink">{p.stage}</Chip></td>
                  <td className="px-5 py-4 text-[12.5px] text-slate-500">{p.invested}</td>
                  <td className="px-5 py-4 text-[12.5px] font-semibold text-ink">{p.value}</td>
                  <td className="px-5 py-4 font-mono text-[12px] text-slate-500">{p.multiple}×</td>
                  <td className="px-5 py-4 text-[12px] font-medium text-rise">{p.growth}</td>
                  <td className="px-5 py-4"><Chip tone={HEALTH_TONE[p.health] as "rise"}>{p.health}</Chip></td>
                  <td className="px-5 py-4 text-[11.5px] text-slate-500">{p.nextRound}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}

/* ── Portfolio Monitoring ───────────────────────────────────── */
export function PortfolioMonitoring() {
  return (
    <div className="space-y-5">
      <PageHead
        title="Portfolio monitoring"
        sub="KPI, financial, product, market, funding, team and IPR updates — one feed"
        action={<Chip tone="rise" className="px-3 py-1.5">Cadence: monthly KPIs</Chip>}
      />
      <div className="no-scrollbar flex gap-2 overflow-x-auto">
        {["All", "KPI", "Financial", "Product", "Market", "Funding", "Team", "IPR", "Risk"].map((f, i) => (
          <button key={f} className={`shrink-0 rounded-lg border px-3.5 py-2 text-[12.5px] font-semibold ${i === 0 ? "border-accent bg-accent text-white" : "border-line bg-white text-slate-500 hover:text-ink"}`}>{f}</button>
        ))}
      </div>
      <Panel pad={false}>
        <ul className="divide-y divide-line">
          {MONITORING_FEED.map((f, i) => (
            <li key={i} className="flex items-start gap-4 px-5 py-4 transition-colors hover:bg-soft">
              <Chip tone={f.type === "Risk" ? "amber" : f.good ? "rise" : "accent"} className="mt-0.5 w-20 shrink-0 justify-center">{f.type}</Chip>
              <div className="min-w-0 flex-1">
                <p className="text-[13px] leading-snug text-ink"><b>{f.company}</b> — {f.text}</p>
                <p className="mt-1 font-mono text-[9px] tracking-[0.1em] text-slate-400 uppercase">{f.time} ago</p>
              </div>
              {!f.good && <AlertTriangle className="h-4 w-4 shrink-0 text-amber-dim" />}
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}

/* ── Startup Performance ────────────────────────────────────── */
export function StartupPerformance() {
  const k = COMPANY_KPI;
  const max = Math.max(...k.series);
  return (
    <div className="space-y-5">
      <PageHead
        title="Startup performance"
        sub={`${k.name} · deepest position in the book (3.6×)`}
        action={
          <div className="flex gap-2">
            {["Averia Health", "Terragrid", "Zephyr"].map((c, i) => (
              <button key={c} className={`rounded-lg border px-3 py-2 text-[12px] font-semibold ${i === 0 ? "border-accent bg-accent text-white" : "border-line bg-white text-slate-500"}`}>{c}</button>
            ))}
          </div>
        }
      />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {k.kpis.map((x) => (
          <div key={x.label} className="rounded-xl border border-line bg-white p-4">
            <p className="font-mono text-[9px] tracking-[0.16em] text-slate-400 uppercase">{x.label}</p>
            <p className="mt-1.5 text-[19px] font-semibold tracking-tight text-ink">{x.value}</p>
            <p className="mt-1 font-mono text-[10px] font-medium text-rise">{x.delta}</p>
          </div>
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        <Panel title="Revenue trend" sub="MRR, ₹ L · 19 months" className="lg:col-span-2">
          <div className="flex h-44 items-end gap-1">
            {k.series.map((v, i) => (
              <div key={i} className="group relative flex-1">
                <div className={`w-full rounded-t-sm transition-all group-hover:opacity-80 ${i >= k.series.length - 5 ? "bg-accent" : "bg-accent/25"}`} style={{ height: `${(v / max) * 168 + 4}px` }} />
                <span className="pointer-events-none absolute -top-6 left-1/2 -translate-x-1/2 rounded bg-ink px-1.5 py-0.5 font-mono text-[9px] text-white opacity-0 transition-opacity group-hover:opacity-100">{v}</span>
              </div>
            ))}
          </div>
          <div className="mt-2 flex justify-between font-mono text-[9px] text-slate-400">
            <span>Sep'24</span><span>Jun'25</span><span>Mar'26</span>
          </div>
        </Panel>
        <Panel title="Milestones" sub="Recent company events">
          <ul className="space-y-3.5">
            {k.events.map((e) => (
              <li key={e.date} className="flex gap-3">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-accent" />
                <div>
                  <p className="font-mono text-[10px] text-slate-400">{e.date}</p>
                  <p className="mt-0.5 text-[12.5px] font-medium text-ink">{e.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </div>
  );
}

/* ── Portfolio Risks ────────────────────────────────────────── */
export function PortfolioRisks() {
  return (
    <div className="space-y-5">
      <PageHead
        title="Portfolio risks"
        sub="High-risk companies and mitigation track"
        action={<Chip tone="amber" className="px-3 py-1.5"><AlertTriangle className="h-3 w-3" /> 1 high-severity</Chip>}
      />
      <Panel pad={false}>
        <ul className="divide-y divide-line">
          {PORTFOLIO_RISKS.map((r) => (
            <li key={r.company} className="grid items-center gap-3 px-5 py-4.5 transition-colors hover:bg-soft sm:grid-cols-[150px_1fr_auto]">
              <div>
                <p className="text-[14px] font-semibold text-ink">{r.company}</p>
                <p className="font-mono text-[9.5px] tracking-[0.1em] text-slate-400 uppercase">{r.area} risk</p>
              </div>
              <div>
                <p className="text-[12.5px] text-slate-600">{r.detail}</p>
                <p className="mt-1 text-[12px] font-medium text-accent">→ {r.action}</p>
              </div>
              <Chip tone={LEVEL_TONE[r.level as keyof typeof LEVEL_TONE]}>{r.level}</Chip>
            </li>
          ))}
        </ul>
      </Panel>
      <Panel title="Risk trend" sub="Open risk items over 6 months">
        <Spark points={[6, 5, 7, 5, 4, 4]} good className="h-12 w-40" />
        <p className="mt-2 text-[12.5px] text-slate-500">
          Net exposure declining — NomadPay bridge decision on Apr 02 is the swing factor.
        </p>
      </Panel>
    </div>
  );
}

/* ── Portfolio Events ───────────────────────────────────────── */
export function PortfolioEvents() {
  return (
    <div className="space-y-5">
      <PageHead title="Portfolio events" sub="Funding rounds, launches, partnerships and reporting windows" />
      <Panel pad={false}>
        <ul className="divide-y divide-line">
          {PORTFOLIO_EVENTS.map((e) => (
            <li key={e.date + e.company} className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-soft">
              <span className="flex w-14 shrink-0 flex-col items-center rounded-lg bg-accent-mist py-2">
                <span className="font-mono text-[12px] font-bold text-accent">{e.date.split(" ")[1]}</span>
                <span className="font-mono text-[9px] tracking-[0.1em] text-slate-400 uppercase">{e.date.split(" ")[0]}</span>
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[13.5px] font-semibold text-ink">{e.text}</p>
                <p className="mt-0.5 text-[11.5px] text-slate-400">{e.company}</p>
              </div>
              <Chip tone="accent">{e.kind}</Chip>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}

/* ── Portfolio Reports ──────────────────────────────────────── */
export function PortfolioReports() {
  return (
    <div className="space-y-5">
      <PageHead
        title="Portfolio reports"
        sub="Company, quarterly, annual, performance and risk reports"
        action={
          <button className="flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-accent-deep">
            <Send className="h-3.5 w-3.5" /> Send update
          </button>
        }
      />
      <Panel pad={false}>
        <ul className="divide-y divide-line">
          {LP_REPORTS.map((r) => (
            <li key={r.id} className="group flex items-center gap-4 px-5 py-4.5 transition-colors hover:bg-soft">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
                <FileText className="h-4.5 w-4.5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[14px] font-semibold text-ink">{r.title}</p>
                <p className="mt-0.5 font-mono text-[9.5px] tracking-[0.08em] text-slate-400 uppercase">
                  {r.period} · {r.pages > 0 ? `${r.pages} pages · ` : ""}{r.updated}
                </p>
              </div>
              <Chip tone={r.status === "Published" ? "rise" : r.status === "Draft" ? "amber" : "slate"}>{r.status}</Chip>
              <button aria-label="Download" className="flex h-9 w-9 items-center justify-center rounded-lg border border-line text-slate-400 transition-colors hover:border-accent/40 hover:text-accent">
                <Download className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}
