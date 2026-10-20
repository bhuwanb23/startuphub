import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/* ── Logo mark + wordmark ──────────────────────────────────── */
export function Logo({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <g
        stroke="#3157e8"
        strokeWidth="1.7"
        strokeLinecap="round"
        opacity="0.85"
        fill="none"
      >
        <path d="M16 8.5 L23 21.5" />
        <path d="M16 8.5 L9 21.5" />
        <path d="M9 21.5 L23 21.5" />
      </g>
      <circle cx="16" cy="8.5" r="3.4" fill="#3157e8" />
      <circle cx="9" cy="21.5" r="2.8" fill="#0b1220" />
      <circle cx="23" cy="21.5" r="2.8" fill="#0b1220" />
    </svg>
  );
}

/* Back-compat alias for earlier imports. */
export const LogoMark = Logo;

export function Wordmark({ dark = false }: { dark?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <Logo />
      <span
        className={cn(
          "text-[17px] font-semibold tracking-[-0.02em]",
          dark ? "text-white" : "text-ink",
        )}
      >
        StartupHub<span className="text-accent">.</span>
      </span>
    </span>
  );
}

/* ── Layout primitives ─────────────────────────────────────── */
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

export function Eyebrow({
  children,
  dark = false,
  className,
}: {
  children: ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "flex items-center gap-2 font-mono text-[11px] font-medium tracking-[0.22em] uppercase",
        dark ? "text-white/60" : "text-slate-500",
        className,
      )}
    >
      <span className="inline-block h-1.5 w-1.5 rounded-[2px] bg-accent" />
      {children}
    </p>
  );
}

export function SectionHead({
  eyebrow,
  title,
  lede,
  align = "left",
  dark = false,
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: string;
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <Eyebrow
        dark={dark}
        className={align === "center" ? "justify-center" : undefined}
      >
        {eyebrow}
      </Eyebrow>
      <h2
        className={cn(
          "mt-5 text-balance text-[clamp(1.9rem,3.6vw,2.9rem)] leading-[1.08] font-semibold tracking-[-0.025em]",
          dark ? "text-white" : "text-ink",
        )}
      >
        {title}
      </h2>
      {lede ? (
        <p
          className={cn(
            "mt-5 text-pretty text-[17px] leading-relaxed",
            dark ? "text-white/60" : "text-slate-500",
          )}
        >
          {lede}
        </p>
      ) : null}
    </div>
  );
}

/* ── Buttons & glyphs ──────────────────────────────────────── */
export function ButtonLink({
  href,
  children,
  variant = "primary",
  arrow = true,
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost-dark";
  arrow?: boolean;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={cn(
        "group inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-[15px] font-semibold transition-all duration-300",
        variant === "primary" &&
          "bg-accent text-white shadow-[0_1px_2px_rgba(49,87,232,0.4)] hover:bg-accent-deep hover:shadow-[0_10px_30px_rgba(49,87,232,0.35)]",
        variant === "secondary" &&
          "border border-line bg-white text-ink hover:border-slate-400 hover:bg-soft",
        variant === "ghost-dark" &&
          "border border-white/20 text-white hover:border-white/50",
        className,
      )}
    >
      {children}
      {arrow && (
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      )}
    </a>
  );
}

export function ArrowGlyph({ className }: { className?: string }) {
  return (
    <ArrowRight
      className={cn(
        "h-4 w-4 transition-transform duration-300 group-hover:translate-x-1",
        className,
      )}
    />
  );
}
