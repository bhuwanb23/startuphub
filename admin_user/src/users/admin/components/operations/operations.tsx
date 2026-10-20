"use client";

import { Check, Download, Send } from "lucide-react";
import { useState } from "react";
import { Panel, Stat, Tag } from "@/components/app/widgets";
import { cn } from "@/lib/utils";
import {
  BUILDER_DOMAINS,
  BUILDER_FIELDS,
  BUILDER_PREVIEW,
  DELIVERY_LOG,
  NOTIF_CHANNELS,
  NOTIF_TEMPLATES,
  REPORT_CATALOG,
  REPORT_HISTORY,
  type DeliveryRow,
  type TemplateRow,
} from "../../constants/operations";
import { useToast } from "../../hooks/use-toast";
import { Note, PageHead, StatusPill } from "../shared/bits";
import { Directory, type DirCol } from "../shared/directory";

/* ============================== NOTIFICATIONS ============================== */

export function NotificationsAdmin() {
  const { show, viewport } = useToast();
  const [log, setLog] = useState(DELIVERY_LOG);
  const [audience, setAudience] = useState("All founders");
  const [template, setTemplate] = useState(NOTIF_TEMPLATES[0].name);

  const retry = (row: DeliveryRow) => {
    setLog((prev) =>
      prev.map((r) => (r.id === row.id ? { ...r, status: "Queued", failed: 0 } : r)),
    );
    show(`${row.failed} failed deliveries re-queued for "${row.campaign}"`);
  };

  const templateCols: DirCol<TemplateRow>[] = [
    {
      id: "name", label: "Template", raw: (r) => r.name,
      cell: (r) => <code className="rounded bg-soft px-1.5 py-0.5 font-mono text-[11.5px] text-accent">{r.name}</code>,
    },
    { id: "trigger", label: "Trigger", raw: (r) => r.trigger, cell: (r) => <span className="text-[12px] text-slate-600">{r.trigger}</span> },
    { id: "channels", label: "Channels", raw: (r) => r.channels, cell: (r) => <span className="text-[12px] text-slate-500">{r.channels}</span> },
    { id: "version", label: "Version", align: "center", raw: (r) => r.version, cell: (r) => <code className="font-mono text-[11.5px] text-slate-500">{r.version}</code> },
    { id: "status", label: "Status", raw: (r) => r.status, cell: (r) => <StatusPill status={r.status} /> },
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <PageHead
        eyebrow="Platform Operations"
        title="Notification Management"
        description="The platform-wide control center — channels, templates, campaigns, delivery and consent. Not your personal inbox."
      />

      {/* channels */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {NOTIF_CHANNELS.map((c) => (
          <div key={c.name} className="rounded-2xl border border-line bg-white p-5 shadow-card">
            <div className="flex items-center justify-between">
              <p className="text-[13px] font-semibold text-ink">{c.name}</p>
              <StatusPill status={c.failures > 100 ? "Degraded" : "Operational"} />
            </div>
            <p className="mt-3 text-[22px] font-semibold tracking-tight text-ink">{c.rate}</p>
            <p className="text-[11.5px] text-slate-400">delivery rate · {c.delivered}</p>
            <p className="mt-2 text-[11px] font-medium text-slate-500">{c.note}</p>
            {c.failures > 0 ? (
              <p className="mt-1.5 text-[11px] font-semibold text-rose-600">{c.failures} failed</p>
            ) : null}
          </div>
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-5">
        {/* composer */}
        <Panel title="Compose campaign" description="Approval required for audiences > 10K" className="lg:col-span-2">
          <div className="space-y-4">
            <label className="block">
              <span className="mb-1.5 block text-[11.5px] font-semibold text-slate-500">Audience / segment</span>
              <select
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                className="h-10 w-full rounded-xl border border-line bg-white px-3.5 text-[13px] font-semibold text-ink outline-none focus:border-accent/50"
              >
                {["All founders", "Verified startups · Seed+", "Investors (active 30d)", "Mentors · AgriTech", "Program applicants · Frontier VII"].map((a) => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="mb-1.5 block text-[11.5px] font-semibold text-slate-500">Template</span>
              <select
                value={template}
                onChange={(e) => setTemplate(e.target.value)}
                className="h-10 w-full rounded-xl border border-line bg-white px-3.5 font-mono text-[12px] font-semibold text-accent outline-none focus:border-accent/50"
              >
                {NOTIF_TEMPLATES.map((t) => (
                  <option key={t.id} value={t.name}>{t.name}</option>
                ))}
              </select>
            </label>
            <div className="rounded-xl border border-line bg-soft p-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">Preview</p>
              <p className="mt-2 text-[12.5px] leading-relaxed text-slate-600">
                Hi {"{{first_name}}"}, quick update from StartupHub — this goes to
                <span className="font-semibold text-ink"> {audience}</span>. Security
                alerts always bypass marketing preferences; this campaign honors
                per-channel consent and frequency caps.
              </p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => show(`Test sent to kabir@startuphub.eco — template ${template}`)}
                className="flex-1 rounded-lg border border-line px-3 py-2.5 text-[12px] font-semibold text-slate-600 hover:border-accent/40 hover:text-accent"
              >
                Send test
              </button>
              <button
                type="button"
                onClick={() => show(`Campaign queued for approval — "${audience}" · requires Ops sign-off`)}
                className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-accent px-3 py-2.5 text-[12px] font-semibold text-white hover:bg-accent-deep"
              >
                <Send className="h-3.5 w-3.5" />
                Queue campaign
              </button>
            </div>
          </div>
        </Panel>

        {/* delivery log */}
        <Panel
          title="Delivery & campaigns"
          description="Failures retryable — provider incidents tracked here"
          className="lg:col-span-3"
          bodyClassName="p-0"
        >
          <div className="divide-y divide-line/70">
            {log.map((row) => (
              <div key={row.id} className="flex items-center gap-4 px-5 py-4">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-semibold text-ink">{row.campaign}</p>
                  <p className="text-[11.5px] text-slate-400">{row.audience} · {row.sent}</p>
                </div>
                <span className="hidden text-[11px] font-medium text-slate-400 sm:block">{row.when}</span>
                <StatusPill status={row.status} />
                {row.failed > 0 ? (
                  <button
                    type="button"
                    onClick={() => retry(row)}
                    className="rounded-lg border border-line px-2.5 py-1.5 text-[11px] font-semibold text-slate-500 hover:border-accent/40 hover:text-accent"
                  >
                    Retry {row.failed}
                  </button>
                ) : null}
              </div>
            ))}
          </div>
        </Panel>
      </div>

      {/* templates */}
      <div>
        <h3 className="mb-3 text-[15px] font-semibold tracking-tight text-ink">Template registry</h3>
        <Directory<TemplateRow>
          rows={NOTIF_TEMPLATES}
          columns={templateCols}
          searchPlaceholder="Search templates…"
          searchText={(r) => `${r.name} ${r.trigger} ${r.channels}`}
          status={{ get: (r) => r.status }}
          rowName={(r) => r.name}
          exportName="startuphub-notification-templates.csv"
          detail={(r, ctx) => ({
            title: r.name,
            subtitle: `Trigger: ${r.trigger}`,
            status: ctx.status,
            fields: [
              { label: "Channels", value: r.channels },
              { label: "Version", value: r.version },
              { label: "Consent class", value: r.name.includes("security") ? "Critical — always sent" : "Preference-respecting" },
            ],
            timeline: r.timeline,
            actions: [
              ...(r.status === "In review" ? [{ label: "Publish version", tone: "primary" as const, nextStatus: "Published" }] : []),
              ...(r.status === "Published" ? [{ label: "Pause sends", tone: "neutral" as const, nextStatus: "Paused", requireReason: true }] : []),
            ],
          })}
        />
      </div>

      <Note title="Consent & critical alerts">
        Channel consent and frequency limits are enforced before every send.
        Security-critical alerts (account locks, payment fraud) cannot be
        unsubscribed — everything else honors opt-outs, audited per send.
      </Note>
      {viewport}
    </div>
  );
}

/* ================================ REPORTS ================================== */

export function ReportsAdmin() {
  const { show, viewport } = useToast();
  const [domain, setDomain] = useState("startups");
  const [fields, setFields] = useState<Set<string>>(new Set(BUILDER_FIELDS["startups"].slice(0, 4)));
  const [history, setHistory] = useState(REPORT_HISTORY);

  const preview = BUILDER_PREVIEW[domain];

  const run = () => {
    const entry = {
      id: Math.max(...history.map((h) => h.id)) + 1,
      name: `Custom — ${BUILDER_DOMAINS.find((d) => d.value === domain)?.label} (${fields.size} fields)`,
      ran: "Just now",
      by: "Kabir Malhotra",
      format: "CSV",
      status: "Ready",
    };
    setHistory((prev) => [entry, ...prev]);
    show("Report generated — PII fields masked · export audited");
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <PageHead
        eyebrow="Platform Operations"
        title="Report Management"
        description="Standardized reports across every module — with access control, masking and traceable exports."
      />

      {/* catalog */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {REPORT_CATALOG.map((r) => (
          <div key={r.domain} className="flex flex-col rounded-2xl border border-line bg-white p-5 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift">
            <p className="text-[13.5px] font-semibold text-ink">{r.domain}</p>
            <p className="mt-1 text-[12px] leading-snug text-slate-500">{r.desc}</p>
            <div className="mt-auto flex items-center justify-between pt-4">
              <span className="text-[11px] font-medium text-slate-400">{r.cadence} · last {r.last}</span>
              <span className="text-[11px] font-semibold text-accent">{r.formats}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-5">
        {/* builder */}
        <Panel title="Report builder" description="Approved data domains only" className="lg:col-span-2">
          <div className="space-y-4">
            <label className="block">
              <span className="mb-1.5 block text-[11.5px] font-semibold text-slate-500">Data domain</span>
              <select
                value={domain}
                onChange={(e) => {
                  setDomain(e.target.value);
                  setFields(new Set(BUILDER_FIELDS[e.target.value].slice(0, 3)));
                }}
                className="h-10 w-full rounded-xl border border-line bg-white px-3.5 text-[13px] font-semibold text-ink outline-none focus:border-accent/50"
              >
                {BUILDER_DOMAINS.map((d) => (
                  <option key={d.value} value={d.value}>{d.label}</option>
                ))}
              </select>
            </label>
            <div>
              <p className="mb-2 text-[11.5px] font-semibold text-slate-500">Fields & metrics</p>
              <div className="flex flex-wrap gap-2">
                {BUILDER_FIELDS[domain].map((f) => {
                  const on = fields.has(f);
                  return (
                    <button
                      key={f}
                      type="button"
                      onClick={() => {
                        const next = new Set(fields);
                        on ? next.delete(f) : next.add(f);
                        setFields(next);
                      }}
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11.5px] font-semibold transition-all",
                        on ? "border-accent bg-accent text-white" : "border-line bg-white text-slate-500",
                      )}
                    >
                      {on ? <Check className="h-3 w-3" strokeWidth={3} /> : null}
                      {f}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <label className="block">
                <span className="mb-1.5 block text-[11.5px] font-semibold text-slate-500">Date range</span>
                <select className="h-10 w-full rounded-xl border border-line bg-white px-3 text-[12.5px] font-semibold text-ink outline-none">
                  <option>Last 30 days</option>
                  <option>Quarter to date</option>
                  <option>Last 12 months</option>
                </select>
              </label>
              <label className="block">
                <span className="mb-1.5 block text-[11.5px] font-semibold text-slate-500">Format</span>
                <select className="h-10 w-full rounded-xl border border-line bg-white px-3 text-[12.5px] font-semibold text-ink outline-none">
                  <option>CSV</option>
                  <option>XLSX</option>
                  <option>PDF</option>
                </select>
              </label>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={run}
                className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-accent px-3 py-2.5 text-[12px] font-semibold text-white hover:bg-accent-deep"
              >
                <Download className="h-3.5 w-3.5" />
                Run now
              </button>
              <button
                type="button"
                onClick={() => show("Schedule saved — weekly Mondays 06:00 to authorized recipients")}
                className="flex-1 rounded-lg border border-line px-3 py-2.5 text-[12px] font-semibold text-slate-600 hover:border-accent/40 hover:text-accent"
              >
                Schedule weekly
              </button>
            </div>
          </div>
        </Panel>

        {/* preview + history */}
        <div className="space-y-5 lg:col-span-3">
          <Panel title="Preview" description={`${fields.size} fields · masked per policy`} bodyClassName="p-0">
            <div className="scroll-quiet overflow-x-auto">
              <table className="w-full min-w-[480px] text-left">
                <thead>
                  <tr className="border-b border-line">
                    {preview.head.map((h) => (
                      <th key={h} className="px-5 py-3 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-slate-400">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-line/70">
                  {preview.rows.map((row) => (
                    <tr key={row.join()}>
                      {row.map((cell) => (
                        <td key={cell} className="px-5 py-2.5 text-[12.5px] font-medium text-slate-600">{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Panel>

          <Panel title="Run history" description="Files expire after 14 days" bodyClassName="p-0">
            <div className="divide-y divide-line/70">
              {history.map((h) => (
                <div key={h.id} className="flex items-center gap-4 px-5 py-3.5">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[12.5px] font-semibold text-ink">{h.name}</p>
                    <p className="text-[11px] text-slate-400">{h.ran} · by {h.by} · {h.format}</p>
                  </div>
                  <StatusPill status={h.status} />
                  {h.status === "Ready" ? (
                    <button
                      type="button"
                      onClick={() => show(`Download started — ${h.name} (audited)`)}
                      className="text-[11.5px] font-semibold text-accent hover:underline"
                    >
                      Download
                    </button>
                  ) : null}
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </div>

      <Note title="Data governance">
        Sensitive fields are masked by role. Exports carry your identity, are
        watermarked, expire in 14 days, and appear in the audit log under
        <span className="font-semibold"> Reports · Data export</span>.
      </Note>
      {viewport}
    </div>
  );
}
