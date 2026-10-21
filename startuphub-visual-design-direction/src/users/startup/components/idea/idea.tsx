import {
  ArrowRight,
  CheckCircle2,
  FileText,
  History,
  Lightbulb,
  Plus,
  Sparkles,
  Users,
} from "lucide-react";
import {
  Badge,
  Card,
  PageHeader,
  Progress,
  Stat,
} from "@/components/app/widgets";

const idea = {
  name: "Per-acre crop stress early warning",
  version: "v3.2 · iteration 9",
  statement:
    "Every hectare tells a story daily. Lumen reads it before damage becomes visible — turning prevention from luxury into default.",
  problem:
    "Field scouting covers <5% of area; visible symptoms mean 30–40% yield already lost.",
  solution:
    "Multispectral inference flags water/pest/nutrient stress at per-acre resolution, 10–14 days ahead of the eye.",
  vps: [
    "10× cheaper than agronomist-per-acre scouting",
    "Works on existing satellite passes — no hardware for farmers",
    "Action maps, not dashboards — field teams just execute",
  ],
};

const evaluation = [
  { dim: "Problem clarity", score: 92 },
  { dim: "Solution fit", score: 84 },
  { dim: "Market size", score: 88 },
  { dim: "Moat / IP", score: 71 },
  { dim: "Feasibility", score: 79 },
  { dim: "Scalability", score: 90 },
];

const experiments = [
  {
    name: "50-farmer interview wave",
    status: "Completed",
    learning: "Water stress is felt, pest stress is missed",
    tone: "good" as const,
  },
  {
    name: "Landing page A/B — agribusiness",
    status: "Live",
    learning: "4.6% signup; CFO angle beats agronomy angle 2:1",
    tone: "accent" as const,
  },
  {
    name: "Per-acre pricing test",
    status: "Live",
    learning: "₹180–220/acre shows 71% acceptance",
    tone: "accent" as const,
  },
  {
    name: "Channel: FPO partnerships",
    status: "Designing",
    learning: "Hypothesis: FPOs cut CAC 60%",
    tone: "default" as const,
  },
];

const discovery = {
  interviews: 47,
  segments: 3,
  validated: "Agri-businesses with 5K+ acre networks",
  rejected: "Individual smallholders (service cost too high)",
};

/* ── Assumptions under test ─────────────────────────────────
   Every claim the idea still rests on, and the evidence
   currently backing it.                                         */
const assumptions = [
  {
    assumption: "Farmers will pay ₹200/acre for early warning",
    evidence: "71% acceptance at ₹180–220 across 89 pricing responses",
    state: "Tested",
    tone: "good" as const,
  },
  {
    assumption: "The problem is felt by operations, not just owners",
    evidence: "20 interviews with operations heads, all unprompted",
    state: "Tested",
    tone: "good" as const,
  },
  {
    assumption: "FPO partnerships cut acquisition cost materially",
    evidence: "2 FPO discussions in progress — not yet measured",
    state: "In progress",
    tone: "accent" as const,
  },
  {
    assumption: "Detection is repeatable across a second agri belt",
    evidence: "Karnataka wave has 7 interviews — too thin to conclude",
    state: "Untested",
    tone: "warn" as const,
  },
];

const versionHistory = [
  { version: "v3.2", date: "This week", change: "Per-acre pricing model locked at ₹180–220", author: "Ravi Sharma" },
  { version: "v3.1", date: "2 weeks ago", change: "Segment narrowed to large-scale agri-farms", author: "Ravi Sharma" },
  { version: "v3.0", date: "1 month ago", change: "Rebuilt on multispectral inference pipeline", author: "Meera Iyer" },
  { version: "v2.4", date: "2 months ago", change: "WhatsApp alert channel added", author: "Arjun Rao" },
];

const contributors = [
  { name: "Ravi Sharma", role: "Founder & CEO", contribution: "Problem framing, pricing" },
  { name: "Meera Iyer", role: "CTO", contribution: "Inference pipeline, model" },
  { name: "Arjun Rao", role: "Head of Agronomy", contribution: "Stress taxonomy, field ops" },
  { name: "Kavya Nair", role: "Growth", contribution: "FPO channel, discovery" },
];

const nextMilestones = [
  { milestone: "Patent filing complete", due: "In 8 weeks", state: "On track", tone: "good" as const },
  { milestone: "Three signed pilot partners", due: "In 12 weeks", state: "On track", tone: "good" as const },
  { milestone: "Second agri belt validated", due: "In 6 weeks", state: "At risk", tone: "warn" as const },
  { milestone: "CAC below ₹4,000 per acre", due: "In 16 weeks", state: "Not started", tone: "default" as const },
];

