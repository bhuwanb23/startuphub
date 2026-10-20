import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Container, Eyebrow } from "@/components/ui";
import { Reveal } from "@/components/motion";

export function PageHero({
  eyebrow,
  title,
  lead,
  children,
  texture = "nodegrid",
  className,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  children?: ReactNode;
  texture?: "nodegrid" | "dotgrid" | "none";
  className?: string;
}) {
  return (
    <section className={cn("relative overflow-hidden pb-16 pt-32 sm:pb-20 sm:pt-40", className)}>
      {texture === "nodegrid" ? (
        <div className="absolute inset-0 -z-10 bg-nodegrid" aria-hidden />
      ) : null}
      {texture === "dotgrid" ? (
        <div className="absolute inset-0 -z-10 bg-dotgrid mask-x-fade" aria-hidden />
      ) : null}

      <Container>
        <Reveal className="flex max-w-3xl flex-col items-start gap-6">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="text-balance text-[clamp(2.4rem,5vw,3.9rem)] font-semibold leading-[1.06] tracking-[-0.03em] text-ink">
            {title}
          </h1>
          {lead ? (
            <p className="max-w-xl text-pretty text-[17px] leading-relaxed text-slate-500">
              {lead}
            </p>
          ) : null}
          {children}
        </Reveal>
      </Container>
    </section>
  );
}
