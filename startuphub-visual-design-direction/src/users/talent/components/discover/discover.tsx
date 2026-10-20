"use client";

import { useState } from "react";
import { Bookmark, BookmarkCheck, CalendarClock, MapPin, Search } from "lucide-react";
import { PageIntro } from "@/components/app/widgets";
import { cn } from "@/lib/utils";
import { useFiltered } from "../../hooks/use-filtered";
import {
  OPPORTUNITIES,
  OPP_CATEGORIES,
  type Opportunity,
} from "../../constants/discover-data";

const TYPE_TONE: Record<Opportunity["type"], string> = {
  Jobs: "bg-accent-soft text-accent-deep",
  Projects: "bg-sky-50 text-sky-700",
  Freelance: "bg-amber-50 text-amber-700",
  Consulting: "bg-emerald-50 text-emerald-700",
};

export function TalentDiscover() {
  const { filter, setFilter, filtered } = useFiltered<Opportunity>(
    OPPORTUNITIES,
    (o, f) => o.type === f,
  );
  const [saved, setSaved] = useState<Set<string>>(new Set(["o2"]));

  const toggleSave = (id: string) =>
    setSaved((s) => {
      const next = new Set(s);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <div className="space-y-6">
      <PageIntro
        title="Opportunity discovery"
        description="Jobs, projects, freelance and consulting — scored against your skills, rates and availability."
        action={
          <span className="rounded-full bg-accent-soft px-3 py-1.5 text-[12px] font-semibold text-accent-deep">
            {saved.size} saved
          </span>
        }
      />

      {/* search + live filter */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2.5 rounded-lg border border-line bg-white px-3.5 py-2.5 text-[13.5px] text-slate-400 shadow-[0_1px_2px_rgba(11,18,32,0.03)]">
          <Search className="h-4 w-4" />
          Search roles, startups or technologies…
        </div>
        <div className="flex flex-wrap gap-2">
          {OPP_CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={cn(
                "rounded-full px-3.5 py-2 text-[12.5px] font-medium transition-colors",
                filter === c
                  ? "bg-ink text-white"
                  : "border border-line bg-white text-slate-500 hover:text-ink",
              )}
            >
              {c}
              <span className="ml-1.5 text-[11px] opacity-60">
                {c === "All" ? OPPORTUNITIES.length : OPPORTUNITIES.filter((o) => o.type === c).length}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {filtered.map((o) => (
          <article
            key={o.id}
            className="rounded-xl border border-line bg-white p-5 shadow-[0_1px_2px_rgba(11,18,32,0.03)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <span className={cn("rounded-full px-2.5 py-1 text-[10.5px] font-semibold", TYPE_TONE[o.type])}>
                  {o.type}
                </span>
                <h3 className="mt-2.5 text-[15.5px] font-semibold leading-snug tracking-[-0.01em] text-ink">
                  {o.role}
                </h3>
                <p className="mt-0.5 text-[12.5px] text-slate-400">
                  {o.org} · {o.sector}
                </p>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-2">
                <button
                  onClick={() => toggleSave(o.id)}
                  aria-label={saved.has(o.id) ? "Unsave" : "Save"}
                  className={cn(
                    "rounded-lg p-2 transition-colors",
                    saved.has(o.id) ? "text-accent" : "text-slate-300 hover:text-slate-400",
                  )}
                >
                  {saved.has(o.id) ? <BookmarkCheck className="h-4.5 w-4.5" /> : <Bookmark className="h-4.5 w-4.5" />}
                </button>
                <span className="rounded-full bg-accent-soft px-2.5 py-1 text-[11.5px] font-bold text-accent-deep">
                  {o.match} fit
                </span>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {o.tags.map((t) => (
                <span key={t} className="rounded-full bg-soft px-2.5 py-1 text-[11px] font-medium text-slate-600">
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 border-t border-line pt-3.5 text-[12px] text-slate-500">
              <span className="font-semibold text-ink">{o.comp}</span>
              <span className="flex items-center gap-1"><MapPin className="h-3 w-3 text-slate-400" /> {o.location}</span>
              <span className="flex items-center gap-1"><CalendarClock className="h-3 w-3 text-slate-400" /> {o.deadline}</span>
              <button className="ml-auto rounded-lg bg-accent px-3 py-1.5 text-[12px] font-semibold text-white transition-colors hover:bg-accent-deep">
                Apply
              </button>
            </div>
          </article>
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full rounded-xl border border-dashed border-slate-300 bg-white px-5 py-12 text-center text-[13px] text-slate-400">
            No {filter.toLowerCase()} opportunities right now — new matches land nightly.
          </p>
        )}
      </div>
    </div>
  );
}
