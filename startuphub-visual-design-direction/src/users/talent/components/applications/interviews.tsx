import { CalendarClock, History, Video } from "lucide-react";
import { PageIntro, Panel, PanelLink } from "@/components/app/widgets";
import { INTERVIEWS, INTERVIEW_HISTORY } from "../../constants/work-data";

export function TalentInterviews() {
  return (
    <div className="space-y-6">
      <PageIntro
        title="Interviews & meetings"
        description="Upcoming rounds with prep notes from the matching engine — plus your meeting history."
        action={
          <button className="inline-flex h-9 items-center gap-2 rounded-lg border border-line bg-white px-4 text-[13px] font-medium text-slate-600 transition-colors hover:bg-soft">
            <CalendarClock className="h-4 w-4" /> Request reschedule
          </button>
        }
      />

      <div className="grid gap-4 lg:grid-cols-2">
        {INTERVIEWS.map((i) => (
          <article
            key={i.startup}
            className="rounded-xl border border-line bg-white p-5 shadow-[0_1px_2px_rgba(11,18,32,0.03)] sm:p-6"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="rounded-full bg-accent-soft px-2.5 py-1 text-[10.5px] font-semibold text-accent-deep">
                  {i.round}
                </span>
                <h3 className="mt-3 text-[16px] font-semibold tracking-[-0.01em] text-ink">
                  {i.startup}
                </h3>
                <p className="text-[12.5px] text-slate-400">{i.role}</p>
              </div>
              <span className="text-right text-[12px] font-semibold text-ink">{i.time}</span>
            </div>

            <div className="mt-4 rounded-lg bg-accent-mist p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-400">
                Prep notes
              </p>
              <ul className="mt-2 space-y-1.5">
                {i.focus.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-[12.5px] leading-snug text-slate-600">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4 flex items-center gap-2 border-t border-line pt-4">
              <a
                href="#"
                className="inline-flex h-9 flex-1 items-center justify-center gap-2 rounded-lg bg-accent px-4 text-[13px] font-semibold text-white transition-colors hover:bg-accent-deep"
              >
                <Video className="h-4 w-4" /> Join meeting
              </a>
              <span className="text-[11.5px] text-slate-400">{i.link}</span>
            </div>
          </article>
        ))}
      </div>

      <Panel title="Meeting history" action={<PanelLink href="#">All</PanelLink>}>
        <ul className="divide-y divide-line">
          {INTERVIEW_HISTORY.map((h) => (
            <li key={h.startup} className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
              <span className="flex items-center gap-3">
                <History className="h-4 w-4 text-slate-300" />
                <span>
                  <span className="block text-[13.5px] font-medium text-ink">{h.startup}</span>
                  <span className="block text-[12px] text-slate-400">{h.role}</span>
                </span>
              </span>
              <span className="text-right">
                <span className="block text-[12px] font-medium text-slate-600">{h.result}</span>
                <span className="block text-[11px] text-slate-400">{h.date}</span>
              </span>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}
