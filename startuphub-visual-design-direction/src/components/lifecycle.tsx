"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Container, SectionHead } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { cn } from "@/lib/utils";

const stages = [
  { n: "01", name: "Idea", line: "Every venture starts with a spark.", flow: "Discover → Shape → Commit" },
  { n: "02", name: "Validation", line: "Pressure-test the idea before you invest in it.", flow: "Research → Interview → Evidence" },
  { n: "03", name: "Incubation", line: "Structure, mentors and momentum in one place.", flow: "Mentors → Milestones → Cohort" },
  { n: "04", name: "IPR", line: "Protect what makes you different.", flow: "Protect → Manage → Commercialize" },
  { n: "05", name: "Resources", line: "The right tool at exactly the right time.", flow: "Credits → Templates → Talent" },
  { n: "06", name: "MVP", line: "Ship the smallest thing that truly matters.", flow: "Scope → Build → Learn" },
  { n: "07", name: "Market", line: "Find your first true believers.", flow: "Position → Launch → Convert" },
  { n: "08", name: "Funding", line: "The right capital at the right stage.", flow: "Prepare → Match → Close" },
  { n: "09", name: "Growth", line: "Turn early traction into a repeatable rhythm.", flow: "Measure → Optimize → Compound" },
  { n: "10", name: "Scale", line: "From promising company to lasting institution.", flow: "Expand → Systematize → Endure" },
];

export default function Lifecycle() {
  const [active, setActive] = useState(3); // IPR highlighted by default
  const stage = stages[active];

  return (
    <section id="lifecycle" className="border-t border-line bg-white py-24 md:py-32">
      <Container>
        <SectionHead
          eyebrow="Startup Lifecycle"
          title={
            <>
              From first idea to <span className="text-accent">lasting impact.</span>
            </>
          }
          lead="Ten stages, one continuous path. Hover any stage to see how StartupHub moves you forward."
        />

        <Reveal delay={0.1} className="mt-14 md:mt-16">
          {/* active stage panel */}
          <div className="relative mx-auto flex min-h-[132px] max-w-2xl items-center justify-center overflow-hidden rounded-2xl border border-line bg-accent-mist px-6 py-7 text-center md:min-h-[148px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={stage.n}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="flex flex-col items-center"
              >
                <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
                  Stage {stage.n} — {stage.flow}
                </span>
                <span className="mt-2 text-xl font-semibold tracking-tight text-ink md:text-2xl">
                  {stage.line}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* desktop track */}
          <div className="relative mt-10 hidden md:block">
            {/* base + progress line */}
            <div className="absolute left-0 right-0 top-[5px] h-px bg-line" aria-hidden="true" />
            <div
              className="absolute left-0 top-[5px] h-px bg-accent transition-all duration-500 ease-out"
              style={{ width: `${(active / (stages.length - 1)) * 100}%` }}
              aria-hidden="true"
            />
            <div className="grid grid-cols-10">
              {stages.map((s, i) => (
                <button
                  key={s.n}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className="group flex flex-col items-center gap-3 outline-none"
                >
                  <span
                    className={cn(
                      "h-[11px] w-[11px] rounded-full border-2 transition-all duration-300",
                      i < active
                        ? "border-accent bg-accent"
                        : i === active
                          ? "scale-125 border-accent bg-white ring-4 ring-accent/15"
                          : "border-slate-300 bg-white group-hover:border-slate-400"
                    )}
                  />
                  <span
                    className={cn(
                      "text-[10px] font-semibold uppercase tracking-[0.14em] transition-colors",
                      i === active ? "text-accent" : "text-slate-300"
                    )}
                  >
                    {s.n}
                  </span>
                  <span
                    className={cn(
                      "text-[12.5px] font-medium transition-colors",
                      i === active ? "text-ink" : "text-slate-400 group-hover:text-slate-600"
                    )}
                  >
                    {s.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* mobile list */}
          <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-1 md:hidden">
            {stages.map((s, i) => (
              <button
                key={s.n}
                onClick={() => setActive(i)}
                className={cn(
                  "flex items-center gap-2.5 rounded-lg px-2 py-2 text-left transition-colors",
                  i === active ? "bg-accent-soft" : "hover:bg-slate-50"
                )}
              >
                <span
                  className={cn(
                    "text-[10px] font-bold tabular-nums",
                    i === active ? "text-accent" : "text-slate-300"
                  )}
                >
                  {s.n}
                </span>
                <span
                  className={cn(
                    "text-[13px] font-medium",
                    i === active ? "text-ink" : "text-slate-500"
                  )}
                >
                  {s.name}
                </span>
              </button>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
