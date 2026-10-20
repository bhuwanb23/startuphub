import {
  ArrowDownRight,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

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
