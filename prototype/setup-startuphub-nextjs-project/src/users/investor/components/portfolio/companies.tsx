import { Briefcase, HeartPulse, Landmark, Layers } from "lucide-react";
import {
  Bar,
  HealthDot,
  PageIntro,
  Panel,
  PanelLink,
  StatCard,
} from "@/components/app/widgets";
import { PORTFOLIO, SECTOR_MIX } from "../../constants/dashboard-data";

const HEALTH_LABEL = { green: "On track", amber: "Watch", red: "At risk" } as const;

export function PortfolioCompanies() {
  return (
    <div className="space-y-6">
      <PageIntro
        title="Portfolio companies"
        description="Twenty-four companies across five sectors. Health is a blend of revenue momentum, runway and milestone delivery."
        action={
          <a
            href="/investor/portfolio/performance"
            className="inline-flex h-9 items-center rounded-lg bg-accent px-4 text-[13px] font-semibold text-white transition-colors hover:bg-accent-deep"
          >
            View performance
          </a>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Portfolio value" value="₹86.4 Cr" delta="2.4x" hint="gross multiple" icon={Landmark} />
        <StatCard label="Capital deployed" value="₹38.6 Cr" hint="across 24 deals" icon={Briefcase} />
        <StatCard label="On track" value="17" hint="5 watch · 2 at risk" icon={HeartPulse} />
        <StatCard label="Series A ready" value="6" delta="+2" hint="next 2 quarters" icon={Layers} />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.6fr_1fr]">
        <Panel
          title="All companies"
          action={<PanelLink href="#">Export CSV</PanelLink>}
          bodyClassName="px-0 py-0 sm:px-0"
        >
          <ul className="divide-y divide-line">
            {PORTFOLIO.map((c) => (
              <li
                key={c.name}
                className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-2 px-4.5 py-3.5 transition-colors hover:bg-soft sm:grid-cols-[1.4fr_1fr_auto_auto] sm:px-5"
              >
                <span className="flex min-w-0 items-center gap-3">
                  <HealthDot tone={c.health} />
                  <span className="min-w-0">
                    <span className="block truncate text-[13.5px] font-semibold text-ink">
                      {c.name}
                    </span>
                    <span className="block truncate text-[11.5px] text-slate-400">
                      {c.sector} · {c.stage}
                    </span>
                  </span>
                </span>
                <span className="hidden text-[12px] text-slate-500 sm:block">
                  ARR <span className="font-semibold text-ink">{c.arr}</span>
                </span>
                <span className="text-right text-[12px]">
                  <span className="block font-semibold text-ink">{c.multiple}</span>
                  <span className="block text-[11px] text-slate-400">
                    {c.invested} → {c.current}
                  </span>
                </span>
                <span
                  className={`hidden rounded-full px-2 py-0.5 text-[10.5px] font-semibold sm:block ${
                    c.health === "green"
                      ? "bg-emerald-50 text-emerald-700"
                      : c.health === "amber"
                        ? "bg-amber-50 text-amber-700"
                        : "bg-red-50 text-red-600"
                  }`}
                >
                  {HEALTH_LABEL[c.health]}
                </span>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Sector allocation" action={<PanelLink href="#">Rebalance</PanelLink>}>
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
          <p className="mt-5 rounded-lg bg-accent-mist px-3.5 py-3 text-[12px] leading-relaxed text-slate-600">
            Mandate caps any single sector at 35%. ClimateTech is within 3
            points of the ceiling — new commitments there need IC sign-off.
          </p>
        </Panel>
      </div>
    </div>
  );
}
