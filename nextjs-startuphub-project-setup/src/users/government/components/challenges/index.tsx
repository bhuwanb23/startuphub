import {
  Award,
  FilePlus2,
  Flag,
  Medal,
  Target,
  Trophy,
  Users,
} from "lucide-react";
import { Bar, Chip, Panel, ScoreRing, StatCard } from "@/components/app/widgets";
import { PageHead, SubjectBanner } from "@/components/app/boards";
import {
  CHALLENGE_EVAL,
  CHALLENGE_FINALISTS,
  CHALLENGE_OUTCOMES,
  CHALLENGES,
} from "../../constants/gov-data";
import { APPLICATION_ROWS } from "../../constants/gov-data";

const CH_TONE: Record<string, "rise" | "amber" | "accent" | "slate"> = {
  Active: "rise", Evaluation: "amber", Upcoming: "accent", Completed: "slate",
};

/* ── Challenge Management ───────────────────────────────────── */
export function ChallengeManagement() {
  return (
    <div className="space-y-5">
      <PageHead
        title="Challenge management"
        sub="Problem statements → prizes → implemented solutions"
        action={
          <button className="flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-accent-deep">
            <FilePlus2 className="h-3.5 w-3.5" /> Create challenge
          </button>
        }
      />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="Active challenges" value="2" delta="deadlines Apr–May" icon={Trophy} />
        <StatCard label="Total applications" value="504" delta="+118 this week" icon={Users} />
        <StatCard label="In evaluation" value="1" delta="finals Apr 22" icon={Flag} />
        <StatCard label="Solutions implemented" value="7" delta="4 depts adopting" icon={Award} />
      </div>
      <Panel pad={false}>
        <ul className="divide-y divide-line">
          {CHALLENGES.map((c) => (
            <li key={c.id} className="flex flex-wrap items-center gap-4 px-5 py-4.5 transition-colors hover:bg-soft">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-soft text-accent">
                <Trophy className="h-4.5 w-4.5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[14px] font-semibold text-ink">{c.title}</p>
                <p className="mt-0.5 text-[11.5px] text-slate-400">{c.agency} · {c.apps} applications · {c.deadline}</p>
              </div>
              <Chip tone="ink">{c.prize}</Chip>
              <Chip tone={CH_TONE[c.status]}>{c.status}</Chip>
              <a href={c.status === "Evaluation" ? "/government/challenges/evaluation" : "/government/challenges/active"} className="rounded-lg border border-line px-3.5 py-2 text-[12px] font-semibold text-ink hover:bg-white">
                Manage
              </a>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}

/* ── Active Challenges ──────────────────────────────────────── */
export function ActiveChallenges() {
  const active = CHALLENGES.filter((c) => c.status === "Active");
  return (
    <div className="space-y-5">
      <PageHead title="Active challenges" sub="Live problem statements accepting applications" />
      <div className="grid gap-4 sm:grid-cols-2">
        {active.map((c) => (
          <Panel key={c.id} className="transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft">
            <div className="flex items-start justify-between">
              <Chip tone="rise">Active</Chip>
              <span className="font-mono text-[10px] text-amber-dim">Deadline {c.deadline}</span>
            </div>
            <h3 className="mt-3 text-[16.5px] font-semibold tracking-[-0.015em] text-ink">{c.title}</h3>
            <p className="mt-1 text-[12.5px] text-slate-500">{c.agency}</p>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              {[
                { l: "Prize", v: c.prize },
                { l: "Applications", v: String(c.apps) },
                { l: "Shortlist target", v: "10" },
              ].map((x) => (
                <div key={x.l} className="rounded-lg bg-soft p-2.5">
                  <p className="text-[12.5px] font-semibold text-ink">{x.v}</p>
                  <p className="mt-0.5 font-mono text-[8px] tracking-[0.1em] text-slate-400 uppercase">{x.l}</p>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <div className="mb-1.5 flex justify-between text-[11px]">
                <span className="text-slate-400">Application window progress</span>
                <span className="font-semibold text-ink">64%</span>
              </div>
              <Bar pct={64} />
            </div>
          </Panel>
        ))}
      </div>
    </div>
  );
}

/* ── Challenge Applications ─────────────────────────────────── */
export function ChallengeApplications() {
  return (
    <div className="space-y-5">
      <PageHead title="Challenge applications" sub="AgriChain Innovation Challenge · 214 applications" />
      <div className="no-scrollbar flex gap-2 overflow-x-auto">
        {["All", "New", "Under Review", "Shortlisted", "Finalists", "Selected", "Rejected"].map((s, i) => (
          <button key={s} className={`shrink-0 rounded-lg border px-3.5 py-2 text-[12.5px] font-semibold ${i === 0 ? "border-accent bg-accent text-white" : "border-line bg-white text-slate-500 hover:text-ink"}`}>{s}</button>
        ))}
      </div>
      <Panel pad={false}>
        <ul className="divide-y divide-line">
          {APPLICATION_ROWS.slice(0, 5).map((a, i) => (
            <li key={a.id} className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-soft">
              <ScoreRing score={a.score} size={40} />
              <div className="min-w-0 flex-1">
                <p className="text-[13.5px] font-semibold text-ink">{a.startup}</p>
                <p className="mt-0.5 font-mono text-[9.5px] tracking-[0.06em] text-slate-400 uppercase">{a.id} · evaluator: {a.officer}</p>
              </div>
              <Chip tone={i === 0 ? "rise" : i <= 2 ? "accent" : "amber"}>
                {i === 0 ? "Finalist" : i <= 2 ? "Shortlisted" : "Under Review"}
              </Chip>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}

/* ── Challenge Evaluation ───────────────────────────────────── */
export function ChallengeEvaluation() {
  const e = CHALLENGE_EVAL;
  return (
    <div className="space-y-5">
      <SubjectBanner
        kicker="Evaluation · finals Apr 22"
        title={e.title}
        meta={`4 evaluators · ${e.criteria.length} weighted criteria · blind scoring`}
        score={91}
        action={<Chip tone="amber" className="px-3 py-1.5">Scoring locks Apr 20</Chip>}
      />
      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Evaluation criteria" sub="Weights set at launch — immutable post-deadline">
          <ul className="space-y-3.5">
            {e.criteria.map((c) => (
              <li key={c.label} className="flex items-center gap-3.5">
                <span className="flex-1 text-[12.5px] font-medium text-slate-600">{c.label}</span>
                <Bar pct={c.weight * 3} className="w-24" />
                <span className="w-10 text-right font-mono text-[12px] font-semibold text-accent">{c.weight}%</span>
              </li>
            ))}
          </ul>
          <div className="mt-5 border-t border-line pt-4">
            <p className="mb-2.5 font-mono text-[9px] tracking-[0.18em] text-slate-400 uppercase">Evaluation panel</p>
            <div className="flex flex-wrap gap-2">
              {e.evaluators.map((x) => <Chip key={x} tone="line">{x}</Chip>)}
            </div>
          </div>
        </Panel>
        <Panel title="Rankings" sub="Live blind aggregate — updates as scores land">
          <ul className="space-y-3">
            {e.rankings.map((r) => (
              <li key={r.rank} className="flex items-center gap-4 rounded-lg border border-line p-3.5">
                <span className={`flex h-8 w-8 items-center justify-center rounded-lg font-mono text-[12px] font-bold ${r.rank === 1 ? "bg-accent text-white" : "bg-slate-100 text-slate-500"}`}>
                  #{r.rank}
                </span>
                <span className="flex-1 text-[13.5px] font-semibold text-ink">{r.name}</span>
                <div className="flex items-center gap-2.5">
                  <Bar pct={r.score} className="w-16" barClass={r.rank === 1 ? "bg-accent" : "bg-slate-300"} />
                  <span className="font-mono text-[12px] font-bold text-ink">{r.score}</span>
                </div>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </div>
  );
}

/* ── Challenge Selection ────────────────────────────────────── */
export function ChallengeSelection() {
  return (
    <div className="space-y-5">
      <PageHead
        title="Selection"
        sub="Water Grid Robotics Challenge — committee decision recorded"
        action={<Chip tone="rise" className="px-3 py-1.5"><Medal className="h-3 w-3" /> Decisions published Mar 22</Chip>}
      />
      <Panel pad={false}>
        <ul className="divide-y divide-line">
          {CHALLENGE_FINALISTS.map((f, i) => (
            <li key={f.name} className="flex flex-wrap items-center gap-4 px-5 py-4.5 transition-colors hover:bg-soft">
              <span className={`flex h-10 w-10 items-center justify-center rounded-lg ${i === 0 ? "bg-accent text-white" : "bg-accent-soft text-accent"}`}>
                <Trophy className="h-4.5 w-4.5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[14px] font-semibold text-ink">{f.name}</p>
                <p className="mt-0.5 text-[12px] text-slate-400">{f.pilot}</p>
              </div>
              <Chip tone={i === 0 ? "rise" : "accent"}>{f.award}</Chip>
              <Chip tone="rise">{f.decision}</Chip>
            </li>
          ))}
        </ul>
      </Panel>
      <Panel title="Selection history" sub="Previous challenge committees">
        <ul className="space-y-2.5 text-[12.5px] text-slate-600">
          <li>· Tele-Health Rural Access — 3 winners published Jan 2026 (SehatGrid pilot)</li>
          <li>· AgriChain 2025 — CropLens AI selected, implementation live</li>
          <li>· Urban Air Quality — 2 pilots, 1 adopted into city ops</li>
        </ul>
      </Panel>
    </div>
  );
}

/* ── Challenge Outcomes ─────────────────────────────────────── */
export function ChallengeOutcomes() {
  return (
    <div className="space-y-5">
      <PageHead
        title="Challenge outcomes"
        sub="What happened to winning solutions — the only metric that matters"
        action={<Target className="h-4 w-4 text-slate-300" />}
      />
      <div className="grid gap-4 lg:grid-cols-3">
        <StatCard label="Solutions implemented" value="7" delta="across 5 departments" icon={Award} />
        <StatCard label="Adoption rate" value="71%" delta="winners → live pilots" icon={Target} />
        <StatCard label="Procurement value created" value="₹18.6 Cr" delta="paid pilots + contracts" icon={Trophy} />
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {CHALLENGE_OUTCOMES.map((o) => (
          <Panel key={o.challenge}>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-rise-tint text-rise">
                <Medal className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-[14.5px] font-semibold text-ink">{o.challenge}</h3>
                <p className="text-[11.5px] text-slate-400">Winner: <span className="font-semibold text-accent">{o.winner}</span></p>
              </div>
            </div>
            <dl className="mt-4 space-y-2.5 text-[12.5px]">
              {[
                ["Implemented", o.implemented],
                ["Adoption", o.adoption],
                ["Measured impact", o.impact],
              ].map(([k, v]) => (
                <div key={k} className="grid grid-cols-[130px_1fr] gap-3">
                  <dt className="font-mono text-[9.5px] tracking-[0.1em] text-slate-400 uppercase pt-0.5">{k}</dt>
                  <dd className="font-medium text-ink">{v}</dd>
                </div>
              ))}
            </dl>
          </Panel>
        ))}
      </div>
    </div>
  );
}
