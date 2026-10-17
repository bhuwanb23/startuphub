import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { Container, Eyebrow } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { cn } from "@/lib/utils";

export type Crumb = { label: string; href?: string };

export default function PageHero({
  crumbs,
  eyebrow,
  title,
  lead,
  align = "center",
  children,
  className,
}: {
  crumbs?: Crumb[];
  eyebrow: string;
  title: ReactNode;
  lead?: string;
  align?: "center" | "left";
  children?: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "relative overflow-hidden border-b border-line pb-14 pt-28 md:pb-16 md:pt-36",
        className
      )}
    >
      <div
        aria-hidden="true"
        className="bg-nodegrid absolute inset-x-0 top-0 h-[380px] [mask-image:radial-gradient(ellipse_62%_80%_at_50%_0%,black_25%,transparent)]"
      />
      <Container className="relative">
        <div
          className={cn(
            "flex flex-col gap-5",
            align === "center" ? "items-center text-center" : "items-start text-left"
          )}
        >
          {crumbs && (
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-1.5 text-[12px] font-medium text-slate-400"
            >
              {crumbs.map((c, i) => (
                <span key={c.label} className="flex items-center gap-1.5">
                  {c.href ? (
                    <Link href={c.href} className="transition-colors hover:text-ink">
                      {c.label}
                    </Link>
                  ) : (
                    <span className="text-slate-500">{c.label}</span>
                  )}
                  {i < crumbs.length - 1 && <ChevronRight className="h-3 w-3 text-slate-300" />}
                </span>
              ))}
            </nav>
          )}
          <Reveal className="flex flex-col items-center gap-5">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h1
              className={cn(
                "max-w-3xl text-balance text-[clamp(2.1rem,4.6vw,3.5rem)] font-semibold leading-[1.06] tracking-[-0.03em] text-ink",
                align === "left" && "text-left"
              )}
            >
              {title}
            </h1>
            {lead && (
              <p
                className={cn(
                  "max-w-2xl text-pretty text-[17px] leading-relaxed text-slate-500",
                  align === "center" ? "mx-auto" : ""
                )}
              >
                {lead}
              </p>
            )}
          </Reveal>
          {children && <Reveal delay={0.12}>{children}</Reveal>}
        </div>
      </Container>
    </section>
  );
}
