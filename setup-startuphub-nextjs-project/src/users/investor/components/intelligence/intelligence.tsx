import { Activity, Flame, Radar, Receipt } from "lucide-react";
import { PageIntro, Panel, PanelLink, StatCard } from "@/components/app/widgets";
import { SECTORS_INTEL, SIGNALS } from "../../constants/dashboard-data";

function SectorSpark({ values }: { values: number[] }) {
  const w = 100;
  const h = 32;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const pts = values
    .map((v, i) => {
      const x = (i / (values.length - 1)) * w;
      const y = h - 4 - ((v - min) / range) * (h - 8);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-12 w-full" preserveAspectRatio="none" aria-hidden>
      <polyline
        points={pts}
        fill="none"
        stroke="#3157E8"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

export function InvestorIntelligence() {
  return (
    <div className="space-y-6">
      <PageIntro
        title="Market & signals"
        description="Where your sectors are moving — deal volume, check sizes and ecosystem signals, refreshed continuously."
        action={
          <span className="rounded-full bg-accent-soft px-3 py-1.5 text-[12px] font-semibold text-accent-deep">
            Live · 14 sources
          </span>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Deals tracked" value="1,001" delta="+64" hint="this quarter" icon={Radar} />
        <StatCard label="Median seed check" value="$2.1M" delta="+8%" hint="your sectors" icon={Receipt} />
        <StatCard label="Hot sector" value="Climate" hint="+22.1% YoY" icon={Flame} />
        <StatCard label="Signal velocity" value="31/wk" delta="+9" icon={Activity} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {SECTORS_INTEL.map((s) => (
          <section
            key={s.name}
            className="rounded-xl border border-line bg-white p-4.5 shadow-[0_1px_2px_rgba(11,18,32,0.03)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card sm:p-5"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-[13px] font-semibold text-ink">{s.name}</h3>
              <span className="text-[12px] font-bold text-accent">{s.growth}</span>
            </div>
            <div className="mt-3">
              <SectorSpark values={s.spark} />
            </div>
            <div className="mt-3 flex items-center justify-between border-t border-line pt-3 text-[11.5px] text-slate-400">
              <span>
                <span className="font-semibold text-ink">{s.deals}</span> deals
              </span>
              <span>
                avg <span className="font-semibold text-ink">{s.avgCheck}</span>
              </span>
              <span className="font-medium text-slate-500">YoY</span>
            </div>
          </section>
        ))}
      </div>

      <Panel
        title="Signal feed"
        action={<PanelLink href="#">Configure alerts</PanelLink>}
        bodyClassName="px-0 py-0 sm:px-0"
      >
        <ul className="divide-y divide-line">
          {SIGNALS.map((s) => (
            <li key={s.title} className="flex items-start gap-3.5 px-4.5 py-4 transition-colors hover:bg-soft sm:px-5">
              <span className="mt-0.5 rounded-full bg-accent-soft px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-accent-deep">
                {s.tag}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[13.5px] font-medium text-ink">{s.title}</span>
                <span className="block text-[12.5px] leading-snug text-slate-400">{s.detail}</span>
              </span>
              <span className="shrink-0 text-[11.5px] text-slate-400">{s.time}</span>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}
