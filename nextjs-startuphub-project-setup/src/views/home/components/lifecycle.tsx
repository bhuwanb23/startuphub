"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  BadgeIndianRupee,
  Cpu,
  FileSearch,
  Landmark,
  Lightbulb,
  LineChart,
  Microscope,
  Package,
  Rocket,
  ShieldCheck,
} from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { EASE, Reveal, SectionHeader } from "@/components/motion";

type Stage = {
  name: string;
  tagline: string;
  detail: string;
  chips: string[];
  icon: ReactNode;
};

const STAGES: Stage[] = [
  {
    name: "Idea",
    tagline: "Start from signal, not noise.",
    detail:
      "Workbench tools turn a raw spark into a structured opportunity brief grounded in real market data.",
    chips: ["Opportunity brief", "Sector signals", "Founder fit"],
    icon: <Lightbulb className="h-4 w-4" />,
  },
  {
    name: "Validation",
    tagline: "Test before you build.",
    detail:
      "Structured experiments, customer discovery cohorts and evidence scoring tell you what the market actually wants.",
    chips: ["Experiment kits", "Cohort reviews", "Evidence score"],
    icon: <Microscope className="h-4 w-4" />,
  },
  {
    name: "Incubation",
    tagline: "The right room, at the right time.",
    detail:
      "Get matched to incubators whose mentors, infrastructure and networks fit your stage and sector.",
    chips: ["450+ programs", "Milestone tracking", "Mentor bench"],
    icon: <Landmark className="h-4 w-4" />,
  },
  {
    name: "IPR",
    tagline: "Protect your innovation.",
    detail:
      "Patent landscaping, filing workflows and commercialization paths — integrated from day one, not bolted on later.",
    chips: ["Filing automation", "Landscape maps", "Licensing paths"],
    icon: <ShieldCheck className="h-4 w-4" />,
  },
  {
    name: "Resources",
    tagline: "Credits, infra and talent on tap.",
    detail:
      "Cloud credits, lab access, legal templates and hiring pipelines — unlocked exactly when your stage demands them.",
    chips: ["₹25L+ credits", "Shared infra", "Talent pool"],
    icon: <Package className="h-4 w-4" />,
  },
  {
    name: "MVP",
    tagline: "Ship the smallest honest thing.",
    detail:
      "Sprint frameworks and UX support get a testable product into users' hands in weeks, not quarters.",
    chips: ["Build sprints", "Design support", "Beta network"],
    icon: <Cpu className="h-4 w-4" />,
  },
  {
    name: "Market",
    tagline: "Go where demand already lives.",
    detail:
      "Distribution playbooks, government tenders and enterprise corridors connect your product to first revenue.",
    chips: ["GTM playbooks", "Tender alerts", "Enterprise pilots"],
    icon: <LineChart className="h-4 w-4" />,
  },
  {
    name: "Funding",
    tagline: "Find the right capital at the right stage.",
    detail:
      "Readiness scoring, warm investor routing and grant discovery replace cold decks sent into the void.",
    chips: ["Readiness score", "Investor routing", "Grant radar"],
    icon: <BadgeIndianRupee className="h-4 w-4" />,
  },
  {
    name: "Growth",
    tagline: "Turn traction into sustainable scale.",
    detail:
      "Cohort analytics, retention diagnostics and pricing intelligence keep growth compounding after lift-off.",
    chips: ["Growth diagnostics", "Pricing intel", "Retention loops"],
    icon: <Rocket className="h-4 w-4" />,
  },
  {
    name: "Scale",
    tagline: "Become infrastructure for others.",
    detail:
      "Global corridors, corporate partnerships and IPO readiness turn your startup into a platform for the next wave.",
    chips: ["Global corridors", "M&A & IPO prep", "Give-back mentoring"],
    icon: <FileSearch className="h-4 w-4" />,
  },
];

