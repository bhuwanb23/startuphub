"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeftRight,
  Building2,
  FlaskConical,
  GraduationCap,
  Landmark,
  Rocket,
  ShieldCheck,
  Users,
  Wallet,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { EASE, Reveal, SectionHeader } from "@/components/motion";

/* 680 × 560 coordinate space */
const CENTER = { x: 340, y: 282 };

type ActorKey =
  | "startup"
  | "government"
  | "mentor"
  | "investor"
  | "corporate"
  | "resources"
  | "university"
  | "ipr";

type Actor = {
  key: ActorKey;
  label: string;
  pos: { x: number; y: number };
  icon: ReactNode;
  tagline: string;
  detail: string;
  flows: string[];
  stat: string;
  statLabel: string;
};

const ACTORS: Record<ActorKey, Actor> = {
  startup: {
    key: "startup",
    label: "Startup",
    pos: CENTER,
    icon: <Rocket className="h-4 w-4" />,
    tagline: "The centre of gravity.",
    detail:
      "Every actor in your ecosystem orbits one goal: your progress. Pick any node to see the relationship — what flows in, what flows back out.",
    flows: [
      "Signals intelligence outward",
      "Pulls capital, talent and demand inward",
      "Compounds with every connection",
    ],
    stat: "68K+",
    statLabel: "active relationships",
  },
  government: {
    key: "government",
    label: "Government",
    pos: { x: 340, y: 84 },
    icon: <Landmark className="h-3.5 w-3.5" />,
    tagline: "Policy voice and first demand.",
    detail:
      "Schemes, grants and public procurement become accessible when the paperwork is automated. We map eligibility in real time and route tenders matched to your product.",
    flows: [
      "Grants and scheme eligibility",
      "Public tender corridors",
      "Regulatory clarity on tap",
    ],
    stat: "120+",
    statLabel: "live schemes mapped",
  },
  mentor: {
    key: "mentor",
    label: "Mentors",
    pos: { x: 534, y: 158 },
    icon: <Users className="h-3.5 w-3.5" />,
    tagline: "Scar tissue, on call.",
    detail:
      "Operators who have shipped, failed and scaled — matched by sector and stage, so advice is specific to the decision in front of you, today.",
    flows: [
      "1:1 operator sessions",
      "Milestone reviews",
      "Warm, earned introductions",
    ],
    stat: "2.8K+",
    statLabel: "vetted mentors",
  },
  investor: {
    key: "investor",
    label: "Investors",
    pos: { x: 580, y: 324 },
    icon: <Wallet className="h-3.5 w-3.5" />,
    tagline: "Capital with conviction.",
    detail:
      "Readiness-scored profiles replace cold decks. Investors see traction in context; founders meet capital that actually fits their stage and thesis.",
    flows: [
      "Stage-matched cheques",
      "Market signalling",
      "Follow-on syndication",
    ],
    stat: "₹640 Cr",
    statLabel: "deployed via network",
  },
  corporate: {
    key: "corporate",
    label: "Corporates",
    pos: { x: 448, y: 458 },
    icon: <Building2 className="h-3.5 w-3.5" />,
    tagline: "Your first enterprise customer.",
    detail:
      "Pilot corridors turn enterprise interest into paid proof — structured procurement, co-innovation labs and reference customers that unlock scale.",
    flows: ["Paid pilots and PoCs", "Procurement corridors", "Co-innovation labs"],
    stat: "340",
    statLabel: "pilot corridors",
  },
  resources: {
    key: "resources",
    label: "Resources",
    pos: { x: 232, y: 458 },
    icon: <FlaskConical className="h-3.5 w-3.5" />,
    tagline: "The raw fuel for velocity.",
    detail:
      "Cloud credits, lab and fabrication access, tooling and hiring pipelines — unlocked precisely when your stage demands it, without dilution.",
    flows: ["₹25L+ in credits", "Shared labs and infra", "Curated talent pipelines"],
    stat: "₹25L+",
    statLabel: "avg. unlocked / startup",
  },
  university: {
    key: "university",
    label: "Universities",
    pos: { x: 100, y: 324 },
    icon: <GraduationCap className="h-3.5 w-3.5" />,
    tagline: "Research into venture.",
    detail:
      "Lab spin-outs, technology transfer and student founder programs convert deep research into defensible startups with real IP behind them.",
    flows: ["Lab spin-out programs", "Technology transfer desk", "Student founder tracks"],
    stat: "86",
    statLabel: "partner labs",
  },
  ipr: {
    key: "ipr",
    label: "IPR Desk",
    pos: { x: 146, y: 158 },
    icon: <ShieldCheck className="h-3.5 w-3.5" />,
    tagline: "Protection as strategy.",
    detail:
      "Filing workflows, freedom-to-operate analysis and a licensing marketplace make intellectual property a growth asset — not an afterthought.",
    flows: ["Patent filing workflows", "FTO and landscape maps", "Licensing marketplace"],
    stat: "9.2K",
    statLabel: "filings processed",
  },
};

