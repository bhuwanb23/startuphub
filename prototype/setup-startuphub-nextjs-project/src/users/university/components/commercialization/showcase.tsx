import { Eye, Globe2, MessagesSquare, Share2 } from "lucide-react";
import { PageIntro, StatCard } from "@/components/app/widgets";
import { SHOWCASE, SHOWCASE_STATS } from "../../constants/commercialization-data";

const STAT_ICONS = [Globe2, MessagesSquare, Eye] as const;

export function TechnologyShowcase() {
  return (
    <div className="space-y-6">
      <PageIntro
        title="Technology showcase"
        description="Published research outcomes visible to startups, corporates and investors — each profile drives licensing enquiries."
        action={
          <button className="inline-flex h-9 items-center gap-2 rounded-lg bg-accent px-4 text-[13px] font-semibold text-white transition-colors hover:bg-accent-deep">
            <Share2 className="h-4 w-4" /> Publish technology
          </button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-3">
        {SHOWCASE_STATS.map((s, i) => (
          <StatCard key={s.label} label={s.label} value={s.value} delta={s.delta} hint={s.hint} icon={STAT_ICONS[i]} />
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {SHOWCASE.map((t) => (
          <article
            key={t.name}
            className="rounded-xl border border-line bg-white p-5 shadow-[0_1px_2px_rgba(11,18,32,0.03)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card sm:p-6"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="rounded-full bg-accent-soft px-2.5 py-1 text-[11px] font-semibold text-accent-deep">
                  {t.category}
                </span>
                <h3 className="mt-3 text-[18px] font-semibold tracking-[-0.02em] text-ink">
                  {t.name}
                </h3>
              </div>
              <span className="shrink-0 rounded-full bg-ink px-2.5 py-1 text-[10.5px] font-bold text-white">
                {t.trl}
              </span>
            </div>

            <p className="mt-3 text-[13px] leading-relaxed text-slate-500">{t.applications}</p>

            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line pt-4 text-[12px]">
              <span className="font-medium text-slate-500">
                Prototype: <span className="text-ink">{t.prototype}</span>
              </span>
              <span className="flex items-center gap-1 font-medium text-slate-500">
                <MessagesSquare className="h-3.5 w-3.5 text-slate-400" />
                {t.enquiries} enquiries
              </span>
              <span
                className={`ml-auto rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                  t.licensing ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"
                }`}
              >
                {t.licensing ? "Licensing open" : "Collaboration only"}
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
