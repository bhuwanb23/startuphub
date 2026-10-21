import {
  ArrowUpRight,
  Award,
  Briefcase,
  CheckCircle2,
  GraduationCap,
  Sparkles,
  Users,
} from "lucide-react";
import Link from "next/link";
import {
  Badge,
  Card,
  GaugeRing,
  PageHeader,
  Progress,
  Stat,
} from "@/components/app/widgets";

const founderDetails = [
  ["Founded", "Mar 2023"],
  ["Industry", "AgriTech · Applied AI"],
  ["Model", "B2B SaaS"],
  ["Location", "Bengaluru, India"],
  ["Team size", "28"],
  ["Website", "lumenai.example.com"],
  ["Incubator", "StartupHub Labs"],
  ["Stage", "Growth"],
];

const founderTeam = [
  { name: "Ravi Sharma", role: "Co-founder & CEO", scope: "Admin" },
  { name: "Ananya Rao", role: "Co-founder & CPO", scope: "Admin" },
  { name: "Vikash Jha", role: "Co-founder & CTO", scope: "Editor" },
  { name: "Meera Pillai", role: "Head of Agronomy", scope: "Viewer" },
];

/* ── Founder background ─────────────────────────────────────
   The experience a reviewer checks before taking a first
   meeting.                                                          */
const background = [
  { role: "Co-founder & CEO", org: "Lumen AI", period: "2023 — present", note: "Company building" },
  { role: "Head of Product", org: "Kisan Analytics", period: "2020 — 2023", note: "Satellite crop analytics" },
  { role: "Senior PM", org: "DeHaat", period: "2017 — 2020", note: "Agri input marketplace" },
];

const education = [
  { degree: "M.Tech, Agricultural Engineering", org: "IIT Kharagpur", year: "2017" },
  { degree: "B.Tech, Computer Science", org: "NIT Surathkal", year: "2015" },
];

const expertise = [
  { skill: "Remote sensing & crop modelling", level: 92 },
  { skill: "Product & go-to-market", level: 84 },
  { skill: "Agronomy domain depth", level: 78 },
  { skill: "Fundraising & investor relations", level: 71 },
  { skill: "Team building & hiring", level: 76 },
];

const trackRecord = [
  { year: "2025", event: "Closed ₹42Cr Series A led by Peak XV" },
  { year: "2024", event: "3.2M hectares under monitoring" },
  { year: "2024", event: "DPIIT recognition granted" },
  { year: "2023", event: "Founded Lumen AI at StartupHub Labs" },
];

const ecosystem = [
  { name: "StartupHub Labs", role: "Cohort 2023 · Mentor-backed", tone: "accent" as const },
  { name: "Peak XV", role: "Lead investor · Series A", tone: "good" as const },
  { name: "ICAR Research", role: "Agronomy validation partner", tone: "good" as const },
  { name: "AgriTech Forum", role: "Founding cohort member", tone: "default" as const },
];

const profileChecklist = [
  { item: "Company identity and story", done: true },
  { item: "Founding team and roles", done: true },
  { item: "Product demo (3 min)", done: true },
  { item: "Two customer testimonials", done: false },
  { item: "Two customer videos", done: false },
  { item: "Cap table and ESOP summary", done: true },
];

