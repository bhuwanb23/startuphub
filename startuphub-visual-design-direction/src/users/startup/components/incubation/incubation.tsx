import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  Plus,
  Sparkles,
  TrendingUp,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import { Badge, Card, PageHeader, Progress, Stat } from "@/components/app/widgets";
import {
  activityFeed,
  applicationMaterials,
  applications,
  benefitUsage,
  deadlines,
  pipelineStages,
  recommendedPrograms,
} from "@/users/startup/constants/incubation-data";

export function Incubation() {
  return (
    <div className="space-y-5">
      <PageHeader
        title="Applications"
        desc="Every program you have applied to, what is still outstanding, and where the next decision sits."
        actions={
          <Link
            href="/founder/incubation/discover"
            className="inline-flex items-center gap-1.5 rounded-[10px] bg-accent px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-accent-deep"
          >
            <Plus className="h-3.5 w-3.5" /> Discover programs
          </Link>
        }
      />

      {/* 1 — Headline metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat icon={ClipboardCheck} label="Active applications" value="3" hint="1 draft not yet sent" tone="default" />
        <Stat icon={CheckCircle2} label="Accepted" value="1" delta="₹12L program value" tone="good" />
        <Stat icon={TrendingUp} label="Acceptance rate" value="68%" delta="+9 vs. last year" tone="good" />
        <Stat icon={Wallet} label="Benefits unlocked" value="₹5.4L" hint="across 1 active program" tone="default" />
      </div>

      {/* 2 — My applications */}
      <Card
        title="My applications"
        action={<Badge tone="accent">{applications.length} in flight</Badge>}
        pad={false}
      >
        <ul className="divide-y divide-line">
          {applications.map((a) => (
            <li key={a.id} className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-[14px] font-semibold text-ink">{a.program}</p>
                  <Badge tone={a.tone}>{a.status}</Badge>
                </div>
                <p className="mt-0.5 text-[12px] text-slate-400">
                  {a.org} · applied {a.applied} · decision by {a.decision}
                </p>
                <p className="mt-1 text-[12px] font-medium text-accent">{a.next}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {Array.from({ length: a.stages }).map((_, i) => (
                    <span
                      key={i}
                      className={`h-1.5 w-6 rounded-full ${i < a.stage ? "bg-accent" : "bg-slate-100"}`}
                    />
                  ))}
                </div>
                <span className="w-16 text-right text-[12px] font-semibold tabular-nums text-ink">
                  {a.value}
                </span>
                <span className="w-14 text-right text-[11.5px] font-semibold tabular-nums text-accent">
                  {a.fit}% fit
                </span>
              </div>
            </li>
          ))}
        </ul>
      </Card>

      {/* 3 — Pipeline funnel */}
      <Card title="Application pipeline" action={<Badge tone="default">5 stages</Badge>}>
        <div className="grid gap-3 sm:grid-cols-5">
          {pipelineStages.map((s) => (
            <div key={s.stage} className="rounded-xl border border-line p-3.5">
              <div className="flex items-baseline justify-between">
                <span className="text-[22px] font-semibold leading-none tabular-nums text-ink">
                  {s.count}
                </span>
                <span className="text-[10.5px] text-slate-400">avg {s.avg}</span>
              </div>
              <p className="mt-2 text-[12.5px] font-semibold text-ink">{s.stage}</p>
              <p className="mt-0.5 text-[11px] text-slate-400">{s.note}</p>
              <Progress
                value={(s.count / 3) * 100}
                tone={s.stage === "Decision" ? "good" : "accent"}
                className="mt-3"
              />
            </div>
          ))}
        </div>
      </Card>

      {/* 4 — Deadlines */}
      <Card
        title="Upcoming deadlines"
        action={<CalendarDays className="h-4 w-4 text-slate-300" />}
        pad={false}
      >
        <ul className="divide-y divide-line">
          {deadlines.map((d) => (
            <li key={d.title} className="flex flex-wrap items-center gap-4 px-5 py-3.5">
              <div className="w-24 shrink-0">
                <p className="text-[13px] font-semibold tabular-nums text-ink">{d.date}</p>
                <p className="text-[11px] text-slate-400">{d.days}</p>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-medium text-ink">{d.title}</p>
                <p className="mt-0.5 text-[12px] leading-snug text-slate-500">{d.detail}</p>
              </div>
              <Badge tone={d.tone}>{d.tone === "warn" ? "Needs prep" : d.tone === "accent" ? "Opening" : "Planned"}</Badge>
            </li>
          ))}
        </ul>
      </Card>

      {/* 5 — Recommended programs */}
      <Card
        title="Recommended programs"
        action={<span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">Fit-ranked</span>}
      >
        <ul className="grid gap-3 sm:grid-cols-2">
          {recommendedPrograms.map((r) => (
            <li
              key={r.name}
              className="rounded-xl border border-line p-4 transition-all hover:border-accent/30 hover:bg-accent-mist/40"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-[13.5px] font-semibold text-ink">{r.name}</p>
                <span className="shrink-0 rounded-full bg-accent-soft px-2.5 py-1 text-[11px] font-bold text-accent">
                  {r.fit}% fit
                </span>
              </div>
              <p className="mt-1.5 text-[12px] leading-relaxed text-slate-500">{r.note}</p>
              <p className="mt-2 text-[11px] font-semibold uppercase tracking-wide text-slate-400">{r.when}</p>
            </li>
          ))}
        </ul>
      </Card>

      {/* 6 — Benefits in use */}
      <Card title="Program benefits in use" action={<Badge tone="good">₹5.4L unlocked</Badge>}>
        <div className="space-y-4">
          {benefitUsage.map((b) => {
            const pct = Math.round((b.used / b.total) * 100);
            return (
              <div key={b.label}>
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-[12.5px] font-medium text-slate-600">{b.label}</span>
                  <span className="text-[12px] font-semibold tabular-nums text-ink">
                    {b.used}
                    {b.unit} / {b.total}
                    {b.unit}
                  </span>
                </div>
                <Progress value={pct} tone={pct > 85 ? "warn" : "accent"} className="mt-2" />
              </div>
            );
          })}
        </div>
        <p className="mt-4 rounded-xl bg-accent-mist p-3.5 text-[12px] leading-relaxed text-slate-600">
          <span className="font-semibold text-ink">Note:</span> mentor hours run out on Apr 30 — book the
          remaining 10 hours before the demo-day push or they lapse with the cohort.
        </p>
      </Card>

      {/* 7 — Application materials */}
      <Card
        title="Application materials"
        action={<Badge tone="warn">2 missing</Badge>}
        pad={false}
      >
        <ul className="divide-y divide-line">
          {applicationMaterials.map((m) => (
            <li key={m.name} className="flex items-center gap-3 px-5 py-3.5">
              <span
                className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg ${
                  m.tone === "good"
                    ? "bg-emerald-50 text-emerald-600"
                    : m.tone === "warn"
                      ? "bg-amber-50 text-amber-600"
                      : "bg-red-50 text-red-500"
                }`}
              >
                {m.tone === "good" ? (
                  <CheckCircle2 className="h-3.5 w-3.5" />
                ) : (
                  <FileText className="h-3.5 w-3.5" />
                )}
              </span>
              <p className="min-w-0 flex-1 truncate text-[13px] font-medium text-ink">{m.name}</p>
              <Badge tone={m.tone}>{m.state}</Badge>
            </li>
          ))}
        </ul>
      </Card>

      {/* 8 — Activity */}
      <Card title="Recent activity" pad={false}>
        <ul className="divide-y divide-line">
          {activityFeed.map((a) => (
            <li key={`${a.who}-${a.when}`} className="flex items-start gap-3 px-5 py-3.5">
              <span
                className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${
                  a.tone === "good"
                    ? "bg-emerald-500"
                    : a.tone === "accent"
                      ? "bg-accent"
                      : "bg-slate-300"
                }`}
              />
              <p className="min-w-0 flex-1 text-[12.5px] leading-relaxed text-slate-600">
                <span className="font-semibold text-ink">{a.who}</span> {a.what}
              </p>
              <span className="shrink-0 text-[11px] text-slate-400">{a.when}</span>
            </li>
          ))}
        </ul>
      </Card>

      {/* 9 — Copilot nudge */}
      <Card title="What to do next">
        <div className="flex items-start gap-3 rounded-xl bg-accent-mist p-4">
          <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
          <div>
            <p className="text-[13px] font-semibold text-ink">
              Two missing documents are blocking your AgriTech acceptance onboarding.
            </p>
            <p className="mt-1 text-[12px] leading-relaxed text-slate-600">
              The trademark filing receipt is also a hard gate for Cohort VI graduation. Both can be
              cleared with the same counsel session — worth booking before the Apr 12 panel review.
            </p>
          </div>
        </div>
      </Card>

      {/* 10 — Where to go next */}
      <Card title="Where to go next">
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            {
              label: "Discover Incubators",
              href: "/founder/incubation/discover",
              body: "Browse matched programs, compare support packages and open application windows.",
            },
            {
              label: "Incubation Workspace",
              href: "/founder/incubation/workspace",
              body: "Your cohort plan, deliverables, mentor sessions and KPI dashboard in one place.",
            },
            {
              label: "Milestones",
              href: "/founder/incubation/milestones",
              body: "The milestone register, key dates, review checkpoints and open risks.",
            },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group rounded-xl border border-line p-4 transition-colors hover:border-accent"
            >
              <p className="flex items-center gap-1.5 text-[13px] font-semibold text-ink">
                {link.label}
                <ArrowRight className="h-3.5 w-3.5 text-accent transition-transform group-hover:translate-x-0.5" />
              </p>
              <p className="mt-1 text-[12px] leading-relaxed text-slate-500">{link.body}</p>
            </Link>
          ))}
        </div>
      </Card>
    </div>
  );
}
