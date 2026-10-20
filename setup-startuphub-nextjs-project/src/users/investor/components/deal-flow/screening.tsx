import { ArrowRight, Check, X } from "lucide-react";
import {
  Avatar,
  Bar,
  PageIntro,
  Panel,
  StatCard,
} from "@/components/app/widgets";
import { ClipboardCheck, Timer, Zap } from "lucide-react";
import { DEALS } from "../../constants/dashboard-data";

const QUEUE = DEALS.filter(
  (d) => d.stage === "New" || d.stage === "Screening",
).sort((a, b) => b.score - a.score);

function scoreTone(score: number): "accent" | "ink" | "amber" {
  if (score >= 85) return "accent";
  if (score >= 72) return "ink";
  return "amber";
}

export function DealFlowScreening() {
  return (
    <div className="space-y-6">
      <PageIntro
        title="Screening queue"
        description="Score-ranked opportunities awaiting a first decision. Advance the strong fits, pass early on the rest — the queue learns from every call."
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="In queue" value={String(QUEUE.length)} hint="2 arrived today" icon={ClipboardCheck} />
        <StatCard label="Median screen time" value="36h" delta="-12h" hint="faster than Q4" icon={Timer} />
        <StatCard label="Avg fit score" value="79" delta="+4 pts" icon={Zap} />
      </div>

      <Panel
        title={`Awaiting decision · ${QUEUE.length}`}
        action={
          <span className="text-[12px] text-slate-400">Sorted by fit score</span>
        }
        bodyClassName="px-0 py-0 sm:px-0"
      >
        <ul className="divide-y divide-line">
          {QUEUE.map((deal) => (
            <li
              key={deal.id}
              className="flex flex-col gap-4 px-4.5 py-4 transition-colors hover:bg-soft sm:px-5 lg:flex-row lg:items-center"
            >
              <div className="flex min-w-0 flex-1 items-center gap-3.5">
                <Avatar name={deal.name} />
                <span className="min-w-0">
                  <span className="block truncate text-[14px] font-semibold text-ink">
                    {deal.name}
                  </span>
                  <span className="block truncate text-[12px] text-slate-400">
                    {deal.sector} · {deal.location} · {deal.thesis}
                  </span>
                </span>
              </div>

              <div className="flex items-center gap-6 lg:gap-8">
                <div className="w-36">
                  <div className="mb-1 flex items-center justify-between text-[11.5px]">
                    <span className="text-slate-400">Fit score</span>
                    <span className="font-bold text-ink">{deal.score}</span>
                  </div>
                  <Bar value={deal.score} tone={scoreTone(deal.score)} />
                </div>

                <div className="hidden w-28 text-[12px] sm:block">
                  <span className="block font-semibold text-ink">{deal.asking}</span>
                  <span className="block text-slate-400">{deal.source}</span>
                </div>

                <div className="flex gap-2">
                  <button className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-line bg-white px-3 text-[12px] font-medium text-slate-500 transition-colors hover:bg-soft">
                    <X className="h-3.5 w-3.5" /> Pass
                  </button>
                  <button className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-accent px-3 text-[12px] font-semibold text-white transition-colors hover:bg-accent-deep">
                    <Check className="h-3.5 w-3.5" /> Advance
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="border-t border-line px-4.5 py-3.5 sm:px-5">
          <a
            href="/investor/deal-flow/matching"
            className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-accent transition-colors hover:text-accent-deep"
          >
            See why these were matched to your thesis
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </Panel>
    </div>
  );
}
