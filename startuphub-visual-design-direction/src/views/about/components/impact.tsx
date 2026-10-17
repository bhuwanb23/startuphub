import { Container, SectionHead } from "@/components/ui";
import { CountUp, Reveal } from "@/components/motion";
import { impactStats } from "@/views/about/constants/data";

export default function Impact() {
  return (
    <section className="border-t border-line bg-soft py-24 md:py-32">
      <Container>
        <SectionHead
          eyebrow="Impact"
          title={
            <>
              What happens when the ecosystem{" "}
              <span className="text-accent">actually connects.</span>
            </>
          }
          lead="Measured across every startup, program and partnership on the platform."
        />

        <div className="mt-14 grid grid-cols-2 gap-6 md:mt-16 lg:grid-cols-4">
          {impactStats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.07}>
              <div className="rounded-2xl border border-line bg-white p-7">
                <div className="text-[2.3rem] font-semibold leading-none tracking-[-0.03em] text-ink">
                  <CountUp
                    to={s.to}
                    decimals={s.decimals ?? 0}
                    prefix={s.prefix ?? ""}
                    suffix={s.suffix}
                    className="tabular-nums"
                  />
                </div>
                <div className="mt-2.5 text-sm text-slate-500">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <figure className="mx-auto mt-14 max-w-3xl text-center">
            <blockquote className="text-balance text-xl font-medium leading-relaxed text-ink md:text-2xl">
              &ldquo;StartupHub is the first place where our program outcomes are
              visible end-to-end. We stopped guessing which startups to
              support.&rdquo;
            </blockquote>
            <figcaption className="mt-5 text-sm text-slate-500">
              Dr. Kavya Reddy — Director, State Innovation Council
            </figcaption>
          </figure>
        </Reveal>
      </Container>
    </section>
  );
}
