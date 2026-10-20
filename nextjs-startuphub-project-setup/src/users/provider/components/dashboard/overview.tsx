import {
  AlertTriangle,
  ArrowRight,
  Banknote,
  Boxes,
  ClipboardList,
  Gauge,
  Package,
  Receipt,
  Rocket,
  Sparkles,
  Star,
  Store,
  Wallet,
} from "lucide-react";
import { Bar, Chip, Panel, Spark, StatCard } from "@/components/app/widgets";
import { PageHead } from "@/components/app/boards";
import {
  EARNINGS_SERIES,
  PROVIDER_STATS,
  PROVIDER_MATCHES,
  REQUESTS,
  UTILIZATION,
  LIVE_SESSIONS,
} from "../../constants/provider-data";
import { PROVIDER_NOTIFICATIONS } from "../../constants/ops-data";

const QUICK = [
  { label: "Add Resource", href: "/provider/resources" },
  { label: "Create Listing", href: "/provider/resources" },
  { label: "Update Availability", href: "/provider/resources/availability" },
  { label: "Update Pricing", href: "/provider/resources/pricing" },
  { label: "Review Requests", href: "/provider/requests" },
  { label: "Allocate Resource", href: "/provider/allocations" },
  { label: "View Payments", href: "/provider/payments" },
];
const QA_ICONS = [Package, Store, Gauge, Receipt, ClipboardList, Boxes, Wallet];

