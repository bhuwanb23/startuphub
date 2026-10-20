"use client";

import { motion } from "framer-motion";
import {
  Check,
  CircleCheck,
  Clock4,
  FileText,
  Flag,
  ShieldAlert,
  UserPlus,
} from "lucide-react";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { useToast } from "../../hooks/use-toast";
import { StatusPill } from "./bits";
import type { TimelineEvent } from "./directory";

/* ---------------------------------- types ---------------------------------- */

export type ReviewDoc = { name: string; status: string };

export type ReviewCase = {
  id: number;
  queue: string;
  type: string;
  entity: string;
  applicant: string;
  severity: "Low" | "Medium" | "High" | "Critical";
  status: string;
  submitted: string;
  sla: string;
  overdue?: boolean;
  docs: ReviewDoc[];
  flags: string[];
  meta: { label: string; value: string }[];
  history: TimelineEvent[];
  appeal?: boolean;
};

export type Decision = {
  label: string;
  next: string;
  tone: "approve" | "reject" | "request" | "escalate";
  requireNote?: boolean;
};

const DECISION_STYLES: Record<Decision["tone"], string> = {
  approve: "bg-emerald-600 text-white hover:bg-emerald-700",
  reject: "bg-rose-600 text-white hover:bg-rose-700",
  request: "bg-amber-500 text-white hover:bg-amber-600",
  escalate: "bg-violet-600 text-white hover:bg-violet-700",
};

const SEVERITY_STYLES: Record<ReviewCase["severity"], string> = {
  Low: "bg-slate-100 text-slate-500",
  Medium: "bg-accent-soft text-accent",
  High: "bg-amber-50 text-amber-700",
  Critical: "bg-rose-50 text-rose-600",
};

/* -------------------------------- component -------------------------------- */

