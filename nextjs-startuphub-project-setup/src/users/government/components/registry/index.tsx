import {
  Award,
  Building2,
  CheckCircle2,
  Clock3,
  Download,
  Filter,
  Flag,
  Rocket,
  Search,
  ShieldCheck,
  Stamp,
  Users,
} from "lucide-react";
import { Avatar, Bar, Chip, Panel, Spark, StatCard } from "@/components/app/widgets";
import { PageHead, StatusIcon, SubjectBanner } from "@/components/app/boards";
import {
  PROFILE_SUBJECT,
  QUEUE,
  REGISTRY,
  REGISTRY_ANALYTICS,
  VERIFICATION_SUBJECT,
  type RegistryStatus,
} from "../../constants/gov-data";

const STATUS_TONE: Record<RegistryStatus, "rise" | "amber" | "accent" | "ink" | "slate"> = {
  Verified: "rise", Pending: "amber", "Under Review": "accent", "Info Requested": "amber",
  Rejected: "ink", Suspended: "slate", Graduated: "rise",
};

/* ── Startup Registry ───────────────────────────────────────── */
export function StartupRegistry() {
  return (
    <div className="space-y-5">
      <PageHead
        title="Startup registry"
        sub="12,480 registered · 8,214 verified · 38 in queue"
        action={<button className="rounded-lg bg-accent px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-accent-deep">+ Register startup</button>}
      />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="Registered" value="12,480" delta="+412 this month" icon={Rocket} />
        <StatCard label="Verified" value="8,214" delta="66% of registered" icon={ShieldCheck} />
        <StatCard label="Pending verification" value="412" delta="avg 6.2 days" icon={Clock3} deltaGood={false} />
        <StatCard label="Graduated" value="1,204" delta="outgrown support" icon={Award} />
      </div>

      <div className="no-scrollbar flex gap-2 overflow-x-auto">
        {["All", "Registered", "Verified", "Pending", "Under Review", "Info Requested", "Rejected", "Suspended", "Graduated", "Inactive"].map((s, i) => (
          <button key={s} className={`shrink-0 rounded-lg border px-3.5 py-2 text-[12.5px] font-semibold ${i === 0 ? "border-accent bg-accent text-white" : "border-line bg-white text-slate-500 hover:text-ink"}`}>{s}</button>
        ))}
      </div>

      <Panel pad={false}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left">
            <thead>
              <tr className="border-b border-line">
                {["Startup ID", "Startup", "Sector", "District", "Stage", "Employees", "Registered", "Schemes", "Status"].map((h) => (
                  <th key={h} className="px-5 py-3.5 font-mono text-[9.5px] font-medium tracking-[0.16em] text-slate-400 uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {REGISTRY.map((r) => (
                <tr key={r.id} className="transition-colors hover:bg-soft">
                  <td className="px-5 py-4 font-mono text-[11px] text-slate-500">{r.id}</td>
                  <td className="px-5 py-4 text-[13px] font-semibold text-ink">{r.name}</td>
                  <td className="px-5 py-4 text-[12px] text-slate-500">{r.sector}</td>
                  <td className="px-5 py-4 text-[12px] text-slate-500">{r.district}</td>
                  <td className="px-5 py-4"><Chip tone="ink">{r.stage}</Chip></td>
                  <td className="px-5 py-4 font-mono text-[12px] text-slate-500">{r.employees}</td>
                  <td className="px-5 py-4 font-mono text-[11px] text-slate-400">{r.registered}</td>
                  <td className="px-5 py-4">
                    {r.schemes > 0 ? <Chip tone="accent">{r.schemes} enrolled</Chip> : <span className="text-[11px] text-slate-400">—</span>}
                  </td>
                  <td className="px-5 py-4"><Chip tone={STATUS_TONE[r.status]}>{r.status}</Chip></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}

/* ── Startup Discovery ──────────────────────────────────────── */
export function RegistryDiscovery() {
  const groups = [
    { g: "Industry", o: ["HealthTech", "FinTech", "Agritech", "ClimateTech"] },
    { g: "Stage", o: ["Ideation", "Pre-seed", "Seed", "Series A+"] },
    { g: "Location", o: ["Hyderabad", "Rangareddy", "Warangal", "All districts"] },
    { g: "Scheme participation", o: ["Enrolled", "Grant beneficiary", "Challenge winner"] },
    { g: "IPR", o: ["Filed", "Granted"] },
  ];
  return (
    <div className="space-y-5">
      <PageHead title="Startup discovery" sub="Search the full state registry with registry-linked filters" />
      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-line bg-white p-3.5">
        <Search className="ml-2 h-4.5 w-4.5 text-slate-400" />
        <input placeholder='Search name, ID, sector… e.g. "agritech Warangal seed verified"' className="min-w-[220px] flex-1 bg-transparent text-[14px] text-ink outline-none placeholder:text-slate-400" />
        <button className="flex items-center gap-1.5 rounded-lg border border-line px-3.5 py-2.5 text-[12.5px] font-semibold text-ink hover:bg-soft">
          <Filter className="h-3.5 w-3.5 text-slate-400" /> Advanced
        </button>
        <button className="rounded-lg bg-accent px-5 py-2.5 text-[13px] font-semibold text-white hover:bg-accent-deep">Search</button>
      </div>

      <Panel pad>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          {groups.map((f) => (
            <div key={f.g} className="flex items-center gap-2">
              <span className="text-[11px] font-semibold text-slate-500">{f.g}</span>
              <div className="flex gap-1">
                {f.o.slice(0, 3).map((o) => <Chip key={o} tone="line" className="cursor-pointer hover:border-accent/40 hover:text-accent">{o}</Chip>)}
              </div>
            </div>
          ))}
        </div>
      </Panel>

      <p className="text-[12.5px] text-slate-400">2,214 startups match current filters</p>

      <Panel pad={false}>
        <ul className="divide-y divide-line">
          {REGISTRY.filter((r) => r.status !== "Suspended").slice(0, 6).map((r) => (
            <li key={r.id} className="flex flex-wrap items-center gap-4 px-5 py-4 transition-colors hover:bg-soft">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-soft text-[12px] font-bold text-accent">{r.name.slice(0, 2)}</span>
              <div className="min-w-0 flex-1">
                <p className="text-[13.5px] font-semibold text-ink">{r.name}</p>
                <p className="text-[11.5px] text-slate-400">{r.sector} · {r.district} · {r.employees} employees</p>
              </div>
              <span className="font-mono text-[10.5px] text-slate-400">{r.id}</span>
              <Chip tone={STATUS_TONE[r.status]}>{r.status}</Chip>
              <a href="/government/registry/profiles" className="text-[12px] font-semibold text-accent">Profile →</a>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}

/* ── Startup Verification ───────────────────────────────────── */
export function StartupVerification() {
  const v = VERIFICATION_SUBJECT;
  const clear = v.checks.filter((c) => c.status === "Clear").length;
  return (
    <div className="space-y-5">
      <SubjectBanner
        kicker={`Verification · ${v.id}`}
        title={v.name}
        meta={`${v.checks.length} statutory checks · ${clear} clear · ${v.sla} SLA`}
        score={Math.round((clear / v.checks.length) * 100)}
        action={
          <div className="flex gap-2">
            <button className="rounded-lg bg-rise px-4 py-2.5 text-[13px] font-semibold text-white hover:opacity-90">Approve</button>
            <button className="rounded-lg border border-line bg-white px-4 py-2.5 text-[13px] font-semibold text-ink hover:bg-soft">Request info</button>
          </div>
        }
      />
      <Panel title="Verification checks" sub="Six statutory verifications per state SOP v8" pad={false}>
        <ul className="divide-y divide-line">
          {v.checks.map((c) => (
            <li key={c.check} className="flex items-start gap-3.5 px-5 py-4">
              <StatusIcon kind={c.status.toLowerCase() as "clear"} />
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-semibold text-ink">{c.check}</p>
                <p className="mt-0.5 text-[12px] text-slate-500">{c.note}</p>
              </div>
              <Chip tone={c.status === "Clear" ? "rise" : c.status === "Pending" ? "slate" : "amber"}>{c.status}</Chip>
            </li>
          ))}
        </ul>
      </Panel>
      <div className="rounded-xl border border-amber-dim/25 bg-amber-tint px-5 py-4 text-[13px] leading-relaxed text-ink">
        <b className="text-amber-dim">Escalation note:</b> the eligibility turnover document
        predates the incorporation window. Request clarification before approval — one
        certified copy outstanding.
      </div>
    </div>
  );
}

/* ── Startup Profiles ───────────────────────────────────────── */
export function StartupProfiles() {
  const p = PROFILE_SUBJECT;
  return (
    <div className="space-y-5">
      <SubjectBanner
        kicker={`Registry profile · ${p.id}`}
        title={p.name}
        meta={`${p.sector} · ${p.district} · ${p.since}`}
        score={88}
        action={<Chip tone="rise" className="px-3 py-1.5"><ShieldCheck className="h-3 w-3" /> Verified</Chip>}
      />
      <div className="grid gap-4 lg:grid-cols-3">
        <Panel title="Overview" className="lg:col-span-2">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-4 text-[13px]">
            {[
              ["Founders", p.founders.join(" · ")],
              ["Stage", p.stage],
              ["Employees", String(p.employees)],
              ["Revenue", p.revenue],
              ["Funding raised", p.funding],
              ["IPR", p.ipr],
              ["Incubator", p.incubator],
              ["Registry documents", `${p.docs} files`],
            ].map(([k, val]) => (
              <div key={k}>
                <dt className="font-mono text-[9px] tracking-[0.14em] text-slate-400 uppercase">{k}</dt>
                <dd className="mt-1 font-medium text-ink">{val}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-5 border-t border-line pt-4">
            <p className="mb-2 font-mono text-[9px] tracking-[0.18em] text-slate-400 uppercase">Growth</p>
            <Spark points={[12, 18, 16, 24, 30, 38, 44, 52, 61, 68]} className="h-10 w-40" />
          </div>
        </Panel>
        <div className="space-y-4">
          <Panel title="Schemes enrolled" action={<Stamp className="h-4 w-4 text-slate-300" />}>
            <ul className="space-y-2">
              {p.schemes.map((s) => (
                <li key={s} className="rounded-lg border border-line px-3.5 py-2.5 text-[12.5px] font-medium text-ink">{s}</li>
              ))}
            </ul>
          </Panel>
          <Panel title="Grants received">
            <p className="text-[16px] font-semibold text-accent">{p.grants}</p>
            <Bar pct={86} className="mt-3" />
            <p className="mt-2 text-[11px] text-slate-400">Milestone utilization on track</p>
          </Panel>
        </div>
      </div>
    </div>
  );
}

/* ── Verification Queue ─────────────────────────────────────── */
export function VerificationQueue() {
  return (
    <div className="space-y-5">
      <PageHead
        title="Verification queue"
        sub="38 requests · oldest first · SLA 10 days"
        action={<Chip tone="amber" className="px-3 py-1.5"><Flag className="h-3 w-3" /> 2 approaching SLA</Chip>}
      />
      <Panel pad={false}>
        <ul className="divide-y divide-line">
          {QUEUE.map((q) => (
            <li key={q.id} className="flex flex-wrap items-center gap-4 px-5 py-4 transition-colors hover:bg-soft">
              <span className={`flex h-9 w-9 items-center justify-center rounded-lg font-mono text-[11px] font-bold ${parseInt(q.age) >= 5 ? "bg-amber-tint text-amber-dim" : "bg-accent-soft text-accent"}`}>
                {q.age}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[13.5px] font-semibold text-ink">{q.name}</p>
                <p className="mt-0.5 font-mono text-[9.5px] tracking-[0.06em] text-slate-400 uppercase">{q.id} · {q.review}</p>
              </div>
              <Chip tone={q.risk === "Low" ? "rise" : "amber"}>{q.risk} risk</Chip>
              <div className="flex gap-2">
                <a href="/government/registry/verification" className="rounded-lg bg-accent px-3.5 py-2 text-[12px] font-semibold text-white hover:bg-accent-deep">Review</a>
                <button className="rounded-lg border border-line px-3.5 py-2 text-[12px] font-semibold text-ink hover:bg-white">Escalate</button>
              </div>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}

/* ── Registry Analytics ─────────────────────────────────────── */
export function RegistryAnalytics() {
  const a = REGISTRY_ANALYTICS;
  return (
    <div className="space-y-5">
      <PageHead title="Registry analytics" sub="Registration + verification trends and distribution" />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="Verification pass rate" value={`${a.verificationPass}%`} delta="+3 pts QoQ" icon={ShieldCheck} />
        <StatCard label="Avg. verification time" value={a.avgTime} delta="-0.8d vs Q4" icon={Clock3} />
        <StatCard label="Active share" value={`${a.activeSplit.active}%`} delta="healthy churn" icon={Rocket} />
        <StatCard label="New this FY" value="4,110" delta="+23% YoY" icon={Users} />
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Sector distribution" sub="All registered startups">
          <ul className="space-y-3">
            {a.sectorDist.map((d) => (
              <li key={d.label} className="flex items-center gap-3">
                <span className="w-24 text-[12px] text-slate-500">{d.label}</span>
                <Bar pct={d.pct * 4} className="flex-1" />
                <span className="w-8 text-right font-mono text-[11px] font-semibold text-ink">{d.pct}%</span>
              </li>
            ))}
          </ul>
        </Panel>
        <Panel title="Regional distribution" sub="By district of incorporation">
          <ul className="space-y-3">
            {a.districtDist.map((d) => (
              <li key={d.label} className="flex items-center gap-3">
                <span className="w-24 text-[12px] text-slate-500">{d.label}</span>
                <Bar pct={d.pct * 2.1} className="flex-1" barClass="bg-rise" />
                <span className="w-8 text-right font-mono text-[11px] font-semibold text-ink">{d.pct}%</span>
              </li>
            ))}
          </ul>
          <div className="mt-5 border-t border-line pt-4">
            <p className="mb-2.5 font-mono text-[9px] tracking-[0.18em] text-slate-400 uppercase">Stage distribution</p>
            <div className="flex gap-1.5">
              {a.stageDist.map((s) => (
                <div key={s.label} className="flex-1">
                  <Bar pct={s.pct * 3} />
                  <p className="mt-1.5 text-center text-[10px] text-slate-400">{s.label}</p>
                  <p className="text-center font-mono text-[11px] font-semibold text-ink">{s.pct}%</p>
                </div>
              ))}
            </div>
          </div>
        </Panel>
      </div>
    </div>
  );
}
