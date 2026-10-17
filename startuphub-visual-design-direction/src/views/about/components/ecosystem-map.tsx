"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  Check,
  GraduationCap,
  HandCoins,
  Landmark,
  Layers,
  Network,
  ShieldCheck,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useState, type ComponentType } from "react";
import { Container, SectionHead } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { cn } from "@/lib/utils";

type NodeId = "mentors" | "investors" | "corporates" | "universities" | "resources" | "ipr" | "government";

const nodes: {
  id: NodeId;
  icon: ComponentType<{ className?: string }>;
  title: string;
  x: number;
  y: number;
  desc: string;
  bullets: string[];
  stat: string;
}[] = [
  {
    id: "government", icon: Landmark, title: "Government", x: 320, y: 66,
    desc: "Policy, grants and national missions — without the paperwork maze.",
    bullets: ["Grant discovery matched to your sector", "Compliance calendar and reminders", "Direct line to state startup cells"],
    stat: "120+ active programmes",
  },
  {
    id: "investors", icon: HandCoins, title: "Investors", x: 512, y: 148,
    desc: "Angels, VCs and corporate venture — filtered by stage, cheque and thesis.",
    bullets: ["Warm, double-opt-in introductions", "Readiness score before every pitch", "Term-sheet library and benchmarks"],
    stat: "₹1,200 Cr connected to date",
  },
  {
    id: "corporates", icon: Building2, title: "Corporates", x: 548, y: 330,
    desc: "Pilot with real demand. Enterprise partners looking for exactly what you build.",
    bullets: ["Structured pilot programmes", "Procurement fast-tracks", "Co-innovation labs and challenges"],
    stat: "340+ enterprise partners",
  },
  {
    id: "universities", icon: GraduationCap, title: "Universities", x: 420, y: 472,
    desc: "Research that becomes product. Labs, talent and tech-transfer in one loop.",
    bullets: ["Licensed research and IP pools", "Founder-in-residence programmes", "Student talent pipelines"],
    stat: "86 partner institutions",
  },
  {
    id: "mentors", icon: Users, title: "Mentors", x: 220, y: 472,
    desc: "Operators who have built before you — matched by sector, stage and challenge.",
    bullets: ["1:1 matching by stage and sector", "Playbooks from 2,800+ operators", "Weekly open office hours"],
    stat: "2,800+ active mentors",
  },
  {
    id: "resources", icon: Layers, title: "Resources", x: 92, y: 330,
    desc: "Cloud credits, tooling and templates — the operational fuel of early teams.",
    bullets: ["$250K+ in credits and perks", "Legal, finance and hiring templates", "Vetted service marketplace"],
    stat: "620+ curated resources",
  },
  {
    id: "ipr", icon: ShieldCheck, title: "IPR Desk", x: 128, y: 148,
    desc: "Protect before you pitch. Patents, trademarks and filings handled end-to-end.",
    bullets: ["Patentability search in 72 hours", "Fixed-fee filing packages", "Portfolio and renewal tracking"],
    stat: "4,100+ filings managed",
  },
];

const ringPath = nodes.map((n, i) => `${i === 0 ? "M" : "L"} ${n.x} ${n.y}`).join(" ") + " Z";

