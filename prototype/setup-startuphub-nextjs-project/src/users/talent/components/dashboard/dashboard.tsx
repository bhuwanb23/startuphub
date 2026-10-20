import { ArrowUpRight, Check } from "lucide-react";
import {
  Bar,
  PageIntro,
  Panel,
  PanelLink,
  StatCard,
} from "@/components/app/widgets";
import {
  APP_SNAPSHOT,
  PROFILE_TIPS,
  QUICK_ACTIONS,
  TALENT_STATS,
  UPCOMING,
} from "../../constants/dashboard-data";
import { STARTUP_MATCHES } from "../../constants/discover-data";
import { Avatar } from "@/components/app/widgets";

export function TalentDashboard() {
  return (
    <div className="space-y-6">
      <PageIntro
        title="Good morning, Zoya"
        description="Round 3 with AgriSense is today at 5 PM. Ledgerline's offer expires in five days — and 3 new matches cleared 90 fit overnight."
        action={
          <a
            href="/talent/applications/offers"
            className="inline-flex h-9 items-center gap-2 rounded-lg bg-accent px-4 text-[13px] font-semibold text-white transition-colors hover:bg-accent-deep"
          >
            Review offer <ArrowUpRight className="h-4 w-4" />
          </a>
        }
      />

      {/* profile completion strip */}
      <div className="flex flex-col gap-3 rounded-xl border border-line bg-white p-4 shadow-[0_1px_2px_rgba(11,18,32,0.03)] sm:flex-row sm:items-center sm:gap-6">
        <div className="flex-1">
          <div className="mb-1.5 flex items-center justify-between text-[12px]">
            <span className="font-semibold text-ink">Profile strength · 92%</span>
            <span className="text-slate-400">Top 4% of engineers</span>
          </div>
          <Bar value={92} />
        </div>
        <ul className="flex flex-wrap gap-2">
          {PROFILE_TIPS.map((t) => (
            <li key={t.tip} className="rounded-lg bg-accent-mist px-3 py-2 text-[11.5px] text-slate-600">
              {t.tip} <span className="block font-semibold text-accent-deep">{t.impact}</span>
            </li>
          ))}
        </ul>
      </div>

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

      {/* eleven vitals */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {TALENT_STATS.map((s) => (
          <StatCard key={s.label} label={s.label} value={s.value} delta={s.delta} hint={s.hint} icon={s.icon} />
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        {/* top matches */}
        <Panel title="Top matches" action={<PanelLink href="/talent/discover/matching">All matches</PanelLink>}>
          <ul className="divide-y divide-line">
            {STARTUP_MATCHES.slice(0, 3).map((m) => (
              <li key={m.startup} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                <Avatar name={m.startup} />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[13.5px] font-medium text-ink">{m.startup}</span>
                  <span className="block truncate text-[12px] text-slate-400">{m.role}</span>
                </span>
                <span className="rounded-full bg-accent-soft px-2.5 py-1 text-[11.5px] font-bold text-accent-deep">
                  {m.score}
                </span>
              </li>
            ))}
          </ul>
        </Panel>

        {/* application snapshot */}
        <Panel title="Applications" action={<PanelLink href="/talent/applications">All applications</PanelLink>}>
          <ul className="space-y-3">
            {APP_SNAPSHOT.map(([label, count]) => (
              <li key={label} className="flex items-center justify-between text-[13px]">
                <span className="text-slate-600">{label}</span>
                <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-soft px-2 text-[12px] font-bold text-ink">
                  {count}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-4 rounded-lg bg-accent-mist px-3.5 py-3 text-[12px] leading-relaxed text-slate-600">
            Offer from Ledgerline expires Mar 21 — your counter on the
            termination clause is with their counsel.
          </p>
        </Panel>

        {/* upcoming */}
        <Panel title="Up next" action={<PanelLink href="/talent/calendar">Calendar</PanelLink>}>
          <ul className="space-y-3">
            {UPCOMING.map((u) => (
              <li key={u.what} className="rounded-lg border border-line bg-soft px-3.5 py-3">
                <span className="text-[13px] font-medium leading-snug text-ink">{u.what}</span>
                <span className="mt-1 flex items-center justify-between text-[11.5px] text-slate-400">
                  <span>{u.when}</span>
                  <span className={`rounded-full px-2 py-0.5 font-semibold ${
                    u.kind === "Interview" ? "bg-accent-soft text-accent-deep" : "bg-amber-50 text-amber-700"
                  }`}>
                    {u.kind}
                  </span>
                </span>
              </li>
            ))}
          </ul>
          <button className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-lg border border-line py-2 text-[12.5px] font-semibold text-slate-600 transition-colors hover:bg-soft">
            <Check className="h-3.5 w-3.5" /> Mark prep block done
          </button>
        </Panel>
      </div>
    </div>
  );
}