export function Lifecycle() {
  const [active, setActive] = useState(3); // IPR by default
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(
      () => setActive((a) => (a + 1) % STAGES.length),
      3400,
    );
    return () => clearInterval(t);
  }, [paused]);

  const stage = STAGES[active];

  return (
    <section id="journey" className="border-t border-line bg-white">
      <div className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <SectionHeader
          eyebrow="The journey"
          title="From first idea to lasting impact."
          lede="Ten stages, one continuous thread. Hover any stage to see how the ecosystem shows up for you there."
          align="center"
        />

        <div
          className="mt-14 sm:mt-20"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* rail */}
          <Reveal>
            <div className="no-scrollbar -mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
              <div className="relative min-w-[760px]">
                {/* base line */}
                <div className="absolute top-[7px] right-[5%] left-[5%] h-px bg-line" />
                {/* progress line */}
                <motion.div
                  className="absolute top-[7px] left-[5%] h-px bg-accent"
                  animate={{ width: `${(active / (STAGES.length - 1)) * 90}%` }}
                  transition={{ duration: 0.7, ease: EASE }}
                />
                <div className="relative grid grid-cols-10">
                  {STAGES.map((s, i) => {
                    const isActive = i === active;
                    const isDone = i < active;
                    return (
                      <button
                        key={s.name}
                        onClick={() => {
                          setActive(i);
                          setPaused(true);
                        }}
                        className="group flex flex-col items-center gap-3 focus:outline-none"
                        aria-label={s.name}
                      >
                        <span
                          className={`anim-none relative z-10 flex h-[15px] w-[15px] items-center justify-center rounded-full border-2 transition-all duration-500 ${
                            isActive
                              ? "anim-node-pulse border-accent bg-accent"
                              : isDone
                                ? "border-accent/50 bg-accent/50"
                                : "border-slate-500/35 bg-white group-hover:border-accent/60"
                          }`}
                        >
                          {isDone && (
                            <svg
                              viewBox="0 0 8 8"
                              className="h-[7px] w-[7px] stroke-white"
                              strokeWidth="1.6"
                              fill="none"
                            >
                              <path d="M1.5 4.2 3.2 5.8 6.5 2.2" />
                            </svg>
                          )}
                        </span>
                        <span
                          className={`font-mono text-[9px] tracking-[0.16em] transition-colors duration-300 ${
                            isActive ? "text-accent" : "text-slate-400"
                          }`}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span
                          className={`text-[12px] font-semibold whitespace-nowrap transition-colors duration-300 ${
                            isActive
                              ? "text-ink"
                              : "text-slate-400 group-hover:text-slate-500"
                          }`}
                        >
                          {s.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </Reveal>

          {/* detail panel */}
          <Reveal delay={0.1} className="mt-10 sm:mt-14">
            <div className="relative mx-auto max-w-4xl overflow-hidden rounded-2xl border border-line bg-soft">
              <AnimatePresence mode="wait">
                <motion.div
                  key={stage.name}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="grid gap-8 p-7 sm:grid-cols-[auto_1fr] sm:p-10"
                >
                  <div className="flex items-start gap-4 sm:flex-col sm:gap-5">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-white shadow-[0_8px_20px_rgba(49,87,232,0.3)]">
                      {stage.icon}
                    </span>
                    <span className="font-mono text-[44px] leading-none font-medium tracking-tight text-ink/10 sm:text-[56px]">
                      {String(active + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div>
                    <div className="flex flex-wrap items-baseline gap-x-3">
                      <h3 className="text-[22px] font-semibold tracking-tight text-ink uppercase sm:text-[26px]">
                        {stage.name}
                      </h3>
                      <p className="text-[15px] font-medium text-accent">
                        {stage.tagline}
                      </p>
                    </div>
                    <p className="mt-3 max-w-xl text-[14.5px] leading-relaxed text-slate-500">
                      {stage.detail}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {stage.chips.map((c) => (
                        <span
                          key={c}
                          className="rounded-lg border border-line bg-white px-3 py-1.5 text-[12px] font-medium text-slate-500"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
