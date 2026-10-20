"use client";

import { useRouter, usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { Logo } from "@/components/ui";
import { cn } from "@/lib/utils";

/* Every demo workspace in the platform — one entry per role workspace. */
const workspaces = [
  { name: "Ravi Sharma", role: "Founder / Startup", org: "Lumen AI", dashboard: "/founder" },
  { name: "Meera Iyer", role: "Incubator", org: "StartupHub Labs", dashboard: "/incubator" },
  { name: "Arjun Mehta", role: "Investor", org: "Meridian Angels", dashboard: "/investor" },
  { name: "Priya Nair", role: "Mentor / Expert", org: "ex-CTO, ZetaPay", dashboard: "/mentor" },
  { name: "Dr. Kavita Rao", role: "IPR Expert", org: "IPR Desk", dashboard: "/ipr-expert" },
  { name: "Vikram Sethi", role: "Corporate", org: "Arjuna Industries", dashboard: "/corporate" },
  { name: "Sunita Verma", role: "Government", org: "State Innovation Mission", dashboard: "/government" },
  { name: "Karan Malhotra", role: "Resource Provider", org: "Vertex Labs & Compute", dashboard: "/provider" },
];

export default function CompanySwitcher({
  currentName,
  currentRole,
  initials,
  /* The investor / corporate / government / provider shells pass their
     identity as org + role instead. Both spellings are accepted. */
  org,
  role,
}: {
  currentName?: string;
  currentRole?: string;
  initials: string;
  org?: string;
  role?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const name = currentName ?? org ?? "";
  const sub = currentRole ?? role ?? "";
  /* The workspace you are currently inside is the one whose route matches. */
  const activeDashboard = workspaces
    .map((w) => w.dashboard)
    .find((d) => pathname === d || pathname.startsWith(`${d}/`));

  return (
    <div className="mt-3">
      {/* logo row */}
      <a href="/" className="flex items-center gap-2 px-1.5 py-1" aria-label="Back to StartupHub home">
        <Logo className="h-6 w-6" />
        <span className="text-[15px] font-bold tracking-tight text-ink">
          Startup<span className="text-accent">Hub</span>
        </span>
      </a>

      {/* workspace selector */}
      <div className="group relative mt-2.5">
        <button className="flex w-full items-center gap-2.5 rounded-xl border border-line bg-white p-2.5 text-left transition-colors hover:border-slate-300 hover:bg-slate-50">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent text-[12px] font-bold text-white">
            {initials}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-[13.5px] font-semibold text-ink">{name}</span>
            <span className="block truncate text-[11px] text-slate-400">{sub}</span>
          </span>
          <ChevronDown className="h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 group-hover:rotate-180" />
        </button>

        {/* dropdown */}
        <div className="invisible absolute left-0 right-0 top-full z-40 pt-1.5 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100">
          <div className="rounded-xl border border-line bg-white p-1.5 shadow-[0_20px_48px_-20px_rgba(11,18,32,0.3)]">
            <p className="px-2.5 pb-1.5 pt-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-300">
              Demo workspaces
            </p>
            {workspaces.map((w) => {
              const isActive = activeDashboard === w.dashboard;
              return (
              <button
                key={`${w.dashboard}-${w.name}`}
                onClick={() => router.push(w.dashboard)}
                className={cn(
                  "flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left transition-colors",
                  isActive ? "bg-accent-mist" : "hover:bg-slate-50"
                )}
              >
                <span
                  className={cn(
                    "grid h-8 w-8 shrink-0 place-items-center rounded-lg text-[11px] font-bold",
                    isActive ? "bg-accent text-white" : "bg-accent-soft text-accent"
                  )}
                >
                  {w.name.split(" ").map((x) => x[0]).join("").slice(0, 2)}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[12.5px] font-semibold text-ink">{w.name}</span>
                  <span className="block truncate text-[10.5px] text-slate-400">{w.org}</span>
                </span>
                {isActive && <span className="h-1.5 w-1.5 rounded-full bg-accent" />}
              </button>
              );
            })}
            <a
              href="/login"
              className="mt-1 block rounded-lg border-t border-line px-2.5 py-2 text-center text-[11.5px] font-semibold text-accent hover:bg-accent-mist"
            >
              View all demo accounts
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
