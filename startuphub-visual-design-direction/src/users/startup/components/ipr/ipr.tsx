"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  Check,
  Clock,
  FileText,
  Plus,
  Scale,
  ShieldCheck,
  Sparkles,
  TriangleAlert,
  X,
} from "lucide-react";
import Link from "next/link";
import { Badge, Card, GaugeRing, PageHeader, Progress, Stat } from "@/components/app/widgets";
import {
  assetTypes,
  coverageDimensions,
  diligenceChecklist,
  healthScoreFrom,
  ipRisks,
  obligations,
  openActions,
  patents,
  totalAssets,
  trademarks,
} from "@/users/startup/constants/ipr-data";

/* The other six screens in this workspace. Every one of them links
   back here, and this page links out to all of them. */
const siblings = [
  {
    href: "/founder/ipr/patents",
    label: "Patent Management",
    body: "Three filings as a live pipeline — stage, counsel, claims v3 and prior art.",
  },
  {
    href: "/founder/ipr/trademarks",
    label: "Trademark Management",
    body: "Class checker, conflict scan and the filing flow for the v2 launch mark.",
  },
  {
    href: "/founder/ipr/copyright",
    label: "Copyright Management",
    body: "Registered works, the open-source inventory and every IP assignment.",
  },
  {
    href: "/founder/ipr/portfolio",
    label: "IP Portfolio",
    body: "Every instrument valued and owned — the sheet investors actually read.",
  },
  {
    href: "/founder/ipr/risk",
    label: "IP Risk Assessment",
    body: "A likelihood × impact heatmap with a mitigation plan per exposure.",
  },
  {
    href: "/founder/ipr/compliance",
    label: "Compliance Tracking",
    body: "Every statutory, investor and internal obligation with its evidence.",
  },
];

const filingKinds = ["Patent", "Trademark", "Copyright", "Trade secret"];

type Draft = { id: string; kind: string; title: string; owner: string };

