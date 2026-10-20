import {
  ArrowDownRight,
  ArrowUpRight,
  Banknote,
  CreditCard,
  Download,
  FilePlus2,
  Landmark,
  Receipt,
  RefreshCcw,
  Wallet,
} from "lucide-react";
import { Bar, Chip, Panel, Spark, StatCard } from "@/components/app/widgets";
import { PageHead } from "@/components/app/boards";
import {
  EARNINGS_SERIES,
  INVOICES,
  PAYMENT_SUMMARY,
  PAYOUTS,
  TRANSACTIONS,
} from "../../constants/provider-data";

const TXN_TONE: Record<string, "rise" | "amber" | "ink" | "slate"> = {
  Completed: "rise", Pending: "amber", Failed: "ink", Refunded: "slate",
};
const INV_TONE: Record<string, "rise" | "accent" | "amber" | "ink" | "slate"> = {
  Generated: "accent", Sent: "accent", Paid: "rise", Overdue: "amber", Cancelled: "slate",
};
const PAYO_TONE: Record<string, "rise" | "accent"> = { Completed: "rise", Scheduled: "accent" };

/* ── Payment Overview ───────────────────────────────────────── */
export function PaymentOverview() {
  const s = PAYMENT_SUMMARY;
  return (
    <div className="space-y-5">
      <PageHead
        title="Payment overview"
        sub="Earnings, pending payments and available balance"
        action={<a href="/provider/payments/payouts" className="rounded-lg bg-accent px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-accent-deep">Request payout</a>}
      />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="Total earnings FY26" value={s.totalEarnings} delta="+31% YoY" icon={Banknote} />
        <StatCard label="Available balance" value={s.availableBalance} delta="payout Apr 03" icon={Wallet} />
        <StatCard label="Pending payments" value={s.pending} delta="2 invoices" icon={CreditCard} deltaGood={false} />
        <StatCard label="Refunds this month" value="₹9.9K" delta="0.9% of volume" icon={RefreshCcw} />
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Recent transactions" pad={false} action={<a href="/provider/payments/transactions" className="text-[12px] font-semibold text-accent">All →</a>}>
          <ul className="divide-y divide-line">
            {TRANSACTIONS.slice(0, 4).map((t) => (
              <li key={t.id} className="flex items-center gap-3.5 px-5 py-3.5">
                <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${t.amount.startsWith("+") ? "bg-rise-tint text-rise" : "bg-slate-100 text-slate-500"}`}>
                  {t.amount.startsWith("+") ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[12.5px] font-semibold text-ink">{t.from} — {t.for}</p>
                  <p className="font-mono text-[9px] tracking-[0.08em] text-slate-400 uppercase">{t.id} · {t.date}</p>
                </div>
                <span className={`font-mono text-[12px] font-semibold ${t.amount.startsWith("+") ? "text-rise" : "text-slate-500"}`}>{t.amount}</span>
                <Chip tone={TXN_TONE[t.status]}>{t.status}</Chip>
              </li>
            ))}
          </ul>
        </Panel>
        <Panel title="Next payout" sub="Scheduled · Thursdays weekly">
          <div className="flex items-center justify-between rounded-xl border border-line p-4.5">
            <div>
              <p className="font-mono text-[9px] tracking-[0.16em] text-slate-400 uppercase">Paying out</p>
              <p className="mt-1 text-[26px] font-semibold tracking-tight text-ink">₹9.4 L</p>
              <p className="mt-0.5 text-[11.5px] text-slate-400">to HDFC ····4821 · Apr 03</p>
            </div>
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-rise-tint text-rise">
              <Landmark className="h-5 w-5" />
            </span>
          </div>
          <ul className="mt-4 space-y-2.5 text-[12.5px]">
            <li className="flex justify-between"><span className="text-slate-500">Platform fee</span><span className="font-mono text-ink">7% (min-plan)</span></li>
            <li className="flex justify-between"><span className="text-slate-500">GST on fees</span><span className="font-mono text-ink">Collected in invoice</span></li>
            <li className="flex justify-between"><span className="text-slate-500">Failed txns held</span><span className="font-mono text-amber-dim">₹4,200 retry Fri</span></li>
          </ul>
        </Panel>
      </div>
    </div>
  );
}

/* ── Transactions ───────────────────────────────────────────── */
export function TransactionsPage() {
  return (
    <div className="space-y-5">
      <PageHead title="Transactions" sub="Resource, service and booking payments plus refunds" />
      <div className="no-scrollbar flex gap-2 overflow-x-auto">
        {["All", "Resource payments", "Service payments", "Booking payments", "Refunds", "Failed"].map((s, i) => (
          <button key={s} className={`shrink-0 rounded-lg border px-3.5 py-2 text-[12.5px] font-semibold ${i === 0 ? "border-accent bg-accent text-white" : "border-line bg-white text-slate-500 hover:text-ink"}`}>{s}</button>
        ))}
      </div>
      <Panel pad={false}>
        <ul className="divide-y divide-line">
          {TRANSACTIONS.map((t) => (
            <li key={t.id} className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-soft">
              <span className={`flex h-9 w-9 items-center justify-center rounded-lg ${t.amount.startsWith("+") ? "bg-rise-tint text-rise" : "bg-slate-100 text-slate-500"}`}>
                {t.amount.startsWith("+") ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-semibold text-ink">{t.from}</p>
                <p className="mt-0.5 text-[11.5px] text-slate-400">{t.for}</p>
              </div>
              <span className="font-mono text-[10px] text-slate-400">{t.id} · {t.date}</span>
              <span className={`w-24 text-right font-mono text-[12.5px] font-semibold ${t.amount.startsWith("+") ? "text-rise" : "text-slate-500"}`}>{t.amount}</span>
              <Chip tone={TXN_TONE[t.status]}>{t.status}</Chip>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}

/* ── Earnings ───────────────────────────────────────────────── */
export function EarningsPage() {
  return (
    <div className="space-y-5">
      <PageHead title="Earnings" sub="Resource + service earnings with monthly trends" />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <StatCard label="Resource earnings" value="₹41.7 L" delta="86% of total" icon={Receipt} />
        <StatCard label="Service earnings" value="₹6.9 L" delta="staff services" icon={Wallet} />
        <StatCard label="Best month" value="₹4.8 L" delta="October" icon={Banknote} />
      </div>
      <Panel title="Monthly earnings trend" sub="₹ L · last 12 months">
        <div className="flex h-40 items-end gap-2">
          {EARNINGS_SERIES.map((v, i) => {
            const max = Math.max(...EARNINGS_SERIES);
            return (
              <div key={i} className="group relative flex-1">
                <div className={`w-full rounded-t-md transition-all group-hover:opacity-80 ${i === 8 ? "bg-rise" : "bg-accent/30"}`} style={{ height: `${(v / max) * 148 + 6}px` }} />
                <span className="pointer-events-none absolute -top-6 left-1/2 -translate-x-1/2 rounded bg-ink px-1.5 py-0.5 font-mono text-[9px] text-white opacity-0 transition-opacity group-hover:opacity-100">₹{v}L</span>
              </div>
            );
          })}
        </div>
        <div className="mt-2 flex justify-between font-mono text-[9px] text-slate-400">
          <span>Apr'25</span><span>Aug'25</span><span>Dec'25</span><span>Mar'26</span>
        </div>
      </Panel>
    </div>
  );
}

/* ── Invoices ───────────────────────────────────────────────── */
export function InvoicesPage() {
  return (
    <div className="space-y-5">
      <PageHead
        title="Invoices"
        sub="GST-compliant invoices — sent, paid, overdue and cancelled"
        action={
          <button className="flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-accent-deep">
            <FilePlus2 className="h-3.5 w-3.5" /> Create invoice
          </button>
        }
      />
      <Panel pad={false}>
        <ul className="divide-y divide-line">
          {INVOICES.map((i) => (
            <li key={i.id} className="flex flex-wrap items-center gap-4 px-5 py-4 transition-colors hover:bg-soft">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-soft text-accent">
                <Receipt className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-semibold text-ink">{i.startup}</p>
                <p className="font-mono text-[9.5px] tracking-[0.06em] text-slate-400 uppercase">{i.id} · due {i.due}</p>
              </div>
              <span className="font-mono text-[13px] font-semibold text-ink">{i.amount}</span>
              <Chip tone={INV_TONE[i.status]}>{i.status}</Chip>
              {i.status === "Overdue" && (
                <button className="rounded-lg border border-amber-dim/40 px-3 py-1.5 text-[11.5px] font-semibold text-amber-dim hover:bg-amber-tint">Nudge</button>
              )}
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

/* ── Payouts ────────────────────────────────────────────────── */
export function PayoutsPage() {
  return (
    <div className="space-y-5">
      <PageHead title="Payouts" sub="Weekly Thursday payouts to your verified account" />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <StatCard label="Available balance" value="₹9.4 L" delta="next payout Apr 03" icon={Wallet} />
        <StatCard label="Payout schedule" value="Weekly" delta="Thursdays 06:00" icon={Landmark} />
        <StatCard label="This FY paid out" value="₹39.2 L" delta="on-time 100%" icon={Banknote} />
      </div>
      <Panel title="Bank details" sub="Verified payout destination">
        <div className="flex items-center justify-between rounded-xl border border-line p-4.5">
          <div className="flex items-center gap-3.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-soft text-accent"><Landmark className="h-4.5 w-4.5" /></span>
            <div>
              <p className="text-[13.5px] font-semibold text-ink">HDFC Bank Current ····4821</p>
              <p className="text-[11.5px] text-slate-400">Vertex Infrastructure Pvt. Ltd. · IFSC HDFC0001234</p>
            </div>
          </div>
          <Chip tone="rise">Verified</Chip>
        </div>
      </Panel>
      <Panel title="Payout history" pad={false}>
        <ul className="divide-y divide-line">
          {PAYOUTS.map((p) => (
            <li key={p.id} className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-soft">
              <span className="font-mono text-[11px] text-slate-400">{p.id}</span>
              <span className="flex-1 text-[13px] font-medium text-ink">{p.amount}</span>
              <span className="font-mono text-[11px] text-slate-400">{p.bank}</span>
              <span className="font-mono text-[11px] text-slate-500">{p.date}</span>
              <Chip tone={PAYO_TONE[p.status]}>{p.status}</Chip>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}

/* ── Payment History ────────────────────────────────────────── */
export function PaymentHistory() {
  return (
    <div className="space-y-5">
      <PageHead
        title="Payment history"
        sub="Complete financial record — transactions, refunds and payouts with statements"
        action={<button className="rounded-lg border border-line bg-white px-4 py-2.5 text-[13px] font-semibold text-ink hover:bg-soft">Download statement</button>}
      />
      <Panel pad={false}>
        <ul className="divide-y divide-line">
          {[
            ...TRANSACTIONS.map((t) => ({ id: t.id, label: `${t.from} — ${t.for}`, amt: t.amount, status: t.status, date: t.date })),
            { id: "PO-118", label: "Payout to HDFC ····4821", amt: "−₹8.6 L", status: "Completed", date: "Apr 01" },
            { id: "INV-2026-0429", label: "Invoice issued · PortFolio Labs", amt: "₹8,800", status: "Overdue", date: "Mar 24" },
          ].sort(() => 0).map((x, i) => (
            <li key={`${x.id}-${i}`} className="flex items-center gap-4 px-5 py-3.5 transition-colors hover:bg-soft">
              <span className="font-mono text-[10px] text-slate-400">{x.id}</span>
              <span className="min-w-0 flex-1 truncate text-[12.5px] text-ink">{x.label}</span>
              <span className={`font-mono text-[11.5px] font-semibold ${x.amt.startsWith("+") ? "text-rise" : "text-ink"}`}>{x.amt}</span>
              <Chip tone={TXN_TONE[x.status] ?? INV_TONE[x.status] ?? "slate"}>{x.status}</Chip>
              <span className="font-mono text-[10px] text-slate-400">{x.date}</span>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}
