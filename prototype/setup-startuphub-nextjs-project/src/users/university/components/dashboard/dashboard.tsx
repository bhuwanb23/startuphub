import { ArrowUpRight, Clock3, Sparkles } from "lucide-react";
import {
  Bar,
  PageIntro,
  Panel,
  PanelLink,
  StatCard,
} from "@/components/app/widgets";
import {
  IP_DEADLINES,
  QUICK_ACTIONS,
  READY_TECHNOLOGIES,
  RECENT_TRANSFERS,
  RESEARCH_PIPELINE,
  UNI_STATS,
} from "../../constants/dashboard-data";

export function UniversityDashboard() {
  return (
    <div className="space-y-6">
      <PageIntro
        title="Research command, Dr. Deshpande"
        description="Three technologies are commercialization-ready. One patent deadline lands this week, and AquaPure is waiting on your revised terms."
        action={
          <a
            href="/university/ip/transfer"
            className="inline-flex h-9 items-center gap-2 rounded-lg bg-accent px-4 text-[13px] font-semibold text-white transition-colors hover:bg-accent-deep"
          >
            Transfer pipeline
            <ArrowUpRight className="h-4 w-4" />
          </a>
        }
      />

      {/* quick actions */}
      <div className="flex flex-wrap gap-2">
        {QUICK_ACTIONS.map((a) => {
          const Icon = a.icon;
          return (
            <a
              key={a.label}
              href={a.href}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-2 text-[12.5px] font-medium text-slate-600 transition-all hover:-translate-y-0.5 hover:border-accent-200 hover:text-accent-deep hover:shadow-card"
            >
              <Icon className="h-3.5 w-3.5 text-accent" />
              {a.label}
            </a>
          );
        })}
      </div>

      {/* twelve vitals */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {UNI_STATS.map((s) => (
          <StatCard key={s.label} label={s.label} value={s.value} delta={s.delta} hint={s.hint} icon={s.icon} />
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        {/* intelligence rail */}
        <Panel
          title="Commercialization-ready"
          action={<PanelLink href="/university/commercialization/showcase">Showcase</PanelLink>}
        >
          <ul className="space-y-3">
            {READY_TECHNOLOGIES.map((t) => (
              <li key={t.name} className="rounded-lg border border-line bg-accent-mist px-3.5 py-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[13px] font-semibold text-ink">{t.name}</span>
                  <span className="rounded-full bg-ink px-2 py-0.5 text-[10px] font-bold text-white">{t.trl}</span>
                </div>
                <p className="mt-1 flex items-center gap-1.5 text-[12px] text-slate-500">
                  <Sparkles className="h-3 w-3 text-accent" /> {t.interest}
                </p>
              </li>
            ))}
          </ul>
          <div className="mt-4 border-t border-line pt-3.5">
            <p className="mb-2 flex items-center gap-1.5 text-[12px] font-semibold text-slate-500">
              <Clock3 className="h-3.5 w-3.5 text-amber-500" /> Expiring IP deadlines
            </p>
            <ul className="space-y-1.5">
              {IP_DEADLINES.map((d) => (
                <li key={d.matter} className="flex items-center justify-between text-[12.5px]">
                  <span className="text-slate-600">{d.matter}</span>
                  <span className="rounded-full bg-amber-50 px-2 py-0.5 font-semibold text-amber-700">{d.due}</span>
                </li>
              ))}
            </ul>
          </div>
        </Panel>

        {/* research pipeline */}
        <Panel
          title="Research pipeline"
          action={<PanelLink href="/university/research">All projects</PanelLink>}
        >
          <ul className="space-y-4">
            {RESEARCH_PIPELINE.map((p) => (
              <li key={p.stage}>
                <div className="mb-1.5 flex items-center justify-between text-[12.5px]">
                  <span className="font-medium text-slate-600">{p.stage}</span>
                  <span className="font-semibold text-ink">{p.count}</span>
                </div>
                <Bar value={p.pct} tone={p.stage === "Active" ? "accent" : "ink"} />
              </li>
            ))}
          </ul>
          <p className="mt-5 rounded-lg bg-accent-mist px-3.5 py-3 text-[12px] leading-relaxed text-slate-600">
            9 projects complete within 90 days — start IP assessment now to
            keep the transfer pipeline fed.
          </p>
        </Panel>

        {/* recent transfers */}
        <Panel
          title="Recent technology transfers"
          action={<PanelLink href="/university/ip/licensing">Licensing</PanelLink>}
        >
          <ul className="divide-y divide-line">
            {RECENT_TRANSFERS.map((t) => (
              <li key={t.tech} className="py-3 first:pt-0 last:pb-0">
                <span className="block text-[13px] font-semibold text-ink">{t.tech}</span>
                <span className="mt-0.5 flex items-center justify-between text-[12px] text-slate-400">
                  <span>{t.partner}</span>
                  <span className="font-semibold text-accent-deep">{t.value}</span>
                </span>
                <span className="text-[11px] text-slate-400">{t.date}</span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </div>
  );
}
