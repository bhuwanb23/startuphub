import { ArrowUpRight } from "lucide-react";
import { Badge, Card, PageHeader, Progress } from "@/components/app/widgets";

const assigned = [
  { name: "Lumen AI", founder: "Ravi Sharma", since: "Oct 2025", sessions: 14, health: 84, focus: "GPU cost per acre", nextSession: "Today 16:00", tone: "good" as const, slug: "lumen-ai" },
  { name: "OrbitalWorks", founder: "Daniel Mathew", since: "Nov 2025", sessions: 11, health: 81, focus: "Ground-segment reliability", nextSession: "Today 18:30", tone: "good" as const, slug: "orbitalworks" },
  { name: "GridSense", founder: "Ishaan Verma", since: "Feb 2026", sessions: 6, health: 44, focus: "Runway + investor narrative", nextSession: "Apr 10", tone: "bad" as const, slug: "" },
  { name: "BloomBio", founder: "Tara Menon", since: "Mar 2026", sessions: 3, health: 62, focus: "Assay validation", nextSession: "Apr 15", tone: "warn" as const, slug: "" },
];

export function AssignedStartups() {
  return (
    <div className="space-y-5">
      <PageHeader title="Assigned Startups" desc="Your active engagements — sessions logged, health and the focus you're carrying." />
      <div className="grid gap-4 md:grid-cols-2">
        {assigned.map((s) => (
          <Card key={s.name} className="transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_32px_-18px_rgba(11,18,32,0.2)]">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent-soft text-[12px] font-bold text-accent">{s.name.slice(0, 2).toUpperCase()}</span>
                <div>
                  <p className="text-[14.5px] font-semibold text-ink">{s.name}</p>
                  <p className="text-[11px] text-slate-400">{s.founder} · since {s.since}</p>
                </div>
              </div>
              <Badge tone={s.tone === "good" ? "good" : s.tone === "warn" ? "warn" : "bad"}>{s.health}</Badge>
            </div>
            <div className="mt-4 grid grid-cols-3 divide-x divide-line rounded-xl border border-line text-center">
              {[
                ["Sessions", s.sessions],
                ["Next", s.nextSession],
                ["Focus", s.focus.split(" ")[0]],
              ].map(([l, v]) => (
                <div key={l} className="py-3">
                  <span className="block text-[12px] font-bold text-ink">{v}</span>
                  <span className="mt-0.5 block text-[9.5px] text-slate-400">{l}</span>
                </div>
              ))}
            </div>
            <Progress value={s.health} tone={s.health < 50 ? "bad" : s.health < 70 ? "warn" : "accent"} className="mt-4" />
            <div className="mt-4 flex items-center justify-between border-t border-line pt-3.5">
              <span className="truncate text-[11.5px] text-slate-400">Focus: {s.focus}</span>
              <span className="flex items-center gap-1 text-[12px] font-semibold text-accent">
                Open profile <ArrowUpRight className="h-3 w-3" />
              </span>
            </div>
          </Card>
        ))}
      </div>
      <Card title="Completed mentorships" action={<Badge>27 closed</Badge>}>
        <p className="text-[13.5px] leading-relaxed text-slate-500">
          27 engagements completed across 4 sectors. Highest-rated: ZetaStack infra rebuild (2024), PayU-scale team re-org (2024), and Lumen AI current run. Full history lives in{" "}
          <span className="font-semibold text-accent">Impact → Mentorship History</span>.
        </p>
      </Card>
    </div>
  );
}
