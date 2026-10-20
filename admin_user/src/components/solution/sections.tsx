import { Quote } from "lucide-react";
import { Container, SectionHead } from "@/components/ui";
import { Reveal } from "@/components/motion";
import type { SolutionData } from "./types";

export function Capabilities({ data }: { data: SolutionData }) {
  return (
    <section className="border-y border-line bg-soft py-24 sm:py-28">
      <Container>
        <SectionHead eyebrow="Capabilities" title={data.capabilitiesHeading} />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {data.capabilities.map((cap, i) => {
            const Icon = cap.icon;
            return (
              <Reveal key={cap.title} delay={i * 0.06}>
                <div className="h-full rounded-2xl border border-line bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent-soft text-accent">
                    <Icon className="h-5 w-5" strokeWidth={2.1} />
                  </span>
                  <h3 className="mt-5 text-[16px] font-semibold tracking-tight text-ink">
                    {cap.title}
                  </h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-slate-500">
                    {cap.desc}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export function Workflow({ data }: { data: SolutionData }) {
  return (
    <section className="bg-white py-24 sm:py-28">
      <Container>
        <SectionHead
          eyebrow="How it works"
          title="A clear path, from day one."
        />
        <div className="mt-14 grid gap-10 md:grid-cols-3">
          {data.workflow.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.1}>
              <div className="relative">
                <span className="text-[3.4rem] font-semibold leading-none tracking-[-0.04em] text-accent/15">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-[17px] font-semibold tracking-tight text-ink">
                  {step.title}
                </h3>
                <p className="mt-2.5 text-[14px] leading-relaxed text-slate-500">
                  {step.desc}
                </p>
                {i < data.workflow.length - 1 ? (
                  <span
                    className="absolute -right-5 top-8 hidden h-px w-10 bg-line md:block"
                    aria-hidden
                  />
                ) : null}
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function Outcomes({ data }: { data: SolutionData }) {
  return (
    <section className="border-t border-line bg-soft py-24 sm:py-28">
      <Container>
        <SectionHead
          eyebrow="Outcomes"
          title={`What ${data.audience.toLowerCase()} get out of it.`}
        />
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {data.outcomes.map((outcome, i) => (
            <Reveal key={outcome.label} delay={i * 0.08}>
              <div className="h-full rounded-2xl border border-line bg-white p-7 shadow-card">
                <p className="text-[2.4rem] font-semibold leading-none tracking-[-0.03em] text-ink">
                  {outcome.value}
                </p>
                <p className="mt-3 text-[14px] font-semibold text-ink">{outcome.label}</p>
                {outcome.desc ? (
                  <p className="mt-1.5 text-[13px] leading-relaxed text-slate-500">
                    {outcome.desc}
                  </p>
                ) : null}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <figure className="mx-auto mt-16 max-w-3xl rounded-2xl border border-line bg-white p-10 text-center shadow-card">
            <Quote className="mx-auto h-7 w-7 text-accent/25" fill="currentColor" strokeWidth={0} />
            <blockquote className="mt-5 text-balance text-[19px] font-medium leading-relaxed text-ink">
              {data.quote.text}
            </blockquote>
            <figcaption className="mt-6">
              <p className="text-[14px] font-semibold text-ink">{data.quote.name}</p>
              <p className="text-[12.5px] text-slate-500">{data.quote.role}</p>
            </figcaption>
          </figure>
        </Reveal>
      </Container>
    </section>
  );
}
