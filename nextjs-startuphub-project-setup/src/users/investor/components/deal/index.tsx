import {
  ArrowUpRight,
  BadgeIndianRupee,
  CircleDollarSign,
  FileText,
  Percent,
  Scale,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Avatar, Bar, Chip, Panel, StatCard } from "@/components/app/widgets";
import { PageHead, StageTrail, SubjectBanner, Timeline } from "@/components/app/boards";
import {
  DEAL_SUBJECT,
  DEAL_TEAM,
  DEAL_VALUATION,
  TERM_SHEET_TERMS,
} from "../../constants/deal-dd-data";

const TRAIL = ["Lead", "Screen", "Evaluate", "DD", "Negotiate", "Term Sheet", "IC", "Close"];

/* ── Deal Overview ──────────────────────────────────────────── */
export function DealOverview() {
  const d = DEAL_SUBJECT;
  return (
    <div className="space-y-5">
      <SubjectBanner
        kicker="Active deal · Seed round"
        title={d.name}
        meta={`Asking ${d.ask} · ${d.status}`}
        score={90}
        action={<Chip tone="amber" className="px-3 py-1.5">IC vote today 16:00</Chip>}
      />

      <div className="rounded-xl border border-line bg-white p-4">
        <StageTrail stages={TRAIL} active={6} />
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="Round size" value={d.ask} delta="2 tranches" icon={CircleDollarSign} />
        <StatCard label="Pre-money" value={d.valuation.pre} delta="v4 current" icon={BadgeIndianRupee} />
        <StatCard label="Post-money" value={d.valuation.post} icon={BadgeIndianRupee} />
        <StatCard label="Ownership" value={d.ownership} delta="fully diluted" icon={Percent} />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Deal timeline" sub="First touch → target close">
          <Timeline events={d.timeline} />
        </Panel>
        <Panel title="Deal summary" sub="Snapshot for IC" >
          <dl className="space-y-3 text-[13px]">
            {[
              ["Startup", "CarbonKart — B2B carbon procurement marketplace"],
              ["Sector / Stage", "ClimateTech · Seed"],
              ["Traction", "₹1.2 Cr GMV/mo · 3 enterprise pre-pay contracts"],
              ["Round", "₹5.5 Cr in two tranches, ₹42 Cr pre"],
              ["Status", "Term sheet v4 sent · founder counter on ESOP"],
              ["Next gate", "IC vote today; signing targeted Apr 05"],
              ["Deal lead", "Arjun Mehta · analyst support S. Kapoor"],
            ].map(([k, v]) => (
              <div key={k} className="grid grid-cols-[120px_1fr] gap-3">
                <dt className="font-mono text-[10px] tracking-[0.1em] text-slate-400 uppercase pt-0.5">{k}</dt>
                <dd className="font-medium text-ink">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-5 flex gap-2">
            <a href="/investor/deal/term-sheet" className="flex-1 rounded-lg bg-accent py-2.5 text-center text-[13px] font-semibold text-white hover:bg-accent-deep">Open term sheet</a>
            <a href="/investor/deal/closing" className="flex-1 rounded-lg border border-line py-2.5 text-center text-[13px] font-semibold text-ink hover:bg-soft">Closing plan</a>
          </div>
        </Panel>
      </div>
    </div>
  );
}

/* ── Deal Team ──────────────────────────────────────────────── */
export function DealTeam() {
  return (
    <div className="space-y-5">
      <PageHead
        title="Deal team"
        sub="CarbonKart · responsibilities and permissions"
        action={<button className="rounded-lg bg-accent px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-accent-deep">+ Add member</button>}
      />
      <Panel pad={false}>
        <ul className="divide-y divide-line">
          {DEAL_TEAM.map((t) => (
            <li key={t.name} className="flex items-center gap-4 px-5 py-4.5 transition-colors hover:bg-soft">
              <Avatar label={t.i} className="h-10 w-10 rounded-xl bg-ink text-[12px] text-white" />
              <div className="min-w-0 flex-1">
                <p className="text-[14px] font-semibold text-ink">{t.name}</p>
                <p className="text-[12px] text-accent">{t.role}</p>
              </div>
              <span className="hidden max-w-sm text-[12.5px] text-slate-500 sm:block">{t.scope}</span>
              <Chip tone={t.role === "Deal Lead" ? "accent" : "line"}>
                {t.role === "Deal Lead" ? "Full authority" : "Deal-scoped"}
              </Chip>
            </li>
          ))}
        </ul>
      </Panel>
      <div className="rounded-xl border border-line bg-white p-5 text-[12.5px] leading-relaxed text-slate-500">
        <b className="text-ink">Permissions:</b> deal room full access for internal team; external
        counsel sees Legal + Corporate folders only; advisor (IPR desk) sees IP folder and
        FTO findings. All views are audit-logged.
      </div>
    </div>
  );
}

/* ── Valuation ──────────────────────────────────────────────── */
export function DealValuation() {
  const v = DEAL_VALUATION;
  return (
    <div className="space-y-5">
      <SubjectBanner
        kicker="Valuation · CarbonKart"
        title={`${v.pre} pre-money`}
        meta={`${v.method}`}
        action={<Chip tone="accent" className="px-3 py-1.5">Founder countered ₹45 Cr</Chip>}
      />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="Pre-money" value={v.pre} icon={BadgeIndianRupee} />
        <StatCard label="Post-money" value={v.post} icon={BadgeIndianRupee} />
        <StatCard label="Investment" value={v.ask} icon={CircleDollarSign} />
        <StatCard label="Ownership" value={v.ownership} icon={Percent} />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Comparable companies" sub="Revenue multiples, carbon/climate SaaS" pad={false} action={<Scale className="h-4 w-4 text-slate-300" />}>
          <ul className="divide-y divide-line">
            {v.comps.map((c) => (
              <li key={c.name} className="flex items-center justify-between px-5 py-4">
                <div>
                  <p className="text-[13.5px] font-semibold text-ink">{c.name}</p>
                  <p className="text-[11.5px] text-slate-400">{c.note}</p>
                </div>
                <span className="font-mono text-[14px] font-semibold text-accent">{c.multiple}</span>
              </li>
            ))}
            <li className="flex items-center justify-between bg-accent-mist px-5 py-4">
              <p className="text-[13.5px] font-semibold text-ink">PathPilot applied multiple</p>
              <span className="font-mono text-[14px] font-bold text-ink">8.4× ARR</span>
            </li>
          </ul>
        </Panel>

        <Panel title="Scenario valuations" sub="VC method + multiples blend">
          <ul className="space-y-3">
            {v.scenarios.map((s) => (
              <li key={s.name} className="rounded-lg border border-line p-4">
                <div className="flex items-center justify-between">
                  <Chip tone={s.name === "Base" ? "accent" : s.name === "Bull" ? "rise" : "slate"}>{s.name}</Chip>
                  <span className="font-mono text-[12px] text-slate-400">IRR {s.irr}</span>
                </div>
                <p className="mt-2.5 text-[17px] font-semibold tracking-tight text-ink">{s.value}</p>
                <p className="mt-0.5 text-[11.5px] text-slate-500">{s.note}</p>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <Panel title="Valuation history" sub="Negotiation trail">
        <ul className="space-y-3">
          {v.history.map((h, i) => (
            <li key={h.d} className="flex items-center gap-4">
              <span className={`flex h-9 w-9 items-center justify-center rounded-lg font-mono text-[10px] font-bold ${i === v.history.length - 1 ? "bg-accent text-white" : "bg-slate-100 text-slate-500"}`}>
                v{i + 2}
              </span>
              <div className="flex-1">
                <p className="text-[13.5px] font-semibold text-ink">{h.v}</p>
                <p className="text-[12px] text-slate-400">{h.note}</p>
              </div>
              <span className="font-mono text-[10.5px] text-slate-400">{h.d}</span>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}

/* ── Term Sheet ─────────────────────────────────────────────── */
const TERM_TONE = { Agreed: "rise", Counter: "amber", Open: "accent" } as const;

export function DealTermSheet() {
  const agreed = TERM_SHEET_TERMS.filter((t) => t.status === "Agreed").length;
  return (
    <div className="space-y-5">
      <SubjectBanner
        kicker="Term sheet v4 · CarbonKart"
        title={`${agreed} of ${TERM_SHEET_TERMS.length} terms agreed`}
        meta="Sent Mar 24 · expires Apr 02 · founder counter received on 3 terms"
        action={
          <button className="flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-accent-deep">
            <FileText className="h-3.5 w-3.5" /> Issue v5
          </button>
        }
      />

      <Panel title="Terms" sub="Status: agreed · countered · open" pad={false}>
        <ul className="divide-y divide-line">
          {TERM_SHEET_TERMS.map((t) => (
            <li key={t.term} className="grid items-center gap-2 px-5 py-4 transition-colors hover:bg-soft sm:grid-cols-[200px_1fr_auto]">
              <span className="text-[13px] font-semibold text-ink">{t.term}</span>
              <span className="text-[12.5px] text-slate-600">{t.value}</span>
              <Chip tone={TERM_TONE[t.status as keyof typeof TERM_TONE]}>{t.status}</Chip>
            </li>
          ))}
        </ul>
      </Panel>

      <div className="grid gap-4 lg:grid-cols-3">
        {[
          { l: "Version history", d: "v2 Mar 14 · v3 Mar 20 · v4 Mar 24 (current)" },
          { l: "Expiry", d: "Apr 02 · auto-extend 7 days if negotiation active" },
          { l: "Conditions", d: "IP cure · bench accuracy ≥94% · tranche gate per T-10" },
        ].map((b) => (
          <div key={b.l} className="rounded-xl border border-line bg-white p-5">
            <p className="font-mono text-[9.5px] tracking-[0.18em] text-slate-400 uppercase">{b.l}</p>
            <p className="mt-2 text-[12.5px] leading-relaxed text-ink">{b.d}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
