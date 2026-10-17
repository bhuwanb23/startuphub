import { Badge, Card, PageHeader } from "@/components/app/widgets";

const lanes = [
  { name: "Now — Q2 2026", items: [["Field Alert v2", "ship"], ["Offline field mode", "dev"], ["Pilot 3 analytics pack", "dev"], ["Vernacular voice alerts", "qa"]], active: true },
  { name: "Next — Q3 2026", items: [["Cooperative white-label", "plan"], ["Weather-insurance hooks", "plan"], ["Public API v2", "plan"]], active: false },
  { name: "Later — Q4 2026", items: [["SEA localization", "idea"], ["Carbon-baseline module", "idea"], ["Mobile SDK", "idea"]], active: false },
];

const stateTone: Record<string, "good" | "accent" | "warn" | "default"> = {
  ship: "good", dev: "accent", qa: "warn", plan: "default", idea: "default",
};

export function ProductRoadmap() {
  return (
    <div className="space-y-5">
      <PageHeader title="Product Roadmap" desc="Now / Next / Later — with ruthless honesty about what's actually in progress." />
      <div className="grid gap-4 lg:grid-cols-3">
        {lanes.map((lane) => (
          <div key={lane.name} className={`rounded-2xl border p-4 ${lane.active ? "border-accent/30 bg-accent-mist/40" : "border-line bg-white/60"}`}>
            <div className="flex items-center gap-2 px-1 pb-3">
              <h3 className={`text-[13px] font-bold ${lane.active ? "text-accent" : "text-slate-400"}`}>{lane.name}</h3>
              {lane.active && <Badge tone="accent">Active</Badge>}
            </div>
            <div className="space-y-2.5">
              {lane.items.map(([item, state]) => (
                <div key={item} className="rounded-xl border border-line bg-white p-3.5 transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_24px_-14px_rgba(11,18,32,0.2)]">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-[13.5px] font-semibold leading-snug text-ink">{item}</p>
                    <Badge tone={stateTone[state]}>{state}</Badge>
                  </div>
                </div>
              ))}
              <button className="w-full rounded-xl border border-dashed border-line py-2.5 text-[12px] font-semibold text-slate-400 transition-colors hover:border-accent/40 hover:text-accent">
                + Add item
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
