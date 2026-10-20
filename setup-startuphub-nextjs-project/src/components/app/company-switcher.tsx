"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui";

const WORKSPACES = [
  { label: "Founder", org: "Lumen AI", href: "/founder" },
  { label: "Mentor", org: "Priya Nair", href: "/mentor" },
  { label: "IPR Expert", org: "Kavya Reddy", href: "/ipr-expert" },
  { label: "Incubator", org: "Nexus Labs", href: "/incubator" },
  { label: "Investor", org: "Meridian Capital", href: "/investor" },
  { label: "University", org: "Crestmont University", href: "/university" },
];

export function CompanySwitcher({ org }: { org: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  return (
    <div ref={ref} className="relative px-3 pt-3">
      <button
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "flex w-full items-center gap-2.5 rounded-lg border border-line bg-white px-2.5 py-2 text-left transition-colors hover:bg-soft",
          open && "bg-soft",
        )}
      >
        <Logo className="h-7 w-7 shrink-0" />
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[13px] font-semibold text-ink">
            {org}
          </span>
          <span className="block text-[11px] text-slate-400">Workspace</span>
        </span>
        <ChevronsUpDown className="h-4 w-4 shrink-0 text-slate-400" />
      </button>

      {open && (
        <div className="absolute inset-x-3 top-[calc(100%+4px)] z-50 overflow-hidden rounded-xl border border-line bg-white py-1.5 shadow-lift">
          <p className="px-3 pb-1.5 pt-1 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-slate-400">
            Switch workspace
          </p>
          {WORKSPACES.map((w) => (
            <a
              key={w.href}
              href={w.href}
              className="flex items-center gap-2.5 px-3 py-2 text-[13px] font-medium text-slate-600 transition-colors hover:bg-soft hover:text-ink"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-accent-soft text-[9.5px] font-bold text-accent-deep">
                {w.org
                  .split(" ")
                  .slice(0, 2)
                  .map((word) => word[0])
                  .join("")}
              </span>
              <span className="flex-1">
                <span className="block leading-tight">{w.label}</span>
                <span className="block text-[11px] font-normal text-slate-400">
                  {w.org}
                </span>
              </span>
              {w.org === org && <Check className="h-3.5 w-3.5 text-accent" />}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
