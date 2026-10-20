"use client";

import { Panel, Stat, Tag } from "@/components/app/widgets";
import { StatusPill } from "../shared/bits";
import {
  ADMIN_ANALYTICS,
  DAU_BARS,
  ECO_REGION,
  ECO_SECTOR,
  ECO_STAGE,
  ECOSYSTEM_GAPS,
  FEATURE_ADOPTION,
  FUNDING_BY_STAGE,
  FUNDING_SERIES,
  FUNNEL,
  IMPACT_CARDS,
  MENTOR_ENGAGEMENT,
  PERF_ROWS,
  PLATFORM_KPIS,
  RESOURCE_UTIL,
  RETENTION_GRID,
} from "../../constants/analytics";
import { Note, PageHead } from "../shared/bits";
import { Bars, HBars, Sparkline } from "../shared/charts";

/* ============================ PLATFORM ANALYTICS ============================ */

export function PlatformAnalyticsAdmin() {
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <PageHead
        eyebrow="Analytics"
        title="Platform Analytics"
        description="How people use StartupHub as a product — every metric has a defined calculation, source and refresh timestamp (metrics v2026.04 · refreshed 09:00 IST)."
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {PLATFORM_KPIS.slice(0, 4).map((k) => (
          <Stat key={k.label} label={k.label} value={k.value} delta={"delta" in k ? k.delta : undefined} tone={"tone" in k ? k.tone : "flat"} hint={"hint" in k ? k.hint : undefined} />
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-5">
        <Panel title="Daily active users" description="Trailing 12 days · thousands" className="lg:col-span-3">
          <Bars data={DAU_BARS} height={150} format={(v) => `${v}K DAU`} />
        </Panel>
        <Panel title="Registration funnel" description="Visited → first key action (30d)" className="lg:col-span-2">
          <div className="space-y-3">
            {FUNNEL.map((f) => (
              <div key={f.label} className="flex items-center gap-3">
                <span className="w-28 shrink-0 text-[12px] font-medium text-slate-500">{f.label}</span>
                <span className="h-6 overflow-hidden rounded-md bg-accent-soft" style={{ width: `${f.value}%` }}>
                  <span className="flex h-full items-center rounded-md bg-accent/85 pl-2 text-[10px] font-bold text-white" style={{ minWidth: 34 }}>
                    {f.value}%
                  </span>
                </span>
                <span className="shrink-0 text-[12px] font-semibold text-ink">{f.display}</span>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <Panel title="Feature adoption" description="Share of active users touching each feature (30d)">
          <HBars data={FEATURE_ADOPTION} />
        </Panel>
        <Panel title="Retention cohorts" description="Weekly cohorts · W0→W5 retention %">
          <div className="grid grid-cols-6 gap-1.5">
            {RETENTION_GRID.flat().map((v, i) => (
              <div
                key={i}
                className="grid h-10 place-items-center rounded-md text-[11px] font-bold"
                style={{
                  backgroundColor: `rgba(49, 87, 232, ${0.06 + (v / 100) * 0.45})`,
                  color: v > 60 ? "#fff" : "#1e293b",
                }}
                title={`Retention ${v}%`}
              >
                {v}
              </div>
            ))}
          </div>
          <p className="mt-3 text-[11px] font-medium text-slate-400">Rows = signup week (oldest → newest) · newer cohorts trending +4 pts at W5</p>
        </Panel>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <Panel title="Platform performance" description="Operations health for the product" bodyClassName="p-0">
          <div className="divide-y divide-line/70">
            {PERF_ROWS.map((r) => (
              <div key={r.name} className="flex items-center justify-between gap-4 px-5 py-3.5">
                <p className="text-[12.5px] font-medium text-slate-600">{r.name}</p>
                <div className="flex items-center gap-3">
                  <span className="text-[12.5px] font-semibold text-ink">{r.value}</span>
                  <StatusPill status={r.status} />
                </div>
              </div>
            ))}
          </div>
        </Panel>
        <Panel title="Admin analytics" description="Operational throughput of the admin team itself">
          <HBars data={ADMIN_ANALYTICS} />
        </Panel>
      </div>
    </div>
  );
}

/* ============================ ECOSYSTEM ANALYTICS =========================== */

export function EcosystemAnalyticsAdmin() {
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <PageHead
        eyebrow="Analytics"
        title="Ecosystem Analytics"
        description="What participants achieve through StartupHub — connections, capital, capability and outcomes. Verified events are distinguished from self-reported data."
      />

      <div className="grid gap-5 lg:grid-cols-3">
        <Panel title="Startups by stage" description="Verified profiles">
          <Bars data={ECO_STAGE} height={140} format={(v) => `${v.toLocaleString()} startups`} />
        </Panel>
        <Panel title="Top sectors" description="Across startup base">
          <HBars data={ECO_SECTOR} />
        </Panel>
        <Panel title="Regional distribution" description="States by active startups">
          <HBars data={ECO_REGION} />
        </Panel>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <Panel
          title="Funding activity"
          description="Verified closes, trailing 12 months (₹ Cr / month)"
          action={<Tag tone="green">₹1,204 Cr total</Tag>}
        >
          <Sparkline points={FUNDING_SERIES} className="h-[120px] w-full" />
          <div className="mt-2 flex items-center justify-between text-[11px] font-medium text-slate-400">
            <span>Apr &apos;25</span><span>Mar &apos;26</span>
          </div>
          <div className="mt-4 border-t border-line pt-4">
            <HBars data={FUNDING_BY_STAGE} />
          </div>
          <Note className="mt-4" tone="info" title="Data quality">
            Counts include only <span className="font-semibold">verified funding events</span>.
            Self-reported raises (412, unverified) are tracked separately and never
            merged into headline totals.
          </Note>
        </Panel>

        <div className="space-y-5">
          <Panel title="Mentorship & incubation" description="Engagement through the network">
            <HBars data={MENTOR_ENGAGEMENT} />
          </Panel>
          <Panel title="Resource utilization" description="Demand vs. booked capacity">
            <div className="space-y-3">
              {RESOURCE_UTIL.map((r) => (
                <div key={r.label} className="flex items-center gap-3">
                  <span className="w-32 shrink-0 text-[12px] font-medium text-slate-500">{r.label}</span>
                  <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-accent-soft">
                    <span className="block h-full rounded-full bg-accent/75" style={{ width: `${r.value}%` }} />
                  </span>
                  <span className="w-10 shrink-0 text-right text-[12px] font-semibold text-ink">{r.value}%</span>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </div>

      {/* impact */}
      <Panel title="Ecosystem impact" description="Validated wherever policy allows — methodology notes attached per metric" bodyClassName="p-5">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {IMPACT_CARDS.map((c) => (
            <div key={c.label} className="rounded-2xl border border-line bg-soft/60 p-5">
              <p className="text-[26px] font-semibold leading-none tracking-[-0.02em] text-ink">{c.value}</p>
              <p className="mt-2 text-[12.5px] font-semibold text-ink">{c.label}</p>
              <p className="mt-0.5 text-[11.5px] text-slate-400">{c.note}</p>
            </div>
          ))}
        </div>
      </Panel>

      <Panel title="Gaps & opportunity areas" description="Where the ecosystem needs intervention" action={<Tag tone="amber">4 gaps</Tag>} bodyClassName="p-5">
        <div className="grid gap-3 sm:grid-cols-2">
          {ECOSYSTEM_GAPS.map((g) => (
            <div key={g} className="flex items-start gap-2.5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-[12.5px] font-medium text-amber-800">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
              {g}
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
