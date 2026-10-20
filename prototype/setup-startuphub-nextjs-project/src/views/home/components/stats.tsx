import { Container } from "@/components/ui";
import { CountUp, Reveal } from "@/components/motion";
import { STATS } from "../constants/home-data";

export function Stats() {
  return (
    <section className="border-t border-line bg-white py-16 sm:py-20">
      <Container>
        <Reveal>
          <p className="text-center text-[12px] font-semibold uppercase tracking-[0.2em] text-slate-400">
            The Ecosystem
          </p>
        </Reveal>
        <div className="mt-10 grid grid-cols-2 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
          {STATS.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 80}>
              <div
                className={`px-4 text-center ${
                  i > 0 ? "lg:border-l lg:border-line" : ""
                }`}
              >
                <p className="text-[clamp(2.2rem,4vw,3.2rem)] font-semibold leading-none tracking-[-0.04em] text-ink">
                  <CountUp
                    end={stat.value}
                    decimals={stat.decimals ?? 0}
                    prefix={stat.prefix ?? ""}
                    suffix={stat.suffix}
                  />
                </p>
                <p className="mt-2.5 text-[13px] font-medium text-slate-400">
                  {stat.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
