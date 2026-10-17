import { CalendarDays, Plus } from "lucide-react";
import { Badge, Card, PageHeader } from "@/components/app/widgets";

const upcoming = [
  { with: "Priya Nair", topic: "GPU cost optimization review", when: "Thu, Apr 09 · 16:00 IST", type: "Weekly 1:1", prep: "Bring cost-per-acre dashboard" },
  { with: "Karan Chadha", topic: "FPO channel — vernacular onboarding", when: "Tue, Apr 14 · 11:00 IST", type: "Intro call", prep: "Share channel economics sheet" },
];

const history = [
  { with: "Priya Nair", topic: "Vernacular agronomy terms — data quality", date: "Apr 02", score: 5, notes: "4 action items logged · all closed" },
  { with: "Priya Nair", topic: "Series A tech diligence prep", date: "Mar 26", score: 5, notes: "Mock questions + room checklist" },
  { with: "Vikram Rao", topic: "Retention deep-dive", date: "Mar 19", score: 4, notes: "Cohort view rebuilt post-session" },
];

export function MentorSessions() {
  return (
    <div className="space-y-5">
      <PageHeader
        title="Mentor Sessions"
        desc="Every session has an agenda, notes and action items — mentorship with receipts."
        actions={<button className="inline-flex items-center gap-1.5 rounded-[10px] bg-accent px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-accent-deep"><Plus className="h-3.5 w-3.5" /> Book session</button>}
      />
      <div className="grid gap-5 xl:grid-cols-2">
        <Card title="Upcoming" pad={false}>
          <ul className="divide-y divide-line">
            {upcoming.map((s) => (
              <li key={s.topic} className="px-5 py-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[14px] font-semibold text-ink">{s.topic}</p>
                    <p className="mt-0.5 text-[12px] text-slate-400">with {s.with} · {s.type}</p>
                  </div>
                  <Badge tone="accent">Booked</Badge>
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-2 text-[11.5px] text-slate-500">
                  <span className="flex items-center gap-1.5 rounded-md bg-slate-100 px-2.5 py-1.5"><CalendarDays className="h-3 w-3" /> {s.when}</span>
                  <span className="rounded-md bg-accent-mist px-2.5 py-1.5 text-slate-600">Prep: {s.prep}</span>
                </div>
                <div className="mt-3 flex gap-2">
                  <button className="flex-1 rounded-lg bg-accent py-2 text-[12px] font-semibold text-white hover:bg-accent-deep">Join meeting room</button>
                  <button className="rounded-lg border border-line px-3 py-2 text-[12px] font-semibold text-ink hover:border-slate-300">Reschedule</button>
                </div>
              </li>
            ))}
          </ul>
        </Card>
        <Card title="Session history" pad={false}>
          <ul className="divide-y divide-line">
            {history.map((h) => (
              <li key={h.topic} className="px-5 py-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[13.5px] font-medium text-ink">{h.topic}</p>
                  <div className="flex shrink-0 gap-1 text-amber-400">
                    {"★★★★★".slice(0, h.score).split("").map((s, i) => <span key={i} className="text-[12px]">★</span>)}
                  </div>
                </div>
                <p className="mt-0.5 text-[11.5px] text-slate-400">{h.with} · {h.date} · {h.notes}</p>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
