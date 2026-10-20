import {
  ArrowRight,
  BadgeIndianRupee,
  CalendarDays,
  FilePlus2,
  Landmark,
  ListChecks,
  Sparkles,
  Stamp,
  Target,
  Zap,
} from "lucide-react";
import { Avatar, Bar, Chip, Panel, ScoreRing, StatCard } from "@/components/app/widgets";
import { PageHead, SubjectBanner } from "@/components/app/boards";
import {
  APPLICATION_ROWS,
  ELIGIBILITY_RULES,
  FUNDING_PROGRAMS,
  GRANTS,
  SCHEME_MATCHES,
  SCHEMES,
} from "../../constants/gov-data";
import { GOV_UPCOMING, GOV_CALENDAR_DAYS } from "../../constants/ops-data";

const PROG_STATUS: Record<string, "rise" | "accent" | "slate"> = {
  Active: "rise", Upcoming: "accent", Draft: "slate", Completed: "slate",
};

/* ── Scheme Management ──────────────────────────────────────── */
export function SchemeManagement() {
  return (
    <div className="space-y-5">
      <PageHead
        title="Scheme management"
        sub="14 live schemes · objectives, beneficiaries, budgets, guidelines"
        action={
          <button className="flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-accent-deep">
            <FilePlus2 className="h-3.5 w-3.5" /> Create scheme
          </button>
        }
      />
      <div className="no-scrollbar flex gap-2 overflow-x-auto">
        {["All", "Active", "Draft", "Upcoming", "Completed"].map((s, i) => (
          <button key={s} className={`shrink-0 rounded-lg border px-3.5 py-2 text-[12.5px] font-semibold ${i === 0 ? "border-accent bg-accent text-white" : "border-line bg-white text-slate-500 hover:text-ink"}`}>{s}</button>
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {SCHEMES.map((s) => (
          <Panel key={s.id} className="transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-[15.5px] font-semibold tracking-[-0.01em] text-ink">{s.name}</h3>
                <p className="mt-1 font-mono text-[9.5px] tracking-[0.1em] text-slate-400 uppercase">{s.window} · closes {s.deadline}</p>
              </div>
              <Chip tone={PROG_STATUS[s.status]}>{s.status}</Chip>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              {[
                { l: "Budget", v: s.budget },
                { l: "Disbursed", v: s.disbursed },
                { l: "Beneficiaries", v: String(s.beneficiaries) },
              ].map((x) => (
                <div key={x.l} className="rounded-lg bg-soft p-2.5">
                  <p className="text-[13px] font-semibold text-ink">{x.v}</p>
                  <p className="mt-0.5 font-mono text-[8px] tracking-[0.1em] text-slate-400 uppercase">{x.l}</p>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <div className="mb-1.5 flex justify-between text-[11px]">
                <span className="text-slate-400">Utilization</span>
                <span className={`font-semibold ${s.utilization < 40 ? "text-amber-dim" : "text-ink"}`}>{s.utilization || "—"}{s.utilization ? "%" : ""}</span>
              </div>
              <Bar pct={s.utilization} barClass={s.utilization < 40 ? "bg-amber-dim" : "bg-accent"} />
            </div>
            <div className="mt-4 flex gap-2 border-t border-line pt-3.5">
              <button className="flex-1 rounded-lg border border-line py-2 text-[12px] font-semibold text-ink hover:bg-soft">Guidelines</button>
              <button className="flex-1 rounded-lg bg-accent py-2 text-[12px] font-semibold text-white hover:bg-accent-deep">Manage</button>
            </div>
          </Panel>
        ))}
      </div>
    </div>
  );
}

/* ── Grant Management ───────────────────────────────────────── */
export function GrantManagement() {
  return (
    <div className="space-y-5">
      <PageHead
        title="Grant management"
        sub="Applications, approvals, disbursement and milestone compliance"
        action={<Chip tone="amber" className="px-3 py-1.5">88 applications pending</Chip>}
      />
      <div className="grid gap-4 lg:grid-cols-3">
        {GRANTS.map((g) => (
          <Panel key={g.id}>
            <h3 className="text-[14.5px] font-semibold text-ink">{g.name}</h3>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              {[
                { l: "Pool", v: g.pool },
                { l: "Approved", v: String(g.approved) },
                { l: "Pending", v: String(g.pending) },
              ].map((x) => (
                <div key={x.l} className="rounded-lg bg-soft p-2.5">
                  <p className="text-[13px] font-semibold text-ink">{x.v}</p>
                  <p className="mt-0.5 font-mono text-[8px] tracking-[0.1em] text-slate-400 uppercase">{x.l}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 space-y-2.5 text-[12px]">
              <div className="flex justify-between"><span className="text-slate-500">Disbursed</span><span className="font-semibold text-ink">{g.disbursed}</span></div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Milestone compliance</span>
                <span className="flex items-center gap-2">
                  <Bar pct={g.compliance} className="w-16" barClass="bg-rise" />
                  <span className="font-mono text-[11px] font-semibold text-rise">{g.compliance}%</span>
                </span>
              </div>
            </div>
          </Panel>
        ))}
      </div>
      <Panel title="Grant lifecycle" sub="Standard flow — every step audit-logged">
        <div className="flex flex-wrap items-center gap-2">
          {["Application", "Eligibility check", "Review", "Approval L2", "Disbursement", "Milestones", "Utilization cert", "Close"].map((s, i) => (
            <span key={s} className="flex items-center gap-2">
              <span className="rounded-lg bg-accent-mist px-3 py-1.5 font-mono text-[10px] font-medium tracking-[0.04em] text-accent">{s}</span>
              {i < 7 && <ArrowRight className="h-3 w-3 text-slate-300" />}
            </span>
          ))}
        </div>
      </Panel>
    </div>
  );
}

/* ── Funding Programs ───────────────────────────────────────── */
export function FundingPrograms() {
  return (
    <div className="space-y-5">
      <PageHead
        title="Funding programs"
        sub="Grants, subsidies, reimbursements and the co-investment window"
        action={<button className="rounded-lg bg-accent px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-accent-deep">+ New program</button>}
      />
      <Panel pad={false}>
        <ul className="divide-y divide-line">
          {FUNDING_PROGRAMS.map((f) => (
            <li key={f.id} className="flex flex-wrap items-center gap-4 px-5 py-4.5 transition-colors hover:bg-soft">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-soft text-accent">
                <BadgeIndianRupee className="h-4.5 w-4.5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[14px] font-semibold text-ink">{f.name}</p>
                <p className="mt-0.5 text-[11.5px] text-slate-400">Limit: {f.limit} · Window: {f.window}</p>
              </div>
              <Chip tone="ink">{f.type}</Chip>
              <Chip tone={f.active ? "rise" : "slate"}>{f.active ? "Active" : "Paused"}</Chip>
              <button className="rounded-lg border border-line px-3.5 py-2 text-[12px] font-semibold text-ink hover:bg-white">Rules</button>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}

/* ── Startup Eligibility ────────────────────────────────────── */
export function StartupEligibility() {
  return (
    <div className="space-y-5">
      <SubjectBanner
        kicker="Eligibility engine"
        title="Rule-based, automated for every application"
        meta="6 rule groups · auto-evaluated against registry + GSTN + IPR desk data"
        score={100}
        action={<Chip tone="rise" className="px-3 py-1.5"><Zap className="h-3 w-3" /> 100% auto-checked today</Chip>}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {ELIGIBILITY_RULES.map((g) => (
          <Panel key={g.group} title={g.group} sub={g.automated}>
            <ul className="space-y-2.5">
              {g.rules.map((r) => (
                <li key={r} className="flex gap-2.5 text-[12.5px] leading-relaxed text-slate-600">
                  <ListChecks className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />{r}
                </li>
              ))}
            </ul>
          </Panel>
        ))}
      </div>
      <div className="rounded-xl border border-rise/20 bg-rise-tint px-5 py-4 text-[13px] text-ink">
        <b className="text-rise">Today:</b> 61 applications auto-screened — 52 eligible,
        6 auto-requested for info, 3 ineligible with reasons issued.
      </div>
    </div>
  );
}

/* ── Startup Matching ───────────────────────────────────────── */
export function StartupMatching() {
  return (
    <div className="space-y-5">
      <PageHead
        title="Startup matching"
        sub="AI matches eligible startups to schemes, grants, funding and challenges"
        action={<Chip tone="accent" className="px-3 py-1.5"><Sparkles className="h-3 w-3" /> 1,840 auto-invites sent this cycle</Chip>}
      />
      <SubjectBanner
        kicker="Match report · CropLens AI"
        title="3 programs scored against registry profile"
        meta="Seed · Agritech · Rangareddy · IP filed · rural-linked pilots"
      />
      <div className="space-y-3">
        {SCHEME_MATCHES.map((m) => (
          <Panel key={m.scheme} className="transition-all duration-300 hover:shadow-soft">
            <div className="flex items-center gap-5">
              <ScoreRing score={m.match} size={52} />
              <div className="min-w-0 flex-1">
                <h3 className="text-[15px] font-semibold text-ink">{m.scheme}</h3>
                <p className="mt-1 text-[12.5px] leading-relaxed text-slate-500">
                  <span className="font-semibold text-accent">Why:</span> {m.reason}
                </p>
              </div>
              <Chip tone={m.match >= 90 ? "rise" : m.match >= 70 ? "accent" : "slate"}>{m.action}</Chip>
            </div>
          </Panel>
        ))}
      </div>
    </div>
  );
}

/* ── Applications ───────────────────────────────────────────── */
const APP_TONE: Record<string, "rise" | "accent" | "amber" | "ink" | "slate"> = {
  New: "accent", "Under Review": "amber", Shortlisted: "accent", Approved: "rise",
  Rejected: "ink", Withdrawn: "slate",
};

export function ApplicationsPage() {
  return (
    <div className="space-y-5">
      <PageHead
        title="Applications"
        sub="All program applications — review, shortlist and approval trail"
        action={<Chip tone="amber" className="px-3 py-1.5">88 pending · SLA day 6</Chip>}
      />
      <div className="no-scrollbar flex gap-2 overflow-x-auto">
        {["All", "New", "Under Review", "Shortlisted", "Approved", "Rejected", "Withdrawn"].map((s, i) => (
          <button key={s} className={`shrink-0 rounded-lg border px-3.5 py-2 text-[12.5px] font-semibold ${i === 0 ? "border-accent bg-accent text-white" : "border-line bg-white text-slate-500 hover:text-ink"}`}>{s}</button>
        ))}
      </div>
      <Panel pad={false}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-left">
            <thead>
              <tr className="border-b border-line">
                {["App ID", "Startup", "Program", "Amount", "Score", "Officer", "Status"].map((h) => (
                  <th key={h} className="px-5 py-3.5 font-mono text-[9.5px] font-medium tracking-[0.16em] text-slate-400 uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {APPLICATION_ROWS.map((a) => (
                <tr key={a.id} className="transition-colors hover:bg-soft">
                  <td className="px-5 py-4 font-mono text-[11px] text-slate-500">{a.id}</td>
                  <td className="px-5 py-4 text-[13px] font-semibold text-ink">{a.startup}</td>
                  <td className="px-5 py-4 text-[12px] text-slate-500">{a.program}</td>
                  <td className="px-5 py-4 text-[12.5px] font-semibold text-ink">{a.amount}</td>
                  <td className="px-5 py-4">
                    <Bar pct={a.score} className="w-16" barClass={a.score >= 80 ? "bg-rise" : a.score >= 60 ? "bg-accent" : "bg-slate-300"} />
                  </td>
                  <td className="px-5 py-4 text-[12px] text-slate-500">{a.officer}</td>
                  <td className="px-5 py-4"><Chip tone={APP_TONE[a.status]}>{a.status}</Chip></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}

/* ── Program Calendar ───────────────────────────────────────── */
const PC_DOT: Record<string, string> = {
  scheme: "bg-accent", grant: "bg-rise", challenge: "bg-amber-dim",
  review: "bg-slate-400", disbursal: "bg-ink", policy: "bg-accent-deep",
};

export function ProgramCalendar() {
  return (
    <div className="space-y-5">
      <PageHead title="Program calendar" sub="Deadlines, reviews, disbursements and milestones · April 2026" />
      <div className="grid gap-4 lg:grid-cols-[1fr_340px]">
        <Panel pad>
          <div className="mb-3 grid grid-cols-7 gap-1.5">
            {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
              <p key={i} className="text-center font-mono text-[9px] tracking-[0.1em] text-slate-400">{d}</p>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1.5">
            {Array.from({ length: 2 }, (_, i) => <span key={`e${i}`} />)}
            {GOV_CALENDAR_DAYS.map((d) => (
              <div key={d.day} className={`flex aspect-square flex-col items-center justify-center rounded-lg border text-[12px] ${d.day === 12 ? "border-accent bg-accent text-white" : d.events.length ? "border-line bg-white hover:bg-accent-mist" : "border-transparent text-slate-400"}`}>
                <span className={d.events.length ? "font-semibold text-ink" : ""}>{d.day}</span>
                <span className="mt-0.5 flex gap-0.5">
                  {d.events.map((e, i) => <span key={i} className={`h-1 w-1 rounded-full ${d.day === 12 ? "bg-white" : PC_DOT[e]}`} />)}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-3 border-t border-line pt-3.5">
            {Object.entries(PC_DOT).map(([k, c]) => (
              <span key={k} className="flex items-center gap-1.5 text-[10.5px] text-slate-500">
                <span className={`h-1.5 w-1.5 rounded-full ${c}`} /> {k}
              </span>
            ))}
          </div>
        </Panel>
        <Panel title="Deadlines & milestones" pad={false}>
          <ul className="divide-y divide-line">
            {GOV_UPCOMING.map((u) => (
              <li key={u.date} className="flex gap-3.5 px-5 py-4">
                <span className="flex w-14 shrink-0 flex-col items-center rounded-lg bg-accent-mist py-2">
                  <span className="font-mono text-[11px] font-bold text-accent">{u.date.split(" ")[1]}</span>
                  <span className="font-mono text-[8px] tracking-[0.1em] text-slate-400 uppercase">{u.date.split(" ")[0]}</span>
                </span>
                <div className="min-w-0">
                  <Chip tone="accent" className="mb-1.5">{u.kind}</Chip>
                  <p className="text-[12.5px] leading-snug font-medium text-ink">{u.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </div>
  );
}