export function Ipr() {
  /* Actions the founder has closed. Closing one lifts the dimension
     it belongs to, and the health score follows — the same model the
     copilot quotes when it says "that takes you to ~82". */
  const [closed, setClosed] = useState<string[]>([]);

  const dims = useMemo(
    () =>
      coverageDimensions.map((d) => {
        const pending = openActions.some((a) => a.dimension === d.dim && !closed.includes(a.id));
        return { ...d, score: pending ? d.score : d.after, pending };
      }),
    [closed],
  );

  const score = healthScoreFrom(dims);
  const stillOpen = openActions.filter((a) => !closed.includes(a.id));
  const closedActions = openActions.filter((a) => closed.includes(a.id));
  const projected = healthScoreFrom(
    coverageDimensions.map((d) => ({ score: d.after, weight: d.weight })),
  );

  /* New filings raised from this page. */
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [kind, setKind] = useState(filingKinds[0]);
  const [title, setTitle] = useState("");

  const activeFilings =
    patents.length + trademarks.filter((t) => t.status !== "Registered").length + drafts.length;

  const deadlines = obligations.filter((o) => o.status !== "Compliant");

  const closeAction = (id: string) =>
    setClosed((prev) => (prev.includes(id) ? prev : [...prev, id]));
  const reopenAction = (id: string) =>
    setClosed((prev) => prev.filter((x) => x !== id));

  const raiseDraft = () => {
    const name = title.trim();
    if (!name) return;
    setDrafts((prev) => [
      ...prev,
      { id: `draft-${prev.length + 1}`, kind, title: name, owner: "You" },
    ]);
    setTitle("");
    setShowForm(false);
  };

  const verdict =
    score >= 80 ? "Strong coverage" : score >= 65 ? "Moderate coverage" : "Thin coverage";

  return (
    <div className="space-y-5">
      <PageHeader
        title="IPR & Legal"
        desc="Your moat, managed like a portfolio — filings, deadlines and risks in one place."
        actions={
          <button
            type="button"
            onClick={() => setShowForm((v) => !v)}
            className="inline-flex items-center gap-1.5 rounded-[10px] bg-accent px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-accent-deep"
          >
            <Plus className="h-3.5 w-3.5" /> New filing
          </button>
        }
      />

      {/* 1 — New filing */}
      {showForm && (
        <Card title="Raise a new filing" action={<Badge tone="accent">Draft</Badge>}>
          <div className="grid gap-3 sm:grid-cols-[150px_1fr_auto] sm:items-end">
            <label className="block">
              <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                Instrument
              </span>
              <select
                value={kind}
                onChange={(e) => setKind(e.target.value)}
                className="mt-1.5 h-10 w-full rounded-[10px] border border-line bg-white px-3 text-[13px] text-ink focus:border-accent focus:outline-none"
              >
                {filingKinds.map((k) => (
                  <option key={k} value={k}>
                    {k}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                Title
              </span>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") raiseDraft();
                }}
                placeholder="e.g. Canopy density estimator"
                className="mt-1.5 h-10 w-full rounded-[10px] border border-line bg-white px-3 text-[13px] text-ink placeholder:text-slate-400 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/15"
              />
            </label>
            <button
              type="button"
              onClick={raiseDraft}
              disabled={!title.trim()}
              className="h-10 rounded-[10px] bg-accent px-4 text-[13px] font-semibold text-white hover:bg-accent-deep disabled:cursor-not-allowed disabled:opacity-40"
            >
              Raise draft
            </button>
          </div>
        </Card>
      )}

      {/* 2 — Headline metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat
          icon={FileText}
          label="IP assets"
          value={String(totalAssets + drafts.length)}
          hint="across 5 instrument types"
          tone="default"
        />
        <Stat
          icon={Scale}
          label="Filings in progress"
          value={String(activeFilings)}
          hint="patents, marks and drafts"
          tone="warn"
        />
        <Stat
          icon={Clock}
          label="Open deadlines"
          value={String(deadlines.length)}
          hint="statutory, investor and internal"
          tone={deadlines.some((d) => d.status === "Overdue") ? "bad" : "warn"}
        />
        <Stat
          icon={ShieldCheck}
          label="IP health score"
          value={String(score)}
          hint={stillOpen.length ? `→ ${projected} if you close ${stillOpen.length}` : "all actions closed"}
          tone={score >= 80 ? "good" : score >= 65 ? "warn" : "bad"}
        />
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.35fr_1fr]">
        <div className="space-y-5">
          {/* 3 — Health model */}
          <Card title="IP portfolio strength" action={<Badge tone={score >= 80 ? "good" : "warn"}>{verdict}</Badge>}>
            <div className="flex items-center gap-4">
              <GaugeRing value={score} size={80} label="score" />
              <div className="text-[12.5px] text-slate-500">
                <p className="font-semibold text-ink">
                  {score === projected ? "Every open action is closed." : `Closing ${stillOpen.length} action${stillOpen.length === 1 ? "" : "s"} takes you to ${projected}.`}
                </p>
                <p className="mt-1 leading-relaxed">
                  Strong patents, but the unprotected v2 brand and missing design filings drag it down.
                </p>
              </div>
            </div>
            <div className="mt-4 space-y-3 border-t border-line pt-4">
              {dims.map((d) => (
                <div key={d.dim}>
                  <div className="flex items-center gap-3">
                    <span className="w-28 shrink-0 text-[12px] text-slate-600">{d.dim}</span>
                    <Progress
                      value={d.score}
                      tone={d.score < 60 ? "warn" : "accent"}
                      className="flex-1"
                    />
                    <span className="w-7 text-right text-[12px] font-semibold tabular-nums text-ink">
                      {d.score}
                    </span>
                  </div>
                  <p className="mt-1 pl-[7.75rem] text-[11px] leading-snug text-slate-400">
                    Weight {d.weight}% · {d.note}
                    {!d.pending && d.score !== d.after && (
                      <span className="font-semibold text-emerald-600"> · closed</span>
                    )}
                  </p>
                </div>
              ))}
            </div>
          </Card>

          {/* 4 — The actions that move the score */}
          <Card
            title="Actions that move the score"
            action={
              <Badge tone={stillOpen.length ? "warn" : "good"}>
                {stillOpen.length} open · {closedActions.length} closed
              </Badge>
            }
            pad={false}
          >
            <ul className="divide-y divide-line">
              {stillOpen.map((a) => (
                <li key={a.id} className="px-5 py-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <p className="text-[13.5px] font-semibold text-ink">{a.title}</p>
                      <p className="mt-1 text-[12px] leading-relaxed text-slate-500">{a.detail}</p>
                    </div>
                    <Badge tone="accent">+{a.impact} pts</Badge>
                  </div>
                  <div className="mt-3 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-slate-50 px-4 py-2.5">
                    <span className="text-[11.5px] text-slate-500">
                      <span className="font-semibold text-ink">{a.owner}</span> · {a.due} · {a.cost}
                    </span>
                    <button
                      type="button"
                      onClick={() => closeAction(a.id)}
                      aria-label={`Close: ${a.title}`}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-white px-3 py-1.5 text-[12px] font-semibold text-ink transition-colors hover:border-emerald-300 hover:text-emerald-600"
                    >
                      <Check className="h-3 w-3" /> Mark done
                    </button>
                  </div>
                </li>
              ))}

              {stillOpen.length === 0 && (
                <li className="px-5 py-8 text-center">
                  <p className="text-[13.5px] font-semibold text-ink">Every action is closed</p>
                  <p className="mt-1 text-[12.5px] text-slate-500">
                    IP health sits at {score} — the same number the copilot, the assessment and the
                    growth health screen all quote.
                  </p>
                </li>
              )}

              {closedActions.map((a) => (
                <li key={a.id} className="flex items-center gap-3 bg-slate-50/60 px-5 py-3">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-emerald-50 text-emerald-600">
                    <Check className="h-3 w-3" />
                  </span>
                  <p className="min-w-0 flex-1 text-[12.5px] font-medium text-slate-500 line-through">
                    {a.title}
                  </p>
                  <Badge tone="good">+{a.impact} pts</Badge>
                  <button
                    type="button"
                    onClick={() => reopenAction(a.id)}
                    aria-label={`Reopen: ${a.title}`}
                    className="inline-flex items-center gap-1 rounded-lg border border-line bg-white px-2.5 py-1 text-[11.5px] font-semibold text-slate-500 hover:text-ink"
                  >
                    <X className="h-3 w-3" /> Reopen
                  </button>
                </li>
              ))}
            </ul>
          </Card>

          {/* 5 — Portfolio by instrument */}
          <Card title="Portfolio by instrument" pad={false}>
            <ul className="divide-y divide-line">
              {assetTypes.map((a) => (
                <li key={a.type} className="flex items-center gap-4 px-5 py-3.5">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent">
                    <FileText className="h-3.5 w-3.5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[13.5px] font-semibold text-ink">{a.type}</p>
                    <p className="mt-0.5 text-[11.5px] leading-snug text-slate-400">{a.note}</p>
                  </div>
                  <span className="text-[12px] font-semibold tabular-nums text-slate-500">{a.count}</span>
                  <Badge tone={a.tone}>{a.registered} registered</Badge>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <div className="space-y-5">
          {/* 6 — Drafts raised from this page */}
          <Card title="Draft filings" action={<Badge tone={drafts.length ? "accent" : "default"}>{drafts.length}</Badge>} pad={false}>
            {drafts.length ? (
              <ul className="divide-y divide-line">
                {drafts.map((d) => (
                  <li key={d.id} className="flex items-center gap-3 px-5 py-3">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-accent-soft text-[10px] font-bold text-accent">
                      {d.kind.slice(0, 2).toUpperCase()}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[12.5px] font-semibold text-ink">{d.title}</p>
                      <p className="text-[11px] text-slate-400">
                        {d.kind} · {d.owner}
                      </p>
                    </div>
                    <Badge tone="accent">Draft</Badge>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="px-5 py-6 text-center text-[12.5px] text-slate-400">
                No drafts yet — raise one with “New filing”.
              </p>
            )}
          </Card>

          {/* 7 — Risk radar */}
          <Card title="Risk radar" action={<TriangleAlert className="h-4 w-4 text-amber-500" />}>
            <ul className="space-y-3">
              {ipRisks.map((r) => (
                <li key={r.id} className="flex items-start justify-between gap-3 rounded-lg bg-slate-50 p-3">
                  <p className="text-[12.5px] font-medium leading-snug text-ink">{r.title}</p>
                  <Badge tone={r.tone}>{r.impact}</Badge>
                </li>
              ))}
            </ul>
            <Link
              href="/founder/ipr/risk"
              className="mt-3 inline-flex items-center gap-1 text-[12px] font-semibold text-accent hover:underline"
            >
              Open the risk assessment <ArrowRight className="h-3 w-3" />
            </Link>
          </Card>

          {/* 8 — Compliance calendar */}
          <Card title="Compliance calendar" action={<Badge tone="warn">{deadlines.length} open</Badge>}>
            <ul className="space-y-2.5">
              {deadlines
                .slice()
                .sort((a, b) => a.days - b.days)
                .slice(0, 5)
                .map((o) => (
                  <li key={o.id} className="flex items-center justify-between gap-3 text-[12.5px]">
                    <span className="min-w-0 flex-1 truncate text-slate-600">{o.name}</span>
                    <Badge tone={o.tone}>{o.due}</Badge>
                  </li>
                ))}
            </ul>
            <Link
              href="/founder/ipr/compliance"
              className="mt-3 inline-flex items-center gap-1 text-[12px] font-semibold text-accent hover:underline"
            >
              Open compliance tracking <ArrowRight className="h-3 w-3" />
            </Link>
          </Card>

          {/* 9 — Investor diligence */}
          <Card title="Investor diligence pack" action={<Badge tone="warn">60% complete</Badge>}>
            <ul className="space-y-2.5">
              {diligenceChecklist.map((d) => (
                <li key={d.item} className="flex items-center justify-between gap-3 text-[12.5px]">
                  <span className="min-w-0 flex-1 text-slate-600">{d.item}</span>
                  <Badge tone={d.tone}>{d.status}</Badge>
                </li>
              ))}
            </ul>
          </Card>

          {/* 10 — Copilot */}
          <Card title="Copilot recommendation">
            <div className="flex items-start gap-3 rounded-xl bg-accent-mist p-4">
              <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <div>
                <p className="text-[13px] font-semibold text-ink">
                  IP &amp; Legal is your weakest assessment dimension.
                </p>
                <p className="mt-1 text-[12px] leading-relaxed text-slate-600">
                  File the “Field Alert” trademark before launch, finish patent claims v3 — you are
                  blocking your own complete-spec window — and collect the two missing contractor
                  assignments. That takes you from {score} to {projected}.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* 11 — Where to go next */}
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