export default function EcosystemMap() {
  const [active, setActive] = useState<NodeId>("mentors");
  const current = nodes.find((n) => n.id === active)!;

  return (
    <section className="bg-white py-24 md:py-32">
      <Container>
        <SectionHead
          eyebrow="The Startup Ecosystem"
          title={
            <>
              Your startup doesn&apos;t <span className="text-accent">grow alone.</span>
            </>
          }
          lead="Seven forces surround every venture. Select a node to see how StartupHub wires it into your journey."
        />

        <div className="mt-14 grid items-center gap-10 md:mt-16 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
          <Reveal className="relative hidden aspect-[640/560] md:block">
            <svg viewBox="0 0 640 560" className="absolute inset-0 h-full w-full" aria-hidden="true">
              <path d={ringPath} fill="none" stroke="#C9D4EC" strokeWidth="1.2" strokeDasharray="4 7" />
              {nodes.map((n) => (
                <path
                  key={n.id}
                  d={`M 320 280 L ${n.x} ${n.y}`}
                  fill="none"
                  stroke={n.id === active ? "#3157E8" : "#C9D4EC"}
                  strokeWidth={n.id === active ? 1.8 : 1.2}
                  className="transition-all duration-300"
                />
              ))}
              <circle r="4" fill="#3157E8">
                <animateMotion
                  key={active}
                  dur="2.4s"
                  repeatCount="indefinite"
                  path={`M 320 280 L ${current.x} ${current.y}`}
                />
              </circle>
            </svg>

            <div className="absolute z-10 -translate-x-1/2 -translate-y-1/2" style={{ left: "50%", top: "50%" }}>
              <div className="flex h-[104px] w-[104px] flex-col items-center justify-center gap-1.5 rounded-2xl border border-accent/20 bg-white text-center shadow-[0_16px_40px_-16px_rgba(49,87,232,0.4)]">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-accent text-white">
                  <Network className="h-4 w-4" />
                </span>
                <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-ink">Startup</span>
              </div>
            </div>

            {nodes.map((n) => (
              <button
                key={n.id}
                onClick={() => setActive(n.id)}
                onMouseEnter={() => setActive(n.id)}
                className="group absolute z-10 -translate-x-1/2 -translate-y-1/2 outline-none"
                style={{ left: `${(n.x / 640) * 100}%`, top: `${(n.y / 560) * 100}%` }}
              >
                <span
                  className={cn(
                    "flex w-[104px] flex-col items-center gap-1.5 rounded-xl border bg-white px-2 py-2.5 transition-all duration-300",
                    n.id === active
                      ? "-translate-y-0.5 border-accent/40 shadow-[0_14px_32px_-12px_rgba(49,87,232,0.45)]"
                      : "border-line shadow-sm hover:border-slate-300 hover:shadow-md"
                  )}
                >
                  <span
                    className={cn(
                      "grid h-8 w-8 place-items-center rounded-lg transition-colors",
                      n.id === active ? "bg-accent text-white" : "bg-accent-soft text-accent"
                    )}
                  >
                    <n.icon className="h-4 w-4" />
                  </span>
                  <span className="text-[11px] font-semibold text-ink">{n.title}</span>
                </span>
              </button>
            ))}
          </Reveal>

          {/* mobile chips */}
          <div className="flex flex-wrap gap-2 md:hidden">
            {nodes.map((n) => (
              <button
                key={n.id}
                onClick={() => setActive(n.id)}
                className={cn(
                  "flex items-center gap-2 rounded-full border px-3.5 py-2 text-[13px] font-medium transition-colors",
                  n.id === active ? "border-accent bg-accent text-white" : "border-line bg-white text-slate-600"
                )}
              >
                <n.icon className="h-3.5 w-3.5" />
                {n.title}
              </button>
            ))}
          </div>

          {/* detail panel */}
          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-line bg-white p-7 shadow-[0_24px_56px_-32px_rgba(11,18,32,0.25)] md:p-9">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <div className="flex items-center gap-4">
                    <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent text-white">
                      <current.icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold tracking-tight text-ink">{current.title}</h3>
                      <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-accent">{current.stat}</p>
                    </div>
                  </div>
                  <p className="mt-5 text-[15px] leading-relaxed text-slate-500">{current.desc}</p>
                  <ul className="mt-6 space-y-3">
                    {current.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-3 text-sm text-slate-600">
                        <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent-soft text-accent">
                          <Check className="h-3 w-3" />
                        </span>
                        {b}
                      </li>
                    ))}
                  </ul>
                  <Link href="/register" className="group mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                    Open this connection
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
