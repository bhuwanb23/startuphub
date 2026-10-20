import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./motion";

/* ---------------------------------- brand ---------------------------------- */

export function Logo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect width="32" height="32" rx="7" fill="#3157E8" />
      <path
        d="M10 22 L16 10 L23 18"
        stroke="#fff"
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.9"
      />
      <circle cx="10" cy="22" r="2.6" fill="#fff" />
      <circle cx="16" cy="10" r="2.6" fill="#fff" />
      <circle cx="23" cy="18" r="2.6" fill="#fff" />
    </svg>
  );
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <Logo className="h-7 w-7" />
      <span className="text-[17px] font-semibold tracking-tight text-ink">
        StartupHub
      </span>
    </span>
  );
}

/* --------------------------------- layout ---------------------------------- */

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-7xl px-5 sm:px-8", className)}>
      {children}
    </div>
  );
}

/* --------------------------------- headings -------------------------------- */

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-accent",
        className,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-[2px] bg-accent" />
      {children}
    </span>
  );
}

export function SectionHead({
  eyebrow,
  title,
  lead,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "flex max-w-2xl flex-col gap-5",
        align === "center" && "mx-auto items-center text-center",
        className,
      )}
    >
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 className="text-balance text-[clamp(1.9rem,3.6vw,2.9rem)] font-semibold leading-[1.08] tracking-[-0.025em] text-ink">
        {title}
      </h2>
      {lead ? (
        <p className="text-pretty text-[17px] leading-relaxed text-slate-500">
          {lead}
        </p>
      ) : null}
    </Reveal>
  );
}

/* --------------------------------- actions --------------------------------- */

export function ArrowGlyph({ className }: { className?: string }) {
  return (
    <ArrowRight
      className={cn(
        "h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5",
        className,
      )}
      aria-hidden
    />
  );
}

type ButtonVariant = "primary" | "secondary" | "ghost";

const BUTTON_VARIANTS: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-white shadow-[0_1px_2px_rgba(49,87,232,0.4),0_10px_24px_-8px_rgba(49,87,232,0.5)] hover:bg-accent-deep",
  secondary:
    "border border-line bg-white text-ink hover:border-slate-300 hover:shadow-card",
  ghost: "text-accent hover:bg-accent-soft",
};

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  arrow = false,
  children,
  className,
}: {
  href: string;
  variant?: ButtonVariant;
  size?: "sm" | "md";
  arrow?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition",
        size === "md" ? "h-11 px-6 text-sm" : "h-9 px-4 text-[13.5px]",
        BUTTON_VARIANTS[variant],
        className,
      )}
    >
      {children}
      {arrow ? <ArrowGlyph /> : null}
    </Link>
  );
}
