import { ArrowUpRight, MapPin } from "lucide-react";
import Link from "next/link";
import type { Startup } from "@/views/explore/startups/constants/startups";

export default function StartupCard({ s }: { s: Startup }) {
  return (
    <Link
      href={`/explore/startups/${s.slug}`}
      className="group flex h-full flex-col rounded-2xl border border-line bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_20px_44px_-24px_rgba(11,18,32,0.22)]"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3.5">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-accent-soft text-[15px] font-bold text-accent">
            {s.initials}
          </span>
          <div>
            <h3 className="text-[16.5px] font-semibold tracking-tight text-ink">{s.name}</h3>
            <p className="mt-0.5 text-[12.5px] font-medium text-accent">{s.sector}</p>
          </div>
        </div>
        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-500">
          {s.fundingStage}
        </span>
      </div>

      <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-500">{s.oneLiner}</p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {s.tags.slice(0, 3).map((t) => (
          <span key={t} className="rounded-md bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-500">
            {t}
          </span>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
        <span className="flex items-center gap-3 text-[12px] text-slate-400">
          <span className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />
            {s.location}
          </span>
          <span>·</span>
          <span>{s.stage} stage</span>
        </span>
        <span className="grid h-8 w-8 place-items-center rounded-full border border-line text-slate-400 transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-white">
          <ArrowUpRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </Link>
  );
}
