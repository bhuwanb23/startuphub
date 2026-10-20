"use client";

import { Panel, Stat, Tag } from "@/components/app/widgets";
import {
  APPLICATIONS,
  CONTENT_ROWS,
  EVENTS,
  MARKET_REPORTS,
  MARKET_SOURCES,
  PROGRAMS,
  REGISTRATIONS,
  type ApplicationRow,
  type ContentRow,
  type EventRow,
  type MarketReportRow,
  type ProgramRow,
} from "../../constants/programs";
import { FlowBar, Note, PageHead, StatusPill } from "../shared/bits";
import { Meter } from "@/components/app/widgets";
import { Directory, type DirCol } from "../shared/directory";

/* ================================= CONTENT ================================= */

export function ContentAdmin() {
  const columns: DirCol<ContentRow>[] = [
    {
      id: "title", label: "Content", sortValue: (r) => r.title, raw: (r) => r.title,
      cell: (r) => (
        <div className="max-w-[320px]">
          <p className="truncate text-[13px] font-semibold text-ink">{r.title}</p>
          <p className="text-[11.5px] text-slate-400">{r.type} · {r.category}</p>
        </div>
      ),
    },
    { id: "author", label: "Author", raw: (r) => r.author, cell: (r) => <span className="text-[12.5px] text-slate-600">{r.author}</span> },
    { id: "status", label: "Status", raw: (r) => r.status, cell: (r) => <StatusPill status={r.status} /> },
    { id: "updated", label: "Updated", raw: (r) => r.updated, cell: (r) => <span className="text-[12px] text-slate-500">{r.updated}</span> },
    { id: "views", label: "Views", align: "right", sortValue: (r) => r.views, raw: (r) => r.views, cell: (r) => <span className="text-[12.5px] font-semibold text-ink">{r.views}</span> },
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-5">
      <PageHead
        eyebrow="Content & Programs"
        title="Content Management"
        description="Everything published across StartupHub — drafts to archival, with editorial workflow, versions and performance."
      />
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Stat label="Live content" value="1,842" delta="+36 this month" tone="up" />
        <Stat label="In editorial review" value="14" hint="SLA 48h" />
        <Stat label="Scheduled" value="6" hint="next Apr 16 · 09:00" />
        <Stat label="Reported items" value="2" delta="1 IP complaint" tone="down" />
      </div>
      <Directory<ContentRow>
        rows={CONTENT_ROWS}
        columns={columns}
        searchPlaceholder="Search title, author, category…"
        searchText={(r) => `${r.title} ${r.author} ${r.type} ${r.category}`}
        chips={{
          id: "status", label: "Status",
          options: ["Published", "Draft", "In review", "Scheduled", "Archived"].map((v) => ({ value: v, label: v })),
          match: (r, v) => r.status === v,
        }}
        selects={[
          { id: "type", label: "Type", options: ["Article", "Guide", "Announcement", "Case study", "Success story", "Help article", "Downloadable", "FAQ"].map((v) => ({ value: v, label: v })), match: (r, v) => r.type === v },
        ]}
        status={{ get: (r) => r.status }}
        rowName={(r) => r.title}
        exportName="startuphub-content.csv"
        bulkActions={[
          { label: "Publish selected", nextStatus: "Published", eligible: (r) => (r.status === "Published" ? "Already published" : r.status === "Archived" ? "Archived — restore first" : null) },
          { label: "Archive selected", tone: "danger", nextStatus: "Archived", eligible: (r) => (r.status === "Archived" ? "Already archived" : null) },
        ]}
        detail={(r, ctx) => ({
          title: r.title,
          subtitle: `${r.type} · ${r.category} · by ${r.author}`,
          status: ctx.status,
          fields: [
            { label: "Type", value: r.type },
            { label: "Category", value: r.category },
            { label: "Updated", value: r.updated },
            { label: "Views", value: r.views },
          ],
          sections: [
            {
              title: "Editorial checks",
              body: (
                <div className="flex flex-wrap gap-1.5">
                  {["Duplicate scan: clean", "Links: 14/14 ok", "Accessibility: AA", "SEO metadata: complete"].map((c) => (
                    <span key={c} className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-700">{c}</span>
                  ))}
                </div>
              ),
            },
          ],
          timeline: r.timeline,
          actions: [
            ...(r.status === "In review" ? [
              { label: "Approve & publish", tone: "primary" as const, nextStatus: "Published" },
              { label: "Return for revision", tone: "neutral" as const, nextStatus: "Draft", requireReason: true },
            ] : []),
            ...(r.status === "Draft" ? [{ label: "Submit for review", tone: "primary" as const, nextStatus: "In review" }] : []),
            ...(r.status === "Scheduled" ? [{ label: "Publish now", tone: "primary" as const, nextStatus: "Published" }] : []),
            ...(r.status === "Published" ? [{ label: "Unpublish", tone: "neutral" as const, nextStatus: "Draft", requireReason: true }] : []),
            ...(r.status !== "Archived" ? [{ label: "Archive", tone: "danger" as const, nextStatus: "Archived" }] : [{ label: "Restore", tone: "primary" as const, nextStatus: "Draft" }]),
          ],
        })}
      />
    </div>
  );
}

