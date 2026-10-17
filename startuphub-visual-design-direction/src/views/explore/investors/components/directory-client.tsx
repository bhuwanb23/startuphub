"use client";

import { useMemo, useState } from "react";
import { SearchX } from "lucide-react";
import FilterBar, { type FilterDef } from "@/components/directory/filter-bar";
import InvestorCard from "@/views/explore/investors/components/investor-card";
import { investorFilters, investors } from "@/views/explore/investors/constants/investors";

export default function InvestorsDirectory() {
  const [query, setQuery] = useState("");
  const [values, setValues] = useState<Record<string, string>>({ type: "", stage: "", sector: "" });

  const filters: FilterDef[] = [
    { key: "type", label: "Investor Type", options: investorFilters.types, value: values.type },
    { key: "stage", label: "Investment Stage", options: investorFilters.stages, value: values.stage },
    { key: "sector", label: "Sector", options: investorFilters.sectors, value: values.sector },
  ];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return investors.filter((i) => {
      if (values.type && i.type !== values.type) return false;
      if (values.stage && !i.stages.includes(values.stage)) return false;
      if (values.sector && !i.sectors.includes(values.sector)) return false;
      if (!q) return true;
      return [i.name, i.type, i.geography, i.desc, ...i.stages, ...i.sectors]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [query, values]);

  return (
    <>
      <FilterBar
        query={query}
        setQuery={setQuery}
        placeholder="Search investors by name, sector, thesis…"
        filters={filters}
        onFilter={(key, value) => setValues((v) => ({ ...v, [key]: value }))}
        count={filtered.length}
        total={investors.length}
        onClear={() => {
          setQuery("");
          setValues({ type: "", stage: "", sector: "" });
        }}
      />

      {filtered.length === 0 ? (
        <div className="mt-16 flex flex-col items-center rounded-2xl border border-dashed border-line bg-soft/60 py-20 text-center">
          <span className="grid h-12 w-12 place-items-center rounded-xl bg-white text-slate-300">
            <SearchX className="h-5 w-5" />
          </span>
          <p className="mt-4 text-[15px] font-semibold text-ink">No investors match those filters</p>
          <p className="mt-1 text-sm text-slate-400">Try widening your search or clearing filters.</p>
        </div>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((i) => (
            <InvestorCard key={i.slug} inv={i} />
          ))}
        </div>
      )}
    </>
  );
}
