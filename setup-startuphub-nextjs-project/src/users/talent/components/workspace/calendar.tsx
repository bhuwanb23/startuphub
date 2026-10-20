import { CalendarPlus } from "lucide-react";
import { PageIntro, Panel } from "@/components/app/widgets";
import { cn } from "@/lib/utils";
import { CALENDAR_DAYS, EVENT_TONE } from "../../constants/workspace-data";

export function TalentCalendar() {
  return (
    <div className="space-y-6">
      <PageIntro
        title="Calendar"
        description="Interviews, deadlines, deliverables and consulting sessions — synced with your availability."
        action={
          <button className="inline-flex h-9 items-center gap-2 rounded-lg bg-accent px-4 text-[13px] font-semibold text-white transition-colors hover:bg-accent-deep">
            <CalendarPlus className="h-4 w-4" /> Block time
          </button>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {CALENDAR_DAYS.map((day) => (
          <Panel
            key={day.date}
            title={`${day.day} · ${day.date}`}
            action={
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10.5px] font-bold text-slate-500">
                {day.events.length}
              </span>
            }
          >
            <ol className="space-y-3">
              {day.events.map((e) => (
                <li key={e.title} className="rounded-lg border border-line bg-soft px-3.5 py-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11.5px] font-semibold tabular-nums text-slate-500">{e.time}</span>
                    <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-semibold", EVENT_TONE[e.kind] ?? "bg-slate-100 text-slate-600")}>
                      {e.kind}
                    </span>
                  </div>
                  <p className="mt-1.5 text-[13px] font-medium leading-snug text-ink">{e.title}</p>
                </li>
              ))}
            </ol>
          </Panel>
        ))}
      </div>

      <p className="rounded-xl border border-dashed border-slate-300 bg-white px-5 py-4 text-[13px] leading-relaxed text-slate-500">
        <span className="font-semibold text-ink">Heads-up:</span> Friday has a
        hard pair — the Ledgerline offer expires the same day the runbook v2
        is due. Decide by Thursday evening to keep Friday clear.
      </p>
    </div>
  );
}
