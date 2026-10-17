"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import {
  Banknote,
  ChevronRight,
  FileCheck2,
  Globe2,
  Landmark,
  Layers,
  Lightbulb,
  Network,
  Settings,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  UserCheck,
  Users,
} from "lucide-react";
import type { ComponentType, MouseEvent } from "react";
import { ArrowGlyph, ButtonLink, Container } from "@/components/ui";
import { cn } from "@/lib/utils";

const EASE = [0.22, 0.61, 0.36, 1] as const;

const journey = [
  "Idea",
  "Incubation",
  "IPR",
  "Resources",
  "Market",
  "Funding",
  "Growth",
];

/* Node positions in a 1000 × 560 coordinate space */
const edges = [
  "M 500 104 C 400 140, 278 150, 196 182",
  "M 500 104 C 600 140, 722 150, 804 182",
  "M 200 224 C 290 268, 362 286, 438 302",
  "M 800 224 C 710 268, 638 286, 562 302",
  "M 452 350 C 370 392, 282 416, 210 440",
  "M 500 362 C 500 416, 500 442, 500 470",
  "M 548 350 C 630 392, 718 416, 790 440",
];

function SatNode({
  x,
  y,
  icon: Icon,
  title,
  sub,
  delay,
}: {
  x: number;
  y: number;
  icon: ComponentType<{ className?: string }>;
  title: string;
  sub: string;
  delay: number;
}) {
  return (
    <motion.div
      className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${x / 10}%`, top: `${y / 5.6}%` }}
      initial={{ opacity: 0, scale: 0.8, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: EASE }}
    >
      <div className="flex w-[128px] items-center gap-2 rounded-xl border border-line bg-white p-2 shadow-[0_1px_2px_rgba(11,18,32,0.05)] transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-[0_10px_24px_-10px_rgba(11,18,32,0.2)] sm:w-[138px] sm:p-2.5">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent">
          <Icon className="h-4 w-4" />
        </span>
        <span className="min-w-0">
          <span className="block truncate text-[12px] font-semibold leading-tight text-ink">
            {title}
          </span>
          <span className="block truncate text-[10px] text-slate-400">{sub}</span>
        </span>
      </div>
    </motion.div>
  );
}

function EcosystemConsole() {
  const reduce = useReducedMotion();
  const rx = useSpring(useMotionValue(0), { stiffness: 140, damping: 18 });
  const ry = useSpring(useMotionValue(0), { stiffness: 140, damping: 18 });

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * 4);
    rx.set(-py * 3);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <div
      className="relative"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ perspective: 1400 }}
    >
      {/* floating signals */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6, ease: EASE }}
        className="absolute -left-4 top-16 z-20 hidden lg:block xl:-left-12"
      >
        <div className="anim-float flex items-center gap-2.5 rounded-xl border border-line bg-white/95 px-3.5 py-2.5 shadow-[0_16px_40px_-16px_rgba(11,18,32,0.25)] backdrop-blur">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-emerald-50 text-emerald-600">
            <FileCheck2 className="h-3.5 w-3.5" />
          </span>
          <span className="text-[12px] font-medium text-ink">
            IPR filed
            <span className="block text-[10px] font-normal text-slate-400">
              3 patents secured
            </span>
          </span>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.7, duration: 0.6, ease: EASE }}
        className="absolute -right-4 top-32 z-20 hidden lg:block xl:-right-10"
      >
        <div
          className="anim-float flex items-center gap-2.5 rounded-xl border border-line bg-white/95 px-3.5 py-2.5 shadow-[0_16px_40px_-16px_rgba(11,18,32,0.25)] backdrop-blur"
          style={{ animationDelay: "1.4s" }}
        >
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-accent-soft text-accent">
            <UserCheck className="h-3.5 w-3.5" />
          </span>
          <span className="text-[12px] font-medium text-ink">
            Mentor matched
            <span className="block text-[10px] font-normal text-slate-400">
              Priya N. · ex-CTO, fintech
            </span>
          </span>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.9, duration: 0.6, ease: EASE }}
        className="absolute -bottom-5 right-14 z-20 hidden lg:block"
      >
        <div
          className="anim-float flex items-center gap-2.5 rounded-xl border border-line bg-white/95 px-3.5 py-2.5 shadow-[0_16px_40px_-16px_rgba(11,18,32,0.25)] backdrop-blur"
          style={{ animationDelay: "2.6s" }}
        >
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-accent-soft text-accent">
            <Banknote className="h-3.5 w-3.5" />
          </span>
          <span className="text-[12px] font-medium text-ink">
            ₹2.4 Cr Series A
            <span className="block text-[10px] font-normal text-slate-400">
              Round opened · 6 investors
            </span>
          </span>
        </div>
      </motion.div>

      {/* console frame */}
      <motion.div
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className="relative overflow-hidden rounded-2xl border border-line bg-white shadow-[0_2px_4px_rgba(11,18,32,0.04),0_32px_64px_-32px_rgba(11,18,32,0.22)]"
      >
        {/* chrome bar */}
        <div className="flex h-11 items-center gap-3 border-b border-line bg-slate-50/70 px-4">
          <span className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
            <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
            <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
          </span>
          <span className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <Network className="h-3.5 w-3.5 text-accent" />
            Ecosystem Console
          </span>
          <span className="ml-auto hidden items-center gap-1 sm:flex">
            {["Overview", "Graph", "Signals"].map((t) => (
              <span
                key={t}
                className={cn(
                  "rounded-md px-2.5 py-1 text-[11px] font-medium",
                  t === "Graph"
                    ? "border border-line bg-white text-ink shadow-sm"
                    : "text-slate-400"
                )}
              >
                {t}
              </span>
            ))}
          </span>
        </div>

        <div className="flex">
          {/* left rail */}
          <div className="hidden w-14 flex-col items-center gap-1 border-r border-line bg-white py-4 md:flex">
            {[Network, Lightbulb, ShieldCheck, Landmark, TrendingUp].map(
              (Icon, i) => (
                <span
                  key={i}
                  className={cn(
                    "grid h-9 w-9 place-items-center rounded-lg",
                    i === 0
                      ? "bg-accent-soft text-accent"
                      : "text-slate-300 hover:text-slate-400"
                  )}
                >
                  <Icon className="h-4 w-4" />
                </span>
              )
            )}
            <span className="mt-auto grid h-9 w-9 place-items-center rounded-lg text-slate-300">
              <Settings className="h-4 w-4" />
            </span>
          </div>

          {/* graph canvas */}
          <div className="bg-nodegrid relative hidden aspect-[1000/560] flex-1 md:block">
            <svg
              viewBox="0 0 1000 560"
              className="absolute inset-0 h-full w-full"
              aria-hidden="true"
            >
              {edges.map((d, i) => (
                <path key={`base-${i}`} d={d} fill="none" stroke="#CBD5E6" strokeWidth="1.4" />
              ))}
              {edges.map((d, i) => (
                <path
                  key={`flow-${i}`}
                  d={d}
                  fill="none"
                  stroke="#3157E8"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  className="link-flow"
                  opacity="0.4"
                />
              ))}
              {/* data packets */}
              {[0, 3, 6].map((p, k) => (
                <circle key={p} r="3.5" fill="#3157E8">
                  <animateMotion
                    dur={`${6 + k * 1.6}s`}
                    begin={`${k * 1.8}s`}
                    repeatCount="indefinite"
                    path={edges[p]}
                  />
                </circle>
              ))}
            </svg>

            {/* satellites */}
            <SatNode x={500} y={84} icon={Sparkles} title="Intelligence" sub="Market signals" delay={0.55} />
            <SatNode x={180} y={202} icon={Globe2} title="Market" sub="Access & GTM" delay={0.7} />
            <SatNode x={820} y={202} icon={ShieldCheck} title="IPR Vault" sub="Patents & filings" delay={0.7} />
            <SatNode x={170} y={458} icon={Users} title="Mentors" sub="2,800+ experts" delay={0.9} />
            <SatNode x={500} y={496} icon={Layers} title="Resources" sub="Tools & credits" delay={1.0} />
            <SatNode x={830} y={458} icon={Landmark} title="Funding" sub="Capital network" delay={0.9} />

            {/* center startup */}
            <motion.div
              className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
              style={{ left: "50%", top: "57.1%" }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.7, ease: EASE }}
            >
              <div className="w-[196px] rounded-xl border border-line bg-white p-3.5 shadow-[0_12px_32px_-12px_rgba(11,18,32,0.22)] sm:w-[208px]">
                <div className="flex items-center gap-2.5">
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-accent text-white">
                    <Network className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block text-[13px] font-bold leading-tight text-ink">
                      Lumen AI
                    </span>
                    <span className="block text-[10px] text-slate-400">
                      Applied AI · Bengaluru
                    </span>
                  </span>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="rounded-md bg-accent-soft px-1.5 py-0.5 text-[10px] font-semibold text-accent">
                    Series A
                  </span>
                  <span className="text-[10px] font-medium text-slate-400">
                    Readiness 78%
                  </span>
                </div>
                <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-slate-100">
                  <motion.div
                    className="h-full rounded-full bg-accent"
                    initial={{ width: "0%" }}
                    animate={{ width: "78%" }}
                    transition={{ delay: 1.1, duration: 1.1, ease: EASE }}
                  />
                </div>
              </div>
            </motion.div>
          </div>

          {/* mobile fallback: flat graph */}
          <div className="flex-1 p-5 md:hidden">
            <div className="mb-4 flex items-center gap-2.5 rounded-xl border border-line bg-white p-3 shadow-sm">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-accent text-white">
                <Network className="h-4 w-4" />
              </span>
              <span>
                <span className="block text-[13px] font-bold text-ink">Lumen AI</span>
                <span className="block text-[10px] text-slate-400">
                  Connected to 6 ecosystem modules
                </span>
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 border-l-2 border-dashed border-slate-200 pl-4">
              {[
                [Sparkles, "Intelligence"],
                [Globe2, "Market"],
                [ShieldCheck, "IPR Vault"],
                [Users, "Mentors"],
                [Layers, "Resources"],
                [Landmark, "Funding"],
              ].map(([Icon, label]) => {
                const I = Icon as ComponentType<{ className?: string }>;
                return (
                  <div
                    key={label as string}
                    className="flex items-center gap-2 rounded-lg border border-line bg-white px-2.5 py-2"
                  >
                    <I className="h-3.5 w-3.5 text-accent" />
                    <span className="text-[12px] font-medium text-ink">
                      {label as string}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Hero() {
  const words1 = ["Build.", "Protect."];
  const words2 = ["Validate.", "Scale."];

  return (
    <section id="top" className="relative overflow-hidden pb-20 pt-32 md:pt-40">
      {/* faint node grid sky */}
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
            className="inline-flex items-center gap-2 rounded-full border border-line bg-white/80 py-1.5 pl-1.5 pr-4 text-[12px] font-medium text-slate-500 backdrop-blur"
          >
            <span className="rounded-full bg-accent-soft px-2.5 py-0.5 text-[11px] font-semibold text-accent">
              New
            </span>
            The global startup ecosystem, connected
          </motion.div>

          <h1 className="mt-7 text-[clamp(2.6rem,6.2vw,4.9rem)] font-semibold leading-[1.02] tracking-[-0.045em] text-ink">
            {[words1, words2].map((line, li) => (
              <span key={li} className="block">
                {line.map((w, wi) => (
                  <span key={w} className="inline-block overflow-hidden pb-1 align-bottom">
                    <motion.span
                      className={cn(
                        "inline-block",
                        li === 1 && wi === 1 && "text-accent"
                      )}
                      initial={{ y: "110%" }}
                      animate={{ y: 0 }}
                      transition={{
                        delay: 0.12 + (li * 2 + wi) * 0.07,
                        duration: 0.8,
                        ease: EASE,
                      }}
                    >
                      {w}
                      {wi === 0 ? "\u00A0" : ""}
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

          {/* journey chips */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.65, duration: 0.7 }}
            className="mt-6 flex flex-wrap items-center justify-center gap-x-1 gap-y-1.5 text-[13px] font-medium"
          >
            {journey.map((j, i) => (
              <span key={j} className="flex items-center">
                <span
                  className={cn(
                    "transition-colors",
                    j === "IPR" ? "font-semibold text-accent" : "text-slate-400 hover:text-ink"
                  )}
                >
                  {j}
                </span>
                {i < journey.length - 1 && (
                  <ChevronRight className="mx-1 h-3 w-3 text-slate-300" />
                )}
              </span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.72, duration: 0.7, ease: EASE }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <ButtonLink href="#platform" size="lg">
              Explore StartupHub
              <ArrowGlyph />
            </ButtonLink>
            <ButtonLink href="#cta" variant="secondary" size="lg">
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
