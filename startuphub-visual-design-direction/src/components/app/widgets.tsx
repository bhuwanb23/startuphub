import {
  ArrowDownRight,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/* ──────────────────────────────────────────────────────────────
   Workspace widgets.

   Four generations of the house widget set live side by side:

   · The "card" family (Card, Stat, Progress, Badge, GaugeRing,
     PageHeader) is used by the founder / mentor / incubator /
     ipr-expert workspaces.
   · The "panel" family (StatCard, Panel, Chip, Bar, Spark, Avatar,
     ScoreRing) is used by the investor / corporate / government /
     provider workspaces.
   · The "intro" family (PageIntro, PanelLink) is used by the talent /
     university workspaces.
   · The "admin" family (Meter, Tag) is used by the admin workspace.

   Where a family shares a name with another, the props are unioned
   rather than renamed, so every workspace compiles against the
   names it was authored with.
   ────────────────────────────────────────────────────────────── */

/* ──────────────────────────────────────────────────────────────
   Card family
   ────────────────────────────────────────────────────────────── */

export function Card({
  title,
  sub,
  action,
  children,
  className,
  pad = true,
  id,
}: {
  title?: string;
  /* Optional supporting line under the title — mirrors Panel's `sub` so
     both widget families share the same header API. */
  sub?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  pad?: boolean;
  id?: string;
}) {
  return (
    <section id={id} className={cn("rounded-2xl border border-line bg-white", className)}>
      {title && (
        <header className="flex items-center justify-between gap-3 border-b border-line px-5 py-3.5">
          <div>
            <h3 className="text-[13.5px] font-semibold tracking-tight text-ink">{title}</h3>
            {sub && <p className="mt-0.5 text-[11.5px] text-slate-400">{sub}</p>}
          </div>
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
  hint,
}: {
  /* The founder / mentor / incubator / ipr-expert workspaces always pass
     an icon and use tone = good | default | warn | bad. The admin
     workspace omits the icon and uses tone = up | down | flat, which
     renders a plain-text trend instead of a chip. */
  icon?: LucideIcon;
  label: string;
  value: string;
  delta?: string;
  tone?: "default" | "good" | "warn" | "bad" | "up" | "down" | "flat";
  hint?: string;
}) {
  /* The admin style: no chip, a coloured trend word plus an optional hint. */
  const adminStyle = tone === "up" || tone === "down" || tone === "flat";
  const deltaTone =
    tone === "good" ? "bg-emerald-50 text-emerald-600"
    : tone === "warn" ? "bg-amber-50 text-amber-600"
    : tone === "bad" ? "bg-red-50 text-red-500"
    : "bg-slate-100 text-slate-500";
  return (
    <div className="rounded-2xl border border-line bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-16px_rgba(11,18,32,0.18)]">
      <div className="flex items-center justify-between">
        <span className="text-[12px] font-medium text-slate-500">{label}</span>
        {Icon && (
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent-soft text-accent">
            <Icon className="h-3.5 w-3.5" />
          </span>
        )}
      </div>
      {adminStyle ? (
        <>
          <div className="mt-2.5 text-[26px] font-semibold leading-none tracking-[-0.02em] text-ink">
            {value}
          </div>
          {delta ? (
            <p
              className={cn(
                "mt-2.5 inline-flex items-center gap-1 text-[11.5px] font-semibold",
                tone === "down"
                  ? "text-rose-600"
                  : tone === "flat"
                    ? "text-slate-400"
                    : "text-emerald-600",
              )}
            >
              {tone !== "flat" ? (
                tone === "down" ? (
                  <ArrowDownRight className="h-3 w-3" />
                ) : (
                  <ArrowUpRight className="h-3 w-3" />
                )
              ) : null}
              {delta}
              {hint ? <span className="font-medium text-slate-400">· {hint}</span> : null}
            </p>
          ) : hint ? (
            <p className="mt-2.5 text-[11.5px] font-medium text-slate-400">{hint}</p>
          ) : null}
        </>
      ) : (
        <>
          <div className="mt-3 text-[1.55rem] font-semibold leading-none tracking-tight text-ink tabular-nums">
            {value}
          </div>
          {delta && (
            <span className={cn("mt-2.5 inline-block rounded-full px-2 py-0.5 text-[10.5px] font-semibold", deltaTone)}>
              {delta}
            </span>
          )}
        </>
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
  hint,
  up,
}: {
  label: string;
  value: string;
  delta?: string;
  deltaGood?: boolean;
  icon: LucideIcon;
  sub?: string;
  /* The talent / university workspaces use a lighter delta treatment
     (accent/amber text, no chip) plus a trailing hint. */
  hint?: string;
  up?: boolean;
}) {
  /* The delta chip is the "panel family" look; the plain tinted text is
     the "talent / university" look. Which one renders is decided by the
     props supplied, so both roles keep their original appearance. */
  const plainDelta = hint !== undefined || up !== undefined;
  return (
    <div
      className={cn(
        "rounded-xl border border-line bg-white p-4.5 sm:p-5",
        plainDelta
          ? "shadow-[0_1px_2px_rgba(11,18,32,0.03)]"
          : "transition-shadow duration-300 hover:shadow-soft",
      )}
    >
      <div className="flex items-center justify-between">
        <p className="text-[12px] font-medium tracking-[0.02em] text-slate-500">
          {label}
        </p>
        <span
          className={cn(
            "flex items-center justify-center rounded-lg",
            plainDelta
              ? "h-7 w-7 bg-accent-soft text-accent"
              : "h-8 w-8 bg-accent-soft text-accent",
          )}
        >
          <Icon className={plainDelta ? "h-3.5 w-3.5" : "h-4 w-4"} />
        </span>
      </div>
      <p
        className={cn(
          "font-semibold leading-none tracking-[-0.03em] text-ink",
          plainDelta
            ? "mt-2.5 text-[26px]"
            : "mt-2.5 text-[24px] sm:text-[26px]",
        )}
      >
        {value}
      </p>
      <div className={cn("flex items-center gap-2", plainDelta ? "mt-2.5" : "mt-1.5")}>
        {delta && (
          plainDelta ? (
            <span
              className={cn(
                "inline-flex items-center gap-0.5 font-semibold text-[11.5px]",
                up === false ? "text-amber-600" : "text-accent",
              )}
            >
              {up === false ? (
                <ArrowDownRight className="h-3 w-3" />
              ) : (
                <ArrowUpRight className="h-3 w-3" />
              )}
              {delta}
            </span>
          ) : (
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
          )
        )}
        {sub && <span className="text-[11px] text-slate-400">{sub}</span>}
        {hint && <span className="text-slate-400 text-[11.5px]">{hint}</span>}
      </div>
    </div>
  );
}

/* ── Panel — white workspace card ────────────────────────────
   Three visual styles share this one component:

   · admin        — `description` is passed. Rounded-2xl card with a
                   soft shadow, a top-aligned header and a description
                   line under the title.
   · panel family — `sub` is passed. Rounded-xl card, no shadow,
                   title + optional sub-line.
   · talent/univ  — neither `description` nor `sub`. Rounded-xl card
                   with a hairline shadow and a compact header.

   The prop that is present selects the style, so every workspace keeps
   the appearance it was authored with. */
export function Panel({
  title,
  sub,
  description,
  action,
  children,
  className,
  pad = true,
  bodyClassName,
}: {
  title?: string;
  sub?: string;
  /* The admin workspace labels its panels with a description line. */
  description?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  pad?: boolean;
  /* The talent / university workspaces pad the body via bodyClassName
     and always render a title. */
  bodyClassName?: string;
}) {
  const adminStyle = description !== undefined;
  const talentStyle = !adminStyle && sub === undefined;

  if (adminStyle) {
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

  if (talentStyle) {
    return (
      <section
        className={cn(
          "overflow-hidden rounded-xl border border-line bg-white shadow-[0_1px_2px_rgba(11,18,32,0.03)]",
          className,
        )}
      >
        {title && (
          <header className="flex items-center justify-between border-b border-line px-4.5 py-3.5 sm:px-5">
            <h3 className="text-[13.5px] font-semibold text-ink">{title}</h3>
            {action}
          </header>
        )}
        <div className={cn("px-4.5 py-4 sm:px-5", bodyClassName)}>{children}</div>
      </section>
    );
  }

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
      <div className={cn(pad && "p-5", bodyClassName)}>{children}</div>
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
  value,
  className,
  barClass,
  tone,
}: {
  /* The investor / corporate / government / provider workspaces pass a
     percentage as `pct`; the talent / university workspaces pass it as
     `value` and pick the fill with `tone`. */
  pct?: number;
  value?: number;
  className?: string;
  barClass?: string;
  tone?: "accent" | "ink" | "green" | "amber";
}) {
  const amount = pct ?? value ?? 0;
  const toneClass =
    tone === "ink"
      ? "bg-ink"
      : tone === "green"
        ? "bg-emerald-500"
        : tone === "amber"
          ? "bg-amber-500"
          : "bg-accent";
  return (
    <div
      className={cn(
        "h-[6px] w-full overflow-hidden rounded-full bg-slate-100",
        className,
      )}
    >
      <div
        className={cn("h-full rounded-full bg-accent", barClass, tone && toneClass)}
        style={{ width: `${Math.min(100, Math.max(0, amount))}%` }}
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
  name,
  className,
}: {
  /* The investor / corporate / government / provider workspaces pass a
     ready-made initial string as `label`; the talent / university
     workspaces pass a full name as `name` and let the avatar derive the
     initials. */
  label?: string;
  name?: string;
  className?: string;
}) {
  const initials =
    label ??
    (name
      ? name
          .split(" ")
          .slice(0, 2)
          .map((word) => word[0])
          .join("")
      : "");
  return (
    <span
      className={cn(
        "flex items-center justify-center rounded-lg bg-ink/[0.06] font-semibold text-ink",
        "h-8 w-8 text-[11px]",
        className,
      )}
    >
      {initials}
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

/* ──────────────────────────────────────────────────────────────
   Intro family — talent / university workspaces
   ────────────────────────────────────────────────────────────── */

/* ── Page intro row — the title block at the top of a screen ── */
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

/* ── Panel header link ─────────────────────────────────────── */
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

/* ──────────────────────────────────────────────────────────────
   Admin family — admin workspace
   ────────────────────────────────────────────────────────────── */

/* ── Meter — a thin 0..1 fill bar ───────────────────────────── */
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

/* ── Tag — a small uppercase status pill ────────────────────── */
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
