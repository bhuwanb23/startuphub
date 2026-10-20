"use client";

import { useRef, useState, type PointerEvent } from "react";
import {
  Boxes,
  CircleDollarSign,
  Globe2,
  ShieldCheck,
  TrendingUp,
  Users,
} from "lucide-react";
import { useInView } from "@/components/motion";

const EXPO = "cubic-bezier(0.22, 1, 0.36, 1)";

type NetNode = {
  id: string;
  label: string;
  meta: string;
  x: number;
  y: number;
  icon: typeof Globe2;
};

const CENTER = { x: 50, y: 52 };

const NODES: NetNode[] = [
  { id: "market", label: "Market", meta: "+18.4%", x: 26, y: 19, icon: Globe2 },
  { id: "ipr", label: "IPR", meta: "Filed", x: 74, y: 19, icon: ShieldCheck },
  { id: "mentor", label: "Mentor", meta: "3 matches", x: 17, y: 82, icon: Users },
  { id: "resources", label: "Resources", meta: "₹42L", x: 50, y: 87, icon: Boxes },
  { id: "funding", label: "Funding", meta: "Seed", x: 83, y: 82, icon: CircleDollarSign },
];

function NodePill({ node }: { node: NetNode }) {
  const Icon = node.icon;
  return (
    <div
      className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${node.x}%`, top: `${node.y}%` }}
    >
      <div className="flex items-center gap-1.5 rounded-full border border-line bg-white py-1 pl-1.5 pr-2.5 shadow-[0_2px_8px_-2px_rgba(11,18,32,0.12)] sm:gap-2 sm:py-1.5 sm:pl-2 sm:pr-3">
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent-soft sm:h-6 sm:w-6">
          <Icon className="h-3 w-3 text-accent sm:h-3.5 sm:w-3.5" />
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-wide text-ink sm:text-[11px]">
          {node.label}
        </span>
        <span className="hidden text-[10px] font-medium text-slate-400 sm:inline">
          {node.meta}
        </span>
      </div>
    </div>
  );
}

function SignalChip({
  icon: Icon,
  title,
  sub,
  className,
  delay,
}: {
  icon: typeof ShieldCheck;
  title: string;
  sub: string;
  className: string;
  delay: string;
}) {
  return (
    <div
      className={`absolute z-20 hidden animate-float-y items-center gap-2.5 rounded-xl border border-line bg-white/95 px-3.5 py-2.5 shadow-card backdrop-blur md:flex ${className}`}
      style={{ animationDelay: delay }}
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-soft">
        <Icon className="h-4 w-4 text-accent" />
      </span>
      <span>
        <span className="block text-[12px] font-semibold leading-tight text-ink">
          {title}
        </span>
        <span className="block text-[11px] text-slate-400">{sub}</span>
      </span>
    </div>
  );
}

export function HeroVisual() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const { ref: viewRef, inView } = useInView<HTMLDivElement>(0.25);

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rx: -py * 5, ry: px * 6 });
  };

  const center = CENTER;

  return (
    <div
      ref={viewRef}
      className="relative mx-auto w-full max-w-5xl"
      style={{ perspective: "1400px" }}
    >
      {/* soft ambient tint — restrained, not neon */}
      <div
        aria-hidden
        className="absolute -inset-10 -z-10 rounded-[40px]"
        style={{
          background:
            "radial-gradient(58% 55% at 50% 12%, rgba(49,87,232,0.07), transparent 70%)",
        }}
      />

      <div
        ref={wrapRef}
        onPointerMove={onMove}
        onPointerLeave={() => setTilt({ rx: 0, ry: 0 })}
        className="relative rounded-2xl border border-line bg-white shadow-lift transition-transform duration-300 ease-out sm:rounded-[20px]"
        style={{
          transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* window chrome */}
        <div className="flex items-center gap-3 border-b border-line px-4 py-3 sm:px-5">
          <span className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
            <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
            <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
          </span>
          <span className="mx-auto flex items-center gap-1.5 rounded-md bg-soft px-3 py-1 text-[11px] font-medium text-slate-500">
            startuphub.app/intelligence
          </span>
          <span className="hidden items-center gap-1.5 rounded-full border border-accent-200 bg-accent-soft px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-accent-deep sm:flex">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute h-full w-full animate-ping rounded-full bg-accent-500 opacity-60" />
              <span className="relative h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            Live
          </span>
        </div>

        {/* network soft */}
        <div className="bg-grid relative h-[320px] overflow-hidden sm:h-[380px]">
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden
          >
            {NODES.map((n) => (
              <line
                key={`base-${n.id}`}
                x1={center.x}
                y1={center.y}
                x2={n.x}
                y2={n.y}
                stroke="#D9E1F5"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
            ))}
            {NODES.map((n, i) => (
              <line
                key={`flow-${n.id}`}
                x1={center.x}
                y1={center.y}
                x2={n.x}
                y2={n.y}
                stroke="#3157E8"
                strokeOpacity="0.55"
                strokeWidth="1.4"
                vectorEffect="non-scaling-stroke"
                className="conn-flow"
                style={{ animationDelay: `${i * -0.6}s` }}
              />
            ))}
          </svg>

          {NODES.map((n) => (
            <NodePill key={n.id} node={n} />
          ))}

          {/* center startup node */}
          <div
            className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${center.x}%`, top: `${center.y}%` }}
          >
            <span
              aria-hidden
              className="absolute inset-0 animate-ping-ring rounded-2xl bg-accent"
            />
            <div className="relative flex items-center gap-2.5 rounded-2xl bg-ink px-4 py-2.5 shadow-lift sm:px-5 sm:py-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-accent sm:h-7 sm:w-7">
                <TrendingUp className="h-3.5 w-3.5 text-white sm:h-4 sm:w-4" />
              </span>
              <span>
                <span className="block text-[11px] font-semibold tracking-wide text-white sm:text-[12px]">
                  STARTUP
                </span>
                <span className="block text-[9px] text-slate-400 sm:text-[10px]">
                  Zenith Labs · Batch 03
                </span>
              </span>
            </div>
          </div>

          {/* floating signal chips */}
          <SignalChip
            icon={ShieldCheck}
            title="IP filing ready"
            sub="Patent desk · 2 claims"
            className="right-3 top-4 lg:right-10"
            delay="0s"
          />
          <SignalChip
            icon={Users}
            title="3 mentor matches"
            sub="Operators in AgriTech"
            className="left-3 top-[36%] lg:left-8"
            delay="1.4s"
          />
          <SignalChip
            icon={TrendingUp}
            title="+18.4% market growth"
            sub="Sector momentum rising"
            className="bottom-4 right-3 lg:right-12"
            delay="2.6s"
          />
        </div>

        {/* bottom intelligence strip */}
        <div className="grid grid-cols-1 divide-y divide-line border-t border-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          <div className="px-4 py-3.5 sm:px-5">
            <div className="flex items-baseline justify-between">
              <span className="text-[11px] font-medium text-slate-500">
                Ecosystem readiness
              </span>
              <span className="text-[12px] font-semibold text-ink">78/100</span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-accent"
                style={{
                  width: inView ? "78%" : "0%",
                  transition: `width 1.4s ${EXPO} 300ms`,
                }}
              />
            </div>
          </div>
          <div className="px-4 py-3.5 sm:px-5">
            <span className="text-[11px] font-medium text-slate-500">
              Capital pathway
            </span>
            <div className="mt-2.5 flex items-center gap-1.5">
              {["Pre-seed", "Seed", "Series A"].map((step, i) => (
                <span key={step} className="flex items-center gap-1.5">
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      i < 2 ? "bg-accent" : "bg-slate-200"
                    }`}
                  />
                  <span
                    className={`text-[11px] font-medium ${
                      i < 2 ? "text-ink" : "text-slate-400"
                    }`}
                  >
                    {step}
                  </span>
                  {i < 2 && <span className="h-px w-3 bg-slate-200" />}
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between px-4 py-3.5 sm:px-5">
            <span className="text-[11px] font-medium text-slate-500">
              Market momentum
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-accent-soft px-2 py-0.5 text-[11px] font-semibold text-accent-deep">
              <TrendingUp className="h-3 w-3" /> Accelerating
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
