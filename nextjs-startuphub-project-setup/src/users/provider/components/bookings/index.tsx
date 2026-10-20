import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  Check,
  Clock3,
  Package,
  X,
} from "lucide-react";
import { Bar, Chip, Panel, StatCard } from "@/components/app/widgets";
import { PageHead } from "@/components/app/boards";
import {
  ALLOCATIONS,
  BOOKINGS,
  REQUESTS,
} from "../../constants/provider-data";

const REQ_TONE: Record<string, "rise" | "accent" | "amber" | "ink" | "slate"> = {
  New: "accent", Pending: "amber", Negotiation: "amber", Approved: "rise",
  Rejected: "ink", Completed: "slate", Cancelled: "slate",
};
const BK_TONE: Record<string, "rise" | "accent" | "amber" | "ink" | "slate"> = {
  Upcoming: "accent", Active: "rise", Completed: "slate", Cancelled: "ink", Rescheduled: "amber",
};
const PAY_TONE: Record<string, "rise" | "amber" | "slate"> = { Paid: "rise", Pending: "amber", Refunded: "slate" };
const AL_TONE: Record<string, "rise" | "accent" | "amber" | "slate"> = {
  Active: "rise", Scheduled: "accent", Expiring: "amber", Completed: "slate",
};

/* ── Request Management ─────────────────────────────────────── */
export function RequestManagement() {
  return (
    <div className="space-y-5">
      <PageHead
        title="Resource requests"
        sub="7 open · accept, reject, counter, or request more information"
        action={<Chip tone="amber" className="px-3 py-1.5"><Clock3 className="h-3 w-3" /> Avg response 3.2h · SLA 24h</Chip>}
      />
      <div className="space-y-3">
        {REQUESTS.map((r) => (
          <Panel key={r.id} pad>
            <div className="grid items-start gap-4 lg:grid-cols-[1fr_190px]">
              <div>
                <div className="flex flex-wrap items-center gap-2.5">
                  <h3 className="text-[15px] font-semibold text-ink">{r.startup}</h3>
                  <Chip tone="line">{r.id}</Chip>
                  <Chip tone={REQ_TONE[r.status]}>{r.status}</Chip>
                </div>
                <p className="mt-1 text-[13px] font-medium text-accent">{r.resource}</p>
                <p className="mt-2 text-[12.5px] leading-relaxed text-slate-600">{r.purpose}</p>
                <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 font-mono text-[10.5px] text-slate-400">
                  <span>QTY · {r.qty}</span>
                  <span>WHEN · {r.duration}</span>
                  <span>BUDGET · {r.budget}</span>
                  <span>RECEIVED · {r.date}</span>
                </div>
              </div>
              {["New", "Pending", "Negotiation"].includes(r.status) ? (
                <div className="flex flex-col gap-2">
                  <button className="rounded-lg bg-accent py-2.5 text-[12.5px] font-semibold text-white hover:bg-accent-deep">
                    <Check className="mr-1 inline h-3.5 w-3.5" /> Accept
                  </button>
                  <button className="rounded-lg border border-line py-2.5 text-[12.5px] font-semibold text-ink hover:bg-soft">Counter offer</button>
                  <button className="rounded-lg border border-line py-2.5 text-[12.5px] font-medium text-slate-400 hover:border-amber-dim/40 hover:text-amber-dim">
                    <X className="mr-1 inline h-3.5 w-3.5" /> Decline
                  </button>
                </div>
              ) : (
                <div className="flex flex-col justify-center gap-2 lg:items-end">
                  {r.status === "Approved" && (
                    <a href="/provider/allocations" className="rounded-lg bg-rise px-4 py-2.5 text-[12.5px] font-semibold text-white">
                      Allocate now →
                    </a>
                  )}
                  <button className="rounded-lg border border-line px-4 py-2 text-[12px] font-semibold text-ink hover:bg-soft">View thread</button>
                </div>
              )}
            </div>
          </Panel>
        ))}
      </div>
    </div>
  );
}