export function CaseReview({
  cases: initialCases,
  title,
  checklist,
  decisions,
  docsLabel = "Submitted documents",
  banner,
}: {
  cases: ReviewCase[];
  title: string;
  checklist: string[];
  decisions: Decision[];
  docsLabel?: string;
  banner?: React.ReactNode;
}) {
  const { show, viewport } = useToast();
  const [cases, setCases] = useState(initialCases);
  const [queue, setQueue] = useState("All");
  const [statusFilter, setStatusFilter] = useState("Open");
  const [activeId, setActiveId] = useState<number | null>(initialCases[0]?.id ?? null);
  const [checked, setChecked] = useState<Map<number, Set<number>>>(new Map());
  const [note, setNote] = useState("");
  const [pending, setPending] = useState<Decision | null>(null);
  const [assigned, setAssigned] = useState<Set<number>>(new Set());

  const queues = useMemo(
    () => ["All", ...Array.from(new Set(initialCases.map((c) => c.queue)))],
    [initialCases],
  );

  const statusOptions = ["Open", "Escalated", "Approved", "Rejected", "Needs info", "All"];
  const matchStatus = (c: ReviewCase, v: string) => {
    if (v === "All") return true;
    if (v === "Open") return !["Approved", "Rejected", "Dismissed", "Resolved"].includes(c.status);
    if (v === "Escalated") return c.status === "Escalated" || !!c.appeal;
    return c.status === v;
  };

  const visible = cases.filter(
    (c) => (queue === "All" || c.queue === queue) && matchStatus(c, statusFilter),
  );
  const active = cases.find((c) => c.id === activeId) ?? visible[0] ?? null;

  const decide = (decision: Decision) => {
    if (!active) return;
    const noteText = decision.requireNote ? note.trim() : note.trim() || undefined;
    setCases((prev) =>
      prev.map((c) =>
        c.id === active.id
          ? {
              ...c,
              status: decision.next,
              history: [
                {
                  when: "Just now",
                  actor: "You (Super Admin)",
                  action: decision.label,
                  note: noteText,
                },
                ...c.history,
              ],
            }
          : c,
      ),
    );
    setPending(null);
    setNote("");
    show(`${decision.label} — ${active.entity} · applicant notified`);
  };

  return (
    <div className="grid gap-5 lg:grid-cols-[380px_1fr]">
      {/* queue */}
      <div className="flex flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-card lg:max-h-[760px]">
        <div className="border-b border-line px-4 py-3.5">
          <p className="text-[13px] font-semibold text-ink">{title}</p>
          <p className="mt-0.5 text-[11.5px] text-slate-400">
            {cases.filter((c) => matchStatus(c, "Open")).length} open ·{" "}
            {cases.filter((c) => c.overdue && matchStatus(c, "Open")).length} overdue
          </p>
        </div>
        <div className="flex flex-wrap gap-1.5 border-b border-line px-3 py-2.5">
          {queues.map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => setQueue(q)}
              className={cn(
                "rounded-full border px-2.5 py-1 text-[11px] font-semibold transition-all",
                queue === q
                  ? "border-accent bg-accent text-white"
                  : "border-line bg-white text-slate-500 hover:text-ink",
              )}
            >
              {q}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-1.5 border-b border-line px-3 py-2.5">
          {statusOptions.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setStatusFilter(s)}
              className={cn(
                "rounded-full px-2.5 py-1 text-[11px] font-semibold transition-colors",
                statusFilter === s ? "bg-ink text-white" : "text-slate-400 hover:text-ink",
              )}
            >
              {s}
            </button>
          ))}
        </div>
        <div className="scroll-quiet flex-1 divide-y divide-line/70 overflow-y-auto">
          {visible.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setActiveId(c.id)}
              className={cn(
                "w-full px-4 py-3.5 text-left transition-colors",
                active?.id === c.id ? "bg-accent-soft/60" : "hover:bg-soft/70",
              )}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="truncate text-[13px] font-semibold text-ink">{c.entity}</span>
                <span className={cn("shrink-0 rounded px-1.5 py-0.5 text-[9.5px] font-semibold uppercase tracking-wide", SEVERITY_STYLES[c.severity])}>
                  {c.severity}
                </span>
              </div>
              <p className="mt-0.5 text-[11.5px] text-slate-400">
                {c.type} · {c.applicant}
              </p>
              <div className="mt-2 flex items-center gap-2">
                <StatusPill status={c.status} />
                {c.appeal ? <StatusPill status="Appeal" /> : null}
                <span
                  className={cn(
                    "ml-auto inline-flex items-center gap-1 text-[10.5px] font-semibold",
                    c.overdue && matchStatus(c, "Open") ? "text-rose-600" : "text-slate-400",
                  )}
                >
                  <Clock4 className="h-3 w-3" />
                  {c.sla}
                </span>
              </div>
            </button>
          ))}
          {visible.length === 0 ? (
            <p className="px-4 py-10 text-center text-[12.5px] text-slate-400">
              Queue is clear for this filter.
            </p>
          ) : null}
        </div>
      </div>

      {/* case workspace */}
      {active ? (
        <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-card">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-4">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-[16px] font-semibold tracking-tight text-ink">
                  {active.entity}
                </h3>
                <StatusPill status={active.status} />
                {active.appeal ? <StatusPill status="Appeal" /> : null}
              </div>
              <p className="mt-1 text-[12px] text-slate-400">
                Case #{String(active.id).padStart(4, "0")} · {active.type} · submitted {active.submitted}
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setAssigned((s) => new Set(s).add(active.id));
                show(`Case #${String(active.id).padStart(4, "0")} assigned to you`);
              }}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-[12px] font-semibold transition-colors",
                assigned.has(active.id)
                  ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                  : "border-line text-slate-500 hover:border-accent/40 hover:text-accent",
              )}
            >
              <UserPlus className="h-3.5 w-3.5" />
              {assigned.has(active.id) ? "Assigned to you" : "Assign to me"}
            </button>
          </div>

          <div className="scroll-quiet max-h-[640px] space-y-6 overflow-y-auto p-5">
            {banner}

            {/* meta */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-4">
              {active.meta.map((m) => (
                <div key={m.label}>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                    {m.label}
                  </p>
                  <p className="mt-1 text-[12.5px] font-medium text-ink">{m.value}</p>
                </div>
              ))}
            </div>

            {/* risk flags */}
            {active.flags.length ? (
              <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
                <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-amber-700">
                  <Flag className="h-3 w-3" /> Signals for review — not proof
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {active.flags.map((f) => (
                    <span key={f} className="rounded-full border border-amber-200 bg-white px-2.5 py-1 text-[11px] font-medium text-amber-800">
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}

            {/* documents */}
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                {docsLabel}
              </p>
              <div className="mt-2.5 space-y-2">
                {active.docs.map((doc) => (
                  <div key={doc.name} className="flex items-center gap-3 rounded-xl border border-line px-3.5 py-2.5">
                    <FileText className="h-4 w-4 shrink-0 text-slate-400" />
                    <span className="min-w-0 flex-1 truncate text-[12.5px] font-medium text-ink">
                      {doc.name}
                    </span>
                    <StatusPill status={doc.status} />
                    <button
                      type="button"
                      onClick={() => show(`Opened ${doc.name} in secure viewer`)}
                      className="text-[11.5px] font-semibold text-accent hover:underline"
                    >
                      View
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* checklist */}
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                Reviewer checklist
              </p>
              <div className="mt-2.5 grid gap-2 sm:grid-cols-2">
                {checklist.map((item, i) => {
                  const done = checked.get(active.id)?.has(i);
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => {
                        setChecked((prev) => {
                          const next = new Map(prev);
                          const set = new Set(next.get(active.id));
                          done ? set.delete(i) : set.add(i);
                          next.set(active.id, set);
                          return next;
                        });
                      }}
                      className={cn(
                        "flex items-center gap-2.5 rounded-xl border px-3.5 py-2.5 text-left text-[12px] font-medium transition-colors",
                        done
                          ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                          : "border-line text-slate-600 hover:border-accent/30",
                      )}
                    >
                      <span
                        className={cn(
                          "grid h-4.5 w-4.5 shrink-0 place-items-center rounded border",
                          done ? "border-emerald-500 bg-emerald-500 text-white" : "border-slate-300",
                        )}
                      >
                        {done ? <Check className="h-3 w-3" strokeWidth={3.2} /> : null}
                      </span>
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* history */}
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                Evidence &amp; decision log
              </p>
              <div className="mt-3 space-y-0">
                {active.history.map((e, i) => (
                  <div key={`${e.when}-${i}`} className="relative flex gap-3 pb-3.5 last:pb-0">
                    {i < active.history.length - 1 ? (
                      <span className="absolute left-[5px] top-4 h-full w-px bg-line" />
                    ) : null}
                    <span className="relative mt-1 h-2.5 w-2.5 shrink-0 rounded-full border-2 border-accent/50 bg-white" />
                    <div className="min-w-0">
                      <p className="text-[12.5px] font-semibold text-ink">{e.action}</p>
                      <p className="text-[11.5px] text-slate-400">{e.actor} · {e.when}</p>
                      {e.note ? (
                        <p className="mt-1 rounded-lg bg-soft px-2.5 py-1.5 text-[11.5px] italic text-slate-500">
                          “{e.note}”
                        </p>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* decisions */}
          <div className="space-y-3 border-t border-line p-5">
            {pending?.requireNote ? (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-2.5"
              >
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={2}
                  placeholder={`Rationale for "${pending.label}" — recorded against the decision (required)`}
                  className="w-full rounded-lg border border-line bg-soft px-3 py-2 text-[12.5px] font-medium text-ink outline-none placeholder:text-slate-400 focus:border-accent/50"
                />
                <div className="flex gap-2">
                  <button
                    type="button"
                    disabled={note.trim().length < 4}
                    onClick={() => decide(pending)}
                    className="flex-1 rounded-lg bg-accent py-2 text-[12.5px] font-semibold text-white transition hover:bg-accent-deep disabled:opacity-40"
                  >
                    Confirm — {pending.label}
                  </button>
                  <button
                    type="button"
                    onClick={() => { setPending(null); setNote(""); }}
                    className="rounded-lg border border-line px-3.5 py-2 text-[12.5px] font-semibold text-slate-500"
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {decisions.map((d) => (
                  <button
                    key={d.label}
                    type="button"
                    onClick={() => (d.requireNote ? setPending(d) : decide(d))}
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-[12.5px] font-semibold transition",
                      DECISION_STYLES[d.tone],
                    )}
                  >
                    {d.tone === "approve" ? <CircleCheck className="h-3.5 w-3.5" /> : null}
                    {d.tone === "escalate" ? <ShieldAlert className="h-3.5 w-3.5" /> : null}
                    {d.label}
                  </button>
                ))}
              </div>
            )}
            <p className="text-[10.5px] leading-snug text-slate-400">
              High-impact decisions record reviewer, evidence considered, rationale and
              timestamp. Approvals over ₹ budgets or credential revocations require a
              second approver.
            </p>
          </div>
        </div>
      ) : null}
      {viewport}
    </div>
  );
}
