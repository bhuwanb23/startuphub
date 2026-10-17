import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Container, SectionHead } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { modules } from "@/views/home/constants/data";

export default function ModulesPreview() {
  return (
    <section className="border-t border-line bg-white py-24 md:py-32">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHead
            align="left"
            eyebrow="Core Platform Modules"
            title={
              <>
                One platform. <span className="text-accent">Every critical connection.</span>
              </>
            }
            lead="Not another tool to manage — the missing infrastructure between every stage of your venture."
          />
          <Reveal delay={0.1}>
            <Link
              href="/platform"
              className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-accent"
            >
              See all 11 modules
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 md:mt-16">
          {modules.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.05}>
              <Link
                href="/platform"
                className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 border-t border-line px-2 py-7 transition-colors duration-300 last:border-b hover:bg-accent-mist/70 sm:gap-6 md:grid-cols-[64px_auto_1fr_auto_auto] md:px-4 md:py-9"
              >
                <span className="hidden text-sm font-semibold tabular-nums text-slate-300 transition-colors group-hover:text-accent md:block">
                  0{i + 1}
                </span>
                <span className="grid h-11 w-11 place-items-center rounded-xl border border-line bg-white text-slate-400 transition-all duration-300 group-hover:border-accent/25 group-hover:bg-accent-soft group-hover:text-accent md:h-12 md:w-12">
                  <p.icon className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xl font-semibold tracking-tight text-ink md:text-2xl">
                    {p.name}
                  </span>
                  <span className="mt-1 block text-[13px] text-slate-400">
                    {p.tags.join("  ·  ")}
                  </span>
                </span>
                <span className="hidden max-w-sm text-sm leading-relaxed text-slate-500 md:block">
                  {p.desc}
                </span>
                <span className="grid h-10 w-10 place-items-center rounded-full border border-line text-slate-400 transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-white">
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
