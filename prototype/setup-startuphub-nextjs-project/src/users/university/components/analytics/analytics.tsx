import { BookOpen, GitBranch, IndianRupee, Target } from "lucide-react";
import { Bar, PageIntro, Panel, PanelLink, StatCard } from "@/components/app/widgets";
import {
  ANALYTICS_STATS,
  COMMERCIAL_FUNNEL,
  FUNDING_SOURCES,
  IP_BY_DEPT,
  OUTCOME_ROWS,
  PUB_SERIES,
  TECH_SERIES,
  YEAR_LABELS,
} from "../../constants/analytics-data";

const STAT_ICONS = [BookOpen, GitBranch, IndianRupee, Target] as const;

function toPoints(series: number[], w: number, h: number, min: number, max: number) {
  return series
    .map((v, i) => {
      const x = (i / (series.length - 1)) * w;
      const y = h - 6 - ((v - min) / (max - min)) * (h - 16);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
}

function OutputChart() {
  const w = 720;
  const h = 200;
  const pubNorm = PUB_SERIES.map((v) => v / 10); // normalize onto shared scale
  const techNorm = TECH_SERIES.map((v) => v);
  const all = [...pubNorm, ...techNorm];
  const min = Math.min(...all) - 4;
  const max = Math.max(...all) + 8;
  const pubPts = toPoints(pubNorm, w, h, min, max);
  const techPts = toPoints(techNorm, w, h, min, max);

  return (
    <div>
      <div className="mb-3 flex items-center gap-5 text-[12px] font-medium text-slate-500">
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-accent" /> Publications /yr
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-slate-300" /> Technologies developed
        </span>
      </div>
      <svg viewBox={`0 0 ${w} ${h}`} className="h-auto w-full" aria-hidden>
        <defs>
          <linearGradient id="uni-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3157E8" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#3157E8" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75].map((t) => (
          <line key={t} x1="0" x2={w} y1={h * t} y2={h * t} stroke="#EDF0F6" strokeWidth="1" />
        ))}
        <polygon points={`0,${h} ${pubPts} ${w},${h}`} fill="url(#uni-area)" />
        <polyline points={pubPts} fill="none" stroke="#3157E8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
        <polyline points={techPts} fill="none" stroke="#C3CCDE" strokeWidth="1.8" strokeDasharray="5 5" vectorEffect="non-scaling-stroke" />
      </svg>
      <div className="mt-2 flex justify-between text-[10.5px] font-medium uppercase tracking-wide text-slate-400">
        {YEAR_LABELS.map((y) => (
          <span key={y}>{y}</span>
        ))}
      </div>
    </div>
  );
}

export function UniversityAnalytics() {
  const funnelMax = COMMERCIAL_FUNNEL[0].value;

  return (
    <div className="space-y-6">
      <PageIntro
        title="Research intelligence"
        description="How research converts into IP, licenses, spin-offs and impact — the numbers leadership reports upward."
        action={
          <button className="inline-flex h-9 items-center rounded-lg border border-line bg-white px-4 text-[13px] font-medium text-slate-600 transition-colors hover:bg-soft">
            Download annual report
          </button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {ANALYTICS_STATS.map((s, i) => (
          <StatCard key={s.label} label={s.label} value={s.value} delta={s.delta} hint={s.hint} icon={STAT_ICONS[i]} />
        ))}
      </div>

      <Panel title="Research output & technology development" action={<PanelLink href="#">Full dataset</PanelLink>}>
        <OutputChart />
      </Panel>

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="IP by department">
          <ul className="space-y-3.5">
            {IP_BY_DEPT.map((d) => (
              <li key={d.dept}>
                <div className="mb-1.5 flex items-center justify-between text-[12.5px]">
                  <span className="font-medium text-slate-600">{d.dept}</span>
                  <span className="font-semibold text-ink">{d.count} filings</span>
                </div>
                <Bar value={d.pct} tone={d.pct > 70 ? "accent" : "ink"} />
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Funding sources">
          <ul className="space-y-3.5">
            {FUNDING_SOURCES.map((f) => (
              <li key={f.src}>
                <div className="mb-1.5 flex items-center justify-between text-[12.5px]">
                  <span className="font-medium text-slate-600">{f.src}</span>
                  <span className="font-semibold text-ink">{f.pct}%</span>
                </div>
                <Bar value={f.pct} tone="ink" />
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Commercialization funnel">
          <ul className="space-y-3.5">
            {COMMERCIAL_FUNNEL.map((f, i) => (
              <li key={f.stage}>
                <div className="mb-1.5 flex items-center justify-between text-[12.5px]">
                  <span className="font-medium text-slate-600">{f.stage}</span>
                  <span className="font-semibold text-ink">{f.value}</span>
                </div>
                <Bar value={(f.value / funnelMax) * 100} tone={i >= 3 ? "accent" : "ink"} />
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Conversion health">
          <ul className="divide-y divide-line">
            {OUTCOME_ROWS.map((r) => (
              <li key={r.name} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                <span className="text-[13px] font-medium text-slate-600">{r.name}</span>
                <span className="text-right">
                  <span className="mr-2 text-[14px] font-bold text-ink">{r.value}</span>
                  <span className="text-[11.5px] font-semibold text-accent">{r.delta}</span>
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-4 rounded-lg bg-accent-mist px-3.5 py-3 text-[12px] leading-relaxed text-slate-600">
            Research-to-market conversion of 11.5% places Crestmont in the top
            decile of comparable institutions.
          </p>
        </Panel>
      </div>
    </div>
  );
}
