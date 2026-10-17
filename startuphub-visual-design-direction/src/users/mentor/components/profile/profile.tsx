import { Badge, Card, PageHeader, Progress } from "@/components/app/widgets";

const expertise = [
  { area: "System architecture", level: 96, kind: "Core" },
  { area: "Scaling engineering teams", level: 92, kind: "Core" },
  { area: "FinTech systems", level: 88, kind: "Domain" },
  { area: "Cost-efficient infra", level: 84, kind: "Core" },
  { area: "Deep-tech readiness", level: 76, kind: "Domain" },
  { area: "Vernacular product", level: 68, kind: "Emerging" },
];

const credentials = [
  { what: "CTO, ZetaPay — ₹40K Cr annual payments infra", years: "2014–2024" },
  { what: "VP Engineering, Razorpay-scale startup", years: "2010–2014" },
  { what: "Mentor since 2023 · 214 sessions on StartupHub", years: "2023–now" },
  { what: "B.Tech CS, IIT Bombay · AWS Architect Pro", years: "Held" },
];

const availability = [
  ["Working days", "Tue · Wed · Thu"],
  ["Hours", "15:00 – 19:00 IST"],
  ["Session length", "60 min (45 + 15 notes)"],
  ["Slots per week", "2"],
  ["Time zone", "Asia/Kolkata"],
  ["Blocked", "Apr 22 – Apr 30 (break)"],
];

export function MentorProfile() {
  return (
    <div className="space-y-5">
      <PageHeader
        title="My Profile"
        desc="Your expert identity — expertise, credentials and the availability founders match against."
      />

      <Card>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <span className="grid h-16 w-16 place-items-center rounded-2xl bg-ink text-lg font-bold text-white">PN</span>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2.5">
              <h2 className="text-xl font-semibold tracking-tight text-ink">Priya Nair</h2>
              <Badge tone="good">Verified expert</Badge>
              <Badge tone="accent">Top 5% mentor</Badge>
            </div>
            <p className="mt-1.5 max-w-xl text-[13.5px] leading-relaxed text-slate-500">
              Built payments infrastructure processing ₹40K Cr annually. I help technical founders make boring, correct architecture decisions — and scale the teams that run them.
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {["Architecture", "Scaling teams", "FinTech", "Cost-efficient infra"].map((t) => (
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
                <span className="w-44 text-[12.5px] font-medium text-slate-600">{e.area}</span>
                <Progress value={e.level} className="flex-1" />
                <Badge tone={e.kind === "Core" ? "accent" : "default"}>{e.kind}</Badge>
              </li>
            ))}
          </ul>
        </Card>

        <Card id="credentials" title="Experience & credentials" pad={false}>
          <ul className="divide-y divide-line">
            {credentials.map((c) => (
              <li key={c.what} className="flex items-start justify-between gap-3 px-5 py-4">
                <p className="text-[13px] font-medium leading-snug text-ink">{c.what}</p>
                <span className="shrink-0 text-[11px] font-semibold tabular-nums text-slate-400">{c.years}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card id="availability" title="Availability management" action={<button className="text-[12px] font-semibold text-accent">Edit schedule</button>}>
        <dl className="grid gap-4 sm:grid-cols-3">
          {availability.map(([k, v]) => (
            <div key={k} className="rounded-xl border border-line p-4">
              <dt className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">{k}</dt>
              <dd className="mt-1.5 text-[13px] font-semibold leading-snug text-ink">{v}</dd>
            </div>
          ))}
        </dl>
      </Card>
    </div>
  );
}
