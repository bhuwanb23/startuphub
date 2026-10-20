"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Sparkles, X, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { CompanySwitcher } from "./company-switcher";
import { AppTopbar } from "./topbar";

/* --------------------------------- contract -------------------------------- */

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

/* ------------------------------- active state ------------------------------ */

// A group's highlight collapses onto its own workspace root:
// "/mentor" must not stay lit while browsing "/mentor/startups".
function isActive(pathname: string, href: string, home: string) {
  if (pathname === href) return true;
  if (href === home) return false;
  return pathname.startsWith(href + "/");
}

/* --------------------------------- nav group ------------------------------- */

function NavGroup({
  item,
  pathname,
  home,
  onNavigate,
}: {
  item: AppNavGroup;
  pathname: string;
  home: string;
  onNavigate?: () => void;
}) {
  const Icon = item.icon;
  const containsActiveSub =
    item.subs?.some(
      (s) => pathname === s.href || pathname.startsWith(s.href + "/"),
    ) ?? false;
  // Group stays lit while any of its sub-screens is open (e.g. Verification
  // highlighted on /admin/moderation), but the workspace root itself
  // (/admin) never stays lit on deeper pages.
  const active = isActive(pathname, item.href, home) || containsActiveSub;
  const [open, setOpen] = useState(active || containsActiveSub);

  return (
    <div>
      <div
        className={cn(
          "group/nav flex items-center rounded-lg transition-colors",
          active ? "bg-accent-soft" : "hover:bg-slate-100",
        )}
      >
        <Link
          href={item.href}
          onClick={onNavigate}
          className={cn(
            "flex min-w-0 flex-1 items-center gap-2.5 px-3 py-2 text-[13px] font-medium transition-colors",
            active ? "text-accent" : "text-slate-600 group-hover/nav:text-ink",
          )}
        >
          <Icon
            className={cn("h-4 w-4 shrink-0", active ? "text-accent" : "text-slate-400")}
            strokeWidth={active ? 2.2 : 2}
          />
          <span className="truncate">{item.label}</span>
        </Link>
        {item.subs?.length ? (
          <button
            type="button"
            aria-label={`Toggle ${item.label}`}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid h-7 w-7 shrink-0 place-items-center rounded-md text-slate-400 transition-colors hover:text-ink"
          >
            <ChevronDown
              className={cn(
                "h-3.5 w-3.5 transition-transform duration-300",
                open && "rotate-180",
              )}
            />
          </button>
        ) : null}
      </div>

      <AnimatePresence initial={false}>
        {item.subs?.length && open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="mt-0.5 space-y-0.5 pb-1.5">
              {item.subs.map((sub) => {
                const subActive =
                  pathname === sub.href || pathname.startsWith(sub.href + "/");
                return (
                  <Link
                    key={sub.name}
                    href={sub.href}
                    onClick={onNavigate}
                    className={cn(
                      "flex items-center justify-between gap-2 rounded-md py-1.5 pl-9 pr-3 text-[12.5px] transition-colors",
                      subActive
                        ? "bg-accent-soft/70 font-semibold text-accent"
                        : "font-medium text-slate-500 hover:bg-slate-100 hover:text-ink",
                    )}
                  >
                    <span className="truncate">{sub.name}</span>
                    {sub.soon ? (
                      <span className="shrink-0 rounded bg-slate-100 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                        Soon
                      </span>
                    ) : null}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

/* --------------------------------- sidebar --------------------------------- */

function Sidebar({
  nav,
  utility,
  bottom,
  user,
  onNavigate,
}: {
  nav: AppNavGroup[];
  utility: AppNavGroup[];
  bottom: AppNavGroup[];
  user: AppUser;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-[264px] flex-col border-r border-line bg-white">
      <div className="border-b border-line p-3">
        <CompanySwitcher org={user.org} role={user.role} home={user.home} />
      </div>

      <nav className="scroll-quiet flex-1 space-y-0.5 overflow-y-auto px-3 py-4">
        {nav.map((item) => (
          <NavGroup
            key={item.label}
            item={item}
            pathname={pathname}
            home={user.home}
            onNavigate={onNavigate}
          />
        ))}

        {utility.length ? (
          <>
            <p className="px-3 pb-1.5 pt-5 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              Utility
            </p>
            {utility.map((item) => (
              <NavGroup
                key={item.label}
                item={item}
                pathname={pathname}
                home={user.home}
                onNavigate={onNavigate}
              />
            ))}
          </>
        ) : null}

        {bottom.length ? (
          <>
            <p className="px-3 pb-1.5 pt-5 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              Workspace
            </p>
            {bottom.map((item) => (
              <NavGroup
                key={item.label}
                item={item}
                pathname={pathname}
                home={user.home}
                onNavigate={onNavigate}
              />
            ))}
          </>
        ) : null}
      </nav>

      <div className="space-y-2.5 border-t border-line p-3">
        {user.copilot ? (
          <Link
            href={`${user.home}/copilot`}
            onClick={onNavigate}
            className="flex items-center gap-2.5 rounded-xl border border-accent/15 bg-accent-soft px-3.5 py-2.5 text-[12.5px] font-semibold text-accent transition-colors hover:border-accent/30"
          >
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="ping-dot absolute inline-flex h-full w-full rounded-full bg-accent" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            <Sparkles className="h-4 w-4 shrink-0" strokeWidth={2.1} />
            Ask Startup Copilot
          </Link>
        ) : null}

        <div className="flex items-center gap-3 rounded-xl px-2 py-1.5">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ink text-[12px] font-semibold text-white">
            {user.initials}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-[13px] font-semibold text-ink">
              {user.name}
            </span>
            <span className="block truncate text-[11.5px] text-slate-400">
              {user.role}
            </span>
          </span>
        </div>
      </div>
    </aside>
  );
}

/* --------------------------------- shell ----------------------------------- */

export function AppShell({
  nav,
  utility = [],
  bottom = [],
  user,
  title,
  children,
}: {
  nav: AppNavGroup[];
  utility?: AppNavGroup[];
  bottom?: AppNavGroup[];
  user: AppUser;
  title: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-soft">
      {/* desktop sidebar */}
      <div className="fixed inset-y-0 left-0 z-40 hidden lg:block">
        <Sidebar nav={nav} utility={utility} bottom={bottom} user={user} />
      </div>

      {/* mobile drawer */}
      <AnimatePresence>
        {open ? (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-[2px] lg:hidden"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-y-0 left-0 z-50 lg:hidden"
            >
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="absolute -right-11 top-3.5 grid h-9 w-9 place-items-center rounded-lg border border-white/20 bg-white/10 text-white backdrop-blur"
              >
                <X className="h-4.5 w-4.5" />
              </button>
              <Sidebar
                nav={nav}
                utility={utility}
                bottom={bottom}
                user={user}
                onNavigate={() => setOpen(false)}
              />
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>

      <div className="lg:pl-[264px]">
        <AppTopbar
          title={title}
          userName={user.name}
          initials={user.initials}
          onMenu={() => setOpen(true)}
        />
        <main className="px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