export function FounderProfile() {
  const completeness = Math.round(
    (profileChecklist.filter((c) => c.done).length / profileChecklist.length) * 100,
  );

  return (
    <div className="space-y-5">
      <PageHeader
        title="Founder Profile"
        desc="Your verified identity inside the ecosystem — what investors, incubators and corporates see."
        actions={
          <Link
            href="/explore/startups/lumen-ai"
            className="inline-flex items-center gap-1.5 rounded-[10px] border border-line bg-white px-4 py-2.5 text-[13px] font-semibold text-ink hover:border-slate-300"
          >
            View public profile <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        }
      />

      {/* 1 — Identity */}
      <Card>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
          <div className="flex items-center gap-4">
            <span className="grid h-16 w-16 place-items-center rounded-2xl bg-accent text-xl font-bold text-white">
              LA
            </span>
            <div>
              <h2 className="text-xl font-semibold tracking-tight text-ink">Lumen AI</h2>
              <p className="mt-0.5 max-w-md text-[13.5px] text-slate-500">
                Vision models giving 3.2M hectares of farmland an agronomist&apos;s eye.
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

      {/* 2 — Headline metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat icon={Briefcase} label="Founder since" value="Mar 2023" hint="3.5 years" tone="default" />
        <Stat icon={Users} label="Team size" value="28" hint="4 co-founders" tone="default" />
        <Stat icon={Award} label="Funding raised" value="₹42Cr" hint="Series A" tone="good" />
        <Stat icon={CheckCircle2} label="Profile complete" value={`${completeness}%`} delta="4 of 6 done" tone="warn" />
      </div>

      {/* 3 — Startup information */}
      <div className="grid gap-5 lg:grid-cols-2">
        <Card title="Startup information">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-3.5">
            {founderDetails.map(([k, v]) => (
              <div key={k}>
                <dt className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                  {k}
                </dt>
                <dd className="mt-1 text-[13.5px] font-medium text-ink">{v}</dd>
              </div>
            ))}
          </dl>
        </Card>

        <Card title="Problem & solution">
          <div className="space-y-4">
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                Problem
              </p>
              <p className="mt-1.5 text-[13.5px] leading-relaxed text-slate-600">
                Crop stress is detected weeks too late; field scouting covers under
                5% of cultivated area.
              </p>
            </div>
            <div className="rounded-xl bg-accent-mist p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-accent">
                Solution
              </p>
              <p className="mt-1.5 text-[13.5px] leading-relaxed text-slate-700">
                Multispectral vision models flag stress at per-acre resolution
                10–14 days early, with treatment maps to field teams.
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* 4 — Team management */}
      <Card
        title="Team management"
        action={
          <button className="flex items-center gap-1.5 rounded-lg bg-accent px-3 py-1.5 text-[12px] font-semibold text-white hover:bg-accent-deep">
            <Users className="h-3.5 w-3.5" /> Invite member
          </button>
        }
        pad={false}
      >
        <ul className="divide-y divide-line">
          {founderTeam.map((m) => (
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

      {/* 5 — Founder background */}
      <Card title="Founder background" action={<Badge tone="accent">3 roles</Badge>} pad={false}>
        <ul className="divide-y divide-line">
          {background.map((b) => (
            <li key={b.org} className="flex flex-wrap items-center gap-4 px-5 py-4">
              <div className="min-w-0 flex-1">
                <p className="text-[13.5px] font-semibold text-ink">{b.role}</p>
                <p className="mt-0.5 text-[11.5px] text-slate-400">
                  {b.org} · {b.note}
                </p>
              </div>
              <span className="text-[12px] text-slate-500">{b.period}</span>
            </li>
          ))}
        </ul>
      </Card>

      {/* 6 — Education */}
      <Card title="Education" action={<GraduationCap className="h-4 w-4 text-slate-300" />} pad={false}>
        <ul className="divide-y divide-line">
          {education.map((e) => (
            <li key={e.degree} className="flex flex-wrap items-center gap-4 px-5 py-3.5">
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-semibold text-ink">{e.degree}</p>
                <p className="mt-0.5 text-[11.5px] text-slate-400">{e.org}</p>
              </div>
              <span className="text-[12px] text-slate-500">{e.year}</span>
            </li>
          ))}
        </ul>
      </Card>

      {/* 7 — Expertise */}
      <Card title="Expertise" action={<Badge tone="default">5 areas</Badge>}>
        <div className="space-y-3.5">
          {expertise.map((e) => (
            <div key={e.skill} className="flex items-center gap-3">
              <span className="w-48 shrink-0 text-[12.5px] font-medium text-slate-600">
                {e.skill}
              </span>
              <Progress
                value={e.level}
                tone={e.level >= 80 ? "good" : e.level >= 75 ? "accent" : "warn"}
                className="flex-1"
              />
              <span className="w-8 text-right text-[12.5px] font-semibold tabular-nums text-ink">
                {e.level}
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* 8 — Ecosystem ties */}
      <Card title="Ecosystem ties" action={<Badge tone="accent">4 relationships</Badge>} pad={false}>
        <ul className="divide-y divide-line">
          {ecosystem.map((e) => (
            <li key={e.name} className="flex flex-wrap items-center gap-3 px-5 py-3.5">
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-semibold text-ink">{e.name}</p>
                <p className="mt-0.5 text-[11.5px] text-slate-400">{e.role}</p>
              </div>
              <Badge tone={e.tone === "good" ? "good" : e.tone === "accent" ? "accent" : "default"}>
                {e.tone === "good" ? "Verified" : e.tone === "accent" ? "Active" : "Member"}
              </Badge>
            </li>
          ))}
        </ul>
      </Card>

      {/* 9 — Track record + checklist */}
      <div className="grid gap-5 lg:grid-cols-2">
        <Card title="Track record" pad={false}>
          <ul className="divide-y divide-line">
            {trackRecord.map((t) => (
              <li key={t.event} className="flex items-start gap-4 px-5 py-3.5">
                <span className="w-12 shrink-0 text-[12px] font-semibold tabular-nums text-accent">
                  {t.year}
                </span>
                <p className="min-w-0 flex-1 text-[12.5px] leading-relaxed text-slate-600">
                  {t.event}
                </p>
              </li>
            ))}
          </ul>
        </Card>

        <Card
          title="Profile completeness"
          action={<Badge tone="warn">2 items left</Badge>}
          pad={false}
        >
          <ul className="divide-y divide-line">
            {profileChecklist.map((c) => (
              <li key={c.item} className="flex items-center gap-3 px-5 py-3.5">
                <span
                  className={`grid h-5 w-5 shrink-0 place-items-center rounded-full text-[10px] font-bold ${
                    c.done ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                  }`}
                >
                  {c.done ? "✓" : "!"}
                </span>
                <p className="min-w-0 flex-1 text-[12.5px] text-slate-600">{c.item}</p>
              </li>
            ))}
          </ul>
          <div className="border-t border-line px-5 py-3.5">
            <div className="flex items-start gap-2.5">
              <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <p className="text-[12px] leading-relaxed text-slate-600">
                <span className="font-semibold text-ink">Copilot:</span> Two customer
                videos are the only missing item that investors explicitly ask
                for in first meetings.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
