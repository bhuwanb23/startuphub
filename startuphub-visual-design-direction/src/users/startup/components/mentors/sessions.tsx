"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  CalendarClock,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  MessageSquare,
  PhoneCall,
  Plus,
  Timer,
  TrendingUp,
  Video,
} from "lucide-react";
import Link from "next/link";
import { Badge, Card, PageHeader, Progress, Stat } from "@/components/app/widgets";
import {
  cadence,
  mentorHourAllocation,
  nextAgenda,
  sessionActionItems,
  sessionHistory,
  sessionSlots,
  topicsCovered,
  upcomingSessions,
} from "@/users/startup/constants/mentor-data";

const itemFilters = ["All items", "Open", "Done"] as const;

export function MentorSessions() {
  const [items, setItems] = useState(sessionActionItems);
  const [filter, setFilter] = useState<(typeof itemFilters)[number]>("All items");
  const [agenda, setAgenda] = useState(nextAgenda);
  const [openRoom, setOpenRoom] = useState<string | null>(null);
  const [rescheduling, setRescheduling] = useState<string | null>(null);
  const [moved, setMoved] = useState<Record<string, string>>({});

  const toggleAgenda = (id: string) =>
    setAgenda((prev) => prev.map((a) => (a.id === id ? { ...a, done: !a.done } : a)));

  const toggle = (id: string) =>
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, done: !i.done } : i)));

  const open = items.filter((i) => !i.done).length;
  const shown = useMemo(
    () =>
      items.filter((i) =>
        filter === "All items" ? true : filter === "Open" ? !i.done : i.done,
      ),
    [items, filter],
  );

  const avgRating = (
    sessionHistory.reduce((sum, h) => sum + h.score, 0) / sessionHistory.length
  ).toFixed(1);

  return (
    <div className="space-y-5">
      <PageHeader
        title="Mentor Sessions"
        desc="Every session has an agenda, notes and action items — mentorship with receipts."
        actions={
          <Link
            href="/founder/mentors"
            className="inline-flex items-center gap-1.5 rounded-[10px] border border-line bg-white px-4 py-2.5 text-[13px] font-semibold text-ink hover:border-slate-300"
          >
            <Plus className="h-3.5 w-3.5" /> Find a mentor
          </Link>
        }
      />

      {/* 1 — Headline metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat icon={CalendarDays} label="Sessions this quarter" value="27" delta="+9 vs last quarter" tone="good" />
        <Stat icon={Timer} label="Hours logged" value={`${mentorHourAllocation.used} / ${mentorHourAllocation.total}`} hint={`lapses ${mentorHourAllocation.lapsesOn}`} tone="warn" />
        <Stat icon={ClipboardList} label="Open action items" value={String(open)} hint={`${items.length - open} closed`} tone={open > 0 ? "warn" : "good"} />
        <Stat icon={TrendingUp} label="Average rating" value={avgRating} delta="across 4 logged sessions" tone="good" />
      </div>

      {/* 2 — Cadence */}
      <Card title="Your weekly cadence" action={<Badge tone="accent">3 booked this week</Badge>}>
        <div className="grid grid-cols-5 gap-2.5">
          {cadence.map((d) => (
            <div
              key={d.day}
              className={`rounded-xl border p-3.5 text-center ${
                d.booked ? "border-accent/40 bg-accent-mist/50" : "border-line"
              }`}
            >
              <p className="text-[12.5px] font-semibold text-ink">{d.day}</p>
              <p
                className={`mt-1.5 text-[11px] leading-snug ${
                  d.booked ? "font-medium text-accent" : "text-slate-300"
                }`}
              >
                {d.booked ? d.mentor : "open"}
              </p>
            </div>
          ))}
        </div>
      </Card>

      {/* 3 — Upcoming */}
      <Card title="Upcoming sessions" action={<Badge tone="accent">{upcomingSessions.length} booked</Badge>} pad={false}>
        <ul className="divide-y divide-line">
          {upcomingSessions.map((s) => {
            const when = moved[s.id] ?? s.when;
            const roomOpen = openRoom === s.id;
            const reschedulingThis = rescheduling === s.id;
            return (
              <li key={s.id} className="px-5 py-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[14px] font-semibold text-ink">{s.topic}</p>
                    <p className="mt-0.5 text-[12px] text-slate-400">
                      with {s.mentor} · {s.type}
                    </p>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    {moved[s.id] && <Badge tone="warn">Moved</Badge>}
                    <Badge tone={roomOpen ? "good" : "accent"}>{roomOpen ? "Room open" : "Booked"}</Badge>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-2 text-[11.5px]">
                  <span className="flex items-center gap-1.5 rounded-md bg-slate-100 px-2.5 py-1.5 text-slate-600">
                    <CalendarDays className="h-3 w-3" /> {when}
                  </span>
                  <span className="rounded-md bg-accent-mist px-2.5 py-1.5 text-slate-600">
                    Prep: {s.prep}
                  </span>
                </div>
                <div className="mt-3 flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setOpenRoom(roomOpen ? null : s.id);
                      setRescheduling(null);
                    }}
                    className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-[12px] font-semibold transition-colors ${
                      roomOpen
                        ? "bg-emerald-600 text-white hover:bg-emerald-700"
                        : "bg-accent text-white hover:bg-accent-deep"
                    }`}
                  >
                    {roomOpen ? <PhoneCall className="h-3.5 w-3.5" /> : <Video className="h-3.5 w-3.5" />}
                    {roomOpen ? "Leave meeting room" : "Join meeting room"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setRescheduling(reschedulingThis ? null : s.id);
                      setOpenRoom(null);
                    }}
                    className="flex items-center gap-1.5 rounded-lg border border-line px-3 py-2 text-[12px] font-semibold text-ink hover:border-slate-300"
                  >
                    <CalendarClock className="h-3.5 w-3.5" />
                    {reschedulingThis ? "Cancel" : "Reschedule"}
                  </button>
                </div>

                {roomOpen && (
                  <div className="mt-3 rounded-xl border border-emerald-200 bg-emerald-50 p-3.5">
                    <p className="text-[12.5px] font-semibold text-emerald-700">
                      Meeting room open — {s.mentor} is waiting
                    </p>
                    <p className="mt-1 text-[12px] leading-relaxed text-emerald-800/80">
                      Room{" "}
                      <span className="font-mono text-[11.5px]">
                        meet.startuphub.in/{s.id}
                      </span>{" "}
                      · 45 min · your camera and mic stay off until you join.
                    </p>
                  </div>
                )}

                {reschedulingThis && (
                  <div className="mt-3 rounded-xl border border-line p-3.5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                      Pick a new slot
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {sessionSlots.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => {
                            setMoved((prev) => ({ ...prev, [s.id]: slot }));
                            setRescheduling(null);
                          }}
                          className="rounded-lg border border-line px-2.5 py-1.5 text-[11.5px] font-semibold text-ink transition-colors hover:border-accent hover:text-accent"
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                    <p className="mt-2 text-[11.5px] text-slate-400">
                      {s.mentor} is notified the moment you confirm a slot.
                    </p>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </Card>

      {/* 4 — Agenda for the next session */}
      <Card
        title="Agenda · next session"
        action={
          <Badge tone={agenda.every((a) => a.done) ? "good" : "default"}>
            {agenda.filter((a) => a.done).length} of {agenda.length} covered
          </Badge>
        }
      >
        <p className="text-[13.5px] font-semibold text-ink">GPU cost optimization review</p>
        <p className="mt-0.5 text-[12px] text-slate-400">with Priya Nair · Weekly 1:1 · 45 min</p>
        <ul className="mt-4 space-y-2.5 border-t border-line pt-4">
          {agenda.map((a) => (
            <li key={a.id}>
              <button
                type="button"
                onClick={() => toggleAgenda(a.id)}
                aria-pressed={a.done}
                className="flex w-full items-start gap-2.5 text-left text-[12.5px]"
              >
                <span
                  className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full transition-colors ${
                    a.done ? "bg-emerald-500" : "bg-amber-400"
                  }`}
                />
                <span className={a.done ? "text-slate-300 line-through" : "text-slate-600"}>
                  {a.item}
                </span>
              </button>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-[12px] text-slate-400">
          Click an agenda line to tick it off during the call.
        </p>
      </Card>

      {/* 5 — History */}
      <Card title="Session history" action={<Badge tone="good">avg {avgRating}</Badge>} pad={false}>
        <ul className="divide-y divide-line">
          {sessionHistory.map((h) => (
            <li key={h.id} className="px-5 py-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-[13.5px] font-medium text-ink">{h.topic}</p>
                <div className="flex shrink-0 items-center gap-2">
                  <span className="text-[11px] text-slate-400">{h.duration}</span>
                  <span className="flex gap-0.5 text-amber-400">
                    {"★★★★★".slice(0, h.score).split("").map((s, i) => (
                      <span key={i} className="text-[12px]">
                        {s}
                      </span>
                    ))}
                  </span>
                </div>
              </div>
              <p className="mt-0.5 text-[11.5px] text-slate-400">
                {h.mentor} · {h.date} · {h.notes}
              </p>
            </li>
          ))}
        </ul>
      </Card>

      {/* 6 — Action items */}
      <Card
        title="Action items"
        action={
          <div className="flex gap-1.5">
            {itemFilters.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={`rounded-full px-2.5 py-1 text-[11px] font-semibold transition-colors ${
                  filter === f
                    ? "bg-accent text-white"
                    : "border border-line text-slate-500 hover:border-slate-300 hover:text-ink"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        }
      >
        {shown.length === 0 ? (
          <p className="py-6 text-center text-[12.5px] text-slate-400">
            Nothing in this filter.
          </p>
        ) : (
          <ul className="space-y-3">
            {shown.map((a) => (
              <li key={a.id} className="flex items-start gap-3">
                <button
                  type="button"
                  onClick={() => toggle(a.id)}
                  aria-label={a.done ? `Reopen: ${a.text}` : `Complete: ${a.text}`}
                  aria-pressed={a.done}
                  className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full transition-colors ${
                    a.done
                      ? "bg-emerald-500 text-white"
                      : "border-2 border-slate-200 hover:border-accent"
                  }`}
                >
                  {a.done && <CheckCircle2 className="h-3 w-3" />}
                </button>
                <div className="min-w-0 flex-1">
                  <p className={`text-[13px] leading-snug ${a.done ? "text-slate-300 line-through" : "text-slate-600"}`}>
                    {a.text}
                  </p>
                  <p className="mt-0.5 text-[10.5px] text-slate-400">
                    {a.owner} · {a.due}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
        <p className="mt-4 text-[12px] text-slate-400">
          {open} open of {items.length} total · click a checkbox to close an item
        </p>
      </Card>

      {/* 7 — Topics covered */}
      <Card title="What you have covered" action={<MessageSquare className="h-4 w-4 text-slate-300" />} pad={false}>
        <ul className="divide-y divide-line">
          {topicsCovered.map((t) => (
            <li key={t.topic} className="flex flex-wrap items-center gap-3 px-5 py-3.5">
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-semibold text-ink">{t.topic}</p>
                <p className="mt-0.5 text-[11.5px] text-slate-400">last discussed {t.last}</p>
              </div>
              <Progress value={(t.sessions / 8) * 100} className="w-24" />
              <span className="w-14 text-right text-[12px] font-semibold tabular-nums text-ink">
                {t.sessions} ses.
              </span>
            </li>
          ))}
        </ul>
      </Card>

      {/* 8 — Hours */}
      <Card title="Hours against the programme allowance">
        <div className="flex items-baseline justify-between">
          <span className="text-[12.5px] font-medium text-slate-600">
            Unused hours lapse on {mentorHourAllocation.lapsesOn}
          </span>
          <span className="text-[13px] font-semibold tabular-nums text-ink">
            {mentorHourAllocation.used} / {mentorHourAllocation.total}
          </span>
        </div>
        <Progress value={(mentorHourAllocation.used / mentorHourAllocation.total) * 100} tone="warn" className="mt-2.5" />
        <p className="mt-4 text-[12px] leading-relaxed text-slate-500">
          Book the remaining{" "}
          {mentorHourAllocation.total - mentorHourAllocation.used} hours before the Apr 28 demo-day push.
          The same allowance is tracked on the{" "}
          <Link href="/founder/incubation/workspace" className="font-semibold text-accent hover:underline">
            incubation workspace
          </Link>
          .
        </p>
      </Card>

      {/* 9 — Where to go next */}
      <Card title="Where to go next">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            {
              label: "Discover Mentors",
              href: "/founder/mentors",
              body: "Filter the catalogue by expertise, industry and availability, then send a request.",
            },
            {
              label: "Mentor Matching",
              href: "/founder/mentors/matching",
              body: "Tighten your stated challenge and watch model confidence move.",
            },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group rounded-xl border border-line p-4 transition-colors hover:border-accent"
            >
              <p className="flex items-center gap-1.5 text-[13px] font-semibold text-ink">
                {link.label}
                <ArrowRight className="h-3.5 w-3.5 text-accent transition-transform group-hover:translate-x-0.5" />
              </p>
              <p className="mt-1 text-[12px] leading-relaxed text-slate-500">{link.body}</p>
            </Link>
          ))}
        </div>
      </Card>
    </div>
  );
}
