import {
  AlertTriangle,
  ArrowRight,
  Banknote,
  Boxes,
  Landmark,
  ShieldCheck,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { Bar, Chip, Panel, StatCard } from "@/components/app/widgets";
import { PageHead } from "@/components/app/boards";
import {
  ALLOCATION_TRACKING,
  FUNDING_BY_DISTRICT,
  FUNDING_BY_SCHEME,
  FUNDING_SUMMARY,
  RESOURCE_POOL,
  UTILIZATION_ROWS,
} from "../../constants/gov-data";

const UTL_TONE: Record<string, "rise" | "accent" | "amber"> = {
  Healthy: "rise", Watch: "accent", Under: "amber",
};
const TRK_TONE: Record<string, "rise" | "accent" | "amber"> = {
  "On track": "rise", "Pending approval": "accent", Delayed: "amber",
};

/* ── Funding Overview ───────────────────────────────────────── */
export function FundingOverview() {
  const f = FUNDING_SUMMARY;
  return (
    <div className="space-y-5">
      <PageHead title="Funding overview" sub="₹420 Cr FY26 allocation across schemes, regions and sectors" />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-5">
        <StatCard label="Total allocated" value={f.allocated} icon={Landmark} sub="FY26 budget" />
        <StatCard label="Disbursed" value={f.disbursed} delta={`${f.disbursementRate}%`} icon={Banknote} />
        <StatCard label="Utilized" value={f.utilized} delta={`${f.utilizationRate}% of disbursed`} icon={TrendingUp} />
        <StatCard label="Pending" value={f.pending} icon={Wallet} sub="approved, awaiting milestone" deltaGood={false} />
        <StatCard label="Remaining unallocated" value={f.remaining} icon={Wallet} sub="for H2 windows" deltaGood={false} />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="By scheme" sub="Allocated vs disbursed (₹ Cr)">
          <ul className="space-y-4">
            {FUNDING_BY_SCHEME.map((s) => (
              <li key={s.label}>
                <div className="mb-1.5 flex justify-between text-[12px]">
                  <span className="font-medium text-slate-600">{s.label}</span>
                  <span className="font-mono text-[11px] text-slate-400">₹{s.v} · ₹{s.disbursed}</span>
                </div>
                <div className="relative h-[7px] overflow-hidden rounded-full bg-slate-100">
                  <div className="absolute h-full rounded-full bg-accent/30" style={{ width: `${s.v}%` }} />
                  <div className="absolute h-full rounded-full bg-accent" style={{ width: `${s.disbursed}%` }} />
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-[11px] text-slate-400">Light = allocated · solid = disbursed</p>
        </Panel>

        <Panel title="By district" sub="Disbursed share">
          <ul className="space-y-3">
            {FUNDING_BY_DISTRICT.map((d) => (
              <li key={d.label} className="flex items-center gap-3">
                <span className="w-24 text-[12px] text-slate-500">{d.label}</span>
                <Bar pct={d.pct * 2} className="flex-1" barClass="bg-rise" />
                <span className="w-9 text-right font-mono text-[11.5px] font-semibold text-ink">{d.pct}%</span>
              </li>
            ))}
          </ul>
          <div className="mt-5 rounded-lg bg-accent-mist p-3.5 text-[12px] leading-relaxed text-ink">
            Hyderabad + Rangareddy hold 63% of disbursements — steering requested a
            tier-2 rebalance plan (see Gap Analysis).
          </div>
        </Panel>
      </div>
    </div>
  );
}

/* ── Grant Allocation ───────────────────────────────────────── */
export function GrantAllocation() {
  return (
    <div className="space-y-5">
      <PageHead
        title="Grant allocation"
        sub="Plans, approvals, disbursement schedules and remaining balances"
        action={<button className="rounded-lg bg-accent px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-accent-deep">+ New allocation plan</button>}
      />
      <div className="grid gap-4 lg:grid-cols-3">
        {FUNDING_BY_SCHEME.slice(0, 3).map((s) => (
          <Panel key={s.label}>
            <h3 className="text-[14.5px] font-semibold text-ink">{s.label}</h3>
            <div className="mt-4 grid grid-cols-2 gap-2 text-center">
              <div className="rounded-lg bg-soft p-3">
                <p className="text-[15px] font-semibold text-ink">₹{s.v} Cr</p>
                <p className="mt-0.5 font-mono text-[8px] tracking-[0.1em] text-slate-400 uppercase">Approved allocation</p>
              </div>
              <div className="rounded-lg bg-soft p-3">
                <p className="text-[15px] font-semibold text-accent">₹{s.v - s.disbursed} Cr</p>
                <p className="mt-0.5 font-mono text-[8px] tracking-[0.1em] text-slate-400 uppercase">Remaining balance</p>
              </div>
            </div>
            <div className="mt-4">
              <div className="mb-1.5 flex justify-between text-[11px]">
                <span className="text-slate-400">Disbursed ₹{s.disbursed} Cr</span>
                <span className="font-semibold text-ink">{Math.round((s.disbursed / s.v) * 100)}%</span>
              </div>
              <Bar pct={(s.disbursed / s.v) * 100} />
            </div>
          </Panel>
        ))}
      </div>
      <Panel title="Allocation history" sub="Latest 4 committee approvals" pad={false}>
        <ul className="divide-y divide-line text-[12.5px]">
          {[
            { t: "Cohort 07 tranche M2 approved — Seed Ignition", d: "Mar 26", v: "₹4.2 Cr" },
            { t: "DeepTech lab-access allocation approved", d: "Mar 21", v: "₹6.0 Cr" },
            { t: "Rural fellowship field review tranche", d: "Mar 14", v: "₹2.4 Cr" },
            { t: "SIDBI match — credit-linked subsidy", d: "Mar 04", v: "₹8.8 Cr" },
          ].map((h) => (
            <li key={h.t} className="flex items-center justify-between px-5 py-3.5">
              <span className="text-ink">{h.t}</span>
              <span className="flex items-center gap-4">
                <span className="font-mono font-semibold text-ink">{h.v}</span>
                <span className="font-mono text-[10px] text-slate-400">{h.d}</span>
              </span>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}

/* ── Resource Allocation ────────────────────────────────────── */
export function ResourceAllocation() {
  return (
    <div className="space-y-5">
      <PageHead
        title="Resource allocation"
        sub="Non-monetary support: lab hours, cloud credits, benches, expert time"
        action={<Chip tone="accent" className="px-3 py-1.5"><Boxes className="h-3 w-3" /> 41 open requests</Chip>}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {RESOURCE_POOL.map((r) => (
          <Panel key={r.resource}>
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-[15px] font-semibold text-ink">{r.resource}</h3>
                <p className="mt-0.5 text-[11.5px] text-slate-400">via {r.partner}</p>
              </div>
              <span className="font-mono text-[14px] font-semibold text-accent">{r.allocated}</span>
            </div>
            <div className="mt-4">
              <div className="mb-1.5 flex justify-between text-[11px]">
                <span className="text-slate-400">Utilized</span>
                <span className={`font-semibold ${r.used < 65 ? "text-amber-dim" : "text-ink"}`}>{r.used}%</span>
              </div>
              <Bar pct={r.used} barClass={r.used < 65 ? "bg-amber-dim" : "bg-accent"} />
            </div>
          </Panel>
        ))}
      </div>
      <Panel title="Request queue" sub="Latest resource requests from incubators" pad={false}>
        <ul className="divide-y divide-line text-[12.5px]">
          {[
            { t: "Health Launchpad — 400 lab hrs (pathology bench)", s: "Approved", d: "Mar 26" },
            { t: "Zero-to-One Studio — cloud credit top-up ₹18L", s: "Pending", d: "Mar 24" },
            { t: "Climate Foundry — battery test bench access", s: "Approved", d: "Mar 21" },
            { t: "AgriTech Hub — IPR expert hours (80 hrs)", s: "Approved", d: "Mar 19" },
          ].map((q) => (
            <li key={q.t} className="flex items-center justify-between px-5 py-3.5">
              <span className="text-ink">{q.t}</span>
              <span className="flex items-center gap-3">
                <Chip tone={q.s === "Approved" ? "rise" : "amber"}>{q.s}</Chip>
                <span className="font-mono text-[10px] text-slate-400">{q.d}</span>
              </span>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}

/* ── Fund Utilization ───────────────────────────────────────── */
export function FundUtilization() {
  return (
    <div className="space-y-5">
      <PageHead
        title="Fund utilization"
        sub="Program, regional and sector-level utilization with under-utilization alerts"
        action={<Chip tone="amber" className="px-3 py-1.5"><AlertTriangle className="h-3 w-3" /> 1 program under 40%</Chip>}
      />
      <Panel pad={false}>
        <ul className="divide-y divide-line">
          {UTILIZATION_ROWS.map((u) => (
            <li key={u.area} className="flex items-center gap-4 px-5 py-4">
              <span className="w-48 text-[13px] font-semibold text-ink">{u.area}</span>
              <Bar pct={u.rate} className="flex-1" barClass={UTL_TONE[u.status] === "amber" ? "bg-amber-dim" : UTL_TONE[u.status] === "rise" ? "bg-rise" : "bg-accent"} />
              <span className="w-10 text-right font-mono text-[12px] font-bold text-ink">{u.rate}%</span>
              <Chip tone={UTL_TONE[u.status]}>{u.status}</Chip>
              {u.status === "Under" && (
                <a href="/government/policy/recommendations" className="flex items-center gap-1 text-[11.5px] font-semibold text-accent">
                  Fix <ArrowRight className="h-3 w-3" />
                </a>
              )}
            </li>
          ))}
        </ul>
      </Panel>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-amber-dim/25 bg-amber-tint p-5 text-[13px] leading-relaxed text-ink">
          <b className="text-amber-dim">Rural window (Seed Ignition):</b> 34% utilization with
          6 weeks to close. System auto-suggested conversion to fellowship-with-mentors —
          already a P1 policy recommendation.
        </div>
        <div className="rounded-xl border border-rise/20 bg-rise-tint p-5 text-[13px] leading-relaxed text-ink">
          <b className="text-rise">Overutilization watch:</b> Challenge pools at 88% — a
          mid-year top-up request of ₹4 Cr is drafted for steering review on Apr 18.
        </div>
      </div>
    </div>
  );
}

/* ── Allocation Tracking ────────────────────────────────────── */
export function AllocationTracking() {
  return (
    <div className="space-y-5">
      <PageHead
        title="Allocation tracking"
        sub="Milestone-based disbursements, pending approvals and audit trail"
        action={<Chip tone="rise" className="px-3 py-1.5"><ShieldCheck className="h-3 w-3" /> PFMS rail linked</Chip>}
      />
      <Panel pad={false}>
        <ul className="divide-y divide-line">
          {ALLOCATION_TRACKING.map((a) => (
            <li key={a.id} className="flex flex-wrap items-center gap-4 px-5 py-4.5 transition-colors hover:bg-soft">
              <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${a.status === "On track" ? "bg-rise" : a.status === "Delayed" ? "bg-amber-dim" : "bg-accent"}`} />
              <div className="min-w-0 flex-1">
                <p className="text-[13.5px] font-semibold text-ink">{a.program}</p>
                <p className="mt-0.5 text-[11.5px] text-slate-400">{a.milestone}</p>
              </div>
              <span className="font-mono text-[10.5px] text-slate-400">{a.id}</span>
              <span className="font-mono text-[13px] font-semibold text-ink">{a.amount}</span>
              <span className="font-mono text-[10.5px] text-slate-400">due {a.date}</span>
              <Chip tone={TRK_TONE[a.status]}>{a.status}</Chip>
            </li>
          ))}
        </ul>
      </Panel>
      <Panel title="Approval trail" sub="Every disbursement is L2/L3 gated and logged">
        <ul className="space-y-2.5 text-[12.5px] text-slate-600">
          <li>· AL-0538 approved by Mission Director — Today 11:42 (DeepTech Fund ₹6.0 Cr)</li>
          <li>· AL-0551 pending L2 counter-sign — Rural review attached</li>
          <li>· Auditor (ext.) has read-only access to this ledger — last review Mar 25</li>
        </ul>
      </Panel>
    </div>
  );
}
