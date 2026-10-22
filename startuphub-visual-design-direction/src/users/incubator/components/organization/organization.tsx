import {
  Activity,
  ArrowUpRight,
  Award,
  Building2,
  CheckCircle2,
  CircleAlert,
  FileText,
  Globe2,
  Layers,
  MapPin,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import Link from "next/link";
import { Badge, Card, PageHeader, Progress, Stat } from "@/components/app/widgets";
import {
  ORG_ACCREDITATIONS,
  ORG_CAMPUS,
  ORG_DETAILS,
  ORG_FACILITIES,
  ORG_KPIS,
  ORG_PARTNERS,
  ORG_PROGRAMS,
  ORG_VISION,
} from "../../constants/organization-data";

/* My Organization — StartupHub Labs' identity inside the ecosystem.
   Profile, credentials, portfolio, infrastructure and partners. */
export function Organization() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="My Organization"
        desc="StartupHub Labs' identity inside the ecosystem — profile, portfolio, infrastructure and partnerships."
        actions={
          <button className="inline-flex items-center gap-1.5 rounded-[10px] border border-line bg-white px-4 py-2.5 text-[13px] font-semibold text-ink transition-colors hover:bg-soft">
            <Globe2 className="h-3.5 w-3.5 text-slate-400" /> Public profile
          </button>
        }
      />

      {/* ── 01 · Identity ─────────────────────────────────────── */}
      <Card>
        <div className="flex flex-col gap-7 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex items-start gap-5">
            <span className="grid h-20 w-20 shrink-0 place-items-center rounded-2xl bg-ink text-[22px] font-bold tracking-tight text-white">
              SL
            </span>
            <div className="max-w-2xl">
              <div className="flex flex-wrap items-center gap-2.5">
                <h2 className="text-[26px] font-semibold tracking-[-0.025em] text-ink">
                  StartupHub Labs
                </h2>
                <Badge tone="good">
                  <ShieldCheck className="h-3 w-3" /> Verified partner
                </Badge>
              </div>
              <p className="mt-1.5 font-mono text-[10px] tracking-[0.14em] text-slate-400 uppercase">
                Bengaluru · Est. 2021 · Multi-sector incubation flagship
              </p>
              <p className="mt-3.5 text-[14px] leading-relaxed text-slate-500">
                We run 16-week programs that take a validated idea to a
                fundable company — 240 startups so far, 86% of which are still
                operating three years later.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Badge tone="accent">Deep-tech friendly</Badge>
                <Badge>Non-dilutive first 6 weeks</Badge>
                <Badge>240 startups incubated</Badge>
              </div>
            </div>
          </div>

          {/* connected-ecosystem signature: org at the centre of its network */}
          <div className="w-full shrink-0 rounded-xl border border-line bg-soft p-5 lg:w-[260px]">
            <p className="font-mono text-[9px] tracking-[0.18em] text-slate-400 uppercase">
              Ecosystem position
            </p>
            <div className="relative mt-4 h-[124px]">
              <svg
                className="absolute inset-0 h-full w-full"
                viewBox="0 0 220 124"
                fill="none"
                aria-hidden="true"
              >
                <g stroke="#3157E8" strokeOpacity="0.28" strokeWidth="1.2" strokeDasharray="3 6">
                  <path d="M110 62 L28 20" />
                  <path d="M110 62 L192 20" />
                  <path d="M110 62 L28 104" />
                  <path d="M110 62 L192 104" />
                  <path d="M110 62 L110 12" />
                </g>
                <g fill="#3157E8">
                  <circle cx="28" cy="20" r="3.5" />
                  <circle cx="192" cy="20" r="3.5" />
                  <circle cx="28" cy="104" r="3.5" />
                  <circle cx="192" cy="104" r="3.5" />
                  <circle cx="110" cy="12" r="3.5" />
                </g>
                <circle cx="110" cy="62" r="9" fill="#0B1220" />
              </svg>
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-8 text-[10px] font-semibold text-ink">
                You
              </span>
              <span className="absolute left-1 top-0 text-[9.5px] text-slate-500">Mentors</span>
              <span className="absolute right-0 top-0 text-[9.5px] text-slate-500">Investors</span>
              <span className="absolute bottom-0 left-1 text-[9.5px] text-slate-500">Founders</span>
              <span className="absolute bottom-0 right-0 text-[9.5px] text-slate-500">Corporates</span>
            </div>
            <p className="mt-3 text-[11.5px] leading-snug text-slate-400">
              Connected to 4 ecosystem roles · 61 active relationships
            </p>
          </div>
        </div>
      </Card>

      {/* ── 02 · KPI strip ────────────────────────────────────── */}
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        {ORG_KPIS.map((k) => (
          <Stat
            key={k.label}
            icon={k.tone === "good" ? Activity : k.tone === "accent" ? Layers : Target}
            label={k.label}
            value={k.value}
            delta={k.note}
            tone={k.tone === "accent" ? "good" : k.tone}
          />
        ))}
      </div>

      {/* ── 03 · Details + vision ────────────────────────────── */}
      <div className="grid gap-5 lg:grid-cols-5">
        <Card title="Organization details" className="lg:col-span-2">
          <dl className="divide-y divide-line">
            {ORG_DETAILS.map((d) => (
              <div key={d.label} className="flex items-baseline justify-between gap-4 py-2.5 first:pt-0 last:pb-0">
                <dt className="shrink-0 font-mono text-[9.5px] tracking-[0.12em] text-slate-400 uppercase">
                  {d.label}
                </dt>
                <dd className="text-right text-[13px] font-medium leading-snug text-ink">
                  {d.value}
                </dd>
              </div>
            ))}
          </dl>
        </Card>

        <Card className="lg:col-span-3">
          <div className="flex items-start gap-4">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
              <Sparkles className="h-5 w-5" />
            </span>
            <div>
              <p className="font-mono text-[9.5px] tracking-[0.18em] text-accent uppercase">
                What we believe
              </p>
              <p className="mt-2 max-w-2xl text-[17px] leading-[1.45] font-medium tracking-[-0.015em] text-ink">
                {ORG_VISION.statement}
              </p>
            </div>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {ORG_VISION.pillars.map((p, i) => (
              <div
                key={p.title}
                className="group rounded-xl border border-line p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-soft"
              >
                <span className="font-mono text-[10px] font-semibold tracking-[0.14em] text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-2 text-[13.5px] font-semibold tracking-tight text-ink">
                  {p.title}
                </p>
                <p className="mt-1.5 text-[12.5px] leading-relaxed text-slate-500">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* ── 04 · Program portfolio ────────────────────────────── */}
      <Card
        title="Program portfolio"
        action={
          <Link
            href="/incubator/programs"
            className="flex items-center gap-1 text-[12.5px] font-semibold text-accent"
          >
            All programs <ArrowUpRight className="h-3 w-3" />
          </Link>
        }
        pad={false}
      >
        <ul className="divide-y divide-line">
          {ORG_PROGRAMS.map((p) => (
            <li
              key={p.name}
              className="group flex flex-wrap items-center gap-4 px-5 py-4 transition-colors hover:bg-soft"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent">
                <Layers className="h-4 w-4" />
              </span>
              <div className="min-w-[220px] flex-1">
                <p className="text-[13.5px] font-semibold text-ink">{p.name}</p>
                <p className="mt-0.5 text-[11.5px] text-slate-400">{p.track}</p>
              </div>
              <div className="flex items-center gap-6 text-[12px] text-slate-500">
                <span>
                  <b className="font-semibold text-ink">{p.startups}</b> startups
                </span>
                <span>
                  <b className="font-semibold text-ink">{p.weeks}</b> weeks
                </span>
              </div>
              <Badge tone={p.tone}>{p.status}</Badge>
            </li>
          ))}
        </ul>
      </Card>

      {/* ── 05 · Facilities ───────────────────────────────────── */}
      <div className="grid gap-5 lg:grid-cols-2">
        <Card title="Facilities & infrastructure" sub="Bays, desks and rooms available to incubated startups">
          <ul className="space-y-4">
            {ORG_FACILITIES.map((f) => (
              <li key={f.name}>
                <div className="flex items-baseline justify-between gap-3">
                  <p className="text-[13px] font-semibold text-ink">{f.name}</p>
                  <span className="font-mono text-[10.5px] text-slate-400">
                    {f.capacity}
                  </span>
                </div>
                <p className="mt-0.5 text-[12px] text-slate-500">{f.detail}</p>
                <div className="mt-2 flex items-center gap-2.5">
                  <Progress
                    value={f.utilisation}
                    tone={f.utilisation > 84 ? "warn" : "accent"}
                    className="flex-1"
                  />
                  <span className="w-9 text-right text-[11.5px] font-semibold tabular-nums text-ink">
                    {f.utilisation}%
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </Card>

        <Card
          title="Accreditations & compliance"
          action={<Badge tone="warn">2 need attention</Badge>}
        >
          <ul className="space-y-3">
            {ORG_ACCREDITATIONS.map((a) => (
              <li
                key={a.body}
                className="flex items-start gap-3 rounded-xl border border-line p-3.5 transition-colors hover:border-accent/25"
              >
                {a.tone === "good" ? (
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-rise" />
                ) : a.tone === "warn" ? (
                  <CircleAlert className="mt-0.5 h-4 w-4 shrink-0 text-amber-dim" />
                ) : (
                  <Activity className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                )}
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-semibold text-ink">{a.body}</p>
                  <p className="mt-0.5 text-[11.5px] text-slate-400">
                    {a.status} · {a.validTill}
                  </p>
                </div>
                <Badge tone={a.tone}>{a.status}</Badge>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* ── 06 · Ecosystem partners ───────────────────────────── */}
      <Card
        title="Ecosystem partners"
        sub="The relationships that make the platform worth joining"
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {ORG_PARTNERS.map((p) => (
            <div
              key={p.name}
              className="group rounded-xl border border-line p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-soft"
            >
              <div className="flex items-start justify-between gap-3">
                <p className="text-[13.5px] font-semibold text-ink">{p.name}</p>
                <span className="shrink-0 rounded-md bg-soft px-1.5 py-0.5 font-mono text-[9.5px] text-slate-400">
                  {p.since}
                </span>
              </div>
              <p className="mt-1 text-[11.5px] text-accent">{p.kind}</p>
              <p className="mt-2.5 border-t border-line pt-2.5 text-[12px] leading-relaxed text-slate-500">
                {p.contribution}
              </p>
            </div>
          ))}
        </div>
      </Card>

      {/* ── 07 · Campuses ─────────────────────────────────────── */}
      <Card title="Campuses" sub="Where we operate">
        <div className="grid gap-4 sm:grid-cols-3">
          {ORG_CAMPUS.map((c) => (
            <div
              key={c.city}
              className="rounded-xl border border-line p-4 transition-colors hover:border-accent/25"
            >
              <div className="flex items-center gap-2.5">
                <MapPin className="h-4 w-4 text-accent" />
                <p className="text-[14px] font-semibold tracking-tight text-ink">
                  {c.city}
                </p>
                {c.flagship && <Badge tone="accent">Flagship</Badge>}
              </div>
              <p className="mt-1.5 text-[12px] text-slate-500">{c.address}</p>
              <p className="mt-3 font-mono text-[10px] tracking-[0.1em] text-slate-400 uppercase">
                {c.seats} seats · since {c.opened}
              </p>
            </div>
          ))}
        </div>
      </Card>

      {/* ── 08 · Recognition ──────────────────────────────────── */}
      <Card
        title="Recognition"
        sub="Marks that let startups trust us with theirs"
        action={
          <span className="flex items-center gap-1.5 text-[12px] font-semibold text-slate-400">
            <Award className="h-3.5 w-3.5" /> 9 since 2021
          </span>
        }
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: ShieldCheck, title: "DPIIT recognised incubator", note: "Since 2021" },
            { icon: Award, title: "Atal Innovation Mission awardee", note: "Top 12, 2024" },
            { icon: Users, title: "Best mentor engagement — South", note: "Incubator Awards 2025" },
            { icon: Building2, title: "NASSCOM member", note: "Since 2022" },
            { icon: Target, title: "86% three-year survival rate", note: "vs 71% network average" },
            { icon: FileText, title: "1,840 jobs created for portfolio", note: "Cumulative" },
          ].map((r) => (
            <div
              key={r.title}
              className="flex items-start gap-3 rounded-xl border border-line p-4 transition-colors hover:border-accent/25"
            >
              <r.icon className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <div>
                <p className="text-[13px] font-semibold leading-snug text-ink">
                  {r.title}
                </p>
                <p className="mt-1 text-[11.5px] text-slate-400">{r.note}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* ── 09 · Where to go next ─────────────────────────────── */}
      <Card title="Where to go next" sub="The three things most teams touch first">
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            {
              href: "/incubator/organization/team",
              title: "Add a team member",
              body: "Invite staff, set their scope and give them the right access.",
              icon: Users,
            },
            {
              href: "/incubator/organization/roles",
              title: "Review roles & permissions",
              body: "Eight roles, one permission matrix, full audit trail.",
              icon: ShieldCheck,
            },
            {
              href: "/incubator/organization/documents",
              title: "Publish a document",
              body: "Policies, agreements and templates with expiry tracking.",
              icon: FileText,
            },
          ].map((a) => (
            <Link
              key={a.href}
              href={a.href}
              className="group rounded-xl border border-line p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-soft"
            >
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-accent-soft text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                <a.icon className="h-4 w-4" />
              </span>
              <p className="mt-3 text-[13.5px] font-semibold text-ink">{a.title}</p>
              <p className="mt-1.5 text-[12.5px] leading-relaxed text-slate-500">
                {a.body}
              </p>
              <span className="mt-3 inline-flex items-center gap-1 text-[12px] font-semibold text-accent">
                Open <ArrowUpRight className="h-3 w-3" />
              </span>
            </Link>
          ))}
        </div>
      </Card>
    </div>
  );
}
