import { Badge, Card, PageHeader, Progress } from "@/components/app/widgets";

const mvp = { version: "v2 — Field Alert", progress: 82, release: "Apr 12", users: 214, nps: 44 };

const features = [
  { name: "Per-acre stress alerts", state: "Shipped", pct: 100 },
  { name: "Treatment priority maps", state: "Shipped", pct: 100 },
  { name: "Vernacular alert voice-overs", state: "In QA", pct: 86 },
  { name: "Offline field mode", state: "In dev", pct: 58 },
  { name: "Adjacent-plot contagion view", state: "Backlog", pct: 0 },
];

const roadmap = [
  { q: "Q2 2026", items: ["v2 release", "Offline mode", "Pilot 3 analytics pack"], active: true },
  { q: "Q3 2026", items: ["Cooperative white-label", "Weather-insurance hooks", "API v2"] },
  { q: "Q4 2026", items: ["SEA localization", "Carbon-baselines module", "Mobile SDK"] },
];

export function Product() {
  return (
    <div className="space-y-5">
      <PageHeader
        title="Product"
        desc="Your MVP and roadmap — what ships, what waits, and what users actually say."
        actions={<button className="rounded-[10px] border border-line bg-white px-4 py-2.5 text-[13px] font-semibold text-ink hover:border-slate-300">Edit roadmap</button>}
      />

      <div className="grid gap-4 sm:grid-cols-4">
        {[
          ["Version in progress", mvp.version],
          ["Release date", mvp.release],
          ["Weekly active users", String(mvp.users)],
          ["Product NPS", String(mvp.nps)],
        ].map(([l, v]) => (
          <Card key={l} className="p-5" pad={false}>
            <div className="p-5">
              <p className="text-[11.5px] font-medium text-slate-400">{l}</p>
              <p className="mt-1.5 text-xl font-semibold tracking-tight text-ink">{v}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.2fr_1fr]">
        <Card title={`MVP ${mvp.version}`} action={<Badge tone="accent">{mvp.progress}% · releases {mvp.release}</Badge>}>
          <ul className="space-y-4">
            {features.map((f) => (
              <li key={f.name}>
                <div className="flex items-center justify-between gap-3">
                  <p className={`text-[13.5px] font-medium ${f.state === "Backlog" ? "text-slate-300" : "text-ink"}`}>{f.name}</p>
                  <Badge tone={f.state === "Shipped" ? "good" : f.state === "Backlog" ? "default" : "accent"}>{f.state}</Badge>
                </div>
                <Progress value={f.pct} tone={f.state === "Shipped" ? "good" : "accent"} className="mt-2" />
              </li>
            ))}
          </ul>
        </Card>

        <div className="space-y-5">
          <Card title="Roadmap" pad={false}>
            <ul className="divide-y divide-line">
              {roadmap.map((r) => (
                <li key={r.q} className={`px-5 py-4 ${r.active ? "bg-accent-mist/50" : ""}`}>
                  <div className="flex items-center gap-2">
                    <p className={`text-[13px] font-bold ${r.active ? "text-accent" : "text-slate-400"}`}>{r.q}</p>
                    {r.active && <Badge tone="accent">Current</Badge>}
                  </div>
                  <ul className="mt-2 space-y-1">
                    {r.items.map((i) => (
                      <li key={i} className="flex items-center gap-2 text-[12.5px] text-slate-600">
                        <span className="h-1 w-1 rounded-full bg-slate-300" />
                        {i}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </Card>

          <Card title="Latest user feedback">
            {[
              { q: "“The pest alerts saved our chilli belt — twice.”", by: "FPO lead, Guntur" },
              { q: "“Maps are gold. Alerts in Kannada will change everything.”", by: "Agronomist, Raichur" },
            ].map((f) => (
              <figure key={f.q} className="mb-4 rounded-xl bg-slate-50 p-4 last:mb-0">
                <blockquote className="text-[13px] font-medium leading-relaxed text-ink">{f.q}</blockquote>
                <figcaption className="mt-1.5 text-[11px] text-slate-400">{f.by}</figcaption>
              </figure>
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
}
