"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { PageIntro } from "@/components/app/widgets";
import { cn } from "@/lib/utils";
import { PRIORITY_TONE, TASK_COLUMNS } from "../../constants/work-data";

export function TalentTasks() {
  const [done, setDone] = useState<Set<string>>(
    new Set(TASK_COLUMNS.find((c) => c.key === "done")!.tasks.map((t) => t.id)),
  );

  const toggle = (id: string) =>
    setDone((s) => {
      const next = new Set(s);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <div className="space-y-6">
      <PageIntro
        title="Tasks"
        description="Everything on your plate this week — check items off as you ship them."
        action={
          <span className="rounded-full bg-accent-soft px-3 py-1.5 text-[12px] font-semibold text-accent-deep">
            {done.size}/{(TASK_COLUMNS.flatMap((c) => c.tasks)).length} complete
          </span>
        }
      />

      <div className="grid gap-4 lg:grid-cols-3">
        {TASK_COLUMNS.map((col) => (
          <div key={col.key}>
            <header className="mb-3 flex items-center gap-2 px-1">
              <span className={cn(
                "h-2 w-2 rounded-full",
                col.key === "done" ? "bg-emerald-500" : col.key === "doing" ? "bg-accent" : "bg-slate-300",
              )} />
              <h3 className="text-[12.5px] font-semibold uppercase tracking-[0.08em] text-slate-500">
                {col.label}
              </h3>
              <span className="ml-auto rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-bold text-slate-500">
                {col.tasks.filter((t) => done.has(t.id)).length}/{col.tasks.length}
              </span>
            </header>

            <div className="space-y-3">
              {col.tasks.map((t) => {
                const isDone = done.has(t.id);
                return (
                  <button
                    key={t.id}
                    onClick={() => toggle(t.id)}
                    className={cn(
                      "group flex w-full items-start gap-3 rounded-xl border border-line bg-white p-4 text-left shadow-[0_1px_2px_rgba(11,18,32,0.03)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card",
                      isDone && "opacity-60",
                    )}
                  >
                    <span className={cn(
                      "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-colors",
                      isDone ? "border-accent bg-accent text-white" : "border-slate-300 group-hover:border-accent-300",
                    )}>
                      {isDone && <Check className="h-3.5 w-3.5" />}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className={cn(
                        "block text-[13.5px] font-medium leading-snug text-ink",
                        isDone && "line-through",
                      )}>
                        {t.title}
                      </span>
                      <span className="mt-1 block text-[11.5px] text-slate-400">{t.project}</span>
                      <span className="mt-2 flex items-center justify-between">
                        <span className={cn("rounded-full px-2 py-0.5 text-[10.5px] font-semibold", PRIORITY_TONE[t.priority])}>
                          {t.priority}
                        </span>
                        <span className="text-[11px] text-slate-400">{t.due}</span>
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
