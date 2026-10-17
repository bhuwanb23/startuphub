import { Container, SectionHead } from "@/components/ui";
import { CountUp, Reveal } from "@/components/motion";
import { stats } from "@/views/home/constants/data";
import { cn } from "@/lib/utils";

export default function Stats() {
  return (
    <section className="border-t border-line bg-white py-24 md:py-28">
      <Container>
        <SectionHead
          eyebrow="Ecosystem Statistics"
          title="Serious scale, quietly built."
          lead="A living network of founders, institutions and capital — growing every single day."
        />

        <div className="mt-14 grid grid-cols-2 gap-y-12 md:mt-16 md:grid-cols-5 md:gap-x-0">
          {stats.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 0.07}
              className={cn("md:border-l md:border-line md:px-8", i === 0 && "md:border-l-0 md:pl-0")}
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
