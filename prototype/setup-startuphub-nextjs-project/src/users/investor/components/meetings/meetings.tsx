import { CalendarPlus, MapPin, Video } from "lucide-react";
import { PageIntro, Panel, PanelLink } from "@/components/app/widgets";
import { MEETINGS, WEEK_MEETINGS } from "../../constants/dashboard-data";

const KIND_TONE: Record<string, string> = {
  IC: "bg-ink text-white",
  "Founder call": "bg-accent-soft text-accent-deep",
  Portfolio: "bg-slate-100 text-slate-600",
  LP: "bg-slate-100 text-slate-600",
  Partner: "bg-accent-soft text-accent-deep",
};

export function InvestorMeetings() {
  return (
    <div className="space-y-6">
      <PageIntro
        title="Meetings"
        description="Five sessions today. The AgriSense first call has a pre-read attached — 94-fit match, raising $2.0M."
        action={
          <button className="inline-flex h-9 items-center gap-2 rounded-lg bg-accent px-4 text-[13px] font-semibold text-white transition-colors hover:bg-accent-deep">
            <CalendarPlus className="h-4 w-4" /> Schedule
          </button>
        }
      />

      <div className="grid gap-4 xl:grid-cols-[1.6fr_1fr]">
        <Panel title="Today · Mon, Mar 16" action={<PanelLink href="#">Full calendar</PanelLink>} bodyClassName="px-0 py-0 sm:px-0">
          <ol className="relative divide-y divide-line">
            {MEETINGS.map((m) => (
              <li key={m.title} className="flex items-center gap-4 px-4.5 py-4 transition-colors hover:bg-soft sm:px-5">
                <span className="w-12 shrink-0 text-[13px] font-semibold tabular-nums text-slate-500">
                  {m.time}
                </span>
                <span className="hidden h-9 w-px bg-line sm:block" />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[14px] font-semibold text-ink">
                    {m.title}
                  </span>
                  <span className="mt-0.5 flex items-center gap-2 text-[12px] text-slate-400">
                    {m.withWhom}
                    <span className="flex items-center gap-1">
                      {m.location === "Meet link" ? (
                        <Video className="h-3 w-3" />
                      ) : (
                        <MapPin className="h-3 w-3" />
                      )}
                      {m.location}
                    </span>
                  </span>
                </span>
                <span className={`rounded-full px-2.5 py-1 text-[10.5px] font-semibold ${KIND_TONE[m.kind]}`}>
                  {m.kind}
                </span>
              </li>
            ))}
          </ol>
        </Panel>

        <div className="grid content-start gap-4">
          <Panel title="This week" action={<PanelLink href="#">Week view</PanelLink>}>
            <ul className="space-y-3.5">
              {WEEK_MEETINGS.map((w) => (
                <li key={w.day} className="flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 flex-col items-center justify-center rounded-lg bg-accent-soft">
                    <span className="text-[10px] font-bold uppercase text-accent-deep">{w.day}</span>
                  </span>
                  <span>
                    <span className="block text-[13px] font-semibold text-ink">
                      {w.count} meetings
                    </span>
                    <span className="block text-[12px] leading-snug text-slate-400">{w.note}</span>
                  </span>
                </li>
              ))}
            </ul>
          </Panel>

          <Panel title="Prep notes — AgriSense (11:00)">
            <ul className="space-y-2 text-[12.5px] leading-relaxed text-slate-600">
              <li className="flex gap-2">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                Unit economics turned positive in Q4 — ask about CAC payback on smallholder cohorts.
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                Two co-investors already circling; confirm allocation size early.
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                IP desk verified 3 filings — request the claims summary before IC.
              </li>
            </ul>
          </Panel>
        </div>
      </div>
    </div>
  );
}
