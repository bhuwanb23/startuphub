"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Plus } from "lucide-react";
import { useState } from "react";
import { SectionHead } from "@/components/ui";
import { PLATFORM_PILLARS } from "../constants/lifecycle";

export function Platform() {
  const [open, setOpen] = useState(0);

  return (
    <section className="border-y border-line bg-soft py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHead
          eyebrow="The Platform"
          title="One platform. Every critical connection."
          lead="Five integrated systems working as one — so progress in one area compounds across all the others."
        />

        <div className="mt-14">
          {PLATFORM_PILLARS.map((pillar, i) => {
            const isOpen = open === i;
            return (
              <div key={pillar.title} className="border-t border-line last:border-b">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="group grid w-full grid-cols-[auto_1fr_auto] items-center gap-x-5 py-7 text-left sm:grid-cols-[64px_260px_1fr_auto] sm:gap-x-8"
                >
                  <span
                    className={`text-[13px] font-semibold tracking-[0.14em] transition-colors ${
                      isOpen ? "text-accent" : "text-slate-400"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`text-2xl font-semibold tracking-[-0.02em] transition-colors duration-300 sm:text-[2rem] ${
                      isOpen ? "text-accent" : "text-ink group-hover:text-accent"
                    }`}
                  >
                    {pillar.title}
                  </span>
                  <span className="hidden max-w-md text-[15px] leading-relaxed text-slate-500 sm:block">
                    {pillar.tagline}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className={`grid h-9 w-9 place-items-center rounded-full border transition-colors ${
                      isOpen
                        ? "border-accent bg-accent text-white"
                        : "border-line bg-white text-slate-500 group-hover:border-accent/30 group-hover:text-accent"
                    }`}
                  >
                    <Plus className="h-4 w-4" strokeWidth={2.2} />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="grid gap-6 pb-9 sm:grid-cols-[64px_1fr] sm:gap-x-8">
                        <span className="hidden sm:block" />
                        <div>
                          <p className="text-[15px] leading-relaxed text-slate-500 sm:hidden">
                            {pillar.tagline}
                          </p>
                          <div className="mt-2 flex flex-wrap gap-2 sm:mt-0">
                            {pillar.modules.map((m) => (
                              <span
                                key={m}
                                className="rounded-full border border-line bg-white px-3.5 py-1.5 text-[12.5px] font-medium text-ink shadow-[0_1px_2px_rgba(11,18,32,0.03)]"
                              >
                                {m}
                              </span>
                            ))}
                          </div>
                          <a
                            href={`/platform`}
                            className="group/link mt-5 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-accent"
                          >
                            Explore {pillar.title}
                            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
