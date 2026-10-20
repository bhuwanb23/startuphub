import { ButtonLink, Container } from "@/components/ui";
import { cn } from "@/lib/utils";

/* The brand motif — a connected ecosystem of nodes and pathways.
   Pure SVG decoration; drop behind heroes, cards and empty states.
   Inlined here so the shared startup-art module stays untouched. */
function StartupArt({ className }: { className?: string }) {
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

/* The "coming soon" empty state used by workspace screens that are
   still being wired up. */
export function Soon({
  title,
  lead = "This screen is being designed and wired right now. Check back shortly.",
  backHref = "/",
  backLabel = "Back to home",
}: {
  title: string;
  lead?: string;
  backHref?: string;
  backLabel?: string;
}) {
  return (
    <section className="relative overflow-hidden py-28 sm:py-36">
      <StartupArt className="absolute left-1/2 top-1/2 -z-10 h-[420px] w-[560px] -translate-x-1/2 -translate-y-1/2 opacity-60" />
      <Container>
        <div className="mx-auto flex max-w-md flex-col items-center text-center">
          <span className="rounded-full bg-accent-soft px-3.5 py-1 text-[10.5px] font-semibold uppercase tracking-[0.18em] text-accent">
            Soon
          </span>
          <h1 className="mt-6 text-balance text-[clamp(1.9rem,3.6vw,2.6rem)] font-semibold leading-[1.1] tracking-[-0.025em] text-ink">
            {title}
          </h1>
          <p className="mt-4 text-pretty text-[15.5px] leading-relaxed text-slate-500">
            {lead}
          </p>
          <ButtonLink href={backHref} variant="secondary" className="mt-8">
            {backLabel}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}

export default Soon;
