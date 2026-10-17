import { BrainCircuit, Compass, Crosshair, TrendingUp } from "lucide-react";
import { Container, SectionHead } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { aiFeatures } from "@/views/lifecycle/constants/stages";

const icons = [Compass, Crosshair, BrainCircuit, TrendingUp];

export default function AiLayer() {
  return (
    <section className="relative overflow-hidden border-t border-line bg-accent-mist py-24 md:py-32">
      <div
        aria-hidden="true"
        className="bg-nodegrid absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_70%_90%_at_50%_50%,black,transparent)]"
      />
      <Container className="relative">
        <SectionHead
          eyebrow="The AI Intelligence Layer"
          title={
            <>
              A copilot that knows{" "}
              <span className="text-accent">where you are.</span>
            </>
          }
          lead="Sitting quietly across all eleven stages, the intelligence layer reads your signals and turns them into direction."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 md:mt-16 lg:grid-cols-4">
          {aiFeatures.map((f, i) => {
            const Icon = icons[i];
            return (
              <Reveal key={f.title} delay={i * 0.07} className="h-full">
                <div className="flex h-full flex-col rounded-2xl border border-line bg-white/85 p-6 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_18px_40px_-22px_rgba(11,18,32,0.25)]">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent text-white">
                    <Icon className="h-4.5 w-4.5" />
                  </span>
                  <h3 className="mt-4 text-[15.5px] font-semibold tracking-tight text-ink">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-slate-500">{f.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.2}>
          <div className="mx-auto mt-12 flex max-w-2xl items-center gap-3 rounded-2xl border border-accent/20 bg-white px-5 py-4 shadow-[0_16px_40px_-24px_rgba(49,87,232,0.5)]">
            <span className="ping-dot h-2 w-2 shrink-0 rounded-full bg-accent text-accent" />
            <p className="text-[13.5px] text-slate-600">
              <span className="font-semibold text-ink">Next best action for Lumen AI:</span>{" "}
              two pilot testimonials are ready — attach them to your Series A
              data room before Thursday&apos;s partner meeting.
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
