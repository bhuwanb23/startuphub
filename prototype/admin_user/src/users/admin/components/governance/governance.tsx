"use client";

import { ShieldCheck } from "lucide-react";
import { Panel, Stat } from "@/components/app/widgets";
import {
  AUDIT_EVENTS,
  MODERATION_CASES,
  MODERATION_CHECKLIST,
  VERIFICATION_CASES,
  VERIFICATION_CHECKLIST,
  type AuditEvent,
} from "../../constants/governance";
import { FlowBar, Note, PageHead, StatusPill } from "../shared/bits";
import { CaseReview } from "../shared/case-review";
import { Directory, type DirCol } from "../shared/directory";

/* ============================== VERIFICATION =============================== */

export function VerificationAdmin() {
  return (
    <div className="mx-auto max-w-6xl space-y-5">
      <PageHead
        eyebrow="Governance"
        title="Verification Management"
        description="A dedicated review workspace — queues, evidence, decisions and SLA. Every decision records reviewer, rationale and timestamp."
      />
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Stat label="Open requests" value="42" delta="8 in your queue" tone="flat" />
        <Stat label="Decisions today" value="26" delta="84% within SLA" tone="up" />
        <Stat label="Overdue cases" value="4" delta="2 escalated" tone="down" />
        <Stat label="Reverification due (30d)" value="31" hint="auto-generated cases" />
      </div>
      <FlowBar current={3} />
      <CaseReview
        title="Verification queues"
        cases={VERIFICATION_CASES}
        checklist={VERIFICATION_CHECKLIST}
        decisions={[
          { label: "Approve", next: "Approved", tone: "approve" },
          { label: "Request information", next: "Needs info", tone: "request", requireNote: true },
          { label: "Reject", next: "Rejected", tone: "reject", requireNote: true },
          { label: "Escalate", next: "Escalated", tone: "escalate" },
        ]}
      />
    </div>
  );
}

/* =============================== MODERATION ================================ */

export function ModerationAdmin() {
  return (
    <div className="mx-auto max-w-6xl space-y-5">
      <PageHead
        eyebrow="Governance"
        title="Moderation"
        description="Reports, detections, enforcement and appeals. Serious actions are proportionate, evidenced and appealable."
      />
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Stat label="Open cases" value="42" delta="6 escalated" tone="flat" />
        <Stat label="Resolved this week" value="118" delta="avg 9.2h" tone="up" />
        <Stat label="Appeals pending" value="3" delta="independent review" tone="flat" />
        <Stat label="False-positive rate" value="4.1%" delta="-0.8 pts" tone="up" />
      </div>
      <Note title="Appeals are independently reviewed">
        Cases flagged “Appeal” are locked to a different reviewer than the original
        decision-maker. Automated risk signals are evidence — never proof.
      </Note>
      <CaseReview
        title="Moderation queues"
        cases={MODERATION_CASES}
        checklist={MODERATION_CHECKLIST}
        docsLabel="Evidence & attachments"
        decisions={[
          { label: "Dismiss report", next: "Dismissed", tone: "approve" },
          { label: "Issue warning", next: "Warned", tone: "request" },
          { label: "Restrict content", next: "Restricted", tone: "escalate", requireNote: true },
          { label: "Suspend account", next: "Resolved", tone: "reject", requireNote: true },
        ]}
        banner={
          <div className="flex items-center gap-2.5 rounded-xl border border-accent/20 bg-accent-soft/50 px-4 py-3 text-[12px] font-medium text-accent">
            <ShieldCheck className="h-4 w-4 shrink-0" />
            Enforcement actions notify the affected user with policy citation and
            open a 14-day appeal window.
          </div>
        }
      />
    </div>
  );
}

/* ================================ AUDIT LOGS =============================== */

