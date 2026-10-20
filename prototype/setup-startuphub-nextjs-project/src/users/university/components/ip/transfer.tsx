import { ArrowRightLeft, Plus, Timer, TrendingUp } from "lucide-react";
import { PageIntro, StatCard } from "@/components/app/widgets";
import { TRANSFER_PIPELINE, TRANSFER_STATS } from "../../constants/ip-data";

const STAT_ICONS = [ArrowRightLeft, TrendingUp, Timer] as const;

export function TechnologyTransfer() {
  return (
    <div className="space-y-6">
      <PageIntro
        title="Technology transfer pipeline"
        description="From assessment to handover — each card is a technology moving toward an industry or startup home."
        action={
          <button className="inline-flex h-9 items-center gap-2 rounded-lg bg-accent px-4 text-[13px] font-semibold text-white transition-colors hover:bg-accent-deep">
            <Plus className="h-4 w-4" /> New transfer
          </button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-3">
        {TRANSFER_STATS.map((s, i) => (
          <StatCard key={s.label} label={s.label} value={s.value} delta={s.delta} icon={STAT_ICONS[i]} />
        ))}
      </div>

      <div className="no-scrollbar -mx-4 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="flex min-w-max gap-4">
          {TRANSFER_PIPELINE.map((col, colIdx) => (
            <div key={col.stage} className="w-[270px] shrink-0">
              <header className="mb-3 flex items-center gap-2 px-1">
                <span className={`h-2 w-2 rounded-full ${colIdx >= 2 ? "bg-accent" : "bg-slate-300"}`} />
                <h3 className="text-[12.5px] font-semibold uppercase tracking-[0.08em] text-slate-500">
                  {col.stage}
                </h3>
                <span className="ml-auto rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-bold text-slate-500">
                  {col.deals.length}
                </span>
              </header>

              <div className="space-y-3">
                {col.deals.map((deal) => (
                  <article
                    key={deal.tech}
                    className="rounded-xl border border-line bg-white p-4 shadow-[0_1px_2px_rgba(11,18,32,0.03)] transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-200 hover:shadow-card"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-[13.5px] font-semibold leading-snug text-ink">{deal.tech}</h4>
                      <span className="shrink-0 rounded-full bg-ink px-2 py-0.5 text-[10px] font-bold text-white">
                        {deal.trl}
                      </span>
                    </div>
                    <p className="mt-2.5 text-[12px] text-slate-500">
                      {deal.partner === "—" ? "Seeking partner" : deal.partner}
                    </p>
                    <p className="mt-3 border-t border-line pt-2.5 text-[12px] font-semibold text-accent-deep">
                      {deal.value}
                    </p>
                  </article>
                ))}
                {col.deals.length === 0 && (
                  <div className="rounded-xl border border-dashed border-slate-200 p-4 text-center text-[12px] text-slate-400">
                    Nothing here yet
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="rounded-xl border border-dashed border-slate-300 bg-white px-5 py-4 text-[13px] leading-relaxed text-slate-500">
        <span className="font-semibold text-ink">Playbook tip:</span> technologies
        that enter &ldquo;Matched&rdquo; with a named partner close{" "}
        <span className="font-semibold text-ink">2.8× faster</span> — run the
        startup matcher before listing anything publicly.
      </p>
    </div>
  );
}
