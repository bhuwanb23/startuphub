import { cn } from "@/lib/utils";

/**
 * The brand motif — a connected ecosystem of nodes and pathways.
 * Pure SVG decoration; drop behind heroes, cards and empty states.
 */
export function StartupArt({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 300"
      className={cn("pointer-events-none", className)}
      fill="none"
      aria-hidden
    >
      <g stroke="#d9e3fb" strokeWidth="1" className="link-flow">
        <path d="M60,240 C140,180 220,200 320,110" />
        <path d="M120,60 C200,120 280,80 380,160" />
        <path d="M40,140 C120,140 200,240 340,240" />
      </g>
      <g fill="#3157E8" opacity="0.35">
        <circle cx="60" cy="240" r="3.5" />
        <circle cx="320" cy="110" r="3.5" />
        <circle cx="120" cy="60" r="3.5" />
        <circle cx="380" cy="160" r="3.5" />
        <circle cx="40" cy="140" r="3.5" />
        <circle cx="340" cy="240" r="3.5" />
      </g>
    </svg>
  );
}
