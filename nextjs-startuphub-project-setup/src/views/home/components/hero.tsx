"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";
import { HeroVisual } from "./hero-visual";
import { EASE } from "@/components/motion";

const LINE1 = ["Build.", "Protect."];
const LINE2 = ["Validate.", "Scale."];

const RAIL = [
  "Idea",
  "Incubation",
  "IPR",
  "Resources",
  "Market",
  "Funding",
  "Growth",
];

function Word({ w, i, offset }: { w: string; i: number; offset: number }) {
  const dot = w.endsWith(".");
  const core = dot ? w.slice(0, -1) : w;
  return (
    <span className="inline-block overflow-hidden pb-[0.08em]">
      <motion.span
        className="inline-block will-change-transform"
        initial={{ y: "115%" }}
        animate={{ y: 0 }}
        transition={{
          delay: 0.12 + (offset + i) * 0.09,
          duration: 1.05,
          ease: EASE,
        }}
      >
        {core}
        {dot ? <span className="text-accent">.</span> : null}{" "}
      </motion.span>
    </span>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-white">
      {/* ambient network lines, far edges */}
      <svg
        className="pointer-events-none absolute top-0 left-1/2 h-[560px] w-[1600px] -translate-x-1/2 text-line"
        viewBox="0 0 1600 560"
        fill="none"
        aria-hidden="true"
      >
        <motion.path
          d="M -40 440 C 240 300, 380 520, 640 380"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeDasharray="4 8"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.4, delay: 0.6, ease: EASE }}
        />
        <motion.path
          d="M 1640 120 C 1360 260, 1220 60, 960 190"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeDasharray="4 8"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.4, delay: 0.8, ease: EASE }}
        />
        <circle cx="640" cy="380" r="3.5" className="fill-accent/40" />
        <circle cx="960" cy="190" r="3.5" className="fill-accent/40" />
      </svg>

      <div className="relative mx-auto w-full max-w-7xl px-5 pt-36 pb-16 sm:px-8 sm:pt-40 sm:pb-24">
        <div className="text-center">
          {/* eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="inline-flex items-center gap-2.5 rounded-full border border-line bg-white py-1.5 pr-4 pl-2 shadow-hairline"
          >
            <span className="flex items-center gap-1.5 rounded-full bg-accent-soft px-2.5 py-1 font-mono text-[9.5px] font-semibold tracking-[0.16em] text-accent uppercase">
              <span className="h-1 w-1 rounded-full bg-accent" />
              Global innovation ecosystem
            </span>
            <span className="font-mono text-[10px] tracking-[0.12em] text-slate-400 uppercase">
              10K+ startups connected
            </span>
          </motion.div>

          {/* headline */}
          <h1 className="mx-auto mt-8 max-w-5xl text-[clamp(2.9rem,8.4vw,6.6rem)] leading-[0.98] font-semibold tracking-[-0.045em] text-ink">
            <span className="block">
              {LINE1.map((w, i) => (
                <Word key={w} w={w} i={i} offset={0} />
              ))}
            </span>
            <span className="block">
              {LINE2.map((w, i) => (
                <Word key={w} w={w} i={i} offset={2} />
              ))}
            </span>
          </h1>

          {/* subcopy */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.9, ease: EASE }}
            className="mx-auto mt-7 max-w-xl text-[17px] leading-relaxed text-slate-500 sm:text-[18.5px]"
          >
            One connected ecosystem for every stage of your startup journey.
          </motion.p>

          {/* lifecycle rail */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.68, duration: 0.9, ease: EASE }}
            className="mx-auto mt-6 flex max-w-2xl flex-wrap items-center justify-center gap-x-1.5 gap-y-2"
          >
            {RAIL.map((step, i) => (
              <span key={step} className="flex items-center gap-1.5">
                <span
                  className={`font-mono text-[10.5px] font-medium tracking-[0.14em] uppercase transition-colors duration-300 sm:text-[11px] ${
                    step === "IPR"
                      ? "text-accent"
                      : "text-slate-400 hover:text-slate-500"
                  }`}
                >
                  {step}
                </span>
                {i < RAIL.length - 1 && (
                  <ChevronRight className="h-3 w-3 text-line" />
                )}
              </span>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.9, ease: EASE }}
            className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <a
              href="#cta"
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-7 py-3.5 text-[15px] font-semibold text-white shadow-[0_1px_2px_rgba(49,87,232,0.4)] transition-all duration-300 hover:bg-accent-deep hover:shadow-[0_10px_30px_rgba(49,87,232,0.35)] sm:w-auto"
            >
              Start your journey
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="#platform"
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-line bg-white px-7 py-3.5 text-[15px] font-semibold text-ink transition-all duration-300 hover:border-slate-500/40 hover:bg-soft sm:w-auto"
            >
              Explore StartupHub
            </a>
          </motion.div>
        </div>

        {/* product UI visual */}
        <div className="mt-16 sm:mt-24">
          <HeroVisual />
        </div>

        {/* trust strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="mt-16 sm:mt-20"
        >
          <p className="text-center font-mono text-[10px] tracking-[0.22em] text-slate-400 uppercase">
            Trusted across the innovation economy
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {[
              "NOVARA CAPITAL",
              "ATLAS LABS",
              "FRONTIER FUND",
              "INCUBATE·IO",
              "MERIDIAN BANK",
              "STATE INNOVATION MISSION",
            ].map((n) => (
              <span
                key={n}
                className="text-[12.5px] font-semibold tracking-[0.18em] text-slate-400/80 transition-colors duration-300 hover:text-slate-500"
              >
                {n}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
