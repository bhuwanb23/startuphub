"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Banknote,
  BrainCircuit,
  Layers,
  Rocket,
  ShieldCheck,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Logo } from "@/components/ui";

/* ---------------------------------- data ---------------------------------- */

type Node = {
  id: string;
  x: number; // % of container
  y: number; // % of container
  icon: LucideIcon;
  title: string;
  sub: string;
};

const NODES: Node[] = [
  { id: "intel", x: 50, y: 13.5, icon: BrainCircuit, title: "Startup Intelligence", sub: "Live signal layer" },
  { id: "market", x: 16.5, y: 45.5, icon: TrendingUp, title: "Market", sub: "GTM & buyers" },
  { id: "ipr", x: 83.5, y: 45.5, icon: ShieldCheck, title: "IPR Studio", sub: "Protect & license" },
  { id: "mentor", x: 14.5, y: 87, icon: Users, title: "Mentors", sub: "1:1 operators" },
  { id: "resources", x: 50, y: 89.5, icon: Layers, title: "Resources", sub: "Credits & tools" },
  { id: "funding", x: 85.5, y: 87, icon: Banknote, title: "Funding", sub: "Capital matched" },
];

/* viewBox = 1000 x 560; paths connect card edges */
const EDGES: string[] = [
  "M500,104 C470,150 300,158 216,212",
  "M500,104 C530,150 700,158 784,212",
  "M240,268 C300,278 348,288 384,296",
  "M760,268 C700,278 652,288 616,296",
  "M448,368 C390,415 250,432 176,458",
  "M500,368 C500,404 500,428 500,466",
  "M552,368 C610,415 750,432 824,458",
];

const ACTIVITY: { icon: LucideIcon; text: string }[] = [
  { icon: ShieldCheck, text: "IPR filing approved — FiberForge" },
  { icon: Users, text: "Mentor session booked · Growth track" },
  { icon: Banknote, text: "$250K committed by Nexus Angels" },
  { icon: Rocket, text: "Vantara started a corporate pilot" },
];

/* ------------------------------ small pieces ------------------------------ */

