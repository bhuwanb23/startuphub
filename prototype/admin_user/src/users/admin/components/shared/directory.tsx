"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Download,
  Search,
  X,
} from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useToast } from "../../hooks/use-toast";
import { StatusPill } from "./bits";

/* ---------------------------------- types ---------------------------------- */

export type DirCol<T> = {
  id: string;
  label: string;
  align?: "left" | "center" | "right";
  className?: string;
  sortValue?: (row: T) => string | number;
  cell: (row: T) => ReactNode;
  raw?: (row: T) => string | number;
};

export type DirFilter<T> = {
  id: string;
  label: string;
  options: { value: string; label: string }[];
  match: (row: T, value: string) => boolean;
};

export type TimelineEvent = {
  when: string;
  actor: string;
  action: string;
  note?: string;
};

export type DetailAction = {
  label: string;
  tone?: "primary" | "danger" | "neutral";
  nextStatus: string;
  requireReason?: boolean;
};

export type DetailSpec = {
  title: string;
  subtitle?: string;
  status?: string;
  fields?: { label: string; value: ReactNode }[];
  sections?: { title: string; body: ReactNode }[];
  timeline?: TimelineEvent[];
  actions?: DetailAction[];
};

export type BulkAction<T> = {
  label: string;
  tone?: "primary" | "danger";
  nextStatus: string;
  eligible?: (row: T) => string | null;
};

type DirProps<T> = {
  rows: T[];
  columns: DirCol<T>[];
  searchPlaceholder?: string;
  searchText: (row: T) => string;
  chips?: DirFilter<T>;
  selects?: DirFilter<T>[];
  status?: { get: (row: T) => string };
  actor?: string;
  detail?: (row: T, ctx: { status: string }) => DetailSpec;
  bulkActions?: BulkAction<T>[];
  rowName?: (row: T) => string;
  exportName?: string;
  pageSize?: number;
  toolbarExtra?: ReactNode;
};

/* -------------------------------- component -------------------------------- */

