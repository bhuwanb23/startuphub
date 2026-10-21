import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Badge, Card, GaugeRing, Progress, Stat } from "@/components/app/widgets";
import { dashKpis, fundingStatus, iprStatus, resourceStatus } from "@/users/startup/constants/dashboard-data";

export function DashboardHeader() {
  return (
    <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <p className="text-[13px] font-medium text-slate-400">Good morning, Ravi</p>
        <h1 className="mt-1 text-[clamp(1.5rem,2.6vw,2rem)] font-semibold tracking-[-0.02em] text-ink">
          Lumen AI is in <span className="text-accent">Growth</span> — and moving well.
        </h1>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Badge tone="accent">Stage: Growth</Badge>
          <Badge>AgriTech · Applied AI</Badge>
          <Badge tone="good">Verified startup</Badge>
        </div>
      </div>
      <div className="flex items-center gap-4 rounded-2xl border border-line bg-white px-5 py-4">
        <GaugeRing value={78} size={72} label="readiness" />
        <div>
          <p className="text-[13px] font-semibold text-ink">Investor-ready</p>
          <p className="max-w-[180px] text-[11.5px] leading-snug text-slate-400">
            12 points from “exceptional” — pilot references are the gap.
          </p>
        </div>
      </div>
    </div>
  );
}

export function KpiGrid() {
  return (
    <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
      {dashKpis.map((k) => (
        <Stat key={k.label} {...k} />
      ))}
    </div>
  );
}

export function StatusRow() {
  const items = [
    {
      label: "Funding status",
      lines: [`${fundingStatus.round} · ${fundingStatus.raised} · ${fundingStatus.investors} investors`, fundingStatus.next],
      href: "/founder/funding",
    },
    {
      label: "IPR status",
      lines: [`${iprStatus.assets} assets · ${iprStatus.filings} filing in progress`, iprStatus.upcoming],
      href: "/founder/ipr",
    },
    {
      label: "Resources",
      lines: [`${resourceStatus.active} active · ${resourceStatus.credits} credits left`, `Expiring: ${resourceStatus.expiring}`],
      href: "/founder/resources",
    },
  ];
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {items.map((it) => (
        <Link
          key={it.label}
          href={it.href}
          className="group rounded-2xl border border-line bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-[0_12px_28px_-16px_rgba(11,18,32,0.18)]"
        >
          <div className="flex items-center justify-between">
            <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-slate-400">{it.label}</p>
            <ArrowUpRight className="h-3.5 w-3.5 text-slate-300 transition-colors group-hover:text-accent" />
          </div>
          <p className="mt-2.5 text-[13.5px] font-semibold leading-snug text-ink">{it.lines[0]}</p>
          <p className="mt-1 text-[12px] text-slate-400">{it.lines[1]}</p>
        </Link>
      ))}
    </div>
  );
}

export function ProgressCard() {
  return (
    <Card title="Lifecycle progress" action={<Badge tone="accent">Stage 09 of 11</Badge>}>
      <div className="flex items-center gap-3">
        {["Idea", "Valid", "Incub", "IPR", "Resrc", "MVP", "Market", "Fund", "Grow", "Perf", "Scale"].map((s, i) => (
          <div key={s} className="flex flex-1 flex-col items-center gap-1.5">
            <div
              className={
                i < 8
                  ? "h-1.5 w-full rounded-full bg-accent"
                  : i === 8
                    ? "h-1.5 w-full rounded-full bg-accent/40"
                    : "h-1.5 w-full rounded-full bg-slate-100"
              }
            />
            <span className={`hidden text-[9px] font-medium sm:block ${i === 8 ? "text-accent" : "text-slate-300"}`}>
              {s}
            </span>
          </div>
        ))}
      </div>
      <section className="mt-4 text-[12.5px] text-slate-500">
        Growth stage · <span className="font-semibold text-ink">Performance</span> unlocks when Q2 KPI baselines are set.
        <Progress value={73} className="mt-3" />
        <span className="mt-2 block text-[11px] text-slate-400">73% of stage requirements met</span>
      </section>
    </Card>
  );
}
