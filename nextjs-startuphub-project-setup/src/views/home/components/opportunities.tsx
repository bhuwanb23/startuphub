"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, CalendarClock } from "lucide-react";
import { useState } from "react";
import type { OpportunityItem } from "@/lib/data";
import { EASE, Reveal, SectionHeader } from "@/components/motion";

const FILTERS = ["All", "Funding", "Incubation", "Challenge"] as const;

const KIND_STYLES: Record<string, { dot: string; pill: string }> = {
  Funding: { dot: "bg-accent", pill: "bg-accent-soft text-accent" },
  Incubation: { dot: "bg-ink", pill: "bg-ink/5 text-ink" },
  Challenge: { dot: "bg-amber-dim", pill: "bg-amber-tint text-amber-dim" },
};

export function Opportunities({ items }: { items: OpportunityItem[] }) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");

  const visible =
    filter === "All" ? items : items.filter((o) => o.kind === filter);

  return (
    <section id="opportunities" className="border-t border-line bg-white">
      <div className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeader
            eyebrow="Live now"
            title="Opportunities, in one place."
            lede="Funding windows, incubation cohorts and national challenges — filtered to what fits your stage."
          />
        </div>

        {/* filter bar */}
        <Reveal className="mt-10 flex flex-wrap items-center gap-2">
          {FILTERS.map((f) => {
            const count =
              f === "All" ? items.length : items.filter((o) => o.kind === f).length;
            const isActive = filter === f;
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`relative flex items-center gap-2 rounded-full border px-4 py-2 text-[13px] font-semibold transition-all duration-300 ${
                  isActive
                    ? "border-accent bg-accent text-white shadow-[0_4px_14px_rgba(49,87,232,0.3)]"
                    : "border-line bg-white text-slate-500 hover:border-slate-500/40 hover:text-ink"
                }`}
              >
                {f}
                <span
                  className={`font-mono text-[10px] ${
                    isActive ? "text-white/70" : "text-slate-400"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </Reveal>

        {/* list */}
        <div className="mt-8 border-t border-line">
          <AnimatePresence mode="popLayout">
            {visible.map((o) => {
              const style = KIND_STYLES[o.kind] ?? KIND_STYLES.Funding;
              return (
                <motion.a
                  layout
                  key={o.id}
                  href="#cta"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="group grid items-center gap-3 border-b border-line py-5 transition-colors duration-300 hover:bg-soft/60 sm:grid-cols-[190px_1fr_auto] sm:gap-6 sm:px-3"
                >
                  <span
                    className={`flex w-fit items-center gap-2 rounded-md px-2.5 py-1.5 font-mono text-[9.5px] font-semibold tracking-[0.12em] uppercase ${style.pill}`}
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
                    {o.kind}
                  </span>

                  <span>
                    <span className="block text-[15.5px] font-semibold tracking-tight text-ink transition-colors duration-300 group-hover:text-accent">
                      {o.title}
                    </span>
                    <span className="mt-0.5 block text-[12.5px] text-slate-500">
                      {o.org} · {o.meta}
                    </span>
                  </span>

                  <span className="flex items-center justify-between gap-4 sm:justify-end sm:gap-6">
                    <span className="flex items-center gap-1.5 font-mono text-[10.5px] tracking-[0.06em] text-slate-400 uppercase">
                      <CalendarClock className="h-3.5 w-3.5" />
                      {o.deadline}
                    </span>
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-white text-slate-400 transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-white">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </span>
                </motion.a>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
