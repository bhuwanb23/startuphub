"use client";

import { useEffect, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronDown, Sparkles, X, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { CompanySwitcher } from "./company-switcher";
import { AppTopbar } from "./topbar";

/* ------------------------------------------------------------------ */
/* The contract every role shell must satisfy                          */
/* ------------------------------------------------------------------ */
export type AppNavSub = { name: string; href: string; soon?: boolean };
export type AppNavGroup = {
  label: string;
  icon: LucideIcon;
  href: string;
  subs?: AppNavSub[];
};
export type AppUser = {
  name: string;
  role: string;
  org: string;
  initials: string;
  home: string;
  copilot?: boolean;
};

function SoonChip() {
  return (
    <span className="ml-auto rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
      Soon
    </span>
  );
}

/* One collapsible nav group. Highlight resolves so a group's own
   workspace root (e.g. /investor) only lights on an exact match. */
function Group({
  group,
  pathname,
  home,
  onNavigate,
}: {
  group: AppNavGroup;
  pathname: string;
  home: string;
  onNavigate?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const Icon = group.icon;

  const isActive = (href: string) =>
    href === home ? pathname === href : pathname === href || pathname.startsWith(href + "/");

  const groupHasActiveSub = group.subs?.some((s) => isActive(s.href)) ?? false;
  const groupActive = isActive(group.href) && !group.subs?.length;
  const expanded = open || groupHasActiveSub || isActive(group.href);

  useEffect(() => {
    if (groupHasActiveSub) setOpen(true);
  }, [groupHasActiveSub]);

  if (!group.subs?.length) {
    return (
      <Link
        href={group.href}
        onClick={onNavigate}
        className={cn(
          "flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] font-medium transition-colors",
          groupActive
            ? "bg-accent-soft text-accent"
            : "text-slate-600 hover:bg-slate-100 hover:text-ink",
        )}
      >
        <Icon className="h-4 w-4" />
        <span>{group.label}</span>
      </Link>
    );
  }

  return (
    <div>
      <button
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] font-medium transition-colors",
          groupHasActiveSub
            ? "text-ink"
            : "text-slate-600 hover:bg-slate-100 hover:text-ink",
        )}
      >
        <Icon
          className={cn("h-4 w-4", groupHasActiveSub && "text-accent")}
        />
        <span>{group.label}</span>
        <ChevronDown
          className={cn(
            "ml-auto h-3.5 w-3.5 text-slate-400 transition-transform duration-200",
            expanded && "rotate-180",
          )}
        />
      </button>

      {expanded && (
        <div className="ml-[22px] mt-0.5 space-y-0.5 border-l border-line pl-3">
          {group.subs.map((sub) =>
            sub.soon ? (
              <span
                key={sub.name}
                className="flex items-center gap-2 rounded-md px-2 py-1.5 text-[12.5px] text-slate-400"
              >
                {sub.name}
                <SoonChip />
              </span>
            ) : (
              <Link
                key={sub.name}
                href={sub.href}
                onClick={onNavigate}
                className={cn(
                  "relative flex items-center rounded-md px-2 py-1.5 text-[12.5px] transition-colors",
                  isActive(sub.href)
                    ? "font-semibold text-accent before:absolute before:-left-[13px] before:top-1/2 before:h-4 before:w-[2px] before:-translate-y-1/2 before:rounded-full before:bg-accent"
                    : "text-slate-500 hover:text-ink",
                )}
              >
                {sub.name}
              </Link>
            ),
          )}
        </div>
      )}
    </div>
  );
}

function SidebarContent({
  nav,
  utility,
  bottom,
  user,
  pathname,
  onNavigate,
}: {
  nav: AppNavGroup[];
  utility: AppNavGroup[];
  bottom: AppNavGroup[];
  user: AppUser;
  pathname: string;
  onNavigate?: () => void;
}) {
  return (
    <div className="flex h-full flex-col">
      <CompanySwitcher org={user.org} />

      <nav className="mt-3 flex-1 space-y-4 overflow-y-auto px-3 pb-4">
        <div className="space-y-0.5">
          {nav.map((group) => (
            <Group
              key={group.label}
              group={group}
              pathname={pathname}
              home={user.home}
              onNavigate={onNavigate}
            />
          ))}
        </div>

        {utility.length > 0 && (
          <div>
            <p className="px-3 pb-1.5 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-slate-400">
              General
            </p>
            <div className="space-y-0.5">
              {utility.map((group) => (
                <Group
                  key={group.label}
                  group={group}
                  pathname={pathname}
                  home={user.home}
                  onNavigate={onNavigate}
                />
              ))}
            </div>
          </div>
        )}
      </nav>

      <div className="border-t border-line px-3 py-3">
        {user.copilot && (
          <a
            href="#"
            className="mb-2.5 flex items-center justify-center gap-2 rounded-lg bg-accent px-3 py-2.5 text-[13px] font-semibold text-white shadow-[0_1px_2px_rgba(49,87,232,0.4)] transition-colors hover:bg-accent-deep"
          >
            <Sparkles className="ping-dot h-4 w-4 rounded-full" />
            Ask Startup Copilot
          </a>
        )}
        <div className="space-y-0.5">
          {bottom.map((group) => {
            const Icon = group.icon;
            return (
              <Link
                key={group.label}
                href={group.href}
                onClick={onNavigate}
                className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-ink"
              >
                <Icon className="h-4 w-4" />
                <span>{group.label}</span>
              </Link>
            );
          })}
        </div>
        <div className="mt-2.5 flex items-center gap-2.5 rounded-lg bg-soft px-2.5 py-2">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink text-[11px] font-bold text-white">
            {user.initials}
          </span>
          <span className="min-w-0">
            <span className="block truncate text-[12.5px] font-semibold text-ink">
              {user.name}
            </span>
            <span className="block truncate text-[11px] text-slate-400">
              {user.role}
            </span>
          </span>
        </div>
      </div>
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
  utility: AppNavGroup[];
  bottom: AppNavGroup[];
  user: AppUser;
  title: string;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  /* close the drawer whenever the route changes */
  useEffect(() => setMobileOpen(false), [pathname]);

  return (
    <div className="min-h-screen bg-soft">
      {/* fixed sidebar — lg+ */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[264px] border-r border-line bg-white lg:block">
        <SidebarContent
          nav={nav}
          utility={utility}
          bottom={bottom}
          user={user}
          pathname={pathname}
        />
      </aside>

      {/* off-canvas drawer — below lg */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-ink/40 backdrop-blur-[2px]"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="absolute inset-y-0 left-0 w-[280px] bg-white shadow-lift">
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute right-3 top-3.5 rounded-lg p-1.5 text-slate-500 hover:bg-soft"
              aria-label="Close navigation"
            >
              <X className="h-4.5 w-4.5" />
            </button>
            <SidebarContent
              nav={nav}
              utility={utility}
              bottom={bottom}
              user={user}
              pathname={pathname}
              onNavigate={() => setMobileOpen(false)}
            />
          </aside>
        </div>
      )}

      <div className="lg:pl-[264px]">
        <AppTopbar
          title={title}
          userName={user.name}
          initials={user.initials}
          onMenu={() => setMobileOpen(true)}
        />
        <main className="px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
