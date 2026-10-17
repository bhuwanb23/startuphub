import { CalendarDays, Plus } from "lucide-react";
import { Badge, Card, PageHeader } from "@/components/app/widgets";

const events = [
  { name: "Demo Day — Cohort VI", when: "Apr 28 · 14:00", location: "Campus + Virtual", reg: "212 / 240", type: "Demo Day", tone: "accent" as const },
  { name: "Investor Office Hours — April", when: "Apr 24 · 11:00", location: "Bengaluru campus", reg: "48 / 60", type: "Investor", tone: "accent" as const },
  { name: "Demo-Day Dry Run", when: "Apr 21 · 15:00", location: "Virtual", reg: "6 startups", type: "Internal", tone: "default" as const },
  { name: "Founder Mixer — May", when: "May 09 · 19:00", location: "IIT Madras RP", reg: "Opening Apr 20", type: "Networking", tone: "default" as const },
  { name: "IPR Masterclass (with IPR Desk)", when: "Apr 03 · 15:00", location: "Virtual", reg: "412 seats · full", type: "Workshop", tone: "good" as const },
];

export function Events() {
  return (
    <div>
      <PageHeader
        title="Events & Workshops"
        desc="Demo days, workshops and mixers your startups show up to — registration and attendance included."
        actions={<button className="inline-flex items-center gap-1.5 rounded-[10px] bg-accent px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-accent-deep"><Plus className="h-3.5 w-3.5" /> Create event</button>}
      />
      <Card title="Upcoming" pad={false}>
        <ul className="divide-y divide-line">
          {events.map((e) => (
            <li key={e.name} className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center">
              <span className="grid h-12 w-12 shrink-0 flex-col place-items-center rounded-xl border border-line bg-accent-mist">
                <CalendarDays className="h-4 w-4 text-accent" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-[14px] font-semibold text-ink">{e.name}</p>
                  <Badge tone={e.tone === "good" ? "good" : e.tone === "accent" ? "accent" : "default"}>{e.type}</Badge>
                </div>
                <p className="mt-0.5 text-[12px] text-slate-400">{e.when} · {e.location}</p>
              </div>
              <div className="text-right">
                <span className="text-[13px] font-semibold tabular-nums text-ink">{e.reg}</span>
                <p className="text-[10.5px] text-slate-400">registered</p>
              </div>
              <button className="rounded-lg border border-line px-3.5 py-2 text-[12px] font-semibold text-ink transition-colors hover:border-accent hover:text-accent">
                Manage
              </button>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
