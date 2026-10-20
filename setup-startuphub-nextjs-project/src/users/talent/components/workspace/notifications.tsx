"use client";

import { useState } from "react";
import { CheckCheck } from "lucide-react";
import { PageIntro, Panel } from "@/components/app/widgets";
import { cn } from "@/lib/utils";
import { useFiltered } from "../../hooks/use-filtered";
import {
  NOTIFICATIONS,
  NOTIF_CATEGORIES,
  type TalentNotification,
} from "../../constants/workspace-data";

const CATEGORY_DOT: Record<string, string> = {
  Matches: "bg-accent",
  Applications: "bg-sky-500",
  Interviews: "bg-amber-500",
  Offers: "bg-emerald-500",
  Work: "bg-slate-400",
};

export function TalentNotifications() {
  const { filter, setFilter, filtered } = useFiltered<TalentNotification>(
    NOTIFICATIONS,
    (n, f) => n.category === f,
  );
  const [readIds, setReadIds] = useState<Set<string>>(new Set());

  const markAll = () => setReadIds(new Set(NOTIFICATIONS.map((n) => n.title)));

  return (
    <div className="space-y-6">
      <PageIntro
        title="Notifications"
        description="Matches, application movement, interviews and work signals — prioritized, never noisy."
        action={
          <button
            onClick={markAll}
            className="inline-flex h-9 items-center gap-2 rounded-lg border border-line bg-white px-4 text-[13px] font-medium text-slate-600 transition-colors hover:bg-soft"
          >
            <CheckCheck className="h-4 w-4" /> Mark all read
          </button>
        }
      />

      <div className="flex flex-wrap gap-2">
        {NOTIF_CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={cn(
              "rounded-full px-3.5 py-2 text-[12.5px] font-medium transition-colors",
              filter === c
                ? "bg-ink text-white"
                : "border border-line bg-white text-slate-500 hover:text-ink",
            )}
          >
            {c}
          </button>
        ))}
      </div>

      <Panel title={`${filter} · ${filtered.length}`} bodyClassName="px-0 py-0 sm:px-0">
        <ul className="divide-y divide-line">
          {filtered.map((n) => {
            const unread = n.unread && !readIds.has(n.title);
            return (
              <li key={n.title} className="flex items-start gap-3.5 px-4.5 py-4 transition-colors hover:bg-soft sm:px-5">
                <span className={cn("mt-1.5 h-2 w-2 shrink-0 rounded-full", CATEGORY_DOT[n.category])} />
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-2">
                    <span className={cn("text-[13.5px]", unread ? "font-bold text-ink" : "font-medium text-slate-600")}>
                      {n.title}
                    </span>
                    {unread && <span className="h-1.5 w-1.5 rounded-full bg-accent" />}
                  </span>
                  <span className="mt-0.5 block text-[12.5px] text-slate-400">{n.detail}</span>
                </span>
                <span className="shrink-0 text-[11px] text-slate-400">{n.time}</span>
              </li>
            );
          })}
          {filtered.length === 0 && (
            <li className="px-5 py-12 text-center text-[13px] text-slate-400">
              Nothing in this category.
            </li>
          )}
        </ul>
      </Panel>
    </div>
  );
}
