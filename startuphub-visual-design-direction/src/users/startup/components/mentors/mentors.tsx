"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  MapPin,
  Sparkles,
  Users,
} from "lucide-react";
import Link from "next/link";
import { Badge, Card, PageHeader, Progress, Stat } from "@/components/app/widgets";
import {
  engagements,
  matchReasonBySlug,
  matchScoreBySlug,
  mentorHourAllocation,
  pendingRequests,
} from "@/users/startup/constants/mentor-data";
import { mentorFilters, mentors } from "@/views/explore/mentors/constants/mentors";

const expertiseOptions = ["All expertise", ...mentorFilters.expertise];
const industryOptions = ["All industries", ...mentorFilters.industries];
const availabilityOptions = ["Any availability", ...mentorFilters.availability];

/* Score the catalogue against the founder's stated challenge. */
const ranked = [...mentors].sort(
  (a, b) => (matchScoreBySlug[b.slug] ?? 50) - (matchScoreBySlug[a.slug] ?? 50),
);

const engagementName = (slug: string) => mentors.find((m) => m.slug === slug)?.name ?? slug;

export function Mentors() {
  const [expertise, setExpertise] = useState("All expertise");
  const [industry, setIndustry] = useState("All industries");
  const [availability, setAvailability] = useState("Any availability");
  const [requested, setRequested] = useState<string[]>([]);

  const results = useMemo(
    () =>
      ranked.filter((m) => {
        if (expertise !== "All expertise" && !m.expertise.includes(expertise)) return false;
        if (industry !== "All industries" && m.industry !== industry) return false;
        if (availability !== "Any availability" && m.availability !== availability) return false;
        return true;
      }),
    [expertise, industry, availability],
  );

  const toggleRequest = (slug: string) =>
    setRequested((prev) => (prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]));

  const filtered =
    expertise !== "All expertise" ||
    industry !== "All industries" ||
    availability !== "Any availability";

  return (
    <div className="space-y-5">
      <PageHeader
        title="Discover Mentors"
        desc="Operators matched to the problem you actually have — not the most famous name on the platform."
        actions={
          <Link
            href="/founder/mentors/matching"
            className="inline-flex items-center gap-1.5 rounded-[10px] border border-line bg-white px-4 py-2.5 text-[13px] font-semibold text-ink hover:border-slate-300"
          >
            How matching works
          </Link>
        }
      />

      {/* 1 — Headline metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat icon={Users} label="Mentors in catalogue" value={String(mentors.length)} hint="matched to your profile" tone="default" />
        <Stat icon={Clock} label="With open slots" value={String(mentors.filter((m) => m.availability !== "Waitlist").length)} hint="this month" tone="good" />
        <Stat icon={CheckCircle2} label="Hours logged" value={`${mentorHourAllocation.used} / ${mentorHourAllocation.total}`} hint={`unused hours lapse ${mentorHourAllocation.lapsesOn}`} tone="warn" />
        <Stat icon={Sparkles} label="Requests pending" value={String(pendingRequests.length)} hint="1 accepted, 1 awaiting reply" tone="default" />
      </div>

      {/* 2 — Filters */}
      <Card title="Filter mentors" action={<span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">live</span>}>
        <div className="space-y-3.5">
          {[
            { label: "Expertise", options: expertiseOptions, value: expertise, set: setExpertise, reset: "All expertise" },
            { label: "Industry", options: industryOptions, value: industry, set: setIndustry, reset: "All industries" },
            { label: "Availability", options: availabilityOptions, value: availability, set: setAvailability, reset: "Any availability" },
          ].map((row) => (
            <div key={row.label} className="flex flex-wrap items-center gap-2">
              <span className="w-24 shrink-0 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                {row.label}
              </span>
              {row.options.map((o) => (
                <button
                  key={o}
                  type="button"
                  onClick={() => row.set(o)}
                  className={`rounded-full px-3 py-1.5 text-[12px] font-semibold transition-colors ${
                    row.value === o
                      ? "bg-accent text-white"
                      : "border border-line bg-white text-slate-500 hover:border-slate-300 hover:text-ink"
                  }`}
                >
                  {o}
                </button>
              ))}
            </div>
          ))}
          <p className="text-[11.5px] text-slate-400">
            {filtered
              ? `Showing ${results.length} of ${mentors.length} mentors`
              : `${mentors.length} mentors ranked by fit`}
          </p>
        </div>
      </Card>

      {/* 3 — Ranked grid */}
      {results.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {results.map((m) => {
            const fit = matchScoreBySlug[m.slug] ?? 50;
            const alreadyRequested = requested.includes(m.slug);
            const engaged = engagements.some((e) => e.slug === m.slug);
            return (
              <Card
                key={m.slug}
                className="transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_32px_-18px_rgba(11,18,32,0.2)]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent-soft text-[12px] font-bold text-accent">
                      {m.name
                        .replace(/^Dr\. /, "")
                        .split(" ")
                        .map((w) => w[0])
                        .join("")
                        .slice(0, 2)}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-[14px] font-semibold text-ink">{m.name}</p>
                        {engaged && <Badge tone="good">Engaged</Badge>}
                      </div>
                      <p className="mt-0.5 flex items-center gap-1 text-[11px] text-slate-400">
                        <MapPin className="h-3 w-3" /> {m.location} · {m.experience}
                      </p>
                    </div>
                  </div>
                  <Badge tone={fit > 85 ? "accent" : fit > 65 ? "good" : "default"}>{fit}% fit</Badge>
                </div>

                <p className="mt-2 text-[12px] font-medium text-slate-600">{m.role}</p>
                <p className="mt-2 line-clamp-3 flex-1 text-[12.5px] leading-relaxed text-slate-500">
                  {m.bio}
                </p>
                <p className="mt-2 text-[11.5px] leading-relaxed text-slate-400">
                  <span className="font-semibold text-ink">Why:</span> {matchReasonBySlug[m.slug]}
                </p>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {m.expertise.map((e) => (
                    <span
                      key={e}
                      className="rounded-md bg-slate-100 px-2 py-0.5 text-[10.5px] font-medium text-slate-500"
                    >
                      {e}
                    </span>
                  ))}
                </div>

                <div className="mt-3 flex items-center justify-between border-t border-line pt-3">
                  <span className="text-[11px] font-medium text-slate-400">
                    {m.availability} · {m.sessions} sessions
                  </span>
                  <button
                    type="button"
                    onClick={() => toggleRequest(m.slug)}
                    disabled={engaged}
                    className={`flex items-center gap-1 rounded-lg px-3 py-1.5 text-[12px] font-semibold transition-colors ${
                      engaged
                        ? "cursor-not-allowed border border-line text-slate-400"
                        : alreadyRequested
                          ? "border border-emerald-200 bg-emerald-50 text-emerald-600"
                          : "border border-line text-ink hover:border-accent hover:text-accent"
                    }`}
                  >
                    {engaged ? (
                      "In progress"
                    ) : alreadyRequested ? (
                      <>
                        <CheckCircle2 className="h-3 w-3" /> Requested
                      </>
                    ) : (
                      <>
                        Connect <ArrowUpRight className="h-3 w-3" />
                      </>
                    )}
                  </button>
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card className="border-dashed">
          <div className="flex flex-col items-center py-12 text-center">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-accent-soft text-accent">
              <Users className="h-5 w-5" />
            </span>
            <p className="mt-4 text-[15px] font-semibold text-ink">No mentor matches that combination</p>
            <p className="mt-1.5 max-w-sm text-[13px] leading-relaxed text-slate-500">
              Loosen one filter, or ask the Startup Copilot to nominate a mentor outside the catalogue.
            </p>
            <button
              type="button"
              onClick={() => {
                setExpertise("All expertise");
                setIndustry("All industries");
                setAvailability("Any availability");
              }}
              className="mt-5 rounded-[10px] bg-accent px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-accent-deep"
            >
              Clear filters
            </button>
          </div>
        </Card>
      )}

      {/* 4 — Your roster */}
      <Card title="Your mentor roster" action={<Badge tone="accent">{engagements.length} mentors</Badge>} pad={false}>
        <ul className="divide-y divide-line">
          {engagements.map((e) => (
            <li key={e.slug} className="flex flex-wrap items-center gap-3 px-5 py-3.5">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent-soft text-[11px] font-bold text-accent">
                {engagementName(e.slug)
                  .replace(/^Dr\. /, "")
                  .split(" ")
                  .map((w) => w[0])
                  .join("")
                  .slice(0, 2)}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-semibold text-ink">{engagementName(e.slug)}</p>
                <p className="mt-0.5 text-[11.5px] text-slate-400">{e.role}</p>
              </div>
              <span className="text-[11.5px] text-slate-500">{e.cadence}</span>
              <span className="text-[11.5px] font-medium tabular-nums text-ink">
                {e.sessions} sessions · {e.hours}h
              </span>
              <Badge tone={e.tone}>{e.state}</Badge>
            </li>
          ))}
        </ul>
      </Card>

      {/* 5 — Hours used vs allocation */}
      <Card title="Mentor hours vs programme allowance">
        <div className="flex items-baseline justify-between">
          <span className="text-[12.5px] font-medium text-slate-600">
            Used of {mentorHourAllocation.total}-hour cohort allowance
          </span>
          <span className="text-[13px] font-semibold tabular-nums text-ink">
            {mentorHourAllocation.used} / {mentorHourAllocation.total}
          </span>
        </div>
        <Progress value={(mentorHourAllocation.used / mentorHourAllocation.total) * 100} tone="warn" className="mt-2.5" />
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {engagements.slice(0, 4).map((e) => (
            <div key={e.slug} className="rounded-xl bg-slate-50 p-3.5 text-center">
              <span className="block text-[15px] font-semibold tabular-nums text-ink">{e.hours}h</span>
              <span className="mt-0.5 block truncate text-[10.5px] text-slate-400">
                {engagementName(e.slug).split(" ")[0]}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-4 text-[12px] leading-relaxed text-slate-500">
          {mentorHourAllocation.total - mentorHourAllocation.used} hours remain and lapse on{" "}
          {mentorHourAllocation.lapsesOn}. Same allowance tracked on{" "}
          <Link href="/founder/incubation/workspace" className="font-semibold text-accent hover:underline">
            the incubation workspace
          </Link>
          .
        </p>
      </Card>

      {/* 6 — Pending requests */}
      <Card title="Pending requests" pad={false}>
        <ul className="divide-y divide-line">
          {pendingRequests.map((r) => (
            <li key={r.mentor} className="flex flex-wrap items-center gap-3 px-5 py-3.5">
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-semibold text-ink">{r.mentor}</p>
                <p className="mt-0.5 text-[11.5px] text-slate-400">
                  {r.expertise} · sent {r.sent}
                </p>
              </div>
              <Badge tone={r.tone}>{r.state}</Badge>
            </li>
          ))}
        </ul>
      </Card>

      {/* 7 — Copilot */}
      <Card title="Copilot recommendation">
        <div className="flex items-start gap-3 rounded-xl bg-accent-mist p-4">
          <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
          <div>
            <p className="text-[13px] font-semibold text-ink">
              IP &amp; Legal is your weakest assessment dimension — Dr. Meera Krishnan is already accepted.
            </p>
            <p className="mt-1 text-[12px] leading-relaxed text-slate-600">
              Book the Apr 17 office hours before the Apr 28 demo day. Her claims review is the single
              move that lifts your IP score above 80.
            </p>
          </div>
        </div>
      </Card>

      {/* 8 — Where to go next */}
      <Card title="Where to go next">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            {
              label: "Mentor Matching",
              href: "/founder/mentors/matching",
              body: "Set your challenge, engagement style and see how each dimension scores a mentor.",
            },
            {
              label: "Mentor Sessions",
              href: "/founder/mentors/sessions",
              body: "Upcoming calls, session history, agendas and every action item logged.",
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
