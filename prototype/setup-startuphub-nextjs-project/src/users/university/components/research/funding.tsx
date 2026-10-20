import { AlarmClock, BadgePercent, Landmark, PiggyBank, Wallet } from "lucide-react";
import { Bar, PageIntro, Panel, PanelLink, StatCard } from "@/components/app/widgets";
import {
  AWARDED_FUNDING,
  FUNDING_DEADLINES,
  FUNDING_STATS,
  GRANT_OPPORTUNITIES,
} from "../../constants/research-data";

const STAT_ICONS = [Landmark, Wallet, BadgePercent, PiggyBank] as const;

export function ResearchFunding() {
  return (
    <div className="space-y-6">
      <PageIntro
        title="Research funding"
        description="Open grant windows matched to your research portfolio, awarded programs and utilization — with deadlines the research office is chasing."
        action={
          <button className="inline-flex h-9 items-center rounded-lg bg-accent px-4 text-[13px] font-semibold text-white transition-colors hover:bg-accent-deep">
            Start application
          </button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {FUNDING_STATS.map((s, i) => (
          <StatCard key={s.label} label={s.label} value={s.value} delta={s.delta} hint={s.hint} icon={STAT_ICONS[i]} />
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.5fr_1fr]">
        {/* opportunities */}
        <Panel title={`Opportunities · ${GRANT_OPPORTUNITIES.length}`} action={<PanelLink href="#">Browse all</PanelLink>} bodyClassName="px-0 py-0 sm:px-0">
          <ul className="divide-y divide-line">
            {GRANT_OPPORTUNITIES.map((g) => (
              <li key={g.name} className="flex flex-col gap-3 px-4.5 py-4 transition-colors hover:bg-soft sm:flex-row sm:items-center sm:px-5">
                <div className="min-w-0 flex-1">
                  <p className="text-[13.5px] font-semibold text-ink">{g.name}</p>
                  <p className="mt-0.5 text-[12px] text-slate-400">{g.agency}</p>
                </div>
                <div className="flex items-center gap-5 text-[12px]">
                  <span className="font-semibold text-ink">{g.amount}</span>
                  <span className="text-slate-400">due {g.deadline}</span>
                  <span className="w-20">
                    <span className="mb-1 flex justify-between text-[10.5px]">
                      <span className="text-slate-400">fit</span>
                      <span className="font-bold text-ink">{g.fit}</span>
                    </span>
                    <Bar value={g.fit} />
                  </span>
                  <button className="rounded-lg bg-accent px-3 py-1.5 text-[12px] font-semibold text-white transition-colors hover:bg-accent-deep">
                    Apply
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </Panel>

        <div className="grid content-start gap-4">
          {/* deadlines */}
          <Panel title="Upcoming deadlines">
            <ul className="space-y-2.5">
              {FUNDING_DEADLINES.map((d) => (
                <li key={d.grant} className="flex items-center justify-between gap-3 rounded-lg bg-accent-mist px-3.5 py-2.5">
                  <span className="flex items-center gap-2 text-[12.5px] font-medium text-ink">
                    <AlarmClock className="h-3.5 w-3.5 text-amber-500" />
                    {d.grant}
                  </span>
                  <span className="text-[11.5px] font-bold text-amber-700">{d.due}</span>
                </li>
              ))}
            </ul>
          </Panel>

          {/* awarded */}
          <Panel title="Awarded & utilization" action={<PanelLink href="#">Reports</PanelLink>}>
            <ul className="space-y-4">
              {AWARDED_FUNDING.map((a) => (
                <li key={a.grant}>
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-[13px] font-semibold text-ink">{a.grant}</span>
                    <span className="text-[12px] font-bold text-accent-deep">{a.amount}</span>
                  </div>
                  <p className="mb-1.5 mt-0.5 text-[11.5px] text-slate-400">
                    {a.agency} · {a.project}
                  </p>
                  <Bar value={a.utilization} tone={a.utilization >= 100 ? "ink" : "accent"} />
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </div>
    </div>
  );
}
