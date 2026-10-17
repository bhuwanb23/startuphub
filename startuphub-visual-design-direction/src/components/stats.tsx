import { Container, SectionHead } from "@/components/ui";
import { CountUp, Reveal } from "@/components/motion";
import { cn } from "@/lib/utils";

const stats: {
  to: number;
  decimals?: number;
  prefix?: string;
  suffix: string;
  label: string;
}[] = [
  { to: 10, suffix: "K+", label: "Startups building" },
  { to: 450, suffix: "+", label: "Incubators & partners" },
  { to: 2.8, decimals: 1, suffix: "K+", label: "Expert mentors" },
  { to: 1.2, decimals: 1, prefix: "₹", suffix: "K Cr", label: "Capital connected" },
  { to: 68, suffix: "K+", label: "Ecosystem connections" },
];

export default function Stats() {
  return (
    <section id="about" className="border-t border-line bg-soft py-24 md:py-28">
      <Container>
        <SectionHead
          eyebrow="The Ecosystem"
          title="Serious scale, quietly built."
          lead="A living network of founders, institutions and capital — growing every single day."
        />

        <div className="mt-14 grid grid-cols-2 gap-y-12 md:mt-16 md:grid-cols-5 md:gap-x-0">
          {stats.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 0.07}
              className={cn(
                "md:border-l md:border-line md:px-8",
                i === 0 && "md:border-l-0 md:pl-0"
              )}
            >
              <div className="text-[2.5rem] font-semibold leading-none tracking-[-0.03em] text-ink md:text-[2.7rem]">
                <CountUp
                  to={s.to}
                  decimals={s.decimals ?? 0}
                  prefix={s.prefix ?? ""}
                  suffix={s.suffix}
                  className="tabular-nums"
                />
              </div>
              <div className="mt-2.5 text-sm text-slate-500">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
