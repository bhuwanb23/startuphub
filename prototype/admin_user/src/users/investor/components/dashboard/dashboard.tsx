import { ArrowRight, ArrowUpRight } from "lucide-react";
import { AvatarInitials, Meter, Panel, Stat, Tag } from "@/components/app/widgets";
import {
  INVESTOR_STATS,
  NEW_MATCHES,
  PIPELINE_STAGES,
  PORTFOLIO_PULSE,
  UPCOMING_MEETINGS,
} from "../../constants/dashboard-data";

export function InvestorDashboard() {
  const maxStage = Math.max(...PIPELINE_STAGES.map((s) => s.count));

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      {/* welcome strip */}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-slate-400">
            Tuesday, April 14 · Bengaluru
          </p>
          <h2 className="mt-1.5 text-[22px] font-semibold tracking-tight text-ink">
            Good morning, Aditya
          </h2>
        </div>
        <a
          href="/investor/dealflow"
          className="group inline-flex items-center gap-1.5 text-[13px] font-semibold text-accent"
        >
          Review this week&apos;s dealflow
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
        </a>
      </div>

      {/* stat row */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {INVESTOR_STATS.map((stat) => (
          <Stat key={stat.label} {...stat} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* new matches */}
        <Panel
          className="lg:col-span-3"
          title="New matches for your thesis"
          description="Signal-ranked against AI · Climate · FinTech Infra focus"
          action={<Tag tone="accent">4 this week</Tag>}
          bodyClassName="p-0"
        >
          <div className="divide-y divide-line">
            {NEW_MATCHES.map((m) => (
              <a
                key={m.name}
                href="/investor/dealflow/matching"
                className="group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-soft/70"
              >
                <AvatarInitials initials={m.name.slice(0, 2).toUpperCase()} />
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-2">
                    <span className="truncate text-[13.5px] font-semibold text-ink group-hover:text-accent">
                      {m.name}
                    </span>
                    <Tag tone="slate" className="normal-case tracking-normal">
                      {m.stage}
                    </Tag>
                  </span>
                  <span className="mt-0.5 block truncate text-[12px] text-slate-400">
                    {m.note}
                  </span>
                </span>
                <span className="hidden shrink-0 text-right sm:block">
                  <span className="block text-[15px] font-semibold text-accent">
                    {m.signal}
                  </span>
                  <span className="block text-[10px] font-medium uppercase tracking-wide text-slate-400">
                    signal
                  </span>
                </span>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-slate-300 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
              </a>
            ))}
          </div>
        </Panel>

        <div className="space-y-6 lg:col-span-2">
          {/* pipeline snapshot */}
          <Panel title="Pipeline snapshot" description="All active opportunities">
            <div className="space-y-3.5">
              {PIPELINE_STAGES.map((stage) => (
                <div key={stage.stage} className="flex items-center gap-3">
                  <span className="w-20 shrink-0 text-[12px] font-medium text-slate-500">
                    {stage.stage}
                  </span>
                  <Meter value={stage.count / maxStage} className="flex-1" />
                  <span className="w-8 shrink-0 text-right text-[12.5px] font-semibold text-ink">
                    {stage.count}
                  </span>
                </div>
              ))}
            </div>
          </Panel>

          {/* upcoming meetings */}
          <Panel
            title="Upcoming meetings"
            bodyClassName="p-0"
            action={
              <a
                href="/investor/meetings"
                className="text-[12px] font-semibold text-accent hover:underline"
              >
                View all
              </a>
            }
          >
            <div className="divide-y divide-line">
              {UPCOMING_MEETINGS.map((meeting) => (
                <div key={meeting.who} className="flex items-center gap-3.5 px-5 py-3.5">
                  <AvatarInitials
                    initials={meeting.who.split(" ").map((w) => w[0]).join("")}
                    className="h-8 w-8 text-[11px]"
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[13px] font-semibold text-ink">
                      {meeting.who} <span className="font-medium text-slate-400">· {meeting.org}</span>
                    </span>
                    <span className="block text-[11.5px] text-slate-400">{meeting.kind}</span>
                  </span>
                  <span className="shrink-0 text-[12px] font-semibold text-slate-500">
                    {meeting.when}
                  </span>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </div>

      {/* portfolio pulse */}
      <Panel
        title="Portfolio pulse"
        description="Latest signal from your holdings"
        action={
          <a
            href="/investor/portfolio"
            className="text-[12px] font-semibold text-accent hover:underline"
          >
            Open portfolio
          </a>
        }
        bodyClassName="p-0"
      >
        <div className="grid divide-y divide-line sm:grid-cols-2 sm:divide-x lg:grid-cols-4 lg:divide-y-0">
          {PORTFOLIO_PULSE.map((holding) => (
            <div key={holding.name} className="px-5 py-4">
              <p className="text-[13px] font-semibold text-ink">{holding.name}</p>
              <p className="mt-1 text-[12.5px] font-medium text-slate-500">
                {holding.metric}
              </p>
              <p
                className={`mt-2 text-[11.5px] font-semibold ${
                  holding.tone === "up"
                    ? "text-emerald-600"
                    : holding.tone === "down"
                      ? "text-rose-600"
                      : "text-slate-400"
                }`}
              >
                {holding.delta}
              </p>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
