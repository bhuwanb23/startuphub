"use client";

import { useMemo, useState } from "react";
import { Panel, Stat, Tag } from "@/components/app/widgets";
import { cn } from "@/lib/utils";
import {
  AI_INCIDENTS,
  AI_SERVICES,
  DRIFT_BARS,
  MATCH_CANDIDATES,
  MATCH_FACTORS,
  MATCH_VERSIONS,
  MODEL_VERSIONS,
  RECO_EXPERIMENTS,
  RECO_SURFACES,
  RISK_ALERTS,
  RISK_FP_TREND,
  RISK_RULES,
  type MatchFactor,
} from "../../constants/ai";
import { useToast } from "../../hooks/use-toast";
import { Note, PageHead, StatusPill } from "../shared/bits";
import { Bars } from "../shared/charts";
import { Toggle } from "../shared/controls";

/* ============================== AI MANAGEMENT ============================== */

export function AiManagementAdmin() {
  const { show, viewport } = useToast();
  const [services, setServices] = useState(AI_SERVICES);
  const [versions, setVersions] = useState(MODEL_VERSIONS);

  const toggleService = (id: number) => {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s)),
    );
    const svc = services.find((s) => s.id === id)!;
    show(
      svc.enabled
        ? `${svc.name} disabled — fallback active: ${svc.fallback}`
        : `${svc.name} re-enabled and warming up`,
      svc.enabled,
    );
  };

  const promote = () => {
    setVersions((prev) =>
      prev.map((v) =>
        v.status === "Awaiting approval"
          ? { ...v, env: "Production", status: "Live", note: "Promoted just now — monitoring window open" }
          : v.status === "Live"
            ? { ...v, status: "Rolled back target" }
            : v,
      ),
    );
    show("MatchRank v2.5 promoted to production — watch window 48h");
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <PageHead
        eyebrow="AI & Intelligence"
        title="AI Management"
        description="The central registry — services, model lifecycle, quality, cost and incidents. Disabling a model never takes the platform down: fallbacks are explicit."
      />
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Stat label="AI services live" value={`${services.filter((s) => s.enabled).length}/${services.length}`} hint="all with defined fallbacks" />
        <Stat label="Requests today" value="3.5M" delta="+12% WoW" tone="up" />
        <Stat label="AI spend MTD" value="$18,420" hint="budget $26K · alert at 85%" />
        <Stat label="Open incidents" value="2" delta="1 high" tone="down" />
      </div>

      {/* service registry */}
      <Panel title="AI service registry" description="Health, usage, cost and fallback per service" bodyClassName="p-0">
        <div className="scroll-quiet overflow-x-auto">
          <table className="w-full min-w-[860px] text-left">
            <thead>
              <tr className="border-b border-line">
                {["Service", "Owner", "Version", "Health", "Latency", "Errors", "Usage", "Cost", "Enabled"].map((h) => (
                  <th key={h} className="px-4 py-3 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-slate-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-line/70">
              {services.map((s) => (
                <tr key={s.id} className="hover:bg-soft/60">
                  <td className="px-4 py-3">
                    <p className="text-[13px] font-semibold text-ink">{s.name}</p>
                    <p className="text-[11px] text-slate-400">{s.purpose}</p>
                  </td>
                  <td className="px-4 py-3 text-[12px] text-slate-500">{s.owner}</td>
                  <td className="px-4 py-3">
                    <code className="rounded bg-soft px-1.5 py-0.5 font-mono text-[11px] text-accent">{s.version}</code>
                    <p className="mt-0.5 text-[10px] text-slate-400">{s.env}</p>
                  </td>
                  <td className="px-4 py-3"><StatusPill status={s.health} /></td>
                  <td className="px-4 py-3 text-[12px] text-slate-500">{s.latency}</td>
                  <td className="px-4 py-3 text-[12px] text-slate-500">{s.errorRate}</td>
                  <td className="px-4 py-3 text-[12px] text-slate-500">{s.usage}</td>
                  <td className="px-4 py-3 text-[12px] font-medium text-slate-600">{s.cost}</td>
                  <td className="px-4 py-3"><Toggle checked={s.enabled} onChange={() => toggleService(s.id)} label={s.name} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>

      <div className="grid gap-5 lg:grid-cols-2">
        {/* model lifecycle */}
        <Panel
          title="Model lifecycle — MatchRank"
          description="Registry, evaluation, staging → production, rollback"
          action={
            <button
              type="button"
              onClick={promote}
              className="rounded-lg bg-accent px-3.5 py-2 text-[12px] font-semibold text-white hover:bg-accent-deep"
            >
              Approve v2.5 promotion
            </button>
          }
          bodyClassName="p-0"
        >
          <div className="divide-y divide-line/70">
            {versions.map((v) => (
              <div key={v.version} className="px-5 py-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[13px] font-semibold text-ink">{v.version}</p>
                  <StatusPill status={v.status} />
                </div>
                <p className="mt-1 text-[11.5px] text-slate-400">{v.note}</p>
                <div className="mt-2 flex flex-wrap gap-2 text-[11px] font-medium text-slate-500">
                  <span className="rounded bg-soft px-2 py-0.5">accuracy {v.accuracy}</span>
                  <span className="rounded bg-soft px-2 py-0.5">drift {v.drift}</span>
                  <span className="rounded bg-soft px-2 py-0.5">{v.env}</span>
                  <span className="rounded bg-soft px-2 py-0.5">{v.deployed}</span>
                </div>
              </div>
            ))}
          </div>
        </Panel>

        {/* quality + incidents */}
        <div className="space-y-5">
          <Panel title="Quality & drift" description="Offline eval + live drift (PSI) by week">
            <Bars data={DRIFT_BARS} height={110} format={(v) => `PSI ${v.toFixed(2)}`} />
            <div className="mt-3 flex flex-wrap gap-2 text-[11px] font-medium text-slate-500">
              <span className="rounded bg-emerald-50 px-2 py-0.5 text-emerald-700">Accuracy 82.1%</span>
              <span className="rounded bg-soft px-2 py-0.5">FP 2.1% · FN 1.8%</span>
              <span className="rounded bg-soft px-2 py-0.5">Bias eval: passed (Apr 02)</span>
            </div>
          </Panel>
          <Panel title="AI incident register" bodyClassName="p-0">
            <div className="divide-y divide-line/70">
              {AI_INCIDENTS.map((i) => (
                <div key={i.id} className="flex items-center gap-3 px-5 py-3">
                  <Tag tone={i.sev === "High" ? "amber" : "slate"}>{i.sev}</Tag>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[12.5px] font-semibold text-ink">{i.what}</span>
                    <span className="text-[11px] text-slate-400">{i.id} · {i.when}</span>
                  </span>
                  <StatusPill status={i.state} />
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </div>
      {viewport}
    </div>
  );
}

/* =============================== MATCHING ================================== */

export function MatchingAdmin() {
  const { show, viewport } = useToast();
  const [weights, setWeights] = useState<Record<MatchFactor, number>>({
    sector: 30, stage: 15, geo: 10, availability: 12, track: 20, prefs: 13,
  });
  const [threshold, setThreshold] = useState(55);

  const scored = useMemo(() => {
    const total = Object.values(weights).reduce((a, b) => a + b, 0) || 1;
    return MATCH_CANDIDATES.map((c) => {
      const score =
        (Object.entries(c.factors) as [MatchFactor, number][]).reduce(
          (sum, [k, f]) => sum + weights[k] * f,
          0,
        ) / total;
      return { ...c, score: Math.round(score) };
    })
      .sort((a, b) => b.score - a.score);
  }, [weights]);

  const visible = scored.filter((c) => c.score >= threshold);

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <PageHead
        eyebrow="AI & Intelligence"
        title="Matching Engine"
        description="Compatibility between entities — configurable factors, live preview, backtesting and versioned releases."
      />
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Stat label="Matches served (30d)" value="42,108" delta="+8%" tone="up" />
        <Stat label="Acceptance rate" value="64%" delta="+2.4 pts" tone="up" />
        <Stat label="Match → meeting" value="41%" hint="conversion" />
        <Stat label="False-match rate" value="4.2%" delta="-0.9 pts" tone="up" />
      </div>

      <div className="grid gap-5 lg:grid-cols-5">
        {/* config */}
        <Panel title="Factor weights" description="Saved as config v19-draft · not yet released" className="lg:col-span-2">
          <div className="space-y-5">
            {MATCH_FACTORS.map((f) => (
              <div key={f.key}>
                <div className="flex items-center justify-between">
                  <label className="text-[12.5px] font-semibold text-ink">{f.label}</label>
                  <span className="text-[12.5px] font-bold text-accent">{weights[f.key]}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={50}
                  value={weights[f.key]}
                  onChange={(e) => setWeights((w) => ({ ...w, [f.key]: Number(e.target.value) }))}
                  className="mt-2 w-full accent-[#3157e8]"
                />
                <p className="text-[10.5px] text-slate-400">{f.hint}</p>
              </div>
            ))}
            <div className="border-t border-line pt-4">
              <div className="flex items-center justify-between">
                <label className="text-[12.5px] font-semibold text-ink">Minimum match threshold</label>
                <span className="text-[12.5px] font-bold text-accent">{threshold}</span>
              </div>
              <input
                type="range"
                min={20}
                max={90}
                value={threshold}
                onChange={(e) => setThreshold(Number(e.target.value))}
                className="mt-2 w-full accent-[#3157e8]"
              />
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => show("Backtest complete: precision 0.83 · recall 0.61 · FP 3.8% (on 12,410 labeled pairs)")}
                className="flex-1 rounded-lg border border-line px-3 py-2 text-[12px] font-semibold text-slate-600 hover:border-accent/40 hover:text-accent"
              >
                Run backtest
              </button>
              <button
                type="button"
                onClick={() => show("Config v19 released to 5% traffic — auto-rollback armed")}
                className="flex-1 rounded-lg bg-accent px-3 py-2 text-[12px] font-semibold text-white hover:bg-accent-deep"
              >
                Release (canary 5%)
              </button>
            </div>
          </div>
        </Panel>

        {/* live preview */}
        <Panel
          title="Match preview"
          description={`${visible.length} of ${scored.length} pairs pass threshold ${threshold} — re-ranks as you tune`}
          className="lg:col-span-3"
          bodyClassName="p-0"
        >
          <div className="divide-y divide-line/70">
            {visible.map((c) => (
              <div key={c.id} className="flex items-center gap-4 px-5 py-3.5">
                <span
                  className={cn(
                    "grid h-10 w-12 shrink-0 place-items-center rounded-lg text-[14px] font-bold",
                    c.score >= 80 ? "bg-emerald-50 text-emerald-700" : c.score >= 60 ? "bg-accent-soft text-accent" : "bg-slate-100 text-slate-500",
                  )}
                >
                  {c.score}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[13px] font-semibold text-ink">{c.pair}</span>
                  <span className="text-[11.5px] text-slate-400">{c.kind} · acceptance {c.acceptance}</span>
                </span>
                <span className="hidden h-1.5 w-24 overflow-hidden rounded-full bg-soft sm:block">
                  <span className="block h-full rounded-full bg-accent" style={{ width: `${c.score}%` }} />
                </span>
              </div>
            ))}
            {visible.length === 0 ? (
              <p className="px-5 py-10 text-center text-[12.5px] text-slate-400">
                No pairs above threshold — lower it or re-balance weights.
              </p>
            ) : null}
          </div>
        </Panel>
      </div>

      {/* versions */}
      <Panel title="Configuration history" description="Every release is versioned and one click from rollback" bodyClassName="p-0">
        <div className="divide-y divide-line/70">
          {MATCH_VERSIONS.map((v) => (
            <div key={v.v} className="flex items-center gap-4 px-5 py-3.5">
              <code className="rounded bg-soft px-2 py-1 font-mono text-[12px] font-bold text-accent">{v.v}</code>
              <span className="min-w-0 flex-1">
                <span className="block text-[12.5px] text-slate-600">{v.note}</span>
                <span className="text-[11px] text-slate-400">{v.when}</span>
              </span>
              {v.current ? (
                <StatusPill status="Live" />
              ) : (
                <button
                  type="button"
                  onClick={() => show(`Rolled back matching config to ${v.v} — audited`)}
                  className="rounded-lg border border-line px-3 py-1.5 text-[11.5px] font-semibold text-slate-500 hover:border-accent/40 hover:text-accent"
                >
                  Roll back
                </button>
              )}
            </div>
          ))}
        </div>
      </Panel>
      {viewport}
    </div>
  );
}

/* ============================ RECOMMENDATIONS ============================== */

export function RecommendationsAdmin() {
  const { show, viewport } = useToast();
  const [surfaces, setSurfaces] = useState(RECO_SURFACES);

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <PageHead
        eyebrow="AI & Intelligence"
        title="Recommendation Management"
        description="What the platform surfaces — rules, ranking, caps, experiments and explanations. Separate from compatibility matching."
      />
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Stat label="Recommendations served (30d)" value="8.9M" delta="+14%" tone="up" />
        <Stat label="Avg CTR" value="6.8%" delta="+0.7 pts" tone="up" />
        <Stat label="Negative feedback" value="0.9%" delta="-0.3 pts" tone="up" />
        <Stat label="Experiments running" value="1" hint="EXP-41 · diversity boost" />
      </div>

      <Panel title="Recommendation surfaces" description="Every slot — audience, caps and performance. Disable any surface instantly." bodyClassName="p-0">
        <div className="divide-y divide-line/70">
          {surfaces.map((s) => (
            <div key={s.id} className="flex items-center gap-4 px-5 py-4">
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-semibold text-ink">{s.name}</p>
                <p className="text-[11.5px] text-slate-400">{s.slot} · {s.audience}</p>
              </div>
              <span className="hidden text-center sm:block">
                <span className="block text-[13px] font-bold text-ink">{s.ctr}</span>
                <span className="text-[10px] uppercase tracking-wide text-slate-400">CTR</span>
              </span>
              <span className="hidden text-center sm:block">
                <span className="block text-[13px] font-bold text-ink">{s.engagement}</span>
                <span className="text-[10px] uppercase tracking-wide text-slate-400">Engage</span>
              </span>
              <span className="hidden rounded-lg bg-soft px-2.5 py-1 text-[11px] font-semibold text-slate-500 md:block">
                cap {s.cap}/day
              </span>
              <Toggle
                checked={s.status}
                onChange={(v) => {
                  setSurfaces((prev) => prev.map((p) => (p.id === s.id ? { ...p, status: v } : p)));
                  show(`${s.name} ${v ? "enabled" : "paused"} — audited`);
                }}
                label={s.name}
              />
            </div>
          ))}
        </div>
      </Panel>

      <div className="grid gap-5 lg:grid-cols-2">
        <Panel title="Experiments" description="A/B release control" bodyClassName="p-0">
          <div className="divide-y divide-line/70">
            {RECO_EXPERIMENTS.map((e) => (
              <div key={e.id} className="px-5 py-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[12.5px] font-semibold text-ink">{e.name}</p>
                  <StatusPill status={e.running ? "Running" : "Completed"} />
                </div>
                <p className="mt-1 text-[11.5px] text-slate-400">{e.variants}</p>
                <p className="mt-1.5 text-[12px] font-semibold text-accent">{e.result}</p>
              </div>
            ))}
          </div>
        </Panel>
        <Panel title="Guardrails" description="Global rules applied before ranking">
          <div className="space-y-3">
            {[
              "Frequency caps respected across all channels (default 3/day)",
              "Dismissed items suppressed for 30 days per user",
              "Unverified entities never appear in recommendation slots",
              "Every recommendation carries a “Why this?” explanation",
              "Cold-start users get editorial slots, not personalization",
            ].map((g) => (
              <div key={g} className="flex items-start gap-2.5 rounded-lg border border-line px-3.5 py-2.5 text-[12.5px] font-medium text-slate-600">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {g}
              </div>
            ))}
          </div>
        </Panel>
      </div>
      {viewport}
    </div>
  );
}

/* ================================ RISK ENGINE ============================== */

export function RiskAdmin() {
  const { show, viewport } = useToast();
  const [rules, setRules] = useState(RISK_RULES);
  const [alerts, setAlerts] = useState(RISK_ALERTS);

  const act = (id: number, action: string, status: string) => {
    setAlerts((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
    show(`${action} — case note written, reporter updated per policy`);
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <PageHead
        eyebrow="AI & Intelligence"
        title="Risk Engine"
        description="Detects harmful, fraudulent or anomalous activity. Scores trigger human review — they never establish misconduct on their own."
      />
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Stat label="Alerts this week" value="142" delta="-8% WoW" tone="up" />
        <Stat label="Open investigations" value="17" delta="4 critical" tone="down" />
        <Stat label="False-positive rate" value="3.6%" delta="-0.5 pts" tone="up" />
        <Stat label="Avg resolution" value="11.4h" delta="-2.1h" tone="up" />
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {/* rules */}
        <Panel title="Risk rules" description="Conditions, thresholds and false-positive tracking" bodyClassName="p-0">
          <div className="divide-y divide-line/70">
            {rules.map((r) => (
              <div key={r.id} className="px-5 py-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[13px] font-semibold text-ink">{r.name}</p>
                    <p className="mt-0.5 text-[11.5px] leading-snug text-slate-400">{r.condition}</p>
                  </div>
                  <Toggle
                    checked={r.active}
                    onChange={(v) => {
                      setRules((prev) => prev.map((p) => (p.id === r.id ? { ...p, active: v } : p)));
                      show(`Rule "${r.name}" ${v ? "activated" : "deactivated"} — version bump recorded`);
                    }}
                    label={r.name}
                  />
                </div>
                <div className="mt-2.5 flex flex-wrap items-center gap-2">
                  <StatusPill status={r.severity} />
                  <span className="rounded bg-soft px-2 py-0.5 text-[10.5px] font-semibold text-slate-500">≥ {r.threshold}</span>
                  <span className="rounded bg-soft px-2 py-0.5 text-[10.5px] font-semibold text-slate-500">FP {r.fp}</span>
                  <span className="rounded bg-soft px-2 py-0.5 font-mono text-[10.5px] text-slate-500">{r.version}</span>
                </div>
              </div>
            ))}
          </div>
        </Panel>

        {/* alert queue */}
        <Panel title="Alert queue" description="Highest scores first — assign, escalate, resolve" bodyClassName="p-0">
          <div className="scroll-quiet max-h-[560px] divide-y divide-line/70 overflow-y-auto">
            {alerts.map((a) => (
              <div key={a.id} className="px-5 py-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-[13px] font-semibold text-ink">{a.entity}</p>
                    <p className="text-[11.5px] text-slate-400">{a.rule} · {a.age} ago</p>
                  </div>
                  <StatusPill status={a.severity} />
                </div>
                <div className="mt-2.5 flex items-center gap-3">
                  <span
                    className={cn(
                      "rounded-lg px-2 py-1 text-[12px] font-bold",
                      a.score >= 90 ? "bg-rose-50 text-rose-600" : a.score >= 75 ? "bg-amber-50 text-amber-700" : "bg-accent-soft text-accent",
                    )}
                  >
                    {a.score}
                  </span>
                  <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-soft">
                    <span className="block h-full rounded-full bg-rose-500/70" style={{ width: `${a.score}%` }} />
                  </span>
                  <span className="text-[11px] font-semibold text-slate-500">{a.status}</span>
                </div>
                <div className="mt-3 flex gap-2">
                  <button type="button" onClick={() => act(a.id, "Assigned to you", "Investigating")} className="rounded-lg border border-line px-2.5 py-1.5 text-[11px] font-semibold text-slate-500 hover:border-accent/40 hover:text-accent">Assign me</button>
                  <button type="button" onClick={() => act(a.id, "Escalated to Trust & Safety lead", "Escalated")} className="rounded-lg border border-line px-2.5 py-1.5 text-[11px] font-semibold text-slate-500 hover:border-accent/40 hover:text-accent">Escalate</button>
                  <button type="button" onClick={() => act(a.id, "Resolved — no violation found", "Resolved")} className="rounded-lg bg-accent px-2.5 py-1.5 text-[11px] font-semibold text-white hover:bg-accent-deep">Resolve</button>
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <Panel title="Model monitoring" description="False-positive trend (weekly %) — calibration holds" action={<Tag tone="green">Calibrated</Tag>}>
        <Bars data={RISK_FP_TREND} height={110} format={(v) => `${v.toFixed(1)}% FP`} />
        <Note className="mt-4" title="How risk scores are used">
          A score opens a case with evidence and a human investigator. Users are told
          what policy applies, can respond, and can appeal. Disabling a rule sets
          alerts to log-only; it never deletes evidence.
        </Note>
      </Panel>
      {viewport}
    </div>
  );
}
