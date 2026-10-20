import {
  AlertTriangle,
  Cpu,
  IndianRupee,
  ShieldCheck,
  TrendingUp,
  Users,
} from "lucide-react";
import { Avatar, Bar, Chip, Panel, Spark } from "@/components/app/widgets";
import { PageHead, SubjectBanner } from "@/components/app/boards";
import {
  FIN_ANALYSIS,
  IP_ASSESSMENT,
  RISK_MATRIX,
  RISK_SUMMARY,
  TEAM_ANALYSIS,
  TECH_ASSESSMENT,
} from "../../constants/evaluation-data";

const LEVEL_TONE = { High: "amber", Medium: "accent", Low: "rise" } as const;

/* ── Financial Analysis ─────────────────────────────────────── */
export function FinancialAnalysis() {
  const f = FIN_ANALYSIS;
  const max = Math.max(...f.revenueSeries);
  return (
    <div className="space-y-5">
      <PageHead title="Financial analysis" sub="PathPilot · FY25 actuals + modelled trajectory" />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {f.kpis.map((k) => (
          <div key={k.label} className="rounded-xl border border-line bg-white p-4">
            <p className="font-mono text-[9px] tracking-[0.16em] text-slate-400 uppercase">{k.label}</p>
            <p className="mt-1.5 text-[18px] font-semibold tracking-tight text-ink">{k.value}</p>
            <p className={`mt-1 font-mono text-[10px] font-medium ${k.good ? "text-rise" : "text-amber-dim"}`}>{k.delta}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-5">
        <Panel title="Revenue trajectory" sub="MRR, ₹ L · 16 months" className="lg:col-span-3">
          <div className="flex h-40 items-end gap-1.5">
            {f.revenueSeries.map((v, i) => (
              <div key={i} className="group relative flex-1">
                <div
                  className={`w-full rounded-t-md transition-all duration-300 group-hover:opacity-80 ${i >= f.revenueSeries.length - 4 ? "bg-accent" : "bg-accent/25"}`}
                  style={{ height: `${(v / max) * 150 + 6}px` }}
                />
                <span className="pointer-events-none absolute -top-6 left-1/2 -translate-x-1/2 rounded bg-ink px-1.5 py-0.5 font-mono text-[9px] text-white opacity-0 transition-opacity group-hover:opacity-100">
                  {v}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-2 flex justify-between font-mono text-[9px] text-slate-400">
            <span>Nov&apos;24</span><span>Jun&apos;25</span><span>Feb&apos;26</span>
          </div>
        </Panel>

        <Panel title="Scenario analysis" sub="Revenue + margin, FY26/FY27" className="lg:col-span-2">
          <ul className="space-y-2.5">
            {f.scenarios.map((s) => (
              <li key={s.name} className="rounded-lg border border-line p-3.5">
                <div className="flex items-center justify-between">
                  <Chip tone={s.name === "Base" ? "accent" : s.name === "Bull" ? "rise" : "slate"}>{s.name}</Chip>
                  <span className="font-mono text-[11px] text-slate-400">GM {s.margin}</span>
                </div>
                <p className="mt-2 text-[13px] font-semibold text-ink">FY26 {s.rev26} · FY27 {s.rev27}</p>
                <p className="mt-0.5 text-[11.5px] text-slate-500">{s.note}</p>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <Panel title="Analyst notes" sub="Flags requiring term-sheet structure" action={<IndianRupee className="h-4 w-4 text-slate-300" />}>
        <ul className="grid gap-3 sm:grid-cols-2">
          {f.notes.map((n) => (
            <li key={n} className="flex gap-2.5 rounded-lg border border-line p-3.5 text-[12.5px] leading-relaxed text-slate-600">
              <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-dim" />{n}
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}

/* ── Team Analysis ──────────────────────────────────────────── */
export function TeamAnalysis() {
  const t = TEAM_ANALYSIS;
  const total = t.composition.reduce((a, c) => a + c.count, 0);
  return (
    <div className="space-y-5">
      <PageHead title="Team analysis" sub="Founder-market fit, composition and hiring risk" />

      <div className="grid gap-4 lg:grid-cols-3">
        {t.founders.map((f) => (
          <Panel key={f.name} className="transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft">
            <div className="flex items-center gap-3.5">
              <Avatar label={f.name.split(" ").map((x) => x[0]).join("").slice(0, 2)} className="h-11 w-11 rounded-xl bg-ink text-[13px] text-white" />
              <div>
                <h3 className="text-[15px] font-semibold text-ink">{f.name}</h3>
                <p className="font-mono text-[10px] tracking-[0.1em] text-accent uppercase">{f.role}</p>
              </div>
            </div>
            <p className="mt-3 text-[12.5px] leading-relaxed text-slate-500">{f.background}</p>
            <div className="mt-3.5 flex items-center gap-2.5">
              <Bar pct={f.fit} className="flex-1" />
              <span className="font-mono text-[11px] font-bold text-rise">{f.fit} fit</span>
            </div>
          </Panel>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Team composition" sub={`${total} FTEs across functions`} action={<Users className="h-4 w-4 text-slate-300" />}>
          <ul className="space-y-3.5">
            {t.composition.map((c) => (
              <li key={c.label} className="flex items-center gap-3.5">
                <span className="w-28 text-[12.5px] font-medium text-slate-600">{c.label}</span>
                <Bar pct={(c.count / total) * 100} className="flex-1" />
                <span className="w-6 text-right font-mono text-[11.5px] font-semibold text-ink">{c.count}</span>
              </li>
            ))}
          </ul>
          <div className="mt-5 border-t border-line pt-4">
            <p className="mb-2 font-mono text-[9px] tracking-[0.18em] text-slate-400 uppercase">Hiring gaps</p>
            <div className="flex flex-wrap gap-2">
              {t.gaps.map((g) => <Chip key={g} tone="amber">{g}</Chip>)}
            </div>
          </div>
        </Panel>

        <Panel title="Team risks" sub="Assessment verdict below">
          <ul className="space-y-2.5">
            {t.risks.map((r) => (
              <li key={r} className="flex gap-2.5 rounded-lg border border-line p-3.5 text-[12.5px] leading-relaxed text-slate-600">
                <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-dim" />{r}
              </li>
            ))}
          </ul>
          <div className="mt-4 rounded-lg border border-rise/25 bg-rise-tint p-4 text-[13px] leading-relaxed text-ink">
            <b className="text-rise">Verdict:</b> {t.verdict}
          </div>
        </Panel>
      </div>
    </div>
  );
}

/* ── Technology Assessment ──────────────────────────────────── */
export function TechnologyAssessment() {
  const t = TECH_ASSESSMENT;
  return (
    <div className="space-y-5">
      <SubjectBanner
        kicker="Technology assessment · PathPilot"
        title="Federated pathology AI"
        meta={t.readiness}
        score={t.score}
        action={<Chip tone="rise" className="px-3 py-1.5"><Cpu className="h-3 w-3" /> Production proven</Chip>}
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Stack & architecture">
          <div className="flex flex-wrap gap-2">
            {t.stack.map((s) => <Chip key={s} tone="line" className="px-3 py-1.5">{s}</Chip>)}
          </div>
          <div className="mt-5 space-y-3.5">
            <div className="rounded-lg bg-soft p-3.5">
              <p className="font-mono text-[9px] tracking-[0.14em] text-slate-400 uppercase">Scalability</p>
              <p className="mt-1 text-[12.5px] leading-relaxed text-ink">{t.scalability}</p>
            </div>
            <div className="rounded-lg bg-soft p-3.5">
              <p className="font-mono text-[9px] tracking-[0.14em] text-slate-400 uppercase">Readiness (TRL)</p>
              <p className="mt-1 text-[12.5px] leading-relaxed text-ink">{t.readiness}</p>
            </div>
          </div>
        </Panel>

        <div className="space-y-4">
          <Panel title="Technical moat" action={<ShieldCheck className="h-4 w-4 text-rise" />}>
            <ul className="space-y-2.5">
              {t.moat.map((m) => (
                <li key={m} className="flex gap-2.5 rounded-lg border border-rise/20 bg-rise-tint p-3.5 text-[12.5px] leading-relaxed text-ink">
                  <TrendingUp className="mt-0.5 h-3.5 w-3.5 shrink-0 text-rise" />{m}
                </li>
              ))}
            </ul>
          </Panel>
          <Panel title="Technical risks">
            <ul className="space-y-2.5">
              {t.risks.map((r) => (
                <li key={r} className="flex gap-2.5 rounded-lg border border-amber-dim/20 bg-amber-tint p-3.5 text-[12.5px] leading-relaxed text-ink">
                  <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-dim" />{r}
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </div>
    </div>
  );
}

/* ── IP Assessment ──────────────────────────────────────────── */
export function IpAssessment() {
  const ip = IP_ASSESSMENT;
  return (
    <div className="space-y-5">
      <SubjectBanner
        kicker="IP assessment · PathPilot"
        title="Patent & trademark portfolio"
        meta={`Ownership: ${ip.ownership}`}
        score={ip.score}
        action={<Chip tone="accent" className="px-3 py-1.5"><ShieldCheck className="h-3 w-3" /> FTO clear</Chip>}
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <Panel title="Portfolio" sub="Across 6 filings" className="lg:col-span-1">
          <ul className="space-y-3">
            {ip.portfolio.map((p) => (
              <li key={p.kind} className="flex items-center gap-4 rounded-lg border border-line p-3.5">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-soft font-mono text-[14px] font-bold text-accent">
                  {p.count}
                </span>
                <div>
                  <p className="text-[13px] font-semibold text-ink">{p.kind}</p>
                  <p className="text-[11px] leading-snug text-slate-400">{p.note}</p>
                </div>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Strength & advantage" className="lg:col-span-1">
          <p className="text-[13px] leading-relaxed text-ink">
            <span className="font-mono text-[9.5px] tracking-[0.16em] text-slate-400 uppercase block mb-2">Strength</span>
            {ip.strength}
          </p>
          <div className="mt-4 rounded-lg border border-accent/20 bg-accent-mist p-3.5 text-[12.5px] leading-relaxed text-ink">
            <b className="text-accent">Competitive advantage:</b> {ip.advantage}
          </div>
        </Panel>

        <Panel title="IP risks" className="lg:col-span-1">
          <ul className="space-y-2.5">
            {ip.risks.map((r) => (
              <li key={r} className="flex gap-2.5 rounded-lg border border-amber-dim/20 bg-amber-tint p-3.5 text-[12px] leading-relaxed text-ink">
                <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-dim" />{r}
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </div>
  );
}

/* ── Risk Assessment ────────────────────────────────────────── */
export function RiskAssessment() {
  return (
    <div className="space-y-5">
      <SubjectBanner
        kicker="Risk assessment · PathPilot"
        title={RISK_SUMMARY.verdict}
        meta={RISK_SUMMARY.note}
        score={RISK_SUMMARY.score}
        action={<Chip tone="amber" className="px-3 py-1.5"><AlertTriangle className="h-3 w-3" /> 2 high-priority areas</Chip>}
      />

      <Panel title="Risk matrix" sub="Weighted by impact × likelihood" pad={false}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[780px] text-left">
            <thead>
              <tr className="border-b border-line">
                {["Risk area", "Level", "Weight", "Mitigation in place"].map((h) => (
                  <th key={h} className="px-5 py-3.5 font-mono text-[9.5px] font-medium tracking-[0.16em] text-slate-400 uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {RISK_MATRIX.map((r) => (
                <tr key={r.area} className="transition-colors hover:bg-soft">
                  <td className="px-5 py-4 text-[13px] font-semibold text-ink">{r.area}</td>
                  <td className="px-5 py-4"><Chip tone={LEVEL_TONE[r.level]}>{r.level}</Chip></td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2.5">
                      <Bar pct={r.weight} className="w-24" barClass={r.weight > 70 ? "bg-amber-dim" : r.weight > 45 ? "bg-accent" : "bg-rise"} />
                      <span className="font-mono text-[11px] font-semibold text-ink">{r.weight}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-[12.5px] leading-relaxed text-slate-600">{r.mitigation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Risk history" sub="Re-scored as DD evidence lands">
          <ul className="space-y-3">
            {RISK_SUMMARY.history.map((h) => (
              <li key={h.date} className="flex items-center gap-3.5 rounded-lg border border-line p-3.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg font-mono text-[12px] font-bold text-white" style={{ background: h.score >= 60 ? "#b45309" : "#3157e8" }}>
                  {h.score}
                </span>
                <div>
                  <p className="text-[12.5px] font-semibold text-ink">{h.date}</p>
                  <p className="text-[11.5px] text-slate-400">{h.note}</p>
                </div>
              </li>
            ))}
          </ul>
        </Panel>
        <Panel title="Analyst position" sub="Feeds the IC memo">
          <p className="text-[13.5px] leading-relaxed text-ink">{RISK_SUMMARY.note}</p>
          <p className="mt-3 text-[12.5px] leading-relaxed text-slate-500">
            Structure: tranche 1 at close, tranche 2 on reimbursement-policy milestone; add
            payer-diversification covenant (max 22% per payer by Series B).
          </p>
        </Panel>
      </div>
    </div>
  );
}
