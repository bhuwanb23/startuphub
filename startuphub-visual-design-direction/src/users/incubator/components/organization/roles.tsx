"use client";

import { useMemo, useState } from "react";
import {
  Check,
  Copy,
  History,
  Lock,
  ShieldCheck,
  UserCog,
  Users,
} from "lucide-react";
import { Badge, Card, PageHeader, Progress } from "@/components/app/widgets";
import { cn } from "@/lib/utils";
import {
  CUSTOM_ROLES,
  DELEGATIONS,
  ORG_ROLES,
  PERMISSION_ACTIONS,
  PERMISSION_MODULES,
  PERMISSION_CHANGES,
  ROLE_PERMISSION_MATRIX,
  ROLE_TEMPLATES,
  SEAT_USAGE,
} from "../../constants/organization-data";

const TIER_LABEL: Record<string, string> = {
  L3: "Full workspace",
  L2: "Scoped functions",
  L1: "Read & execute",
};

export function RolesPermissions() {
  const [viewRole, setViewRole] = useState("Program Manager");
  const [showMatrix, setShowMatrix] = useState(false);

  const granted = useMemo(
    () => new Set(ROLE_PERMISSION_MATRIX[viewRole] ?? []),
    [viewRole],
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Roles & Permissions"
        desc="Eight roles, one permission matrix, and a full trail of who changed what."
        actions={
          <button className="inline-flex items-center gap-1.5 rounded-[10px] border border-line bg-white px-4 py-2.5 text-[13px] font-semibold text-ink transition-colors hover:bg-soft">
            <Copy className="h-3.5 w-3.5 text-slate-400" /> Duplicate role
          </button>
        }
      />

      {/* ── 01 · Role list ───────────────────────────────────── */}
      <Card
        title="Roles"
        sub="Click a role to inspect its access"
        action={<Badge tone="accent">8 roles</Badge>}
        pad={false}
      >
        <ul className="divide-y divide-line">
          {ORG_ROLES.map((r) => (
            <li key={r.name}>
              <button
                onClick={() => setViewRole(r.name)}
                className={cn(
                  "flex w-full flex-wrap items-center gap-4 px-5 py-4 text-left transition-colors",
                  viewRole === r.name ? "bg-accent-mist" : "hover:bg-soft",
                )}
              >
                <span
                  className={cn(
                    "grid h-9 w-9 shrink-0 place-items-center rounded-lg",
                    viewRole === r.name
                      ? "bg-accent text-white"
                      : "bg-accent-soft text-accent",
                  )}
                >
                  <UserCog className="h-4 w-4" />
                </span>
                <div className="min-w-[190px] flex-1">
                  <p className="text-[13.5px] font-semibold text-ink">{r.name}</p>
                  <p className="mt-0.5 text-[11.5px] text-slate-400">{r.scope}</p>
                </div>
                <span className="hidden text-[12px] text-slate-500 sm:block">
                  <b className="font-semibold text-ink">{r.members}</b>{" "}
                  {r.members === 1 ? "member" : "members"}
                </span>
                <span className="hidden font-mono text-[10.5px] text-slate-400 lg:block">
                  {r.seats} seats
                </span>
                <Badge tone={r.tone}>{r.tier}</Badge>
              </button>
            </li>
          ))}
        </ul>
      </Card>

      {/* ── 02 · Access tier for the selected role ───────────── */}
      <div className="grid gap-5 lg:grid-cols-5">
        <Card className="lg:col-span-2">
          <div className="flex items-start gap-4">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <div>
              <p className="font-mono text-[9.5px] tracking-[0.18em] text-accent uppercase">
                Selected role
              </p>
              <h3 className="mt-1.5 text-[20px] font-semibold tracking-[-0.02em] text-ink">
                {viewRole}
              </h3>
              <p className="mt-1 text-[12.5px] text-slate-500">
                {TIER_LABEL[
                  ORG_ROLES.find((r) => r.name === viewRole)?.tier ?? "L1"
                ]}{" "}
                · {granted.size} of {PERMISSION_ACTIONS.length} actions granted
              </p>
            </div>
          </div>
          <div className="mt-5 flex flex-wrap gap-1.5">
            {PERMISSION_ACTIONS.map((a) => (
              <span
                key={a}
                className={cn(
                  "rounded-md px-2 py-1 font-mono text-[9.5px] font-medium tracking-[0.06em] uppercase",
                  granted.has(a)
                    ? "bg-accent-soft text-accent"
                    : "bg-soft text-slate-300 line-through",
                )}
              >
                {a}
              </span>
            ))}
          </div>
          <button
            onClick={() => setShowMatrix((v) => !v)}
            className="mt-5 inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-accent"
          >
            {showMatrix ? "Hide full matrix" : "Show full matrix"}
          </button>
        </Card>

        {/* ── 03 · Permission matrix ─────────────────────────── */}
        <Card
          className="lg:col-span-3"
          title="Permission matrix"
          sub={showMatrix ? `Module × action for ${viewRole}` : "Select a role to inspect"}
          action={
            <Badge tone={showMatrix ? "accent" : "default"}>
              {showMatrix ? `${granted.size} granted` : "hidden"}
            </Badge>
          }
        >
          {showMatrix ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[520px] border-collapse">
                <thead>
                  <tr className="border-b border-line">
                    <th className="pb-2.5 pr-3 text-left font-mono text-[9px] tracking-[0.14em] text-slate-400 uppercase">
                      Module
                    </th>
                    {PERMISSION_ACTIONS.map((a) => (
                      <th
                        key={a}
                        className="pb-2.5 text-center font-mono text-[9px] tracking-[0.1em] text-slate-400 uppercase"
                      >
                        {a.slice(0, 3)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {PERMISSION_MODULES.map((m) => (
                    <tr
                      key={m.module}
                      className="border-b border-line/70 transition-colors last:border-0 hover:bg-soft"
                    >
                      <td className="py-2.5 pr-3">
                        <p className="text-[12.5px] font-medium text-ink">
                          {m.module}
                        </p>
                        <p className="mt-0.5 text-[11px] text-slate-400">
                          {m.description}
                        </p>
                      </td>
                      {PERMISSION_ACTIONS.map((a) => {
                        const on = granted.has(a) && m.actions.includes(a);
                        return (
                          <td key={a} className="py-2.5 text-center">
                            {on ? (
                              <Check className="mx-auto h-3.5 w-3.5 text-rise" />
                            ) : (
                              <span className="mx-auto block h-1 w-1 rounded-full bg-slate-200" />
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 py-12 text-center">
              <Lock className="h-6 w-6 text-slate-300" />
              <p className="text-[13px] text-slate-400">
                The matrix is collapsed for this view.
              </p>
              <button
                onClick={() => setShowMatrix(true)}
                className="mt-1 text-[12.5px] font-semibold text-accent"
              >
                Expand matrix
              </button>
            </div>
          )}
        </Card>
      </div>

      {/* ── 04 · Access tiers ────────────────────────────────── */}
      <Card
        title="Access tiers"
        sub="How the three levels stack up"
        action={
          <span className="flex items-center gap-1.5 text-[12px] font-semibold text-slate-400">
            <Lock className="h-3.5 w-3.5" /> Least privilege
          </span>
        }
      >
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            {
              tier: "L3",
              title: "Full workspace",
              body: "Every module, every action, including delete and configure. Held by one person.",
              count: ORG_ROLES.filter((r) => r.tier === "L3").length,
              tone: "accent" as const,
            },
            {
              tier: "L2",
              title: "Scoped functions",
              body: "Full access to the modules they own, approvals included, but no organisation settings.",
              count: ORG_ROLES.filter((r) => r.tier === "L2").length,
              tone: "default" as const,
            },
            {
              tier: "L1",
              title: "Read & execute",
              body: "Can act on their own work and read the rest. No destructive actions anywhere.",
              count: ORG_ROLES.filter((r) => r.tier === "L1").length,
              tone: "default" as const,
            },
          ].map((t) => (
            <div
              key={t.tier}
              className="group rounded-xl border border-line p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-soft"
            >
              <div className="flex items-center justify-between">
                <Badge tone={t.tone}>{t.tier}</Badge>
                <span className="font-mono text-[10.5px] text-slate-400">
                  {t.count} {t.count === 1 ? "role" : "roles"}
                </span>
              </div>
              <p className="mt-3 text-[14px] font-semibold tracking-tight text-ink">
                {t.title}
              </p>
              <p className="mt-1.5 text-[12.5px] leading-relaxed text-slate-500">
                {t.body}
              </p>
            </div>
          ))}
        </div>
      </Card>

      {/* ── 05 · Custom roles ────────────────────────────────── */}
      <Card
        title="Custom roles"
        sub="Departures from the standard eight"
        action={<Badge tone="warn">1 open to everyone</Badge>}
        pad={false}
      >
        <ul className="divide-y divide-line">
          {CUSTOM_ROLES.map((r) => (
            <li
              key={r.name}
              className="flex flex-wrap items-center gap-4 px-5 py-4 transition-colors hover:bg-soft"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent">
                <UserCog className="h-4 w-4" />
              </span>
              <div className="min-w-[190px] flex-1">
                <p className="text-[13.5px] font-semibold text-ink">{r.name}</p>
                <p className="mt-0.5 text-[11.5px] text-slate-400">
                  based on {r.basedOn} · added {r.added}
                </p>
              </div>
              <span className="text-[12px] text-slate-500">
                <b className="font-semibold text-ink">{r.members}</b>{" "}
                {r.members === 1 ? "member" : "members"}
              </span>
              <Badge tone={r.tone}>{r.tone === "warn" ? "Review" : "Active"}</Badge>
            </li>
          ))}
        </ul>
      </Card>

      {/* ── 06 · Delegations ─────────────────────────────────── */}
      <Card
        title="Delegation & approvals"
        sub="Who can approve on whose behalf"
        action={<Badge tone="accent">3 active</Badge>}
        pad={false}
      >
        <ul className="divide-y divide-line">
          {DELEGATIONS.map((d) => (
            <li
              key={`${d.approver}-${d.delegatesTo}-${d.scope}`}
              className="flex flex-wrap items-center gap-4 px-5 py-4 transition-colors hover:bg-soft"
            >
              <span className="flex items-center gap-2 text-[13px] font-medium text-ink">
                {d.approver}
                <span className="text-slate-300">→</span>
                {d.delegatesTo}
              </span>
              <span className="min-w-[200px] flex-1 text-[12px] text-slate-500">
                {d.scope}
              </span>
              <span className="font-mono text-[10.5px] text-slate-400">
                expires {d.expires}
              </span>
              <Badge tone={d.active ? "good" : "default"}>
                {d.active ? "Active" : "Lapsed"}
              </Badge>
            </li>
          ))}
        </ul>
      </Card>

      {/* ── 07 · Audit trail ─────────────────────────────────── */}
      <Card
        title="Permission change trail"
        sub="Every access change is logged and reversible"
        action={
          <span className="flex items-center gap-1.5 text-[12px] font-semibold text-slate-400">
            <History className="h-3.5 w-3.5" /> Immutable
          </span>
        }
        pad={false}
      >
        <ul className="divide-y divide-line">
          {PERMISSION_CHANGES.map((c) => (
            <li
              key={`${c.actor}-${c.when}`}
              className="flex flex-wrap items-center gap-4 px-5 py-4 transition-colors hover:bg-soft"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ink text-[10.5px] font-bold text-white">
                {c.actor
                  .split(" ")
                  .map((w) => w[0])
                  .join("")
                  .slice(0, 2)}
              </span>
              <div className="min-w-[220px] flex-1">
                <p className="text-[13px] text-ink">
                  <b className="font-semibold">{c.actor}</b> {c.action}{" "}
                  <span className="font-medium text-accent">{c.target}</span>
                </p>
              </div>
              <span className="font-mono text-[10.5px] text-slate-400">
                {c.when}
              </span>
              <Badge tone={c.tone}>{c.tone === "good" ? "Granted" : c.tone === "bad" ? "Revoked" : c.tone === "warn" ? "Pending" : "Change"}</Badge>
            </li>
          ))}
        </ul>
      </Card>

      {/* ── 08 · Seat usage + templates ──────────────────────── */}
      <div className="grid gap-5 lg:grid-cols-2">
        <Card
          title="Seat utilisation"
          sub="Filled against allocated seats"
          action={<Badge tone="warn">2 roles full</Badge>}
        >
          <div className="space-y-4">
            {SEAT_USAGE.map((s) => {
              const pct = Math.round((s.used / s.total) * 100);
              return (
                <div key={s.role} className="flex items-center gap-3">
                  <span className="w-[132px] shrink-0 truncate text-[12.5px] font-medium text-slate-600">
                    {s.role}
                  </span>
                  <Progress
                    value={pct}
                    tone={s.tone === "bad" ? "bad" : s.tone === "warn" ? "warn" : "accent"}
                    className="flex-1"
                  />
                  <span className="w-12 text-right text-[12px] font-semibold tabular-nums text-ink">
                    {s.used}/{s.total}
                  </span>
                </div>
              );
            })}
          </div>
        </Card>

        <Card
          title="Role templates"
          sub="Pre-built access bundles for common setups"
          action={
            <span className="flex items-center gap-1.5 text-[12px] font-semibold text-slate-400">
              <Users className="h-3.5 w-3.5" /> 4 templates
            </span>
          }
          pad={false}
        >
          <ul className="divide-y divide-line">
            {ROLE_TEMPLATES.map((t) => (
              <li
                key={t.name}
                className="group px-5 py-4 transition-colors hover:bg-soft"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[13px] font-semibold text-ink">{t.name}</p>
                  <span className="shrink-0 rounded-md bg-soft px-1.5 py-0.5 font-mono text-[9.5px] text-slate-400">
                    {t.roles} {t.roles === 1 ? "role" : "roles"}
                  </span>
                </div>
                <p className="mt-1 text-[12px] leading-relaxed text-slate-500">
                  {t.description}
                </p>
                <p className="mt-1.5 font-mono text-[10px] tracking-[0.08em] text-accent uppercase">
                  for {t.for}
                </p>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
