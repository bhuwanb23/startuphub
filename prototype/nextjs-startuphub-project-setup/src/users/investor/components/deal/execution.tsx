import {
  ArrowLeftRight,
  BadgeCheck,
  CheckCircle2,
  Download,
  File,
  FileText,
  Landmark,
  PenLine,
  Upload,
} from "lucide-react";
import { Bar, Chip, Panel } from "@/components/app/widgets";
import { Checklist, PageHead, SubjectBanner } from "@/components/app/boards";
import {
  AGREEMENTS,
  CLOSING_CHECKLIST,
  DEAL_SUBJECT,
  TERM_SHEET_TERMS,
} from "../../constants/deal-dd-data";
import { DEAL_ROOM } from "../../constants/investor-data";

/* ── Negotiation ────────────────────────────────────────────── */
export function DealNegotiation() {
  const open = TERM_SHEET_TERMS.filter((t) => t.status !== "Agreed");
  return (
    <div className="space-y-5">
      <SubjectBanner
        kicker="Negotiation · CarbonKart"
        title="Round 4 in progress"
        meta="3 terms open · founder counter received 2h ago"
        action={<Chip tone="amber" className="px-3 py-1.5"><ArrowLeftRight className="h-3 w-3" /> Ball with us</Chip>}
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Open terms" sub="Where the gap remains">
          <ul className="space-y-3">
            {open.map((t) => (
              <li key={t.term} className="rounded-lg border border-line p-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[13.5px] font-semibold text-ink">{t.term}</span>
                  <Chip tone={t.status === "Counter" ? "amber" : "accent"}>{t.status}</Chip>
                </div>
                <p className="mt-1.5 text-[12.5px] text-slate-500">{t.value}</p>
                <div className="mt-3 grid gap-2 rounded-lg bg-soft p-3 text-[12px]">
                  <p className="text-slate-500">
                    <span className="font-mono text-[9px] tracking-[0.12em] text-slate-400 uppercase block">Their position</span>
                    {t.term === "ESOP" ? "8% pool created post-money" : t.term === "Founder vesting" ? "3-year re-vest, 1-year credit for time served" : "Tranche 2 at ₹1 Cr GMV/mo only — no OEM condition"}
                  </p>
                  <p className="text-ink">
                    <span className="font-mono text-[9px] tracking-[0.12em] text-accent uppercase block">Our floor</span>
                    {t.term === "ESOP" ? "9% minimum — VP Eng + Head of Carbon Markets priced in" : t.term === "Founder vesting" ? "4-year standard, 6-month credit maximum" : "Gate can be GMV OR OEM conversion — one of the two"}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Panel>

        <div className="space-y-4">
          <Panel title="Counteroffer history" sub="Latest first">
            <ul className="space-y-3">
              {[
                { d: "2h ago", w: "Founders", t: "Accepted tranche structure; counters on ESOP + vesting credit" },
                { d: "Mar 22", w: "Meridian", t: "v4 sent — ₹42 Cr pre, T-2 dual-condition gate" },
                { d: "Mar 18", w: "Founders", t: "Asked ₹45 Cr pre citing tender shortlist" },
                { d: "Mar 14", w: "Meridian", t: "v2 opened at ₹38 Cr pre" },
              ].map((h) => (
                <li key={h.d} className="flex gap-3.5">
                  <span className={`mt-1 h-2 w-2 shrink-0 rounded-full ${h.w === "Meridian" ? "bg-accent" : "bg-amber-dim"}`} />
                  <div>
                    <p className="text-[12.5px] font-medium text-ink"><span className="font-semibold">{h.w}:</span> {h.t}</p>
                    <p className="mt-0.5 font-mono text-[9.5px] text-slate-400">{h.d}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Panel>
          <Panel title="Negotiation notes" sub="Private to deal team">
            <p className="text-[13px] leading-relaxed text-slate-600">
              Founders are dilution-sensitive after a rough seed experience. Lead with vesting
              credit flexibility — cheapest concession. ESOP floor is hard at 9% given VP Eng
              search is already open; trade T-2 condition for it if forced.
            </p>
          </Panel>
        </div>
      </div>
    </div>
  );
}

/* ── Agreements ─────────────────────────────────────────────── */
export function DealAgreements() {
  return (
    <div className="space-y-5">
      <PageHead
        title="Agreements"
        sub="CarbonKart · drafts through execution"
        action={
          <button className="flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-accent-deep">
            <Upload className="h-3.5 w-3.5" /> Upload agreement
          </button>
        }
      />
      <Panel pad={false}>
        <ul className="divide-y divide-line">
          {AGREEMENTS.map((a) => (
            <li key={a.doc} className="flex flex-wrap items-center gap-4 px-5 py-4.5 transition-colors hover:bg-soft">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-soft text-accent">
                <FileText className="h-4.5 w-4.5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[14px] font-semibold text-ink">{a.doc}</p>
                <p className="mt-0.5 text-[11.5px] text-slate-400">Parties: {a.parties.join(" · ")}</p>
              </div>
              <Chip tone={a.status.startsWith("Sent") ? "amber" : a.status.startsWith("Draft") ? "accent" : "slate"}>
                {a.status}
              </Chip>
              <div className="flex gap-2">
                <button className="flex items-center gap-1.5 rounded-lg border border-line px-3 py-2 text-[12px] font-semibold text-ink hover:bg-white">
                  <Download className="h-3.5 w-3.5 text-slate-400" /> Open
                </button>
                <button className="flex items-center gap-1.5 rounded-lg bg-accent px-3 py-2 text-[12px] font-semibold text-white hover:bg-accent-deep">
                  <PenLine className="h-3.5 w-3.5" /> eSign
                </button>
              </div>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}

/* ── Closing ────────────────────────────────────────────────── */
export function DealClosing() {
  const done = CLOSING_CHECKLIST.filter((c) => c.done).length;
  return (
    <div className="space-y-5">
      <SubjectBanner
        kicker="Closing · CarbonKart"
        title={`${done} of ${CLOSING_CHECKLIST.length} closing items complete`}
        meta="Target signing Apr 05 · target wire Apr 12"
        action={<Chip tone="amber" className="px-3 py-1.5">Gated on IC vote</Chip>}
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <Panel title="Closing checklist" className="lg:col-span-2">
          <Checklist items={CLOSING_CHECKLIST.map((c) => ({ label: c.item, done: c.done ? 1 : 0 }))} doneKey="done" />
        </Panel>
        <div className="space-y-4">
          <Panel title="Capital transfer" sub="Escrow-coordinated" action={<Landmark className="h-4 w-4 text-slate-300" />}>
            <ul className="space-y-3.5 text-[12.5px]">
              {[
                { l: "Tranche 1", v: "₹4.0 Cr · on signing", s: "Scheduled" },
                { l: "Tranche 2", v: "₹1.5 Cr · on gate hit", s: "Conditional" },
                { l: "Escrow", v: "StartupHub closing service", s: "Set up" },
              ].map((x) => (
                <li key={x.l} className="flex items-start justify-between gap-2 rounded-lg border border-line p-3">
                  <div>
                    <p className="font-semibold text-ink">{x.l}</p>
                    <p className="mt-0.5 text-[11.5px] text-slate-400">{x.v}</p>
                  </div>
                  <Chip tone={x.s === "Set up" ? "rise" : "slate"}>{x.s}</Chip>
                </li>
              ))}
            </ul>
          </Panel>
          <Panel title="On close day" sub="Automatic on wire confirmation">
            <ul className="space-y-2.5 text-[12.5px] text-slate-600">
              {[
                "Share certificates issued + register updated",
                "Ownership recorded — 13.06% pre-ESOP shuffle",
                "Deal moves to Portfolio · onboarding flow opens",
                "Announcement draft prepared for founders",
              ].map((x) => (
                <li key={x} className="flex gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-rise" />{x}
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </div>
    </div>
  );
}

/* ── Deal Documents ─────────────────────────────────────────── */
export function DealDocuments() {
  const docs = [...DEAL_ROOM, { id: 99, file: "SHA_execution_copy.pdf", deal: "CarbonKart", kind: "Legal" as const, size: "1.9 MB", updated: "Queued for Apr 05" }];
  return (
    <div className="space-y-5">
      <PageHead title="Deal documents" sub="CarbonKart room — term sheets, agreements, DD and closing files" />
      <Panel pad={false}>
        <ul className="divide-y divide-line">
          {docs.map((f) => (
            <li key={f.id} className="group flex items-center gap-4 px-5 py-3.5 transition-colors hover:bg-soft">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-soft text-accent">
                <File className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-semibold text-ink">{f.file}</p>
                <p className="font-mono text-[9.5px] tracking-[0.06em] text-slate-400 uppercase">
                  {f.deal} · {f.kind} · {f.size} · {f.updated}
                </p>
              </div>
              <BadgeCheck className="h-4 w-4 text-slate-200 transition-colors group-hover:text-rise" />
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}
