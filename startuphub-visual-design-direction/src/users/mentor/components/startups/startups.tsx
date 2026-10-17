"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Badge, Card, PageHeader } from "@/components/app/widgets";
import { startups } from "@/views/explore/startups/constants/startups";
import { cn } from "@/lib/utils";

const fitBySlug: Record<string, number> = {
  finedge: 96,
  "lumen-ai": 88,
  orbitalworks: 85,
  terragrid: 81,
  medsync: 62,
  skyline: 58,
  edufold: 55,
  aquapure: 48,
};

export function MentorStartupDiscovery() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = [...startups].sort((a, b) => (fitBySlug[b.slug] ?? 50) - (fitBySlug[a.slug] ?? 50));
    if (!q) return list;
    return list.filter((s) => [s.name, s.sector, s.location, s.oneLiner, ...s.tags].join(" ").toLowerCase().includes(q));
  }, [query]);

  return (
    <div>
      <PageHeader title="Startup Discovery" desc="Startups in the network — ranked by fit with your expertise bench." />
      <div className="mb-5 relative max-w-md">
        <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by problem, sector, city…"
          className="h-11 w-full rounded-[10px] border border-line bg-white pl-10 pr-4 text-sm text-ink placeholder:text-slate-400 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/15"
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((s) => {
          const fit = fitBySlug[s.slug] ?? 50;
          const mentored = ["lumen-ai", "orbitalworks"].includes(s.slug);
          return (
            <Card key={s.slug} className={cn("flex flex-col transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_32px_-18px_rgba(11,18,32,0.2)]", mentored && "border-accent/30")}>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent-soft text-[12px] font-bold text-accent">{s.initials}</span>
                  <div>
                    <p className="text-[14px] font-semibold text-ink">{s.name}</p>
                    <p className="text-[11px] text-slate-400">{s.sector} · {s.stage}</p>
                  </div>
                </div>
                <Badge tone={fit > 80 ? "accent" : "default"}>{fit}% fit</Badge>
              </div>
              <p className="mt-3 line-clamp-2 flex-1 text-[12.5px] leading-relaxed text-slate-500">{s.oneLiner}</p>
              {mentored && <Badge tone="good">Your mentee</Badge>}
              <div className="mt-4 flex gap-2 border-t border-line pt-4">
                <button className={cn("flex-1 rounded-lg py-2 text-[12px] font-semibold", mentored ? "border border-line text-ink hover:border-slate-300" : "bg-accent text-white hover:bg-accent-deep")}>
                  {mentored ? "Open profile" : "Request intro"}
                </button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
