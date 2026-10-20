import {
  ArrowRight,
  ArrowUpRight,
  Check,
  FileText,
  RotateCcw,
  Scale,
  ShieldCheck,
  Vote,
  X,
} from "lucide-react";
import { Avatar, Bar, Chip, Panel, ScoreRing } from "@/components/app/widgets";
import { PageHead } from "@/components/app/boards";
import {
  CLOSED_RECENT,
  DD_ACTIVE,
  IC_PENDING,
  NEGOTIATIONS_ACTIVE,
  PASSED_DEALS,
  TERM_SHEETS,
} from "../../constants/deal-dd-data";

/* ── Due Diligence stage ────────────────────────────────────── */
export function DdStage() {
  return (
    <div className="space-y-5">
      <PageHead
        title="Due diligence in progress"
        sub="2 active engagements · gated to IC"
        action={<Chip tone="amber" className="px-3 py-1.5">1 critical finding open</Chip>}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {DD_ACTIVE.map((d) => (
          <Panel key={d.id} className="transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-[16px] font-semibold text-ink">{d.name}</h3>
                <p className="mt-1 font-mono text-[10px] tracking-[0.1em] text-slate-400 uppercase">
                  Target completion · {d.target}
                </p>
              </div>
              <span className="font-mono text-[18px] font-bold text-accent">{d.progress}%</span>
            </div>
            <Bar pct={d.progress} className="mt-4" />
            <div className="mt-4 grid grid-cols-2 gap-2.5 text-center">
              <div className={`rounded-lg p-3 ${d.critical > 0 ? "bg-amber-tint" : "bg-soft"}`}>
                <p className={`text-[16px] font-semibold ${d.critical > 0 ? "text-amber-dim" : "text-ink"}`}>{d.critical}</p>
                <p className="mt-0.5 text-[10px] text-slate-400">Critical findings</p>
              </div>
              <div className="rounded-lg bg-soft p-3">
                <p className="text-[16px] font-semibold text-ink">{d.docs}</p>
                <p className="mt-0.5 text-[10px] text-slate-400">Docs pending</p>
              </div>
            </div>
            <a href="/investor/dd" className="mt-4 flex items-center justify-center gap-1.5 rounded-lg bg-accent py-2.5 text-[12.5px] font-semibold text-white hover:bg-accent-deep">
              Open DD workspace <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </Panel>
        ))}
      </div>
    </div>
  );
}

/* ── Negotiation stage ──────────────────────────────────────── */
export function NegotiationStage() {
  return (
    <div className="space-y-5">
      <PageHead title="Active negotiations" sub="Economics and terms in motion" />
      <div className="grid gap-4 sm:grid-cols-2">
        {NEGOTIATIONS_ACTIVE.map((n) => (
          <Panel key={n.id}>
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-[16px] font-semibold text-ink">{n.name}</h3>
                <p className="mt-1 text-[12px] text-slate-400">Round {n.round} of negotiation</p>
              </div>
              <Chip tone="amber">{n.status}</Chip>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-lg bg-soft p-3.5">
                <p className="font-mono text-[9px] tracking-[0.14em] text-slate-400 uppercase">Valuation</p>
                <p className="mt-1 text-[15px] font-semibold text-ink">{n.valuation}</p>
              </div>
              <div className="rounded-lg bg-soft p-3.5">
                <p className="font-mono text-[9px] tracking-[0.14em] text-slate-400 uppercase">Ownership</p>
                <p className="mt-1 text-[15px] font-semibold text-ink">{n.ownership}</p>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-line pt-3.5">
              <span className="text-[11.5px] text-slate-400">Last movement · {n.last}</span>
              <a href="/investor/deal/negotiation" className="text-[12px] font-semibold text-accent">Open negotiation →</a>
            </div>
          </Panel>
        ))}
      </div>
    </div>
  );
}

