"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, FileDown, Radar, ShieldCheck, TrendingUp } from "lucide-react";
import { useState } from "react";
import { Eyebrow } from "@/components/ui";
import {
  MARKET_SECTORS,
  MARKET_TABS,
  type MarketTabKey,
} from "../constants/market";

const INTEL_POINTS = [
  { icon: Radar, text: "Real-time sector signal across funding, talent and demand" },
  { icon: ShieldCheck, text: "Verified investment and IP activity — no self-reported noise" },
  { icon: FileDown, text: "Exportable market briefs for your deck, in one click" },
];

function smoothPath(series: number[]): string {
  const n = series.length;
  const pts = series.map(
    (v, i) => [(i / (n - 1)) * 100, 42 - v * 36] as const,
  );
  let d = `M${pts[0][0].toFixed(2)},${pts[0][1].toFixed(2)}`;
  for (let i = 1; i < n; i++) {
    const [px, py] = pts[i - 1];
    const [x, y] = pts[i];
    const mx = (px + x) / 2;
    const my = (py + y) / 2;
    d += ` Q${px.toFixed(2)},${py.toFixed(2)} ${mx.toFixed(2)},${my.toFixed(2)}`;
  }
  const [lx, ly] = pts[n - 1];
  d += ` L${lx.toFixed(2)},${ly.toFixed(2)}`;
  return d;
}

export function MarketIntel() {
  const [sectorIdx, setSectorIdx] = useState(0);
  const [tab, setTab] = useState<MarketTabKey>("Trends");
  const sector = MARKET_SECTORS[sectorIdx];
  const path = smoothPath(sector.series);

  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          {/* copy */}
          <div>
            <Eyebrow>StartupHub Intelligence</Eyebrow>
            <h2 className="mt-5 text-balance text-[clamp(1.9rem,3.6vw,2.9rem)] font-semibold leading-[1.08] tracking-[-0.025em] text-ink">
              See where the market is going.
            </h2>
            <p className="mt-5 max-w-md text-pretty text-[16px] leading-relaxed text-slate-500">
              StartupHub is not only an ecosystem — it is a signal layer. Every
              sector, tracked in real time, so you build toward the future instead
              of the past.
            </p>
            <ul className="mt-8 space-y-4">
              {INTEL_POINTS.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-3.5">
                  <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent">
                    <Icon className="h-4 w-4" strokeWidth={2.1} />
                  </span>
                  <span className="text-[14.5px] font-medium leading-relaxed text-ink">
                    {text}
                  </span>
                </li>
              ))}
            </ul>
            <a
              href="/intelligence/market"
              className="group mt-9 inline-flex items-center gap-1.5 text-[14px] font-semibold text-accent"
            >
              Explore Intelligence
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          {/* dashboard fragment */}
          <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-lift">
            <div className="flex items-center gap-2 border-b border-line px-5 py-3.5">
              <TrendingUp className="h-4 w-4 text-accent" strokeWidth={2.2} />
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                Market Snapshot
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
                — {sector.label}
              </span>
              <span className="ml-auto inline-flex items-center gap-1.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="ping-dot absolute inline-flex h-full w-full rounded-full bg-emerald-400" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </span>
                <span className="text-[10px] font-semibold tracking-[0.16em] text-emerald-600">
                  LIVE
                </span>
              </span>
            </div>

            <div className="p-5 sm:p-6">
              {/* sector pills */}
              <div className="flex flex-wrap gap-2">
                {MARKET_SECTORS.map((s, i) => (
                  <button
                    key={s.label}
                    type="button"
                    onClick={() => setSectorIdx(i)}
                    className={`rounded-full border px-3.5 py-1.5 text-[12px] font-semibold transition-all duration-300 ${
                      i === sectorIdx
                        ? "border-accent bg-accent text-white shadow-[0_4px_12px_-4px_rgba(49,87,232,0.5)]"
                        : "border-line bg-white text-slate-500 hover:border-accent/30 hover:text-ink"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>

              {/* stat tiles */}
              <div className="mt-5 grid grid-cols-3 gap-3">
                {sector.stats.map((s) => (
                  <motion.div
                    key={`${sector.label}-${s.label}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="rounded-xl border border-line bg-soft px-4 py-3.5"
                  >
                    <p className="text-lg font-semibold tracking-tight text-ink sm:text-[1.4rem]">
                      {s.value}
                    </p>
                    <p className="mt-0.5 text-[11px] font-medium text-slate-500">
                      {s.label}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* chart */}
              <div className="mt-5 rounded-xl border border-line p-4">
                <svg viewBox="0 0 100 46" className="h-36 w-full" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="area-fill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3157E8" stopOpacity="0.16" />
                      <stop offset="100%" stopColor="#3157E8" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  {[12, 24, 36].map((y) => (
                    <line
                      key={y}
                      x1="0"
                      y1={y}
                      x2="100"
                      y2={y}
                      stroke="#eef1f6"
                      strokeWidth="1"
                      vectorEffect="non-scaling-stroke"
                    />
                  ))}
                  <motion.path
                    key={`area-${sector.label}`}
                    d={`${path} L100,46 L0,46 Z`}
                    fill="url(#area-fill)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  />
                  <motion.path
                    key={`line-${sector.label}`}
                    d={path}
                    fill="none"
                    stroke="#3157E8"
                    strokeWidth="2"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.3, ease: "easeOut" }}
                  />
                  <motion.circle
                    key={`dot-${sector.label}`}
                    cx="100"
                    cy={42 - sector.series[sector.series.length - 1] * 36}
                    r="2.2"
                    fill="#3157E8"
                    stroke="#fff"
                    strokeWidth="1.2"
                    vectorEffect="non-scaling-stroke"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                  />
                </svg>
                <div className="mt-1 flex justify-between text-[10px] font-medium text-slate-400">
                  <span>APR</span>
                  <span>JUL</span>
                  <span>OCT</span>
                  <span>MAR</span>
                </div>
              </div>

              {/* tabs */}
              <div className="mt-5 flex gap-1 border-b border-line">
                {MARKET_TABS.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTab(t)}
                    className={`relative px-3.5 pb-2.5 pt-1 text-[12.5px] font-semibold transition-colors ${
                      tab === t ? "text-accent" : "text-slate-500 hover:text-ink"
                    }`}
                  >
                    {t}
                    {tab === t && (
                      <motion.span
                        layoutId="tab-underline"
                        className="absolute inset-x-2 -bottom-px h-[2px] rounded-full bg-accent"
                      />
                    )}
                  </button>
                ))}
              </div>
              <div className="divide-y divide-line">
                {sector.tabs[tab].map((row, i) => (
                  <motion.div
                    key={`${sector.label}-${tab}-${row.name}`}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35, delay: i * 0.07 }}
                    className="flex items-center gap-4 py-3"
                  >
                    <span className="min-w-0 flex-1 truncate text-[13px] font-medium text-ink">
                      {row.name}
                    </span>
                    <span className="hidden h-1 w-28 overflow-hidden rounded-full bg-accent-soft sm:block">
                      <motion.span
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: row.share }}
                        transition={{ duration: 0.8, delay: 0.15 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                        className="block h-full w-full origin-left rounded-full bg-accent/70"
                      />
                    </span>
                    <span className="w-24 text-right text-[12px] font-semibold text-slate-500">
                      {row.value}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
