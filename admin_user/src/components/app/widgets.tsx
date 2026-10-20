import { TrendingDown, TrendingUp, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/* ---------------------------------- panel ---------------------------------- */

export function Panel({
  title,
  description,
  action,
  children,
  className,
  bodyClassName,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
}) {
  return (
    <section
      className={cn(
        "rounded-2xl border border-line bg-white shadow-card",
        className,
      )}
    >
      <header className="flex items-start justify-between gap-4 border-b border-line px-5 py-4">
        <div>
          <h2 className="text-[14.5px] font-semibold tracking-tight text-ink">
            {title}
          </h2>
          {description ? (
            <p className="mt-0.5 text-[12px] text-slate-400">{description}</p>
          ) : null}
        </div>
        {action}
      </header>
      <div className={cn("p-5", bodyClassName)}>{children}</div>
    </section>
  );
}

/* ---------------------------------- stat ----------------------------------- */

export function Stat({
  icon: Icon,
  label,
  value,
  delta,
  tone = "up",
  hint,
}: {
  icon?: LucideIcon;
  label: string;
  value: string;
  delta?: string;
  tone?: "up" | "down" | "flat";
  hint?: string;
}) {
  const TrendIcon = tone === "down" ? TrendingDown : TrendingUp;
  return (
    <div className="rounded-2xl border border-line bg-white p-5 shadow-card">
      <div className="flex items-center justify-between gap-3">
        <p className="text-[12px] font-medium text-slate-400">{label}</p>
        {Icon ? (
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent-soft text-accent">
            <Icon className="h-4 w-4" strokeWidth={2.1} />
          </span>
        ) : null}
      </div>
      <p className="mt-2.5 text-[26px] font-semibold leading-none tracking-[-0.02em] text-ink">
        {value}
      </p>
      {delta ? (
        <p
          className={cn(
            "mt-2.5 inline-flex items-center gap-1 text-[11.5px] font-semibold",
            tone === "down" ? "text-rose-600" : tone === "flat" ? "text-slate-400" : "text-emerald-600",
          )}
        >
          {tone !== "flat" ? <TrendIcon className="h-3 w-3" strokeWidth={2.4} /> : null}
          {delta}
          {hint ? <span className="font-medium text-slate-400">· {hint}</span> : null}
        </p>
      ) : hint ? (
        <p className="mt-2.5 text-[11.5px] font-medium text-slate-400">{hint}</p>
      ) : null}
    </div>
  );
}

/* ---------------------------------- meter ---------------------------------- */

export function Meter({
  value,
  className,
}: {
  value: number; // 0..1
  className?: string;
}) {
  return (
    <span
      className={cn(
        "block h-1.5 w-full overflow-hidden rounded-full bg-accent-soft",
        className,
      )}
    >
      <span
        className="block h-full rounded-full bg-accent"
        style={{ width: `${Math.round(Math.min(1, Math.max(0, value)) * 100)}%` }}
      />
    </span>
  );
}

/* ----------------------------------- tag ----------------------------------- */

const TAG_TONES = {
  accent: "bg-accent-soft text-accent",
  green: "bg-emerald-50 text-emerald-700",
  amber: "bg-amber-50 text-amber-700",
  slate: "bg-slate-100 text-slate-500",
  rose: "bg-rose-50 text-rose-600",
} as const;

export function Tag({
  tone = "accent",
  children,
  className,
}: {
  tone?: keyof typeof TAG_TONES;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-[10.5px] font-semibold uppercase tracking-[0.1em]",
        TAG_TONES[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/* ---------------------------------- avatar ---------------------------------- */

export function AvatarInitials({
  initials,
  className,
}: {
  initials: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent-soft text-[12px] font-semibold text-accent",
        className,
      )}
    >
      {initials}
    </span>
  );
}
