import { ArrowRight, Check, X } from "lucide-react";
import { Container, SectionHead } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { problems } from "@/views/about/constants/data";

export default function Problem() {
  return (
    <section className="bg-white py-24 md:py-32">
      <Container>
        <SectionHead
          eyebrow="The Problem We Solve"
          title={
            <>
              The ecosystem isn&apos;t broken.{" "}
              <span className="text-accent">It&apos;s disconnected.</span>
            </>
          }
          lead="Every actor in the startup economy holds one piece of the puzzle. Nobody holds the whole picture. Here's what that costs — and what we do about it."
        />

        <div className="mt-14 overflow-hidden rounded-2xl border border-line md:mt-16">
          <div className="grid grid-cols-[1fr_auto_1fr] gap-4 border-b border-line bg-slate-50 px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400 md:px-8">
            <span>The ecosystem today</span>
            <span className="w-8" aria-hidden="true" />
            <span>What founders actually need</span>
          </div>
          {problems.map((p, i) => (
            <Reveal key={i} delay={i * 0.04}>
              <div className="grid grid-cols-1 gap-3 border-b border-line px-5 py-5 last:border-b-0 md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-4 md:px-8 md:py-6">
                <p className="flex items-start gap-3 text-sm leading-relaxed text-slate-500">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-slate-100 text-slate-400">
                    <X className="h-3 w-3" />
                  </span>
                  {p.today}
                </p>
                <ArrowRight className="hidden h-4 w-4 text-accent md:block" aria-hidden="true" />
                <p className="flex items-start gap-3 text-sm font-medium leading-relaxed text-ink">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent-soft text-accent">
                    <Check className="h-3 w-3" />
                  </span>
                  {p.need}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
