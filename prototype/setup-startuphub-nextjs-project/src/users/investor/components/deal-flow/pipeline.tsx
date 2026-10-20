import { Download, MapPin, Plus, SlidersHorizontal } from "lucide-react";
import { PageIntro } from "@/components/app/widgets";
import { cn } from "@/lib/utils";
import { DEALS, DEAL_STAGES } from "../../constants/dashboard-data";

function scoreTone(score: number) {
  if (score >= 85) return "bg-accent text-white";
  if (score >= 70) return "bg-accent-soft text-accent-deep";
  return "bg-slate-100 text-slate-500";
}

export function DealFlowPipeline() {
  return (
    <div className="space-y-6">
      <PageIntro
        title="Deal flow pipeline"
        description="Every opportunity moving through the fund — ranked by fit score and updated in real time from the ecosystem."
        action={
          <div className="flex gap-2">
            <button className="inline-flex h-9 items-center gap-2 rounded-lg border border-line bg-white px-3.5 text-[13px] font-medium text-slate-600 transition-colors hover:bg-soft">
              <SlidersHorizontal className="h-4 w-4" /> Filters
            </button>
            <button className="inline-flex h-9 items-center gap-2 rounded-lg border border-line bg-white px-3.5 text-[13px] font-medium text-slate-600 transition-colors hover:bg-soft">
              <Download className="h-4 w-4" /> Export
            </button>
            <button className="inline-flex h-9 items-center gap-2 rounded-lg bg-accent px-4 text-[13px] font-semibold text-white transition-colors hover:bg-accent-deep">
              <Plus className="h-4 w-4" /> Add deal
            </button>
          </div>
        }
      />

      <div className="no-scrollbar -mx-4 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="flex min-w-max gap-4">
          {DEAL_STAGES.map((stage, stageIdx) => {
            const deals = DEALS.filter((d) => d.stage === stage);
            return (
              <div key={stage} className="w-[268px] shrink-0">
                <header className="mb-3 flex items-center gap-2 px-1">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      stageIdx >= 3 ? "bg-accent" : "bg-slate-300"
                    }`}
                  />
                  <h3 className="text-[12.5px] font-semibold uppercase tracking-[0.08em] text-slate-500">
                    {stage}
                  </h3>
                  <span className="ml-auto rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-bold text-slate-500">
                    {deals.length}
                  </span>
                </header>

                <div className="space-y-3">
                  {deals.map((deal) => (
                    <article
                      key={deal.id}
                      className="group cursor-pointer rounded-xl border border-line bg-white p-4 shadow-[0_1px_2px_rgba(11,18,32,0.03)] transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-200 hover:shadow-card"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="text-[14px] font-semibold tracking-[-0.01em] text-ink">
                            {deal.name}
                          </h4>
                          <p className="mt-0.5 text-[11.5px] text-slate-400">
                            {deal.sector}
                          </p>
                        </div>
                        <span
                          className={cn(
                            "rounded-full px-2 py-1 text-[11px] font-bold",
                            scoreTone(deal.score),
                          )}
                        >
                          {deal.score}
                        </span>
                      </div>

                      <p className="mt-3 text-[12px] font-medium leading-snug text-slate-600">
                        {deal.thesis}
                      </p>

                      <div className="mt-3.5 border-t border-line pt-3 text-[11.5px] text-slate-400">
                        <p className="flex items-center justify-between">
                          <span className="font-semibold text-ink">{deal.asking}</span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {deal.location}
                          </span>
                        </p>
                        <p className="mt-1.5 flex items-center justify-between">
                          <span>{deal.source}</span>
                          <span>{deal.updated}</span>
                        </p>
                      </div>
                    </article>
                  ))}

                  {deals.length === 0 && (
                    <div className="rounded-xl border border-dashed border-slate-200 p-4 text-center text-[12px] text-slate-400">
                      No deals in this stage
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
