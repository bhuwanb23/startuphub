import { ButtonLink, Container } from "@/components/ui";
import { StartupArt } from "./startup-art";

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
