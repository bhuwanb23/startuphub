import { Badge, Card, PageHeader } from "@/components/app/widgets";

const filings = [
  { client: "Lumen AI", type: "Patent", matter: "Complete specification — claims v3", status: "Awaiting my review", due: "Apr 09", stage: 3, tone: "warn" as const },
  { client: "MedSync", type: "Trademark", matter: "Class 9 expansion filing", status: "Drafting", due: "Apr 14", stage: 1, tone: "accent" as const },
  { client: "AquaPure", type: "Design", matter: "Cascade unit — design registration", status: "Filed", due: "Response Apr 18", stage: 2, tone: "default" as const },
  { client: "OrbitalWorks", type: "PCT", matter: "US national-phase entry", status: "Preparing", due: "Apr 22", stage: 1, tone: "accent" as const },
  { client: "TerraGrid", type: "Patent", matter: "FER response — dispatch scheduling", status: "Drafting", due: "Jun 02", stage: 2, tone: "default" as const },
  { client: "FinEdge", type: "Patent", matter: "Provisional — entropy scoring", status: "Cleared to file", due: "This week", stage: 0, tone: "good" as const },
];

const cases = [
  { id: "IP-2026-014", client: "MedSync", type: "Opposition", matter: "Third-party opposition — “MedSync” mark", stage: "Evidence period", next: "Evidence due Apr 26", risk: "Medium" },
  { id: "IP-2026-011", client: "TerraGrid", type: "Office action", matter: "FER — prior-art objection", stage: "Response drafting", next: "Response due Jun 02", risk: "Low" },
  { id: "IP-2026-008", client: "Skyline", type: "Infringement advisory", matter: "Competitor using similar mark", stage: "Cease & desist drafted", next: "Client decision — Apr 12", risk: "High" },
];

const consultations = [
  { client: "BloomBio", topic: "IP strategy onboarding", when: "Apr 16 · 11:00", mode: "Video", prep: "Assay pipeline docs received" },
  { client: "Lumen AI", topic: "Trademark + launch timing", when: "Apr 10 · 15:00", mode: "Video", prep: "File “Field Alert” first — walk through classes" },
  { client: "EduFold", topic: "What's protectable in adaptive learning", when: "Apr 18 · 16:00", mode: "Video", prep: "Prior-art scan on pathing methods" },
];

export function FilingManagement() {
  return (
    <div className="space-y-5">
      <PageHeader
        title="Filing Management"
        desc="Every filing in flight — what's drafted, what's filed, what's waiting on you."
        actions={<button className="rounded-[10px] bg-accent px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-accent-deep">New filing</button>}
      />
      <Card title={`Filings in progress (${filings.length})`} pad={false}>
        <ul className="divide-y divide-line">
          {filings.map((f) => (
            <li key={f.matter} className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge tone="accent">{f.type}</Badge>
                  <p className="text-[13.5px] font-semibold text-ink">{f.matter}</p>
                </div>
                <p className="mt-1 text-[11.5px] text-slate-400">Client: {f.client} · {f.status}</p>
              </div>
              <div className="flex items-center gap-4">
                <Badge tone={f.tone === "warn" ? "warn" : f.tone === "good" ? "good" : "default"}>{f.due}</Badge>
                <button className="rounded-lg border border-line px-3.5 py-1.5 text-[12px] font-semibold text-ink transition-colors hover:border-accent hover:text-accent">
                  Open
                </button>
              </div>
            </li>
          ))}
        </ul>
      </Card>
      <Card id="consult" title="Legal consultations" action={<Badge tone="accent">3 booked</Badge>} pad={false}>
        <ul className="divide-y divide-line">
          {consultations.map((c) => (
            <li key={c.topic} className="flex flex-col gap-2 px-5 py-4 sm:flex-row sm:items-center">
              <div className="min-w-0 flex-1">
                <p className="text-[13.5px] font-semibold text-ink">{c.topic}</p>
                <p className="mt-0.5 text-[11.5px] text-slate-400">{c.client} · {c.mode} · Prep: {c.prep}</p>
              </div>
              <Badge tone="accent">{c.when}</Badge>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}

export function CaseManagement() {
  return (
    <div className="space-y-5">
      <PageHeader title="Case Management" desc="Oppositions, office actions and advisories — tracked to the hearing date." />
      <div className="grid gap-4 lg:grid-cols-3">
        {cases.map((c) => (
          <Card key={c.id} className="flex flex-col">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[11px] font-bold tabular-nums text-slate-400">{c.id}</p>
                <p className="mt-1 text-[14px] font-semibold leading-snug text-ink">{c.matter}</p>
              </div>
              <Badge tone={c.risk === "High" ? "bad" : c.risk === "Medium" ? "warn" : "good"}>{c.risk}</Badge>
            </div>
            <p className="mt-3 text-[11.5px] text-slate-400">{c.client} · {c.type}</p>
            <div className="mt-4 flex-1 rounded-xl bg-slate-50 p-3.5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-400">Stage</p>
              <p className="mt-1 text-[13px] font-semibold text-ink">{c.stage}</p>
            </div>
            <p className="mt-3 text-[12px] text-slate-500">
              <span className="font-semibold text-accent">Next: </span>{c.next}
            </p>
          </Card>
        ))}
      </div>
      <Card id="tracking" title="Case timeline — IP-2026-008 (Skyline)">
        <div className="relative">
          <span className="absolute bottom-2 left-[7px] top-2 w-px bg-slate-200" aria-hidden="true" />
          <ul className="space-y-4">
            {[
              ["Mar 28", "Client reported competitor using similar mark", "done"],
              ["Mar 30", "Evidence package assembled (screenshots, prior use)", "done"],
              ["Apr 02", "Cease & desist letter drafted", "done"],
              ["Apr 12", "Client decision — send or negotiate", "next"],
              ["Apr 26", "If contested: opposition filing window", "future"],
            ].map(([when, what, state]) => (
              <li key={what} className="relative flex gap-4">
                <span className={`relative z-10 mt-1 h-[15px] w-[15px] shrink-0 rounded-full border-[3px] ${state === "done" ? "border-accent bg-white" : state === "next" ? "border-accent bg-accent" : "border-slate-200 bg-white"}`} />
                <div>
                  <p className="text-[11px] font-semibold text-slate-400">{when}</p>
                  <p className={`text-[13px] ${state === "future" ? "text-slate-400" : "font-medium text-ink"}`}>{what}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Card>
    </div>
  );
}
