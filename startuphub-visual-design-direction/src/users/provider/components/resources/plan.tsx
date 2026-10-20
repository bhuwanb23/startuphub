import {
  BadgeIndianRupee,
  CalendarDays,
  Clock3,
  History,
  Package,
  Pencil,
  Star,
} from "lucide-react";
import { Bar, Chip, Panel } from "@/components/app/widgets";
import { PageHead } from "@/components/app/boards";
import {
  AVAILABILITY_WEEK,
  DISCOUNT_PLANS,
  PACKAGES,
  PRICING_TIERS,
} from "../../constants/provider-data";
import { PROVIDER_DOCS } from "../../constants/ops-data";
import { File } from "lucide-react";

/* ── Availability calendar ──────────────────────────────────── */
const SLOT_STATE: Record<string, { cls: string; label: string }> = {
  open: { cls: "border-rise/40 bg-rise-tint text-rise", label: "Open" },
  booked: { cls: "border-accent/30 bg-accent text-white", label: "Booked" },
  blocked: { cls: "border-line bg-slate-100 text-slate-400", label: "Blocked" },
  maint: { cls: "border-amber-dim/40 bg-amber-tint text-amber-dim", label: "Maint." },
};
const SLOT_NAMES = ["08–11h", "11–14h", "14–17h", "17–20h"];

