"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  BadgeCheck,
  Boxes,
  HeartPulse,
  Rocket,
  Scale3d,
  ShieldCheck,
  TrendingUp,
  Users,
} from "lucide-react";
import { useRef, type ReactNode } from "react";
import { EASE } from "@/components/motion";

/* 800 × 560 coordinate space */
const NODES = {
  market: { x: 400, y: 66 },
  ipr: { x: 138, y: 196 },
  mentors: { x: 662, y: 196 },
  resources: { x: 138, y: 386 },
  funding: { x: 662, y: 386 },
  growth: { x: 400, y: 506 },
  core: { x: 400, y: 292 },
};

const PRIMARY_EDGES: Array<[keyof typeof NODES, keyof typeof NODES, number]> = [
  ["core", "market", 26],
  ["core", "ipr", -34],
  ["core", "mentors", 34],
  ["core", "resources", 34],
  ["core", "funding", -34],
  ["core", "growth", -26],
];

const CROSS_EDGES: Array<[keyof typeof NODES, keyof typeof NODES]> = [
  ["market", "ipr"],
  ["market", "mentors"],
  ["ipr", "resources"],
  ["mentors", "funding"],
  ["resources", "growth"],
  ["funding", "growth"],
];

function edgePath(
  a: { x: number; y: number },
  b: { x: number; y: number },
  bend = 0,
) {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  /* perpendicular offset */
  const px = (-dy / len) * bend;
  const py = (dx / len) * bend;
  return `M ${a.x} ${a.y} Q ${mx + px} ${my + py} ${b.x} ${b.y}`;
}

function NodeDot({ x, y, delay }: { x: number; y: number; delay: number }) {
  return (
    <motion.circle
      cx={x}
      cy={y}
      r={3.2}
      fill="#3157E8"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay, duration: 0.6, ease: EASE }}
    />
  );
}

function OrbitNode({
  pos,
  icon,
  label,
  metric,
  delay,
  active = false,
}: {
  pos: { x: number; y: number };
  icon: ReactNode;
  label: string;
  metric: string;
  delay: number;
  active?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.7, ease: EASE }}
      className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
      style={{
        left: `${(pos.x / 800) * 100}%`,
        top: `${(pos.y / 560) * 100}%`,
      }}
      whileHover={{ scale: 1.06 }}
    >
      <div
        className={`flex cursor-default items-center gap-2 rounded-xl border bg-white/95 px-2.5 py-2 shadow-node backdrop-blur transition-colors duration-300 sm:gap-2.5 sm:px-3.5 sm:py-2.5 ${
          active ? "border-accent/40" : "border-line hover:border-accent/40"
        }`}
      >
        <span
          className={`flex h-6 w-6 items-center justify-center rounded-lg sm:h-7 sm:w-7 ${
            active
              ? "bg-accent text-white"
              : "bg-accent-soft text-accent"
          }`}
        >
          {icon}
        </span>
        <span className="text-left">
          <span className="block font-mono text-[8.5px] font-medium tracking-[0.14em] text-slate-400 uppercase sm:text-[9.5px]">
            {label}
          </span>
          <span className="block text-[10.5px] leading-tight font-semibold text-ink sm:text-[12px]">
            {metric}
          </span>
        </span>
      </div>
    </motion.div>
  );
}

function FloatChip({
  className,
  icon,
  title,
  sub,
  delay,
  accent = false,
}: {
  className: string;
  icon: ReactNode;
  title: string;
  sub: string;
  delay: number;
  accent?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.9, ease: EASE }}
      className={`absolute z-20 ${className}`}
    >
      <div className="anim-float flex items-center gap-2.5 rounded-2xl border border-line bg-white/95 px-3.5 py-3 shadow-lift backdrop-blur">
        <span
          className={`flex h-8 w-8 items-center justify-center rounded-lg ${
            accent
              ? "bg-rise-tint text-rise"
              : "bg-accent-soft text-accent"
          }`}
        >
          {icon}
        </span>
        <span>
          <span className="block text-[12.5px] font-semibold text-ink">
            {title}
          </span>
          <span className="block font-mono text-[9px] tracking-[0.1em] text-slate-400 uppercase">
            {sub}
          </span>
        </span>
      </div>
    </motion.div>
  );
}

