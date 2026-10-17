import { ArrowUpRight, Plus } from "lucide-react";
import Link from "next/link";
import { Badge, Card, PageHeader, Progress } from "@/components/app/widgets";

const cohorts = [
  { slug: "cohort-vi", name: "Cohort VI", status: "Graduation sprint", startups: 14, health: 78, weeks: "Week 14 of 16", demo: "Apr 28", tone: "accent" as const },
  { name: "Cohort VII", slug: "", status: "Mid-program", startups: 12, health: 71, weeks: "Week 9 of 16", demo: "Aug 30", tone: "accent" as const },
  { name: "Sprint: AgriTech", slug: "", status: "Milestone week", startups: 8, health: 83, weeks: "Week 6 of 8", demo: "Jun 15", tone: "good" as const },
  { name: "Cohort V (alumni)", slug: "", status: "Graduated", startups: 16, health: 88, weeks: "Completed Jan 2026", demo: "—", tone: "default" as const },
];

export function Cohorts() {
  return (
    <div>
      <PageHeader
        title="Cohorts"
        desc="Batches of startups growing together — each with its own pulse, mentors and deadline."
        actions={<button className="inline-flex items-center gap-1.5 rounded-[10px] bg-accent px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-accent-deep"><Plus className="h-3.5 w-3.5" /> Create cohort</button>}
      />
      <div className="grid gap-4 md:grid-cols-2">
        {cohorts.map((c) => (
          <Card key={c.name} className="transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_32px_-18px_rgba(11,18,32,0.2)]">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold tracking-tight text-ink">{c.name}</h3>
                <p className="mt-1 text-[12.5px] text-slate-500">{c.status} · {c.weeks}</p>
              </div>
              <Badge tone={c.tone === "good" ? "good" : c.tone === "accent" ? "accent" : "default"}>
                {c.health} health
              </Badge>
            </div>
            <div className="mt-5 grid grid-cols-3 divide-x divide-line rounded-xl border border-line text-center">
              {[["Startups", c.startups], ["Demo Day", c.demo], ["Batches", "1"]].map(([l, v]) => (
                <div key={l} className="py-3">
                  <span className="block text-[14px] font-bold text-ink">{v}</span>
                  <span className="mt-0.5 block text-[10.5px] text-slate-400">{l}</span>
                </div>
              ))}
            </div>
            <Progress value={c.health} tone={c.health > 80 ? "good" : "accent"} className="mt-4" />
            <div className="mt-4 flex justify-between border-t border-line pt-4">
              <span className="text-[11.5px] text-slate-400">
                {c.status === "Graduated" ? "84% still active today" : "Open dashboard for full pulse"}
              </span>
              {c.slug ? (
                <Link href={`/incubator/cohorts/${c.slug}`} className="flex items-center gap-1 text-[12.5px] font-semibold text-accent">
                  Open cohort <ArrowUpRight className="h-3 w-3" />
                </Link>
              ) : (
                <span className="text-[12.5px] font-semibold text-slate-300">Open cohort</span>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
