import {
  ArrowDownRight,
  ArrowUpRight,
  Banknote,
  Briefcase,
  CircleDollarSign,
  Clock3,
  Globe2,
  History,
  Layers,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { Bar, Chip, Panel, StatCard } from "@/components/app/widgets";
import { PageHead, Timeline } from "@/components/app/boards";
import { INVEST_HISTORY_EXTRA, RETURNS_TABLE } from "../../constants/deal-dd-data";
import { FOLLOW_ONS, LEDGER, PORTFOLIO } from "../../constants/investor-data";
import { MANDATE } from "../../constants/ops-data";

const HEALTH_TONE = { Strong: "rise", Stable: "accent", Watch: "amber" } as const;

/* ── Investment Management ──────────────────────────────────── */
export function InvestmentManagement() {
  return (
    <div className="space-y-5">
      <PageHead title="Investment management" sub="Every cheque — instrument, terms, ownership and outcome" />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="Total invested" value="₹86.4 Cr" delta="across 38 deals" icon={Banknote} />
        <StatCard label="Current value" value="₹132.6 Cr" delta="+53.5% uplift" icon={TrendingUp} />
        <StatCard label="Instruments" value="Equity 32" delta="CCPS 6" icon={Layers} />
        <StatCard label="Avg. holding" value="19 months" delta="oldest 37m" icon={Clock3} />
      </div>

      <Panel title="Investment register" sub="Instrument details per deal" pad={false}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] text-left">
            <thead>
              <tr className="border-b border-line">
                {["Company", "Round · instrument", "Date", "Invested", "Ownership", "Entry val.", "Current value", "Status"].map((h) => (
                  <th key={h} className="px-5 py-3.5 font-mono text-[9.5px] font-medium tracking-[0.16em] text-slate-400 uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {PORTFOLIO.slice(0, 6).map((p, i) => (
                <tr key={p.id} className="transition-colors hover:bg-soft">
                  <td className="px-5 py-4">
                    <p className="text-[13px] font-semibold text-ink">{p.name}</p>
                    <p className="text-[10.5px] text-slate-400">{p.sector}</p>
                  </td>
                  <td className="px-5 py-4 text-[12px] text-slate-500">{p.stage} · {i % 5 === 4 ? "CCPS" : "Equity"}</td>
                  <td className="px-5 py-4 font-mono text-[11px] text-slate-500">
                    {["Mar '26", "Feb '26", "Jan '26", "Nov '25", "Sep '25", "Aug '25"][i]}
                  </td>
                  <td className="px-5 py-4 text-[12.5px] text-slate-500">{p.invested}</td>
                  <td className="px-5 py-4 font-mono text-[12px] text-slate-500">{(14 - i * 0.9).toFixed(1)}%</td>
                  <td className="px-5 py-4 text-[12px] text-slate-500">{Math.round(28 * p.multiple)} Cr</td>
                  <td className="px-5 py-4 text-[12.5px] font-semibold text-ink">{p.value}</td>
                  <td className="px-5 py-4"><Chip tone={HEALTH_TONE[p.health] as "rise"}>{p.health}</Chip></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}

/* ── Active Investments ─────────────────────────────────────── */
export function ActiveInvestments() {
  return (
    <div className="space-y-5">
      <PageHead title="Active investments" sub="8 highlighted holdings · sorted by current value" />
      <div className="grid gap-4 sm:grid-cols-2">
        {PORTFOLIO.map((p) => (
          <Panel key={p.id} className="transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3.5">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-[13px] font-bold text-accent">
                  {p.name.slice(0, 2)}
                </span>
                <div>
                  <h3 className="text-[15.5px] font-semibold text-ink">{p.name}</h3>
                  <p className="mt-0.5 font-mono text-[9.5px] tracking-[0.08em] text-slate-400 uppercase">{p.sector} · {p.stage}</p>
                </div>
              </div>
              <Chip tone={HEALTH_TONE[p.health] as "rise"}>{p.health}</Chip>
            </div>
            <div className="mt-4 grid grid-cols-4 gap-2 text-center">
              {[
                { l: "Invested", v: p.invested },
                { l: "Value", v: p.value },
                { l: "MOIC", v: `${p.multiple}×` },
                { l: "Growth", v: p.growth, green: true },
              ].map((x) => (
                <div key={x.l} className="rounded-lg bg-soft p-2.5">
                  <p className={`text-[12.5px] font-semibold ${x.green ? "text-rise" : "text-ink"}`}>{x.v}</p>
                  <p className="mt-0.5 font-mono text-[8px] tracking-[0.1em] text-slate-400 uppercase">{x.l}</p>
                </div>
              ))}
            </div>
            <div className="mt-3.5 flex items-center justify-between border-t border-line pt-3 text-[11.5px] text-slate-400">
              <span>Next round · <span className="font-medium text-ink">{p.nextRound}</span></span>
              <a href="/investor/portfolio/companies" className="font-semibold text-accent">Open →</a>
            </div>
          </Panel>
        ))}
      </div>
    </div>
  );
}

/* ── Investment History ─────────────────────────────────────── */
export function InvestmentHistory() {
  return (
    <div className="space-y-5">
      <PageHead title="Investment history" sub="Exits, write-offs and the full timeline since inception" />
      <div className="grid gap-4 lg:grid-cols-5">
        <Panel title="Outcomes" sub="Realized results" pad={false} className="lg:col-span-3">
          <ul className="divide-y divide-line">
            {INVEST_HISTORY_EXTRA.map((h) => (
              <li key={h.id} className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-soft">
                <Chip tone={h.outcome === "Write-off" ? "amber" : "rise"} className="w-24 justify-center">{h.outcome}</Chip>
                <div className="min-w-0 flex-1">
                  <p className="text-[13.5px] font-semibold text-ink">{h.name}</p>
                  <p className="text-[11px] text-slate-400">{h.round} · {h.year}</p>
                </div>
                <span className="font-mono text-[13px] font-semibold text-ink">{h.multiple}</span>
                {h.irr !== "—" && <span className="font-mono text-[12px] text-rise">IRR {h.irr}</span>}
              </li>
            ))}
          </ul>
        </Panel>
        <Panel title="Timeline" sub="Fund life" className="lg:col-span-2">
          <Timeline
            events={[
              { date: "Feb 2023", text: "Fund I first close — ₹80 Cr" },
              { date: "Apr 2023", text: "First investment — MediChain ₹3 Cr" },
              { date: "Dec 2023", text: "Final close — ₹120 Cr" },
              { date: "Aug 2025", text: "First full exit — FleetWorks 2.8×" },
              { date: "Mar 2026", text: "38th investment — SoilSense Labs" },
            ]}
          />
        </Panel>
      </div>
    </div>
  );
}

/* ── Capital Deployment ─────────────────────────────────────── */
export function CapitalDeployment() {
  return (
    <div className="space-y-5">
      <PageHead title="Capital deployment" sub="₹120 Cr Fund I — deployment, reserves and pacing" />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="Total commitments" value="₹120 Cr" icon={Briefcase} sub="Fund I" />
        <StatCard label="Deployed" value="₹86.4 Cr" delta="72%" icon={Wallet} />
        <StatCard label="Reserved" value="₹24 Cr" delta="follow-ons" icon={Banknote} deltaGood={false} />
        <StatCard label="Available (new)" value="₹9.6 Cr" delta="6–8 deals at plan" icon={CircleDollarSign} />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="By sector" sub="Deployed capital vs. mandate target">
          <ul className="space-y-3.5">
            {MANDATE.sectorAllocation.map((s) => (
              <li key={s.label} className="grid grid-cols-[110px_1fr_84px] items-center gap-3">
                <span className="text-[12.5px] font-medium text-ink">{s.label}</span>
                <div className="relative h-[6px] overflow-hidden rounded-full bg-slate-100">
                  <div className="absolute h-full rounded-full bg-accent" style={{ width: `${s.actual * 3}%` }} />
                  <div className="absolute h-[10px] w-[2px] -translate-y-[2px] bg-ink" style={{ left: `${s.target * 3}%` }} />
                </div>
                <span className="text-right font-mono text-[10.5px] text-slate-400">{s.actual}%</span>
              </li>
            ))}
          </ul>
        </Panel>
        <Panel title="By stage & geography" sub="Deployed distribution" action={<Globe2 className="h-4 w-4 text-slate-300" />}>
          <p className="mb-3 font-mono text-[9px] tracking-[0.18em] text-slate-400 uppercase">Stage</p>
          {MANDATE.stageAllocation.map((s) => (
            <div key={s.label} className="mb-3 flex items-center gap-3">
              <span className="w-20 text-[12px] text-slate-500">{s.label}</span>
              <Bar pct={s.pct * 1.6} className="flex-1" />
              <span className="w-8 text-right font-mono text-[11px] text-ink">{s.pct}%</span>
            </div>
          ))}
          <p className="mt-5 mb-3 font-mono text-[9px] tracking-[0.18em] text-slate-400 uppercase">Geography</p>
          {MANDATE.geoAllocation.map((g) => (
            <div key={g.label} className="mb-3 flex items-center gap-3">
              <span className="w-20 text-[12px] text-slate-500">{g.label}</span>
              <Bar pct={g.pct} className="flex-1" barClass="bg-rise" />
              <span className="w-8 text-right font-mono text-[11px] text-ink">{g.pct}%</span>
            </div>
          ))}
        </Panel>
      </div>
    </div>
  );
}

/* ── Follow-on Investments ──────────────────────────────────── */
const URGENCY_TONE = { High: "rise", Medium: "amber", Low: "slate" } as const;

export function FollowOnInvestments() {
  return (
    <div className="space-y-5">
      <PageHead
        title="Follow-on investments"
        sub="₹24 Cr reserves · ₹16.5 Cr suggested this cycle"
        action={<Chip tone="accent" className="px-3 py-1.5">Reserve model · 30% rule</Chip>}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {FOLLOW_ONS.map((f) => (
          <Panel key={f.id} className="transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-[16px] font-semibold text-ink">{f.company}</h3>
                <p className="mt-1 font-mono text-[9.5px] tracking-[0.1em] text-slate-400 uppercase">Suggested cheque</p>
                <p className="text-[20px] font-semibold tracking-tight text-accent">{f.suggested}</p>
              </div>
              <Chip tone={URGENCY_TONE[f.urgency]}>{f.urgency}</Chip>
            </div>
            <ul className="mt-4 space-y-2">
              {f.rationale.map((r) => (
                <li key={r} className="flex items-start gap-2 text-[12.5px] text-slate-500">
                  <span className="mt-[5px] h-1 w-3 shrink-0 rounded-full bg-accent/60" />{r}
                </li>
              ))}
            </ul>
            <div className="mt-4 border-t border-line pt-3.5">
              <div className="mb-1.5 flex justify-between text-[11px]">
                <span className="text-slate-400">Reserve utilisation if executed</span>
                <span className="font-semibold text-ink">{f.reservePct}%</span>
              </div>
              <Bar pct={f.reservePct} barClass={f.reservePct > 75 ? "bg-amber-dim" : "bg-accent"} />
            </div>
          </Panel>
        ))}
      </div>
    </div>
  );
}

/* ── Returns ────────────────────────────────────────────────── */
export function ReturnsPage() {
  return (
    <div className="space-y-5">
      <PageHead title="Returns" sub="Realized + unrealized across the book" />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="Gross MOIC" value="2.14×" delta="net of fees 1.92×" icon={TrendingUp} />
        <StatCard label="Net IRR" value="31.4%" delta="since inception" icon={TrendingUp} />
        <StatCard label="Realized" value="₹36.2 Cr" delta="3 liquidity events" icon={CircleDollarSign} />
        <StatCard label="Unrealized gain" value="₹46.2 Cr" delta="mark-to-market" icon={ArrowUpRight} />
      </div>
      <Panel title="Return table" sub="Per investment · MOIC and IRR" pad={false}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left">
            <thead>
              <tr className="border-b border-line">
                {["Investment", "Invested", "Current", "Realized", "MOIC", "IRR"].map((h) => (
                  <th key={h} className="px-5 py-3.5 font-mono text-[9.5px] font-medium tracking-[0.16em] text-slate-400 uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {RETURNS_TABLE.map((r) => (
                <tr key={r.name} className="transition-colors hover:bg-soft">
                  <td className="px-5 py-4 text-[13px] font-semibold text-ink">{r.name}</td>
                  <td className="px-5 py-4 text-[12.5px] text-slate-500">{r.invested}</td>
                  <td className="px-5 py-4 text-[12.5px] text-slate-500">{r.current}</td>
                  <td className="px-5 py-4 text-[12.5px] text-rise">{r.realized}</td>
                  <td className="px-5 py-4 font-mono text-[12.5px] font-semibold text-ink">{r.moic}</td>
                  <td className="px-5 py-4 font-mono text-[12px] text-rise">{r.irr}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}
