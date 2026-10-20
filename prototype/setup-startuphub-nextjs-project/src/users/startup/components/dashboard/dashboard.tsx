import {
  CalendarDays,
  Flame,
  Landmark,
  ShieldCheck,
  Target,
} from "lucide-react";
import {
  Bar,
  PageIntro,
  Panel,
  PanelLink,
  StatCard,
} from "@/components/app/widgets";

const MILESTONES = [
  { name: "Incorporation & founder agreements", done: true },
  { name: "MVP v0.9 shipped to pilot users", done: true },
  { name: "Provisional patent filed", done: true },
  { name: "Seed data room assembled", done: false },
  { name: "First enterprise pilot signed", done: false },
];

const NEXT_STEPS = [
  { title: "Mentor session · GTM review", meta: "Today · 4:30 PM · Priya Nair" },
  { title: "Investor intro · Terra Ventures", meta: "Tomorrow · 11:00 AM" },
  { title: "IPR desk · claims review", meta: "Fri · 2:00 PM · Kavya Reddy" },
];

export function FounderDashboard() {
  return (
    <div className="space-y-6">
      <PageIntro
        title="Good morning, Ravi"
        description="Lumen AI is in the Incubation stage — Batch 03. Two milestones left before this quarter's review."
        action={
          <a
            href="#"
            className="inline-flex h-9 items-center rounded-lg bg-accent px-4 text-[13px] font-semibold text-white transition-colors hover:bg-accent-deep"
          >
            Continue milestone
          </a>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Readiness score" value="78/100" delta="+6" hint="this month" icon={Target} />
        <StatCard label="Active mentors" value="4" hint="2 sessions this week" icon={CalendarDays} />
        <StatCard label="IP filings" value="2" delta="1 new" hint="patent pending" icon={ShieldCheck} />
        <StatCard label="Capital matched" value="₹1.4 Cr" hint="3 funds in conversation" icon={Landmark} />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Journey milestones" action={<PanelLink href="#">View all</PanelLink>}>
          <ul className="space-y-3.5">
            {MILESTONES.map((m) => (
              <li key={m.name} className="flex items-center gap-3">
                <span
                  className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-white ${
                    m.done ? "bg-accent" : "bg-slate-200"
                  }`}
                >
                  {m.done ? "✓" : ""}
                </span>
                <span
                  className={`text-[13.5px] ${
                    m.done ? "text-slate-400 line-through" : "text-ink"
                  }`}
                >
                  {m.name}
                </span>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Up next" action={<PanelLink href="#">Schedule</PanelLink>}>
          <ul className="divide-y divide-line">
            {NEXT_STEPS.map((s) => (
              <li key={s.title} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-soft">
                  <Flame className="h-4 w-4 text-accent" />
                </span>
                <span>
                  <span className="block text-[13.5px] font-medium text-ink">{s.title}</span>
                  <span className="block text-[12px] text-slate-400">{s.meta}</span>
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-4 border-t border-line pt-4">
            <p className="mb-2 flex items-center justify-between text-[12px] font-medium text-slate-500">
              Incubation progress <span className="text-ink">68%</span>
            </p>
            <Bar value={68} />
          </div>
        </Panel>
      </div>
    </div>
  );
}
