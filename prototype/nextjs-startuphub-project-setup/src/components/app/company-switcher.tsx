"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronsUpDown, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function CompanySwitcher({
  org,
  role,
  initials,
  workspaces,
}: {
  org: string;
  role: string;
  initials: string;
  workspaces?: string[];
}) {
  const list = workspaces ?? [org, `${org} Fund II`, "Personal syndicate"];
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(org);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "flex w-full items-center gap-2.5 rounded-xl border px-2.5 py-2 text-left transition-colors",
          open
            ? "border-accent/40 bg-accent-mist"
            : "border-line bg-soft hover:bg-slate-100",
        )}
      >
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent text-[11px] font-bold text-white">
          {initials}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[12.5px] font-semibold text-ink">
            {current}
          </span>
          <span className="block truncate text-[10.5px] text-slate-400">
            {role} workspace
          </span>
        </span>
        <ChevronsUpDown className="h-3.5 w-3.5 shrink-0 text-slate-400" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-x-0 top-full z-30 mt-2 overflow-hidden rounded-xl border border-line bg-white shadow-lift"
          >
            <p className="border-b border-line px-3.5 py-2.5 font-mono text-[9px] font-medium tracking-[0.18em] text-slate-400 uppercase">
              Switch workspace
            </p>
            <div className="p-1.5">
              {list.map((w) => (
                <button
                  key={w}
                  onClick={() => {
                    setCurrent(w);
                    setOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-left text-[12.5px] font-medium transition-colors",
                    w === current
                      ? "bg-accent-soft text-accent"
                      : "text-slate-600 hover:bg-slate-100 hover:text-ink",
                  )}
                >
                  {w}
                  {w === current && <Check className="h-3.5 w-3.5" />}
                </button>
              ))}
            </div>
            <button className="flex w-full items-center gap-2 border-t border-line px-3.5 py-2.5 text-[12px] font-semibold text-accent transition-colors hover:bg-accent-mist">
              <Plus className="h-3.5 w-3.5" /> Create workspace
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
