import { ArrowUpRight } from "lucide-react";
import { Badge, Card, PageHeader, Progress } from "@/components/app/widgets";

const fundingSupport = [
  { startup: "TerraGrid", status: "Closed ₹2.1 Cr", next: "Follow-on prep · Q3", tone: "good" as const, readiness: 66 },
  { startup: "FinEdge", status: "Raising ₹1.2 Cr seed", next: "2 investor intros pending", tone: "warn" as const, readiness: 61 },
  { startup: "Lumen AI", status: "₹2.4 Cr Series A closed", next: "Series B groundwork · Aug", tone: "good" as const, readiness: 78 },
  { startup: "FreshChain", status: "Emergency bridge needed", next: "Angels shortlist — 4 targets", tone: "bad" as const, readiness: 38 },
];

const iprSupport = [
  { startup: "OrbitalWorks", filings: 3, gaps: "None — exemplar", tone: "good" as const },
  { startup: "AquaPure", filings: 2, gaps: "Design filing pending", tone: "accent" as const },
  { startup: "FreshChain", filings: 0, gaps: "No IP strategy at all", tone: "bad" as const },
  { startup: "MedSync", filings: 2, gaps: "Trademark class 9 missing", tone: "warn" as const },
];

export function Support() {
  return (
    <div className="space-y-5">
      <PageHeader
        title="Startup Support"
        desc="Funding, IPR and market support — where you intervene and where you connect."
      />
      <div className="grid gap-5 lg:grid-cols-2">
        <Card title="Funding support" action={<Badge tone="warn">1 emergency</Badge>} pad={false}>
          <ul className="divide-y divide-line">
            {fundingSupport.map((f) => (
              <li key={f.startup} className="px-5 py-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[14px] font-semibold text-ink">{f.startup}</p>
                  <Badge tone={f.tone === "good" ? "good" : f.tone === "warn" ? "warn" : "bad"}>{f.status}</Badge>
                </div>
                <div className="mt-2 flex items-center gap-3">
                  <Progress value={f.readiness} tone={f.readiness < 50 ? "bad" : "accent"} className="flex-1" />
                  <span className="w-12 text-right text-[12px] font-semibold tabular-nums text-ink">{f.readiness}%</span>
                </div>
                <p className="mt-2 flex items-center gap-1.5 text-[12px] text-slate-500">
                  <ArrowUpRight className="h-3 w-3 text-accent" /> {f.next}
                </p>
              </li>
            ))}
          </ul>
        </Card>

        <Card title="IPR support" pad={false}>
          <ul className="divide-y divide-line">
            {iprSupport.map((i) => (
              <li key={i.startup} className="flex items-center gap-4 px-5 py-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent-soft text-[12px] font-bold text-accent">
                  {i.startup.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[13.5px] font-semibold text-ink">{i.startup}</p>
                  <p className="mt-0.5 text-[12px] text-slate-500">{i.gaps}</p>
                </div>
                <div className="text-right">
                  <span className="text-lg font-semibold tabular-nums text-ink">{i.filings}</span>
                  <p className="text-[10.5px] text-slate-400">filings</p>
                </div>
                <Badge tone={i.tone === "good" ? "good" : i.tone === "warn" ? "warn" : i.tone === "bad" ? "bad" : "accent"}>
                  {i.tone === "good" ? "Healthy" : i.tone === "bad" ? "Critical" : "In progress"}
                </Badge>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card title="Support capacity this quarter">
        <div className="grid gap-4 sm:grid-cols-4">
          {[
            ["Investor intros delivered", "34"],
            ["IPR sessions booked", "18"],
            ["Grant applications guided", "12"],
            ["Corporate intros made", "9"],
          ].map(([l, v]) => (
            <div key={l} className="rounded-xl border border-line p-5 text-center">
              <span className="text-[1.8rem] font-semibold tracking-tight text-ink tabular-nums">{v}</span>
              <p className="mt-1 text-[11.5px] font-medium leading-tight text-slate-500">{l}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
