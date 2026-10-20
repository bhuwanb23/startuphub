"use client";

import { ArrowUpDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";

export type DirectoryFilter = { label: string; value: string };

export function FilterBar({
  search,
  onSearch,
  filters,
  active,
  onFilter,
  sortOptions,
  sort,
  onSort,
  placeholder = "Search…",
}: {
  search: string;
  onSearch: (value: string) => void;
  filters: DirectoryFilter[];
  active: string;
  onFilter: (value: string) => void;
  sortOptions?: DirectoryFilter[];
  sort?: string;
  onSort?: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <label className="flex min-w-[240px] flex-1 items-center gap-2.5 rounded-xl border border-line bg-white px-4 py-2.5 shadow-card transition-colors focus-within:border-accent/40 sm:max-w-sm">
          <Search className="h-4 w-4 shrink-0 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder={placeholder}
            className="w-full bg-transparent text-[13.5px] font-medium text-ink outline-none placeholder:text-slate-400"
          />
        </label>

        {sortOptions && sortOptions.length && onSort ? (
          <label className="inline-flex items-center gap-2 rounded-xl border border-line bg-white px-4 py-2.5 shadow-card">
            <ArrowUpDown className="h-3.5 w-3.5 text-slate-400" />
            <select
              value={sort}
              onChange={(e) => onSort(e.target.value)}
              className="bg-transparent text-[13px] font-semibold text-ink outline-none"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </label>
        ) : null}
      </div>

      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter.value}
            type="button"
            onClick={() => onFilter(filter.value)}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-[12.5px] font-semibold transition-all duration-300",
              active === filter.value
                ? "border-accent bg-accent text-white shadow-[0_4px_12px_-4px_rgba(49,87,232,0.5)]"
                : "border-line bg-white text-slate-500 hover:border-accent/30 hover:text-ink",
            )}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  );
}