const experimentTone = (tone: "good" | "accent" | "default") =>
  tone === "good" ? "good" : tone === "accent" ? "accent" : "default";

export function IdeaValidation() {
  return (
    <div className="space-y-5">
      <PageHeader
        title="Idea & Validation"
        desc="The living record of what you believe — and how hard you've tested it."
        actions={
          <button className="inline-flex items-center gap-1.5 rounded-[10px] bg-accent px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-accent-deep">
            <Plus className="h-3.5 w-3.5" /> New experiment
          </button>
        }
      />

      {/* 1 — Headline metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat icon={Lightbulb} label="Idea score" value="82/100" delta="+7 vs. v3.1" tone="good" />
        <Stat icon={CheckCircle2} label="Experiments run" value="6" hint="2 live right now" tone="default" />
        <Stat icon={Users} label="Interviews" value="47" delta="38 valid" tone="good" />
        <Stat icon={FileText} label="Iterations" value="9" hint="across 4 versions" tone="default" />
      </div>

      {/* 2 — Idea score + statement */}
      <div className="grid gap-5 lg:grid-cols-3">
        <Card title="Idea score" className="lg:col-span-1">
          <div className="text-center">
            <span className="text-5xl font-semibold tracking-tight text-ink">82</span>
            <span className="text-lg text-slate-400">/100</span>
            <p className="mt-2 text-[12.5px] text-slate-500">
              Strong idea — IP dimension is pulling it down.
            </p>
          </div>
          <div className="mt-5 flex items-start gap-2.5 rounded-xl bg-accent-mist p-3.5">
            <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
            <p className="text-[12px] leading-relaxed text-slate-600">
              <span className="font-semibold text-ink">Copilot:</span> Your
              complete-spec filing would push Moat/IP above 80 — single
              highest-leverage move this month.
            </p>
          </div>
        </Card>

        <Card
          title={idea.name}
          className="lg:col-span-2"
          action={<Badge tone="accent">{idea.version}</Badge>}
        >
          <p className="text-[14.5px] font-medium italic leading-relaxed text-ink">
            “{idea.statement}”
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl bg-slate-50 p-3.5">
              <p className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                Problem
              </p>
              <p className="mt-1 text-[12.5px] leading-relaxed text-slate-600">
                {idea.problem}
              </p>
            </div>
            <div className="rounded-xl bg-accent-mist p-3.5">
              <p className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-accent">
                Solution
              </p>
              <p className="mt-1 text-[12.5px] leading-relaxed text-slate-600">
                {idea.solution}
              </p>
            </div>
          </div>
          <ul className="mt-4 space-y-2">
            {idea.vps.map((v) => (
              <li
                key={v}
                className="flex items-start gap-2.5 text-[13px] text-slate-600"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {v}
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* 3 — Evaluation + experiments */}
      <div className="grid gap-5 lg:grid-cols-2">
        <Card title="Idea evaluation" action={<Badge tone="accent">6 dimensions</Badge>}>
          <div className="space-y-3.5">
            {evaluation.map((e) => (
              <div key={e.dim} className="flex items-center gap-3">
                <span className="w-28 shrink-0 text-[12.5px] font-medium text-slate-600">
                  {e.dim}
                </span>
                <Progress
                  value={e.score}
                  tone={e.score < 75 ? "warn" : "accent"}
                  className="flex-1"
                />
                <span className="w-8 text-right text-[12.5px] font-semibold tabular-nums text-ink">
                  {e.score}
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card
          title="Validation experiments"
          action={<Badge tone="accent">2 live</Badge>}
          pad={false}
        >
          <ul className="divide-y divide-line">
            {experiments.map((x) => (
              <li key={x.name} className="px-5 py-3.5">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[13.5px] font-medium text-ink">{x.name}</p>
                  <Badge tone={experimentTone(x.tone)}>{x.status}</Badge>
                </div>
                <p className="mt-1 text-[12px] leading-snug text-slate-500">
                  {x.learning}
                </p>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* 4 — Assumptions */}
      <Card
        title="Assumptions under test"
        action={<Badge tone="warn">2 still untested</Badge>}
        pad={false}
      >
        <ul className="divide-y divide-line">
          {assumptions.map((a) => (
            <li key={a.assumption} className="px-5 py-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-[13px] font-semibold text-ink">{a.assumption}</p>
                <Badge
                  tone={a.tone === "good" ? "good" : a.tone === "accent" ? "accent" : "warn"}
                >
                  {a.state}
                </Badge>
              </div>
              <p className="mt-1 text-[12.5px] leading-relaxed text-slate-500">
                {a.evidence}
              </p>
            </li>
          ))}
        </ul>
      </Card>

      {/* 5 — Customer discovery summary */}
      <Card title="Customer discovery">
        <div className="grid gap-4 sm:grid-cols-4">
          {[
            ["Interviews", discovery.interviews],
            ["Segments tested", discovery.segments],
          ].map(([l, v]) => (
            <div key={l as string} className="rounded-xl border border-line p-4 text-center">
              <span className="text-2xl font-semibold text-ink tabular-nums">{v}</span>
              <span className="mt-1 block text-[11.5px] text-slate-400">{l}</span>
            </div>
          ))}
          <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-4">
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-emerald-600">
              Validated
            </p>
            <p className="mt-1 text-[12px] font-medium leading-snug text-ink">
              {discovery.validated}
            </p>
          </div>
          <div className="rounded-xl border border-red-100 bg-red-50/50 p-4">
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-red-400">
              Rejected
            </p>
            <p className="mt-1 text-[12px] font-medium leading-snug text-ink">
              {discovery.rejected}
            </p>
          </div>
        </div>
      </Card>

      {/* 6 — Version history */}
      <Card
        title="Version history"
        action={<History className="h-4 w-4 text-slate-300" />}
        pad={false}
      >
        <ul className="divide-y divide-line">
          {versionHistory.map((v) => (
            <li key={v.version} className="flex flex-wrap items-center gap-4 px-5 py-3.5">
              <Badge tone="accent">{v.version}</Badge>
              <span className="w-24 shrink-0 text-[11.5px] text-slate-400">{v.date}</span>
              <p className="min-w-0 flex-1 text-[12.5px] text-slate-600">{v.change}</p>
              <span className="text-[11.5px] text-slate-400">{v.author}</span>
            </li>
          ))}
        </ul>
      </Card>

      {/* 7 — Next milestones */}
      <Card title="Next milestones" action={<Badge tone="accent">4 tracked</Badge>} pad={false}>
        <ul className="divide-y divide-line">
          {nextMilestones.map((m) => (
            <li key={m.milestone} className="flex flex-wrap items-center gap-3 px-5 py-3.5">
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-semibold text-ink">{m.milestone}</p>
                <p className="mt-0.5 text-[11.5px] text-slate-400">{m.due}</p>
              </div>
              <Badge
                tone={m.tone === "good" ? "good" : m.tone === "warn" ? "warn" : "default"}
              >
                {m.state}
              </Badge>
            </li>
          ))}
        </ul>
      </Card>

      {/* 8 — Contributors */}
      <Card title="Contributors" action={<Users className="h-4 w-4 text-slate-300" />} pad={false}>
        <ul className="divide-y divide-line">
          {contributors.map((c) => (
            <li key={c.name} className="flex flex-wrap items-center gap-4 px-5 py-3.5">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent-soft text-[11px] font-bold text-accent">
                {c.name
                  .split(" ")
                  .map((w) => w[0])
                  .join("")}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-semibold text-ink">{c.name}</p>
                <p className="text-[11.5px] text-slate-400">{c.role}</p>
              </div>
              <span className="text-[11.5px] text-slate-500">{c.contribution}</span>
            </li>
          ))}
        </ul>
      </Card>

      {/* 9 — Where to go next */}
      <Card title="Where to go next">
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            {
              label: "Idea Evaluation",
              href: "/founder/idea/evaluation",
              body: "See the full dimension-by-dimension scoring and the actions it produced.",
            },
            {
              label: "Idea Validation",
              href: "/founder/idea/validation",
              body: "Track the experiment pipeline, decision gates and every learning logged.",
            },
            {
              label: "Customer Discovery",
              href: "/founder/idea/discovery",
              body: "Read the interviews, segment fit and the geography breakdown.",
            },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group rounded-xl border border-line p-4 transition-colors hover:border-accent"
            >
              <p className="flex items-center gap-1.5 text-[13px] font-semibold text-ink">
                {link.label}
                <ArrowRight className="h-3.5 w-3.5 text-accent transition-transform group-hover:translate-x-0.5" />
              </p>
              <p className="mt-1 text-[12px] leading-relaxed text-slate-500">
                {link.body}
              </p>
            </a>
          ))}
        </div>
      </Card>
    </div>
  );
}
