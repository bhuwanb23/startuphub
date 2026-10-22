"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  Check,
  CircleAlert,
  FileText,
  Plus,
  Scale,
  Search,
  Send,
  ShieldAlert,
} from "lucide-react";
import Link from "next/link";
import { Badge, Card, PageHeader, Stat } from "@/components/app/widgets";
import {
  conflictingMarks,
  renewalCalendar,
  trademarkClasses,
  trademarkWatchlist,
  trademarks as seedTrademarks,
} from "@/users/startup/constants/ipr-data";

const siblings = [
  { href: "/founder/ipr", label: "IPR Overview", body: "Health score, open actions and every deadline in one view." },
  { href: "/founder/ipr/patents", label: "Patent Management", body: "Three filings as a live pipeline with the claims tracker." },
  { href: "/founder/ipr/copyright", label: "Copyright Management", body: "Registered works, open-source inventory and assignments." },
  { href: "/founder/ipr/portfolio", label: "IP Portfolio", body: "Every instrument valued and owned." },
  { href: "/founder/ipr/risk", label: "IP Risk Assessment", body: "Likelihood × impact heatmap with mitigations." },
  { href: "/founder/ipr/compliance", label: "Compliance Tracking", body: "Obligations, evidence and the filing tracker." },
];

const FEE_PER_CLASS = 4500;
const markKinds = ["Word mark", "Logo", "Word + logo"];

const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

