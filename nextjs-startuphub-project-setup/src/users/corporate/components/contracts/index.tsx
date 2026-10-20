import {
  CalendarDays,
  Download,
  FileText,
  PenLine,
  RefreshCcw,
  Scale,
  ShieldCheck,
} from "lucide-react";
import { Chip, Panel } from "@/components/app/widgets";
import { PageHead, SubjectBanner } from "@/components/app/boards";
import { CONTRACTS, CONTRACT_SUBJECT, RENEWALS } from "../../constants/corporate-data";
import { CORP_DOCS } from "../../constants/ops-data";

const CT_TONE: Record<string, "rise" | "amber" | "accent" | "slate"> = {
  Active: "rise", Renewal: "amber", Negotiation: "amber", Draft: "accent",
  Review: "accent", Expired: "slate", Terminated: "slate",
};

/* ── Contract Management ────────────────────────────────────── */
export function ContractManagement() {
  return (
    <div className="space-y-5">
      <PageHead
        title="Contract management"
        sub="Pilot, partnership, vendor and research agreements across lifecycle"
        action={<button className="rounded-lg bg-accent px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-accent-deep">+ New contract</button>}
      />
      <div className="no-scrollbar flex gap-2 overflow-x-auto">
        {["All", "Draft", "Under Review", "Negotiation", "Active", "Expired"].map((s, i) => (
          <button key={s} className={`shrink-0 rounded-lg border px-3.5 py-2 text-[12.5px] font-semibold ${i === 0 ? "border-accent bg-accent text-white" : "border-line bg-white text-slate-500 hover:text-ink"}`}>{s}</button>
        ))}
      </div>
      <Panel pad={false}>
        <ul className="divide-y divide-line">
          {CONTRACTS.map((c) => (
            <li key={c.id} className="flex flex-wrap items-center gap-4 px-5 py-4 transition-colors hover:bg-soft">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-soft text-accent">
                <FileText className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[13.5px] font-semibold text-ink">{c.party}</p>
                <p className="mt-0.5 font-mono text-[9.5px] tracking-[0.06em] text-slate-400 uppercase">
                  {c.id} · {c.type} · {c.window}
                </p>
              </div>
              <span className="font-mono text-[12.5px] font-semibold text-ink">{c.value}</span>
              <Chip tone={CT_TONE[c.status]}>{c.status}</Chip>
              <a href="/corporate/contracts/review" className="rounded-lg border border-line px-3.5 py-2 text-[12px] font-semibold text-ink hover:bg-white">Open</a>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}

/* ── Active Contracts ───────────────────────────────────────── */
export function ActiveContracts() {
  const active = CONTRACTS.filter((c) => c.status === "Active");
  return (
    <div className="space-y-5">
      <PageHead title="Active contracts" sub={`${active.length} agreements currently in force`} />
      <div className="grid gap-4 sm:grid-cols-2">
        {active.map((c) => (
          <Panel key={c.id} className="transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft">
            <div className="flex items-start justify-between">
              <Chip tone="rise">Active</Chip>
              <span className="font-mono text-[10px] text-slate-400">{c.id}</span>
            </div>
            <h3 className="mt-3 text-[15.5px] font-semibold text-ink">{c.party}</h3>
            <p className="mt-0.5 text-[12px] text-slate-400">{c.type}</p>
            <div className="mt-4 grid grid-cols-2 gap-2 text-center">
              <div className="rounded-lg bg-soft p-2.5">
                <p className="text-[13px] font-semibold text-ink">{c.value}</p>
                <p className="font-mono text-[8px] tracking-[0.1em] text-slate-400 uppercase">Value</p>
              </div>
              <div className="rounded-lg bg-soft p-2.5">
                <p className="text-[11px] font-semibold text-ink">{c.window}</p>
                <p className="font-mono text-[8px] tracking-[0.1em] text-slate-400 uppercase">Window</p>
              </div>
            </div>
          </Panel>
        ))}
      </div>
    </div>
  );
}

/* ── Contract Requests ──────────────────────────────────────── */
export function ContractRequests() {
  const reqs = [
    { id: "CR-032", kind: "Vendor MSA", party: "Vertex Labs & Compute", by: "A. Bhatt · Procurement", status: "Legal review", note: "Custom SLA clauses for lab downtime" },
    { id: "CR-031", kind: "Pilot agreement", party: "BioShell", by: "R. Agarwal", status: "Approved", note: "Standard template v5 — no edits" },
    { id: "CR-029", kind: "Amendment", party: "Terragrid", by: "S. Menon · Legal", status: "In progress", note: "Data freshness SLA counter folded in" },
    { id: "CR-026", kind: "NDA", party: "VisionHarvest", by: "R. Agarwal", status: "Signed", note: "Mutual standard v3" },
  ];
  const REQ_TONE: Record<string, "rise" | "amber" | "accent" | "ink"> = {
    "Legal review": "amber", Approved: "rise", Signed: "rise", "In progress": "accent", Rejected: "ink",
  };
  return (
    <div className="space-y-5">
      <PageHead title="Contract requests" sub="New agreements and amendments moving through legal" />
      <Panel pad={false}>
        <ul className="divide-y divide-line">
          {reqs.map((r) => (
            <li key={r.id} className="grid items-center gap-3 px-5 py-4.5 transition-colors hover:bg-soft sm:grid-cols-[1fr_auto_auto]">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-[13.5px] font-semibold text-ink">{r.kind} · {r.party}</p>
                  <Chip tone="line">{r.id}</Chip>
                </div>
                <p className="mt-0.5 text-[11.5px] text-slate-400">{r.by} · {r.note}</p>
              </div>
              <Chip tone={REQ_TONE[r.status]}>{r.status}</Chip>
              <button className="flex items-center gap-1.5 rounded-lg border border-line px-3 py-2 text-[12px] font-semibold text-ink hover:bg-white">
                <PenLine className="h-3 w-3" /> Review
              </button>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}

/* ── Contract Review ────────────────────────────────────────── */
export function ContractReview() {
  const c = CONTRACT_SUBJECT;
  return (
    <div className="space-y-5">
      <SubjectBanner
        kicker="Contract review · renewal"
        title={c.id}
        meta="Legal + finance + innovation office alignment pass"
        score={86}
        action={<Chip tone="amber" className="px-3 py-1.5">1 counter open</Chip>}
      />
      <Panel title="Terms under review" pad={false}>
        <ul className="divide-y divide-line">
          {c.terms.map((t) => (
            <li key={t.clause} className="grid items-center gap-2 px-5 py-4 sm:grid-cols-[170px_1fr_auto]">
              <span className="text-[13px] font-semibold text-ink">{t.clause}</span>
              <span className="text-[12.5px] text-slate-600">{t.detail}</span>
              <Chip tone={t.status === "Agreed" ? "rise" : t.status === "Counter" ? "amber" : "accent"}>{t.status}</Chip>
            </li>
          ))}
        </ul>
      </Panel>
      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Obligations" action={<ShieldCheck className="h-4 w-4 text-rise" />}>
          <p className="text-[13px] leading-relaxed text-slate-600">{c.obligations}</p>
        </Panel>
        <Panel title="Risk & counsel note" action={<Scale className="h-4 w-4 text-slate-300" />}>
          <p className="text-[13px] leading-relaxed text-slate-600">{c.risk}</p>
        </Panel>
      </div>
    </div>
  );
}

/* ── Renewals ───────────────────────────────────────────────── */
export function Renewals() {
  return (
    <div className="space-y-5">
      <PageHead
        title="Renewals"
        sub="Expiring contracts and renewal decisions — 90-day radar"
        action={<Chip tone="amber" className="px-3 py-1.5"><RefreshCcw className="h-3 w-3" /> 3 in window</Chip>}
      />
      <Panel pad={false}>
        <ul className="divide-y divide-line">
          {RENEWALS.map((r) => (
            <li key={r.contract} className="flex flex-wrap items-center gap-4 px-5 py-4.5 transition-colors hover:bg-soft">
              <CalendarDays className="h-4.5 w-4.5 shrink-0 text-slate-300" />
              <div className="min-w-0 flex-1">
                <p className="text-[14px] font-semibold text-ink">{r.contract}</p>
                <p className="mt-0.5 font-mono text-[9.5px] tracking-[0.08em] text-slate-400 uppercase">expires {r.expiry} · {r.value}</p>
              </div>
              <span className="text-[12.5px] font-medium text-ink">{r.action}</span>
              <Chip tone={r.status === "Draft ready" ? "rise" : r.status === "Decided" ? "amber" : "accent"}>{r.status}</Chip>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}

/* ── Contract Documents ─────────────────────────────────────── */
export function ContractDocuments() {
  return (
    <div className="space-y-5">
      <PageHead title="Contract documents" sub="Agreements, NDAs, amendments and signature packets" />
      <Panel pad={false}>
        <ul className="divide-y divide-line">
          {CORP_DOCS.map((d) => (
            <li key={d.id} className="group flex items-center gap-4 px-5 py-3.5 transition-colors hover:bg-soft">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-soft text-accent">
                <FileText className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-semibold text-ink">{d.file}</p>
                <p className="font-mono text-[9.5px] tracking-[0.06em] text-slate-400 uppercase">{d.area} · {d.size} · {d.updated} · {d.ver}</p>
              </div>
              <Chip tone="line">{d.area}</Chip>
              <button aria-label="Download" className="flex h-8 w-8 items-center justify-center rounded-lg border border-line text-slate-400 hover:border-accent/40 hover:text-accent">
                <Download className="h-3.5 w-3.5" />
              </button>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}
