import { BadgeCheck, Star } from "lucide-react";
import {
  Avatar,
  Bar,
  PageIntro,
  Panel,
  PanelLink,
} from "@/components/app/widgets";
import {
  ACHIEVEMENTS,
  RATING_BREAKDOWN,
  REVIEWS,
} from "../../constants/work-data";

export function TalentReputation() {
  return (
    <div className="space-y-6">
      <PageIntro
        title="Reputation"
        description="Verified ratings, written feedback and achievements — the proof layer startups read before they offer."
      />

      <div className="grid gap-4 xl:grid-cols-[1fr_1.8fr]">
        {/* rating summary */}
        <Panel title="Overall rating">
          <div className="flex items-center gap-5">
            <div className="text-center">
              <p className="text-[46px] font-semibold leading-none tracking-[-0.04em] text-ink">4.9</p>
              <div className="mt-1.5 flex justify-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="mt-1.5 text-[11.5px] text-slate-400">32 verified reviews</p>
            </div>
            <ul className="flex-1 space-y-2">
              {RATING_BREAKDOWN.map((r) => (
                <li key={r.stars} className="flex items-center gap-2.5 text-[12px]">
                  <span className="w-6 text-slate-500">{r.stars}★</span>
                  <Bar value={r.pct} className="flex-1" tone="accent" />
                  <span className="w-8 text-right font-medium text-slate-600">{r.pct}%</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-5 grid grid-cols-3 gap-3 border-t border-line pt-4 text-center">
            {[
              ["Communication", "5.0"],
              ["Reliability", "4.9"],
              ["Technical", "4.9"],
            ].map(([k, v]) => (
              <div key={k}>
                <p className="text-[17px] font-semibold text-ink">{v}</p>
                <p className="mt-0.5 text-[11px] text-slate-400">{k}</p>
              </div>
            ))}
          </div>
        </Panel>

        {/* reviews */}
        <Panel title="Client & startup feedback" action={<PanelLink href="#">All 32</PanelLink>}>
          <ul className="space-y-5">
            {REVIEWS.map((r) => (
              <li key={r.from} className="border-b border-line pb-5 last:border-0 last:pb-0">
                <div className="flex items-center justify-between gap-3">
                  <span className="flex items-center gap-3">
                    <Avatar name={r.from} />
                    <span>
                      <span className="block text-[13.5px] font-semibold text-ink">{r.from}</span>
                      <span className="block text-[11.5px] text-slate-400">{r.org}</span>
                    </span>
                  </span>
                  <span className="flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-[12px] font-bold text-amber-700">
                    <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" /> {r.rating}
                  </span>
                </div>
                <p className="mt-3 text-[13px] leading-relaxed text-slate-600">&ldquo;{r.text}&rdquo;</p>
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {r.strengths.map((s) => (
                    <span key={s} className="rounded-full bg-soft px-2.5 py-1 text-[11px] font-medium text-slate-600">
                      {s}
                    </span>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      {/* achievements + verification */}
      <Panel title="Achievements & verification">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {ACHIEVEMENTS.map((a) => (
            <div key={a.title} className="rounded-lg border border-line bg-soft px-4 py-4">
              <BadgeCheck className="h-5 w-5 text-accent" />
              <p className="mt-2.5 text-[13px] font-semibold leading-snug text-ink">{a.title}</p>
              <p className="mt-1 text-[11.5px] text-slate-400">{a.detail}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-[12px] leading-relaxed text-slate-500">
          Verified items are cryptographically signed into your StartupHub
          passport — startups see them without you sharing raw documents.
        </p>
      </Panel>
    </div>
  );
}
