"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight, Search } from "lucide-react";
import Link from "next/link";
import { Badge, Card, PageHeader, Progress } from "@/components/app/widgets";
import { cn } from "@/lib/utils";

const portfolio = [
  { slug: "lumen-ai", name: "Lumen AI", sector: "AgriTech", stage: "Series A", health: 84, readiness: 78, mentor: "Priya Nair", cohort: "VI", risk: "Low" },
  { slug: "aquapure", name: "AquaPure", sector: "CleanTech", stage: "Seed", health: 88, readiness: 81, mentor: "Sunita D.", cohort: "VI", risk: "Low" },
  { slug: "terragrid", name: "TerraGrid", sector: "ClimateTech", stage: "Seed", health: 72, readiness: 66, mentor: "Vikram Rao", cohort: "V", risk: "Medium" },
  { slug: "finedge", name: "FinEdge", sector: "FinTech", stage: "Pre-seed", health: 68, readiness: 61, mentor: "Karan Chadha", cohort: "VII", risk: "Medium" },
  { slug: "orbitalworks", name: "OrbitalWorks", sector: "SpaceTech", stage: "Seed", health: 81, readiness: 74, mentor: "Priya Nair", cohort: "VI", risk: "Low" },
  { slug: "freshchain", name: "FreshChain", sector: "AgriTech", stage: "Pre-seed", health: 41, readiness: 38, mentor: "Vikram Rao", cohort: "VII", risk: "High" },
  { slug: "gridsense", name: "GridSense", sector: "Energy", stage: "Seed", health: 44, readiness: 51, mentor: "Arjun Bedekar", cohort: "V", risk: "High" },
  { slug: "medsync", name: "MedSync", sector: "HealthTech", stage: "Series A", health: 82, readiness: 79, mentor: "Sunita D.", cohort: "IV", risk: "Low" },
  { slug: "edufold", name: "EduFold", sector: "EdTech", stage: "Pre-seed", health: 71, readiness: 64, mentor: "Karan Chadha", cohort: "VII", risk: "Low" },
];

const riskTone = { Low: "good", Medium: "warn", High: "bad" } as const;

export function Startups() {
  const [query, setQuery] = useState("");
  const [filt, setFilt] = useState("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return portfolio.filter((s) => {
      if (filt === "At-risk" && s.risk === "Low") return false;
      if (filt !== "All" && filt !== "At-risk" && s.stage !== filt) return false;
      if (!q) return true;
      return [s.name, s.sector, s.mentor].join(" ").toLowerCase().includes(q);
    });
  }, [query, filt]);

  return (
    <div>
      <PageHeader
        title="Startup Portfolio"
        desc="240 startups across 12 programs — filter, inspect and jump to any startup's full profile."
        actions={<button className="rounded-[10px] bg-accent px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-accent-deep">Add startup</button>}
      />

      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1 sm:max-w-sm">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name, sector, mentor…"
            className="h-11 w-full rounded-[10px] border border-line bg-white pl-10 pr-4 text-sm text-ink placeholder:text-slate-400 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/15"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {["All", "Pre-seed", "Seed", "Series A", "At-risk"].map((f) => (
            <button
              key={f}
              onClick={() => setFilt(f)}
              className={cn(
                "rounded-full border px-3.5 py-2 text-[12.5px] font-medium transition-all",
                filt === f ? "border-accent bg-accent text-white" : "border-line bg-white text-slate-600 hover:border-slate-300"
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((s) => (
          <Card key={s.slug} className="transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_32px_-18px_rgba(11,18,32,0.2)]">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent-soft text-[12px] font-bold text-accent">
                  {s.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                </span>
                <div>
                  <p className="text-[14.5px] font-semibold text-ink">{s.name}</p>
                  <p className="text-[11px] text-slate-400">Cohort {s.cohort} · {s.sector}</p>
                </div>
              </div>
              <Badge tone={riskTone[s.risk as keyof typeof riskTone]}>{s.risk}</Badge>
            </div>
            <div className="mt-4 space-y-3">
              {(
                [
                  ["Health", s.health],
                  ["Readiness", s.readiness],
                ] as [string, number][]
              ).map(([l, v]) => (
                <div key={l} className="flex items-center gap-3">
                  <span className="w-16 text-[11.5px] text-slate-500">{l}</span>
                  <Progress value={v} tone={v < 50 ? "bad" : v < 70 ? "warn" : "accent"} className="flex-1" />
                  <span className="w-7 text-right text-[12px] font-semibold tabular-nums text-ink">{v}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-line pt-3.5">
              <span className="text-[11.5px] text-slate-400">{s.stage} · mentor {s.mentor}</span>
              <Link href={`/explore/startups/${s.slug}`} className="flex items-center gap-1 text-[12px] font-semibold text-accent hover:underline">
                Profile <ArrowUpRight className="h-3 w-3" />
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
