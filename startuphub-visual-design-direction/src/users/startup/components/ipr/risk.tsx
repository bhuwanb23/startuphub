"use client";

import { Fragment, useMemo, useState } from "react";
import {
  ArrowRight,
  Check,
  Grid3x3,
  Plus,
  ShieldCheck,
  Target,
  TriangleAlert,
} from "lucide-react";
import Link from "next/link";
import { Badge, Card, GaugeRing, PageHeader, Progress, Stat } from "@/components/app/widgets";
import { freedomToOperate, ipRisks, riskCategories } from "@/users/startup/constants/ipr-data";

const siblings = [
  { href: "/founder/ipr", label: "IPR Overview", body: "Health score, open actions and every deadline in one view." },
  { href: "/founder/ipr/patents", label: "Patent Management", body: "Three filings as a live pipeline with the claims tracker." },
  { href: "/founder/ipr/trademarks", label: "Trademark Management", body: "Class checker, conflict scan and the v2 filing flow." },
  { href: "/founder/ipr/copyright", label: "Copyright Management", body: "Registered works, open-source inventory and assignments." },
  { href: "/founder/ipr/portfolio", label: "IP Portfolio", body: "Every instrument valued and owned." },
  { href: "/founder/ipr/compliance", label: "Compliance Tracking", body: "Obligations, evidence and the filing tracker." },
];

const impactWeight = { High: 1, Medium: 0.6, Low: 0.3 } as const;
const bands = ["High", "Medium", "Low"] as const;

const bandOf = (likelihood: number) =>
  likelihood >= 70 ? "High" : likelihood >= 40 ? "Medium" : "Low";