function NodeCard({ node, index }: { node: Node; index: number }) {
  const Icon = node.icon;
  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${node.x}%`, top: `${node.y}%` }}
    >
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{
          duration: 5.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.85,
        }}
        className="group flex items-center gap-2.5 rounded-xl border border-line bg-white px-3.5 py-2.5 shadow-card transition-colors duration-300 hover:border-accent/30"
      >
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent">
          <Icon className="h-4 w-4" strokeWidth={2.1} />
        </span>
        <span className="text-left">
          <span className="block whitespace-nowrap text-[12.5px] font-semibold leading-tight text-ink">
            {node.title}
          </span>
          <span className="block whitespace-nowrap text-[10.5px] leading-tight text-slate-400">
            {node.sub}
          </span>
        </span>
      </motion.div>
    </div>
  );
}

function StartupCore() {
  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: "50%", top: "53.5%" }}
    >
      <div className="relative">
        <span className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-accent/20 bg-accent-soft px-2.5 py-1 text-[9.5px] font-semibold tracking-[0.18em] text-accent">
          YOUR STARTUP
        </span>
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="w-[224px] rounded-2xl border border-accent/25 bg-white p-4 shadow-lift"
        >
          <div className="flex items-center gap-3">
            <Logo className="h-9 w-9 shrink-0" />
            <div>
              <p className="text-[13.5px] font-semibold leading-tight text-ink">
                Northwind Labs
              </p>
              <p className="text-[10.5px] leading-tight text-slate-400">
                Agri Robotics · Bengaluru
              </p>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between text-[9.5px] font-semibold tracking-[0.14em] text-slate-400">
              <span>SEED</span>
              <span className="text-accent">SERIES A</span>
            </div>
            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-accent-soft">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 0.62 }}
                transition={{ duration: 1.4, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
                className="h-full w-full origin-left rounded-full bg-accent"
              />
            </div>
          </div>
          <div className="mt-3.5 flex items-center justify-between border-t border-line pt-3 text-[10.5px] font-semibold text-slate-500">
            <span>
              Runway <span className="text-ink">14 mo</span>
            </span>
            <span>
              MRR <span className="text-ink">$21K</span>
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function ActivityFeed() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % ACTIVITY.length), 2800);
    return () => clearInterval(id);
  }, []);
  const item = ACTIVITY[index];
  const Icon = item.icon;
  return (
    <div className="absolute bottom-4 left-4 z-10 hidden md:block">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 12, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.97 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-2.5 rounded-full border border-line bg-white py-1.5 pl-1.5 pr-4 shadow-card"
        >
          <span className="grid h-6 w-6 place-items-center rounded-full bg-accent-soft text-accent">
            <Icon className="h-3.5 w-3.5" strokeWidth={2.2} />
          </span>
          <span className="whitespace-nowrap text-[12px] font-medium text-ink">
            {item.text}
          </span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* --------------------------------- diagram -------------------------------- */

export function EcosystemDiagram() {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-pop">
      {/* window chrome */}
      <div className="flex h-11 items-center gap-2 border-b border-line px-4">
        <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
        <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
        <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
        <span className="mx-auto hidden rounded-md border border-line bg-soft px-3 py-1 text-[11px] font-medium tracking-wide text-slate-400 sm:block">
          startuphub.eco / northwind / overview
        </span>
        <span className="ml-auto inline-flex items-center gap-1.5 sm:ml-0">
          <span className="relative flex h-1.5 w-1.5">
            <span className="ping-dot absolute inline-flex h-full w-full rounded-full bg-emerald-400" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
          </span>
          <span className="text-[10px] font-semibold tracking-[0.16em] text-emerald-600">
            LIVE
          </span>
        </span>
      </div>

      {/* desktop network */}
      <div className="relative hidden aspect-[1000/560] w-full bg-gradient-to-b from-white via-white to-accent-mist/60 sm:block">
        <svg
          viewBox="0 0 1000 560"
          className="absolute inset-0 h-full w-full"
          fill="none"
          aria-hidden
        >
          <circle cx="500" cy="300" r="156" stroke="#d9e3fb" strokeWidth="1" strokeDasharray="2 9" strokeLinecap="round" opacity="0.9" />
          <circle cx="500" cy="300" r="216" stroke="#d9e3fb" strokeWidth="1" strokeDasharray="2 9" strokeLinecap="round" opacity="0.55" />
          {EDGES.map((d) => (
            <path key={d} d={d} stroke="#dde5f5" strokeWidth="1.5" />
          ))}
          {EDGES.map((d, i) => (
            <circle key={`pulse-${d}`} r="3.5" fill="#3157E8" opacity="0.9">
              <animateMotion
                dur="3.6s"
                begin={`${i * 0.55}s`}
                repeatCount="indefinite"
                path={d}
              />
            </circle>
          ))}
        </svg>

        {NODES.map((node, i) => (
          <NodeCard key={node.id} node={node} index={i} />
        ))}
        <StartupCore />
        <ActivityFeed />

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="absolute left-4 top-4 hidden rounded-xl border border-line bg-white px-3.5 py-2.5 shadow-card md:block"
        >
          <p className="text-[10px] font-semibold tracking-[0.16em] text-slate-400">
            ECOSYSTEM SIGNAL
          </p>
          <p className="mt-0.5 text-[15px] font-semibold leading-tight text-ink">
            94% <span className="text-[11px] font-medium text-emerald-600">+6.2 this week</span>
          </p>
        </motion.div>
      </div>

      {/* mobile flow */}
      <div className="flex flex-col items-center gap-1 bg-gradient-to-b from-white to-accent-mist/60 px-5 py-8 sm:hidden">
        {NODES.slice(0, 3).map((n) => (
          <MobileChip key={n.id} node={n} />
        ))}
        <div className="w-full max-w-[240px]">
          <StartupCoreMobile />
        </div>
        {NODES.slice(3).map((n, i, arr) => (
          <MobileChip key={n.id} node={n} trailing={i < arr.length - 1} />
        ))}
      </div>
    </div>
  );
}

function MobileChip({ node, trailing = true }: { node: Node; trailing?: boolean }) {
  const Icon = node.icon;
  return (
    <>
      <div className="flex w-full max-w-[240px] items-center gap-3 rounded-xl border border-line bg-white px-4 py-3 shadow-card">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent">
          <Icon className="h-4 w-4" strokeWidth={2.1} />
        </span>
        <span>
          <span className="block text-[13px] font-semibold leading-tight text-ink">
            {node.title}
          </span>
          <span className="block text-[11px] text-slate-400">{node.sub}</span>
        </span>
      </div>
      {trailing && <span className="h-5 w-px bg-accent/20" aria-hidden />}
    </>
  );
}

function StartupCoreMobile() {
  return (
    <div className="my-1 rounded-2xl border border-accent/25 bg-white p-4 shadow-lift">
      <div className="flex items-center gap-3">
        <Logo className="h-9 w-9 shrink-0" />
        <div>
          <p className="text-[13.5px] font-semibold leading-tight text-ink">Northwind Labs</p>
          <p className="text-[10.5px] text-slate-400">Agri Robotics · Bengaluru</p>
        </div>
      </div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-accent-soft">
        <div className="h-full w-[62%] rounded-full bg-accent" />
      </div>
    </div>
  );
}
