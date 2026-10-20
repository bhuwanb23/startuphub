import {
  AlertTriangle,
  ArrowUpRight,
  CheckCircle2,
  File,
  FileSearch,
  FileText,
  FolderOpen,
  Scale,
  Upload,
  Users,
} from "lucide-react";
import { Avatar, Bar, Chip, Panel, ScoreRing, StatCard } from "@/components/app/widgets";
import { Checklist, PageHead, Severity, SubjectBanner, STATUS } from "../shared/boards";
import { DEAL_ROOM, DATA_REQUESTS } from "../../constants/investor-data";
import { DD_CHECKLIST, DD_OPEN_ISSUES, DD_RECOMMENDATION, DD_SUBJECT } from "../../constants/deal-dd-data";

/* ── DD Dashboard ───────────────────────────────────────────── */
export function DdDashboard() {
  const totalDone = DD_CHECKLIST.reduce((a, c) => a + c.done, 0);
  const totalAll = DD_CHECKLIST.reduce((a, c) => a + c.total, 0);
  const pct = Math.round((totalDone / totalAll) * 100);

  return (
    <div className="space-y-5">
      <SubjectBanner
        kicker="Active due diligence · Seed"
        title={DD_SUBJECT.name}
        meta={`${DD_SUBJECT.sector} · asking ${DD_SUBJECT.ask} · started ${DD_SUBJECT.started} · target ${DD_SUBJECT.target}`}
        score={DD_RECOMMENDATION.score}
        action={<Chip tone="accent" className="px-3 py-1.5">{DD_RECOMMENDATION.verdict}</Chip>}
      />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="Completion" value={`${pct}%`} delta={`${totalDone}/${totalAll} items`} icon={FolderOpen} />
        <StatCard label="Open issues" value="5" delta="1 critical" icon={AlertTriangle} deltaGood={false} />
        <StatCard label="Pending documents" value="4" delta="2 overdue" icon={FileText} deltaGood={false} />
        <StatCard label="DD score" value="79" delta="conditional pass" icon={FileSearch} />
      </div>

      <div className="grid gap-4 lg:grid-cols-5">
        <Panel title="Checklist progress" sub="12 workstreams" className="lg:col-span-2">
          <Checklist items={DD_CHECKLIST} doneKey="done" totalKey="total" />
          <a href="/investor/dd/checklist" className="mt-5 inline-flex items-center gap-1 text-[12.5px] font-semibold text-accent">
            Open full checklist <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </Panel>

        <Panel title="Critical & high findings" sub="Gate IC if unresolved" pad={false} className="lg:col-span-3">
          <ul className="divide-y divide-line">
            {DD_OPEN_ISSUES.map((i) => (
              <li key={i.id} className="flex items-start gap-3.5 px-5 py-4">
                <Severity s={i.severity} />
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-semibold leading-snug text-ink">{i.title}</p>
                  <p className="mt-0.5 font-mono text-[9.5px] tracking-[0.08em] text-slate-400 uppercase">
                    {i.owner} · {i.status}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <Panel title="DD recommendation" sub="Draft · for IC memo">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-rise-tint">
            <CheckCircle2 className="h-5 w-5 text-rise" />
          </span>
          <div>
            <p className="text-[15px] font-semibold text-ink">{DD_RECOMMENDATION.verdict}</p>
            <p className="mt-1.5 max-w-3xl text-[13px] leading-relaxed text-slate-600">
              {DD_RECOMMENDATION.text}
            </p>
          </div>
        </div>
      </Panel>
    </div>
  );
}

/* ── DD Checklist ───────────────────────────────────────────── */
export function DdChecklist() {
  return (
    <div className="space-y-5">
      <PageHead
        title="Due diligence checklist"
        sub="ReJoule Energy · 12 workstreams · owners assigned"
        action={<Chip tone="accent" className="px-3 py-1.5">Template · Seed Climate v2</Chip>}
      />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {DD_CHECKLIST.map((c) => {
          const pct = Math.round((c.done / c.total) * 100);
          return (
            <Panel key={c.area}>
              <div className="flex items-center justify-between">
                <h3 className="text-[14.5px] font-semibold text-ink">{c.area}</h3>
                <Chip tone={pct === 100 ? "rise" : pct >= 60 ? "accent" : "amber"}>
                  {pct === 100 ? "Complete" : `${c.done}/${c.total}`}
                </Chip>
              </div>
              <Bar pct={pct} className="mt-4" barClass={pct === 100 ? "bg-rise" : "bg-accent"} />
              <div className="mt-3.5 flex items-center justify-between text-[11px] text-slate-400">
                <span>Owner: <span className="font-medium text-ink">{c.owner}</span></span>
                <span className="font-mono">{pct}%</span>
              </div>
            </Panel>
          );
        })}
      </div>
    </div>
  );
}

/* ── Data Room ──────────────────────────────────────────────── */
const ROOM_TONE = { Deck: "accent", Model: "rise", Legal: "amber", Data: "ink", Memo: "slate" } as const;
const ROOM_ICON = { Deck: FileText, Model: File, Legal: Scale, Data: File, Memo: FileText } as const;

export function DataRoom() {
  return (
    <div className="space-y-5">
      <PageHead
        title="Data room"
        sub="ReJoule Energy · access-logged, versioned documents"
        action={
          <button className="flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-accent-deep">
            <Upload className="h-3.5 w-3.5" /> Request upload
          </button>
        }
      />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { l: "Documents", v: "86" },
          { l: "Folders", v: "12 workstreams" },
          { l: "External access", v: "2 counsel" },
          { l: "Activity today", v: "9 events" },
        ].map((x) => (
          <div key={x.l} className="rounded-xl border border-line bg-white p-4">
            <p className="text-[16px] font-semibold text-ink">{x.v}</p>
            <p className="mt-0.5 text-[11px] text-slate-400">{x.l}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Panel title="Recent documents" pad={false} className="lg:col-span-2">
          <ul className="divide-y divide-line">
            {DEAL_ROOM.map((f) => {
              const Icon = ROOM_ICON[f.kind];
              return (
                <li key={f.id} className="group flex items-center gap-4 px-5 py-3.5 transition-colors hover:bg-soft">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-soft text-accent"><Icon className="h-4 w-4" /></span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13px] font-semibold text-ink">{f.file}</p>
                    <p className="font-mono text-[9.5px] tracking-[0.06em] text-slate-400 uppercase">{f.deal} · {f.size} · {f.updated}</p>
                  </div>
                  <Chip tone={ROOM_TONE[f.kind]}>{f.kind}</Chip>
                </li>
              );
            })}
          </ul>
        </Panel>

        <div className="space-y-4">
          <Panel title="Access" sub="Who can see this room" action={<Users className="h-4 w-4 text-slate-300" />}>
            <ul className="space-y-3">
              {[
                { n: "Meridian team — AM, SK, RJ", s: "Full" },
                { n: "External legal counsel", s: "Legal folder" },
                { n: "Tech reviewer (ext.)", s: "Tech + product" },
                { n: "Founders — view log only", s: "Request-scoped" },
              ].map((a) => (
                <li key={a.n} className="flex items-center justify-between gap-2 text-[12.5px]">
                  <span className="text-slate-600">{a.n}</span>
                  <Chip tone="line">{a.s}</Chip>
                </li>
              ))}
            </ul>
          </Panel>
          <Panel title="Activity log" sub="Last 4 events">
            <ul className="space-y-3 text-[12px]">
              {[
                "SK viewed Technical_DD_pack.zip · 14:32",
                "Ext. counsel downloaded SHA draft · 12:05",
                "Founder uploaded Q4 cohort data · 11:41",
                "AM flagged finding F-02 · 09:18",
              ].map((l) => (
                <li key={l} className="flex gap-2.5 text-slate-600">
                  <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent/60" />{l}
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </div>
    </div>
  );
}

/* ── Document Requests ──────────────────────────────────────── */
export function DocRequests() {
  return (
    <div className="space-y-5">
      <PageHead
        title="Document requests"
        sub="Outstanding diligence asks — founders upload straight to the room"
        action={<button className="rounded-lg bg-accent px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-accent-deep">+ New request</button>}
      />

      <div className="no-scrollbar flex gap-2 overflow-x-auto">
        {["All", "Pending", "Submitted", "Overdue", "Approved", "Rejected"].map((s, i) => (
          <button key={s} className={`shrink-0 rounded-lg border px-3.5 py-2 text-[12.5px] font-semibold ${i === 0 ? "border-accent bg-accent text-white" : "border-line bg-white text-slate-500 hover:text-ink"}`}>{s}</button>
        ))}
      </div>

      <Panel pad={false}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px] text-left">
            <thead>
              <tr className="border-b border-line">
                {["Requested item", "Company", "Owner", "Due", "Status"].map((h) => (
                  <th key={h} className="px-5 py-3.5 font-mono text-[9.5px] font-medium tracking-[0.16em] text-slate-400 uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {DATA_REQUESTS.map((r) => (
                <tr key={r.id} className="transition-colors hover:bg-soft">
                  <td className="px-5 py-4 text-[13px] font-medium text-ink">{r.item}</td>
                  <td className="px-5 py-4 text-[12.5px] text-slate-500">{r.company}</td>
                  <td className="px-5 py-4">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-ink/[0.06] font-mono text-[10px] font-bold text-ink">{r.owner}</span>
                  </td>
                  <td className="px-5 py-4 font-mono text-[11px] text-slate-500">{r.due}</td>
                  <td className="px-5 py-4">
                    <Chip tone={r.status === "Overdue" ? "amber" : r.status === "Received" ? "rise" : "slate"}>{r.status}</Chip>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>

      <div className="rounded-xl border border-accent/20 bg-accent-mist px-5 py-4 text-[13px] leading-relaxed text-ink">
        <span className="font-semibold text-accent">Copilot tip:</span> SettleX's corridor
        licence documents are 8 days overdue — that gates their term sheet. A nudge
        template is ready to send.
      </div>
    </div>
  );
}
