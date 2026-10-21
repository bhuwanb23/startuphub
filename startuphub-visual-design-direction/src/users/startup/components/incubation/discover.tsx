"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  CheckCircle2,
  MapPin,
  SlidersHorizontal,
  Sparkles,
  Trophy,
} from "lucide-react";
import Link from "next/link";
import { Badge, Card, PageHeader, Progress, Stat } from "@/components/app/widgets";
import {
  alumniOutcomes,
  applicationWindows,
  discoverLocations,
  discoverSectors,
  fitBreakdown,
  sectorTag,
  supportMatrix,
} from "@/users/startup/constants/incubation-data";
import { incubators } from "@/views/explore/incubators/constants/incubators";

/* Fit scores are computed from the founder's stated profile — sector,
   stage and facility needs — against each incubator's programme
   catalogue. Higher is a better match. */
const fitBySlug: Record<string, number> = {
  "startuphub-labs": 98,
  "cied-pune": 84,
  "t-hub-health": 52,
  "mnit-innovation-hub": 61,
  "kerala-startup-mission": 69,
  "ciie-space": 47,
};

const reasonBySlug: Record<string, string> = {
  "startuphub-labs": "Multi-sector AI track with the platform already wired in",
  "cied-pune": "Deep-tech validation track with pilot-scale hardware",
  "t-hub-health": "Health-tech only — no AgriTech programme running",
  "mnit-innovation-hub": "ICT and social impact, weaker applied-AI bench",
  "kerala-startup-mission": "Hardware-first with strong IoT testbed access",
  "ciie-space": "Space sector only, opens in three weeks",
};

const sectorOptions = discoverSectors;
const locationOptions = discoverLocations;

