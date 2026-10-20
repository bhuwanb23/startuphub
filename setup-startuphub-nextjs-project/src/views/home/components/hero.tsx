import { MoveRight } from "lucide-react";
import { ButtonLink, Container } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { HeroVisual } from "./hero-visual";
import { RIBBON } from "../constants/home-data";

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-20 pt-32 sm:pt-40">
      <div
        aria-hidden
        className="bg-grid absolute inset-0"
        style={{
          maskImage:
            "radial-gradient(ellipse 90% 72% at 50% 0%, black 30%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 72% at 50% 0%, black 30%, transparent 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-white"
      />

      <Container className="relative">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-1.5 text-[12px] font-semibold text-slate-600 shadow-[0_1px_2px_rgba(11,18,32,0.05)]">
              <span className="relative flex h-2 w-2">
                <span className="absolute h-full w-full animate-ping rounded-full bg-accent-500 opacity-60" />
                <span className="relative h-2 w-2 rounded-full bg-accent" />
              </span>
              The global startup ecosystem platform
            </p>
          </Reveal>

          <Reveal delay={90}>
            <h1 className="mt-7 text-balance text-[clamp(2.7rem,7vw,5.4rem)] font-semibold leading-[1.01] tracking-[-0.045em] text-ink">
              Build. Protect.
              <br />
              Validate. <span className="text-accent">Scale.</span>
            </h1>
          </Reveal>

          <Reveal delay={180}>
            <p className="mx-auto mt-6 max-w-xl text-pretty text-[clamp(1rem,1.5vw,1.2rem)] leading-relaxed text-slate-500">
              One connected ecosystem for every stage of your startup journey.
            </p>
          </Reveal>

          <Reveal delay={260}>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-2 gap-y-1.5 text-[11.5px] font-semibold uppercase tracking-[0.12em] text-slate-400 sm:text-[12.5px]">
              {RIBBON.map((stage, i) => (
                <span key={stage} className="flex items-center gap-2">
                  <span className="flex items-center gap-1.5">
                    <span className="h-1 w-1 rounded-full bg-accent-500" />
                    {stage}
                  </span>
                  {i < RIBBON.length - 1 && (
                    <MoveRight className="h-3 w-3 text-slate-300" />
                  )}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={340}>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <ButtonLink href="/register">Start Your Journey</ButtonLink>
              <ButtonLink href="#platform" variant="secondary">
                Explore StartupHub
              </ButtonLink>
            </div>
          </Reveal>
        </div>

        <Reveal delay={420} y={40}>
          <div className="mt-16 sm:mt-20">
            <HeroVisual />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