export function ProviderDashboard() {
  const s = PROVIDER_STATS;
  const alerts = PROVIDER_NOTIFICATIONS.filter((n) => n.unread).slice(0, 4);
  return (
    <div className="space-y-6">
      <PageHead
        title="Operations dashboard"
        sub="Vertex Labs & Compute · live sessions running · payout Apr 03"
        action={
          <a href="/provider/requests" className="group flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-accent-deep">
            <ClipboardList className="h-3.5 w-3.5" /> {s.pendingRequests} requests to review
          </a>
        }
      />

      {/* quick actions */}
      <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
        {QUICK.map((q, i) => {
          const Icon = QA_ICONS[i % QA_ICONS.length];
          return (
            <a key={q.label} href={q.href} className="flex shrink-0 items-center gap-2 rounded-lg border border-line bg-white px-3.5 py-2.5 text-[12.5px] font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:text-accent">
              <Icon className="h-3.5 w-3.5 text-accent" /> {q.label}
            </a>
          );
        })}
      </div>

      {/* stats */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
        <StatCard label="Total resources" value="24 units" delta="8 listings live" icon={Boxes} />
        <StatCard label="Currently allocated" value={String(s.allocated)} delta="2 expiring this week" icon={Package} deltaGood={false} />
        <StatCard label="Active bookings" value={String(s.bookings)} delta="+5 this week" icon={ClipboardList} />
        <StatCard label="Resource utilization" value={`${s.utilization}%`} delta="+6 pts MoM" icon={Gauge} />
        <StatCard label="Revenue this month" value={s.monthRevenue} delta="+18% MoM" icon={Banknote} />
        <StatCard label="Active startups served" value={String(s.activeStartups)} delta="96 verified" icon={Rocket} />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* live sessions */}
        <Panel title="Live now" sub="Metered sessions in progress" action={<span className="relative flex h-2 w-2"><span className="ping-dot absolute h-full w-full rounded-full bg-rise" /><span className="relative h-2 w-2 rounded-full bg-rise" /></span>}>
          <ul className="space-y-3">
            {LIVE_SESSIONS.map((l) => (
              <li key={l.startup} className="rounded-lg border border-line p-3.5">
                <div className="flex items-center justify-between">
                  <p className="text-[13px] font-semibold text-ink">{l.startup}</p>
                  <span className="rounded-md bg-rise-tint px-1.5 py-0.5 font-mono text-[9px] font-semibold text-rise uppercase">Live</span>
                </div>
                <p className="mt-0.5 text-[11.5px] text-slate-400">{l.resource}</p>
                <div className="mt-2.5 flex items-center justify-between font-mono text-[11px]">
                  <span className="text-slate-400">since {l.since} · {l.hours}h</span>
                  <span className="font-semibold text-ink">{l.meter}</span>
                </div>
              </li>
            ))}
          </ul>
        </Panel>

        {/* pending requests */}
        <Panel title="Pending requests" sub="Newest first — SLA 24h" pad={false} action={<a href="/provider/requests" className="text-[12px] font-semibold text-accent">All {s.pendingRequests} →</a>}>
          <ul className="divide-y divide-line">
            {REQUESTS.filter((r) => ["New", "Pending", "Negotiation"].includes(r.status)).slice(0, 4).map((r) => (
              <li key={r.id}>
                <a href="/provider/requests" className="group flex items-center gap-3.5 px-5 py-3.5 transition-colors hover:bg-soft">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[12.5px] font-semibold text-ink">{r.startup} — {r.resource}</p>
                    <p className="truncate text-[10.5px] text-slate-400">{r.qty} · {r.duration} · {r.budget}</p>
                  </div>
                  <Chip tone={r.status === "New" ? "accent" : "amber"}>{r.status}</Chip>
                </a>
              </li>
            ))}
          </ul>
        </Panel>

        {/* revenue + rating */}
        <Panel title="Earnings" sub="Monthly run-rate · 12M">
          <Spark points={EARNINGS_SERIES} className="h-12 w-full" good />
          <div className="mt-4 flex items-end justify-between">
            <div>
              <p className="text-[24px] font-semibold tracking-tight text-ink">₹48.6 L</p>
              <p className="text-[11px] text-slate-400">FY26 earnings to date</p>
            </div>
            <a href="/provider/payouts" className="text-[12px] font-semibold text-accent">Payout center →</a>
          </div>
          <div className="mt-4 flex items-center justify-between rounded-lg border border-line p-3">
            <span className="flex items-center gap-2 text-[12.5px] font-semibold text-ink">
              <Star className="h-4 w-4 fill-amber-dim/20 text-amber-dim" /> 4.8 rating
            </span>
            <span className="text-[11.5px] text-slate-400">214 reviews</span>
          </div>
        </Panel>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* utilization */}
        <Panel title="Utilization by resource" sub="Rolling 30 days">
          <ul className="space-y-3">
            {UTILIZATION.slice(0, 5).map((u) => (
              <li key={u.resource} className="flex items-center gap-3">
                <span className="w-40 truncate text-[12px] font-medium text-slate-600">{u.resource}</span>
                <Bar pct={u.util} className="flex-1" barClass={u.util >= 85 ? "bg-rise" : u.util >= 60 ? "bg-accent" : "bg-amber-dim"} />
                <span className="w-9 text-right font-mono text-[11.5px] font-semibold text-ink">{u.util}%</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 rounded-lg bg-amber-tint p-3 text-[12px] leading-snug text-ink">
            <b className="text-amber-dim">Idle capacity:</b> Drone range runs at 44% —
            package it with Zephyr-style certification days to lift weekends.
          </div>
        </Panel>

        {/* alerts + matches */}
        <Panel title="Alerts" sub="Needs action" action={<AlertTriangle className="h-4 w-4 text-slate-300" />}>
          <ul className="space-y-2.5">
            {alerts.map((a) => (
              <li key={a.id} className="flex gap-3 rounded-lg border border-line p-3">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <div className="min-w-0">
                  <p className="text-[12px] leading-snug text-ink">{a.text}</p>
                  <p className="mt-0.5 font-mono text-[9px] tracking-[0.1em] text-slate-400 uppercase">{a.group} · {a.time}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4 border-t border-line pt-3">
            <a href="/provider/marketplace/matching" className="group flex items-center justify-between rounded-lg bg-accent-mist px-3.5 py-3 text-[12.5px] font-semibold text-accent">
              <span className="flex items-center gap-2"><Sparkles className="h-4 w-4" /> New AI match — ReJoule Energy 94</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        </Panel>
      </div>
    </div>
  );
}