/* ── Booking Management ─────────────────────────────────────── */
export function BookingManagement() {
  return (
    <div className="space-y-5">
      <PageHead
        title="Booking management"
        sub="38 bookings · upcoming, active, completed and rescheduled"
        action={<button className="flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-accent-deep"><CalendarDays className="h-3.5 w-3.5" /> Create booking</button>}
      />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="Upcoming" value="9" delta="next: Apr 05" icon={CalendarDays} />
        <StatCard label="Active now" value="2" delta="metered live" icon={BadgeCheck} />
        <StatCard label="Completed (30d)" value="24" delta="all settled" icon={Check} />
        <StatCard label="Cancellations (30d)" value="3" delta="policy applied" icon={X} deltaGood={false} />
      </div>
      <Panel title="All bookings" pad={false}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] text-left">
            <thead>
              <tr className="border-b border-line">
                {["Booking", "Startup", "Resource", "Date · slot", "Price", "Status", "Payment"].map((h) => (
                  <th key={h} className="px-5 py-3.5 font-mono text-[9.5px] font-medium tracking-[0.16em] text-slate-400 uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {BOOKINGS.map((b) => (
                <tr key={b.id} className="transition-colors hover:bg-soft">
                  <td className="px-5 py-4 font-mono text-[10.5px] text-slate-500">{b.id}</td>
                  <td className="px-5 py-4 text-[13px] font-semibold text-ink">{b.startup}</td>
                  <td className="px-5 py-4 text-[12px] text-slate-600">{b.resource}<p className="text-[10px] text-slate-400">{b.qty}</p></td>
                  <td className="px-5 py-4 font-mono text-[11px] text-slate-500">{b.date} · {b.slot}</td>
                  <td className="px-5 py-4 font-mono text-[12px] font-semibold text-ink">{b.price}</td>
                  <td className="px-5 py-4"><Chip tone={BK_TONE[b.status]}>{b.status}</Chip></td>
                  <td className="px-5 py-4"><Chip tone={PAY_TONE[b.pay]}>{b.pay}</Chip></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}

/* ── Allocation Management ──────────────────────────────────── */
export function AllocationManagement() {
  return (
    <div className="space-y-5">
      <PageHead
        title="Allocation management"
        sub="Long-lived access grants — assign, modify, release with expiry control"
        action={<button className="flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-accent-deep"><Package className="h-3.5 w-3.5" /> Allocate resource</button>}
      />
      <div className="space-y-3">
        {ALLOCATIONS.map((a) => (
          <Panel key={a.id} className="transition-all duration-300 hover:shadow-soft">
            <div className="grid items-center gap-4 lg:grid-cols-[1fr_320px_auto]">
              <div>
                <div className="flex flex-wrap items-center gap-2.5">
                  <h3 className="text-[15px] font-semibold text-ink">{a.startup}</h3>
                  <Chip tone="line">{a.id}</Chip>
                  <Chip tone={AL_TONE[a.status]}>{a.status}</Chip>
                </div>
                <p className="mt-1 text-[13px] text-accent">{a.resource}</p>
                <p className="mt-1 font-mono text-[10px] tracking-[0.08em] text-slate-400 uppercase">{a.start} → {a.end}</p>
              </div>
              <div>
                <div className="mb-1.5 flex justify-between text-[11px]">
                  <span className="text-slate-400">Allocation window used</span>
                  <span className="font-semibold text-ink">{a.progress}%</span>
                </div>
                <Bar pct={a.progress} barClass={a.status === "Expiring" ? "bg-amber-dim" : "bg-accent"} />
              </div>
              <div className="flex gap-2">
                <button className="rounded-lg border border-line px-3.5 py-2 text-[12px] font-semibold text-ink hover:bg-soft">Modify</button>
                <button className="rounded-lg border border-line px-3.5 py-2 text-[12px] font-semibold text-slate-500 hover:border-amber-dim/40 hover:text-amber-dim">Release</button>
              </div>
            </div>
          </Panel>
        ))}
      </div>
      <div className="rounded-xl border border-amber-dim/25 bg-amber-tint px-5 py-4 text-[13px] leading-relaxed text-ink">
        <b className="text-amber-dim">Expiring:</b> CropLens AI's GPU reservation ends Apr 05 —
        auto-released nodes 04–07 return to the pool unless renewed. Renewal offer drafted.
      </div>
    </div>
  );
}

/* ── Bookings Calendar ──────────────────────────────────────── */
const DAY_MARK: Record<number, ("booked" | "avail" | "maint")[]> = {
  1: [], 2: ["booked"], 3: ["booked", "maint"], 4: ["avail"],
  5: ["booked"], 6: ["booked"], 7: ["avail"], 8: ["booked", "booked"],
  9: ["avail"], 10: ["booked"], 11: ["maint"], 12: [], 13: [],
  14: ["booked"], 15: ["booked"], 16: ["avail"], 17: ["booked"], 18: ["avail"],
};
const MARK_CLS = { booked: "bg-accent", avail: "bg-rise", maint: "bg-amber-dim" };

export function BookingsCalendar() {
  return (
    <div className="space-y-5">
      <PageHead title="Resource calendar" sub="Bookings, allocations and maintenance · April 2026" />
      <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
        <Panel pad>
          <div className="mb-3 grid grid-cols-7 gap-1.5">
            {["M","T","W","T","F","S","S"].map((d, i) => (
              <p key={i} className="text-center font-mono text-[9px] tracking-[0.1em] text-slate-400">{d}</p>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1.5">
            {Array.from({ length: 2 }, (_, i) => <span key={`e${i}`} />)}
            {Array.from({ length: 30 }, (_, i) => i + 1).map((d) => {
              const marks = DAY_MARK[d] ?? [];
              return (
                <div key={d} className={`flex aspect-square flex-col items-center justify-center rounded-lg border text-[12px] transition-colors ${d === 5 ? "border-accent bg-accent text-white" : marks.length ? "border-line bg-white hover:bg-accent-mist" : "border-transparent text-slate-400"}`}>
                  <span className={marks.length ? "font-semibold text-ink" : ""}>{d}</span>
                  <span className="mt-0.5 flex gap-0.5">
                    {marks.map((m, i) => (
                      <span key={i} className={`h-1 w-1 rounded-full ${d === 5 ? "bg-white" : MARK_CLS[m]}`} />
                    ))}
                  </span>
                </div>
              );
            })}
          </div>
        </Panel>
        <Panel title="Next 5 days" pad={false}>
          <ul className="divide-y divide-line">
            {BOOKINGS.filter((b) => ["Upcoming", "Active"].includes(b.status)).map((b) => (
              <li key={b.id} className="px-5 py-3.5">
                <p className="text-[12.5px] font-semibold text-ink">{b.startup}</p>
                <p className="mt-0.5 text-[11px] text-slate-400">{b.resource}</p>
                <p className="mt-1 font-mono text-[9.5px] tracking-[0.06em] text-accent uppercase">{b.date} · {b.slot}</p>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </div>
  );
}

/* ── Booking History ────────────────────────────────────────── */
export function BookingHistory() {
  return (
    <div className="space-y-5">
      <PageHead
        title="Booking history"
        sub="Complete record of every session — filterable and exportable"
        action={<button className="rounded-lg border border-line bg-white px-4 py-2.5 text-[13px] font-semibold text-ink hover:bg-soft">Export CSV</button>}
      />
      <Panel pad={false}>
        <ul className="divide-y divide-line">
          {BOOKINGS.filter((b) => ["Completed", "Cancelled", "Rescheduled"].includes(b.status)).map((b) => (
            <li key={b.id} className="flex flex-wrap items-center gap-4 px-5 py-3.5 transition-colors hover:bg-soft">
              <span className="font-mono text-[10.5px] text-slate-400">{b.id}</span>
              <div className="min-w-0 flex-1">
                <p className="text-[12.5px] font-semibold text-ink">{b.startup} — {b.resource}</p>
                <p className="font-mono text-[9.5px] tracking-[0.06em] text-slate-400 uppercase">{b.date} · {b.qty}</p>
              </div>
              <span className="font-mono text-[11.5px] text-ink">{b.price}</span>
              <Chip tone={BK_TONE[b.status]}>{b.status}</Chip>
              <Chip tone={PAY_TONE[b.pay]}>{b.pay}</Chip>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}
