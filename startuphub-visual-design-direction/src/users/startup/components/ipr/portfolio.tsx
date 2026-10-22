"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  Check,
  FileText,
  Landmark,
  Search,
  ShieldCheck,
  TriangleAlert,
} from "lucide-react";
import Link from "next/link";
import { Badge, Card, PageHeader, Progress, Stat } from "@/components/app/widgets";
import {
  assetTypes,
  diligenceChecklist,
  formatCr,
  ownership,
  toLakhs,
  totalAssets,
  valuation,
} from "@/users/startup/constants/ipr-data";

const siblings = [
  { href: "/founder/ipr", label: "IPR Overview", body: "Health score, open actions and every deadline in one view." },
  { href: "/founder/ipr/patents", label: "Patent Management", body: "Three filings as a live pipeline with the claims tracker." },
  { href: "/founder/ipr/trademarks", label: "Trademark Management", body: "Class checker, conflict scan and the v2 filing flow." },
  { href: "/founder/ipr/copyright", label: "Copyright Management", body: "Registered works, open-source inventory and assignments." },
  { href: "/founder/ipr/risk", label: "IP Risk Assessment", body: "Likelihood × impact heatmap with mitigations." },
  { href: "/founder/ipr/compliance", label: "Compliance Tracking", body: "Obligations, evidence and the filing tracker." },
];

