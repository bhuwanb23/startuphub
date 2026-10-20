import { HandCoins, Plus, Rocket, Store, TrendingUp } from "lucide-react";
import {
  Avatar,
  Bar,
  PageIntro,
  StatCard,
} from "@/components/app/widgets";
import { cn } from "@/lib/utils";
import {
  SPINOFFS,
  SPINOFF_STATS,
  STAGE_TONE,
} from "../../constants/commercialization-data";

const STAT_ICONS = [Rocket, Store, TrendingUp, HandCoins] as const;

export function StartupSpinoffs() {
  return (
    <div className="space-y-6">
      <PageIntro
        title="Startup spin-offs"
        description="Research becoming companies — who founded them, which technology they carry, how far they've travelled."
        action={
          <button className="inline-flex h-9 items-center gap-2 rounded-lg bg-accent px-4 text-[13px] font-semibold text-white transition-colors hover:bg-accent-deep">
            <Plus className="h-4 w-4" /> Register spin-off
          </button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {SPINOFF_STATS.map((s, i) => (
          <StatCard key={s.label} label={s.label} value={s.value} delta={s.delta} hint={s.hint} icon={STAT_ICONS[i]} />
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {SPINOFFS.map((s) => (
          <article
            key={s.name}
            className="rounded-xl border border-line bg-white p-5 shadow-[0_1px_2px_rgba(11,18,32,0.03)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <Avatar name={s.name} className="h-10 w-10 text-[12px]" />
                <div>
                  <h3 className="text-[15px] font-semibold tracking-[-0.01em] text-ink">{s.name}</h3>
                  <p className="text-[11.5px] text-slate-400">{s.tech}</p>
                </div>
              </div>
              <span className={cn("rounded-full px-2.5 py-1 text-[10.5px] font-semibold", STAGE_TONE[s.stage])}>
                {s.stage}
              </span>
            </div>

            <p className="mt-3 text-[12.5px] text-slate-500">
              Founded by <span className="font-medium text-ink">{s.founder}</span>
            </p>
            <p className="mt-0.5 text-[12px] text-slate-400">{s.incubator}</p>

            <div className="mt-4">
              <div className="mb-1.5 flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Journey progress</span>
                <span className="font-bold text-ink">{s.progress}%</span>
              </div>
              <Bar value={s.progress} tone={s.progress >= 80 ? "accent" : "ink"} />
            </div>

            <p className="mt-3.5 border-t border-line pt-3 text-[11.5px] font-medium text-slate-500">
              IP · <span className="text-accent-deep">{s.ip}</span>
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
