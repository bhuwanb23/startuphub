"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  Check,
  Code2,
  FileText,
  Mail,
  Plus,
  Send,
  ShieldCheck,
  TriangleAlert,
} from "lucide-react";
import Link from "next/link";
import { Badge, Card, GaugeRing, PageHeader, Progress, Stat } from "@/components/app/widgets";
import {
  aiAssistedFiles,
  assignmentRegister,
  copyrightWorks as seedWorks,
  depositRecords,
  ossInventory,
} from "@/users/startup/constants/ipr-data";

const siblings = [
  { href: "/founder/ipr", label: "IPR Overview", body: "Health score, open actions and every deadline in one view." },
  { href: "/founder/ipr/patents", label: "Patent Management", body: "Three filings as a live pipeline with the claims tracker." },
  { href: "/founder/ipr/trademarks", label: "Trademark Management", body: "Class checker, conflict scan and the v2 filing flow." },
  { href: "/founder/ipr/portfolio", label: "IP Portfolio", body: "Every instrument valued and owned." },
  { href: "/founder/ipr/risk", label: "IP Risk Assessment", body: "Likelihood × impact heatmap with mitigations." },
  { href: "/founder/ipr/compliance", label: "Compliance Tracking", body: "Obligations, evidence and the filing tracker." },
];

const riskFilters = ["All risks", "Low", "Medium"];

type Work = (typeof seedWorks)[number];