export function IpPortfolio() {
  const [bucket, setBucket] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const rows = useMemo(
    () =>
      valuation.filter((v) => {
        if (bucket && v.type !== bucket) return false;
        if (query.trim() && !v.asset.toLowerCase().includes(query.trim().toLowerCase())) return false;
        return true;
      }),
    [bucket, query],
  );

  const totalLakhs = valuation.reduce((sum, v) => sum + toLakhs(v.value), 0);
  const registered = valuation.filter((v) => v.stage === "Registered").length;
  const cleanOwners = ownership.filter((o) => o.status === "Clean").length;
  const readyDocs = diligenceChecklist.filter((d) => d.status === "Ready").length;
  const completeness = Math.round((readyDocs / diligenceChecklist.length) * 100);

  return (
    <div className="space-y-5">
      <PageHeader
        title="IP Portfolio"
        desc="Every instrument, counted and valued — the sheet investors will actually look at."
      />

      {/* 1 — Headline metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat icon={FileText} label="Total assets" value={String(totalAssets)} hint="across 5 instrument types" tone="default" />
        <Stat icon={ShieldCheck} label="Registered" value={String(registered)} hint="certificates you can show" tone="good" />
        <Stat icon={Landmark} label="Portfolio value" value={formatCr(totalLakhs)} hint="estimated, pre-dilution" tone="good" />
        <Stat icon={TriangleAlert} label="Diligence ready" value={`${completeness}%`} hint={`${readyDocs} of ${diligenceChecklist.length} documents`} tone="warn" />
      </div>

      {/* 2 — Buckets */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {assetTypes.map((b) => {
          const on = bucket === b.type;
          return (
            <button
              key={b.type}
              type="button"
              onClick={() => setBucket(on ? null : b.type)}
              aria-label={`${on ? "Clear" : "Filter by"} ${b.type}`}
              className={`rounded-2xl border bg-white p-5 text-left transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-16px_rgba(11,18,32,0.18)] ${
                on ? "border-accent ring-2 ring-accent/15" : b.tone === "warn" ? "border-amber-200" : "border-line"
              }`}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-[14px] font-semibold text-ink">{b.type}</h3>
                <Badge tone={b.tone === "warn" ? "warn" : b.tone === "good" ? "good" : b.tone === "accent" ? "accent" : "default"}>
                  {b.count} assets
                </Badge>
              </div>
              <p className="mt-3 text-2xl font-semibold tracking-tight text-ink">{b.estValue}</p>
              <p className="mt-1 text-[12px] leading-relaxed text-slate-500">{b.note}</p>
            </button>
          );
        })}
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.45fr_1fr]">
        <div className="space-y-5">
          {/* 3 — Valuation */}
          <Card
            title="Valuation"
            action={
              <div className="flex items-center gap-2">
                {bucket && (
                  <button
                    type="button"
                    onClick={() => setBucket(null)}
                    className="rounded-full border border-line px-2.5 py-1 text-[11px] font-semibold text-slate-500 hover:text-ink"
                  >
                    {bucket} ×
                  </button>
                )}
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search assets…"
                  className="h-8 w-[150px] rounded-lg border border-line bg-white px-2.5 text-[12px] text-ink placeholder:text-slate-400 focus:border-accent focus:outline-none"
                />
              </div>
            }
            pad={false}
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-line">
                    {["Asset", "Type", "Stage", "Owner", "Value"].map((h) => (
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
                  {rows.map((v) => (
                    <tr key={v.asset}>
                      <td className="px-5 py-3.5 text-[13.5px] font-semibold text-ink">{v.asset}</td>
                      <td className="px-5 py-3.5 text-[13px] text-slate-500">{v.type}</td>
                      <td className="px-5 py-3.5 text-[13px] text-slate-500">{v.stage}</td>
                      <td className="px-5 py-3.5 text-[13px] text-slate-500">{v.owner}</td>
                      <td className="px-5 py-3.5 text-[13px] font-semibold tabular-nums text-ink">
                        {v.value}
                      </td>
                    </tr>
                  ))}
                  {rows.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-5 py-10 text-center text-[13px] text-slate-400">
                        No asset matches that search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-5 py-3.5">
              <span className="text-[12px] text-slate-400">
                Showing {rows.length} of {valuation.length} assets
              </span>
              <span className="text-[13px] font-semibold tabular-nums text-ink">
                Total {formatCr(totalLakhs)}
              </span>
            </div>
          </Card>

          {/* 4 — Diligence checklist */}
          <Card
            title="Investor diligence checklist"
            action={<Badge tone="warn">{readyDocs} of {diligenceChecklist.length} ready</Badge>}
          >
            <Progress value={completeness} tone="warn" />
            <ul className="mt-4 space-y-2">
              {diligenceChecklist.map((d) => (
                <li
                  key={d.item}
                  className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 px-4 py-3"
                >
                  <div className="min-w-0">
                    <p className="text-[12.5px] font-medium text-ink">{d.item}</p>
                    <p className="mt-0.5 text-[11.5px] text-slate-400">{d.note}</p>
                  </div>
                  <Badge tone={d.tone}>{d.status}</Badge>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-[11.5px] leading-relaxed text-slate-400">
              The same {completeness}% the funding screen reports under “IPR portfolio”. The two
              missing documents are{" "}
              <Link href="/founder/ipr/patents" className="font-semibold text-accent hover:underline">
                claims v3
              </Link>{" "}
              and the{" "}
              <Link href="/founder/ipr/copyright" className="font-semibold text-accent hover:underline">
                contractor assignments
              </Link>
              .
            </p>
          </Card>
        </div>

        <div className="space-y-5">
          {/* 5 — Ownership map */}
          <Card
            title="Ownership map"
            action={<Badge tone={cleanOwners === ownership.length ? "good" : "warn"}>{cleanOwners} clean</Badge>}
            pad={false}
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-line">
                    {["Owner", "Assets", "Status"].map((h) => (
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
                  {ownership.map((o) => (
                    <tr key={o.owner}>
                      <td className="px-5 py-3.5">
                        <p className="text-[13.5px] font-semibold text-ink">{o.owner}</p>
                        <p className="mt-0.5 text-[11.5px] leading-snug text-slate-400">{o.note}</p>
                      </td>
                      <td className="px-5 py-3.5 text-[13px] tabular-nums text-slate-500">{o.assets}</td>
                      <td className="px-5 py-3.5">
                        <Badge tone={o.tone}>{o.status}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* 6 — Registered instruments */}
          <Card
            title="Registered instruments"
            action={<Badge tone="good">{registered} with a certificate</Badge>}
            pad={false}
          >
            <ul className="divide-y divide-line">
              {valuation
                .filter((v) => v.stage === "Registered")
                .map((v) => (
                  <li key={v.asset} className="flex items-center gap-3 px-5 py-3">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-emerald-50 text-emerald-600">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[12.5px] font-semibold text-ink">{v.asset}</p>
                      <p className="text-[11px] text-slate-400">
                        {v.type} · {v.owner}
                      </p>
                    </div>
                    <Badge tone="good">Registered</Badge>
                  </li>
                ))}
            </ul>
            <p className="border-t border-line px-5 py-3 text-[11.5px] leading-relaxed text-slate-400">
              A registered instrument is the only one you can hand to an investor without a caveat.
            </p>
          </Card>

          {/* 7 — Valuation mix */}
          <Card title="Valuation mix">
            <ul className="space-y-3">
              {assetTypes
                .filter((b) => b.estValue !== "—")
                .map((b) => {
                  const bucketLakhs = valuation
                    .filter((v) => v.type === b.type)
                    .reduce((sum, v) => sum + toLakhs(v.value), 0);
                  const pct = totalLakhs ? Math.round((bucketLakhs / totalLakhs) * 100) : 0;
                  return (
                    <li key={b.type}>
                      <div className="flex items-baseline justify-between">
                        <span className="text-[12.5px] font-medium text-slate-600">{b.type}</span>
                        <span className="text-[12.5px] font-semibold tabular-nums text-ink">
                          {b.estValue} · {pct}%
                        </span>
                      </div>
                      <Progress value={pct} tone="accent" className="mt-1.5" />
                    </li>
                  );
                })}
            </ul>
            <p className="mt-4 flex items-start gap-2 text-[11.5px] leading-relaxed text-slate-400">
              <Search className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              Trade secrets carry the largest slice but no registration certificate — they are only
              defensible while they stay secret.
            </p>
          </Card>

          {/* 7 — Copilot */}
          <Card title="Copilot recommendation">
            <div className="flex items-start gap-3 rounded-xl bg-accent-mist p-4">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <div>
                <p className="text-[13px] font-semibold text-ink">
                  One asset sits with the founders instead of the company.
                </p>
                <p className="mt-1 text-[12px] leading-relaxed text-slate-600">
                  The “Field Alert” application predates incorporation. Assign it to Lumen AI Pvt Ltd
                  before you file — otherwise the mark belongs to people, not the startup.
                </p>
              </div>
            </div>
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
