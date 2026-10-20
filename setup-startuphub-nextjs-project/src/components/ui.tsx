import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion";

/* ------------------------------------------------------------------ */
/* Brand marks                                                         */
/* ------------------------------------------------------------------ */

export function Logo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <rect width="64" height="64" rx="14" className="fill-accent" />
      <g
        stroke="#FFFFFF"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.85"
      >
        <path d="M32 32 L20 20" />
        <path d="M32 32 L44 20" />
        <path d="M32 32 L20 46" />
        <path d="M32 32 L46 42" />
      </g>
      <circle cx="20" cy="20" r="4.5" fill="#FFFFFF" />
      <circle cx="44" cy="20" r="4.5" fill="#FFFFFF" />
      <circle cx="20" cy="46" r="4.5" fill="#FFFFFF" />
      <circle cx="46" cy="42" r="4.5" fill="#FFFFFF" />
      <circle cx="32" cy="32" r="6.5" fill="#FFFFFF" />
    </svg>
  );
}

/* back-compat alias used by older home components */
export function LogoMark({ className = "h-8 w-8" }: { className?: string }) {
  return <Logo className={className} />;
}

export function Wordmark({ dark = false }: { dark?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <Logo className="h-8 w-8" />
      <span
        className={cn(
          "text-[17px] font-semibold tracking-[-0.02em]",
          dark ? "text-white" : "text-ink",
        )}
      >
        Startup<span className="text-accent">Hub</span>
      </span>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Layout primitives                                                   */
/* ------------------------------------------------------------------ */

export function Container({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("mx-auto max-w-7xl px-5 sm:px-8", className)}>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Section typography                                                  */
/* ------------------------------------------------------------------ */

export function Eyebrow({
  children,
  center = false,
}: {
  children: ReactNode;
  center?: boolean;
}) {
  return (
    <p
      className={cn(
        "flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-accent",
        center && "justify-center",
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
      {children}
    </p>
  );
}

export function SectionHead({
  eyebrow,
  title,
  lead,
  center = false,
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  center?: boolean;
  className?: string;
}) {
  return (
    <Reveal className={cn(center && "text-center", className)}>
      <Eyebrow center={center}>{eyebrow}</Eyebrow>
      <h2
        className={cn(
          "mt-4 text-balance text-[clamp(1.9rem,3.6vw,2.9rem)] font-semibold leading-[1.08] tracking-[-0.025em] text-ink",
          center && "mx-auto",
          "max-w-2xl",
        )}
      >
        {title}
      </h2>
      {lead && (
        <p
          className={cn(
            "mt-4 max-w-xl text-pretty text-[16px] leading-relaxed text-slate-500",
            center && "mx-auto",
          )}
        >
          {lead}
        </p>
      )}
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/* Buttons                                                             */
/* ------------------------------------------------------------------ */

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
}) {
  return (
    <a
      href={href}
      className={cn(
        "group inline-flex h-12 items-center justify-center gap-2 rounded-lg px-7 text-[15px] font-semibold transition-all",
        variant === "primary" &&
          "bg-accent text-white shadow-[0_1px_2px_rgba(49,87,232,0.4),inset_0_1px_0_rgba(255,255,255,0.15)] hover:bg-accent-deep hover:shadow-card",
        variant === "secondary" &&
          "border border-line bg-white text-ink hover:border-slate-300 hover:bg-soft hover:shadow-card",
        className,
      )}
    >
      {children}
      <ArrowGlyph />
    </a>
  );
}

export function ArrowGlyph({ className }: { className?: string }) {
  return (
    <ArrowRight
      className={cn(
        "h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5",
        className,
      )}
    />
  );
}
