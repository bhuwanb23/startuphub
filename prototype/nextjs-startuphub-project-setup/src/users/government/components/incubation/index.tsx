import {
  Award,
  Building2,
  GraduationCap,
  Handshake,
  School,
  Search,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Bar, Chip, Panel, StatCard } from "@/components/app/widgets";
import { PageHead } from "@/components/app/boards";
import {
  ACCELERATORS,
  INCUBATOR_PERFORMANCE,
  INCUBATORS,
  PARTNER_GROUPS,
} from "../../constants/gov-data";

const ACCR_TONE: Record<string, "rise" | "accent" | "amber"> = {
  "A+": "rise", A: "accent", "B+": "amber",
};

/* ── Incubator Management ───────────────────────────────────── */
export function IncubatorManagement() {
  return (
    <div className="space-y-5">
      <PageHead
        title="Incubator management"
        sub="68 accredited incubators · capacity, accreditation and compliance"
        action={<button className="rounded-lg bg-accent px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-accent-deep">+ Accredit incubator</button>}
      />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="Accredited incubators" value="68" delta="+4 this FY" icon={School} />
        <StatCard label="Startups supported" value="2,480" delta="active cohorts" icon={Users} />
        <StatCard label="Avg. accreditation" value="A−" delta="framework v4" icon={Award} />
        <StatCard label="Funding routed via incubators" value="₹86 Cr" delta="compliance 96%" icon={ShieldCheck} />
      </div>
      <Panel pad={false}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[840px] text-left">
            <thead>
              <tr className="border-b border-line">
                {["Incubator", "District", "Startups", "Mentors", "Accreditation", "Utilization", "Success rate", "Actions"].map((h) => (
                  <th key={h} className="px-5 py-3.5 font-mono text-[9.5px] font-medium tracking-[0.16em] text-slate-400 uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {INCUBATORS.map((i) => (
                <tr key={i.id} className="transition-colors hover:bg-soft">
                  <td className="px-5 py-4 text-[13px] font-semibold text-ink">{i.name}</td>
                  <td className="px-5 py-4 text-[12px] text-slate-500">{i.district}</td>
                  <td className="px-5 py-4 font-mono text-[12px] text-slate-500">{i.startups}</td>
                  <td className="px-5 py-4 font-mono text-[12px] text-slate-500">{i.mentors}</td>
                  <td className="px-5 py-4"><Chip tone={ACCR_TONE[i.accreditation]}>{i.accreditation}</Chip></td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <Bar pct={i.utilization} className="w-16" barClass={i.utilization < 65 ? "bg-amber-dim" : "bg-accent"} />
                      <span className="font-mono text-[11px] text-ink">{i.utilization}%</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 font-mono text-[11.5px] font-semibold text-rise">{i.success}%</td>
                  <td className="px-5 py-4">
                    <button className="rounded-lg border border-line px-3 py-1.5 text-[11.5px] font-semibold text-ink hover:bg-white">Review</button>
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

/* ── Incubator Directory ────────────────────────────────────── */
export function IncubatorDirectory() {
  return (
    <div className="space-y-5">
      <PageHead title="Incubator directory" sub="Search by district, specialization and capacity" />
      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-line bg-white p-3.5">
        <Search className="ml-2 h-4.5 w-4.5 text-slate-400" />
        <input placeholder='Try "agri Hyderabad A-graded"' className="min-w-[200px] flex-1 bg-transparent text-[14px] text-ink outline-none placeholder:text-slate-400" />
        <button className="rounded-lg bg-accent px-5 py-2.5 text-[13px] font-semibold text-white hover:bg-accent-deep">Search</button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {INCUBATORS.map((i) => (
          <Panel key={i.id} className="transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3.5">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent">
                  <School className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-[15px] font-semibold text-ink">{i.name}</h3>
                  <p className="mt-0.5 font-mono text-[9.5px] tracking-[0.08em] text-slate-400 uppercase">{i.district}</p>
                </div>
              </div>
              <Chip tone={ACCR_TONE[i.accreditation]}>{i.accreditation}</Chip>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              {[
                { l: "Startups", v: String(i.startups) },
                { l: "Mentors", v: String(i.mentors) },
                { l: "Success", v: `${i.success}%` },
              ].map((x) => (
                <div key={x.l} className="rounded-lg bg-soft p-2.5">
                  <p className="text-[12.5px] font-semibold text-ink">{x.v}</p>
                  <p className="mt-0.5 font-mono text-[8px] tracking-[0.1em] text-slate-400 uppercase">{x.l}</p>
                </div>
              ))}
            </div>
          </Panel>
        ))}
      </div>
    </div>
  );
}

/* ── Incubator Performance ──────────────────────────────────── */
export function IncubatorPerformance() {
  const p = INCUBATOR_PERFORMANCE;
  return (
    <div className="space-y-5">
      <PageHead title="Incubator performance" sub="Outcome metrics across the accredited network" />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {[
          { l: "Graduation rate", v: `${p.graduationRate}%` },
          { l: "Program completion", v: `${p.completion}%` },
          { l: "Resource utilization", v: `${p.resourceUtilization}%` },
          { l: "Funding raised by cohorts", v: p.fundingRaised },
          { l: "Jobs created", v: p.jobsCreated },
          { l: "IPR generated", v: p.iprGenerated },
        ].map((x) => (
          <div key={x.l} className="rounded-xl border border-line bg-white p-4 text-center">
            <p className="text-[16px] font-semibold tracking-tight text-ink">{x.v}</p>
            <p className="mt-1 text-[10px] leading-snug text-slate-400">{x.l}</p>
          </div>
        ))}
      </div>
      <Panel title="Success rate by incubator" sub="Graduated startups reaching funded growth stage" pad={false}>
        <ul className="divide-y divide-line">
          {INCUBATORS.map((i) => (
            <li key={i.id} className="flex items-center gap-4 px-5 py-3.5">
              <span className="w-40 text-[12.5px] font-semibold text-ink">{i.name}</span>
              <Bar pct={i.success} className="flex-1" barClass={i.success >= 65 ? "bg-rise" : i.success >= 55 ? "bg-accent" : "bg-amber-dim"} />
              <span className="w-10 text-right font-mono text-[11.5px] font-bold text-ink">{i.success}%</span>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}

/* ── Accelerator Management ─────────────────────────────────── */
export function AcceleratorManagement() {
  return (
    <div className="space-y-5">
      <PageHead title="Accelerator management" sub="Time-bound programs with measured outcomes" />
      <div className="grid gap-4 lg:grid-cols-3">
        {ACCELERATORS.map((a) => (
          <Panel key={a.name} className="transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-rise-tint text-rise">
              <GraduationCap className="h-5 w-5" />
            </span>
            <h3 className="mt-3.5 text-[15px] font-semibold text-ink">{a.name}</h3>
            <p className="mt-0.5 font-mono text-[10px] tracking-[0.08em] text-slate-400 uppercase">{a.district} · {a.focus}</p>
            <div className="mt-4 grid grid-cols-2 gap-2 text-center">
              <div className="rounded-lg bg-soft p-3">
                <p className="text-[15px] font-semibold text-ink">{a.startups}</p>
                <p className="mt-0.5 font-mono text-[8px] tracking-[0.1em] text-slate-400 uppercase">Startups</p>
              </div>
              <div className="rounded-lg bg-rise-tint p-3">
                <p className="text-[11px] leading-snug font-semibold text-rise">{a.outcome}</p>
                <p className="mt-1 font-mono text-[8px] tracking-[0.1em] text-rise/70 uppercase">Outcome</p>
              </div>
            </div>
          </Panel>
        ))}
      </div>
    </div>
  );
}

/* ── Ecosystem Partners ─────────────────────────────────────── */
export function EcosystemPartners() {
  return (
    <div className="space-y-5">
      <PageHead
        title="Ecosystem partners"
        sub="Universities, research institutions, corporates, investors, industry bodies and government partners"
        action={<button className="rounded-lg bg-accent px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-accent-deep">+ Onboard partner</button>}
      />
      <Panel pad={false}>
        <ul className="divide-y divide-line">
          {PARTNER_GROUPS.map((g) => (
            <li key={g.group} className="flex flex-wrap items-center gap-4 px-5 py-4.5 transition-colors hover:bg-soft">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-soft text-accent">
                <Handshake className="h-4.5 w-4.5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[14px] font-semibold text-ink">{g.group}</p>
                <p className="mt-0.5 text-[11.5px] text-slate-400">{g.examples}</p>
              </div>
              <span className="font-mono text-[18px] font-semibold text-accent">{g.count}</span>
              <Chip tone="rise">Active MoUs</Chip>
            </li>
          ))}
        </ul>
      </Panel>
      <div className="rounded-xl border border-accent/20 bg-accent-mist px-5 py-4 text-[13px] leading-relaxed text-ink">
        <b className="text-accent">Partner leverage:</b> 31 corporate pilot corridors and 47
        investor partners are why state startups close seed rounds 22% faster than the
        national median.
      </div>
    </div>
  );
}
