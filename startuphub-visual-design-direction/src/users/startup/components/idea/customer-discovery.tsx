import { Users, MapPin, Clipboard } from "lucide-react";
import { Badge, Card, Progress, Stat } from "@/components/app/widgets";

const discovery = {
  interviews: 47,
  segments: 3,
  validated: "Agri-businesses with 5K+ acre networks",
  rejected: "Individual smallholders (service cost too high)",
  total_addressable: "12K+ potential pilot farms",
};

const segments = [
  { name: "Large-scale Agri-farms", size: "5K+ acres", status: "Validated", tone: "good" as const },
  { name: "Cooperative farms", size: "500–2K acres", status: "Pilot", tone: "accent" as const },
  { name: "Smallholder farms", size: "<500 acres", status: "Rejected", tone: "bad" as const },
];

export function CustomerDiscovery() {
  return (
    <Card title="Customer discovery">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          <Stat icon={Users} label="Interviews conducted" value={String(discovery.interviews)} />
          <Stat icon={MapPin} label="Geographies covered" value={String(discovery.total_addressable)} />
          <Stat icon={Clipboard} label="Segments tested" value={String(discovery.segments)} />
        </div>

        <Card title="Validated segments" pad={false}>
          <ul className="divide-y divide-line">
            {segments.map((s) => (
              <li key={s.name} className="flex items-center gap-3 px-5 py-3.5">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent-soft text-[11px] font-bold text-accent">
                  {s.name.split(" ")[0]}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13.5px] font-semibold text-ink">{s.name}</p>
                  <p className="truncate text-[11.5px] text-slate-400">{s.status}</p>
                </div>
                <Badge tone={s.tone === "good" ? "good" : s.tone === "accent" ? "accent" : "bad"}>
                  {s.tone === "bad" ? "20 people" : s.tone === "accent" ? "3 pilots" : "Validated"}
                </Badge>
              </li>
            ))}
          </ul>
        </Card>

        <Card title="Rejected segment" pad={false}>
          <div className="p-4 bg-red-50/50 border border-red-100">
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-red-400">
              Rejected
            </p>
            <p className="mt-1 text-[12px] leading-relaxed text-slate-600">
              {discovery.rejected}
            </p>
          </div>
        </Card>
      </div>
    </Card>
  );
}