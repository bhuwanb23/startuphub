import { Lightbulb, X } from "lucide-react";
import { Container, SectionHead } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { myths } from "@/views/ipr/constants/data";

export default function Awareness() {
  return (
    <section className="border-t border-line bg-soft py-24 md:py-32">
      <Container>
        <SectionHead
          eyebrow="IP Awareness"
          title={
            <>
              Expensive myths, <span className="text-accent">quietly corrected.</span>
            </>
          }
          lead="The costliest IP mistakes aren't legal — they're beliefs. Four we correct every week."
        />
        <div className="mt-14 space-y-4 md:mt-16">
          {myths.map((m, i) => (
            <Reveal key={m.myth} delay={i * 0.05}>
              <div className="grid gap-4 rounded-2xl border border-line bg-white p-6 md:grid-cols-[1fr_auto_1.2fr] md:items-center md:gap-8 md:p-7">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-slate-100 text-slate-400">
                    <X className="h-3 w-3" />
                  </span>
                  <div>
                    <span className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-slate-300">
                      The myth
                    </span>
                    <p className="mt-1 text-[15px] font-medium text-slate-500 line-through decoration-slate-300">
                      {m.myth}
                    </p>
                  </div>
                </div>
                <span className="hidden h-8 w-px bg-line md:block" aria-hidden="true" />
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent-soft text-accent">
                    <Lightbulb className="h-3 w-3" />
                  </span>
                  <div>
                    <span className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-accent">
                      The reality
                    </span>
                    <p className="mt-1 text-[15px] font-medium leading-relaxed text-ink">{m.fact}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
