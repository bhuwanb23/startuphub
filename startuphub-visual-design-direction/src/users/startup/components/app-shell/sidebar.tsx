"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronDown, X } from "lucide-react";
import CompanySwitcher from "@/components/app/company-switcher";
import {
  founderBottom,
  founderNav,
  founderUtility,
  type FounderGroup,
} from "@/users/startup/constants/founder-nav";
import { cn } from "@/lib/utils";

function isActive(pathname: string, g: FounderGroup) {
  if (g.href === "/founder") return pathname === "/founder";
  if (pathname.startsWith(g.href)) return true;
  return g.subs?.some((s) => pathname === s.href.split("#")[0] && s.href.split("#")[0] !== g.href) ?? false;
}

function Group({
  g,
  pathname,
  onNavigate,
}: {
  g: FounderGroup;
  pathname: string;
  onNavigate: () => void;
}) {
  const active = isActive(pathname, g);
  const [open, setOpen] = useState(active);
  const [wasActive, setWasActive] = useState(active);

  /* Auto-expand the group when navigation lands inside it. Adjusting state
     during render (rather than in an effect) avoids the cascading-render
     warning and keeps the group open for the current route. */
  if (active !== wasActive) {
    setWasActive(active);
    if (active) setOpen(true);
  }

  if (!g.subs) {
    const exact = pathname === g.href;
    return (
      <Link
        href={g.href}
        onClick={onNavigate}
        className={cn(
          "flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] font-medium transition-colors",
          exact ? "bg-accent-soft text-accent" : "text-slate-600 hover:bg-slate-100 hover:text-ink"
        )}
      >
        <g.icon className={cn("h-4 w-4 shrink-0", exact ? "text-accent" : "text-slate-400")} />
        {g.label}
      </Link>
    );
  }

  return (
    <div>
      <button
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] font-medium transition-colors",
          active ? "text-accent" : "text-slate-600 hover:bg-slate-100 hover:text-ink"
        )}
      >
        <g.icon className={cn("h-4 w-4 shrink-0", active ? "text-accent" : "text-slate-400")} />
        <span className="flex-1 text-left">{g.label}</span>
        <ChevronDown
          className={cn("h-3.5 w-3.5 text-slate-400 transition-transform duration-200", open && "rotate-180")}
        />
      </button>
      {open && (
        <div className="relative ml-[26px] mt-0.5 flex flex-col pb-0.5 pl-3">
          <span className="absolute bottom-1 left-0 top-0 w-px bg-line" aria-hidden="true" />
          {g.subs.map((s) => {
            const base = s.href.split("#")[0];
            const subActive = pathname === base;
            return (
              <Link
                key={s.name}
                href={s.href}
                onClick={onNavigate}
                className={cn(
                  "flex items-center justify-between rounded-md px-2.5 py-1.5 text-[12px] transition-colors",
                  subActive ? "font-semibold text-accent" : "text-slate-500 hover:text-ink"
                )}
              >
                {s.name}
                {s.soon && <span className="text-[9px] font-bold uppercase text-slate-300">Soon</span>}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function FounderSidebar({
  mobileOpen,
  onClose,
}: {
  mobileOpen: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();

  const content = (
    <div className="flex h-full flex-col">
      <div className="px-3 pt-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CompanySwitcher currentName="Lumen AI" currentRole="Founder · Ravi Sharma" initials="RS" />
          </div>
          <button
            onClick={onClose}
            className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-slate-100 lg:hidden"
            aria-label="Close menu"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-4" aria-label="Founder workspace">
        {founderNav.map((g) => (
          <Group key={g.label} g={g} pathname={pathname} onNavigate={onClose} />
        ))}

        <div className="px-2.5 pb-1 pt-5 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-300">
          Workspace
        </div>
        {founderUtility.map((g) => (
          <Group key={g.label} g={g} pathname={pathname} onNavigate={onClose} />
        ))}
      </nav>

      <div className="space-y-0.5 border-t border-line px-3 py-3">
        {/* copilot spotlight */}
        <Link
          href="/founder/copilot"
          onClick={onClose}
          className={cn(
            "mb-2 flex items-center gap-2.5 rounded-xl border px-3 py-2.5 text-[13px] font-semibold transition-all",
            pathname === "/founder/copilot"
              ? "border-accent bg-accent text-white"
              : "border-accent/25 bg-accent-mist text-accent hover:border-accent/40"
          )}
        >
          <span className="relative flex h-4 w-4">
            <span className="ping-dot h-1.5 w-1.5 translate-x-[5px] translate-y-[5px] rounded-full bg-current" />
          </span>
          Ask Startup Copilot
        </Link>
        {founderBottom.map((g) => (
          <Group key={g.label} g={g} pathname={pathname} onNavigate={onClose} />
        ))}
      </div>
    </div>
  );

  return (
    <>
      {/* desktop */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[264px] border-r border-line bg-soft lg:block">
        {content}
      </aside>
      {/* mobile */}
      {mobileOpen && (
        <>
          <div className="fixed inset-0 z-40 bg-ink/30 backdrop-blur-sm lg:hidden" onClick={onClose} />
          <aside className="fixed inset-y-0 left-0 z-50 w-[280px] border-r border-line bg-white shadow-2xl lg:hidden">
            {content}
          </aside>
        </>
      )}
    </>
  );
}
