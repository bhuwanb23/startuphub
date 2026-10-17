"use client";

import { useMemo, useState } from "react";
import { SearchX } from "lucide-react";
import FilterBar, { type FilterDef } from "@/components/directory/filter-bar";
import StartupCard from "@/views/explore/startups/components/startup-card";
import {
  startupFilters,
  startups,
  type Startup,
} from "@/views/explore/startups/constants/startups";

export default function StartupsDirectory() {
  const [query, setQuery] = useState("");
  const [values, setValues] = useState<Record<string, string>>({
    industry: "",
    location: "",
    stage: "",
    funding: "",
  });

  const filters: FilterDef[] = [
    { key: "industry", label: "Industry", options: startupFilters.industries, value: values.industry },
    { key: "location", label: "Location", options: startupFilters.locations, value: values.location },
    { key: "stage", label: "Stage", options: startupFilters.stages, value: values.stage },
    { key: "funding", label: "Funding Stage", options: startupFilters.funding, value: values.funding },
  ];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return startups.filter((s: Startup) => {
      if (values.industry && s.industry !== values.industry) return false;
      if (values.location && s.location !== values.location) return false;
      if (values.stage && s.stage !== values.stage) return false;
      if (values.funding && s.fundingStage !== values.funding) return false;
      if (!q) return true;
      return [s.name, s.sector, s.industry, s.location, s.oneLiner, ...s.tags]
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
        placeholder="Search startups, sectors, tags, cities…"
        filters={filters}
        onFilter={(key, value) => setValues((v) => ({ ...v, [key]: value }))}
        count={filtered.length}
        total={startups.length}
        onClear={() => {
          setQuery("");
          setValues({ industry: "", location: "", stage: "", funding: "" });
        }}
      />

      {filtered.length === 0 ? (
        <div className="mt-16 flex flex-col items-center rounded-2xl border border-dashed border-line bg-soft/60 py-20 text-center">
          <span className="grid h-12 w-12 place-items-center rounded-xl bg-white text-slate-300">
            <SearchX className="h-5 w-5" />
          </span>
          <p className="mt-4 text-[15px] font-semibold text-ink">No startups match those filters</p>
          <p className="mt-1 text-sm text-slate-400">Try widening your search or clearing filters.</p>
        </div>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((s) => (
            <StartupCard key={s.slug} s={s} />
          ))}
        </div>
      )}
    </>
  );
}
