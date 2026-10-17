import { Badge, Card, PageHeader, Progress } from "@/components/app/widgets";

const expertise = [
  { area: "Patent drafting & prosecution", level: 97, kind: "Core" },
  { area: "Prior-art search & FTO", level: 94, kind: "Core" },
  { area: "IP strategy & portfolio", level: 92, kind: "Core" },
  { area: "Trademark prosecution", level: 84, kind: "Core" },
  { area: "Design registration", level: 80, kind: "Core" },
  { area: "Licensing & commercialization", level: 76, kind: "Domain" },
  { area: "Trade secret protection", level: 71, kind: "Domain" },
];

const jurisdictions = [
  ["India (IN)", "Primary · 900+ filings"],
  ["US (USPTO)", "via associates · 120 filings"],
  ["EU (EPO)", "via associates · 68 filings"],
  ["PCT", "national-phase entry · 41 filings"],
];

const credentials = [
  { what: "IPR Attorney & Patent Strategist — StartupHub IPR Desk", years: "2023–now" },
  { what: "Partner, IP boutique (Chennai) — deep-tech practice", years: "2012–2023" },
  { what: "Patent Examiner, Indian Patent Office", years: "2007–2012" },
  { what: "PhD Electrical Engineering · Registered Patent Agent (IN/US)", years: "Held" },
];

const availability = [
  ["Working days", "Mon · Wed · Fri"],
  ["Hours", "10:00 – 18:00 IST"],
  ["Consult slots", "3 per week · 45 min"],
  ["Time zone", "Asia/Kolkata"],
  ["Blocked", "Apr 22 – Apr 30"],
  ["Search turnaround", "72 hours"],
];

export function IprProfile() {
  return (
    <div className="space-y-5">
      <PageHeader
        title="My Profile"
        desc="Your professional identity — expertise, jurisdictions and the availability clients book against."
      />

      <Card>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <span className="grid h-16 w-16 place-items-center rounded-2xl bg-ink text-lg font-bold text-white">KR</span>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2.5">
              <h2 className="text-xl font-semibold tracking-tight text-ink">Dr. Kavita Rao</h2>
              <Badge tone="good">Verified expert</Badge>
              <Badge tone="accent">900+ filings</Badge>
            </div>
            <p className="mt-1.5 max-w-xl text-[13.5px] leading-relaxed text-slate-500">
              Patent strategist with 19 years across examination, prosecution and commercialization. I help founders protect what makes them different — before the world sees it.
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {["Patents", "Prior-art & FTO", "IP strategy", "Trademarks", "Designs"].map((t) => (
                <span key={t} className="rounded-md bg-slate-100 px-2.5 py-1 text-[11.5px] font-medium text-slate-600">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </Card>

      <div className="grid gap-5 lg:grid-cols-2">
        <Card id="expertise" title="Expertise management" action={<button className="text-[12px] font-semibold text-accent">Edit</button>}>
          <ul className="space-y-4">
            {expertise.map((e) => (
              <li key={e.area} className="flex items-center gap-3">
                <span className="w-48 text-[12.5px] font-medium text-slate-600">{e.area}</span>
                <Progress value={e.level} className="flex-1" />
                <Badge tone={e.kind === "Core" ? "accent" : "default"}>{e.kind}</Badge>
              </li>
            ))}
          </ul>
        </Card>

        <div className="space-y-5">
          <Card id="credentials" title="Credentials & experience" pad={false}>
            <ul className="divide-y divide-line">
              {credentials.map((c) => (
                <li key={c.what} className="flex items-start justify-between gap-3 px-5 py-3.5">
                  <p className="text-[12.5px] font-medium leading-snug text-ink">{c.what}</p>
                  <span className="shrink-0 text-[11px] font-semibold tabular-nums text-slate-400">{c.years}</span>
                </li>
              ))}
            </ul>
          </Card>
          <Card title="Jurisdictions">
            <ul className="space-y-3">
              {jurisdictions.map(([j, note]) => (
                <li key={j} className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[13px] font-semibold text-ink">{j}</p>
                    <p className="mt-0.5 text-[11.5px] text-slate-400">{note}</p>
                  </div>
                  <Badge tone={j.startsWith("India") ? "accent" : "default"}>
                    {j.startsWith("India") ? "Primary" : "Associate"}
                  </Badge>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>

      <Card id="availability" title="Availability" action={<button className="text-[12px] font-semibold text-accent">Edit schedule</button>}>
        <dl className="grid gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {availability.map(([k, v]) => (
            <div key={k} className="rounded-xl border border-line p-4">
              <dt className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-slate-400">{k}</dt>
              <dd className="mt-1.5 text-[12.5px] font-semibold leading-snug text-ink">{v}</dd>
            </div>
          ))}
        </dl>
      </Card>
    </div>
  );
}
