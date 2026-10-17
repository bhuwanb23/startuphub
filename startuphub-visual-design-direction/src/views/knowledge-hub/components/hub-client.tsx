"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight, Download, Search, SearchX } from "lucide-react";
import {
  contents,
  contentTypes,
  templates,
} from "@/views/knowledge-hub/constants/content";
import { cn } from "@/lib/utils";

const levelDot: Record<string, string> = {
  Foundations: "bg-emerald-400",
  Intermediate: "bg-amber-400",
  Advanced: "bg-accent",
};

export default function HubClient() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return contents.filter((c) => {
      if (type && c.type !== type) return false;
      if (!q) return true;
      return [c.title, c.desc, c.type].join(" ").toLowerCase().includes(q);
    });
  }, [query, type]);

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="relative max-w-xl">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search guides, playbooks, research…"
            className="h-12 w-full rounded-xl border border-line bg-white pl-11 pr-4 text-sm text-ink placeholder:text-slate-400 shadow-[0_8px_28px_-18px_rgba(11,18,32,0.18)] focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/15"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <FilterPill active={type === ""} onClick={() => setType("")} label={`All (${contents.length})`} />
          {contentTypes.map((t) => {
            const n = contents.filter((c) => c.type === t).length;
            if (n === 0) return null;
            return (
              <FilterPill
                key={t}
                active={type === t}
                onClick={() => setType((v) => (v === t ? "" : t))}
                label={`${t} (${n})`}
              />
            );
          })}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="mt-14 flex flex-col items-center rounded-2xl border border-dashed border-line bg-white/70 py-20 text-center">
          <span className="grid h-12 w-12 place-items-center rounded-xl bg-white text-slate-300">
            <SearchX className="h-5 w-5" />
          </span>
          <p className="mt-4 text-[15px] font-semibold text-ink">Nothing matches that search</p>
          <p className="mt-1 text-sm text-slate-400">Try a broader term or a different category.</p>
        </div>
      ) : (
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((c) => (
            <article
              key={c.id}
              className="group flex h-full cursor-pointer flex-col rounded-2xl border border-line bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_20px_44px_-24px_rgba(11,18,32,0.22)]"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-md bg-accent-soft px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-[0.08em] text-accent">
                  {c.type}
                </span>
                <span className="flex items-center gap-1.5 text-[11px] font-medium text-slate-400">
                  <span className={cn("h-1.5 w-1.5 rounded-full", levelDot[c.level])} />
                  {c.level}
                </span>
              </div>
              <h3 className="mt-4 text-[16px] font-semibold leading-snug tracking-tight text-ink">
                {c.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-500">{c.desc}</p>
              <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
                <span className="text-[12px] text-slate-400">{c.meta}</span>
                <span className="flex items-center gap-1 text-[12.5px] font-semibold text-slate-400 transition-colors group-hover:text-accent">
                  Read
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* templates */}
      <div className="mt-20">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">Templates</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-ink">
              Steal our best starting points.
            </h2>
          </div>
          <span className="hidden text-sm font-medium text-slate-400 sm:block">Free for members</span>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {templates.map((t) => (
            <div
              key={t.title}
              className="group flex cursor-pointer items-start gap-4 rounded-2xl border border-line bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_-20px_rgba(11,18,32,0.2)]"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-ink text-white">
                <Download className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <h3 className="text-[14.5px] font-semibold leading-snug text-ink">{t.title}</h3>
                <p className="mt-1 text-[12.5px] leading-snug text-slate-500">{t.desc}</p>
                <p className="mt-2 text-[11px] font-medium text-slate-300">{t.kind}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function FilterPill({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
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
