import { Cable, Repeat2, Sparkles } from "lucide-react";
import Link from "next/link";
import { Container, SectionHead } from "@/components/ui";
import { Reveal } from "@/components/motion";

const rules = [
  {
    icon: Cable,
    title: "Every stage hands off forward",
    desc: "Validation evidence feeds your incubator application. Incubation milestones feed your readiness score. Nothing is re-entered, nothing is lost.",
    flow: "Validation → Incubation → IPR",
  },
  {
    icon: Repeat2,
    title: "Two loops point backwards",
    desc: "Failed validation routes you back to the idea with the evidence attached. Market feedback routes back to the product. Loops are features, not failures.",
    flow: "Validation ↺ Idea · Market ↺ MVP",
  },
  {
    icon: Sparkles,
    title: "Intelligence runs through all of it",
    desc: "Every stage generates data; every later stage consumes it. By funding time, your diligence room is already 80% assembled.",
    flow: "Every stage → Intelligence",
  },
];

export default function HowConnected() {
  return (
    <section className="bg-white py-24 md:py-32">
      <Container>
        <SectionHead
          eyebrow="How Stages Connect"
          title={
            <>
              Not a checklist. <span className="text-accent">A conveyor.</span>
            </>
          }
          lead="Three structural rules make the lifecycle behave like a system instead of a to-do list."
        />

        <div className="mt-14 grid gap-6 md:mt-16 lg:grid-cols-3">
          {rules.map((r, i) => (
            <Reveal key={r.title} delay={i * 0.08} className="h-full">
              <div className="flex h-full flex-col rounded-2xl border border-line bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_44px_-24px_rgba(11,18,32,0.22)]">
                {/* mini flow diagram */}
                <div className="flex items-center gap-2">
                  {[0, 1, 2].map((d) => (
                    <span key={d} className="flex items-center gap-2">
                      <span
                        className={
                          d === 1
                            ? "h-2.5 w-2.5 rounded-full bg-accent"
                            : "h-2.5 w-2.5 rounded-full border-2 border-accent/50 bg-white"
                        }
                      />
                      {d < 2 && <span className="h-px w-7 border-t border-dashed border-accent/50" />}
                    </span>
                  ))}
                </div>
                <div className="mt-5 flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent-soft text-accent">
                    <r.icon className="h-4.5 w-4.5" />
                  </span>
                  <h3 className="text-lg font-semibold tracking-tight text-ink">{r.title}</h3>
                </div>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-500">{r.desc}</p>
                <p className="mt-5 border-t border-line pt-4 text-[12px] font-semibold uppercase tracking-[0.14em] text-accent">
                  {r.flow}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
