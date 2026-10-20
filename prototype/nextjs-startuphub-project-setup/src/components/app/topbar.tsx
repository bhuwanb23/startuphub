"use client";

import { Bell, Menu, Search } from "lucide-react";

export function AppTopbar({
  title,
  userName,
  initials,
  role,
  onMenu,
}: {
  title: string;
  userName: string;
  initials: string;
  role?: string;
  onMenu?: () => void;
}) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-line bg-soft/80 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
      <button
        onClick={onMenu}
        aria-label="Open menu"
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-white text-ink lg:hidden"
      >
        <Menu className="h-4.5 w-4.5" />
      </button>

      <h1 className="truncate text-[16px] font-semibold tracking-[-0.01em] text-ink">
        {title}
      </h1>

      <div className="ml-auto flex items-center gap-2.5">
        <label className="hidden items-center gap-2 rounded-lg border border-line bg-white px-3 py-2 md:flex">
          <Search className="h-3.5 w-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search workspace…"
            className="w-44 bg-transparent text-[12.5px] text-ink outline-none placeholder:text-slate-400 lg:w-52"
          />
          <kbd className="rounded border border-line bg-soft px-1.5 font-mono text-[9px] text-slate-400">
            ⌘K
          </kbd>
        </label>

        <button
          aria-label="Notifications"
          className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-white text-slate-500 transition-colors hover:text-ink"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute top-2 right-2.5 h-1.5 w-1.5 rounded-full bg-accent" />
        </button>

        <div className="hidden h-5 w-px bg-line sm:block" />

        <div className="hidden items-center gap-2.5 sm:flex">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-ink text-[12px] font-bold text-white">
            {initials}
          </span>
          <span className="hidden xl:block">
            <span className="block text-[12.5px] leading-tight font-semibold text-ink">
              {userName}
            </span>
            {role && (
              <span className="block text-[10.5px] leading-tight text-slate-400">
                {role}
              </span>
            )}
          </span>
        </div>
      </div>
    </header>
  );
}
