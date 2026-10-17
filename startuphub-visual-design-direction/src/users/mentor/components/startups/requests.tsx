import { Badge, Card, PageHeader } from "@/components/app/widgets";

const newRequests = [
  { startup: "FinEdge", founder: "Kabir Malhotra", ask: "Credit-scoring infrastructure sanity check + help hiring our first ML lead. We process 18K scores/day and our queue is falling over.", age: "2 days", match: 96, tone: "accent" as const },
  { startup: "QuantumLeaf", founder: "Rohan Verma", ask: "Milestone drift has crushed three sprints. Need you to install operating cadence around our phenotyping pipeline.", age: "6 days", match: 71, tone: "warn" as const },
];

const history: { startup: string; status: string; note: string; tone: "good" | "default" }[] = [
  { startup: "BloomBio", status: "Accepted", note: "Assay validation pipeline — first session booked Apr 15, async review started.", tone: "good" },
  { startup: "MedData Labs", status: "Declined", note: "HL7 integration is healthcare-infra adjacency, not core to my bench. Recommended to Mentor Green.", tone: "default" },
  { startup: "OrbitalWorks", status: "Accepted", note: "Strong technical team — mesh protocol review made this a clear yes.", tone: "good" },
];

export function MentorRequests() {
  return (
    <div className="space-y-5">
      <PageHeader title="Mentorship Requests" desc="Startups asking for your time — new asks with age, fit, and history." />
      <Card title={`New requests (${newRequests.length})`} pad={false}>
        <ul className="divide-y divide-line">
          {newRequests.map((r) => (
            <li key={r.startup} className="px-5 py-5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3.5">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent-soft text-[12px] font-bold text-accent">{r.startup.slice(0,2).toUpperCase()}</span>
                  <div>
                    <p className="text-[15px] font-semibold text-ink">{r.startup}</p>
                    <p className="text-[11.5px] text-slate-400">{r.founder} · waiting {r.age}</p>
                  </div>
                </div>
                <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${r.match > 80 ? "bg-accent-soft text-accent" : "bg-amber-50 text-amber-600"}`}>
                  {r.match}% match
                </span>
              </div>
              <blockquote className="mt-3 rounded-xl bg-accent-mist p-4 text-[13px] leading-relaxed text-slate-600">
                “{r.ask}”
              </blockquote>
              <div className="mt-3.5 flex gap-2">
                <button className="flex-1 rounded-lg bg-accent py-2.5 text-[12.5px] font-semibold text-white hover:bg-accent-deep">Accept — start matching</button>
                <button className="rounded-lg border border-line px-4 py-2.5 text-[12.5px] font-semibold text-ink hover:border-slate-300">Ask a question</button>
                <button className="rounded-lg border border-line px-4 py-2.5 text-[12.5px] font-semibold text-slate-400 hover:border-slate-300 hover:text-slate-600">Decline</button>
              </div>
            </li>
          ))}
        </ul>
      </Card>
      <Card title="Request history" pad={false}>
        <ul className="divide-y divide-line">
          {history.map((h) => (
            <li key={h.startup} className="flex items-start justify-between gap-4 px-5 py-4">
              <div>
                <p className="text-[13.5px] font-semibold text-ink">{h.startup}</p>
                <p className="mt-1 text-[12.5px] leading-snug text-slate-500">{h.note}</p>
              </div>
              <Badge tone={h.tone}>{h.status}</Badge>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
