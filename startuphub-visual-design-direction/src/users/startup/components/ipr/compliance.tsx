"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  CalendarCheck,
  Check,
  ClipboardCheck,
  FileText,
  Plus,
  ShieldCheck,
  TriangleAlert,
} from "lucide-react";
import Link from "next/link";
import { Badge, Card, PageHeader, Progress, Stat } from "@/components/app/widgets";
import {
  auditTrail,
  evidencePack as seedEvidence,
  filingTracker,
  obligations as seedObligations,
} from "@/users/startup/constants/ipr-data";

const siblings = [
  { href: "/founder/ipr", label: "IPR Overview", body: "Health score, open actions and every deadline in one view." },
  { href: "/founder/ipr/patents", label: "Patent Management", body: "Three filings as a live pipeline with the claims tracker." },
  { href: "/founder/ipr/trademarks", label: "Trademark Management", body: "Class checker, conflict scan and the v2 filing flow." },
  { href: "/founder/ipr/copyright", label: "Copyright Management", body: "Registered works, open-source inventory and assignments." },
  { href: "/founder/ipr/portfolio", label: "IP Portfolio", body: "Every instrument valued and owned." },
  { href: "/founder/ipr/risk", label: "IP Risk Assessment", body: "Likelihood × impact heatmap with mitigations." },
];

const statusFilters = ["All statuses", "Compliant", "Due", "Overdue", "Not started"];
const kindFilters = ["All types", "Statutory", "Investor", "Internal"];

type Status = "Compliant" | "Due" | "Overdue" | "Not started";
type Obligation = (typeof seedObligations)[number];

