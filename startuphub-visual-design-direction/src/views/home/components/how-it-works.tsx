import { Container, SectionHead } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { howSteps } from "@/views/home/constants/data";

export default function HowItWorks() {
  return (
    <section className="border-t border-line bg-white py-24 md:py-32">
      <Container>
        <SectionHead
          eyebrow="How StartupHub Works"
          title={
            <>
              Four steps. <span className="text-accent">One connected journey.</span>
            </>
          }
          lead="No matter your role, the path through the ecosystem follows the same simple shape."
        />

        <div className="relative mt-14 grid gap-10 md:mt-16 md:grid-cols-4 md:gap-6">
          {/* connector line */}
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 top-[26px] hidden border-t border-dashed border-slate-200 md:block"
          />
          {howSteps.map((step, i) => (
            <Reveal key={step.n} delay={i * 0.09} className="relative">
              <div className="flex items-start gap-4 md:flex-col md:gap-0">
                <span className="relative z-10 grid h-[52px] w-[52px] shrink-0 place-items-center rounded-2xl border border-line bg-white text-sm font-bold text-accent shadow-sm">
                  {step.n}
                </span>
                <div className="md:mt-6">
                  <h3 className="text-[17px] font-semibold tracking-tight text-ink">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">{step.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
