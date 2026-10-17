import { ArrowUpRight, Download, FileText } from "lucide-react";
import { Container, SectionHead } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { infographics, reports, startupTrends } from "@/views/market-intelligence/constants/data";

export function StartupTrends() {
  return (
    <section className="border-t border-line bg-soft py-24 md:py-32">
      <Container>
        <SectionHead
          eyebrow="Startup Trends"
          title={
            <>
              What founders started building{" "}
              <span className="text-accent">this quarter.</span>
            </>
          }
          lead="New-startup formation by theme, from live directory data."
        />
        <div className="mt-12 flex flex-wrap gap-2.5">
          {startupTrends.map((t, i) => (
            <Reveal key={t.tag} delay={i * 0.03}>
              <span className="group inline-flex cursor-default items-center gap-2 rounded-full border border-line bg-white px-4 py-2.5 transition-all hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-[0_10px_24px_-10px_rgba(49,87,232,0.3)]">
                <span className="text-[13.5px] font-medium text-ink">{t.tag}</span>
                <span className="rounded-full bg-emerald-50 px-1.5 py-px text-[11px] font-semibold text-emerald-600">
                  {t.growth}
                </span>
              </span>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function ReportsSection() {
  return (
    <section id="reports" className="bg-white py-24 md:py-32">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHead
            align="left"
            eyebrow="Reports"
            title={
              <>
                Deep work, <span className="text-accent">free to read.</span>
              </>
            }
            lead="Flagship research from the intelligence team — members download the data behind every chart."
          />
          <Reveal delay={0.1}>
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
              12 reports published
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </Reveal>
        </div>

        <div className="mt-12 space-y-3">
          {reports.map((r, i) => (
            <Reveal key={r.title} delay={i * 0.05}>
              <div className="group grid cursor-pointer grid-cols-[auto_1fr_auto] items-center gap-4 rounded-2xl border border-line bg-white px-5 py-5 transition-all hover:border-slate-300 hover:shadow-[0_14px_36px_-20px_rgba(11,18,32,0.2)] md:grid-cols-[auto_1fr_auto_auto_auto] md:gap-6 md:px-7">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent-soft text-accent">
                  <FileText className="h-4.5 w-4.5" />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-[15.5px] font-semibold text-ink">{r.title}</span>
                  <span className="mt-0.5 block text-[12.5px] text-slate-400">{r.kind}</span>
                </span>
                <span className="hidden text-[13px] text-slate-400 md:block">{r.pages}</span>
                <span className="hidden text-[13px] font-medium text-slate-500 md:block">{r.date}</span>
                <span className="grid h-9 w-9 place-items-center justify-self-end rounded-full border border-line text-slate-400 transition-all group-hover:border-accent group-hover:bg-accent group-hover:text-white">
                  <Download className="h-4 w-4" />
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function InfographicsSection() {
  return (
    <section className="border-t border-line bg-accent-mist py-24 md:py-32">
      <Container>
        <SectionHead
          eyebrow="Infographics"
          title={
            <>
              The market, <span className="text-accent">at a glance.</span>
            </>
          }
        />
        <div className="mt-14 grid gap-6 lg:grid-cols-3 md:mt-16">
          {/* funding split donut */}
          <Reveal className="h-full">
            <div className="flex h-full flex-col rounded-2xl border border-line bg-white p-7">
              <h3 className="text-[15.5px] font-semibold text-ink">Where Q1 funding went</h3>
              <div className="relative mx-auto mt-6 h-40 w-40">
                <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
                  <circle cx="50" cy="50" r="38" fill="none" stroke="#EDF1FE" strokeWidth="13" />
                  {infographics.fundingSplit.reduce(
                    (acc, s, i) => {
                      const dash = (s.pct / 100) * 238.76;
                      const el = (
                        <circle
                          key={s.label}
                          cx="50" cy="50" r="38" fill="none"
                          stroke={i === 0 ? "#3157E8" : i === 1 ? "#7A93F0" : i === 2 ? "#AEBEF7" : i === 3 ? "#CFD8FB" : "#E4E9FD"}
                          strokeWidth="13"
                          strokeDasharray={`${dash} 238.76`}
                          strokeDashoffset={-acc.offset}
                        />
                      );
                      return { els: [...acc.els, el], offset: acc.offset + dash };
                    },
                    { els: [] as React.ReactNode[], offset: 0 }
                  ).els}
                </svg>
                <div className="absolute inset-0 grid place-items-center text-center">
                  <div>
                    <span className="block text-xl font-semibold text-ink">₹8.4K Cr</span>
                    <span className="block text-[10.5px] text-slate-400">total deployed</span>
                  </div>
                </div>
              </div>
              <ul className="mt-6 space-y-2">
                {infographics.fundingSplit.map((s) => (
                  <li key={s.label} className="flex items-center gap-2.5 text-[13px] text-slate-600">
                    <span className="h-2 w-2 rounded-full bg-accent" style={{ opacity: 1 - infographics.fundingSplit.indexOf(s) * 0.18 }} />
                    {s.label}
                    <span className="ml-auto font-semibold text-ink tabular-nums">{s.pct}%</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* stage funnel */}
          <Reveal delay={0.08} className="h-full">
            <div className="flex h-full flex-col rounded-2xl border border-line bg-white p-7">
              <h3 className="text-[15.5px] font-semibold text-ink">The ecosystem funnel</h3>
              <div className="mt-6 flex flex-1 flex-col justify-center gap-3">
                {infographics.stageFunnel.map((s, i) => (
                  <div key={s.stage} className="flex items-center gap-3">
                    <span className="w-20 text-right text-[12px] font-medium text-slate-500">{s.stage}</span>
                    <div className="h-8 flex-1 overflow-hidden rounded-lg bg-slate-100">
                      <div
                        className="flex h-full items-center justify-end rounded-lg bg-accent pr-2.5 text-[11px] font-semibold text-white"
                        style={{ width: `${[100, 62, 42, 26, 14][i]}%`, opacity: 1 - i * 0.14 }}
                      >
                        {s.count}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-[12.5px] leading-relaxed text-slate-400">
                Every 100 ideas produce roughly 5 funded startups — the lifecycle exists to improve those odds.
              </p>
            </div>
          </Reveal>

          {/* quick facts */}
          <Reveal delay={0.16} className="h-full">
            <div className="flex h-full flex-col gap-4">
              {infographics.quickFacts.map((f) => (
                <div key={f.label} className="flex flex-1 flex-col justify-center rounded-2xl border border-line bg-white p-6">
                  <span className="text-[1.9rem] font-semibold leading-none tracking-tight text-accent tabular-nums">
                    {f.value}
                  </span>
                  <span className="mt-2 text-[13px] leading-snug text-slate-500">{f.label}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