export function HeroVisual() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [4, -4]), {
    stiffness: 120,
    damping: 18,
  });
  const ry = useSpring(useTransform(mx, [0, 1], [-4, 4]), {
    stiffness: 120,
    damping: 18,
  });

  return (
    <div
      ref={wrapRef}
      className="relative mx-auto w-full max-w-5xl [perspective:1400px]"
      onPointerMove={(e) => {
        const r = wrapRef.current?.getBoundingClientRect();
        if (!r) return;
        mx.set((e.clientX - r.left) / r.width);
        my.set((e.clientY - r.top) / r.height);
      }}
      onPointerLeave={() => {
        mx.set(0.5);
        my.set(0.5);
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 48, rotateX: 6 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ delay: 0.55, duration: 1.2, ease: EASE }}
        style={{ rotateX: rx, rotateY: ry }}
        className="relative rounded-[20px] border border-line bg-white shadow-lift sm:rounded-[24px]"
      >
        {/* window chrome */}
        <div className="flex items-center justify-between border-b border-line px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-line" />
              <span className="h-2.5 w-2.5 rounded-full bg-line" />
              <span className="h-2.5 w-2.5 rounded-full bg-accent/70" />
            </div>
            <span className="hidden rounded-md border border-line bg-soft px-2.5 py-1 font-mono text-[10.5px] text-slate-500 sm:block">
              startuphub.app/ecosystem
            </span>
          </div>
          <span className="flex items-center gap-1.5 rounded-full border border-rise/20 bg-rise-tint px-2.5 py-1 font-mono text-[10px] font-medium tracking-[0.1em] text-rise uppercase">
            <span className="relative flex h-1.5 w-1.5">
              <span className="ping-dot absolute inline-flex h-full w-full rounded-full bg-rise" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-rise" />
            </span>
            Live sync
          </span>
        </div>

        {/* graph stage */}
        <div className="relative">
          <div className="dot-grid relative aspect-[800/560] w-full overflow-hidden">
            {/* connection lines */}
            <svg
              viewBox="0 0 800 560"
              className="absolute inset-0 h-full w-full"
              fill="none"
            >
              {CROSS_EDGES.map(([a, b], i) => (
                <motion.path
                  key={`c-${i}`}
                  d={edgePath(NODES[a], NODES[b], 18)}
                  stroke="#E2E8F2"
                  strokeWidth={1.4}
                  strokeDasharray="3 6"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{
                    delay: 1.15 + i * 0.09,
                    duration: 1.1,
                    ease: EASE,
                  }}
                />
              ))}
              {PRIMARY_EDGES.map(([a, b, bend], i) => {
                const d = edgePath(NODES[a], NODES[b], bend);
                return (
                  <g key={`p-${i}`}>
                    <motion.path
                      d={d}
                      stroke="#3157E8"
                      strokeOpacity={0.4}
                      strokeWidth={1.6}
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{
                        delay: 0.95 + i * 0.12,
                        duration: 1.2,
                        ease: EASE,
                      }}
                    />
                    {/* travelling pulse */}
                    <motion.g
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 2.4 + i * 0.15 }}
                    >
                      <circle r={4} fill="#3157E8" opacity={0.18}>
                        <animateMotion
                          dur={`${4.2 + i * 0.7}s`}
                          repeatCount="indefinite"
                          path={d}
                        />
                      </circle>
                      <circle r={2.2} fill="#3157E8">
                        <animateMotion
                          dur={`${4.2 + i * 0.7}s`}
                          repeatCount="indefinite"
                          path={d}
                        />
                      </circle>
                    </motion.g>
                  </g>
                );
              })}
              <NodeDot x={NODES.market.x} y={NODES.market.y} delay={1.15} />
              <NodeDot x={NODES.ipr.x} y={NODES.ipr.y} delay={1.27} />
              <NodeDot x={NODES.mentors.x} y={NODES.mentors.y} delay={1.39} />
              <NodeDot x={NODES.resources.x} y={NODES.resources.y} delay={1.51} />
              <NodeDot x={NODES.funding.x} y={NODES.funding.y} delay={1.63} />
              <NodeDot x={NODES.growth.x} y={NODES.growth.y} delay={1.75} />
            </svg>

            {/* center card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9, duration: 0.8, ease: EASE }}
              className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${(NODES.core.x / 800) * 100}%`,
                top: `${(NODES.core.y / 560) * 100}%`,
              }}
            >
              <div className="flex items-center gap-3 rounded-2xl border border-accent/25 bg-white px-4 py-3.5 shadow-lift sm:px-5 sm:py-4">
                <div className="relative hidden h-12 w-12 items-center justify-center sm:flex">
                  <svg viewBox="0 0 48 48" className="absolute inset-0 h-full w-full -rotate-90">
                    <circle cx="24" cy="24" r="20" stroke="#E8EDFB" strokeWidth="5" fill="none" />
                    <motion.circle
                      cx="24"
                      cy="24"
                      r="20"
                      stroke="#3157E8"
                      strokeWidth="5"
                      strokeLinecap="round"
                      fill="none"
                      strokeDasharray={2 * Math.PI * 20}
                      initial={{ strokeDashoffset: 2 * Math.PI * 20 }}
                      animate={{ strokeDashoffset: 2 * Math.PI * 20 * 0.18 }}
                      transition={{ delay: 1.9, duration: 1.6, ease: EASE }}
                    />
                  </svg>
                  <span className="text-[12px] font-bold text-ink">82</span>
                </div>
                <div>
                  <p className="font-mono text-[9px] font-medium tracking-[0.18em] text-slate-400 uppercase">
                    Startup core
                  </p>
                  <p className="text-[14.5px] font-bold tracking-tight text-ink sm:text-[16px]">
                    Averia Health
                  </p>
                  <p className="text-[11px] font-medium text-slate-500">
                    Series A trajectory · Health 82
                  </p>
                </div>
              </div>
            </motion.div>

            {/* orbit nodes */}
            <OrbitNode
              pos={NODES.market}
              icon={<TrendingUp className="h-3 w-3 sm:h-3.5 sm:w-3.5" />}
              label="Market fit"
              metric="82 / 100"
              delay={1.05}
            />
            <OrbitNode
              pos={NODES.ipr}
              icon={<ShieldCheck className="h-3 w-3 sm:h-3.5 sm:w-3.5" />}
              label="IPR portfolio"
              metric="3 patents filed"
              delay={1.17}
              active
            />
            <OrbitNode
              pos={NODES.mentors}
              icon={<Users className="h-3 w-3 sm:h-3.5 sm:w-3.5" />}
              label="Mentor match"
              metric="2 new this week"
              delay={1.29}
            />
            <OrbitNode
              pos={NODES.resources}
              icon={<Boxes className="h-3 w-3 sm:h-3.5 sm:w-3.5" />}
              label="Resources"
              metric="12 credits active"
              delay={1.41}
            />
            <OrbitNode
              pos={NODES.funding}
              icon={<BadgeCheck className="h-3 w-3 sm:h-3.5 sm:w-3.5" />}
              label="Funding"
              metric="₹2.4 Cr tracked"
              delay={1.53}
            />
            <OrbitNode
              pos={NODES.growth}
              icon={<Rocket className="h-3 w-3 sm:h-3.5 sm:w-3.5" />}
              label="Growth"
              metric="+24% MoM"
              delay={1.65}
            />
          </div>

          {/* lifecycle progress footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.8 }}
            className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line px-4 py-3.5 sm:px-6"
          >
            <span className="font-mono text-[9.5px] font-medium tracking-[0.18em] text-slate-400 uppercase">
              Lifecycle progress
            </span>
            <div className="flex min-w-[160px] flex-1 items-center gap-1">
              {["Idea", "Valid.", "Incub.", "IPR", "Resrc.", "MVP", "Market", "Fund", "Grow"].map(
                (s, i) => (
                  <div key={s} className="flex flex-1 flex-col gap-1.5">
                    <div
                      className={`h-[5px] rounded-full ${
                        i < 3 ? "bg-accent" : i === 3 ? "bg-accent/45" : "bg-line"
                      }`}
                    />
                    <span
                      className={`hidden text-[9px] font-medium sm:block ${
                        i <= 3 ? "text-ink" : "text-slate-400"
                      }`}
                    >
                      {s}
                    </span>
                  </div>
                ),
              )}
            </div>
            <span className="rounded-md bg-accent-soft px-2 py-1 font-mono text-[9.5px] font-semibold tracking-[0.08em] text-accent uppercase">
              Stage 04 · IPR — Protect
            </span>
          </motion.div>
        </div>

        {/* floating chips overlapping frame */}
        <FloatChip
          className="-top-5 right-4 sm:-right-6 sm:top-14"
          icon={<TrendingUp className="h-4 w-4" />}
          title="Traction +24% MoM"
          sub="Intelligence feed"
          delay={2.15}
          accent
        />
        <FloatChip
          className="bottom-16 -left-3 hidden sm:block md:bottom-24 md:-left-8"
          icon={<HeartPulse className="h-4 w-4" />}
          title="2 mentors matched"
          sub="This week"
          delay={2.3}
        />
        <FloatChip
          className="-bottom-5 right-6 sm:right-16"
          icon={<ShieldCheck className="h-4 w-4" />}
          title="IP filed · 3 patents"
          sub="IPR automation"
          delay={2.45}
        />

        {/* subtle signal watermark */}
        <Scale3d className="pointer-events-none absolute top-20 left-5 hidden h-4 w-4 text-line lg:block" />
      </motion.div>
    </div>
  );
}
