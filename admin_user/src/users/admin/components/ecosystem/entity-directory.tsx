"use client";

import { useMemo } from "react";
import { Stat } from "@/components/app/widgets";
import { ENTITY_INDEX, type EntityRow } from "../../constants/ecosystem";
import { FlowBar, PageHead, StatusPill } from "../shared/bits";
import { Directory, type DirCol } from "../shared/directory";

export function EntityDirectory({ slug }: { slug: string }) {
  const config = ENTITY_INDEX[slug];

  const categoryOptions = useMemo(
    () =>
      config
        ? Array.from(new Set(config.rows.map((r) => r.category))).map((v) => ({ value: v, label: v }))
        : [],
    [config],
  );

  if (!config) return null;

  const columns: DirCol<EntityRow>[] = [
    {
      id: "entity", label: config.singular, sortValue: (r) => r.name, raw: (r) => r.name,
      cell: (r) => (
        <div className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-accent-soft text-[11px] font-semibold text-accent">
            {r.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
          </span>
          <div className="min-w-0">
            <p className="truncate text-[13px] font-semibold text-ink">{r.name}</p>
            <p className="truncate text-[11.5px] text-slate-400">{r.category}</p>
          </div>
        </div>
      ),
    },
    { id: "owner", label: "Owner / Lead", raw: (r) => r.owner, cell: (r) => <span className="text-[12.5px] text-slate-600">{r.owner}</span> },
    { id: "region", label: "Region", raw: (r) => r.region, cell: (r) => <span className="text-[12.5px] text-slate-500">{r.region}</span> },
    {
      id: "metric", label: config.rows[0]?.metric.label ?? "Metric", sortValue: (r) => r.metric.value,
      raw: (r) => r.metric.value,
      cell: (r) => <span className="text-[12.5px] font-semibold text-ink">{r.metric.value}</span>,
    },
    {
      id: "flags", label: "Flags", align: "center", raw: (r) => r.flags.length,
      cell: (r) =>
        r.flags.length ? (
          <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-semibold text-amber-700">
            {r.flags.length}
          </span>
        ) : (
          <span className="text-[12px] text-slate-300">—</span>
        ),
    },
    { id: "status", label: "Status", raw: (r) => r.status, cell: (r) => <StatusPill status={r.status} /> },
    { id: "joined", label: "Joined", raw: (r) => r.joined, cell: (r) => <span className="text-[12px] text-slate-500">{r.joined}</span> },
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-5">
      <PageHead
        eyebrow="Ecosystem Management"
        title={config.title}
        description={config.description}
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {config.kpis.map((kpi) => (
          <Stat key={kpi.label} label={kpi.label} value={kpi.value} hint="platform-wide" />
        ))}
      </div>

      <FlowBar current={4} />

      <Directory<EntityRow>
        rows={config.rows}
        columns={columns}
        searchPlaceholder={`Search ${config.plural}…`}
        searchText={(r) => `${r.name} ${r.owner} ${r.category} ${r.region} ${r.status}`}
        chips={{
          id: "status", label: "Status",
          options: [
            { value: "Verified", label: "Verified" },
            { value: "Pending", label: "Pending" },
            { value: "Onboarding", label: "Onboarding" },
            { value: "Restricted", label: "Restricted" },
            { value: "Suspended", label: "Suspended" },
            { value: "Warning", label: "Warning" },
            { value: "Inactive", label: "Inactive" },
          ],
          match: (r, v) => r.status === v,
        }}
        selects={[
          { id: "category", label: config.categoryLabel, options: categoryOptions, match: (r, v) => r.category === v },
        ]}
        status={{ get: (r) => r.status }}
        rowName={(r) => r.name}
        exportName={`startuphub-${config.slug}.csv`}
        bulkActions={[
          {
            label: "Verify selected", nextStatus: "Verified",
            eligible: (r) =>
              r.flags.length
                ? "Open risk flag — clear flags first"
                : r.status !== "Pending" && r.status !== "Onboarding"
                  ? `Not in verification queue (${r.status})`
                  : null,
          },
          {
            label: "Suspend selected", tone: "danger", nextStatus: "Suspended",
            eligible: (r) =>
              r.status === "Suspended" ? "Already suspended" : r.status === "Pending" ? "Pending — reject instead of suspending" : null,
          },
        ]}
        detail={(r, ctx) => ({
          title: r.name,
          subtitle: `${config.singular} · joined ${r.joined}`,
          status: ctx.status,
          fields: [
            { label: "Owner / Lead", value: r.owner },
            { label: config.categoryLabel, value: r.category },
            { label: "Region", value: r.region },
            { label: r.metric.label, value: r.metric.value },
          ],
          sections: [
            {
              title: "Verification & risk",
              body: r.flags.length ? (
                <div className="flex flex-wrap gap-1.5">
                  {r.flags.map((f) => (
                    <span key={f} className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-[11px] font-medium text-amber-800">{f}</span>
                  ))}
                </div>
              ) : (
                <p className="text-[12.5px] font-medium text-emerald-600">No open flags.</p>
              ),
            },
            {
              title: "Linked records",
              body: r.linked.length ? (
                <div className="flex flex-wrap gap-1.5">
                  {r.linked.map((l) => (
                    <span key={l} className="rounded-full border border-line bg-soft px-2.5 py-1 text-[11px] font-medium text-slate-600">{l}</span>
                  ))}
                </div>
              ) : <p className="text-[12.5px] text-slate-400">None.</p>,
            },
          ],
          timeline: r.timeline,
          actions: [
            ...(r.status === "Pending" || r.status === "Onboarding" ? [
              { label: `Verify ${config.singular.toLowerCase()}`, tone: "primary" as const, nextStatus: "Verified" },
              { label: "Request corrections", tone: "neutral" as const, nextStatus: r.status, requireReason: true },
            ] : []),
            ...(["Verified", "Active", "Warning", "Inactive"].includes(r.status) ? [
              { label: "Suspend", tone: "danger" as const, nextStatus: "Suspended", requireReason: true },
            ] : []),
            ...(r.status === "Restricted" || r.status === "Suspended" ? [
              { label: "Reinstate", tone: "primary" as const, nextStatus: "Verified" },
            ] : []),
            ...(r.status === "Warning" ? [
              { label: "Clear warning", tone: "neutral" as const, nextStatus: "Verified" },
            ] : []),
          ],
        })}
      />
    </div>
  );
}