export function ResourceAvailability() {
  return (
    <div className="space-y-5">
      <PageHead
        title="Resource availability"
        sub="Week view across facilities · recurring rules and maintenance windows"
        action={
          <button className="flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-accent-deep">
            <CalendarDays className="h-3.5 w-3.5" /> Block slots
          </button>
        }
      />
      <Panel title="Bio-Bench Lab Suite A — this week" sub="4 daily slots · click to rebalance" pad>
        <div className="overflow-x-auto">
          <div className="min-w-[640px]">
            <div className="mb-2 grid grid-cols-[90px_repeat(4,1fr)] gap-1.5">
              <span />
              {SLOT_NAMES.map((s) => (
                <p key={s} className="text-center font-mono text-[9px] tracking-[0.1em] text-slate-400">{s}</p>
              ))}
            </div>
            {AVAILABILITY_WEEK.map((d) => (
              <div key={d.day} className="mb-1.5 grid grid-cols-[90px_repeat(4,1fr)] items-center gap-1.5">
                <span className="font-mono text-[10.5px] font-semibold text-ink">{d.day}</span>
                {d.slots.map((s, i) => (
                  <button key={i} className={`rounded-md border px-2 py-2.5 text-[10.5px] font-semibold transition-opacity hover:opacity-80 ${SLOT_STATE[s].cls}`}>
                    {SLOT_STATE[s].label}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      </Panel>

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Recurring rules" action={<Clock3 className="h-4 w-4 text-slate-300" />}>
          <ul className="space-y-2.5 text-[12.5px]">
            {[
              "GPU cluster — 24×7 auto, reserved Fridays for package holders",
              "Demo suites — closed Sundays, clean-flip Saturdays 17–20h",
              "Drone range — weekend sessions need 72h advance notice",
              "Battery benches — monthly calibration Fri 14–17h",
            ].map((r) => (
              <li key={r} className="rounded-lg border border-line px-3.5 py-2.5 text-slate-600">{r}</li>
            ))}
          </ul>
        </Panel>
        <Panel title="Availability history" action={<History className="h-4 w-4 text-slate-300" />}>
          <ul className="space-y-2.5 text-[12px] text-slate-600">
            <li>· Mar 28 — Battery bench 4 moved to maintenance (ran-to-failure alert)</li>
            <li>· Mar 21 — Added Saturday half-slots after AquaMend feedback</li>
            <li>· Mar 12 — Cleanroom recertification passed, reopened bookings</li>
            <li>· Mar 04 — 2 GPU nodes reserved for package Fridays</li>
          </ul>
        </Panel>
      </div>
    </div>
  );
}

/* ── Resource Pricing ───────────────────────────────────────── */
export function ResourcePricing() {
  return (
    <div className="space-y-5">
      <PageHead
        title="Resource pricing"
        sub="Hourly, daily, monthly, startup-tier and custom pricing"
        action={
          <button className="flex items-center gap-1.5 rounded-lg border border-line bg-white px-4 py-2.5 text-[13px] font-semibold text-ink hover:bg-soft">
            <Pencil className="h-3.5 w-3.5 text-slate-400" /> Adjust pricing
          </button>
        }
      />
      <Panel title="Price book" sub="Standard rates · startup discounts auto-apply" pad={false}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-left">
            <thead>
              <tr className="border-b border-line">
                {["Resource", "Hourly", "Daily", "Monthly", "Startup tier", "Util."].map((h) => (
                  <th key={h} className="px-5 py-3.5 font-mono text-[9.5px] font-medium tracking-[0.16em] text-slate-400 uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {PRICING_TIERS.map((p) => (
                <tr key={p.resource} className="transition-colors hover:bg-soft">
                  <td className="px-5 py-4 text-[13px] font-semibold text-ink">{p.resource}</td>
                  <td className="px-5 py-4 font-mono text-[12px] text-slate-500">{p.hourly}</td>
                  <td className="px-5 py-4 font-mono text-[12px] text-slate-500">{p.daily}</td>
                  <td className="px-5 py-4 font-mono text-[12px] text-ink">{p.monthly}</td>
                  <td className="px-5 py-4 text-[12px] font-medium text-rise">{p.startup}</td>
                  <td className="px-5 py-4">
                    <Bar pct={p.util} className="w-14" barClass={p.util >= 85 ? "bg-rise" : "bg-accent"} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>

      <Panel title="Discount plans" sub="Rules auto-validated at booking" action={<BadgeIndianRupee className="h-4 w-4 text-slate-300" />}>
        <div className="grid gap-3 sm:grid-cols-2">
          {DISCOUNT_PLANS.map((d) => (
            <div key={d.name} className="rounded-lg border border-line p-4">
              <div className="flex items-center justify-between">
                <p className="text-[13.5px] font-semibold text-ink">{d.name}</p>
                <Chip tone="rise">{d.cut}</Chip>
              </div>
              <p className="mt-1.5 text-[12px] text-slate-500">{d.scope}</p>
              <p className="mt-1 font-mono text-[9.5px] tracking-[0.08em] text-slate-400 uppercase">{d.rule}</p>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

/* ── Resource Packages ──────────────────────────────────────── */
export function ResourcePackages() {
  return (
    <div className="space-y-5">
      <PageHead
        title="Resource packages"
        sub="Bundles and subscriptions — the highest-retention revenue line"
        action={<button className="flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-accent-deep"><Package className="h-3.5 w-3.5" /> New package</button>}
      />
      <div className="grid gap-4 lg:grid-cols-3">
        {PACKAGES.map((p) => (
          <Panel key={p.name} className={`transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft ${p.popular ? "border-accent/30 ring-1 ring-accent/15" : ""}`}>
            {p.popular && <Chip tone="accent" className="mb-3">Popular</Chip>}
            <h3 className="text-[16px] font-semibold text-ink">{p.name}</h3>
            <p className="mt-2 text-[24px] font-semibold tracking-tight text-accent">{p.price}</p>
            <p className="mt-2 text-[12.5px] leading-relaxed text-slate-500">{p.includes}</p>
            <div className="mt-4 flex items-center justify-between border-t border-line pt-3.5">
              <span className="text-[12px] text-slate-400"><b className="text-ink">{p.active} startups</b> subscribed</span>
              <button className="rounded-lg border border-line px-3 py-1.5 text-[11.5px] font-semibold text-ink hover:bg-soft">Edit</button>
            </div>
          </Panel>
        ))}
      </div>
      <Panel title="Package usage this month" sub="Roll-over rules: unused hours expire at cycle end">
        <ul className="space-y-3">
          {[
            { n: "Starter Lab Pass", used: 76 },
            { n: "Compute Monthly", used: 88 },
            { n: "Founder Bundle", used: 61 },
          ].map((u) => (
            <li key={u.n} className="flex items-center gap-3.5">
              <span className="w-36 text-[12.5px] font-medium text-slate-600">{u.n}</span>
              <Bar pct={u.used} className="flex-1" barClass={u.used >= 85 ? "bg-rise" : "bg-accent"} />
              <span className="w-9 text-right font-mono text-[11.5px] font-semibold text-ink">{u.used}%</span>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}

/* ── Resource Documents ─────────────────────────────────────── */
export function ResourceDocuments() {
  return (
    <div className="space-y-5">
      <PageHead title="Resource documents" sub="Specifications, certifications, manuals, agreements and pricing docs" />
      <Panel pad={false}>
        <ul className="divide-y divide-line">
          {PROVIDER_DOCS.map((d) => (
            <li key={d.id} className="group flex items-center gap-4 px-5 py-3.5 transition-colors hover:bg-soft">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-soft text-accent">
                <File className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-semibold text-ink">{d.file}</p>
                <p className="font-mono text-[9.5px] tracking-[0.06em] text-slate-400 uppercase">{d.area} · {d.size} · {d.updated} · {d.ver}</p>
              </div>
              <Chip tone="line">{d.area}</Chip>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}
