"use client";

import { useState } from "react";
import { Panel, Stat, Tag } from "@/components/app/widgets";
import {
  PLANS,
  RECON_EXCEPTIONS,
  REFUNDS,
  SUBSCRIPTIONS,
  TRANSACTIONS,
  type SubRow,
  type TxnRow,
} from "../../constants/finance";
import { useToast } from "../../hooks/use-toast";
import { FlowBar, Note, PageHead, StatusPill } from "../shared/bits";
import { Directory, type DirCol } from "../shared/directory";

/* ================================= PAYMENTS ================================ */

export function PaymentsAdmin() {
  const { show, viewport } = useToast();
  const [refunds, setRefunds] = useState(REFUNDS);
  const [exceptions, setExceptions] = useState(RECON_EXCEPTIONS);

  const approveRefund = (id: string) => {
    setRefunds((prev) => prev.filter((r) => r.id !== id));
    show(`Refund ${id} approved — gateway instruction sent, user notified`);
  };

  const columns: DirCol<TxnRow>[] = [
    {
      id: "txn", label: "Transaction", raw: (r) => r.txn,
      cell: (r) => (
        <div>
          <code className="font-mono text-[12px] font-semibold text-accent">{r.txn}</code>
          <p className="text-[11px] text-slate-400">{r.kind}</p>
        </div>
      ),
    },
    {
      id: "customer", label: "Customer", raw: (r) => r.customer,
      cell: (r) => (
        <div>
          <p className="text-[12.5px] font-semibold text-ink">{r.org}</p>
          <p className="text-[11px] text-slate-400">{r.customer}</p>
        </div>
      ),
    },
    { id: "method", label: "Method", raw: (r) => r.method, cell: (r) => <span className="text-[12px] text-slate-600">{r.method}</span> },
    { id: "amount", label: "Amount", align: "right", sortValue: (r) => r.amountNum, raw: (r) => r.amount, cell: (r) => <span className="text-[13px] font-semibold text-ink">{r.amount}</span> },
    { id: "status", label: "Status", raw: (r) => r.status, cell: (r) => <StatusPill status={r.status} /> },
    { id: "date", label: "Date", raw: (r) => r.date, cell: (r) => <span className="whitespace-nowrap text-[12px] text-slate-500">{r.date}</span> },
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <PageHead
        eyebrow="Finance"
        title="Payment Management"
        description="Transactions, refunds, settlements and reconciliation. Status comes from trusted gateway confirmation — never a frontend success message."
      />
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Stat label="Gross volume (30d)" value="₹4.21 Cr" delta="+11.8%" tone="up" />
        <Stat label="Success rate" value="97.4%" delta="+0.4 pts" tone="up" />
        <Stat label="Refunds pending" value={String(refunds.length)} delta="1 due today" tone="down" />
        <Stat label="Unreconciled" value="₹4.6L" delta="3 exceptions" tone="down" />
      </div>
      <FlowBar current={6} />

      <Directory<TxnRow>
        rows={TRANSACTIONS}
        columns={columns}
        searchPlaceholder="Search txn id, customer, organization, gateway ref…"
        searchText={(r) => `${r.txn} ${r.customer} ${r.org} ${r.gateway} ${r.kind} ${r.method}`}
        chips={{
          id: "status", label: "Status",
          options: ["Paid", "Pending", "Failed", "Refund pending", "Settled", "Chargeback"].map((v) => ({ value: v, label: v })),
          match: (r, v) => r.status === v,
        }}
        status={{ get: (r) => r.status }}
        rowName={(r) => r.txn}
        exportName="startuphub-transactions.csv"
        detail={(r, ctx) => ({
          title: r.txn,
          subtitle: `${r.kind} · ${r.org}`,
          status: ctx.status,
          fields: [
            { label: "Customer", value: r.customer },
            { label: "Amount", value: r.amount },
            { label: "Method", value: r.method },
            { label: "Gateway ref", value: <code className="font-mono text-[11.5px]">{r.gateway}</code> },
            { label: "Date", value: r.date },
          ],
          timeline: r.timeline,
          actions: [
            ...(r.status === "Paid" ? [{ label: "Issue refund", tone: "danger" as const, nextStatus: "Refund pending", requireReason: true }] : []),
            ...(r.status === "Pending" ? [{ label: "Mark confirmed", tone: "primary" as const, nextStatus: "Paid" }] : []),
            ...(r.status === "Failed" ? [{ label: "Retry payment", tone: "primary" as const, nextStatus: "Pending" }] : []),
            ...(r.status === "Chargeback" ? [{ label: "Submit evidence", tone: "neutral" as const, nextStatus: r.status }] : []),
          ],
        })}
      />

      <div className="grid gap-5 lg:grid-cols-2">
        {/* refunds */}
        <Panel
          title="Refund approvals"
          description="Policy-checked; approvals require reason + audit"
          action={<Tag tone="amber">{refunds.length} waiting</Tag>}
          bodyClassName="p-0"
        >
          <div className="divide-y divide-line/70">
            {refunds.map((r) => (
              <div key={r.id} className="px-5 py-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[13px] font-semibold text-ink">{r.customer} · {r.amount}</p>
                    <p className="mt-0.5 text-[11.5px] text-slate-400">{r.id} · {r.reason}</p>
                  </div>
                  <Tag tone={r.deadline === "Today" ? "rose" : "slate"}>{r.deadline}</Tag>
                </div>
                <div className="mt-3 flex gap-2">
                  <button
                    type="button"
                    onClick={() => approveRefund(r.id)}
                    className="rounded-lg bg-emerald-600 px-3 py-1.5 text-[11.5px] font-semibold text-white hover:bg-emerald-700"
                  >
                    Approve
                  </button>
                  <button
                    type="button"
                    onClick={() => show(`Decline requires a recorded reason — opened case ${r.id}`, true)}
                    className="rounded-lg border border-line px-3 py-1.5 text-[11.5px] font-semibold text-slate-500 hover:border-rose-300 hover:text-rose-600"
                  >
                    Decline
                  </button>
                </div>
              </div>
            ))}
            {refunds.length === 0 ? (
              <p className="px-5 py-8 text-center text-[12.5px] text-slate-400">Refund queue is clear.</p>
            ) : null}
          </div>
        </Panel>

        {/* reconciliation */}
        <Panel
          title="Reconciliation exceptions"
          description="Until resolved, these appear in every finance report"
          bodyClassName="p-0"
        >
          <div className="divide-y divide-line/70">
            {exceptions.map((e) => (
              <div key={e.id} className="flex items-center gap-4 px-5 py-4">
                <div className="min-w-0 flex-1">
                  <p className="text-[12.5px] font-semibold text-ink">{e.what}</p>
                  <p className="text-[11.5px] text-slate-400">{e.holder} · open {e.age}</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setExceptions((prev) => prev.filter((x) => x.id !== e.id));
                    show("Exception resolved — ledger entry written to audit");
                  }}
                  className="rounded-lg bg-accent px-3 py-1.5 text-[11.5px] font-semibold text-white hover:bg-accent-deep"
                >
                  Resolve
                </button>
              </div>
            ))}
            {exceptions.length === 0 ? (
              <p className="px-5 py-8 text-center text-[12.5px] text-slate-400">Books are fully reconciled.</p>
            ) : null}
          </div>
          <div className="border-t border-line p-5">
            <Note title="Gateway & webhooks">
              Razorpay (primary) · webhook sync 14s ago · signature verification on.
              Settlements T+2 via IMPS. Raw card data never touches StartupHub —
              tokenized at the gateway.
            </Note>
          </div>
        </Panel>
      </div>
      {viewport}
    </div>
  );
}

