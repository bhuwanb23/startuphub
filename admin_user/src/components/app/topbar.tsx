"use client";

import { Bell, Menu, Search } from "lucide-react";

export function AppTopbar({
  title,
  userName,
  initials,
  onMenu,
}: {
  title: string;
  userName: string;
  initials: string;
  onMenu?: () => void;
}) {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-white/85 backdrop-blur-xl">
      <div className="flex h-14 items-center gap-3 px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          aria-label="Open menu"
          onClick={onMenu}
          className="grid h-9 w-9 place-items-center rounded-lg border border-line text-ink lg:hidden"
        >
          <Menu className="h-4.5 w-4.5" />
        </button>

        <h1 className="truncate text-[15px] font-semibold tracking-tight text-ink">
          {title}
        </h1>

        <div className="ml-auto flex items-center gap-2.5">
          <label className="hidden items-center gap-2 rounded-lg border border-line bg-soft px-3 py-1.5 md:flex">
            <Search className="h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search workspace…"
              className="w-44 bg-transparent text-[12.5px] font-medium text-ink outline-none placeholder:text-slate-400"
            />
            <kbd className="rounded border border-line bg-white px-1.5 py-0.5 text-[9.5px] font-semibold text-slate-400">
              ⌘K
            </kbd>
          </label>

          <button
            type="button"
            aria-label="Notifications"
            className="relative grid h-9 w-9 place-items-center rounded-lg border border-line text-slate-500 transition-colors hover:text-ink"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-accent" />
          </button>

          <span
            className="grid h-9 w-9 place-items-center rounded-full bg-accent-soft text-[12px] font-semibold text-accent"
            title={userName}
          >
            {initials}
          </span>
        </div>
      </div>
    </header>
  );
}
