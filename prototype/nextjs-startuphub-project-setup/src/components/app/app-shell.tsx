"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  LogOut,
  Sparkles,
  X,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { type ReactNode, useState } from "react";
import { CompanySwitcher } from "@/components/app/company-switcher";
import { AppTopbar } from "@/components/app/topbar";
import { Logo, Wordmark } from "@/components/ui";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

/* ── The contract every role shell must satisfy ────────────── */
export type AppNavSub = { name: string; href: string; soon?: boolean };
export type AppNavGroup = {
  label: string;
  icon: LucideIcon;
  href: string;
  subs?: AppNavSub[];
};
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
  home: string;
  copilot?: boolean;
};

/* Active-state resolution: a group's own root only lights on an
   exact match, so /investor is not lit on /investor/dealflow/*. */
function isActive(pathname: string, href: string) {
  return pathname === href;
}

function isGroupActive(pathname: string, group: AppNavGroup) {
  if (pathname === group.href) return true;
  return (group.subs ?? []).some((s) => !s.soon && pathname === s.href);
}

function CopilotCard() {
  return (
    <a
      href="#"
      className="group block rounded-xl border border-accent/25 bg-accent p-3.5 text-white shadow-[0_8px_20px_rgba(49,87,232,0.28)] transition-all duration-300 hover:bg-accent-deep"
    >
      <span className="flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="ping-dot absolute inline-flex h-full w-full rounded-full bg-white" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
        </span>
        <Sparkles className="h-4 w-4" />
        <span className="text-[13px] font-semibold">Ask Startup Copilot</span>
      </span>
      <span className="mt-1.5 block text-[11px] leading-snug text-white/70">
        Screen deals, draft memos and surface signals.
      </span>
    </a>
  );
}

