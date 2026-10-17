import { Container, SectionHead } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { competitors, marketTrends, sectors } from "@/views/market-intelligence/constants/data";
import { cn } from "@/lib/utils";

export function IndustryInsights() {
  return (
    <section className="border-t border-line bg-soft py-24 md:py-32">
      <Container>
        <SectionHead
          eyebrow="Industry Insights"
          title={
            <>
              Four sectors, <span className="text-accent">four very different games.</span>
            </>
          }
          lead="Live sector cards from the intelligence layer — refreshed weekly."
        />
        <div className="mt-14 grid gap-5 md:mt-16 md:grid-cols-2">
          {sectors.map((s, i) => (
            <Reveal key={s.name} delay={(i % 2) * 0.07} className="h-full">
              <div className="flex h-full flex-col rounded-2xl border border-line bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_44px_-24px_rgba(11,18,32,0.2)]">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold tracking-tight text-ink">{s.name}</h3>
                  <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11.5px] font-semibold text-emerald-600">
                    {s.growth} YoY
                  </span>
                </div>
                <div className="mt-5 grid grid-cols-3 divide-x divide-line rounded-xl border border-line">
                  {[
                    { v: s.size, l: "Market size" },
                    { v: s.startups, l: "Startups" },
                    { v: `${s.momentum}`, l: "Momentum" },
                  ].map((m) => (
                    <div key={m.l} className="px-4 py-3 text-center">
                      <span className="block text-[16px] font-semibold text-ink tabular-nums">{m.v}</span>
                      <span className="block text-[10.5px] text-slate-400">{m.l}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-accent" style={{ width: `${s.momentum}%` }} />
                </div>
                <p className="mt-4 text-sm leading-relaxed text-slate-500">{s.signal}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function MarketTrends() {
  return (
    <section className="bg-white py-24 md:py-32">
      <Container>
        <SectionHead
          eyebrow="Market Trends"
          title={
            <>
              The shifts that will matter{" "}
              <span className="text-accent">in your next board deck.</span>
            </>
          }
        />
        <div className="mt-14 space-y-4 md:mt-16">
          {marketTrends.map((t, i) => (
            <Reveal key={t.trend} delay={i * 0.05}>
              <div className="grid gap-4 rounded-2xl border border-line bg-white p-6 transition-colors hover:border-slate-300 md:grid-cols-[64px_1.4fr_1fr] md:items-center md:gap-8 md:p-7">
                <span className="text-2xl font-semibold tabular-nums text-accent">{t.pct}</span>
                <div>
                  <h3 className="text-[16.5px] font-semibold tracking-tight text-ink">{t.trend}</h3>
                  <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-slate-100 md:max-w-xs">
                    <div className="h-full rounded-full bg-accent" style={{ width: `${t.pct}%` }} />
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-slate-500">{t.note}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Competitor insights */}
        <div className="mt-20">
          <SectionHead
            eyebrow="Competitor Insights"
            title={
              <>
                Where the field is crowded —{" "}
                <span className="text-accent">and where it&apos;s empty.</span>
              </>
            }
            lead="A structural read of who competes for the startup's attention — and the whitespace they leave."
          />
          <div className="mt-12 overflow-hidden rounded-2xl border border-line">
            <div className="hidden grid-cols-[1.2fr_1fr_1.2fr_auto] gap-4 border-b border-line bg-slate-50 px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400 md:grid">
              <span>Archetype</span>
              <span>Coverage</span>
              <span>The gap they leave</span>
              <span>Threat</span>
            </div>
            {competitors.map((c, i) => (
              <Reveal key={c.archetype} delay={i * 0.04}>
                <div className="grid grid-cols-2 gap-3 border-b border-line px-6 py-5 last:border-b-0 md:grid-cols-[1.2fr_1fr_1.2fr_auto] md:items-center md:gap-4">
                  <span className="text-[14.5px] font-semibold text-ink">{c.archetype}</span>
                  <span className="text-[13px] text-slate-500">{c.coverage}</span>
                  <span className="col-span-2 text-[13px] font-medium text-slate-600 md:col-span-1">{c.gap}</span>
                  <span
                    className={cn(
                      "w-fit rounded-full px-2.5 py-1 text-[11px] font-semibold",
                      c.threat === "Medium"
                        ? "bg-amber-50 text-amber-600"
                        : "bg-slate-100 text-slate-500"
                    )}
                  >
                    {c.threat}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
