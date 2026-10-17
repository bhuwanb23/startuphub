import { Plus } from "lucide-react";
import { Badge, Card, PageHeader, Progress } from "@/components/app/widgets";

const inventory = [
  { name: "GPU cluster (32× A100)", pool: "Nimbus Cloud grant", used: 78, note: "AI block oversubscribed 1.4×", tone: "warn" as const },
  { name: "Wet lab benches × 6", pool: "CIED partnership", used: 46, note: "Underutilized — promote to bio cohort", tone: "default" as const },
  { name: "Electronics lab access", pool: "KSM shared infra", used: 62, note: "On plan", tone: "default" as const },
  { name: "Legal sessions / month", pool: "SH Legal Desk", used: 64, note: "3 unused slots this month", tone: "default" as const },
  { name: "Co-working seats", pool: "StartupHub Labs", used: 88, note: "Near capacity — review waitlist", tone: "warn" as const },
];

const requests = [
  { startup: "Lumen AI", item: "GPU hours for load test", qty: "$8.2K credit", status: "Approved", tone: "good" as const },
  { startup: "BloomBio (intake)", item: "Wet lab for assay validation", qty: "40 hrs", status: "Pending", tone: "warn" as const },
  { startup: "FinEdge", item: "ArcGIS seats × 2", qty: "2 seats", status: "Pending", tone: "warn" as const },
  { startup: "OrbitalWorks", item: "Vibration testing rig", qty: "12 hrs", status: "Approved", tone: "good" as const },
];

export function Resources() {
  return (
    <div className="space-y-5">
      <PageHeader
        title="Resources"
        desc="Everything your startups can draw from — inventory, requests, allocation and utilization."
        actions={<button className="inline-flex items-center gap-1.5 rounded-[10px] bg-accent px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-accent-deep"><Plus className="h-3.5 w-3.5" /> Allocate resource</button>}
      />

      <div className="grid gap-5 lg:grid-cols-[1.3fr_1fr]">
        <Card title="Resource inventory" pad={false}>
          <ul className="divide-y divide-line">
            {inventory.map((r) => (
              <li key={r.name} className="px-5 py-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[13.5px] font-semibold text-ink">{r.name}</p>
                  <Badge tone={r.tone === "warn" ? "warn" : "default"}>{r.used}% used</Badge>
                </div>
                <p className="mt-0.5 text-[11.5px] text-slate-400">{r.pool}</p>
                <Progress value={r.used} tone={r.tone === "warn" ? "warn" : "accent"} className="mt-2.5" />
                <p className="mt-1.5 text-[11px] text-slate-400">{r.note}</p>
              </li>
            ))}
          </ul>
        </Card>

        <div className="space-y-5">
          <Card title="Pending requests" action={<Badge tone="warn">{requests.filter((r) => r.status === "Pending").length} new</Badge>} pad={false}>
            <ul className="divide-y divide-line">
              {requests.map((r) => (
                <li key={r.item} className="px-5 py-3.5">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <p className="text-[13px] font-semibold text-ink">{r.item}</p>
                      <p className="mt-0.5 text-[11px] text-slate-400">{r.startup} · {r.qty}</p>
                    </div>
                    <Badge tone={r.tone === "good" ? "good" : "warn"}>{r.status}</Badge>
                  </div>
                </li>
              ))}
            </ul>
          </Card>

          <Card title="Utilization insight">
            <div className="rounded-xl bg-accent-mist p-4 text-[13px] leading-relaxed text-slate-600">
              <span className="font-semibold text-ink">Copilot:</span> converting 2 wet-lab bench-hours/day into 8 additional GPU hours would relieve the AI-block waitlist while keeping bio capacity. Net cost: ₹0 — same providers.
            </div>
            <button className="mt-4 w-full rounded-[10px] border border-line bg-white py-2.5 text-[12.5px] font-semibold text-ink hover:border-accent hover:text-accent">
              Apply rebalancing
            </button>
          </Card>
        </div>
      </div>
    </div>
  );
}
