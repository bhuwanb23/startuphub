import { ArrowUpRight, Lightbulb, Search } from "lucide-react";
import { Badge, Card, PageHeader, Progress } from "@/components/app/widgets";

const discovery = [
  { client: "Lumen AI", asset: "Drone-edge preprocessing pipeline", type: "Patent opportunity", status: "Search clear — ready to file", value: "High", tone: "good" as const },
  { client: "Lumen AI", asset: "“Field Alert” product name", type: "Trademark gap", status: "Launch in 9 days — unfiled", value: "Critical", tone: "bad" as const },
  { client: "FinEdge", asset: "Cash-flow entropy credit scoring", type: "Patent opportunity", status: "Novelty read positive", value: "High", tone: "good" as const },
  { client: "MedSync", asset: "Consent-scoped record exchange", type: "Patent (filed)", status: "Claims can broaden at FER", value: "Medium", tone: "accent" as const },
  { client: "EduFold", asset: "Adaptive vernacular pathing", type: "Patent opportunity", status: "Needs prior-art search first", value: "Medium", tone: "accent" as const },
  { client: "BloomBio", asset: "Assay validation pipeline", type: "Trade secret candidate", status: "Better protected as secret than patent", value: "Medium", tone: "warn" as const },
];

export function IpDiscovery() {
  return (
    <div className="space-y-5">
      <PageHeader
        title="IP Discovery"
        desc="Where protectable value sits across your clients — opportunities, gaps and what's already covered."
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {discovery.map((d) => (
          <Card key={d.asset} className="flex flex-col transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_32px_-18px_rgba(11,18,32,0.2)]">
            <div className="flex items-start justify-between">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent-soft text-accent">
                <Lightbulb className="h-4.5 w-4.5" />
              </span>
              <Badge tone={d.tone === "bad" ? "bad" : d.tone === "good" ? "good" : d.tone === "warn" ? "warn" : "accent"}>{d.value}</Badge>
            </div>
            <p className="mt-4 text-[14px] font-semibold leading-snug text-ink">{d.asset}</p>
            <p className="mt-1 text-[11.5px] font-medium text-accent">{d.client} · {d.type}</p>
            <p className="mt-2 flex-1 text-[12.5px] leading-relaxed text-slate-500">{d.status}</p>
            <button className="mt-4 w-full rounded-lg border border-line py-2 text-[12px] font-semibold text-ink transition-colors hover:border-accent hover:text-accent">
              {d.type.includes("gap") ? "File now" : "Open assessment"}
            </button>
          </Card>
        ))}
      </div>
    </div>
  );
}

const assessments = [
  { client: "OrbitalWorks", asset: "GroundEdge Stream", strength: 91, ownership: 100, protection: 88, commercial: 84, risk: 12 },
  { client: "Lumen AI", asset: "Crop-stress inference", strength: 78, ownership: 100, protection: 64, commercial: 82, risk: 34 },
  { client: "MedSync", asset: "Consent Mesh", strength: 74, ownership: 85, protection: 70, commercial: 76, risk: 28 },
  { client: "BloomBio", asset: "Assay pipeline", strength: 38, ownership: 60, protection: 20, commercial: 55, risk: 68 },
];

export function IpAssessment() {
  return (
    <div className="space-y-5">
      <PageHeader title="IP Assessment" desc="Strength, ownership, protection, commercial potential and risk — scored per asset." />
      <Card title="Assessment dashboard" pad={false}>
        <ul className="divide-y divide-line">
          {assessments.map((a) => (
            <li key={a.asset} className="px-5 py-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[14px] font-semibold text-ink">{a.asset}</p>
                  <p className="text-[11.5px] text-slate-400">{a.client}</p>
                </div>
                <Badge tone={a.strength > 80 ? "good" : a.strength > 60 ? "accent" : "warn"}>Strength {a.strength}</Badge>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-5">
                {([
                  ["Strength", a.strength],
                  ["Ownership", a.ownership],
                  ["Protection", a.protection],
                  ["Commercial", a.commercial],
                  ["Risk", a.risk],
                ] as [string, number][]).map(([d, v]) => (
                  <div key={d} className="rounded-lg bg-slate-50 p-3">
                    <div className="flex items-baseline justify-between text-[11.5px]">
                      <span className="font-medium text-slate-500">{d}</span>
                      <span className="font-semibold tabular-nums text-ink">{v}</span>
                    </div>
                    <Progress value={d === "Risk" ? 100 - v : v} tone={d === "Risk" ? (v > 50 ? "bad" : "good") : v < 60 ? "warn" : "accent"} className="mt-2" />
                  </div>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}

const priorArt = [
  { ref: "US 11,248,102 B2", title: "Multispectral vegetation stress detection", overlap: 78, note: "Different sensor band; claims can carve per-acre attribution" },
  { ref: "IN 202141025678", title: "Crop yield estimation using satellite imagery", overlap: 64, note: "Yield attribution is your novel step — emphasize" },
  { ref: "EP 3,841,205", title: "Edge preprocessing for agricultural drones", overlap: 52, note: "Drone-specific; satellite path unaffected" },
  { ref: "JP 2019-118422", title: "Water-stress index computation", overlap: 41, note: "Index formula differs; cite as improvement" },
];

export function PriorArtSearch() {
  return (
    <div className="space-y-5">
      <PageHeader
        title="Prior-Art Search"
        desc="Every search run, every reference found, every overlap read — the diligence behind the filing."
        actions={<button className="inline-flex items-center gap-1.5 rounded-[10px] bg-accent px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-accent-deep"><Search className="h-3.5 w-3.5" /> New search</button>}
      />
      <Card title="Search: “multispectral crop stress inference” — Lumen AI" action={<Badge tone="good">Delivered in 68 hrs</Badge>} pad={false}>
        <div className="border-b border-line bg-slate-50 px-5 py-3.5">
          <p className="text-[12px] text-slate-500">
            <span className="font-semibold text-ink">Conclusion:</span> patentable with narrowed claims. Novel step is per-acre yield attribution, not stress detection itself. 4 closest references:
          </p>
        </div>
        <ul className="divide-y divide-line">
          {priorArt.map((p) => (
            <li key={p.ref} className="flex items-start gap-4 px-5 py-4">
              <span className="w-12 shrink-0 rounded-full bg-amber-50 py-1.5 text-center text-[11px] font-bold text-amber-600">{p.overlap}%</span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline gap-2">
                  <p className="text-[12px] font-bold tabular-nums text-slate-400">{p.ref}</p>
                  <p className="text-[13.5px] font-semibold text-ink">{p.title}</p>
                </div>
                <p className="mt-1 text-[12px] leading-snug text-slate-500">{p.note}</p>
              </div>
              <ArrowUpRight className="mt-1 h-3.5 w-3.5 shrink-0 text-slate-300" />
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
