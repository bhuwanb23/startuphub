import { ArrowDownToLine, Gauge, Landmark, Percent } from "lucide-react";
import { Bar, PageIntro, Panel, StatCard } from "@/components/app/widgets";
import {
  BENCH_SERIES,
  FUND_SERIES,
  SECTOR_MIX,
} from "../../constants/dashboard-data";

const QUARTERS = ["Q1", "Q2", "Q3", "Q4", "Q1", "Q2", "Q3", "Q4", "Q1"];

function toPoints(series: number[], w: number, h: number, min: number, max: number) {
  return series
    .map((v, i) => {
      const x = (i / (series.length - 1)) * w;
      const y = h - 6 - ((v - min) / (max - min)) * (h - 16);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
}

function FundChart() {
  const w = 720;
  const h = 220;
  const all = [...FUND_SERIES, ...BENCH_SERIES];
  const min = Math.min(...all) - 4;
  const max = Math.max(...all) + 6;
  const fundPts = toPoints(FUND_SERIES, w, h, min, max);
  const benchPts = toPoints(BENCH_SERIES, w, h, min, max);

  return (
    <div>
      <div className="mb-3 flex items-center gap-5 text-[12px] font-medium text-slate-500">
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-accent" /> Meridian Fund II
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-slate-300" /> Cambridge VC Index
        </span>
        <span className="ml-auto font-semibold text-ink">Indexed · Q1 2023 = 100</span>
      </div>
      <svg viewBox={`0 0 ${w} ${h}`} className="h-auto w-full" aria-hidden>
        <defs>
          <linearGradient id="fund-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3157E8" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#3157E8" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75].map((t) => (
          <line
            key={t}
            x1="0"
            x2={w}
            y1={h * t}
            y2={h * t}
            stroke="#EDF0F6"
            strokeWidth="1"
          />
        ))}
        <polygon points={`0,${h} ${fundPts} ${w},${h}`} fill="url(#fund-area)" />
        <polyline
          points={benchPts}
          fill="none"
          stroke="#C3CCDE"
          strokeWidth="1.8"
          strokeDasharray="5 5"
          vectorEffect="non-scaling-stroke"
        />
        <polyline
          points={fundPts}
          fill="none"
          stroke="#3157E8"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
        <circle
          cx={w}
          cy={h - 6 - ((FUND_SERIES[FUND_SERIES.length - 1] - min) / (max - min)) * (h - 16)}
          r="4"
          fill="#3157E8"
          stroke="#fff"
          strokeWidth="2"
        />
      </svg>
      <div className="mt-2 flex justify-between text-[10.5px] font-medium uppercase tracking-wide text-slate-400">
        {QUARTERS.map((q, i) => (
          <span key={`${q}-${i}`}>{q}</span>
        ))}
      </div>
    </div>
  );
}

export function PortfolioPerformance() {
  return (
    <div className="space-y-6">
      <PageIntro
        title="Fund performance"
        description="Fund II is tracking 2.4x gross TVPI — 102 points ahead of the benchmark index on an indexed basis."
        action={
          <button className="inline-flex h-9 items-center gap-2 rounded-lg border border-line bg-white px-3.5 text-[13px] font-medium text-slate-600 transition-colors hover:bg-soft">
            <ArrowDownToLine className="h-4 w-4" /> LP report
          </button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Gross TVPI" value="2.4x" delta="+0.2x" hint="QoQ" icon={Landmark} />
        <StatCard label="Net IRR" value="31.2%" delta="+1.8 pts" icon={Percent} />
        <StatCard label="DPI" value="0.8x" hint="2 exits realized" icon={Gauge} />
        <StatCard label="Follow-on reserve" value="₹12 Cr" hint="38% of fund" icon={ArrowDownToLine} />
      </div>

      <Panel title="Fund II vs benchmark — indexed value">
        <FundChart />
      </Panel>

      <div className="grid gap-4 xl:grid-cols-2">
        <Panel title="Return contribution by sector">
          <ul className="space-y-3.5">
            {SECTOR_MIX.map((s) => (
              <li key={s.sector}>
                <div className="mb-1.5 flex items-center justify-between text-[12.5px]">
                  <span className="font-medium text-slate-600">{s.sector}</span>
                  <span className="font-semibold text-ink">{s.pct}%</span>
                </div>
                <Bar value={s.pct} tone={s.pct > 25 ? "accent" : "ink"} />
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Realized & markups">
          <ul className="divide-y divide-line">
            {[
              { name: "OrbitPay exit (partial)", detail: "Secondary · Feb 2026", value: "+₹9.2 Cr" },
              { name: "Canopy Analytics markup", detail: "Series A up-round · Jan 2026", value: "+₹18.2 Cr" },
              { name: "KredKart markup", detail: "Series B · Nov 2025", value: "+₹20.3 Cr" },
              { name: "NanoKart markdown", detail: "Impairment review · Dec 2025", value: "-₹0.4 Cr", neg: true },
            ].map((r) => (
              <li key={r.name} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                <span>
                  <span className="block text-[13.5px] font-medium text-ink">{r.name}</span>
                  <span className="block text-[12px] text-slate-400">{r.detail}</span>
                </span>
                <span className={`text-[13.5px] font-bold ${r.neg ? "text-red-600" : "text-ink"}`}>
                  {r.value}
                </span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </div>
  );
}
