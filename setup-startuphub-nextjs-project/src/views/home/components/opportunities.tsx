import {
  ArrowUpRight,
  CalendarClock,
  CircleDollarSign,
  Rocket,
  Trophy,
} from "lucide-react";
import type { Opportunity } from "@/db/schema";
import { Container, SectionHead } from "@/components/ui";
import { Reveal } from "@/components/motion";

const OPPORTUNITY_ICON = {
  funding: CircleDollarSign,
  incubation: Rocket,
  challenge: Trophy,
} as const;

export function Opportunities({
  opportunities,
}: {
  opportunities: Opportunity[];
}) {
  return (
    <section
      id="opportunities"
      className="border-y border-line bg-accent-mist py-24 sm:py-32"
    >
      <Container>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHead
            eyebrow="Opportunities"
            title="Doors that are open right now."
            className="flex-1"
          />
          <Reveal delay={120}>
            <p className="max-w-sm text-[15px] leading-relaxed text-slate-500">
              Funding windows, residencies and national challenges —
              deadline-aware and matched to your stage.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {opportunities.map((opp, i) => {
            const Icon =
              OPPORTUNITY_ICON[opp.type as keyof typeof OPPORTUNITY_ICON] ??
              CircleDollarSign;
            return (
              <Reveal key={opp.slug} delay={i * 90}>
                <article className="group flex h-full flex-col rounded-2xl border border-line bg-white p-6 shadow-card transition-all duration-500 hover:-translate-y-1 hover:border-accent-200 hover:shadow-lift sm:p-7">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-accent-deep">
                      <Icon className="h-3.5 w-3.5" />
                      {opp.type}
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-slate-300 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                  </div>
                  <h3 className="mt-5 text-[19px] font-semibold leading-snug tracking-[-0.02em] text-ink">
                    {opp.title}
                  </h3>
                  <p className="mt-1.5 text-[13.5px] text-slate-400">
                    {opp.org}
                  </p>
                  <div className="mt-6 flex items-center justify-between border-t border-line pt-4 text-[12.5px] font-medium text-slate-500 [margin-top:auto]">
                    <span className="flex items-center gap-1.5 font-semibold text-ink">
                      <Icon className="h-3.5 w-3.5 text-accent" />
                      {opp.amount}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <CalendarClock className="h-3.5 w-3.5 text-slate-400" />
                      {opp.deadline}
                    </span>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
