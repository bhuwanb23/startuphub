"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { SectionHead } from "@/components/ui";
import { LIFECYCLE_STAGES } from "../constants/lifecycle";

export function Lifecycle() {
  const [active, setActive] = useState(0);
  const locked = useRef(false);

  useEffect(() => {
    const id = setInterval(() => {
      if (!locked.current) setActive((a) => (a + 1) % LIFECYCLE_STAGES.length);
    }, 4200);
    return () => clearInterval(id);
  }, []);

  const stage = LIFECYCLE_STAGES[active];

  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHead
          eyebrow="The Journey"
          title="From first idea to lasting impact."
          lead="Ten stages, one continuous system. Hover any stage to see how StartupHub carries you through it."
        />

        <div
          className="mt-14"
          onMouseEnter={() => (locked.current = true)}
          onMouseLeave={() => (locked.current = false)}
        >
          {/* stage strip */}
          <div className="scroll-quiet -mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
            <div className="flex min-w-max border-b border-line">
              {LIFECYCLE_STAGES.map((s, i) => {
                const isActive = i === active;
                return (
                  <button
                    key={s.label}
                    type="button"
                    onMouseEnter={() => {
                      locked.current = true;
                      setActive(i);
                    }}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    className="group relative min-w-[128px] px-4 pb-5 pt-2 text-left first:pl-0"
                  >
                    <span
                      className={`block text-[11px] font-semibold tracking-[0.14em] transition-colors ${
                        isActive ? "text-accent" : "text-slate-400 group-hover:text-slate-500"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`mt-1.5 block text-[15px] font-semibold tracking-tight transition-colors ${
                        isActive ? "text-ink" : "text-slate-500 group-hover:text-ink"
                      }`}
                    >
                      {s.label}
                    </span>
                    <span
                      className={`absolute inset-x-0 -bottom-px h-[2px] origin-left bg-accent transition-transform duration-500 ${
                        isActive ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* detail panel */}
          <div className="relative mt-10 overflow-hidden rounded-2xl border border-line bg-soft">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="relative grid gap-8 p-8 sm:p-10 md:grid-cols-[auto_1fr] md:gap-14"
              >
                <span className="select-none text-[5rem] font-semibold leading-none tracking-[-0.04em] text-accent/15 sm:text-[7rem]">
                  {String(active + 1).padStart(2, "0")}
                </span>
                <div className="max-w-xl self-center">
                  <h3 className="text-2xl font-semibold tracking-tight text-ink">
                    {stage.label}
                  </h3>
                  <p className="mt-3 text-[15.5px] leading-relaxed text-slate-500">
                    {stage.blurb}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {stage.modules.map((m) => (
                      <span
                        key={m}
                        className="rounded-full border border-line bg-white px-3.5 py-1.5 text-[12.5px] font-medium text-ink"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            <motion.div
              key={`bar-${active}`}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: locked ? 0 : 1 }}
              transition={{ duration: 4.2, ease: "linear" }}
              className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-accent/30"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
