"use client";

import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  Check,
  Compass,
  GitBranch,
  MapPin,
  Search,
  Sparkles,
  UserPlus,
} from "lucide-react";
import Link from "next/link";
import { Badge, Card, PageHeader, Progress } from "@/components/app/widgets";
import { cn } from "@/lib/utils";
import {
  MATCH_DIMENSIONS,
  MATCH_PIPELINE,
  NETWORK_MENTORS,
  type NetworkMentor,
} from "../../constants/mentors-data";

const INDUSTRIES = ["All", "FinTech", "Legal / IPR", "SaaS", "Manufacturing", "Logistics", "D2C / Retail"] as const;

export function MentorDiscovery() {
  const [query, setQuery] = useState("");
  const [industry, setIndustry] = useState<(typeof INDUSTRIES)[number]>("All");
  const [requested, setRequested] = useState<string[]>([]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return NETWORK_MENTORS.filter((m) => {
      if (industry !== "All" && m.industry !== industry) return false;
      if (!q) return true;
      return [m.name, m.role, m.industry, ...m.expertise]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [query, industry]);

  const top = NETWORK_MENTORS[0];
  const avgMatch = Math.round(
    NETWORK_MENTORS.reduce((s, m) => s + m.match, 0) / NETWORK_MENTORS.length,
  );

  const toggleRequest = (slug: string) => {
    setRequested((r) =>
      r.includes(slug) ? r.filter((x) => x !== slug) : [...r, slug],
    );
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Mentor Discovery"
        desc="The wider network, matched to the gaps in your programme — not a scrollable directory."
        actions={
          <Link
            href="/incubator/mentors/assignments"
            className="inline-flex items-center gap-1.5 rounded-[10px] border border-line bg-white px-4 py-2.5 text-[13px] font-semibold text-ink transition-colors hover:bg-soft"
          >
            Assignment board
          </Link>
        }
      />

      {/* ── 01 · Filters ─────────────────────────────────────── */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex flex-wrap gap-2">
          {INDUSTRIES.map((i) => (
            <button
              key={i}
              onClick={() => setIndustry(i)}
              className={cn(
                "rounded-[10px] border px-3.5 py-2 text-[12.5px] font-medium transition-colors",
                industry === i
                  ? "border-ink bg-ink text-white"
                  : "border-line bg-white text-slate-500 hover:border-slate-300 hover:text-ink",
              )}
            >
              {i}
            </button>
          ))}
        </div>
        <div className="relative sm:ml-auto sm:w-[250px]">
          <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search expertise, role or city"
            aria-label="Search mentors"
            className="h-11 w-full rounded-[10px] border border-line bg-white pl-10 pr-4 text-sm text-ink placeholder:text-slate-400 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/15"
          />
        </div>
      </div>

      {/* ── 02 · How matching works ──────────────────────────── */}
      <Card
        title="How matching works"
        sub="Four steps from a programme gap to a warm introduction"
        action={
          <span className="flex items-center gap-1.5 text-[12px] font-semibold text-slate-400">
            <GitBranch className="h-3.5 w-3.5" /> 4 steps
          </span>
        }
      >
        <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {MATCH_PIPELINE.map((s, i) => (
            <li
              key={s.step}
              className="group rounded-xl border border-line p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-soft"
            >
              <span className="grid h-6 w-6 place-items-center rounded-full bg-accent text-[11px] font-bold text-white">
                {i + 1}
              </span>
              <p className="mt-3 text-[13.5px] font-semibold tracking-tight text-ink">
                {s.step}
              </p>
              <p className="mt-1.5 text-[12px] leading-relaxed text-slate-500">
                {s.body}
              </p>
            </li>
          ))}
        </ol>
      </Card>

      {/* ── 03 · Top match ───────────────────────────────────── */}
      <Card
        title="Your top match"
        sub="Ranked against every open gap in the programme"
        action={<Badge tone="good">{top.match} match</Badge>}
      >
        <div className="grid gap-6 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="flex items-start gap-4">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-ink text-[16px] font-bold text-white">
                {top.initials}
              </span>
              <div className="min-w-0">
                <p className="text-[19px] font-semibold tracking-[-0.02em] text-ink">
                  {top.name}
                </p>
                <p className="mt-0.5 text-[12px] text-slate-400">{top.role}</p>
                <p className="mt-0.5 font-mono text-[10px] tracking-[0.08em] text-slate-400 uppercase">
                  {top.industry} · {top.experience} · {top.location}
                </p>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {top.expertise.map((e) => (
                <span
                  key={e}
                  className="rounded-md bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-600"
                >
                  {e}
                </span>
              ))}
            </div>
            <p className="mt-4 rounded-xl border border-line bg-soft p-4 text-[12.5px] leading-relaxed text-slate-600">
              <span className="font-semibold text-ink">Why:</span> {top.reason}
            </p>
            <button
              onClick={() => toggleRequest(top.slug)}
              className={cn(
                "mt-4 inline-flex items-center gap-2 rounded-[10px] px-4 py-2.5 text-[13px] font-semibold transition-colors",
                requested.includes(top.slug)
                  ? "bg-rise text-white"
                  : "bg-accent text-white hover:bg-accent-deep",
              )}
            >
              {requested.includes(top.slug) ? (
                <>
                  <Check className="h-3.5 w-3.5" /> Intro requested
                </>
              ) : (
                <>
                  <UserPlus className="h-3.5 w-3.5" /> Request introduction
                </>
              )}
            </button>
          </div>

          {/* dimension breakdown */}
          <div className="lg:col-span-3">
            <p className="mb-3 font-mono text-[9.5px] tracking-[0.18em] text-slate-400 uppercase">
              Match dimensions
            </p>
            <div className="space-y-3">
              {MATCH_DIMENSIONS.map((d) => (
                <div key={d.dim} className="flex items-center gap-3">
                  <span className="w-[150px] shrink-0 truncate text-[12.5px] font-medium text-slate-600">
                    {d.dim}
                  </span>
                  <Progress
                    value={d.score}
                    tone={d.score >= 88 ? "good" : d.score >= 78 ? "accent" : "warn"}
                    className="flex-1"
                  />
                  <span className="w-8 text-right text-[12.5px] font-semibold tabular-nums text-ink">
                    {d.score}
                  </span>
                  <span className="hidden w-9 text-right font-mono text-[10px] text-slate-400 sm:block">
                    {d.weight}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* ── 04 · Shortlist ───────────────────────────────────── */}
      <Card
        title={`Shortlist · ${filtered.length}`}
        sub="Ranked by fit against the programme's open gaps"
        action={<Badge tone="accent">avg {avgMatch} match</Badge>}
        pad={false}
      >
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center gap-2 px-5 py-14 text-center">
            <Compass className="h-6 w-6 text-slate-300" />
            <p className="text-[13px] text-slate-400">No mentor matches that search.</p>
          </div>
        ) : (
          <ul className="divide-y divide-line">
            {filtered.map((m) => (
              <NetworkRow
                key={m.slug}
                m={m}
                requested={requested.includes(m.slug)}
                onToggle={() => toggleRequest(m.slug)}
              />
            ))}
          </ul>
        )}
      </Card>

      {/* ── 05 · Shortlist by expertise ──────────────────────── */}
      <Card
        title="Shortlist by expertise"
        sub="Where the network is strongest against our open gaps"
        action={<Badge tone="accent">6 areas</Badge>}
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { e: "IP & licensing", n: 2, top: "Dr. Meera Krishnan", tone: "good" as const },
            { e: "Hardware & supply chain", n: 2, top: "Nikhil Verma", tone: "good" as const },
            { e: "Regulatory & quality", n: 1, top: "Lakshmi Iyer", tone: "accent" as const },
            { e: "Growth & retention", n: 2, top: "Sara D'Souza", tone: "accent" as const },
            { e: "Performance marketing", n: 1, top: "Imran Sheikh", tone: "default" as const },
            { e: "Architecture & scaling", n: 1, top: "Priya Nair", tone: "default" as const },
          ].map((x) => (
            <div
              key={x.e}
              className="rounded-xl border border-line p-4 transition-colors hover:border-accent/25"
            >
              <div className="flex items-start justify-between gap-3">
                <p className="text-[13px] font-semibold text-ink">{x.e}</p>
                <Badge tone={x.tone}>{x.n} mentors</Badge>
              </div>
              <p className="mt-2.5 text-[11.5px] text-slate-500">
                Best fit: {x.top}
              </p>
            </div>
          ))}
        </div>
      </Card>

      {/* ── 06 · Availability ────────────────────────────────── */}
      <Card
        title="Availability"
        sub="Who can actually take a session this month"
        action={<Badge tone="warn">2 at waitlist</Badge>}
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {NETWORK_MENTORS.map((m) => (
            <div
              key={m.slug}
              className="rounded-xl border border-line p-4 transition-colors hover:border-accent/25"
            >
              <div className="flex items-start justify-between gap-3">
                <p className="text-[13px] font-semibold text-ink">{m.name}</p>
                <Badge tone={m.tone}>{m.match} match</Badge>
              </div>
              <p className="mt-2 flex items-center gap-1.5 text-[11.5px] text-slate-500">
                <MapPin className="h-3 w-3 text-slate-400" /> {m.location}
              </p>
              <p className="mt-1.5 text-[12px] font-medium text-slate-600">
                {m.availability}
              </p>
              <div className="mt-3">
                <Progress
                  value={m.match}
                  tone={m.match >= 88 ? "good" : m.match >= 80 ? "accent" : "warn"}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* ── 06 · Already engaged ─────────────────────────────── */}
      <Card
        title="Already engaged"
        sub="Mentors on your bench — they still have open capacity"
        action={<Badge tone="default">1 shown</Badge>}
        pad={false}
      >
        <ul className="divide-y divide-line">
          {NETWORK_MENTORS.filter((m) => m.alreadyEngaged).map((m) => (
            <li
              key={m.slug}
              className="flex flex-wrap items-center gap-4 px-5 py-4 transition-colors hover:bg-soft"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ink text-[11px] font-bold text-white">
                {m.initials}
              </span>
              <div className="min-w-[190px] flex-1">
                <p className="text-[13.5px] font-semibold text-ink">{m.name}</p>
                <p className="mt-0.5 text-[11.5px] text-slate-400">{m.role}</p>
              </div>
              <span className="text-[12px] text-slate-500">{m.availability}</span>
              <Badge tone="default">On bench</Badge>
            </li>
          ))}
        </ul>
      </Card>

      {/* ── 07 · Intro flow ─────────────────────────────────── */}
      <Card
        title="How an introduction works"
        sub="What happens after you request one"
        action={
          <span className="flex items-center gap-1.5 text-[12px] font-semibold text-slate-400">
            <Sparkles className="h-3.5 w-3.5" /> Warm intros only
          </span>
        }
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              t: "You send a one-liner",
              b: "The single problem you want solved, and the deadline.",
            },
            {
              t: "We check fit first",
              b: "If the pair is wrong we say so rather than wasting the slot.",
            },
            {
              t: "The mentor accepts",
              b: "They get the startup's stage, assessment gaps and context.",
            },
            {
              t: "The session is booked",
              b: "Cadence is set on the tracking screen, with hours logged.",
            },
          ].map((x, i) => (
            <div
              key={x.t}
              className="group rounded-xl border border-line p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-soft"
            >
              <span className="grid h-6 w-6 place-items-center rounded-full bg-accent-soft text-[11px] font-bold text-accent">
                {i + 1}
              </span>
              <p className="mt-3 text-[13px] font-semibold tracking-tight text-ink">
                {x.t}
              </p>
              <p className="mt-1.5 text-[12px] leading-relaxed text-slate-500">{x.b}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* ── 08 · Where to go next ────────────────────────────── */}
      <Card title="Where to go next" sub="From discovery to a live pairing">
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            {
              href: "/incubator/mentors/assignments",
              title: "Assign them",
              body: "Pair the mentor with a startup and set the focus.",
              icon: UserPlus,
            },
            {
              href: "/incubator/mentors",
              title: "Back to the bench",
              body: "Load, hours and expertise gaps across the team.",
              icon: Compass,
            },
            {
              href: "/incubator/mentors/tracking",
              title: "Track the session",
              body: "Once it is booked, log the hours and the actions.",
              icon: GitBranch,
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

/* One catalogue row — the match score, the reason and the intro action. */
function NetworkRow({
  m,
  requested,
  onToggle,
}: {
  m: NetworkMentor;
  requested: boolean;
  onToggle: () => void;
}) {
  return (
    <li className="flex flex-col gap-3 px-5 py-4 transition-colors hover:bg-soft lg:flex-row lg:items-center">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent-soft text-[12px] font-bold text-accent">
        {m.initials}
      </span>
      <div className="min-w-[190px] flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-[13.5px] font-semibold text-ink">{m.name}</p>
          {m.alreadyEngaged && <Badge tone="default">On bench</Badge>}
        </div>
        <p className="mt-0.5 text-[11.5px] text-slate-400">
          {m.role} · {m.location}
        </p>
      </div>
      <div className="flex min-w-0 flex-1 flex-wrap gap-1.5">
        {m.expertise.map((e) => (
          <span
            key={e}
            className="rounded-md bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-600"
          >
            {e}
          </span>
        ))}
      </div>
      <span className="hidden min-w-[190px] text-[12px] text-slate-500 lg:block">
        {m.reason}
      </span>
      <div className="flex w-24 shrink-0 items-center gap-2">
        <Progress
          value={m.match}
          tone={m.match >= 88 ? "good" : m.match >= 80 ? "accent" : "warn"}
          className="flex-1"
        />
        <span className="w-7 text-right text-[12px] font-semibold tabular-nums text-ink">
          {m.match}
        </span>
      </div>
      <button
        onClick={onToggle}
        className={cn(
          "shrink-0 rounded-lg px-3 py-1.5 text-[11.5px] font-semibold transition-colors",
          requested
            ? "bg-rise-tint text-rise"
            : "border border-line bg-white text-slate-600 hover:border-accent/40 hover:text-accent",
        )}
      >
        {requested ? "Requested" : "Request"}
      </button>
    </li>
  );
}
