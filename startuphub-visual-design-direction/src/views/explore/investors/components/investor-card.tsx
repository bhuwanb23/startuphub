import { ArrowUpRight, Globe2, Wallet } from "lucide-react";
import Link from "next/link";
import type { Investor } from "@/views/explore/investors/constants/investors";

export default function InvestorCard({ inv }: { inv: Investor }) {
  return (
    <Link
      href="/register"
      className="group flex h-full flex-col rounded-2xl border border-line bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_20px_44px_-24px_rgba(11,18,32,0.22)]"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3.5">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-accent-soft text-[15px] font-bold text-accent">
            {inv.initials}
          </span>
          <div>
            <h3 className="text-[16.5px] font-semibold tracking-tight text-ink">{inv.name}</h3>
            <p className="mt-0.5 text-[12.5px] font-medium text-accent">{inv.type}</p>
          </div>
        </div>
        <span className="shrink-0 rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-500">
          {inv.portfolio} investments
        </span>
      </div>

      <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-500">{inv.desc}</p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {inv.stages.map((s) => (
          <span key={s} className="rounded-md bg-accent-soft px-2 py-1 text-[11px] font-semibold text-accent">
            {s}
          </span>
        ))}
        {inv.sectors.slice(0, 3).map((s) => (
          <span key={s} className="rounded-md bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-500">
            {s}
          </span>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2.5 border-t border-line pt-4 text-[12.5px]">
        <span className="flex items-center gap-1.5 text-slate-500">
          <Globe2 className="h-3.5 w-3.5 text-slate-400" />
          {inv.geography}
        </span>
        <span className="flex items-center justify-end gap-1.5 font-semibold text-ink">
          <Wallet className="h-3.5 w-3.5 text-slate-400" />
          {inv.ticket}
        </span>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <span className="text-[12px] font-medium text-slate-400 group-hover:text-accent">
          Pitch via StartupHub
        </span>
        <span className="grid h-8 w-8 place-items-center rounded-full border border-line text-slate-400 transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-white">
          <ArrowUpRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </Link>
  );
}
