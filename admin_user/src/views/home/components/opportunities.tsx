import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion";
import { ArrowGlyph, SectionHead } from "@/components/ui";
import type { HomeOpportunity } from "../constants/directory";

const TYPE_STYLE: Record<HomeOpportunity["type"], string> = {
  funding: "bg-accent-soft text-accent",
  incubation: "bg-emerald-50 text-emerald-700",
  challenge: "bg-amber-50 text-amber-700",
};

export function Opportunities({
  opportunities,
}: {
  opportunities: HomeOpportunity[];
}) {
  if (!opportunities.length) return null;

  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead
            eyebrow="Opportunities"
            title="Open doors, right now."
            lead="Live grants, cohorts and challenges flowing through the ecosystem — matched to your stage."
          />
          <Reveal delay={0.1}>
            <a
              href="/opportunities"
              className="group inline-flex items-center gap-1.5 pb-1 text-[14px] font-semibold text-accent"
            >
              View all opportunities
              <ArrowGlyph />
            </a>
          </Reveal>
        </div>

        <div className="mt-14">
          {opportunities.map((opp, i) => (
            <Reveal key={opp.id} delay={i * 0.05}>
              <a
                href="/opportunities"
                className="group grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-3 border-t border-line px-2 py-6 transition-colors last:border-b hover:bg-soft/70 sm:grid-cols-[120px_1fr_auto_auto] sm:px-4"
              >
                <span className="max-sm:col-span-2">
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-[10.5px] font-semibold uppercase tracking-[0.14em] ${TYPE_STYLE[opp.type]}`}
                  >
                    {opp.type}
                  </span>
                </span>
                <span>
                  <span className="block text-[16px] font-semibold tracking-tight text-ink transition-colors group-hover:text-accent">
                    {opp.title}
                  </span>
                  <span className="mt-1 block text-[13px] font-medium text-slate-500">
                    {opp.org} · {opp.meta}
                  </span>
                </span>
                <span className="hidden text-right text-[13px] font-semibold text-slate-500 sm:block">
                  {opp.deadline}
                </span>
                <span className="grid h-9 w-9 place-items-center justify-self-end rounded-full border border-line text-slate-400 transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-white">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
