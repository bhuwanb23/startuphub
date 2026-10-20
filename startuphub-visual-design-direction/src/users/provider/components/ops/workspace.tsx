"use client";

import { Bell, Download, File, Lock, Send, ShieldCheck } from "lucide-react";
import { Avatar, Chip, Panel } from "@/components/app/widgets";
import { PageHead } from "@/components/app/boards";
import { useFilter } from "../../hooks/use-filter";
import {
  PROVIDER_AUDIT,
  PROVIDER_DOCS,
  PROVIDER_NOTIFICATIONS,
  PROVIDER_THREADS,
} from "../../constants/ops-data";

const AREA_FILTERS = ["All", "Certifications", "SOPs", "Compliance", "Agreements", "Templates"];

/* ── Documents ──────────────────────────────────────────────── */
export function ProviderDocuments() {
  const { filter, setFilter, filtered } = useFilter(PROVIDER_DOCS, (d, f) => d.area === f);
  return (
    <div className="space-y-5">
      <PageHead title="Documents" sub="Certifications, SOPs, compliance, agreements and templates" />
      <div className="flex flex-wrap items-center gap-2">
        {AREA_FILTERS.map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={`rounded-lg border px-3.5 py-2 text-[12.5px] font-semibold ${filter === f ? "border-accent bg-accent text-white" : "border-line bg-white text-slate-500 hover:text-ink"}`}>{f}</button>
        ))}
        <span className="ml-auto text-[11.5px] text-slate-400">{filtered.length} files</span>
      </div>
      <Panel pad={false}>
        <ul className="divide-y divide-line">
          {filtered.map((d) => (
            <li key={d.id} className="group flex items-center gap-4 px-5 py-3.5 transition-colors hover:bg-soft">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-soft text-accent"><File className="h-4 w-4" /></span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-semibold text-ink">{d.file}</p>
                <p className="font-mono text-[9.5px] tracking-[0.06em] text-slate-400 uppercase">{d.area} · {d.size} · {d.updated} · {d.ver}</p>
              </div>
              <Lock className="h-3.5 w-3.5 text-slate-200" />
              <button aria-label="Download" className="flex h-8 w-8 items-center justify-center rounded-lg border border-line text-slate-400 hover:border-accent/40 hover:text-accent">
                <Download className="h-3.5 w-3.5" />
              </button>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}

/* ── Messages ───────────────────────────────────────────────── */
const MSG_FILTERS = ["All", "Startups", "Incubators", "Government", "Internal"];
export function ProviderMessages() {
  const { filter, setFilter, filtered } = useFilter(PROVIDER_THREADS, (t, f) => t.group === f);
  return (
    <div className="space-y-5">
      <PageHead
        title="Messages"
        sub="Startups, incubators, government desks and internal staff"
        action={<button className="flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-accent-deep"><Send className="h-3.5 w-3.5" /> New message</button>}
      />
      <div className="flex flex-wrap gap-2">
        {MSG_FILTERS.map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={`rounded-lg border px-3.5 py-2 text-[12.5px] font-semibold ${filter === f ? "border-accent bg-accent text-white" : "border-line bg-white text-slate-500 hover:text-ink"}`}>{f}</button>
        ))}
      </div>
      <Panel pad={false}>
        <ul className="divide-y divide-line">
          {filtered.map((t) => (
            <li key={t.id} className="flex cursor-pointer items-start gap-4 px-5 py-4.5 transition-colors hover:bg-soft">
              <Avatar label={t.name.slice(0, 2)} className="h-10 w-10 shrink-0 rounded-full bg-ink text-[12px] text-white" />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3">
                  <p className="truncate text-[14px] font-semibold text-ink">{t.name}</p>
                  <span className="shrink-0 font-mono text-[10px] text-slate-400">{t.time}</span>
                </div>
                <p className="font-mono text-[9px] tracking-[0.08em] text-accent uppercase">{t.group}</p>
                <p className="mt-1 truncate text-[12.5px] text-slate-500">{t.last}</p>
              </div>
              {t.unread > 0 && (
                <span className="flex h-5.5 w-5.5 shrink-0 items-center justify-center rounded-full bg-accent font-mono text-[9.5px] font-bold text-white">{t.unread}</span>
              )}
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}

/* ── Notifications ──────────────────────────────────────────── */
const NOTIF_GROUPS = ["All", "Requests", "Matches", "Payments", "Availability", "Usage", "Reviews", "System"];
export function ProviderNotifications() {
  const { filter, setFilter, filtered } = useFilter(PROVIDER_NOTIFICATIONS, (n, f) => n.group === f);
  const unread = PROVIDER_NOTIFICATIONS.filter((n) => n.unread).length;
  return (
    <div className="space-y-5">
      <PageHead
        title="Notifications"
        sub={`${unread} unread · requests, matches, payments and operational alerts`}
        action={<button className="rounded-lg border border-line bg-white px-4 py-2.5 text-[13px] font-semibold text-ink hover:bg-soft">Mark all read</button>}
      />
      <div className="flex flex-wrap gap-2">
        {NOTIF_GROUPS.map((g) => (
          <button key={g} onClick={() => setFilter(g)} className={`rounded-lg border px-3.5 py-2 text-[12.5px] font-semibold ${filter === g ? "border-accent bg-accent text-white" : "border-line bg-white text-slate-500 hover:text-ink"}`}>{g}</button>
        ))}
      </div>
      <Panel pad={false}>
        <ul className="divide-y divide-line">
          {filtered.map((n) => (
            <li key={n.id} className={`flex items-start gap-4 px-5 py-4 transition-colors hover:bg-soft ${n.unread ? "bg-accent-mist/40" : ""}`}>
              <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${n.unread ? "bg-accent" : "bg-slate-200"}`} />
              <div className="min-w-0 flex-1">
                <p className={`text-[13px] leading-snug ${n.unread ? "font-semibold text-ink" : "text-slate-600"}`}>{n.text}</p>
                <p className="mt-1 font-mono text-[9px] tracking-[0.1em] text-slate-400 uppercase">{n.group} · {n.time} ago</p>
              </div>
              <Bell className={`h-3.5 w-3.5 shrink-0 ${n.unread ? "text-accent" : "text-slate-200"}`} />
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}

/* ── Activity (audit trail) ─────────────────────────────────── */
export function ProviderActivity() {
  return (
    <div className="space-y-5">
      <PageHead
        title="Activity"
        sub="Complete audit trail — requests, bookings, allocations, usage and payments"
        action={<Chip tone="accent" className="px-3 py-1.5"><ShieldCheck className="h-3 w-3" /> Immutable log</Chip>}
      />
      <Panel pad={false}>
        <ul className="divide-y divide-line">
          {PROVIDER_AUDIT.map((a, i) => (
            <li key={i} className="flex flex-wrap items-center gap-4 px-5 py-4">
              <Avatar label={a.actor.split(" ").map((x) => x[0]).join("").slice(0, 2)} className="h-8.5 w-8.5 text-[10px]" />
              <div className="min-w-0 flex-1 text-[13px]">
                <span className="font-semibold text-ink">{a.actor}</span>
                <span className="text-slate-500"> {a.action} </span>
                <span className="font-semibold text-accent">{a.object}</span>
              </div>
              <span className="font-mono text-[10.5px] text-slate-400">{a.time}</span>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}
