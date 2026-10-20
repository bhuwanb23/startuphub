"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { TrustStrip } from "@/components/trust-strip";
import {
  ANNOUNCEMENT,
  HEADLINE_WORDS,
  HERO_LEAD,
  JOURNEY_STEPS,
  TRUSTED_NAMES,
} from "../constants/hero";
import { EcosystemDiagram } from "./ecosystem-diagram";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.2 } },
};

const word: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
  },
};

const rise: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: 0.65 + i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-nodegrid" aria-hidden />
      <div
        className="absolute -top-40 left-1/2 -z-10 h-80 w-[46rem] -translate-x-1/2 rounded-full bg-accent/[0.06] blur-3xl"
        aria-hidden
      />

      <div className="mx-auto max-w-7xl px-5 pb-16 pt-36 sm:px-8 sm:pt-44">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              href={ANNOUNCEMENT.href}
              className="group inline-flex items-center gap-2.5 rounded-full border border-line bg-white py-1 pl-1 pr-3.5 shadow-card transition hover:border-accent/30"
            >
              <span className="rounded-full bg-accent-soft px-2.5 py-0.5 text-[11px] font-semibold text-accent">
                {ANNOUNCEMENT.badge}
              </span>
              <span className="text-[12.5px] font-medium text-slate-500 transition-colors group-hover:text-ink">
                {ANNOUNCEMENT.text}
              </span>
              <ArrowRight className="h-3.5 w-3.5 text-slate-400 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </motion.div>

          <motion.h1
            variants={container}
            initial="hidden"
            animate="show"
            className="mt-7 text-balance text-[2.65rem] font-semibold leading-[1.05] tracking-[-0.035em] text-ink sm:text-6xl lg:text-[4.5rem]"
          >
            {HEADLINE_WORDS.map((w, i) => (
              <motion.span
                key={w}
                variants={word}
                className={`inline-block ${i < HEADLINE_WORDS.length - 1 ? "mr-[0.26em]" : ""}`}
              >
                {w.slice(0, -1)}
                <span className="text-accent">.</span>
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            variants={rise}
            custom={0}
            initial="hidden"
            animate="show"
            className="mt-6 max-w-xl text-pretty text-[17px] leading-relaxed text-slate-500 sm:text-lg"
          >
            {HERO_LEAD}
          </motion.p>

          <motion.div
            variants={rise}
            custom={1}
            initial="hidden"
            animate="show"
            className="mt-7 flex flex-wrap items-center justify-center gap-x-2 gap-y-2 text-[13px] font-medium text-slate-500"
          >
            {JOURNEY_STEPS.map((step, i) => (
              <span key={step} className="inline-flex items-center gap-2">
                <span
                  className={
                    i === JOURNEY_STEPS.length - 1 ? "font-semibold text-accent" : ""
                  }
                >
                  {step}
                </span>
                {i < JOURNEY_STEPS.length - 1 && (
                  <ArrowRight className="h-3 w-3 text-slate-400" aria-hidden />
                )}
              </span>
            ))}
          </motion.div>

          <motion.div
            variants={rise}
            custom={2}
            initial="hidden"
            animate="show"
            className="mt-10 flex flex-col items-center gap-3 sm:flex-row"
          >
            <Link
              href="/platform"
              className="group inline-flex h-11 items-center gap-2 rounded-lg bg-accent px-6 text-sm font-semibold text-white shadow-[0_1px_2px_rgba(49,87,232,0.4),0_10px_24px_-8px_rgba(49,87,232,0.5)] transition hover:bg-accent-deep"
            >
              Explore StartupHub
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/register"
              className="inline-flex h-11 items-center gap-2 rounded-lg border border-line bg-white px-6 text-sm font-semibold text-ink transition hover:border-slate-300 hover:shadow-card"
            >
              Start Your Journey
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 48, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto mt-20 max-w-5xl"
        >
          <div
            className="absolute inset-x-10 -bottom-8 h-16 rounded-full bg-accent/[0.09] blur-2xl"
            aria-hidden
          />
          <EcosystemDiagram />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="mt-24"
        >
          <TrustStrip names={TRUSTED_NAMES} marquee={false} />
        </motion.div>
      </div>
    </section>
  );
}
