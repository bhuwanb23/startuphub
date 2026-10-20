"use client";

import { Plus, UserCog } from "lucide-react";
import { useMemo, useState } from "react";
import { Panel } from "@/components/app/widgets";
import { cn } from "@/lib/utils";
import {
  ADMIN_ORGS,
  ADMIN_ROLES,
  ADMIN_USERS,
  ORG_STEPS,
  PERMISSION_ACTIONS,
  PERMISSION_MODULES,
  PRIVILEGED_REVIEW,
  ROLE_PERMISSIONS,
  ROLE_TEMPLATES,
  SIMULATION_USERS,
  type AdminOrgRow,
  type AdminRoleRow,
  type AdminUserRow,
} from "../../constants/identity";
import { useToast } from "../../hooks/use-toast";
import { FlowBar, Note, PageHead, StatusPill } from "../shared/bits";
import { Directory, type DirCol } from "../shared/directory";

/* ================================ USERS ==================================== */

export function UsersAdmin() {
  const columns: DirCol<AdminUserRow>[] = [
    {
      id: "user", label: "User", sortValue: (r) => r.name, raw: (r) => r.name,
      cell: (r) => (
        <div className="min-w-0">
          <p className="truncate text-[13px] font-semibold text-ink">{r.name}</p>
          <p className="truncate text-[11.5px] text-slate-400">{r.email}</p>
        </div>
      ),
    },
    { id: "role", label: "Role", raw: (r) => r.role, cell: (r) => <span className="text-[12.5px] font-medium text-slate-600">{r.role}</span> },
    { id: "org", label: "Organization", raw: (r) => r.org, cell: (r) => <span className="text-[12.5px] text-slate-500">{r.org}</span> },
    { id: "verification", label: "Verification", raw: (r) => r.verification, cell: (r) => <StatusPill status={r.verification} /> },
    { id: "status", label: "Status", raw: (r) => r.status, cell: (r) => <StatusPill status={r.status} /> },
    { id: "registered", label: "Registered", sortValue: (r) => r.registered, raw: (r) => r.registered, cell: (r) => <span className="text-[12px] text-slate-500">{r.registered}</span> },
    { id: "sessions", label: "Sessions", align: "center", sortValue: (r) => r.sessions, raw: (r) => r.sessions, cell: (r) => <span className="text-[12.5px] font-semibold text-slate-600">{r.sessions}</span> },
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-5">
      <PageHead
        eyebrow="Identity & Access"
        title="User Management"
        description="The full lifecycle of every individual account — from registration to archival, with audit on every sensitive action."
      />
      <Note
        title="Duplicate detection — 3 probable pairs"
        tone="warn"
      >
        Accounts likely representing the same person: &quot;Sanjay Kapoor / S. Kapoor&quot;,
        &quot;Vikram Sethi / V. Sethi&quot;, &quot;Ravi Sharma / Ravi S.&quot;. Merge requires owner
        confirmation and writes both records to the audit log.
      </Note>

      <Directory<AdminUserRow>
        rows={ADMIN_USERS}
        columns={columns}
        searchPlaceholder="Search name, email, user ID or organization…"
        searchText={(r) => `${r.name} ${r.email} ${r.org} ${r.role} usr_${String(r.id).padStart(5, "0")}`}
        chips={{
          id: "status", label: "Status",
          options: [
            { value: "Active", label: "Active" },
            { value: "Pending activation", label: "Pending" },
            { value: "Restricted", label: "Restricted" },
            { value: "Suspended", label: "Suspended" },
            { value: "Locked", label: "Locked" },
          ],
          match: (r, v) => r.status === v,
        }}
        selects={[
          {
            id: "role", label: "Role",
            options: ["Founder", "Mentor", "Investor", "IPR Expert", "Institution Admin", "Resource Provider", "Admin"].map((v) => ({ value: v, label: v })),
            match: (r, v) => r.role === v,
          },
          {
            id: "region", label: "Region",
            options: ["Karnataka", "Maharashtra", "Delhi NCR", "Tamil Nadu", "Kerala"].map((v) => ({ value: v, label: v })),
            match: (r, v) => r.region === v,
          },
        ]}
        status={{ get: (r) => r.status }}
        rowName={(r) => r.name}
        exportName="startuphub-users.csv"
        bulkActions={[
          {
            label: "Suspend selected", tone: "danger", nextStatus: "Suspended",
            eligible: (r) =>
              r.role === "Admin"
                ? "Protected admin account — requires second approver"
                : r.status !== "Active" ? `Not active (currently ${r.status})` : null,
          },
        ]}
        detail={(r, ctx) => ({
          title: r.name,
          subtitle: `usr_${String(r.id).padStart(5, "0")} · joined ${r.registered}`,
          status: ctx.status,
          fields: [
            { label: "Email", value: r.email },
            { label: "Role", value: r.role },
            { label: "Organization", value: r.org },
            { label: "Region", value: r.region },
            { label: "Verification", value: <StatusPill status={r.verification} /> },
            { label: "Last active", value: r.lastActive },
          ],
          sections: [
            {
              title: "Active sessions & devices",
              body: r.sessions > 0 ? (
                <div className="space-y-2">
                  {["MacBook Pro · Chrome · Bengaluru (current)", "iPhone 15 · StartupHub App", "Windows 11 · Edge · Mumbai"].slice(0, r.sessions).map((d) => (
                    <div key={d} className="flex items-center justify-between rounded-lg border border-line px-3 py-2 text-[12px] font-medium text-slate-600">
                      {d}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-[12.5px] text-slate-400">No active sessions.</p>
              ),
            },
            {
              title: "Risk flags",
              body: r.risk.length ? (
                <div className="flex flex-wrap gap-1.5">
                  {r.risk.map((f) => (
                    <span key={f} className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-[11px] font-medium text-amber-800">{f}</span>
                  ))}
                </div>
              ) : (
                <p className="text-[12.5px] font-medium text-emerald-600">No risk flags.</p>
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
            ...(r.status === "Active" ? [
              { label: "Suspend", tone: "danger" as const, nextStatus: "Suspended", requireReason: true },
              { label: "Restrict", tone: "neutral" as const, nextStatus: "Restricted", requireReason: true },
              { label: "Lock", tone: "neutral" as const, nextStatus: "Locked" },
            ] : []),
            ...(["Suspended", "Restricted", "Locked"].includes(r.status) ? [
              { label: "Reinstate", tone: "primary" as const, nextStatus: "Active" },
            ] : []),
            ...(r.status === "Pending activation" ? [
              { label: "Approve activation", tone: "primary" as const, nextStatus: "Active" },
              { label: "Reject", tone: "danger" as const, nextStatus: "Deactivated", requireReason: true },
            ] : []),
            { label: "Force password reset", tone: "neutral" as const, nextStatus: ctx.status },
            { label: "Revoke sessions", tone: "neutral" as const, nextStatus: ctx.status },
          ],
        })}
      />
    </div>
  );
}

/* ================================ ROLES ==================================== */

export function RolesAdmin() {
  const { show, viewport } = useToast();
  const [rows, setRows] = useState<AdminRoleRow[]>(ADMIN_ROLES);

  const createRole = () => {
    setRows((prev) => [
      {
        id: Math.max(...prev.map((r) => r.id)) + 1,
        name: "Untitled role (draft)",
        type: "Administrative",
        scope: "Platform",
        permissions: 0,
        assignments: 0,
        status: "Draft",
        updated: "Just now",
        timeline: [{ when: "Just now", actor: "You (Super Admin)", action: "Role created from scratch" }],
      },
      ...prev,
    ]);
    show("Draft role created — configure permissions next");
  };

  const columns: DirCol<AdminRoleRow>[] = [
    {
      id: "name", label: "Role", sortValue: (r) => r.name, raw: (r) => r.name,
      cell: (r) => (
        <div className="flex items-center gap-2">
          <span className="text-[13px] font-semibold text-ink">{r.name}</span>
          {r.name === "Super Admin" ? (
            <span className="rounded bg-rose-50 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-rose-600">Protected</span>
          ) : null}
        </div>
      ),
    },
    { id: "type", label: "Type", raw: (r) => r.type, cell: (r) => <span className="text-[12.5px] text-slate-500">{r.type}</span> },
    { id: "scope", label: "Scope", raw: (r) => r.scope, cell: (r) => <StatusPill status={r.scope === "Platform" ? "Platform" : "Organization"} /> },
    { id: "permissions", label: "Permissions", align: "center", sortValue: (r) => r.permissions, raw: (r) => r.permissions, cell: (r) => <span className="text-[12.5px] font-semibold text-ink">{r.permissions}</span> },
    { id: "assignments", label: "Assignments", align: "center", sortValue: (r) => r.assignments, raw: (r) => r.assignments, cell: (r) => <span className="text-[12.5px] text-slate-600">{r.assignments.toLocaleString()}</span> },
    { id: "status", label: "Status", raw: (r) => r.status, cell: (r) => <StatusPill status={r.status} /> },
    { id: "updated", label: "Updated", raw: (r) => r.updated, cell: (r) => <span className="text-[12px] text-slate-500">{r.updated}</span> },
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <PageHead
        eyebrow="Identity & Access"
        title="Role Management"
        description="What categories of administrators and ecosystem users can do — templates, scope and assignment history."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {ROLE_TEMPLATES.map((t) => (
          <div key={t.name} className="flex flex-col rounded-2xl border border-line bg-white p-5 shadow-card">
            <div className="flex items-center justify-between gap-2">
              <p className="text-[13.5px] font-semibold text-ink">{t.name}</p>
              {t.protected ? (
                <span className="rounded bg-rose-50 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-rose-600">Protected</span>
              ) : null}
            </div>
            <p className="mt-1.5 text-[12px] leading-snug text-slate-500">{t.desc}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {t.bundles.map((b) => (
                <span key={b} className="rounded-full bg-accent-soft px-2 py-0.5 text-[10.5px] font-semibold text-accent">{b}</span>
              ))}
            </div>
            <p className="mt-auto pt-4 text-[11.5px] font-medium text-slate-400">
              {t.assignments} active assignments · {t.scope} scope
            </p>
          </div>
        ))}
      </div>

      <Directory<AdminRoleRow>
        rows={rows}
        columns={columns}
        searchPlaceholder="Search roles…"
        searchText={(r) => `${r.name} ${r.type} ${r.scope}`}
        chips={{
          id: "status", label: "Status",
          options: [{ value: "Active", label: "Active" }, { value: "Draft", label: "Draft" }, { value: "Deprecated", label: "Deprecated" }],
          match: (r, v) => r.status === v,
        }}
        status={{ get: (r) => r.status }}
        rowName={(r) => r.name}
        exportName="startuphub-roles.csv"
        toolbarExtra={
          <button
            type="button"
            onClick={createRole}
            className="inline-flex h-9 items-center gap-1.5 rounded-xl bg-accent px-3.5 text-[12.5px] font-semibold text-white transition hover:bg-accent-deep"
          >
            <Plus className="h-3.5 w-3.5" />
            Create role
          </button>
        }
        detail={(r, ctx) => ({
          title: r.name,
          subtitle: `${r.type} · ${r.scope}-scoped`,
          status: ctx.status,
          fields: [
            { label: "Permissions mapped", value: r.permissions },
            { label: "Active assignments", value: r.assignments.toLocaleString() },
            { label: "Scope", value: r.scope },
            { label: "Last updated", value: r.updated },
          ],
          timeline: r.timeline,
          actions: r.status === "Draft"
            ? [{ label: "Publish role", tone: "primary", nextStatus: "Active" }]
            : r.status === "Active" && r.name !== "Super Admin"
              ? [{ label: "Retire role", tone: "danger", nextStatus: "Deprecated", requireReason: true }]
              : r.name !== "Super Admin"
                ? [{ label: "Reactivate", tone: "primary", nextStatus: "Active" }]
                : undefined,
        })}
      />
      {viewport}
    </div>
  );
}

/* ============================== PERMISSIONS ================================ */

export function PermissionsAdmin() {
  const { show, viewport } = useToast();
  const roleNames = Object.keys(ROLE_PERMISSIONS);
  const [role, setRole] = useState("Verification Officer");
  const [perms, setPerms] = useState<Record<string, Set<string>>>(() => {
    const init: Record<string, Set<string>> = {};
    for (const [k, v] of Object.entries(ROLE_PERMISSIONS)) init[k] = new Set(v);
    return init;
  });
  const [dirty, setDirty] = useState(false);
  const [simUser, setSimUser] = useState(SIMULATION_USERS[1].name);

  const locked = role === "Super Admin";
  const active = perms[role];

  const toggle = (key: string) => {
    if (locked) return;
    setPerms((prev) => {
      const next = { ...prev };
      const set = new Set(next[role]);
      set.has(key) ? set.delete(key) : set.add(key);
      next[role] = set;
      return next;
    });
    setDirty(true);
  };

  const sim = SIMULATION_USERS.find((u) => u.name === simUser)!;
  const simPerms = perms[sim.role];
  const simCounts = PERMISSION_ACTIONS.map((a) => ({
    action: a,
    count: PERMISSION_MODULES.filter((m) => simPerms.has(`${m}:${a}`)).length,
  }));

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <PageHead
        eyebrow="Identity & Access"
        title="Permission Management"
        description="The granular access layer behind roles — RBAC with module, action and record scope. The interface shows why a user holds a permission."
      />

      {/* role selector */}
      <div className="flex flex-wrap gap-2">
        {roleNames.map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => { setRole(r); setDirty(false); }}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-[12px] font-semibold transition-all",
              role === r ? "border-accent bg-accent text-white" : "border-line bg-white text-slate-500 hover:border-accent/30 hover:text-ink",
            )}
          >
            {r}
          </button>
        ))}
      </div>

      {/* matrix */}
      <Panel
        title={`Permission matrix — ${role}`}
        description={locked ? "System-managed. Protected roles cannot be edited here." : `${active.size} of ${PERMISSION_MODULES.length * PERMISSION_ACTIONS.length} permissions granted`}
        action={
          dirty ? (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setPerms((prev) => ({ ...prev, [role]: new Set(ROLE_PERMISSIONS[role]) }));
                  setDirty(false);
                }}
                className="rounded-lg border border-line px-3 py-1.5 text-[11.5px] font-semibold text-slate-500"
              >
                Discard
              </button>
              <button
                type="button"
                onClick={() => {
                  setDirty(false);
                  show(`Permission changes saved for ${role} — audited`);
                }}
                className="rounded-lg bg-accent px-3.5 py-1.5 text-[11.5px] font-semibold text-white hover:bg-accent-deep"
              >
                Apply changes
              </button>
            </div>
          ) : undefined
        }
        bodyClassName="p-0"
      >
        <div className="scroll-quiet overflow-x-auto">
          <table className="w-full min-w-[680px]">
            <thead>
              <tr className="border-b border-line">
                <th className="px-5 py-3 text-left text-[10.5px] font-semibold uppercase tracking-[0.14em] text-slate-400">Module</th>
                {PERMISSION_ACTIONS.map((a) => (
                  <th key={a} className="px-2 py-3 text-center text-[10.5px] font-semibold uppercase tracking-[0.14em] text-slate-400">{a}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-line/70">
              {PERMISSION_MODULES.map((m) => (
                <tr key={m} className="hover:bg-soft/60">
                  <td className="px-5 py-3 text-[12.5px] font-semibold text-ink">{m}</td>
                  {PERMISSION_ACTIONS.map((a) => {
                    const key = `${m}:${a}`;
                    const on = active.has(key);
                    return (
                      <td key={a} className="px-2 py-3 text-center">
                        <button
                          type="button"
                          disabled={locked}
                          onClick={() => toggle(key)}
                          aria-pressed={on}
                          aria-label={`${m} ${a}`}
                          className={cn(
                            "inline-flex h-6 min-w-6 items-center justify-center rounded-md border px-1.5 text-[10px] font-bold transition-all",
                            on
                              ? "border-accent bg-accent text-white"
                              : "border-line bg-white text-slate-300 hover:border-accent/40 hover:text-accent",
                            locked && "cursor-not-allowed opacity-60",
                          )}
                        >
                          {a.charAt(0)}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>

      <div className="grid gap-5 lg:grid-cols-2">
        {/* access simulation */}
        <Panel
          title="Access simulation"
          description="Can this user do this? — computed from effective grants"
        >
          <label className="block">
            <span className="mb-1.5 block text-[11.5px] font-semibold text-slate-500">User</span>
            <select
              value={simUser}
              onChange={(e) => setSimUser(e.target.value)}
              className="h-10 w-full rounded-xl border border-line bg-white px-3.5 text-[13px] font-semibold text-ink outline-none focus:border-accent/50"
            >
              {SIMULATION_USERS.map((u) => (
                <option key={u.name} value={u.name}>{u.name} — {u.role}</option>
              ))}
            </select>
          </label>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {simCounts.map((c) => (
              <span key={c.action} className={cn("rounded-lg px-2.5 py-1.5 text-[11px] font-semibold", c.count ? "bg-accent-soft text-accent" : "bg-slate-100 text-slate-400")}>
                {c.action} · {c.count}/{PERMISSION_MODULES.length}
              </span>
            ))}
          </div>
          <div className="mt-4 space-y-2 rounded-xl bg-soft p-4 text-[12.5px]">
            <p className="flex items-center gap-2">
              <span className={cn("h-2 w-2 rounded-full", simPerms.has("Verification:Approve") ? "bg-emerald-500" : "bg-rose-500")} />
              {sim.name} {simPerms.has("Verification:Approve") ? "CAN" : "CANNOT"} approve verifications
            </p>
            <p className="flex items-center gap-2">
              <span className={cn("h-2 w-2 rounded-full", simPerms.has("Finance:Export") ? "bg-emerald-500" : "bg-rose-500")} />
              {sim.name} {simPerms.has("Finance:Export") ? "CAN" : "CANNOT"} export financial records
            </p>
            <p className="flex items-center gap-2">
              <span className={cn("h-2 w-2 rounded-full", simPerms.has("Configuration:Configure") ? "bg-emerald-500" : "bg-rose-500")} />
              {sim.name} {simPerms.has("Configuration:Configure") ? "CAN" : "CANNOT"} change system configuration
            </p>
          </div>
          <p className="mt-3 text-[11.5px] leading-snug text-slate-400">
            Grants flow from the “{sim.role}” role — no direct user-level grants.
            Backend enforces every check; hidden buttons are only cosmetic.
          </p>
        </Panel>

        {/* privileged access review */}
        <Panel
          title="Privileged access review"
          description="Elevated grants, last used, and review status"
          bodyClassName="p-0"
        >
          <div className="divide-y divide-line/70">
            {PRIVILEGED_REVIEW.map((p) => (
              <div key={p.user + p.grant} className="flex items-center gap-3.5 px-5 py-3.5">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-rose-50 text-rose-500">
                  <UserCog className="h-4 w-4" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[12.5px] font-semibold text-ink">{p.user}</span>
                  <span className="block truncate text-[11.5px] text-slate-400">{p.grant}</span>
                </span>
                <span className="text-right">
                  <span className="block text-[11px] font-medium text-slate-400">{p.lastUsed}</span>
                  <span className="block text-[11px] font-semibold text-slate-500">{p.review}</span>
                </span>
              </div>
            ))}
          </div>
          <div className="p-5">
            <Note title="Emergency access" tone="warn">
              Break-glass access requires two approvers, auto-expires in 4 hours,
              and is mirrored to the security channel with full session recording.
            </Note>
          </div>
        </Panel>
      </div>
      {viewport}
    </div>
  );
}

/* ============================= ORGANIZATIONS =============================== */

export function OrganizationsAdmin() {
  const columns: DirCol<AdminOrgRow>[] = [
    {
      id: "org", label: "Organization", sortValue: (r) => r.name, raw: (r) => r.name,
      cell: (r) => (
        <div className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-accent-soft text-[11px] font-semibold text-accent">
            {r.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
          </span>
          <div className="min-w-0">
            <p className="truncate text-[13px] font-semibold text-ink">{r.name}</p>
            <p className="text-[11.5px] text-slate-400">{r.type}</p>
          </div>
        </div>
      ),
    },
    { id: "owner", label: "Owner", raw: (r) => r.owner, cell: (r) => <span className="text-[12.5px] text-slate-600">{r.owner}</span> },
    { id: "members", label: "Members", align: "center", sortValue: (r) => r.members, raw: (r) => r.members, cell: (r) => <span className="text-[12.5px] font-semibold text-ink">{r.members}</span> },
    { id: "region", label: "Region", raw: (r) => r.region, cell: (r) => <span className="text-[12.5px] text-slate-500">{r.region}</span> },
    {
      id: "progress", label: "Onboarding", raw: (r) => ORG_STEPS[r.step],
      cell: (r) => (
        <div className="w-32">
          <div className="h-1.5 overflow-hidden rounded-full bg-soft">
            <div className="h-full rounded-full bg-accent" style={{ width: `${(r.step / 4) * 100}%` }} />
          </div>
          <p className="mt-1 text-[10.5px] font-medium text-slate-400">{ORG_STEPS[r.step]}</p>
        </div>
      ),
    },
    { id: "status", label: "Status", raw: (r) => r.status, cell: (r) => <StatusPill status={r.status} /> },
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-5">
      <PageHead
        eyebrow="Identity & Access"
        title="Organization Management"
        description="Every registered entity — registration, duplicate checks, verification, ownership and lifecycle."
      />
      <FlowBar current={3} />
      <Directory<AdminOrgRow>
        rows={ADMIN_ORGS}
        columns={columns}
        searchPlaceholder="Search legal name, owner or region…"
        searchText={(r) => `${r.name} ${r.owner} ${r.type} ${r.region}`}
        chips={{
          id: "status", label: "Status",
          options: [
            { value: "Verified", label: "Verified" },
            { value: "Onboarding", label: "Onboarding" },
            { value: "Suspended", label: "Suspended" },
          ],
          match: (r, v) => r.status === v,
        }}
        selects={[
          {
            id: "type", label: "Type",
            options: ["Startup", "Incubator", "Fund", "Corporate", "Institution", "Provider"].map((v) => ({ value: v, label: v })),
            match: (r, v) => r.type === v,
          },
        ]}
        status={{ get: (r) => r.status }}
        rowName={(r) => r.name}
        exportName="startuphub-organizations.csv"
        bulkActions={[
          {
            label: "Start verification", nextStatus: "Onboarding",
            eligible: (r) => (r.status === "Verified" ? "Already verified" : r.status === "Suspended" ? "Suspended — reinstate first" : null),
          },
        ]}
        detail={(r, ctx) => ({
          title: r.name,
          subtitle: `${r.type} · registered ${r.registered}`,
          status: ctx.status,
          fields: [
            { label: "Owner", value: r.owner },
            { label: "Members", value: String(r.members) },
            { label: "Region", value: r.region },
            { label: "Documents", value: `${r.docs} on file` },
          ],
          sections: [
            {
              title: "Onboarding progress",
              body: (
                <div className="flex items-center gap-1">
                  {ORG_STEPS.map((s, i) => (
                    <div key={s} className="flex flex-1 flex-col items-center gap-1.5">
                      <span className={cn("h-1.5 w-full rounded-full", i <= r.step ? "bg-accent" : "bg-soft")} />
                      <span className={cn("text-center text-[9px] font-semibold leading-tight", i <= r.step ? "text-accent" : "text-slate-400")}>
                        {s}
                      </span>
                    </div>
                  ))}
                </div>
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
              ) : <p className="text-[12.5px] text-slate-400">None yet.</p>,
            },
          ],
          timeline: r.timeline,
          actions: [
            ...(r.status === "Onboarding" ? [
              { label: "Approve organization", tone: "primary" as const, nextStatus: "Verified" },
              { label: "Request corrections", tone: "neutral" as const, nextStatus: "Onboarding", requireReason: true },
            ] : []),
            ...(r.status === "Verified" ? [
              { label: "Suspend organization", tone: "danger" as const, nextStatus: "Suspended", requireReason: true },
            ] : []),
            ...(r.status === "Suspended" ? [
              { label: "Reinstate", tone: "primary" as const, nextStatus: "Verified" },
            ] : []),
          ],
        })}
      />
    </div>
  );
}
