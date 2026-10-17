import { ArrowUpRight, Users } from "lucide-react";
import Link from "next/link";
import { Badge, Card, GaugeRing, PageHeader, Progress } from "@/components/app/widgets";

const details = [
  ["Founded", "Mar 2023"], ["Industry", "AgriTech · Applied AI"],
  ["Model", "B2B SaaS"], ["Location", "Bengaluru, India"],
  ["Team size", "28"], ["Website", "lumenai.example.com"],
  ["Incubator", "StartupHub Labs"], ["Stage", "Growth"],
];

const team = [
  { name: "Ravi Sharma", role: "Co-founder & CEO", scope: "Admin" },
  { name: "Ananya Rao", role: "Co-founder & CPO", scope: "Admin" },
  { name: "Vikash Jha", role: "Co-founder & CTO", scope: "Editor" },
  { name: "Meera Pillai", role: "Head of Agronomy", scope: "Viewer" },
];

const assessment = [
  { dim: "Product", score: 84 },
  { dim: "Market", score: 79 },
  { dim: "Team", score: 91 },
  { dim: "Traction", score: 72 },
  { dim: "Funding readiness", score: 78 },
  { dim: "IP & Legal", score: 66 },
];

export function StartupProfile() {
  return (
    <div className="space-y-5">
      <PageHeader
        title="My Startup"
        desc="Your verified identity inside the ecosystem — what investors, incubators and corporates see."
        actions={
          <Link href="/explore/startups/lumen-ai" className="inline-flex items-center gap-1.5 rounded-[10px] border border-line bg-white px-4 py-2.5 text-[13px] font-semibold text-ink hover:border-slate-300">
            View public profile <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        }
      />

      {/* identity */}
      <Card>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
          <div className="flex items-center gap-4">
            <span className="grid h-16 w-16 place-items-center rounded-2xl bg-accent text-xl font-bold text-white">LA</span>
            <div>
              <h2 className="text-xl font-semibold tracking-tight text-ink">Lumen AI</h2>
              <p className="mt-0.5 max-w-md text-[13.5px] text-slate-500">
                Vision models giving 3.2M hectares of farmland an agronomist's eye.
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                <Badge tone="good">Verified</Badge>
                <Badge tone="accent">Series A</Badge>
                <Badge>Remote sensing</Badge>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4 lg:ml-auto">
            <GaugeRing value={86} size={76} label="profile" />
            <div className="text-[12px] text-slate-400">
              <p className="font-semibold text-ink">Profile strength</p>
              <p>Missing: 2 customer videos</p>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid gap-5 lg:grid-cols-2">
        <Card title="Startup information">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-3.5">
            {details.map(([k, v]) => (
              <div key={k}>
                <dt className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">{k}</dt>
                <dd className="mt-1 text-[13.5px] font-medium text-ink">{v}</dd>
              </div>
            ))}
          </dl>
        </Card>

        <Card title="Problem & solution">
          <div className="space-y-4">
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">Problem</p>
              <p className="mt-1.5 text-[13.5px] leading-relaxed text-slate-600">
                Crop stress is detected weeks too late; field scouting covers under 5% of cultivated area.
              </p>
            </div>
            <div className="rounded-xl bg-accent-mist p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-accent">Solution</p>
              <p className="mt-1.5 text-[13.5px] leading-relaxed text-slate-700">
                Multispectral vision models flag stress at per-acre resolution 10–14 days early, with treatment maps to field teams.
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* team + assessment */}
      <div className="grid gap-5 lg:grid-cols-2">
        <Card
          title="Team management"
          action={<button className="flex items-center gap-1.5 rounded-lg bg-accent px-3 py-1.5 text-[12px] font-semibold text-white hover:bg-accent-deep"><Users className="h-3.5 w-3.5" /> Invite member</button>}
          pad={false}
        >
          <ul className="divide-y divide-line">
            {team.map((m) => (
              <li key={m.name} className="flex items-center gap-3 px-5 py-3.5">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent-soft text-[11px] font-bold text-accent">
                  {m.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13.5px] font-semibold text-ink">{m.name}</p>
                  <p className="truncate text-[11.5px] text-slate-400">{m.role}</p>
                </div>
                <Badge tone={m.scope === "Admin" ? "accent" : "default"}>{m.scope}</Badge>
              </li>
            ))}
          </ul>
        </Card>

        <Card
          title="Startup assessment"
          action={<Badge tone="warn">2 gaps</Badge>}
        >
          <div className="space-y-3.5">
            {assessment.map((a) => (
              <div key={a.dim} className="flex items-center gap-3">
                <span className="w-32 shrink-0 text-[12.5px] font-medium text-slate-600">{a.dim}</span>
                <Progress value={a.score} tone={a.score < 70 ? "warn" : "accent"} className="flex-1" />
                <span className="w-8 text-right text-[12.5px] font-semibold tabular-nums text-ink">{a.score}</span>
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50/60 p-4">
            <p className="text-[12.5px] font-semibold text-ink">Recommended focus</p>
            <p className="mt-1 text-[12px] leading-relaxed text-slate-600">
              IP &amp; Legal is your weakest dimension — complete the trademark for the v2 product name and the ongoing patent claims review to lift it.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
