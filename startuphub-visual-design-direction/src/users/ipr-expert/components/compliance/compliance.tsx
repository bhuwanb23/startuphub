import { CalendarClock, RefreshCw, ShieldAlert } from "lucide-react";
import { Badge, Card, PageHeader, Progress } from "@/components/app/widgets";

const deadlines = [
  { client: "Lumen AI", matter: "Complete-spec claims v3", due: "Apr 09", days: 2, severity: "Critical", tone: "bad" as const },
  { client: "MedSync", matter: "TM class 9 filing", due: "Apr 14", days: 7, severity: "High", tone: "warn" as const },
  { client: "AquaPure", matter: "Design response", due: "Apr 18", days: 11, severity: "Medium", tone: "default" as const },
  { client: "OrbitalWorks", matter: "PCT US entry", due: "Apr 22", days: 15, severity: "High", tone: "warn" as const },
  { client: "Skyline", matter: "Opposition evidence", due: "Apr 26", days: 19, severity: "Medium", tone: "default" as const },
  { client: "TerraGrid", matter: "FER response", due: "Jun 02", days: 56, severity: "Low", tone: "default" as const },
];

const renewals = [
  { client: "Skyline", item: "“Skyline” logo + word", due: "Nov 2026", cost: "₹18,000", status: "Budget now", tone: "warn" as const },
  { client: "Lumen AI", item: "Patent annuity (year 3)", due: "Dec 2026", cost: "₹24,000", status: "Auto-renew on", tone: "good" as const },
  { client: "MedSync", item: "“MedSync” wordmark (10-yr)", due: "Jan 2027", cost: "₹15,000", status: "Scheduled", tone: "good" as const },
  { client: "AquaPure", item: "Design renewal (year 5)", due: "Mar 2027", cost: "₹9,000", status: "Scheduled", tone: "good" as const },
];

const risks = [
  { client: "Lumen AI", risk: "“Field Alert” launching unfiled", type: "Filing risk", severity: "Critical", score: 91, mitigation: "File this week — ₹9K fixed fee" },
  { client: "MedSync", risk: "Contractor IP assignments missing ×2", type: "Ownership risk", severity: "High", score: 74, mitigation: "Assignments sent for signature" },
  { client: "BloomBio", risk: "No IP strategy at onboarding", type: "Portfolio risk", severity: "High", score: 68, mitigation: "Assessment booked Apr 16" },
  { client: "TerraGrid", risk: "Prior-art overlap in JP literature", type: "Prior-art risk", severity: "Medium", score: 44, mitigation: "Claims narrowed; FER drafted" },
  { client: "Skyline", risk: "Competitor mark in adjacent class", type: "Infringement risk", severity: "Medium", score: 52, mitigation: "C&D drafted — client decision Apr 12" },
  { client: "EduFold", risk: "Method possibly published pre-filing", type: "Disclosure risk", severity: "Low", score: 22, mitigation: "Search confirms no enabling disclosure" },
];

export function DeadlineManagement() {
  return (
    <div className="space-y-5">
      <PageHeader
        title="Deadline Management"
        desc="Filing, response, examination and opposition deadlines — the calendar that never forgives."
        actions={<button className="inline-flex items-center gap-1.5 rounded-[10px] border border-line bg-white px-4 py-2.5 text-[13px] font-semibold text-ink hover:border-slate-300"><CalendarClock className="h-3.5 w-3.5" /> Sync to calendar</button>}
      />
      <Card title={`Deadlines (${deadlines.length})`} action={<Badge tone="bad">1 critical</Badge>} pad={false}>
        <ul className="divide-y divide-line">
          {deadlines.map((d) => (
            <li key={d.matter} className="flex flex-col gap-2 px-5 py-4 sm:flex-row sm:items-center">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-[13.5px] font-semibold text-ink">{d.matter}</p>
                  <Badge tone={d.tone === "bad" ? "bad" : d.tone === "warn" ? "warn" : "default"}>{d.severity}</Badge>
                </div>
                <p className="mt-0.5 text-[11.5px] text-slate-400">Client: {d.client} · due {d.due}</p>
              </div>
              <div className="shrink-0 text-right">
                <span className="text-lg font-bold tabular-nums text-ink">{d.days}</span>
                <span className="ml-1 text-[11px] text-slate-400">days</span>
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}

export function RenewalManagement() {
  return (
    <div className="space-y-5">
      <PageHeader title="Renewal Management" desc="Annuities, trademark renewals and design renewals — budgeted, not surprised by." />
      <Card title={`Upcoming renewals (${renewals.length})`} action={<RefreshCw className="h-4 w-4 text-slate-400" />} pad={false}>
        <ul className="divide-y divide-line">
          {renewals.map((r) => (
            <li key={r.item} className="flex items-center justify-between gap-3 px-5 py-4">
              <div className="min-w-0">
                <p className="truncate text-[13.5px] font-semibold text-ink">{r.item}</p>
                <p className="text-[11.5px] text-slate-400">{r.client} · due {r.due} · {r.cost}</p>
              </div>
              <Badge tone={r.tone === "warn" ? "warn" : "good"}>{r.status}</Badge>
            </li>
          ))}
        </ul>
      </Card>
      <Card title="Annual renewal budget">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            ["Total 2026 renewals", "₹66,000"],
            ["Assets under auto-renew", "9"],
            ["Needs client approval", "2"],
          ].map(([l, v]) => (
            <div key={l} className="rounded-xl bg-slate-50 p-5 text-center">
              <span className="text-xl font-semibold tracking-tight text-ink tabular-nums">{v}</span>
              <p className="mt-1 text-[11.5px] font-medium text-slate-500">{l}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

export function IpRiskAssessment() {
  return (
    <div className="space-y-5">
      <PageHeader title="IP Risk Assessment" desc="Ownership, infringement, prior-art, filing and disclosure risks — scored and routed." />
      <Card title={`Risk register (${risks.length})`} action={<ShieldAlert className="h-4 w-4 text-amber-500" />} pad={false}>
        <ul className="divide-y divide-line">
          {risks.map((r) => (
            <li key={r.risk} className="grid gap-3 px-5 py-4 sm:grid-cols-[1.4fr_auto_auto] sm:items-center">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-[13.5px] font-semibold text-ink">{r.risk}</p>
                  <Badge tone="default">{r.type}</Badge>
                </div>
                <p className="mt-0.5 text-[11.5px] text-slate-400">Client: {r.client} · {r.mitigation}</p>
              </div>
              <div className="w-24 shrink-0">
                <Progress value={r.score} tone={r.score > 70 ? "bad" : r.score > 40 ? "warn" : "good"} />
                <p className="mt-1 text-right text-[10.5px] tabular-nums text-slate-400">risk {r.score}</p>
              </div>
              <Badge tone={r.severity === "Critical" ? "bad" : r.severity === "High" ? "warn" : "default"}>{r.severity}</Badge>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
