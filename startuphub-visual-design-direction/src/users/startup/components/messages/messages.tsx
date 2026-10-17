"use client";

import { useState } from "react";
import { PageHeader } from "@/components/app/widgets";
import { cn } from "@/lib/utils";

const threads = [
  { id: 1, name: "Priya Nair", role: "Mentor", last: "Bring your cost-per-acre dashboard to Thursday's call.", unread: 2, online: true },
  { id: 2, name: "Northgate Partners", role: "Investor", last: "Data room access granted — our legal team will review this week.", unread: 1, online: true },
  { id: 3, name: "StartupHub Labs", role: "Incubator", last: "Demo Day speaker slots confirmed — see you April 28.", unread: 0, online: false },
  { id: 4, name: "Meera Krishnan", role: "IPR Expert", last: "Claims v3 looks strong. Two small suggestions attached.", unread: 0, online: false },
];

const chat: Record<number, { from: "me" | "them"; text: string }[]> = {
  1: [
    { from: "them", text: "Ravi — saw the Q2 numbers. Cost per acre is the story now." },
    { from: "me", text: "Agreed. Down to ₹3.1 in March; targeting ₹2.8 by May." },
    { from: "them", text: "Good. Bring your cost-per-acre dashboard to Thursday's call — we'll carve the last rupee out of inference." },
  ],
  2: [
    { from: "them", text: "Thanks for the updated deck — strong." },
    { from: "them", text: "Data room access granted — our legal team will review this week." },
  ],
};

export function Messages() {
  const [active, setActive] = useState(1);

  return (
    <div>
      <PageHeader title="Messages" desc="Mentors, investors, programs and partners — every thread in one place." />
      <div className="grid overflow-hidden rounded-2xl border border-line bg-white lg:grid-cols-[300px_1fr]" style={{ height: "calc(100vh - 230px)" }}>
        {/* thread list */}
        <div className="hidden border-r border-line lg:block">
          <div className="border-b border-line px-4 py-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">Inbox</p>
          </div>
          <div className="h-full space-y-1 overflow-y-auto p-2">
            {threads.map((t) => (
              <button
                key={t.id}
                onClick={() => setActive(t.id)}
                className={cn(
                  "flex w-full items-start gap-3 rounded-xl p-3 text-left transition-colors",
                  active === t.id ? "bg-accent-mist" : "hover:bg-slate-50"
                )}
              >
                <span className="relative grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent-soft text-[11px] font-bold text-accent">
                  {t.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                  {t.online && <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500" />}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center justify-between">
                    <span className="truncate text-[13px] font-semibold text-ink">{t.name}</span>
                    {t.unread > 0 && (
                      <span className="grid h-4.5 w-4.5 place-items-center rounded-full bg-accent text-[9px] font-bold text-white">{t.unread}</span>
                    )}
                  </span>
                  <span className="block text-[10.5px] text-slate-400">{t.role}</span>
                  <span className="mt-0.5 block truncate text-[11.5px] text-slate-500">{t.last}</span>
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* conversation */}
        <div className="flex min-w-0 flex-col">
          <div className="flex items-center gap-3 border-b border-line px-5 py-3">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-accent-soft text-[11px] font-bold text-accent">
              {threads.find((t) => t.id === active)!.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
            </span>
            <div>
              <p className="text-[13.5px] font-semibold text-ink">{threads.find((t) => t.id === active)!.name}</p>
              <p className="text-[11px] text-slate-400">{threads.find((t) => t.id === active)!.role}</p>
            </div>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto p-5">
            {(chat[active] ?? []).map((m, i) => (
              <div key={i} className={cn("flex", m.from === "me" ? "justify-end" : "justify-start")}>
                <div
                  className={cn(
                    "max-w-md rounded-2xl px-4 py-2.5 text-[13px] leading-relaxed",
                    m.from === "me" ? "rounded-tr-none bg-accent text-white" : "rounded-tl-none border border-line bg-slate-50 text-slate-700"
                  )}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {!(chat[active] ?? []).length && (
              <p className="pt-10 text-center text-[13px] text-slate-400">No messages yet — say hello.</p>
            )}
          </div>
          <div className="border-t border-line p-3">
            <div className="flex gap-2">
              <input
                placeholder="Write a message…"
                className="h-10 flex-1 rounded-[10px] border border-line bg-white px-3.5 text-sm text-ink placeholder:text-slate-400 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/15"
              />
              <button className="grid h-10 w-11 place-items-center rounded-[10px] bg-accent text-white hover:bg-accent-deep" aria-label="Send">
                →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
