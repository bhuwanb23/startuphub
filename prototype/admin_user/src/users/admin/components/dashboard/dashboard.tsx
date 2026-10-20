"use client";

import {
  ArrowRight,
  ArrowUpRight,
  Download,
  Flame,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { Panel, Stat } from "@/components/app/widgets";
import { Tag } from "@/components/app/widgets";
import { cn } from "@/lib/utils";
import { useToast } from "../../hooks/use-toast";
import { FlowBar, Note, StatusPill } from "../shared/bits";
import { Bars, HBars, Sparkline } from "../shared/charts";
import {
  ECOSYSTEM_MINI,
  EXEC_KPIS,
  FAILED_OPS,
  FUNDING_TREND,
  HEALTH_SERVICES,
  MY_TASKS,
  OPS_QUEUES,
  RECENT_CHANGES,
  STARTUPS_BY_SECTOR,
  STARTUPS_BY_STAGE,
} from "../../constants/dashboard";

const SEV: Record<string, { label: string; cls: string }> = {
  critical: { label: "Critical", cls: "bg-rose-50 text-rose-600" },
  high: { label: "High", cls: "bg-amber-50 text-amber-700" },
  normal: { label: "Normal", cls: "bg-slate-100 text-slate-500" },
};

function SevChip({ sev }: { sev: keyof typeof SEV }) {
  return (
    <span className={cn("rounded px-1.5 py-0.5 text-[9.5px] font-semibold uppercase tracking-wide", SEV[sev].cls)}>
      {SEV[sev].label}
    </span>
  );
}

export function AdminDashboard() {
  const { show, viewport } = useToast();

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      {/* header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              Tuesday, April 14 · Platform time 10:42 IST
            </p>
          </div>
          <h2 className="mt-1.5 flex flex-wrap items-center gap-3 text-[22px] font-semibold tracking-tight text-ink">
            Control center
            <Tag tone="rose">Super Admin</Tag>
          </h2>
          <p className="mt-1 text-[13px] text-slate-500">
            Platform governance, operations and oversight — one console.
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            href="/admin/reports"
            className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-line bg-white px-3.5 text-[12.5px] font-semibold text-slate-600 transition-colors hover:border-accent/40 hover:text-accent"
          >
            <Download className="h-3.5 w-3.5" />
            Export report
          </Link>
          <Link
            href="/admin/verification"
            className="group inline-flex h-9 items-center gap-1.5 rounded-lg bg-accent px-3.5 text-[12.5px] font-semibold text-white transition hover:bg-accent-deep"
          >
            <ShieldCheck className="h-3.5 w-3.5" />
            Review queues
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>

      <FlowBar current={4} />

      {/* 3.1 executive overview */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {EXEC_KPIS.map((kpi) => (
          <Stat key={kpi.label} {...kpi} />
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-5">
        {/* 3.2 operational overview */}
        <Panel
          className="lg:col-span-3"
          title="Operational queues"
          description="Who needs attention, and how badly"
          action={<Tag tone="amber">518 open</Tag>}
          bodyClassName="p-0"
        >
          <div className="divide-y divide-line/70">
            {OPS_QUEUES.map((q) => {
              const Icon = q.icon;
              return (
                <Link
                  key={q.title}
                  href={q.href}
                  className="group flex items-center gap-3.5 px-5 py-3.5 transition-colors hover:bg-soft/70"
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent">
                    <Icon className="h-4 w-4" strokeWidth={2.1} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[13px] font-semibold text-ink group-hover:text-accent">
                      {q.title}
                    </span>
                    <span className="block text-[11.5px] text-slate-400">{q.note}</span>
                  </span>
                  <SevChip sev={q.severity} />
                  <span className="w-10 shrink-0 text-right text-[15px] font-semibold text-ink">
                    {q.count}
                  </span>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-slate-300 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                </Link>
              );
            })}
          </div>
        </Panel>

        {/* 3.5 action center */}
        <div className="space-y-5 lg:col-span-2">
          <Panel
            title="My action center"
            description="Assigned to Kabir · Super Admin"
            action={<Tag tone="accent">{MY_TASKS.length} pending</Tag>}
            bodyClassName="p-0"
          >
            <div className="divide-y divide-line/70">
              {MY_TASKS.map((task) => (
                <Link
                  key={task.id}
                  href={task.href}
                  className="group flex items-start gap-3 px-5 py-3.5 transition-colors hover:bg-soft/70"
                >
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-accent" />
                  <span className="min-w-0 flex-1">
                    <span className="block text-[12.5px] font-semibold leading-snug text-ink group-hover:text-accent">
                      {task.title}
                    </span>
                    <span className="mt-0.5 block text-[11px] text-slate-400">{task.meta}</span>
                  </span>
                  <SevChip sev={task.severity} />
                </Link>
              ))}
            </div>
          </Panel>

          <Panel title="Failed operations" description="Require intervention" bodyClassName="p-0">
            <div className="divide-y divide-line/70">
              {FAILED_OPS.map((op) => (
                <div key={op.what} className="flex items-start gap-3 px-5 py-3">
                  <Flame className="mt-0.5 h-4 w-4 shrink-0 text-rose-500" />
                  <div className="min-w-0">
                    <p className="text-[12.5px] font-semibold text-ink">{op.what}</p>
                    <p className="text-[11.5px] text-slate-400">{op.why}</p>
                    <p className="mt-0.5 text-[10.5px] font-medium text-slate-400">{op.when}</p>
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </div>

      {/* 3.3 ecosystem overview */}
      <div className="grid gap-5 lg:grid-cols-3">
        <Panel title="Startups by stage" description="Verified profiles · live directory" className="lg:col-span-1">
          <Bars data={STARTUPS_BY_STAGE} height={148} format={(v) => `${v.toLocaleString()} startups`} />
        </Panel>
        <Panel title="Startups by sector" description="Top 7 of 24 tracked sectors" className="lg:col-span-1">
          <HBars data={STARTUPS_BY_SECTOR} />
        </Panel>
        <Panel
          title="Funding activity"
          description="Verified closes · trailing 12 months"
          action={<Tag tone="green">₹1,204 Cr</Tag>}
          className="lg:col-span-1"
        >
          <Sparkline points={FUNDING_TREND} className="h-[120px] w-full" />
          <div className="mt-2 flex items-center justify-between text-[11px] font-medium text-slate-400">
            <span>Apr &apos;25</span>
            <span>Mar &apos;26</span>
          </div>
          <div className="mt-4 border-t border-line pt-4">
            <HBars data={ECOSYSTEM_MINI.slice(0, 2)} />
          </div>
        </Panel>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {/* 3.4 platform health */}
        <Panel
          title="Platform health"
          description="Service availability, jobs and integrations"
          action={<Tag tone="green">8/9 operational</Tag>}
          bodyClassName="p-0"
        >
          <div className="divide-y divide-line/70">
            {HEALTH_SERVICES.map((svc) => (
              <div key={svc.name} className="flex items-center gap-3 px-5 py-3">
                <span className="relative flex h-2 w-2 shrink-0">
                  {svc.status !== "Operational" ? (
                    <span className="ping-dot absolute inline-flex h-full w-full rounded-full bg-amber-400" />
                  ) : null}
                  <span
                    className={cn(
                      "relative h-2 w-2 rounded-full",
                      svc.status === "Operational" ? "bg-emerald-500" : svc.status === "Degraded" ? "bg-amber-500" : "bg-rose-500",
                    )}
                  />
                </span>
                <span className="min-w-0 flex-1 text-[12.5px] font-semibold text-ink">{svc.name}</span>
                <span className="text-[11.5px] font-medium text-slate-400">{svc.metric}</span>
                <StatusPill status={svc.status} />
              </div>
            ))}
          </div>
        </Panel>

        {/* recent administrative changes */}
        <Panel
          title="Recent administrative changes"
          description="From the audit log — tamper-evident"
          action={
            <Link href="/admin/audit" className="text-[12px] font-semibold text-accent hover:underline">
              Open audit explorer
            </Link>
          }
          bodyClassName="p-0"
        >
          <div className="divide-y divide-line/70">
            {RECENT_CHANGES.map((change) => (
              <div key={`${change.when}-${change.action}`} className="flex items-start gap-3.5 px-5 py-3">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full border-2 border-accent/40 bg-white" />
                <div className="min-w-0">
                  <p className="text-[12.5px] font-semibold text-ink">{change.action}</p>
                  <p className="truncate text-[11.5px] text-slate-400">
                    {change.target}
                  </p>
                  <p className="mt-0.5 text-[11px] font-medium text-slate-400">
                    {change.actor} · {change.when}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <Note title="Governance reminder">
        Actions taken from this console run with privilege. Sensitive operations —
        suspensions, revocations, role elevation, exports — require a reason, are
        scoped by your admin role, and are written to the tamper-evident audit log.
        Risk scores and AI flags trigger review; they are never treated as proof.
      </Note>
      {viewport}
    </div>
  );
}
