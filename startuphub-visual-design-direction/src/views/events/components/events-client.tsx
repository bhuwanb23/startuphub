"use client";

import { useMemo, useState } from "react";
import { SearchX } from "lucide-react";
import EventCard from "@/views/events/components/event-card";
import { events, eventTypes } from "@/views/events/constants/events";
import { cn } from "@/lib/utils";

export default function EventsClient() {
  const [type, setType] = useState("");

  const filtered = useMemo(
    () => (type ? events.filter((e) => e.type === type) : events),
    [type]
  );

  return (
    <>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setType("")}
          className={cn(
            "rounded-full border px-3.5 py-2 text-[13px] font-medium transition-all",
            type === "" ? "border-accent bg-accent text-white" : "border-line bg-white text-slate-600 hover:border-slate-300"
          )}
        >
          All events ({events.length})
        </button>
        {eventTypes.map((t) => {
          const n = events.filter((e) => e.type === t).length;
          if (n === 0) return null;
          return (
            <button
              key={t}
              onClick={() => setType((v) => (v === t ? "" : t))}
              className={cn(
                "rounded-full border px-3.5 py-2 text-[13px] font-medium transition-all",
                type === t ? "border-accent bg-accent text-white" : "border-line bg-white text-slate-600 hover:border-slate-300"
              )}
            >
              {t}s ({n})
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <div className="mt-14 flex flex-col items-center rounded-2xl border border-dashed border-line bg-white/70 py-20 text-center">
          <span className="grid h-12 w-12 place-items-center rounded-xl bg-white text-slate-300">
            <SearchX className="h-5 w-5" />
          </span>
          <p className="mt-4 text-[15px] font-semibold text-ink">No events in this category yet</p>
          <p className="mt-1 text-sm text-slate-400">Check back — new events are added weekly.</p>
        </div>
      ) : (
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((e) => (
            <EventCard key={e.slug} e={e} />
          ))}
        </div>
      )}
    </>
  );
}
