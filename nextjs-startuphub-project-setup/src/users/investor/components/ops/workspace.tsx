"use client";

import {
  Bell,
  File,
  FolderOpen,
  Lock,
  Mail,
  Search,
  Send,
  ShieldCheck,
  Upload,
} from "lucide-react";
import { Avatar, Chip, Panel } from "@/components/app/widgets";
import { PageHead } from "../shared/boards";
import { useFilter } from "../../hooks/use-filter";
import {
  AUDIT_TRAIL,
  CALENDAR_DAYS,
  DOC_LIBRARY,
  NOTIFICATIONS,
  THREADS,
} from "../../constants/ops-data";
import { SCHEDULE } from "../../constants/investor-data";

const AREA_FILTERS = ["All", "Deals", "Due Diligence", "Portfolio", "Fund", "Templates"];
const KIND_TONE: Record<string, "accent" | "rise" | "amber" | "ink" | "slate"> = {
  Memo: "slate", Model: "rise", Report: "accent", Policy: "ink", Board: "accent",
  Legal: "amber", Data: "ink",
};
const DAY_DOT: Record<string, string> = {
  pitch: "bg-accent", ic: "bg-amber-dim", dd: "bg-rise", portfolio: "bg-slate-400", report: "bg-ink",
};

/* ── Documents ──────────────────────────────────────────────── */
export function DocumentsPage() {
  const { filter, setFilter, filtered } = useFilter(DOC_LIBRARY, (d, f) => d.area === f);
  return (
    <div className="space-y-5">
      <PageHead
        title="Documents"
        sub="Every file across deals, DD, portfolio and fund ops"
        action={
          <button className="flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-accent-deep">
            <Upload className="h-3.5 w-3.5" /> Upload
          </button>
        }
      />
      <div className="flex flex-wrap items-center gap-2">
        {AREA_FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-lg border px-3.5 py-2 text-[12.5px] font-semibold transition-colors ${filter === f ? "border-accent bg-accent text-white" : "border-line bg-white text-slate-500 hover:text-ink"}`}
          >
            {f}
          </button>
        ))}
        <span className="ml-auto text-[11.5px] text-slate-400">{filtered.length} files</span>
      </div>
      <Panel pad={false}>
        <ul className="divide-y divide-line">
          {filtered.map((d) => (
            <li key={d.id} className="group flex items-center gap-4 px-5 py-3.5 transition-colors hover:bg-soft">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-soft text-accent">
                <File className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-semibold text-ink">{d.file}</p>
                <p className="font-mono text-[9.5px] tracking-[0.06em] text-slate-400 uppercase">
                  {d.area} · {d.size} · {d.updated} · {d.ver}
                </p>
              </div>
              <Chip tone={KIND_TONE[d.kind] ?? "slate"}>{d.kind}</Chip>
            </li>
          ))}
        </ul>
      </Panel>
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          { l: "Version history", d: "Full lineage on every file — restore any version" },
          { l: "Access management", d: "Folder-scoped grants, all views audit-logged" },
          { l: "Secure shares", d: "Expiring links with watermarking for externals" },
        ].map((x) => (
          <div key={x.l} className="flex gap-3 rounded-xl border border-line bg-white p-4 text-[12px] leading-relaxed text-slate-500">
            <Lock className="h-4 w-4 shrink-0 text-accent" />
            <span><b className="text-ink">{x.l}.</b> {x.d}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Calendar ───────────────────────────────────────────────── */
export function CalendarPage() {
  return (
    <div className="space-y-5">
      <PageHead title="Calendar" sub="April 2026 · pitches, IC, DD deadlines, closings and reviews" />
      <div className="grid gap-4 lg:grid-cols-[1fr_340px]">
        <Panel pad>
          <div className="mb-3 grid grid-cols-7 gap-1.5">
            {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
              <p key={i} className="text-center font-mono text-[9px] tracking-[0.1em] text-slate-400">{d}</p>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1.5">
            {Array.from({ length: 2 }, (_, i) => <span key={`e${i}`} />)}
            {CALENDAR_DAYS.map((d) => (
              <div
                key={d.day}
                className={`flex aspect-square flex-col items-center justify-center rounded-lg border text-[12px] transition-colors ${d.day === 2 ? "border-accent bg-accent text-white" : d.events.length ? "border-line bg-white hover:bg-accent-mist" : "border-transparent text-slate-400"}`}
              >
                <span className={d.day === 2 ? "font-bold" : d.events.length ? "font-semibold text-ink" : ""}>{d.day}</span>
                <span className="mt-0.5 flex gap-0.5">
                  {d.events.map((e, i) => (
                    <span key={i} className={`h-1 w-1 rounded-full ${d.day === 2 ? "bg-white" : DAY_DOT[e]}`} />
                  ))}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-3 border-t border-line pt-3.5">
            {Object.entries(DAY_DOT).map(([k, c]) => (
              <span key={k} className="flex items-center gap-1.5 text-[10.5px] text-slate-500">
                <span className={`h-1.5 w-1.5 rounded-full ${c}`} /> {k}
              </span>
            ))}
          </div>
        </Panel>

        <Panel title="Coming up" pad={false}>
          <ul className="divide-y divide-line">
            {SCHEDULE.slice(0, 5).map((m) => (
              <li key={m.id} className="flex gap-3 px-5 py-3.5">
                <span className="w-11 shrink-0 font-mono text-[11px] font-bold text-accent">{m.time}</span>
                <div className="min-w-0">
                  <p className="truncate text-[12.5px] font-semibold text-ink">{m.title}</p>
                  <p className="truncate text-[10.5px] text-slate-400">{m.day} · {m.kind}</p>
                </div>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </div>
  );
}

/* ── Messages ───────────────────────────────────────────────── */
const MSG_FILTERS = ["All", "Founders", "Startups", "Co-investors", "Deal team", "Legal"];
export function MessagesPage() {
  const { filter, setFilter, filtered } = useFilter(
    THREADS,
    (t, f) => (f === "Founders" || f === "Startups") ? t.company !== "Blume Syndicate" : f !== "Founders" && f !== "Startups",
  );
  return (
    <div className="space-y-5">
      <PageHead
        title="Messages"
        sub="Founders, co-investors, deal and legal teams — threaded by deal"
        action={
          <button className="flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-accent-deep">
            <Send className="h-3.5 w-3.5" /> New message
          </button>
        }
      />
      <div className="flex flex-wrap gap-2">
        {MSG_FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-lg border px-3.5 py-2 text-[12.5px] font-semibold ${filter === f ? "border-accent bg-accent text-white" : "border-line bg-white text-slate-500 hover:text-ink"}`}
          >
            {f}
          </button>
        ))}
      </div>
      <Panel pad={false}>
        <ul className="divide-y divide-line">
          {filtered.map((t) => (
            <li key={t.id} className="flex cursor-pointer items-start gap-4 px-5 py-4.5 transition-colors hover:bg-soft">
              <Avatar label={t.name.split(" ").map((x) => x[0]).join("").slice(0, 2)} className="h-10 w-10 shrink-0 rounded-full bg-ink text-[12px] text-white" />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3">
                  <p className="truncate text-[14px] font-semibold text-ink">{t.name}</p>
                  <span className="shrink-0 font-mono text-[10px] text-slate-400">{t.time}</span>
                </div>
                <p className="font-mono text-[9px] tracking-[0.08em] text-accent uppercase">{t.company}</p>
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
const NOTIF_GROUPS = ["All", "Deals", "Matches", "DD", "Portfolio", "Watchlist", "System"];
export function NotificationsPage() {
  const { filter, setFilter, filtered } = useFilter(NOTIFICATIONS, (n, f) => n.group === f);
  const unread = NOTIFICATIONS.filter((n) => n.unread).length;
  return (
    <div className="space-y-5">
      <PageHead
        title="Notifications"
        sub={`${unread} unread · deals, matches, DD, portfolio and system`}
        action={<button className="rounded-lg border border-line bg-white px-4 py-2.5 text-[13px] font-semibold text-ink hover:bg-soft">Mark all read</button>}
      />
      <div className="flex flex-wrap gap-2">
        {NOTIF_GROUPS.map((g) => (
          <button
            key={g}
            onClick={() => setFilter(g)}
            className={`rounded-lg border px-3.5 py-2 text-[12.5px] font-semibold ${filter === g ? "border-accent bg-accent text-white" : "border-line bg-white text-slate-500 hover:text-ink"}`}
          >
            {g}
            {g !== "All" && (
              <span className="ml-1.5 font-mono text-[10px] opacity-70">
                {NOTIFICATIONS.filter((n) => n.group === g).length}
              </span>
            )}
          </button>
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
export function ActivityPage() {
  return (
    <div className="space-y-5">
      <PageHead
        title="Activity"
        sub="Full audit trail across deals, documents, communication and investments"
        action={<Chip tone="accent" className="px-3 py-1.5"><ShieldCheck className="h-3 w-3" /> Immutable log</Chip>}
      />
      <Panel pad={false}>
        <ul className="divide-y divide-line">
          {AUDIT_TRAIL.map((a, i) => (
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
