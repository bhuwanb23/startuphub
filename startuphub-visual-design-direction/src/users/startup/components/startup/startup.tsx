import {
  ArrowUpRight,
  Building2,
  FileText,
  MapPin,
  TrendingUp,
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

const details = [
  ["Founded", "Mar 2023"],
  ["Industry", "AgriTech · Applied AI"],
  ["Model", "B2B SaaS"],
  ["Location", "Bengaluru, India"],
  ["Team size", "28"],
  ["Website", "lumenai.example.com"],
  ["Incubator", "StartupHub Labs"],
  ["Stage", "Growth"],
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

/* ── Company traction ──────────────────────────────────────
   The numbers a corporate or investor screen looks for
   first.                                                          */
const traction = [
  { metric: "Hectares under monitoring", value: "3.2M", delta: "+1.1M this year" },
  { metric: "Paid pilot accounts", value: "3", delta: "1 renewed" },
  { metric: "Average revenue per acre", value: "₹215", delta: "+40% vs. plan" },
  { metric: "Agri belts live", value: "4", delta: "Karnataka in progress" },
];

const locations = [
  { city: "Bengaluru", role: "Headquarters", people: 19, tone: "good" as const },
  { city: "Pune", role: "Field operations", people: 6, tone: "accent" as const },
  { city: "Ludhiana", role: "Agronomy research", people: 3, tone: "accent" as const },
];

const assets = [
  { name: "Company deck (v7)", type: "PDF", status: "Current", tone: "good" as const },
  { name: "Product demo — 3 min", type: "Video", status: "Missing", tone: "warn" as const },
  { name: "Financial model 2026", type: "Sheet", status: "Current", tone: "good" as const },
  { name: "Customer testimonials", type: "Doc", status: "Partial", tone: "accent" as const },
  { name: "ISO 27001 gap analysis", type: "PDF", status: "Current", tone: "good" as const },
];

const integrations = [
  { name: "ISRO Bhuvan", use: "Sentinel-2 & Landsat imagery", state: "Connected", tone: "good" as const },
  { name: "IMD weather API", use: "Seasonal stress forecasts", state: "Connected", tone: "good" as const },
  { name: "ICAR research", use: "Ground-truth agronomy labels", state: "Partner", tone: "accent" as const },
  { name: "Agri ERP (Tally)", use: "Revenue reconciliation", state: "Planned", tone: "default" as const },
];

export function StartupProfile() {
  return (
    <div className="space-y-5">
      <PageHeader
        title="My Startup"
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

      {/* 1 — Headline metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat icon={Building2} label="Stage" value="Growth" hint="Series A raised" tone="default" />
        <Stat icon={Users} label="Team size" value="28" delta="+6 this year" tone="good" />
        <Stat icon={TrendingUp} label="Hectares monitored" value="3.2M" delta="+1.1M this year" tone="good" />
        <Stat icon={MapPin} label="Locations" value="3" hint="2 in India" tone="default" />
      </div>

      {/* 2 — Identity */}
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

      {/* 3 — Startup information + problem/solution */}
      <div className="grid gap-5 lg:grid-cols-2">
        <Card title="Startup information">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-3.5">
            {details.map(([k, v]) => (
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

      {/* 4 — Traction */}
      <Card title="Traction" action={<Badge tone="accent">Last 12 months</Badge>}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {traction.map((t) => (
            <div key={t.metric} className="rounded-xl border border-line p-4">
              <p className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                {t.metric}
              </p>
              <p className="mt-1 text-xl font-semibold text-ink tabular-nums">{t.value}</p>
              <p className="mt-1 text-[11.5px] text-emerald-600">{t.delta}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* 5 — Locations */}
      <Card title="Locations" action={<MapPin className="h-4 w-4 text-slate-300" />} pad={false}>
        <ul className="divide-y divide-line">
          {locations.map((l) => (
            <li key={l.city} className="flex flex-wrap items-center gap-4 px-5 py-3.5">
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-semibold text-ink">{l.city}</p>
                <p className="mt-0.5 text-[11.5px] text-slate-400">{l.role}</p>
              </div>
              <span className="text-[12px] text-slate-500">{l.people} people</span>
              <Badge tone={l.tone === "good" ? "good" : "accent"}>
                {l.tone === "good" ? "HQ" : "Site"}
              </Badge>
            </li>
          ))}
        </ul>
      </Card>

      {/* 6 — Team + assessment */}
      <div className="grid gap-5 lg:grid-cols-2">
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

        <Card title="Startup assessment" action={<Badge tone="warn">2 gaps</Badge>}>
          <div className="space-y-3.5">
            {assessment.map((a) => (
              <div key={a.dim} className="flex items-center gap-3">
                <span className="w-32 shrink-0 text-[12.5px] font-medium text-slate-600">
                  {a.dim}
                </span>
                <Progress value={a.score} tone={a.score < 70 ? "warn" : "accent"} className="flex-1" />
                <span className="w-8 text-right text-[12.5px] font-semibold tabular-nums text-ink">
                  {a.score}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50/60 p-4">
            <p className="text-[12.5px] font-semibold text-ink">Recommended focus</p>
            <p className="mt-1 text-[12px] leading-relaxed text-slate-600">
              IP &amp; Legal is your weakest dimension — complete the trademark for
              the v2 product name and the ongoing patent claims review to lift it.
            </p>
          </div>
        </Card>
      </div>

      {/* 7 — Documents & media */}
      <Card
        title="Documents & media"
        action={<FileText className="h-4 w-4 text-slate-300" />}
        pad={false}
      >
        <ul className="divide-y divide-line">
          {assets.map((a) => (
            <li key={a.name} className="flex flex-wrap items-center gap-4 px-5 py-3.5">
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-semibold text-ink">{a.name}</p>
                <p className="mt-0.5 text-[11.5px] text-slate-400">{a.type}</p>
              </div>
              <Badge
                tone={a.tone === "good" ? "good" : a.tone === "accent" ? "accent" : "warn"}
              >
                {a.status}
              </Badge>
            </li>
          ))}
        </ul>
      </Card>

      {/* 8 — Integrations */}
      <Card title="Data & integrations" action={<Badge tone="default">4 connections</Badge>} pad={false}>
        <ul className="divide-y divide-line">
          {integrations.map((i) => (
            <li key={i.name} className="flex flex-wrap items-center gap-4 px-5 py-3.5">
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-semibold text-ink">{i.name}</p>
                <p className="mt-0.5 text-[11.5px] text-slate-400">{i.use}</p>
              </div>
              <Badge
                tone={i.tone === "good" ? "good" : i.tone === "accent" ? "accent" : "default"}
              >
                {i.state}
              </Badge>
            </li>
          ))}
        </ul>
      </Card>

      {/* 9 — Where to go next */}
      <Card title="Where to go next">
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            {
              label: "Founder Profile",
              href: "/founder/startup/founder-profile",
              body: "Your background, expertise and the public profile investors see.",
            },
            {
              label: "Startup Assessment",
              href: "/founder/startup/assessment",
              body: "Dimension-by-dimension scoring against the Stage A cohort.",
            },
            {
              label: "Team Management",
              href: "/founder/startup/team",
              body: "Members, roles and what each person can change.",
            },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group rounded-xl border border-line p-4 transition-colors hover:border-accent"
            >
              <p className="flex items-center gap-1.5 text-[13px] font-semibold text-ink">
                {link.label}
                <ArrowUpRight className="h-3.5 w-3.5 text-accent transition-transform group-hover:translate-x-0.5" />
              </p>
              <p className="mt-1 text-[12px] leading-relaxed text-slate-500">{link.body}</p>
            </Link>
          ))}
        </div>
      </Card>
    </div>
  );
}
