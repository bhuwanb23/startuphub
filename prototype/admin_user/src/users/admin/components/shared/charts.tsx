"use client";

import { motion } from "framer-motion";

export function Bars({
  data,
  height = 132,
  format = (v: number) => String(v),
}: {
  data: { label: string; value: number }[];
  height?: number;
  format?: (v: number) => string;
}) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div>
      <div className="flex items-end gap-2" style={{ height }}>
        {data.map((d, i) => (
          <div key={d.label} className="group relative flex h-full flex-1 items-end">
            <div className="pointer-events-none absolute -top-1 left-1/2 z-10 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-md bg-ink px-2 py-1 text-[10px] font-semibold text-white opacity-0 transition-opacity group-hover:opacity-100">
              {format(d.value)}
            </div>
            <div className="relative flex w-full items-end overflow-hidden rounded-t-md bg-accent-soft" style={{ height: "100%" }}>
              <motion.div
                initial={{ height: 0 }}
                whileInView={{ height: `${(d.value / max) * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                className="w-full self-end rounded-t-md bg-accent/80 transition-colors group-hover:bg-accent"
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-2 flex gap-2">
        {data.map((d) => (
          <span key={d.label} className="flex-1 truncate text-center text-[10px] font-medium text-slate-400">
            {d.label}
          </span>
        ))}
      </div>
    </div>
  );
}

export function HBars({
  data,
}: {
  data: { label: string; value: number; display?: string }[];
}) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div className="space-y-3">
      {data.map((d, i) => (
        <div key={d.label} className="flex items-center gap-3">
          <span className="w-32 shrink-0 truncate text-[12px] font-medium text-slate-500">
            {d.label}
          </span>
          <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-accent-soft">
            <motion.span
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: d.value / max }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="block h-full w-full origin-left rounded-full bg-accent/75"
            />
          </span>
          <span className="w-16 shrink-0 text-right text-[12px] font-semibold text-ink">
            {d.display ?? d.value}
          </span>
        </div>
      ))}
    </div>
  );
}

export function Sparkline({
  points,
  stroke = "#3157e8",
  className = "h-16 w-full",
}: {
  points: number[];
  stroke?: string;
  className?: string;
}) {
  const n = points.length;
  const max = Math.max(...points, 0.0001);
  const min = Math.min(...points, 0);
  const span = max - min || 1;
  const d = points
    .map((p, i) => {
      const x = (i / (n - 1)) * 100;
      const y = 34 - ((p - min) / span) * 30;
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <svg viewBox="0 0 100 38" preserveAspectRatio="none" className={className}>
      <motion.path
        d={d}
        fill="none"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease: "easeOut" }}
      />
    </svg>
  );
}
