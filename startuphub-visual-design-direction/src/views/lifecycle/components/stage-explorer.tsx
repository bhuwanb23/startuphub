"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, CircleDot } from "lucide-react";
import Link from "next/link";
import { Container, SectionHead } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { lifecycleStages } from "@/views/lifecycle/constants/stages";
import { useActiveIndex } from "@/views/home/hooks/use-active-index";
import { cn } from "@/lib/utils";

export default function StageExplorer() {
  const { active, activate } = useActiveIndex(3);
  const stage = lifecycleStages[active];

  return (
    <section className="border-t border-line bg-soft py-24 md:py-32">
      <Container>
        <SectionHead
          eyebrow="Each Stage, Explained"
          title={
            <>
              What actually happens <span className="text-accent">at every stage.</span>
            </>
          }
          lead="Pick a stage on the left — see the work, and exactly how StartupHub helps you do it."
        />

        <div className="mt-14 grid gap-6 md:mt-16 lg:grid-cols-[380px_1fr]">
          {/* stage list */}
          <Reveal>
            <div className="flex gap-2 overflow-x-auto pb-2 lg:max-h-[520px] lg:flex-col lg:overflow-y-auto lg:overflow-x-hidden lg:pb-0 lg:pr-2">
              {lifecycleStages.map((s, i) => (
                <button
                  key={s.n}
                  onClick={() => activate(i)}
                  onMouseEnter={() => activate(i)}
                  className={cn(
                    "flex min-w-[200px] items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all lg:min-w-0",
                    i === active
                      ? "border-accent/30 bg-white shadow-[0_10px_28px_-14px_rgba(49,87,232,0.4)]"
                      : "border-line bg-white/60 hover:border-slate-300 hover:bg-white"
                  )}
                >
                  <span
                    className={cn(
                      "text-[11px] font-bold tabular-nums",
                      i === active ? "text-accent" : "text-slate-300"
                    )}
                  >
                    {s.n}
                  </span>
                  <span className="min-w-0">
                    <span
                      className={cn(
                        "block truncate text-sm font-semibold",
                        i === active ? "text-ink" : "text-slate-600"
                      )}
                    >
                      {s.name}
                    </span>
                    <span className="block truncate text-[12px] text-slate-400">{s.tagline}</span>
                  </span>
                  {i === active && <CircleDot className="ml-auto h-4 w-4 shrink-0 text-accent" />}
                </button>
              ))}
            </div>
          </Reveal>

          {/* detail */}
          <Reveal delay={0.08}>
            <div className="flex min-h-[520px] flex-col rounded-2xl border border-line bg-white p-7 shadow-[0_24px_56px_-32px_rgba(11,18,32,0.2)] md:p-9">
              <AnimatePresence mode="wait">
                <motion.div
                  key={stage.n}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                  className="flex flex-1 flex-col"
                >
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-lg bg-accent px-2.5 py-1 text-[12px] font-bold tabular-nums text-white">
                      {stage.n}
                    </span>
                    <h3 className="text-2xl font-semibold tracking-tight text-ink">{stage.name}</h3>
                    <span className="ml-auto rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold text-slate-500">
                      {stage.metric.value} {stage.metric.label}
                    </span>
                  </div>
                  <p className="mt-1.5 text-[15px] font-medium text-accent">{stage.tagline}</p>
                  <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-slate-500">
                    {stage.desc}
                  </p>

                  <div className="mt-8 grid gap-8 md:grid-cols-2">
                    <div>
                      <h4 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                        The work
                      </h4>
                      <ul className="mt-4 space-y-2.5">
                        {stage.activities.map((a) => (
                          <li key={a} className="flex items-start gap-2.5 text-sm text-slate-600">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-300" />
                            {a}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
                        How StartupHub helps
                      </h4>
                      <ul className="mt-4 space-y-2.5">
                        {stage.helps.map((h) => (
                          <li key={h} className="flex items-start gap-2.5 text-sm font-medium text-ink">
                            <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent-soft text-accent">
                              <Check className="h-3 w-3" />
                            </span>
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-auto flex items-center justify-between border-t border-line pt-6">
                    <span className="text-[13px] text-slate-400">
                      Stage {stage.n} of 11
                    </span>
                    {active < lifecycleStages.length - 1 ? (
                      <button
                        onClick={() => activate(active + 1)}
                        className="group inline-flex items-center gap-1.5 text-sm font-semibold text-accent"
                      >
                        Next: {lifecycleStages[active + 1].name}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </button>
                    ) : (
                      <Link href="/register" className="group inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                        Start your own journey
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </Link>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
