import { TrendingUp } from "lucide-react";
import { Container, SectionHead } from "@/components/ui";
import { Reveal } from "@/components/motion";
import AreaChart from "@/views/ecosystem-insights/components/insight-charts";
import {
  cohortGrowth,
  ecoKpis,
  emergingSectors,
  fundingTrend,
  geoDistribution,
  incubationTrends,
  industryBars,
  investmentByRound,
  iprTrends,
} from "@/views/ecosystem-insights/constants/insights";

export function KpiRow() {
  return (
    <section className="bg-white py-20 md:py-24">
      <Container>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {ecoKpis.map((k, i) => (
            <Reveal key={k.l} delay={i * 0.06}>
              <div className="rounded-2xl border border-line bg-white p-6">
                <div className="text-[1.8rem] font-semibold leading-none tracking-tight text-ink tabular-nums">
                  {k.v}
                </div>
                <div className="mt-2 text-[13px] text-slate-500">{k.l}</div>
                <span className="mt-3 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[11px] font-semibold text-emerald-600">
                  <TrendingUp className="h-3 w-3" />
                  {k.d}
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-6 rounded-2xl border border-line bg-white p-6 md:p-8">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-[15px] font-semibold text-ink">Funding flow into the ecosystem</h2>
              <span className="rounded-full bg-accent-soft px-2.5 py-1 text-[11px] font-semibold text-accent">
                Trailing 12 months
              </span>
            </div>
            <AreaChart points={fundingTrend} id="ecoFunding" caption="Monthly deployed capital (indexed)" metric="₹8.4K Cr" />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

export function Distribution() {
  return (
    <section className="border-t border-line bg-soft py-24 md:py-32">
      <Container>
        <SectionHead
          eyebrow="Distribution"
          title={
            <>
              Where the startups are —{" "}
              <span className="text-accent">and what they build.</span>
            </>
          }
        />
        <div className="mt-14 grid gap-6 lg:grid-cols-2 md:mt-16">
          <Reveal>
            <div className="h-full rounded-2xl border border-line bg-white p-7 md:p-8">
              <h3 className="text-[15.5px] font-semibold text-ink">Startups by industry</h3>
              <div className="mt-6 space-y-4">
                {industryBars.map((b) => (
                  <div key={b.name}>
                    <div className="flex items-baseline justify-between text-[13px]">
                      <span className="font-medium text-slate-600">{b.name}</span>
                      <span className="font-semibold text-ink tabular-nums">{b.startups.toLocaleString()}</span>
                    </div>
                    <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-slate-100">
                      <div className="h-full rounded-full bg-accent" style={{ width: `${b.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="h-full rounded-2xl border border-line bg-white p-7 md:p-8">
              <div className="flex items-center justify-between">
                <h3 className="text-[15.5px] font-semibold text-ink">Geographic distribution</h3>
                <span className="rounded-full bg-emerald-50 px-2 py-1 text-[11px] font-semibold text-emerald-600">
                  Tier 2/3 +34% YoY
                </span>
              </div>
              <div className="mt-6 space-y-4">
                {geoDistribution.map((g) => (
                  <div key={g.city}>
                    <div className="flex items-baseline justify-between text-[13px]">
                      <span className="font-medium text-slate-600">{g.city}</span>
                      <span className="font-semibold text-ink tabular-nums">{g.count}</span>
                    </div>
                    <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-slate-100">
                      <div className="h-full rounded-full bg-ink/70" style={{ width: `${g.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-6 border-t border-line pt-4 text-[12.5px] leading-relaxed text-slate-400">
                The tier-2/3 surge is the single biggest structural shift in the ecosystem since 2024.
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

export function GrowthAndCapital() {
  return (
    <section className="bg-white py-24 md:py-32">
      <Container>
        <div className="grid gap-6 lg:grid-cols-3">
          {/* cohort survival */}
          <Reveal className="h-full">
            <div className="flex h-full flex-col rounded-2xl border border-line bg-white p-7">
              <h3 className="text-[15.5px] font-semibold text-ink">Startup growth — cohort survival</h3>
              <p className="mt-1 text-[12.5px] text-slate-400">% of each cohort alive &amp; active today</p>
              <div className="mt-6 flex flex-1 flex-col justify-end gap-4">
                {cohortGrowth.map((c) => (
                  <div key={c.cohort} className="flex items-center gap-3">
                    <span className="w-24 text-[12px] font-medium text-slate-500">{c.cohort}</span>
                    <div className="h-8 flex-1 overflow-hidden rounded-lg bg-slate-100">
                      <div
                        className="flex h-full items-center justify-end rounded-lg bg-accent pr-2 text-[11px] font-semibold text-white"
                        style={{ width: `${c.survival}%` }}
                      >
                        {c.survival}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-6 border-t border-line pt-4 text-[12.5px] text-slate-400">
                Each newer cohort survives better — structured support compounds.
              </p>
            </div>
          </Reveal>

          {/* investment rounds */}
          <Reveal delay={0.08} className="h-full">
            <div className="flex h-full flex-col rounded-2xl border border-line bg-white p-7">
              <h3 className="text-[15.5px] font-semibold text-ink">Investment trends — rounds closed</h3>
              <p className="mt-1 text-[12.5px] text-slate-400">Rounds by stage · last 12 months</p>
              <div className="mt-6 flex flex-1 flex-col justify-center gap-4">
                {investmentByRound.map((r) => (
                  <div key={r.round}>
                    <div className="flex items-baseline justify-between text-[13px]">
                      <span className="font-medium text-slate-600">{r.round}</span>
                      <span className="font-semibold text-ink tabular-nums">{r.count}</span>
                    </div>
                    <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-slate-100">
                      <div className="h-full rounded-full bg-accent" style={{ width: `${r.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-6 border-t border-line pt-4 text-[12.5px] text-slate-400">
                Early-stage volume is healthy; Series A is where networks decide outcomes.
              </p>
            </div>
          </Reveal>

          {/* IPR trends */}
          <Reveal delay={0.16} className="h-full">
            <div className="flex h-full flex-col rounded-2xl border border-line bg-white p-7">
              <h3 className="text-[15.5px] font-semibold text-ink">IPR trends — filings per year</h3>
              <p className="mt-1 text-[12.5px] text-slate-400">Patents, trademarks &amp; designs</p>
              <div className="mt-6 flex flex-1 items-end justify-between gap-3">
                {iprTrends.map((t) => (
                  <div key={t.year} className="flex flex-1 flex-col items-center gap-2">
                    <span className="text-[11px] font-semibold tabular-nums text-ink">
                      {t.filings.toLocaleString()}
                    </span>
                    <div className="flex h-36 w-full items-end overflow-hidden rounded-lg bg-slate-100">
                      <div className="w-full rounded-lg bg-accent" style={{ height: `${t.pct}%`, opacity: 0.55 + t.pct / 200 }} />
                    </div>
                    <span className="text-[11px] text-slate-400">{t.year}</span>
                  </div>
                ))}
              </div>
              <p className="mt-6 border-t border-line pt-4 text-[12.5px] text-slate-400">
                Funded startups now file 2.4× more IP than in 2022.
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

export function IncubationAndEmerging() {
  return (
    <section className="border-t border-line bg-soft py-24 md:py-32">
      <Container>
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <div>
            <SectionHead
              align="left"
              eyebrow="Incubation Trends"
              title={
                <>
                  Incubation works.{" "}
                  <span className="text-accent">The gap is widening.</span>
                </>
              }
              lead="Startups inside structured programs don't just survive more — they raise faster and file more IP than their unincubated peers."
            />
            <div className="mt-8 grid grid-cols-3 gap-4">
              {incubationTrends.map((t, i) => (
                <Reveal key={t.l} delay={i * 0.06}>
                  <div className="rounded-2xl border border-line bg-white p-5 text-center">
                    <span className="block text-xl font-semibold tracking-tight text-accent tabular-nums">{t.v}</span>
                    <span className="mt-1.5 block text-[11px] leading-tight text-slate-500">{t.l}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div>
            <SectionHead
              align="left"
              eyebrow="Emerging Sectors"
              title={
                <>
                  Formation is spiking{" "}
                  <span className="text-accent">in six places.</span>
                </>
              }
              lead="New startup registrations by theme, trailing quarter."
            />
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {emergingSectors.map((s, i) => (
                <Reveal key={s.name} delay={i * 0.04}>
                  <div className="flex items-center justify-between rounded-xl border border-line bg-white px-4.5 py-3.5 transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-16px_rgba(11,18,32,0.2)]">
                    <span className="text-[14px] font-medium text-ink">{s.name}</span>
                    <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[11.5px] font-semibold text-emerald-600">
                      <TrendingUp className="h-3 w-3" />
                      {s.growth}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
