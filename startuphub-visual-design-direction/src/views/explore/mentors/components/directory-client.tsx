"use client";

import { useMemo, useState } from "react";
import { SearchX } from "lucide-react";
import FilterBar, { type FilterDef } from "@/components/directory/filter-bar";
import MentorCard from "@/views/explore/mentors/components/mentor-card";
import { mentorFilters, mentors } from "@/views/explore/mentors/constants/mentors";

export default function MentorsDirectory() {
  const [query, setQuery] = useState("");
  const [values, setValues] = useState<Record<string, string>>({
    expertise: "",
    industry: "",
    location: "",
    availability: "",
  });

  const filters: FilterDef[] = [
    { key: "expertise", label: "Expertise", options: mentorFilters.expertise, value: values.expertise },
    { key: "industry", label: "Industry", options: mentorFilters.industries, value: values.industry },
    { key: "location", label: "Location", options: mentorFilters.locations, value: values.location },
    { key: "availability", label: "Availability", options: mentorFilters.availability, value: values.availability },
  ];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return mentors.filter((m) => {
      if (values.expertise && !m.expertise.includes(values.expertise)) return false;
      if (values.industry && m.industry !== values.industry) return false;
      if (values.location && m.location !== values.location) return false;
      if (values.availability && m.availability !== values.availability) return false;
      if (!q) return true;
      return [m.name, m.role, m.bio, m.industry, ...m.expertise]
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
        placeholder="Search mentors by name, expertise, industry…"
        filters={filters}
        onFilter={(key, value) => setValues((v) => ({ ...v, [key]: value }))}
        count={filtered.length}
        total={mentors.length}
        onClear={() => {
          setQuery("");
          setValues({ expertise: "", industry: "", location: "", availability: "" });
        }}
      />

      {filtered.length === 0 ? (
        <div className="mt-16 flex flex-col items-center rounded-2xl border border-dashed border-line bg-soft/60 py-20 text-center">
          <span className="grid h-12 w-12 place-items-center rounded-xl bg-white text-slate-300">
            <SearchX className="h-5 w-5" />
          </span>
          <p className="mt-4 text-[15px] font-semibold text-ink">No mentors match those filters</p>
          <p className="mt-1 text-sm text-slate-400">Try widening your search or clearing filters.</p>
        </div>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((m) => (
            <MentorCard key={m.slug} m={m} />
          ))}
        </div>
      )}
    </>
  );
}
