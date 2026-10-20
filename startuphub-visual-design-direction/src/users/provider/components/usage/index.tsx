import {
  AlertTriangle,
  Activity,
  ArrowUpRight,
  Clock3,
  Gauge,
  Star,
  TrendingUp,
  Wrench,
} from "lucide-react";
import { Bar, Chip, Panel, StatCard } from "@/components/app/widgets";
import { PageHead } from "@/components/app/boards";
import {
  FEEDBACK,
  LIVE_SESSIONS,
  RESOURCE_PERFORMANCE,
  SERVICES,
  USAGE_LOG,
  UTILIZATION,
} from "../../constants/provider-data";

/* ── Usage Tracking ─────────────────────────────────────────── */
export function UsageTracking() {
  return (
    <div className="space-y-5">
      <PageHead
        title="Usage tracking"
        sub="Live metered sessions + complete consumption logs"
        action={<Chip tone="rise" className="px-3 py-1.5"><Activity className="h-3 w-3" /> 3 sessions live</Chip>}
      />
      <div className="grid gap-4 lg:grid-cols-3">
        {LIVE_SESSIONS.map((l) => (
          <Panel key={l.startup} className="border-rise/30">
            <div className="flex items-center justify-between">
              <span className="relative flex h-2 w-2"><span className="ping-dot absolute h-full w-full rounded-full bg-rise" /><span className="relative h-2 w-2 rounded-full bg-rise" /></span>
              <span className="font-mono text-[11px] font-semibold text-ink">{l.meter}</span>
            </div>
            <h3 className="mt-3 text-[15px] font-semibold text-ink">{l.startup}</h3>
            <p className="mt-0.5 text-[11.5px] text-slate-400">{l.resource}</p>
            <div className="mt-3.5 flex justify-between border-t border-line pt-3 font-mono text-[10.5px] text-slate-400">
              <span>STARTED {l.since.toUpperCase()}</span>
              <span>{l.hours}H METERED</span>
            </div>
          </Panel>
        ))}
      </div>
      <Panel title="Consumption log" sub="Last 6 metered entries" pad={false}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px] text-left">
            <thead>
              <tr className="border-b border-line">
                {["Date", "Startup", "Resource", "Hours", "Amount"].map((h) => (
                  <th key={h} className="px-5 py-3.5 font-mono text-[9.5px] font-medium tracking-[0.16em] text-slate-400 uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {USAGE_LOG.map((u) => (
                <tr key={`${u.date}-${u.startup}`} className="transition-colors hover:bg-soft">
                  <td className="px-5 py-4 font-mono text-[11px] text-slate-400">{u.date}</td>
                  <td className="px-5 py-4 text-[13px] font-semibold text-ink">{u.startup}</td>
                  <td className="px-5 py-4 text-[12.5px] text-slate-600">{u.resource}</td>
                  <td className="px-5 py-4 font-mono text-[12px] text-slate-500">{u.hours}h</td>
                  <td className="px-5 py-4 font-mono text-[12px] font-semibold text-ink">{u.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
      <Panel title="Top consumers this month" sub="By metered amount">
        <ul className="space-y-3">
          {[
            { n: "CropLens AI", v: 92, amt: "₹42.1K" },
            { n: "NeuroNest", v: 68, amt: "₹31.4K" },
            { n: "PathPilot", v: 54, amt: "plan-based" },
            { n: "ReJoule Energy", v: 41, amt: "₹18.6K" },
          ].map((s) => (
            <li key={s.n} className="flex items-center gap-3">
              <span className="w-36 text-[12.5px] font-medium text-slate-600">{s.n}</span>
              <Bar pct={s.v} className="flex-1" />
              <span className="w-16 text-right font-mono text-[11.5px] font-semibold text-ink">{s.amt}</span>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}

/* ── Resource Utilization ───────────────────────────────────── */
export function ResourceUtilization() {
  const max = Math.max(...UTILIZATION.map((u) => u.util));
  return (
    <div className="space-y-5">
      <PageHead
        title="Resource utilization"
        sub="Capacity usage, idle units and peak windows per resource"
        action={<Chip tone="amber" className="px-3 py-1.5"><AlertTriangle className="h-3 w-3" /> 2 resources under 55%</Chip>}
      />
      <Panel title="Utilization heat" sub="Rolling 30 days" pad={false}>
        <ul className="divide-y divide-line">
          {UTILIZATION.map((u) => (
            <li key={u.resource} className="flex items-center gap-4 px-5 py-4">
              <span className={`flex h-10 w-10 items-center justify-center rounded-lg font-mono text-[12px] font-bold ${u.util === max ? "bg-rise text-white" : u.util >= 60 ? "bg-accent-soft text-accent" : "bg-amber-tint text-amber-dim"}`}>
                {u.util}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-semibold text-ink">{u.resource}</p>
                <p className="font-mono text-[9.5px] tracking-[0.06em] text-slate-400 uppercase">Idle: {u.idle}</p>
              </div>
              <span className="text-[11.5px] text-slate-500">{u.peak}</span>
              <Bar pct={u.util} className="w-24" barClass={u.util >= 85 ? "bg-rise" : u.util >= 60 ? "bg-accent" : "bg-amber-dim"} />
            </li>
          ))}
        </ul>
      </Panel>
      <Panel title="Peak usage pattern" sub="Metered hours by day · this week">
        <div className="flex h-32 items-end gap-3">
          {[
            { d: "Mon", h: 42 }, { d: "Tue", h: 58 }, { d: "Wed", h: 66 },
            { d: "Thu", h: 61 }, { d: "Fri", h: 74 }, { d: "Sat", h: 38 }, { d: "Sun", h: 22 },
          ].map((x) => (
            <div key={x.d} className="group relative flex-1">
              <div className={`w-full rounded-t-md transition-all group-hover:opacity-80 ${x.h === 74 ? "bg-rise" : "bg-accent/30"}`} style={{ height: `${(x.h / 74) * 118 + 6}px` }} />
              <p className="mt-1.5 text-center font-mono text-[9.5px] text-slate-400">{x.d}</p>
            </div>
          ))}
        </div>
        <p className="mt-3 text-[11.5px] text-slate-400">
          Fridays peak at 74 metered hours — weekend offload packages could lift Sat/Sun by ~40%.
        </p>
      </Panel>
    </div>
  );
}

/* ── Resource Performance ───────────────────────────────────── */
export function ResourcePerformance() {
  return (
    <div className="space-y-5">
      <PageHead
        title="Resource performance"
        sub="Composite score: demand, bookings, usage, revenue, rating and downtime"
        action={<Gauge className="h-4 w-4 text-slate-300" />}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {RESOURCE_PERFORMANCE.map((r) => (
          <Panel key={r.resource} className="transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-[15px] font-semibold text-ink">{r.resource}</h3>
                <p className="mt-1 flex items-center gap-1.5 text-[11.5px] text-slate-400">
                  <Star className="h-3 w-3 fill-amber-dim/20 text-amber-dim" /> {r.rating} · {r.bookings30} bookings/30d
                </p>
              </div>
              <span className={`flex h-11 w-11 items-center justify-center rounded-xl font-mono text-[13px] font-bold ${r.score >= 90 ? "bg-rise text-white" : r.score >= 80 ? "bg-accent text-white" : "bg-amber-dim text-white"}`}>
                {r.score}
              </span>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              <div className="rounded-lg bg-soft p-2.5">
                <p className="text-[12.5px] font-semibold text-ink">{r.revenue}</p>
                <p className="mt-0.5 font-mono text-[8px] tracking-[0.1em] text-slate-400 uppercase">Revenue</p>
              </div>
              <div className="rounded-lg bg-soft p-2.5">
                <p className="text-[12.5px] font-semibold text-ink">{r.downtime}%</p>
                <p className="mt-0.5 font-mono text-[8px] tracking-[0.1em] text-slate-400 uppercase">Downtime</p>
              </div>
              <div className="rounded-lg bg-soft p-2.5">
                <p className="text-[12.5px] font-semibold text-rise">
                  <TrendingUp className="mr-0.5 inline h-3 w-3" />
                  {r.score >= 90 ? "+12%" : r.score >= 80 ? "+6%" : "+2%"}
                </p>
                <p className="mt-0.5 font-mono text-[8px] tracking-[0.1em] text-slate-400 uppercase">Trend</p>
              </div>
            </div>
          </Panel>
        ))}
      </div>
    </div>
  );
}

/* ── Service Management ─────────────────────────────────────── */
export function ServiceManagement() {
  return (
    <div className="space-y-5">
      <PageHead
        title="Service management"
        sub="Staff-backed services attached to resources — schedule, delivery and quality"
        action={<Wrench className="h-4 w-4 text-slate-300" />}
      />
      <Panel pad={false}>
        <ul className="divide-y divide-line">
          {SERVICES.map((s) => (
            <li key={s.name} className="flex flex-wrap items-center gap-4 px-5 py-4.5 transition-colors hover:bg-soft">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-soft text-accent">
                <Wrench className="h-4.5 w-4.5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[14px] font-semibold text-ink">{s.name}</p>
                <p className="mt-0.5 text-[11.5px] text-slate-400">{s.schedule}</p>
              </div>
              <span className="text-[12px] text-slate-500">{s.staff}</span>
              <Chip tone="rise">{s.active} active</Chip>
              <span className="flex items-center gap-1 font-mono text-[12px] font-semibold text-ink">
                <Star className="h-3.5 w-3.5 fill-amber-dim/20 text-amber-dim" /> {s.quality}
              </span>
            </li>
          ))}
        </ul>
      </Panel>
      <Panel title="Service requests" sub="Queue for staffed services">
        <ul className="space-y-2.5 text-[12.5px]">
          {[
            { t: "Qwron — cleanroom technician for Apr 08 run", s: "Assigned · D. Rao" },
            { t: "ReJoule — bench-witness for third-party verification", s: "Pending assignment" },
            { t: "Zephyr — BVLOS safety officer Apr 14–15", s: "Confirmed · R. Chandran" },
          ].map((r) => (
            <li key={r.t} className="flex items-center justify-between gap-3 rounded-lg border border-line px-3.5 py-3">
              <span className="text-ink">{r.t}</span>
              <Chip tone={r.s.startsWith("Pending") ? "amber" : "rise"}>{r.s}</Chip>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}

/* ── Service Feedback ───────────────────────────────────────── */
export function ServiceFeedback() {
  const dist = [82, 16, 1, 1, 0];
  return (
    <div className="space-y-5">
      <PageHead title="Service feedback" sub="Ratings, reviews and complaints from startups" />
      <div className="grid gap-4 lg:grid-cols-3">
        <Panel title="Rating summary" sub="214 reviews lifetime">
          <div className="flex items-end gap-4">
            <p className="text-[44px] leading-none font-semibold tracking-[-0.04em] text-ink">4.8</p>
            <div className="pb-1">
              <div className="flex text-amber-dim">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-amber-dim/30" />)}
              </div>
              <p className="mt-1 text-[11px] text-slate-400">Excellent</p>
            </div>
          </div>
          <ul className="mt-5 space-y-2">
            {dist.map((v, i) => (
              <li key={i} className="flex items-center gap-2.5 text-[11px] text-slate-400">
                <span className="w-6">{5 - i}★</span>
                <Bar pct={v} className="flex-1" barClass="bg-amber-dim" />
                <span className="w-8 text-right font-mono">{v}%</span>
              </li>
            ))}
          </ul>
        </Panel>
        <Panel title="Actionable takeaways" sub="Themes from reviews" className="lg:col-span-2">
          <ul className="space-y-2.5 text-[12.5px] text-slate-600">
            <li className="flex gap-2.5 rounded-lg border border-rise/20 bg-rise-tint p-3.5"><ArrowUpRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-rise" /> Night GPU windows and response time drive most 5★ reviews — protect them.</li>
            <li className="flex gap-2.5 rounded-lg border border-accent/20 bg-accent-mist p-3.5"><AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" /> Saturday half-slots for battery benches requested ×3 — pilot next month.</li>
            <li className="flex gap-2.5 rounded-lg border border-amber-dim/20 bg-amber-tint p-3.5"><AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-dim" /> Demo Suite 2 AC incident — preventive maintenance logged, apology credit issued.</li>
          </ul>
        </Panel>
      </div>
      <Panel title="Recent reviews" pad={false}>
        <ul className="divide-y divide-line">
          {FEEDBACK.map((f) => (
            <li key={`${f.startup}-${f.date}`} className="px-5 py-4">
              <div className="flex items-center gap-2.5">
                <span className="flex text-amber-dim">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-3 w-3 ${i < f.rating ? "fill-amber-dim/40" : "fill-slate-200"}`} />
                  ))}
                </span>
                <span className="text-[12px] font-semibold text-ink">{f.startup}</span>
                <span className="font-mono text-[9.5px] text-slate-400">{f.date} · {f.resource}</span>
              </div>
              <p className="mt-1.5 text-[12.5px] leading-relaxed text-slate-600">&quot;{f.text}&quot;</p>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}
