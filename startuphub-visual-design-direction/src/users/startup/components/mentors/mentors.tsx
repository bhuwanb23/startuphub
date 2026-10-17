import { CalendarDays, Plus } from "lucide-react";
import { Badge, Card, PageHeader } from "@/components/app/widgets";

const matches = [
  { name: "Karan Chadha", match: 94, why: "EdTech→B2B pivot + vernacular UX matches your FPO channel", exp: "11 yrs · ex-CPO" },
  { name: "Sunita Deshmukh", match: 88, why: "Enterprise procurement in agri-adjacent industries", exp: "18 yrs · VP Innovation" },
  { name: "Arvind Menon", match: 85, why: "Scale-stage agronomy ops — exactly your next 2 quarters", exp: "14 yrs · ex-COO" },
];

const mentor = {
  name: "Priya Nair",
  role: "CTO advisor · active engagement",
  cadence: "Weekly · Thursday 16:00",
  sessions: 14,
  hours: 21,
  notes: "Focus this quarter: inference pipeline cost per acre. Target: ₹4.5 → ₹3.0 by May.",
};

const sessions = [
  { topic: "GPU cost optimization review", when: "Thu Apr 09 · 16:00", status: "Upcoming", tone: "accent" as const },
  { topic: "Vernacular agronomy terms — data quality", when: "Thu Apr 02 · 16:00", status: "Completed", tone: "good" as const },
  { topic: "Series A tech diligence prep", when: "Thu Mar 26 · 16:00", status: "Completed", tone: "good" as const },
];

const actionItems = [
  { text: "Share cost-per-acre dashboard link", owner: "You", due: "Before Thu", done: false },
  { text: "Priya to intro inference-optimization eng at Nimbus", owner: "Priya", due: "This week", done: true },
  { text: "Decide: spot vs reserved GPU for Q3", owner: "You", due: "Apr 15", done: false },
];

export function Mentors() {
  return (
    <div className="space-y-5">
      <PageHeader
        title="Mentors"
        desc="The operators in your corner — matched by problem, not by fame."
        actions={<button className="inline-flex items-center gap-1.5 rounded-[10px] bg-accent px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-accent-deep"><Plus className="h-3.5 w-3.5" /> Request match</button>}
      />

      <div className="grid gap-5 xl:grid-cols-[1.3fr_1fr]">
        <div className="space-y-5">
          <Card
            title="AI mentor matches"
            action={<Badge tone="accent">3 new</Badge>}
            pad={false}
          >
            <ul className="divide-y divide-line">
              {matches.map((m) => (
                <li key={m.name} className="flex items-center gap-4 px-5 py-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-accent-soft text-[12px] font-bold text-accent">
                    {m.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-[14px] font-semibold text-ink">{m.name}</p>
                      <span className="text-[11px] text-slate-400">{m.exp}</span>
                    </div>
                    <p className="mt-0.5 truncate text-[12px] text-slate-500">{m.why}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2.5">
                    <span className="rounded-full bg-accent-soft px-2.5 py-1 text-[11px] font-bold text-accent">{m.match}%</span>
                    <button className="rounded-lg border border-line px-3 py-1.5 text-[12px] font-semibold text-ink hover:border-accent hover:text-accent">
                      Connect
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </Card>

          <Card title="Sessions" action={<CalendarDays className="h-4 w-4 text-slate-400" />} pad={false}>
            <ul className="divide-y divide-line">
              {sessions.map((s) => (
                <li key={s.topic} className="flex items-center justify-between gap-3 px-5 py-3.5">
                  <div className="min-w-0">
                    <p className="truncate text-[13.5px] font-medium text-ink">{s.topic}</p>
                    <p className="mt-0.5 text-[11.5px] text-slate-400">{s.when}</p>
                  </div>
                  <Badge tone={s.tone === "good" ? "good" : "accent"}>{s.status}</Badge>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <div className="space-y-5">
          <Card>
            <div className="flex items-center gap-3.5">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-accent text-[13px] font-bold text-white">PN</span>
              <div>
                <p className="text-[15px] font-semibold text-ink">{mentor.name}</p>
                <p className="text-[12px] text-slate-400">{mentor.role}</p>
              </div>
            </div>
            <dl className="mt-5 grid grid-cols-3 gap-3 text-center">
              {[["Sessions", mentor.sessions], ["Hours", mentor.hours], ["Cadence", "Wkly"]].map(([l, v]) => (
                <div key={l} className="rounded-xl bg-slate-50 py-3">
                  <dd className="text-lg font-semibold text-ink tabular-nums">{v}</dd>
                  <dt className="mt-0.5 text-[10.5px] text-slate-400">{l}</dt>
                </div>
              ))}
            </dl>
            <div className="mt-4 rounded-xl bg-accent-mist p-3.5">
              <p className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-accent">Current focus</p>
              <p className="mt-1 text-[12.5px] leading-relaxed text-slate-600">{mentor.notes}</p>
            </div>
          </Card>

          <Card title="Action items" action={<Badge>2 open</Badge>}>
            <ul className="space-y-3">
              {actionItems.map((a) => (
                <li key={a.text} className="flex items-start gap-2.5">
                  <span className={`mt-0.5 grid h-4.5 w-4.5 place-items-center rounded-full ${a.done ? "bg-emerald-500 text-white" : "border-2 border-slate-200"}`}>
                    {a.done && <span className="text-[9px] font-bold">✓</span>}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className={`text-[13px] leading-snug ${a.done ? "text-slate-300 line-through" : "text-slate-600"}`}>{a.text}</p>
                    <p className="mt-0.5 text-[10.5px] text-slate-400">{a.owner} · {a.due}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
