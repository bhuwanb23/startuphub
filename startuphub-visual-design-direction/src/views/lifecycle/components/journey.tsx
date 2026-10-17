import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Container, SectionHead } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { journey } from "@/views/lifecycle/constants/stages";

export default function Journey() {
  return (
    <section className="border-t border-line bg-soft py-24 md:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[380px_1fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHead
              align="left"
              eyebrow="A Startup Journey"
              title={
                <>
                  Lumen AI&apos;s first{" "}
                  <span className="text-accent">18 months.</span>
                </>
              }
              lead="One real path through the lifecycle — stage by stage. Every entry below was tracked, matched or scored by the platform."
            />
            <Reveal delay={0.15}>
              <Link
                href="/explore/startups/lumen-ai"
                className="group mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-accent"
              >
                View Lumen AI&apos;s profile
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </Reveal>
          </div>

          <div className="relative">
            <span
              aria-hidden="true"
              className="absolute bottom-2 left-[7px] top-2 w-px bg-slate-200"
            />
            <div className="space-y-2">
              {journey.map((j, i) => (
                <Reveal key={j.when} delay={i * 0.06}>
                  <div className="relative flex gap-6 rounded-xl p-4 transition-colors hover:bg-white">
                    <span className="relative z-10 mt-1.5 h-[15px] w-[15px] shrink-0 rounded-full border-[3px] border-accent bg-white" />
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                          {j.when}
                        </span>
                        <span className="rounded-md bg-accent-soft px-2 py-0.5 text-[11px] font-semibold text-accent">
                          {j.stage}
                        </span>
                      </div>
                      <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{j.text}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
