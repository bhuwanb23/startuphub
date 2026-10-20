import { ArrowUpRight, Briefcase, Flame, Gauge, Landmark } from "lucide-react";
import {
  Avatar,
  Bar,
  HealthDot,
  PageIntro,
  Panel,
  PanelLink,
  StatCard,
} from "@/components/app/widgets";
import {
  DEALS,
  DEAL_STAGES,
  MATCHES,
  MEETINGS,
  PORTFOLIO,
  SIGNALS,
} from "../../constants/dashboard-data";

const KIND_TONE: Record<string, string> = {
  IC: "bg-ink text-white",
  "Founder call": "bg-accent-soft text-accent-deep",
  Portfolio: "bg-slate-100 text-slate-600",
  LP: "bg-slate-100 text-slate-600",
  Partner: "bg-accent-soft text-accent-deep",
};

export function InvestorDashboard() {
  const stageCounts = DEAL_STAGES.map(
    (s) => DEALS.filter((d) => d.stage === s).length,
  );

  return (
    <div className="space-y-6">
      <PageIntro
        title="Good morning, Arjun"
        description="Three deals need your attention today — one IC review, one term sheet walkthrough, and a first call with a 94-fit match."
        action={
          <a
            href="/investor/deal-flow/screening"
            className="inline-flex h-9 items-center gap-2 rounded-lg bg-accent px-4 text-[13px] font-semibold text-white transition-colors hover:bg-accent-deep"
          >
            Review screening queue
            <ArrowUpRight className="h-4 w-4" />
          </a>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Active deals" value="18" delta="+4" hint="this month" icon={Gauge} />
        <StatCard label="Portfolio companies" value="24" hint="6 in your sectors" icon={Briefcase} />
        <StatCard label="Portfolio value" value="₹86.4 Cr" delta="2.4x" hint="gross multiple" icon={Landmark} />
        <StatCard label="Signals this week" value="31" delta="+9" icon={Flame} />
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        {/* pipeline snapshot */}
        <Panel
          title="Pipeline by stage"
          action={<PanelLink href="/investor/deal-flow">Open board</PanelLink>}
          className="xl:col-span-1"
        >
          <ul className="space-y-3.5">
            {DEAL_STAGES.map((stage, i) => (
              <li key={stage}>
                <div className="mb-1.5 flex items-center justify-between text-[12.5px]">
                  <span className="font-medium text-slate-600">{stage}</span>
                  <span className="font-semibold text-ink">{stageCounts[i]}</span>
                </div>
                <Bar
                  value={(stageCounts[i] / DEALS.length) * 100 * 2.5}
                  tone={i >= 3 ? "accent" : "ink"}
                />
              </li>
            ))}
          </ul>
          <p className="mt-4 border-t border-line pt-3.5 text-[12px] text-slate-400">
            10 active opportunities · 1 in term sheet
          </p>
        </Panel>

        {/* top matches */}
        <Panel
          title="Top thesis matches"
          action={<PanelLink href="/investor/deal-flow/matching">All matches</PanelLink>}
          className="xl:col-span-1"
        >
          <ul className="divide-y divide-line">
            {MATCHES.slice(0, 3).map((m) => (
              <li key={m.name} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                <Avatar name={m.name} />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[13.5px] font-medium text-ink">
                    {m.name}
                  </span>
                  <span className="block truncate text-[12px] text-slate-400">
                    {m.sector} · {m.stage}
                  </span>
                </span>
                <span className="rounded-full bg-accent-soft px-2.5 py-1 text-[11.5px] font-bold text-accent-deep">
                  {m.score}
                </span>
              </li>
            ))}
          </ul>
        </Panel>

        {/* today */}
        <Panel
          title="Today"
          action={<PanelLink href="/investor/meetings">Schedule</PanelLink>}
          className="xl:col-span-1"
        >
          <ul className="divide-y divide-line">
            {MEETINGS.slice(0, 3).map((m) => (
              <li key={m.title} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                <span className="w-11 shrink-0 text-[12px] font-semibold tabular-nums text-slate-500">
                  {m.time}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[13px] font-medium text-ink">
                    {m.title}
                  </span>
                  <span className="block truncate text-[11.5px] text-slate-400">
                    {m.withWhom}
                  </span>
                </span>
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${KIND_TONE[m.kind]}`}>
                  {m.kind}
                </span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        {/* signals */}
        <Panel
          title="Ecosystem signals"
          action={<PanelLink href="/investor/intelligence">Intelligence</PanelLink>}
        >
          <ul className="divide-y divide-line">
            {SIGNALS.slice(0, 4).map((s) => (
              <li key={s.title} className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
                <span className="mt-0.5 rounded-full bg-accent-soft px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-accent-deep">
                  {s.tag}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[13px] font-medium text-ink">{s.title}</span>
                  <span className="block text-[12px] text-slate-400">{s.detail}</span>
                </span>
                <span className="shrink-0 text-[11px] text-slate-400">{s.time}</span>
              </li>
            ))}
          </ul>
        </Panel>

        {/* portfolio pulse */}
        <Panel
          title="Portfolio pulse"
          action={<PanelLink href="/investor/portfolio">All companies</PanelLink>}
        >
          <ul className="divide-y divide-line">
            {PORTFOLIO.slice(0, 4).map((c) => (
              <li key={c.name} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                <HealthDot tone={c.health} />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[13.5px] font-medium text-ink">
                    {c.name}
                  </span>
                  <span className="block truncate text-[12px] text-slate-400">
                    {c.sector} · ARR {c.arr}
                  </span>
                </span>
                <span className="text-right">
                  <span className="block text-[13px] font-semibold text-ink">{c.multiple}</span>
                  <span className="block text-[11px] text-slate-400">{c.current}</span>
                </span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </div>
  );
}
