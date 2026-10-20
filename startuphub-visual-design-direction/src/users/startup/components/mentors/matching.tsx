import { Badge, Card, PageHeader } from "@/components/app/widgets";

const dims = [
  ["Problem-stage fit", 96], ["Sector depth", 91], ["Challenge recency", 88],
  ["Availability match", 79], ["Style compatibility", 84], ["Network leverage", 72],
];

const preferences = [
  ["Primary challenge", "Inference cost at scale"],
  ["Sector focus", "AgriTech · Applied AI"],
  ["Engagement type", "Weekly sessions + async"],
  ["Mentor style", "Technical, direct, operator-first"],
  ["Commitment", "3–4 hrs / month"],
];

export function MentorMatching() {
  return (
    <div className="space-y-5">
      <PageHeader title="Mentor Matching" desc="How the algorithm decides who can actually move your needle." />
      <div className="grid gap-5 lg:grid-cols-2">
        <Card title="Match dimensions — how you're scored">
          <ul className="space-y-4">
            {dims.map(([l, v]) => (
              <li key={l} className="flex items-center gap-3">
                <span className="w-40 text-[12.5px] font-medium text-slate-600">{l}</span>
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-accent" style={{ width: `${v}%` }} />
                </div>
                <span className="w-8 text-right text-[12.5px] font-semibold tabular-nums text-ink">{v}</span>
              </li>
            ))}
          </ul>
        </Card>
        <Card title="Your matching preferences" action={<button className="text-[12px] font-semibold text-accent">Edit</button>}>
          <dl className="space-y-3.5">
            {preferences.map(([k, v]) => (
              <div key={k} className="flex items-start justify-between gap-4">
                <dt className="text-[12px] font-medium text-slate-400">{k}</dt>
                <dd className="max-w-[60%] text-right text-[12.5px] font-medium leading-snug text-ink">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-5 rounded-xl bg-accent-mist p-4 text-[12.5px] leading-relaxed text-slate-600">
            Tightening your &quot;primary challenge&quot; from &quot;scaling&quot; to &quot;inference cost&quot; improved match quality 41% this month. Specificity is the entire game.
          </div>
        </Card>
      </div>
    </div>
  );
}
