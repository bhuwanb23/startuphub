import {
  ArrowUpRight,
  Banknote,
  BarChart3,
  Clock3,
  Download,
  FileText,
  Gauge,
  Package,
  Rocket,
  Star,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { Bar, Chip, Panel, Spark, StatCard } from "@/components/app/widgets";
import { PageHead } from "@/components/app/boards";
import {
  EARNINGS_BY_RESOURCE,
  EARNINGS_SERIES,
  PEAK_WEEK,
  RESOURCE_PERFORMANCE,
  TOP_CUSTOMERS,
} from "../../constants/provider-data";

/* ── Provider Analytics ─────────────────────────────────────── */
export function ProviderAnalytics() {
  return (
    <div className="space-y-5">
      <PageHead title="Provider analytics" sub="Your operation in numbers — growth, customers and performance" />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="Resource units" value="24" delta="8 listings" icon={Package} />
        <StatCard label="Customers served" value="96" delta="+14 this quarter" icon={Rocket} />
        <StatCard label="Bookings (12M)" value="441" delta="+22% YoY" icon={Clock3} />
        <StatCard label="Rating" value="4.8" delta="214 reviews" icon={Star} />
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Customer growth" sub="Active startups per month">
          <Spark points={[52, 58, 61, 66, 71, 74, 82, 86, 89, 92, 94, 96]} className="h-16 w-full" />
          <p className="mt-3 text-[12px] text-slate-500">Customer count nearly doubled in 12 months — repeat rate 68%.</p>
        </Panel>
        <Panel title="Performance composite" sub="Across all resources">
          <ul className="space-y-3.5">
            {[
              { l: "Utilization", v: 73, t: "+6 pts MoM" },
              { l: "Booking conversion", v: 84, t: "request → booking" },
              { l: "On-time delivery", v: 97, t: "sessions started as booked" },
              { l: "Collection rate", v: 94, t: "invoices paid on time" },
            ].map((x) => (
              <li key={x.l} className="flex items-center gap-3">
                <span className="w-36 text-[12.5px] text-slate-500">{x.l}</span>
                <Bar pct={x.v} className="flex-1" barClass={x.v >= 90 ? "bg-rise" : "bg-accent"} />
                <span className="w-24 text-right text-[10.5px] font-medium text-slate-500">{x.t}</span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </div>
  );
}

/* ── Resource Analytics ─────────────────────────────────────── */
export function ResourceAnalytics() {
  return (
    <div className="space-y-5">
      <PageHead title="Resource analytics" sub="Per-resource demand, bookings, revenue and comparison" />
      <Panel pad={false}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left">
            <thead>
              <tr className="border-b border-line">
                {["Resource", "Score", "Bookings/30d", "Revenue", "Rating", "Downtime"].map((h) => (
                  <th key={h} className="px-5 py-3.5 font-mono text-[9.5px] font-medium tracking-[0.16em] text-slate-400 uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {RESOURCE_PERFORMANCE.map((r) => (
                <tr key={r.resource} className="transition-colors hover:bg-soft">
                  <td className="px-5 py-4 text-[13px] font-semibold text-ink">{r.resource}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <Bar pct={r.score} className="w-16" barClass={r.score >= 90 ? "bg-rise" : "bg-accent"} />
                      <span className="font-mono text-[11px] font-semibold text-ink">{r.score}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 font-mono text-[12px] text-slate-500">{r.bookings30}</td>
                  <td className="px-5 py-4 font-mono text-[12.5px] font-semibold text-ink">{r.revenue}</td>
                  <td className="px-5 py-4 font-mono text-[12px] text-slate-500">{r.rating}★</td>
                  <td className="px-5 py-4 font-mono text-[12px] text-slate-500">{r.downtime}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
      <div className="rounded-xl border border-accent/20 bg-accent-mist px-5 py-4 text-[13px] leading-relaxed text-ink">
        <b className="text-accent">Invest:</b> GPU compute and battery benches score 90+ at 74–91%
        utilization — expanding both beats any other capital option on score-per-rupee.
      </div>
    </div>
  );
}

/* ── Usage Analytics ────────────────────────────────────────── */
export function UsageAnalytics() {
  const max = Math.max(...PEAK_WEEK);
  return (
    <div className="space-y-5">
      <PageHead title="Usage analytics" sub="When and how capacity gets consumed" />
      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Peak pattern" sub="Metered hours by weekday">
          <div className="flex h-36 items-end gap-2.5">
            {PEAK_WEEK.map((v, i) => (
              <div key={i} className="flex-1">
                <div className={`w-full rounded-t-md ${v === max ? "bg-rise" : "bg-accent/30"}`} style={{ height: `${(v / max) * 128 + 6}px` }} />
                <p className="mt-1.5 text-center font-mono text-[9px] text-slate-400">{"MTWTFSS"[i]}</p>
              </div>
            ))}
          </div>
        </Panel>
        <Panel title="Usage by category" sub="Share of metered hours · 30d">
          <ul className="space-y-3">
            {[
              { l: "Compute", pct: 38 }, { l: "Testing / Lab", pct: 27 },
              { l: "Equipment", pct: 16 }, { l: "Workspace", pct: 11 },
              { l: "Facility", pct: 6 }, { l: "Services", pct: 2 },
            ].map((c) => (
              <li key={c.l} className="flex items-center gap-3">
                <span className="w-24 text-[12px] text-slate-500">{c.l}</span>
                <Bar pct={c.pct * 2.5} className="flex-1" />
                <span className="w-9 text-right font-mono text-[11px] font-semibold text-ink">{c.pct}%</span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
      <Panel title="Capacity analysis" sub="Idle-hours by week">
        <Spark points={[38, 34, 41, 36, 29, 31, 26, 28, 24, 27, 22, 27]} good={false} className="h-14 w-full" />
        <p className="mt-2 text-[12px] text-slate-500">
          Idle hours thinned from 38 → 27 per week as packages filled weekends — target 20.
        </p>
      </Panel>
    </div>
  );
}

/* ── Revenue Analytics ──────────────────────────────────────── */
export function RevenueAnalytics() {
  return (
    <div className="space-y-5">
      <PageHead title="Revenue analytics" sub="Where money comes from and where it's stuck" />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="FY26 revenue" value="₹48.6 L" delta="+31% YoY" icon={Banknote} />
        <StatCard label="MRR (packages)" value="₹2.1 L" delta="45 subscribers" icon={Wallet} />
        <StatCard label="Pending" value="₹1.8 L" delta="1 overdue" icon={Clock3} deltaGood={false} />
        <StatCard label="Refund rate" value="0.9%" delta="healthy" icon={TrendingUp} />
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Revenue by resource" sub="FY26 to date">
          <ul className="space-y-3">
            {EARNINGS_BY_RESOURCE.map((e) => (
              <li key={e.resource} className="flex items-center gap-3">
                <span className="w-32 text-[12px] text-slate-500">{e.resource}</span>
                <Bar pct={e.pct} className="flex-1" barClass="bg-accent" />
                <span className="w-14 text-right font-mono text-[11.5px] font-semibold text-ink">{e.v}</span>
              </li>
            ))}
          </ul>
        </Panel>
        <Panel title="Monthly trend" sub="₹ L / month · 12M">
          <Spark points={EARNINGS_SERIES} className="h-24 w-full" />
          <div className="mt-4 grid grid-cols-3 gap-3 text-center">
            {[
              { l: "Best month", v: "Oct · ₹4.8 L" },
              { l: "Trajectory", v: "+12% q/q" },
              { l: "Forecast Apr", v: "₹4.6 L" },
            ].map((x) => (
              <div key={x.l} className="rounded-lg bg-soft p-3">
                <p className="text-[12px] font-semibold text-ink">{x.v}</p>
                <p className="mt-0.5 font-mono text-[8.5px] tracking-[0.1em] text-slate-400 uppercase">{x.l}</p>
              </div>
            ))}
          </div>
        </Panel>
      </div>
      <Panel title="Top customers" sub="FY26 spend · treat them as accounts, not bookings" pad={false}>
        <ul className="divide-y divide-line">
          {TOP_CUSTOMERS.map((c) => (
            <li key={c.startup} className="flex items-center gap-4 px-5 py-3.5 transition-colors hover:bg-soft">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-soft text-[11px] font-bold text-accent">{c.startup.slice(0, 2)}</span>
              <span className="flex-1 text-[13px] font-semibold text-ink">{c.startup}</span>
              <span className="font-mono text-[11px] text-slate-400">{c.sessions} sessions</span>
              <span className="font-mono text-[12px] font-semibold text-ink">{c.spent}</span>
              <Chip tone="rise">{c.trend}</Chip>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}

/* ── Performance Reports ────────────────────────────────────── */
export function PerformanceReports() {
  return (
    <div className="space-y-5">
      <PageHead
        title="Performance reports"
        sub="Resource, usage, booking, revenue, customer and service reports"
        action={<BarChart3 className="h-4 w-4 text-slate-300" />}
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { t: "Resource report", d: "Performance score + utilization per unit", s: "Auto · weekly" },
          { t: "Usage report", d: "Metered hours by startup and category", s: "Auto · weekly" },
          { t: "Booking report", d: "Conversion, cancellations, no-shows", s: "Auto · monthly" },
          { t: "Revenue report", d: "Earnings, MRR, aging and refunds", s: "Auto · monthly" },
          { t: "Customer report", d: "Top accounts, repeat rate, churn risk", s: "Auto · quarterly" },
          { t: "Service quality report", d: "Ratings, complaints, staff metrics", s: "Apr 2026" },
        ].map((r) => (
          <Panel key={r.t} className="transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft">
            <FileText className="h-5 w-5 text-accent" />
            <h3 className="mt-3 text-[15px] font-semibold text-ink">{r.t}</h3>
            <p className="mt-1 text-[12px] leading-relaxed text-slate-500">{r.d}</p>
            <div className="mt-4 flex items-center justify-between border-t border-line pt-3">
              <span className="font-mono text-[10px] tracking-[0.08em] text-accent uppercase">{r.s}</span>
              <button aria-label="Download" className="flex h-7.5 w-7.5 items-center justify-center rounded-lg border border-line text-slate-400 hover:border-accent/40 hover:text-accent">
                <Download className="h-3.5 w-3.5" />
              </button>
            </div>
          </Panel>
        ))}
      </div>
    </div>
  );
}
