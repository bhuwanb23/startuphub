import { Badge, Card, PageHeader, Progress } from "@/components/app/widgets";
import { MentorRatings } from "@/users/mentor/components/impact/ratings";

const journey = [
  { year: "2026", startups: 4, sessions: 24, highlight: "Lumen AI GPU cost −33% · OrbitalWorks v2 shipped" },
  { year: "2025", startups: 9, sessions: 68, highlight: "6 seed-to-A transitions guided · 2 breakouts mentored" },
  { year: "2024", startups: 12, sessions: 82, highlight: "ZetaStack rebuild saved ₹4 Cr · PayU pods shipped fraud module early" },
  { year: "2023", startups: 6, sessions: 40, highlight: "First year mentoring on StartupHub" },
];

const tracking = [
  { metric: "Sessions completed", value: 214, max: 250, note: "Including 24 this year" },
  { metric: "Hours given", value: 96, max: 120, note: "Inside 100 h/yr target" },
  { metric: "Action items closed", value: 172, max: 190, note: "91% closure rate" },
  { metric: "Milestones verified", value: 87, max: 100, note: "96% of assigned" },
];

const outcomes = [
  { startup: "ZetaStack", then: "Billing drift out of control", now: "Ledger rebuilt — ₹4 Cr loss avoided", when: "Oct 2024" },
  { startup: "PayU-scale fintech", then: "Sprint chaos, missed launches", now: "Re-orged into 4 pods — 8 wks faster", when: "Aug 2024" },
  { startup: "Lumen AI", then: "₹4.8 inference cost per acre", now: "₹3.2 and falling — Series B term sheet", when: "In progress" },
  { startup: "OrbitalWorks", then: "38-minute data latency", now: "24 min steady — incoming NASA-adjacent contract", when: "In progress" },
];

export function MentorImpact() {
  return (
    <div className="space-y-5">
      <PageHeader title="Impact" desc="Not hours logged — outcomes produced. The record founders point to when they refer you." />

      <div className="grid gap-5 lg:grid-cols-[1fr_1.2fr]">
        <Card title="Mentorship history">
          <div className="relative">
            <span className="absolute bottom-2 left-[7px] top-2 w-px bg-slate-200" aria-hidden="true" />
            <ul className="space-y-5">
              {journey.map((j) => (
                <li key={j.year} className="relative flex gap-4">
                  <span className="relative z-10 mt-1 h-[15px] w-[15px] shrink-0 rounded-full border-[3px] border-accent bg-white" />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[13px] font-bold text-accent">{j.year}</span>
                      <span className="text-[11px] text-slate-400">{j.startups} startups · {j.sessions} sessions</span>
                    </div>
                    <p className="mt-1 text-[12.5px] leading-relaxed text-slate-600">{j.highlight}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Card>

        <div className="space-y-5">
          <Card title="Impact tracking">
            <ul className="space-y-4">
              {tracking.map((t) => (
                <li key={t.metric}>
                  <div className="flex items-baseline justify-between">
                    <p className="text-[13px] font-medium text-slate-600">{t.metric}</p>
                    <span className="text-lg font-semibold tabular-nums text-ink">{t.value}</span>
                  </div>
                  <Progress value={(t.value / t.max) * 100} className="mt-2" />
                  <p className="mt-1 text-[11px] text-slate-400">{t.note}</p>
                </li>
              ))}
            </ul>
          </Card>

          <Card title="Ratings that travel with you">
            <div className="flex items-center gap-4">
              <span className="text-5xl font-semibold tracking-tight text-ink">4.9</span>
              <div className="text-[12.5px] text-slate-500">
                <p className="font-semibold text-amber-500">★★★★★ 4.9 / 5</p>
                <p className="mt-1">From 187 mentee reviews · Category: technical mentorship</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <Card title="Outcomes — before & after">
        <div className="space-y-3">
          {outcomes.map((o) => (
            <div key={o.startup} className="grid gap-3 rounded-xl border border-line p-4 sm:grid-cols-[140px_1fr_auto_1fr] sm:items-center">
              <p className="text-[13px] font-semibold text-ink">{o.startup}</p>
              <p className="text-[12.5px] leading-snug text-slate-500 line-through decoration-slate-300">{o.then}</p>
              <Badge tone={o.when === "In progress" ? "accent" : "good"}>{o.when}</Badge>
              <p className="text-[12.5px] font-medium leading-snug text-ink">{o.now}</p>
            </div>
          ))}
        </div>
      </Card>
      <MentorRatings />
    </div>
  );
}
