"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Briefcase,
  Compass,
  FileText,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { useMemo, useState } from "react";
import type { SectorItem } from "@/lib/data";
import { AnimatedNumber, EASE, Reveal, SectionHeader } from "@/components/motion";

const TABS = [
  { key: "trends", label: "Trends", icon: <TrendingUp className="h-3.5 w-3.5" /> },
  { key: "emerging", label: "Emerging companies", icon: <Sparkles className="h-3.5 w-3.5" /> },
  { key: "investment", label: "Investment", icon: <Briefcase className="h-3.5 w-3.5" /> },
  { key: "ip", label: "IP activity", icon: <FileText className="h-3.5 w-3.5" /> },
] as const;

type TabKey = (typeof TABS)[number]["key"];

function Sparkline({ points }: { points: number[] }) {
  const geom = useMemo(() => {
    const w = 340;
    const h = 96;
    const min = Math.min(...points);
    const max = Math.max(...points);
    const span = max - min || 1;
    const coords = points.map((p, i) => ({
      x: (i / (points.length - 1)) * w,
      y: h - 10 - ((p - min) / span) * (h - 26),
    }));
    const path = coords
      .map((c, i) => (i === 0 ? `M ${c.x} ${c.y}` : `L ${c.x} ${c.y}`))
      .join(" ");
    const area = `${path} L ${w} ${h} L 0 ${h} Z`;
    return { path, area, last: coords[coords.length - 1] };
  }, [points]);

  return (
    <svg viewBox="0 0 340 96" className="h-24 w-full" fill="none">
      <defs>
        <linearGradient id="spark-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3157E8" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#3157E8" stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path
        key={`area-${points.join()}`}
        d={geom.area}
        fill="url(#spark-fill)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      />
      <motion.path
        key={`line-${points.join()}`}
        d={geom.path}
        stroke="#3157E8"
        strokeWidth="2.4"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.4, ease: EASE }}
      />
      <motion.circle
        key={`dot-${points.join()}`}
        cx={geom.last.x}
        cy={geom.last.y}
        r="4.5"
        fill="#3157E8"
        stroke="#fff"
        strokeWidth="2"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.3, duration: 0.5, ease: EASE }}
      />
    </svg>
  );
}

