import { CalendarDays, Plus, Video } from "lucide-react";
import { Badge, Card, PageHeader } from "@/components/app/widgets";

const upcoming = [
  { startup: "Lumen AI", topic: "GPU cost optimization review", when: "Today · 16:00", prep: "Cost-per-acre dashboard attached by Ravi", booked: true },
  { startup: "OrbitalWorks", topic: "Ground-segment architecture review", when: "Today · 18:30", prep: "Telemetry mesh v2 docs", booked: true },
  { startup: "GridSense", topic: "Runway + bridge narrative", when: "Apr 10 · 15:00", prep: "Q1 numbers + burn breakdown", booked: true },
  { startup: "BloomBio", topic: "Intro — assay validation scope", when: "Apr 15 · 14:00", prep: "None — discovery session", booked: true },
];

const history = [
  { startup: "Lumen AI", topic: "Vernacular agronomy terms — data quality", when: "Apr 02", score: 5.0, items: 4, done: 4 },
  { startup: "Lumen AI", topic: "Series A tech diligence prep", when: "Mar 26", score: 5.0, items: 3, done: 3 },
  { startup: "OrbitalWorks", topic: "Mesh protocol deep-dive", when: "Mar 30", score: 5.0, items: 5, done: 4 },
  { startup: "GridSense", topic: "Cost-cutter sprint #1", when: "Mar 24", score: 4.0, items: 4, done: 2 },
];

export function MentorshipSessions() {
  return (
    <div className="space-y-5">
      <PageHeader
        title="Mentoring Sessions"
        desc="Structured, prepped, noted — every session with receipts, not just calendar noise."
        actions={<button className="inline-flex items-center gap-1.5 rounded-[10px] bg-accent px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-accent-deep"><Plus className="h-3.5 w-3.5" /> Schedule session</button>}
      />
      <Card title="Upcoming" action={<Badge tone="accent">{upcoming.length} booked</Badge>} pad={false}>
        <ul className="divide-y divide-line">
          {upcoming.map((s) => (
            <li key={s.topic} className="px-5 py-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[14px] font-semibold text-ink">{s.topic}</p>
                  <p className="mt-0.5 text-[12px] text-slate-400">{s.startup}</p>
                </div>
                <Badge tone="accent">{s.when}</Badge>
              </div>
              <p className="mt-2 flex items-center gap-1.5 text-[11.5px] text-slate-500">
                <CalendarDays className="h-3 w-3 text-slate-300" /> Prep: {s.prep}
              </p>
              <div className="mt-3 flex gap-2">
                <button className="flex items-center gap-1.5 rounded-lg bg-accent px-3.5 py-2 text-[12px] font-semibold text-white hover:bg-accent-deep">
                  <Video className="h-3.5 w-3.5" /> Join room
                </button>
                <button className="rounded-lg border border-line px-3.5 py-2 text-[12px] font-semibold text-ink hover:border-slate-300">Notes</button>
              </div>
            </li>
          ))}
        </ul>
      </Card>
      <Card title="Past sessions" pad={false}>
        <ul className="divide-y divide-line">
          {history.map((h) => (
            <li key={h.topic} className="flex items-center justify-between gap-3 px-5 py-4">
              <div className="min-w-0">
                <p className="text-[13.5px] font-medium text-ink">{h.topic}</p>
                <p className="mt-0.5 text-[11px] text-slate-400">{h.startup} · {h.when}</p>
              </div>
              <div className="flex shrink-0 items-center gap-4 text-[12px]">
                <span className="font-semibold text-amber-500">★ {h.score.toFixed(1)}</span>
                <span className="tabular-nums text-slate-500">{h.done}/{h.items} items closed</span>
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