export function TrademarkManagement() {
  const defaultClasses = trademarkClasses.filter((c) => c.needed).map((c) => c.code);
  const [selectedClasses, setSelectedClasses] = useState<string[]>(defaultClasses);
  const [scanTerm, setScanTerm] = useState("");
  const [scanResult, setScanResult] = useState<"idle" | "clear" | "clash">("idle");
  const [showForm, setShowForm] = useState(false);
  const [markName, setMarkName] = useState("");
  const [kind, setKind] = useState(markKinds[0]);
  const [applicant, setApplicant] = useState("Lumen AI Pvt Ltd");
  const [filings, setFilings] = useState<{ id: string; mark: string; classes: string[]; ref: string; fee: number }[]>([]);

  const marks = useMemo(() => [...seedTrademarks, ...filings.map((f) => ({
    id: f.id,
    name: f.mark,
    kind: kind,
    classes: f.classes,
    status: "Filed",
    tone: "accent" as const,
    filed: "Apr 2026",
    renewal: "—",
    owner: applicant,
    note: `Application ${f.ref} — awaiting examination`,
  }))], [filings, kind, applicant]);

  const toggleClass = (code: string) =>
    setSelectedClasses((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code],
    );

  const fee = selectedClasses.length * FEE_PER_CLASS;

  const conflicts = conflictingMarks.filter((m) => selectedClasses.includes(m.class));
  const directConflict = conflicts.find((m) => m.clash === "Direct");

  const runScan = () => {
    const term = scanTerm.trim().toLowerCase();
    if (!term) return;
    const hit = conflictingMarks.some(
      (m) => m.mark.toLowerCase().includes(term) && selectedClasses.includes(m.class),
    );
    setScanResult(hit ? "clash" : "clear");
  };

  const file = () => {
    const name = markName.trim();
    if (!name || selectedClasses.length === 0) return;
    const ref = `TM/${new Date().getFullYear()}/${String(4000 + filings.length + 1)}`;
    setFilings((prev) => [
      ...prev,
      { id: `tm-new-${prev.length + 1}`, mark: name, classes: selectedClasses, ref, fee },
    ]);
    setMarkName("");
    setShowForm(false);
  };

  return (
    <div className="space-y-5">
      <PageHeader
        title="Trademark Management"
        desc="Pick your classes, scan for conflicts and file — before someone else claims your name."
        actions={
          <button
            type="button"
            onClick={() => setShowForm((v) => !v)}
            className="inline-flex items-center gap-1.5 rounded-[10px] bg-accent px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-accent-deep"
          >
            <Plus className="h-3.5 w-3.5" /> Start filing
          </button>
        }
      />

      {/* 1 — Headline metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat icon={Scale} label="Registered marks" value={String(seedTrademarks.filter((t) => t.status === "Registered").length)} hint="Lumen AI · class 9 and 42" tone="good" />
        <Stat icon={CircleAlert} label="Unfiled marks" value={String(seedTrademarks.filter((t) => t.status !== "Registered").length + filings.length)} hint="Field Alert launches in 9 days" tone="bad" />
        <Stat icon={FileText} label="Classes selected" value={`${selectedClasses.length} of ${trademarkClasses.length}`} hint="class 9 and 42 recommended" tone={selectedClasses.length >= 2 ? "good" : "warn"} />
        <Stat icon={ShieldAlert} label="Direct conflicts" value={String(conflictingMarks.filter((m) => m.clash === "Direct").length)} hint="one in class 9" tone="bad" />
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.4fr_1fr]">
        <div className="space-y-5">
          {/* 2 — Class checker */}
          <Card
            title="Class checker"
            action={<Badge tone={selectedClasses.length ? "accent" : "default"}>{selectedClasses.length} selected</Badge>}
          >
            <p className="text-[12.5px] leading-relaxed text-slate-500">
              Pick the classes your product actually trades in. Each one is {inr(FEE_PER_CLASS)} to
              file — your current selection costs {inr(fee)}.
            </p>
            <ul className="mt-4 space-y-2">
              {trademarkClasses.map((c) => {
                const on = selectedClasses.includes(c.code);
                return (
                  <li key={c.code}>
                    <button
                      type="button"
                      onClick={() => toggleClass(c.code)}
                      aria-label={`${on ? "Remove" : "Add"} class ${c.code}`}
                      className={`flex w-full items-center gap-3 rounded-xl border px-3.5 py-3 text-left transition-colors ${
                        on ? "border-accent bg-accent-mist" : "border-line bg-white hover:border-slate-300"
                      }`}
                    >
                      <span
                        className={`grid h-5 w-5 shrink-0 place-items-center rounded-md border ${
                          on ? "border-accent bg-accent text-white" : "border-slate-300 bg-white"
                        }`}
                      >
                        {on && <Check className="h-3 w-3" />}
                      </span>
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-slate-100 text-[11px] font-bold text-slate-500">
                        {c.code}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-[13px] font-semibold text-ink">{c.name}</span>
                        <span className="mt-0.5 block text-[11.5px] leading-snug text-slate-400">{c.note}</span>
                      </span>
                      {c.needed && <Badge tone="warn">Recommended</Badge>}
                    </button>
                  </li>
                );
              })}
            </ul>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-slate-50 px-4 py-3">
              <span className="text-[12.5px] text-slate-600">
                <span className="font-semibold text-ink">{selectedClasses.length}</span> class
                {selectedClasses.length === 1 ? "" : "es"} · {inr(fee)} government fee
              </span>
              {selectedClasses.length > 0 && (
                <button
                  type="button"
                  onClick={() => setSelectedClasses([])}
                  className="text-[12px] font-semibold text-slate-500 hover:text-ink"
                >
                  Clear classes
                </button>
              )}
            </div>
          </Card>

          {/* 3 — Filing flow */}
          {showForm && (
            <Card title="File a trademark application" action={<Badge tone="accent">{inr(fee)}</Badge>}>
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="block">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                    Mark
                  </span>
                  <input
                    value={markName}
                    onChange={(e) => setMarkName(e.target.value)}
                    placeholder="Field Alert"
                    className="mt-1.5 h-10 w-full rounded-[10px] border border-line bg-white px-3 text-[13px] text-ink placeholder:text-slate-400 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/15"
                  />
                </label>
                <label className="block">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                    Mark type
                  </span>
                  <select
                    value={kind}
                    onChange={(e) => setKind(e.target.value)}
                    className="mt-1.5 h-10 w-full rounded-[10px] border border-line bg-white px-3 text-[13px] text-ink focus:border-accent focus:outline-none"
                  >
                    {markKinds.map((k) => (
                      <option key={k} value={k}>
                        {k}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block sm:col-span-2">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                    Applicant
                  </span>
                  <input
                    value={applicant}
                    onChange={(e) => setApplicant(e.target.value)}
                    className="mt-1.5 h-10 w-full rounded-[10px] border border-line bg-white px-3 text-[13px] text-ink focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/15"
                  />
                </label>
              </div>

              <div className="mt-4 rounded-xl border border-line bg-slate-50 px-4 py-3">
                <p className="text-[12px] text-slate-600">
                  Classes:{" "}
                  {selectedClasses.length ? selectedClasses.join(", ") : "none selected — pick at least one"}
                </p>
                {directConflict && (
                  <p className="mt-1.5 flex items-start gap-1.5 text-[12px] font-medium text-red-500">
                    <CircleAlert className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                    {directConflict.mark} is live in class {directConflict.class} — file anyway or pick
                    another class.
                  </p>
                )}
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="rounded-lg border border-line px-3.5 py-2 text-[12.5px] font-semibold text-slate-500 hover:text-ink"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={file}
                  disabled={!markName.trim() || selectedClasses.length === 0}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-3.5 py-2 text-[12.5px] font-semibold text-white hover:bg-accent-deep disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Send className="h-3 w-3" /> File application
                </button>
              </div>
            </Card>
          )}

          {/* 4 — Your marks */}
          <Card title="Your marks" pad={false}>
            <ul className="divide-y divide-line">
              {marks.map((t) => (
                <li key={t.id} className="px-5 py-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-[13.5px] font-semibold text-ink">“{t.name}”</p>
                      <p className="mt-0.5 text-[11.5px] text-slate-400">
                        {t.kind} · class {t.classes.join(", ")} · filed {t.filed}
                      </p>
                    </div>
                    <Badge tone={t.tone}>{t.status}</Badge>
                  </div>
                  <p className="mt-2 text-[12px] leading-relaxed text-slate-500">{t.note}</p>
                  <p className="mt-1.5 text-[11.5px] text-slate-400">
                    Owner: {t.owner} · renewal {t.renewal}
                  </p>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <div className="space-y-5">
          {/* 5 — Conflict scan */}
          <Card title="Conflict scan">
            <div className="flex gap-2">
              <input
                value={scanTerm}
                onChange={(e) => {
                  setScanTerm(e.target.value);
                  setScanResult("idle");
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") runScan();
                }}
                placeholder="Search a mark…"
                className="h-10 flex-1 rounded-[10px] border border-line bg-white px-3 text-[13px] text-ink placeholder:text-slate-400 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/15"
              />
              <button
                type="button"
                onClick={runScan}
                className="inline-flex items-center gap-1.5 rounded-[10px] bg-accent px-3.5 text-[13px] font-semibold text-white hover:bg-accent-deep"
              >
                <Search className="h-3.5 w-3.5" /> Scan
              </button>
            </div>

            {scanResult !== "idle" && (
              <p
                className={`mt-3 rounded-lg px-3 py-2 text-[12.5px] font-semibold ${
                  scanResult === "clash"
                    ? "bg-red-50 text-red-500"
                    : "bg-emerald-50 text-emerald-600"
                }`}
              >
                {scanResult === "clash"
                  ? `“${scanTerm.trim()}” conflicts with a live mark in the selected class.`
                  : `“${scanTerm.trim()}” is clear in the selected classes.`}
              </p>
            )}

            <ul className="mt-4 space-y-3">
              {conflicts.length ? (
                conflicts.map((c) => (
                  <li key={c.mark} className="rounded-lg bg-slate-50 p-3">
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-[12.5px] font-semibold leading-snug text-ink">{c.mark}</p>
                      <Badge tone={c.tone}>{c.clash}</Badge>
                    </div>
                    <p className="mt-1 text-[11.5px] text-slate-400">
                      {c.owner} · class {c.class} · {c.status}
                    </p>
                  </li>
                ))
              ) : (
                <li className="rounded-lg bg-slate-50 p-3 text-[12.5px] text-slate-500">
                  No conflicts in the classes you selected.
                </li>
              )}
            </ul>
          </Card>

          {/* 6 — Watchlist */}
          <Card title="Trademark watch">
            <ul className="space-y-3">
              {trademarkWatchlist.map((w) => (
                <li key={w.term} className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[12.5px] font-semibold text-ink">{w.term}</p>
                    <p className="mt-0.5 text-[11.5px] leading-snug text-slate-400">
                      Class {w.class} · checked {w.checked}
                    </p>
                  </div>
                  <Badge tone={w.tone}>{w.result}</Badge>
                </li>
              ))}
            </ul>
          </Card>

          {/* 7 — Renewals */}
          <Card title="Renewal calendar">
            <ul className="space-y-2.5">
              {renewalCalendar.map((r) => (
                <li key={r.mark} className="flex items-center justify-between gap-3 text-[12.5px]">
                  <span className="min-w-0 flex-1 text-slate-600">
                    {r.mark} · class {r.class}
                  </span>
                  <span className="font-semibold tabular-nums text-ink">{r.renewal}</span>
                  <Badge tone={r.tone}>{r.action}</Badge>
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
