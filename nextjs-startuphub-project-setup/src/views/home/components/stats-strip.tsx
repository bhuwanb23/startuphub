import type { StatItem } from "@/lib/data";
import { AnimatedNumber, Reveal, SectionHeader } from "@/components/motion";

export function StatsStrip({ stats }: { stats: StatItem[] }) {
  return (
    <section className="border-t border-line bg-soft">
      <div className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <SectionHeader
          eyebrow="The ecosystem"
          title={
            <>
              One network,
              <br />
              compounding daily.
          </>
        }
        lede="Every startup, mentor, investor and institution connected to the platform makes the next connection more valuable."
        align="center"
      />

        <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-12 sm:mt-20 lg:grid-cols-5">
          {stats.map((s, i) => (
            <Reveal
              key={s.id}
              delay={i * 0.08}
              className={`relative lg:pl-7 ${
                i > 0 ? "lg:border-l lg:border-line" : ""
              }`}
            >
              <p className="text-[clamp(2.4rem,4.2vw,3.6rem)] leading-none font-semibold tracking-[-0.04em] text-ink">
                <AnimatedNumber
                  value={s.value}
                  prefix={s.prefix}
                  suffix={s.suffix}
                  decimals={s.decimals}
                />
              </p>
              <p className="mt-3 text-[13.5px] font-semibold text-ink">
                {s.label}
              </p>
              <p className="mt-1 text-[12.5px] text-slate-400">{s.subtext}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
