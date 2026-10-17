import { LayoutGrid, Network, Sparkles } from "lucide-react";
import { Container, SectionHead } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { pillars } from "@/views/about/constants/data";

const icons = [LayoutGrid, Network, Sparkles];

export default function WhatIs() {
  return (
    <section className="bg-white py-24 md:py-32">
      <Container>
        <SectionHead
          eyebrow="What is StartupHub"
          title={
            <>
              Three things at once. <span className="text-accent">One coherent whole.</span>
            </>
          }
        />
        <div className="mt-14 grid gap-6 md:mt-16 lg:grid-cols-3">
          {pillars.map((p, i) => {
            const Icon = icons[i];
            return (
              <Reveal key={p.title} delay={i * 0.08} className="h-full">
                <div className="group flex h-full flex-col rounded-2xl border border-line bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_44px_-24px_rgba(11,18,32,0.22)]">
                  <div className="flex items-center justify-between">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent-soft text-accent">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-300">
                      {p.tag}
                    </span>
                  </div>
                  <h3 className="mt-6 text-xl font-semibold tracking-tight text-ink">{p.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-slate-500">{p.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
