"use client";

import { useEffect, useState, type ReactNode } from "react";
import { MoveRight } from "lucide-react";
import { Reveal } from "@/components/motion";

const EXPO = "cubic-bezier(0.22, 1, 0.36, 1)";

const STAGES = [
  {
    name: "Idea",
    flow: ["Discover", "Validate", "Define"],
    desc: "Turn ambiguity into a sharp problem worth solving — with sector signals and founder-grade research built in.",
  },
  {
    name: "Validation",
    flow: ["Evidence", "Experiments", "Signal"],
    desc: "Prove demand before you write production code. Structured experiments replace guesswork.",
  },
  {
    name: "Incubation",
    flow: ["Mentors", "Milestones", "Resources"],
    desc: "Matched operators, milestone frameworks and the resource bank — orchestrated in one program view.",
  },
  {
    name: "IPR",
    flow: ["Protect", "Manage", "Commercialize"],
    desc: "Protect the innovation early. Patent desk, trademark filing and IP strategy without the friction.",
  },
  {
    name: "Resources",
    flow: ["Compute", "Credits", "Talent"],
    desc: "Cloud credits, legal tooling, labs and hiring pipelines at ecosystem rates.",
  },
  {
    name: "MVP",
    flow: ["Build", "Ship", "Learn"],
    desc: "Ship the smallest thing that teaches you the most — instrumented from day one.",
  },
  {
    name: "Market",
    flow: ["Launch", "Position", "Acquire"],
    desc: "Enter with positioning intelligence and pilot pathways into real customers.",
  },
  {
    name: "Funding",
    flow: ["Match", "Pitch", "Close"],
    desc: "Find the right capital at the right stage — signal-matched investors, not cold outreach.",
  },
  {
    name: "Growth",
    flow: ["Traction", "Systems", "Teams"],
    desc: "Turn traction into sustainable scale with growth loops, benchmarks and hiring systems.",
  },
  {
    name: "Scale",
    flow: ["Expand", "Endure", "Impact"],
    desc: "Expand across markets with the compliance, partners and intelligence to endure.",
  },
];

function FadeSwap({ swapKey, children }: { swapKey: number; children: ReactNode }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(false);
    const raf = requestAnimationFrame(() => setShow(true));
    return () => cancelAnimationFrame(raf);
  }, [swapKey]);

  return (
    <div
      style={{
        opacity: show ? 1 : 0,
        transform: show ? "none" : "translateY(16px)",
        transition: `opacity 0.55s ${EXPO}, transform 0.55s ${EXPO}`,
      }}
    >
      {children}
    </div>
  );
}

export function Lifecycle() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(
      () => setActive((a) => (a + 1) % STAGES.length),
      4200,
    );
    return () => clearInterval(id);
  }, [paused]);

  const stage = STAGES[active];

  return (
    <section
      id="lifecycle"
      className="border-y border-line bg-accent-mist py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <p className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            The Startup Lifecycle
          </p>
          <h2 className="mt-4 max-w-2xl text-[clamp(2rem,4.5vw,3.4rem)] font-semibold leading-[1.04] tracking-[-0.035em] text-ink">
            From first idea to lasting impact.
          </h2>
          <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-slate-500">
            Ten connected stages. One continuous graph. Hover any stage to see
            how StartupHub moves founders forward.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div
            className="mt-14"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {/* stage track */}
            <div className="no-scrollbar -mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
              <div className="relative min-w-max pb-1 pt-2">
                <div className="absolute left-0 right-0 top-[22px] h-px bg-slate-200" />
                <div
                  className="absolute left-0 top-[22px] h-px bg-accent"
                  style={{
                    width: `${(active / (STAGES.length - 1)) * 100}%`,
                    transition: `width 0.7s ${EXPO}`,
                  }}
                />
                <div className="relative flex">
                  {STAGES.map((s, i) => (
                    <button
                      key={s.name}
                      onClick={() => setActive(i)}
                      className="group flex w-[86px] flex-col items-center gap-2.5 pt-0.5 sm:w-auto sm:flex-1"
                      aria-label={`Stage ${i + 1}: ${s.name}`}
                    >
                      <span
                        className={`text-[10px] font-semibold tabular-nums transition-colors ${
                          i === active ? "text-accent" : "text-slate-300"
                        }`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={`relative h-3.5 w-3.5 rounded-full border-2 transition-all duration-300 ${
                          i === active
                            ? "scale-110 border-accent bg-accent shadow-[0_0_0_5px_rgba(49,87,232,0.15)]"
                            : i < active
                              ? "border-accent-300 bg-accent-200"
                              : "border-slate-300 bg-white group-hover:border-accent-300"
                        }`}
                      />
                      <span
                        className={`text-[10.5px] font-semibold uppercase tracking-[0.08em] transition-colors sm:text-[11px] ${
                          i === active
                            ? "text-ink"
                            : "text-slate-400 group-hover:text-slate-600"
                        }`}
                      >
                        {s.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* stage detail */}
            <FadeSwap swapKey={active}>
              <div className="mt-10 grid gap-8 rounded-2xl border border-line bg-white p-7 shadow-card sm:grid-cols-[auto_1fr_auto] sm:items-center sm:p-9">
                <span className="text-[56px] font-semibold leading-none tracking-[-0.04em] text-accent-100 sm:text-[72px]">
                  {String(active + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-[22px] font-semibold tracking-[-0.02em] text-ink sm:text-[26px]">
                    {stage.name}
                  </h3>
                  <p className="mt-2 max-w-xl text-[14.5px] leading-relaxed text-slate-500">
                    {stage.desc}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2 sm:flex-col sm:items-end">
                  {stage.flow.map((step, i) => (
                    <span key={step} className="flex items-center gap-2">
                      <span className="rounded-full border border-line bg-soft px-3 py-1.5 text-[12px] font-medium text-slate-600">
                        {step}
                      </span>
                      {i < stage.flow.length - 1 && (
                        <MoveRight className="h-3.5 w-3.5 text-accent-400 sm:rotate-90" />
                      )}
                    </span>
                  ))}
                </div>
              </div>
            </FadeSwap>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