export function IpRisk() {
  const [category, setCategory] = useState("All categories");
  const [states, setStates] = useState<Record<string, "Open" | "Mitigating" | "Closed">>(() =>
    Object.fromEntries(ipRisks.map((r) => [r.id, r.state])),
  );
  const [selected, setSelected] = useState<string>(ipRisks[0].id);
  const [logged, setLogged] = useState<{ id: string; title: string; category: string; likelihood: number; impact: "High" | "Medium" | "Low"; exposure: string; mitigation: string; mitigationCost: string; owner: string; due: string; state: "Open" | "Mitigating" | "Closed" }[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState(riskCategories[0]);
  const [newImpact, setNewImpact] = useState<"High" | "Medium" | "Low">("Medium");
  const [newLikelihood, setNewLikelihood] = useState(50);

  const all = useMemo(() => [...ipRisks, ...logged], [logged]);

  const visible = useMemo(
    () => all.filter((r) => category === "All categories" || r.category === category),
    [all, category],
  );

  const live = all.filter((r) => states[r.id] !== "Closed");

  /* Portfolio exposure index — likelihood weighted by how much each
     impact level costs you, as a share of the worst case. */
  const exposureIndex = useMemo(() => {
    if (live.length === 0) return 0;
    const actual = live.reduce((sum, r) => sum + r.likelihood * impactWeight[r.impact], 0);
    const worst = live.reduce((sum, r) => sum + 100 * impactWeight[r.impact], 0);
    return Math.round((actual / worst) * 100);
  }, [live]);

  const active = all.find((r) => r.id === selected) ?? all[0];
  const activeState = active ? states[active.id] : "Open";

  const advance = (id: string) =>
    setStates((prev) => {
      const next = prev[id] === "Open" ? "Mitigating" : prev[id] === "Mitigating" ? "Closed" : "Open";
      return { ...prev, [id]: next };
    });

  const logRisk = () => {
    const title = newTitle.trim();
    if (!title) return;
    const risk = {
      id: `risk-new-${logged.length + 1}`,
      title,
      category: newCategory,
      likelihood: newLikelihood,
      impact: newImpact,
      exposure: "Newly logged — exposure not yet sized",
      mitigation: "Assign an owner and agree a mitigation",
      mitigationCost: "—",
      owner: "You",
      due: "Not set",
      state: "Open" as const,
    };
    setLogged((prev) => [...prev, risk]);
    setStates((prev) => ({ ...prev, [risk.id]: "Open" }));
    setSelected(risk.id);
    setNewTitle("");
    setShowForm(false);
  };

  const mitigating = live.filter((r) => states[r.id] === "Mitigating").length;
  const closed = all.length - live.length;

  return (
    <div className="space-y-5">
      <PageHeader
        title="IP Risk Assessment"
        desc="Every exposure scored on likelihood and impact, with a mitigation you can start today."
        actions={
          <button
            type="button"
            onClick={() => setShowForm((v) => !v)}
            className="inline-flex items-center gap-1.5 rounded-[10px] bg-accent px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-accent-deep"
          >
            <Plus className="h-3.5 w-3.5" /> Log a risk
          </button>
        }
      />

      {/* 1 — New risk */}
      {showForm && (
        <Card title="Log a new IP risk" action={<Badge tone="accent">New</Badge>}>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <label className="block xl:col-span-2">
              <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                Risk
              </span>
              <input
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") logRisk();
                }}
                placeholder="e.g. Open-source model licence limits resale"
                className="mt-1.5 h-10 w-full rounded-[10px] border border-line bg-white px-3 text-[13px] text-ink placeholder:text-slate-400 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/15"
              />
            </label>
            <label className="block">
              <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                Category
              </span>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="mt-1.5 h-10 w-full rounded-[10px] border border-line bg-white px-3 text-[13px] text-ink focus:border-accent focus:outline-none"
              >
                {riskCategories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                Impact
              </span>
              <select
                value={newImpact}
                onChange={(e) => setNewImpact(e.target.value as "High" | "Medium" | "Low")}
                className="mt-1.5 h-10 w-full rounded-[10px] border border-line bg-white px-3 text-[13px] text-ink focus:border-accent focus:outline-none"
              >
                {bands.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </label>
            <label className="block sm:col-span-2 xl:col-span-4">
              <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                Likelihood — {newLikelihood}%
              </span>
              <input
                type="range"
                min={5}
                max={100}
                step={5}
                value={newLikelihood}
                onChange={(e) => setNewLikelihood(Number(e.target.value))}
                className="mt-2 w-full accent-[#3157e8]"
              />
            </label>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={logRisk}
              disabled={!newTitle.trim()}
              className="h-10 rounded-[10px] bg-accent px-4 text-[13px] font-semibold text-white hover:bg-accent-deep disabled:cursor-not-allowed disabled:opacity-40"
            >
              Log risk
            </button>
          </div>
        </Card>
      )}

      {/* 2 — Headline metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat icon={TriangleAlert} label="Open risks" value={String(live.length)} hint={`${closed} closed`} tone={live.length ? "warn" : "good"} />
        <Stat icon={Grid3x3} label="High impact" value={String(live.filter((r) => r.impact === "High").length)} hint="one sits 9 days from launch" tone="bad" />
        <Stat icon={Target} label="Mitigations running" value={String(mitigating)} hint="owner assigned, work started" tone="good" />
        <Stat icon={ShieldCheck} label="Exposure index" value={`${exposureIndex}`} hint="0 = no exposure, 100 = worst case" tone={exposureIndex > 60 ? "bad" : exposureIndex > 35 ? "warn" : "good"} />
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.35fr_1fr]">
        <div className="space-y-5">
          {/* 3 — Heatmap */}
          <Card
            title="Likelihood × impact heatmap"
            action={<Badge tone="warn">{visible.length} risks</Badge>}
          >
            <div className="flex flex-wrap items-center gap-2">
              {["All categories", ...riskCategories].map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCategory(c)}
                  className={`rounded-full px-3 py-1.5 text-[12px] font-semibold transition-colors ${
                    category === c
                      ? "bg-accent text-white"
                      : "border border-line bg-white text-slate-500 hover:border-slate-300 hover:text-ink"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            <div className="mt-4 grid grid-cols-[70px_repeat(3,1fr)] gap-2">
              <span />
              {bands.map((b) => (
                <span
                  key={b}
                  className="pb-1 text-center text-[10.5px] font-semibold uppercase tracking-[0.1em] text-slate-400"
                >
                  {b} impact
                </span>
              ))}
              {bands.map((likelihoodBand) => (
                <Fragment key={likelihoodBand}>
                  <span className="flex items-center pr-1 text-right text-[10.5px] font-semibold uppercase tracking-[0.1em] text-slate-400">
                    {likelihoodBand}
                  </span>
                  {bands.map((impactBand) => {
                    const cell = visible.filter(
                      (r) => bandOf(r.likelihood) === likelihoodBand && r.impact === impactBand,
                    );
                    const tone =
                      likelihoodBand === "High" && impactBand === "High"
                        ? "bg-red-50"
                        : likelihoodBand === "Low" && impactBand === "Low"
                          ? "bg-emerald-50"
                          : "bg-slate-50";
                    return (
                      <div key={`${likelihoodBand}-${impactBand}`} className={`min-h-[86px] rounded-xl p-2 ${tone}`}>
                        {cell.length === 0 ? (
                          <p className="text-center text-[10.5px] text-slate-300">—</p>
                        ) : (
                          <ul className="space-y-1.5">
                            {cell.map((r) => (
                              <li key={r.id}>
                                <button
                                  type="button"
                                  onClick={() => setSelected(r.id)}
                                  aria-label={`Select risk: ${r.title}`}
                                  className={`w-full rounded-lg border px-2 py-1.5 text-left text-[10.5px] font-semibold leading-snug transition-colors ${
                                    selected === r.id
                                      ? "border-accent bg-white text-ink"
                                      : "border-transparent bg-white/70 text-slate-600 hover:border-accent"
                                  }`}
                                >
                                  {r.title}
                                  <span className="mt-0.5 block text-[9.5px] font-medium text-slate-400">
                                    {r.likelihood}% · {states[r.id] ?? r.state}
                                  </span>
                                </button>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    );
                  })}
                </Fragment>
              ))}
            </div>
            <p className="mt-3 text-[11.5px] text-slate-400">
              Row = how likely it is. Column = what it costs you if it lands. Pick a card to plan the
              mitigation.
            </p>
          </Card>

          {/* 4 — Risk register */}
          <Card title="Risk register" pad={false}>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-line">
                    {["Risk", "Category", "Likelihood", "Impact", "State"].map((h) => (
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
                  {visible.map((r) => {
                    const state = states[r.id] ?? r.state;
                    return (
                      <tr
                        key={r.id}
                        className={`cursor-pointer transition-colors hover:bg-slate-50 ${
                          selected === r.id ? "bg-accent-mist" : ""
                        }`}
                        onClick={() => setSelected(r.id)}
                      >
                        <td className="px-5 py-3.5 text-[13.5px] font-semibold text-ink">{r.title}</td>
                        <td className="px-5 py-3.5 text-[13px] text-slate-500">{r.category}</td>
                        <td className="px-5 py-3.5 text-[13px] tabular-nums text-slate-500">
                          {r.likelihood}%
                        </td>
                        <td className="px-5 py-3.5">
                          <Badge
                            tone={
                              r.impact === "High" ? "bad" : r.impact === "Medium" ? "warn" : "default"
                            }
                          >
                            {r.impact}
                          </Badge>
                        </td>
                        <td className="px-5 py-3.5">
                          <Badge tone={state === "Closed" ? "good" : state === "Mitigating" ? "accent" : "warn"}>
                            {state}
                          </Badge>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        <div className="space-y-5">
          {/* 5 — Mitigation planner */}
          {active && (
            <Card
              title="Mitigation planner"
              action={
                <Badge tone={activeState === "Closed" ? "good" : activeState === "Mitigating" ? "accent" : "warn"}>
                  {activeState}
                </Badge>
              }
            >
              <h3 className="text-[15px] font-semibold text-ink">{active.title}</h3>
              <p className="mt-1 text-[11.5px] text-slate-400">
                {active.category} · {active.likelihood}% likely · {active.impact} impact
              </p>

              <div className="mt-4 space-y-3">
                <div className="rounded-xl bg-slate-50 px-4 py-3">
                  <p className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                    Exposure
                  </p>
                  <p className="mt-1 text-[12.5px] leading-relaxed text-slate-600">{active.exposure}</p>
                </div>
                <div className="rounded-xl bg-accent-mist px-4 py-3">
                  <p className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-accent">
                    Mitigation
                  </p>
                  <p className="mt-1 text-[12.5px] leading-relaxed text-slate-600">{active.mitigation}</p>
                </div>
              </div>

              <dl className="mt-4 space-y-2.5 text-[12.5px]">
                {[
                  ["Owner", active.owner],
                  ["Due", active.due],
                  ["Cost", active.mitigationCost],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between gap-3">
                    <dt className="text-slate-500">{k}</dt>
                    <dd className="font-semibold text-ink">{v}</dd>
                  </div>
                ))}
              </dl>

              <button
                type="button"
                onClick={() => advance(active.id)}
                aria-label={`Advance mitigation: ${active.title}`}
                className="mt-4 inline-flex w-full items-center justify-center gap-1.5 rounded-[10px] bg-accent px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-accent-deep"
              >
                {activeState === "Open" ? (
                  <>
                    <Target className="h-3.5 w-3.5" /> Start mitigation
                  </>
                ) : activeState === "Mitigating" ? (
                  <>
                    <Check className="h-3.5 w-3.5" /> Mark mitigated
                  </>
                ) : (
                  <>
                    <Check className="h-3.5 w-3.5" /> Reopen risk
                  </>
                )}
              </button>
            </Card>
          )}

          {/* 6 — Exposure */}
          <Card title="Portfolio exposure">
            <div className="flex items-center gap-4">
              <GaugeRing value={exposureIndex} size={80} label="index" />
              <div className="text-[12.5px] text-slate-500">
                <p className="font-semibold text-ink">
                  {exposureIndex > 60 ? "Highly exposed" : exposureIndex > 35 ? "Moderately exposed" : "Well contained"}
                </p>
                <p className="mt-1 leading-relaxed">
                  Likelihood weighted by impact across {live.length} live risk{live.length === 1 ? "" : "s"}.
                  Closing one drops the index immediately.
                </p>
              </div>
            </div>
            <Progress
              value={exposureIndex}
              tone={exposureIndex > 60 ? "bad" : exposureIndex > 35 ? "warn" : "good"}
              className="mt-4"
            />
          </Card>

          {/* 7 — Freedom to operate */}
          <Card title="Freedom to operate">
            <ul className="space-y-3">
              {freedomToOperate.map((f) => (
                <li key={f.claim} className="rounded-lg bg-slate-50 p-3">
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-[12.5px] font-medium leading-snug text-ink">{f.claim}</p>
                    <Badge tone={f.clearedTone}>{f.cleared}</Badge>
                  </div>
                  <p className="mt-1 text-[11px] text-slate-400">{f.note}</p>
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
