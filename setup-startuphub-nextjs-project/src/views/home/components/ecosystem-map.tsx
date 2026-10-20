"use client";

import { useEffect, useState, type ReactNode } from "react";
import {
  ArrowUpRight,
  Boxes,
  Building2,
  CircleDollarSign,
  GraduationCap,
  Landmark,
  Users,
} from "lucide-react";
import { LogoMark } from "@/components/ui";
import { Reveal } from "@/components/motion";

const EXPO = "cubic-bezier(0.22, 1, 0.36, 1)";

const CENTER = { x: 50, y: 50 };

const NODES = [
  {
    id: "government",
    label: "Government",
    icon: Landmark,
    x: 50,
    y: 8,
    metric: "1,200+",
    metricLabel: "schemes & missions mapped",
    desc: "Policy missions, grant windows and national innovation programs aligned to your sector — surfaced before deadlines, not after.",
  },
  {
    id: "investor",
    label: "Investor",
    icon: CircleDollarSign,
    x: 88,
    y: 29,
    metric: "₹1.2K Cr",
    metricLabel: "capital connected",
    desc: "Signal-driven introductions to angels, funds and strategic capital that already invest in your stage and sector.",
  },
  {
    id: "corporate",
    label: "Corporate",
    icon: Building2,
    x: 88,
    y: 71,
    metric: "180+",
    metricLabel: "enterprise pilots opened",
    desc: "Pilot programs and procurement pathways into enterprises looking for exactly what you are building.",
  },
  {
    id: "university",
    label: "University",
    icon: GraduationCap,
    x: 50,
    y: 92,
    metric: "300+",
    metricLabel: "partner campuses",
    desc: "Research labs, tech transfer offices and talent pipelines from partner institutions across the network.",
  },
  {
    id: "resources",
    label: "Resources",
    icon: Boxes,
    x: 12,
    y: 71,
    metric: "₹90L+",
    metricLabel: "average value unlocked",
    desc: "Cloud credits, legal tooling, compute and infrastructure at ecosystem rates — the unglamorous stuff that extends runway.",
  },
  {
    id: "mentor",
    label: "Mentor",
    icon: Users,
    x: 12,
    y: 29,
    metric: "2.8K+",
    metricLabel: "operators in network",
    desc: "Operators who have shipped, scaled and exited — matched to your stage, sector and current bottleneck.",
  },
] as const;

type NodeId = (typeof NODES)[number]["id"];

function FadeSwap({ swapKey, children }: { swapKey: string; children: ReactNode }) {
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
        transform: show ? "none" : "translateY(14px)",
        transition: `opacity 0.5s ${EXPO}, transform 0.5s ${EXPO}`,
      }}
    >
      {children}
    </div>
  );
}

export function EcosystemMap() {
  const [active, setActive] = useState<NodeId>("investor");
  const activeNode = NODES.find((n) => n.id === active)!;

  return (
    <section id="ecosystem" className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="flex items-center justify-center gap-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            The Ecosystem
          </p>
          <h2 className="mt-4 text-[clamp(2rem,4.5vw,3.4rem)] font-semibold leading-[1.04] tracking-[-0.035em] text-ink">
            Your startup doesn&apos;t grow alone.
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-slate-500">
            Every node in the network is one click away from your roadmap.
            Select a node to see how it connects.
          </p>
        </Reveal>

        <div className="mt-14 grid items-center gap-10 lg:grid-cols-[1.15fr_1fr]">
          {/* map */}
          <Reveal delay={100}>
            <div className="bg-grid relative h-[400px] overflow-hidden rounded-2xl border border-line bg-soft sm:h-[500px]">
              <svg
                className="absolute inset-0 h-full w-full"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden
              >
                {NODES.map((n) => (
                  <line
                    key={`base-${n.id}`}
                    x1={CENTER.x}
                    y1={CENTER.y}
                    x2={n.x}
                    y2={n.y}
                    stroke="#DFE4EE"
                    strokeWidth="1"
                    vectorEffect="non-scaling-stroke"
                  />
                ))}
                {NODES.map((n, i) => (
                  <line
                    key={`flow-${n.id}`}
                    x1={CENTER.x}
                    y1={CENTER.y}
                    x2={n.x}
                    y2={n.y}
                    stroke={active === n.id ? "#3157E8" : "#C3CCDE"}
                    strokeOpacity={active === n.id ? 0.9 : 0.5}
                    strokeWidth={active === n.id ? 1.6 : 1}
                    vectorEffect="non-scaling-stroke"
                    className="conn-flow"
                    style={{
                      animationDelay: `${i * -0.5}s`,
                      transition: "stroke 0.4s ease, stroke-opacity 0.4s ease",
                    }}
                  />
                ))}
              </svg>

              {/* center */}
              <div
                className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${CENTER.x}%`, top: `${CENTER.y}%` }}
              >
                <span
                  aria-hidden
                  className="absolute inset-0 animate-ping-ring rounded-2xl bg-accent"
                />
                <div className="relative flex flex-col items-center gap-1.5 rounded-2xl border border-accent-100 bg-white px-4 py-3 shadow-lift">
                  <LogoMark className="h-7 w-7" />
                  <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-ink">
                    Your Startup
                  </span>
                </div>
              </div>

              {/* satellites */}
              {NODES.map((n) => {
                const Icon = n.icon;
                const isActive = active === n.id;
                return (
                  <button
                    key={n.id}
                    onClick={() => setActive(n.id)}
                    className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${n.x}%`, top: `${n.y}%` }}
                    aria-label={`Explore ${n.label} connection`}
                  >
                    <span
                      className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1.5 transition-all duration-300 sm:gap-2 sm:px-3.5 sm:py-2 ${
                        isActive
                          ? "border-accent bg-accent text-white shadow-[0_8px_20px_-6px_rgba(49,87,232,0.5)]"
                          : "border-line bg-white text-ink shadow-[0_2px_10px_-2px_rgba(11,18,32,0.1)] hover:border-accent-300 hover:shadow-card"
                      }`}
                    >
                      <Icon
                        className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${
                          isActive ? "text-white" : "text-accent"
                        }`}
                      />
                      <span className="text-[10px] font-semibold uppercase tracking-wide sm:text-[11px]">
                        {n.label}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </Reveal>

          {/* relationship detail */}
          <Reveal delay={200}>
            <FadeSwap swapKey={active}>
              <div className="rounded-2xl border border-line bg-white p-8 shadow-card sm:p-10">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft">
                    <activeNode.icon className="h-5 w-5 text-accent" />
                  </span>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                      Ecosystem connection
                    </p>
                    <h3 className="text-[20px] font-semibold tracking-[-0.02em] text-ink">
                      {activeNode.label}
                    </h3>
                  </div>
                </div>
                <p className="mt-5 text-[15px] leading-relaxed text-slate-500">
                  {activeNode.desc}
                </p>
                <div className="mt-7 flex items-end justify-between border-t border-line pt-6">
                  <div>
                    <p className="text-[34px] font-semibold leading-none tracking-[-0.03em] text-accent">
                      {activeNode.metric}
                    </p>
                    <p className="mt-1.5 text-[13px] text-slate-400">
                      {activeNode.metricLabel}
                    </p>
                  </div>
                  <a
                    href="#cta"
                    className="inline-flex items-center gap-1 text-[13px] font-semibold text-accent hover:text-accent-deep"
                  >
                    Explore
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </FadeSwap>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