/* ── Term Sheet stage ───────────────────────────────────────── */
export function TermSheetStage() {
  return (
    <div className="space-y-5">
      <PageHead title="Term sheets" sub="Drafts, sent, accepted — full version history" />
      <Panel pad={false}>
        <ul className="divide-y divide-line">
          {TERM_SHEETS.map((t) => (
            <li key={t.id} className="flex flex-wrap items-center gap-4 px-5 py-4.5 transition-colors hover:bg-soft">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-soft text-accent">
                <FileText className="h-4.5 w-4.5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[14px] font-semibold text-ink">{t.deal}</p>
                <p className="mt-0.5 font-mono text-[9.5px] tracking-[0.08em] text-slate-400 uppercase">
                  {t.version} · sent {t.sent} · expires {t.expires}
                </p>
              </div>
              <span className="text-[12px] text-slate-500">{t.open}</span>
              <Chip tone={t.status === "Accepted" ? "rise" : "amber"}>{t.status}</Chip>
              <a href="/investor/deal/term-sheet" className="rounded-lg border border-line px-3.5 py-2 text-[12px] font-semibold text-ink hover:bg-white">
                Open
              </a>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}

/* ── Investment Committee ───────────────────────────────────── */
export function CommitteeStage() {
  return (
    <div className="space-y-5">
      <PageHead
        title="Investment Committee"
        sub="Pending review — memos, votes and decisions"
        action={<Chip tone="accent" className="px-3 py-1.5"><Vote className="h-3 w-3" /> Quorum: 3 of 4</Chip>}
      />
      {IC_PENDING.map((ic) => (
        <Panel key={ic.id} title={`${ic.deal} — final vote`} sub={`${ic.memo} · presented by ${ic.presenter} · ${ic.date}`}>
          <div className="grid gap-6 lg:grid-cols-5">
            <div className="space-y-2.5 lg:col-span-3">
              {ic.votes.map((v) => (
                <div key={v.member} className="flex items-center gap-3.5 rounded-lg border border-line p-3.5">
                  <Avatar label={v.member.split(" ").map((x) => x[0]).join("").slice(0, 2)} className="h-8.5 w-8.5" />
                  <span className="flex-1 text-[13px] font-medium text-ink">{v.member}</span>
                  <Chip tone={v.vote === "Approve" ? "rise" : v.vote === "Hold" ? "amber" : "slate"}>
                    {v.vote === "Approve" && <Check className="h-3 w-3" />}
                    {v.vote}
                  </Chip>
                </div>
              ))}
            </div>
            <div className="rounded-xl bg-accent-mist p-5 lg:col-span-2">
              <p className="font-mono text-[9.5px] tracking-[0.18em] text-accent uppercase">Decision snapshot</p>
              <p className="mt-3 text-[15px] font-semibold text-ink">₹5.5 Cr seed · 2 tranches</p>
              <ul className="mt-3 space-y-2 text-[12.5px] leading-relaxed text-ink/80">
                <li>· ₹42 Cr pre-money, 11.6% ownership</li>
                <li>· Founder counter: ESOP 8% post</li>
                <li>· Tranche 2: OEM conversion gate</li>
                <li>· IP carve-out cured pre-signing</li>
              </ul>
              <button className="mt-4 w-full rounded-lg bg-accent py-2.5 text-[13px] font-semibold text-white hover:bg-accent-deep">
                Cast your vote · Today 16:00
              </button>
            </div>
          </div>
        </Panel>
      ))}

      <Panel title="Decision history" sub="Last 4 votes" pad={false}>
        <ul className="divide-y divide-line text-[12.5px]">
          {[
            { d: "SoilSense Labs — Approved ₹1.8 Cr", v: "4–0", t: "Mar 09" },
            { d: "Finlattice — Approved ₹2.5 Cr", v: "3–1", t: "Feb 22" },
            { d: "AdNova AI — Declined", v: "0–4", t: "Feb 27" },
            { d: "Terragrid — Approved ₹5.0 Cr", v: "4–0", t: "Jan 30" },
          ].map((h) => (
            <li key={h.d} className="flex items-center justify-between px-5 py-3.5">
              <span className="text-ink">{h.d}</span>
              <span className="flex items-center gap-3">
                <Chip tone="line">{h.v}</Chip>
                <span className="font-mono text-[10px] text-slate-400">{h.t}</span>
              </span>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}

/* ── Closed stage ───────────────────────────────────────────── */
export function ClosedStage() {
  return (
    <div className="space-y-5">
      <PageHead
        title="Closed deals"
        sub="Recently completed investments — now in portfolio"
        action={<Chip tone="rise" className="px-3 py-1.5"><ShieldCheck className="h-3 w-3" /> 24 lifetime closes</Chip>}
      />
      <Panel pad={false}>
        <ul className="divide-y divide-line">
          {CLOSED_RECENT.map((c) => (
            <li key={c.id} className="flex flex-wrap items-center gap-4 px-5 py-4.5 transition-colors hover:bg-soft">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-rise-tint text-rise">
                <Check className="h-4.5 w-4.5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[14px] font-semibold text-ink">{c.name}</p>
                <p className="mt-0.5 text-[11.5px] text-slate-400">{c.round} · closed {c.date}</p>
              </div>
              <span className="font-mono text-[14px] font-semibold text-ink">{c.amount}</span>
              <Chip tone="rise">{c.portfolio}</Chip>
              <a href="/investor/portfolio/companies" className="text-[12px] font-semibold text-accent">
                Portfolio →
              </a>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}

/* ── Passed stage ───────────────────────────────────────────── */
export function PassedStage() {
  return (
    <div className="space-y-5">
      <PageHead
        title="Passed deals"
        sub="Declined with reasons — revisited quarterly"
        action={<Chip tone="slate" className="px-3 py-1.5"><RotateCcw className="h-3 w-3" /> 2 flagged for revisit</Chip>}
      />
      <Panel pad={false}>
        <ul className="divide-y divide-line">
          {PASSED_DEALS.map((p) => (
            <li key={p.id} className="flex flex-wrap items-center gap-4 px-5 py-4.5 transition-colors hover:bg-soft">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-400">
                <X className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[13.5px] font-semibold text-ink">{p.name}</p>
                <p className="mt-0.5 text-[11.5px] text-slate-400">Reason: {p.reason}</p>
              </div>
              <span className="font-mono text-[10.5px] text-slate-400">{p.date}</span>
              {p.revisit ? (
                <Chip tone="accent"><RotateCcw className="h-3 w-3" /> Revisit Q3</Chip>
              ) : (
                <Chip tone="slate">Closed</Chip>
              )}
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}
