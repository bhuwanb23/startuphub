"use client";

import { Check, ChevronsUpDown, Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function CompanySwitcher({
  org,
  role,
  home,
}: {
  org: string;
  role: string;
  home: string;
}) {
  const [open, setOpen] = useState(false);

  const orgInitials = org
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center gap-3 rounded-xl border border-line bg-white px-3 py-2.5 text-left transition-colors hover:border-accent/30"
      >
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent-soft text-[12px] font-semibold text-accent">
          {orgInitials}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[13px] font-semibold leading-tight text-ink">
            {org}
          </span>
          <span className="block truncate text-[11px] text-slate-400">{role}</span>
        </span>
        <ChevronsUpDown className="h-4 w-4 shrink-0 text-slate-400" />
      </button>

      {open ? (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute inset-x-0 top-full z-20 mt-2 overflow-hidden rounded-xl border border-line bg-white shadow-lift">
            <Link
              href={home}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-3.5 py-2.5 transition-colors hover:bg-soft"
            >
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-accent-soft text-[10px] font-semibold text-accent">
                {orgInitials}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[12.5px] font-semibold text-ink">
                  {org}
                </span>
                <span className="block text-[10.5px] text-slate-400">Current workspace</span>
              </span>
              <Check className="h-3.5 w-3.5 shrink-0 text-accent" />
            </Link>
            <div className="border-t border-line" />
            <button
              type="button"
              className={cn(
                "flex w-full items-center gap-3 px-3.5 py-2.5 text-left",
                "transition-colors hover:bg-soft",
              )}
            >
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md border border-dashed border-line text-slate-400">
                <Plus className="h-3.5 w-3.5" />
              </span>
              <span className="text-[12.5px] font-medium text-slate-500">
                Create workspace
              </span>
            </button>
          </div>
        </>
      ) : null}
    </div>
  );
}
