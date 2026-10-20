"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { useState } from "react";
import { Eyebrow, Logo } from "@/components/ui";
import { ECOSYSTEM_PILLARS, type EcosystemPillar } from "../constants/ecosystem";

export function EcosystemMap() {
  const [active, setActive] = useState<EcosystemPillar>(ECOSYSTEM_PILLARS[0]);
  const ActiveIcon = active.icon;

  return (
    <section className="border-b border-line bg-accent-mist/70 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          {/* heading + map */}
          <div>
            <Eyebrow>The Ecosystem</Eyebrow>
            <h2 className="mt-5 text-balance text-[clamp(1.9rem,3.6vw,2.9rem)] font-semibold leading-[1.08] tracking-[-0.025em] text-ink">
              Your startup doesn&apos;t grow alone.
            </h2>
            <p className="mt-4 max-w-md text-pretty text-[16px] leading-relaxed text-slate-500">
              Seven pillars, orchestrated around a single center of gravity — your
              company. Select any node to see what flows through it.
            </p>

            {/* map */}
            <div className="relative mx-auto mt-10 aspect-square w-full max-w-[480px]">
              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="absolute inset-0 h-full w-full"
                aria-hidden
              >
                {ECOSYSTEM_PILLARS.map((p) => {
                  const isActive = p.id === active.id;
                  return (
                    <line
                      key={p.id}
                      x1="50"
                      y1="50"
                      x2={p.x}
                      y2={p.y}
                      stroke={isActive ? "#3157E8" : "#c7d4f6"}
                      strokeWidth={isActive ? 2 : 1.25}
                      vectorEffect="non-scaling-stroke"
                      strokeDasharray={isActive ? "none" : "3 4"}
                      strokeLinecap="round"
                      className="transition-all duration-500"
                    />
                  );
                })}
                {ECOSYSTEM_PILLARS.map((p) =>
                  p.id === active.id ? (
                    <circle key={`pulse-${p.id}`} r="1.6" fill="#3157E8">
                      <animateMotion
                        dur="1.6s"
                        repeatCount="indefinite"
                        path={`M50,50 L${p.x},${p.y}`}
                      />
                    </circle>
                  ) : null,
                )}
              </svg>

              {/* center */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <motion.div
                  animate={{ scale: [1, 1.03, 1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="flex flex-col items-center gap-2 rounded-2xl border border-accent/25 bg-white px-5 py-4 shadow-lift"
                >
                  <Logo className="h-9 w-9" />
                  <span className="whitespace-nowrap text-[9.5px] font-semibold tracking-[0.18em] text-accent">
                    YOUR STARTUP
                  </span>
                </motion.div>
              </div>

              {/* satellites */}
              {ECOSYSTEM_PILLARS.map((p) => {
                const isActive = p.id === active.id;
                const Icon = p.icon;
                return (
                  <div
                    key={p.id}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${p.x}%`, top: `${p.y}%` }}
                  >
                    <button
                      type="button"
                      onClick={() => setActive(p)}
                      aria-pressed={isActive}
                      className="group flex flex-col items-center gap-1.5"
                    >
                      <span
                        className={`grid h-11 w-11 place-items-center rounded-xl border bg-white transition-all duration-300 sm:h-12 sm:w-12 ${
                          isActive
                            ? "border-accent text-accent shadow-[0_0_0_4px_rgba(49,87,232,0.12),0_12px_24px_-10px_rgba(49,87,232,0.35)]"
                            : "border-line text-slate-400 shadow-card group-hover:border-accent/30 group-hover:text-accent"
                        }`}
                      >
                        <Icon className="h-4.5 w-4.5 sm:h-5 sm:w-5" strokeWidth={2} />
                      </span>
                      <span
                        className={`whitespace-nowrap text-[10px] font-semibold tracking-wide transition-colors ${
                          isActive ? "text-accent" : "text-slate-500 group-hover:text-ink"
                        }`}
                      >
                        {p.label}
                      </span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* detail card */}
          <div className="rounded-2xl border border-line bg-white p-8 shadow-lift sm:p-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                    Ecosystem Pillar
                  </span>
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent-soft text-accent">
                    <ActiveIcon className="h-5 w-5" strokeWidth={2} />
                  </span>
                </div>
                <h3 className="mt-5 text-[1.7rem] font-semibold tracking-tight text-ink">
                  {active.label}
                </h3>
                <p className="mt-3 text-[15.5px] leading-relaxed text-slate-500">
                  {active.blurb}
                </p>

                <div className="mt-7 border-t border-line pt-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                    What flows to you
                  </p>
                  <ul className="mt-4 space-y-3">
                    {active.brings.map((b) => (
                      <li key={b} className="flex items-center gap-3 text-[14.5px] font-medium text-ink">
                        <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent-soft text-accent">
                          <Check className="h-3 w-3" strokeWidth={3} />
                        </span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 flex flex-wrap items-end justify-between gap-4 rounded-xl bg-soft px-5 py-4">
                  <div>
                    <p className="text-2xl font-semibold tracking-tight text-ink">
                      {active.metric.value}
                    </p>
                    <p className="mt-0.5 max-w-[220px] text-[12px] leading-snug text-slate-500">
                      {active.metric.label}
                    </p>
                  </div>
                  <a
                    href="/register"
                    className="group inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-accent"
                  >
                    {active.cta}
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
