"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight, CalendarDays, MapPin, Search, SearchX } from "lucide-react";
import Link from "next/link";
import { opportunities, oppCategories } from "@/views/opportunities/constants/opportunities";
import { cn } from "@/lib/utils";

export default function OpportunityBoard() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("");
  const [closingOnly, setClosingOnly] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return opportunities.filter((o) => {
      if (cat && o.category !== cat) return false;
      if (closingOnly && o.daysLeft > 14) return false;
      if (!q) return true;
      return [o.title, o.org, o.category, ...o.tags].join(" ").toLowerCase().includes(q);
    });
  }, [query, cat, closingOnly]);

  const countFor = (c: string) => opportunities.filter((o) => o.category === c).length;

  return (
    <>
      {/* controls */}
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1 sm:max-w-md">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search opportunities…"
              className="h-12 w-full rounded-xl border border-line bg-white pl-11 pr-4 text-sm text-ink placeholder:text-slate-400 shadow-[0_8px_28px_-18px_rgba(11,18,32,0.18)] focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/15"
            />
          </div>
          <button
            onClick={() => setClosingOnly((v) => !v)}
            className={cn(
              "flex h-12 w-fit items-center gap-2 rounded-xl border px-4 text-[13px] font-semibold transition-all",
              closingOnly
                ? "border-accent bg-accent text-white"
                : "border-line bg-white text-slate-600 hover:border-slate-300"
            )}
          >
            <CalendarDays className="h-4 w-4" />
            Closing within 2 weeks
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setCat("")}
            className={cn(
              "rounded-full border px-3.5 py-2 text-[13px] font-medium transition-all",
              cat === "" ? "border-accent bg-accent text-white" : "border-line bg-white text-slate-600 hover:border-slate-300"
            )}
          >
            All ({opportunities.length})
          </button>
          {oppCategories.map((c) => {
            const n = countFor(c);
            if (n === 0) return null;
            return (
              <button
                key={c}
                onClick={() => setCat((v) => (v === c ? "" : c))}
                className={cn(
                  "rounded-full border px-3.5 py-2 text-[13px] font-medium transition-all",
                  cat === c ? "border-accent bg-accent text-white" : "border-line bg-white text-slate-600 hover:border-slate-300"
                )}
              >
                {c} ({n})
              </button>
            );
          })}
        </div>
      </div>

      {/* list */}
      {filtered.length === 0 ? (
        <div className="mt-14 flex flex-col items-center rounded-2xl border border-dashed border-line bg-white/70 py-20 text-center">
          <span className="grid h-12 w-12 place-items-center rounded-xl bg-white text-slate-300">
            <SearchX className="h-5 w-5" />
          </span>
          <p className="mt-4 text-[15px] font-semibold text-ink">No opportunities match</p>
          <p className="mt-1 text-sm text-slate-400">Try a different search or category.</p>
        </div>
      ) : (
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {filtered.map((o) => (
            <Link
              key={o.id}
              href="/register"
              className="group flex h-full flex-col rounded-2xl border border-line bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_20px_44px_-24px_rgba(11,18,32,0.22)]"
            >
              <div className="flex items-center gap-2">
                <span className="rounded-md bg-accent-soft px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.06em] text-accent">
                  {o.category}
                </span>
                {o.daysLeft <= 14 && (
                  <span className="rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-semibold text-amber-600">
                    {o.daysLeft}d left
                  </span>
                )}
                {o.remote && (
                  <span className="flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-500">
                    <MapPin className="h-3 w-3" />
                    Remote OK
                  </span>
                )}
              </div>
              <h3 className="mt-4 text-[16.5px] font-semibold leading-snug tracking-tight text-ink">
                {o.title}
              </h3>
              <p className="mt-1 text-[13px] font-medium text-slate-400">{o.org}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {o.tags.map((t) => (
                  <span key={t} className="rounded-md bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-500">
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
                <div>
                  <span className="block text-[13px] font-semibold text-emerald-600">{o.reward}</span>
                  <span className="block text-[11.5px] text-slate-400">{o.deadline}</span>
                </div>
                <span className="grid h-9 w-9 place-items-center rounded-full border border-line text-slate-400 transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-white">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
