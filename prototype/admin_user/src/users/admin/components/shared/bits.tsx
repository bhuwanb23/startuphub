import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/* ------------------------------ status pill ------------------------------- */

export function statusTone(status: string): string {
  const s = status.toLowerCase();
  if (["active", "verified", "approved", "published", "live", "enabled", "success", "healthy", "paid", "settled", "completed", "resolved", "delivered", "enrolled", "graduated", "operational"].some((k) => s.includes(k)))
    return "border-emerald-200 bg-emerald-50 text-emerald-700";
  if (["pending", "scheduled", "queued", "draft", "upcoming", "onboarding"].some((k) => s.includes(k)))
    return "border-amber-200 bg-amber-50 text-amber-700";
  if (["review", "processing", "trialing", "staging", "screening", "matching"].some((k) => s.includes(k)))
    return "border-accent/20 bg-accent-soft text-accent";
  if (["needs info", "needs correction", "warning", "degraded", "hold", "waitlist"].some((k) => s.includes(k)))
    return "border-amber-200 bg-amber-50 text-amber-700";
  if (["rejected", "suspended", "failed", "critical", "overdue", "locked", "past due", "fraud", "error", "down", "cancelled", "revoked", "chargeback"].some((k) => s.includes(k)))
    return "border-rose-200 bg-rose-50 text-rose-600";
  if (["escalated", "appeal"].some((k) => s.includes(k)))
    return "border-violet-200 bg-violet-50 text-violet-600";
  return "border-line bg-slate-100/80 text-slate-500";
}

export function StatusPill({ status, className }: { status: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-0.5 text-[10.5px] font-semibold",
        statusTone(status),
        className,
      )}
    >
      <span className="h-1 w-1 rounded-full bg-current opacity-70" />
      {status}
    </span>
  );
}

/* ------------------------------- page head -------------------------------- */

export function PageHead({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div className="max-w-2xl">
        {eyebrow ? (
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="mt-1.5 text-[22px] font-semibold tracking-[-0.02em] text-ink">
          {title}
        </h2>
        {description ? (
          <p className="mt-1.5 text-[13.5px] leading-relaxed text-slate-500">{description}</p>
        ) : null}
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-2.5">{actions}</div> : null}
    </div>
  );
}

/* --------------------------------- callout -------------------------------- */

export function Note({
  tone = "info",
  title,
  children,
  className,
}: {
  tone?: "info" | "warn" | "danger";
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  const tones = {
    info: "border-accent/20 bg-accent-soft/60 text-accent",
    warn: "border-amber-200 bg-amber-50 text-amber-800",
    danger: "border-rose-200 bg-rose-50 text-rose-700",
  } as const;
  return (
    <div className={cn("rounded-xl border px-4 py-3.5 text-[12.5px] leading-relaxed", tones[tone], className)}>
      {title ? <p className="mb-1 font-semibold">{title}</p> : null}
      <span className="opacity-90">{children}</span>
    </div>
  );
}

/* -------------------------------- flow bar --------------------------------- */

const FLOW_STAGES = [
  "Configure", "Onboard", "Verify", "Approve", "Monitor", "Intervene", "Audit", "Report",
];

export function FlowBar({ current = 3 }: { current?: number }) {
  return (
    <div className="flex items-center gap-1 overflow-x-auto scroll-quiet rounded-xl border border-line bg-white p-2">
      {FLOW_STAGES.map((stage, i) => (
        <div key={stage} className="flex shrink-0 items-center gap-1">
          <span
            className={cn(
              "rounded-lg px-3 py-1.5 text-[11px] font-semibold transition-colors",
              i < current
                ? "bg-emerald-50 text-emerald-700"
                : i === current
                  ? "bg-accent text-white shadow-[0_4px_12px_-4px_rgba(49,87,232,0.5)]"
                  : "bg-soft text-slate-400",
            )}
          >
            {stage}
          </span>
          {i < FLOW_STAGES.length - 1 ? (
            <span className={cn("h-px w-3", i < current ? "bg-emerald-300" : "bg-line")} />
          ) : null}
        </div>
      ))}
    </div>
  );
}
