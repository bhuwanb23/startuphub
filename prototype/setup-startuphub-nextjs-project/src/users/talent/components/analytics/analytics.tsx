import { ArrowDownToLine, Eye, IndianRupee, Percent, SearchCode } from "lucide-react";
import { Bar, PageIntro, Panel, PanelLink, StatCard } from "@/components/app/widgets";
import {
  ANALYTICS_STATS,
  APP_FUNNEL,
  EARNINGS,
  MONTH_LABELS,
  SEARCH_SERIES,
  SKILL_DEMAND,
  VIEWS_SERIES,
} from "../../constants/analytics-data";

const STAT_ICONS = [Eye, SearchCode, Percent, IndianRupee] as const;

function toPoints(series: number[], w: number, h: number, min: number, max: number) {
  return series
    .map((v, i) => {
      const x = (i / (series.length - 1)) * w;
      const y = h - 6 - ((v - min) / (max - min)) * (h - 16);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
}

function VIEWS_CHART_WIDTH() {
  return 720;
}

function ProfileChart() {
  const w = VIEWS_CHART_WIDTH();
  const h = 200;
  const all = [...VIEWS_SERIES, ...SEARCH_SERIES];
  const min = Math.min(...all) - 60;
  const max = Math.max(...all) + 120;
  const viewPts = toPoints(VIEWS_SERIES, w, h, min, max);
  const searchPts = toPoints(SEARCH_SERIES, w, h, min, max);

  return (
    <div>
      <div className="mb-3 flex items-center gap-5 text-[12px] font-medium text-slate-500">
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-accent" /> Profile views
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-slate-300" /> Search appearances
        </span>
        <span className="ml-auto font-semibold text-ink">Trailing 12 months</span>
      </div>
      <svg viewBox={`0 0 ${w} ${h}`} className="h-auto w-full" aria-hidden>
        <defs>
          <linearGradient id="talent-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3157E8" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#3157E8" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75].map((t) => (
          <line key={t} x1="0" x2={w} y1={h * t} y2={h * t} stroke="#EDF0F6" strokeWidth="1" />
        ))}
        <polygon points={`0,${h} ${viewPts} ${w},${h}`} fill="url(#talent-area)" />
        <polyline points={searchPts} fill="none" stroke="#C3CCDE" strokeWidth="1.8" strokeDasharray="5 5" vectorEffect="non-scaling-stroke" />
        <polyline points={viewPts} fill="none" stroke="#3157E8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
      </svg>
      <div className="mt-2 flex justify-between text-[10.5px] font-medium uppercase tracking-wide text-slate-400">
        {MONTH_LABELS.map((m) => (
          <span key={m}>{m}</span>
        ))}
      </div>
    </div>
  );
}

export function TalentAnalytics() {
  const funnelMax = APP_FUNNEL[0].value;

  return (
    <div className="space-y-6">
      <PageIntro
        title="Professional analytics"
        description="How the market sees you — visibility trends, application conversion, skill demand and earnings."
        action={
          <button className="inline-flex h-9 items-center gap-2 rounded-lg border border-line bg-white px-4 text-[13px] font-medium text-slate-600 transition-colors hover:bg-soft">
            <ArrowDownToLine className="h-4 w-4" /> Export report
          </button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {ANALYTICS_STATS.map((s, i) => (
          <StatCard key={s.label} label={s.label} value={s.value} delta={s.delta} hint={s.hint} icon={STAT_ICONS[i]} />
        ))}
      </div>

      <Panel title="Visibility — views & appearances" action={<PanelLink href="#">Search terms</PanelLink>}>
        <ProfileChart />
      </Panel>

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Application funnel — this quarter">
          <ul className="space-y-3.5">
            {APP_FUNNEL.map((f, i) => (
              <li key={f.stage}>
                <div className="mb-1.5 flex items-center justify-between text-[12.5px]">
                  <span className="font-medium text-slate-600">{f.stage}</span>
                  <span className="font-semibold text-ink">{f.value}</span>
                </div>
                <Bar value={(f.value / funnelMax) * 100} tone={i >= 2 ? "accent" : "ink"} />
              </li>
            ))}
          </ul>
          <p className="mt-5 rounded-lg bg-accent-mist px-3.5 py-3 text-[12px] leading-relaxed text-slate-600">
            50% interview → offer conversion — twice the platform median for
            your category.
          </p>
        </Panel>

        <Panel title="Earnings overview">
          <ul className="divide-y divide-line">
            {EARNINGS.map((e) => (
              <li key={e.label} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                <span className="text-[13px] text-slate-600">{e.label}</span>
                <span className="text-right">
                  <span className="text-[14px] font-bold text-ink">{e.value}</span>
                  {e.delta && <span className="ml-2 text-[11.5px] font-semibold text-accent">{e.delta}</span>}
                  {e.hint && <span className="block text-[11px] text-slate-400">{e.hint}</span>}
                </span>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Your skills vs market demand" className="lg:col-span-2">
          <ul className="grid gap-x-8 gap-y-3.5 sm:grid-cols-2">
            {SKILL_DEMAND.map((s) => (
              <li key={s.skill}>
                <div className="mb-1.5 flex items-center justify-between text-[12.5px]">
                  <span className="font-medium text-slate-600">{s.skill}</span>
                  <span className="font-semibold text-ink">{s.pct} demand</span>
                </div>
                <Bar value={s.pct} tone={s.pct > 80 ? "accent" : "ink"} />
              </li>
            ))}
          </ul>
          <p className="mt-5 rounded-lg bg-accent-mist px-3.5 py-3 text-[12px] leading-relaxed text-slate-600">
            Applied GenAI demand is up 31% quarter-over-quarter — your verified
            skill clears you into 86% of those postings.
          </p>
        </Panel>
      </div>
    </div>
  );
}
