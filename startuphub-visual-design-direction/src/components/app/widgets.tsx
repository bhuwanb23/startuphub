import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Card({
  title,
  action,
  children,
  className,
  pad = true,
  id,
}: {
  title?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  pad?: boolean;
  id?: string;
}) {
  return (
    <section id={id} className={cn("rounded-2xl border border-line bg-white", className)}>
      {title && (
        <header className="flex items-center justify-between border-b border-line px-5 py-3.5">
          <h3 className="text-[13.5px] font-semibold tracking-tight text-ink">{title}</h3>
          {action}
        </header>
      )}
      <div className={cn(pad && "p-5")}>{children}</div>
    </section>
  );
}

export function Stat({
  icon: Icon,
  label,
  value,
  delta,
  tone = "default",
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  delta?: string;
  tone?: "default" | "good" | "warn" | "bad";
}) {
  const deltaTone =
    tone === "good" ? "bg-emerald-50 text-emerald-600"
    : tone === "warn" ? "bg-amber-50 text-amber-600"
    : tone === "bad" ? "bg-red-50 text-red-500"
    : "bg-slate-100 text-slate-500";
  return (
    <div className="rounded-2xl border border-line bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-16px_rgba(11,18,32,0.18)]">
      <div className="flex items-center justify-between">
        <span className="text-[12px] font-medium text-slate-500">{label}</span>
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent-soft text-accent">
          <Icon className="h-3.5 w-3.5" />
        </span>
      </div>
      <div className="mt-3 text-[1.55rem] font-semibold leading-none tracking-tight text-ink tabular-nums">
        {value}
      </div>
      {delta && (
        <span className={cn("mt-2.5 inline-block rounded-full px-2 py-0.5 text-[10.5px] font-semibold", deltaTone)}>
          {delta}
        </span>
      )}
    </div>
  );
}

export function Progress({ value, tone = "accent", className }: { value: number; tone?: "accent" | "good" | "warn" | "bad"; className?: string }) {
  const bar = tone === "good" ? "bg-emerald-500" : tone === "warn" ? "bg-amber-400" : tone === "bad" ? "bg-red-400" : "bg-accent";
  return (
    <div className={cn("h-1.5 overflow-hidden rounded-full bg-slate-100", className)}>
      <div className={cn("h-full rounded-full transition-all duration-500", bar)} style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
    </div>
  );
}

export function Badge({
  children,
  tone = "default",
}: {
  children: ReactNode;
  tone?: "default" | "accent" | "good" | "warn" | "bad";
}) {
  const tones = {
    default: "bg-slate-100 text-slate-500",
    accent: "bg-accent-soft text-accent",
    good: "bg-emerald-50 text-emerald-600",
    warn: "bg-amber-50 text-amber-600",
    bad: "bg-red-50 text-red-500",
  };
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold", tones[tone])}>
      {children}
    </span>
  );
}

export function GaugeRing({ value, size = 76, label }: { value: number; size?: number; label?: string }) {
  const r = (size - 12) / 2;
  const circ = 2 * Math.PI * r;
  const off = circ - (value / 100) * circ;
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#EDF1FE" strokeWidth="8" />
        <circle
          cx={size / 2} cy={size / 2} r={r} fill="none"
          stroke="#3157E8" strokeWidth="8" strokeLinecap="round"
          strokeDasharray={circ} strokeDashoffset={off}
          style={{ transition: "stroke-dashoffset 1s ease" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-lg font-bold leading-none text-ink tabular-nums">{value}</span>
        {label && <span className="mt-0.5 text-[9px] font-medium text-slate-400">{label}</span>}
      </div>
    </div>
  );
}

export function PageHeader({
  title,
  desc,
  actions,
}: {
  title: string;
  desc?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-[clamp(1.4rem,2.4vw,1.9rem)] font-semibold tracking-[-0.02em] text-ink">{title}</h1>
        {desc && <p className="mt-1.5 max-w-2xl text-[14px] leading-relaxed text-slate-500">{desc}</p>}
      </div>
      {actions && <div className="flex shrink-0 gap-2">{actions}</div>}
    </div>
  );
}
