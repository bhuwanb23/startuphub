"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  ChevronDown,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";
import { Container, SectionHead } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { cn } from "@/lib/utils";

type TabKey = "Trends" | "Companies" | "Investment" | "IP Activity";

const tabs: Record<TabKey, { metric: string; caption: string; pts: number[] }> = {
  Trends: {
    metric: "+18.4%",
    caption: "Market momentum · trailing 12 months",
    pts: [22, 28, 26, 34, 40, 38, 48, 52, 58, 64, 72, 84],
  },
  Companies: {
    metric: "1,284",
    caption: "Active companies tracked",
    pts: [12, 14, 18, 17, 22, 26, 25, 31, 36, 40, 45, 52],
  },
  Investment: {
    metric: "$2.1B",
    caption: "Capital deployed · FY 2026",
    pts: [8, 10, 9, 14, 18, 16, 22, 26, 24, 32, 38, 46],
  },
  "IP Activity": {
    metric: "3,412",
    caption: "Filings across the sector",
    pts: [6, 8, 12, 10, 15, 18, 17, 22, 26, 28, 34, 40],
  },
};

const sectorBars = [
  { name: "AI & Agritech", pct: 92 },
  { name: "HealthTech", pct: 78 },
  { name: "ClimateTech", pct: 74 },
  { name: "FinTech", pct: 66 },
];

const months = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];