export function ComplianceTracking() {
  const [statuses, setStatuses] = useState<Record<string, Status>>(() =>
    Object.fromEntries(seedObligations.map((o) => [o.id, o.status])),
  );
  const [statusFilter, setStatusFilter] = useState("All statuses");
  const [kindFilter, setKindFilter] = useState("All types");
  const [shared, setShared] = useState<string[]>(
    seedEvidence.filter((e) => e.present).map((e) => e.doc),
  );
  const [obligations, setObligations] = useState<Obligation[]>(seedObligations);
  const [showForm, setShowForm] = useState(false);
  const [newName, setNewName] = useState("");
  const [newAuthority, setNewAuthority] = useState("Internal");
  const [newKind, setNewKind] = useState("Internal");
  const [newDue, setNewDue] = useState("");

  const visible = useMemo(
    () =>
      obligations.filter((o) => {
        if (statusFilter !== "All statuses" && statuses[o.id] !== statusFilter) return false;
        if (kindFilter !== "All types" && o.kind !== kindFilter) return false;
        return true;
      }),
    [obligations, statuses, statusFilter, kindFilter],
  );

  const compliant = obligations.filter((o) => statuses[o.id] === "Compliant").length;
  const overdue = obligations.filter((o) => statuses[o.id] === "Overdue").length;
  const open = obligations.length - compliant;
  const compliancePct = Math.round((compliant / obligations.length) * 100);

  const markFiled = (id: string) =>
    setStatuses((prev) => ({ ...prev, [id]: "Compliant" }));

  const toggleShared = (doc: string) =>
    setShared((prev) => (prev.includes(doc) ? prev.filter((d) => d !== doc) : [...prev, doc]));

  const addObligation = () => {
    const name = newName.trim();
    if (!name) return;
    const obligation: Obligation = {
      id: `ob-new-${obligations.length + 1}`,
      name,
      authority: newAuthority,
      kind: newKind as Obligation["kind"],
      due: newDue.trim() || "Not set",
      days: 30,
      status: "Not started",
      tone: "default",
      evidence: "Evidence not attached",
      owner: "You",
    };
    setObligations((prev) => [...prev, obligation]);
    setStatuses((prev) => ({ ...prev, [obligation.id]: "Not started" }));
    setNewName("");
    setNewDue("");
    setShowForm(false);
  };

  return (
    <div className="space-y-5">
      <PageHeader
        title="Compliance Tracking"
        desc="Statutory, investor and internal obligations — each one with the evidence behind it."
        actions={
          <button
            type="button"
            onClick={() => setShowForm((v) => !v)}
            className="inline-flex items-center gap-1.5 rounded-[10px] bg-accent px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-accent-deep"
          >
            <Plus className="h-3.5 w-3.5" /> Add obligation
          </button>
        }
      />

      {/* 1 — New obligation */}
      {showForm && (
        <Card title="Add an obligation" action={<Badge tone="accent">New</Badge>}>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <label className="block xl:col-span-2">
              <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                Obligation
              </span>
              <input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") addObligation();
                }}
                placeholder="e.g. Trademark renewal — class 9"
                className="mt-1.5 h-10 w-full rounded-[10px] border border-line bg-white px-3 text-[13px] text-ink placeholder:text-slate-400 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/15"
              />
            </label>
            <label className="block">
              <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                Authority
              </span>
              <input
                value={newAuthority}
                onChange={(e) => setNewAuthority(e.target.value)}
                className="mt-1.5 h-10 w-full rounded-[10px] border border-line bg-white px-3 text-[13px] text-ink focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/15"
              />
            </label>
            <label className="block">
              <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                Type
              </span>
              <select
                value={newKind}
                onChange={(e) => setNewKind(e.target.value)}
                className="mt-1.5 h-10 w-full rounded-[10px] border border-line bg-white px-3 text-[13px] text-ink focus:border-accent focus:outline-none"
              >
                {["Statutory", "Investor", "Internal"].map((k) => (
                  <option key={k} value={k}>
                    {k}
                  </option>
                ))}
              </select>
            </label>
            <label className="block sm:col-span-2 xl:col-span-4">
              <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                Due
              </span>
              <input
                value={newDue}
                onChange={(e) => setNewDue(e.target.value)}
                placeholder="e.g. Jun 30"
                className="mt-1.5 h-10 w-full rounded-[10px] border border-line bg-white px-3 text-[13px] text-ink placeholder:text-slate-400 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/15"
              />
            </label>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={addObligation}
              disabled={!newName.trim()}
              className="h-10 rounded-[10px] bg-accent px-4 text-[13px] font-semibold text-white hover:bg-accent-deep disabled:cursor-not-allowed disabled:opacity-40"
            >
              Add obligation
            </button>
          </div>
        </Card>
      )}

      {/* 2 — Headline metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat icon={ClipboardCheck} label="Obligations" value={String(obligations.length)} hint="statutory, investor and internal" tone="default" />
        <Stat icon={ShieldCheck} label="Compliant" value={`${compliant} of ${obligations.length}`} hint={`${compliancePct}% of the register`} tone="good" />
        <Stat icon={CalendarCheck} label="Still open" value={String(open)} hint="one due within a week" tone="warn" />
        <Stat icon={TriangleAlert} label="Overdue" value={String(overdue)} hint="blocks the data room" tone={overdue ? "bad" : "good"} />
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.45fr_1fr]">
        <div className="space-y-5">
          {/* 3 — Obligations */}
          <Card
            title="Obligation register"
            action={<Badge tone="warn">{visible.length} shown</Badge>}
          >
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                {statusFilters.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setStatusFilter(s)}
                    className={`rounded-full px-3 py-1.5 text-[12px] font-semibold transition-colors ${
                      statusFilter === s
                        ? "bg-accent text-white"
                        : "border border-line bg-white text-slate-500 hover:border-slate-300 hover:text-ink"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {kindFilters.map((k) => (
                  <button
                    key={k}
                    type="button"
                    onClick={() => setKindFilter(k)}
                    className={`rounded-full px-3 py-1.5 text-[12px] font-semibold transition-colors ${
                      kindFilter === k
                        ? "bg-ink text-white"
                        : "border border-line bg-white text-slate-500 hover:border-slate-300 hover:text-ink"
                    }`}
                  >
                    {k}
                  </button>
                ))}
              </div>
            </div>

            <ul className="mt-4 space-y-2.5">
              {visible.map((o) => {
                const status = statuses[o.id];
                const done = status === "Compliant";
                return (
                  <li key={o.id} className="rounded-xl border border-line px-4 py-3">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <p className="text-[13px] font-semibold text-ink">{o.name}</p>
                        <p className="mt-0.5 text-[11.5px] text-slate-400">
                          {o.authority} · {o.kind} · owner {o.owner}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[12px] font-semibold tabular-nums text-ink">{o.due}</span>
                        <Badge
                          tone={
                            status === "Compliant"
                              ? "good"
                              : status === "Overdue"
                                ? "bad"
                                : status === "Due"
                                  ? "warn"
                                  : "default"
                          }
                        >
                          {status}
                        </Badge>
                      </div>
                    </div>
                    <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
                      <p className="text-[11.5px] text-slate-400">
                        Evidence: {done ? o.evidence : "not attached — " + o.evidence}
                      </p>
                      {!done && (
                        <button
                          type="button"
                          onClick={() => markFiled(o.id)}
                          aria-label={`Mark filed: ${o.name}`}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-white px-3 py-1.5 text-[12px] font-semibold text-ink hover:border-emerald-300 hover:text-emerald-600"
                        >
                          <Check className="h-3 w-3" /> Mark filed
                        </button>
                      )}
                    </div>
                  </li>
                );
              })}
              {visible.length === 0 && (
                <li className="rounded-xl border border-dashed px-4 py-10 text-center">
                  <p className="text-[13px] font-semibold text-ink">Nothing matches that filter</p>
                  <p className="mt-1 text-[12px] text-slate-500">
                    No obligation is {statusFilter.toLowerCase()} and {kindFilter.toLowerCase()}.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setStatusFilter("All statuses");
                      setKindFilter("All types");
                    }}
                    className="mt-4 rounded-[10px] bg-accent px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-accent-deep"
                  >
                    Clear filters
                  </button>
                </li>
              )}
            </ul>
          </Card>

          {/* 4 — Filing tracker */}
          <Card title="Filing tracker" pad={false}>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-line">
                    {["Filing", "Stage", "Next", "Due", "Owner"].map((h) => (
                      <th
                        key={h}
                        className="px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {filingTracker.map((f) => (
                    <tr key={f.filing}>
                      <td className="px-5 py-3.5 text-[13px] font-semibold text-ink">{f.filing}</td>
                      <td className="px-5 py-3.5">
                        <Badge tone={f.tone}>{f.stage}</Badge>
                      </td>
                      <td className="px-5 py-3.5 text-[13px] text-slate-500">{f.next}</td>
                      <td className="px-5 py-3.5 text-[13px] tabular-nums text-slate-500">{f.due}</td>
                      <td className="px-5 py-3.5 text-[13px] text-slate-500">{f.owner}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        <div className="space-y-5">
          {/* 5 — Evidence pack */}
          <Card
            title="Evidence pack"
            action={<Badge tone="warn">{shared.length} of {seedEvidence.length} shared</Badge>}
          >
            <p className="text-[12.5px] leading-relaxed text-slate-500">
              What an investor’s legal team can open in the data room right now.
            </p>
            <ul className="mt-4 space-y-2">
              {seedEvidence.map((e) => {
                const isShared = shared.includes(e.doc);
                return (
                  <li key={e.doc}>
                    <button
                      type="button"
                      onClick={() => toggleShared(e.doc)}
                      aria-label={`${isShared ? "Remove from" : "Add to"} data room: ${e.doc}`}
                      className={`flex w-full items-center gap-3 rounded-xl border px-3.5 py-2.5 text-left transition-colors ${
                        isShared ? "border-emerald-200 bg-emerald-50/50" : "border-line bg-white"
                      }`}
                    >
                      <span
                        className={`grid h-5 w-5 shrink-0 place-items-center rounded-md border ${
                          isShared
                            ? "border-emerald-500 bg-emerald-500 text-white"
                            : "border-slate-300 bg-white"
                        }`}
                      >
                        {isShared && <Check className="h-3 w-3" />}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-[12.5px] font-medium text-ink">{e.doc}</span>
                        <span className="mt-0.5 block text-[11px] text-slate-400">{e.shared}</span>
                      </span>
                      {!e.present && <Badge tone="bad">Missing</Badge>}
                    </button>
                  </li>
                );
              })}
            </ul>
          </Card>

          {/* 6 — Progress */}
          <Card title="Register coverage">
            <div className="flex items-baseline justify-between">
              <span className="text-[12.5px] font-medium text-slate-600">Obligations met</span>
              <span className="text-[13px] font-semibold tabular-nums text-ink">
                {compliant} of {obligations.length}
              </span>
            </div>
            <Progress
              value={compliancePct}
              tone={compliancePct >= 80 ? "good" : compliancePct >= 50 ? "warn" : "bad"}
              className="mt-2.5"
            />
            <p className="mt-4 text-[12px] leading-relaxed text-slate-500">
              {overdue > 0
                ? `${overdue} obligation is overdue — it blocks the data room refresh and the Northgate legal review.`
                : "Nothing is overdue. The earliest open item is the trademark class coverage review."}
            </p>
          </Card>

          {/* 7 — Audit trail */}
          <Card title="Audit trail">
            <ul className="space-y-3">
              {auditTrail.map((a) => (
                <li key={`${a.when}-${a.ref}`} className="flex gap-3">
                  <span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent-soft text-accent">
                    <FileText className="h-3 w-3" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[12.5px] leading-snug text-ink">{a.what}</p>
                    <p className="mt-0.5 text-[11px] text-slate-400">
                      {a.who} · {a.when}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>

      {/* 8 — Where to go next */}
      <Card title="Where to go next">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {siblings.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group rounded-xl border border-line p-4 transition-colors hover:border-accent"
            >
              <p className="flex items-center gap-1.5 text-[13px] font-semibold text-ink">
                {link.label}
                <ArrowRight className="h-3.5 w-3.5 text-accent transition-transform group-hover:translate-x-0.5" />
              </p>
              <p className="mt-1 text-[12px] leading-relaxed text-slate-500">{link.body}</p>
            </Link>
          ))}
        </div>
      </Card>
    </div>
  );
}
