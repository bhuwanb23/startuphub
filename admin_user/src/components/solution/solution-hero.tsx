import { Check } from "lucide-react";
import { ButtonLink, Container, Eyebrow } from "@/components/ui";
import { Reveal } from "@/components/motion";
import type { SolutionData } from "./types";

export function SolutionHero({ data }: { data: SolutionData }) {
  const Icon = data.icon;
  return (
    <section className="relative overflow-hidden pb-20 pt-32 sm:pb-24 sm:pt-40">
      <div className="absolute inset-0 -z-10 bg-nodegrid" aria-hidden />
      <div
        className="absolute -top-32 left-1/2 -z-10 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-accent/[0.06] blur-3xl"
        aria-hidden
      />

      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal className="flex flex-col items-start gap-6">
            <Eyebrow>For {data.audience}</Eyebrow>
            <h1 className="text-balance text-[clamp(2.4rem,5vw,3.9rem)] font-semibold leading-[1.06] tracking-[-0.03em] text-ink">
              {data.title}
            </h1>
            <p className="max-w-lg text-pretty text-[17px] leading-relaxed text-slate-500">
              {data.lead}
            </p>
            <ul className="mt-1 space-y-3">
              {data.ticks.map((tick) => (
                <li
                  key={tick}
                  className="flex items-center gap-3 text-[14.5px] font-medium text-ink"
                >
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent-soft text-accent">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  {tick}
                </li>
              ))}
            </ul>
            <div className="mt-3 flex flex-wrap gap-3">
              <ButtonLink href="/register" arrow>
                {data.ctaLabel}
              </ButtonLink>
              <ButtonLink href={`/explore/startups`} variant="secondary">
                Explore the directory
              </ButtonLink>
            </div>
          </Reveal>

          {/* workspace panel preview */}
          <Reveal delay={0.15}>
            <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-pop">
              <div className="flex items-center gap-2 border-b border-line px-5 py-3.5">
                <Icon className="h-4 w-4 text-accent" strokeWidth={2.1} />
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                  {data.panel.title}
                </span>
                <span className="ml-auto inline-flex items-center gap-1.5">
                  <span className="ping-dot h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  <span className="text-[10px] font-semibold tracking-[0.16em] text-emerald-600">
                    LIVE
                  </span>
                </span>
              </div>
              <div className="divide-y divide-line">
                {data.panel.rows.map((row) => {
                  const RowIcon = row.icon;
                  return (
                    <div key={row.title} className="flex items-center gap-3.5 px-5 py-4">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent">
                        <RowIcon className="h-4 w-4" strokeWidth={2.1} />
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate text-[13.5px] font-semibold text-ink">
                          {row.title}
                        </span>
                        <span className="block text-[12px] text-slate-400">{row.sub}</span>
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="border-t border-line bg-accent-mist px-5 py-4">
                <p className="text-[26px] font-semibold leading-none tracking-[-0.02em] text-ink">
                  {data.panel.stat.value}
                </p>
                <p className="mt-1.5 text-[12px] font-medium text-slate-500">
                  {data.panel.stat.label}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
