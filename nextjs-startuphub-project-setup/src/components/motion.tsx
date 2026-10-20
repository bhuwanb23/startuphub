"use client";

import {
  animate,
  motion,
  useInView,
  type HTMLMotionProps,
} from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";

export const EASE = [0.16, 1, 0.3, 1] as const;

/* ── Scroll reveal wrapper ─────────────────────────────────── */
type RevealProps = HTMLMotionProps<"div"> & {
  children: ReactNode;
  delay?: number;
  y?: number;
};

export function Reveal({
  children,
  delay = 0,
  y = 26,
  ...rest
}: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/* ── Animated number counter ───────────────────────────────── */
export function AnimatedNumber({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 1.9,
  className,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const node = ref.current;
    const controls = animate(0, value, {
      duration,
      ease: EASE,
      onUpdate(v) {
        node.textContent = `${prefix}${format(v, decimals)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, value, prefix, suffix, decimals, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  );
}

function format(v: number, decimals: number) {
  return v.toLocaleString("en-IN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/* ── Section header — eyebrow + headline + lede ────────────── */
export function SectionHeader({
  eyebrow,
  title,
  lede,
  align = "left",
  dark = false,
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: string;
  align?: "left" | "center";
  dark?: boolean;
}) {
  return (
    <Reveal
      className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}
    >
      <p
        className={`flex items-center gap-2 font-mono text-[11px] font-medium tracking-[0.22em] uppercase ${
          align === "center" ? "justify-center" : ""
        } ${dark ? "text-white/60" : "text-slate-500"}`}
      >
        <span className="inline-block h-1.5 w-1.5 rounded-[2px] bg-accent" />
        {eyebrow}
      </p>
      <h2
        className={`mt-5 text-[clamp(2.1rem,4.6vw,3.4rem)] leading-[1.04] font-semibold tracking-[-0.035em] ${
          dark ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {lede ? (
        <p
          className={`mt-5 text-[17px] leading-relaxed ${
            dark ? "text-white/60" : "text-slate-500"
          }`}
        >
          {lede}
        </p>
      ) : null}
    </Reveal>
  );
}