const ORDER: ActorKey[] = [
  "government",
  "mentor",
  "investor",
  "corporate",
  "resources",
  "university",
  "ipr",
];

const CROSS: Array<[ActorKey, ActorKey]> = [
  ["government", "ipr"],
  ["mentor", "investor"],
  ["corporate", "investor"],
  ["university", "ipr"],
  ["resources", "corporate"],
];

export function Ecosystem() {
  const [active, setActive] = useState<ActorKey>("startup");
  const a = ACTORS[active];

  return (
    <section id="ecosystem" className="border-t border-line bg-accent-mist">
      <div className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid items-start gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          {/* graph */}
          <div className="order-2 lg:order-1">
            <Reveal>
              <div className="dot-grid relative aspect-[680/560] w-full">
                <svg
                  viewBox="0 0 680 560"
                  className="absolute inset-0 h-full w-full"
                  fill="none"
                >
                  {/* faint cross links */}
                  {CROSS.map(([from, to], i) => (
                    <motion.path
                      key={`x-${i}`}
                      d={`M ${ACTORS[from].pos.x} ${ACTORS[from].pos.y} L ${ACTORS[to].pos.x} ${ACTORS[to].pos.y}`}
                      stroke="#C9D4F2"
                      strokeWidth={1.2}
                      strokeDasharray="2 7"
                      initial={{ pathLength: 0, opacity: 0.9 }}
                      whileInView={{ pathLength: 1, opacity: 0.9 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: 0.9 + i * 0.1,
                        duration: 1,
                        ease: EASE,
                      }}
                    />
                  ))}

                  {/* spokes */}
                  {ORDER.map((k, i) => {
                    const p = ACTORS[k].pos;
                    const d = `M ${CENTER.x} ${CENTER.y} L ${p.x} ${p.y}`;
                    const isActive = active === k;
                    return (
                      <g key={k}>
                        <motion.path
                          d={d}
                          stroke={isActive ? "#3157E8" : "#8FA4E6"}
                          strokeOpacity={isActive ? 0.85 : 0.4}
                          strokeWidth={isActive ? 2 : 1.4}
                          initial={{ pathLength: 0 }}
                          whileInView={{ pathLength: 1 }}
                          viewport={{ once: true }}
                          transition={{
                            delay: 0.5 + i * 0.1,
                            duration: 1.1,
                            ease: EASE,
                          }}
                          style={{ transition: "stroke-opacity 0.4s, stroke 0.4s" }}
                        />
                        {isActive && (
                          <>
                            <motion.circle
                              r={4.5}
                              fill="#3157E8"
                              opacity={0.2}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 0.2 }}
                            >
                              <animateMotion dur="2.4s" repeatCount="indefinite" path={d} />
                            </motion.circle>
                            <circle r={2.4} fill="#3157E8">
                              <animateMotion dur="2.4s" repeatCount="indefinite" path={d} />
                            </circle>
                          </>
                        )}
                      </g>
                    );
                  })}
                </svg>

                {/* center startup node */}
                <motion.button
                  onClick={() => setActive("startup")}
                  initial={{ opacity: 0, scale: 0.7 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.35, duration: 0.8, ease: EASE }}
                  className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left: `${(CENTER.x / 680) * 100}%`,
                    top: `${(CENTER.y / 560) * 100}%`,
                  }}
                  aria-label="Startup"
                >
                  <div
                    className={`flex items-center gap-2.5 rounded-2xl px-4 py-3 shadow-lift transition-all duration-300 ${
                      active === "startup"
                        ? "bg-accent text-white"
                        : "bg-ink text-white hover:bg-ink-3"
                    }`}
                  >
                    <span
                      className={`anim-node-pulse flex h-8 w-8 items-center justify-center rounded-xl ${
                        active === "startup" ? "bg-white/15" : "bg-accent"
                      }`}
                    >
                      <Rocket className="h-4 w-4" />
                    </span>
                    <span className="text-left">
                      <span className="block font-mono text-[8.5px] tracking-[0.18em] text-white/60 uppercase">
                        The centre
                      </span>
                      <span className="block text-[14px] font-bold tracking-tight">
                        STARTUP
                      </span>
                    </span>
                  </div>
                </motion.button>

                {/* actor nodes */}
                {ORDER.map((k, i) => {
                  const node = ACTORS[k];
                  const isActive = active === k;
                  return (
                    <motion.button
                      key={k}
                      onClick={() => setActive(k)}
                      initial={{ opacity: 0, scale: 0.7 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: 0.55 + i * 0.08,
                        duration: 0.7,
                        ease: EASE,
                      }}
                      whileHover={{ scale: 1.07 }}
                      className="absolute z-10 -translate-x-1/2 -translate-y-1/2 focus:outline-none"
                      style={{
                        left: `${(node.pos.x / 680) * 100}%`,
                        top: `${(node.pos.y / 560) * 100}%`,
                      }}
                      aria-label={node.label}
                    >
                      <span
                        className={`flex items-center gap-2 rounded-xl border px-2.5 py-2 shadow-node backdrop-blur transition-all duration-300 sm:px-3 sm:py-2.5 ${
                          isActive
                            ? "border-accent bg-accent text-white"
                            : "border-line bg-white/95 text-ink hover:border-accent/50"
                        }`}
                      >
                        <span
                          className={`flex h-6 w-6 items-center justify-center rounded-lg sm:h-6.5 sm:w-6.5 ${
                            isActive
                              ? "bg-white/15 text-white"
                              : "bg-accent-soft text-accent"
                          }`}
                        >
                          {node.icon}
                        </span>
                        <span className="text-[10.5px] font-semibold whitespace-nowrap sm:text-[12px]">
                          {node.label}
                        </span>
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </Reveal>
          </div>

          {/* copy + detail panel */}
          <div className="order-1 lg:sticky lg:top-28 lg:order-2">
            <SectionHeader
              eyebrow="The network"
              title="Your startup doesn't grow alone."
              lede="Seven types of actors orbit every company on StartupHub. Select a node to see what flows between."
            />

            <Reveal delay={0.15} className="mt-8">
              <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-soft">
                <div className="flex items-center justify-between border-b border-line px-6 py-4">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={a.key}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.3, ease: EASE }}
                      className="font-mono text-[10.5px] font-semibold tracking-[0.2em] text-accent uppercase"
                    >
                      Startup ⇄ {a.label}
                    </motion.p>
                  </AnimatePresence>
                  <ArrowLeftRight className="h-3.5 w-3.5 text-slate-400" />
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={a.key}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="p-6 sm:p-7"
                  >
                    <h3 className="text-[21px] font-semibold tracking-tight text-ink">
                      {a.tagline}
                    </h3>
                    <p className="mt-2.5 text-[13.5px] leading-relaxed text-slate-500">
                      {a.detail}
                    </p>

                    <ul className="mt-5 space-y-2.5">
                      {a.flows.map((f, i) => (
                        <motion.li
                          key={f}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.12 + i * 0.07, duration: 0.4 }}
                          className="flex items-center gap-2.5 text-[13px] font-medium text-ink"
                        >
                          <span className="h-1 w-4 rounded-full bg-accent/70" />
                          {f}
                        </motion.li>
                      ))}
                    </ul>

                    <div className="mt-6 flex items-baseline gap-2.5 border-t border-slate-100 pt-5">
                      <span className="text-[26px] font-semibold tracking-tight text-accent">
                        {a.stat}
                      </span>
                      <span className="text-[12px] font-medium text-slate-400">
                        {a.statLabel}
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
