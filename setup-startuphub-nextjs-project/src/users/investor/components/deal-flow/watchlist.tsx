import { ArrowUpRight, BellRing, TrendingUp } from "lucide-react";
import { Avatar, PageIntro, Panel } from "@/components/app/widgets";
import { WATCHLIST } from "../../constants/dashboard-data";

function MiniSpark({ values }: { values: number[] }) {
  const w = 84;
  const h = 28;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const pts = values
    .map((v, i) => {
      const x = (i / (values.length - 1)) * w;
      const y = h - 3 - ((v - min) / range) * (h - 6);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-7 w-[84px]" aria-hidden>
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

export function DealFlowWatchlist() {
  return (
    <div className="space-y-6">
      <PageIntro
        title="Watchlist"
        description="Companies you're tracking before committing. Triggers notify you when a metric crosses your threshold."
        action={
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-3 py-1.5 text-[12px] font-semibold text-accent-deep">
            <BellRing className="h-3.5 w-3.5" /> 4 active triggers
          </span>
        }
      />

      <Panel
        title={`Tracking · ${WATCHLIST.length}`}
        action={<span className="text-[12px] text-slate-400">Last 7 periods</span>}
        bodyClassName="px-0 py-0 sm:px-0"
      >
        <ul className="divide-y divide-line">
          {WATCHLIST.map((w) => (
            <li
              key={w.name}
              className="flex flex-col gap-3 px-4.5 py-4 transition-colors hover:bg-soft sm:px-5 lg:flex-row lg:items-center"
            >
              <div className="flex min-w-0 flex-1 items-center gap-3.5">
                <Avatar name={w.name} />
                <span className="min-w-0">
                  <span className="block truncate text-[14px] font-semibold text-ink">
                    {w.name}
                  </span>
                  <span className="block truncate text-[12px] text-slate-400">
                    {w.sector}
                  </span>
                </span>
              </div>

              <span className="flex items-center gap-2 text-[13px] font-semibold text-ink lg:w-36">
                <TrendingUp className="h-3.5 w-3.5 text-accent" />
                {w.metric}
              </span>

              <div className="lg:mx-2">
                <MiniSpark values={w.series} />
              </div>

              <p className="min-w-0 flex-1 text-[12px] leading-snug text-slate-500">
                {w.note}
              </p>

              <a
                href="#"
                className="inline-flex items-center gap-1 text-[12.5px] font-semibold text-accent transition-colors hover:text-accent-deep"
              >
                Open <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}
