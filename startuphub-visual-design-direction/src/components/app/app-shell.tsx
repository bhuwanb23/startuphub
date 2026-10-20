"use client";

import { useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronDown, X } from "lucide-react";
import CompanySwitcher from "@/components/app/company-switcher";
import AppTopbar from "@/components/app/topbar";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

export type AppNavSub = { name: string; href: string; soon?: boolean };
export type AppNavGroup = {
  label: string;
  icon: LucideIcon;
  href: string;
  subs?: AppNavSub[];
};

/* A flat nav entry — used for the utility and bottom rails. Normalised
   into an AppNavGroup at render time so both shapes share one renderer. */
export type AppNavItem = {
  name: string;
  href: string;
  icon: LucideIcon;
  soon?: boolean;
};

export type AppUser = {
  name: string;
  role: string;
  org: string;
  initials: string;
  home: string; // workspace root — activeness collapses everything here
  copilot?: boolean;
  /* Where the copilot card links to. Roles without a copilot screen
     omit this and the card renders as a non-navigating "soon" affordance. */
  copilotHref?: string;
};

/* Accept either nav shape and flatten to groups. */
function toGroups(items: (AppNavGroup | AppNavItem)[]): AppNavGroup[] {
  return items.map((it) =>
    "label" in it ? it : { label: it.name, icon: it.icon, href: it.href },
  );
}

function isActive(pathname: string, g: AppNavGroup, home: string) {
  if (g.href === home) return pathname === home;
  if (pathname.startsWith(g.href)) return true;
  return g.subs?.some((s) => pathname === s.href.split("#")[0] && s.href.split("#")[0] !== g.href) ?? false;
}

function NavGroup({
  g,
  pathname,
  home,
  onNavigate,
}: {
  g: AppNavGroup;
  pathname: string;
  home: string;
  onNavigate: () => void;
}) {
  const active = isActive(pathname, g, home);
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
    const exact = pathname === g.href.split("#")[0];
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
        <ChevronDown className={cn("h-3.5 w-3.5 text-slate-400 transition-transform duration-200", open && "rotate-180")} />
      </button>
      {open && (
        <div className="relative ml-[26px] mt-0.5 flex flex-col pb-0.5 pl-3">
          <span className="absolute bottom-1 left-0 top-0 w-px bg-line" aria-hidden="true" />
          {g.subs.map((s) => {
            const subActive = pathname === s.href.split("#")[0];
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

export function AppShell({
  nav,
  utility,
  bottom,
  user,
  title,
  children,
}: {
  nav: AppNavGroup[];
  utility?: (AppNavGroup | AppNavItem)[];
  bottom?: (AppNavGroup | AppNavItem)[];
  user: AppUser;
  title: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const utilityGroups = toGroups(utility ?? []);
  const bottomGroups = toGroups(bottom ?? []);

  const content = (
    <div className="flex h-full flex-col">
      <div className="px-3 pt-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CompanySwitcher currentName={user.org} currentRole={`${user.role} · ${user.name}`} initials={user.initials} />
          </div>
          <button
            onClick={() => setOpen(false)}
            className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-slate-100 lg:hidden"
            aria-label="Close menu"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-4" aria-label="Workspace">
        {nav.map((g) => (
          <NavGroup key={g.label} g={g} pathname={pathname} home={user.home} onNavigate={() => setOpen(false)} />
        ))}
        {utilityGroups.length > 0 && (
          <>
            <div className="px-2.5 pb-1 pt-5 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-300">
              Workspace
            </div>
            {utilityGroups.map((g) => (
              <NavGroup key={g.label} g={g} pathname={pathname} home={user.home} onNavigate={() => setOpen(false)} />
            ))}
          </>
        )}
      </nav>

      <div className="space-y-0.5 border-t border-line px-3 py-3">
        {user.copilot &&
          (user.copilotHref ? (
            <Link
              href={user.copilotHref}
              onClick={() => setOpen(false)}
              className={cn(
                "mb-2 flex items-center gap-2.5 rounded-xl border px-3 py-2.5 text-[13px] font-semibold transition-all",
                pathname === user.copilotHref
                  ? "border-accent bg-accent text-white"
                  : "border-accent/25 bg-accent-mist text-accent hover:border-accent/40"
              )}
            >
              <span className="relative flex h-4 w-4">
                <span className="ping-dot h-1.5 w-1.5 translate-x-[5px] translate-y-[5px] rounded-full bg-current" />
              </span>
              Ask Startup Copilot
            </Link>
          ) : (
            <div
              aria-disabled="true"
              className="mb-2 flex items-center gap-2.5 rounded-xl border border-accent/15 bg-accent-mist/60 px-3 py-2.5 text-[13px] font-semibold text-accent/70"
            >
              <span className="relative flex h-4 w-4">
                <span className="ping-dot h-1.5 w-1.5 translate-x-[5px] translate-y-[5px] rounded-full bg-current" />
              </span>
              Ask Startup Copilot
              <span className="ml-auto rounded-md bg-accent/10 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.08em]">
                Soon
              </span>
            </div>
          ))}
        {bottomGroups.map((g) => (
          <NavGroup key={g.label} g={g} pathname={pathname} home={user.home} onNavigate={() => setOpen(false)} />
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-soft">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[264px] border-r border-line bg-soft lg:block">{content}</aside>
      {open && (
        <>
          <div className="fixed inset-0 z-40 bg-ink/30 backdrop-blur-sm lg:hidden" onClick={() => setOpen(false)} />
          <aside className="fixed inset-y-0 left-0 z-50 w-[280px] border-r border-line bg-white shadow-2xl lg:hidden">{content}</aside>
        </>
      )}

      <div className="lg:pl-[264px]">
        <AppTopbar title={title} userName={user.name} initials={user.initials} role={user.role} onMenu={() => setOpen(true)} />
        <main className="px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}

export default AppShell;