function smoothPath(values: number[], w = 560, h = 188, pad = 10) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const xs = values.map((_, i) => pad + (i * (w - pad * 2)) / (values.length - 1));
  const ys = values.map(
    (v) => h - pad - ((v - min) / (max - min || 1)) * (h - pad * 2)
  );
  let d = `M ${xs[0].toFixed(1)} ${ys[0].toFixed(1)}`;
  for (let i = 0; i < xs.length - 1; i++) {
    const x0 = xs[Math.max(0, i - 1)];
    const y0 = ys[Math.max(0, i - 1)];
    const x1 = xs[i];
    const y1 = ys[i];
    const x2 = xs[i + 1];
    const y2 = ys[i + 1];
    const x3 = xs[Math.min(xs.length - 1, i + 2)];
    const y3 = ys[Math.min(xs.length - 1, i + 2)];
    const c1x = x1 + (x2 - x0) / 6;
    const c1y = y1 + (y2 - y0) / 6;
    const c2x = x2 - (x3 - x1) / 6;
    const c2y = y2 - (y3 - y1) / 6;
    d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${x2.toFixed(1)} ${y2.toFixed(1)}`;
  }
  const last = { x: xs[xs.length - 1], y: ys[ys.length - 1] };
  return { line: d, last };
}

export default function Intelligence() {
  const [tab, setTab] = useState<TabKey>("Trends");
  const data = tabs[tab];
  const { line, last } = smoothPath(data.pts);
  const area = `${line} L ${last.x.toFixed(1)} 188 L 10 188 Z`;

  return (
    <section id="intelligence" className="border-t border-line bg-white py-24 md:py-32">
      <Container>
        <SectionHead
          eyebrow="Market Intelligence"
          title={
            <>
              See where the market is going{" "}
              <span className="text-accent">before it gets there.</span>
            </>
          }
          lead="Live signals on sectors, companies, capital and IP — the same intelligence institutions use, built for founders."
        />

        <div className="mt-14 grid gap-6 md:mt-16 lg:grid-cols-[360px_1fr]">
          {/* snapshot card */}
          <Reveal>
            <div className="flex h-full flex-col rounded-2xl border border-line bg-white p-7 shadow-[0_2px_4px_rgba(11,18,32,0.04)]">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Market Snapshot
                </span>
                <span className="ping-dot h-1.5 w-1.5 rounded-full bg-emerald-500 text-emerald-500" />
              </div>
              <button className="mt-4 flex w-full items-center justify-between rounded-xl border border-line bg-slate-50 px-4 py-3 text-sm font-semibold text-ink transition-colors hover:border-slate-300">
                AI &amp; Agritech
                <ChevronDown className="h-4 w-4 text-slate-400" />
              </button>

              <div className="mt-6 divide-y divide-line">
                {[
                  { v: "$42.8B", l: "Market size", delta: "+12% vs 2025" },
                  { v: "+18.4%", l: "YoY growth", delta: "Accelerating", up: true },
                  { v: "1,284", l: "Active startups", delta: "+96 this quarter" },
                ].map((m) => (
                  <div key={m.l} className="flex items-end justify-between py-4">
                    <div>
                      <div className="text-[1.75rem] font-semibold leading-none tracking-tight text-ink tabular-nums">
                        {m.v}
                      </div>
                      <div className="mt-1.5 text-[13px] text-slate-500">{m.l}</div>
                    </div>
                    <span
                      className={cn(
                        "flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-semibold",
                        m.up
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-slate-100 text-slate-500"
                      )}
                    >
                      {m.up && <TrendingUp className="h-3 w-3" />}
                      {m.delta}
                    </span>
                  </div>
                ))}
              </div>

              <a
                href="#cta"
                className="group mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-accent"
              >
                Open full intelligence
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </Reveal>

          {/* chart card */}
          <Reveal delay={0.1}>
            <div className="flex h-full flex-col rounded-2xl border border-line bg-white shadow-[0_2px_4px_rgba(11,18,32,0.04)]">
              <div className="flex flex-wrap items-center gap-1 border-b border-line p-3">
                {(Object.keys(tabs) as TabKey[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={cn(
                      "rounded-lg px-3.5 py-2 text-[13px] font-medium transition-colors",
                      t === tab
                        ? "bg-accent-soft text-accent"
                        : "text-slate-500 hover:bg-slate-50 hover:text-ink"
                    )}
                  >
                    {t}
                  </button>
                ))}
                <div className="ml-auto pr-3 text-right">
                  <motion.div
                    key={tab}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                  >
                    <span className="text-lg font-semibold tracking-tight text-ink tabular-nums">
                      {data.metric}
                    </span>
                    <span className="block text-[11px] text-slate-400">{data.caption}</span>
                  </motion.div>
                </div>
              </div>

              <div className="flex-1 px-4 pt-6 sm:px-6">
                <svg viewBox="0 0 560 216" className="w-full" aria-hidden="true">
                  <defs>
                    <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3157E8" stopOpacity="0.12" />
                      <stop offset="100%" stopColor="#3157E8" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  {[40, 88, 136, 184].map((y) => (
                    <line key={y} x1="10" y1={y} x2="550" y2={y} stroke="#EEF1F6" strokeWidth="1" />
                  ))}
                  <motion.path
                    key={`area-${tab}`}
                    d={area}
                    fill="url(#chartFill)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.9, delay: 0.25 }}
                  />
                  <motion.path
                    key={`line-${tab}`}
                    d={line}
                    fill="none"
                    stroke="#3157E8"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
                  />
                  <motion.g
                    key={`dot-${tab}`}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.05, duration: 0.3 }}
                  >
                    <circle cx={last.x} cy={last.y} r="9" fill="#3157E8" opacity="0.12" />
                    <circle cx={last.x} cy={last.y} r="4" fill="#3157E8" stroke="#fff" strokeWidth="2" />
                  </motion.g>
                  {months.map((m, i) => (
                    <text
                      key={i}
                      x={10 + (i * 540) / 11}
                      y={208}
                      textAnchor="middle"
                      className="fill-slate-300"
                      fontSize="9"
                    >
                      {m}
                    </text>
                  ))}
                </svg>
              </div>

              {/* sector momentum */}
              <div className="grid grid-cols-2 gap-x-8 gap-y-4 border-t border-line p-6 md:grid-cols-4">
                {sectorBars.map((s, i) => (
                  <div key={s.name}>
                    <div className="flex items-baseline justify-between">
                      <span className="text-[13px] font-medium text-ink">{s.name}</span>
                      <span className="text-[12px] font-semibold text-accent tabular-nums">
                        {s.pct}
                      </span>
                    </div>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100">
                      <motion.div
                        className="h-full rounded-full bg-accent"
                        initial={{ width: "0%" }}
                        whileInView={{ width: `${s.pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.15 + i * 0.1, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
