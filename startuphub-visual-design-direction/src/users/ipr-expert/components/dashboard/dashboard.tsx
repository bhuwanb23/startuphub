import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { Badge, Card, Progress, Stat } from "@/components/app/widgets";
import {
  activeClients,
  deadlines,
  iprActivity,
  iprKpis,
  licensingActivity,
  patentPipeline,
  pendingAssessments,
  portfolioMix,
  quickActions,
  renewalAlerts,
} from "@/users/ipr-expert/constants/dashboard-data";

const sevTone = (s: string) => (s === "Critical" ? "bad" : s === "High" ? "warn" : "default") as "bad" | "warn" | "default";

export function IprDashboard() {
  return (
    <div className="space-y-4">
      {/* header */}
      <div className="mb-2 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-[13px] font-medium text-slate-400">Good afternoon, Dr. Rao</p>
          <h1 className="mt-1 text-[clamp(1.5rem,2.6vw,2rem)] font-semibold tracking-[-0.02em] text-ink">
            412 assets across 18 clients — <span className="text-accent">2 deadlines need you this week.</span>
          </h1>
          <div className="mt-3 flex flex-wrap gap-2">
            <Badge tone="accent">Patents · Trademarks · Designs</Badge>
            <Badge>19 yrs · 900+ filings</Badge>
            <Badge tone="good">92% first-exam success</Badge>
          </div>
        </div>
        <div className="rounded-2xl border border-accent/25 bg-accent-mist px-5 py-4">
          <p className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-accent">
            <Sparkles className="h-3.5 w-3.5" /> Copilot brief
          </p>
          <p className="mt-1.5 max-w-xs text-[12.5px] leading-relaxed text-slate-600">
            Lumen AI&apos;s claims v3 review is overdue and their “Field Alert” launch is 9 days out — file the trademark first, it&apos;s faster and unblocks the launch.
          </p>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        {iprKpis.map((k) => (
          <Stat key={k.label} {...k} />
        ))}
      </div>

      {/* quick actions */}
      <Card pad={false}>
        <div className="flex flex-wrap gap-2 px-5 py-4">
          {quickActions.map(([l, href]) => (
            <Link
              key={l}
              href={href}
              className="rounded-full border border-line bg-white px-3.5 py-2 text-[12.5px] font-semibold text-slate-600 transition-all hover:border-accent/40 hover:text-accent"
            >
              {l}
            </Link>
          ))}
        </div>
      </Card>

      <div className="grid gap-4 xl:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          {/* portfolio + pipeline */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card title="IP portfolio overview">
              <ul className="space-y-3.5">
                {portfolioMix.map((p) => (
                  <li key={p.type}>
                    <div className="flex items-baseline justify-between text-[12.5px]">
                      <span className="font-medium text-slate-600">{p.type}</span>
                      <span className="font-semibold tabular-nums text-ink">{p.count}</span>
                    </div>
                    <Progress value={p.pct} className="mt-1.5" />
                  </li>
                ))}
              </ul>
              <p className="mt-4 border-t border-line pt-3.5 text-[11.5px] text-slate-400">
                Portfolio value ₹18.6 Cr est. · 3 jurisdictions avg. per asset
              </p>
            </Card>
            <Card title="Patent pipeline">
              <div className="grid grid-cols-5 gap-2">
                {patentPipeline.map((p) => (
                  <div key={p.stage} className="rounded-xl border border-line p-3 text-center">
                    <span className="text-xl font-semibold text-ink tabular-nums">{p.count}</span>
                    <p className="mt-1 text-[10px] font-medium leading-tight text-slate-400">{p.stage}</p>
                  </div>
                ))}
              </div>
              <Link href="/ipr-expert/ip/patents" className="mt-4 inline-flex items-center gap-1 text-[12px] font-semibold text-accent">
                Open patent management <ArrowRight className="h-3 w-3" />
              </Link>
            </Card>
          </div>

          {/* clients */}
          <Card title="Active clients" action={<Link href="/ipr-expert/clients" className="text-[12px] font-semibold text-accent">All clients</Link>} pad={false}>
            <ul className="divide-y divide-line">
              {activeClients.map((c) => (
                <li key={c.name} className="flex flex-col gap-2 px-5 py-3.5 sm:flex-row sm:items-center">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent-soft text-[11px] font-bold text-accent">
                    {c.name.slice(0, 2).toUpperCase()}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[13.5px] font-semibold text-ink">{c.name}</p>
                    <p className="truncate text-[11.5px] text-slate-400">{c.open} · due {c.deadline}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge>{c.assets} assets</Badge>
                    <Badge tone={c.health > 80 ? "good" : c.health > 60 ? "accent" : "warn"}>{c.health}</Badge>
                  </div>
                </li>
              ))}
            </ul>
          </Card>

          {/* assessments + deadlines */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card title="Pending assessments" action={<Badge tone="warn">{pendingAssessments.length}</Badge>} pad={false}>
              <ul className="divide-y divide-line">
                {pendingAssessments.map((a) => (
                  <li key={a.client} className="px-5 py-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-[13px] font-semibold text-ink">{a.client}</p>
                      <Badge tone="accent">{a.type}</Badge>
                    </div>
                    <p className="mt-1 line-clamp-2 text-[11.5px] leading-snug text-slate-500">{a.ask}</p>
                    <p className="mt-1 text-[10.5px] font-medium text-slate-300">waiting {a.age}</p>
                  </li>
                ))}
              </ul>
            </Card>
            <Card title="Upcoming deadlines" action={<Badge tone="bad">1 critical</Badge>} pad={false}>
              <ul className="divide-y divide-line">
                {deadlines.slice(0, 4).map((d) => (
                  <li key={d.matter} className="flex items-center justify-between gap-3 px-5 py-3.5">
                    <div className="min-w-0">
                      <p className="truncate text-[12.5px] font-semibold text-ink">{d.matter}</p>
                      <p className="text-[10.5px] text-slate-400">{d.client} · {d.due}</p>
                    </div>
                    <Badge tone={sevTone(d.severity)}>{d.days}d</Badge>
                  </li>
                ))}
              </ul>
              <Link href="/ipr-expert/compliance" className="ml-5 mt-3 inline-flex items-center gap-1 text-[12px] font-semibold text-accent">
                Deadline dashboard <ArrowRight className="h-3 w-3" />
              </Link>
            </Card>
          </div>
        </div>

        {/* right rail */}
        <div className="space-y-4">
          <Card title="Renewal alerts" action={<ArrowUpRight className="h-4 w-4 text-slate-400" />}>
            <ul className="space-y-3">
              {renewalAlerts.map((r) => (
                <li key={r.mark} className="rounded-xl border border-line p-3.5">
                  <p className="text-[12.5px] font-semibold text-ink">{r.mark}</p>
                  <p className="mt-0.5 text-[11px] text-slate-400">{r.client} · renews {r.renewal}</p>
                  <p className="mt-1 text-[11px] font-medium text-accent">{r.note}</p>
                </li>
              ))}
            </ul>
          </Card>

          <Card title="Licensing activity">
            <ul className="space-y-3.5">
              {licensingActivity.map((l) => (
                <li key={l.deal} className="border-l-2 border-emerald-400/60 pl-3.5">
                  <p className="text-[12.5px] font-semibold text-ink">{l.client}</p>
                  <p className="text-[12px] text-slate-500">{l.deal}</p>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="text-[11.5px] font-bold text-emerald-600">{l.value}</span>
                    <Badge tone={l.stage === "Signed" ? "good" : "accent"}>{l.stage}</Badge>
                  </div>
                </li>
              ))}
            </ul>
          </Card>

          <Card title="Recent activity">
            <ul className="space-y-3">
              {iprActivity.map((a) => (
                <li key={a.text} className="flex items-start gap-2.5 text-[12.5px]">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-md bg-slate-100 text-slate-400">
                    <a.icon className="h-3 w-3" />
                  </span>
                  <div>
                    <p className="leading-snug text-slate-600">{a.text}</p>
                    <p className="mt-0.5 text-[10.5px] text-slate-300">{a.when}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
