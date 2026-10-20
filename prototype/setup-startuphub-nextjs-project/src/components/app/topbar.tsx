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
  onMenu: () => void;
}) {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-line bg-white/90 px-4 backdrop-blur sm:px-6 lg:px-8">
      <button
        onClick={onMenu}
        className="rounded-lg p-2 text-slate-600 transition-colors hover:bg-soft lg:hidden"
        aria-label="Open navigation"
      >
        <Menu className="h-5 w-5" />
      </button>

      <h1 className="truncate text-[15px] font-semibold tracking-[-0.01em] text-ink">
        {title}
      </h1>

      <div className="ml-auto flex items-center gap-2">
        <div className="hidden items-center gap-2 rounded-lg border border-line bg-soft px-3 py-1.5 text-[13px] text-slate-400 md:flex">
          <Search className="h-3.5 w-3.5" />
          <span className="pr-6">Search workspace…</span>
          <kbd className="rounded border border-line bg-white px-1.5 text-[10px] font-semibold text-slate-400">
            ⌘K
          </kbd>
        </div>
        <button
          className="relative rounded-lg p-2 text-slate-500 transition-colors hover:bg-soft hover:text-ink"
          aria-label="Notifications"
        >
          <Bell className="h-[18px] w-[18px]" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full border-2 border-white bg-accent" />
        </button>
        <span className="mx-1 hidden h-5 w-px bg-line sm:block" />
        <button className="flex items-center gap-2.5 rounded-lg px-1.5 py-1.5 transition-colors hover:bg-soft">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-[11.5px] font-bold text-white">
            {initials}
          </span>
          <span className="hidden text-[13.5px] font-medium text-ink sm:block">
            {userName}
          </span>
        </button>
      </div>
    </header>
  );
}
