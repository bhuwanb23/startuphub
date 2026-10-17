import { Container, SectionHead } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { principles } from "@/views/about/constants/data";

export default function Approach() {
  return (
    <section className="border-t border-line bg-soft py-24 md:py-32">
      <Container>
        <SectionHead
          eyebrow="Our Approach"
          title={
            <>
              Four principles behind{" "}
              <span className="text-accent">everything we ship.</span>
            </>
          }
        />
        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 md:mt-16">
          {principles.map((p, i) => (
            <Reveal key={p.n} delay={i * 0.06} className="h-full">
              <div className="flex h-full flex-col bg-white p-7 transition-colors hover:bg-accent-mist/60 md:p-9">
                <span className="text-sm font-bold tabular-nums text-accent">{p.n}</span>
                <h3 className="mt-5 text-xl font-semibold tracking-tight text-ink">{p.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-500">{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
