import { ArrowUpRight, MapPin } from "lucide-react";
import Link from "next/link";
import type { Incubator } from "@/views/explore/incubators/constants/incubators";
import { cn } from "@/lib/utils";

export default function IncubatorCard({ inc }: { inc: Incubator }) {
  return (
    <Link
      href="/register"
      className="group flex h-full flex-col rounded-2xl border border-line bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_20px_44px_-24px_rgba(11,18,32,0.22)]"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3.5">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-accent-soft text-[15px] font-bold text-accent">
            {inc.initials}
          </span>
          <div>
            <h3 className="text-[16.5px] font-semibold tracking-tight text-ink">{inc.name}</h3>
            <p className="mt-0.5 flex items-center gap-1 text-[12.5px] text-slate-400">
              <MapPin className="h-3 w-3" />
              {inc.location} · est. {inc.founded}
            </p>
          </div>
        </div>
        <span
          className={cn(
            "shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold",
            inc.application === "Opens Apr 2026"
              ? "bg-slate-100 text-slate-500"
              : "bg-emerald-50 text-emerald-600"
          )}
        >
          {inc.application}
        </span>
      </div>

      <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-500">{inc.desc}</p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {inc.domains.map((d) => (
          <span key={d} className="rounded-md bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-500">
            {d}
          </span>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-3 divide-x divide-line rounded-xl border border-line">
        {[
          { v: inc.programs, l: "Programs" },
          { v: inc.startups, l: "Startups" },
          { v: inc.mentors, l: "Mentors" },
        ].map((m) => (
          <div key={m.l} className="px-3 py-2.5 text-center">
            <span className="block text-[15px] font-semibold text-ink tabular-nums">{m.v}</span>
            <span className="block text-[10.5px] text-slate-400">{m.l}</span>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-line pt-4">
        <span className="truncate text-[12px] text-slate-400">
          {inc.facilities.join(" · ")}
        </span>
        <span className="ml-3 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line text-slate-400 transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-white">
          <ArrowUpRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </Link>
  );
}
