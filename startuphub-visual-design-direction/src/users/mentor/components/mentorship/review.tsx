import { Badge, Card, PageHeader, Progress } from "@/components/app/widgets";

const milestones = [
  { startup: "Lumen AI", milestone: "Cohort VI final demo", pct: 86, due: "Apr 28", status: "On track", comment: "Strong. Demo deck structure approved — needs cost-per-acre trend slide.", tone: "good" as const },
  { startup: "OrbitalWorks", milestone: "Ground station #10 reliable", pct: 55, due: "May 06", status: "On track", comment: "Mesh protocol v2 fixes station #7 root cause — approve scaling.", tone: "good" as const },
  { startup: "GridSense", milestone: "2-pilot retention push", pct: 20, due: "Apr 12", status: "At risk", comment: "Scope still too wide. Needs Friday check-in or I'll escalate.", tone: "bad" as const },
  { startup: "BloomBio", milestone: "Assay validation complete", pct: 58, due: "Apr 30", status: "Watch", comment: "Early for verdict — throughput logs needed first.", tone: "warn" as const },
];

const docs = [
  { startup: "Lumen AI", doc: "GPU Cost Analysis — Q1.xlsx", type: "Review", waiting: "2 days", status: "Pending" },
  { startup: "OrbitalWorks", doc: "Mesh Protocol v2 — Design.md", type: "Comment", waiting: "1 day", status: "Pending" },
  { startup: "GridSense", doc: "Bridge Deck v1.pdf", type: "Review+notes", waiting: "—", status: "New" },
  { startup: "BloomBio", doc: "Assay Protocol Draft.pdf", type: "Light scan", waiting: "3 days", status: "Pending" },
];

export function MilestoneReview() {
  return (
    <div className="space-y-5">
      <PageHeader title="Milestone Review" desc="Progress verified by you — the accountability founders actually want." />
      <Card title="Milestones under your watch" pad={false}>
        <ul className="divide-y divide-line">
          {milestones.map((m) => (
            <li key={m.milestone} className="px-5 py-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge tone="default">{m.startup}</Badge>
                    <p className="text-[13.5px] font-semibold text-ink">{m.milestone}</p>
                    <Badge tone={m.tone === "good" ? "good" : m.tone === "warn" ? "warn" : "bad"}>{m.status}</Badge>
                  </div>
                  <p className="mt-1 text-[11px] text-slate-400">Due {m.due}</p>
                </div>
                <div className="w-36 shrink-0">
                  <Progress value={m.pct} tone={m.tone === "bad" ? "bad" : m.tone === "warn" ? "warn" : "accent"} />
                  <p className="mt-1 text-right text-[10.5px] tabular-nums text-slate-400">{m.pct}%</p>
                </div>
              </div>
              <div className="mt-3 rounded-lg bg-slate-50 p-3 text-[12px] leading-relaxed text-slate-600">
                <span className="font-semibold text-accent">Your note:</span> {m.comment}
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}

export function DocumentReview() {
  return (
    <div className="space-y-5">
      <PageHeader title="Document Review" desc="Founders ship you decks, analyses and designs — comments land where they're read." />
      <Card title={`Documents awaiting you (${docs.filter((d) => d.status !== "Done").length})`} pad={false}>
        <ul className="divide-y divide-line">
          {docs.map((d) => (
            <li key={d.doc} className="flex items-center gap-4 px-5 py-4">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-accent-soft text-[11px] font-bold text-accent">{d.startup.slice(0, 2).toUpperCase()}</span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13.5px] font-semibold text-ink">{d.doc}</p>
                <p className="mt-0.5 text-[11px] text-slate-400">{d.startup} · {d.type} · waiting {d.waiting}</p>
              </div>
              <Badge tone={d.status === "New" ? "accent" : "warn"}>{d.status}</Badge>
              <button className="shrink-0 rounded-lg border border-line px-3.5 py-1.5 text-[12px] font-semibold text-ink transition-colors hover:border-accent hover:text-accent">
                Open
              </button>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