export function AuditAdmin() {
  const columns: DirCol<AuditEvent>[] = [
    { id: "time", label: "Time", raw: (r) => r.time, cell: (r) => <span className="whitespace-nowrap text-[12px] font-medium text-slate-500">{r.time}</span> },
    {
      id: "actor", label: "Actor", sortValue: (r) => r.actor, raw: (r) => r.actor,
      cell: (r) => (
        <div>
          <p className="text-[12.5px] font-semibold text-ink">{r.actor}</p>
          <p className="text-[11px] text-slate-400">{r.role}</p>
        </div>
      ),
    },
    { id: "module", label: "Module", raw: (r) => r.module, cell: (r) => <span className="text-[12.5px] text-slate-600">{r.module}</span> },
    {
      id: "action", label: "Action", raw: (r) => r.action,
      cell: (r) => <code className="rounded bg-soft px-1.5 py-0.5 font-mono text-[11px] text-accent">{r.action}</code>,
    },
    { id: "target", label: "Target", raw: (r) => r.target, cell: (r) => <span className="text-[12px] text-slate-500">{r.target}</span> },
    { id: "severity", label: "Severity", raw: (r) => r.severity, cell: (r) => <StatusPill status={r.severity} /> },
    { id: "outcome", label: "Outcome", raw: (r) => r.outcome, cell: (r) => <StatusPill status={r.outcome} /> },
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-5">
      <PageHead
        eyebrow="Governance"
        title="Audit Logs"
        description="Tamper-evident history of significant platform and administrative activity — separate from user activity feeds."
      />
      <Note title="Integrity">
        Audit records are hash-chained and retention-locked (400 days). Admins cannot
        edit or delete records of their own actions. Exporting the audit log is itself
        an audited event.
      </Note>
      <Directory<AuditEvent>
        rows={AUDIT_EVENTS}
        columns={columns}
        searchPlaceholder="Search actor, action, target or correlation ID…"
        searchText={(r) => `${r.actor} ${r.action} ${r.target} ${r.correlation} ${r.module}`}
        chips={{
          id: "module", label: "Module",
          options: ["Users", "Verification", "Moderation", "Payments", "AI", "Content", "Permissions", "Auth", "Reports", "Subscriptions", "Ecosystem"].map((v) => ({ value: v, label: v })),
          match: (r, v) => r.module === v,
        }}
        selects={[
          { id: "severity", label: "Severity", options: ["Normal", "High", "Critical"].map((v) => ({ value: v, label: v })), match: (r, v) => r.severity === v },
          { id: "outcome", label: "Outcome", options: ["Success", "Failed", "Denied"].map((v) => ({ value: v, label: v })), match: (r, v) => r.outcome === v },
        ]}
        status={{ get: (r) => r.outcome }}
        rowName={(r) => `${r.actor} · ${r.action}`}
        exportName="startuphub-audit.csv"
        detail={(r) => {
          const sections: { title: string; body: React.ReactNode }[] = [];
          if (r.before || r.after) {
            sections.push({
              title: "Before / after",
              body: (
                <div className="grid grid-cols-2 gap-2">
                  <div className="rounded-lg bg-soft px-3 py-2">
                    <p className="text-[9.5px] font-semibold uppercase tracking-wider text-slate-400">Before</p>
                    <p className="mt-0.5 font-mono text-[11px] text-slate-600">{r.before ?? "—"}</p>
                  </div>
                  <div className="rounded-lg bg-accent-soft px-3 py-2">
                    <p className="text-[9.5px] font-semibold uppercase tracking-wider text-accent">After</p>
                    <p className="mt-0.5 font-mono text-[11px] text-accent">{r.after ?? "—"}</p>
                  </div>
                </div>
              ),
            });
          }
          if (r.reason) {
            sections.push({
              title: "Reason / justification",
              body: <p className="rounded-lg bg-soft px-3 py-2 text-[12.5px] italic text-slate-600">“{r.reason}”</p>,
            });
          }
          return {
            title: r.action,
            subtitle: `${r.module} · ${r.correlation}`,
            status: r.outcome,
            fields: [
              { label: "Actor", value: `${r.actor} (${r.role})` },
              { label: "Target", value: r.target },
              { label: "Severity", value: r.severity },
              { label: "Session / IP", value: r.ip },
            ],
            sections,
            timeline: r.timeline,
          };
        }}
      />
    </div>
  );
}