export function Intelligence({ sectors }: { sectors: SectorItem[] }) {
  const [sectorIdx, setSectorIdx] = useState(0);
  const [tab, setTab] = useState<TabKey>("trends");
  const s = sectors[sectorIdx] ?? sectors[0];

  return (
    <section id="intelligence" className="border-t border-line bg-white">
      <div className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <SectionHeader
          eyebrow="Market intelligence"
          title="See where the market is going."
          lede="Live snapshots across sectors — size, momentum, emerging players, capital flow and IP activity — so your next move starts from evidence."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[320px_1fr] lg:gap-12">
          {/* sector selector */}
          <Reveal className="flex snap-x gap-2.5 overflow-x-auto lg:flex-col lg:overflow-visible">
            {sectors.map((sec, i) => {
              const isActive = i === sectorIdx;
              return (
                <button
                  key={sec.slug}
                  onClick={() => setSectorIdx(i)}
                  className={`group shrink-0 snap-start rounded-xl border p-4 text-left transition-all duration-300 lg:w-full ${
                    isActive
                      ? "border-accent/40 bg-accent-mist shadow-soft"
                      : "border-line bg-white hover:border-slate-500/30"
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-[14.5px] font-semibold text-ink">
                        {sec.name}
                      </p>
                      <p className="mt-0.5 font-mono text-[10.5px] tracking-[0.06em] text-slate-400">
                        {sec.marketSize} · {sec.growth} YoY
                      </p>
                    </div>
                    <span
                      className={`h-2 w-2 shrink-0 rounded-full transition-colors duration-300 ${
                        isActive ? "bg-accent" : "bg-line group-hover:bg-slate-500/40"
                      }`}
                    />
                  </div>
                </button>
              );
            })}
          </Reveal>

          {/* dashboard fragment */}
          <Reveal delay={0.1}>
            <div className="overflow-hidden rounded-2xl border border-line bg-soft shadow-soft">
              {/* head */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-white px-6 py-4">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink text-white">
                    <Compass className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="font-mono text-[9.5px] tracking-[0.2em] text-slate-400 uppercase">
                      Market snapshot
                    </p>
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={s.slug}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.3 }}
                        className="text-[15px] font-bold tracking-tight text-ink"
                      >
                        {s.name}
                      </motion.p>
                    </AnimatePresence>
                  </div>
                </div>
                <span className="flex items-center gap-1.5 rounded-full border border-line px-2.5 py-1 font-mono text-[9.5px] tracking-[0.12em] text-slate-500 uppercase">
                  <span className="h-1.5 w-1.5 rounded-full bg-rise" />
                  Updated this week
                </span>
              </div>

              {/* metrics */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={s.slug}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                >
                  <div className="grid grid-cols-3 divide-x divide-line border-b border-line bg-white">
                    <div className="px-4 py-5 sm:px-6">
                      <p className="text-[clamp(1.3rem,2.6vw,1.9rem)] font-semibold tracking-[-0.03em] text-ink">
                        {s.marketSize}
                      </p>
                      <p className="mt-1 text-[10.5px] font-medium tracking-[0.08em] text-slate-400 uppercase sm:text-[11px]">
                        Market size
                      </p>
                    </div>
                    <div className="px-4 py-5 sm:px-6">
                      <p className="flex items-center gap-1 text-[clamp(1.3rem,2.6vw,1.9rem)] font-semibold tracking-[-0.03em] text-rise">
                        <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5" />
                        {s.growth}
                      </p>
                      <p className="mt-1 text-[10.5px] font-medium tracking-[0.08em] text-slate-400 uppercase sm:text-[11px]">
                        YoY growth
                      </p>
                    </div>
                    <div className="px-4 py-5 sm:px-6">
                      <p className="text-[clamp(1.3rem,2.6vw,1.9rem)] font-semibold tracking-[-0.03em] text-ink">
                        <AnimatedNumber key={s.slug} value={s.activeStartups} duration={1.2} />
                      </p>
                      <p className="mt-1 text-[10.5px] font-medium tracking-[0.08em] text-slate-400 uppercase sm:text-[11px]">
                        Active startups
                      </p>
                    </div>
                  </div>

                  {/* sparkline + insight */}
                  <div className="grid gap-6 border-b border-line px-6 py-6 sm:grid-cols-[1.15fr_1fr]">
                    <div>
                      <p className="font-mono text-[9.5px] tracking-[0.18em] text-slate-400 uppercase">
                        Momentum · 12M funding index
                      </p>
                      <div className="mt-3">
                        <Sparkline points={s.sparkline} />
                      </div>
                    </div>
                    <div className="flex flex-col justify-center rounded-xl border border-line bg-white p-5">
                      <p className="font-mono text-[9.5px] tracking-[0.18em] text-accent uppercase">
                        Analyst read
                      </p>
                      <p className="mt-2.5 text-[13.5px] leading-relaxed text-ink">
                        {s.insight}
                      </p>
                    </div>
                  </div>

                  {/* tabs */}
                  <div className="px-6 py-2">
                    <div className="flex flex-wrap gap-1 border-b border-line">
                      {TABS.map((t) => (
                        <button
                          key={t.key}
                          onClick={() => setTab(t.key)}
                          className={`relative flex items-center gap-1.5 px-3.5 py-3 text-[12.5px] font-medium whitespace-nowrap transition-colors duration-300 ${
                            tab === t.key
                              ? "text-accent"
                              : "text-slate-400 hover:text-ink"
                          }`}
                        >
                          {t.icon}
                          {t.label}
                          {tab === t.key && (
                            <motion.span
                              layoutId="intel-tab"
                              className="absolute right-2 -bottom-px left-2 h-[2px] rounded-full bg-accent"
                              transition={{ duration: 0.4, ease: EASE }}
                            />
                          )}
                        </button>
                      ))}
                    </div>

                    <div className="min-h-[168px] py-5">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={`${s.slug}-${tab}`}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.35, ease: EASE }}
                        >
                          {tab === "trends" && (
                            <ul className="space-y-3">
                              {s.trends.map((t, i) => (
                                <li key={t} className="flex items-start gap-3 text-[13.5px] text-ink">
                                  <span className="mt-[3px] font-mono text-[10px] font-semibold text-accent">
                                    0{i + 1}
                                  </span>
                                  {t}
                                </li>
                              ))}
                            </ul>
                          )}

                          {tab === "emerging" && (
                            <ul className="divide-y divide-line">
                              {s.emerging.map((c) => (
                                <li key={c.name} className="flex items-center justify-between py-2.5">
                                  <span className="text-[13.5px] font-semibold text-ink">
                                    {c.name}
                                  </span>
                                  <span className="rounded-md border border-line bg-white px-2 py-0.5 font-mono text-[9.5px] tracking-[0.08em] text-slate-500 uppercase">
                                    {c.stage}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          )}

                          {tab === "investment" && (
                            <div className="grid grid-cols-3 gap-3">
                              {[
                                { l: "Deals this quarter", v: String(s.investment.deals) },
                                { l: "Median cheque", v: s.investment.median },
                                { l: "Momentum QoQ", v: s.investment.qoq, green: true },
                              ].map((m) => (
                                <div key={m.l} className="rounded-xl border border-line bg-white p-4">
                                  <p className={`text-[19px] font-semibold tracking-tight ${m.green ? "text-rise" : "text-ink"}`}>
                                    {m.v}
                                  </p>
                                  <p className="mt-1 text-[10px] font-medium tracking-[0.06em] text-slate-400 uppercase">
                                    {m.l}
                                  </p>
                                </div>
                              ))}
                            </div>
                          )}

                          {tab === "ip" && (
                            <div>
                              <div className="mb-4 flex gap-6">
                                <p className="text-[13px] text-slate-500">
                                  <span className="text-[17px] font-semibold text-ink">
                                    {s.ip.filings}
                                  </span>{" "}
                                  filings
                                </p>
                                <p className="text-[13px] text-slate-500">
                                  <span className="text-[17px] font-semibold text-ink">
                                    {s.ip.grants}
                                  </span>{" "}
                                  grants
                                </p>
                              </div>
                              <div className="space-y-2.5">
                                {s.ip.categories.map((c) => (
                                  <div key={c.label} className="flex items-center gap-3">
                                    <span className="w-32 shrink-0 text-[11.5px] font-medium text-slate-500">
                                      {c.label}
                                    </span>
                                    <div className="h-[7px] flex-1 overflow-hidden rounded-full bg-slate-100">
                                      <motion.div
                                        className="h-full rounded-full bg-accent"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${c.pct}%` }}
                                        transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
                                      />
                                    </div>
                                    <span className="w-8 text-right font-mono text-[10.5px] text-slate-400">
                                      {c.pct}%
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
