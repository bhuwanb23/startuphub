import type { ReactNode } from "react";
import { TrendingDown, TrendingUp, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/* Workspace stat widgets — the house style for dashboard furniture. */

export function PageIntro({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <h2 className="text-[22px] font-semibold tracking-[-0.02em] text-ink sm:text-[24px]">
          {title}
        </h2>
        {description && (
          <p className="mt-1 max-w-2xl text-[13.5px] leading-relaxed text-slate-500">
            {description}
          </p>
        )}
      </div>
      {action}
    </div>
  );
}

export function StatCard({
  label,
  value,
  delta,
  up,
  hint,
  icon: Icon,
}: {
  label: string;
  value: string;
  delta?: string;
  up?: boolean;
  hint?: string;
  icon: LucideIcon;
}) {
  return (
    <div className="rounded-xl border border-line bg-white p-4.5 shadow-[0_1px_2px_rgba(11,18,32,0.03)] sm:p-5">
      <div className="flex items-center justify-between">
        <p className="text-[12px] font-medium text-slate-500">{label}</p>
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent-soft">
          <Icon className="h-3.5 w-3.5 text-accent" />
        </span>
      </div>
      <p className="mt-2.5 text-[26px] font-semibold leading-none tracking-[-0.03em] text-ink">
        {value}
      </p>
      <div className="mt-2.5 flex items-center gap-1.5 text-[11.5px]">
        {delta && (
          <span
            className={cn(
              "inline-flex items-center gap-0.5 font-semibold",
              up === false ? "text-amber-600" : "text-accent",
            )}
          >
            {up === false ? (
              <TrendingDown className="h-3 w-3" />
            ) : (
              <TrendingUp className="h-3 w-3" />
            )}
            {delta}
          </span>
        )}
        {hint && <span className="text-slate-400">{hint}</span>}
      </div>
    </div>
  );
}

export function Panel({
  title,
  action,
  children,
  className,
  bodyClassName,
}: {
  title: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
}) {
  return (
    <section
      className={cn(
        "overflow-hidden rounded-xl border border-line bg-white shadow-[0_1px_2px_rgba(11,18,32,0.03)]",
        className,
      )}
    >
      <header className="flex items-center justify-between border-b border-line px-4.5 py-3.5 sm:px-5">
        <h3 className="text-[13.5px] font-semibold text-ink">{title}</h3>
        {action}
      </header>
      <div className={cn("px-4.5 py-4 sm:px-5", bodyClassName)}>{children}</div>
    </section>
  );
}

export function PanelLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      className="text-[12px] font-semibold text-accent transition-colors hover:text-accent-deep"
    >
      {children}
    </a>
  );
}

export function Bar({
  value,
  tone = "accent",
  className,
}: {
  value: number; /* 0–100 */
  tone?: "accent" | "ink" | "green" | "amber";
  className?: string;
}) {
  const tones = {
    accent: "bg-accent",
    ink: "bg-ink",
    green: "bg-emerald-500",
    amber: "bg-amber-500",
  } as const;
  return (
    <div
      className={cn("h-1.5 overflow-hidden rounded-full bg-slate-100", className)}
    >
      <div
        className={cn("h-full rounded-full", tones[tone])}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}

export function Avatar({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink text-[11px] font-bold text-white",
        className,
      )}
    >
      {name
        .split(" ")
        .slice(0, 2)
        .map((word) => word[0])
        .join("")}
    </span>
  );
}

export function HealthDot({
  tone,
}: {
  tone: "green" | "amber" | "red";
}) {
  const tones = {
    green: "bg-emerald-500",
    amber: "bg-amber-500",
    red: "bg-red-500",
  } as const;
  return <span className={cn("h-2 w-2 rounded-full", tones[tone])} />;
}