export function CopyrightManagement() {
  const [works, setWorks] = useState<Work[]>(seedWorks);
  const [showForm, setShowForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newKind, setNewKind] = useState("Literary work (computer programme)");
  const [risk, setRisk] = useState("All risks");
  const [resolved, setResolved] = useState<string[]>([]);
  const [reviewed, setReviewed] = useState<string[]>(
    aiAssistedFiles.filter((f) => f.policy === "Reviewed").map((f) => f.file),
  );
  const [executed, setExecuted] = useState<string[]>(
    assignmentRegister.filter((a) => a.status === "Executed").map((a) => a.id),
  );
  const [reminded, setReminded] = useState<string[]>([]);

  const oss = useMemo(
    () =>
      ossInventory.filter((o) => {
        if (risk === "All risks") return true;
        return o.risk === risk;
      }),
    [risk],
  );

  const pendingOss = ossInventory.filter(
    (o) => o.action !== "Attribution file — done" && !resolved.includes(o.id),
  );

  /* Contract coverage is 88 with 2 of 4 executed and 92 with all 4 —
     the same two numbers the IPR Overview quotes for this dimension. */
  const contractCoverage = 88 + (executed.length - 2) * 2;

  const registerWork = () => {
    const title = newTitle.trim();
    if (!title) return;
    const work: Work = {
      id: `cw-new-${works.length + 1}`,
      title,
      kind: newKind,
      status: "Registered",
      tone: "good",
      filed: "Apr 2026",
      certificate: "CR-2026-PENDING",
      owner: "Lumen AI Pvt Ltd",
      note: "Registered today — certificate to be issued by the Copyright Office",
    };
    setWorks((prev) => [...prev, work]);
    setNewTitle("");
    setShowForm(false);
  };

  const execute = (id: string) =>
    setExecuted((prev) => (prev.includes(id) ? prev : [...prev, id]));

  return (
    <div className="space-y-5">
      <PageHeader
        title="Copyright Management"
        desc="Code, data and content — what you own automatically, and what you still need to register."
        actions={
          <button
            type="button"
            onClick={() => setShowForm((v) => !v)}
            className="inline-flex items-center gap-1.5 rounded-[10px] bg-accent px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-accent-deep"
          >
            <Plus className="h-3.5 w-3.5" /> Register a work
          </button>
        }
      />

      {/* 1 — New registration */}
      {showForm && (
        <Card title="Register a work" action={<Badge tone="accent">New</Badge>}>
          <div className="grid gap-3 sm:grid-cols-[1fr_220px_auto] sm:items-end">
            <label className="block">
              <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                Title
              </span>
              <input
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") registerWork();
                }}
                placeholder="e.g. Agronomy handbook, 2nd edition"
                className="mt-1.5 h-10 w-full rounded-[10px] border border-line bg-white px-3 text-[13px] text-ink placeholder:text-slate-400 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/15"
              />
            </label>
            <label className="block">
              <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                Work type
              </span>
              <select
                value={newKind}
                onChange={(e) => setNewKind(e.target.value)}
                className="mt-1.5 h-10 w-full rounded-[10px] border border-line bg-white px-3 text-[13px] text-ink focus:border-accent focus:outline-none"
              >
                {[
                  "Literary work (computer programme)",
                  "Literary work (database)",
                  "Literary work",
                  "Artistic work",
                ].map((k) => (
                  <option key={k} value={k}>
                    {k}
                  </option>
                ))}
              </select>
            </label>
            <button
              type="button"
              onClick={registerWork}
              disabled={!newTitle.trim()}
              className="h-10 rounded-[10px] bg-accent px-4 text-[13px] font-semibold text-white hover:bg-accent-deep disabled:cursor-not-allowed disabled:opacity-40"
            >
              Register
            </button>
          </div>
        </Card>
      )}

      {/* 2 — Headline metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat icon={FileText} label="Registered works" value={String(works.filter((w) => w.status === "Registered").length)} hint="certificates on file" tone="good" />
        <Stat icon={TriangleAlert} label="Unregistered" value={String(works.filter((w) => w.status !== "Registered").length)} hint="protected, but no certificate" tone="warn" />
        <Stat icon={Code2} label="OSS dependencies" value={String(ossInventory.length)} hint={`${pendingOss.length} need action`} tone={pendingOss.length ? "warn" : "good"} />
        <Stat icon={ShieldCheck} label="Assignments executed" value={`${executed.length} of ${assignmentRegister.length}`} hint="contractor IP vesting" tone={executed.length === assignmentRegister.length ? "good" : "bad"} />
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.4fr_1fr]">
        <div className="space-y-5">
          {/* 3 — Works */}
          <Card title="Your works" pad={false}>
            <ul className="divide-y divide-line">
              {works.map((w) => (
                <li key={w.id} className="px-5 py-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-[13.5px] font-semibold text-ink">{w.title}</p>
                      <p className="mt-0.5 text-[11.5px] text-slate-400">
                        {w.kind} · {w.filed} · {w.certificate}
                      </p>
                    </div>
                    <Badge tone={w.tone}>{w.status}</Badge>
                  </div>
                  <p className="mt-2 text-[12px] leading-relaxed text-slate-500">{w.note}</p>
                </li>
              ))}
            </ul>
          </Card>

          {/* 4 — OSS inventory */}
          <Card
            title="Open-source inventory"
            action={<Badge tone={pendingOss.length ? "warn" : "good"}>{pendingOss.length} need action</Badge>}
          >
            <div className="flex flex-wrap items-center gap-2">
              {riskFilters.map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRisk(r)}
                  className={`rounded-full px-3 py-1.5 text-[12px] font-semibold transition-colors ${
                    risk === r
                      ? "bg-accent text-white"
                      : "border border-line bg-white text-slate-500 hover:border-slate-300 hover:text-ink"
                  }`}
                >
                  {r}
                </button>
              ))}
              <span className="ml-auto text-[11.5px] text-slate-400">
                Showing {oss.length} of {ossInventory.length} dependencies
              </span>
            </div>
            <ul className="mt-4 space-y-2.5">
              {oss.map((o) => {
                const done = o.action === "Attribution file — done" || resolved.includes(o.id);
                return (
                  <li key={o.id} className="rounded-xl border border-line px-4 py-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-[13px] font-semibold text-ink">{o.dependency}</p>
                      <div className="flex items-center gap-2">
                        <Badge tone="default">{o.license}</Badge>
                        <Badge tone={done ? "good" : o.tone}>{o.risk}</Badge>
                      </div>
                    </div>
                    <p className="mt-1 text-[11.5px] text-slate-400">Used for: {o.usage}</p>
                    <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
                      <p className={`text-[12px] font-medium ${done ? "text-emerald-600" : "text-amber-600"}`}>
                        {done ? "Resolved — attribution file published" : o.action}
                      </p>
                      {!done && (
                        <button
                          type="button"
                          onClick={() => setResolved((prev) => [...prev, o.id])}
                          aria-label={`Resolve: ${o.dependency}`}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-white px-3 py-1.5 text-[12px] font-semibold text-ink hover:border-emerald-300 hover:text-emerald-600"
                        >
                          <Check className="h-3 w-3" /> Mark resolved
                        </button>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </Card>

          {/* 5 — Assignment register */}
          <Card
            title="IP assignment register"
            action={<Badge tone={executed.length === assignmentRegister.length ? "good" : "bad"}>{executed.length} of {assignmentRegister.length} executed</Badge>}
          >
            <p className="text-[12.5px] leading-relaxed text-slate-500">
              Works created by contractors only vest in the company once an assignment naming Lumen
              AI Pvt Ltd is countersigned.
            </p>
            <ul className="mt-4 space-y-2.5">
              {assignmentRegister.map((a) => {
                const isExecuted = executed.includes(a.id);
                const isReminded = reminded.includes(a.id);
                return (
                  <li key={a.id} className="rounded-xl border border-line px-4 py-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-[13px] font-semibold text-ink">{a.party}</p>
                      <Badge tone={isExecuted ? "good" : "bad"}>{isExecuted ? "Executed" : "Outstanding"}</Badge>
                    </div>
                    <p className="mt-1 text-[11.5px] text-slate-400">
                      {a.scope} · {isExecuted ? assignmentRegister.find((x) => x.id === a.id)?.date : a.date}
                    </p>
                    {!isExecuted && (
                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        <button
                          type="button"
                          onClick={() => execute(a.id)}
                          aria-label={`Mark executed: ${a.party}`}
                          className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-3 py-1.5 text-[12px] font-semibold text-white hover:bg-accent-deep"
                        >
                          <Check className="h-3 w-3" /> Mark executed
                        </button>
                        <button
                          type="button"
                          onClick={() => setReminded((prev) => [...prev, a.id])}
                          aria-label={`Send reminder: ${a.party}`}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-white px-3 py-1.5 text-[12px] font-semibold text-slate-500 hover:text-ink"
                        >
                          {isReminded ? <Check className="h-3 w-3" /> : <Mail className="h-3 w-3" />}
                          {isReminded ? "Reminder sent" : "Send reminder"}
                        </button>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </Card>
        </div>

        <div className="space-y-5">
          {/* 6 — Contract coverage */}
          <Card title="Contract coverage">
            <div className="flex items-center gap-4">
              <GaugeRing value={contractCoverage} size={80} label="score" />
              <div className="text-[12.5px] text-slate-500">
                <p className="font-semibold text-ink">
                  {contractCoverage === 92 ? "Every assignment executed." : "Two assignments still outstanding."}
                </p>
                <p className="mt-1 leading-relaxed">
                  This is the “Contract coverage” dimension behind the IP health score — 88 now, 92
                  once all four are signed.
                </p>
              </div>
            </div>
            <Progress
              value={contractCoverage}
              tone={contractCoverage >= 92 ? "good" : "warn"}
              className="mt-4"
            />
            <Link
              href="/founder/ipr"
              className="mt-3 inline-flex items-center gap-1 text-[12px] font-semibold text-accent hover:underline"
            >
              See it in the IP health score <ArrowRight className="h-3 w-3" />
            </Link>
          </Card>

          {/* 7 — AI-assisted files */}
          <Card
            title="AI-assisted files"
            action={<Badge tone={reviewed.length === aiAssistedFiles.length ? "good" : "warn"}>{reviewed.length} of {aiAssistedFiles.length} reviewed</Badge>}
          >
            <ul className="space-y-2.5">
              {aiAssistedFiles.map((f) => {
                const isReviewed = reviewed.includes(f.file);
                return (
                  <li key={f.file} className="rounded-lg bg-slate-50 p-3">
                    <div className="flex items-start justify-between gap-3">
                      <p className="min-w-0 flex-1 truncate font-mono text-[11.5px] text-ink">{f.file}</p>
                      <Badge tone={isReviewed ? "good" : f.origin === "AI-assisted" ? "warn" : "default"}>
                        {isReviewed ? "Reviewed" : f.origin}
                      </Badge>
                    </div>
                    <p className="mt-1 text-[11px] text-slate-400">{f.note}</p>
                    {f.origin === "AI-assisted" && !isReviewed && (
                      <button
                        type="button"
                        onClick={() => setReviewed((prev) => [...prev, f.file])}
                        aria-label={`Review: ${f.file}`}
                        className="mt-2 inline-flex items-center gap-1.5 rounded-lg border border-line bg-white px-3 py-1.5 text-[12px] font-semibold text-ink hover:border-emerald-300 hover:text-emerald-600"
                      >
                        <Check className="h-3 w-3" /> Mark reviewed
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>
          </Card>

          {/* 8 — Deposit records */}
          <Card title="Deposit records">
            <ul className="space-y-2.5">
              {depositRecords.map((d) => (
                <li key={d.work} className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[12.5px] font-medium text-ink">{d.work}</p>
                    <p className="mt-0.5 text-[11.5px] text-slate-400">
                      {d.deposited} · {d.method}
                    </p>
                  </div>
                  <Badge tone={d.tone}>{d.status}</Badge>
                </li>
              ))}
            </ul>
          </Card>

          {/* 9 — Copilot */}
          <Card title="Copilot recommendation">
            <div className="flex items-start gap-3 rounded-xl bg-accent-mist p-4">
              <Send className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <div>
                <p className="text-[13px] font-semibold text-ink">
                  The agronomy handbook is 18 months of unregistered teaching material.
                </p>
                <p className="mt-1 text-[12px] leading-relaxed text-slate-600">
                  Copyright is automatic, so you are protected — but without a deposit you cannot
                  enforce it in court and investors will not count it.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* 10 — Where to go next */}
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
