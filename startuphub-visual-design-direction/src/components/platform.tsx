import {
  ArrowUpRight,
  Blocks,
  Landmark,
  Network,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import { Container, SectionHead } from "@/components/ui";
import { Reveal } from "@/components/motion";

const pillars = [
  {
    n: "01",
    icon: Blocks,
    name: "Build",
    tags: ["Product", "MVP", "Validation"],
    desc: "Structured build sprints, validation frameworks and MVP tooling that turn raw ideas into working products.",
  },
  {
    n: "02",
    icon: ShieldCheck,
    name: "Protect",
    tags: ["IPR", "Legal", "Compliance"],
    desc: "An integrated IPR desk for patents, trademarks and filings — plus the legal scaffolding to stay compliant as you grow.",
  },
  {
    n: "03",
    icon: Network,
    name: "Connect",
    tags: ["Mentors", "Resources", "Partners"],
    desc: "Warm paths to 2,800+ operators, ecosystem resources and institutional partners — matched by stage and sector.",
  },
  {
    n: "04",
    icon: Landmark,
    name: "Fund",
    tags: ["Investors", "Grants", "Capital"],
    desc: "Investor relationships, grant discovery and readiness scoring so the right capital finds you at the right stage.",
  },
  {
    n: "05",
    icon: TrendingUp,
    name: "Grow",
    tags: ["Market", "Performance", "Intelligence"],
    desc: "Market access programmes and live intelligence that turn early traction into durable, compounding growth.",
  },
];

export default function Platform() {
  return (
    <section id="platform" className="border-t border-line bg-white py-24 md:py-32">
      <Container>
        <SectionHead
          eyebrow="The Platform"
          title={
            <>
              One platform.{" "}
              <span className="text-accent">Every critical connection.</span>
            </>
          }
          lead="Not another tool to manage — the missing infrastructure between every stage of your venture."
        />

        <div className="mt-14 md:mt-16">
          {pillars.map((p, i) => (
            <Reveal key={p.n} delay={i * 0.05}>
              <a
                href="#cta"
                className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 border-t border-line px-2 py-7 transition-colors duration-300 last:border-b hover:bg-accent-mist/70 sm:gap-6 md:grid-cols-[64px_auto_1fr_auto_auto] md:px-4 md:py-9"
              >
                <span className="hidden text-sm font-semibold tabular-nums text-slate-300 transition-colors group-hover:text-accent md:block">
                  {p.n}
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
              </a>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