/* ============================= MARKET CONTENT ============================== */

export function MarketContentAdmin() {
  const columns: DirCol<MarketReportRow>[] = [
    {
      id: "title", label: "Insight", sortValue: (r) => r.title, raw: (r) => r.title,
      cell: (r) => (
        <div className="max-w-[300px]">
          <p className="truncate text-[13px] font-semibold text-ink">{r.title}</p>
          <p className="text-[11.5px] text-slate-400">{r.domain} · {r.coverage}</p>
        </div>
      ),
    },
    { id: "source", label: "Source", raw: (r) => r.source, cell: (r) => <span className="text-[12px] text-slate-600">{r.source}</span> },
    { id: "confidence", label: "Confidence", raw: (r) => r.confidence, cell: (r) => <StatusPill status={r.confidence} /> },
    { id: "freshness", label: "Freshness", raw: (r) => r.freshness, cell: (r) => <StatusPill status={r.freshness} /> },
    { id: "updated", label: "Updated", raw: (r) => r.updated, cell: (r) => <span className="text-[12px] text-slate-500">{r.updated}</span> },
    { id: "status", label: "Status", raw: (r) => r.status, cell: (r) => <StatusPill status={r.status} /> },
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-5">
      <PageHead
        eyebrow="Content & Programs"
        title="Market Content Management"
        description="Sector reports, trends and opportunity insights — with source attribution, confidence indicators and freshness tracking."
      />
      <Note title="Attribution over assertion">
        Published does not mean verified-fact. Every insight keeps its source,
        collection date, coverage and confidence visible. Conflicting numbers are
        flagged, never silently merged.
      </Note>
      <Directory<MarketReportRow>
        rows={MARKET_REPORTS}
        columns={columns}
        searchPlaceholder="Search reports, domains, sources…"
        searchText={(r) => `${r.title} ${r.domain} ${r.source}`}
        chips={{
          id: "status", label: "Status",
          options: ["Published", "In review", "Flagged"].map((v) => ({ value: v, label: v })),
          match: (r, v) => r.status === v,
        }}
        status={{ get: (r) => r.status }}
        rowName={(r) => r.title}
        exportName="startuphub-market-content.csv"
        detail={(r, ctx) => ({
          title: r.title,
          subtitle: `${r.domain} · ${r.coverage}`,
          status: ctx.status,
          fields: [
            { label: "Source", value: r.source },
            { label: "Confidence", value: r.confidence },
            { label: "Freshness", value: r.freshness },
            { label: "Last updated", value: r.updated },
          ],
          timeline: r.timeline,
          actions: [
            ...(r.status === "In review" ? [{ label: "Publish insight", tone: "primary" as const, nextStatus: "Published" }] : []),
            ...(r.status === "Flagged" ? [{ label: "Resolve flag & publish", tone: "primary" as const, nextStatus: "Published", requireReason: true }] : []),
            ...(r.status === "Published" ? [{ label: "Unpublish", tone: "neutral" as const, nextStatus: "In review", requireReason: true }] : []),
          ],
        })}
      />

      <Panel title="Data source registry" description="Where market content comes from — cadence and reliability" bodyClassName="p-0">
        <div className="divide-y divide-line/70">
          {MARKET_SOURCES.map((s) => (
            <div key={s.name} className="flex items-center justify-between gap-4 px-5 py-3">
              <p className="text-[12.5px] font-semibold text-ink">{s.name}</p>
              <div className="flex items-center gap-3">
                <span className="text-[11.5px] text-slate-400">{s.cadence}</span>
                <Tag tone={s.reliability === "Primary" ? "accent" : "slate"}>{s.reliability}</Tag>
              </div>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

/* ================================= PROGRAMS ================================ */

export function ProgramsAdmin() {
  const programCols: DirCol<ProgramRow>[] = [
    {
      id: "name", label: "Program", sortValue: (r) => r.name, raw: (r) => r.name,
      cell: (r) => (
        <div className="max-w-[280px]">
          <p className="truncate text-[13px] font-semibold text-ink">{r.name}</p>
          <p className="text-[11.5px] text-slate-400">{r.type} · {r.sponsor}</p>
        </div>
      ),
    },
    {
      id: "applications", label: "Applications", align: "center", sortValue: (r) => r.applications, raw: (r) => r.applications,
      cell: (r) => <span className="text-[12.5px] font-semibold text-ink">{r.applications.toLocaleString()}</span>,
    },
    {
      id: "fill", label: "Fill", raw: (r) => `${r.seats} seats`,
      cell: (r) => (
        <div className="w-28">
          <Meter value={r.seats ? Math.min(1, r.applications / (r.seats * 10)) : 0} />
          <p className="mt-1 text-[10.5px] text-slate-400">{r.seats} seats</p>
        </div>
      ),
    },
    { id: "stage", label: "Stage", raw: (r) => r.stage, cell: (r) => <span className="text-[12px] font-medium text-slate-600">{r.stage}</span> },
    { id: "window", label: "Window", raw: (r) => r.window, cell: (r) => <span className="text-[12px] text-slate-500">{r.window}</span> },
    { id: "status", label: "Status", raw: (r) => r.status, cell: (r) => <StatusPill status={r.status} /> },
  ];

  const appCols: DirCol<ApplicationRow>[] = [
    {
      id: "startup", label: "Applicant", sortValue: (r) => r.startup, raw: (r) => r.startup,
      cell: (r) => (
        <div>
          <p className="text-[13px] font-semibold text-ink">{r.startup}</p>
          <p className="text-[11.5px] text-slate-400">{r.stage} · {r.sector}</p>
        </div>
      ),
    },
    { id: "reviewer", label: "Reviewer", raw: (r) => r.reviewer, cell: (r) => <span className="text-[12px] text-slate-600">{r.reviewer}</span> },
    {
      id: "score", label: "Score", align: "center", sortValue: (r) => r.score, raw: (r) => r.score,
      cell: (r) => (
        <span className={`rounded-lg px-2 py-1 text-[12px] font-bold ${r.score >= 80 ? "bg-emerald-50 text-emerald-700" : r.score >= 60 ? "bg-amber-50 text-amber-700" : "bg-slate-100 text-slate-500"}`}>
          {r.score}
        </span>
      ),
    },
    { id: "status", label: "Status", raw: (r) => r.status, cell: (r) => <StatusPill status={r.status} /> },
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-5">
      <PageHead
        eyebrow="Content & Programs"
        title="Program Management"
        description="Cohorts, accelerators, challenges and grants — configure → publish → select → deliver → measure → report."
      />
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Stat label="Active programs" value="6" hint="2 publishing this month" />
        <Stat label="Open applications" value="4,942" delta="+312 today" tone="up" />
        <Stat label="In delivery" value="3" hint="avg completion 86%" />
        <Stat label="Reported impact YTD" value="₹96 Cr" delta="funding unlocked" tone="up" />
      </div>
      <FlowBar current={2} />

      <Directory<ProgramRow>
        rows={PROGRAMS.map((p) => ({ ...p, name: p.name.trim() }))}
        columns={programCols}
        searchPlaceholder="Search programs…"
        searchText={(r) => `${r.name} ${r.sponsor} ${r.type}`}
        chips={{
          id: "status", label: "Status",
          options: ["Active", "Published", "Draft", "Paused", "Completed"].map((v) => ({ value: v, label: v })),
          match: (r, v) => r.status === v,
        }}
        status={{ get: (r) => r.status }}
        rowName={(r) => r.name}
        exportName="startuphub-programs.csv"
        detail={(r, ctx) => ({
          title: r.name,
          subtitle: `${r.type} · sponsored by ${r.sponsor}`,
          status: ctx.status,
          fields: [
            { label: "Stage", value: r.stage },
            { label: "Applications", value: r.applications.toLocaleString() },
            { label: "Seats", value: String(r.seats) },
            { label: "Window", value: r.window },
          ],
          timeline: r.timeline,
          actions: [
            ...(r.status === "Draft" ? [{ label: "Publish program", tone: "primary" as const, nextStatus: "Published" }] : []),
            ...(r.status === "Published" ? [{ label: "Open applications", tone: "primary" as const, nextStatus: "Active" }, { label: "Pause", tone: "neutral" as const, nextStatus: "Paused", requireReason: true }] : []),
            ...(r.status === "Active" ? [{ label: "Close & report", tone: "neutral" as const, nextStatus: "Completed" }, { label: "Pause", tone: "neutral" as const, nextStatus: "Paused", requireReason: true }] : []),
            ...(r.status === "Paused" ? [{ label: "Resume", tone: "primary" as const, nextStatus: "Active" }] : []),
          ],
        })}
      />

      <div>
        <h3 className="mb-3 text-[15px] font-semibold tracking-tight text-ink">
          Application queue — Frontier Cohort VII
        </h3>
        <Directory<ApplicationRow>
          rows={APPLICATIONS}
          columns={appCols}
          pageSize={8}
          searchPlaceholder="Search applicants…"
          searchText={(r) => `${r.startup} ${r.sector} ${r.reviewer}`}
          status={{ get: (r) => r.status }}
          rowName={(r) => r.startup}
          exportName="frontier-vii-applications.csv"
          bulkActions={[
            { label: "Shortlist selected", nextStatus: "Shortlisted", eligible: (r) => (["Shortlisted", "Rejected"].includes(r.status) ? `Already ${r.status.toLowerCase()}` : r.score < 60 ? "Below rubric threshold (60) — needs director override" : null) },
          ]}
          detail={(r, ctx) => ({
            title: r.startup,
            subtitle: `${r.stage} · ${r.sector}`,
            status: ctx.status,
            fields: [
              { label: "Rubric score", value: `${r.score}/100` },
              { label: "Reviewer", value: r.reviewer },
              { label: "Eligibility", value: "Passed auto-screen" },
              { label: "Documents", value: "Pitch deck + metrics" },
            ],
            actions: [
              ...(!["Shortlisted"].includes(r.status) ? [{ label: "Shortlist", tone: "primary" as const, nextStatus: "Shortlisted" }] : []),
              ...(!["Waitlisted"].includes(r.status) ? [{ label: "Waitlist", tone: "neutral" as const, nextStatus: "Waitlisted" }] : []),
              ...(!["Rejected"].includes(r.status) ? [{ label: "Reject", tone: "danger" as const, nextStatus: "Rejected", requireReason: true }] : []),
            ],
          })}
        />
      </div>
    </div>
  );
}

/* ================================== EVENTS ================================= */

export function EventsAdmin() {
  const columns: DirCol<EventRow>[] = [
    {
      id: "title", label: "Event", sortValue: (r) => r.title, raw: (r) => r.title,
      cell: (r) => (
        <div className="max-w-[300px]">
          <p className="truncate text-[13px] font-semibold text-ink">{r.title}</p>
          <p className="text-[11.5px] text-slate-400">{r.category} · {r.organizer}</p>
        </div>
      ),
    },
    { id: "date", label: "Date", raw: (r) => r.date, cell: (r) => <span className="whitespace-nowrap text-[12px] text-slate-600">{r.date}</span> },
    { id: "mode", label: "Mode", raw: (r) => r.mode, cell: (r) => <StatusPill status={r.mode} /> },
    {
      id: "registered", label: "Registered", sortValue: (r) => r.registered, raw: (r) => `${r.registered}/${r.capacity}`,
      cell: (r) => (
        <div className="w-28">
          <Meter value={r.capacity ? r.registered / r.capacity : 0} />
          <p className="mt-1 text-[10.5px] text-slate-400">{r.registered}/{r.capacity}</p>
        </div>
      ),
    },
    { id: "checkin", label: "Check-in", raw: (r) => r.checkin, cell: (r) => <span className="text-[12px] font-medium text-slate-600">{r.checkin}</span> },
    { id: "status", label: "Status", raw: (r) => r.status, cell: (r) => <StatusPill status={r.status} /> },
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-5">
      <PageHead
        eyebrow="Content & Programs"
        title="Event Management"
        description="Meetups, workshops and demo days — setup, registration, check-in and post-event outcomes."
      />
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Stat label="Upcoming events" value="14" hint="next: Apr 17 · IPR office hours" />
        <Stat label="Registrations (30d)" value="3,406" delta="+22%" tone="up" />
        <Stat label="Avg attendance" value="81%" delta="+3 pts" tone="up" />
        <Stat label="Connections made" value="1,208" hint="startup ↔ investor, 90d" />
      </div>
      <Directory<EventRow>
        rows={EVENTS}
        columns={columns}
        searchPlaceholder="Search events…"
        searchText={(r) => `${r.title} ${r.organizer} ${r.category} ${r.mode}`}
        chips={{
          id: "status", label: "Status",
          options: ["Published", "Live", "Draft", "Completed"].map((v) => ({ value: v, label: v })),
          match: (r, v) => r.status === v,
        }}
        status={{ get: (r) => r.status }}
        rowName={(r) => r.title}
        exportName="startuphub-events.csv"
        detail={(r, ctx) => ({
          title: r.title,
          subtitle: `${r.category} · organized by ${r.organizer}`,
          status: ctx.status,
          fields: [
            { label: "Date", value: r.date },
            { label: "Mode", value: r.mode },
            { label: "Registered", value: `${r.registered}/${r.capacity}` },
            { label: "Check-in", value: r.checkin },
          ],
          timeline: r.timeline,
          actions: [
            ...(r.status === "Draft" ? [{ label: "Publish event", tone: "primary" as const, nextStatus: "Published" }] : []),
            ...(r.status === "Published" ? [{ label: "Send reminder", tone: "neutral" as const, nextStatus: r.status }, { label: "Cancel event", tone: "danger" as const, nextStatus: "Cancelled", requireReason: true }] : []),
            ...(r.status === "Live" ? [{ label: "Close & generate report", tone: "primary" as const, nextStatus: "Completed" }] : []),
          ],
        })}
      />

      <Panel
        title="Registrations — Frontier VII kickoff (live)"
        description="Eligibility-reviewed at signup; check-in open until 14:00"
        bodyClassName="p-0"
        action={<Tag tone="green">221 checked in</Tag>}
      >
        <div className="divide-y divide-line/70">
          {REGISTRATIONS.map((reg) => (
            <div key={reg.name} className="flex items-center justify-between gap-4 px-5 py-3">
              <p className="text-[12.5px] font-medium text-ink">{reg.name}</p>
              <div className="flex items-center gap-3">
                <span className="text-[11.5px] text-slate-400">{reg.type}</span>
                <StatusPill status={reg.status} />
              </div>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
