"use client";

import { useState } from "react";
import { Panel, Tag } from "@/components/app/widgets";
import { cn } from "@/lib/utils";
import { CONFIG_HISTORY } from "../../constants/config";
import { useToast } from "../../hooks/use-toast";
import { Note, PageHead } from "../shared/bits";
import { ControlRow, SecretField, SelectSmall, Toggle } from "../shared/controls";

type Change = { key: string; from: string; to: string };

const AREAS = [
  { id: "general", label: "General" },
  { id: "registration", label: "Registration & onboarding" },
  { id: "security", label: "Security" },
  { id: "workflows", label: "Workflows & SLA" },
  { id: "integrations", label: "Integrations" },
  { id: "data", label: "Data & retention" },
  { id: "operations", label: "Feature flags & limits" },
  { id: "governance", label: "Change governance" },
];

export function SystemConfigAdmin() {
  const { show, viewport } = useToast();
  const [area, setArea] = useState("general");
  const [staged, setStaged] = useState<Change[]>([]);
  const [history, setHistory] = useState(CONFIG_HISTORY);

  const stage = (key: string, from: string, to: string) => {
    setStaged((prev) => {
      const rest = prev.filter((c) => c.key !== key);
      return from === to ? rest : [...rest, { key, from, to }];
    });
  };

  const apply = () => {
    const summary = staged.map((c) => `${c.key}: ${c.from} → ${c.to}`).join("; ");
    setHistory((prev) => [
      {
        id: `CFG-${2215 + (prev.length - CONFIG_HISTORY.length)}`,
        what: summary.length > 90 ? `${staged.length} configuration changes` : summary,
        who: "Kabir Malhotra",
        when: "Just now",
        approved: "Second approval recorded",
      },
      ...prev,
    ]);
    setStaged([]);
    show(`${staged.length} changes deployed — versioned, audited, rollback armed`);
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <PageHead
        eyebrow="Platform Operations"
        title="System Configuration"
        description="Central settings for authorized administrators — every change is validated, versioned, approved and reversible."
      />

      <div className="grid gap-5 lg:grid-cols-[220px_1fr]">
        {/* area rail */}
        <div className="flex gap-1.5 overflow-x-auto scroll-quiet lg:flex-col">
          {AREAS.map((a) => (
            <button
              key={a.id}
              type="button"
              onClick={() => setArea(a.id)}
              className={cn(
                "shrink-0 rounded-lg px-3.5 py-2.5 text-left text-[12.5px] font-semibold transition-colors",
                area === a.id ? "bg-accent-soft text-accent" : "text-slate-500 hover:bg-slate-100 hover:text-ink",
              )}
            >
              {a.label}
            </button>
          ))}
        </div>

        <div className="space-y-5">
          {area === "general" ? (
            <Panel title="General platform settings" description="Branding, locale and contact surface">
              <ControlRow
                label="Platform name"
                desc="Shown across the public site, emails and certificates"
                control={<span className="rounded-lg border border-line bg-soft px-3 py-1.5 text-[12.5px] font-semibold text-ink">StartupHub</span>}
              />
              <ControlRow
                label="Default language"
                desc="Fallback when the user has no preference"
                control={<SelectSmall value="en" onChange={(v) => stage("Default language", "English", v)} options={[{ value: "en", label: "English" }, { value: "hi", label: "Hindi (beta)" }]} />}
              />
              <ControlRow
                label="Default time zone"
                desc="Used for scheduling, SLA and audit timestamps"
                control={<SelectSmall value="ist" onChange={(v) => stage("Time zone", "IST", v)} options={[{ value: "ist", label: "Asia/Kolkata (IST)" }, { value: "utc", label: "UTC" }]} />}
              />
              <ControlRow
                label="Currency display"
                desc="Presentational; accounting keeps original currency"
                control={<SelectSmall value="inr" onChange={(v) => stage("Currency", "INR ₹", v)} options={[{ value: "inr", label: "INR ₹" }, { value: "usd", label: "USD $" }]} />}
              />
              <ControlRow
                label="Maintenance banner"
                desc="Shows a dismissible notice on all public pages"
                control={<Toggle checked={false} onChange={(v) => stage("Maintenance banner", "Off", v ? "On" : "Off")} label="Maintenance banner" />}
              />
            </Panel>
          ) : null}

          {area === "registration" ? (
            <Panel title="Registration & onboarding" description="Roles, methods and first-run experience">
              <ControlRow label="Enabled roles at signup" desc="Investor and IPR Expert require verification before activation" control={<span className="text-[12px] font-semibold text-slate-600">All 5 roles</span>} />
              <ControlRow label="Email verification required" desc="Accounts stay in Pending activation until confirmed" control={<Toggle checked onChange={(v) => stage("Email verification", "Required", v ? "Required" : "Optional")} label="Email verification" />} />
              <ControlRow label="Organization duplicate detection" desc="Fuzzy match on legal name + registration ID" control={<SelectSmall value="strict" onChange={(v) => stage("Duplicate detection", "Strict", v)} options={[{ value: "strict", label: "Strict" }, { value: "standard", label: "Standard" }]} />} />
              <ControlRow label="Registration rate limit" desc="Per IP per hour — bot resistance without captcha friction" control={<SelectSmall value="5" onChange={(v) => stage("Registration rate limit", "5/hr", v)} options={[{ value: "5", label: "5 / hour" }, { value: "10", label: "10 / hour" }]} />} />
              <ControlRow label="Default account status" desc="Applied at signup before any admin review" control={<SelectSmall value="pending" onChange={(v) => stage("Default status", "Pending activation", v)} options={[{ value: "pending", label: "Pending activation" }, { value: "active", label: "Active" }]} />} />
            </Panel>
          ) : null}

          {area === "security" ? (
            <>
              <Panel title="Security configuration" description="Privileged — changes require a second approver" action={<Tag tone="rose">Privileged</Tag>}>
                <ControlRow privileged label="Password minimum length" desc="NIST-aligned; no forced rotation" control={<SelectSmall value="12" onChange={(v) => stage("Password min length", "12", v)} options={[{ value: "10", label: "10" }, { value: "12", label: "12" }, { value: "16", label: "16" }]} />} />
                <ControlRow privileged label="MFA policy" desc="Required for all administrative roles" control={<SelectSmall value="admins" onChange={(v) => stage("MFA policy", "Admins required", v)} options={[{ value: "admins", label: "Required for admins" }, { value: "all", label: "Required for everyone" }, { value: "optional", label: "Optional" }]} />} />
                <ControlRow privileged label="Session expiry" desc="Idle timeout for web sessions" control={<SelectSmall value="24h" onChange={(v) => stage("Session expiry", "24h", v)} options={[{ value: "12h", label: "12 hours" }, { value: "24h", label: "24 hours" }, { value: "7d", label: "7 days" }]} />} />
                <ControlRow privileged label="Login attempt limit" desc="Locks account + raises geo-velocity review" control={<SelectSmall value="8" onChange={(v) => stage("Login attempts", "8", v)} options={[{ value: "5", label: "5" }, { value: "8", label: "8" }, { value: "12", label: "12" }]} />} />
                <ControlRow privileged label="Concurrent sessions" desc="Per user account, all device types" control={<SelectSmall value="4" onChange={(v) => stage("Concurrent sessions", "4", v)} options={[{ value: "2", label: "2" }, { value: "4", label: "4" }, { value: "8", label: "8" }]} />} />
              </Panel>
              <Panel title="Secrets" description="Masked — rotation is audited, values never displayed">
                <ControlRow privileged label="Gateway signing secret" desc="Rotated 62 days ago · next due in 28d" control={<SecretField label="8a2f" onRotate={() => show("Secret rotation requested — requires second approver")} />} />
                <ControlRow privileged label="LLM provider key" desc="Rotated 14 days ago · provider B active" control={<SecretField label="f91c" onRotate={() => show("Secret rotation requested — requires second approver")} />} />
              </Panel>
            </>
          ) : null}

          {area === "workflows" ? (
            <Panel title="Workflows & SLA" description="Verification, moderation, programs and finance chains">
              <ControlRow label="Verification SLA — investors" desc="Business days from complete submission" control={<SelectSmall value="7" onChange={(v) => stage("Verification SLA (investors)", "7d", v)} options={[{ value: "7", label: "7 days" }, { value: "10", label: "10 days" }]} />} />
              <ControlRow label="Moderation SLA — critical" desc="Advance-fee, fraud, safety reports" control={<SelectSmall value="8h" onChange={(v) => stage("Moderation SLA (critical)", "8h", v)} options={[{ value: "8h", label: "8 hours" }, { value: "12h", label: "12 hours" }]} />} />
              <ControlRow label="Refund approval chain" desc="Above ₹50K adds Finance Admin second approver" control={<SelectSmall value="standard" onChange={(v) => stage("Refund chain", "Standard + threshold", v)} options={[{ value: "standard", label: "Standard + threshold" }, { value: "single", label: "Single approver" }]} />} />
              <ControlRow label="Reassignment on reviewer idle" desc="Auto-reassign after idle hours in queue" control={<SelectSmall value="24h" onChange={(v) => stage("Idle reassignment", "24h", v)} options={[{ value: "12h", label: "12h" }, { value: "24h", label: "24h" }, { value: "48h", label: "48h" }]} />} />
              <ControlRow label="Escalation on SLA breach" desc="Escalate to team lead, then Super Admin" control={<Toggle checked onChange={(v) => stage("SLA escalation", "On", v ? "On" : "Off")} label="SLA escalation" />} />
            </Panel>
          ) : null}

          {area === "integrations" ? (
            <Panel title="Platform integrations" description="Providers, health and webhook registry">
              {[
                { name: "Email — SendGrid", state: "Operational", note: "bounce webhook verified" },
                { name: "SMS — MSG91 (DLT)", state: "Operational", note: "12 templates registered" },
                { name: "Payments — Razorpay", state: "Operational", note: "signature verification on" },
                { name: "Video — Meet (native)", state: "Operational", note: "recording consent enforced" },
                { name: "LLM providers — 2 of 2", state: "Operational", note: "auto-failover armed" },
                { name: "Analytics warehouse", state: "Degraded", note: "sync lag 42 min — watching" },
              ].map((i) => (
                <div key={i.name} className="flex items-center justify-between gap-4 border-b border-line/70 py-4 last:border-0">
                  <div>
                    <p className="text-[13px] font-semibold text-ink">{i.name}</p>
                    <p className="mt-0.5 text-[11.5px] text-slate-400">{i.note}</p>
                  </div>
                  <Tag tone={i.state === "Degraded" ? "amber" : "green"}>{i.state}</Tag>
                </div>
              ))}
            </Panel>
          ) : null}

          {area === "data" ? (
            <Panel title="Data & retention" description="Classification, retention windows and privacy workflows">
              <ControlRow privileged label="Audit log retention" desc="Hash-chained; cannot be shortened below statutory minimum" control={<SelectSmall value="400" onChange={(v) => stage("Audit retention", "400d", v)} options={[{ value: "400", label: "400 days" }, { value: "730", label: "730 days" }]} />} />
              <ControlRow label="Verification documents" desc="Originals purged after decision + retention window" control={<SelectSmall value="180" onChange={(v) => stage("Doc retention", "180d", v)} options={[{ value: "90", label: "90 days" }, { value: "180", label: "180 days" }]} />} />
              <ControlRow label="Export file expiry" desc="Generated report downloads self-destruct" control={<SelectSmall value="14" onChange={(v) => stage("Export expiry", "14d", v)} options={[{ value: "7", label: "7 days" }, { value: "14", label: "14 days" }]} />} />
              <ControlRow label="Privacy requests (DSR)" desc="Access / erasure workflow SLA" control={<SelectSmall value="30d" onChange={(v) => stage("DSR SLA", "30d", v)} options={[{ value: "30d", label: "30 days" }, { value: "45d", label: "45 days" }]} />} />
              <ControlRow label="Backups" desc="Encrypted, cross-region, restore-tested monthly" control={<Tag tone="green">Healthy · tested Apr 01</Tag>} />
            </Panel>
          ) : null}

          {area === "operations" ? (
            <Panel title="Feature flags & limits" description="Operational switches with safe defaults">
              <ControlRow label="Copilot for founders" desc="Global kill-switch; per-role overrides above" control={<Toggle checked onChange={(v) => stage("Copilot", "On", v ? "On" : "Off")} label="Copilot" />} />
              <ControlRow label="Public startup directory" desc="When off, directory requires login" control={<Toggle checked onChange={(v) => stage("Public directory", "On", v ? "On" : "Off")} label="Public directory" />} />
              <ControlRow label="New investor registrations" desc="Temporarily pause the investor role pipeline" control={<Toggle checked onChange={(v) => stage("Investor registrations", "Open", v ? "Open" : "Paused")} label="Investor registrations" />} />
              <ControlRow label="API rate limit (partners)" desc="Requests per minute per partner key" control={<SelectSmall value="600" onChange={(v) => stage("API rate limit", "600/min", v)} options={[{ value: "600", label: "600 / min" }, { value: "1200", label: "1,200 / min" }]} />} />
              <ControlRow label="File upload limit" desc="Documents and pitch materials" control={<SelectSmall value="25" onChange={(v) => stage("Upload limit", "25MB", v)} options={[{ value: "25", label: "25 MB" }, { value: "50", label: "50 MB" }]} />} />
            </Panel>
          ) : null}

          {area === "governance" ? (
            <Panel title="Configuration governance" description="Registry, versions, approvals and rollback" bodyClassName="p-0">
              <div className="divide-y divide-line/70">
                {history.map((h) => (
                  <div key={h.id} className="px-5 py-4">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-[12.5px] font-semibold text-ink">{h.what}</p>
                      <code className="shrink-0 rounded bg-soft px-2 py-0.5 font-mono text-[10.5px] text-slate-500">{h.id}</code>
                    </div>
                    <p className="mt-1 text-[11.5px] text-slate-400">
                      {h.who} · {h.when} · {h.approved}
                    </p>
                  </div>
                ))}
              </div>
            </Panel>
          ) : null}

          {area !== "governance" ? (
            <Panel title="Configuration history" description="Every change, versioned (latest 3 shown)">
              <div className="space-y-0">
                {history.slice(0, 3).map((h) => (
                  <div key={h.id} className="border-b border-line/70 py-3.5 last:border-0">
                    <p className="text-[12.5px] font-semibold text-ink">{h.what}</p>
                    <p className="mt-0.5 text-[11.5px] text-slate-400">{h.who} · {h.when}</p>
                  </div>
                ))}
              </div>
            </Panel>
          ) : null}

          <Note title="Staging vs production">
            Changes apply to staging first, show an impact preview, then deploy with
            approval. Secrets are never displayed — only masked status and rotation
            controls. Emergency changes are permitted with a mandatory post-hoc review.
          </Note>
        </div>
      </div>

      {/* staged bar */}
      {staged.length > 0 ? (
        <div className="fixed bottom-5 left-1/2 z-[70] flex w-[min(92vw,560px)] -translate-x-1/2 items-center gap-3 rounded-2xl border border-line bg-ink px-5 py-3.5 text-white shadow-lift">
          <span className="min-w-0 flex-1 text-[12.5px] font-medium">
            <span className="font-bold">{staged.length}</span> change{staged.length > 1 ? "s" : ""} staged
            <span className="ml-2 truncate text-white/60">
              {staged.map((c) => `${c.key}: ${c.from}→${c.to}`).join(" · ")}
            </span>
          </span>
          <button
            type="button"
            onClick={() => setStaged([])}
            className="rounded-lg border border-white/20 px-3 py-1.5 text-[11.5px] font-semibold text-white/80"
          >
            Discard
          </button>
          <button
            type="button"
            onClick={apply}
            className="rounded-lg bg-white px-3.5 py-1.5 text-[11.5px] font-bold text-ink hover:bg-slate-100"
          >
            Deploy (2 approvals)
          </button>
        </div>
      ) : null}
      {viewport}
    </div>
  );
}