function NavContent({
  nav,
  utility,
  bottom,
  user,
  pathname,
  onNavigate,
}: {
  nav: AppNavGroup[];
  utility: AppNavItem[];
  bottom: AppNavItem[];
  user: AppUser;
  pathname: string;
  onNavigate?: () => void;
}) {
  const [open, setOpen] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(nav.map((g) => [g.label, isGroupActive(pathname, g)])),
  );

  return (
    <div className="flex h-full flex-col">
      {/* brand */}
      <div className="flex h-16 items-center border-b border-line px-4">
        <a href={user.home} aria-label="StartupHub">
          <Wordmark />
        </a>
      </div>

      {/* workspace identity */}
      <div className="px-3 pt-3">
        <CompanySwitcher org={user.org} role={user.role} initials={user.initials} />
      </div>

      {/* nav */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        <p className="px-2 pb-2 font-mono text-[9.5px] font-medium tracking-[0.2em] text-slate-400 uppercase">
          Workspace
        </p>
        {nav.map((g) => {
          const groupActive = isGroupActive(pathname, g);
          const exact = isActive(pathname, g.href);
          const expanded = open[g.label] ?? false;
          const hasSubs = (g.subs ?? []).length > 0;
          return (
            <div key={g.label}>
              <div
                className={cn(
                  "group flex items-center rounded-lg transition-colors",
                  exact
                    ? "bg-accent-soft text-accent"
                    : groupActive
                      ? "text-ink"
                      : "text-slate-600 hover:bg-slate-100 hover:text-ink",
                )}
              >
                <a
                  href={g.href}
                  onClick={onNavigate}
                  className="flex flex-1 items-center gap-2.5 px-2.5 py-2 text-[13px] font-medium"
                >
                  <g.icon
                    className={cn(
                      "h-4 w-4 shrink-0",
                      exact ? "text-accent" : "text-slate-400 group-hover:text-slate-600",
                    )}
                  />
                  {g.label}
                </a>
                {hasSubs && (
                  <button
                    aria-label={`Toggle ${g.label}`}
                    onClick={() =>
                      setOpen((o) => ({ ...o, [g.label]: !expanded }))
                    }
                    className="mr-1.5 flex h-6 w-6 items-center justify-center rounded-md text-slate-400 hover:bg-white hover:text-ink"
                  >
                    <ChevronDown
                      className={cn(
                        "h-3.5 w-3.5 transition-transform duration-300",
                        expanded && "rotate-180",
                      )}
                    />
                  </button>
                )}
              </div>

              {hasSubs && (
                <AnimatePresence initial={false}>
                  {expanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="mt-0.5 ml-[22px] space-y-0.5 border-l border-line pl-3">
                        {g.subs!.map((s) => {
                          const subActive = isActive(pathname, s.href);
                          return (
                            <a
                              key={s.name}
                              href={s.soon ? "#" : s.href}
                              onClick={s.soon ? (e) => e.preventDefault() : onNavigate}
                              className={cn(
                                "flex items-center justify-between rounded-md py-[7px] pr-2 pl-2 text-[12.5px] transition-colors",
                                subActive
                                  ? "bg-accent-soft font-semibold text-accent"
                                  : "text-slate-500 hover:bg-slate-100 hover:text-ink",
                                s.soon && "cursor-default opacity-60",
                              )}
                            >
                              {s.name}
                              {s.soon && (
                                <span className="rounded-md bg-slate-100 px-1.5 py-0.5 font-mono text-[8.5px] font-medium tracking-[0.08em] text-slate-400 uppercase">
                                  Soon
                                </span>
                              )}
                            </a>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          );
        })}

        {/* utility */}
        {utility.length > 0 && (
          <div className="pt-5">
            <p className="px-2 pb-2 font-mono text-[9.5px] font-medium tracking-[0.2em] text-slate-400 uppercase">
              Support
            </p>
            {utility.map((u) => (
              <a
                key={u.name}
                href={u.href}
                onClick={onNavigate}
                className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-ink"
              >
                <u.icon className="h-4 w-4 shrink-0 text-slate-400" />
                {u.name}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* footer */}
      <div className="space-y-3 border-t border-line p-3">
        {user.copilot && <CopilotCard />}
        {bottom.map((b) => (
          <a
            key={b.name}
            href={b.href}
            onClick={onNavigate}
            className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-ink"
          >
            <b.icon className="h-4 w-4 shrink-0 text-slate-400" />
            {b.name}
          </a>
        ))}
        <div className="flex items-center gap-2.5 rounded-lg px-1 py-1.5">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-ink text-[11px] font-bold text-white">
            {user.initials}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-[12.5px] font-semibold text-ink">
              {user.name}
            </span>
            <span className="block truncate text-[10.5px] text-slate-400">
              {user.role}
            </span>
          </span>
          <a
            href="/"
            aria-label="Log out"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-ink"
          >
            <LogOut className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}

export function AppShell({
  nav,
  utility = [],
  bottom = [],
  user,
  title,
  children,
}: {
  nav: AppNavGroup[];
  utility?: AppNavItem[];
  bottom?: AppNavItem[];
  user: AppUser;
  title: string;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-soft">
      {/* desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[264px] border-r border-line bg-white lg:block">
        <NavContent
          nav={nav}
          utility={utility}
          bottom={bottom}
          user={user}
          pathname={pathname}
        />
      </aside>

      {/* mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm lg:hidden"
            />
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-y-0 left-0 z-50 w-[284px] bg-white shadow-lift lg:hidden"
            >
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="absolute top-4 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100"
              >
                <X className="h-4.5 w-4.5" />
              </button>
              <NavContent
                nav={nav}
                utility={utility}
                bottom={bottom}
                user={user}
                pathname={pathname}
                onNavigate={() => setMobileOpen(false)}
              />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* content column */}
      <div className="lg:pl-[264px]">
        <AppTopbar
          title={title}
          userName={user.name}
          initials={user.initials}
          role={user.role}
          onMenu={() => setMobileOpen(true)}
        />
        <main className="px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
