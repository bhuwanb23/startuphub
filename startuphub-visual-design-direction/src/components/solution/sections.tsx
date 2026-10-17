import { Quote } from "lucide-react";
import { Container, SectionHead } from "@/components/ui";
import { CountUp, Reveal } from "@/components/motion";
import type { SolutionData } from "@/components/solution/types";

export function Capabilities({ data }: { data: SolutionData }) {
  return (
    <section className="bg-white py-24 md:py-32">
      <Container>
        <SectionHead
          eyebrow="What You Can Do"
          title={data.capabilitiesHeading}
          lead="Purpose-built for your role — not a generic dashboard with your logo on it."
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 md:mt-16 lg:grid-cols-3">
          {data.capabilities.map((c, i) => (
            <Reveal key={c.title} delay={(i % 3) * 0.06} className="h-full">
              <div className="group flex h-full flex-col rounded-2xl border border-line bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_18px_40px_-22px_rgba(11,18,32,0.22)] md:p-7">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent-soft text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                  <c.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-[16.5px] font-semibold tracking-tight text-ink">
                  {c.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{c.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function Workflow({ data }: { data: SolutionData }) {
  return (
    <section className="border-t border-line bg-soft py-24 md:py-32">
      <Container>
        <SectionHead
          eyebrow="How It Works"
          title={
            <>
              Up and running{" "}
              <span className="text-accent">in days, not quarters.</span>
            </>
          }
        />
        <div className="relative mt-14 grid gap-10 md:mt-16 md:grid-cols-4 md:gap-6">
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 top-[26px] hidden border-t border-dashed border-slate-200 md:block"
          />
          {data.workflow.map((step, i) => (
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

export function Outcomes({ data }: { data: SolutionData }) {
  return (
    <section className="border-t border-line bg-white py-24 md:py-32">
      <Container>
        <div className="grid gap-6 lg:grid-cols-3">
          {data.outcomes.map((o, i) => (
            <Reveal key={o.label} delay={i * 0.07}>
              <div className="rounded-2xl border border-line bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-22px_rgba(11,18,32,0.2)]">
                <div className="text-[2.5rem] font-semibold leading-none tracking-[-0.03em] text-ink">
                  <CountUp
                    to={o.to}
                    decimals={o.decimals ?? 0}
                    prefix={o.prefix ?? ""}
                    suffix={o.suffix}
                    className="tabular-nums"
                  />
                </div>
                <div className="mt-2.5 text-sm text-slate-500">{o.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.15}>
          <figure className="mx-auto mt-14 max-w-3xl rounded-2xl border border-line bg-white p-8 text-center md:p-10">
            <Quote className="mx-auto h-6 w-6 text-accent/25" />
            <blockquote className="mt-4 text-balance text-lg font-medium leading-relaxed text-ink md:text-xl">
              &ldquo;{data.quote.text}&rdquo;
            </blockquote>
            <figcaption className="mt-5 text-sm text-slate-500">
              <span className="font-semibold text-ink">{data.quote.name}</span> — {data.quote.role}
            </figcaption>
          </figure>
        </Reveal>
      </Container>
    </section>
  );
}
