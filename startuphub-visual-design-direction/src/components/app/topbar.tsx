"use client";

import { Bell, CalendarDays, Menu } from "lucide-react";
import { Logo } from "@/components/ui";

export default function AppTopbar({
  title,
  userName,
  initials,
  onMenu,
}: {
  title: string;
  userName: string;
  initials: string;
  onMenu: () => void;
}) {
  return (
    <header className="sticky top-0 z-20 flex h-[60px] items-center gap-3 border-b border-line bg-white/85 px-4 backdrop-blur-md sm:px-6">
      <button
        onClick={onMenu}
        className="grid h-9 w-9 place-items-center rounded-lg border border-line bg-white text-ink lg:hidden"
        aria-label="Open menu"
      >
        <Menu className="h-4 w-4" />
      </button>
      <a href="/" className="flex items-center gap-2 lg:hidden" aria-label="StartupHub home">
        <Logo className="h-6 w-6" />
      </a>
      <h1 className="hidden text-[15px] font-semibold tracking-tight text-ink sm:block">{title}</h1>

      <div className="ml-auto flex items-center gap-1.5">
        <button
          className="relative grid h-9 w-9 place-items-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-ink"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute right-1.5 top-1.5 grid h-4 w-4 place-items-center rounded-full bg-accent text-[9px] font-bold text-white">
            3
          </span>
        </button>
        <button
          className="grid h-9 w-9 place-items-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-ink"
          aria-label="Calendar"
        >
          <CalendarDays className="h-4 w-4" />
        </button>
        <span className="mx-1 hidden h-5 w-px bg-line sm:block" />
        <button className="flex items-center gap-2.5 rounded-lg py-1 pl-1 pr-2 transition-colors hover:bg-slate-100">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-accent text-[11px] font-bold text-white">
            {initials}
          </span>
          <span className="hidden text-left sm:block">
            <span className="block text-[13px] font-semibold leading-tight text-ink">{userName}</span>
            <span className="block text-[10.5px] leading-tight text-slate-400">Pro plan</span>
          </span>
        </button>
      </div>
    </header>
  );
}
