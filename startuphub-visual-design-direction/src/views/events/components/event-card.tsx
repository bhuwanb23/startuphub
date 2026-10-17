import { ArrowUpRight, MapPin } from "lucide-react";
import Link from "next/link";
import type { StartupEvent } from "@/views/events/constants/events";
import { cn } from "@/lib/utils";

export default function EventCard({ e }: { e: StartupEvent }) {
  return (
    <Link
      href={`/events/${e.slug}`}
      className="group flex h-full flex-col rounded-2xl border border-line bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_20px_44px_-24px_rgba(11,18,32,0.22)]"
    >
      <div className="flex items-start gap-4">
        {/* date block */}
        <span className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl border border-line bg-accent-mist">
          <span className="text-lg font-bold leading-none text-accent">{e.day}</span>
          <span className="mt-1 text-[9.5px] font-semibold tracking-[0.14em] text-slate-400">{e.mon}</span>
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-accent-soft px-2 py-0.5 text-[10.5px] font-semibold uppercase tracking-[0.06em] text-accent">
              {e.type}
            </span>
            <span
              className={cn(
                "rounded-full px-2 py-0.5 text-[10.5px] font-medium",
                e.format === "Virtual" ? "bg-slate-100 text-slate-500" : "bg-emerald-50 text-emerald-600"
              )}
            >
              {e.format}
            </span>
          </div>
          <h3 className="mt-2 text-[16px] font-semibold leading-snug tracking-tight text-ink">
            {e.title}
          </h3>
        </div>
      </div>

      <p className="mt-4 line-clamp-2 flex-1 text-sm leading-relaxed text-slate-500">{e.overview}</p>

      <div className="mt-5 space-y-1.5 border-t border-line pt-4 text-[12.5px] text-slate-500">
        <p className="flex items-center gap-2">
          <MapPin className="h-3.5 w-3.5 shrink-0 text-slate-400" />
          <span className="truncate">{e.location}</span>
        </p>
        <p className="text-slate-400">{e.time}</p>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-[12.5px] font-semibold text-ink">{e.fee}</span>
        <span className="grid h-8 w-8 place-items-center rounded-full border border-line text-slate-400 transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-white">
          <ArrowUpRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </Link>
  );
}
