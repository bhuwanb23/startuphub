"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Badge, Card, PageHeader, Progress } from "@/components/app/widgets";
import { cn } from "@/lib/utils";

const clients = [
  { name: "Lumen AI", sector: "AgriTech", assets: 3, filings: 1, health: 82, engagement: "Retainer · 6 mo", next: "Claims v3 · Apr 09" },
  { name: "OrbitalWorks", sector: "SpaceTech", assets: 3, filings: 1, health: 91, engagement: "Retainer · 5 mo", next: "PCT US entry · Apr 22" },
  { name: "MedSync", sector: "HealthTech", assets: 2, filings: 1, health: 68, engagement: "Per-filing", next: "TM class 9 · Apr 14" },
  { name: "AquaPure", sector: "CleanTech", assets: 2, filings: 0, health: 74, engagement: "Per-filing", next: "Design reg. · Apr 18" },
  { name: "TerraGrid", sector: "ClimateTech", assets: 1, filings: 1, health: 88, engagement: "Retainer · 3 mo", next: "FER response · Jun 02" },
  { name: "BloomBio", sector: "BioTech", assets: 0, filings: 0, health: 40, engagement: "Onboarding", next: "IP assessment · Apr 16" },
];

export function ClientManagement() {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? clients.filter((c) => [c.name, c.sector, c.engagement].join(" ").toLowerCase().includes(q)) : clients;
  }, [query]);

  return (
    <div>
      <PageHeader title="Client Management" desc="Every client, their IP portfolio health and the next action you owe them." />
      <div className="mb-5 relative max-w-md">
        <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search clients, sectors…"
          className="h-11 w-full rounded-[10px] border border-line bg-white pl-10 pr-4 text-sm text-ink placeholder:text-slate-400 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/15"
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((c) => (
          <Card key={c.name} className="flex flex-col transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_32px_-18px_rgba(11,18,32,0.2)]">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent-soft text-[12px] font-bold text-accent">{c.name.slice(0, 2).toUpperCase()}</span>
                <div>
                  <p className="text-[14px] font-semibold text-ink">{c.name}</p>
                  <p className="text-[11px] text-slate-400">{c.sector} · {c.engagement}</p>
                </div>
              </div>
              <Badge tone={c.health > 80 ? "good" : c.health > 60 ? "accent" : "warn"}>{c.health}</Badge>
            </div>
            <div className="mt-4 grid grid-cols-2 divide-x divide-line rounded-xl border border-line text-center">
              <div className="py-2.5">
                <span className="block text-[14px] font-bold text-ink tabular-nums">{c.assets}</span>
                <span className="block text-[10px] text-slate-400">IP assets</span>
              </div>
              <div className="py-2.5">
                <span className="block text-[14px] font-bold text-ink tabular-nums">{c.filings}</span>
                <span className="block text-[10px] text-slate-400">In filing</span>
              </div>
            </div>
            <Progress value={c.health} tone={c.health > 80 ? "good" : c.health > 60 ? "accent" : "warn"} className="mt-4" />
            <p className="mt-3 flex-1 text-[11.5px] text-slate-500">
              <span className="font-semibold text-accent">Next: </span>{c.next}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
}

const ipNeeds = [
  { slug: "finedge", name: "FinEdge", sector: "FinTech", stage: "Pre-seed", ip: "0 filings", need: "Cash-flow entropy scoring — patentability check", fit: 94 },
  { slug: "edufold", name: "EduFold", sector: "EdTech", stage: "Pre-seed", ip: "0 filings", need: "Trademark + adaptive-path method", fit: 81 },
  { slug: "medsync", name: "MedSync", sector: "HealthTech", stage: "Series A", ip: "2 filings", need: "Class 9 trademark gap", fit: 88 },
  { slug: "skyline-logistics", name: "Skyline", sector: "Logistics", stage: "Series B", ip: "1 mark", need: "Renewal budget + brand audit", fit: 62 },
];

export function StartupDiscovery() {
  return (
    <div>
      <PageHeader title="Startup Discovery" desc="Startups whose technology or brand needs protection — ranked by fit with your practice." />
      <div className="grid gap-4 md:grid-cols-2">
        {ipNeeds.map((s) => (
          <Card key={s.slug} className="flex flex-col">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent-soft text-[12px] font-bold text-accent">{s.name.slice(0, 2).toUpperCase()}</span>
                <div>
                  <p className="text-[14px] font-semibold text-ink">{s.name}</p>
                  <p className="text-[11px] text-slate-400">{s.sector} · {s.stage} · {s.ip}</p>
                </div>
              </div>
              <Badge tone={s.fit > 80 ? "accent" : "default"}>{s.fit}% fit</Badge>
            </div>
            <p className="mt-3 flex-1 text-[12.5px] leading-relaxed text-slate-500">
              <span className="font-semibold text-ink">IP need: </span>{s.need}
            </p>
            <div className="mt-4 flex gap-2 border-t border-line pt-4">
              <button className="flex-1 rounded-lg bg-accent py-2 text-[12px] font-semibold text-white hover:bg-accent-deep">Offer consultation</button>
              <button className="rounded-lg border border-line px-3.5 py-2 text-[12px] font-semibold text-ink hover:border-slate-300">Profile</button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

const requests = [
  { client: "BloomBio", type: "IP Assessment", ask: "Full assessment of our assay pipeline — what's protectable before our pilot?", age: "1 day", match: 92, tone: "accent" as const },
  { client: "FinEdge", type: "Patentability", ask: "Is our cash-flow entropy scoring method patentable in IN and US?", age: "3 days", match: 94, tone: "accent" as const },
  { client: "MedData Labs", type: "Prior-Art", ask: "Prior-art search on HL7-based record exchange with consent scoping.", age: "4 days", match: 78, tone: "warn" as const },
  { client: "QuantumLeaf", type: "FTO Opinion", ask: "Freedom-to-operate on our phenotyping rig vs. existing JP filings.", age: "5 days", match: 71, tone: "warn" as const },
];

export function ClientRequests() {
  return (
    <div className="space-y-5">
      <PageHeader title="Client Requests" desc="Assessment, search and consultation asks waiting on your desk." />
      <Card title={`New requests (${requests.length})`} pad={false}>
        <ul className="divide-y divide-line">
          {requests.map((r) => (
            <li key={r.client} className="px-5 py-5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3.5">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent-soft text-[12px] font-bold text-accent">{r.client.slice(0, 2).toUpperCase()}</span>
                  <div>
                    <p className="text-[15px] font-semibold text-ink">{r.client}</p>
                    <p className="text-[11.5px] text-slate-400">{r.type} · waiting {r.age}</p>
                  </div>
                </div>
                <span className={cn("rounded-full px-2.5 py-1 text-[11px] font-bold", r.match > 80 ? "bg-accent-soft text-accent" : "bg-amber-50 text-amber-600")}>
                  {r.match}% fit
                </span>
              </div>
              <blockquote className="mt-3 rounded-xl bg-accent-mist p-4 text-[13px] leading-relaxed text-slate-600">“{r.ask}”</blockquote>
              <div className="mt-3.5 flex gap-2">
                <button className="flex-1 rounded-lg bg-accent py-2.5 text-[12.5px] font-semibold text-white hover:bg-accent-deep">Accept — begin work</button>
                <button className="rounded-lg border border-line px-4 py-2.5 text-[12.5px] font-semibold text-ink hover:border-slate-300">Clarify scope</button>
                <button className="rounded-lg border border-line px-4 py-2.5 text-[12.5px] font-semibold text-slate-400 hover:border-slate-300">Decline</button>
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
