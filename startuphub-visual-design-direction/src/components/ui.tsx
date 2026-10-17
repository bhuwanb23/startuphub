import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion";

/* ── Brand mark: three connected nodes ───────────────────── */
export function Logo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <path
        d="M16 7.4 7.6 24.2M16 7.4l8.4 16.8M7.6 24.2h16.8"
        stroke="#3157E8"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="16" cy="7.4" r="3.6" fill="#3157E8" />
      <circle cx="7.2" cy="24.4" r="3.6" fill="#0B1220" />
      <circle cx="24.8" cy="24.4" r="3.6" fill="#0B1220" />
    </svg>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <Logo className="h-7 w-7" />
      <span className="text-[17px] font-bold tracking-tight text-ink">
        Startup<span className="text-accent">Hub</span>
      </span>
    </span>
  );
}

/* ── Layout ──────────────────────────────────────────────── */
export function Container({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-[1200px] px-5 sm:px-8", className)}>
      {children}
    </div>
  );
}

/* ── Section typography ──────────────────────────────────── */
export function Eyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500",
        className
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
      {children}
    </span>
  );
}

export function SectionHead({
  eyebrow,
  title,
  lead,
  align = "center",
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-5",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="max-w-3xl text-balance text-[clamp(1.9rem,3.6vw,2.9rem)] font-semibold leading-[1.08] tracking-[-0.025em] text-ink">
        {title}
      </h2>
      {lead ? (
        <p
          className={cn(
            "max-w-xl text-pretty text-[17px] leading-relaxed text-slate-500",
            align === "center" && "mx-auto"
          )}
        >
          {lead}
        </p>
      ) : null}
    </Reveal>
  );
}

/* ── Buttons ─────────────────────────────────────────────── */
type ButtonVariant = "primary" | "secondary" | "ghost";

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
}: {
  href: string;
  variant?: ButtonVariant;
  size?: "sm" | "md" | "lg";
  className?: string;
  children: ReactNode;
}) {
  const sizes = {
    sm: "px-4 py-2 text-[13.5px] rounded-[9px]",
    md: "px-5 py-2.5 text-sm rounded-[10px]",
    lg: "px-6 py-3.5 text-[15px] rounded-xl",
  } as const;
  const variants: Record<ButtonVariant, string> = {
    primary:
      "bg-accent text-white shadow-[0_1px_2px_rgba(11,18,32,0.12),inset_0_1px_0_rgba(255,255,255,0.16)] hover:bg-accent-deep hover:shadow-[0_6px_16px_-6px_rgba(49,87,232,0.5)] active:translate-y-px",
    secondary:
      "border border-line bg-white text-ink hover:border-slate-300 hover:bg-slate-50 active:translate-y-px",
    ghost: "text-slate-600 hover:text-ink hover:bg-slate-100/70",
  };
  return (
    <a
      href={href}
      className={cn(
        "group/btn inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200",
        sizes[size],
        variants[variant],
        className
      )}
    >
      {children}
    </a>
  );
}

/* ── Arrow that nudges on hover ──────────────────────────── */
export function ArrowGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      className={cn(
        "h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-0.5",
        className
      )}
      aria-hidden="true"
    >
      <path
        d="M2.5 8h10m0 0L9 4.5M12.5 8 9 11.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
