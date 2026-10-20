import {
  ArrowDownRight,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/* ──────────────────────────────────────────────────────────────
   Workspace widgets.

   Two generations of the house widget set live side by side:

   · The "card" family (Card, Stat, Progress, Badge, GaugeRing,
     PageHeader) is used by the founder / mentor / incubator /
     ipr-expert workspaces.
   · The "panel" family (StatCard, Panel, Chip, Bar, Spark, Avatar,
     ScoreRing) is used by the investor / corporate / government /
     provider workspaces.

   Both are exported unchanged so every workspace compiles against
   the names it was authored with.
   ────────────────────────────────────────────────────────────── */

/* ──────────────────────────────────────────────────────────────
   Card family
   ────────────────────────────────────────────────────────────── */

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
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="#3157E8"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={off}
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

/* ──────────────────────────────────────────────────────────────
   Panel family
   ────────────────────────────────────────────────────────────── */

/* ── Stat card — the workspace KPI widget ──────────────────── */
export function StatCard({
  label,
  value,
  delta,
  deltaGood = true,
  icon: Icon,
  sub,
}: {
  label: string;
  value: string;
  delta?: string;
  deltaGood?: boolean;
  icon: LucideIcon;
  sub?: string;
}) {
  return (
    <div className="rounded-xl border border-line bg-white p-4.5 transition-shadow duration-300 hover:shadow-soft sm:p-5">
      <div className="flex items-center justify-between">
        <p className="text-[12px] font-medium tracking-[0.02em] text-slate-500">
          {label}
        </p>
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-soft text-accent">
          <Icon className="h-4 w-4" />
        </span>
      </div>
      <p className="mt-2.5 text-[24px] font-semibold tracking-[-0.03em] text-ink sm:text-[26px]">
        {value}
      </p>
      <div className="mt-1.5 flex items-center gap-2">
        {delta && (
          <span
            className={cn(
              "flex items-center gap-0.5 rounded-md px-1.5 py-0.5 font-mono text-[10px] font-semibold",
              deltaGood
                ? "bg-rise-tint text-rise"
                : "bg-amber-tint text-amber-dim",
            )}
          >
            {deltaGood ? (
              <ArrowUpRight className="h-3 w-3" />
            ) : (
              <ArrowDownRight className="h-3 w-3" />
            )}
            {delta}
          </span>
        )}
        {sub && <span className="text-[11px] text-slate-400">{sub}</span>}
      </div>
    </div>
  );
}

/* ── Panel — white workspace card ──────────────────────────── */
export function Panel({
  title,
  sub,
  action,
  children,
  className,
  pad = true,
}: {
  title?: string;
  sub?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  pad?: boolean;
}) {
  return (
    <section
      className={cn(
        "overflow-hidden rounded-xl border border-line bg-white",
        className,
      )}
    >
      {title && (
        <header className="flex items-center justify-between gap-3 border-b border-line px-5 py-4">
          <div>
            <h2 className="text-[14.5px] font-semibold tracking-[-0.01em] text-ink">
              {title}
            </h2>
            {sub && <p className="mt-0.5 text-[11.5px] text-slate-400">{sub}</p>}
          </div>
          {action}
        </header>
      )}
      <div className={cn(pad && "p-5")}>{children}</div>
    </section>
  );
}

/* ── Chips / tags ──────────────────────────────────────────── */
const TONES = {
  accent: "bg-accent-soft text-accent",
  ink: "bg-ink/[0.06] text-ink",
  rise: "bg-rise-tint text-rise",
  amber: "bg-amber-tint text-amber-dim",
  slate: "bg-slate-100 text-slate-500",
  line: "border border-line bg-white text-slate-500",
} as const;

export function Chip({
  children,
  tone = "slate",
  className,
}: {
  children: ReactNode;
  tone?: keyof typeof TONES;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md px-2 py-0.5 font-mono text-[10px] font-medium tracking-[0.05em] whitespace-nowrap uppercase",
        TONES[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/* ── Progress bar ──────────────────────────────────────────── */
export function Bar({
  pct,
  className,
  barClass,
}: {
  pct: number;
  className?: string;
  barClass?: string;
}) {
  return (
    <div
      className={cn(
        "h-[6px] w-full overflow-hidden rounded-full bg-slate-100",
        className,
      )}
    >
      <div
        className={cn("h-full rounded-full bg-accent", barClass)}
        style={{ width: `${Math.min(100, Math.max(0, pct))}%` }}
      />
    </div>
  );
}

/* ── Sparkline (pure SVG, SSR-safe) ────────────────────────── */
export function Spark({
  points,
  good = true,
  className,
}: {
  points: number[];
  good?: boolean;
  className?: string;
}) {
  const w = 96;
  const h = 32;
  const min = Math.min(...points);
  const max = Math.max(...points);
  const span = max - min || 1;
  const d = points
    .map((p, i) => {
      const x = (i / (points.length - 1)) * w;
      const y = h - 3 - ((p - min) / span) * (h - 6);
      return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className={cn("h-8 w-24", className)}
      fill="none"
      aria-hidden="true"
    >
      <path
        d={d}
        stroke={good ? "#059669" : "#b45309"}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ── Initials avatar ───────────────────────────────────────── */
export function Avatar({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "flex items-center justify-center rounded-lg bg-ink/[0.06] font-semibold text-ink",
        "h-8 w-8 text-[11px]",
        className,
      )}
    >
      {label}
    </span>
  );
}

/* ── Score ring ────────────────────────────────────────────── */
export function ScoreRing({
  score,
  size = 40,
}: {
  score: number; // 0–100
  size?: number;
}) {
  const r = (size - 6) / 2;
  const c = 2 * Math.PI * r;
  return (
    <span
      className="relative inline-flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="#edf1fe"
          strokeWidth="4"
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="#3157e8"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - score / 100)}
        />
      </svg>
      <span className="absolute text-[11px] font-bold text-ink">{score}</span>
    </span>
  );
}
