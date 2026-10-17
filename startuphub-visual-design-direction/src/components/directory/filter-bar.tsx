"use client";

import { ChevronDown, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type FilterDef = {
  key: string;
  label: string;
  options: string[];
  value: string;
};

export default function FilterBar({
  query,
  setQuery,
  placeholder,
  filters,
  onFilter,
  count,
  total,
  onClear,
}: {
  query: string;
  setQuery: (v: string) => void;
  placeholder: string;
  filters: FilterDef[];
  onFilter: (key: string, value: string) => void;
  count: number;
  total: number;
  onClear: () => void;
}) {
  const active = query !== "" || filters.some((f) => f.value !== "");

  return (
    <div className="rounded-2xl border border-line bg-white p-3 shadow-[0_8px_28px_-18px_rgba(11,18,32,0.18)]">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="h-11 w-full rounded-[10px] border border-line bg-soft pl-10 pr-4 text-sm text-ink placeholder:text-slate-400 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/15"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {filters.map((f) => (
            <div key={f.key} className="relative">
              <select
                value={f.value}
                onChange={(e) => onFilter(f.key, e.target.value)}
                className={cn(
                  "h-11 appearance-none rounded-[10px] border border-line bg-white pl-3.5 pr-9 text-[13px] font-medium focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/15",
                  f.value ? "text-ink" : "text-slate-500"
                )}
                aria-label={f.label}
              >
                <option value="">{f.label}</option>
                {f.options.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
            </div>
          ))}
          {active && (
            <button
              onClick={onClear}
              className="flex h-11 items-center gap-1.5 rounded-[10px] px-3 text-[13px] font-semibold text-slate-400 transition-colors hover:text-ink"
            >
              <X className="h-3.5 w-3.5" />
              Clear
            </button>
          )}
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between border-t border-line px-1.5 pt-3">
        <p className="text-[12.5px] text-slate-400">
          Showing <span className="font-semibold text-ink">{count}</span> of {total} results
        </p>
        <p className="hidden text-[12.5px] text-slate-300 sm:block">
          Verified profiles · Sensitive data unlocks after login
        </p>
      </div>
    </div>
  );
}
