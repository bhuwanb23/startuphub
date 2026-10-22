"use client";

import { useMemo, useState } from "react";
import {
  Archive,
  CalendarClock,
  CheckCircle2,
  Download,
  FileText,
  FolderOpen,
  History,
  Link2,
  Search,
  ShieldCheck,
  Upload,
} from "lucide-react";
import { Badge, Card, PageHeader, Progress } from "@/components/app/widgets";
import { cn } from "@/lib/utils";
import {
  ACKNOWLEDGEMENTS,
  COMPLIANCE_ITEMS,
  DOC_ACTIVITY,
  ORG_DOCUMENTS,
  RETENTION_RULES,
  SHARED_AUDIENCES,
  type OrgDocument,
} from "../../constants/organization-data";

const KINDS = [
  "All",
  "Policy",
  "Agreement",
  "Circular",
  "Template",
  "Report",
  "Certificate",
] as const;

/* Badge tones (card family): default | accent | good | warn | bad */
const KIND_TONE: Record<OrgDocument["kind"], "accent" | "good" | "warn" | "default"> = {
  Policy: "accent",
  Agreement: "good",
  Circular: "warn",
  Template: "default",
  Report: "default",
  Certificate: "good",
};

const VIS_TONE: Record<OrgDocument["visibility"], string> = {
  Internal: "bg-slate-100 text-slate-500",
  Team: "bg-accent-soft text-accent",
  Public: "bg-rise-tint text-rise",
};

