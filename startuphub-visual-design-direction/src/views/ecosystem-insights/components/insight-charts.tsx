"use client";

import { motion } from "framer-motion";

function smooth(values: number[], w: number, h: number, pad: number) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const xs = values.map((_, i) => pad + (i * (w - pad * 2)) / (values.length - 1));
  const ys = values.map((v) => h - pad - ((v - min) / (max - min || 1)) * (h - pad * 2));
  let d = `M ${xs[0].toFixed(1)} ${ys[0].toFixed(1)}`;
  for (let i = 0; i < xs.length - 1; i++) {
    const x0 = xs[Math.max(0, i - 1)], y0 = ys[Math.max(0, i - 1)];
    const x1 = xs[i], y1 = ys[i];
    const x2 = xs[i + 1], y2 = ys[i + 1];
    const x3 = xs[Math.min(xs.length - 1, i + 2)], y3 = ys[Math.min(xs.length - 1, i + 2)];
    const c1x = x1 + (x2 - x0) / 6, c1y = y1 + (y2 - y0) / 6;
    const c2x = x2 - (x3 - x1) / 6, c2y = y2 - (y3 - y1) / 6;
    d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${x2.toFixed(1)} ${y2.toFixed(1)}`;
  }
  return { d, last: { x: xs[xs.length - 1], y: ys[ys.length - 1] } };
}

/** Animated area chart (client) */
export default function AreaChart({
  points,
  id,
  caption,
  metric,
}: {
  points: number[];
  id: string;
  caption: string;
  metric: string;
}) {
  const { d, last } = smooth(points, 640, 220, 14);
  const area = `${d} L ${last.x.toFixed(1)} 220 L 14 220 Z`;
  return (
    <div>
      <div className="flex items-baseline justify-between px-1 pb-2">
        <span className="text-xl font-semibold tracking-tight text-ink tabular-nums">{metric}</span>
        <span className="text-[12px] text-slate-400">{caption}</span>
      </div>
      <svg viewBox="0 0 640 240" className="w-full" aria-hidden="true">
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3157E8" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#3157E8" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[50, 105, 160, 215].map((y) => (
          <line key={y} x1="14" y1={y} x2="626" y2={y} stroke="#EEF1F6" strokeWidth="1" />
        ))}
        <motion.path
          d={area}
          fill={`url(#${id})`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.3 }}
        />
        <motion.path
          d={d}
          fill="none"
          stroke="#3157E8"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.3, ease: [0.4, 0, 0.2, 1] }}
        />
        <motion.g
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.1, duration: 0.3 }}
        >
          <circle cx={last.x} cy={last.y} r="9" fill="#3157E8" opacity="0.12" />
          <circle cx={last.x} cy={last.y} r="4" fill="#3157E8" stroke="#fff" strokeWidth="2" />
        </motion.g>
      </svg>
    </div>
  );
}
