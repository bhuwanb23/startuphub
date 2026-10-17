import { ArrowUpRight, MapPin } from "lucide-react";
import Link from "next/link";
import type { Mentor } from "@/views/explore/mentors/constants/mentors";
import { cn } from "@/lib/utils";

export default function MentorCard({ m }: { m: Mentor }) {
  const waitlist = m.availability === "Waitlist";
  return (
    <Link
      href="/register"
      className="group flex h-full flex-col rounded-2xl border border-line bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_20px_44px_-24px_rgba(11,18,32,0.22)]"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3.5">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-accent-soft text-[15px] font-bold text-accent">
            {m.name.split(" ").map((w) => w[0]).join("").slice(0, 2).replace("DM", "MK")}
          </span>
          <div>
            <h3 className="text-[16px] font-semibold tracking-tight text-ink">{m.name}</h3>
            <p className="mt-0.5 text-[12.5px] text-slate-400">{m.role}</p>
          </div>
        </div>
        <span
          className={cn(
            "shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold",
            waitlist ? "bg-slate-100 text-slate-500" : "bg-emerald-50 text-emerald-600"
          )}
        >
          {m.availability}
        </span>
      </div>

      <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-500">{m.bio}</p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {m.expertise.map((e) => (
          <span key={e} className="rounded-md bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-500">
            {e}
          </span>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-line pt-4 text-[12px] text-slate-400">
        <span className="flex items-center gap-1">
          <MapPin className="h-3.5 w-3.5" />
          {m.location}
        </span>
        <span>{m.experience} exp</span>
        <span className="font-semibold text-ink">{m.sessions} sessions</span>
        <span className="grid h-8 w-8 place-items-center rounded-full border border-line text-slate-400 transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-white">
          <ArrowUpRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </Link>
  );
}
