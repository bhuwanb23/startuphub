import {
  Award,
  BadgeCheck,
  Building2,
  FilePlus2,
  Scale,
  Search,
  ShieldCheck,
  ShoppingCart,
} from "lucide-react";
import { Bar, Chip, Panel, StatCard } from "@/components/app/widgets";
import { PageHead } from "@/components/app/boards";
import {
  PROC_HISTORY,
  PROC_OPPORTUNITIES,
  PURCHASE_REQUESTS,
  VENDORS,
} from "../../constants/corporate-data";

const VENDOR_TONE: Record<string, "rise" | "accent" | "amber" | "slate"> = {
  "Approved vendor": "rise", Active: "rise", Evaluation: "amber", Legacy: "slate",
};
const OPP_TONE: Record<string, "rise" | "accent" | "amber"> = {
  Awarded: "rise", Evaluation: "amber", Open: "accent",
};
const PR_TONE: Record<string, "rise" | "amber" | "accent" | "ink"> = {
  "Pending approval": "amber", Approved: "rise", "In procurement": "accent", Rejected: "ink",
};

/* ── Vendor Discovery ───────────────────────────────────────── */
export function VendorDiscovery() {
  return (
    <div className="space-y-5">
      <PageHead
        title="Vendor discovery"
        sub="Startup vendors, technology vendors and certified providers"
        action={<button className="flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-accent-deep"><Search className="h-3.5 w-3.5" /> Advanced search</button>}
      />
      <div className="no-scrollbar flex gap-2 overflow-x-auto">
        {["All", "Startup vendors", "Technology vendors", "Service providers", "Certified"].map((s, i) => (
          <button key={s} className={`shrink-0 rounded-lg border px-3.5 py-2 text-[12.5px] font-semibold ${i === 0 ? "border-accent bg-accent text-white" : "border-line bg-white text-slate-500 hover:text-ink"}`}>{s}</button>
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {VENDORS.map((v) => (
          <Panel key={v.id} className="transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3.5">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-soft text-accent">
                  <Building2 className="h-4.5 w-4.5" />
                </span>
                <div>
                  <h3 className="text-[14.5px] font-semibold text-ink">{v.name}</h3>
                  <p className="mt-0.5 font-mono text-[9.5px] tracking-[0.08em] text-slate-400 uppercase">{v.category}</p>
                </div>
              </div>
              <Chip tone={VENDOR_TONE[v.status]}>{v.status}</Chip>
            </div>
            <p className="mt-3 text-[12.5px] text-slate-600">{v.product} · <span className="font-medium text-ink">{v.pricing}</span></p>
            <div className="mt-4 flex items-center gap-3 border-t border-line pt-3.5">
              <span className="text-[11px] font-medium text-slate-400">Vendor score</span>
              <Bar pct={v.score} className="flex-1" barClass={v.score >= 85 ? "bg-rise" : v.score >= 70 ? "bg-accent" : "bg-amber-dim"} />
              <span className="font-mono text-[11.5px] font-bold text-ink">{v.score}</span>
            </div>
          </Panel>
        ))}
      </div>
    </div>
  );
}

/* ── Vendor Management ──────────────────────────────────────── */
export function VendorManagement() {
  return (
    <div className="space-y-5">
      <PageHead
        title="Vendor management"
        sub="Active vendors with performance, compliance and risk posture"
        action={<Chip tone="amber" className="px-3 py-1.5">1 legacy vendor scheduled to exit</Chip>}
      />
      <Panel pad={false}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-left">
            <thead>
              <tr className="border-b border-line">
                {["Vendor", "Score", "Compliance", "Performance note", "Status"].map((h) => (
                  <th key={h} className="px-5 py-3.5 font-mono text-[9.5px] font-medium tracking-[0.16em] text-slate-400 uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {VENDORS.map((v) => (
                <tr key={v.id} className="transition-colors hover:bg-soft">
                  <td className="px-5 py-4">
                    <p className="text-[13px] font-semibold text-ink">{v.name}</p>
                    <p className="text-[10.5px] text-slate-400">{v.id} · {v.category}</p>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <Bar pct={v.score} className="w-16" barClass={v.score >= 85 ? "bg-rise" : "bg-accent"} />
                      <span className="font-mono text-[11.5px] font-semibold text-ink">{v.score}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    {v.score >= 75 ? (
                      <Chip tone="rise"><ShieldCheck className="h-3 w-3" /> Verified</Chip>
                    ) : (
                      <Chip tone="amber">Review due</Chip>
                    )}
                  </td>
                  <td className="px-5 py-4 text-[12px] text-slate-500">
                    {v.status === "Legacy" ? "Support gaps; migrating away" : v.score >= 85 ? "On-time delivery ≥ 96%" : "Under evaluation — packet incomplete"}
                  </td>
                  <td className="px-5 py-4"><Chip tone={VENDOR_TONE[v.status]}>{v.status}</Chip></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}

/* ── Procurement Opportunities ──────────────────────────────── */
export function ProcurementOpportunities() {
  return (
    <div className="space-y-5">
      <PageHead
        title="Procurement opportunities"
        sub="RFPs, RFQs and RFIs — with startup fast-track lane"
        action={
          <button className="flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-accent-deep">
            <FilePlus2 className="h-3.5 w-3.5" /> Create RFP
          </button>
        }
      />
      <div className="grid gap-4 lg:grid-cols-3">
        {PROC_OPPORTUNITIES.map((o) => (
          <Panel key={o.id} className="transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft">
            <div className="flex items-start justify-between">
              <Chip tone="ink">{o.kind}</Chip>
              <Chip tone={OPP_TONE[o.status]}>{o.status}</Chip>
            </div>
            <h3 className="mt-3 text-[15px] leading-snug font-semibold text-ink">{o.title}</h3>
            <p className="mt-1 font-mono text-[10.5px] text-slate-400">{o.id} · value {o.value}</p>
            <div className="mt-4 grid grid-cols-2 gap-2 text-center">
              <div className="rounded-lg bg-soft p-2.5">
                <p className="text-[15px] font-semibold text-ink">{o.responses}</p>
                <p className="font-mono text-[8px] tracking-[0.1em] text-slate-400 uppercase">Responses</p>
              </div>
              <div className="rounded-lg bg-soft p-2.5">
                <p className="text-[15px] font-semibold text-ink">{o.shortlisted}</p>
                <p className="font-mono text-[8px] tracking-[0.1em] text-slate-400 uppercase">Shortlisted</p>
              </div>
            </div>
            {o.status === "Awarded" && (
              <div className="mt-3.5 rounded-lg bg-rise-tint px-3 py-2 text-[11.5px] font-semibold text-rise">
                Awarded to CropLens AI · countersign pending
              </div>
            )}
          </Panel>
        ))}
      </div>
    </div>
  );
}

/* ── Purchase Requests ──────────────────────────────────────── */
export function PurchaseRequests() {
  return (
    <div className="space-y-5">
      <PageHead
        title="Purchase requests"
        sub="BU requests through the approval workflow"
        action={<button className="flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-accent-deep"><ShoppingCart className="h-3.5 w-3.5" /> New request</button>}
      />
      <Panel pad={false}>
        <ul className="divide-y divide-line">
          {PURCHASE_REQUESTS.map((p) => (
            <li key={p.id} className="grid items-center gap-3 px-5 py-4.5 transition-colors hover:bg-soft sm:grid-cols-[1fr_110px_110px_auto]">
              <div className="min-w-0">
                <p className="text-[13.5px] font-semibold text-ink">{p.item}</p>
                <p className="mt-0.5 font-mono text-[9.5px] tracking-[0.06em] text-slate-400 uppercase">{p.id} · {p.bu}</p>
              </div>
              <span className="font-mono text-[12.5px] font-semibold text-ink">{p.amount}</span>
              <span className="text-[11.5px] text-slate-400">→ {p.approver}</span>
              <Chip tone={PR_TONE[p.status]}>{p.status}</Chip>
            </li>
          ))}
        </ul>
      </Panel>
      <div className="rounded-xl border border-accent/20 bg-accent-mist px-5 py-4 text-[13px] text-ink">
        <b className="text-accent">PR-0812 pending CPO:</b> 6 phase-2 QC stations pre-negotiated
        at phase-1 terms +7% volume discount. Recommended action: approve Apr 08 alongside
        mid-pilot KPI review.
      </div>
    </div>
  );
}

/* ── Procurement History ────────────────────────────────────── */
export function ProcurementHistory() {
  return (
    <div className="space-y-5">
      <PageHead title="Procurement history" sub="Completed purchases — value, vendor performance and savings" />
      <Panel pad={false}>
        <ul className="divide-y divide-line">
          {PROC_HISTORY.map((h) => (
            <li key={h.item} className="grid items-center gap-3 px-5 py-4.5 sm:grid-cols-[1fr_130px_1fr_130px]">
              <div>
                <p className="text-[13.5px] font-semibold text-ink">{h.item}</p>
                <p className="mt-0.5 font-mono text-[9.5px] tracking-[0.06em] text-slate-400 uppercase">{h.vendor}</p>
              </div>
              <span className="font-mono text-[12.5px] font-semibold text-ink">{h.value}</span>
              <span className="text-[12px] text-slate-500">{h.supplier}</span>
              <span className="text-[12px] font-semibold text-rise">{h.saving}</span>
            </li>
          ))}
        </ul>
      </Panel>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <StatCard label="FY26 procurement via startups" value="₹1.9 Cr" delta="+58% vs FY25" icon={ShoppingCart} />
        <StatCard label="Measured savings" value="₹2.7 Cr" delta="startup-sourced" icon={BadgeCheck} />
        <StatCard label="Vendor rating avg." value="4.4★" delta="active vendors" icon={Scale} />
      </div>
    </div>
  );
}
