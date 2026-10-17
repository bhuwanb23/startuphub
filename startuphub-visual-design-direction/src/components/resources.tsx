import { ArrowRight, ArrowUpRight, CalendarDays } from "lucide-react";
import { Container, SectionHead } from "@/components/ui";
import { Reveal } from "@/components/motion";

const opportunities = [
  {
    type: "Funding",
    title: "Seed Forward Program — Cohort VII",
    org: "Northgate Partners",
    meta: "Closes Mar 30",
  },
  {
    type: "Incubation",
    title: "Global Incubation Sprint",
    org: "StartupHub Labs",
    meta: "Rolling applications",
  },
  {
    type: "Challenge",
    title: "AgriTech Innovation Challenge 2026",
    org: "National Agri Mission",
    meta: "₹50L prize pool",
  },
  {
    type: "Grant",
    title: "DeepTech Research Grant",
    org: "National Science Foundation",
    meta: "Opens Apr 12",
  },
];

export default function Resources() {
  return (
    <section id="resources" className="border-t border-line bg-white py-24 md:py-32">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHead
            align="left"
            eyebrow="Resources"
            title="Open opportunities, right now."
            lead="Funding calls, cohorts, challenges and grants — curated and always current."
          />
          <Reveal delay={0.1}>
            <a
              href="#cta"
              className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-accent"
            >
              View all resources
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </Reveal>
        </div>

        <div className="mt-12">
          {opportunities.map((o, i) => (
            <Reveal key={o.title} delay={i * 0.05}>
              <a
                href="#cta"
                className="group grid grid-cols-[1fr_auto] items-center gap-4 border-t border-line px-2 py-5 transition-colors last:border-b hover:bg-slate-50 md:grid-cols-[110px_1fr_auto_auto] md:px-4 md:py-6"
              >
                <span className="col-start-1 row-start-1 inline-flex w-fit rounded-md bg-slate-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500 transition-colors group-hover:bg-accent-soft group-hover:text-accent md:col-auto md:row-auto">
                  {o.type}
                </span>
                <span className="col-start-1 row-start-2 min-w-0 md:col-auto md:row-auto">
                  <span className="block truncate text-[15px] font-semibold text-ink md:text-base">
                    {o.title}
                  </span>
                  <span className="mt-0.5 block text-[13px] text-slate-400">{o.org}</span>
                </span>
                <span className="col-start-2 row-start-1 flex items-center gap-1.5 text-[13px] text-slate-500 md:col-auto">
                  <CalendarDays className="h-3.5 w-3.5 text-slate-400" />
                  {o.meta}
                </span>
                <span className="col-start-2 row-start-2 grid h-9 w-9 place-items-center justify-self-end rounded-full border border-line text-slate-400 transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-white md:col-auto md:row-auto">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
