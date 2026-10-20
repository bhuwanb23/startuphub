"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  ArrowUpRight,
  Flame,
  Landmark,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import type { MarketSector } from "@/db/schema";
import { CountUp, Reveal } from "@/components/motion";

const EXPO = "cubic-bezier(0.22, 1, 0.36, 1)";

function FadeSwap({ swapKey, children }: { swapKey: string; children: ReactNode }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(false);
    const raf = requestAnimationFrame(() => setShow(true));
    return () => cancelAnimationFrame(raf);
  }, [swapKey]);

  return (
    <div
      style={{
        opacity: show ? 1 : 0,
        transform: show ? "none" : "translateY(12px)",
        transition: `opacity 0.5s ${EXPO}, transform 0.5s ${EXPO}`,
      }}
    >
      {children}
    </div>
  );
}

function Sparkline({ values, id }: { values: number[]; id: string }) {
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    setDrawn(false);
    const raf = requestAnimationFrame(() => setDrawn(true));
    return () => cancelAnimationFrame(raf);
  }, [id]);

  const { line, area } = useMemo(() => {
    const w = 100;
    const h = 40;
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min || 1;
    const pts = values.map((v, i) => {
      const x = (i / (values.length - 1)) * w;
      const y = h - 4 - ((v - min) / range) * (h - 10);
      return [x, y] as const;
    });
    const linePts = pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
    return {
      line: linePts,
      area: `0,${h} ${linePts} ${w},${h}`,
    };
  }, [values]);

  return (
    <svg viewBox="0 0 100 40" className="h-24 w-full" preserveAspectRatio="none" aria-hidden>
      <defs>
        <linearGradient id={`spark-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3157E8" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#3157E8" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={area} fill={`url(#spark-${id})`} />
      <polyline
        points={line}
        fill="none"
        stroke="#3157E8"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        pathLength={100}
        strokeDasharray={100}
        strokeDashoffset={drawn ? 0 : 100}
        style={{ transition: "stroke-dashoffset 1.3s ease 0.1s" }}
      />
    </svg>
  );
}

/* parse "$42.8B" → { num: 42.8, prefix: "$", suffix: "B", decimals: 1 } */
function parseMetric(raw: string) {
  const match = raw.match(/^([^\d]*)([\d]+(?:[.,]\d+)?)(.*)$/);
  if (!match) return { num: 0, prefix: "", suffix: raw, decimals: 0 };
  const numStr = match[2].replace(/,/g, "");
  const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;
  return {
    num: parseFloat(numStr),
    prefix: match[1],
    suffix: match[3],
    decimals,
  };
}

export function MarketPanel({ sectors }: { sectors: MarketSector[] }) {
  const [activeSlug, setActiveSlug] = useState(sectors[0]?.slug ?? "");
  const sector = sectors.find((s) => s.slug === activeSlug) ?? sectors[0];

  if (!sector) return null;

  const sizeParts = parseMetric(sector.marketSize);
  const growthParts = parseMetric(sector.yoyGrowth);
  const capitalParts = parseMetric(sector.capitalDeployed);

  return (
    <section id="intelligence" className="border-y border-line bg-soft py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-accent">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Market Intelligence
              </p>
              <h2 className="mt-4 max-w-xl text-[clamp(2rem,4.5vw,3.4rem)] font-semibold leading-[1.04] tracking-[-0.035em] text-ink">
                See where the market is going.
              </h2>
            </div>
            <p className="max-w-sm text-[15px] leading-relaxed text-slate-500">
              Sector signals, capital flows and IP activity — refreshed
              continuously across the global ecosystem.
            </p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-12 overflow-hidden rounded-2xl border border-line bg-white shadow-card">
            {/* header */}
            <div className="flex flex-col gap-4 border-b border-line px-5 py-4 sm:px-7 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-2.5">
                <span className="rounded-md bg-ink px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white">
                  Market Snapshot
                </span>
                <span className="flex items-center gap-1.5 text-[11px] text-slate-400">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute h-full w-full animate-ping rounded-full bg-accent-500 opacity-60" />
                    <span className="relative h-1.5 w-1.5 rounded-full bg-accent" />
                  </span>
                  Live · 14 sources
                </span>
              </div>
              <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1">
                {sectors.map((s) => (
                  <button
                    key={s.slug}
                    onClick={() => setActiveSlug(s.slug)}
                    className={`whitespace-nowrap rounded-full border px-3.5 py-1.5 text-[12.5px] font-medium transition-all ${
                      s.slug === sector.slug
                        ? "border-accent bg-accent text-white"
                        : "border-line bg-white text-slate-500 hover:border-accent-300 hover:text-ink"
                    }`}
                  >
                    {s.name}
                  </button>
                ))}
              </div>
            </div>

            <FadeSwap swapKey={sector.slug}>
              <div className="grid lg:grid-cols-[1.15fr_1fr]">
                {/* left: numbers */}
                <div className="border-b border-line p-6 sm:p-8 lg:border-b-0 lg:border-r">
                  <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-slate-400">
                    {sector.descriptor}
                  </p>
                  <div className="mt-3 flex items-baseline gap-3">
                    <span className="text-[clamp(2.8rem,6vw,4.2rem)] font-semibold leading-none tracking-[-0.04em] text-ink">
                      <CountUp
                        key={sector.slug}
                        end={sizeParts.num}
                        decimals={sizeParts.decimals}
                        prefix={sizeParts.prefix}
                        suffix={sizeParts.suffix}
                      />
                    </span>
                    <span className="text-[13px] font-medium text-slate-400">
                      market size
                    </span>
                  </div>

                  <div className="mt-6 grid grid-cols-3 gap-4 border-t border-line pt-6">
                    <div>
                      <p className="flex items-center gap-1 text-[13px] font-semibold text-accent">
                        <TrendingUp className="h-3.5 w-3.5" />
                        {growthParts.prefix}
                        {growthParts.num}
                        {growthParts.suffix}
                      </p>
                      <p className="mt-1 text-[11.5px] text-slate-400">YoY growth</p>
                    </div>
                    <div>
                      <p className="text-[13px] font-semibold text-ink">
                        <CountUp
                          key={`s-${sector.slug}`}
                          end={sector.activeStartups}
                        />
                      </p>
                      <p className="mt-1 text-[11.5px] text-slate-400">
                        Active startups
                      </p>
                    </div>
                    <div>
                      <p className="flex items-center gap-1 text-[13px] font-semibold text-ink">
                        <Landmark className="h-3.5 w-3.5 text-slate-400" />
                        <CountUp
                          key={`c-${sector.slug}`}
                          end={capitalParts.num}
                          decimals={capitalParts.decimals}
                          prefix={capitalParts.prefix}
                          suffix={capitalParts.suffix}
                        />
                      </p>
                      <p className="mt-1 text-[11.5px] text-slate-400">
                        Capital deployed
                      </p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="flex items-center justify-between">
                      <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-slate-400">
                        Investment activity — trailing 12 quarters
                      </p>
                      <span className="inline-flex items-center gap-1 rounded-full bg-accent-soft px-2 py-0.5 text-[11px] font-semibold text-accent-deep">
                        <Flame className="h-3 w-3" /> {sector.momentum}
                      </span>
                    </div>
                    <div className="mt-3">
                      <Sparkline values={sector.spark} id={sector.slug} />
                    </div>
                  </div>
                </div>

                {/* right: trends + emerging */}
                <div className="grid grid-rows-2">
                  <div className="border-b border-line p-6 sm:p-8">
                    <p className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                      <Sparkles className="h-3.5 w-3.5 text-accent" />
                      Trends
                    </p>
                    <ul className="mt-4 space-y-3">
                      {sector.trends.map((t) => (
                        <li
                          key={t}
                          className="flex items-start gap-2.5 text-[13.5px] leading-snug text-slate-600"
                        >
                          <ArrowUpRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent-500" />
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-6 sm:p-8">
                    <p className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                      <ShieldCheck className="h-3.5 w-3.5 text-accent" />
                      Emerging companies · IP activity{" "}
                      <span className="ml-auto font-semibold text-ink">
                        {sector.ipFilings.toLocaleString()} filings
                      </span>
                    </p>
                    <ul className="mt-4 space-y-3">
                      {sector.emerging.map((e) => (
                        <li key={e.name} className="flex items-center gap-3">
                          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-accent-mist text-[10px] font-bold text-accent-deep">
                            {e.name.slice(0, 2).toUpperCase()}
                          </span>
                          <span className="min-w-0">
                            <span className="block truncate text-[13.5px] font-medium text-ink">
                              {e.name}
                            </span>
                            <span className="block truncate text-[12px] text-slate-400">
                              {e.detail}
                            </span>
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </FadeSwap>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
