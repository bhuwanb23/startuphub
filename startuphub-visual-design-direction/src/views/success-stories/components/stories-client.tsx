"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight, Quote } from "lucide-react";
import Link from "next/link";
import { stories, storyCategories } from "@/views/success-stories/constants/stories";
import { cn } from "@/lib/utils";

export default function StoriesClient() {
  const [cat, setCat] = useState("");

  const filtered = useMemo(
    () => (cat ? stories.filter((s) => s.category === cat) : stories),
    [cat]
  );

  return (
    <>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setCat("")}
          className={cn(
            "rounded-full border px-3.5 py-2 text-[13px] font-medium transition-all",
            cat === "" ? "border-accent bg-accent text-white" : "border-line bg-white text-slate-600 hover:border-slate-300"
          )}
        >
          All stories ({stories.length})
        </button>
        {storyCategories.map((c) => {
          const n = stories.filter((s) => s.category === c).length;
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

      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((s) => {
          const inner = (
            <>
              <div className="flex items-center justify-between">
                <span className="rounded-md bg-accent-soft px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-[0.08em] text-accent">
                  {s.category}
                </span>
                <span className="text-[11.5px] text-slate-300">{s.readTime}</span>
              </div>
              <Quote className="mt-5 h-5 w-5 text-accent/25" />
              <blockquote className="mt-3 flex-1 text-[14.5px] leading-relaxed text-slate-600">
                &ldquo;{s.quote}&rdquo;
              </blockquote>
              <div className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent-soft text-[12px] font-bold text-accent">
                  {s.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-ink">{s.name}</p>
                  <p className="truncate text-[12px] text-slate-400">
                    {s.role} · {s.company}
                  </p>
                </div>
                <span className="ml-auto shrink-0 text-right">
                  <span className="block text-[14px] font-semibold text-accent tabular-nums">{s.metric.v}</span>
                  <span className="block max-w-[72px] text-[10px] leading-tight text-slate-400">{s.metric.l}</span>
                </span>
              </div>
            </>
          );
          const cls =
            "group flex h-full flex-col rounded-2xl border border-line bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_20px_44px_-24px_rgba(11,18,32,0.22)]";
          return s.slug ? (
            <Link key={`${s.name}-${s.category}`} href={`/explore/startups/${s.slug}`} className={cls}>
              {inner}
            </Link>
          ) : (
            <div key={`${s.name}-${s.category}`} className={cls}>{inner}</div>
          );
        })}
      </div>

      <p className="mt-12 flex items-center justify-center gap-2 text-[13px] text-slate-400">
        New stories published every week
        <ArrowUpRight className="h-3.5 w-3.5 text-accent" />
      </p>
    </>
  );
}
