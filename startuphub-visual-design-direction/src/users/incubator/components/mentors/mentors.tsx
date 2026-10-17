import { Plus } from "lucide-react";
import Link from "next/link";
import { Badge, Card, PageHeader } from "@/components/app/widgets";

const mentors = [
  { name: "Priya Nair", focus: "CTO advisory · deep tech", startups: ["Lumen AI", "OrbitalWorks"], hours: "21 h", load: 3, rating: 4.9 },
  { name: "Vikram Rao", focus: "Growth · retention", startups: ["TerraGrid", "FreshChain"], hours: "14 h", load: 3, rating: 4.7 },
  { name: "Sunita Deshmukh", focus: "Enterprise sales · pilots", startups: ["AquaPure", "MedSync"], hours: "9 h", load: 2, rating: 4.8 },
  { name: "Karan Chadha", focus: "Product · consumer UX", startups: ["FinEdge", "EduFold"], hours: "11 h", load: 2, rating: 4.8 },
  { name: "Arjun Bedekar", focus: "Fundraising · zero-to-one", startups: ["GridSense"], hours: "6 h", load: 1, rating: 4.9 },
];

const assignments = [
  { who: "Sunita D.", startup: "AquaPure", since: "Jan 2026", note: "2 enterprise intros → 2 pilots", tone: "good" as const },
  { who: "Priya Nair", startup: "Lumen AI", since: "Oct 2025", note: "GPU cost cut 33% since pairing", tone: "good" as const },
  { who: "Vikram Rao", startup: "FreshChain", since: "Feb 2026", note: "Engagement flagged — conflict mediation needed", tone: "warn" as const },
  { who: "Karan Chadha", startup: "FinEdge", since: "Jan 2026", note: "Vernacular onboarding redesigned after 2 sessions", tone: "good" as const },
];

export function Mentors() {
  return (
    <div className="space-y-5">
      <PageHeader
        title="Mentors"
        desc="Your expert bench — who carries which startups, how many hours, and whether it's working."
        actions={<button className="inline-flex items-center gap-1.5 rounded-[10px] bg-accent px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-accent-deep"><Plus className="h-3.5 w-3.5" /> Add mentor</button>}
      />

      <Card title={`Mentor bench (${mentors.length})`} pad={false}>
        <ul className="divide-y divide-line">
          {mentors.map((m) => (
            <li key={m.name} className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center">
              <div className="flex items-center gap-3.5 sm:w-56">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent-soft text-[12px] font-bold text-accent">
                  {m.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                </span>
                <div>
                  <p className="text-[13.5px] font-semibold text-ink">{m.name}</p>
                  <p className="text-[11px] text-slate-400">{m.focus}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 sm:flex-1">
                {m.startups.map((s) => (
                  <span key={s} className="rounded-md bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-600">{s}</span>
                ))}
              </div>
              <div className="flex items-center gap-4 text-[12px]">
                <span className="tabular-nums text-slate-500">{m.hours}/mo</span>
                <span className="tabular-nums text-slate-500">Load {m.load}</span>
                <span className="font-semibold text-amber-500">★ {m.rating}</span>
              </div>
            </li>
          ))}
        </ul>
      </Card>

      <div className="grid gap-5 lg:grid-cols-2">
        <Card title="Active assignments" action={<Link href="/incubator/mentors/assignments" className="text-[12px] font-semibold text-accent">Manage</Link>}>
          <ul className="space-y-3">
            {assignments.map((a) => (
              <li key={a.startup} className="rounded-xl border border-line p-4">
                <div className="flex items-center justify-between">
                  <p className="text-[13.5px] font-semibold text-ink">{a.who} → {a.startup}</p>
                  <Badge tone={a.tone === "good" ? "good" : "warn"}>{a.tone === "good" ? "Working" : "Needs review"}</Badge>
                </div>
                <p className="mt-1 text-[12px] text-slate-500">{a.note}</p>
                <p className="mt-1.5 text-[10.5px] font-medium text-slate-300">since {a.since}</p>
              </li>
            ))}
          </ul>
        </Card>

        <Card title="Open slot — needs assignment" action={<Badge tone="warn">2 startups</Badge>}>
          <ul className="space-y-3">
            {[
              { s: "BloomBio (intake)", need: "BioTech regulatory mentor", match: "3 candidates shortlisted" },
              { s: "HealthLoop", need: "Hospital partnership coach", match: "Sunita at capacity — widens or reallocates" },
            ].map((x) => (
              <li key={x.s} className="rounded-xl border border-dashed border-line bg-soft/60 p-4">
                <p className="text-[13.5px] font-semibold text-ink">{x.s}</p>
                <p className="mt-1 text-[12px] text-slate-500">Needs: {x.need}</p>
                <p className="mt-1.5 text-[11.5px] font-medium text-accent">{x.match}</p>
              </li>
            ))}
          </ul>
          <Link href="/incubator/mentors/discover" className="mt-4 inline-flex text-[12.5px] font-semibold text-accent hover:underline">
            Discover mentors in network →
          </Link>
        </Card>
      </div>
    </div>
  );
}
