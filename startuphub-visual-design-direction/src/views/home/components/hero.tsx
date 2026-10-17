"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { ArrowGlyph, ButtonLink, Container } from "@/components/ui";
import EcosystemConsole from "@/views/home/components/ecosystem-console";
import { journey } from "@/views/home/constants/data";
import { cn } from "@/lib/utils";

const EASE = [0.22, 0.61, 0.36, 1] as const;
const line1 = ["Build.", "Protect."];
const line2 = ["Validate.", "Scale."];

export default function Hero() {
  return (
    <section className="relative overflow-hidden pb-20 pt-32 md:pt-40">
      <div
        aria-hidden="true"
        className="bg-nodegrid absolute inset-x-0 top-0 h-[560px] [mask-image:radial-gradient(ellipse_60%_70%_at_50%_0%,black_30%,transparent)]"
      />

      <Container className="relative">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded-full border border-line bg-white/80 py-1.5 pl-1.5 pr-4 text-[12px] font-medium text-slate-500 backdrop-blur transition-colors hover:border-slate-300"
            >
              <span className="rounded-full bg-accent-soft px-2.5 py-0.5 text-[11px] font-semibold text-accent">
                New
              </span>
              The global startup ecosystem, connected
            </Link>
          </motion.div>

          <h1 className="mt-7 text-[clamp(2.6rem,6.2vw,4.9rem)] font-semibold leading-[1.02] tracking-[-0.045em] text-ink">
            {[line1, line2].map((line, li) => (
              <span key={li} className="block">
                {line.map((w, wi) => (
                  <span key={w} className="inline-block overflow-hidden pb-1 align-bottom">
                    <motion.span
                      className={cn("inline-block", li === 1 && wi === 1 && "text-accent")}
                      initial={{ y: "110%" }}
                      animate={{ y: 0 }}
                      transition={{ delay: 0.12 + (li * 2 + wi) * 0.07, duration: 0.8, ease: EASE }}
                    >
                      {w}
                      {wi === 0 ? " " : ""}
                    </motion.span>
                  </span>
                ))}
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7, ease: EASE }}
            className="mt-6 max-w-xl text-pretty text-[17px] leading-relaxed text-slate-500 sm:text-lg"
          >
            One connected ecosystem for every stage of your startup journey —
            from first sketch to global scale.
          </motion.p>

          {/* lifecycle journey chips */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.65, duration: 0.7 }}
            className="mt-6 flex flex-wrap items-center justify-center gap-x-1 gap-y-1.5 text-[13px] font-medium"
          >
            {journey.map((j, i) => (
              <span key={j} className="flex items-center">
                <Link
                  href="/lifecycle"
                  className={cn(
                    "transition-colors",
                    j === "IPR" ? "font-semibold text-accent" : "text-slate-400 hover:text-ink"
                  )}
                >
                  {j}
                </Link>
                {i < journey.length - 1 && <ChevronRight className="mx-1 h-3 w-3 text-slate-300" />}
              </span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.72, duration: 0.7, ease: EASE }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <ButtonLink href="/platform" size="lg">
              Explore StartupHub
              <ArrowGlyph />
            </ButtonLink>
            <ButtonLink href="/register" variant="secondary" size="lg">
              Start Your Journey
            </ButtonLink>
          </motion.div>
        </div>

        {/* product visual */}
        <motion.div
          initial={{ opacity: 0, y: 48 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.9, ease: EASE }}
          className="mt-16 md:mt-20"
        >
          <EcosystemConsole />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.8 }}
            className="mt-6 flex items-center justify-center gap-2 text-[12px] text-slate-400"
          >
            <span className="ping-dot h-1.5 w-1.5 rounded-full bg-emerald-500 text-emerald-500" />
            Live ecosystem graph · 2,418 active connections right now
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
