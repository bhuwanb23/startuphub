"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import { news, newsCategories } from "@/views/news/constants/news";
import { cn } from "@/lib/utils";

export default function NewsClient() {
  const [cat, setCat] = useState("");
  const featured = news.find((n) => n.featured)!;

  const filtered = useMemo(
    () => news.filter((n) => !n.featured && (!cat || n.category === cat)),
    [cat]
  );

  return (
    <>
      {/* featured */}
      <article className="group relative cursor-pointer overflow-hidden rounded-3xl border border-line bg-ink p-8 text-white transition-all duration-300 hover:shadow-[0_32px_64px_-32px_rgba(11,18,32,0.5)] md:p-11">
        <div className="bg-nodegrid absolute inset-0 opacity-20" aria-hidden="true" />
        <div className="relative max-w-2xl">
          <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em]">
            <span className="rounded-md bg-accent px-2.5 py-1 text-white">Top story</span>
            <span className="text-slate-400">{featured.category}</span>
            <span className="text-slate-500">·</span>
            <span className="text-slate-400">{featured.date}</span>
          </div>
          <h2 className="mt-5 text-balance text-[clamp(1.5rem,3vw,2.2rem)] font-semibold leading-[1.12] tracking-[-0.02em]">
            {featured.title}
          </h2>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-slate-300">{featured.excerpt}</p>
          <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white">
            Read the analysis
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </article>

      {/* filters */}
      <div className="mt-10 flex flex-wrap gap-2">
        <FilterPill label="All updates" active={cat === ""} onClick={() => setCat("")} />
        {newsCategories.map((c) => (
          <FilterPill key={c} label={c} active={cat === c} onClick={() => setCat((v) => (v === c ? "" : c))} />
        ))}
      </div>

      {/* list */}
      <div className="mt-8 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-white">
        {filtered.map((n) => (
          <article
            key={n.id}
            className="group grid cursor-pointer gap-3 px-5 py-5 transition-colors hover:bg-slate-50 md:grid-cols-[120px_1fr_auto] md:items-center md:gap-6 md:px-7 md:py-6"
          >
            <div className="flex items-center gap-2 md:flex-col md:items-start md:gap-1">
              <span className="text-[12px] font-semibold text-slate-400">{n.date}</span>
              <span className="w-fit rounded-md bg-accent-soft px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-accent">
                {n.category}
              </span>
            </div>
            <div className="min-w-0">
              <h3 className="text-[15.5px] font-semibold leading-snug text-ink">{n.title}</h3>
              <p className="mt-1 line-clamp-2 text-[13.5px] leading-relaxed text-slate-500">{n.excerpt}</p>
              <p className="mt-1.5 text-[11.5px] font-medium text-slate-300">
                {n.source} · {n.read} read
              </p>
            </div>
            <ChevronRight className="hidden h-4 w-4 text-slate-300 transition-colors group-hover:text-accent md:block" />
          </article>
        ))}
      </div>
    </>
  );
}

function FilterPill({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-full border px-3.5 py-2 text-[13px] font-medium transition-all",
        active ? "border-accent bg-accent text-white" : "border-line bg-white text-slate-600 hover:border-slate-300"
      )}
    >
      {label}
    </button>
  );
}
