"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { EASE, Reveal } from "@/components/motion";

export function Cta() {
  return (
    <section id="cta" className="bg-soft px-5 pt-4 pb-20 sm:px-8 sm:pb-28">
      <Reveal className="mx-auto w-full max-w-7xl">
        <div className="dot-grid-dark relative overflow-hidden rounded-[28px] bg-ink px-6 py-20 text-center sm:px-12 sm:py-28">
          {/* ambient network */}
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 1200 520"
            fill="none"
            preserveAspectRatio="xMidYMid slice"
            aria-hidden="true"
          >
            <g stroke="#3157E8" strokeOpacity="0.35" strokeWidth="1.2" strokeDasharray="3 7">
              <motion.path
                d="M-40 420 C 200 220, 420 480, 640 300 S 1020 120, 1260 260"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2.2, ease: EASE }}
              />
              <motion.path
                d="M-40 160 C 260 320, 480 60, 760 200 S 1080 420, 1260 320"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2.2, delay: 0.3, ease: EASE }}
              />
            </g>
            {[
              [240, 296],
              [640, 300],
              [760, 200],
              [960, 210],
            ].map(([x, y], i) => (
              <motion.circle
                key={i}
                cx={x}
                cy={y}
                r="4"
                fill="#3157E8"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1 + i * 0.2, duration: 0.5 }}
              />
            ))}
          </svg>
          <div className="pointer-events-none absolute -top-32 left-1/2 h-72 w-[560px] -translate-x-1/2 rounded-full bg-accent/20 blur-[110px]" />

          <div className="relative">
            <p className="font-mono text-[10.5px] font-medium tracking-[0.24em] text-white/50 uppercase">
              Node → Connection → Progress
            </p>
            <h2 className="mx-auto mt-6 max-w-3xl text-[clamp(2.4rem,5.6vw,4.4rem)] leading-[1.02] font-semibold tracking-[-0.04em] text-white">
              Ready to build
              <br />
              what's next<span className="text-accent">?</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-white/60">
              Join 10,000+ founders, mentors, investors and institutions already
              compounding inside the ecosystem.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="#top"
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 text-[15px] font-semibold text-ink transition-all duration-300 hover:bg-accent hover:text-white sm:w-auto"
              >
                Start your journey
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href="#platform"
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 px-8 py-4 text-[15px] font-semibold text-white transition-all duration-300 hover:border-white/50 sm:w-auto"
              >
                Explore the platform
              </a>
            </div>
            <p className="mt-8 font-mono text-[10px] tracking-[0.18em] text-white/35 uppercase">
              Free to start · Onboard in under 4 minutes
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