/* ============================== SUBSCRIPTIONS ================================ */

export function SubscriptionsAdmin() {
  const { show, viewport } = useToast();
  const [plans, setPlans] = useState(PLANS);

  const columns: DirCol<SubRow>[] = [
    {
      id: "org", label: "Organization", sortValue: (r) => r.org, raw: (r) => r.org,
      cell: (r) => <span className="text-[13px] font-semibold text-ink">{r.org}</span>,
    },
    { id: "plan", label: "Plan", raw: (r) => r.plan, cell: (r) => <span className="text-[12.5px] text-slate-600">{r.plan}</span> },
    { id: "seats", label: "Seats", align: "center", raw: (r) => r.seats, cell: (r) => <span className="text-[12px] text-slate-500">{r.seats}</span> },
    { id: "mrr", label: "MRR", align: "right", raw: (r) => r.mrr, cell: (r) => <span className="text-[12.5px] font-semibold text-ink">{r.mrr}</span> },
    { id: "renewal", label: "Renewal", raw: (r) => r.renewal, cell: (r) => <span className="text-[12px] text-slate-500">{r.renewal}</span> },
    { id: "status", label: "Status", raw: (r) => r.status, cell: (r) => <StatusPill status={r.status} /> },
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <PageHead
        eyebrow="Finance"
        title="Subscription Management"
        description="Plans, lifecycle and entitlements. Every plan change updates access consistently — proration, grace and cancellation rules are explicit."
      />
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Stat label="MRR" value="₹42.6L" delta="+6.2% MoM" tone="up" />
        <Stat label="Paid subscriptions" value="20,914" delta="+412" tone="up" />
        <Stat label="Past due" value="182" delta="grace ≤ 5d" tone="flat" />
        <Stat label="Churn (30d)" value="1.8%" delta="-0.3 pts" tone="up" />
      </div>

      {/* plan catalog */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {plans.map((p) => (
          <div key={p.id} className="flex flex-col rounded-2xl border border-line bg-white p-5 shadow-card">
            <div className="flex items-center justify-between gap-2">
              <p className="text-[13.5px] font-semibold text-ink">{p.name}</p>
              <StatusPill status={p.status} />
            </div>
            <p className="mt-2.5 text-[24px] font-semibold tracking-tight text-ink">{p.price}</p>
            <p className="text-[11.5px] text-slate-400">{p.interval} · {p.seats}</p>
            <div className="mt-3 space-y-1.5">
              {p.features.slice(0, 3).map((f) => (
                <p key={f} className="text-[11.5px] leading-snug text-slate-500">· {f}</p>
              ))}
              {p.features.length > 3 ? (
                <p className="text-[11px] font-medium text-accent">+{p.features.length - 3} more</p>
              ) : null}
            </div>
            <div className="mt-auto flex items-center justify-between pt-4 text-[11px] font-medium text-slate-400">
              <span>{p.subscribers.toLocaleString()} subscribers · {p.version}</span>
              <button
                type="button"
                onClick={() => {
                  setPlans((prev) => prev.map((x) => (x.id === p.id ? { ...x, status: x.status === "Deprecated" ? "Published" : "Deprecated" } : x)));
                  show(`Plan "${p.name}" ${p.status === "Deprecated" ? "re-published" : "deprecated — existing subscribers grandfathered"}`);
                }}
                className="font-semibold text-accent hover:underline"
              >
                {p.status === "Deprecated" ? "Re-publish" : "Deprecate"}
              </button>
            </div>
          </div>
        ))}
      </div>

      <Directory<SubRow>
        rows={SUBSCRIPTIONS}
        columns={columns}
        searchPlaceholder="Search organizations or plans…"
        searchText={(r) => `${r.org} ${r.plan} ${r.status}`}
        chips={{
          id: "status", label: "Status",
          options: ["Active", "Trialing", "Past due", "Suspended", "Cancelled"].map((v) => ({ value: v, label: v })),
          match: (r, v) => r.status === v,
        }}
        status={{ get: (r) => r.status }}
        rowName={(r) => r.org}
        exportName="startuphub-subscriptions.csv"
        bulkActions={[
          { label: "Extend grace +5d", nextStatus: "Past due", eligible: (r) => (r.status === "Past due" ? null : "Only past-due subscriptions") },
        ]}
        detail={(r, ctx) => ({
          title: r.org,
          subtitle: `${r.plan} plan · renews ${r.renewal}`,
          status: ctx.status,
          fields: [
            { label: "Plan", value: r.plan },
            { label: "Seats used", value: r.seats },
            { label: "MRR", value: r.mrr },
            { label: "Renewal", value: r.renewal },
          ],
          timeline: r.timeline,
          actions: [
            ...(r.status === "Active" ? [{ label: "Suspend", tone: "danger" as const, nextStatus: "Suspended", requireReason: true }] : []),
            ...(r.status === "Suspended" ? [{ label: "Reinstate", tone: "primary" as const, nextStatus: "Active" }] : []),
            ...(r.status === "Past due" ? [{ label: "Extend grace +5d", tone: "neutral" as const, nextStatus: "Past due" }, { label: "Force renewal attempt", tone: "primary" as const, nextStatus: "Active" }] : []),
            ...(r.status === "Trialing" ? [{ label: "Extend trial +7d", tone: "neutral" as const, nextStatus: "Trialing" }] : []),
            { label: "Adjust entitlement", tone: "neutral" as const, nextStatus: ctx.status, requireReason: true },
          ],
        })}
      />

      <Note title="Entitlement rules">
        Plan changes apply immediately with proration; failed renewals enter a 5-day
        grace with read-only access; suspension is read-none. Manual entitlement
        overrides require Finance Admin approval and expire automatically.
      </Note>
      {viewport}
    </div>
  );
}
