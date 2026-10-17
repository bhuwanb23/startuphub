"use client";

import { useMemo, useState } from "react";
import { SearchX } from "lucide-react";
import FilterBar, { type FilterDef } from "@/components/directory/filter-bar";
import IncubatorCard from "@/views/explore/incubators/components/incubator-card";
import {
  incubatorFilters,
  incubators,
} from "@/views/explore/incubators/constants/incubators";

export default function IncubatorsDirectory() {
  const [query, setQuery] = useState("");
  const [values, setValues] = useState<Record<string, string>>({ domain: "", location: "" });

  const filters: FilterDef[] = [
    { key: "domain", label: "Domain", options: incubatorFilters.domains, value: values.domain },
    { key: "location", label: "Location", options: incubatorFilters.locations, value: values.location },
  ];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return incubators.filter((i) => {
      if (values.domain && !i.domains.includes(values.domain)) return false;
      if (values.location && i.location !== values.location) return false;
      if (!q) return true;
      return [i.name, i.location, i.desc, ...i.domains, ...i.facilities]
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
        placeholder="Search incubators by name, domain, facility…"
        filters={filters}
        onFilter={(key, value) => setValues((v) => ({ ...v, [key]: value }))}
        count={filtered.length}
        total={incubators.length}
        onClear={() => {
          setQuery("");
          setValues({ domain: "", location: "" });
        }}
      />

      {filtered.length === 0 ? (
        <div className="mt-16 flex flex-col items-center rounded-2xl border border-dashed border-line bg-soft/60 py-20 text-center">
          <span className="grid h-12 w-12 place-items-center rounded-xl bg-white text-slate-300">
            <SearchX className="h-5 w-5" />
          </span>
          <p className="mt-4 text-[15px] font-semibold text-ink">No incubators match those filters</p>
          <p className="mt-1 text-sm text-slate-400">Try widening your search or clearing filters.</p>
        </div>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((i) => (
            <IncubatorCard key={i.slug} inc={i} />
          ))}
        </div>
      )}
    </>
  );
}
