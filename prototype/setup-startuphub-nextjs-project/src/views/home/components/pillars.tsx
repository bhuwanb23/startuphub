import { ArrowUpRight } from "lucide-react";
import { Container, SectionHead } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { PILLARS } from "../constants/home-data";

export function Pillars() {
  return (
    <section id="platform" className="bg-white py-24 sm:py-32">
      <Container>
        <SectionHead
          eyebrow="The Platform"
          title={<>One platform. Every critical connection.</>}
        />

        <div className="mt-14 border-t border-line">
          {PILLARS.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <Reveal key={pillar.id} delay={i * 60}>
                <a
                  href="/register"
                  className="group grid items-center gap-4 border-b border-line py-7 transition-colors duration-300 hover:bg-accent-mist sm:grid-cols-[64px_1fr_auto] sm:gap-8 sm:px-4 sm:py-8 lg:grid-cols-[64px_220px_1fr_auto]"
                >
                  <span className="hidden text-[13px] font-semibold tracking-[0.1em] text-slate-300 transition-colors group-hover:text-accent-400 sm:block">
                    {pillar.id}
                  </span>
                  <span className="flex items-center gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-soft transition-colors duration-300 group-hover:bg-accent">
                      <Icon className="h-5 w-5 text-accent transition-colors duration-300 group-hover:text-white" />
                    </span>
                    <span className="text-[24px] font-semibold tracking-[-0.025em] text-ink sm:text-[28px]">
                      {pillar.title}
                    </span>
                  </span>
                  <span className="max-w-lg text-[14.5px] leading-relaxed text-slate-500 sm:pl-[60px] lg:pl-0">
                    {pillar.desc}
                    <span className="mt-2.5 flex flex-wrap gap-1.5">
                      {pillar.chips.map((chip) => (
                        <span
                          key={chip}
                          className="rounded-full border border-line bg-white px-2.5 py-1 text-[11.5px] font-medium text-slate-500"
                        >
                          {chip}
                        </span>
                      ))}
                    </span>
                  </span>
                  <ArrowUpRight className="hidden h-5 w-5 text-slate-300 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent sm:block" />
                </a>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
