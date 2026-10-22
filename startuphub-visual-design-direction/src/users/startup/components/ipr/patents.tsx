"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  Check,
  CircleDot,
  FileText,
  Plus,
  Search,
  Send,
  TriangleAlert,
} from "lucide-react";
import Link from "next/link";
import { Badge, Card, PageHeader, Progress, Stat } from "@/components/app/widgets";
import {
  claimChecklist,
  patentCosts,
  patents as seedPatents,
  patentStages,
  priorArtWatch,
  toLakhs,
} from "@/users/startup/constants/ipr-data";

const siblings = [
  { href: "/founder/ipr", label: "IPR Overview", body: "Health score, open actions and every deadline in one view." },
  { href: "/founder/ipr/trademarks", label: "Trademark Management", body: "Class checker, conflict scan and the v2 filing flow." },
  { href: "/founder/ipr/copyright", label: "Copyright Management", body: "Registered works, open-source inventory and assignments." },
  { href: "/founder/ipr/portfolio", label: "IP Portfolio", body: "Every instrument valued and owned." },
  { href: "/founder/ipr/risk", label: "IP Risk Assessment", body: "Likelihood × impact heatmap with mitigations." },
  { href: "/founder/ipr/compliance", label: "Compliance Tracking", body: "Obligations, evidence and the filing tracker." },
];

type Patent = (typeof seedPatents)[number];

