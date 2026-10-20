"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Briefcase,
  Building2,
  GraduationCap,
  Landmark,
  Rocket,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";
import { Logo, Wordmark } from "@/components/ui";
import { cn } from "@/lib/utils";

const ROLES = [
  {
    key: "founder",
    label: "Founder",
    desc: "Build, protect, fund and grow your startup",
    icon: Rocket,
    href: "/founder",
    you: "Ravi Sharma · Lumen AI",
  },
  {
    key: "mentor",
    label: "Mentor",
    desc: "Guide founders with structured mentorship",
    icon: GraduationCap,
    href: "/mentor",
    you: "Priya Nair · Operator-circle",
  },
  {
    key: "ipr-expert",
    label: "IPR Expert",
    desc: "Filings, landscapes and commercialization",
    icon: ShieldCheck,
    href: "/ipr-expert",
    you: "Nisha Rao · IPR Desk",
  },
  {
    key: "incubator",
    label: "Incubator",
    desc: "Run cohorts, programs and interventions",
    icon: Building2,
    href: "/incubator",
    you: "Nexus Ventures",
  },
  {
    key: "investor",
    label: "Investor",
    desc: "Deal flow, DD, execution and portfolio intelligence",
    icon: Briefcase,
    href: "/investor",
    you: "Arjun Mehta · Meridian Angels",
  },
  {
    key: "government",
    label: "Government",
    desc: "Ecosystem intelligence, schemes, funding & policy",
    icon: Landmark,
    href: "/government",
    you: "Sunita Verma · State Innovation Mission",
  },
];

export function AuthView({ mode }: { mode: "login" | "register" }) {
  const [role, setRole] = useState("investor");
  const active = ROLES.find((r) => r.key === role)!;
  const isLogin = mode === "login";

  return (
    <div className="grid min-h-screen pt-[68px] lg:grid-cols-[1.05fr_1fr]">
      {/* brand panel */}
      <div className="dot-grid-dark relative hidden overflow-hidden bg-ink p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 700 900" fill="none" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <g stroke="#3157e8" strokeOpacity="0.4" strokeWidth="1.2" strokeDasharray="3 7">
            <path d="M-40 700 C 180 420, 380 780, 620 480 S 700 200, 760 120" />
            <path d="M-40 220 C 220 480, 420 120, 740 380" />
          </g>
          {[
            [180, 480],
            [380, 540],
            [620, 480],
            [260, 240],
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="4" fill="#3157e8" />
          ))}
        </svg>
        <div className="relative">
          <a href="/"><Wordmark dark /></a>
          <h1 className="mt-20 max-w-md text-[clamp(2rem,3.4vw,3rem)] leading-[1.06] font-semibold tracking-[-0.035em]">
            Every role in the ecosystem,
            <br />
            one workspace<span className="text-accent">.</span>
          </h1>
          <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-white/55">
            Founders, mentors, IPR experts, incubators and investors — each with a
            purpose-built cockpit, all connected by one intelligence layer.
          </p>
        </div>
        <div className="relative space-y-4">
          <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
            <BadgeCheck className="h-5 w-5 shrink-0 text-accent" />
            <p className="text-[13px] leading-relaxed text-white/70">
              "The investor cockpit replaced four tools and a spreadsheet. DD to
              close in one room." — <span className="text-white">Arjun Mehta, Meridian Angels</span>
            </p>
          </div>
          <div className="flex gap-8 font-mono text-[10px] tracking-[0.18em] text-white/40 uppercase">
            <span>10K+ startups</span>
            <span>2.8K mentors</span>
            <span>₹1.2K Cr connected</span>
          </div>
        </div>
      </div>

      {/* form panel */}
      <div className="flex items-center justify-center bg-soft px-5 py-12 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-md"
        >
          <a href="/" className="lg:hidden"><Wordmark /></a>
          <h2 className="mt-6 text-[26px] font-semibold tracking-[-0.025em] text-ink lg:mt-0">
            {isLogin ? "Welcome back" : "Create your workspace"}
          </h2>
          <p className="mt-2 text-[13.5px] text-slate-500">
            {isLogin
              ? "Choose your role to continue to your workspace."
              : "Pick your role — your workspace shapes itself around it."}
          </p>

          {/* role selector */}
          <div className="mt-7 space-y-2">
            {ROLES.map((r) => {
              const selected = role === r.key;
              return (
                <button
                  key={r.key}
                  onClick={() => setRole(r.key)}
                  className={cn(
                    "group flex w-full items-center gap-3.5 rounded-xl border p-3.5 text-left transition-all duration-300",
                    selected
                      ? "border-accent bg-white shadow-[0_8px_24px_rgba(49,87,232,0.14)] ring-1 ring-accent"
                      : "border-line bg-white hover:border-accent/40 hover:bg-accent-mist",
                  )}
                >
                  <span className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors",
                    selected ? "bg-accent text-white" : "bg-accent-soft text-accent",
                  )}>
                    <r.icon className="h-4.5 w-4.5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[14px] font-semibold text-ink">{r.label}</span>
                    <span className="block truncate text-[11.5px] text-slate-400">{r.desc}</span>
                  </span>
                  <span className={cn(
                    "h-2.5 w-2.5 shrink-0 rounded-full border-2 transition-colors",
                    selected ? "border-accent bg-accent" : "border-slate-300",
                  )} />
                </button>
              );
            })}
          </div>

          {/* credentials */}
          <div className="mt-6 space-y-3">
            <input
              type="email"
              placeholder="Work email"
              defaultValue="arjun@meridian.angels"
              className="w-full rounded-xl border border-line bg-white px-4 py-3 text-[13.5px] text-ink outline-none placeholder:text-slate-400 focus:border-accent/50"
            />
            <input
              type="password"
              placeholder="Password"
              defaultValue="demo-password"
              className="w-full rounded-xl border border-line bg-white px-4 py-3 text-[13.5px] text-ink outline-none placeholder:text-slate-400 focus:border-accent/50"
            />
          </div>

          <a
            href={active.href}
            className="group mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-accent py-3.5 text-[14.5px] font-semibold text-white shadow-[0_8px_20px_rgba(49,87,232,0.28)] transition-all duration-300 hover:bg-accent-deep"
          >
            {isLogin ? `Continue as ${active.label}` : `Create ${active.label} workspace`}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>

          <p className="mt-3 text-center font-mono text-[10px] tracking-[0.1em] text-slate-400 uppercase">
            Demo → {active.you}
          </p>

          <div className="mt-7 border-t border-line pt-5 text-center text-[12.5px] text-slate-500">
            {isLogin ? (
              <>New to StartupHub? <a href="/register" className="font-semibold text-accent">Create account</a></>
            ) : (
              <>Already have a workspace? <a href="/login" className="font-semibold text-accent">Log in</a></>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
