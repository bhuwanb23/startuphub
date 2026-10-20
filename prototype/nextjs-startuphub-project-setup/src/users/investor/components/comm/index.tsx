import {
  ArrowRight,
  CalendarDays,
  CheckSquare,
  Mail,
  NotebookPen,
  Paperclip,
  Phone,
  Plus,
  Send,
  Video,
} from "lucide-react";
import { Avatar, Chip, Panel } from "@/components/app/widgets";
import { PageHead } from "@/components/app/boards";
import {
  ACTIVE_THREAD,
  INTRODUCTIONS,
  THREADS,
} from "../../constants/ops-data";
import { ACTIVITY, MEETING_NOTES, SCHEDULE } from "../../constants/investor-data";

const MEETING_TONE = { Pitch: "accent", Portfolio: "rise", Partner: "amber", IC: "ink" } as const;

/* ── Founder Communication ──────────────────────────────────── */
export function FounderCommunication() {
  return (
    <div className="space-y-5">
      <PageHead title="Founder communication" sub="Conversations stay attached to their deals" />

      <div className="grid gap-4 lg:grid-cols-[340px_1fr]">
        {/* threads */}
        <Panel pad={false} className="max-h-[560px] overflow-y-auto">
          <ul className="divide-y divide-line">
            {THREADS.map((t, i) => (
              <li
                key={t.id}
                className={`flex cursor-pointer items-start gap-3 px-4.5 py-4 transition-colors ${i === 0 ? "bg-accent-mist" : "hover:bg-soft"}`}
              >
                <Avatar label={t.name.split(" ").map((x) => x[0]).join("").slice(0, 2)} className="h-9 w-9 shrink-0 rounded-full bg-ink text-[11px] text-white" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-[13px] font-semibold text-ink">{t.name}</p>
                    <span className="shrink-0 font-mono text-[9.5px] text-slate-400">{t.time}</span>
                  </div>
                  <p className="font-mono text-[9px] tracking-[0.08em] text-accent uppercase">{t.company}</p>
                  <p className="mt-1 truncate text-[12px] text-slate-500">{t.last}</p>
                </div>
                {t.unread > 0 && (
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent font-mono text-[9px] font-bold text-white">
                    {t.unread}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </Panel>

        {/* active thread */}
        <Panel title={ACTIVE_THREAD.name} sub={`${ACTIVE_THREAD.company} · Linked deal: Negotiation`} pad={false} className="flex flex-col">
          <div className="flex-1 space-y-4 p-5">
            {ACTIVE_THREAD.messages.map((m, i) => (
              <div key={i} className={`flex ${m.from === "me" ? "justify-end" : ""}`}>
                <div className={`max-w-[75%] rounded-2xl px-4 py-3 text-[13px] leading-relaxed ${m.from === "me" ? "rounded-br-md bg-accent text-white" : "rounded-bl-md border border-line bg-soft text-ink"}`}>
                  {m.text}
                  <p className={`mt-1.5 font-mono text-[8.5px] ${m.from === "me" ? "text-white/60" : "text-slate-400"}`}>{m.time}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2.5 border-t border-line p-3.5">
            <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-line text-slate-400 hover:text-ink">
              <Paperclip className="h-4 w-4" />
            </button>
            <input placeholder="Message Shreya about the deal…" className="flex-1 rounded-lg border border-line bg-soft px-3.5 py-2.5 text-[13px] outline-none placeholder:text-slate-400 focus:border-accent/40" />
            <button className="flex h-9.5 w-9.5 items-center justify-center rounded-lg bg-accent text-white transition-colors hover:bg-accent-deep">
              <Send className="h-4 w-4" />
            </button>
          </div>
        </Panel>
      </div>
    </div>
  );
}

/* ── Meetings ───────────────────────────────────────────────── */
export function CommMeetings() {
  const days = ["Today", "Tomorrow", "Fri"] as const;
  return (
    <div className="space-y-5">
      <PageHead
        title="Meetings"
        sub="Pitches, portfolio reviews and partner calls — with action items"
        action={
          <button className="flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-accent-deep">
            <Plus className="h-3.5 w-3.5" /> Schedule meeting
          </button>
        }
      />
      {days.map((day) => {
        const items = SCHEDULE.filter((s) => s.day === day);
        if (!items.length) return null;
        return (
          <div key={day}>
            <p className="mb-3 flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-slate-400 uppercase">
              <CalendarDays className="h-3.5 w-3.5" /> {day} · {items.length} meetings
            </p>
            <div className="space-y-3">
              {items.map((m) => (
                <article key={m.id} className="group flex flex-col gap-4 rounded-xl border border-line bg-white p-4.5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft sm:flex-row sm:items-center sm:p-5">
                  <div className="flex w-16 shrink-0 flex-col items-center justify-center rounded-lg bg-accent-mist py-2.5">
                    <span className="font-mono text-[13px] font-bold text-accent">{m.time}</span>
                    <span className="font-mono text-[8px] tracking-[0.14em] text-slate-400 uppercase">IST</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-[14.5px] font-semibold text-ink">{m.title}</h3>
                      <Chip tone={MEETING_TONE[m.kind] as "accent"}>{m.kind}</Chip>
                    </div>
                    <p className="mt-1 text-[12px] text-slate-400">{m.withWhom}</p>
                    <p className="mt-1.5 text-[12.5px] leading-relaxed text-slate-500">{m.detail}</p>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <button className="flex items-center gap-1.5 rounded-lg border border-line px-3.5 py-2 text-[12px] font-semibold text-ink hover:border-accent/40 hover:text-accent">
                      <Video className="h-3.5 w-3.5" /> Join
                    </button>
                    <button className="flex items-center gap-1.5 rounded-lg border border-line px-3.5 py-2 text-[12px] font-semibold text-ink hover:bg-soft">
                      <CheckSquare className="h-3.5 w-3.5" /> Actions
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ── Introductions ──────────────────────────────────────────── */
const INTRO_TONE = { Accepted: "rise", Pending: "amber", Declined: "slate" } as const;

export function Introductions() {
  return (
    <div className="space-y-5">
      <PageHead
        title="Introductions"
        sub="Requested, sent and received — warm paths tracked end-to-end"
        action={<button className="rounded-lg bg-accent px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-accent-deep">Request intro</button>}
      />
      <Panel pad={false}>
        <ul className="divide-y divide-line">
          {INTRODUCTIONS.map((i) => (
            <li key={i.id} className="flex flex-wrap items-center gap-4 px-5 py-4.5 transition-colors hover:bg-soft">
              <Avatar label={i.person.split(" ").map((x) => x[0]).join("").slice(0, 2)} className="h-9.5 w-9.5 rounded-full bg-accent-soft text-[11px] font-bold text-accent" />
              <div className="min-w-0 flex-1">
                <p className="text-[13.5px] font-semibold text-ink">{i.person}</p>
                <p className="text-[11.5px] text-slate-400">{i.company}</p>
              </div>
              <span className="text-[12px] text-slate-500">via {i.via}</span>
              <Chip tone={i.direction === "Sent" ? "accent" : i.direction === "Received" ? "ink" : "slate"}>{i.direction}</Chip>
              <Chip tone={INTRO_TONE[i.status as keyof typeof INTRO_TONE]}>{i.status}</Chip>
              <span className="font-mono text-[10.5px] text-slate-400">{i.date}</span>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}

/* ── Notes ──────────────────────────────────────────────────── */
export function NotesPage() {
  return (
    <div className="space-y-5">
      <PageHead
        title="Notes"
        sub="Startup, deal, meeting and research notes — private until shared"
        action={
          <button className="flex items-center gap-1.5 rounded-lg border border-line bg-white px-4 py-2.5 text-[13px] font-semibold text-ink hover:bg-soft">
            <NotebookPen className="h-3.5 w-3.5 text-slate-400" /> New note
          </button>
        }
      />
      <div className="grid gap-4 lg:grid-cols-2">
        {MEETING_NOTES.map((n) => (
          <Panel key={n.id} className="transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className="text-[15px] font-semibold tracking-[-0.01em] text-ink">{n.title}</h3>
                <p className="mt-1 font-mono text-[9.5px] tracking-[0.08em] text-slate-400 uppercase">Linked · {n.deal} · {n.date}</p>
              </div>
              <NotebookPen className="h-4 w-4 shrink-0 text-slate-300" />
            </div>
            <p className="mt-3 text-[13px] leading-relaxed text-slate-500">{n.excerpt}</p>
            <div className="mt-3.5 flex flex-wrap gap-1.5 border-t border-line pt-3.5">
              {n.tags.map((t) => <Chip key={t} tone="line">{t}</Chip>)}
              <a href="#" className="ml-auto text-[12px] font-semibold text-accent">Open in deal room →</a>
            </div>
          </Panel>
        ))}
      </div>
    </div>
  );
}

/* ── Communication Activity ─────────────────────────────────── */
export function CommActivity() {
  return (
    <div className="space-y-5">
      <PageHead title="Communication activity" sub="Founder touches, document shares and deal movement" />
      <Panel pad={false}>
        <ul className="divide-y divide-line">
          {ACTIVITY.map((a) => (
            <li key={a.id} className="flex items-start gap-3.5 px-5 py-4">
              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent" />
              <div className="min-w-0 flex-1">
                <p className="text-[13px] leading-snug text-ink">{a.text}</p>
                <p className="mt-1 font-mono text-[9.5px] tracking-[0.1em] text-slate-400 uppercase">{a.kind} · {a.time} ago</p>
              </div>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}