export function IncubatorDiscover() {
  const [sector, setSector] = useState("All sectors");
  const [location, setLocation] = useState("All locations");

  const results = useMemo(() => {
    return incubators
      .filter((inc) => {
        if (location !== "All locations" && inc.location !== location) return false;
        if (sector === "All sectors") return true;
        return sectorTag(inc.domains) === sector;
      })
      .sort((a, b) => (fitBySlug[b.slug] ?? 50) - (fitBySlug[a.slug] ?? 50));
  }, [sector, location]);

  const openNow = incubators.filter((i) => i.application !== "Opens Apr 2026").length;
  const avgFit = Math.round(
    incubators.reduce((sum, i) => sum + (fitBySlug[i.slug] ?? 50), 0) / incubators.length,
  );

  return (
    <div className="space-y-5">
      <PageHeader
        title="Discover Incubators"
        desc="Programmes matched to your stage, sector and stated goals — ranked by AI fit."
        actions={
          <Link
            href="/founder/incubation"
            className="rounded-[10px] border border-line bg-white px-4 py-2.5 text-[13px] font-semibold text-ink hover:border-slate-300"
          >
            My applications
          </Link>
        }
      />

      {/* 1 — Headline metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat icon={Building2} label="Incubators in network" value="6" hint="across 6 cities" tone="default" />
        <Stat icon={CheckCircle2} label="Accepting applications" value={String(openNow)} hint="CIIE Space opens soon" tone="good" />
        <Stat icon={Sparkles} label="Average fit" value={`${avgFit}%`} delta="+7 this month" tone="good" />
        <Stat icon={Trophy} label="Alumni funded" value="61%" hint="of incubated ventures" tone="default" />
      </div>

      {/* 2 — Filters */}
      <Card
        title="Filter programmes"
        action={<SlidersHorizontal className="h-4 w-4 text-slate-300" />}
      >
        <div className="space-y-3.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="w-20 shrink-0 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
              Sector
            </span>
            {sectorOptions.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSector(s)}
                className={`rounded-full px-3 py-1.5 text-[12px] font-semibold transition-colors ${
                  sector === s
                    ? "bg-accent text-white"
                    : "border border-line bg-white text-slate-500 hover:border-slate-300 hover:text-ink"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="w-20 shrink-0 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
              Location
            </span>
            {locationOptions.map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLocation(l)}
                className={`rounded-full px-3 py-1.5 text-[12px] font-semibold transition-colors ${
                  location === l
                    ? "bg-accent text-white"
                    : "border border-line bg-white text-slate-500 hover:border-slate-300 hover:text-ink"
                }`}
              >
                {l}
              </button>
            ))}
          </div>
          <p className="text-[11.5px] text-slate-400">
            Showing {results.length} of {incubators.length} incubators
            {sector !== "All sectors" ? ` · ${sector}` : ""}
            {location !== "All locations" ? ` · ${location}` : ""}
          </p>
        </div>
      </Card>

      {/* 3 — Ranked grid */}
      {results.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {results.map((inc) => {
            const fit = fitBySlug[inc.slug] ?? 50;
            return (
              <Card
                key={inc.slug}
                className="transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_32px_-18px_rgba(11,18,32,0.2)]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent-soft text-[12px] font-bold text-accent">
                      {inc.initials}
                    </span>
                    <div>
                      <p className="text-[14px] font-semibold text-ink">{inc.name}</p>
                      <p className="mt-0.5 flex items-center gap-1 text-[11px] text-slate-400">
                        <MapPin className="h-3 w-3" /> {inc.location} · est. {inc.founded}
                      </p>
                    </div>
                  </div>
                  <Badge tone={fit > 80 ? "accent" : fit > 60 ? "good" : "default"}>{fit}% fit</Badge>
                </div>

                <p className="mt-3 line-clamp-2 flex-1 text-[12.5px] leading-relaxed text-slate-500">
                  {inc.desc}
                </p>

                <p className="mt-2.5 text-[11.5px] leading-relaxed text-slate-400">
                  <span className="font-semibold text-ink">Why:</span> {reasonBySlug[inc.slug]}
                </p>

                <div className="mt-4 grid grid-cols-3 divide-x divide-line rounded-lg border border-line text-center">
                  {[
                    ["Programmes", inc.programs],
                    ["Startups", inc.startups],
                    ["Mentors", inc.mentors],
                  ].map(([l, v]) => (
                    <div key={l as string} className="py-2">
                      <span className="block text-[12px] font-bold tabular-nums text-ink">{v}</span>
                      <span className="block text-[9.5px] text-slate-400">{l}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {inc.domains.map((d) => (
                    <span
                      key={d}
                      className="rounded-md bg-slate-100 px-2 py-0.5 text-[10.5px] font-medium text-slate-500"
                    >
                      {d}
                    </span>
                  ))}
                </div>

                <div className="mt-3 flex items-center justify-between border-t border-line pt-3">
                  <span className="text-[11px] font-medium text-slate-400">{inc.application}</span>
                  <Link
                    href="/founder/incubation"
                    className="flex items-center gap-1 text-[12px] font-semibold text-accent hover:underline"
                  >
                    Apply <ArrowUpRight className="h-3 w-3" />
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card className="border-dashed">
          <div className="flex flex-col items-center py-12 text-center">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-accent-soft text-accent">
              <Building2 className="h-5 w-5" />
            </span>
            <p className="mt-4 text-[15px] font-semibold text-ink">No incubator matches that filter</p>
            <p className="mt-1.5 max-w-sm text-[13px] leading-relaxed text-slate-500">
              Widen the sector or city selection, or ask the Startup Copilot to shortlist a programme for
              your next geographic expansion.
            </p>
            <button
              type="button"
              onClick={() => {
                setSector("All sectors");
                setLocation("All locations");
              }}
              className="mt-5 rounded-[10px] bg-accent px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-accent-deep"
            >
              Clear filters
            </button>
          </div>
        </Card>
      )}

      {/* 4 — Why you match */}
      <Card
        title="Why you match"
        action={<Badge tone="accent">StartupHub Labs · 98% fit</Badge>}
      >
        <div className="grid gap-x-8 gap-y-4 lg:grid-cols-2">
          {fitBreakdown.map((f) => (
            <div key={f.criterion}>
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-[12.5px] font-medium text-slate-600">{f.criterion}</span>
                <span className="text-[12.5px] font-semibold tabular-nums text-ink">{f.score}</span>
              </div>
              <Progress
                value={f.score}
                tone={f.score >= 85 ? "good" : f.score >= 65 ? "accent" : "warn"}
                className="mt-2"
              />
              <p className="mt-1.5 text-[11.5px] leading-snug text-slate-400">{f.note}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* 5 — Support comparison */}
      <Card title="Support package compared" pad={false}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] text-left">
            <thead>
              <tr className="border-b border-line">
                <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                  Support
                </th>
                <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                  StartupHub Labs
                </th>
                <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                  CIED Pune
                </th>
                <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                  Kerala Mission
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {supportMatrix.map((row) => (
                <tr key={row.support}>
                  <td className="px-5 py-3 text-[12.5px] font-medium text-ink">{row.support}</td>
                  <td className="px-5 py-3 text-[12.5px] font-semibold text-accent">{row.startupHub}</td>
                  <td className="px-5 py-3 text-[12.5px] text-slate-600">{row.cied}</td>
                  <td className="px-5 py-3 text-[12.5px] text-slate-600">{row.ksm}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* 6 — Alumni outcomes */}
      <Card title="Alumni outcomes" action={<Badge tone="good">61% funded</Badge>} pad={false}>
        <ul className="divide-y divide-line">
          {alumniOutcomes.map((a) => (
            <li key={a.startup} className="flex flex-wrap items-center gap-3 px-5 py-3.5">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent-soft text-[11px] font-bold text-accent">
                {a.startup.slice(0, 2).toUpperCase()}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-semibold text-ink">{a.startup}</p>
                <p className="text-[11.5px] text-slate-400">{a.cohort}</p>
              </div>
              <span className="text-[12.5px] font-medium text-slate-600">{a.outcome}</span>
              <Badge tone="default">{a.year}</Badge>
            </li>
          ))}
        </ul>
      </Card>

      {/* 7 — Application windows */}
      <Card title="Application windows" pad={false}>
        <ul className="divide-y divide-line">
          {applicationWindows.map((w) => (
            <li key={w.program} className="flex flex-wrap items-center gap-3 px-5 py-3.5">
              <p className="min-w-0 flex-1 text-[13px] font-medium text-ink">{w.program}</p>
              <span className="text-[12px] text-slate-500">{w.window}</span>
              <Badge tone={w.tone}>{w.next}</Badge>
            </li>
          ))}
        </ul>
      </Card>

      {/* 8 — Copilot note */}
      <Card title="Copilot recommendation">
        <div className="flex items-start gap-3 rounded-xl bg-accent-mist p-4">
          <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
          <div>
            <p className="text-[13px] font-semibold text-ink">
              Apply to StartupHub Labs first — you already hold a Cohort VI seat there.
            </p>
            <p className="mt-1 text-[12px] leading-relaxed text-slate-600">
              Applying to CIED Pune in parallel is free (their next intake opens Apr 30) and gives you a
              wet-lab fallback if the Climate Sandbox panel defers your application.
            </p>
          </div>
        </div>
      </Card>

      {/* 9 — Where to go next */}
      <Card title="Where to go next">
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            {
              label: "Applications",
              href: "/founder/incubation",
              body: "Track what you have applied to, the pipeline and the documents still outstanding.",
            },
            {
              label: "Incubation Workspace",
              href: "/founder/incubation/workspace",
              body: "Your live cohort plan — sprints, deliverables, mentors and KPIs.",
            },
            {
              label: "Milestones",
              href: "/founder/incubation/milestones",
              body: "The milestone register, key dates, sign-offs and open risks.",
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