export function Directory<T extends { id: string | number }>(props: DirProps<T>) {
  const {
    rows, columns, searchPlaceholder = "Search…", searchText, chips, selects,
    status, actor = "You (Super Admin)", detail, bulkActions, rowName,
    exportName = "export.csv", pageSize = 8, toolbarExtra,
  } = props;

  const { show, viewport } = useToast();
  const [query, setQuery] = useState("");
  const [chipValue, setChipValue] = useState("all");
  const [selectValues, setSelectValues] = useState<Record<string, string>>({});
  const [sort, setSort] = useState<{ id: string; dir: 1 | -1 } | null>(null);
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState<Set<string | number>>(new Set());
  const [activeId, setActiveId] = useState<string | number | null>(null);
  const [overrides, setOverrides] = useState<Map<string | number, string>>(new Map());
  const [extraEvents, setExtraEvents] = useState<Map<string | number, TimelineEvent[]>>(new Map());
  const [reason, setReason] = useState("");
  const [pendingAction, setPendingAction] = useState<DetailAction | null>(null);
  const [bulkResult, setBulkResult] = useState<{ ok: number; failed: { name: string; reason: string }[] } | null>(null);

  const getStatus = (row: T) =>
    overrides.get(row.id) ?? (status ? status.get(row) : "");

  const filtered = useMemo(() => {
    let out = rows.filter((r) =>
      searchText(r).toLowerCase().includes(query.trim().toLowerCase()),
    );
    if (chips && chipValue !== "all") out = out.filter((r) => chips.match(r, chipValue));
    if (selects) {
      for (const sel of selects) {
        const v = selectValues[sel.id] ?? "all";
        if (v !== "all") out = out.filter((r) => sel.match(r, v));
      }
    }
    if (sort) {
      const col = columns.find((c) => c.id === sort.id);
      if (col?.sortValue) {
        const sv = col.sortValue;
        out = [...out].sort((a, b) => {
          const x = sv(a); const y = sv(b);
          return (x < y ? -1 : x > y ? 1 : 0) * sort.dir;
        });
      }
    }
    return out;
  }, [rows, query, chipValue, selectValues, sort, columns, chips, selects, searchText]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, pageCount - 1);
  const pageRows = filtered.slice(safePage * pageSize, safePage * pageSize + pageSize);

  const chipCount = (value: string) => {
    const base = rows.filter((r) =>
      searchText(r).toLowerCase().includes(query.trim().toLowerCase()),
    );
    if (value === "all") return base.length;
    return chips ? base.filter((r) => chips.match(r, value)).length : 0;
  };

  const pushEvent = (id: string | number, action: string, note?: string) => {
    setExtraEvents((prev) => {
      const next = new Map(prev);
      const list = next.get(id) ?? [];
      next.set(id, [
        { when: "Just now", actor, action, note },
        ...list,
      ]);
      return next;
    });
  };

  const runAction = (id: string | number, action: DetailAction, note?: string) => {
    setOverrides((prev) => new Map(prev).set(id, action.nextStatus));
    pushEvent(id, action.label, note);
    setPendingAction(null);
    setReason("");
    show(`${action.label} — recorded in audit log`);
  };

  const runBulk = (action: BulkAction<T>) => {
    const failed: { name: string; reason: string }[] = [];
    let ok = 0;
    for (const id of selected) {
      const row = rows.find((r) => r.id === id);
      if (!row) continue;
      const reason = action.eligible?.(row) ?? null;
      if (reason) {
        failed.push({ name: rowName ? rowName(row) : String(row.id), reason });
      } else {
        setOverrides((prev) => new Map(prev).set(id, action.nextStatus));
        pushEvent(id, `Bulk: ${action.label}`);
        ok++;
      }
    }
    setBulkResult({ ok, failed });
    setSelected(new Set());
    if (failed.length === 0) show(`${action.label} applied to ${ok} records`);
  };

  const exportCsv = () => {
    const cols = columns.filter((c) => c.raw);
    const head = cols.map((c) => `"${c.label}"`).join(",");
    const body = filtered
      .map((r) => cols.map((c) => `"${String(c.raw ? c.raw(r) : "").replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([`${head}\n${body}`], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = exportName;
    a.click();
    URL.revokeObjectURL(url);
    show(`Exported ${filtered.length} rows (audited)`);
  };

  const activeRow = rows.find((r) => r.id === activeId) ?? null;
  const activeSpec = activeRow && detail
    ? detail(activeRow, { status: getStatus(activeRow) })
    : null;
  const mergedTimeline = activeRow && activeSpec
    ? [...(extraEvents.get(activeRow.id) ?? []), ...(activeSpec.timeline ?? [])]
    : [];

  return (
    <div className="rounded-2xl border border-line bg-white shadow-card">
      {/* toolbar */}
      <div className="flex flex-wrap items-center gap-3 border-b border-line px-4 py-3.5">
        <label className="flex min-w-[200px] flex-1 items-center gap-2.5 rounded-xl border border-line bg-soft px-3.5 py-2 transition-colors focus-within:border-accent/40 sm:max-w-xs">
          <Search className="h-4 w-4 shrink-0 text-slate-400" />
          <input
            value={query}
            onChange={(e) => { setQuery(e.target.value); setPage(0); }}
            placeholder={searchPlaceholder}
            className="w-full bg-transparent text-[13px] font-medium text-ink outline-none placeholder:text-slate-400"
          />
        </label>
        {selects?.map((sel) => (
          <div key={sel.id} className="relative">
            <select
              value={selectValues[sel.id] ?? "all"}
              onChange={(e) => { setSelectValues((v) => ({ ...v, [sel.id]: e.target.value })); setPage(0); }}
              className="h-9 appearance-none rounded-xl border border-line bg-white pl-3.5 pr-8 text-[12.5px] font-semibold text-ink outline-none transition-colors focus:border-accent/50"
            >
              <option value="all">{sel.label}: All</option>
              {sel.options.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
          </div>
        ))}
        <div className="ml-auto flex items-center gap-2">
          {toolbarExtra}
          <button
            type="button"
            onClick={exportCsv}
            className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-line bg-white px-3.5 text-[12.5px] font-semibold text-slate-600 transition-colors hover:border-accent/40 hover:text-accent"
          >
            <Download className="h-3.5 w-3.5" />
            Export
          </button>
        </div>
      </div>

      {/* filter chips */}
      {chips ? (
        <div className="flex flex-wrap gap-2 border-b border-line px-4 py-3">
          {[{ value: "all", label: "All" }, ...chips.options].map((o) => (
            <button
              key={o.value}
              type="button"
              onClick={() => { setChipValue(o.value); setPage(0); }}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[12px] font-semibold transition-all",
                chipValue === o.value
                  ? "border-accent bg-accent text-white"
                  : "border-line bg-white text-slate-500 hover:border-accent/30 hover:text-ink",
              )}
            >
              {o.label}
              <span
                className={cn(
                  "rounded-full px-1.5 text-[10px]",
                  chipValue === o.value ? "bg-white/20" : "bg-slate-100 text-slate-400",
                )}
              >
                {chipCount(o.value)}
              </span>
            </button>
          ))}
        </div>
      ) : null}

      {/* bulk result */}
      <AnimatePresence>
        {bulkResult ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-b border-line"
          >
            <div className={cn("m-4 rounded-xl border px-4 py-3 text-[12.5px]", bulkResult.failed.length ? "border-amber-200 bg-amber-50" : "border-emerald-200 bg-emerald-50")}>
              <div className="flex items-center justify-between">
                <p className="font-semibold text-ink">
                  {bulkResult.ok} updated{bulkResult.failed.length ? ` · ${bulkResult.failed.length} could not be updated` : " — all selected records"}
                </p>
                <button type="button" onClick={() => setBulkResult(null)} aria-label="Dismiss">
                  <X className="h-3.5 w-3.5 text-slate-400" />
                </button>
              </div>
              {bulkResult.failed.length ? (
                <ul className="mt-1.5 space-y-0.5 text-slate-600">
                  {bulkResult.failed.map((f) => (
                    <li key={f.name}>· {f.name} — {f.reason}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* table */}
      <div className="scroll-quiet overflow-x-auto">
        <table className="w-full min-w-[720px] text-left">
          <thead>
            <tr className="border-b border-line">
              <th className="w-10 px-4 py-3">
                <input
                  type="checkbox"
                  aria-label="Select all"
                  checked={pageRows.length > 0 && pageRows.every((r) => selected.has(r.id))}
                  onChange={(e) => {
                    const next = new Set(selected);
                    pageRows.forEach((r) => (e.target.checked ? next.add(r.id) : next.delete(r.id)));
                    setSelected(next);
                  }}
                  className="h-3.5 w-3.5 accent-[#3157e8]"
                />
              </th>
              {columns.map((col) => (
                <th
                  key={col.id}
                  className={cn(
                    "px-3.5 py-3 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-slate-400",
                    col.align === "right" && "text-right",
                    col.align === "center" && "text-center",
                    col.className,
                  )}
                >
                  {col.sortValue ? (
                    <button
                      type="button"
                      onClick={() =>
                        setSort((s) =>
                          s?.id === col.id
                            ? s.dir === 1 ? { id: col.id, dir: -1 } : null
                            : { id: col.id, dir: 1 },
                        )
                      }
                      className="inline-flex items-center gap-1 hover:text-slate-600"
                    >
                      {col.label}
                      {sort?.id === col.id ? (sort.dir === 1 ? "↑" : "↓") : null}
                    </button>
                  ) : (
                    col.label
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-line/70">
            {pageRows.map((row) => (
              <tr
                key={row.id}
                onClick={() => detail && setActiveId(row.id)}
                className={cn(
                  "transition-colors hover:bg-soft/80",
                  detail && "cursor-pointer",
                  activeId === row.id && "bg-accent-soft/50",
                )}
              >
                <td className="px-4 py-3.5" onClick={(e) => e.stopPropagation()}>
                  <input
                    type="checkbox"
                    aria-label="Select row"
                    checked={selected.has(row.id)}
                    onChange={(e) => {
                      const next = new Set(selected);
                      e.target.checked ? next.add(row.id) : next.delete(row.id);
                      setSelected(next);
                    }}
                    className="h-3.5 w-3.5 accent-[#3157e8]"
                  />
                </td>
                {columns.map((col) => (
                  <td
                    key={col.id}
                    className={cn(
                      "px-3.5 py-3.5 text-[13px]",
                      col.align === "right" && "text-right",
                      col.align === "center" && "text-center",
                      col.className,
                    )}
                  >
                    {col.cell(row)}
                  </td>
                ))}
              </tr>
            ))}
            {pageRows.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1} className="px-4 py-12 text-center text-[13px] text-slate-400">
                  No records match the current filters.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>

      {/* footer */}
      <div className="flex items-center justify-between gap-3 border-t border-line px-4 py-3">
        <p className="text-[12px] font-medium text-slate-400">
          {filtered.length} records{selected.size ? ` · ${selected.size} selected` : ""}
        </p>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            aria-label="Previous page"
            disabled={safePage === 0}
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            className="grid h-8 w-8 place-items-center rounded-lg border border-line text-slate-500 disabled:opacity-40"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="px-2 text-[12px] font-semibold text-slate-500">
            {safePage + 1} / {pageCount}
          </span>
          <button
            type="button"
            aria-label="Next page"
            disabled={safePage >= pageCount - 1}
            onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
            className="grid h-8 w-8 place-items-center rounded-lg border border-line text-slate-500 disabled:opacity-40"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* bulk bar */}
      <AnimatePresence>
        {selected.size > 0 && bulkActions?.length ? (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-5 left-1/2 z-[70] flex -translate-x-1/2 items-center gap-3 rounded-2xl border border-line bg-white px-5 py-3 shadow-lift"
          >
            <span className="text-[12.5px] font-semibold text-ink">
              {selected.size} selected
            </span>
            {bulkActions.map((a) => (
              <button
                key={a.label}
                type="button"
                onClick={() => runBulk(a)}
                className={cn(
                  "rounded-lg px-3.5 py-2 text-[12px] font-semibold text-white transition",
                  a.tone === "danger" ? "bg-rose-600 hover:bg-rose-700" : "bg-accent hover:bg-accent-deep",
                )}
              >
                {a.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setSelected(new Set())}
              className="text-[12px] font-semibold text-slate-400 hover:text-ink"
            >
              Clear
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* detail drawer */}
      <AnimatePresence>
        {activeRow && activeSpec ? (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-ink/30 backdrop-blur-[2px]"
              onClick={() => { setActiveId(null); setPendingAction(null); setReason(""); }}
            />
            <motion.aside
              initial={{ x: 480 }}
              animate={{ x: 0 }}
              exit={{ x: 480 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-y-0 right-0 z-[61] flex w-full max-w-md flex-col border-l border-line bg-white shadow-lift"
            >
              <div className="border-b border-line p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    {activeSpec.status ?? (status ? getStatus(activeRow) : "") ? (
                      <StatusPill status={activeSpec.status ?? getStatus(activeRow)} />
                    ) : null}
                    <h3 className="mt-2.5 text-[17px] font-semibold tracking-tight text-ink">
                      {activeSpec.title}
                    </h3>
                    {activeSpec.subtitle ? (
                      <p className="mt-0.5 text-[12.5px] text-slate-400">{activeSpec.subtitle}</p>
                    ) : null}
                  </div>
                  <button
                    type="button"
                    aria-label="Close"
                    onClick={() => { setActiveId(null); setPendingAction(null); setReason(""); }}
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-line text-slate-500 hover:text-ink"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="scroll-quiet flex-1 space-y-6 overflow-y-auto p-5">
                {activeSpec.fields?.length ? (
                  <div className="grid grid-cols-2 gap-x-4 gap-y-3.5">
                    {activeSpec.fields.map((f) => (
                      <div key={f.label}>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                          {f.label}
                        </p>
                        <div className="mt-1 text-[13px] font-medium text-ink">{f.value}</div>
                      </div>
                    ))}
                  </div>
                ) : null}

                {activeSpec.sections?.map((s) => (
                  <div key={s.title}>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                      {s.title}
                    </p>
                    <div className="mt-2.5">{s.body}</div>
                  </div>
                ))}

                {mergedTimeline.length ? (
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                      Audit history
                    </p>
                    <div className="mt-3 space-y-0">
                      {mergedTimeline.map((e, i) => (
                        <div key={`${e.when}-${i}`} className="relative flex gap-3 pb-4 last:pb-0">
                          {i < mergedTimeline.length - 1 ? (
                            <span className="absolute left-[5px] top-4 h-full w-px bg-line" />
                          ) : null}
                          <span className="relative mt-1 h-2.5 w-2.5 shrink-0 rounded-full border-2 border-accent/50 bg-white" />
                          <div className="min-w-0">
                            <p className="text-[12.5px] font-semibold text-ink">{e.action}</p>
                            <p className="text-[11.5px] text-slate-400">
                              {e.actor} · {e.when}
                            </p>
                            {e.note ? (
                              <p className="mt-1 rounded-lg bg-soft px-2.5 py-1.5 text-[11.5px] italic text-slate-500">
                                “{e.note}”
                              </p>
                            ) : null}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>

              {activeSpec.actions?.length ? (
                <div className="space-y-3 border-t border-line p-5">
                  {pendingAction?.requireReason ? (
                    <div className="space-y-2.5">
                      <textarea
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        placeholder={`Reason for "${pendingAction.label}" (required, recorded in audit)`}
                        rows={2}
                        className="w-full rounded-lg border border-line bg-soft px-3 py-2 text-[12.5px] font-medium text-ink outline-none placeholder:text-slate-400 focus:border-accent/50"
                      />
                      <div className="flex gap-2">
                        <button
                          type="button"
                          disabled={reason.trim().length < 4}
                          onClick={() => runAction(activeRow.id, pendingAction, reason.trim())}
                          className="flex-1 rounded-lg bg-accent py-2 text-[12.5px] font-semibold text-white transition hover:bg-accent-deep disabled:opacity-40"
                        >
                          Confirm — {pendingAction.label}
                        </button>
                        <button
                          type="button"
                          onClick={() => { setPendingAction(null); setReason(""); }}
                          className="rounded-lg border border-line px-3.5 py-2 text-[12.5px] font-semibold text-slate-500"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {activeSpec.actions.map((a) => (
                        <button
                          key={a.label}
                          type="button"
                          onClick={() =>
                            a.requireReason
                              ? setPendingAction(a)
                              : runAction(activeRow.id, a)
                          }
                          className={cn(
                            "rounded-lg px-3.5 py-2 text-[12.5px] font-semibold transition",
                            a.tone === "danger"
                              ? "bg-rose-600 text-white hover:bg-rose-700"
                              : a.tone === "primary"
                                ? "bg-accent text-white hover:bg-accent-deep"
                                : "border border-line text-slate-600 hover:border-accent/40 hover:text-accent",
                          )}
                        >
                          {a.label}
                        </button>
                      ))}
                    </div>
                  )}
                  <p className="text-[10.5px] leading-snug text-slate-400">
                    Sensitive actions require a reason and a permitted role. Every
                    action is written to the audit log with actor, timestamp and rationale.
                  </p>
                </div>
              ) : null}
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>

      {viewport}
    </div>
  );
}
