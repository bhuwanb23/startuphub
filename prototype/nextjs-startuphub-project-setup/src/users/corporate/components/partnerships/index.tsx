import {
  ArrowRight,
  Award,
  CalendarDays,
  CheckCircle2,
  GraduationCap,
  Handshake,
  History,
  Plus,
  TrendingUp,
} from "lucide-react";
import { Bar, Chip, Panel, ScoreRing, StatCard } from "@/components/app/widgets";
import { PageHead } from "@/components/app/boards";
import {
  COLLAB_PROJECTS,
  PARTNER_HISTORY,
  PARTNERSHIPS,
} from "../../constants/corporate-data";

const PSTAGE_TONE: Record<string, "rise" | "accent" | "slate"> = {
  Active: "rise", "Partner track": "accent", Prospects: "accent", Completed: "slate",
};

/* ── Partnership Management ─────────────────────────────────── */
export function PartnershipManagement() {
  return (
    <div className="space-y-5">
      <PageHead
        title="Partnership management"
        sub="6 active partnerships + one in partner-track"
        action={
          <button className="flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-accent-deep">
            <Plus className="h-3.5 w-3.5" /> Start partnership
          </button>
        }
      />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <StatCard label="Active partnerships" value="6" delta="1 in structuring" icon={Handshake} />
        <StatCard label="Partnership value" value="₹5.8 Cr pot." delta="verified pipeline" icon={TrendingUp} />
        <StatCard label="Avg. partner score" value="86" delta="quarterly reviews" icon={Award} />
      </div>
      <Panel pad={false}>
        <ul className="divide-y divide-line">
          {PARTNERSHIPS.map((p) => (
            <li key={p.id} className="grid items-center gap-4 px-5 py-4.5 transition-colors hover:bg-soft lg:grid-cols-[1fr_210px_auto]">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-[14px] font-semibold text-ink">{p.partner}</p>
                  <Chip tone="line">{p.type}</Chip>
                  <Chip tone={PSTAGE_TONE[p.stage]}>{p.stage}</Chip>
                </div>
                <p className="mt-0.5 text-[12px] text-slate-400">{p.area} · since {p.since}</p>
              </div>
              <div className="flex items-center gap-3">
                <Bar pct={p.score} className="flex-1" barClass={p.score >= 85 ? "bg-rise" : "bg-accent"} />
                <span className="w-6 text-right font-mono text-[11px] font-semibold text-ink">{p.score}</span>
              </div>
              <span className="font-mono text-[11.5px] font-semibold text-ink">{p.value}</span>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}

/* ── Collaboration Management ───────────────────────────────── */
export function CollaborationManagement() {
  return (
    <div className="space-y-5">
      <PageHead
        title="Collaborations"
        sub="Joint projects with tasks, milestones and outcomes"
        action={<button className="rounded-lg bg-accent px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-accent-deep">+ New collaboration</button>}
      />
      <div className="grid gap-4 lg:grid-cols-3">
        {COLLAB_PROJECTS.map((c) => {
          const [done, total] = c.milestones.split("/").map(Number);
          const pct = Math.round((done / total) * 100);
          return (
            <Panel key={c.name} className="transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft">
              <div className="flex items-start justify-between">
                <h3 className="text-[15px] font-semibold text-ink">{c.name}</h3>
                <Chip tone={c.status === "On track" ? "rise" : "amber"}>{c.status}</Chip>
              </div>
              <p className="mt-1.5 text-[12px] text-slate-400">With {c.with}</p>
              <div className="mt-4">
                <div className="mb-1.5 flex justify-between text-[11px]">
                  <span className="text-slate-400">Milestones</span>
                  <span className="font-semibold text-ink">{c.milestones}</span>
                </div>
                <Bar pct={pct} barClass={c.status === "On track" ? "bg-rise" : "bg-amber-dim"} />
              </div>
              <button className="mt-4 w-full rounded-lg border border-line py-2 text-[12px] font-semibold text-ink hover:bg-soft">Open workspace</button>
            </Panel>
          );
        })}
      </div>
    </div>
  );
}

/* ── Strategic Partnerships ─────────────────────────────────── */
export function StrategicPartnerships() {
  return (
    <div className="space-y-5">
      <PageHead
        title="Strategic partnerships"
        sub="Partnerships that change the business, not just the budget line"
      />
      <div className="grid gap-4 lg:grid-cols-2">
        {PARTNERSHIPS.filter((p) => ["PT-006", "PT-004"].includes(p.id)).map((p) => (
          <Panel key={p.id} className="border-accent/25 ring-1 ring-accent/10">
            <div className="flex items-start justify-between">
              <Chip tone="rise">Strategic</Chip>
              <span className="font-mono text-[11px] font-bold text-accent">Score {p.score}</span>
            </div>
            <h3 className="mt-3 text-[17px] font-semibold tracking-[-0.015em] text-ink">{p.partner}</h3>
            <p className="mt-1.5 text-[12.5px] leading-relaxed text-slate-500">{p.area}</p>
            <ul className="mt-3.5 space-y-2 text-[12px] text-slate-600">
              {p.id === "PT-006" ? (
                <>
                  <li className="flex gap-2"><CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-rise" /> ESG-auditable soil data across supplier base</li>
                  <li className="flex gap-2"><CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-rise" /> Preferred-buyer economics for carbon-positive lots</li>
                  <li className="flex gap-2"><CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-rise" /> Export documentation parity for EU 2027 rules</li>
                </>
              ) : (
                <>
                  <li className="flex gap-2"><CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-rise" /> Joint shelf-life research with shared IP lane</li>
                  <li className="flex gap-2"><CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-rise" /> 6 co-patents filed together since 2024</li>
                  <li className="flex gap-2"><CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-rise" /> Talent pipeline: 9 researchers seconded</li>
                </>
              )}
            </ul>
          </Panel>
        ))}
      </div>
    </div>
  );
}

/* ── Partnership Pipeline ───────────────────────────────────── */
const PP_STAGES = [
  { l: "Discovery", n: 11 }, { l: "Evaluation", n: 6 }, { l: "Engagement", n: 4 },
  { l: "Negotiation", n: 2 }, { l: "Agreement", n: 1 }, { l: "Active", n: 6 },
  { l: "Review", n: 2 }, { l: "Renewal", n: 2 },
];

export function PartnershipPipeline() {
  return (
    <div className="space-y-5">
      <PageHead title="Partnership pipeline" sub="Discovery → renew, expand or close" />
      <div className="no-scrollbar -mx-4 overflow-x-auto px-4 lg:mx-0 lg:px-0">
        <div className="flex min-w-[1000px] items-stretch gap-2">
          {PP_STAGES.map((s, i) => (
            <div key={s.l} className="flex flex-1 items-center gap-2">
              <div className={`flex-1 rounded-xl border p-3.5 ${i >= 5 ? "border-rise/30 bg-rise-tint" : "border-line bg-white"}`}>
                <p className="font-mono text-[8.5px] tracking-[0.14em] text-slate-400 uppercase">{s.l}</p>
                <p className="mt-1.5 text-[22px] font-semibold tracking-tight text-ink">{s.n}</p>
              </div>
              {i < PP_STAGES.length - 1 && <ArrowRight className="h-3.5 w-3.5 shrink-0 text-slate-300" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Partner Performance ────────────────────────────────────── */
export function PartnerPerformance() {
  return (
    <div className="space-y-5">
      <PageHead
        title="Partner performance"
        sub="Quarterly scorecards across KPIs, ROI and collaboration quality"
        action={<Chip tone="rise" className="px-3 py-1.5">All partners reviewed Q4</Chip>}
      />
      <Panel pad={false}>
        <ul className="divide-y divide-line">
          {PARTNERSHIPS.filter((p) => p.stage === "Active").map((p) => (
            <li key={p.id} className="flex items-center gap-4 px-5 py-4">
              <ScoreRing score={p.score} size={42} />
              <div className="min-w-0 flex-1">
                <p className="text-[13.5px] font-semibold text-ink">{p.partner}</p>
                <p className="mt-0.5 text-[11.5px] text-slate-400">{p.area}</p>
              </div>
              {p.id === "PT-006" && <Chip tone="rise">ROI 4.1× · on track</Chip>}
              {p.id === "PT-004" && <Chip tone="accent">2 joint filings in Q1</Chip>}
              {p.id === "PT-002" && <Chip tone="rise">9 co-op students placed</Chip>}
              {p.id === "PT-001" && <Chip tone="rise">2 challenges co-hosted</Chip>}
            </li>
          ))}
        </ul>
      </Panel>
      <Panel title="What good looks like" sub="Scorecard components">
        <div className="grid gap-3 sm:grid-cols-4">
          {[
            { l: "Delivery vs. milestones", w: "30%" },
            { l: "Business impact", w: "30%" },
            { l: "Collaboration quality", w: "20%" },
            { l: "Strategic alignment", w: "20%" },
          ].map((x) => (
            <div key={x.l} className="rounded-lg border border-line p-4 text-center">
              <p className="text-[11.5px] font-medium text-slate-500">{x.l}</p>
              <p className="mt-2 font-mono text-[16px] font-semibold text-accent">{x.w}</p>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

/* ── Partnership History ────────────────────────────────────── */
export function PartnershipHistory() {
  return (
    <div className="space-y-5">
      <PageHead
        title="Partnership history"
        sub="What we learned from partnerships that ended"
        action={<History className="h-4 w-4 text-slate-300" />}
      />
      <Panel pad={false}>
        <ul className="divide-y divide-line">
          {PARTNER_HISTORY.map((h) => (
            <li key={h.partner} className="px-5 py-5">
              <div className="flex flex-wrap items-center gap-2.5">
                <p className="text-[14px] font-semibold text-ink">{h.partner}</p>
                <Chip tone="slate">{h.years}</Chip>
                <Chip tone="amber">Closed</Chip>
              </div>
              <p className="mt-2 text-[12.5px] text-slate-600"><b>Outcome:</b> {h.outcome}</p>
              <p className="mt-1.5 flex gap-2 rounded-lg bg-accent-mist px-3.5 py-2.5 text-[12px] font-medium text-ink">
                <GraduationCap className="h-3.5 w-3.5 shrink-0 text-accent" />
                Lesson baked into playbook: {h.lesson}
              </p>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}
