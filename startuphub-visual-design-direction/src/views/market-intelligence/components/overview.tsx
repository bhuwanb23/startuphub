"use client";

import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import { useState } from "react";
import { Reveal } from "@/components/motion";
import { chartTabs, dailySnapshot, type ChartKey } from "@/views/market-intelligence/constants/data";
import { cn } from "@/lib/utils";

function smoothPath(values: number[], w = 700, h = 210, pad = 12) {
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
  return { line: d, last: { x: xs[xs.length - 1], y: ys[ys.length - 1] } };
}

export default function MarketOverview() {
  const [tab, setTab] = useState<ChartKey>("Trends");
  const data = chartTabs[tab];
  const { line, last } = smoothPath(data.pts);
  const area = `${line} L ${last.x.toFixed(1)} 210 L 12 210 Z`;

  return (
    <section className="bg-white py-24 md:py-28">
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8">
        {/* snapshot strip */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {dailySnapshot.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06}>
              <div className="rounded-2xl border border-line bg-white p-6">
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                  {s.label}
                </span>
                <div className="mt-2 text-[1.65rem] font-semibold leading-none tracking-tight text-ink tabular-nums">
                  {s.value}
                </div>
                <span className="mt-2.5 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[11px] font-semibold text-emerald-600">
                  <TrendingUp className="h-3 w-3" />
                  {s.delta}
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        {/* chart */}
        <Reveal delay={0.1}>
          <div className="mt-6 rounded-2xl border border-line bg-white shadow-[0_2px_4px_rgba(11,18,32,0.04)]">
            <div className="flex flex-wrap items-center gap-1 border-b border-line p-3">
              {(Object.keys(chartTabs) as ChartKey[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={cn(
                    "rounded-lg px-3.5 py-2 text-[13px] font-medium transition-colors",
                    t === tab ? "bg-accent-soft text-accent" : "text-slate-500 hover:bg-slate-50 hover:text-ink"
                  )}
                >
                  {t}
                </button>
              ))}
              <div className="ml-auto pr-3 text-right">
                <motion.div key={tab} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
                  <span className="text-lg font-semibold tracking-tight text-ink tabular-nums">{data.metric}</span>
                  <span className="block text-[11px] text-slate-400">{data.caption}</span>
                </motion.div>
              </div>
            </div>
            <div className="px-4 pb-4 pt-6 sm:px-6">
              <svg viewBox="0 0 700 240" className="w-full" aria-hidden="true">
                <defs>
                  <linearGradient id="miFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3157E8" stopOpacity="0.12" />
                    <stop offset="100%" stopColor="#3157E8" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {[45, 100, 155, 210].map((y) => (
                  <line key={y} x1="12" y1={y} x2="688" y2={y} stroke="#EEF1F6" strokeWidth="1" />
                ))}
                <motion.path
                  key={`a-${tab}`}
                  d={area}
                  fill="url(#miFill)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.9, delay: 0.25 }}
                />
                <motion.path
                  key={`l-${tab}`}
                  d={line}
                  fill="none"
                  stroke="#3157E8"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
                />
                <motion.g key={`d-${tab}`} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.05, duration: 0.3 }}>
                  <circle cx={last.x} cy={last.y} r="9" fill="#3157E8" opacity="0.12" />
                  <circle cx={last.x} cy={last.y} r="4" fill="#3157E8" stroke="#fff" strokeWidth="2" />
                </motion.g>
                {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((m, i) => (
                  <text key={m} x={12 + (i * 676) / 11} y={232} textAnchor="middle" fontSize="9" className="fill-slate-300">
                    {m}
                  </text>
                ))}
              </svg>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