export function PatentManagement() {
  const [added, setAdded] = useState<Patent[]>([]);
  const [stage, setStage] = useState("All stages");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string>(seedPatents[0].id);
  const [claims, setClaims] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(claimChecklist.map((c) => [c.id, c.done])),
  );
  const [sent, setSent] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  const all = useMemo(() => [...seedPatents, ...added], [added]);

  const results = useMemo(
    () =>
      all.filter((p) => {
        if (stage !== "All stages" && patentStages[p.stage] !== stage) return false;
        if (query.trim() && !p.title.toLowerCase().includes(query.trim().toLowerCase())) return false;
        return true;
      }),
    [all, stage, query],
  );

  const active = all.find((p) => p.id === selected) ?? all[0];

  const doneClaims = claimChecklist.filter((c) => claims[c.id]).length;
  const claimsPct = Math.round((doneClaims / claimChecklist.length) * 100);
  const claimsComplete = doneClaims === claimChecklist.length;

  const filedCount = all.filter((p) => p.stage >= 1).length;
  const valueLakhs = all.reduce((sum, p) => sum + toLakhs(p.value), 0);

  const toggleClaim = (id: string) => {
    setSent(false);
    setClaims((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const raiseProvisional = () => {
    const name = newTitle.trim();
    if (!name) return;
    const patent: Patent = {
      id: `pat-new-${added.length + 1}`,
      title: name,
      number: "—",
      filed: "—",
      stage: 0,
      counsel: "Unassigned",
      next: "Patentability search to be run — file provisional",
      value: "₹15 L",
      tone: "good",
      claims: 6,
      jurisdiction: "India · not filed",
    };
    setAdded((prev) => [...prev, patent]);
    setSelected(patent.id);
    setNewTitle("");
    setShowForm(false);
  };

  return (
    <div className="space-y-5">
      <PageHeader
        title="Patent Management"
        desc="Every filing as a living pipeline — stage, counsel and next action on one line."
        actions={
          <button
            type="button"
            onClick={() => setShowForm((v) => !v)}
            className="inline-flex items-center gap-1.5 rounded-[10px] bg-accent px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-accent-deep"
          >
            <Plus className="h-3.5 w-3.5" /> New provisional
          </button>
        }
      />

      {/* 1 — New provisional */}
      {showForm && (
        <Card title="Raise a provisional filing" action={<Badge tone="accent">Draft</Badge>}>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
            <label className="block flex-1">
              <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                Invention title
              </span>
              <input
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") raiseProvisional();
                }}
                placeholder="e.g. Canopy density estimator"
                className="mt-1.5 h-10 w-full rounded-[10px] border border-line bg-white px-3 text-[13px] text-ink placeholder:text-slate-400 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/15"
              />
            </label>
            <button
              type="button"
              onClick={raiseProvisional}
              disabled={!newTitle.trim()}
              className="h-10 rounded-[10px] bg-accent px-4 text-[13px] font-semibold text-white hover:bg-accent-deep disabled:cursor-not-allowed disabled:opacity-40"
            >
              Raise provisional
            </button>
          </div>
        </Card>
      )}

      {/* 2 — Headline metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat icon={FileText} label="Patent filings" value={String(all.length)} hint="3 disclosures · 1 unfiled" tone="default" />
        <Stat icon={CircleDot} label="Filed or beyond" value={String(filedCount)} hint="2 with the patent office" tone="good" />
        <Stat icon={TriangleAlert} label="Awaiting action" value={String(all.filter((p) => p.tone === "warn").length)} hint="claims v3 is overdue" tone="warn" />
        <Stat icon={Search} label="Claims v3" value={`${doneClaims} / ${claimChecklist.length}`} hint="attached and reviewed" tone={claimsComplete ? "good" : "warn"} />
      </div>

      {/* 3 — Filters */}
      <Card title="Filter by stage" action={<span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">live</span>}>
        <div className="flex flex-wrap items-center gap-2">
          {["All stages", ...patentStages].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setStage(s)}
              className={`rounded-full px-3 py-1.5 text-[12px] font-semibold transition-colors ${
                stage === s
                  ? "bg-accent text-white"
                  : "border border-line bg-white text-slate-500 hover:border-slate-300 hover:text-ink"
              }`}
            >
              {s}
            </button>
          ))}
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search filings…"
            className="ml-auto h-9 w-full max-w-[240px] rounded-[10px] border border-line bg-white px-3 text-[12.5px] text-ink placeholder:text-slate-400 focus:border-accent focus:outline-none"
          />
        </div>
        <p className="mt-3 text-[11.5px] text-slate-400">
          Showing {results.length} of {all.length} filings
          {stage !== "All stages" ? ` at stage “${stage}”` : ""}
        </p>
      </Card>

      <div className="grid gap-5 xl:grid-cols-[1.45fr_1fr]">
        <div className="space-y-5">
          {/* 4 — The pipeline */}
          {results.length ? (
            <div className="space-y-4">
              {results.map((p) => {
                const isActive = active?.id === p.id;
                return (
                  <Card
                    key={p.id}
                    className={`cursor-pointer transition-colors ${isActive ? "border-accent" : ""}`}
                  >
                    <button
                      type="button"
                      onClick={() => setSelected(p.id)}
                      aria-label={`Open file: ${p.title}`}
                      className="w-full text-left"
                    >
                      <div className="flex items-start gap-4">
                        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
                          <FileText className="h-4.5 w-4.5" />
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-[15px] font-semibold text-ink">{p.title}</h3>
                            <Badge tone="default">{p.number}</Badge>
                            {p.tone === "warn" && <Badge tone="warn">Action needed</Badge>}
                            {isActive && <Badge tone="accent">Selected</Badge>}
                          </div>
                          <p className="mt-1 text-[12px] text-slate-400">
                            Filed {p.filed} · Counsel: {p.counsel} · {p.jurisdiction}
                          </p>
                          {/* pipeline */}
                          <div className="mt-4 flex items-center">
                            {patentStages.map((s, i) => {
                              const done = i < p.stage;
                              const current = i === p.stage;
                              return (
                                <div key={s} className="flex flex-1 items-center last:flex-none">
                                  <div className="flex flex-col items-center gap-1">
                                    <span
                                      className={`h-3 w-3 rounded-full border-2 transition-colors ${
                                        done
                                          ? "border-accent bg-accent"
                                          : current
                                            ? "border-accent bg-white ring-4 ring-accent/15"
                                            : "border-slate-200 bg-white"
                                      }`}
                                    />
                                    <span
                                      className={`whitespace-nowrap text-[9.5px] font-semibold ${
                                        current ? "text-accent" : "text-slate-300"
                                      }`}
                                    >
                                      {s}
                                    </span>
                                  </div>
                                  {i < patentStages.length - 1 && (
                                    <div
                                      className={`mx-1 h-0.5 flex-1 rounded ${
                                        i < p.stage ? "bg-accent" : "bg-slate-100"
                                      }`}
                                    />
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </button>
                  </Card>
                );
              })}
            </div>
          ) : (
            <Card className="border-dashed">
              <div className="flex flex-col items-center py-12 text-center">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-accent-soft text-accent">
                  <Search className="h-5 w-5" />
                </span>
                <p className="mt-4 text-[15px] font-semibold text-ink">No filings at that stage</p>
                <p className="mt-1.5 max-w-sm text-[13px] leading-relaxed text-slate-500">
                  Nothing in the portfolio sits at “{stage}” right now.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setStage("All stages");
                    setQuery("");
                  }}
                  className="mt-5 rounded-[10px] bg-accent px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-accent-deep"
                >
                  Clear filters
                </button>
              </div>
            </Card>
          )}

          {/* 5 — Claims v3 tracker */}
          <Card
            title="Claims v3 tracker"
            action={<Badge tone={claimsComplete ? "good" : "warn"}>{doneClaims} of {claimChecklist.length} complete</Badge>}
          >
            <p className="text-[12.5px] leading-relaxed text-slate-500">
              Claims v3 is what blocks the complete-spec window on the multispectral patent. Two
              suggestions from Meera are still unattached.
            </p>
            <Progress value={claimsPct} tone={claimsComplete ? "good" : "warn"} className="mt-3" />
            <ul className="mt-4 space-y-2">
              {claimChecklist.map((c) => {
                const done = Boolean(claims[c.id]);
                return (
                  <li key={c.id}>
                    <button
                      type="button"
                      onClick={() => toggleClaim(c.id)}
                      aria-label={`${done ? "Reopen" : "Complete"}: ${c.item}`}
                      className={`flex w-full items-center gap-3 rounded-xl border px-3.5 py-2.5 text-left transition-colors ${
                        done
                          ? "border-emerald-200 bg-emerald-50/50"
                          : "border-line bg-white hover:border-slate-300"
                      }`}
                    >
                      <span
                        className={`grid h-5 w-5 shrink-0 place-items-center rounded-md border ${
                          done ? "border-emerald-500 bg-emerald-500 text-white" : "border-slate-300 bg-white"
                        }`}
                      >
                        {done && <Check className="h-3 w-3" />}
                      </span>
                      <span
                        className={`min-w-0 flex-1 text-[12.5px] ${
                          done ? "text-slate-400 line-through" : "font-medium text-ink"
                        }`}
                      >
                        {c.item}
                      </span>
                      <Badge tone={c.owner === "You" ? "warn" : "default"}>{c.owner}</Badge>
                    </button>
                  </li>
                );
              })}
            </ul>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-slate-50 px-4 py-3">
              <p className="text-[12px] text-slate-500">
                {sent
                  ? "Claims v3 sent to Meera Krishnan — filing the complete spec is unblocked."
                  : claimsComplete
                    ? "Every claim is attached. Send it to counsel."
                    : `${claimChecklist.length - doneClaims} item${claimChecklist.length - doneClaims === 1 ? "" : "s"} still outstanding.`}
              </p>
              <button
                type="button"
                onClick={() => setSent(true)}
                disabled={!claimsComplete || sent}
                className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-3.5 py-2 text-[12.5px] font-semibold text-white hover:bg-accent-deep disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Send className="h-3 w-3" /> {sent ? "Sent to counsel" : "Send to counsel"}
              </button>
            </div>
          </Card>
        </div>

        <div className="space-y-5">
          {/* 6 — Selected file */}
          {active && (
            <Card title="Selected file">
              <h3 className="text-[15px] font-semibold text-ink">{active.title}</h3>
              <p className="mt-1 text-[12px] text-slate-400">
                {active.number} · {active.jurisdiction}
              </p>
              <dl className="mt-4 space-y-2.5 text-[12.5px]">
                {[
                  ["Stage", patentStages[active.stage]],
                  ["Filed", active.filed],
                  ["Counsel", active.counsel],
                  ["Claims", `${active.claims} claims`],
                  ["Estimated value", active.value],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between gap-3">
                    <dt className="text-slate-500">{k}</dt>
                    <dd className="font-semibold text-ink">{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-4 rounded-xl bg-slate-50 px-4 py-3">
                <p className="text-[12.5px] font-medium text-slate-600">
                  <span className="font-semibold text-accent">Next: </span>
                  {active.next}
                </p>
              </div>
              <p className="mt-3 text-[11.5px] leading-relaxed text-slate-400">
                Portfolio value across all filings: ₹{valueLakhs} L. Valued on the{" "}
                <Link href="/founder/ipr/portfolio" className="font-semibold text-accent hover:underline">
                  IP Portfolio
                </Link>
                .
              </p>
            </Card>
          )}

          {/* 7 — Prior art */}
          <Card title="Prior-art watch">
            <ul className="space-y-3">
              {priorArtWatch.map((w) => (
                <li key={w.title} className="rounded-lg bg-slate-50 p-3">
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-[12.5px] font-medium leading-snug text-ink">{w.title}</p>
                    <Badge tone={w.tone}>{w.status}</Badge>
                  </div>
                  <p className="mt-1 text-[11px] text-slate-400">
                    Filed {w.filed} · {w.overlap}
                  </p>
                </li>
              ))}
            </ul>
          </Card>

          {/* 8 — Costs */}
          <Card title="Filing costs">
            <ul className="space-y-2.5">
              {patentCosts.map((c) => (
                <li key={c.item} className="flex items-center justify-between gap-3 text-[12.5px]">
                  <span className="min-w-0 flex-1 text-slate-600">{c.item}</span>
                  <span className="font-semibold tabular-nums text-ink">{c.amount}</span>
                  <Badge tone={c.tone}>{c.when}</Badge>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>

      {/* 9 — Where to go next */}
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
