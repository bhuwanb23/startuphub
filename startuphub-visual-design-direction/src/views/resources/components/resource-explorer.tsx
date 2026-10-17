"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight, Search, SearchX } from "lucide-react";
import Link from "next/link";
import { categories, resources } from "@/views/resources/constants/resources";
import { cn } from "@/lib/utils";

export default function ResourceExplorer() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return resources.filter((r) => {
      if (cat && r.category !== cat) return false;
      if (!q) return true;
      return [r.title, r.provider, r.desc, r.category].join(" ").toLowerCase().includes(q);
    });
  }, [query, cat]);

  return (
    <>
      {/* search + categories */}
      <div className="flex flex-col gap-5">
        <div className="relative max-w-xl">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search credits, labs, grants, tools…"
            className="h-12 w-full rounded-xl border border-line bg-white pl-11 pr-4 text-sm text-ink placeholder:text-slate-400 shadow-[0_8px_28px_-18px_rgba(11,18,32,0.18)] focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/15"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setCat("")}
            className={cn(
              "rounded-full border px-3.5 py-2 text-[13px] font-medium transition-all",
              cat === "" ? "border-accent bg-accent text-white" : "border-line bg-white text-slate-600 hover:border-slate-300"
            )}
          >
            All resources
          </button>
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCat((v) => (v === c ? "" : c))}
              className={cn(
                "rounded-full border px-3.5 py-2 text-[13px] font-medium transition-all",
                cat === c ? "border-accent bg-accent text-white" : "border-line bg-white text-slate-600 hover:border-slate-300"
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* grid */}
      {filtered.length === 0 ? (
        <div className="mt-14 flex flex-col items-center rounded-2xl border border-dashed border-line bg-white/70 py-20 text-center">
          <span className="grid h-12 w-12 place-items-center rounded-xl bg-white text-slate-300">
            <SearchX className="h-5 w-5" />
          </span>
          <p className="mt-4 text-[15px] font-semibold text-ink">No resources match</p>
          <p className="mt-1 text-sm text-slate-400">Try a different search or category.</p>
        </div>
      ) : (
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((r) => (
            <Link
              key={r.id}
              href="/register"
              className="group flex h-full flex-col rounded-2xl border border-line bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_20px_44px_-24px_rgba(11,18,32,0.22)]"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-md bg-accent-soft px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-accent">
                  {r.category}
                </span>
                <span className="text-[12px] font-semibold text-emerald-600">{r.value}</span>
              </div>
              <h3 className="mt-4 text-[16px] font-semibold tracking-tight text-ink">{r.title}</h3>
              <p className="mt-0.5 text-[12.5px] font-medium text-slate-400">{r.provider}</p>
              <p className="mt-2.5 flex-1 text-sm leading-relaxed text-slate-500">{r.desc}</p>
              <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
                <span className="text-[12px] text-slate-400">Unlocks at {r.stage}</span>
                <span className="flex items-center gap-1 text-[12.5px] font-semibold text-slate-400 transition-colors group-hover:text-accent">
                  Claim
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
