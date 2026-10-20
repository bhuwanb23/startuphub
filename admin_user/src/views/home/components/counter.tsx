"use client";

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useEffect, useRef } from "react";

export function Counter({
  to,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 1.8,
  className,
}: {
  to: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const value = useMotionValue(0);
  const text = useTransform(
    value,
    (v) => `${prefix}${v.toFixed(decimals)}${suffix}`,
  );

  useEffect(() => {
    if (!inView) return;
    const controls = animate(value, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
    });
    return () => controls.stop();
  }, [inView, value, to, duration]);

  return (
    <motion.span ref={ref} className={className}>
      {text}
    </motion.span>
  );
}
