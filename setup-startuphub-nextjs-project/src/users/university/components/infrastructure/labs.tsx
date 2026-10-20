import { Check, Clock3, FlaskConical, Gauge, Microscope, Wrench, X } from "lucide-react";
import {
  Bar,
  PageIntro,
  Panel,
  PanelLink,
  StatCard,
} from "@/components/app/widgets";
import { cn } from "@/lib/utils";
import {
  BOOKING_REQUESTS,
  EQUIPMENT,
  INFRA_STATS,
  LABS,
  LAB_STATUS_TONE,
} from "../../constants/infra-data";

const STAT_ICONS = [Microscope, Wrench, Gauge, Clock3] as const;

export function InfrastructureLabs() {
  return (
    <div className="space-y-6">
      <PageIntro
        title="Labs & infrastructure"
        description="Twenty-two labs, 340 equipment units. External sharing extends the ecosystem — seven facilities are open for startup booking."
        action={
          <button className="inline-flex h-9 items-center gap-2 rounded-lg bg-accent px-4 text-[13px] font-semibold text-white transition-colors hover:bg-accent-deep">
            <FlaskConical className="h-4 w-4" /> Share a resource
          </button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {INFRA_STATS.map((s, i) => (
          <StatCard key={s.label} label={s.label} value={s.value} delta={s.delta} hint={s.hint} icon={STAT_ICONS[i]} />
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.5fr_1fr]">
        {/* lab directory */}
        <Panel title="Lab directory" action={<PanelLink href="#">Manage</PanelLink>} bodyClassName="px-0 py-0 sm:px-0">
          <ul className="divide-y divide-line">
            {LABS.map((lab) => (
              <li key={lab.name} className="px-4.5 py-4 transition-colors hover:bg-soft sm:px-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[13.5px] font-semibold text-ink">{lab.name}</p>
                    <p className="mt-0.5 text-[12px] text-slate-400">
                      {lab.center} · {lab.equipment} units · {lab.hours}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10.5px] font-semibold text-slate-600">
                      {lab.safety}
                    </span>
                    <span className={cn("rounded-full px-2.5 py-1 text-[10.5px] font-semibold", LAB_STATUS_TONE[lab.status])}>
                      {lab.status}
                    </span>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-3">
                  <Bar value={lab.capacity} tone={lab.capacity > 85 ? "amber" : "accent"} className="flex-1" />
                  <span className="text-[11.5px] font-semibold tabular-nums text-slate-500">
                    {lab.capacity}% booked
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </Panel>

        <div className="grid content-start gap-4">
          {/* booking requests */}
          <Panel title="Booking requests · 3" action={<PanelLink href="#">All bookings</PanelLink>}>
            <ul className="divide-y divide-line">
              {BOOKING_REQUESTS.map((r) => (
                <li key={`${r.lab}-${r.slot}`} className="py-3 first:pt-0 last:pb-0">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-[13px] font-semibold text-ink">{r.lab}</p>
                      <p className="text-[11.5px] text-slate-400">{r.requester}</p>
                      <p className="mt-1 text-[12px] text-slate-500">{r.purpose}</p>
                    </div>
                    <span className="shrink-0 text-right text-[11.5px] font-semibold text-slate-500">{r.slot}</span>
                  </div>
                  <div className="mt-2.5 flex gap-2">
                    <button className="inline-flex h-7.5 items-center gap-1 rounded-lg bg-accent px-2.5 text-[11.5px] font-semibold text-white transition-colors hover:bg-accent-deep">
                      <Check className="h-3 w-3" /> Approve
                    </button>
                    <button className="inline-flex h-7.5 items-center gap-1 rounded-lg border border-line bg-white px-2.5 text-[11.5px] font-medium text-slate-500 transition-colors hover:bg-soft">
                      <X className="h-3 w-3" /> Decline
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </Panel>

          {/* equipment snapshot */}
          <Panel title="High-demand equipment" action={<PanelLink href="#">Inventory</PanelLink>}>
            <ul className="space-y-4">
              {EQUIPMENT.map((e) => (
                <li key={e.name}>
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-[13px] font-semibold text-ink">{e.name}</span>
                    <span className={cn(
                      "rounded-full px-2 py-0.5 text-[10.5px] font-semibold",
                      e.status === "Available" ? "bg-emerald-50 text-emerald-700" : e.status === "Maintenance" ? "bg-red-50 text-red-600" : "bg-amber-50 text-amber-700",
                    )}>
                      {e.status}
                    </span>
                  </div>
                  <p className="mb-1.5 mt-0.5 text-[11.5px] text-slate-400">{e.spec} · {e.lab}</p>
                  <Bar value={e.usage} tone="ink" />
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </div>
    </div>
  );
}
