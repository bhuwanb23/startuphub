import { ArrowUpRight, MapPin } from "lucide-react";
import Link from "next/link";
import { Badge, Card, PageHeader } from "@/components/app/widgets";
import { incubators } from "@/views/explore/incubators/constants/incubators";

const fitBySlug: Record<string, number> = {
  "startuphub-labs": 98,
  "cied-pune": 84,
  "t-hub-health": 52,
  "mnit-innovation-hub": 61,
  "kerala-startup-mission": 69,
  "ciie-space": 47,
};

export function IncubatorDiscover() {
  const sorted = [...incubators].sort((a, b) => (fitBySlug[b.slug] ?? 50) - (fitBySlug[a.slug] ?? 50));
  return (
    <div>
      <PageHeader
        title="Discover Incubators"
        desc="Programs matched to your stage, sector and stated goals — ranked by AI fit."
        actions={<Link href="/founder/incubation" className="rounded-[10px] border border-line bg-white px-4 py-2.5 text-[13px] font-semibold text-ink hover:border-slate-300">My applications</Link>}
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {sorted.map((inc) => {
          const fit = fitBySlug[inc.slug] ?? 50;
          return (
            <Card key={inc.slug} className="transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_32px_-18px_rgba(11,18,32,0.2)]">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent-soft text-[12px] font-bold text-accent">
                    {inc.initials}
                  </span>
                  <div>
                    <p className="text-[14px] font-semibold text-ink">{inc.name}</p>
                    <p className="mt-0.5 flex items-center gap-1 text-[11px] text-slate-400">
                      <MapPin className="h-3 w-3" /> {inc.location}
                    </p>
                  </div>
                </div>
                <Badge tone={fit > 80 ? "accent" : "default"}>{fit}% fit</Badge>
              </div>
              <p className="mt-3 line-clamp-2 flex-1 text-[12.5px] leading-relaxed text-slate-500">{inc.desc}</p>
              <div className="mt-4 grid grid-cols-3 divide-x divide-line rounded-lg border border-line text-center">
                {[["Programs", inc.programs], ["Startups", inc.startups], ["Mentors", inc.mentors]].map(([l, v]) => (
                  <div key={l} className="py-2">
                    <span className="block text-[12px] font-bold tabular-nums text-ink">{v}</span>
                    <span className="block text-[9.5px] text-slate-400">{l}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 flex items-center justify-between border-t border-line pt-3">
                <span className="text-[11px] font-medium text-slate-400">{inc.application}</span>
                <button className="flex items-center gap-1 text-[12px] font-semibold text-accent hover:underline">
                  Apply <ArrowUpRight className="h-3 w-3" />
                </button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