export function OrganizationDocuments() {
  const [kind, setKind] = useState<(typeof KINDS)[number]>("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ORG_DOCUMENTS.filter((d) => {
      if (kind !== "All" && d.kind !== kind) return false;
      if (!q) return true;
      return [d.name, d.owner, d.kind].join(" ").toLowerCase().includes(q);
    });
  }, [kind, query]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Organization Documents"
        desc="Policies, agreements, circulars and templates — versioned, shared and expiry-tracked."
        actions={
          <button className="inline-flex items-center gap-1.5 rounded-[10px] bg-accent px-4 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-accent-deep">
            <Upload className="h-3.5 w-3.5" /> Upload
          </button>
        }
      />

      {/* ── 01 · Filters ─────────────────────────────────────── */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex flex-wrap gap-2">
          {KINDS.map((k) => (
            <button
              key={k}
              onClick={() => setKind(k)}
              className={cn(
                "rounded-[10px] border px-3.5 py-2 text-[12.5px] font-medium transition-colors",
                kind === k
                  ? "border-ink bg-ink text-white"
                  : "border-line bg-white text-slate-500 hover:border-slate-300 hover:text-ink",
              )}
            >
              {k}
              <span className="ml-1.5 text-[11px] opacity-60">
                {k === "All"
                  ? ORG_DOCUMENTS.length
                  : ORG_DOCUMENTS.filter((d) => d.kind === k).length}
              </span>
            </button>
          ))}
        </div>
        <div className="relative sm:ml-auto sm:w-[240px]">
          <Search className="pointer-events-none absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search documents or owners"
            aria-label="Search documents"
            className="w-full rounded-[10px] border border-line bg-white py-2 pr-3.5 pl-9 text-[13px] text-ink outline-none placeholder:text-slate-400 focus:border-accent/50"
          />
        </div>
      </div>

      {/* ── 02 · Library ─────────────────────────────────────── */}
      <Card
        title={`${kind === "All" ? "All documents" : kind} · ${filtered.length}`}
        action={
          <span className="font-mono text-[10.5px] text-slate-400">
            {ORG_DOCUMENTS.reduce((s, d) => s + 1, 0)} files · 6.2 MB
          </span>
        }
        pad={false}
      >
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center gap-2 px-5 py-14 text-center">
            <FolderOpen className="h-6 w-6 text-slate-300" />
            <p className="text-[13px] text-slate-400">
              No documents in this category yet.
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-line">
            {filtered.map((d) => (
              <li
                key={d.name}
                className="group flex flex-wrap items-center gap-4 px-5 py-4 transition-colors hover:bg-soft"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent">
                  <FileText className="h-4 w-4" />
                </span>
                <div className="min-w-[230px] flex-1">
                  <p className="text-[13.5px] font-semibold text-ink">{d.name}</p>
                  <p className="mt-0.5 font-mono text-[10px] tracking-[0.06em] text-slate-400 uppercase">
                    {d.size} · {d.version} · updated {d.updated} · {d.owner}
                  </p>
                </div>
                {d.expiry && (
                  <span className="flex items-center gap-1.5 text-[11.5px] font-medium text-amber-dim">
                    <CalendarClock className="h-3.5 w-3.5" /> {d.expiry}
                  </span>
                )}
                <span
                  className={cn(
                    "rounded-full px-2.5 py-0.5 text-[10.5px] font-semibold",
                    VIS_TONE[d.visibility],
                  )}
                >
                  {d.visibility}
                </span>
                <Badge tone={KIND_TONE[d.kind]}>{d.kind}</Badge>
                <button
                  aria-label={`Download ${d.name}`}
                  className="flex h-8.5 w-8.5 shrink-0 items-center justify-center rounded-lg border border-line text-slate-400 transition-colors hover:border-accent/40 hover:text-accent"
                >
                  <Download className="h-3.5 w-3.5" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </Card>

      {/* ── 03 · Categories ──────────────────────────────────── */}
      <Card
        title="Categories"
        sub="How the library is organised"
        action={<Badge tone="accent">6 categories</Badge>}
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {KINDS.filter((k) => k !== "All").map((k) => {
            const files = ORG_DOCUMENTS.filter((d) => d.kind === k);
            const bytes = files.length * 1.4;
            return (
              <div
                key={k}
                className="group rounded-xl border border-line p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-soft"
              >
                <div className="flex items-center justify-between">
                  <Badge tone={KIND_TONE[k as OrgDocument["kind"]]}>{k}</Badge>
                  <span className="font-mono text-[10.5px] text-slate-400">
                    {files.length}
                  </span>
                </div>
                <p className="mt-3 text-[13px] font-semibold text-ink">
                  {files.length} {files.length === 1 ? "document" : "documents"}
                </p>
                <p className="mt-1 text-[12px] text-slate-500">
                  {bytes.toFixed(1)} MB · updated{" "}
                  {files[0]?.updated ?? "—"}
                </p>
              </div>
            );
          })}
        </div>
      </Card>

      {/* ── 04 · Compliance & expiry ─────────────────────────── */}
      <Card
        title="Compliance & expiry"
        sub="Documents that need a decision"
        action={<Badge tone="bad">1 overdue</Badge>}
        pad={false}
      >
        <ul className="divide-y divide-line">
          {COMPLIANCE_ITEMS.map((c) => (
            <li
              key={c.item}
              className="flex flex-wrap items-center gap-4 px-5 py-4 transition-colors hover:bg-soft"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent">
                <ShieldCheck className="h-4 w-4" />
              </span>
              <div className="min-w-[200px] flex-1">
                <p className="text-[13.5px] font-semibold text-ink">{c.item}</p>
                <p className="mt-0.5 text-[11.5px] text-slate-400">
                  owner {c.owner}
                </p>
              </div>
              <span className="font-mono text-[10.5px] text-slate-400">
                due {c.due}
              </span>
              <Badge tone={c.tone}>{c.state}</Badge>
            </li>
          ))}
        </ul>
      </Card>

      {/* ── 05 · Recent activity ─────────────────────────────── */}
      <Card
        title="Recent activity"
        sub="Who touched what this month"
        action={
          <span className="flex items-center gap-1.5 text-[12px] font-semibold text-slate-400">
            <History className="h-3.5 w-3.5" /> Tracked
          </span>
        }
        pad={false}
      >
        <ul className="divide-y divide-line">
          {DOC_ACTIVITY.map((a) => (
            <li
              key={`${a.actor}-${a.when}`}
              className="flex flex-wrap items-center gap-4 px-5 py-4 transition-colors hover:bg-soft"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ink text-[10.5px] font-bold text-white">
                {a.actor
                  .split(" ")
                  .map((w) => w[0])
                  .join("")
                  .slice(0, 2)}
              </span>
              <div className="min-w-[220px] flex-1">
                <p className="text-[13px] text-ink">
                  <b className="font-semibold">{a.actor}</b> {a.action}{" "}
                  <span className="font-medium text-accent">{a.file}</span>
                </p>
              </div>
              <span className="font-mono text-[10.5px] text-slate-400">
                {a.when}
              </span>
              <Badge tone={a.tone}>
                {a.tone === "good" ? "New" : a.tone === "warn" ? "Review" : "Edit"}
              </Badge>
            </li>
          ))}
        </ul>
      </Card>

      {/* ── 06 · Shared audiences ────────────────────────────── */}
      <Card
        title="Shared with"
        sub="Audiences that can open these documents"
        action={
          <span className="flex items-center gap-1.5 text-[12px] font-semibold text-slate-400">
            <Link2 className="h-3.5 w-3.5" /> 4 audiences
          </span>
        }
        pad={false}
      >
        <ul className="divide-y divide-line">
          {SHARED_AUDIENCES.map((s) => (
            <li
              key={s.name}
              className="flex flex-wrap items-center gap-4 px-5 py-4 transition-colors hover:bg-soft"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent">
                <Link2 className="h-4 w-4" />
              </span>
              <div className="min-w-[190px] flex-1">
                <p className="text-[13.5px] font-semibold text-ink">{s.name}</p>
                <p className="mt-0.5 text-[11.5px] text-slate-400">{s.scope}</p>
              </div>
              <span className="text-[12px] text-slate-500">
                <b className="font-semibold text-ink">{s.files}</b> files
              </span>
              <span className="font-mono text-[10.5px] text-slate-400">
                viewed {s.lastViewed}
              </span>
            </li>
          ))}
        </ul>
      </Card>

      {/* ── 07 · Templates ───────────────────────────────────── */}
      <Card
        title="Templates"
        sub="Reusable starting points"
        action={<Badge tone="accent">2 templates</Badge>}
      >
        <div className="grid gap-3 sm:grid-cols-2">
          {ORG_DOCUMENTS.filter((d) => d.kind === "Template").map((t) => (
            <div
              key={t.name}
              className="group rounded-xl border border-line p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-soft"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent">
                  <FileText className="h-4 w-4" />
                </span>
                <Badge tone="default">{t.version}</Badge>
              </div>
              <p className="mt-3 text-[13.5px] font-semibold text-ink">{t.name}</p>
              <p className="mt-1.5 text-[12px] text-slate-500">
                Owned by {t.owner} · {t.size}
              </p>
              <button className="mt-3 inline-flex items-center gap-1 text-[12px] font-semibold text-accent">
                Use template <Download className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      </Card>

      {/* ── 08 · Acknowledgement status ─────────────────────── */}
      <Card
        title="Acknowledgement status"
        sub="Which policies the team has actually signed off"
        action={<Badge tone="bad">1 overdue</Badge>}
        pad={false}
      >
        <ul className="divide-y divide-line">
          {ACKNOWLEDGEMENTS.map((a) => {
            const pct = Math.round((a.acknowledged / a.required) * 100);
            return (
              <li
                key={a.document}
                className="flex flex-wrap items-center gap-4 px-5 py-4 transition-colors hover:bg-soft"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent">
                  <CheckCircle2 className="h-4 w-4" />
                </span>
                <div className="min-w-[200px] flex-1">
                  <p className="text-[13.5px] font-semibold text-ink">{a.document}</p>
                  <p className="mt-0.5 font-mono text-[10px] tracking-[0.06em] text-slate-400 uppercase">
                    due {a.deadline}
                  </p>
                </div>
                <div className="flex w-[140px] items-center gap-2.5">
                  <Progress
                    value={pct}
                    tone={pct === 100 ? "good" : pct < 60 ? "bad" : "warn"}
                    className="flex-1"
                  />
                  <span className="w-12 text-right text-[11.5px] font-semibold tabular-nums text-ink">
                    {a.acknowledged}/{a.required}
                  </span>
                </div>
                <Badge tone={a.tone}>
                  {pct === 100 ? "Complete" : "Outstanding"}
                </Badge>
              </li>
            );
          })}
        </ul>
      </Card>

      {/* ── 09 · Retention policy ────────────────────────────── */}
      <Card
        title="Retention policy"
        sub="How long each category is kept"
        action={
          <span className="flex items-center gap-1.5 text-[12px] font-semibold text-slate-400">
            <Archive className="h-3.5 w-3.5" /> Automated
          </span>
        }
        pad={false}
      >
        <ul className="divide-y divide-line">
          {RETENTION_RULES.map((r) => (
            <li
              key={r.category}
              className="flex flex-wrap items-center gap-4 px-5 py-4 transition-colors hover:bg-soft"
            >
              <div className="min-w-[190px] flex-1">
                <p className="text-[13.5px] font-semibold text-ink">{r.category}</p>
                <p className="mt-0.5 text-[11.5px] text-slate-400">{r.action}</p>
              </div>
              <span className="text-[12px] text-slate-500">{r.keep}</span>
              <span className="font-mono text-[10.5px] text-slate-400">
                {r.files} files
              </span>
              <Badge tone="default">Automated</Badge>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
