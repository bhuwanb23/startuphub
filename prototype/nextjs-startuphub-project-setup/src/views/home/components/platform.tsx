import {
  ArrowUpRight,
  FolderKanban,
  Handshake,
  PiggyBank,
  ShieldCheck,
  Sprout,
} from "lucide-react";
import type { ReactNode } from "react";
import { Reveal, SectionHeader } from "@/components/motion";

type Block = {
  index: string;
  name: string;
  headline: string;
  detail: string;
  tags: string[];
  icon: ReactNode;
};

const BLOCKS: Block[] = [
  {
    index: "01",
    name: "Build",
    headline: "Product, MVP and validation in one workbench.",
    detail:
      "Structured experimentation with evidence scoring — so what you build is what the market asked for.",
    tags: ["Experiment engine", "MVP sprints", "Beta network"],
    icon: <FolderKanban className="h-5 w-5" />,
  },
  {
    index: "02",
    name: "Protect",
    headline: "IPR, legal and compliance from day zero.",
    detail:
      "Filing automation, landscape intelligence and licensing paths that treat IP as an asset, not paperwork.",
    tags: ["Patent workflows", "Trademark desk", "Licensing"],
    icon: <ShieldCheck className="h-5 w-5" />,
  },
  {
    index: "03",
    name: "Connect",
    headline: "Mentors, resources and partners on demand.",
    detail:
      "Warm routing to 2.8K operators and 450+ programs — matched by sector, stage and what you actually need next.",
    tags: ["Mentor matching", "Credit rails", "Partner grid"],
    icon: <Handshake className="h-5 w-5" />,
  },
  {
    index: "04",
    name: "Fund",
    headline: "Investors, grants and capital that fits.",
    detail:
      "Readiness scores, curated syndicates and a grant radar — capital engineered around your stage, not against it.",
    tags: ["Investor routing", "Syndicates", "Grant radar"],
    icon: <PiggyBank className="h-5 w-5" />,
  },
  {
    index: "05",
    name: "Grow",
    headline: "Market access and performance intelligence.",
    detail:
      "Demand corridors, retention diagnostics and sector intelligence that keep growth compounding after launch.",
    tags: ["GTM corridors", "Diagnostics", "Intel feeds"],
    icon: <Sprout className="h-5 w-5" />,
  },
];

export function Platform() {
  return (
    <section id="platform" className="border-t border-line bg-soft">
      <div className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeader
            eyebrow="The platform"
            title={
              <>
                One platform.
                <br />
                Every critical connection.
              </>
            }
          />
          <Reveal delay={0.15} className="max-w-sm">
            <p className="text-[15px] leading-relaxed text-slate-500">
              Five capabilities, engineered as one system — each connection
              feeds the next decision.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 sm:mt-16">
          {BLOCKS.map((b, i) => (
            <Reveal key={b.name} delay={i * 0.05}>
              <div className="group relative cursor-default border-t border-line py-7 transition-colors duration-500 last:border-b hover:bg-white sm:py-9">
                <div className="grid items-start gap-5 px-1 sm:grid-cols-[90px_260px_1fr_48px] sm:gap-8 sm:px-4">
                  {/* index */}
                  <div className="flex items-center gap-4 sm:block">
                    <span className="font-mono text-[13px] tracking-[0.14em] text-accent">
                      {b.index}
                    </span>
                    <span className="mt-0 hidden text-slate-400 transition-colors duration-300 group-hover:text-accent sm:mt-6 sm:block">
                      {b.icon}
                    </span>
                  </div>

                  {/* name */}
                  <h3 className="text-[26px] leading-none font-semibold tracking-[-0.03em] text-ink transition-transform duration-500 sm:text-[30px] sm:group-hover:translate-x-1.5">
                    {b.name}
                  </h3>

                  {/* detail */}
                  <div>
                    <p className="max-w-xl text-[15.5px] font-medium text-ink">
                      {b.headline}
                    </p>
                    <p className="mt-2 max-w-xl text-[13.5px] leading-relaxed text-slate-500">
                      {b.detail}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2 opacity-80 transition-opacity duration-300 group-hover:opacity-100">
                      {b.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-md border border-line bg-white px-2.5 py-1 font-mono text-[10px] tracking-[0.06em] text-slate-500 uppercase"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* arrow */}
                  <div className="hidden justify-end sm:flex">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-slate-400 transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-white">
                      <ArrowUpRight className="h-4.5 w-4.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </div>

                {/* hover accent line */}
                <span className="absolute top-0 left-0 h-px w-0 bg-accent transition-all duration-700 ease-out group-hover:w-full" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
